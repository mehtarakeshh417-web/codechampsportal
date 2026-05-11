// Curriculum dashboard: Class 1..10 accordion, with each class showing
// only its lightweight topic list (titles + emojis). No content fetched here.

import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronRight, CheckCircle2, Circle, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useData } from "@/contexts/DataContext";
import {
  ALL_CLASSES,
  getTopicsForClass,
  detectClassNumber,
} from "@/lib/curriculum/registry";
import { useGameState, xpProgressInLevel } from "@/hooks/useGameState";
import StreakBadgesBar from "./enhancements/StreakBadgesBar";

const CurriculumDashboard = () => {
  const { user } = useAuth();
  const { students } = useData();
  const navigate = useNavigate();
  const { classSlug } = useParams<{ classSlug?: string }>();

  const student = useMemo(() => students.find((s) => s.user_id === user?.id), [students, user?.id]);
  const { state: g, touchStreak } = useGameState();
  useEffect(() => { touchStreak(); }, [touchStreak]);
  const lvl = xpProgressInLevel(g.xp);
  const studentClassNumber = useMemo(
    () => detectClassNumber(student?.class || user?.className || ""),
    [student?.class, user?.className]
  );

  // Default-expanded class:
  //   /dashboard/curriculum/class-3 → 3
  //   else student's own class
  //   else first class
  const initialOpen =
    (classSlug && Number(classSlug.replace("class-", ""))) ||
    studentClassNumber ||
    ALL_CLASSES[0].classNumber;

  const [openClass, setOpenClass] = useState<number | null>(initialOpen);

  useEffect(() => {
    if (classSlug) {
      const n = Number(classSlug.replace("class-", ""));
      if (!Number.isNaN(n)) setOpenClass(n);
    }
  }, [classSlug]);

  const [completed, setCompleted] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!student) return;
    supabase
      .from("topic_completions")
      .select("topic_id")
      .eq("student_id", student.id)
      .then(({ data }) => {
        if (data) setCompleted(new Set(data.map((d: any) => d.topic_id)));
      });
  }, [student]);

  const totalTopics = useMemo(
    () => ALL_CLASSES.reduce((sum, c) => sum + getTopicsForClass(c.classNumber).length, 0),
    [],
  );
  const totalDone = completed.size;
  const dailyQuestDone = !!g.lastVisitISO && g.lastVisitISO === new Date().toISOString().slice(0, 10);

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-5 h-5 text-primary" />
          <span className="text-xs uppercase tracking-wider text-foreground/40">Curriculum</span>
          <span className="ml-auto px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-gradient-to-r from-cyan-400/20 to-violet-500/20 border border-cyan-400/30 text-cyan-200">
            ⭐ Lv {lvl.level} · {g.xp} XP
          </span>
        </div>
        <h1 className="font-display text-3xl font-bold mb-1 text-foreground">
          <span className="text-gradient-brand">Learning Library</span>
        </h1>
        <p className="text-foreground/55 font-body mb-3">
          Pick a class to see its topics. Click a topic to start learning.
        </p>
        <div className="mb-5 h-2 rounded-full bg-white/10 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-cyan-400 to-violet-500"
            animate={{ width: `${lvl.pct}%` }}
            transition={{ duration: 0.6 }}
          />
        </div>
      </motion.div>

      {/* Daily quest banner */}
      <div className={cn(
        "glass-card p-3 mb-4 flex items-center gap-3 border",
        dailyQuestDone ? "border-emerald-400/30 bg-emerald-400/5" : "border-amber-400/30 bg-amber-400/5",
      )}>
        <span className="text-2xl">{dailyQuestDone ? "✅" : "🎯"}</span>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-bold text-foreground">
            {dailyQuestDone ? "Daily quest done!" : "Today's quest"}
          </div>
          <div className="text-xs text-foreground/60">
            {dailyQuestDone
              ? `Keep your ${g.streakDays}-day streak alive — come back tomorrow for more XP.`
              : "Open any chapter today to earn +5 XP and grow your streak."}
          </div>
        </div>
        <span className="hidden sm:inline text-[11px] text-foreground/50">
          {totalDone}/{totalTopics} topics
        </span>
      </div>

      <StreakBadgesBar streak={g.streakDays} xp={g.xp} coins={g.coins} badges={g.badges} />

      <div className="space-y-3">
        {ALL_CLASSES.map((cls, ci) => {
          const isOpen = openClass === cls.classNumber;
          const topics = getTopicsForClass(cls.classNumber);
          const doneCount = topics.filter((t) => completed.has(t.id)).length;
          const pct = topics.length ? (doneCount / topics.length) * 100 : 0;

          return (
            <motion.div
              key={cls.classNumber}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: ci * 0.03 }}
            >
              <button
                onClick={() => {
                  const next = isOpen ? null : cls.classNumber;
                  setOpenClass(next);
                  navigate(next ? `/dashboard/curriculum/${cls.classSlug}` : "/dashboard/curriculum", { replace: true });
                }}
                className={cn(
                  "relative overflow-hidden w-full glass-card sweep p-4 md:p-5 flex items-center gap-4 transition-all duration-300 group",
                  "hover:border-primary/30 hover:-translate-y-0.5 hover:shadow-[0_18px_50px_-18px_hsl(var(--primary)/0.45)]",
                  isOpen && "border-primary/30 shadow-[0_18px_50px_-18px_hsl(var(--primary)/0.35)]",
                )}
              >
                {/* gradient corner glow */}
                <div
                  aria-hidden
                  className={cn(
                    "pointer-events-none absolute -top-16 -right-16 w-48 h-48 rounded-full opacity-40 blur-3xl bg-gradient-to-br",
                    cls.gradient,
                  )}
                />

                <div className={cn(
                  "relative w-14 h-14 shrink-0 rounded-2xl bg-gradient-to-br flex items-center justify-center text-2xl shadow-lg transition-transform group-hover:scale-105 group-hover:rotate-[-3deg]",
                  cls.gradient
                )}>
                  {cls.emoji}
                </div>
                <div className="relative flex-1 text-left min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-display text-lg font-bold text-foreground">{cls.className}</h3>
                    <span className="text-[10px] uppercase tracking-wider text-foreground/40 px-2 py-0.5 rounded-full bg-white/5 border border-white/10">
                      {cls.ageRange}
                    </span>
                    {pct === 100 && (
                      <span className="badge-pop text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-400/15 border border-emerald-400/30 text-emerald-300 font-bold">
                        ⭐ Mastered
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-foreground/55 mt-0.5 truncate">{cls.description}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <div className="flex-1 max-w-[220px] h-1.5 rounded-full bg-white/10 overflow-hidden">
                      <div
                        className={cn("h-full rounded-full bg-gradient-to-r transition-all duration-700", cls.gradient)}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="text-[11px] text-foreground/45">{doneCount}/{topics.length}</span>
                  </div>
                </div>

                {/* circular progress ring */}
                <div className="relative shrink-0 w-12 h-12 hidden sm:flex items-center justify-center">
                  <svg viewBox="0 0 36 36" className="w-12 h-12 -rotate-90">
                    <circle cx="18" cy="18" r="16" fill="none" stroke="hsl(var(--foreground)/0.1)" strokeWidth="3" />
                    <circle
                      cx="18" cy="18" r="16" fill="none"
                      stroke="hsl(var(--primary))" strokeWidth="3" strokeLinecap="round"
                      strokeDasharray={`${(pct / 100) * 100.53} 100.53`}
                      className="transition-all duration-700"
                    />
                  </svg>
                  <span className="absolute text-[10px] font-bold text-foreground/80">{Math.round(pct)}%</span>
                </div>

                {isOpen ? (
                  <ChevronDown className="relative w-5 h-5 text-foreground/40" />
                ) : (
                  <ChevronRight className="relative w-5 h-5 text-foreground/40 group-hover:translate-x-0.5 transition-transform" />
                )}
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-2 ml-2 md:ml-6 pl-3 border-l border-white/10 grid sm:grid-cols-2 gap-2 pb-2">
                      {topics.map((t) => {
                        const done = completed.has(t.id);
                        return (
                          <Link
                            key={t.id}
                            to={`/dashboard/curriculum/${cls.classSlug}/${t.topicSlug}`}
                            className={cn(
                              "group/topic relative overflow-hidden flex items-center gap-3 p-3 rounded-xl border transition-all duration-300 hover:-translate-y-0.5",
                              done
                                ? "bg-neon-green/[0.06] border-neon-green/25 hover:border-neon-green/45 hover:shadow-[0_8px_22px_-10px_hsl(145_80%_50%/0.5)]"
                                : "bg-white/[0.03] border-white/10 hover:border-primary/35 hover:shadow-[0_8px_22px_-10px_hsl(var(--primary)/0.45)]"
                            )}
                          >
                            <span className="text-2xl shrink-0 transition-transform group-hover/topic:scale-110 group-hover/topic:rotate-[-4deg]">{t.emoji}</span>
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-semibold text-foreground truncate">{t.title}</div>
                              <div className="text-[11px] text-foreground/45 truncate">{t.shortDescription}</div>
                              <div className="mt-0.5 flex items-center gap-1 text-[10px]">
                                <span className="text-amber-300/90 tracking-tight">
                                  {done ? "★★★" : "☆☆☆"}
                                </span>
                                <span className={cn("font-bold", done ? "text-emerald-300" : "text-cyan-300/80")}>
                                  {done ? "+80 XP earned" : "+80 XP available"}
                                </span>
                              </div>
                            </div>
                            {done
                              ? <CheckCircle2 className="w-4 h-4 text-neon-green shrink-0" />
                              : <Circle className="w-4 h-4 text-foreground/25 shrink-0 group-hover/topic:text-primary/70 transition-colors" />}
                          </Link>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default CurriculumDashboard;
