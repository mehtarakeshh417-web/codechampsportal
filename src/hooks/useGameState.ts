// Cloud-synced game state. Wraps useLocalGameState and pushes XP to
// students.xp so progress follows the student across devices. Other fields
// (badges, streak, theme, sound) stay in localStorage for now since no
// schema change is available.

import { useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useData } from "@/contexts/DataContext";
import { useLocalGameState } from "@/components/curriculum/enhancements/useLocalGameState";

export const xpToLevel = (xp: number) => Math.floor(Math.sqrt(Math.max(0, xp) / 50)) + 1;
export const levelToXp = (level: number) => Math.pow(Math.max(1, level) - 1, 2) * 50;
export const xpProgressInLevel = (xp: number) => {
  const lvl = xpToLevel(xp);
  const start = levelToXp(lvl);
  const end = levelToXp(lvl + 1);
  return { level: lvl, into: xp - start, span: end - start, pct: Math.min(100, Math.round(((xp - start) / (end - start)) * 100)) };
};

export function useGameState() {
  const { user } = useAuth();
  const { students } = useData();
  const student = students.find((s) => s.user_id === user?.id);
  const studentRowId = student?.id;

  const game = useLocalGameState(studentRowId);
  const hydratedRef = useRef(false);
  const lastSyncedXpRef = useRef<number | null>(null);
  const debounceRef = useRef<number | null>(null);

  // Hydrate XP from cloud on first load (use the higher of local/cloud)
  useEffect(() => {
    if (!studentRowId || hydratedRef.current) return;
    let cancelled = false;
    supabase
      .from("students")
      .select("xp")
      .eq("id", studentRowId)
      .maybeSingle()
      .then(({ data }) => {
        if (cancelled) return;
        const cloudXp = data?.xp ?? 0;
        const localXp = game.state.xp;
        hydratedRef.current = true;
        if (cloudXp > localXp) {
          // Pull cloud XP down (and bump coins to match)
          game.update({ xp: cloudXp, coins: Math.max(game.state.coins, Math.floor(cloudXp / 10)) });
          lastSyncedXpRef.current = cloudXp;
        } else {
          lastSyncedXpRef.current = cloudXp;
        }
      });
    return () => { cancelled = true; };
  }, [studentRowId, game]);

  // Debounced push of XP back to students.xp
  useEffect(() => {
    if (!studentRowId || !hydratedRef.current) return;
    if (lastSyncedXpRef.current === game.state.xp) return;
    if (debounceRef.current) window.clearTimeout(debounceRef.current);
    debounceRef.current = window.setTimeout(async () => {
      const xp = game.state.xp;
      const { error } = await supabase.from("students").update({ xp }).eq("id", studentRowId);
      if (!error) lastSyncedXpRef.current = xp;
    }, 1500);
    return () => { if (debounceRef.current) window.clearTimeout(debounceRef.current); };
  }, [game.state.xp, studentRowId]);

  return game;
}
