import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

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

export const createStudentAuthAccount = async (username: string, password: string, displayName: string) => {
  const memoryStorage = {
    getItem: () => null,
    setItem: () => undefined,
    removeItem: () => undefined,
  };

  const isolatedClient = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
    auth: {
      storage: memoryStorage,
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });

  const email = usernameToEmail(username);
  const { data, error } = await isolatedClient.auth.signUp({
    email,
    password: passwordForAuth(password),
    options: { data: { username, display_name: displayName } },
  });

  await isolatedClient.auth.signOut();
  if (error) throw error;
  if (!data.user?.id) throw new Error("Student login account was not created");
  return { userId: data.user.id, email };
};