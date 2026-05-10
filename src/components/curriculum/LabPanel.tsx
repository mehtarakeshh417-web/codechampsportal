// Lazy-loaded lab redirect panel. Deep-links to existing Coding Lab editors
// instead of bundling Monaco / canvas editors into every topic page.

import { Beaker, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import type { LabType } from "@/lib/curriculum/types";

const LAB_INFO: Record<Exclude<LabType, "none">, { name: string; emoji: string; route: string; query: string }> = {
  python:  { name: "Python Editor",     emoji: "🐍", route: "/dashboard/coding-lab", query: "?editor=python" },
  html:    { name: "HTML/CSS Editor",   emoji: "🌐", route: "/dashboard/coding-lab", query: "?editor=html" },
  scratch: { name: "Scratch-like Editor", emoji: "🟧", route: "/dashboard/coding-lab", query: "?editor=scratch" },
  paint:   { name: "Paint Editor",      emoji: "🎨", route: "/dashboard/coding-lab", query: "?editor=paint" },
  sheets:  { name: "Spreadsheet",       emoji: "📊", route: "/dashboard/coding-lab", query: "?editor=sheets" },
  word:    { name: "Document Editor",   emoji: "📝", route: "/dashboard/coding-lab", query: "?editor=word" },
};

interface Props {
  labType: LabType;
  starterCode?: string;
  instructions?: string;
}

const LabPanel = ({ labType, starterCode, instructions }: Props) => {
  if (labType === "none") return null;
  const info = LAB_INFO[labType];

  return (
    <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-primary/[0.05] to-secondary/[0.04] p-6">
      <div className="flex items-start gap-4 mb-4">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/30 to-secondary/20 flex items-center justify-center text-3xl">
          {info.emoji}
        </div>
        <div className="flex-1">
          <h3 className="font-display text-lg font-bold text-foreground">{info.name}</h3>
          <p className="text-sm text-foreground/60 mt-1">
            {instructions ?? "Open the editor in a focused workspace to practice this topic."}
          </p>
        </div>
      </div>

      {starterCode && (
        <div className="mb-4">
          <div className="text-xs text-foreground/40 uppercase tracking-wider mb-2">Starter code</div>
          <pre className="text-xs bg-black/40 border border-white/10 rounded-xl p-3 overflow-auto max-h-64 font-mono text-foreground/80">
            {starterCode}
          </pre>
        </div>
      )}

      <Button asChild className="gap-2">
        <Link to={info.route + info.query}>
          <Beaker className="w-4 h-4" />
          Open {info.name}
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </Button>
    </div>
  );
};

export default LabPanel;
