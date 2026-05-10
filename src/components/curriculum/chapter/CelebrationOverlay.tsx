// Confetti + medal celebration shown when a chapter is completed.
import { useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Trophy, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const COLORS = [
  "bg-amber-400", "bg-fuchsia-400", "bg-cyan-400",
  "bg-emerald-400", "bg-rose-400", "bg-violet-400",
  "bg-orange-400", "bg-yellow-300", "bg-pink-400",
];

export default function CelebrationOverlay({
  open,
  onClose,
  title = "Chapter Complete!",
  subtitle = "+50 XP earned",
  badgeLabel = "Chapter Champion",
  gradient = "from-amber-400 to-orange-500",
}: {
  open: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  badgeLabel?: string;
  gradient?: string;
}) {
  // Auto-dismiss after a few seconds
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(onClose, 4500);
    return () => clearTimeout(t);
  }, [open, onClose]);

  const confetti = useMemo(
    () =>
      Array.from({ length: 80 }).map((_, i) => ({
        left: Math.random() * 100,
        delay: Math.random() * 0.6,
        duration: 2.4 + Math.random() * 2,
        color: COLORS[i % COLORS.length],
        rotate: Math.random() * 360,
      })),
    [open], // regen each open
  );

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto"
        onClick={onClose}
      />

      {/* Confetti */}
      <div className="absolute inset-0 overflow-hidden">
        {confetti.map((c, i) => (
          <span
            key={i}
            className={cn("confetti-dot", c.color)}
            style={{
              left: `${c.left}%`,
              animationDuration: `${c.duration}s`,
              animationDelay: `${c.delay}s`,
              transform: `rotate(${c.rotate}deg)`,
            }}
          />
        ))}
      </div>

      {/* Card */}
      <motion.div
        initial={{ scale: 0.8, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 220, damping: 18 }}
        className="relative pointer-events-auto w-[88vw] max-w-md"
      >
        <div
          className={cn(
            "relative overflow-hidden rounded-3xl border border-white/15 p-7 text-center bg-gradient-to-br shadow-2xl",
            gradient,
          )}
        >
          <div className="absolute inset-0 bg-black/55" />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-white/90 z-10"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="relative">
            <div className="badge-pop mx-auto w-24 h-24 rounded-full bg-gradient-to-br from-amber-300 to-orange-500 flex items-center justify-center shadow-[0_0_50px_rgba(251,191,36,0.55)]">
              <Trophy className="w-12 h-12 text-amber-50 drop-shadow" />
            </div>
            <div className="text-[11px] uppercase tracking-[0.25em] text-white/70 mt-5 mb-1 flex items-center justify-center gap-1.5">
              <Sparkles className="w-3 h-3" /> Achievement Unlocked
            </div>
            <h3 className="font-display text-2xl font-bold text-white">{title}</h3>
            <p className="text-sm text-white/85 mt-1">{subtitle}</p>

            <div className="badge-pop inline-flex items-center gap-2 mt-5 px-4 py-2 rounded-full bg-white/15 border border-white/20 text-white text-xs font-semibold">
              🏆 {badgeLabel}
            </div>

            <div className="mt-6">
              <Button
                onClick={onClose}
                size="lg"
                className="bg-white text-foreground hover:bg-white/90 font-semibold"
              >
                Continue Learning →
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
