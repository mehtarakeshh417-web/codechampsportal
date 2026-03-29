import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { useData } from "@/contexts/DataContext";
import { supabase } from "@/integrations/supabase/client";
import { getCurriculumForClass } from "@/lib/curriculumData";
import { BookOpen, ChevronDown, ChevronRight, CheckCircle2, Users } from "lucide-react";

const TeacherStudentProgress = () => {
  const { user } = useAuth();
  const { getTeacherStudents } = useData();
  const students = getTeacherStudents(user?.id || "");
  const [completions, setCompletions] = useState<Record<string, string[]>>({});
  const [expanded, setExpanded] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (students.length === 0) { setLoading(false); return; }
      const studentIds = students.map((s) => s.id);
      const { data } = await supabase
        .from("topic_completions")
        .select("student_id, topic_id")
        .in("student_id", studentIds);

      if (data) {
        const map: Record<string, string[]> = {};
        data.forEach((row: any) => {
          if (!map[row.student_id]) map[row.student_id] = [];
          map[row.student_id].push(row.topic_id);
        });
        setCompletions(map);
      }
      setLoading(false);
    };
    load();
  }, [students]);

  if (loading) return <div className="text-white/40 font-body text-center py-12">Loading progress...</div>;

  return (
    <div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="font-display text-3xl font-bold mb-1"><span className="text-gradient-brand">Student Progress</span></h1>
        <p className="text-white/60 font-body mb-8">Track curriculum completion for each student</p>
      </motion.div>

      {students.length === 0 ? (
        <div className="glass-card p-12 text-center">
          <Users className="w-16 h-16 text-white/20 mx-auto mb-4" />
          <p className="text-white/40 font-body">No students assigned yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {students.map((student, i) => {
            const curriculum = getCurriculumForClass(student.class ? `${student.class} (${student.section || "A"})` : "");
            const totalTopics = curriculum ? curriculum.subjects.reduce((s, sub) => s + sub.topics.length, 0) : 0;
            const completedIds = completions[student.id] || [];
            const completedCount = completedIds.length;
            const pct = totalTopics > 0 ? Math.round((completedCount / totalTopics) * 100) : 0;
            const isExpanded = expanded === student.id;

            return (
              <motion.div key={student.id} initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: i * 0.03 }}>
                <button
                  onClick={() => setExpanded(isExpanded ? null : student.id)}
                  className="w-full glass-card p-4 flex items-center gap-4 hover:bg-white/5 transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-blue to-neon-green flex items-center justify-center shrink-0 text-white font-bold text-sm">
                    {student.name?.charAt(0) || "?"}
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="font-display text-sm font-bold text-white">{student.name}</h3>
                    <p className="text-xs text-white/40 font-body">{student.class} ({student.section || "A"}) · Roll #{student.rollNo}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-sm font-bold font-display ${pct >= 80 ? "text-neon-green" : pct >= 40 ? "text-neon-orange" : "text-white/50"}`}>{pct}%</span>
                    <div className="w-24 h-2 rounded-full bg-white/10 overflow-hidden">
                      <div className="h-full rounded-full bg-gradient-to-r from-neon-green to-neon-blue transition-all" style={{ width: `${pct}%` }} />
                    </div>
                    {isExpanded ? <ChevronDown className="w-4 h-4 text-white/40" /> : <ChevronRight className="w-4 h-4 text-white/40" />}
                  </div>
                </button>

                {isExpanded && curriculum && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} className="overflow-hidden">
                    <div className="ml-4 mt-2 space-y-2 pl-4 border-l-2 border-white/10 pb-2">
                      {curriculum.subjects.map((sub) => (
                        <div key={sub.id} className="bg-white/5 rounded-lg p-3">
                          <h4 className="text-xs font-bold text-white/70 font-body mb-2">{sub.title}</h4>
                          <div className="space-y-1">
                            {sub.topics.map((topic) => {
                              const done = completedIds.includes(topic.id);
                              return (
                                <div key={topic.id} className="flex items-center gap-2 px-2 py-1">
                                  {done ? <CheckCircle2 className="w-3.5 h-3.5 text-neon-green" /> : <div className="w-3.5 h-3.5 rounded-full border border-white/20" />}
                                  <span className={`text-xs font-body ${done ? "text-white/80" : "text-white/40"}`}>{topic.title}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TeacherStudentProgress;
