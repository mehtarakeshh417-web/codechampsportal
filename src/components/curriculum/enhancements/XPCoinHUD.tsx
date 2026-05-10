// Animated XP + coin counter (header HUD).
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Coins, Flame } from "lucide-react";

export default function XPCoinHUD({
  xp, coins, streak,
}: { xp: number; coins: number; streak: number }) {
  return (
    <div className="flex items-center gap-1.5 text-[11px] font-bold">
      <Pill icon={<Sparkles className="w-3 h-3" />} value={xp} color="text-cyan-300" border="border-cyan-400/30 bg-cyan-400/10" />
      <Pill icon={<Coins className="w-3 h-3" />} value={coins} color="text-amber-300" border="border-amber-400/30 bg-amber-400/10" />
      {streak > 0 && (
        <Pill icon={<Flame className="w-3 h-3 streak-glow" />} value={`${streak}d`} color="text-orange-300" border="border-orange-400/30 bg-orange-400/10" />
      )}
    </div>
  );
}

function Pill({
  icon, value, color, border,
}: { icon: React.ReactNode; value: number | string; color: string; border: string }) {
  return (
    <span className={`flex items-center gap-1 px-2 py-1 rounded-full border ${border} ${color}`}>
      {icon}
      <AnimatePresence mode="popLayout">
        <motion.span
          key={String(value)}
          initial={{ y: -6, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 6, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
