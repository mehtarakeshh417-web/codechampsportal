// Two flip-cards generated from the topic's existing practice questions.
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Brain, RotateCw } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PracticeQuestion } from "@/lib/curriculum/types";

const answerText = (q: PracticeQuestion): string => {
  switch (q.type) {
    case "mcq":   return q.options[q.answerIndex];
    case "tf":    return q.answer ? "True" : "False";
    case "fill":  return q.answer;
    case "short": return q.modelAnswer;
  }
};

export default function QuickRecallCards({ questions }: { questions: PracticeQuestion[] }) {
  const picks = useMemo(() => questions.slice(0, 2), [questions]);
  if (picks.length === 0) return null;
  return (
    <section className="mt-6">
      <h4 className="font-display text-sm font-bold text-foreground mb-3 flex items-center gap-2">
        <Brain className="w-4 h-4 text-fuchsia-400" /> Quick Recall — tap to reveal
      </h4>
      <div className="grid sm:grid-cols-2 gap-3">
        {picks.map((q, i) => (
          <FlipCard key={i} front={q.question} back={answerText(q)} />
        ))}
      </div>
    </section>
  );
}

function FlipCard({ front, back }: { front: string; back: string }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <button
      onClick={() => setFlipped((v) => !v)}
      className="relative h-32 w-full text-left [perspective:1000px]"
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full h-full [transform-style:preserve-3d]"
      >
        <Face className="bg-gradient-to-br from-cyan-500/15 to-violet-500/15 border-cyan-400/25">
          <span className="text-[10px] uppercase tracking-wider text-cyan-300 font-bold mb-1">Question</span>
          <span className="text-sm text-foreground/90 leading-snug">{front}</span>
          <span className="absolute bottom-2 right-3 text-[10px] text-foreground/40 flex items-center gap-1">
            <RotateCw className="w-3 h-3" /> tap
          </span>
        </Face>
        <Face className="bg-gradient-to-br from-emerald-500/20 to-cyan-500/15 border-emerald-400/30 [transform:rotateY(180deg)]">
          <span className="text-[10px] uppercase tracking-wider text-emerald-300 font-bold mb-1">Answer</span>
          <span className="text-sm text-foreground/90 leading-snug">{back}</span>
        </Face>
      </motion.div>
    </button>
  );
}

function Face({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn(
      "absolute inset-0 rounded-2xl border p-4 flex flex-col [backface-visibility:hidden]",
      className,
    )}>
      {children}
    </div>
  );
}
