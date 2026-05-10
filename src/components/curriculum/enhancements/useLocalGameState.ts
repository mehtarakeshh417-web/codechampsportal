// Persistent kid-friendly game state — XP, coins, streak, theme, sound, focus.
// All localStorage. Keyed per-student (or "guest").

import { useCallback, useEffect, useState } from "react";

export type ThemeName = "cyber" | "candy" | "space";
const THEMES: ThemeName[] = ["cyber", "candy", "space"];

const KEY = (sid: string) => `curriculum-game::${sid}`;

interface State {
  xp: number;
  coins: number;
  streakDays: number;
  lastVisitISO: string | null;
  theme: ThemeName;
  soundOn: boolean;
  focusMode: boolean;
  dyslexicFont: boolean;
  badges: string[]; // badge ids earned
}

const DEFAULT: State = {
  xp: 0,
  coins: 0,
  streakDays: 0,
  lastVisitISO: null,
  theme: "cyber",
  soundOn: false,
  focusMode: false,
  dyslexicFont: false,
  badges: [],
};

const read = (sid: string): State => {
  try {
    const raw = localStorage.getItem(KEY(sid));
    if (!raw) return { ...DEFAULT };
    return { ...DEFAULT, ...JSON.parse(raw) };
  } catch {
    return { ...DEFAULT };
  }
};

const write = (sid: string, s: State) => {
  try { localStorage.setItem(KEY(sid), JSON.stringify(s)); } catch { /* ignore */ }
};

const todayISO = () => new Date().toISOString().slice(0, 10);
const daysBetween = (a: string, b: string) =>
  Math.round((new Date(b).getTime() - new Date(a).getTime()) / 86400000);

export function useLocalGameState(studentId: string | undefined) {
  const sid = studentId || "guest";
  const [state, setState] = useState<State>(() => read(sid));

  // Re-load when student changes
  useEffect(() => { setState(read(sid)); }, [sid]);

  // Apply theme + focus + dyslexic class to <html> & <body>
  useEffect(() => {
    const html = document.documentElement;
    THEMES.forEach((t) => html.classList.remove(`theme-${t}`));
    html.classList.add(`theme-${state.theme}`);
    document.body.classList.toggle("focus-mode", state.focusMode);
    document.body.classList.toggle("dyslexic-font", state.dyslexicFont);
  }, [state.theme, state.focusMode, state.dyslexicFont]);

  const update = useCallback((patch: Partial<State>) => {
    setState((s) => {
      const next = { ...s, ...patch };
      write(sid, next);
      return next;
    });
  }, [sid]);

  const addXP = useCallback((amount: number) => {
    setState((s) => {
      const next = { ...s, xp: s.xp + amount, coins: s.coins + Math.floor(amount / 10) };
      write(sid, next);
      return next;
    });
  }, [sid]);

  const earnBadge = useCallback((id: string) => {
    setState((s) => {
      if (s.badges.includes(id)) return s;
      const next = { ...s, badges: [...s.badges, id] };
      write(sid, next);
      return next;
    });
  }, [sid]);

  // Touch streak on mount
  const touchStreak = useCallback(() => {
    setState((s) => {
      const today = todayISO();
      if (s.lastVisitISO === today) return s;
      let days = s.streakDays;
      if (!s.lastVisitISO) days = 1;
      else {
        const diff = daysBetween(s.lastVisitISO, today);
        days = diff === 1 ? s.streakDays + 1 : diff > 1 ? 1 : s.streakDays;
      }
      const next = { ...s, streakDays: days, lastVisitISO: today };
      if (days >= 3 && !s.badges.includes("streak-3")) next.badges = [...s.badges, "streak-3"];
      if (days >= 7 && !next.badges.includes("streak-7")) next.badges = [...next.badges, "streak-7"];
      write(sid, next);
      return next;
    });
  }, [sid]);

  return { state, update, addXP, earnBadge, touchStreak };
}
