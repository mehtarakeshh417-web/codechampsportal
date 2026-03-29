import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { getCurriculumForClass } from "@/lib/curriculumData";
import { getTopicTextbook } from "@/lib/class5Content";
import { BookOpen, ChevronRight, ChevronDown, Circle, Monitor, Palette, Gamepad2, FileText, Code, Cpu, HardDrive, Table, Image, Terminal, Layers, Database, Paintbrush, Layout, Smartphone, Sparkles, Presentation, BarChart3, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

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

const CLASS_OPTIONS = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th"];

const TeacherCurriculum = () => {
  const navigate = useNavigate();
  const [selectedClass, setSelectedClass] = useState("5th");
  const curriculum = useMemo(() => getCurriculumForClass(selectedClass), [selectedClass]);
  const [expandedSubject, setExpandedSubject] = useState<string | null>(null);

  return (
    <div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="font-display text-3xl font-bold mb-1"><span className="text-gradient-brand">Curriculum Browser</span></h1>
        <p className="text-white/60 font-body mb-4">Browse curriculum content for any class</p>
      </motion.div>

      {/* Class Selector */}
      <div className="flex flex-wrap gap-2 mb-6">
        {CLASS_OPTIONS.map((cls) => (
          <button key={cls} onClick={() => { setSelectedClass(cls); setExpandedSubject(null); }}
            className={`px-4 py-2 rounded-xl text-sm font-body font-bold transition-all ${
              selectedClass === cls
                ? "bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--secondary))] text-white shadow-lg"
                : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/70 border border-white/10"
            }`}>
            Class {cls.replace(/\D/g, '')}
          </button>
        ))}
      </div>

      {!curriculum ? (
        <div className="glass-card p-12 text-center">
          <BookOpen className="w-16 h-16 text-white/20 mx-auto mb-4" />
          <p className="text-white/40 font-body">No curriculum found for this class.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {curriculum.subjects.map((subject, si) => {
            const Icon = iconMap[subject.icon] || BookOpen;
            const isExpanded = expandedSubject === subject.id;
            const gradient = colorMap[subject.color] || colorMap["neon-blue"];

            return (
              <motion.div key={subject.id} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: si * 0.05 }}>
                <button onClick={() => setExpandedSubject(isExpanded ? null : subject.id)} className="w-full glass-card p-5 flex items-center gap-4 hover:bg-white/5 transition-colors">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shrink-0`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="font-display text-lg font-bold text-white">{subject.title}</h3>
                    <p className="text-xs text-white/50 font-body">{subject.topics.length} topic(s)</p>
                  </div>
                  {isExpanded ? <ChevronDown className="w-5 h-5 text-white/40" /> : <ChevronRight className="w-5 h-5 text-white/40" />}
                </button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <div className="ml-6 mt-2 space-y-2 border-l-2 border-white/10 pl-4 pb-2">
                        {subject.topics.map((topic) => {
                          const hasTextbook = !!getTopicTextbook(topic.id);
                          const textbook = getTopicTextbook(topic.id);
                          return (
                            <motion.div key={topic.id} initial={{ x: -10, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
                              className="rounded-xl border bg-white/5 border-white/10 hover:bg-white/8 transition-all">
                              <div className="p-4 flex items-center gap-3">
                                <Circle className="w-5 h-5 text-white/30 shrink-0" />
                                <div className="flex-1">
                                  <span className="font-body text-sm font-semibold text-white">{topic.title}</span>
                                  <span className="text-xs text-white/50 ml-2">
                                    {hasTextbook ? `${textbook!.pages.length} pages` : `${topic.lessons.length} lessons`} · {topic.activities.length} activities
                                  </span>
                                </div>
                                {hasTextbook && (
                                  <Button size="sm" onClick={() => navigate(`/dashboard/curriculum/topic/${topic.id}`)}
                                    className="bg-primary/20 text-primary border border-primary/30 hover:bg-primary/30 gap-1 text-xs">
                                    View Content <ArrowRight className="w-3 h-3" />
                                  </Button>
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

export default TeacherCurriculum;
