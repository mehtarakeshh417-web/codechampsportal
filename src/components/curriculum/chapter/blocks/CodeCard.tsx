// Code-style card used when a learn block contains code-ish content.
import { Code2, Beaker } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CodeCard({
  body,
  bullets,
  onTryInLab,
}: {
  body: string;
  bullets?: string[];
  onTryInLab?: () => void;
}) {
  const lines = [body, ...(bullets ?? [])].filter(Boolean).join("\n");
  return (
    <div className="rounded-2xl overflow-hidden border border-emerald-400/25 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10">
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-black/20">
        <div className="flex items-center gap-2 text-xs text-emerald-300 font-mono">
          <Code2 className="w-3.5 h-3.5" /> code.example
        </div>
        {onTryInLab && (
          <Button
            size="sm"
            variant="outline"
            onClick={onTryInLab}
            className="h-7 gap-1.5 text-[11px] border-emerald-400/40 text-emerald-200 hover:bg-emerald-400/10"
          >
            <Beaker className="w-3 h-3" /> Try in Lab
          </Button>
        )}
      </div>
      <pre className="px-4 py-4 text-xs sm:text-sm text-emerald-100/90 font-mono whitespace-pre-wrap leading-relaxed overflow-x-auto">
        {lines}
      </pre>
    </div>
  );
}
