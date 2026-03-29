import { motion } from "framer-motion";
import { Code, Terminal, Gamepad2, Palette, Coffee, Paintbrush, FileText, Table2, Presentation, ImageIcon, PenTool, LayoutDashboard } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useSearchParams } from "react-router-dom";
import {
  HtmlEditor, PythonEditor, JavaEditor, MsPaintEditor, MsWordEditor,
  MsExcelEditor, MsPowerPointEditor, GimpEditor, KritaEditor, ScratchEditor, ScratchJrEditor, CanvaEditor,
} from "@/components/coding-lab/editors";

const ALL_EDITORS = ["html", "python", "java", "scratch", "scratchjr", "mspaint", "krita", "msword", "msexcel", "mspowerpoint", "gimp", "canva"];

const editorMeta: Record<string, { label: string; icon: React.ElementType; component: React.FC }> = {
  html:          { label: "HTML/CSS/JS",    icon: Code,         component: HtmlEditor },
  python:        { label: "Python",         icon: Terminal,     component: PythonEditor },
  java:          { label: "Java",           icon: Coffee,       component: JavaEditor },
  scratch:       { label: "Scratch",        icon: Gamepad2,     component: ScratchEditor },
  scratchjr:     { label: "Scratch Jr",     icon: Palette,      component: ScratchJrEditor },
  mspaint:       { label: "MS Paint",       icon: Paintbrush,   component: MsPaintEditor },
  msword:        { label: "MS Word",        icon: FileText,     component: MsWordEditor },
  msexcel:       { label: "MS Excel",       icon: Table2,       component: MsExcelEditor },
  mspowerpoint:  { label: "PowerPoint",     icon: Presentation, component: MsPowerPointEditor },
  gimp:          { label: "GIMP",           icon: ImageIcon,    component: GimpEditor },
  krita:         { label: "Krita",          icon: PenTool,      component: KritaEditor },
  canva:         { label: "Design",         icon: LayoutDashboard, component: CanvaEditor },
};

const TeacherCodingLab = () => {
  const [searchParams] = useSearchParams();
  const editorFromUrl = searchParams.get("editor");
  const defaultEditor = editorFromUrl && ALL_EDITORS.includes(editorFromUrl) ? editorFromUrl : ALL_EDITORS[0];

  return (
    <div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="font-display text-3xl font-bold mb-1"><span className="text-gradient-brand">Coding Lab</span></h1>
        <p className="text-white/60 font-body mb-6">All editors & tools available for teaching</p>
      </motion.div>

      <Tabs defaultValue={defaultEditor} key={defaultEditor} className="w-full">
        <TabsList className="bg-white/5 border border-white/10 mb-6 flex-wrap h-auto gap-1 p-1">
          {ALL_EDITORS.map((key) => {
            const meta = editorMeta[key];
            if (!meta) return null;
            const Icon = meta.icon;
            return (
              <TabsTrigger key={key} value={key} className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary text-white/60 font-body gap-1">
                <Icon className="w-3.5 h-3.5" /> {meta.label}
              </TabsTrigger>
            );
          })}
        </TabsList>

        {ALL_EDITORS.map((key) => {
          const meta = editorMeta[key];
          if (!meta) return null;
          const Comp = meta.component;
          return (
            <TabsContent key={key} value={key}>
              <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
                <Comp />
              </motion.div>
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
};

export default TeacherCodingLab;
