// Per-tab renderers. Each tab component lazy-loads its own section data
// via SectionLoader so the network/cpu cost is per-tab, not per-page.

import { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { Clock, Target, Zap, Beaker, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import SectionLoader from "./SectionLoader";
import QuizEngine from "./QuizEngine";
import type { TopicMeta } from "@/lib/curriculum/types";

// Lab editor panel is heavy → lazy load
const LabPanel = lazy(() => import("./LabPanel"));

// ---------- Overview ----------
export const OverviewTab = ({ topic }: { topic: TopicMeta }) => (
  <SectionLoader topicId={topic.id} section="overview">
    {(d) => (
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
        <p className="text-foreground/85 leading-relaxed">{d.summary}</p>

        <div className="grid sm:grid-cols-3 gap-3">
          <Stat icon={<Clock className="w-4 h-4" />} label="Duration" value={d.duration} />
          <Stat icon={<Zap className="w-4 h-4" />}  label="Difficulty" value={d.difficulty} />
          <Stat icon={<Target className="w-4 h-4" />} label="Objectives" value={`${d.objectives.length} goals`} />
        </div>

        <div>
          <h3 className="font-display text-lg font-bold text-foreground mb-3">Learning Objectives</h3>
          <ul className="space-y-2">
            {d.objectives.map((o, i) => (
              <li key={i} className="flex gap-3 text-sm text-foreground/75">
                <span className="shrink-0 w-6 h-6 rounded-lg bg-primary/15 text-primary text-xs font-bold flex items-center justify-center">{i + 1}</span>
                {o}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    )}
  </SectionLoader>
);

const Stat = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
  <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
    <div className="flex items-center gap-2 text-xs text-foreground/40 uppercase tracking-wider mb-1">
      {icon} {label}
    </div>
    <div className="text-sm font-semibold text-foreground capitalize">{value}</div>
  </div>
);

// ---------- Learn ----------
export const LearnTab = ({ topic }: { topic: TopicMeta }) => (
  <SectionLoader topicId={topic.id} section="learn">
    {(d) => (
      <div className="space-y-7">
        {d.blocks.map((b, i) => (
          <motion.section
            key={i}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
          >
            <h3 className="font-display text-lg font-bold text-foreground mb-2">{b.heading}</h3>
            {b.body.split(/\n\n+/).map((p, j) => (
              <p key={j} className="text-sm text-foreground/75 leading-relaxed mb-2">{p}</p>
            ))}
            {b.bullets && (
              <ul className="list-disc list-inside text-sm text-foreground/75 space-y-1 mt-2">
                {b.bullets.map((bl, k) => <li key={k}>{bl}</li>)}
              </ul>
            )}
          </motion.section>
        ))}
      </div>
    )}
  </SectionLoader>
);

// ---------- Images ----------
export const ImagesTab = ({ topic }: { topic: TopicMeta }) => (
  <SectionLoader topicId={topic.id} section="images">
    {(d) =>
      d.items.length === 0 ? (
        <p className="text-sm text-foreground/40 italic py-8 text-center">
          Visuals for this topic will be added soon.
        </p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {d.items.map((it, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.04 }}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 flex flex-col items-center gap-3 text-center"
            >
              {it.src ? (
                <img src={it.src} alt={it.caption} className="w-full h-40 object-cover rounded-xl" loading="lazy" />
              ) : (
                <div className="w-full h-40 rounded-xl bg-gradient-to-br from-primary/15 to-secondary/15 flex items-center justify-center text-6xl">
                  {it.emoji ?? "🖼️"}
                </div>
              )}
              <p className="text-xs text-foreground/70">{it.caption}</p>
            </motion.div>
          ))}
        </div>
      )
    }
  </SectionLoader>
);

// ---------- Activities ----------
export const ActivitiesTab = ({ topic }: { topic: TopicMeta }) => (
  <SectionLoader topicId={topic.id} section="activities">
    {(d) => (
      <div className="space-y-5">
        {d.items.map((a, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
          >
            <h4 className="font-display font-bold text-foreground mb-3">{a.title}</h4>
            <ol className="list-decimal list-inside space-y-1 text-sm text-foreground/75 mb-3">
              {a.steps.map((s, j) => <li key={j}>{s}</li>)}
            </ol>
            {a.expectedOutcome && (
              <p className="text-xs text-foreground/50 italic">Expected outcome: {a.expectedOutcome}</p>
            )}
          </motion.div>
        ))}
      </div>
    )}
  </SectionLoader>
);

// ---------- Practice ----------
export const PracticeTab = ({ topic }: { topic: TopicMeta }) => (
  <SectionLoader topicId={topic.id} section="practice">
    {(d) => <QuizEngine questions={d.questions} mode="practice" />}
  </SectionLoader>
);

// ---------- Quiz ----------
export const QuizTab = ({
  topic,
  onPass,
}: {
  topic: TopicMeta;
  onPass?: () => void;
}) => (
  <SectionLoader topicId={topic.id} section="quiz">
    {(d) => (
      <QuizEngine
        questions={d.questions}
        mode="quiz"
        timerSeconds={d.timerSeconds}
        passScore={d.passScore}
        onComplete={(r) => { if (r.passed) onPass?.(); }}
      />
    )}
  </SectionLoader>
);

// ---------- Lab ----------
export const LabTab = ({ topic }: { topic: TopicMeta }) => (
  <SectionLoader topicId={topic.id} section="lab">
    {(d) =>
      d.type === "none" ? (
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center">
          <Beaker className="w-10 h-10 text-foreground/30 mx-auto mb-3" />
          <p className="text-sm text-foreground/60 mb-1">No coding lab for this topic.</p>
          {d.instructions && <p className="text-xs text-foreground/40">{d.instructions}</p>}
        </div>
      ) : (
        <Suspense
          fallback={
            <div className="flex items-center justify-center py-16 text-foreground/40 gap-2 text-sm">
              <Loader2 className="w-4 h-4 animate-spin" /> Loading editor…
            </div>
          }
        >
          <LabPanel labType={d.type} starterCode={d.starterCode} instructions={d.instructions} />
        </Suspense>
      )
    }
  </SectionLoader>
);
