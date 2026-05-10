// Dashboard-top bar: streak flame + earned-badges shelf.
import { Flame, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

const ALL_BADGES: { id: string; emoji: string; label: string }[] = [
  { id: "first-chapter", emoji: "🌱", label: "First Chapter" },
  { id: "quiz-master",   emoji: "🏆", label: "Quiz Master" },
  { id: "lab-explorer",  emoji: "🧪", label: "Lab Explorer" },
  { id: "streak-3",      emoji: "🔥", label: "3-Day Streak" },
  { id: "streak-7",      emoji: "⚡", label: "7-Day Streak" },
  { id: "class-master",  emoji: "🎓", label: "Class Mastered" },
];

export default function StreakBadgesBar({
  streak, xp, coins, badges,
}: { streak: number; xp: number; coins: number; badges: string[] }) {
  return (
    <div className="glass-card p-4 mb-5 flex flex-col sm:flex-row sm:items-center gap-4">
      <div className="flex items-center gap-4 shrink-0">
        <div className={cn(
          "flex items-center gap-2 px-3 py-2 rounded-xl border",
          streak > 0
            ? "border-orange-400/30 bg-orange-400/10 text-orange-300"
            : "border-white/10 bg-white/[0.04] text-foreground/60",
        )}>
          <Flame className={cn("w-5 h-5", streak > 0 && "streak-glow")} />
          <div>
            <div className="text-lg font-bold leading-none">{streak}</div>
            <div className="text-[10px] uppercase tracking-wider opacity-80">day streak</div>
          </div>
        </div>
        <div className="hidden sm:block text-xs text-foreground/60">
          <span className="text-cyan-300 font-bold">{xp}</span> XP
          <span className="mx-2 opacity-30">·</span>
          <span className="text-amber-300 font-bold">{coins}</span> coins
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <div className="text-[10px] uppercase tracking-wider text-foreground/40 mb-1.5 flex items-center gap-1">
          <Trophy className="w-3 h-3" /> Trophy Shelf
        </div>
        <div className="flex flex-wrap gap-1.5">
          {ALL_BADGES.map((b) => {
            const earned = badges.includes(b.id);
            return (
              <span
                key={b.id}
                title={b.label}
                className={cn(
                  "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs border transition-all",
                  earned
                    ? "border-amber-400/40 bg-amber-400/10 text-amber-200 badge-pop"
                    : "border-white/10 bg-white/[0.03] text-foreground/35 grayscale opacity-60",
                )}
              >
                <span className="text-base">{b.emoji}</span>
                <span className="hidden sm:inline">{b.label}</span>
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
