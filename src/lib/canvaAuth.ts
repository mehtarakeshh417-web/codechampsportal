/**
 * Canva Connect OAuth2 PKCE helper.
 * The Client ID is a publishable key — safe for frontend.
 * The Client Secret is stored server-side in the edge function.
 */

const CANVA_CLIENT_ID = "OC-AZ1Kl10JipKS";
const CANVA_AUTH_URL = "https://www.canva.com/api/oauth/authorize";
const REDIRECT_URI = "https://codechampsportal.lovable.app/canva-callback";
const SCOPES = "design:content:write design:meta:read design:content:read";

// Generate PKCE code verifier + challenge
function generateCodeVerifier(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return btoa(String.fromCharCode(...array))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

async function generateCodeChallenge(verifier: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(verifier);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export interface CanvaTokens {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
}

const STORAGE_KEY = "canva_tokens";
const VERIFIER_KEY = "canva_code_verifier";

export function getStoredTokens(): CanvaTokens | null {
  const raw = sessionStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function storeTokens(tokens: CanvaTokens) {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(tokens));
}

export function clearTokens() {
  sessionStorage.removeItem(STORAGE_KEY);
  sessionStorage.removeItem(VERIFIER_KEY);
}

export async function startCanvaOAuth() {
  const codeVerifier = generateCodeVerifier();
  const codeChallenge = await generateCodeChallenge(codeVerifier);

  // Store verifier for callback
  sessionStorage.setItem(VERIFIER_KEY, codeVerifier);

  const state = crypto.randomUUID();
  sessionStorage.setItem("canva_oauth_state", state);

  const params = new URLSearchParams({
    code_challenge: codeChallenge,
    code_challenge_method: "s256",
    scope: SCOPES,
    response_type: "code",
    client_id: CANVA_CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    state,
  });

  window.location.href = `${CANVA_AUTH_URL}?${params.toString()}`;
}

export async function exchangeCodeForTokens(code: string): Promise<CanvaTokens> {
  const codeVerifier = sessionStorage.getItem(VERIFIER_KEY);
  if (!codeVerifier) throw new Error("Missing PKCE code verifier");

  const projectId = import.meta.env.VITE_SUPABASE_PROJECT_ID || 
    new URL(import.meta.env.VITE_SUPABASE_URL).hostname.split(".")[0];

  const res = await fetch(
    `https://${projectId}.supabase.co/functions/v1/canva-oauth?action=exchange`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code,
        code_verifier: codeVerifier,
        redirect_uri: REDIRECT_URI,
      }),
    }
  );

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Token exchange failed");
  }

  const tokens: CanvaTokens = await res.json();
  storeTokens(tokens);
  sessionStorage.removeItem(VERIFIER_KEY);
  return tokens;
}

export async function canvaApiCall(
  action: string,
  method: "GET" | "POST" = "POST",
  body?: Record<string, unknown>
): Promise<unknown> {
  const tokens = getStoredTokens();
  if (!tokens) throw new Error("Not authenticated with Canva");

  const projectId = import.meta.env.VITE_SUPABASE_PROJECT_ID ||
    new URL(import.meta.env.VITE_SUPABASE_URL).hostname.split(".")[0];

  const baseUrl = `https://${projectId}.supabase.co/functions/v1/canva-oauth`;

  if (method === "GET") {
    const params = new URLSearchParams({ action, access_token: tokens.access_token, ...(body as Record<string, string>) });
    const res = await fetch(`${baseUrl}?${params.toString()}`);
    return res.json();
  }

  const res = await fetch(`${baseUrl}?action=${action}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ access_token: tokens.access_token, ...body }),
  });

  return res.json();
}
