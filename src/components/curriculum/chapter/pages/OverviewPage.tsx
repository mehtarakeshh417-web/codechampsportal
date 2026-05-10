// Overview / hook page (page 1 of every chapter).
import { motion } from "framer-motion";
import { Clock, Zap, Target, Sparkles } from "lucide-react";
import type { OverviewContent } from "@/lib/curriculum/types";
import { cn } from "@/lib/utils";

export default function OverviewPage({
  data,
  topicTitle,
  topicEmoji,
  gradient,
}: {
  data: OverviewContent;
  topicTitle: string;
  topicEmoji: string;
  gradient: string;
}) {
  return (
    <div className="space-y-6">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn(
          "relative overflow-hidden rounded-3xl border border-white/10 p-6 sm:p-8 bg-gradient-to-br",
          gradient,
        )}
      >
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative flex items-start gap-5">
          <div className="text-6xl sm:text-7xl drop-shadow-lg">{topicEmoji}</div>
          <div className="min-w-0">
            <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/70 mb-2 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" /> Chapter Begins
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white leading-tight">
              {topicTitle}
            </h2>
            <p className="text-sm sm:text-base text-white/85 mt-3 leading-relaxed">
              {data.summary}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <Stat icon={<Clock className="w-4 h-4" />} label="Duration" value={data.duration} />
        <Stat icon={<Zap className="w-4 h-4" />} label="Level" value={data.difficulty} />
        <Stat icon={<Target className="w-4 h-4" />} label="Goals" value={`${data.objectives.length}`} />
      </div>

      {/* Objectives */}
      <section>
        <h3 className="font-display text-lg font-bold text-foreground mb-3 flex items-center gap-2">
          🎯 What you'll learn
        </h3>
        <div className="grid sm:grid-cols-2 gap-3">
          {data.objectives.map((o, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 flex gap-3"
            >
              <span className="shrink-0 w-7 h-7 rounded-lg bg-primary/20 text-primary text-xs font-bold flex items-center justify-center">
                {i + 1}
              </span>
              <p className="text-sm text-foreground/85 leading-relaxed">{o}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

const Stat = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => (
  <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3 sm:p-4">
    <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-foreground/50 uppercase tracking-wider mb-1">
      {icon} {label}
    </div>
    <div className="text-sm font-semibold text-foreground capitalize truncate">{value}</div>
  </div>
);
