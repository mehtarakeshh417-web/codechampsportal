import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User, Session } from "@supabase/supabase-js";

export type UserRole = "admin" | "school" | "teacher" | "student";

export interface AuthUser {
  id: string;
  username: string;
  role: UserRole;
  displayName: string;
  schoolName?: string;
  className?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  changePassword: (newPassword: string, oldPassword?: string) => Promise<boolean>;
  hasSecuritySetup: () => Promise<boolean>;
  setupSecurity: (pin: string, question: string, answer: string) => Promise<void>;
  verifyPin: (pin: string) => Promise<boolean>;
  verifySecurityAnswer: (answer: string) => Promise<{ valid: boolean; question: string }>;
  getSecurityQuestion: () => Promise<string | null>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Convert any username into an auth-safe email while keeping old simple usernames working.
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

const fromHex = (value: string) => {
  try {
    const bytes = value.match(/.{1,2}/g)?.map((part) => parseInt(part, 16)) || [];
    return new TextDecoder().decode(Uint8Array.from(bytes));
  } catch {
    return value;
  }
};

const usernameToEmail = (username: string) => {
  const clean = username.trim();
  const safeLocalPart = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+$/.test(clean) && !clean.includes("..") && !clean.startsWith(".") && !clean.endsWith(".") && clean.length <= 60;
  return `${safeLocalPart ? clean : `u_${hashUsername(clean)}_${toHex(clean).slice(0, 24)}`}@avartan.local`.toLowerCase();
};
const emailToUsername = (email: string) => {
  const local = email.replace("@avartan.local", "").replace("@codechamps.local", "");
  const encoded = local.slice(2);
  return local.startsWith("u_") && /^[0-9a-f]+$/i.test(encoded) ? fromHex(encoded) : local;
};
const passwordForAuth = (password: string) => password.length >= 6 ? password : `cc_${password}`.padEnd(6, "_");

const CACHE_KEY = "cc_auth_user";

const getCachedUser = (userId: string): AuthUser | null => {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const cached = JSON.parse(raw);
    if (cached.id === userId) return cached as AuthUser;
  } catch {}
  return null;
};

const cacheUser = (u: AuthUser) => {
  localStorage.setItem(CACHE_KEY, JSON.stringify(u));
};

const clearCachedUser = () => localStorage.removeItem(CACHE_KEY);

const buildAuthUser = async (supaUser: User): Promise<AuthUser | null> => {
  const username = (supaUser.user_metadata?.username as string) || emailToUsername(supaUser.email || "");

  // Return cached instantly if available
  const cached = getCachedUser(supaUser.id);
  if (cached && (cached.role !== "student" || cached.className)) return cached;

  // Single RPC call to get role + profile info
  const { data: profile } = await supabase.rpc("get_user_profile", { _user_id: supaUser.id });

  const p = profile as any || {};
  const authUser: AuthUser = {
    id: supaUser.id,
    username,
    role: (p.role as UserRole) || "student",
    displayName: p.display_name || username,
    schoolName: p.school_name || undefined,
    className: p.class_name || undefined,
  };
  cacheUser(authUser);
  return authUser;
};
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'INITIAL_SESSION' || event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        if (session?.user) {
          const authUser = await buildAuthUser(session.user);
          setUser(authUser);
        } else {
          setUser(null);
        }
        setLoading(false);
      } else if (event === 'SIGNED_OUT') {
        clearCachedUser();
        setUser(null);
        setLoading(false);
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  const login = useCallback(async (username: string, password: string): Promise<boolean> => {
    const email = usernameToEmail(username);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (!error) return true;
    const { error: normalizedError } = await supabase.auth.signInWithPassword({ email, password: passwordForAuth(password) });
    if (!normalizedError) return true;
    // Fallback: legacy accounts created with @codechamps.local domain
    const legacyEmail = `${username}@codechamps.local`;
    const { error: legacyError } = await supabase.auth.signInWithPassword({ email: legacyEmail, password });
    if (!legacyError) return true;
    const { error: legacyNormalizedError } = await supabase.auth.signInWithPassword({ email: legacyEmail, password: passwordForAuth(password) });
    return !legacyNormalizedError;
  }, []);

  const logout = useCallback(async () => {
    clearCachedUser();
    await supabase.auth.signOut();
    setUser(null);
  }, []);

  const changePassword = useCallback(async (newPassword: string, _oldPassword?: string): Promise<boolean> => {
    if (!user) return false;
    const { error } = await supabase.functions.invoke("manage-users", {
      body: { action: "change_password", user_id: user.id, new_password: newPassword },
    });
    return !error;
  }, [user]);

  const hasSecuritySetup = useCallback(async (): Promise<boolean> => {
    if (!user) return false;
    const { data } = await supabase
      .from("user_security")
      .select("id")
      .eq("user_id", user.id)
      .maybeSingle();
    return !!data;
  }, [user]);

  const setupSecurity = useCallback(async (pin: string, question: string, answer: string) => {
    if (!user) return;
    await supabase.from("user_security").upsert({
      user_id: user.id,
      pin,
      security_question: question,
      security_answer: answer.trim().toLowerCase(),
    }, { onConflict: "user_id" });
  }, [user]);

  const verifyPin = useCallback(async (pin: string): Promise<boolean> => {
    if (!user) return false;
    const { data } = await supabase
      .from("user_security")
      .select("pin")
      .eq("user_id", user.id)
      .maybeSingle();
    return data?.pin === pin;
  }, [user]);

  const getSecurityQuestion = useCallback(async (): Promise<string | null> => {
    if (!user) return null;
    const { data } = await supabase
      .from("user_security")
      .select("security_question")
      .eq("user_id", user.id)
      .maybeSingle();
    return data?.security_question || null;
  }, [user]);

  const verifySecurityAnswer = useCallback(async (answer: string): Promise<{ valid: boolean; question: string }> => {
    if (!user) return { valid: false, question: "" };
    const { data } = await supabase
      .from("user_security")
      .select("security_question, security_answer")
      .eq("user_id", user.id)
      .maybeSingle();
    if (!data) return { valid: false, question: "" };
    return {
      valid: data.security_answer === answer.trim().toLowerCase(),
      question: data.security_question,
    };
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user, changePassword, hasSecuritySetup, setupSecurity, verifyPin, verifySecurityAnswer, getSecurityQuestion, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
