import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Lightbulb, Maximize2, Sparkles, BookOpen, Rocket, CheckCircle2, XCircle, Play,
  AlertTriangle, Info, Cpu, Code2, Monitor, Zap, Brain, Eye, ArrowUp, ArrowDown,
  GripVertical, Table2, List, Shield
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ContentSection, Exercise } from "@/lib/class5Content";
import { EDITOR_URLS } from "@/components/coding-lab/editors";

// Determine best editor for a practice exercise
const getEditorForPractice = (question: string): string | null => {
  const q = question.toLowerCase();
  if (q.includes("ms word") || q.includes("word") || q.includes("document") || q.includes("letter") || q.includes("newsletter") || q.includes("invitation") || q.includes("report") || q.includes("card") || q.includes("format")) return "msword";
  if (q.includes("paint") || q.includes("draw") || q.includes("color") || q.includes("art") || q.includes("picture")) return "mspaint";
  if (q.includes("scratch") || q.includes("sprite") || q.includes("block") || q.includes("animation") || q.includes("game")) return "scratch";
  if (q.includes("python")) return "python";
  if (q.includes("html") || q.includes("web")) return "html";
  if (q.includes("java")) return "java";
  if (q.includes("excel") || q.includes("spreadsheet") || q.includes("cell")) return "msexcel";
  if (q.includes("powerpoint") || q.includes("slide") || q.includes("presentation")) return "mspowerpoint";
  if (q.includes("gimp") || q.includes("photo edit")) return "gimp";
  if (q.includes("krita") || q.includes("digital art") || q.includes("digital paint")) return "krita";
  return null;
};

// VIBRANT section color themes
const sectionThemes = [
  { accent: "from-primary/20 to-secondary/12", border: "border-primary/20", icon: "text-primary", iconBg: "from-primary/30 to-secondary/20", bar: "from-primary via-secondary to-neon-blue", bg: "from-primary/[0.06] via-[hsl(220,25%,14%)] to-[hsl(220,22%,13%)]", headingGradient: "from-primary to-secondary" },
  { accent: "from-neon-green/15 to-neon-blue/10", border: "border-neon-green/20", icon: "text-neon-green", iconBg: "from-neon-green/30 to-neon-blue/20", bar: "from-neon-green via-neon-blue to-primary", bg: "from-neon-green/[0.05] via-[hsl(220,25%,14%)] to-[hsl(220,22%,13%)]", headingGradient: "from-neon-green to-neon-blue" },
  { accent: "from-neon-purple/15 to-neon-pink/10", border: "border-neon-purple/20", icon: "text-neon-purple", iconBg: "from-neon-purple/30 to-neon-pink/20", bar: "from-neon-purple via-neon-pink to-secondary", bg: "from-neon-purple/[0.05] via-[hsl(220,25%,14%)] to-[hsl(220,22%,13%)]", headingGradient: "from-neon-purple to-neon-pink" },
  { accent: "from-neon-orange/15 to-neon-pink/10", border: "border-neon-orange/20", icon: "text-neon-orange", iconBg: "from-neon-orange/30 to-neon-pink/20", bar: "from-neon-orange via-neon-pink to-neon-purple", bg: "from-neon-orange/[0.05] via-[hsl(220,25%,14%)] to-[hsl(220,22%,13%)]", headingGradient: "from-neon-orange to-neon-pink" },
  { accent: "from-neon-blue/15 to-neon-purple/10", border: "border-neon-blue/20", icon: "text-neon-blue", iconBg: "from-neon-blue/30 to-neon-purple/20", bar: "from-neon-blue via-primary to-neon-green", bg: "from-neon-blue/[0.05] via-[hsl(220,25%,14%)] to-[hsl(220,22%,13%)]", headingGradient: "from-neon-blue to-primary" },
];

const sectionIcons = [BookOpen, Brain, Eye, Monitor, Code2, Cpu, Zap, Sparkles];

// Scroll-reveal wrapper
const RevealOnScroll = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 35 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// ===== Rich text parser =====
const RichText = ({ text }: { text: string }) => {
  const paragraphs = text.split("\n\n");
  return (
    <div className="space-y-4">
      {paragraphs.map((para, pi) => {
        const lines = para.split("\n");
        const isSteps = lines.some(l => /^\*\*Step \d/i.test(l.trim()));

        if (isSteps) {
          return (
            <div key={pi} className="space-y-3 my-2">
              {lines.map((line, li) => {
                const stepMatch = line.match(/^\*\*Step (\d+)[:\.]?\*\*\s*(.*)/i);
                if (stepMatch) {
                  return (
                    <motion.div key={li} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: li * 0.05 }} className="flex gap-4 items-start group">
                      <div className="relative">
                        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary/25 to-secondary/20 border border-primary/20 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/15 transition-all duration-300">
                          <span className="text-sm font-display font-bold text-primary">{stepMatch[1]}</span>
                        </div>
                        {li < lines.length - 1 && <div className="absolute top-10 left-1/2 -translate-x-1/2 w-0.5 h-4 bg-gradient-to-b from-primary/20 to-transparent" />}
                      </div>
                      <div className="flex-1 pt-2">
                        <p className="text-[15px] font-body text-foreground/85 leading-relaxed"><InlineFormat text={stepMatch[2]} /></p>
                      </div>
                    </motion.div>
                  );
                }
                return line.trim() ? <p key={li} className="text-[15px] font-body text-foreground/80 leading-relaxed ml-14"><InlineFormat text={line} /></p> : null;
              })}
            </div>
          );
        }

        const isList = lines.length > 1 && lines.filter(l => l.trim()).every(l =>
          /^([•\-]|\d+[\.\):]|[🔤🔢⬜⏎⬅️🔠⬆️🔼⎋📋🖥️⌨️🖱️🔊📏📄👆👍➡️✋🔄🎮✏️🧮📝📌🎯💡⚡🌟🏆🎨🔧💻📊🔍✨🚀🎓📚🎮🖼️🎵🔒🌍🔑])/u.test(l.trim()) || l.trim() === ""
        );

        if (isList) {
          return (
            <div key={pi} className="space-y-2.5 pl-1 my-2">
              {lines.filter(l => l.trim()).map((line, li) => {
                const emojiMatch = line.match(/^([^\w\s]{1,4})\s*\*\*(.*?)\*\*\s*[—\-–:]\s*(.*)/);
                if (emojiMatch) {
                  return (
                    <div key={li} className="flex gap-3 items-start group/item hover:translate-x-1 transition-transform duration-200">
                      <span className="text-lg mt-0.5 shrink-0">{emojiMatch[1]}</span>
                      <div>
                        <span className="text-[15px] font-body font-bold text-foreground">{emojiMatch[2]}</span>
                        <span className="text-[15px] font-body text-foreground/70"> — {emojiMatch[3]}</span>
                      </div>
                    </div>
                  );
                }
                return (
                  <div key={li} className="flex gap-3 items-start group/item hover:translate-x-1 transition-transform duration-200">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-secondary mt-2 shrink-0 group-hover/item:scale-125 transition-transform" />
                    <p className="text-[15px] font-body text-foreground/80 leading-relaxed"><InlineFormat text={line.replace(/^[•\-]\s*/, "")} /></p>
                  </div>
                );
              })}
            </div>
          );
        }

        return (
          <p key={pi} className="text-[15px] font-body text-foreground/85 leading-[1.9]">
            {lines.map((line, li) => (
              <span key={li}><InlineFormat text={line} />{li < lines.length - 1 && <br />}</span>
            ))}
          </p>
        );
      })}
    </div>
  );
};

const InlineFormat = ({ text }: { text: string }) => {
  const parts: React.ReactNode[] = [];
  const codeRegex = /`([^`]+)`/g;
  let lastIndex = 0;
  let match;
  const fullText = text;
  
  while ((match = codeRegex.exec(fullText)) !== null) {
    if (match.index > lastIndex) {
      const before = fullText.slice(lastIndex, match.index);
      parts.push(...formatBold(before, parts.length));
    }
    parts.push(
      <code key={`code-${match.index}`} className="bg-primary/15 text-primary px-1.5 py-0.5 rounded-md text-[13px] font-mono border border-primary/15">
        {match[1]}
      </code>
    );
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < fullText.length) {
    parts.push(...formatBold(fullText.slice(lastIndex), parts.length));
  }
  return <>{parts}</>;
};

const formatBold = (text: string, keyOffset: number): React.ReactNode[] => {
  return text.split("**").map((part, k) =>
    k % 2 === 1 ? (
      <strong key={`b-${keyOffset}-${k}`} className="text-foreground font-semibold bg-primary/[0.08] px-1 rounded">{part}</strong>
    ) : <span key={`t-${keyOffset}-${k}`}>{part}</span>
  );
};

// ===== Gradient Section Divider =====
const SectionDivider = ({ index }: { index: number }) => {
  const theme = sectionThemes[index % sectionThemes.length];
  return (
    <div className="flex items-center gap-4 py-3">
      <div className={`flex-1 h-px bg-gradient-to-r ${theme.bar} opacity-30`} />
      <div className={`w-2.5 h-2.5 rounded-full bg-gradient-to-r ${theme.bar} opacity-50 shadow-lg`} />
      <div className={`flex-1 h-px bg-gradient-to-l ${theme.bar} opacity-30`} />
    </div>
  );
};

// ===== Illustration Grid =====
const IllustrationGrid = ({ items }: { items: { emoji: string; label: string }[] }) => (
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 my-6">
    {items.map((item, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: i * 0.06, type: "spring", stiffness: 300 }}
        className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-gradient-to-br from-white/[0.06] to-white/[0.02] border border-white/[0.1] hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 hover:scale-105 transition-all duration-300 group cursor-default"
      >
        <span className="text-3xl group-hover:scale-125 transition-transform duration-300">{item.emoji}</span>
        <span className="text-xs font-display font-bold text-foreground/70 group-hover:text-foreground text-center tracking-wide uppercase">{item.label}</span>
      </motion.div>
    ))}
  </div>
);

// ===== Code Block with Syntax Highlighting =====
const CodeBlock = ({ language, code }: { language: string; code: string }) => {
  const [copied, setCopied] = useState(false);
  return (
    <div className="rounded-2xl overflow-hidden border border-primary/15 shadow-xl shadow-primary/10 my-5">
      <div className="flex items-center justify-between bg-gradient-to-r from-primary/[0.1] to-secondary/[0.06] border-b border-white/[0.08] px-4 py-2.5">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
          </div>
          <span className="text-[10px] font-mono text-primary/60 ml-2 uppercase tracking-wider">{language}</span>
        </div>
        <button
          onClick={() => { navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
          className="text-[10px] font-body text-foreground/40 hover:text-primary transition-colors px-2 py-1 rounded-lg hover:bg-primary/10"
        >
          {copied ? "✓ Copied" : "Copy"}
        </button>
      </div>
      <pre className="p-5 overflow-x-auto bg-[hsl(220,30%,8%)]">
        <code className="text-[13px] font-mono text-neon-green/90 leading-relaxed whitespace-pre">{code}</code>
      </pre>
    </div>
  );
};

// ===== Data Table =====
const DataTable = ({ headers, rows }: { headers: string[]; rows: string[][] }) => (
  <div className="rounded-2xl overflow-hidden border border-neon-blue/20 shadow-lg shadow-neon-blue/5 my-5">
    <div className="flex items-center gap-2 bg-gradient-to-r from-neon-blue/15 to-neon-purple/10 border-b border-white/[0.08] px-4 py-3">
      <Table2 className="w-4 h-4 text-neon-blue" />
      <span className="text-[10px] font-display font-bold text-neon-blue uppercase tracking-[0.15em]">Reference Table</span>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gradient-to-r from-white/[0.06] to-white/[0.03]">
            {headers.map((h, i) => (
              <th key={i} className="px-5 py-3.5 text-left font-display font-bold text-foreground/90 text-xs uppercase tracking-wider border-b border-white/[0.08]">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} className="border-b border-white/[0.05] hover:bg-white/[0.04] transition-colors">
              {row.map((cell, ci) => (
                <td key={ci} className="px-5 py-3.5 font-body text-foreground/75 text-[13px]"><InlineFormat text={cell} /></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// ===== Key Terms Cards =====
const KeyTermsCards = ({ terms }: { terms: { term: string; definition: string }[] }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-5">
    {terms.map((t, i) => (
      <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
        className="rounded-xl border border-neon-purple/20 bg-gradient-to-br from-neon-purple/[0.08] to-neon-pink/[0.03] p-4 hover:border-neon-purple/40 hover:shadow-xl hover:shadow-neon-purple/10 transition-all duration-300 group"
      >
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-neon-purple/30 to-neon-pink/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-lg shadow-neon-purple/10">
            <BookOpen className="w-4 h-4 text-neon-purple" />
          </div>
          <div>
            <span className="text-xs font-display font-bold text-neon-purple">{t.term}</span>
            <p className="text-[12px] font-body text-foreground/70 mt-1 leading-relaxed">{t.definition}</p>
          </div>
        </div>
      </motion.div>
    ))}
  </div>
);

// ===== Warning/Important Note =====
const WarningNote = ({ note }: { note: string }) => (
  <div className="relative rounded-2xl overflow-hidden my-5">
    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-yellow-500 via-orange-500 to-yellow-500" />
    <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/[0.08] via-transparent to-orange-500/[0.04]" />
    <div className="relative bg-white/[0.03] backdrop-blur-sm border border-yellow-500/20 rounded-2xl p-5 pl-6">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-500/30 to-orange-500/20 flex items-center justify-center shrink-0 shadow-lg shadow-yellow-500/15">
          <AlertTriangle className="w-5 h-5 text-yellow-500" />
        </div>
        <div>
          <span className="text-[10px] font-display font-bold text-yellow-500 uppercase tracking-[0.2em]">Important</span>
          <p className="text-sm font-body text-foreground/80 leading-relaxed mt-1"><InlineFormat text={note} /></p>
        </div>
      </div>
    </div>
  </div>
);

// ===== Comparison Card =====
const ComparisonCard = ({ left, right }: { left: { title: string; points: string[] }; right: { title: string; points: string[] } }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-5">
    {[left, right].map((side, si) => (
      <div key={si} className={`rounded-xl border p-5 transition-all hover:shadow-lg duration-300 ${si === 0 ? "border-neon-green/20 bg-gradient-to-br from-neon-green/[0.07] to-neon-green/[0.02] hover:shadow-neon-green/10" : "border-neon-orange/20 bg-gradient-to-br from-neon-orange/[0.07] to-neon-orange/[0.02] hover:shadow-neon-orange/10"}`}>
        <div className="flex items-center gap-2 mb-3">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center shadow-lg ${si === 0 ? "bg-neon-green/20 shadow-neon-green/10" : "bg-neon-orange/20 shadow-neon-orange/10"}`}>
            <span className="text-sm">{si === 0 ? "🟢" : "🟠"}</span>
          </div>
          <span className={`text-xs font-display font-bold uppercase tracking-wider ${si === 0 ? "text-neon-green" : "text-neon-orange"}`}>{side.title}</span>
        </div>
        <ul className="space-y-2">
          {side.points.map((p, pi) => (
            <li key={pi} className="flex items-start gap-2 text-[13px] font-body text-foreground/75">
              <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${si === 0 ? "bg-neon-green/60" : "bg-neon-orange/60"}`} />
              <InlineFormat text={p} />
            </li>
          ))}
        </ul>
      </div>
    ))}
  </div>
);

// ===== Step-by-Step Guide =====
const StepByStepGuide = ({ steps }: { steps: { title: string; description: string; image?: string }[] }) => (
  <div className="space-y-4 my-5">
    {steps.map((step, i) => (
      <motion.div key={i} initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}
        className="flex gap-4 items-start group"
      >
        <div className="relative flex flex-col items-center">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-primary/30 to-neon-blue/25 border border-primary/20 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/20 transition-all duration-300 z-10">
            <span className="text-sm font-display font-bold text-primary">{i + 1}</span>
          </div>
          {i < steps.length - 1 && <div className="w-0.5 flex-1 bg-gradient-to-b from-primary/25 to-transparent min-h-[20px]" />}
        </div>
        <div className="flex-1 pb-4">
          <h4 className="text-sm font-display font-bold text-foreground mb-1">{step.title}</h4>
          <p className="text-[13px] font-body text-foreground/70 leading-relaxed"><InlineFormat text={step.description} /></p>
          {step.image && (
            <div className="mt-3 rounded-xl overflow-hidden border border-white/[0.1] max-w-md shadow-lg">
              <img src={step.image} alt={step.title} className="w-full object-cover" loading="lazy" />
            </div>
          )}
        </div>
      </motion.div>
    ))}
  </div>
);

// ===== MCQ Exercise =====
const MCQExercise = ({ exercise, index }: { exercise: Exercise; index: number }) => {
  const [selected, setSelected] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);
  const isCorrect = selected === exercise.answer;

  return (
    <RevealOnScroll delay={index * 0.05}>
      <div className="relative rounded-2xl overflow-hidden group hover:shadow-lg hover:shadow-neon-purple/5 transition-all duration-500">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-neon-purple via-primary to-neon-purple" />
        <div className="border border-neon-purple/15 hover:border-neon-purple/30 rounded-2xl transition-colors duration-300 bg-gradient-to-br from-neon-purple/[0.04] to-transparent">
          <div className="p-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/30 to-neon-purple/25 shadow-lg shadow-primary/15 flex items-center justify-center shrink-0 group-hover:scale-110 transition-all">
                <span className="text-xl">🧠</span>
              </div>
              <div className="flex-1">
                <div className="text-[10px] font-display font-bold text-primary uppercase tracking-[0.2em] mb-2">Multiple Choice</div>
                <p className="text-sm text-foreground/90 font-body leading-relaxed">{exercise.question}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 ml-16 mb-4">
              {exercise.choices?.map((choice, ci) => (
                <button
                  key={ci}
                  onClick={() => { if (!checked) { setSelected(choice); } }}
                  className={`text-left px-4 py-3 rounded-xl text-sm font-body transition-all duration-300 border-2 ${
                    selected === choice
                      ? checked
                        ? choice === exercise.answer
                          ? "bg-neon-green/15 text-neon-green border-neon-green/40 shadow-lg shadow-neon-green/10"
                          : "bg-destructive/15 text-red-400 border-red-400/40"
                        : "bg-primary/15 text-primary border-primary/40 shadow-lg shadow-primary/10"
                      : checked && choice === exercise.answer
                        ? "bg-neon-green/10 text-neon-green border-neon-green/30"
                        : "bg-white/[0.04] text-foreground/70 border-white/[0.1] hover:border-primary/25 hover:bg-primary/[0.06]"
                  }`}
                >
                  <span className="font-bold mr-2 text-foreground/40">{String.fromCharCode(65 + ci)}.</span>
                  {choice}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3 ml-16">
              <Button size="sm" onClick={() => setChecked(true)} disabled={!selected || checked}
                className="bg-gradient-to-r from-primary/20 to-secondary/20 hover:from-primary/30 hover:to-secondary/30 text-foreground/80 hover:text-foreground text-xs rounded-xl px-6 h-10 font-body font-bold disabled:opacity-20 transition-all border border-primary/20"
              >Check Answer</Button>
              {checked && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 500, damping: 20 }}
                  className={`flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-xl ${isCorrect ? "text-neon-green bg-neon-green/10 border border-neon-green/25" : "text-red-400 bg-red-400/10 border border-red-400/25"}`}
                >
                  {isCorrect ? <><CheckCircle2 className="w-4 h-4" /> Correct! 🎉</> : <><XCircle className="w-4 h-4" /> Answer: {exercise.answer}</>}
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </RevealOnScroll>
  );
};

// ===== Match Exercise =====
const MatchExercise = ({ exercise, index }: { exercise: Exercise; index: number }) => {
  const pairs = exercise.matchPairs || [];
  const [selected, setSelected] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState(false);
  const definitions = pairs.map(p => p[1]).sort(() => Math.random() - 0.5);
  const [shuffledDefs] = useState(definitions);

  const allCorrect = pairs.every((p, i) => selected[i] === p[1]);

  return (
    <RevealOnScroll delay={index * 0.05}>
      <div className="relative rounded-2xl overflow-hidden group hover:shadow-lg hover:shadow-neon-green/5 transition-all duration-500">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-neon-green via-neon-blue to-neon-green" />
        <div className="border border-neon-green/15 hover:border-neon-green/30 rounded-2xl transition-colors duration-300 bg-gradient-to-br from-neon-green/[0.04] to-transparent">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-neon-green/30 to-neon-blue/25 shadow-lg shadow-neon-green/15 flex items-center justify-center shrink-0">
                <List className="w-5 h-5 text-neon-green" />
              </div>
              <div>
                <div className="text-[10px] font-display font-bold text-neon-green uppercase tracking-[0.2em]">Match the Columns</div>
                <p className="text-sm text-foreground/75 font-body">{exercise.question}</p>
              </div>
            </div>
            <div className="space-y-3 ml-16">
              {pairs.map((pair, pi) => (
                <div key={pi} className="flex items-center gap-3">
                  <span className="text-sm font-body font-bold text-foreground/85 w-32 shrink-0">{pair[0]}</span>
                  <span className="text-foreground/30">→</span>
                  <select
                    value={selected[pi] || ""}
                    onChange={e => setSelected(prev => ({ ...prev, [pi]: e.target.value }))}
                    disabled={checked}
                    className={`bg-white/[0.05] border-2 rounded-xl px-3 py-2 text-sm font-body flex-1 focus:outline-none transition-all ${
                      checked
                        ? selected[pi] === pair[1] ? "border-neon-green/40 text-neon-green" : "border-red-400/40 text-red-400"
                        : "border-white/12 text-foreground/75 focus:border-primary/50"
                    }`}
                  >
                    <option value="">Select...</option>
                    {shuffledDefs.map((d, di) => <option key={di} value={d}>{d}</option>)}
                  </select>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-3 ml-16 mt-4">
              <Button size="sm" onClick={() => setChecked(true)} disabled={Object.keys(selected).length < pairs.length || checked}
                className="bg-gradient-to-r from-primary/20 to-secondary/20 hover:from-primary/30 hover:to-secondary/30 text-foreground/80 text-xs rounded-xl px-6 h-10 font-body font-bold disabled:opacity-20 border border-primary/20"
              >Check Matches</Button>
              {checked && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className={`text-xs font-bold px-4 py-2 rounded-xl ${allCorrect ? "text-neon-green bg-neon-green/10 border border-neon-green/25" : "text-red-400 bg-red-400/10 border border-red-400/25"}`}>
                  {allCorrect ? "All correct! 🎉" : "Some matches are wrong. Try again!"}
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </RevealOnScroll>
  );
};

// ===== Ordering Exercise =====
const OrderingExercise = ({ exercise, index }: { exercise: Exercise; index: number }) => {
  const correctOrder = exercise.orderItems || [];
  const [items, setItems] = useState(() => [...correctOrder].sort(() => Math.random() - 0.5));
  const [checked, setChecked] = useState(false);
  const isCorrect = items.every((item, i) => item === correctOrder[i]);

  const moveItem = (fromIdx: number, direction: "up" | "down") => {
    if (checked) return;
    const toIdx = direction === "up" ? fromIdx - 1 : fromIdx + 1;
    if (toIdx < 0 || toIdx >= items.length) return;
    const newItems = [...items];
    [newItems[fromIdx], newItems[toIdx]] = [newItems[toIdx], newItems[fromIdx]];
    setItems(newItems);
  };

  return (
    <RevealOnScroll delay={index * 0.05}>
      <div className="relative rounded-2xl overflow-hidden group hover:shadow-lg hover:shadow-neon-orange/5 transition-all duration-500">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-neon-orange via-neon-pink to-neon-orange" />
        <div className="border border-neon-orange/15 hover:border-neon-orange/30 rounded-2xl transition-colors duration-300 bg-gradient-to-br from-neon-orange/[0.04] to-transparent">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-neon-orange/30 to-neon-pink/25 shadow-lg shadow-neon-orange/15 flex items-center justify-center shrink-0">
                <GripVertical className="w-5 h-5 text-neon-orange" />
              </div>
              <div>
                <div className="text-[10px] font-display font-bold text-neon-orange uppercase tracking-[0.2em]">Arrange in Order</div>
                <p className="text-sm text-foreground/75 font-body">{exercise.question}</p>
              </div>
            </div>
            <div className="space-y-2 ml-16">
              {items.map((item, ii) => (
                <div key={ii} className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all ${
                  checked
                    ? item === correctOrder[ii] ? "border-neon-green/30 bg-neon-green/[0.06]" : "border-red-400/30 bg-red-400/[0.06]"
                    : "border-white/[0.1] bg-white/[0.03] hover:border-white/20"
                }`}>
                  <span className="text-xs font-bold text-foreground/40 w-5">{ii + 1}.</span>
                  <span className="text-sm font-body text-foreground/80 flex-1">{item}</span>
                  {!checked && (
                    <div className="flex flex-col gap-0.5">
                      <button onClick={() => moveItem(ii, "up")} disabled={ii === 0} className="text-foreground/25 hover:text-foreground/60 disabled:opacity-20"><ArrowUp className="w-3.5 h-3.5" /></button>
                      <button onClick={() => moveItem(ii, "down")} disabled={ii === items.length - 1} className="text-foreground/25 hover:text-foreground/60 disabled:opacity-20"><ArrowDown className="w-3.5 h-3.5" /></button>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="flex items-center gap-3 ml-16 mt-4">
              <Button size="sm" onClick={() => setChecked(true)} disabled={checked}
                className="bg-gradient-to-r from-primary/20 to-secondary/20 hover:from-primary/30 hover:to-secondary/30 text-foreground/80 text-xs rounded-xl px-6 h-10 font-body font-bold disabled:opacity-20 border border-primary/20"
              >Check Order</Button>
              {checked && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className={`text-xs font-bold px-4 py-2 rounded-xl ${isCorrect ? "text-neon-green bg-neon-green/10 border border-neon-green/25" : "text-red-400 bg-red-400/10 border border-red-400/25"}`}>
                  {isCorrect ? "Perfect order! 🎉" : "Not quite right. Try again!"}
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </RevealOnScroll>
  );
};

// ===== Premium Exercise Component =====
export const PremiumExercise = ({ exercise, index }: { exercise: Exercise; index: number }) => {
  const [userAnswer, setUserAnswer] = useState("");
  const [checked, setChecked] = useState(false);
  const isCorrect = exercise.answer.toLowerCase().trim() === userAnswer.toLowerCase().trim();

  // Route to specialized exercise components
  if (exercise.type === "mcq") return <MCQExercise exercise={exercise} index={index} />;
  if (exercise.type === "match") return <MatchExercise exercise={exercise} index={index} />;
  if (exercise.type === "ordering") return <OrderingExercise exercise={exercise} index={index} />;

  if (exercise.type === "practice") {
    const editorKey = getEditorForPractice(exercise.question);
    const editorInfo = editorKey ? EDITOR_URLS[editorKey] : null;

    return (
      <RevealOnScroll delay={index * 0.05}>
        <div className="relative rounded-2xl overflow-hidden group hover:shadow-xl hover:shadow-neon-orange/10 transition-all duration-500">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-neon-orange via-neon-pink to-neon-purple" />
          <div className="absolute inset-0 bg-gradient-to-br from-neon-orange/[0.06] via-transparent to-neon-pink/[0.04]" />
          <div className="relative border border-neon-orange/25 hover:border-neon-orange/40 rounded-2xl transition-colors duration-300">
            <div className="p-7">
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-neon-orange/35 to-neon-pink/30 flex items-center justify-center shrink-0 shadow-xl shadow-neon-orange/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                  <Rocket className="w-6 h-6 text-neon-orange" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-display font-bold text-neon-orange uppercase tracking-[0.15em]">Practice Activity</span>
                    <span className="text-lg">🚀</span>
                  </div>
                  <p className="text-sm text-foreground/85 font-body leading-relaxed mb-5">{exercise.question}</p>
                  {editorInfo && (
                    <div className="flex gap-3 flex-wrap">
                      <Button size="sm" onClick={() => { window.location.href = `/dashboard/coding-lab?editor=${editorKey}`; }}
                        className="bg-gradient-to-r from-neon-orange to-neon-pink text-white hover:opacity-90 gap-2 text-xs rounded-xl font-body font-bold shadow-lg shadow-neon-orange/25 hover:shadow-neon-orange/35 hover:scale-105 transition-all duration-300 h-10 px-5"
                      ><Play className="w-3.5 h-3.5" /> Open {editorInfo.label}</Button>
                      <Button size="sm" onClick={() => { window.open(`/dashboard/coding-lab?editor=${editorKey}&fullscreen=1`, "_blank"); }}
                        variant="ghost" className="text-foreground/40 hover:text-neon-orange text-xs gap-2 rounded-xl h-10"
                      ><Maximize2 className="w-3.5 h-3.5" /> Full Screen</Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </RevealOnScroll>
    );
  }

  return (
    <RevealOnScroll delay={index * 0.05}>
      <div className="relative rounded-2xl overflow-hidden group hover:shadow-lg transition-all duration-500">
        <div className={`absolute top-0 left-0 right-0 h-1 ${
          exercise.type === "true-false"
            ? "bg-gradient-to-r from-neon-purple via-neon-blue to-neon-purple"
            : "bg-gradient-to-r from-neon-blue via-neon-green to-neon-blue"
        }`} />
        <div className={`border rounded-2xl transition-colors duration-300 ${
          exercise.type === "true-false"
            ? "border-neon-purple/15 hover:border-neon-purple/30 bg-gradient-to-br from-neon-purple/[0.04] to-transparent"
            : "border-neon-blue/15 hover:border-neon-blue/30 bg-gradient-to-br from-neon-blue/[0.04] to-transparent"
        }`}>
          <div className="p-6">
            <div className="flex items-start gap-4 mb-5">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-all duration-300 ${
                exercise.type === "true-false"
                  ? "bg-gradient-to-br from-neon-purple/30 to-neon-blue/25 shadow-neon-purple/15"
                  : "bg-gradient-to-br from-neon-blue/30 to-neon-green/25 shadow-neon-blue/15"
              }`}>
                <span className="text-xl">{exercise.type === "true-false" ? "⚡" : "✏️"}</span>
              </div>
              <div className="flex-1">
                <div className={`text-[10px] font-display font-bold uppercase tracking-[0.2em] mb-2 ${
                  exercise.type === "true-false" ? "text-neon-purple" : "text-neon-blue"
                }`}>
                  {exercise.type === "true-false" ? "True or False" : "Fill in the Blank"}
                </div>
                <p className="text-sm text-foreground/90 font-body leading-relaxed">{exercise.question}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 ml-16 flex-wrap">
              {exercise.type === "true-false" ? (
                <div className="flex gap-3">
                  {exercise.options?.map((opt) => (
                    <button key={opt} onClick={() => { setUserAnswer(opt); setChecked(false); }}
                      className={`px-7 py-3 rounded-xl text-sm font-body font-bold transition-all duration-300 ${
                        userAnswer === opt
                          ? checked ? isCorrect ? "bg-neon-green/20 text-neon-green border-2 border-neon-green/40 scale-105 shadow-xl shadow-neon-green/15" : "bg-destructive/20 text-red-400 border-2 border-red-400/40 scale-105"
                            : "bg-primary/20 text-primary border-2 border-primary/40 scale-105 shadow-xl shadow-primary/15"
                          : "bg-white/[0.05] text-foreground/60 hover:bg-white/[0.1] border-2 border-white/[0.1] hover:border-white/20 hover:scale-105"
                      }`}
                    >{opt}</button>
                  ))}
                </div>
              ) : (
                <input value={userAnswer} onChange={(e) => { setUserAnswer(e.target.value); setChecked(false); }}
                  placeholder="Type your answer..."
                  className="bg-white/[0.05] border-2 border-white/12 rounded-xl px-5 py-3 text-sm text-foreground font-body focus:outline-none focus:border-primary/50 focus:bg-primary/[0.05] focus:shadow-lg focus:shadow-primary/15 w-64 transition-all placeholder:text-foreground/25"
                />
              )}
              <Button size="sm" onClick={() => setChecked(true)} disabled={!userAnswer}
                className="bg-gradient-to-r from-primary/20 to-secondary/20 hover:from-primary/30 hover:to-secondary/30 text-foreground/80 hover:text-foreground text-xs rounded-xl px-6 h-11 font-body font-bold disabled:opacity-20 transition-all border border-primary/20 hover:border-primary/30"
              >Check Answer</Button>
              {checked && (
                <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 500, damping: 20 }}
                  className={`flex items-center gap-2 text-xs font-bold px-5 py-2.5 rounded-xl ${
                    isCorrect ? "text-neon-green bg-neon-green/10 border border-neon-green/25 shadow-lg shadow-neon-green/10" : "text-red-400 bg-red-400/10 border border-red-400/25"
                  }`}
                >
                  {isCorrect ? <><CheckCircle2 className="w-4 h-4" /> Correct! 🎉</> : <><XCircle className="w-4 h-4" /> Answer: {exercise.answer}</>}
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </RevealOnScroll>
  );
};

// ===== Premium Section Renderer =====
export const PremiumSection = ({ section, index }: { section: ContentSection; index: number }) => {
  const [youtubeLoaded, setYoutubeLoaded] = useState(false);
  const theme = sectionThemes[index % sectionThemes.length];
  const IconComponent = sectionIcons[index % sectionIcons.length];

  return (
    <RevealOnScroll delay={index * 0.08}>
      {index > 0 && <SectionDivider index={index} />}

      <div className="relative rounded-3xl overflow-hidden group hover:shadow-2xl hover:shadow-primary/[0.08] transition-all duration-700">
        {/* Vibrant left accent bar */}
        <div className={`absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b ${theme.bar} opacity-50 group-hover:opacity-90 transition-opacity duration-700`} />
        {/* Ambient glow blobs */}
        <div className="absolute top-0 right-0 w-72 h-72 rounded-full opacity-[0.04] bg-gradient-to-br from-primary to-secondary blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-20 w-48 h-48 rounded-full opacity-[0.03] bg-gradient-to-br from-neon-green to-neon-blue blur-3xl pointer-events-none" />

        {/* BRIGHTER card background with colored tint */}
        <div className={`border ${theme.border} rounded-3xl bg-gradient-to-br ${theme.bg} transition-colors duration-500 hover:border-opacity-100`}>
          {/* Section Header with gradient heading */}
          <div className="px-8 pt-8 pb-2">
            <div className="flex items-center gap-4 mb-6">
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${theme.iconBg} border border-white/[0.08] flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-xl transition-all duration-500`}>
                <IconComponent className={`w-5 h-5 ${theme.icon}`} />
              </div>
              <div className="flex-1">
                <h3 className={`font-display text-lg md:text-xl font-bold bg-gradient-to-r ${theme.headingGradient} bg-clip-text text-transparent tracking-tight leading-tight`}>{section.heading}</h3>
                <div className={`w-20 h-1 rounded-full bg-gradient-to-r ${theme.bar} mt-2 opacity-60 group-hover:w-28 transition-all duration-500`} />
              </div>
            </div>
          </div>

          {/* Image */}
          {section.image && (
            <div className="mx-8 mb-7">
              <div className="relative rounded-2xl overflow-hidden border border-white/[0.1] shadow-2xl shadow-black/40 group/img">
                <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-r from-white/[0.06] to-white/[0.03] border-b border-white/[0.08] flex items-center gap-1.5 px-3 z-10">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                  <span className="text-[9px] font-body text-foreground/25 ml-2">{section.heading}</span>
                </div>
                <img src={section.image} alt={section.heading} className="w-full max-h-80 object-cover pt-8 group-hover/img:scale-[1.03] transition-transform duration-1000" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-700" />
              </div>
            </div>
          )}

          {/* YouTube Video */}
          {section.youtubeId && (
            <div className="mx-8 mb-7">
              <div className="relative rounded-2xl overflow-hidden border border-white/[0.1] shadow-2xl shadow-black/40">
                <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-r from-white/[0.06] to-white/[0.03] border-b border-white/[0.08] flex items-center gap-1.5 px-3 z-10">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                  <span className="text-[9px] font-body text-foreground/25 ml-2">📺 Video Lesson</span>
                </div>
                {!youtubeLoaded ? (
                  <button onClick={() => setYoutubeLoaded(true)} className="relative w-full group/yt cursor-pointer" style={{ paddingBottom: '56.25%', marginTop: '32px' }}>
                    <img src={`https://img.youtube.com/vi/${section.youtubeId}/maxresdefault.jpg`} alt="Video thumbnail" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/30 to-black/50 group-hover/yt:from-black/40 group-hover/yt:via-black/20 group-hover/yt:to-black/40 transition-all duration-500 flex items-center justify-center">
                      <div className="relative">
                        <div className="absolute inset-0 w-20 h-20 rounded-full bg-red-500/30 blur-xl animate-pulse" />
                        <div className="relative w-18 h-18 rounded-full bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center shadow-2xl shadow-red-500/40 group-hover/yt:scale-110 transition-all duration-500">
                          <Play className="w-8 h-8 text-white ml-1" fill="white" />
                        </div>
                      </div>
                    </div>
                    <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md rounded-xl px-4 py-2 text-xs font-body text-white/90 flex items-center gap-2 border border-white/10">
                      <Play className="w-3.5 h-3.5 text-red-400" /> Watch Video Lesson
                    </div>
                  </button>
                ) : (
                  <div className="relative w-full" style={{ paddingBottom: '56.25%', marginTop: '32px' }}>
                    <iframe src={`https://www.youtube.com/embed/${section.youtubeId}?autoplay=1`} className="absolute inset-0 w-full h-full" title={section.heading} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Body Content */}
          <div className="px-8 pb-3">
            <RichText text={section.body} />
          </div>

          {/* Illustration Grid */}
          {section.illustration && (
            <div className="mx-8">
              <IllustrationGrid items={section.illustration} />
            </div>
          )}

          {/* Code Block */}
          {section.codeBlock && (
            <div className="mx-8">
              <CodeBlock language={section.codeBlock.language} code={section.codeBlock.code} />
            </div>
          )}

          {/* Data Table */}
          {section.table && (
            <div className="mx-8">
              <DataTable headers={section.table.headers} rows={section.table.rows} />
            </div>
          )}

          {/* Comparison */}
          {section.comparison && (
            <div className="mx-8">
              <ComparisonCard left={section.comparison.left} right={section.comparison.right} />
            </div>
          )}

          {/* Step-by-Step Guide */}
          {section.stepByStep && (
            <div className="mx-8">
              <StepByStepGuide steps={section.stepByStep.steps} />
            </div>
          )}

          {/* Key Terms */}
          {section.keyTerms && (
            <div className="mx-8">
              <KeyTermsCards terms={section.keyTerms} />
            </div>
          )}

          {/* Warning Note */}
          {section.warningNote && (
            <div className="mx-8">
              <WarningNote note={section.warningNote} />
            </div>
          )}

          {/* Tip Box — VIBRANT */}
          {section.tip && (
            <div className="mx-8 my-6">
              <motion.div initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="relative rounded-2xl overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-neon-blue via-neon-green to-neon-blue" />
                <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/[0.1] via-neon-green/[0.04] to-neon-blue/[0.06]" />
                <div className="relative bg-white/[0.04] backdrop-blur-sm border border-neon-blue/25 rounded-2xl p-6 pl-7 shadow-lg shadow-neon-blue/5">
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-neon-blue/35 to-neon-green/25 flex items-center justify-center shrink-0 shadow-lg shadow-neon-blue/15">
                      <Lightbulb className="w-5 h-5 text-neon-blue" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] font-display font-bold text-neon-blue uppercase tracking-[0.2em]">Pro Tip</span>
                        <span className="text-sm">💡</span>
                      </div>
                      <p className="text-sm font-body text-foreground/85 leading-relaxed"><InlineFormat text={section.tip} /></p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}

          {/* Fun Fact Box — VIBRANT */}
          {section.funFact && (
            <div className="mx-8 my-6">
              <motion.div initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 }} className="relative rounded-2xl overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-neon-orange via-neon-pink to-neon-orange" />
                <div className="absolute inset-0 bg-gradient-to-br from-neon-orange/[0.1] via-neon-pink/[0.04] to-neon-orange/[0.06]" />
                <div className="relative bg-white/[0.04] backdrop-blur-sm border border-neon-orange/25 rounded-2xl p-6 pl-7 shadow-lg shadow-neon-orange/5">
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-neon-orange/35 to-neon-pink/25 flex items-center justify-center shrink-0 shadow-lg shadow-neon-orange/15">
                      <Sparkles className="w-5 h-5 text-neon-orange" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] font-display font-bold text-neon-orange uppercase tracking-[0.2em]">Fun Fact</span>
                        <span className="text-sm">🌟</span>
                      </div>
                      <p className="text-sm font-body text-foreground/85 leading-relaxed">{section.funFact}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}

          <div className="h-6" />
        </div>
      </div>
    </RevealOnScroll>
  );
};

// ===== Premium Page Header =====
export const PremiumPageHeader = ({
  pageTitle, subtitle, bannerImage, bannerColor, pageNumber, totalPages,
}: {
  pageTitle: string; subtitle?: string; bannerImage?: string; bannerColor?: string; pageNumber: number; totalPages: number;
}) => (
  <motion.div initial={{ y: -15, opacity: 0, scale: 0.97 }} animate={{ y: 0, opacity: 1, scale: 1 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    className="rounded-3xl overflow-hidden border border-white/[0.1] shadow-2xl shadow-black/40 mb-10 group"
  >
    {bannerImage ? (
      <div className="relative h-60 md:h-72">
        <img src={bannerImage} alt={pageTitle} className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-1000" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />
        <div className="absolute top-5 left-5 flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-lg shadow-red-500/30" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80 shadow-lg shadow-yellow-500/30" />
          <div className="w-3 h-3 rounded-full bg-green-500/80 shadow-lg shadow-green-500/30" />
        </div>
        <div className="absolute top-5 right-5 bg-black/40 backdrop-blur-md rounded-full px-5 py-2 border border-white/15">
          <div className="flex items-center gap-3">
            <span className="text-xs font-display font-bold text-white/90">{pageNumber}</span>
            <div className="w-12 h-1.5 rounded-full bg-white/15 overflow-hidden">
              <motion.div initial={{ width: 0 }} animate={{ width: `${(pageNumber / totalPages) * 100}%` }} className="h-full rounded-full bg-gradient-to-r from-primary to-neon-green" transition={{ duration: 0.8, delay: 0.3 }} />
            </div>
            <span className="text-xs font-display font-bold text-white/50">{totalPages}</span>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
          <motion.div initial={{ y: 15, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-white drop-shadow-2xl leading-tight mb-2">{pageTitle}</h2>
            {subtitle && <p className="text-white/70 font-body text-sm md:text-base max-w-2xl leading-relaxed">{subtitle}</p>}
          </motion.div>
        </div>
      </div>
    ) : (
      <div className={`bg-gradient-to-br ${bannerColor || "from-primary to-neon-blue"} relative overflow-hidden`}>
        <div className="absolute inset-0">
          <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-white/[0.1] blur-3xl" />
          <div className="absolute bottom-0 -left-10 w-80 h-80 rounded-full bg-black/[0.12] blur-3xl" />
          <div className="absolute top-1/2 right-1/4 w-32 h-32 rounded-full bg-white/[0.07] blur-2xl" />
          <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.12) 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
        </div>
        <div className="relative z-10 p-8 md:p-10 py-14">
          <div className="flex gap-2 mb-6">
            <div className="w-3 h-3 rounded-full bg-white/40" />
            <div className="w-3 h-3 rounded-full bg-white/25" />
            <div className="w-3 h-3 rounded-full bg-white/15" />
          </div>
          <div className="absolute top-6 right-6 bg-black/20 backdrop-blur-sm rounded-full px-5 py-2 border border-white/15">
            <div className="flex items-center gap-3">
              <span className="text-xs font-display font-bold text-white/90">{pageNumber}</span>
              <div className="w-10 h-1.5 rounded-full bg-white/20 overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: `${(pageNumber / totalPages) * 100}%` }} className="h-full rounded-full bg-white/60" transition={{ duration: 0.8, delay: 0.3 }} />
              </div>
              <span className="text-xs font-display font-bold text-white/60">{totalPages}</span>
            </div>
          </div>
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight mb-3">{pageTitle}</h2>
          {subtitle && <p className="text-white/75 font-body text-sm md:text-base max-w-2xl leading-relaxed">{subtitle}</p>}
        </div>
      </div>
    )}
  </motion.div>
);
