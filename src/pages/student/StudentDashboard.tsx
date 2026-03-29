import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useData } from "@/contexts/DataContext";
import { getCurriculumForClass, countTotalTopics, countActivitiesAndProjects } from "@/lib/curriculumData";
import { Trophy, Target, BookOpen, Award, TrendingUp, Gamepad2, Megaphone, Flame, Sparkles, ChevronRight, Keyboard, Layers, Code, FileText } from "lucide-react";
import { useMemo, useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

const xpLevel = (xp: number) => {
  if (xp < 500) return { level: 1, title: "Byte Beginner", next: 500, emoji: "🌱" };
  if (xp < 1500) return { level: 2, title: "Code Cadet", next: 1500, emoji: "⚡" };
  if (xp < 3000) return { level: 3, title: "Script Ninja", next: 3000, emoji: "🥷" };
  if (xp < 5000) return { level: 4, title: "Dev Master", next: 5000, emoji: "🚀" };
  return { level: 5, title: "Legendary Coder", next: 10000, emoji: "👑" };
};

const motivationalTips = [
  "💡 Tip: Break big problems into smaller steps — just like real programmers do!",
  "🎯 Focus mode: Try completing one topic fully before moving to the next.",
  "🧠 Did you know? Practice coding for just 15 minutes daily and see massive improvement!",
  "🌟 Pro tip: Review completed topics to strengthen your memory.",
  "🔥 Challenge yourself: Try the Coding Lab to build something cool today!",
  "📝 Take notes while learning — it helps you remember 40% more!",
  "🏆 Set a goal: Complete 3 topics this week to level up faster!",
];

const StudentDashboard = () => {
  const { user } = useAuth();
  const { students } = useData();
  const navigate = useNavigate();

  const student = students.find((s) => s.user_id === user?.id);
  const xp = student?.xp || 0;
  const lvl = xpLevel(xp);
  const progress = Math.round((xp / lvl.next) * 100);

  const curriculum = useMemo(() => getCurriculumForClass(user?.className || ""), [user?.className]);
  const dailyTip = useMemo(() => motivationalTips[new Date().getDay() % motivationalTips.length], []);

  const [completedTopics, setCompletedTopics] = useState<string[]>([]);
  const [announcements, setAnnouncements] = useState<any[]>([]);

  useEffect(() => {
    if (!student) return;
    supabase
      .from("topic_completions")
      .select("topic_id")
      .eq("student_id", student.id)
      .then(({ data }) => {
        if (data) setCompletedTopics(data.map((d: any) => d.topic_id));
      });
  }, [student]);

  useEffect(() => {
    supabase
      .from("announcements")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(3)
      .then(({ data }) => {
        if (data) setAnnouncements(data);
      });
  }, []);

  const totalTopics = curriculum ? countTotalTopics(curriculum) : 0;
  const completedCount = completedTopics.length;
  const progressPct = totalTopics > 0 ? Math.round((completedCount / totalTopics) * 100) : 0;
  const stats = curriculum ? countActivitiesAndProjects(curriculum) : { activities: 0, projects: 0 };

  const primaryCards = [
    {
      icon: BookOpen, title: "My Curriculum", desc: `${curriculum?.subjects.length || 0} subjects · ${totalTopics} topics`, 
      gradient: "from-[hsl(200,100%,50%)] to-[hsl(260,80%,60%)]", glow: "neon-glow-blue", path: "/dashboard/curriculum",
    },
    {
      icon: TrendingUp, title: "Progress", desc: `${progressPct}% complete · ${completedCount}/${totalTopics} topics`,
      gradient: "from-[hsl(145,80%,50%)] to-[hsl(170,80%,45%)]", glow: "neon-glow-green", path: "/dashboard/progress",
    },
    {
      icon: Trophy, title: "Leaderboard", desc: "See your rank among peers",
      gradient: "from-[hsl(25,100%,55%)] to-[hsl(330,90%,60%)]", glow: "neon-glow-orange", path: "/dashboard/leaderboard",
    },
    {
      icon: Award, title: "Achievements", desc: `${xp} XP · Level ${lvl.level} · ${lvl.title}`,
      gradient: "from-[hsl(260,80%,60%)] to-[hsl(330,90%,60%)]", glow: "neon-glow-purple", path: "/dashboard/achievements",
    },
  ];

  const quickLinks = [
    { icon: Gamepad2, label: "Coding Lab", path: "/dashboard/coding-lab", color: "text-neon-blue" },
    { icon: FileText, label: "Assignments", path: "/dashboard/assignments", color: "text-neon-orange" },
    { icon: Code, label: "Projects", path: "/dashboard/projects", color: "text-neon-purple" },
    { icon: Layers, label: "Flashcards", path: "/dashboard/flashcards", color: "text-neon-green" },
    { icon: Keyboard, label: "Typing", path: "/dashboard/typing", color: "text-neon-pink" },
  ];

  return (
    <div>
      {/* Header with greeting */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        {user?.schoolName && (
          <motion.p 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.1 }}
            className="text-xs font-body text-neon-blue mb-1.5 tracking-widest uppercase font-bold flex items-center gap-1.5"
          >
            <Sparkles className="w-3 h-3" /> {user.schoolName}
          </motion.p>
        )}
        <h1 className="font-display text-3xl md:text-4xl font-bold mb-1">
          Hey, <span className="text-gradient-brand">{user?.displayName}</span>! {lvl.emoji}
        </h1>
        <p className="text-white/80 font-body font-bold text-sm">{user?.className} {student?.section && `· Section ${student.section}`}</p>
      </motion.div>

      {/* XP Level Card */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }} 
        transition={{ delay: 0.1 }} 
        className="glass-card p-5 md:p-6 mb-6 relative overflow-hidden group"
      >
        {/* Animated background accent */}
        <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-gradient-to-br from-neon-green/10 to-neon-blue/10 blur-3xl group-hover:scale-150 transition-transform duration-1000" />
        
        <div className="relative flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <motion.div 
              whileHover={{ rotate: [0, -5, 5, 0] }}
              className="w-14 h-14 rounded-2xl bg-gradient-to-br from-neon-green to-neon-blue flex items-center justify-center font-display text-xl font-bold text-cyber-darker shadow-lg shadow-neon-green/20"
            >
              {lvl.level}
            </motion.div>
            <div>
              <div className="font-display text-lg font-bold text-white">{lvl.title}</div>
              <div className="text-xs text-white/70 font-body font-semibold flex items-center gap-1.5">
                Level {lvl.level}
                <span className="inline-block w-1 h-1 rounded-full bg-white/30" />
                <span className="text-neon-green">{lvl.next - xp} XP to next</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="font-display text-3xl font-bold text-neon-green">{xp}</div>
            <div className="text-xs text-white/60 font-body font-bold">Total XP</div>
          </div>
        </div>
        <div className="relative w-full h-3 rounded-full bg-white/10 overflow-hidden">
          <motion.div 
            initial={{ width: 0 }} 
            animate={{ width: `${progress}%` }} 
            transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }} 
            className="h-full rounded-full bg-gradient-to-r from-neon-green via-neon-blue to-neon-purple relative"
          >
            <div className="absolute inset-0 shimmer" />
          </motion.div>
        </div>
      </motion.div>

      {/* Daily Tip */}
      <motion.div
        initial={{ y: 15, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-6 px-4 py-3 rounded-xl bg-gradient-to-r from-neon-orange/10 to-neon-pink/5 border border-neon-orange/15"
      >
        <p className="text-sm font-body text-white/80 font-medium">{dailyTip}</p>
      </motion.div>

      {/* Quick Links Row */}
      <motion.div
        initial={{ y: 15, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.25 }}
        className="flex gap-2 mb-6 overflow-x-auto pb-1 scrollbar-hide"
      >
        {quickLinks.map((link) => (
          <button
            key={link.label}
            onClick={() => navigate(link.path)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.06] border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-200 shrink-0 group"
          >
            <link.icon className={`w-4 h-4 ${link.color} group-hover:scale-110 transition-transform`} />
            <span className="text-xs font-body font-bold text-white/80 whitespace-nowrap">{link.label}</span>
          </button>
        ))}
      </motion.div>

      {/* Primary Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {primaryCards.map((card, i) => (
          <motion.div
            key={card.title}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 + i * 0.08 }}
            onClick={() => navigate(card.path)}
            className="glass-card-hover p-5 cursor-pointer group"
          >
            <div className="flex items-center gap-4">
              <div className={`w-13 h-13 rounded-2xl bg-gradient-to-br ${card.gradient} flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:shadow-lg transition-all duration-300`}
                style={{ width: "3.25rem", height: "3.25rem" }}
              >
                <card.icon className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="font-display text-base md:text-lg font-bold text-white">{card.title}</h2>
                <p className="text-white/70 font-body text-xs mt-0.5 font-semibold truncate">{card.desc}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-white/50 group-hover:translate-x-0.5 transition-all shrink-0" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Announcements */}
      {announcements.length > 0 && (
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.55 }} className="mb-6">
          <h3 className="font-display text-sm font-bold text-white/80 mb-3 flex items-center gap-2 uppercase tracking-wider">
            <Megaphone className="w-4 h-4 text-neon-orange" /> Announcements
          </h3>
          <div className="space-y-2">
            {announcements.map((a: any) => (
              <div key={a.id} className={`glass-card p-4 transition-all duration-200 hover:bg-white/[0.06] ${a.priority === "urgent" ? "border-red-400/30" : ""}`}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-display text-xs font-bold text-white">{a.title}</span>
                  {a.priority === "urgent" && (
                    <span className="text-[9px] bg-red-400/20 text-red-400 px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wider animate-pulse">Urgent</span>
                  )}
                </div>
                {a.message && <p className="text-white/50 font-body text-xs leading-relaxed">{a.message}</p>}
                <p className="text-white/25 font-body text-[10px] mt-1.5">{new Date(a.created_at).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Subjects", value: curriculum?.subjects.length || 0, icon: BookOpen, gradient: "from-primary/20 to-primary/5" },
          { label: "Activities", value: stats.activities, icon: Target, gradient: "from-neon-green/20 to-neon-green/5" },
          { label: "Projects", value: stats.projects, icon: Gamepad2, gradient: "from-neon-orange/20 to-neon-orange/5" },
          { label: "Completed", value: completedCount, icon: Award, gradient: "from-neon-purple/20 to-neon-purple/5" },
        ].map((s, i) => (
          <motion.div 
            key={s.label} 
            initial={{ y: 20, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }} 
            transition={{ delay: 0.6 + i * 0.05 }}
            className="glass-card p-4 text-center group hover:scale-105 transition-transform duration-300"
          >
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.gradient} flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform`}>
              <s.icon className="w-5 h-5 text-white/80" />
            </div>
            <div className="font-display text-xl font-bold text-white">{s.value}</div>
            <div className="text-[10px] text-white/50 font-body font-bold uppercase tracking-wider mt-0.5">{s.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default StudentDashboard;
