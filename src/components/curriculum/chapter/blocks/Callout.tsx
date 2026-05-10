// Reusable colorful callout used inside learn pages.
import { Lightbulb, AlertTriangle, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const STYLES = {
  tip: {
    icon: Lightbulb,
    label: "Did You Know?",
    wrap: "from-amber-500/15 to-yellow-400/10 border-amber-400/30",
    badge: "bg-amber-400/20 text-amber-300",
  },
  important: {
    icon: AlertTriangle,
    label: "Important",
    wrap: "from-rose-500/15 to-orange-400/10 border-rose-400/30",
    badge: "bg-rose-400/20 text-rose-300",
  },
  fun: {
    icon: Sparkles,
    label: "Fun Fact",
    wrap: "from-fuchsia-500/15 to-cyan-400/10 border-fuchsia-400/30",
    badge: "bg-fuchsia-400/20 text-fuchsia-300",
  },
} as const;

export default function Callout({
  tone = "tip",
  text,
}: {
  tone?: "tip" | "important" | "fun";
  text: string;
}) {
  const s = STYLES[tone];
  const Icon = s.icon;
  return (
    <div
      className={cn(
        "rounded-2xl border bg-gradient-to-br p-4 sm:p-5 flex gap-3 items-start",
        s.wrap,
      )}
    >
      <div
        className={cn(
          "shrink-0 w-9 h-9 rounded-xl flex items-center justify-center",
          s.badge,
        )}
      >
        <Icon className="w-4 h-4" />
      </div>
      <div className="min-w-0">
        <div className="text-[11px] font-bold uppercase tracking-wider text-foreground/70 mb-1">
          {s.label}
        </div>
        <p className="text-sm text-foreground/85 leading-relaxed">{text}</p>
      </div>
    </div>
  );
}
