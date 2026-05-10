import { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useData } from "@/contexts/DataContext";
import { getCurriculumForClass } from "@/lib/curriculumData";
import { getLabForTopic } from "@/lib/topicLabMap";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";
import {
  ChevronLeft, BookOpen, GraduationCap, Image as ImageIcon, Hammer, Pencil,
  HelpCircle, Code2, Loader2, CheckCircle2, Award, Sparkles, Clock, Target,
  Lightbulb, RefreshCw, ArrowRight,
} from "lucide-react";

type SectionKey = "overview" | "learn" | "images" | "activities" | "practice" | "quiz";

interface Overview { introduction: string; objectives: string[]; difficulty: string; estimatedMinutes: number; keyConcepts: string[]; }
interface LearnItem { heading: string; body: string; highlight?: string; example?: string; }
interface ImageItem { title: string; description: string; emoji: string; caption: string; }
interface ActivityItem { title: string; instructions: string[]; expectedOutput: string; hint: string; }
interface PracticeItem { type: "mcq" | "fill" | "truefalse"; question: string; options?: string[]; answer: string; explanation: string; }
interface QuizItem { question: string; options: string[]; answerIndex: number; explanation: string; }

const cacheKey = (topicId: string, section: SectionKey) => `topic-ai:${topicId}:${section}`;

const TABS: { id: SectionKey | "lab"; label: string; icon: any }[] = [
  { id: "overview",   label: "Overview",   icon: BookOpen },
  { id: "learn",      label: "Learn",      icon: GraduationCap },
  { id: "images",     label: "Images",     icon: ImageIcon },
  { id: "activities", label: "Activities", icon: Hammer },
  { id: "practice",   label: "Practice",   icon: Pencil },
  { id: "quiz",       label: "Quiz",       icon: HelpCircle },
  { id: "lab",        label: "Lab",        icon: Code2 },
];

const getClassNumber = (className: string): number => {
  const m = className?.toLowerCase().match(/(10|[1-9])/);
  return m ? parseInt(m[1], 10) : 1;
};

const AITopicViewer = () => {
  const params = useParams<{ topicId?: string; classSlug?: string; topicSlug?: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { students, refreshData } = useData();
  const student = useMemo(() => students.find((s) => s.user_id === user?.id), [students, user?.id]);
  const studentClass = student?.class || user?.className || "";
  const curriculum = useMemo(() => getCurriculumForClass(studentClass), [studentClass]);

  // Resolve topic from either old route (:topicId) or new slug route (:classSlug/:topicSlug)
  const topicMeta = useMemo(() => {
    if (!curriculum) return null;
    if (params.topicId) {
      for (const sub of curriculum.subjects) {
        const t = sub.topics.find((x) => x.id === params.topicId);
        if (t) return { topic: t, subject: sub };
      }
    }
    if (params.topicSlug) {
      for (const sub of curriculum.subjects) {
        const t = sub.topics.find((x) => x.id.endsWith(`-${params.topicSlug}`) || x.id === params.topicSlug);
        if (t) return { topic: t, subject: sub };
      }
    }
    return null;
  }, [curriculum, params.topicId, params.topicSlug]);

  const topicId = topicMeta?.topic.id || "";
  const classNumber = getClassNumber(studentClass);
  const lab = useMemo(() => topicMeta ? getLabForTopic(topicMeta.topic.title) : null, [topicMeta]);

  const [activeTab, setActiveTab] = useState<SectionKey | "lab">("overview");
  const [sections, setSections] = useState<Partial<Record<SectionKey, any>>>({});
  const [loadingSection, setLoadingSection] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isCompleted, setIsCompleted] = useState(false);

  const loadSection = useCallback(async (sec: SectionKey, force = false) => {
    if (!topicId || !topicMeta) return;
    if (!force) {
      const cached = localStorage.getItem(cacheKey(topicId, sec));
      if (cached) {
        try { setSections((s) => ({ ...s, [sec]: JSON.parse(cached) })); return; } catch {}
      }
      if (sections[sec]) return;
    }
    setLoadingSection((l) => ({ ...l, [sec]: true }));
    setErrors((e) => ({ ...e, [sec]: "" }));
    try {
      const { data, error: fnErr } = await supabase.functions.invoke("generate-topic-content", {
        body: { topicId, classNumber, title: topicMeta.topic.title, section: sec },
      });
      if (fnErr) throw new Error(fnErr.message || "Function error");
      const payload: any = data;
      if (payload?.error) throw new Error(payload.error);
      const content = payload?.content;
      setSections((s) => ({ ...s, [sec]: content }));
      try { localStorage.setItem(cacheKey(topicId, sec), JSON.stringify(content)); } catch {}
    } catch (e: any) {
      console.error("loadSection error:", sec, e);
      setErrors((er) => ({ ...er, [sec]: e?.message || "Failed to load" }));
    } finally {
      setLoadingSection((l) => ({ ...l, [sec]: false }));
    }
  }, [topicId, topicMeta, classNumber, sections]);

  // Load whichever tab is active (lazy)
  useEffect(() => {
    if (activeTab !== "lab") loadSection(activeTab as SectionKey);
  }, [activeTab, loadSection]);

  // Reset when topic changes
  useEffect(() => {
    setSections({});
    setErrors({});
    setActiveTab("overview");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [topicId]);

  useEffect(() => {
    if (!student || !topicId) return;
    supabase.from("topic_completions").select("id")
      .eq("student_id", student.id).eq("topic_id", topicId)
      .then(({ data }) => setIsCompleted(!!(data && data.length > 0)));
  }, [student, topicId]);

  const toggleComplete = useCallback(async () => {
    if (!student || !topicId) return;
    if (isCompleted) {
      await supabase.from("topic_completions").delete().eq("student_id", student.id).eq("topic_id", topicId);
      setIsCompleted(false);
      toast.success("Topic unmarked");
    } else {
      await supabase.from("topic_completions").insert({ student_id: student.id, topic_id: topicId });
      setIsCompleted(true);
      toast.success("Topic completed! +50 XP 🎉");
    }
    await refreshData();
  }, [student, topicId, isCompleted, refreshData]);

  if (!topicMeta) {
    return (
      <div className="text-center py-24">
        <BookOpen className="w-12 h-12 text-white/20 mx-auto mb-4" />
        <p className="text-white/40">Topic not found.</p>
        <Button variant="ghost" className="mt-4" onClick={() => navigate("/dashboard/curriculum")}>Back</Button>
      </div>
    );
  }

  const SectionWrapper = ({ sec, children, ready }: { sec: SectionKey; children: React.ReactNode; ready: boolean }) => {
    if (loadingSection[sec] && !ready) return <SectionSkeleton />;
    if (errors[sec] && !ready) {
      return (
        <div className="glass-card p-8 text-center">
          <p className="text-red-400 mb-3 text-sm">{errors[sec]}</p>
          <Button onClick={() => loadSection(sec, true)} variant="outline">Retry</Button>
        </div>
      );
    }
    if (!ready) return <SectionSkeleton />;
    return <>{children}</>;
  };

  return (
    <div>
      {/* Top bar */}
      <div className="flex items-center justify-between mb-6">
        <Button variant="ghost" onClick={() => navigate("/dashboard/curriculum")}
          className="text-white/40 hover:text-white gap-2">
          <ChevronLeft className="w-4 h-4" /> Curriculum
        </Button>
        <div className="flex items-center gap-2">
          {isCompleted && (
            <span className="flex items-center gap-2 text-xs font-bold text-neon-green bg-neon-green/10 border border-neon-green/30 px-3 py-1.5 rounded-full">
              <CheckCircle2 className="w-3.5 h-3.5" /> Completed
            </span>
          )}
          {activeTab !== "lab" && (
            <Button size="sm" variant="ghost" onClick={() => loadSection(activeTab as SectionKey, true)}
              disabled={loadingSection[activeTab]} className="text-white/40 hover:text-white gap-1">
              <RefreshCw className={`w-3.5 h-3.5 ${loadingSection[activeTab] ? "animate-spin" : ""}`} /> Regenerate
            </Button>
          )}
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <div className="flex items-center gap-2 mb-1.5">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-xs uppercase tracking-wider text-white/40 font-body">
            {curriculum?.className} · {topicMeta.subject.title}
          </span>
        </div>
        <h1 className="font-display text-2xl md:text-3xl font-bold text-white">{topicMeta.topic.title}</h1>
      </motion.div>

      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="w-full">
        <TabsList className="bg-white/5 border border-white/10 mb-6 flex-wrap h-auto gap-1 p-1 sticky top-0 z-10 backdrop-blur">
          {TABS.map((t) => {
            if (t.id === "lab" && !lab) return null;
            const Icon = t.icon;
            const isLoading = t.id !== "lab" && loadingSection[t.id];
            return (
              <TabsTrigger key={t.id} value={t.id}
                className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary text-white/60 font-body gap-1.5">
                <Icon className="w-3.5 h-3.5" />
                {t.label}
                {isLoading && <Loader2 className="w-3 h-3 animate-spin" />}
              </TabsTrigger>
            );
          })}
        </TabsList>

        <AnimatePresence mode="wait">
          <motion.div key={activeTab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }}>

            <TabsContent value="overview">
              <SectionWrapper sec="overview" ready={!!sections.overview}>
                {sections.overview && <OverviewView c={sections.overview as Overview} />}
              </SectionWrapper>
            </TabsContent>
            <TabsContent value="learn">
              <SectionWrapper sec="learn" ready={!!sections.learn}>
                {sections.learn && <LearnView items={(sections.learn as any).sections as LearnItem[]} />}
              </SectionWrapper>
            </TabsContent>
            <TabsContent value="images">
              <SectionWrapper sec="images" ready={!!sections.images}>
                {sections.images && <ImagesView items={(sections.images as any).images as ImageItem[]} />}
              </SectionWrapper>
            </TabsContent>
            <TabsContent value="activities">
              <SectionWrapper sec="activities" ready={!!sections.activities}>
                {sections.activities && <ActivitiesView items={(sections.activities as any).activities as ActivityItem[]} />}
              </SectionWrapper>
            </TabsContent>
            <TabsContent value="practice">
              <SectionWrapper sec="practice" ready={!!sections.practice}>
                {sections.practice && <PracticeView items={(sections.practice as any).practice as PracticeItem[]} />}
              </SectionWrapper>
            </TabsContent>
            <TabsContent value="quiz">
              <SectionWrapper sec="quiz" ready={!!sections.quiz}>
                {sections.quiz && <QuizView items={(sections.quiz as any).quiz as QuizItem[]} onComplete={toggleComplete} isCompleted={isCompleted} />}
              </SectionWrapper>
            </TabsContent>
            {lab && (
              <TabsContent value="lab">
                <LabView lab={lab} topicTitle={topicMeta.topic.title}
                  onOpen={() => navigate(`/dashboard/coding-lab?editor=${lab.editor}`)} />
              </TabsContent>
            )}
          </motion.div>
        </AnimatePresence>
      </Tabs>

      {/* Completion CTA */}
      <div className="mt-10 flex justify-center">
        <Button onClick={toggleComplete} size="lg"
          className={`gap-2 rounded-xl font-bold ${isCompleted
            ? "bg-neon-green/15 text-neon-green border-2 border-neon-green/30 hover:bg-neon-green/25"
            : "bg-gradient-to-r from-primary via-secondary to-neon-purple text-white"}`}>
          {isCompleted ? <><CheckCircle2 className="w-5 h-5" /> Completed ✓</>
            : <><Award className="w-5 h-5" /> Mark Topic Complete</>}
        </Button>
      </div>
    </div>
  );
};

/* ---------------- Skeleton ---------------- */

const SectionSkeleton = () => (
  <div className="space-y-3 animate-pulse">
    <div className="glass-card p-6 space-y-3">
      <div className="h-4 bg-white/10 rounded w-1/3" />
      <div className="h-3 bg-white/10 rounded w-full" />
      <div className="h-3 bg-white/10 rounded w-5/6" />
      <div className="h-3 bg-white/10 rounded w-4/6" />
    </div>
    <div className="glass-card p-6 space-y-3">
      <div className="h-3 bg-white/10 rounded w-2/3" />
      <div className="h-3 bg-white/10 rounded w-full" />
      <div className="h-3 bg-white/10 rounded w-3/4" />
    </div>
    <div className="text-center text-white/40 text-xs font-body pt-2 flex items-center justify-center gap-2">
      <Loader2 className="w-3.5 h-3.5 animate-spin" /> Loading content…
    </div>
  </div>
);

/* ---------------- Tab views ---------------- */

const Card = ({ children, className = "" }: any) => <div className={`glass-card p-6 ${className}`}>{children}</div>;

const OverviewView = ({ c }: { c: Overview }) => (
  <div className="space-y-5">
    <Card><p className="text-white/80 font-body leading-relaxed">{c.introduction}</p></Card>
    <div className="grid md:grid-cols-3 gap-4">
      <Card className="!p-4"><div className="flex items-center gap-2 mb-1 text-xs text-white/50 uppercase tracking-wider"><Target className="w-3.5 h-3.5" /> Difficulty</div><div className="font-display text-lg text-white">{c.difficulty}</div></Card>
      <Card className="!p-4"><div className="flex items-center gap-2 mb-1 text-xs text-white/50 uppercase tracking-wider"><Clock className="w-3.5 h-3.5" /> Time</div><div className="font-display text-lg text-white">{c.estimatedMinutes} min</div></Card>
      <Card className="!p-4"><div className="flex items-center gap-2 mb-1 text-xs text-white/50 uppercase tracking-wider"><Sparkles className="w-3.5 h-3.5" /> Concepts</div><div className="font-display text-lg text-white">{c.keyConcepts?.length || 0}</div></Card>
    </div>
    <Card>
      <h3 className="font-display text-lg font-bold text-white mb-3 flex items-center gap-2"><Target className="w-4 h-4 text-primary" /> Learning Objectives</h3>
      <ul className="space-y-2">
        {(c.objectives || []).map((o, i) => (
          <li key={i} className="flex gap-3 text-white/70 font-body"><CheckCircle2 className="w-4 h-4 text-neon-green shrink-0 mt-0.5" /><span>{o}</span></li>
        ))}
      </ul>
    </Card>
    <Card>
      <h3 className="font-display text-lg font-bold text-white mb-3">Key Concepts</h3>
      <div className="flex flex-wrap gap-2">
        {(c.keyConcepts || []).map((k, i) => (
          <span key={i} className="px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-body">{k}</span>
        ))}
      </div>
    </Card>
  </div>
);

const LearnView = ({ items }: { items: LearnItem[] }) => (
  <div className="space-y-5">
    {(items || []).map((s, i) => (
      <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
        <Card>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/30 to-secondary/20 flex items-center justify-center text-primary font-bold text-sm">{i + 1}</div>
            <h3 className="font-display text-xl font-bold text-white">{s.heading}</h3>
          </div>
          <div className="text-white/75 font-body leading-relaxed whitespace-pre-line">{s.body}</div>
          {s.highlight && (
            <div className="mt-4 p-4 rounded-xl bg-neon-orange/10 border border-neon-orange/30 flex gap-3">
              <Lightbulb className="w-5 h-5 text-neon-orange shrink-0 mt-0.5" />
              <p className="text-neon-orange/90 font-body text-sm">{s.highlight}</p>
            </div>
          )}
          {s.example && (
            <div className="mt-3 p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="text-xs uppercase tracking-wider text-white/40 mb-1">Example</div>
              <p className="text-white/70 font-body text-sm">{s.example}</p>
            </div>
          )}
        </Card>
      </motion.div>
    ))}
  </div>
);

const ImagesView = ({ items }: { items: ImageItem[] }) => (
  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {(items || []).map((img, i) => (
      <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.04 }}>
        <Card>
          <div className="aspect-video rounded-xl bg-gradient-to-br from-primary/20 via-secondary/15 to-neon-purple/10 flex items-center justify-center mb-3">
            <span className="text-7xl">{img.emoji}</span>
          </div>
          <h4 className="font-display font-bold text-white mb-1">{img.title}</h4>
          <p className="text-white/60 text-sm font-body mb-2">{img.description}</p>
          <p className="text-xs text-white/40 italic">{img.caption}</p>
        </Card>
      </motion.div>
    ))}
  </div>
);

const ActivitiesView = ({ items }: { items: ActivityItem[] }) => (
  <div className="space-y-4">
    {(items || []).map((a, i) => (
      <Card key={i}>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-orange/30 to-neon-pink/20 flex items-center justify-center"><Hammer className="w-5 h-5 text-neon-orange" /></div>
          <h3 className="font-display text-lg font-bold text-white">{a.title}</h3>
        </div>
        <ol className="list-decimal list-inside space-y-2 text-white/75 font-body mb-4">
          {(a.instructions || []).map((step, j) => <li key={j}>{step}</li>)}
        </ol>
        <div className="grid md:grid-cols-2 gap-3">
          <div className="p-3 rounded-lg bg-neon-green/10 border border-neon-green/20">
            <div className="text-xs uppercase tracking-wider text-neon-green mb-1">Expected Output</div>
            <p className="text-white/70 text-sm font-body">{a.expectedOutput}</p>
          </div>
          <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
            <div className="text-xs uppercase tracking-wider text-primary mb-1 flex items-center gap-1"><Lightbulb className="w-3 h-3" /> Hint</div>
            <p className="text-white/70 text-sm font-body">{a.hint}</p>
          </div>
        </div>
      </Card>
    ))}
  </div>
);

const PracticeView = ({ items }: { items: PracticeItem[] }) => {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});
  const check = (i: number, q: PracticeItem) => {
    setRevealed((r) => ({ ...r, [i]: true }));
    const ans = (answers[i] || "").trim().toLowerCase();
    const correct = q.answer.toString().trim().toLowerCase();
    if (ans === correct) toast.success("Correct! 🎉");
    else toast.error(`Try again. Answer: ${q.answer}`);
  };
  return (
    <div className="space-y-4">
      {(items || []).map((q, i) => (
        <Card key={i}>
          <div className="flex items-start gap-3 mb-3">
            <span className="px-2 py-0.5 rounded text-xs bg-primary/20 text-primary font-bold uppercase">{q.type}</span>
            <p className="font-body text-white flex-1">{q.question}</p>
          </div>
          {q.type === "mcq" && q.options ? (
            <div className="space-y-2 mb-3">
              {q.options.map((opt) => (
                <label key={opt} className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer border transition-colors ${
                  answers[i] === opt ? "bg-primary/15 border-primary/40" : "bg-white/5 border-white/10 hover:bg-white/8"
                }`}>
                  <input type="radio" name={`q-${i}`} value={opt} checked={answers[i] === opt}
                    onChange={(e) => setAnswers((a) => ({ ...a, [i]: e.target.value }))} className="accent-primary" />
                  <span className="text-white/80 text-sm">{opt}</span>
                </label>
              ))}
            </div>
          ) : q.type === "truefalse" ? (
            <div className="flex gap-2 mb-3">
              {["True", "False"].map((v) => (
                <button key={v} onClick={() => setAnswers((a) => ({ ...a, [i]: v }))}
                  className={`px-4 py-2 rounded-lg border text-sm ${answers[i] === v ? "bg-primary/20 border-primary/40 text-primary" : "bg-white/5 border-white/10 text-white/70"}`}>
                  {v}
                </button>
              ))}
            </div>
          ) : (
            <input type="text" value={answers[i] || ""} onChange={(e) => setAnswers((a) => ({ ...a, [i]: e.target.value }))}
              placeholder="Your answer…" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm font-body focus:outline-none focus:border-primary/40 mb-3" />
          )}
          <div className="flex items-center gap-3">
            <Button size="sm" onClick={() => check(i, q)} disabled={!answers[i]}>Check</Button>
            {revealed[i] && <p className="text-xs text-white/50 font-body">{q.explanation}</p>}
          </div>
        </Card>
      ))}
    </div>
  );
};

const QuizView = ({ items, onComplete, isCompleted }: { items: QuizItem[]; onComplete: () => void; isCompleted: boolean }) => {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600);

  useEffect(() => {
    if (submitted) return;
    const t = setInterval(() => setTimeLeft((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, [submitted]);

  const score = Object.entries(answers).reduce((acc, [i, ans]) => acc + (items[+i]?.answerIndex === ans ? 1 : 0), 0);
  const submit = () => {
    setSubmitted(true);
    if (score >= Math.ceil(items.length * 0.6) && !isCompleted) onComplete();
  };
  const reset = () => { setAnswers({}); setSubmitted(false); setTimeLeft(600); };

  if (submitted) {
    const pct = Math.round((score / items.length) * 100);
    return (
      <Card>
        <div className="text-center mb-6">
          <div className="text-5xl font-display font-bold text-white mb-2">{pct}%</div>
          <p className="text-white/60 font-body">{score} / {items.length} correct</p>
          <p className="mt-3 text-lg font-display text-primary">
            {pct >= 80 ? "Excellent! 🌟" : pct >= 60 ? "Good job! 👍" : "Keep practicing! 💪"}
          </p>
        </div>
        <div className="space-y-3 mb-6">
          {items.map((q, i) => {
            const correct = answers[i] === q.answerIndex;
            return (
              <div key={i} className={`p-3 rounded-lg border ${correct ? "bg-neon-green/10 border-neon-green/30" : "bg-red-500/10 border-red-500/30"}`}>
                <p className="text-white text-sm font-body mb-1">{i + 1}. {q.question}</p>
                <p className="text-xs text-white/60">Correct: <span className="text-neon-green">{q.options[q.answerIndex]}</span></p>
                <p className="text-xs text-white/40 mt-1">{q.explanation}</p>
              </div>
            );
          })}
        </div>
        <Button onClick={reset} className="w-full">Retake Quiz</Button>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card className="!p-4 flex items-center justify-between">
        <div className="text-white/60 text-sm">Question {Object.keys(answers).length}/{items.length}</div>
        <div className="flex items-center gap-2 text-white font-mono">
          <Clock className="w-4 h-4 text-primary" />
          {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, "0")}
        </div>
      </Card>
      {items.map((q, i) => (
        <Card key={i}>
          <p className="font-body text-white mb-3"><span className="text-primary font-bold">Q{i + 1}.</span> {q.question}</p>
          <div className="space-y-2">
            {q.options.map((opt, j) => (
              <label key={j} className={`flex items-center gap-2 p-2.5 rounded-lg cursor-pointer border transition-colors ${
                answers[i] === j ? "bg-primary/15 border-primary/40" : "bg-white/5 border-white/10 hover:bg-white/8"
              }`}>
                <input type="radio" name={`quiz-${i}`} checked={answers[i] === j}
                  onChange={() => setAnswers((a) => ({ ...a, [i]: j }))} className="accent-primary" />
                <span className="text-white/80 text-sm">{opt}</span>
              </label>
            ))}
          </div>
        </Card>
      ))}
      <Button onClick={submit} disabled={Object.keys(answers).length < items.length} size="lg" className="w-full">
        Submit Quiz
      </Button>
    </div>
  );
};

const LabView = ({ lab, topicTitle, onOpen }: { lab: { editor: string; label: string }; topicTitle: string; onOpen: () => void }) => (
  <Card className="text-center">
    <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-primary/30 to-secondary/20 flex items-center justify-center mb-4">
      <Code2 className="w-8 h-8 text-primary" />
    </div>
    <h3 className="font-display text-2xl font-bold text-white mb-2">{lab.label}</h3>
    <p className="text-white/60 font-body mb-6 max-w-md mx-auto">
      Open the {lab.label} to practice "{topicTitle}" hands-on. Your work saves automatically.
    </p>
    <Button onClick={onOpen} size="lg" className="gap-2 bg-gradient-to-r from-primary to-secondary text-white">
      Open {lab.label} <ArrowRight className="w-4 h-4" />
    </Button>
  </Card>
);

export default AITopicViewer;
