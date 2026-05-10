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

const CurriculumDashboard = () => {
  const { user } = useAuth();
  const { students } = useData();
  const navigate = useNavigate();
  const { classSlug } = useParams<{ classSlug?: string }>();

  const student = useMemo(() => students.find((s) => s.user_id === user?.id), [students, user?.id]);
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

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-5 h-5 text-primary" />
          <span className="text-xs uppercase tracking-wider text-foreground/40">Curriculum</span>
        </div>
        <h1 className="font-display text-3xl font-bold mb-1 text-foreground">
          <span className="text-gradient-brand">Learning Library</span>
        </h1>
        <p className="text-foreground/55 font-body mb-7">
          Pick a class to see its topics. Click a topic to start learning.
        </p>
      </motion.div>

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
                className="w-full glass-card p-4 md:p-5 flex items-center gap-4 hover:bg-white/[0.04] transition-colors group"
              >
                <div className={cn(
                  "w-14 h-14 shrink-0 rounded-2xl bg-gradient-to-br flex items-center justify-center text-2xl shadow-lg",
                  cls.gradient
                )}>
                  {cls.emoji}
                </div>
                <div className="flex-1 text-left min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-display text-lg font-bold text-foreground">{cls.className}</h3>
                    <span className="text-[10px] uppercase tracking-wider text-foreground/40 px-2 py-0.5 rounded-full bg-white/5 border border-white/10">
                      {cls.ageRange}
                    </span>
                  </div>
                  <p className="text-xs text-foreground/55 mt-0.5 truncate">{cls.description}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <div className="flex-1 max-w-[220px] h-1.5 rounded-full bg-white/10 overflow-hidden">
                      <div
                        className={cn("h-full rounded-full bg-gradient-to-r", cls.gradient)}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="text-[11px] text-foreground/45">{doneCount}/{topics.length}</span>
                  </div>
                </div>
                {isOpen ? (
                  <ChevronDown className="w-5 h-5 text-foreground/40" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-foreground/40 group-hover:translate-x-0.5 transition-transform" />
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
                              "flex items-center gap-3 p-3 rounded-xl border transition-all",
                              done
                                ? "bg-neon-green/[0.06] border-neon-green/20 hover:bg-neon-green/[0.1]"
                                : "bg-white/[0.03] border-white/10 hover:bg-white/[0.06] hover:border-white/20"
                            )}
                          >
                            <span className="text-2xl shrink-0">{t.emoji}</span>
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-semibold text-foreground truncate">{t.title}</div>
                              <div className="text-[11px] text-foreground/45 truncate">{t.shortDescription}</div>
                            </div>
                            {done
                              ? <CheckCircle2 className="w-4 h-4 text-neon-green shrink-0" />
                              : <Circle className="w-4 h-4 text-foreground/25 shrink-0" />}
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
