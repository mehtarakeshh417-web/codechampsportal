// "Activity Time" page with expandable cards.
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Wand2, Target } from "lucide-react";
import type { ActivityItem } from "@/lib/curriculum/types";
import { cn } from "@/lib/utils";

export default function ActivitiesPage({ items }: { items: ActivityItem[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="space-y-5">
      <header>
        <h2 className="font-display text-xl sm:text-2xl font-bold text-foreground mb-1 flex items-center gap-2">
          <Wand2 className="w-5 h-5 text-fuchsia-400" /> Activity Time
        </h2>
        <p className="text-sm text-foreground/60">
          Try these hands-on activities to lock in what you've learned.
        </p>
      </header>

      <div className="space-y-3">
        {items.map((a, i) => {
          const isOpen = open === i;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className={cn(
                "rounded-2xl border transition-colors overflow-hidden",
                isOpen
                  ? "border-fuchsia-400/40 bg-gradient-to-br from-fuchsia-500/10 to-cyan-500/10"
                  : "border-white/10 bg-white/[0.03]",
              )}
            >
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="w-full flex items-center justify-between gap-3 p-4 text-left"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="shrink-0 w-9 h-9 rounded-xl bg-fuchsia-400/20 text-fuchsia-300 flex items-center justify-center text-sm font-bold">
                    {i + 1}
                  </span>
                  <h4 className="font-display font-bold text-foreground truncate">
                    {a.title}
                  </h4>
                </div>
                <ChevronDown
                  className={cn(
                    "w-4 h-4 text-foreground/50 transition-transform shrink-0",
                    isOpen && "rotate-180",
                  )}
                />
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 space-y-3">
                      <ol className="space-y-2">
                        {a.steps.map((s, j) => (
                          <li
                            key={j}
                            className="flex gap-3 text-sm text-foreground/85"
                          >
                            <span className="shrink-0 w-6 h-6 rounded-md bg-white/10 text-foreground/70 text-[11px] font-bold flex items-center justify-center">
                              {j + 1}
                            </span>
                            <span className="leading-relaxed">{s}</span>
                          </li>
                        ))}
                      </ol>
                      {a.expectedOutcome && (
                        <div className="rounded-xl border border-emerald-400/25 bg-emerald-500/10 p-3 flex gap-2 items-start">
                          <Target className="w-4 h-4 text-emerald-300 shrink-0 mt-0.5" />
                          <p className="text-xs text-emerald-100/85 leading-relaxed">
                            <span className="font-semibold">Expected outcome:</span>{" "}
                            {a.expectedOutcome}
                          </p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
