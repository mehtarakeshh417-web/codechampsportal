import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Circle, ChevronDown, Layers, BookOpen } from "lucide-react";
import type { Subject } from "@/lib/curriculumData";

interface TopicSidebarProps {
  subjects: Subject[];
  currentTopicId: string;
  completedTopics: string[];
  expandedSubjectId: string | null;
  onToggleSubject: (id: string) => void;
  onSelectTopic: (topicId: string) => void;
}

const colorMap: Record<string, string> = {
  "neon-blue": "from-[hsl(200,100%,50%)] to-[hsl(220,90%,60%)]",
  "neon-green": "from-[hsl(145,80%,50%)] to-[hsl(170,80%,45%)]",
  "neon-orange": "from-[hsl(25,100%,55%)] to-[hsl(45,100%,55%)]",
  "neon-purple": "from-[hsl(260,80%,60%)] to-[hsl(280,80%,55%)]",
  "neon-pink": "from-[hsl(330,90%,60%)] to-[hsl(350,90%,55%)]",
};

const TopicSidebar = ({
  subjects,
  currentTopicId,
  completedTopics,
  expandedSubjectId,
  onToggleSubject,
  onSelectTopic,
}: TopicSidebarProps) => {
  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="w-[270px] shrink-0 hidden lg:block"
    >
      <div className="sticky top-6 max-h-[calc(100vh-120px)] overflow-y-auto pr-1 scrollbar-thin">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6 px-2">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary/15 to-secondary/15 border border-primary/10 flex items-center justify-center shadow-lg shadow-primary/5">
            <Layers className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-display text-[10px] font-bold text-foreground/40 uppercase tracking-[0.2em]">Module</h3>
            <h3 className="font-display text-sm font-bold text-foreground/90">Navigation</h3>
          </div>
        </div>

        <div className="space-y-2">
          {subjects.map((subject) => {
            const gradient = colorMap[subject.color] || colorMap["neon-blue"];
            const isExpanded = expandedSubjectId === subject.id;
            const completedInSubject = subject.topics.filter((t) => completedTopics.includes(t.id)).length;
            const allDone = completedInSubject === subject.topics.length && subject.topics.length > 0;
            const subjectProgress = subject.topics.length > 0 ? (completedInSubject / subject.topics.length) * 100 : 0;

            return (
              <div key={subject.id} className="rounded-2xl overflow-hidden">
                <button
                  onClick={() => onToggleSubject(subject.id)}
                  className={`w-full flex items-center gap-3 px-3.5 py-3.5 transition-all duration-300 rounded-2xl group ${
                    isExpanded
                      ? "bg-white/[0.06] shadow-lg shadow-black/10"
                      : "bg-white/[0.02] hover:bg-white/[0.05]"
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 group-hover:rotate-2 transition-all duration-300`}>
                    {allDone ? (
                      <CheckCircle2 className="w-4.5 h-4.5 text-white" />
                    ) : (
                      <span className="text-[10px] font-display font-bold text-white">{completedInSubject}/{subject.topics.length}</span>
                    )}
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <span className="text-xs font-body font-bold text-foreground/85 block truncate">{subject.title}</span>
                    {/* Mini progress bar */}
                    <div className="w-full h-1 rounded-full bg-white/[0.04] mt-1.5 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${subjectProgress}%` }}
                        className={`h-full rounded-full bg-gradient-to-r ${gradient}`}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </div>
                  <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    <ChevronDown className="w-4 h-4 text-foreground/25" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="ml-5 mt-1.5 space-y-1 border-l-2 border-white/[0.06] pl-4 pb-3">
                        {subject.topics.map((topic, ti) => {
                          const isCurrent = topic.id === currentTopicId;
                          const isDone = completedTopics.includes(topic.id);

                          return (
                            <motion.button
                              key={topic.id}
                              initial={{ x: -10, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              transition={{ delay: ti * 0.04, ease: "easeOut" }}
                              onClick={() => onSelectTopic(topic.id)}
                              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-300 group/topic ${
                                isCurrent
                                  ? "bg-primary/[0.12] border border-primary/25 shadow-md shadow-primary/5"
                                  : "hover:bg-white/[0.04] hover:translate-x-1"
                              }`}
                            >
                              {isDone ? (
                                <CheckCircle2 className="w-4 h-4 text-neon-green shrink-0" />
                              ) : isCurrent ? (
                                <div className="w-4 h-4 rounded-full border-2 border-primary shrink-0 flex items-center justify-center">
                                  <motion.div
                                    animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
                                    transition={{ repeat: Infinity, duration: 2 }}
                                    className="w-1.5 h-1.5 rounded-full bg-primary"
                                  />
                                </div>
                              ) : (
                                <Circle className="w-4 h-4 text-foreground/12 shrink-0 group-hover/topic:text-foreground/25 transition-colors" />
                              )}
                              <span
                                className={`text-xs font-body leading-snug transition-colors duration-200 ${
                                  isCurrent
                                    ? "text-primary font-bold"
                                    : isDone
                                    ? "text-foreground/45 line-through decoration-foreground/15"
                                    : "text-foreground/40 group-hover/topic:text-foreground/65"
                                }`}
                              >
                                {topic.title}
                              </span>
                            </motion.button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </motion.aside>
  );
};

export default TopicSidebar;
