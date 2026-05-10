// Header toolbar: theme switcher, focus toggle, sound toggle, print, dyslexic font.
import { Eye, EyeOff, Volume2, VolumeX, Printer, Palette, Type } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ThemeName } from "./useLocalGameState";

const THEMES: { id: ThemeName; label: string; swatch: string }[] = [
  { id: "cyber", label: "Cyber",  swatch: "from-cyan-400 to-violet-500" },
  { id: "candy", label: "Candy",  swatch: "from-pink-400 to-amber-300"  },
  { id: "space", label: "Space",  swatch: "from-indigo-500 to-fuchsia-600" },
];

export default function ChapterToolbar({
  theme, soundOn, focusMode, dyslexic,
  onTheme, onSound, onFocus, onDyslexic,
}: {
  theme: ThemeName;
  soundOn: boolean;
  focusMode: boolean;
  dyslexic: boolean;
  onTheme: (t: ThemeName) => void;
  onSound: (v: boolean) => void;
  onFocus: (v: boolean) => void;
  onDyslexic: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center gap-1.5">
      {/* Theme swatches */}
      <div className="hidden sm:flex items-center gap-1 px-1 py-1 rounded-full border border-white/10 bg-white/[0.04]">
        <Palette className="w-3 h-3 text-foreground/40 ml-1" />
        {THEMES.map((t) => (
          <button
            key={t.id}
            onClick={() => onTheme(t.id)}
            title={`Theme: ${t.label}`}
            className={cn(
              "w-5 h-5 rounded-full bg-gradient-to-br ring-2 transition-all",
              t.swatch,
              theme === t.id ? "ring-white/80 scale-110" : "ring-transparent",
            )}
          />
        ))}
      </div>

      <ToolBtn active={dyslexic} onClick={() => onDyslexic(!dyslexic)} title="Dyslexia-friendly font">
        <Type className="w-3.5 h-3.5" />
      </ToolBtn>
      <ToolBtn active={soundOn} onClick={() => onSound(!soundOn)} title="Sound effects">
        {soundOn ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
      </ToolBtn>
      <ToolBtn active={focusMode} onClick={() => onFocus(!focusMode)} title="Focus / Reading mode">
        {focusMode ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
      </ToolBtn>
      <ToolBtn onClick={() => window.print()} title="Print chapter">
        <Printer className="w-3.5 h-3.5" />
      </ToolBtn>
    </div>
  );
}

function ToolBtn({
  children, onClick, active, title,
}: { children: React.ReactNode; onClick: () => void; active?: boolean; title: string }) {
  return (
    <button
      title={title}
      onClick={onClick}
      className={cn(
        "w-8 h-8 rounded-lg border flex items-center justify-center transition-colors",
        active
          ? "bg-primary/20 border-primary/40 text-primary"
          : "bg-white/[0.04] border-white/10 text-foreground/60 hover:text-foreground hover:bg-white/[0.08]",
      )}
    >
      {children}
    </button>
  );
}
