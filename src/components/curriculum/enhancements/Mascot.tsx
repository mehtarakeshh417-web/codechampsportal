// Friendly mascot with a speech bubble. Variant by class number.
import { motion } from "framer-motion";

type Variant = "animal" | "robot" | "orb";
const variantFor = (classNumber: number): Variant =>
  classNumber <= 4 ? "animal" : classNumber <= 7 ? "robot" : "orb";

export default function Mascot({
  classNumber, message, gradient = "from-cyan-400 to-violet-500",
}: { classNumber: number; message: string; gradient?: string }) {
  const v = variantFor(classNumber);
  return (
    <div className="flex items-end gap-3">
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className={`shrink-0 w-16 h-16 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-3xl shadow-[0_8px_30px_-8px_rgba(0,0,0,0.5)]`}
        aria-hidden
      >
        {v === "animal" && "🦉"}
        {v === "robot" && "🤖"}
        {v === "orb" && "🪐"}
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: -8 }}
        animate={{ opacity: 1, x: 0 }}
        className="relative max-w-xs rounded-2xl border border-white/15 bg-white/[0.06] backdrop-blur px-4 py-2.5 text-sm text-foreground/90"
      >
        <span className="absolute -left-1.5 bottom-3 w-3 h-3 rotate-45 bg-white/[0.06] border-l border-b border-white/15" />
        {message}
      </motion.div>
    </div>
  );
}
