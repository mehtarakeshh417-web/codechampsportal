import { useState, useRef, useEffect } from "react";
import { Play, RotateCcw, Maximize2, Minimize2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import SimulatedWordEditor from "./SimulatedWordEditor";
import SimulatedExcelEditor from "./SimulatedExcelEditor";
import JSpreadsheetExcel from "./JSpreadsheetExcel";
import SimulatedPowerPointEditor from "./SimulatedPowerPointEditor";
import SimulatedGimpEditor from "./SimulatedGimpEditor";
import SimulatedKritaEditor from "./SimulatedKritaEditor";

// Helper to download a blob
const downloadFile = (content: string, filename: string, mimeType: string) => {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  toast.success(`Saved ${filename} to your downloads!`);
};

// Fullscreen wrapper for all editors
const EditorWrapper = ({
  children,
  title,
  onSave,
}: {
  children: React.ReactNode;
  title: string;
  onSave?: () => void;
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      containerRef.current?.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  };

  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", handler);
    return () => document.removeEventListener("fullscreenchange", handler);
  }, []);

  return (
    <div ref={containerRef} className={`relative ${isFullscreen ? "bg-[hsl(var(--background))]" : ""}`}>
      <div className="absolute top-2 right-2 z-20 flex gap-2">
        {onSave && (
          <Button
            size="sm"
            variant="ghost"
            onClick={onSave}
            className="bg-black/60 hover:bg-black/80 text-white/80 hover:text-white backdrop-blur-sm text-xs gap-1"
          >
            <Download className="w-3.5 h-3.5" />
            Save to Local
          </Button>
        )}
        <Button
          size="sm"
          variant="ghost"
          onClick={toggleFullscreen}
          className="bg-black/60 hover:bg-black/80 text-white/80 hover:text-white backdrop-blur-sm text-xs gap-1"
        >
          {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          {isFullscreen ? "Exit" : "Fullscreen"}
        </Button>
      </div>
      {children}
    </div>
  );
};

// Open editor in a new popup window
export const openEditorPopup = (url: string, title: string) => {
  const w = Math.min(1200, window.screen.width - 100);
  const h = Math.min(800, window.screen.height - 100);
  const left = (window.screen.width - w) / 2;
  const top = (window.screen.height - h) / 2;
  window.open(url, title, `width=${w},height=${h},left=${left},top=${top},toolbar=no,menubar=no`);
};

// HTML/CSS/JS Editor
export const HtmlEditor = () => {
  const [html, setHtml] = useState("<!DOCTYPE html>\n<html>\n<head>\n  <style>\n    body { font-family: Arial; text-align: center; padding: 40px; background: #f0f8ff; }\n    h1 { color: #2563eb; }\n  </style>\n</head>\n<body>\n  <h1>Hello, World!</h1>\n  <p>Edit this code and click Run!</p>\n</body>\n</html>");
  const [output, setOutput] = useState("");

  const handleSave = () => downloadFile(html, "index.html", "text/html");

  return (
    <EditorWrapper title="HTML/CSS/JS Editor" onSave={handleSave}>
      <div className="grid md:grid-cols-2 gap-4 h-[500px]">
        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-white/50 font-body uppercase tracking-wider">HTML / CSS / JS Editor</span>
            <div className="flex gap-2">
              <Button size="sm" variant="ghost" onClick={() => { setHtml("<!DOCTYPE html>\n<html>\n<body>\n  <h1>Hello!</h1>\n</body>\n</html>"); setOutput(""); }} className="text-white/40 hover:text-white"><RotateCcw className="w-3.5 h-3.5 mr-1" /> Reset</Button>
              <Button size="sm" onClick={() => setOutput(html)} className="bg-neon-green/20 text-neon-green border border-neon-green/30 hover:bg-neon-green/30"><Play className="w-3.5 h-3.5 mr-1" /> Run</Button>
            </div>
          </div>
          <textarea value={html} onChange={(e) => setHtml(e.target.value)} className="flex-1 bg-[hsl(220,30%,10%)] border border-white/10 rounded-xl p-4 font-mono text-sm text-neon-green resize-none focus:outline-none focus:border-primary/50" spellCheck={false} />
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-white/50 font-body uppercase tracking-wider mb-2">Preview</span>
          <div className="flex-1 bg-white rounded-xl overflow-hidden">
            {output ? <iframe srcDoc={output} className="w-full h-full border-0" title="HTML Preview" sandbox="allow-scripts" /> : <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">Click "Run" to see output</div>}
          </div>
        </div>
      </div>
    </EditorWrapper>
  );
};

// Python Compiler (OneCompiler embed)
export const PythonEditor = () => (
  <EditorWrapper title="Python Compiler">
    <div className="h-[600px] rounded-xl overflow-hidden border border-white/10">
      <iframe
        src="https://onecompiler.com/embed/python?theme=dark"
        className="w-full h-full border-0"
        title="Python Compiler"
        allow="clipboard-read; clipboard-write"
        sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
      />
    </div>
  </EditorWrapper>
);

// Java Compiler (OneCompiler embed)
export const JavaEditor = () => (
  <EditorWrapper title="Java Compiler">
    <div className="h-[600px] rounded-xl overflow-hidden border border-white/10">
      <iframe
        src="https://onecompiler.com/embed/java?theme=dark"
        className="w-full h-full border-0"
        title="Java Compiler"
        allow="clipboard-read; clipboard-write"
        sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
      />
    </div>
  </EditorWrapper>
);

// MS Paint (paint.js.org - open source MS Paint clone using Web Components)
export const MsPaintEditor = () => (
  <EditorWrapper title="MS Paint">
    <div className="h-[650px] rounded-xl overflow-hidden border border-white/10 bg-white">
      <iframe
        src="https://paint.js.org/"
        className="w-full h-full border-0"
        title="MS Paint (paint.js.org)"
        allow="clipboard-read; clipboard-write; camera"
        sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-modals allow-downloads"
        loading="lazy"
      />
    </div>
  </EditorWrapper>
);

// MS Word Editor - Simulated with save
export const MsWordEditor = () => {
  const handleSave = () => {
    const editor = document.querySelector('[contenteditable="true"]') as HTMLElement;
    if (!editor) { toast.error("No content to save"); return; }
    const content = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Document</title><style>body{font-family:Calibri,sans-serif;padding:40px;max-width:800px;margin:auto;}</style></head><body>${editor.innerHTML}</body></html>`;
    downloadFile(content, "document.html", "text/html");
  };

  return (
    <EditorWrapper title="MS Word Editor" onSave={handleSave}>
      <SimulatedWordEditor />
    </EditorWrapper>
  );
};

// MS Excel Editor - JSpreadsheet with white Excel theme
export const MsExcelEditor = () => (
  <EditorWrapper title="MS Excel Editor">
    <JSpreadsheetExcel />
  </EditorWrapper>
);

// MS PowerPoint Editor - Simulated
export const MsPowerPointEditor = () => (
  <EditorWrapper title="MS PowerPoint Editor">
    <SimulatedPowerPointEditor />
  </EditorWrapper>
);

// GIMP Editor - Simulated
export const GimpEditor = () => (
  <EditorWrapper title="GIMP Editor">
    <SimulatedGimpEditor />
  </EditorWrapper>
);

// Krita Editor - Simulated
export const KritaEditor = () => (
  <EditorWrapper title="Krita Editor">
    <SimulatedKritaEditor />
  </EditorWrapper>
);

// Block Coding Editor (PenguinMod - Scratch-like block programming)
export const ScratchEditor = () => (
  <EditorWrapper title="Block Coding Editor">
    <div className="h-[600px] rounded-xl overflow-hidden border border-white/10">
      <iframe
        src="https://studio.penguinmod.com/editor.html"
        className="w-full h-full border-0"
        title="Block Coding Editor (PenguinMod)"
        allow="clipboard-read; clipboard-write; microphone; camera"
        sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-modals"
      />
    </div>
  </EditorWrapper>
);

// Scratch Jr
export const ScratchJrEditor = () => (
  <EditorWrapper title="Scratch Jr">
    <div className="space-y-4">
      <div className="h-[600px] rounded-xl overflow-hidden border border-white/10">
        <iframe
          src="https://codejr.org/scratchjr/index.html"
          className="w-full h-full border-0"
          title="Scratch Jr Editor"
          allow="clipboard-read; clipboard-write"
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
        />
      </div>
      <p className="text-white/40 text-xs font-body text-center">Powered by CodeJr.org — a free Scratch Jr web editor</p>
    </div>
  </EditorWrapper>
);

// Design Editor (Polotno Studio - free Canva alternative, no login required)
export const CanvaEditor = () => (
  <EditorWrapper title="Design Editor">
    <div className="h-[650px] rounded-xl overflow-hidden border border-white/10 bg-white">
      <iframe
        src="https://studio.polotno.com/"
        className="w-full h-full border-0"
        title="Design Editor (Polotno Studio)"
        allow="clipboard-read; clipboard-write"
        sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-modals allow-downloads allow-popups-to-escape-sandbox"
        loading="lazy"
      />
    </div>
  </EditorWrapper>
);

// Editor URLs for popup opening
export const EDITOR_URLS: Record<string, { url: string; label: string }> = {
  html: { url: "about:blank", label: "HTML Editor" },
  python: { url: "https://onecompiler.com/python", label: "Python Compiler" },
  java: { url: "https://onecompiler.com/java", label: "Java Compiler" },
  scratch: { url: "https://studio.penguinmod.com/editor.html", label: "Block Coding Editor" },
  scratchjr: { url: "https://codejr.org/scratchjr/index.html", label: "Scratch Jr" },
  mspaint: { url: "https://paint.js.org/", label: "MS Paint" },
  msword: { url: "about:blank", label: "MS Word Editor" },
  msexcel: { url: "https://ethercalc.net/_new", label: "MS Excel Editor" },
  mspowerpoint: { url: "about:blank", label: "MS PowerPoint Editor" },
  gimp: { url: "about:blank", label: "GIMP Editor" },
  krita: { url: "about:blank", label: "Krita Editor" },
  canva: { url: "https://studio.polotno.com/", label: "Design Editor" },
};

// Re-export simulated editors
export { default as SimulatedWordEditor } from "./SimulatedWordEditor";
export { default as SimulatedExcelEditor } from "./SimulatedExcelEditor";
export { default as SimulatedPowerPointEditor } from "./SimulatedPowerPointEditor";
export { default as SimulatedGimpEditor } from "./SimulatedGimpEditor";
export { default as SimulatedKritaEditor } from "./SimulatedKritaEditor";
