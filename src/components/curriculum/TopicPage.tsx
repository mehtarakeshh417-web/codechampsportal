// Reusable topic page: breadcrumbs, sticky tab nav, sidebar, prev/next.
// Tab contents are rendered only when their tab is selected, and each
// tab fetches its own content lazily.

import { useEffect, useMemo, useState, useCallback } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft, ChevronRight, BookOpen, Image as ImageIcon, Activity,
  Pencil, HelpCircle, Beaker, FileText, Award, CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useData } from "@/contexts/DataContext";
import {
  getClassBySlug,
  getTopicBySlug,
  getTopicsForClass,
} from "@/lib/curriculum/registry";
import type { TabKey } from "@/lib/curriculum/types";
import {
  OverviewTab, LearnTab, ImagesTab, ActivitiesTab,
  PracticeTab, QuizTab, LabTab,
} from "./Tabs";

const TAB_DEFS: Array<{ key: TabKey; label: string; icon: React.ComponentType<{ className?: string }> }> = [
  { key: "overview",   label: "Overview",   icon: FileText },
  { key: "learn",      label: "Learn",      icon: BookOpen },
  { key: "images",     label: "Images",     icon: ImageIcon },
  { key: "activities", label: "Activities", icon: Activity },
  { key: "practice",   label: "Practice",   icon: Pencil },
  { key: "quiz",       label: "Quiz",       icon: HelpCircle },
  { key: "lab",        label: "Lab",        icon: Beaker },
];

const TopicPage = () => {
  const { classSlug = "", topicSlug = "" } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { students, refreshData } = useData();

  const classMeta = useMemo(() => getClassBySlug(classSlug), [classSlug]);
  const topic = useMemo(() => getTopicBySlug(classSlug, topicSlug), [classSlug, topicSlug]);
  const siblings = useMemo(
    () => (classMeta ? getTopicsForClass(classMeta.classNumber) : []),
    [classMeta]
  );
  const idx = useMemo(
    () => (topic ? siblings.findIndex((t) => t.id === topic.id) : -1),
    [topic, siblings]
  );
  const prev = idx > 0 ? siblings[idx - 1] : undefined;
  const next = idx >= 0 && idx < siblings.length - 1 ? siblings[idx + 1] : undefined;

  const [activeTab, setActiveTab] = useState<TabKey>("overview");
  const [isCompleted, setIsCompleted] = useState(false);

  const student = useMemo(
    () => students.find((s) => s.user_id === user?.id),
    [students, user?.id]
  );

  // Reset on topic change
  useEffect(() => {
    setActiveTab("overview");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [topic?.id]);

  // Load completion
  useEffect(() => {
    if (!student || !topic) { setIsCompleted(false); return; }
    let cancelled = false;
    supabase
      .from("topic_completions")
      .select("id")
      .eq("student_id", student.id)
      .eq("topic_id", topic.id)
      .then(({ data }) => {
        if (!cancelled) setIsCompleted(!!data && data.length > 0);
      });
    return () => { cancelled = true; };
  }, [student, topic?.id]);

  const toggleComplete = useCallback(async () => {
    if (!student || !topic) return;
    if (isCompleted) {
      await supabase.from("topic_completions").delete()
        .eq("student_id", student.id).eq("topic_id", topic.id);
      setIsCompleted(false);
      toast.success("Topic unmarked");
    } else {
      await supabase.from("topic_completions").insert({
        student_id: student.id, topic_id: topic.id,
      });
      setIsCompleted(true);
      toast.success("Topic completed! +50 XP 🎉");
    }
    await refreshData();
  }, [student, topic, isCompleted, refreshData]);

  if (!classMeta || !topic) {
    return (
      <div className="glass-card p-12 text-center">
        <p className="text-foreground/50">Topic not found.</p>
        <Button asChild variant="outline" className="mt-4">
          <Link to="/dashboard/curriculum">Back to Curriculum</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex gap-6">
      {/* Sidebar — siblings */}
      <aside className="hidden lg:block w-64 shrink-0">
        <div className="sticky top-4 glass-card p-3 max-h-[calc(100vh-2rem)] overflow-y-auto">
          <Link
            to={`/dashboard/curriculum/${classMeta.classSlug}`}
            className="flex items-center gap-2 text-xs text-foreground/50 hover:text-foreground px-2 py-1.5"
          >
            <ChevronLeft className="w-3.5 h-3.5" /> {classMeta.className}
          </Link>
          <div className="mt-2 space-y-1">
            {siblings.map((s) => {
              const active = s.id === topic.id;
              return (
                <Link
                  key={s.id}
                  to={`/dashboard/curriculum/${classMeta.classSlug}/${s.topicSlug}`}
                  className={cn(
                    "flex items-center gap-2 px-2 py-2 rounded-lg text-xs transition-colors",
                    active
                      ? "bg-primary/15 text-primary border border-primary/30"
                      : "text-foreground/60 hover:bg-white/5 hover:text-foreground"
                  )}
                >
                  <span className="text-base">{s.emoji}</span>
                  <span className="flex-1 truncate">{s.title}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 min-w-0">
        {/* Breadcrumbs */}
        <nav className="text-xs text-foreground/40 mb-3 flex items-center gap-1.5 flex-wrap">
          <Link to="/dashboard/curriculum" className="hover:text-foreground">Curriculum</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to={`/dashboard/curriculum/${classMeta.classSlug}`} className="hover:text-foreground">{classMeta.className}</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-foreground/70">{topic.title}</span>
        </nav>

        {/* Header */}
        <div className="glass-card p-6 mb-5 relative overflow-hidden">
          <div className={cn("absolute inset-0 bg-gradient-to-br opacity-[0.07]", classMeta.gradient)} />
          <div className="relative flex items-start gap-4">
            <div className={cn("w-16 h-16 shrink-0 rounded-2xl bg-gradient-to-br flex items-center justify-center text-3xl shadow-lg", classMeta.gradient)}>
              {topic.emoji}
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground leading-tight">{topic.title}</h1>
              <p className="text-sm text-foreground/60 mt-1">{topic.shortDescription}</p>
            </div>
            {user?.role === "student" && (
              <Button
                onClick={toggleComplete}
                size="sm"
                variant={isCompleted ? "outline" : "default"}
                className={cn("gap-2 shrink-0", isCompleted && "border-neon-green/40 text-neon-green")}
              >
                {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : <Award className="w-4 h-4" />}
                {isCompleted ? "Completed" : "Mark Complete"}
              </Button>
            )}
          </div>
        </div>

        {/* Sticky tabs */}
        <div className="sticky top-0 z-10 -mx-2 px-2 py-2 mb-5 bg-background/85 backdrop-blur-md border-b border-white/5">
          <div className="flex gap-1 overflow-x-auto no-scrollbar">
            {TAB_DEFS.map(({ key, label, icon: Icon }) => {
              const active = activeTab === key;
              return (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={cn(
                    "flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors",
                    active
                      ? "bg-primary/15 text-primary border border-primary/30"
                      : "text-foreground/55 hover:text-foreground hover:bg-white/5 border border-transparent"
                  )}
                >
                  <Icon className="w-3.5 h-3.5" /> {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab content */}
        <div className="glass-card p-5 md:p-7 min-h-[300px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab + topic.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              {activeTab === "overview"   && <OverviewTab topic={topic} />}
              {activeTab === "learn"      && <LearnTab topic={topic} />}
              {activeTab === "images"     && <ImagesTab topic={topic} />}
              {activeTab === "activities" && <ActivitiesTab topic={topic} />}
              {activeTab === "practice"   && <PracticeTab topic={topic} />}
              {activeTab === "quiz"       && <QuizTab topic={topic} onPass={() => !isCompleted && toggleComplete()} />}
              {activeTab === "lab"        && <LabTab topic={topic} />}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Prev / Next */}
        <div className="mt-6 flex items-center justify-between gap-3">
          <Button
            variant="outline"
            disabled={!prev}
            onClick={() => prev && navigate(`/dashboard/curriculum/${classMeta.classSlug}/${prev.topicSlug}`)}
            className="gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="truncate max-w-[140px] sm:max-w-none">{prev ? prev.title : "Previous"}</span>
          </Button>
          <Button
            variant="outline"
            disabled={!next}
            onClick={() => next && navigate(`/dashboard/curriculum/${classMeta.classSlug}/${next.topicSlug}`)}
            className="gap-2"
          >
            <span className="truncate max-w-[140px] sm:max-w-none">{next ? next.title : "Next"}</span>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TopicPage;
