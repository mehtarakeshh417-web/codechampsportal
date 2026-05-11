import { useMemo } from "react";
import { motion } from "framer-motion";
import { Code, Terminal, Gamepad2, Palette, Coffee, Paintbrush, FileText, Table2, Presentation } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { useSearchParams } from "react-router-dom";
import {
  HtmlEditor, PythonEditor, JavaEditor, MsPaintEditor, MsWordEditor,
  MsExcelEditor, MsPowerPointEditor, ScratchEditor, ScratchJrEditor,
  WordProEditor, ExcelProEditor, PowerPointProEditor,
} from "@/components/coding-lab/editors";

const getAvailableEditors = (className?: string): string[] => {
  if (!className) return ["scratchjr"];
  const numMatch = className.match(/(\d+)/);
  const classNum = numMatch ? parseInt(numMatch[1]) : 1;

  if (classNum <= 2) return ["scratchjr", "mspaint"];
  if (classNum <= 4) return ["scratch", "scratchjr", "mspaint", "msword", "word2"];
  if (classNum <= 5) return ["scratch", "scratchjr", "python", "html", "java", "mspaint", "msword", "msexcel", "mspowerpoint", "word2", "excel2", "ppt2"];
  return ["html", "python", "java", "scratch", "mspaint", "msword", "msexcel", "mspowerpoint", "word2", "excel2", "ppt2"];
};

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
  word2:         { label: "Word 2",         icon: FileText,     component: WordProEditor },
  excel2:        { label: "Excel 2",        icon: Table2,       component: ExcelProEditor },
  ppt2:          { label: "PPT 2",          icon: Presentation, component: PowerPointProEditor },
};

const StudentCodingLab = () => {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const editors = useMemo(() => getAvailableEditors(user?.className), [user?.className]);
  const editorFromUrl = searchParams.get("editor");
  const defaultEditor = editorFromUrl && editors.includes(editorFromUrl) ? editorFromUrl : editors[0];

  return (
    <div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="font-display text-3xl font-bold mb-1 text-white"><span className="text-gradient-brand">Coding Lab</span></h1>
        <p className="text-white/60 font-body mb-6">Practice coding with real compilers & editors</p>
      </motion.div>

      <Tabs defaultValue={defaultEditor} key={defaultEditor} className="w-full">
        <TabsList className="bg-white/5 border border-white/10 mb-6 flex-wrap h-auto gap-1 p-1">
          {editors.map((key) => {
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

        {editors.map((key) => {
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

export default StudentCodingLab;
