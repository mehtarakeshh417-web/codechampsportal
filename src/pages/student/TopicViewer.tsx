import { useState, useMemo, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useData } from "@/contexts/DataContext";
import { getTopicTextbook } from "@/lib/class5Content";
import { getCurriculumForClass } from "@/lib/curriculumData";
import { getTopicVideos } from "@/lib/topicVideos";
import { getQuizForTopic } from "@/lib/quizData";
import { BookOpen, ChevronLeft, ArrowLeft, ArrowRight, CheckCircle2, Award, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

import TopicSidebar from "@/components/topic-viewer/TopicSidebar";
import TopicProgressPanel from "@/components/topic-viewer/TopicProgressPanel";
import { PremiumSection, PremiumExercise, PremiumPageHeader } from "@/components/topic-viewer/PremiumContentSections";
import WatchAndLearn from "@/components/topic-viewer/WatchAndLearn";
import TopicQuiz from "@/components/topic-viewer/TopicQuiz";
import StudentNotes from "@/components/topic-viewer/StudentNotes";

const xpLevel = (xp: number) => {
  if (xp < 500) return 1;
  if (xp < 1500) return 2;
  if (xp < 3000) return 3;
  if (xp < 5000) return 4;
  return 5;
};

const TopicViewer = () => {
  const { topicId } = useParams<{ topicId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { students, refreshData } = useData();
  const textbook = useMemo(() => getTopicTextbook(topicId || ""), [topicId]);
  const topicVideos = useMemo(() => getTopicVideos(topicId || ""), [topicId]);
  const quizQuestions = useMemo(() => getQuizForTopic(topicId || ""), [topicId]);
  const student = useMemo(() => students.find((s) => s.user_id === user?.id), [students, user?.id]);
  const curriculum = useMemo(() => getCurriculumForClass(user?.className || ""), [user?.className]);

  const [currentPage, setCurrentPage] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [completedTopics, setCompletedTopics] = useState<string[]>([]);
  const [expandedSubjectId, setExpandedSubjectId] = useState<string | null>(null);

  const currentSubject = useMemo(() => {
    if (!curriculum || !topicId) return null;
    return curriculum.subjects.find((s) => s.topics.some((t) => t.id === topicId)) || null;
  }, [curriculum, topicId]);

  useEffect(() => {
    if (currentSubject) setExpandedSubjectId(currentSubject.id);
  }, [currentSubject]);

  useEffect(() => {
    if (!student || !topicId) return;
    supabase
      .from("topic_completions")
      .select("id")
      .eq("student_id", student.id)
      .eq("topic_id", topicId)
      .then(({ data }) => {
        if (data && data.length > 0) setIsCompleted(true);
        else setIsCompleted(false);
      });
  }, [student, topicId]);

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
    setCurrentPage(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [topicId]);

  const toggleComplete = useCallback(async () => {
    if (!student || !topicId) return;
    if (isCompleted) {
      await supabase.from("topic_completions").delete().eq("student_id", student.id).eq("topic_id", topicId);
      setIsCompleted(false);
      setCompletedTopics((prev) => prev.filter((id) => id !== topicId));
      toast.success("Topic unmarked");
    } else {
      await supabase.from("topic_completions").insert({ student_id: student.id, topic_id: topicId });
      setIsCompleted(true);
      setCompletedTopics((prev) => [...prev, topicId]);
      toast.success("Topic completed! +50 XP 🎉");
    }
    await refreshData();
  }, [student, topicId, isCompleted, refreshData]);

  const handleSelectTopic = useCallback((newTopicId: string) => {
    if (newTopicId !== topicId) {
      navigate(`/dashboard/curriculum/topic/${newTopicId}`);
    }
  }, [topicId, navigate]);

  const moduleTotalTopics = currentSubject?.topics.length || 0;
  const moduleCompletedTopics = currentSubject?.topics.filter((t) => completedTopics.includes(t.id)).length || 0;

  if (!textbook) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-24"
      >
        <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/[0.08] flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-black/20">
          <BookOpen className="w-10 h-10 text-foreground/15" />
        </div>
        <h2 className="font-display text-xl text-foreground/50 mb-2">Content Coming Soon</h2>
        <p className="text-foreground/30 font-body text-sm mb-8 max-w-sm mx-auto">This topic's premium content is being prepared. Check back soon!</p>
        <Button variant="ghost" onClick={() => navigate("/dashboard/curriculum")} className="text-primary gap-2 rounded-xl">
          <ChevronLeft className="w-4 h-4" /> Back to Curriculum
        </Button>
      </motion.div>
    );
  }

  const totalPages = textbook.pages.length;
  const page = textbook.pages[currentPage];
  const isLastPage = currentPage === totalPages - 1;
  const isFirstPage = currentPage === 0;
  const xp = student?.xp || 0;

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex gap-7 -mx-2 relative">
      {/* Ambient background glow */}
      <div className="fixed top-0 left-1/3 w-[600px] h-[400px] rounded-full bg-primary/[0.02] blur-[120px] pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-[500px] h-[300px] rounded-full bg-secondary/[0.02] blur-[100px] pointer-events-none" />

      {/* LEFT SIDEBAR */}
      {curriculum && (
        <TopicSidebar
          subjects={curriculum.subjects}
          currentTopicId={topicId || ""}
          completedTopics={completedTopics}
          expandedSubjectId={expandedSubjectId}
          onToggleSubject={(id) => setExpandedSubjectId((prev) => (prev === id ? null : id))}
          onSelectTopic={handleSelectTopic}
        />
      )}

      {/* CENTER CONTENT */}
      <div className="flex-1 min-w-0">
        {/* Top bar */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-between mb-7">
          <Button
            variant="ghost"
            onClick={() => navigate("/dashboard/curriculum")}
            className="text-foreground/35 hover:text-foreground gap-2 text-sm rounded-xl"
          >
            <ChevronLeft className="w-4 h-4" /> Curriculum
          </Button>
          <div className="flex items-center gap-3">
            {isCompleted && (
              <motion.span
                initial={{ scale: 0, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 400 }}
                className="flex items-center gap-2 text-xs font-display font-bold text-neon-green bg-neon-green/[0.08] border border-neon-green/20 px-4 py-2 rounded-full shadow-lg shadow-neon-green/5"
              >
                <CheckCircle2 className="w-3.5 h-3.5" /> Completed
              </motion.span>
            )}
          </div>
        </motion.div>

        {/* Topic Title */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary/15 to-secondary/10 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-primary" />
            </div>
            {currentSubject && (
              <span className="text-xs text-foreground/30 font-body uppercase tracking-wider">{currentSubject.title}</span>
            )}
          </div>
          <h1 className="font-display text-xl md:text-2xl lg:text-3xl font-bold text-foreground leading-tight">{textbook.topicTitle}</h1>
        </motion.div>

        {/* Page Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${topicId}-${currentPage}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <PremiumPageHeader
              pageTitle={page.pageTitle}
              subtitle={page.subtitle}
              bannerImage={page.bannerImage}
              bannerColor={page.bannerColor}
              pageNumber={currentPage + 1}
              totalPages={totalPages}
            />

            <div className="space-y-8">
              {page.sections.map((section, i) => (
                <PremiumSection key={i} section={section} index={i} />
              ))}
            </div>

            {/* Exercises */}
            {page.exercises && page.exercises.length > 0 && (
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-12 rounded-3xl overflow-hidden border border-primary/[0.12] shadow-2xl shadow-black/30"
              >
                {/* Exercise header */}
                <div className="relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/[0.1] via-secondary/[0.06] to-neon-purple/[0.04]" />
                  <div className="relative px-8 py-6 border-b border-white/[0.06]">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/15 flex items-center justify-center shadow-lg shadow-primary/10">
                        <span className="text-xl">📝</span>
                      </div>
                      <div>
                        <h3 className="font-display text-lg font-bold text-foreground">Test Your Understanding</h3>
                        <p className="text-xs text-foreground/35 font-body mt-0.5">Answer these questions to reinforce what you've learned</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-7 space-y-5 bg-gradient-to-b from-[hsl(220,30%,9%)] to-[hsl(220,28%,8%)]">
                  {page.exercises.map((ex, i) => (
                    <PremiumExercise key={i} exercise={ex} index={i} />
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Watch & Learn Video Section */}
        {isLastPage && topicVideos.length > 0 && (
          <WatchAndLearn videos={topicVideos} topicTitle={textbook.topicTitle} />
        )}

        {/* Topic Quiz */}
        {isLastPage && quizQuestions && user?.role === "student" && student && (
          <div className="mt-10">
            <TopicQuiz
              questions={quizQuestions}
              topicId={topicId || ""}
              studentId={student.id}
              onComplete={() => refreshData()}
            />
          </div>
        )}

        {/* Student Notes */}
        {user?.role === "student" && student && (
          <StudentNotes studentId={student.id} topicId={topicId || ""} />
        )}
        {/* Bottom Navigation */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-14 mb-12">
          {/* Page selector pills */}
          <div className="flex items-center justify-center gap-2.5 mb-7 flex-wrap">
            {textbook.pages.map((p, i) => (
              <button
                key={i}
                onClick={() => handlePageChange(i)}
                className={`min-w-[44px] h-11 px-3.5 rounded-xl text-sm font-body font-bold transition-all duration-400 ${
                  i === currentPage
                    ? "bg-gradient-to-r from-primary to-secondary text-white shadow-xl shadow-primary/30 scale-110 ring-2 ring-primary/20 ring-offset-2 ring-offset-[hsl(220,30%,8%)]"
                    : i < currentPage
                    ? "bg-neon-green/[0.08] text-neon-green hover:bg-neon-green/[0.15] border border-neon-green/15 hover:scale-105"
                    : "bg-white/[0.03] text-foreground/35 hover:bg-white/[0.07] hover:text-foreground/55 border border-white/[0.05] hover:scale-105"
                }`}
                title={p.pageTitle}
              >
                {i + 1}
              </button>
            ))}
          </div>

          {/* Mobile nav buttons */}
          <div className="flex items-center justify-between xl:hidden">
            <Button
              variant="ghost"
              onClick={() => handlePageChange(Math.max(0, currentPage - 1))}
              disabled={isFirstPage}
              className="text-foreground/35 hover:text-foreground disabled:opacity-10 gap-2 rounded-xl"
            >
              <ArrowLeft className="w-4 h-4" /> Previous
            </Button>

            {isLastPage ? (
              <Button
                onClick={toggleComplete}
                className={`gap-2.5 rounded-xl h-12 font-bold transition-all duration-500 ${
                  isCompleted
                    ? "bg-neon-green/15 text-neon-green border-2 border-neon-green/30 hover:bg-neon-green/25 shadow-xl shadow-neon-green/10"
                    : "bg-gradient-to-r from-primary via-secondary to-neon-purple text-white hover:opacity-90 shadow-2xl shadow-primary/30"
                }`}
              >
                {isCompleted ? (
                  <><CheckCircle2 className="w-5 h-5" /> Completed ✓</>
                ) : (
                  <><Award className="w-5 h-5" /> Mark Complete</>
                )}
              </Button>
            ) : (
              <Button
                onClick={() => handlePageChange(Math.min(totalPages - 1, currentPage + 1))}
                className="bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90 gap-2.5 rounded-xl shadow-2xl shadow-primary/30 h-12 font-bold"
              >
                Next <ArrowRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        </motion.div>
      </div>

      {/* RIGHT PANEL */}
      <TopicProgressPanel
        currentPage={currentPage}
        totalPages={totalPages}
        isCompleted={isCompleted}
        topicTitle={textbook.topicTitle}
        xp={xp}
        level={xpLevel(xp)}
        moduleTotalTopics={moduleTotalTopics}
        moduleCompletedTopics={moduleCompletedTopics}
        onToggleComplete={toggleComplete}
        onNextPage={() => handlePageChange(Math.min(totalPages - 1, currentPage + 1))}
        onPrevPage={() => handlePageChange(Math.max(0, currentPage - 1))}
        isFirstPage={isFirstPage}
        isLastPage={isLastPage}
      />
    </div>
  );
};

export default TopicViewer;
