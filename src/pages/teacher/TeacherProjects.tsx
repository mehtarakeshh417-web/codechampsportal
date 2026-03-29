import { useState, useCallback, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code, Plus, Trash2, ChevronDown, ChevronRight, Users, Loader2, CheckCircle2, Star, MessageCircle, Clock, Target, Award, BarChart3, Eye, Edit3, Save, X, FileText } from "lucide-react";
import { PROJECT_TEMPLATES, getTemplatesForTechnology } from "@/lib/projectTemplates";
import { useAuth } from "@/contexts/AuthContext";
import { useData } from "@/contexts/DataContext";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface Project {
  id: string;
  title: string;
  description: string;
  targetClass: string;
  technology: string;
  submissionType: string;
  dueDate: string;
  createdAt: string;
  learningObjective: string;
  instructions: string[];
  referenceResources: string[];
  expectedOutput: string;
  maxMarks: number;
  difficultyLevel: string;
  estimatedTime: string;
}

interface SubmissionRecord {
  id: string;
  studentName: string;
  studentClass: string;
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
  studentId: string;
}

const TECH_OPTIONS = ["Scratch Jr", "Scratch", "MS Paint", "MS Word", "MS PowerPoint", "MS Excel", "MS Access", "HTML/CSS", "Python", "GIMP", "KRITA", "Canva", "MIT App Inventor"];
const SUBMISSION_TYPES = ["Screenshot", "File Upload", "Code", "Link"];
const DIFFICULTY_LEVELS = ["Easy", "Medium", "Hard", "Advanced"];

const TeacherProjects = () => {
  const { user } = useAuth();
  const { teachers, getTeacherStudents } = useData();
  const teacher = teachers.find((t) => t.user_id === user?.id || t.id === user?.id);
  const myClasses = teacher?.classes || [];

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [projSubsMap, setProjSubsMap] = useState<Record<string, SubmissionRecord[]>>({});
  const [evaluatingId, setEvaluatingId] = useState<string | null>(null);
  const [evalForm, setEvalForm] = useState({ marks: 0, grade: "", feedback: "", strengths: "", improvements: "", status: "approved" });
  const [activeTab, setActiveTab] = useState<"details" | "submissions" | "analytics">("details");

  const [form, setForm] = useState({
    title: "", description: "", targetClass: myClasses[0] || "", technology: TECH_OPTIONS[0],
    submissionType: SUBMISSION_TYPES[0], dueDate: "", learningObjective: "",
    instructions: [""], referenceResources: [""], expectedOutput: "",
    maxMarks: 100, difficultyLevel: "Medium", estimatedTime: "",
  });

  const fetchProjects = useCallback(async () => {
    if (!teacher?.id) { setLoading(false); return; }
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("teacher_id", teacher.id)
        .order("created_at", { ascending: false });
      if (error) { toast.error("Failed to load projects."); }
      else {
        const mapped = (data || []).map((p: any) => ({
          id: p.id, title: p.title, description: p.description,
          targetClass: p.target_class, technology: p.technology,
          submissionType: p.submission_type || "Screenshot",
          dueDate: p.due_date || "", createdAt: p.created_at,
          learningObjective: p.learning_objective || "",
          instructions: Array.isArray(p.instructions) ? p.instructions : [],
          referenceResources: Array.isArray(p.reference_resources) ? p.reference_resources : [],
          expectedOutput: p.expected_output || "",
          maxMarks: p.max_marks || 100,
          difficultyLevel: p.difficulty_level || "Medium",
          estimatedTime: p.estimated_time || "",
        }));
        setProjects(mapped);

        if (mapped.length > 0) {
          const ids = mapped.map(p => p.id);
          const { data: subs } = await supabase
            .from("project_submissions" as any)
            .select("*, students(name, class, section)")
            .in("project_id", ids);

          const map: Record<string, SubmissionRecord[]> = {};
          ((subs || []) as any[]).forEach((s: any) => {
            if (!map[s.project_id]) map[s.project_id] = [];
            map[s.project_id].push({
              id: s.id, studentName: s.students?.name || "Unknown",
              studentClass: `${s.students?.class || ""}-${s.students?.section || ""}`,
              notes: s.notes, submittedAt: s.submitted_at,
              submissionType: s.submission_type || "screenshot",
              fileUrl: s.file_url || "", codeContent: s.code_content || "",
              linkUrl: s.link_url || "", marks: s.marks,
              grade: s.grade || "", feedback: s.feedback || "",
              strengths: s.strengths || "", improvements: s.improvements || "",
              evaluationStatus: s.evaluation_status || "pending",
              studentId: s.student_id,
            });
          });
          setProjSubsMap(map);
        }
      }
    } catch (err) { toast.error("Failed to load projects."); }
    setLoading(false);
  }, [teacher?.id]);

  useEffect(() => { fetchProjects(); }, [fetchProjects]);
  useEffect(() => {
    if (myClasses.length > 0 && !form.targetClass) setForm(f => ({ ...f, targetClass: myClasses[0] }));
  }, [myClasses]);

  const createProject = useCallback(async () => {
    if (!form.title.trim() || !form.description.trim() || !form.targetClass) { toast.error("Fill required fields"); return; }
    if (!teacher?.id || !teacher?.schoolId) { toast.error("Teacher data not loaded"); return; }

    const filteredInstructions = form.instructions.filter(i => i.trim());
    const filteredResources = form.referenceResources.filter(r => r.trim());

    const { error } = await supabase.from("projects").insert({
      title: form.title, description: form.description,
      target_class: form.targetClass, technology: form.technology,
      submission_type: form.submissionType,
      school_id: teacher.schoolId, teacher_id: teacher.id,
      due_date: form.dueDate, learning_objective: form.learningObjective,
      instructions: filteredInstructions, reference_resources: filteredResources,
      expected_output: form.expectedOutput, max_marks: form.maxMarks,
      difficulty_level: form.difficultyLevel, estimated_time: form.estimatedTime,
    } as any);

    if (error) { toast.error("Failed to save project: " + error.message); return; }

    // Send notifications to students in this class
    const teacherDisplayName = teacher ? `${teacher.firstName} ${teacher.lastName}`.trim() : "Your teacher";
    const allStudents2 = getTeacherStudents(user?.id || "");
    const classStudents2 = allStudents2.filter((s) => `${s.class}-${s.section}` === form.targetClass);
    const notifInserts = classStudents2.filter(s => s.user_id).map(s => ({
      user_id: s.user_id!,
      title: `🚀 New Project from ${teacherDisplayName}`,
      message: `${teacherDisplayName} has assigned a new project: "${form.title}" (${form.technology}). ${form.dueDate ? `Due by ${new Date(form.dueDate).toLocaleDateString()}.` : ""} Open it to see instructions and start working!`,
      type: "project_assigned",
    }));
    if (notifInserts.length > 0) {
      await supabase.from("notifications").insert(notifInserts as any);
    }

    await fetchProjects();
    setShowForm(false);
    setForm({ title: "", description: "", targetClass: myClasses[0] || "", technology: TECH_OPTIONS[0], submissionType: SUBMISSION_TYPES[0], dueDate: "", learningObjective: "", instructions: [""], referenceResources: [""], expectedOutput: "", maxMarks: 100, difficultyLevel: "Medium", estimatedTime: "" });
    toast.success("Project assigned!");
  }, [form, teacher, myClasses, fetchProjects, getTeacherStudents, user?.id]);

  const deleteProject = async (id: string) => {
    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (error) { toast.error("Delete failed"); return; }
    setProjects((prev) => prev.filter((p) => p.id !== id));
    toast.success("Project deleted");
  };

  const saveEvaluation = async (submissionId: string, studentUserId: string | undefined) => {
    const { error } = await supabase.from("project_submissions" as any).update({
      marks: evalForm.marks, grade: evalForm.grade, feedback: evalForm.feedback,
      strengths: evalForm.strengths, improvements: evalForm.improvements,
      evaluation_status: evalForm.status, evaluated_at: new Date().toISOString(),
      evaluated_by: user?.id,
    }).eq("id", submissionId);

    if (error) { toast.error("Failed to save evaluation"); return; }

    // Send notification to student
    if (studentUserId) {
      const teacherDisplayName2 = teacher ? `${teacher.firstName} ${teacher.lastName}`.trim() : "Your teacher";
      const evalSub = (projSubsMap[expandedId || ""] || []).find(s => s.id === submissionId);
      const projTitle = projects.find(p => p.id === expandedId)?.title || "your project";
      await supabase.from("notifications").insert({
        user_id: studentUserId,
        title: `⭐ ${teacherDisplayName2} evaluated your project!`,
        message: `${teacherDisplayName2} has reviewed "${projTitle}". ${evalForm.grade ? `Grade: ${evalForm.grade}.` : ""} ${evalForm.marks ? `Score: ${evalForm.marks} marks.` : ""} ${evalForm.status === "approved" ? "Great work! ✅" : "Some improvements are needed. Check the feedback for details. 📝"}`,
        type: "project_graded",
      } as any);
    }

    setEvaluatingId(null);
    toast.success("Evaluation saved!");
    await fetchProjects();
  };

  const allStudents = getTeacherStudents(user?.id || "");

  const addInstruction = () => setForm(f => ({ ...f, instructions: [...f.instructions, ""] }));
  const removeInstruction = (idx: number) => setForm(f => ({ ...f, instructions: f.instructions.filter((_, i) => i !== idx) }));
  const updateInstruction = (idx: number, val: string) => setForm(f => ({ ...f, instructions: f.instructions.map((v, i) => i === idx ? val : v) }));

  const addResource = () => setForm(f => ({ ...f, referenceResources: [...f.referenceResources, ""] }));
  const removeResource = (idx: number) => setForm(f => ({ ...f, referenceResources: f.referenceResources.filter((_, i) => i !== idx) }));
  const updateResource = (idx: number, val: string) => setForm(f => ({ ...f, referenceResources: f.referenceResources.map((v, i) => i === idx ? val : v) }));

  const difficultyColor = (d: string) => {
    if (d === "Easy") return "bg-[hsl(var(--neon-green))]/15 text-[hsl(var(--neon-green))]";
    if (d === "Medium") return "bg-[hsl(var(--neon-orange))]/15 text-[hsl(var(--neon-orange))]";
    if (d === "Hard") return "bg-[hsl(var(--destructive))]/15 text-[hsl(var(--destructive))]";
    return "bg-[hsl(var(--secondary))]/15 text-[hsl(var(--secondary))]";
  };

  return (
    <div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold mb-1"><span className="text-gradient-brand">Projects</span></h1>
          <p className="text-white/60 font-body">{projects.length} project(s) assigned</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} className="bg-gradient-to-r from-[hsl(var(--neon-green))] to-[hsl(var(--neon-blue))] text-white">
          <Plus className="w-4 h-4 mr-1" /> Assign Project
        </Button>
      </motion.div>

      {/* CREATE FORM */}
      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden mb-6">
            <div className="glass-card p-6 space-y-5">
              <h2 className="font-display text-lg font-bold text-white flex items-center gap-2">
                <Plus className="w-5 h-5 text-[hsl(var(--neon-green))]" /> Create New Project
              </h2>

              {/* Template Selector */}
              <div className="p-4 rounded-xl bg-[hsl(var(--neon-blue))]/5 border border-[hsl(var(--neon-blue))]/20">
                <label className="text-xs text-[hsl(var(--neon-blue))] font-body font-bold mb-2 block flex items-center gap-1">
                  <FileText className="w-3.5 h-3.5" /> Start from Template (optional)
                </label>
                <select
                  defaultValue=""
                  onChange={(e) => {
                    const tmpl = PROJECT_TEMPLATES.find(t => t.id === e.target.value);
                    if (tmpl) {
                      setForm(f => ({
                        ...f,
                        title: tmpl.title,
                        description: tmpl.description,
                        technology: tmpl.technology,
                        submissionType: tmpl.submissionType,
                        learningObjective: tmpl.learningObjective,
                        instructions: tmpl.instructions.length > 0 ? tmpl.instructions : [""],
                        referenceResources: tmpl.referenceResources.length > 0 ? tmpl.referenceResources : [""],
                        expectedOutput: tmpl.expectedOutput,
                        maxMarks: tmpl.maxMarks,
                        difficultyLevel: tmpl.difficultyLevel,
                        estimatedTime: tmpl.estimatedTime,
                      }));
                      toast.success(`Template "${tmpl.title}" loaded! You can edit any field.`);
                    }
                    e.target.value = "";
                  }}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-body focus:outline-none focus:border-[hsl(var(--primary))]/50"
                >
                  <option value="" className="bg-[hsl(220,30%,15%)]">Choose a template to auto-fill...</option>
                  {TECH_OPTIONS.map((tech) => {
                    const templates = getTemplatesForTechnology(tech);
                    if (templates.length === 0) return null;
                    return templates.map((t) => (
                      <option key={t.id} value={t.id} className="bg-[hsl(220,30%,15%)]">
                        [{tech}] {t.title} — {t.difficultyLevel}
                      </option>
                    ));
                  })}
                </select>
                <p className="text-[10px] text-white/30 font-body mt-1">Templates pre-fill all fields. You can customize anything after loading.</p>
              </div>

              {/* Row 1 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-white/50 font-body mb-1 block">Project Title *</label>
                  <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g. My First Scratch Game" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-body focus:outline-none focus:border-[hsl(var(--primary))]/50" />
                </div>
                <div>
                  <label className="text-xs text-white/50 font-body mb-1 block">Class *</label>
                  <select value={form.targetClass} onChange={(e) => setForm({ ...form, targetClass: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-body focus:outline-none focus:border-[hsl(var(--primary))]/50">
                    {myClasses.map((c) => <option key={c} value={c} className="bg-[hsl(220,30%,15%)]">{c}</option>)}
                  </select>
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs text-white/50 font-body mb-1 block">Technology / Subject</label>
                  <select value={form.technology} onChange={(e) => setForm({ ...form, technology: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-body focus:outline-none focus:border-[hsl(var(--primary))]/50">
                    {TECH_OPTIONS.map((t) => <option key={t} value={t} className="bg-[hsl(220,30%,15%)]">{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-white/50 font-body mb-1 block">Submission Type</label>
                  <select value={form.submissionType} onChange={(e) => setForm({ ...form, submissionType: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-body focus:outline-none focus:border-[hsl(var(--primary))]/50">
                    {SUBMISSION_TYPES.map((t) => <option key={t} value={t} className="bg-[hsl(220,30%,15%)]">{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-white/50 font-body mb-1 block">Difficulty Level</label>
                  <select value={form.difficultyLevel} onChange={(e) => setForm({ ...form, difficultyLevel: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-body focus:outline-none focus:border-[hsl(var(--primary))]/50">
                    {DIFFICULTY_LEVELS.map((d) => <option key={d} value={d} className="bg-[hsl(220,30%,15%)]">{d}</option>)}
                  </select>
                </div>
              </div>

              {/* Row 3 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs text-white/50 font-body mb-1 block">Due Date</label>
                  <input type="date" value={form.dueDate} onChange={(e) => setForm({ ...form, dueDate: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-body focus:outline-none focus:border-[hsl(var(--primary))]/50" />
                </div>
                <div>
                  <label className="text-xs text-white/50 font-body mb-1 block">Maximum Marks</label>
                  <input type="number" value={form.maxMarks} onChange={(e) => setForm({ ...form, maxMarks: parseInt(e.target.value) || 0 })} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-body focus:outline-none focus:border-[hsl(var(--primary))]/50" />
                </div>
                <div>
                  <label className="text-xs text-white/50 font-body mb-1 block">Estimated Time</label>
                  <input value={form.estimatedTime} onChange={(e) => setForm({ ...form, estimatedTime: e.target.value })} placeholder="e.g. 2 hours" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-body focus:outline-none focus:border-[hsl(var(--primary))]/50" />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="text-xs text-white/50 font-body mb-1 block">Project Description *</label>
                <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Describe the project..." rows={3} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-body focus:outline-none focus:border-[hsl(var(--primary))]/50 resize-none" />
              </div>

              {/* Learning Objective */}
              <div>
                <label className="text-xs text-white/50 font-body mb-1 block">Learning Objective</label>
                <textarea value={form.learningObjective} onChange={(e) => setForm({ ...form, learningObjective: e.target.value })} placeholder="What will students learn?" rows={2} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-body focus:outline-none focus:border-[hsl(var(--primary))]/50 resize-none" />
              </div>

              {/* Instructions (Dynamic Steps) */}
              <div>
                <label className="text-xs text-white/50 font-body mb-1 block">Instructions / Steps</label>
                <div className="space-y-2">
                  {form.instructions.map((inst, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="text-xs text-white/40 font-body w-8 shrink-0">#{idx + 1}</span>
                      <input value={inst} onChange={(e) => updateInstruction(idx, e.target.value)} placeholder={`Step ${idx + 1}...`} className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm font-body focus:outline-none focus:border-[hsl(var(--primary))]/50" />
                      {form.instructions.length > 1 && (
                        <button onClick={() => removeInstruction(idx)} className="text-white/30 hover:text-[hsl(var(--destructive))]"><X className="w-4 h-4" /></button>
                      )}
                    </div>
                  ))}
                  <button onClick={addInstruction} className="text-xs text-[hsl(var(--neon-blue))] hover:underline font-body">+ Add Step</button>
                </div>
              </div>

              {/* Reference Resources */}
              <div>
                <label className="text-xs text-white/50 font-body mb-1 block">Reference Resources (links)</label>
                <div className="space-y-2">
                  {form.referenceResources.map((res, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input value={res} onChange={(e) => updateResource(idx, e.target.value)} placeholder="https://..." className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm font-body focus:outline-none focus:border-[hsl(var(--primary))]/50" />
                      {form.referenceResources.length > 1 && (
                        <button onClick={() => removeResource(idx)} className="text-white/30 hover:text-[hsl(var(--destructive))]"><X className="w-4 h-4" /></button>
                      )}
                    </div>
                  ))}
                  <button onClick={addResource} className="text-xs text-[hsl(var(--neon-blue))] hover:underline font-body">+ Add Resource</button>
                </div>
              </div>

              {/* Expected Output */}
              <div>
                <label className="text-xs text-white/50 font-body mb-1 block">Expected Output Description</label>
                <textarea value={form.expectedOutput} onChange={(e) => setForm({ ...form, expectedOutput: e.target.value })} placeholder="Describe what the final output should look like..." rows={2} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-body focus:outline-none focus:border-[hsl(var(--primary))]/50 resize-none" />
              </div>

              <div className="flex gap-3 justify-end pt-2">
                <Button variant="ghost" onClick={() => setShowForm(false)} className="text-white/50">Cancel</Button>
                <Button onClick={createProject} className="bg-gradient-to-r from-[hsl(var(--neon-green))] to-[hsl(var(--neon-blue))] text-white">Assign Project</Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PROJECT LIST */}
      {loading ? (
        <div className="glass-card p-12 text-center"><Loader2 className="w-8 h-8 text-white/30 mx-auto animate-spin" /></div>
      ) : projects.length === 0 && !showForm ? (
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="glass-card p-12 text-center">
          <Code className="w-16 h-16 text-white/20 mx-auto mb-4" />
          <p className="text-white/40 font-body">No projects assigned yet. Click "Assign Project" to create one.</p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((p, i) => {
            const isExpanded = expandedId === p.id;
            const subs = projSubsMap[p.id] || [];
            const classStudents = allStudents.filter((s) => `${s.class}-${s.section}` === p.targetClass);
            const submittedCount = subs.length;
            const evaluatedCount = subs.filter(s => s.evaluationStatus !== "pending").length;
            const avgMarks = subs.filter(s => s.marks !== null).length > 0
              ? Math.round(subs.filter(s => s.marks !== null).reduce((a, b) => a + (b.marks || 0), 0) / subs.filter(s => s.marks !== null).length) : null;

            return (
              <motion.div key={p.id} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: i * 0.03 }}
                className={isExpanded ? "md:col-span-2" : ""}>
                <div className="glass-card overflow-hidden hover:border-white/20 transition-colors group">
                  {/* Card Header */}
                  <button onClick={() => { setExpandedId(isExpanded ? null : p.id); setActiveTab("details"); }} className="w-full p-5 text-left">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[hsl(var(--neon-green))] to-[hsl(var(--neon-blue))] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                        <Code className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-display text-base font-bold text-white truncate">{p.title}</h3>
                        <p className="text-xs text-white/50 font-body mt-1">{p.targetClass} · {p.technology}</p>
                        <div className="flex flex-wrap items-center gap-2 mt-2">
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-body font-bold ${difficultyColor(p.difficultyLevel)}`}>{p.difficultyLevel}</span>
                          {p.dueDate && <span className="text-[10px] bg-white/5 px-2 py-0.5 rounded-full text-white/50 font-body flex items-center gap-1"><Clock className="w-3 h-3" />{new Date(p.dueDate).toLocaleDateString()}</span>}
                          <span className="text-[10px] bg-[hsl(var(--neon-blue))]/10 px-2 py-0.5 rounded-full text-[hsl(var(--neon-blue))] font-body">{submittedCount}/{classStudents.length} submitted</span>
                          {avgMarks !== null && <span className="text-[10px] bg-[hsl(var(--neon-green))]/10 px-2 py-0.5 rounded-full text-[hsl(var(--neon-green))] font-body">Avg: {avgMarks}/{p.maxMarks}</span>}
                        </div>
                      </div>
                      {isExpanded ? <ChevronDown className="w-5 h-5 text-white/40 mt-1" /> : <ChevronRight className="w-5 h-5 text-white/40 mt-1" />}
                    </div>
                  </button>

                  {/* Expanded Content */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden">
                        <div className="px-5 pb-5 border-t border-white/10">
                          {/* Tabs */}
                          <div className="flex gap-1 mt-3 mb-4 bg-white/5 rounded-xl p-1">
                            {(["details", "submissions", "analytics"] as const).map(tab => (
                              <button key={tab} onClick={() => setActiveTab(tab)}
                                className={`flex-1 px-3 py-2 rounded-lg text-xs font-body font-bold transition-colors capitalize ${activeTab === tab ? "bg-[hsl(var(--primary))]/20 text-[hsl(var(--primary))]" : "text-white/40 hover:text-white/60"}`}>
                                {tab === "submissions" ? `Submissions (${submittedCount})` : tab}
                              </button>
                            ))}
                          </div>

                          {activeTab === "details" && (
                            <div className="space-y-3">
                              <p className="text-sm text-white/70 font-body">{p.description}</p>
                              {p.learningObjective && (
                                <div className="bg-[hsl(var(--neon-blue))]/5 rounded-xl p-3 border border-[hsl(var(--neon-blue))]/10">
                                  <p className="text-[10px] text-[hsl(var(--neon-blue))] font-body font-bold uppercase mb-1">🎯 Learning Objective</p>
                                  <p className="text-xs text-white/70 font-body">{p.learningObjective}</p>
                                </div>
                              )}
                              {p.instructions.length > 0 && (
                                <div>
                                  <p className="text-[10px] text-white/50 font-body font-bold uppercase mb-2">📋 Steps</p>
                                  {p.instructions.map((step, idx) => (
                                    <div key={idx} className="flex items-start gap-2 mb-1.5">
                                      <span className="w-5 h-5 rounded-full bg-[hsl(var(--neon-green))]/20 text-[hsl(var(--neon-green))] text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">{idx + 1}</span>
                                      <p className="text-xs text-white/60 font-body">{step}</p>
                                    </div>
                                  ))}
                                </div>
                              )}
                              {p.expectedOutput && (
                                <div className="bg-[hsl(var(--neon-green))]/5 rounded-xl p-3 border border-[hsl(var(--neon-green))]/10">
                                  <p className="text-[10px] text-[hsl(var(--neon-green))] font-body font-bold uppercase mb-1">✨ Expected Output</p>
                                  <p className="text-xs text-white/70 font-body">{p.expectedOutput}</p>
                                </div>
                              )}
                              <div className="flex items-center gap-4 text-xs text-white/40 font-body">
                                <span>Max Marks: {p.maxMarks}</span>
                                <span>Submission: {p.submissionType}</span>
                                {p.estimatedTime && <span>Est. Time: {p.estimatedTime}</span>}
                              </div>
                              <div className="bg-white/5 rounded-lg p-3">
                                <p className="text-xs text-white/50 font-body flex items-center gap-1 mb-2"><Users className="w-3.5 h-3.5" /> Assigned to {classStudents.length} students</p>
                                <div className="flex flex-wrap gap-1">
                                  {classStudents.slice(0, 10).map((s) => <span key={s.id} className="text-xs bg-white/5 px-2 py-0.5 rounded-full text-white/60">{s.name}</span>)}
                                  {classStudents.length > 10 && <span className="text-xs text-white/40">+{classStudents.length - 10} more</span>}
                                </div>
                              </div>
                              <div className="flex justify-end">
                                <Button size="sm" variant="ghost" onClick={() => deleteProject(p.id)} className="text-[hsl(var(--destructive))] hover:text-[hsl(var(--destructive))]/80">
                                  <Trash2 className="w-3.5 h-3.5 mr-1" /> Delete
                                </Button>
                              </div>
                            </div>
                          )}

                          {activeTab === "submissions" && (
                            <div className="space-y-3">
                              {subs.length === 0 ? (
                                <div className="text-center py-8">
                                  <CheckCircle2 className="w-10 h-10 text-white/10 mx-auto mb-2" />
                                  <p className="text-xs text-white/30 font-body">No submissions yet</p>
                                </div>
                              ) : subs.map((sub) => (
                                <div key={sub.id} className="bg-white/5 rounded-xl p-4 border border-white/5">
                                  <div className="flex items-center justify-between mb-2">
                                    <div>
                                      <p className="text-sm text-white font-body font-bold">{sub.studentName}</p>
                                      <p className="text-[10px] text-white/40 font-body">{sub.studentClass} · {new Date(sub.submittedAt).toLocaleString()}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-body font-bold ${
                                        sub.evaluationStatus === "approved" ? "bg-[hsl(var(--neon-green))]/15 text-[hsl(var(--neon-green))]" :
                                        sub.evaluationStatus === "needs_improvement" ? "bg-[hsl(var(--neon-orange))]/15 text-[hsl(var(--neon-orange))]" :
                                        "bg-white/10 text-white/50"
                                      }`}>
                                        {sub.evaluationStatus === "pending" ? "⏳ Pending" : sub.evaluationStatus === "approved" ? "✅ Approved" : "🔄 Needs Improvement"}
                                      </span>
                                      {sub.marks !== null && <span className="text-xs text-[hsl(var(--neon-green))] font-bold font-body">{sub.marks}/{p.maxMarks}</span>}
                                    </div>
                                  </div>

                                  {/* Submission Content Preview */}
                                  {sub.notes && <p className="text-xs text-white/50 font-body mb-2">{sub.notes}</p>}
                                  {sub.codeContent && (
                                    <pre className="text-[10px] bg-black/30 rounded-lg p-2 text-[hsl(var(--neon-green))] font-mono overflow-x-auto mb-2 max-h-24">{sub.codeContent}</pre>
                                  )}
                                  {sub.linkUrl && (
                                    <a href={sub.linkUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-[hsl(var(--neon-blue))] hover:underline font-body mb-2 block">{sub.linkUrl}</a>
                                  )}
                                  {sub.fileUrl && (
                                    <a href={sub.fileUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-[hsl(var(--neon-blue))] hover:underline font-body mb-2 flex items-center gap-1"><Eye className="w-3 h-3" /> View File</a>
                                  )}

                                  {/* Existing Feedback */}
                                  {sub.evaluationStatus !== "pending" && sub.feedback && (
                                    <div className="bg-[hsl(var(--secondary))]/5 rounded-lg p-2.5 mt-2 border border-[hsl(var(--secondary))]/10">
                                      <p className="text-[10px] text-[hsl(var(--secondary))] font-body font-bold mb-1">Teacher Feedback</p>
                                      <p className="text-xs text-white/60 font-body">{sub.feedback}</p>
                                      {sub.strengths && <p className="text-[10px] text-white/40 font-body mt-1">💪 {sub.strengths}</p>}
                                      {sub.improvements && <p className="text-[10px] text-white/40 font-body mt-1">📝 {sub.improvements}</p>}
                                    </div>
                                  )}

                                  {/* Evaluate Button / Form */}
                                  {evaluatingId === sub.id ? (
                                    <div className="mt-3 space-y-2 bg-white/5 rounded-xl p-3 border border-white/10">
                                      <p className="text-xs text-white/70 font-body font-bold">Evaluate Submission</p>
                                      <div className="grid grid-cols-2 gap-2">
                                        <div>
                                          <label className="text-[10px] text-white/40 font-body">Marks (out of {p.maxMarks})</label>
                                          <input type="number" max={p.maxMarks} value={evalForm.marks} onChange={e => setEvalForm({ ...evalForm, marks: parseInt(e.target.value) || 0 })} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm font-body" />
                                        </div>
                                        <div>
                                          <label className="text-[10px] text-white/40 font-body">Grade</label>
                                          <select value={evalForm.grade} onChange={e => setEvalForm({ ...evalForm, grade: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm font-body">
                                            <option value="" className="bg-[hsl(220,30%,15%)]">Select</option>
                                            {["A+", "A", "B+", "B", "C+", "C", "D", "F"].map(g => <option key={g} value={g} className="bg-[hsl(220,30%,15%)]">{g}</option>)}
                                          </select>
                                        </div>
                                      </div>
                                      <textarea value={evalForm.feedback} onChange={e => setEvalForm({ ...evalForm, feedback: e.target.value })} placeholder="Feedback comments..." rows={2} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-xs font-body resize-none" />
                                      <div className="grid grid-cols-2 gap-2">
                                        <input value={evalForm.strengths} onChange={e => setEvalForm({ ...evalForm, strengths: e.target.value })} placeholder="Strengths..." className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-xs font-body" />
                                        <input value={evalForm.improvements} onChange={e => setEvalForm({ ...evalForm, improvements: e.target.value })} placeholder="Improvements needed..." className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-xs font-body" />
                                      </div>
                                      <div className="flex gap-2">
                                        <select value={evalForm.status} onChange={e => setEvalForm({ ...evalForm, status: e.target.value })} className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-xs font-body">
                                          <option value="approved" className="bg-[hsl(220,30%,15%)]">✅ Approved</option>
                                          <option value="needs_improvement" className="bg-[hsl(220,30%,15%)]">🔄 Needs Improvement</option>
                                        </select>
                                        <div className="flex-1" />
                                        <Button size="sm" variant="ghost" onClick={() => setEvaluatingId(null)} className="text-white/40 text-xs">Cancel</Button>
                                        <Button size="sm" onClick={() => {
                                          const studentRecord = allStudents.find(s => s.id === sub.studentId);
                                          saveEvaluation(sub.id, studentRecord?.user_id);
                                        }} className="bg-gradient-to-r from-[hsl(var(--neon-green))] to-[hsl(var(--neon-blue))] text-white text-xs">
                                          <Save className="w-3 h-3 mr-1" /> Save
                                        </Button>
                                      </div>
                                    </div>
                                  ) : (
                                    <Button size="sm" variant="ghost" onClick={() => {
                                      setEvaluatingId(sub.id);
                                      setEvalForm({ marks: sub.marks || 0, grade: sub.grade, feedback: sub.feedback, strengths: sub.strengths, improvements: sub.improvements, status: sub.evaluationStatus === "pending" ? "approved" : sub.evaluationStatus });
                                    }} className="mt-2 text-[hsl(var(--neon-blue))] text-xs">
                                      <Edit3 className="w-3 h-3 mr-1" /> {sub.evaluationStatus === "pending" ? "Evaluate" : "Edit Evaluation"}
                                    </Button>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}

                          {activeTab === "analytics" && (
                            <ProjectAnalyticsTab project={p} submissions={subs} totalStudents={classStudents.length} />
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
    </div>
  );
};

// Inline analytics tab
const ProjectAnalyticsTab = ({ project, submissions, totalStudents }: { project: Project; submissions: SubmissionRecord[]; totalStudents: number }) => {
  const submitted = submissions.length;
  const pending = totalStudents - submitted;
  const evaluated = submissions.filter(s => s.evaluationStatus !== "pending").length;
  const approved = submissions.filter(s => s.evaluationStatus === "approved").length;
  const needsImprovement = submissions.filter(s => s.evaluationStatus === "needs_improvement").length;
  const markedSubs = submissions.filter(s => s.marks !== null);
  const avgMarks = markedSubs.length > 0 ? Math.round(markedSubs.reduce((a, b) => a + (b.marks || 0), 0) / markedSubs.length) : 0;
  const topPerformers = [...markedSubs].sort((a, b) => (b.marks || 0) - (a.marks || 0)).slice(0, 5);

  const gradeDistribution: Record<string, number> = {};
  submissions.forEach(s => { if (s.grade) gradeDistribution[s.grade] = (gradeDistribution[s.grade] || 0) + 1; });

  return (
    <div className="space-y-4">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Submitted", value: `${submitted}/${totalStudents}`, color: "from-[hsl(var(--neon-blue))] to-[hsl(var(--secondary))]", pct: totalStudents > 0 ? (submitted / totalStudents) * 100 : 0 },
          { label: "Evaluated", value: `${evaluated}/${submitted}`, color: "from-[hsl(var(--neon-green))] to-[hsl(var(--neon-blue))]", pct: submitted > 0 ? (evaluated / submitted) * 100 : 0 },
          { label: "Approved", value: String(approved), color: "from-[hsl(var(--neon-green))] to-[hsl(145,80%,40%)]", pct: submitted > 0 ? (approved / submitted) * 100 : 0 },
          { label: "Avg Score", value: `${avgMarks}/${project.maxMarks}`, color: "from-[hsl(var(--neon-orange))] to-[hsl(var(--destructive))]", pct: project.maxMarks > 0 ? (avgMarks / project.maxMarks) * 100 : 0 },
        ].map(stat => (
          <div key={stat.label} className="bg-white/5 rounded-xl p-3 border border-white/5">
            <p className="text-[10px] text-white/40 font-body font-bold uppercase">{stat.label}</p>
            <p className="text-lg font-display font-bold text-white mt-1">{stat.value}</p>
            <div className="w-full h-1.5 rounded-full bg-white/10 mt-2 overflow-hidden">
              <motion.div initial={{ width: 0 }} animate={{ width: `${stat.pct}%` }} transition={{ duration: 0.8 }} className={`h-full rounded-full bg-gradient-to-r ${stat.color}`} />
            </div>
          </div>
        ))}
      </div>

      {/* Grade Distribution */}
      {Object.keys(gradeDistribution).length > 0 && (
        <div className="bg-white/5 rounded-xl p-4 border border-white/5">
          <p className="text-xs text-white/50 font-body font-bold mb-3">Grade Distribution</p>
          <div className="flex items-end gap-2 h-24">
            {Object.entries(gradeDistribution).sort().map(([grade, count]) => {
              const maxCount = Math.max(...Object.values(gradeDistribution));
              const height = maxCount > 0 ? (count / maxCount) * 100 : 0;
              return (
                <div key={grade} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-[10px] text-white/60 font-body font-bold">{count}</span>
                  <motion.div initial={{ height: 0 }} animate={{ height: `${height}%` }} transition={{ duration: 0.5 }}
                    className="w-full rounded-t-lg bg-gradient-to-t from-[hsl(var(--neon-blue))] to-[hsl(var(--secondary))]" style={{ minHeight: 4 }} />
                  <span className="text-[10px] text-white/40 font-body font-bold">{grade}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Top Performers */}
      {topPerformers.length > 0 && (
        <div className="bg-white/5 rounded-xl p-4 border border-white/5">
          <p className="text-xs text-white/50 font-body font-bold mb-3">🏆 Top Performers</p>
          <div className="space-y-2">
            {topPerformers.map((sub, idx) => (
              <div key={sub.id} className="flex items-center gap-3">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  idx === 0 ? "bg-[hsl(45,100%,50%)]/20 text-[hsl(45,100%,50%)]" :
                  idx === 1 ? "bg-white/10 text-white/60" :
                  idx === 2 ? "bg-[hsl(25,60%,50%)]/20 text-[hsl(25,60%,50%)]" : "bg-white/5 text-white/30"
                }`}>#{idx + 1}</span>
                <p className="text-xs text-white/70 font-body flex-1">{sub.studentName}</p>
                <p className="text-xs text-[hsl(var(--neon-green))] font-body font-bold">{sub.marks}/{project.maxMarks}</p>
                {sub.grade && <span className="text-[10px] bg-[hsl(var(--neon-green))]/10 text-[hsl(var(--neon-green))] px-2 py-0.5 rounded-full font-body">{sub.grade}</span>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Pending Students */}
      {pending > 0 && (
        <div className="bg-[hsl(var(--neon-orange))]/5 rounded-xl p-3 border border-[hsl(var(--neon-orange))]/10">
          <p className="text-xs text-[hsl(var(--neon-orange))] font-body font-bold">⚠️ {pending} student(s) haven't submitted yet</p>
        </div>
      )}
    </div>
  );
};

export default TeacherProjects;
