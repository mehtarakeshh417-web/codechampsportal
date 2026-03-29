import { motion } from "framer-motion";
import {
  CheckCircle2, Circle, ArrowRight, ArrowLeft, Zap, Clock, Trophy, Star,
  Target, Award, Flame, Medal, Gift, TrendingUp
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface TopicProgressPanelProps {
  currentPage: number;
  totalPages: number;
  isCompleted: boolean;
  topicTitle: string;
  xp: number;
  level: number;
  moduleTotalTopics: number;
  moduleCompletedTopics: number;
  onToggleComplete: () => void;
  onNextPage: () => void;
  onPrevPage: () => void;
  isFirstPage: boolean;
  isLastPage: boolean;
}

const xpLevelTitle = (level: number) => {
  const titles = ["Byte Beginner", "Code Cadet", "Script Ninja", "Dev Master", "Legendary Coder"];
  return titles[Math.min(level - 1, 4)];
};

const xpLevelEmoji = (level: number) => {
  const emojis = ["🌱", "⚡", "🥷", "🏆", "👑"];
  return emojis[Math.min(level - 1, 4)];
};

const xpForLevel = (level: number) => [500, 1500, 3000, 5000, 10000][Math.min(level - 1, 4)];

const TopicProgressPanel = ({
  currentPage,
  totalPages,
  isCompleted,
  topicTitle,
  xp,
  level,
  moduleTotalTopics,
  moduleCompletedTopics,
  onToggleComplete,
  onNextPage,
  onPrevPage,
  isFirstPage,
  isLastPage,
}: TopicProgressPanelProps) => {
  const pageProgress = totalPages > 0 ? Math.round(((currentPage + 1) / totalPages) * 100) : 0;
  const moduleProgress = moduleTotalTopics > 0 ? Math.round((moduleCompletedTopics / moduleTotalTopics) * 100) : 0;
  const estimatedMinutes = Math.max(3, totalPages * 4);
  const nextLevelXp = xpForLevel(level);
  const xpProgress = Math.min(100, Math.round((xp / nextLevelXp) * 100));

  return (
    <motion.aside
      initial={{ x: 20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="w-[290px] shrink-0 hidden xl:block"
    >
      <div className="sticky top-6 space-y-4">
        {/* Reading Progress - Premium Glass Card */}
        <div className="relative rounded-3xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.05] via-transparent to-secondary/[0.03]" />
          <div className="relative bg-[hsl(220,30%,11%)] border border-white/[0.08] rounded-3xl p-6 shadow-2xl shadow-black/30">
            <div className="flex items-center justify-between mb-5">
              <h4 className="font-display text-[10px] font-bold text-foreground/40 uppercase tracking-[0.2em]">Reading</h4>
              <div className="flex items-center gap-1.5 text-foreground/30 text-[10px] font-body">
                <Clock className="w-3 h-3" />
                ~{estimatedMinutes}min
              </div>
            </div>
            
            {/* Animated Progress Ring */}
            <div className="flex items-center justify-center mb-5">
              <div className="relative w-32 h-32">
                {/* Outer glow */}
                <div className="absolute inset-2 rounded-full bg-gradient-to-br from-primary/[0.05] to-secondary/[0.03]" />
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="6" />
                  <motion.circle
                    cx="50" cy="50" r="40" fill="none"
                    stroke="url(#progressGrad3)"
                    strokeWidth="6"
                    strokeLinecap="round"
                    initial={{ strokeDasharray: `0 252` }}
                    animate={{ strokeDasharray: `${pageProgress * 2.52} ${252 - pageProgress * 2.52}` }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  />
                  <defs>
                    <linearGradient id="progressGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="hsl(200,100%,50%)" />
                      <stop offset="50%" stopColor="hsl(260,80%,60%)" />
                      <stop offset="100%" stopColor="hsl(145,80%,50%)" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <motion.span
                    key={pageProgress}
                    initial={{ scale: 1.4, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="font-display text-3xl font-bold text-foreground"
                  >
                    {pageProgress}%
                  </motion.span>
                  <span className="text-[10px] text-foreground/30 font-body mt-0.5">Page {currentPage + 1} of {totalPages}</span>
                </div>
              </div>
            </div>

            {/* Page indicator dots */}
            <div className="flex items-center justify-center gap-1.5 flex-wrap">
              {Array.from({ length: totalPages }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.05 }}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    i === currentPage
                      ? "bg-gradient-to-r from-primary to-secondary scale-125 shadow-md shadow-primary/30"
                      : i < currentPage
                      ? "bg-neon-green/40"
                      : "bg-white/[0.06]"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* XP & Level Card */}
        <div className="relative rounded-3xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-neon-green/[0.04] via-transparent to-neon-blue/[0.03]" />
          <div className="relative bg-[hsl(220,30%,11%)] border border-white/[0.08] rounded-3xl p-6 shadow-2xl shadow-black/30">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-display text-[10px] font-bold text-foreground/40 uppercase tracking-[0.2em]">Your Level</h4>
              <span className="text-2xl">{xpLevelEmoji(level)}</span>
            </div>

            {/* Level badge */}
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-neon-green/20 to-neon-blue/15 border border-neon-green/15 flex flex-col items-center justify-center shadow-xl shadow-neon-green/5">
                <span className="font-display text-xl font-bold text-neon-green">{level}</span>
                <span className="text-[8px] font-body text-foreground/30 uppercase">Level</span>
              </div>
              <div>
                <div className="font-display text-sm font-bold text-neon-green mb-0.5">{xpLevelTitle(level)}</div>
                <div className="flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-neon-orange" />
                  <span className="font-display text-base font-bold text-foreground">{xp}</span>
                  <span className="text-[10px] text-foreground/30 font-body">XP</span>
                </div>
              </div>
            </div>

            {/* XP progress to next level */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-body text-foreground/30">Progress to Level {level + 1}</span>
                <span className="text-[10px] font-display font-bold text-foreground/50">{xp}/{nextLevelXp}</span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/[0.05] overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${xpProgress}%` }}
                  transition={{ duration: 1, delay: 0.3 }}
                  className="h-full rounded-full bg-gradient-to-r from-neon-green via-neon-blue to-primary"
                />
              </div>
            </div>

            {/* XP Reward */}
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-neon-green/[0.06] to-neon-blue/[0.03] border border-neon-green/10">
              <div className="w-9 h-9 rounded-xl bg-neon-green/15 flex items-center justify-center shadow-md shadow-neon-green/10">
                <Gift className="w-4 h-4 text-neon-green" />
              </div>
              <div>
                <div className="text-xs font-body font-bold text-neon-green flex items-center gap-1">+50 XP <Sparkle /></div>
                <div className="text-[10px] text-foreground/30 font-body">on completion</div>
              </div>
            </div>
          </div>
        </div>

        {/* Module Progress */}
        <div className="relative rounded-3xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] via-transparent to-neon-purple/[0.03]" />
          <div className="relative bg-[hsl(220,30%,11%)] border border-white/[0.08] rounded-3xl p-6 shadow-2xl shadow-black/30">
            <h4 className="font-display text-[10px] font-bold text-foreground/40 uppercase tracking-[0.2em] mb-4">Module Progress</h4>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-primary" />
                <span className="text-xs font-body font-bold text-foreground/70">{moduleCompletedTopics}/{moduleTotalTopics} topics</span>
              </div>
              <span className="text-sm font-display font-bold text-primary">{moduleProgress}%</span>
            </div>
            <div className="w-full h-3 rounded-full bg-white/[0.04] overflow-hidden mb-3">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${moduleProgress}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full rounded-full bg-gradient-to-r from-primary via-secondary to-neon-green shadow-lg shadow-primary/20"
              />
            </div>
            
            {/* Topic dots grid */}
            <div className="flex flex-wrap gap-1.5 mb-2">
              {Array.from({ length: moduleTotalTopics }).map((_, i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-md transition-all duration-300 ${
                    i < moduleCompletedTopics
                      ? "bg-neon-green/40 shadow-sm shadow-neon-green/20"
                      : "bg-white/[0.04]"
                  }`}
                />
              ))}
            </div>

            {moduleProgress === 100 && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-gradient-to-r from-neon-green/[0.08] to-neon-blue/[0.05] border border-neon-green/15 mt-3"
              >
                <Trophy className="w-5 h-5 text-neon-green" />
                <span className="text-xs font-body text-neon-green font-bold">Module Complete! 🎉</span>
              </motion.div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="space-y-2.5 pt-1">
          {isLastPage ? (
            <Button
              onClick={onToggleComplete}
              className={`w-full gap-2.5 rounded-2xl h-13 font-body font-bold text-sm transition-all duration-500 ${
                isCompleted
                  ? "bg-neon-green/15 text-neon-green border-2 border-neon-green/30 hover:bg-neon-green/25 shadow-xl shadow-neon-green/10 hover:shadow-neon-green/20"
                  : "bg-gradient-to-r from-primary via-secondary to-neon-purple text-white hover:opacity-90 shadow-2xl shadow-primary/30 hover:shadow-primary/50 hover:scale-[1.02]"
              }`}
            >
              {isCompleted ? (
                <><CheckCircle2 className="w-5 h-5" /> Completed ✓</>
              ) : (
                <><Award className="w-5 h-5" /> Mark as Complete</>
              )}
            </Button>
          ) : (
            <Button
              onClick={onNextPage}
              className="w-full gap-2.5 rounded-2xl h-13 bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90 font-body font-bold text-sm shadow-2xl shadow-primary/30 hover:shadow-primary/50 hover:scale-[1.02] transition-all duration-500"
            >
              Next Page <ArrowRight className="w-4 h-4" />
            </Button>
          )}
          <Button
            onClick={onPrevPage}
            disabled={isFirstPage}
            variant="ghost"
            className="w-full gap-2 rounded-2xl h-11 text-foreground/30 hover:text-foreground/60 disabled:opacity-10 font-body text-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Previous Page
          </Button>
        </div>
      </div>
    </motion.aside>
  );
};

// Small sparkle animation
const Sparkle = () => (
  <motion.span
    animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
    className="inline-block"
  >
    ✨
  </motion.span>
);

export default TopicProgressPanel;
