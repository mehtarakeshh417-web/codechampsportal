// "Recap" closing page with summary, objective checklist, and next CTA.
import { Trophy, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import type { TopicMeta } from "@/lib/curriculum/types";

export default function RecapPage({
  summary,
  objectives,
  gradient,
  classSlug,
  next,
  isCompleted,
  onComplete,
}: {
  summary: string;
  objectives: string[];
  gradient: string;
  classSlug: string;
  next?: TopicMeta;
  isCompleted: boolean;
  onComplete: () => void;
}) {
  return (
    <section className="space-y-6">
      <div
        className={cn(
          "relative overflow-hidden rounded-3xl border border-white/10 p-6 sm:p-8 bg-gradient-to-br",
          gradient,
        )}
      >
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative">
          <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/70 mb-2 flex items-center gap-2">
            <Trophy className="w-3.5 h-3.5" /> Chapter Complete
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white leading-tight mb-3">
            You finished this chapter! 🎉
          </h2>
          <p className="text-sm sm:text-base text-white/85 leading-relaxed">{summary}</p>
        </div>
      </div>

      <section>
        <h3 className="font-display text-lg font-bold text-foreground mb-3">
          🧠 What you can now do
        </h3>
        <ul className="space-y-2">
          {objectives.map((o, i) => (
            <li
              key={i}
              className="flex items-start gap-3 rounded-xl border border-emerald-400/25 bg-emerald-500/10 px-4 py-3"
            >
              <span className="shrink-0 w-6 h-6 rounded-full bg-emerald-400/30 text-emerald-200 text-xs flex items-center justify-center">
                ✓
              </span>
              <span className="text-sm text-foreground/85">{o}</span>
            </li>
          ))}
        </ul>
      </section>

      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          onClick={onComplete}
          size="lg"
          variant={isCompleted ? "outline" : "default"}
          className={cn(
            "flex-1 gap-2",
            isCompleted && "border-neon-green/40 text-neon-green",
          )}
        >
          <Trophy className="w-4 h-4" />
          {isCompleted ? "Marked Complete ✓" : "Mark Chapter Complete"}
        </Button>
        {next ? (
          <Button asChild size="lg" variant="secondary" className="flex-1 gap-2">
            <Link to={`/dashboard/curriculum/${classSlug}/${next.topicSlug}`}>
              Next: {next.title} <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        ) : (
          <Button asChild size="lg" variant="secondary" className="flex-1 gap-2">
            <Link to={`/dashboard/curriculum/${classSlug}`}>Back to Class</Link>
          </Button>
        )}
      </div>
    </section>
  );
}
