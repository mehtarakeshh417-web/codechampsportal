import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Code, ChevronDown, ChevronRight, Clock, CheckCircle2, Send, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useData } from "@/contexts/DataContext";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface Question {
  id: string;
  type: "mcq" | "truefalse" | "descriptive";
  question: string;
  options?: string[];
  correctAnswer: string;
}

interface Assignment {
  id: string;
  title: string;
  targetClass: string;
  subject: string;
  questions: Question[];
  dueDate: string;
  createdAt: string;
  status: string;
  teacherName: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  targetClass: string;
  technology: string;
  submissionType: string;
  dueDate: string;
  createdAt: string;
}

interface Submission {
  assignmentId: string;
  studentId: string;
  answers: Record<string, string>;
  submittedAt: string;
  score?: number;
}

// Submissions are now persisted in Supabase

const StudentAssignments = () => {
  const { user } = useAuth();
  const { students, teachers } = useData();
  const student = students.find((s) => s.user_id === user?.id || s.id === user?.id);

  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [projSubmissions, setProjSubmissions] = useState<Record<string, string>>({});
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [projNote, setProjNote] = useState("");

  const fetchData = useCallback(async () => {
    if (!student) { setLoading(false); return; }
    setLoading(true);

    try {
      const [aRes, pRes, subRes, projSubRes] = await Promise.all([
        supabase.from("assignments").select("*, teachers(first_name, last_name)").eq("status", "active"),
        supabase.from("projects").select("*"),
        supabase.from("submissions").select("*").eq("student_id", student.id),
        supabase.from("project_submissions" as any).select("*").eq("student_id", student.id),
      ]);

      if (aRes.data) {
        setAssignments(aRes.data.map((a: any) => ({
          id: a.id, title: a.title, targetClass: a.target_class,
          subject: a.subject || "", questions: (a.questions as any[]) || [],
          dueDate: a.due_date || "", createdAt: a.created_at, status: a.status,
          teacherName: a.teachers ? `${a.teachers.first_name} ${a.teachers.last_name || ""}`.trim() : "Teacher",
        })));
      } else { setAssignments([]); }

      if (pRes.data) {
        setProjects(pRes.data.map((p: any) => ({
          id: p.id, title: p.title, description: p.description,
          targetClass: p.target_class, technology: p.technology,
          submissionType: p.submission_type || "Screenshot",
          dueDate: p.due_date || "", createdAt: p.created_at,
        })));
      } else { setProjects([]); }

      if (subRes.data) {
        setSubmissions(subRes.data.map((s: any) => ({
          assignmentId: s.assignment_id, studentId: s.student_id,
          answers: s.answers as Record<string, string>,
          submittedAt: s.submitted_at, score: s.score,
        })));
      }

      if (projSubRes.data) {
        const map: Record<string, string> = {};
        (projSubRes.data as any[]).forEach((ps: any) => { map[ps.project_id] = ps.notes; });
        setProjSubmissions(map);
      }
    } catch (err) {
      console.error("Failed to load assignments:", err);
      toast.error("Failed to load assignments. Please refresh.");
      setAssignments([]);
      setProjects([]);
    }

    setLoading(false);
  }, [student]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const isSubmitted = (assignmentId: string) => submissions.some((s) => s.assignmentId === assignmentId);
  const getSubmission = (assignmentId: string) => submissions.find((s) => s.assignmentId === assignmentId);

  const submitAssignment = async (assignment: Assignment) => {
    if (!student) return;
    const answered = assignment.questions.filter((q) => answers[q.id]?.trim()).length;
    if (answered < assignment.questions.length) {
      toast.error(`Please answer all questions (${answered}/${assignment.questions.length})`);
      return;
    }
    let correct = 0;
    assignment.questions.forEach((q) => {
      if (answers[q.id]?.trim().toLowerCase() === q.correctAnswer.trim().toLowerCase()) correct++;
    });
    const score = Math.round((correct / assignment.questions.length) * 100);

    const { error } = await supabase.from("submissions").insert({
      assignment_id: assignment.id,
      student_id: student.id,
      answers: { ...answers } as any,
      score,
      total_questions: assignment.questions.length,
    });

    if (error) { toast.error("Failed to submit. Try again."); console.error(error); return; }

    // Notify the teacher that student submitted assignment
    // Fetch teacher via the assignment's teacher_id from DB
    const { data: assignmentData } = await supabase.from("assignments").select("teacher_id, teachers(user_id, first_name)").eq("id", assignment.id).single();
    const assignmentTeacherUserId = (assignmentData as any)?.teachers?.user_id;
    if (assignmentTeacherUserId) {
      await supabase.from("notifications").insert({
        user_id: assignmentTeacherUserId,
        title: `📋 ${student.name} submitted an assignment`,
        message: `${student.name} (${student.class}-${student.section}) has submitted "${assignment.title}" and scored ${score}% (${correct}/${assignment.questions.length} correct).`,
        type: "project_submitted",
      } as any);
    }

    const sub: Submission = { assignmentId: assignment.id, studentId: student.id, answers: { ...answers }, submittedAt: new Date().toISOString(), score };
    setSubmissions([...submissions, sub]);
    setAnswers({});
    setExpandedId(null);
    toast.success(`Submitted! Score: ${score}% (${correct}/${assignment.questions.length} correct)`);
  };

  const submitProject = async (projectId: string) => {
    if (!student) return;
    if (!projNote.trim()) { toast.error("Enter your submission notes"); return; }

    const { error } = await supabase.from("project_submissions" as any).insert({
      project_id: projectId,
      student_id: student.id,
      notes: projNote,
    } as any);

    if (error) { toast.error("Failed to submit. Try again."); console.error(error); return; }

    // Find the project to get its teacher
    const proj = projects.find(p => p.id === projectId);

    // Notify the teacher
    // We need to find the teacher via the project's teacher_id - fetch it
    const { data: projData } = await supabase.from("projects").select("teacher_id, teachers(user_id, first_name)").eq("id", projectId).single();
    if (projData && (projData as any).teachers?.user_id) {
      await supabase.from("notifications").insert({
        user_id: (projData as any).teachers.user_id,
        title: `🚀 ${student.name} submitted a project`,
        message: `${student.name} (${student.class}-${student.section}) has submitted the project "${proj?.title || ""}". Review it in your Projects dashboard.`,
        type: "project_submitted",
      } as any);
    }

    setProjSubmissions({ ...projSubmissions, [projectId]: projNote });
    setProjNote("");
    toast.success("Project submitted!");
  };

  if (loading) {
    return (
      <div className="glass-card p-12 text-center">
        <Loader2 className="w-8 h-8 text-white/30 mx-auto animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="font-display text-3xl font-bold mb-1"><span className="text-gradient-brand">Assignments & Projects</span></h1>
        <p className="text-white/70 font-body mb-6">{assignments.length} assignment(s) · {projects.length} project(s) assigned to you</p>
      </motion.div>

      <Tabs defaultValue="assignments" className="w-full">
        <TabsList className="bg-white/5 border border-white/10 mb-6">
          <TabsTrigger value="assignments" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary text-white/70 font-body gap-1">
            <FileText className="w-3.5 h-3.5" /> Assignments ({assignments.length})
          </TabsTrigger>
          <TabsTrigger value="projects" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary text-white/70 font-body gap-1">
            <Code className="w-3.5 h-3.5" /> Projects ({projects.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="assignments">
          {assignments.length === 0 ? (
            <div className="glass-card p-12 text-center">
              <FileText className="w-16 h-16 text-white/20 mx-auto mb-4" />
              <p className="text-white/50 font-body">No assignments pending. Check back when your teacher creates one!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {assignments.map((a, i) => {
                const submitted = isSubmitted(a.id);
                const sub = getSubmission(a.id);
                const isExpanded = expandedId === a.id;
                return (
                  <motion.div key={a.id} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: i * 0.03 }}>
                    <div className="glass-card overflow-hidden">
                      <button onClick={() => setExpandedId(isExpanded ? null : a.id)} className="w-full p-4 flex items-center gap-4 hover:bg-white/5 transition-colors">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${submitted ? "bg-gradient-to-br from-neon-green to-[hsl(170,80%,45%)]" : "bg-gradient-to-br from-neon-blue to-neon-purple"}`}>
                          {submitted ? <CheckCircle2 className="w-5 h-5 text-white" /> : <FileText className="w-5 h-5 text-white" />}
                        </div>
                        <div className="flex-1 text-left">
                          <h3 className="font-display text-sm font-bold text-white">{a.title}</h3>
                          <p className="text-xs text-white/60 font-body">{a.subject} · {a.questions.length} questions · by {a.teacherName}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {submitted ? (
                            <span className="text-xs bg-neon-green/15 text-neon-green px-2 py-0.5 rounded-full font-body">Score: {sub?.score}%</span>
                          ) : (
                            a.dueDate && <span className="text-xs text-white/50 font-body flex items-center gap-1"><Clock className="w-3 h-3" /> {new Date(a.dueDate).toLocaleDateString()}</span>
                          )}
                          {isExpanded ? <ChevronDown className="w-4 h-4 text-white/50" /> : <ChevronRight className="w-4 h-4 text-white/50" />}
                        </div>
                      </button>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden">
                            <div className="px-4 pb-4 space-y-3 border-t border-white/10 pt-3">
                              {submitted ? (
                                <div className="space-y-2">
                                  <div className="bg-neon-green/10 border border-neon-green/20 rounded-xl p-4 text-center">
                                    <CheckCircle2 className="w-8 h-8 text-neon-green mx-auto mb-2" />
                                    <p className="font-display text-lg font-bold text-white">Score: {sub?.score}%</p>
                                    <p className="text-xs text-white/50 font-body">Submitted on {new Date(sub?.submittedAt || "").toLocaleString()}</p>
                                  </div>
                                  {a.questions.map((q, qi) => (
                                    <div key={q.id} className="bg-white/5 rounded-lg p-3">
                                      <p className="text-sm text-white/90 font-body mb-1">{qi + 1}. {q.question}</p>
                                      <p className="text-xs font-body">
                                        <span className="text-white/50">Your answer: </span>
                                        <span className={sub?.answers[q.id]?.toLowerCase() === q.correctAnswer.toLowerCase() ? "text-neon-green" : "text-destructive"}>{sub?.answers[q.id] || "—"}</span>
                                      </p>
                                      <p className="text-xs text-neon-green/70 font-body">Correct: {q.correctAnswer}</p>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <div className="space-y-3">
                                  {a.questions.map((q, qi) => (
                                    <div key={q.id} className="bg-white/5 rounded-xl p-4">
                                      <p className="text-sm text-white/90 font-body font-semibold mb-2">{qi + 1}. {q.question}</p>
                                      {q.type === "mcq" && q.options ? (
                                        <div className="space-y-1.5">
                                          {q.options.map((opt) => (
                                            <button key={opt} onClick={() => setAnswers({ ...answers, [q.id]: opt })} className={`w-full text-left px-3 py-2 rounded-lg text-sm font-body transition-colors ${answers[q.id] === opt ? "bg-primary/20 text-primary border border-primary/30" : "bg-white/5 text-white/70 border border-white/10 hover:bg-white/10"}`}>
                                              {opt}
                                            </button>
                                          ))}
                                        </div>
                                      ) : q.type === "truefalse" ? (
                                        <div className="flex gap-3">
                                          {["True", "False"].map((v) => (
                                            <button key={v} onClick={() => setAnswers({ ...answers, [q.id]: v })} className={`px-4 py-2 rounded-lg text-sm font-body ${answers[q.id] === v ? "bg-primary/20 text-primary border border-primary/30" : "bg-white/5 text-white/70 border border-white/10"}`}>{v}</button>
                                          ))}
                                        </div>
                                      ) : (
                                        <textarea value={answers[q.id] || ""} onChange={(e) => setAnswers({ ...answers, [q.id]: e.target.value })} placeholder="Type your answer..." rows={2} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm font-body focus:outline-none focus:border-primary/50 resize-none" />
                                      )}
                                    </div>
                                  ))}
                                  <div className="flex justify-end">
                                    <Button onClick={() => submitAssignment(a)} className="bg-gradient-to-r from-neon-green to-neon-blue text-white">
                                      <Send className="w-4 h-4 mr-1" /> Submit Assignment
                                    </Button>
                                  </div>
                                </div>
                              )}
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
        </TabsContent>

        <TabsContent value="projects">
          {projects.length === 0 ? (
            <div className="glass-card p-12 text-center">
              <Code className="w-16 h-16 text-white/20 mx-auto mb-4" />
              <p className="text-white/50 font-body">No projects assigned yet. Check back later!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {projects.map((p, i) => {
                const isExpanded = expandedId === p.id;
                const isProjectSubmitted = !!projSubmissions[p.id];
                return (
                  <motion.div key={p.id} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: i * 0.03 }}>
                    <div className="glass-card overflow-hidden">
                      <button onClick={() => setExpandedId(isExpanded ? null : p.id)} className="w-full p-4 flex items-center gap-4 hover:bg-white/5 transition-colors">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${isProjectSubmitted ? "bg-gradient-to-br from-neon-green to-[hsl(170,80%,45%)]" : "bg-gradient-to-br from-neon-orange to-[hsl(45,100%,55%)]"}`}>
                          {isProjectSubmitted ? <CheckCircle2 className="w-5 h-5 text-white" /> : <Code className="w-5 h-5 text-white" />}
                        </div>
                        <div className="flex-1 text-left">
                          <h3 className="font-display text-sm font-bold text-white">{p.title}</h3>
                          <p className="text-xs text-white/60 font-body">{p.technology} · {p.submissionType}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs bg-neon-orange/15 text-neon-orange px-2 py-0.5 rounded-full">{p.technology}</span>
                          {isProjectSubmitted && <span className="text-xs bg-neon-green/15 text-neon-green px-2 py-0.5 rounded-full">Submitted</span>}
                          {isExpanded ? <ChevronDown className="w-4 h-4 text-white/50" /> : <ChevronRight className="w-4 h-4 text-white/50" />}
                        </div>
                      </button>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden">
                            <div className="px-4 pb-4 space-y-3 border-t border-white/10 pt-3">
                              <p className="text-sm text-white/80 font-body">{p.description}</p>
                              {p.dueDate && <p className="text-xs text-white/50 font-body flex items-center gap-1"><Clock className="w-3 h-3" /> Due: {new Date(p.dueDate).toLocaleDateString()}</p>}

                              {isProjectSubmitted ? (
                                <div className="bg-neon-green/10 border border-neon-green/20 rounded-xl p-4">
                                  <CheckCircle2 className="w-6 h-6 text-neon-green mx-auto mb-2" />
                                  <p className="text-sm text-white/80 font-body text-center">Project submitted!</p>
                                  <p className="text-xs text-white/50 font-body text-center mt-1">Your notes: {projSubmissions[p.id]}</p>
                                </div>
                              ) : (
                                <div className="space-y-2">
                                  <textarea value={projNote} onChange={(e) => setProjNote(e.target.value)} placeholder="Describe your work, paste links, or add notes about your project..." rows={3} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-body focus:outline-none focus:border-primary/50 resize-none" />
                                  <div className="flex justify-end">
                                    <Button onClick={() => submitProject(p.id)} className="bg-gradient-to-r from-neon-orange to-[hsl(45,100%,55%)] text-white">
                                      <Send className="w-4 h-4 mr-1" /> Submit Project
                                    </Button>
                                  </div>
                                </div>
                              )}
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
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudentAssignments;
