import { supabase } from "@/integrations/supabase/client";

const toHex = (value: string) => Array.from(new TextEncoder().encode(value))
  .map((byte) => byte.toString(16).padStart(2, "0"))
  .join("");

const hashUsername = (value: string) => {
  let hash = 2166136261;
  for (let i = 0; i < value.length; i++) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(36);
};

export const usernameToEmail = (username: string) => {
  const clean = username.trim();
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean)) return clean.toLowerCase();
  const safeLocalPart = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+$/.test(clean) && !clean.includes("..") && !clean.startsWith(".") && !clean.endsWith(".") && clean.length <= 60;
  return `${safeLocalPart ? clean : `u_${hashUsername(clean)}_${toHex(clean).slice(0, 24)}`}@avartan.school`.toLowerCase();
};

export const passwordForAuth = (password: string) => password.length >= 6 ? password : `cc_${password}`.padEnd(6, "_");

export const normalizeClass = (raw: string): string => {
  if (!raw) return "";
  let value = String(raw).trim().split("-")[0].replace(/^class\s*/i, "").trim();
  const roman: Record<string, number> = { i: 1, ii: 2, iii: 3, iv: 4, v: 5, vi: 6, vii: 7, viii: 8, ix: 9, x: 10 };
  if (roman[value.toLowerCase()]) value = String(roman[value.toLowerCase()]);
  const match = value.match(/^(\d{1,2})/);
  if (!match) return value;
  const n = Number(match[1]);
  if (n < 1 || n > 10) return value;
  const suffix = n === 1 ? "st" : n === 2 ? "nd" : n === 3 ? "rd" : "th";
  return `${n}${suffix}`;
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export class StudentAccountError extends Error {
  status: number;
  retryable: boolean;
  constructor(message: string, status: number, retryable: boolean) {
    super(message);
    this.name = "StudentAccountError";
    this.status = status;
    this.retryable = retryable;
  }
}

export const createStudentAuthAccount = async (username: string, password: string, displayName: string) => {
  const email = usernameToEmail(username);
  const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/manage-users`;
  const apikey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;

  const { data: sessionData } = await supabase.auth.getSession();
  const accessToken = sessionData.session?.access_token;
  if (!accessToken) throw new StudentAccountError("Your session expired. Please sign in again.", 401, false);

  const backoffs = [1000, 2500, 5000];
  let lastError: StudentAccountError | null = null;

  for (let attempt = 0; attempt <= backoffs.length; attempt++) {
    let response: Response;
    try {
      response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey,
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          action: "create_user",
          email,
          password: passwordForAuth(password),
          role: "student",
          metadata: { username: username.trim(), display_name: displayName },
        }),
      });
    } catch (networkError: any) {
      lastError = new StudentAccountError(networkError?.message || "Network error while creating the login account", 0, true);
      if (attempt < backoffs.length) { await sleep(backoffs[attempt]); continue; }
      throw lastError;
    }

    const raw = await response.text();
    let payload: any = null;
    try { payload = raw ? JSON.parse(raw) : null; } catch { payload = null; }

    if (response.ok && payload?.user?.id) {
      return { userId: payload.user.id as string, email };
    }

    const message = payload?.error || raw?.slice(0, 200) || `Server error (${response.status})`;
    const retryable = response.status === 429 || response.status >= 500 || /rate limit|too many|timeout/i.test(message);
    lastError = new StudentAccountError(message, response.status, retryable);
    if (retryable && attempt < backoffs.length) { await sleep(backoffs[attempt]); continue; }
    throw lastError;
  }

  throw lastError || new StudentAccountError("Student login account was not created", 0, false);
};
