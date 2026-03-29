import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code, Loader2, CheckCircle2, Clock, Target, Upload, Link2, FileCode, Image, Star, MessageCircle, ChevronRight, ExternalLink, AlertCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useData } from "@/contexts/DataContext";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface ProjectData {
  id: string;
  title: string;
  description: string;
  technology: string;
  submissionType: string;
  dueDate: string;
  learningObjective: string;
  instructions: string[];
  referenceResources: string[];
  expectedOutput: string;
  maxMarks: number;
  difficultyLevel: string;
  estimatedTime: string;
}

interface MySubmission {
  id: string;
  notes: string;
  submittedAt: string;
  submissionType: string;
  fileUrl: string;
  codeContent: string;
  linkUrl: string;
  marks: number | null;
  grade: string;
  feedback: string;
  strengths: string;
  improvements: string;
  evaluationStatus: string;
  checklistProgress: boolean[];
  allowResubmission: boolean;
}

const difficultyColor = (d: string) => {
  if (d === "Easy") return "bg-[hsl(var(--neon-green))]/15 text-[hsl(var(--neon-green))]";
  if (d === "Medium") return "bg-[hsl(var(--neon-orange))]/15 text-[hsl(var(--neon-orange))]";
  if (d === "Hard") return "bg-[hsl(var(--destructive))]/15 text-[hsl(var(--destructive))]";
  return "bg-[hsl(var(--secondary))]/15 text-[hsl(var(--secondary))]";
};

const StudentProjects = () => {
  const { user } = useAuth();
  const { students } = useData();
  const student = students.find((s) => s.user_id === user?.id);

  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [submissions, setSubmissions] = useState<Record<string, MySubmission>>({});
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Submission form state
  const [submitNotes, setSubmitNotes] = useState("");
  const [submitCode, setSubmitCode] = useState("");
  const [submitLink, setSubmitLink] = useState("");
  const [submitFile, setSubmitFile] = useState<File | null>(null);
  const [checklist, setChecklist] = useState<boolean[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchData = useCallback(async () => {
    if (!student) { setLoading(false); return; }
    setLoading(true);
    try {
      const { data: projectsData } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });

      const mapped = (projectsData || []).map((p: any) => ({
        id: p.id, title: p.title, description: p.description,
        technology: p.technology, submissionType: p.submission_type || "Screenshot",
        dueDate: p.due_date || "",
        learningObjective: p.learning_objective || "",
        instructions: Array.isArray(p.instructions) ? p.instructions : [],
        referenceResources: Array.isArray(p.reference_resources) ? p.reference_resources : [],
        expectedOutput: p.expected_output || "",
        maxMarks: p.max_marks || 100,
        difficultyLevel: p.difficulty_level || "Medium",
        estimatedTime: p.estimated_time || "",
      }));
      setProjects(mapped);

      // Fetch my submissions
      const { data: subs } = await supabase
        .from("project_submissions" as any)
        .select("*")
        .eq("student_id", student.id);

      const subMap: Record<string, MySubmission> = {};
      ((subs || []) as any[]).forEach((s: any) => {
        subMap[s.project_id] = {
          id: s.id, notes: s.notes, submittedAt: s.submitted_at,
          submissionType: s.submission_type || "screenshot",
          fileUrl: s.file_url || "", codeContent: s.code_content || "",
          linkUrl: s.link_url || "", marks: s.marks,
          grade: s.grade || "", feedback: s.feedback || "",
          strengths: s.strengths || "", improvements: s.improvements || "",
          evaluationStatus: s.evaluation_status || "pending",
          checklistProgress: Array.isArray(s.checklist_progress) ? s.checklist_progress : [],
          allowResubmission: s.allow_resubmission !== false,
        };
      });
      setSubmissions(subMap);
    } catch (err) { console.error(err); }
    setLoading(false);
  }, [student]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const openProject = (projectId: string) => {
    const proj = projects.find(p => p.id === projectId);
    setSelectedProject(projectId);
    if (proj) {
      setChecklist(submissions[projectId]?.checklistProgress?.length > 0
        ? submissions[projectId].checklistProgress
        : proj.instructions.map(() => false));
    }
    setSubmitNotes("");
    setSubmitCode("");
    setSubmitLink("");
    setSubmitFile(null);
  };

  const updateChecklist = async (projectId: string, idx: number) => {
    const newChecklist = [...checklist];
    newChecklist[idx] = !newChecklist[idx];
    setChecklist(newChecklist);

    // Save checklist progress if submission exists
    const sub = submissions[projectId];
    if (sub) {
      await supabase.from("project_submissions" as any)
        .update({ checklist_progress: newChecklist } as any)
        .eq("id", sub.id);
    }
  };

  const handleSubmit = async (projectId: string) => {
    if (!student) return;
    setSubmitting(true);
    const proj = projects.find(p => p.id === projectId);

    let fileUrl = "";
    if (submitFile) {
      const filePath = `${user?.id}/${Date.now()}-${submitFile.name}`;
      const { error: uploadError } = await supabase.storage
        .from("project-files")
        .upload(filePath, submitFile);
      if (uploadError) { toast.error("File upload failed"); setSubmitting(false); return; }
      const { data: urlData } = supabase.storage.from("project-files").getPublicUrl(filePath);
      fileUrl = urlData.publicUrl;
    }

    const submissionData = {
      project_id: projectId,
      student_id: student.id,
      notes: submitNotes,
      submission_type: proj?.submissionType?.toLowerCase().replace(" ", "_") || "screenshot",
      file_url: fileUrl,
      code_content: submitCode,
      link_url: submitLink,
      checklist_progress: checklist,
    };

    const existingSub = submissions[projectId];
    let error;
    if (existingSub && existingSub.allowResubmission) {
      ({ error } = await supabase.from("project_submissions" as any).update(submissionData as any).eq("id", existingSub.id));
    } else {
      ({ error } = await supabase.from("project_submissions" as any).insert(submissionData as any));
    }

    if (error) { toast.error("Submission failed: " + error.message); setSubmitting(false); return; }

    // Notify self (student)
    await supabase.from("notifications").insert({
      user_id: user?.id,
      title: "✅ Project Submitted Successfully",
      message: `Your project "${proj?.title}" has been submitted. Your teacher will review it soon. Keep up the great work, ${student.name}!`,
      type: "project_submitted",
    } as any);

    // Notify teacher
    const { data: projData } = await supabase.from("projects").select("teacher_id, teachers(user_id, first_name)").eq("id", projectId).single();
    if (projData && (projData as any).teachers?.user_id) {
      await supabase.from("notifications").insert({
        user_id: (projData as any).teachers.user_id,
        title: `🚀 ${student.name} submitted a project`,
        message: `${student.name} (${student.class}-${student.section}) has submitted "${proj?.title || ""}". Head to Projects to review their work.`,
        type: "project_submitted",
      } as any);
    }

    toast.success(existingSub ? "Project resubmitted!" : "Project submitted! 🎉");
    setSubmitting(false);
    await fetchData();
  };

  const selected = selectedProject ? projects.find(p => p.id === selectedProject) : null;
  const mySub = selectedProject ? submissions[selectedProject] : null;
  const isOverdue = selected?.dueDate ? new Date(selected.dueDate) < new Date() : false;

  if (loading) return <div className="glass-card p-12 text-center"><Loader2 className="w-8 h-8 text-white/30 mx-auto animate-spin" /></div>;

  // PROJECT DETAIL VIEW
  if (selected) {
    return (
      <div>
        <button onClick={() => setSelectedProject(null)} className="text-xs text-[hsl(var(--neon-blue))] hover:underline font-body mb-4 flex items-center gap-1">
          ← Back to Projects
        </button>

        {/* Project Header Banner */}
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
          className="glass-card overflow-hidden mb-6 border border-white/10">
          <div className="bg-gradient-to-r from-[hsl(var(--neon-blue))]/20 to-[hsl(var(--secondary))]/20 p-6">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[hsl(var(--neon-green))] to-[hsl(var(--neon-blue))] flex items-center justify-center shrink-0">
                <Code className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1">
                <h1 className="font-display text-2xl font-bold text-white">{selected.title}</h1>
                <div className="flex flex-wrap items-center gap-2 mt-2">
                  <span className="text-xs bg-[hsl(var(--neon-blue))]/15 text-[hsl(var(--neon-blue))] px-2 py-0.5 rounded-full font-body">{selected.technology}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-body font-bold ${difficultyColor(selected.difficultyLevel)}`}>{selected.difficultyLevel}</span>
                  {selected.dueDate && (
                    <span className={`text-xs px-2 py-0.5 rounded-full font-body flex items-center gap-1 ${isOverdue ? "bg-[hsl(var(--destructive))]/15 text-[hsl(var(--destructive))]" : "bg-white/10 text-white/60"}`}>
                      <Clock className="w-3 h-3" /> Due: {new Date(selected.dueDate).toLocaleDateString()}
                    </span>
                  )}
                  {selected.estimatedTime && <span className="text-xs bg-white/10 text-white/60 px-2 py-0.5 rounded-full font-body">⏱ {selected.estimatedTime}</span>}
                  <span className="text-xs bg-white/10 text-white/60 px-2 py-0.5 rounded-full font-body">Max: {selected.maxMarks} marks</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Project Details */}
          <div className="lg:col-span-2 space-y-4">
            {/* Description */}
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="glass-card p-5">
              <h3 className="text-sm text-white/50 font-body font-bold uppercase mb-2">📖 Description</h3>
              <p className="text-sm text-white/80 font-body leading-relaxed">{selected.description}</p>
            </motion.div>

            {/* Learning Objective */}
            {selected.learningObjective && (
              <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.15 }}
                className="glass-card p-5 border-l-4 border-[hsl(var(--neon-blue))]">
                <h3 className="text-sm text-[hsl(var(--neon-blue))] font-body font-bold uppercase mb-2">🎯 Learning Objective</h3>
                <p className="text-sm text-white/70 font-body">{selected.learningObjective}</p>
              </motion.div>
            )}

            {/* Steps Checklist */}
            {selected.instructions.length > 0 && (
              <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="glass-card p-5">
                <h3 className="text-sm text-white/50 font-body font-bold uppercase mb-3">📋 Steps to Complete</h3>
                <div className="space-y-2">
                  {selected.instructions.map((step, idx) => (
                    <button key={idx} onClick={() => updateChecklist(selected.id, idx)}
                      className="w-full flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors text-left group">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                        checklist[idx]
                          ? "bg-[hsl(var(--neon-green))] text-white"
                          : "border-2 border-white/20 group-hover:border-white/40"
                      }`}>
                        {checklist[idx] ? <CheckCircle2 className="w-4 h-4" /> : <span className="text-[10px] text-white/30 font-bold">{idx + 1}</span>}
                      </div>
                      <p className={`text-sm font-body ${checklist[idx] ? "text-white/40 line-through" : "text-white/80"}`}>{step}</p>
                    </button>
                  ))}
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <div className="flex-1 h-2 rounded-full bg-white/10 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${checklist.filter(Boolean).length / checklist.length * 100}%` }}
                      className="h-full bg-gradient-to-r from-[hsl(var(--neon-green))] to-[hsl(var(--neon-blue))] rounded-full"
                    />
                  </div>
                  <span className="text-xs text-white/40 font-body">{checklist.filter(Boolean).length}/{checklist.length}</span>
                </div>
              </motion.div>
            )}

            {/* Expected Output */}
            {selected.expectedOutput && (
              <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.25 }}
                className="glass-card p-5 border-l-4 border-[hsl(var(--neon-green))]">
                <h3 className="text-sm text-[hsl(var(--neon-green))] font-body font-bold uppercase mb-2">✨ Expected Output</h3>
                <p className="text-sm text-white/70 font-body">{selected.expectedOutput}</p>
              </motion.div>
            )}

            {/* Resources */}
            {selected.referenceResources.length > 0 && selected.referenceResources[0] && (
              <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="glass-card p-5">
                <h3 className="text-sm text-white/50 font-body font-bold uppercase mb-2">🔗 Resources</h3>
                <div className="space-y-1.5">
                  {selected.referenceResources.filter(Boolean).map((res, idx) => (
                    <a key={idx} href={res} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2 text-xs text-[hsl(var(--neon-blue))] hover:underline font-body p-2 rounded-lg hover:bg-white/5">
                      <ExternalLink className="w-3.5 h-3.5" /> {res}
                    </a>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Right: Submission & Evaluation */}
          <div className="space-y-4">
            {/* My Submission Status */}
            {mySub && (
              <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}
                className={`glass-card p-5 border ${
                  mySub.evaluationStatus === "approved" ? "border-[hsl(var(--neon-green))]/30" :
                  mySub.evaluationStatus === "needs_improvement" ? "border-[hsl(var(--neon-orange))]/30" :
                  "border-white/10"
                }`}>
                <h3 className="text-sm text-white/50 font-body font-bold uppercase mb-3">📊 My Submission</h3>

                <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-body font-bold mb-3 ${
                  mySub.evaluationStatus === "approved" ? "bg-[hsl(var(--neon-green))]/15 text-[hsl(var(--neon-green))]" :
                  mySub.evaluationStatus === "needs_improvement" ? "bg-[hsl(var(--neon-orange))]/15 text-[hsl(var(--neon-orange))]" :
                  "bg-white/10 text-white/50"
                }`}>
                  {mySub.evaluationStatus === "pending" ? "⏳ Pending Review" : mySub.evaluationStatus === "approved" ? "✅ Approved" : "🔄 Needs Improvement"}
                </div>

                <p className="text-[10px] text-white/40 font-body mb-2">Submitted: {new Date(mySub.submittedAt).toLocaleString()}</p>

                {mySub.marks !== null && (
                  <div className="bg-white/5 rounded-xl p-3 mb-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-white/50 font-body">Score</span>
                      <span className="font-display text-xl font-bold text-[hsl(var(--neon-green))]">{mySub.marks}<span className="text-sm text-white/30">/{selected.maxMarks}</span></span>
                    </div>
                    {mySub.grade && <p className="text-xs text-white/50 font-body mt-1">Grade: <span className="text-white font-bold">{mySub.grade}</span></p>}
                    <div className="w-full h-2 rounded-full bg-white/10 mt-2 overflow-hidden">
                      <div className="h-full rounded-full bg-gradient-to-r from-[hsl(var(--neon-green))] to-[hsl(var(--neon-blue))]" style={{ width: `${(mySub.marks / selected.maxMarks) * 100}%` }} />
                    </div>
                  </div>
                )}

                {mySub.feedback && (
                  <div className="bg-[hsl(var(--secondary))]/5 rounded-xl p-3 border border-[hsl(var(--secondary))]/10 mb-2">
                    <p className="text-[10px] text-[hsl(var(--secondary))] font-body font-bold mb-1 flex items-center gap-1"><MessageCircle className="w-3 h-3" /> Teacher Feedback</p>
                    <p className="text-xs text-white/70 font-body">{mySub.feedback}</p>
                  </div>
                )}
                {mySub.strengths && (
                  <p className="text-xs text-white/50 font-body mb-1">💪 <span className="text-white/70">{mySub.strengths}</span></p>
                )}
                {mySub.improvements && (
                  <p className="text-xs text-white/50 font-body">📝 <span className="text-white/70">{mySub.improvements}</span></p>
                )}
              </motion.div>
            )}

            {/* Submission Form */}
            {(!mySub || (mySub.allowResubmission && mySub.evaluationStatus !== "approved")) && (
              <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
                className="glass-card p-5">
                <h3 className="text-sm text-white/50 font-body font-bold uppercase mb-3">
                  {mySub ? "📤 Resubmit Project" : "📤 Submit Project"}
                </h3>

                {isOverdue && (
                  <div className="bg-[hsl(var(--destructive))]/10 rounded-lg p-2.5 mb-3 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-[hsl(var(--destructive))]" />
                    <p className="text-xs text-[hsl(var(--destructive))] font-body">This project is past its due date</p>
                  </div>
                )}

                <div className="space-y-3">
                  {/* Notes */}
                  <div>
                    <label className="text-[10px] text-white/40 font-body mb-1 block">Notes / Description</label>
                    <textarea value={submitNotes} onChange={e => setSubmitNotes(e.target.value)} placeholder="Describe your work..." rows={3}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm font-body resize-none focus:outline-none focus:border-[hsl(var(--primary))]/50" />
                  </div>

                  {/* Conditional submission types */}
                  {(selected.submissionType === "Code" || selected.submissionType === "code") && (
                    <div>
                      <label className="text-[10px] text-white/40 font-body mb-1 block flex items-center gap-1"><FileCode className="w-3 h-3" /> Code</label>
                      <textarea value={submitCode} onChange={e => setSubmitCode(e.target.value)} placeholder="Paste your code here..." rows={6}
                        className="w-full bg-black/30 border border-white/10 rounded-xl px-3 py-2.5 text-[hsl(var(--neon-green))] text-xs font-mono resize-none focus:outline-none focus:border-[hsl(var(--primary))]/50" />
                    </div>
                  )}

                  {(selected.submissionType === "Link" || selected.submissionType === "link") && (
                    <div>
                      <label className="text-[10px] text-white/40 font-body mb-1 block flex items-center gap-1"><Link2 className="w-3 h-3" /> Project Link</label>
                      <input value={submitLink} onChange={e => setSubmitLink(e.target.value)} placeholder="https://..." 
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm font-body focus:outline-none focus:border-[hsl(var(--primary))]/50" />
                    </div>
                  )}

                  {(selected.submissionType === "File Upload" || selected.submissionType === "Screenshot" || selected.submissionType === "file_upload" || selected.submissionType === "screenshot") && (
                    <div>
                      <label className="text-[10px] text-white/40 font-body mb-1 block flex items-center gap-1">
                        {selected.submissionType.includes("Screenshot") || selected.submissionType === "screenshot" ? <><Image className="w-3 h-3" /> Screenshot</> : <><Upload className="w-3 h-3" /> File Upload</>}
                      </label>
                      <input ref={fileInputRef} type="file" onChange={e => setSubmitFile(e.target.files?.[0] || null)} className="hidden" accept="image/*,.pdf,.zip,.html,.py,.txt" />
                      <button onClick={() => fileInputRef.current?.click()}
                        className="w-full border-2 border-dashed border-white/10 rounded-xl p-6 text-center hover:border-[hsl(var(--neon-blue))]/30 hover:bg-white/[0.02] transition-colors">
                        {submitFile ? (
                          <p className="text-sm text-[hsl(var(--neon-green))] font-body">{submitFile.name}</p>
                        ) : (
                          <>
                            <Upload className="w-8 h-8 text-white/20 mx-auto mb-2" />
                            <p className="text-xs text-white/40 font-body">Click to upload file</p>
                          </>
                        )}
                      </button>
                    </div>
                  )}

                  <Button onClick={() => handleSubmit(selected.id)} disabled={submitting}
                    className="w-full bg-gradient-to-r from-[hsl(var(--neon-green))] to-[hsl(var(--neon-blue))] text-white font-body">
                    {submitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Upload className="w-4 h-4 mr-2" />}
                    {mySub ? "Resubmit Project" : "Submit Project"}
                  </Button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // PROJECT LIST VIEW
  return (
    <div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8">
        <h1 className="font-display text-3xl font-bold mb-1"><span className="text-gradient-brand">My Projects</span></h1>
        <p className="text-white/60 font-body">{projects.length} project(s) assigned to you</p>
      </motion.div>

      {projects.length === 0 ? (
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="glass-card p-12 text-center">
          <Code className="w-16 h-16 text-white/20 mx-auto mb-4" />
          <p className="text-white/40 font-body">No projects available for your class yet.</p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((p, i) => {
            const sub = submissions[p.id];
            const isOverdue = p.dueDate ? new Date(p.dueDate) < new Date() : false;
            const hasGrade = sub?.marks !== null && sub?.marks !== undefined;

            return (
              <motion.div key={p.id} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: i * 0.05 }}
                onClick={() => openProject(p.id)}
                className="glass-card p-5 cursor-pointer hover:scale-[1.02] hover:border-white/20 transition-all duration-300 group relative overflow-hidden">

                {/* Status Badge */}
                {sub && (
                  <div className={`absolute top-3 right-3 w-3 h-3 rounded-full ${
                    sub.evaluationStatus === "approved" ? "bg-[hsl(var(--neon-green))]" :
                    sub.evaluationStatus === "needs_improvement" ? "bg-[hsl(var(--neon-orange))]" :
                    "bg-white/30"
                  }`} />
                )}

                {/* Notification badge for graded */}
                {sub?.evaluationStatus === "approved" && hasGrade && (
                  <div className="absolute top-2 right-2">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[hsl(var(--neon-green))] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-[hsl(var(--neon-green))]"></span>
                    </span>
                  </div>
                )}

                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[hsl(var(--neon-green))] to-[hsl(var(--neon-blue))] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Code className="w-6 h-6 text-white" />
                </div>

                <h3 className="font-display text-base font-bold text-white mb-1 truncate">{p.title}</h3>
                <p className="text-xs text-white/50 font-body mb-3 line-clamp-2">{p.description}</p>

                <div className="flex flex-wrap gap-1.5 mb-3">
                  <span className="text-[10px] bg-[hsl(var(--neon-blue))]/10 text-[hsl(var(--neon-blue))] px-2 py-0.5 rounded-full font-body">{p.technology}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-body font-bold ${difficultyColor(p.difficultyLevel)}`}>{p.difficultyLevel}</span>
                  {p.dueDate && (
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-body ${isOverdue ? "bg-[hsl(var(--destructive))]/15 text-[hsl(var(--destructive))]" : "bg-white/10 text-white/50"}`}>
                      {isOverdue ? "⏰ Overdue" : `Due: ${new Date(p.dueDate).toLocaleDateString()}`}
                    </span>
                  )}
                </div>

                {/* Status Bar */}
                <div className={`rounded-lg p-2 text-center text-xs font-body font-bold ${
                  !sub ? "bg-white/5 text-white/40" :
                  sub.evaluationStatus === "approved" ? "bg-[hsl(var(--neon-green))]/10 text-[hsl(var(--neon-green))]" :
                  sub.evaluationStatus === "needs_improvement" ? "bg-[hsl(var(--neon-orange))]/10 text-[hsl(var(--neon-orange))]" :
                  "bg-[hsl(var(--neon-blue))]/10 text-[hsl(var(--neon-blue))]"
                }`}>
                  {!sub ? "Not Submitted" :
                   sub.evaluationStatus === "approved" ? `✅ Graded: ${sub.marks}/${p.maxMarks}` :
                   sub.evaluationStatus === "needs_improvement" ? "🔄 Needs Improvement" :
                   "⏳ Submitted - Awaiting Review"}
                </div>

                <div className="flex items-center justify-end mt-3">
                  <ChevronRight className="w-4 h-4 text-white/30 group-hover:text-white/60 transition-colors" />
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default StudentProjects;
