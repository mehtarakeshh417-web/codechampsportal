import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { useData } from "@/contexts/DataContext";
import { getCurriculumForClass } from "@/lib/curriculumData";
import { supabase } from "@/integrations/supabase/client";
import {
  User, Award, Zap, BookOpen, Trophy, Code, Star, Target,
  BarChart3, CheckCircle2, Clock, FileText, Crown, Flame
} from "lucide-react";

const xpLevel = (xp: number) => {
  if (xp < 500) return { level: 1, title: "Beginner", next: 500 };
  if (xp < 1500) return { level: 2, title: "Explorer", next: 1500 };
  if (xp < 3000) return { level: 3, title: "Builder", next: 3000 };
  if (xp < 5000) return { level: 4, title: "Innovator", next: 5000 };
  return { level: 5, title: "Legend", next: 10000 };
};

interface EvalProject {
  id: string;
  title: string;
  technology: string;
  marks: number | null;
  maxMarks: number;
  grade: string;
  feedback: string;
  evaluationStatus: string;
  submittedAt: string;
}

const StudentPortfolio = () => {
  const { user } = useAuth();
  const { students } = useData();
  const student = students.find((s) => s.user_id === user?.id);
  const xp = student?.xp || 0;
  const lvl = xpLevel(xp);

  const curriculum = useMemo(() => getCurriculumForClass(user?.className || ""), [user?.className]);

  const [completedTopics, setCompletedTopics] = useState<string[]>([]);
  const [evaluatedProjects, setEvaluatedProjects] = useState<EvalProject[]>([]);
  const [leaderboardRank, setLeaderboardRank] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"overview" | "projects" | "skills">("overview");

  useEffect(() => {
    if (!student) { setLoading(false); return; }

    const loadAll = async () => {
      // completions
      const { data: tc } = await supabase
        .from("topic_completions").select("topic_id").eq("student_id", student.id);
      setCompletedTopics((tc || []).map((d: any) => d.topic_id));

      // evaluated projects
      const { data: subs } = await supabase
        .from("project_submissions" as any)
        .select("*, projects(title, technology, max_marks)")
        .eq("student_id", student.id);
      const evald = ((subs || []) as any[])
        .filter((s: any) => s.evaluation_status !== "pending")
        .map((s: any) => ({
          id: s.id,
          title: s.projects?.title || "Untitled",
          technology: s.projects?.technology || "",
          marks: s.marks,
          maxMarks: s.projects?.max_marks || 100,
          grade: s.grade || "",
          feedback: s.feedback || "",
          evaluationStatus: s.evaluation_status || "",
          submittedAt: s.submitted_at,
        }));
      setEvaluatedProjects(evald);

      // leaderboard rank
      const { data: allStudents } = await supabase
        .from("students").select("id, xp").eq("school_id", student.schoolId).order("xp", { ascending: false });
      if (allStudents) {
        const idx = allStudents.findIndex((s: any) => s.id === student.id);
        setLeaderboardRank(idx >= 0 ? idx + 1 : null);
      }

      setLoading(false);
    };
    loadAll();
  }, [student]);

  const totalTopics = curriculum?.subjects.reduce((s, sub) => s + sub.topics.length, 0) || 0;
  const completedCount = completedTopics.length;
  const progressPct = totalTopics > 0 ? Math.round((completedCount / totalTopics) * 100) : 0;

  const completedSubjects = useMemo(() => {
    if (!curriculum) return [];
    return curriculum.subjects.filter(
      (sub) => sub.topics.length > 0 && sub.topics.every((t) => completedTopics.includes(t.id))
    );
  }, [curriculum, completedTopics]);

  const subjectProgress = useMemo(() => {
    if (!curriculum) return [];
    return curriculum.subjects.map((sub) => ({
      name: sub.title,
      total: sub.topics.length,
      done: sub.topics.filter((t) => completedTopics.includes(t.id)).length,
    }));
  }, [curriculum, completedTopics]);

  const avgProjectScore = useMemo(() => {
    const scored = evaluatedProjects.filter(p => p.marks !== null);
    if (scored.length === 0) return null;
    const avg = scored.reduce((acc, p) => acc + ((p.marks! / p.maxMarks) * 100), 0) / scored.length;
    return Math.round(avg);
  }, [evaluatedProjects]);

  if (loading) {
    return <div className="glass-card p-12 text-center"><div className="w-8 h-8 border-2 border-white/20 border-t-white/60 rounded-full animate-spin mx-auto" /></div>;
  }

  const tabs = [
    { id: "overview" as const, label: "Overview", icon: BarChart3 },
    { id: "projects" as const, label: "Projects", icon: Code },
    { id: "skills" as const, label: "Skills", icon: Target },
  ];

  return (
    <div>
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-3xl font-bold mb-1"><span className="text-gradient-brand">My Portfolio</span></h1>
        <p className="text-white/60 font-body mb-6">Your complete achievement profile</p>
      </motion.div>

      {/* Profile Card */}
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.05 }}
        className="glass-card overflow-hidden mb-6">
        <div className="bg-gradient-to-r from-[hsl(var(--primary))]/20 to-[hsl(var(--secondary))]/20 p-6">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[hsl(var(--neon-green))] to-[hsl(var(--neon-blue))] flex items-center justify-center shrink-0">
              <User className="w-10 h-10 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="font-display text-2xl font-bold text-white">{student?.name || user?.displayName}</h2>
              <p className="text-sm text-white/50 font-body">{user?.className} · {user?.schoolName}</p>
              <div className="flex items-center gap-4 mt-2">
                <span className="text-xs bg-[hsl(var(--neon-blue))]/15 text-[hsl(var(--neon-blue))] px-3 py-1 rounded-full font-body font-bold">
                  Level {lvl.level} — {lvl.title}
                </span>
                <span className="text-xs bg-[hsl(var(--neon-green))]/15 text-[hsl(var(--neon-green))] px-3 py-1 rounded-full font-body font-bold flex items-center gap-1">
                  <Zap className="w-3 h-3" /> {xp} XP
                </span>
                {leaderboardRank && (
                  <span className="text-xs bg-[hsl(var(--neon-orange))]/15 text-[hsl(var(--neon-orange))] px-3 py-1 rounded-full font-body font-bold flex items-center gap-1">
                    <Trophy className="w-3 h-3" /> Rank #{leaderboardRank}
                  </span>
                )}
              </div>
            </div>
          </div>
          {/* XP Progress */}
          <div className="mt-4">
            <div className="flex justify-between text-xs text-white/40 font-body mb-1">
              <span>XP Progress to Level {Math.min(lvl.level + 1, 5)}</span>
              <span>{xp} / {lvl.next}</span>
            </div>
            <div className="h-2 rounded-full bg-white/10 overflow-hidden">
              <motion.div initial={{ width: 0 }} animate={{ width: `${Math.min((xp / lvl.next) * 100, 100)}%` }}
                transition={{ duration: 1 }} className="h-full rounded-full bg-gradient-to-r from-[hsl(var(--neon-green))] to-[hsl(var(--neon-blue))]" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { icon: BookOpen, label: "Topics Done", value: `${completedCount}/${totalTopics}`, color: "neon-green" },
          { icon: Award, label: "Certificates", value: completedSubjects.length, color: "neon-blue" },
          { icon: Code, label: "Projects Evaluated", value: evaluatedProjects.length, color: "neon-orange" },
          { icon: Star, label: "Avg Score", value: avgProjectScore !== null ? `${avgProjectScore}%` : "N/A", color: "neon-purple" },
        ].map((stat, i) => (
          <motion.div key={stat.label} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 + i * 0.05 }}
            className="glass-card p-4 text-center">
            <stat.icon className={`w-6 h-6 mx-auto mb-2 text-${stat.color}`} />
            <div className="font-display text-xl font-bold text-white">{stat.value}</div>
            <div className="text-[11px] text-white/40 font-body">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {tabs.map((tab) => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-body transition-all ${
              activeTab === tab.id
                ? "bg-[hsl(var(--primary))]/15 text-[hsl(var(--primary))] font-bold"
                : "text-white/40 hover:text-white/60 hover:bg-white/5"
            }`}>
            <tab.icon className="w-4 h-4" /> {tab.label}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* Curriculum Progress */}
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="glass-card p-5">
            <h3 className="font-display text-lg font-bold text-white mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[hsl(var(--neon-green))]" /> Curriculum Progress
            </h3>
            <div className="flex items-center gap-4 mb-4">
              <div className="relative w-20 h-20">
                <svg className="w-20 h-20 -rotate-90" viewBox="0 0 72 72">
                  <circle cx="36" cy="36" r="30" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="6" />
                  <circle cx="36" cy="36" r="30" fill="none" stroke="url(#grad)" strokeWidth="6"
                    strokeDasharray={`${progressPct * 1.884} 188.4`} strokeLinecap="round" />
                  <defs><linearGradient id="grad"><stop offset="0%" stopColor="hsl(var(--neon-green))" /><stop offset="100%" stopColor="hsl(var(--neon-blue))" /></linearGradient></defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-display text-sm font-bold text-white">{progressPct}%</span>
                </div>
              </div>
              <div>
                <p className="text-sm text-white/70 font-body">{completedCount} of {totalTopics} topics completed</p>
                <p className="text-xs text-white/40 font-body">{completedSubjects.length} technology certificate(s) earned</p>
              </div>
            </div>
            <div className="space-y-2">
              {subjectProgress.map((sp) => (
                <div key={sp.name} className="flex items-center gap-3">
                  <span className="text-xs text-white/60 font-body w-32 truncate">{sp.name}</span>
                  <div className="flex-1 h-2 rounded-full bg-white/10 overflow-hidden">
                    <div className={`h-full rounded-full ${sp.done === sp.total && sp.total > 0 ? "bg-[hsl(var(--neon-green))]" : "bg-[hsl(var(--primary))]"}`}
                      style={{ width: `${sp.total > 0 ? (sp.done / sp.total) * 100 : 0}%` }} />
                  </div>
                  <span className="text-[10px] text-white/40 font-body w-10 text-right">{sp.done}/{sp.total}</span>
                  {sp.done === sp.total && sp.total > 0 && <CheckCircle2 className="w-3.5 h-3.5 text-[hsl(var(--neon-green))]" />}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Certificates */}
          {completedSubjects.length > 0 && (
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="glass-card p-5">
              <h3 className="font-display text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-[hsl(var(--neon-blue))]" /> Certificates Earned
              </h3>
              <div className="grid md:grid-cols-2 gap-3">
                {completedSubjects.map((sub) => (
                  <div key={sub.title} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-[hsl(var(--neon-green))]/20">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[hsl(45,100%,55%)] to-[hsl(25,100%,55%)] flex items-center justify-center shrink-0">
                      <Crown className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-display font-bold text-white">{sub.title}</p>
                      <p className="text-[10px] text-white/40 font-body">All {sub.topics.length} topics completed</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      )}

      {/* Projects Tab */}
      {activeTab === "projects" && (
        <div className="space-y-4">
          {evaluatedProjects.length === 0 ? (
            <div className="glass-card p-10 text-center">
              <Code className="w-10 h-10 text-white/20 mx-auto mb-3" />
              <p className="text-white/40 font-body">No evaluated projects yet. Submit projects to see them here!</p>
            </div>
          ) : (
            evaluatedProjects.map((proj, i) => (
              <motion.div key={proj.id} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: i * 0.05 }}
                className={`glass-card p-5 border ${
                  proj.evaluationStatus === "approved" ? "border-[hsl(var(--neon-green))]/20" : "border-[hsl(var(--neon-orange))]/20"
                }`}>
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-display text-base font-bold text-white">{proj.title}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs bg-[hsl(var(--neon-blue))]/15 text-[hsl(var(--neon-blue))] px-2 py-0.5 rounded-full font-body">{proj.technology}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-body font-bold ${
                        proj.evaluationStatus === "approved"
                          ? "bg-[hsl(var(--neon-green))]/15 text-[hsl(var(--neon-green))]"
                          : "bg-[hsl(var(--neon-orange))]/15 text-[hsl(var(--neon-orange))]"
                      }`}>
                        {proj.evaluationStatus === "approved" ? "✅ Approved" : "🔄 Needs Improvement"}
                      </span>
                    </div>
                  </div>
                  {proj.marks !== null && (
                    <div className="text-right">
                      <div className="font-display text-2xl font-bold text-[hsl(var(--neon-green))]">
                        {proj.marks}<span className="text-sm text-white/30">/{proj.maxMarks}</span>
                      </div>
                      {proj.grade && <p className="text-xs text-white/50 font-body">Grade: {proj.grade}</p>}
                    </div>
                  )}
                </div>
                {proj.feedback && (
                  <div className="mt-3 p-3 rounded-xl bg-white/5 border border-white/5">
                    <p className="text-xs text-white/40 font-body font-bold mb-1">Teacher Feedback:</p>
                    <p className="text-xs text-white/60 font-body">{proj.feedback}</p>
                  </div>
                )}
                <p className="text-[10px] text-white/30 font-body mt-2 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> Submitted: {new Date(proj.submittedAt).toLocaleDateString()}
                </p>
              </motion.div>
            ))
          )}
        </div>
      )}

      {/* Skills Tab */}
      {activeTab === "skills" && (
        <div className="space-y-6">
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="glass-card p-5">
            <h3 className="font-display text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-[hsl(var(--neon-orange))]" /> Technology Skills
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {subjectProgress.filter(sp => sp.done > 0).map((sp) => {
                const pct = Math.round((sp.done / sp.total) * 100);
                const isComplete = sp.done === sp.total;
                return (
                  <div key={sp.name} className={`p-4 rounded-xl border text-center ${
                    isComplete ? "bg-[hsl(var(--neon-green))]/5 border-[hsl(var(--neon-green))]/20" : "bg-white/5 border-white/10"
                  }`}>
                    <div className="relative w-14 h-14 mx-auto mb-2">
                      <svg className="w-14 h-14 -rotate-90" viewBox="0 0 56 56">
                        <circle cx="28" cy="28" r="22" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="4" />
                        <circle cx="28" cy="28" r="22" fill="none"
                          stroke={isComplete ? "hsl(var(--neon-green))" : "hsl(var(--primary))"}
                          strokeWidth="4" strokeDasharray={`${pct * 1.382} 138.2`} strokeLinecap="round" />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-[11px] font-display font-bold text-white">{pct}%</span>
                      </div>
                    </div>
                    <p className="text-xs font-display font-bold text-white truncate">{sp.name}</p>
                    <p className="text-[10px] text-white/40 font-body">{sp.done}/{sp.total} topics</p>
                    {isComplete && <span className="text-[10px] text-[hsl(var(--neon-green))] font-body font-bold">✓ Mastered</span>}
                  </div>
                );
              })}
              {subjectProgress.filter(sp => sp.done > 0).length === 0 && (
                <div className="col-span-full text-center p-8">
                  <Target className="w-10 h-10 text-white/20 mx-auto mb-3" />
                  <p className="text-white/40 font-body">Start completing topics to build your skills!</p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Project Technologies */}
          {evaluatedProjects.length > 0 && (
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="glass-card p-5">
              <h3 className="font-display text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Flame className="w-5 h-5 text-[hsl(var(--neon-orange))]" /> Project Experience
              </h3>
              <div className="space-y-2">
                {Array.from(new Set(evaluatedProjects.map(p => p.technology))).map((tech) => {
                  const techProjects = evaluatedProjects.filter(p => p.technology === tech);
                  const avgScore = Math.round(techProjects.reduce((a, p) => a + ((p.marks || 0) / p.maxMarks) * 100, 0) / techProjects.length);
                  return (
                    <div key={tech} className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
                      <Code className="w-5 h-5 text-[hsl(var(--neon-blue))]" />
                      <div className="flex-1">
                        <p className="text-sm font-body font-bold text-white">{tech}</p>
                        <p className="text-[10px] text-white/40 font-body">{techProjects.length} project(s) · Avg: {avgScore}%</p>
                      </div>
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star key={s} className={`w-3.5 h-3.5 ${s <= Math.ceil(avgScore / 20) ? "text-[hsl(var(--neon-orange))] fill-[hsl(var(--neon-orange))]" : "text-white/10"}`} />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
};

export default StudentPortfolio;
