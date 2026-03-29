import { useState, useMemo, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { getCurriculumForClass, type Topic } from "@/lib/curriculumData";
import { getTopicTextbook } from "@/lib/class5Content";
import { BookOpen, ChevronRight, ChevronDown, CheckCircle2, Circle, Code, FileText, Sparkles, Monitor, Palette, Gamepad2, Table, HardDrive, Cpu, Image, Terminal, Layers, Database, Paintbrush, Layout, Smartphone, Presentation, BarChart3, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useData } from "@/contexts/DataContext";

const iconMap: Record<string, React.ElementType> = {
  Monitor, Palette, Gamepad2, FileText, Code, Cpu, HardDrive, AppWindow: Monitor, Table,
  Image, Terminal, Layers, Database, Paintbrush, Layout, Smartphone, Sparkles, Presentation, BarChart3,
};

const colorMap: Record<string, string> = {
  "neon-blue": "from-[hsl(200,100%,50%)] to-[hsl(220,90%,60%)]",
  "neon-green": "from-[hsl(145,80%,50%)] to-[hsl(170,80%,45%)]",
  "neon-orange": "from-[hsl(25,100%,55%)] to-[hsl(45,100%,55%)]",
  "neon-purple": "from-[hsl(260,80%,60%)] to-[hsl(280,80%,55%)]",
  "neon-pink": "from-[hsl(330,90%,60%)] to-[hsl(350,90%,55%)]",
};

const StudentCurriculum = () => {
  const { user } = useAuth();
  const { students } = useData();
  const navigate = useNavigate();
  const curriculum = useMemo(() => getCurriculumForClass(user?.className || ""), [user?.className]);
  const student = useMemo(() => students.find((s) => s.user_id === user?.id), [students, user?.id]);

  const [completedTopics, setCompletedTopics] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedSubject, setExpandedSubject] = useState<string | null>(null);

  useEffect(() => {
    if (!student) { setLoading(false); return; }
    supabase
      .from("topic_completions")
      .select("topic_id")
      .eq("student_id", student.id)
      .then(({ data }) => {
        if (data) setCompletedTopics(data.map((d: any) => d.topic_id));
        setLoading(false);
      });
  }, [student]);

  const { refreshData } = useData();

  const toggleComplete = useCallback(async (topicId: string) => {
    if (!student) return;
    const isCompleted = completedTopics.includes(topicId);
    if (isCompleted) {
      setCompletedTopics((prev) => prev.filter((id) => id !== topicId));
      await supabase.from("topic_completions").delete().eq("student_id", student.id).eq("topic_id", topicId);
      toast.success("Topic unmarked");
    } else {
      setCompletedTopics((prev) => [...prev, topicId]);
      await supabase.from("topic_completions").insert({ student_id: student.id, topic_id: topicId });
      toast.success("Topic completed! +50 XP 🎉");
    }
    // Refresh student data so XP updates everywhere
    await refreshData();
  }, [student, completedTopics, refreshData]);

  if (!curriculum) {
    return (
      <div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h1 className="font-display text-3xl font-bold mb-1"><span className="text-gradient-brand">My Curriculum</span></h1>
          <p className="text-white/50 font-body mb-8">Your class-wise learning path</p>
        </motion.div>
        <div className="glass-card p-12 text-center">
          <BookOpen className="w-16 h-16 text-white/20 mx-auto mb-4" />
          <p className="text-white/40 font-body">No curriculum found for your class.</p>
        </div>
      </div>
    );
  }

  const totalTopics = curriculum.subjects.reduce((s, sub) => s + sub.topics.length, 0);
  const completedCount = completedTopics.length;

  return (
    <div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="font-display text-3xl font-bold mb-1"><span className="text-gradient-brand">My Curriculum</span></h1>
        <p className="text-white/60 font-body mb-2">{curriculum.className} · {completedCount}/{totalTopics} topics completed</p>
        <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden mb-8">
          <motion.div initial={{ width: 0 }} animate={{ width: `${totalTopics > 0 ? (completedCount / totalTopics) * 100 : 0}%` }} transition={{ duration: 0.8 }} className="h-full rounded-full bg-gradient-to-r from-neon-green to-neon-blue" />
        </div>
      </motion.div>

      {loading ? (
        <div className="text-center py-12 text-white/40 font-body">Loading...</div>
      ) : (
        <div className="space-y-4">
          {curriculum.subjects.map((subject, si) => {
            const Icon = iconMap[subject.icon] || BookOpen;
            const isExpanded = expandedSubject === subject.id;
            const subjectCompleted = subject.topics.filter((t) => completedTopics.includes(t.id)).length;
            const gradient = colorMap[subject.color] || colorMap["neon-blue"];

            return (
              <motion.div key={subject.id} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: si * 0.05 }}>
                <button onClick={() => setExpandedSubject(isExpanded ? null : subject.id)} className="w-full glass-card p-5 flex items-center gap-4 hover:bg-white/5 transition-colors">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shrink-0`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="font-display text-lg font-bold text-white">{subject.title}</h3>
                    <p className="text-xs text-white/50 font-body">{subjectCompleted}/{subject.topics.length} topics completed</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-20 h-2 rounded-full bg-white/10 overflow-hidden">
                      <div className="h-full rounded-full bg-gradient-to-r from-neon-green to-neon-blue" style={{ width: `${subject.topics.length > 0 ? (subjectCompleted / subject.topics.length) * 100 : 0}%` }} />
                    </div>
                    {isExpanded ? <ChevronDown className="w-5 h-5 text-white/40" /> : <ChevronRight className="w-5 h-5 text-white/40" />}
                  </div>
                </button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <div className="ml-6 mt-2 space-y-2 border-l-2 border-white/10 pl-4 pb-2">
                        {subject.topics.map((topic) => {
                          const done = completedTopics.includes(topic.id);
                          const hasTextbook = !!getTopicTextbook(topic.id);
                          const textbook = getTopicTextbook(topic.id);

                          return (
                            <motion.div
                              key={topic.id}
                              initial={{ x: -10, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              className={`rounded-xl border transition-all ${done ? "bg-[hsl(145,80%,50%,0.08)] border-[hsl(145,80%,50%,0.3)]" : "bg-white/5 border-white/10 hover:bg-white/8"}`}
                            >
                              <div className="p-4 flex items-center gap-3">
                                <button
                                  onClick={(e) => { e.stopPropagation(); toggleComplete(topic.id); }}
                                  className="shrink-0"
                                >
                                  {done ? <CheckCircle2 className="w-5 h-5 text-neon-green" /> : <Circle className="w-5 h-5 text-white/40 hover:text-white/60" />}
                                </button>
                                <div className="flex-1">
                                  <span className="font-body text-sm font-semibold text-white">{topic.title}</span>
                                  <span className="text-xs text-white/50 ml-2">
                                    {hasTextbook ? `${textbook!.pages.length} pages` : `${topic.lessons.length} lessons`} · {topic.activities.length} activities
                                  </span>
                                </div>
                                {hasTextbook ? (
                                  <Button
                                    size="sm"
                                    onClick={() => navigate(`/dashboard/curriculum/topic/${topic.id}`)}
                                    className="bg-primary/20 text-primary border border-primary/30 hover:bg-primary/30 gap-1 text-xs"
                                  >
                                    Open Textbook <ArrowRight className="w-3 h-3" />
                                  </Button>
                                ) : (
                                  <span className="text-xs text-white/30 font-body">Basic content</span>
                                )}
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default StudentCurriculum;
