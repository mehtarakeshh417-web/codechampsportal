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

// Convert username to email format for Supabase auth
const usernameToEmail = (username: string) => `${username}@codechamps.local`;
const emailToUsername = (email: string) => email.replace("@codechamps.local", "");

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
  const username = emailToUsername(supaUser.email || "");

  // Return cached instantly if available
  const cached = getCachedUser(supaUser.id);
  if (cached) return cached;

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
    return !error;
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
