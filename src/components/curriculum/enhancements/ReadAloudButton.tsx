// Read-aloud control using browser speechSynthesis.
import { useEffect, useState } from "react";
import { Volume2, Pause, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const supported = () => typeof window !== "undefined" && "speechSynthesis" in window;

export default function ReadAloudButton({
  text,
  label = "Read aloud",
  className,
}: {
  text: string;
  label?: string;
  className?: string;
}) {
  const [state, setState] = useState<"idle" | "playing" | "paused">("idle");

  useEffect(() => () => { if (supported()) speechSynthesis.cancel(); }, []);

  if (!supported() || !text.trim()) return null;

  const start = () => {
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 0.95; u.pitch = 1.05;
    const v = speechSynthesis.getVoices().find((v) => /child|female|google uk|samantha/i.test(v.name));
    if (v) u.voice = v;
    u.onend = () => setState("idle");
    speechSynthesis.speak(u);
    setState("playing");
  };

  const toggle = () => {
    if (state === "idle") return start();
    if (state === "playing") { speechSynthesis.pause(); setState("paused"); return; }
    speechSynthesis.resume(); setState("playing");
  };

  const stop = () => { speechSynthesis.cancel(); setState("idle"); };

  return (
    <div className={cn("inline-flex items-center gap-1.5", className)}>
      <Button
        size="sm" variant="outline"
        onClick={toggle}
        className={cn("h-8 gap-1.5 text-xs", state !== "idle" && "border-primary/40 text-primary")}
      >
        {state === "playing" ? <Pause className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
        {state === "idle" ? label : state === "playing" ? "Pause" : "Resume"}
      </Button>
      {state !== "idle" && (
        <Button size="icon" variant="ghost" onClick={stop} className="h-8 w-8" aria-label="Stop">
          <Square className="w-3.5 h-3.5" />
        </Button>
      )}
    </div>
  );
}
