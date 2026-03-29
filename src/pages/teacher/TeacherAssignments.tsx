import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Plus, Trash2, CheckCircle, Clock, ChevronDown, ChevronRight, Sparkles, Play, Loader2, Users } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useData } from "@/contexts/DataContext";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { getCurriculumForClass } from "@/lib/curriculumData";
import { supabase } from "@/integrations/supabase/client";

interface Question {
  id: string;
  type: "mcq" | "truefalse" | "descriptive";
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation?: string;
}

interface Assignment {
  id: string;
  title: string;
  targetClass: string;
  subject: string;
  questions: Question[];
  dueDate: string;
  createdAt: string;
  status: "active" | "closed";
  teacherId: string;
  difficultyLevel: string;
  assignmentType: string;
}

interface SubmissionRecord {
  id: string;
  studentName: string;
  score: number;
  totalQuestions: number;
  submittedAt: string;
  answers: Record<string, string>;
}

const TeacherAssignments = () => {
  const { user } = useAuth();
  const { teachers, getTeacherStudents } = useData();
  const teacher = teachers.find((t) => t.user_id === user?.id || t.id === user?.id);
  const teacherName = teacher ? `${teacher.firstName} ${teacher.lastName}`.trim() : "Your teacher";
  const myClasses = teacher?.classes || [];

  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [submissionsMap, setSubmissionsMap] = useState<Record<string, SubmissionRecord[]>>({});
  const [form, setForm] = useState({ title: "", targetClass: myClasses[0] || "", subject: "", dueDate: "", difficultyLevel: "Medium", assignmentType: "mcq" });
  const [questions, setQuestions] = useState<Question[]>([]);
  const [qForm, setQForm] = useState({ type: "mcq" as Question["type"], question: "", options: ["", "", "", ""], correctAnswer: "" });

  // AI Generation state
  const [showAI, setShowAI] = useState(false);
  const [aiTopic, setAiTopic] = useState("");
  const [aiQType, setAiQType] = useState<"mcq" | "truefalse" | "descriptive" | "mixed">("mixed");
  const [aiCount, setAiCount] = useState(5);
  const [aiLoading, setAiLoading] = useState(false);

  const curriculum = form.targetClass ? getCurriculumForClass(form.targetClass) : undefined;
  const subjects = curriculum?.subjects || [];

  // Fetch assignments from DB
  const fetchAssignments = useCallback(async () => {
    if (!teacher?.id) { setLoading(false); return; }
    setLoading(true);
    try {
      const { data, error } = await supabase.from("assignments").select("*").eq("teacher_id", teacher.id).order("created_at", { ascending: false });
      if (error) { console.error("Fetch assignments error:", error); toast.error("Failed to load assignments. Please refresh."); }
      else {
        const mapped = (data || []).map((a: any) => ({
          id: a.id, title: a.title, targetClass: a.target_class,
          subject: a.subject || "", questions: (a.questions as any[]) || [],
          dueDate: a.due_date || "", createdAt: a.created_at,
          status: a.status || "active", teacherId: a.teacher_id,
          difficultyLevel: a.difficulty_level || "Medium",
          assignmentType: a.assignment_type || "mcq",
        }));
        setAssignments(mapped);

        // Fetch all submissions for these assignments
        if (mapped.length > 0) {
          const ids = mapped.map(a => a.id);
          const { data: subs } = await supabase
            .from("submissions")
            .select("*, students(name)")
            .in("assignment_id", ids);
          
          const map: Record<string, SubmissionRecord[]> = {};
          (subs || []).forEach((s: any) => {
            if (!map[s.assignment_id]) map[s.assignment_id] = [];
            map[s.assignment_id].push({
              id: s.id,
              studentName: s.students?.name || "Unknown",
              score: s.score,
              totalQuestions: s.total_questions,
              submittedAt: s.submitted_at,
              answers: s.answers as Record<string, string>,
            });
          });
          setSubmissionsMap(map);
        }
      }
    } catch (err) {
      console.error("Fetch assignments error:", err);
      toast.error("Failed to load assignments. Please refresh.");
    }
    setLoading(false);
  }, [teacher?.id]);

  useEffect(() => { fetchAssignments(); }, [fetchAssignments]);

  // Update form when myClasses loads
  useEffect(() => {
    if (myClasses.length > 0 && !form.targetClass) {
      setForm(f => ({ ...f, targetClass: myClasses[0] }));
    }
  }, [myClasses]);

  const addQuestion = useCallback(() => {
    if (!qForm.question.trim()) { toast.error("Enter a question"); return; }
    if (!qForm.correctAnswer.trim()) { toast.error("Enter the correct answer"); return; }
    const q: Question = {
      id: crypto.randomUUID(),
      type: qForm.type,
      question: qForm.question,
      options: qForm.type === "mcq" ? qForm.options.filter(Boolean) : undefined,
      correctAnswer: qForm.correctAnswer,
    };
    setQuestions((prev) => [...prev, q]);
    setQForm({ type: "mcq", question: "", options: ["", "", "", ""], correctAnswer: "" });
    toast.success("Question added");
  }, [qForm]);

  const generateWithAI = useCallback(async () => {
    if (!aiTopic.trim()) { toast.error("Enter a topic for AI generation"); return; }
    setAiLoading(true);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    try {
      const { data, error } = await supabase.functions.invoke("generate-assignment", {
        body: {
          topic: aiTopic,
          targetClass: form.targetClass,
          questionType: aiQType,
          count: aiCount,
          difficulty: form.difficultyLevel,
        },
      });

      clearTimeout(timeout);

      if (error) throw new Error(error.message || "AI generation failed. Please try again.");
      if (data?.error) throw new Error(data.error);

      const newQuestions: Question[] = (data.questions || []).map((q: any) => ({
        id: crypto.randomUUID(),
        type: (q.type === "truefalse" ? "truefalse" : q.type === "fillinblanks" ? "descriptive" : q.type === "descriptive" ? "descriptive" : "mcq") as Question["type"],
        question: q.question,
        options: q.type === "mcq" ? q.options : undefined,
        correctAnswer: q.correctAnswer,
        explanation: q.explanation,
      }));

      setQuestions((prev) => [...prev, ...newQuestions]);
      setShowAI(false);
      setAiTopic("");
      toast.success(`${newQuestions.length} questions generated by AI!`);
    } catch (err: any) {
      clearTimeout(timeout);
      if (err.name === "AbortError") {
        toast.error("AI generation timed out. Please try again.");
      } else {
        toast.error(err.message || "AI generation failed. Please try again.");
      }
    }
    setAiLoading(false);
  }, [aiTopic, aiQType, aiCount, form.targetClass, form.difficultyLevel]);

  const createAssignment = useCallback(async () => {
    if (!form.title.trim() || !form.targetClass || !form.subject.trim()) { toast.error("Fill all fields"); return; }
    if (questions.length === 0) { toast.error("Add at least 1 question"); return; }
    if (!teacher?.id || !teacher?.schoolId) { toast.error("Teacher data not loaded"); return; }

    const { error } = await supabase.from("assignments").insert({
      title: form.title,
      description: "",
      assignment_type: form.assignmentType,
      target_class: form.targetClass,
      subject: form.subject,
      school_id: teacher.schoolId,
      teacher_id: teacher.id,
      difficulty_level: form.difficultyLevel,
      questions: questions as any,
      due_date: form.dueDate,
      status: "active",
    });

    if (error) { toast.error("Failed to save assignment: " + error.message); return; }

    // Send notifications to students in this class
    const allStudents = getTeacherStudents(user?.id || "");
    const classStudents = allStudents.filter((s) => `${s.class}-${s.section}` === form.targetClass);
    const notifInserts = classStudents.filter(s => s.user_id).map(s => ({
      user_id: s.user_id!,
      title: "📝 New Assignment from " + teacherName,
      message: `${teacherName} has assigned "${form.title}" (${form.subject}) to your class. It has ${questions.length} question(s)${form.dueDate ? ` and is due by ${new Date(form.dueDate).toLocaleDateString()}` : ""}. Good luck!`,
      type: "project_assigned",
    }));
    if (notifInserts.length > 0) {
      await supabase.from("notifications").insert(notifInserts as any);
    }

    await fetchAssignments();
    setShowForm(false);
    setQuestions([]);
    setForm({ title: "", targetClass: myClasses[0] || "", subject: "", dueDate: "", difficultyLevel: "Medium", assignmentType: "mcq" });
    toast.success("Assignment created!");
  }, [form, questions, teacher, myClasses, fetchAssignments]);

  const deleteAssignment = async (id: string) => {
    const { error } = await supabase.from("assignments").delete().eq("id", id);
    if (error) { toast.error("Delete failed"); return; }
    setAssignments((prev) => prev.filter((a) => a.id !== id));
    toast.success("Assignment deleted");
  };

  return (
    <div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold mb-1"><span className="text-gradient-brand">Assignments</span></h1>
          <p className="text-white/70 font-body">{assignments.length} assignment(s) created</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} className="bg-gradient-to-r from-neon-blue to-neon-purple text-white">
          <Plus className="w-4 h-4 mr-1" /> New Assignment
        </Button>
      </motion.div>

      {/* Create Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden mb-6">
            <div className="glass-card p-6 space-y-4">
              <h2 className="font-display text-lg font-bold text-white">Create Assignment</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Assignment Title" className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-body focus:outline-none focus:border-primary/50" />
                <select value={form.targetClass} onChange={(e) => setForm({ ...form, targetClass: e.target.value })} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-body focus:outline-none focus:border-primary/50">
                  {myClasses.map((c) => <option key={c} value={c} className="bg-[hsl(220,30%,15%)]">{c}</option>)}
                </select>
                <input value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} placeholder="Subject" className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-body focus:outline-none focus:border-primary/50" />
                <input type="date" value={form.dueDate} onChange={(e) => setForm({ ...form, dueDate: e.target.value })} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-body focus:outline-none focus:border-primary/50" />
                <select value={form.difficultyLevel} onChange={(e) => setForm({ ...form, difficultyLevel: e.target.value })} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-body focus:outline-none focus:border-primary/50">
                  {["Easy", "Medium", "Hard"].map((d) => <option key={d} value={d} className="bg-[hsl(220,30%,15%)]">{d}</option>)}
                </select>
                <select value={form.assignmentType} onChange={(e) => setForm({ ...form, assignmentType: e.target.value })} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-body focus:outline-none focus:border-primary/50">
                  <option value="mcq" className="bg-[hsl(220,30%,15%)]">MCQ</option>
                  <option value="truefalse" className="bg-[hsl(220,30%,15%)]">True / False</option>
                  <option value="fillinblanks" className="bg-[hsl(220,30%,15%)]">Fill in the Blanks</option>
                  <option value="mixed" className="bg-[hsl(220,30%,15%)]">Mixed</option>
                </select>
              </div>

              {/* Quick pick subject from curriculum */}
              {subjects.length > 0 && (
                <div>
                  <label className="text-xs text-white/60 font-body uppercase tracking-wider mb-1 block">Quick Pick Subject</label>
                  <div className="flex flex-wrap gap-1">
                    {subjects.map((s) => (
                      <button key={s.id} onClick={() => setForm({ ...form, subject: s.title })} className={`text-xs px-2 py-1 rounded-full border transition-colors ${form.subject === s.title ? "bg-primary/20 text-primary border-primary/30" : "bg-white/5 text-white/60 border-white/10 hover:bg-white/10"}`}>
                        {s.title}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Add Questions Section */}
              <div className="border-t border-white/10 pt-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-display text-sm font-bold text-white/90">Add Questions ({questions.length} added)</h3>
                  <Button size="sm" variant="ghost" onClick={() => setShowAI(!showAI)} className="text-neon-purple border border-neon-purple/30 hover:bg-neon-purple/10">
                    <Sparkles className="w-3.5 h-3.5 mr-1" /> Generate with AI
                  </Button>
                </div>

                {/* AI Generation Panel */}
                <AnimatePresence>
                  {showAI && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden mb-4">
                      <div className="bg-[hsl(260,30%,15%)] border border-neon-purple/20 rounded-xl p-4 space-y-3">
                        <div className="flex items-center gap-2 mb-2">
                          <Sparkles className="w-4 h-4 text-neon-purple" />
                          <span className="font-display text-sm font-bold text-white">AI Question Generator</span>
                        </div>
                        <input value={aiTopic} onChange={(e) => setAiTopic(e.target.value)} placeholder="e.g. HTML Tags, Scratch Loops, MS Word..." className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm font-body focus:outline-none focus:border-neon-purple/50" />

                        {/* Quick pick topics from curriculum */}
                        {subjects.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {subjects.flatMap((s) => s.topics.map((t) => (
                              <button key={t.id} onClick={() => setAiTopic(t.title)} className={`text-[10px] px-2 py-0.5 rounded-full border ${aiTopic === t.title ? "bg-neon-purple/20 text-neon-purple border-neon-purple/30" : "bg-white/5 text-white/50 border-white/10"}`}>
                                {t.title}
                              </button>
                            )))}
                          </div>
                        )}

                        <div className="flex flex-wrap items-center gap-4">
                          <div className="flex gap-2">
                            {(["mixed", "mcq", "truefalse", "descriptive"] as const).map((t) => (
                              <button key={t} onClick={() => setAiQType(t)} className={`px-3 py-1 rounded-lg text-xs font-body ${aiQType === t ? "bg-neon-purple/20 text-neon-purple border border-neon-purple/30" : "bg-white/5 text-white/50 border border-white/10"}`}>
                                {t === "mixed" ? "Mixed" : t === "mcq" ? "MCQ" : t === "truefalse" ? "True/False" : "Fill in Blanks"}
                              </button>
                            ))}
                          </div>
                          <div className="flex gap-1">
                            {[5, 10, 15].map((n) => (
                              <button key={n} onClick={() => setAiCount(n)} className={`px-2.5 py-1 rounded-lg text-xs font-body ${aiCount === n ? "bg-neon-purple/20 text-neon-purple border border-neon-purple/30" : "bg-white/5 text-white/50 border border-white/10"}`}>
                                {n}
                              </button>
                            ))}
                          </div>
                        </div>
                        <Button onClick={generateWithAI} disabled={aiLoading} size="sm" className="bg-gradient-to-r from-neon-purple to-neon-blue text-white">
                          {aiLoading ? <><Loader2 className="w-3.5 h-3.5 mr-1 animate-spin" /> Generating...</> : <><Play className="w-3.5 h-3.5 mr-1" /> Generate</>}
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Manual question add */}
                <div className="space-y-3">
                  <div className="flex gap-3 flex-wrap">
                    {(["mcq", "truefalse", "descriptive"] as const).map((t) => (
                      <button key={t} onClick={() => setQForm({ ...qForm, type: t })} className={`px-3 py-1.5 rounded-lg text-xs font-body uppercase tracking-wider ${qForm.type === t ? "bg-primary/20 text-primary border border-primary/30" : "bg-white/5 text-white/50 border border-white/10"}`}>
                        {t === "mcq" ? "MCQ" : t === "truefalse" ? "True/False" : "Fill in Blanks"}
                      </button>
                    ))}
                  </div>
                  <textarea value={qForm.question} onChange={(e) => setQForm({ ...qForm, question: e.target.value })} placeholder="Enter question..." rows={2} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-body focus:outline-none focus:border-primary/50 resize-none" />

                  {qForm.type === "mcq" && (
                    <div className="grid grid-cols-2 gap-2">
                      {qForm.options.map((opt, i) => (
                        <input key={i} value={opt} onChange={(e) => { const o = [...qForm.options]; o[i] = e.target.value; setQForm({ ...qForm, options: o }); }} placeholder={`Option ${i + 1}`} className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm font-body focus:outline-none focus:border-primary/50" />
                      ))}
                    </div>
                  )}

                  {qForm.type === "truefalse" ? (
                    <div className="flex gap-3">
                      {["True", "False"].map((v) => (
                        <button key={v} onClick={() => setQForm({ ...qForm, correctAnswer: v })} className={`px-4 py-2 rounded-lg text-sm font-body ${qForm.correctAnswer === v ? "bg-neon-green/20 text-neon-green border border-neon-green/30" : "bg-white/5 text-white/50 border border-white/10"}`}>{v}</button>
                      ))}
                    </div>
                  ) : (
                    <input value={qForm.correctAnswer} onChange={(e) => setQForm({ ...qForm, correctAnswer: e.target.value })} placeholder="Correct Answer" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-body focus:outline-none focus:border-primary/50" />
                  )}

                  <Button onClick={addQuestion} size="sm" variant="ghost" className="text-neon-green border border-neon-green/30">
                    <Plus className="w-3.5 h-3.5 mr-1" /> Add Question
                  </Button>
                </div>

                {/* Questions preview */}
                {questions.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {questions.map((q, i) => (
                      <div key={q.id} className="bg-white/5 rounded-lg px-3 py-2 flex items-center justify-between">
                        <span className="text-sm text-white/80 font-body">{i + 1}. {q.question} <span className="text-xs text-white/40">({q.type})</span></span>
                        <button onClick={() => setQuestions(questions.filter((x) => x.id !== q.id))} className="text-white/30 hover:text-destructive"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex gap-3 justify-end pt-2">
                <Button variant="ghost" onClick={() => { setShowForm(false); setQuestions([]); }} className="text-white/50">Cancel</Button>
                <Button onClick={createAssignment} className="bg-gradient-to-r from-neon-green to-neon-blue text-white">Create Assignment</Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Assignment List */}
      {loading ? (
        <div className="glass-card p-12 text-center">
          <Loader2 className="w-8 h-8 text-white/30 mx-auto animate-spin" />
        </div>
      ) : assignments.length === 0 && !showForm ? (
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="glass-card p-12 text-center">
          <FileText className="w-16 h-16 text-white/20 mx-auto mb-4" />
          <p className="text-white/50 font-body">No assignments yet. Click "New Assignment" to create one.</p>
        </motion.div>
      ) : (
        <div className="space-y-3">
          {assignments.map((a, i) => {
            const isExpanded = expandedId === a.id;
            return (
              <motion.div key={a.id} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: i * 0.03 }}>
                <div className="glass-card overflow-hidden">
                  <button onClick={() => setExpandedId(isExpanded ? null : a.id)} className="w-full p-4 flex items-center gap-4 hover:bg-white/5 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center shrink-0">
                      <FileText className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className="font-display text-sm font-bold text-white">{a.title}</h3>
                      <p className="text-xs text-white/60 font-body">{a.targetClass} · {a.subject} · {a.questions.length} questions · {(submissionsMap[a.id] || []).length} submissions</p>
                    </div>
                    <div className="flex items-center gap-3">
                      {a.status === "active" ? (
                        <span className="text-xs bg-neon-green/15 text-neon-green px-2 py-0.5 rounded-full"><Clock className="w-3 h-3 inline mr-1" />Active</span>
                      ) : (
                        <span className="text-xs bg-white/10 text-white/60 px-2 py-0.5 rounded-full"><CheckCircle className="w-3 h-3 inline mr-1" />Closed</span>
                      )}
                      {isExpanded ? <ChevronDown className="w-4 h-4 text-white/50" /> : <ChevronRight className="w-4 h-4 text-white/50" />}
                    </div>
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden">
                        <div className="px-4 pb-4 space-y-2 border-t border-white/10 pt-3">
                          {a.dueDate && <p className="text-xs text-white/50 font-body">Due: {new Date(a.dueDate).toLocaleDateString()}</p>}
                          <p className="text-xs text-white/40 font-body">Difficulty: {a.difficultyLevel} · Type: {a.assignmentType}</p>
                          {a.questions.map((q, qi) => (
                            <div key={q.id || qi} className="bg-white/5 rounded-lg p-3">
                              <p className="text-sm text-white/90 font-body mb-1">{qi + 1}. {q.question}</p>
                              {q.options && (
                                <div className="flex flex-wrap gap-2 mb-1">
                                  {q.options.map((opt, oi) => (
                                    <span key={oi} className={`text-xs px-2 py-0.5 rounded-full ${opt === q.correctAnswer ? "bg-neon-green/15 text-neon-green" : "bg-white/5 text-white/60"}`}>{opt}</span>
                                  ))}
                                </div>
                              )}
                              <p className="text-xs text-neon-green/80 font-body">Answer: {q.correctAnswer}</p>
                            </div>
                          ))}
                          {/* Student Submissions */}
                          {(submissionsMap[a.id] || []).length > 0 && (
                            <div className="mt-3 border-t border-white/10 pt-3">
                              <p className="text-xs text-white/50 font-body flex items-center gap-1 mb-2"><Users className="w-3.5 h-3.5" /> {submissionsMap[a.id].length} Student Submission(s)</p>
                              <div className="space-y-1.5">
                                {submissionsMap[a.id].map((sub) => (
                                  <div key={sub.id} className="bg-white/5 rounded-lg p-2.5 flex items-center justify-between">
                                    <div>
                                      <p className="text-sm text-white/90 font-body font-semibold">{sub.studentName}</p>
                                      <p className="text-xs text-white/50 font-body">{new Date(sub.submittedAt).toLocaleString()}</p>
                                    </div>
                                    <span className={`text-xs px-2 py-0.5 rounded-full font-body ${sub.score >= 70 ? "bg-neon-green/15 text-neon-green" : sub.score >= 40 ? "bg-neon-orange/15 text-neon-orange" : "bg-destructive/15 text-destructive"}`}>
                                      {sub.score}%
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                          <div className="flex justify-end pt-2">
                            <Button size="sm" variant="ghost" onClick={() => deleteAssignment(a.id)} className="text-destructive hover:text-destructive/80">
                              <Trash2 className="w-3.5 h-3.5 mr-1" /> Delete
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TeacherAssignments;
