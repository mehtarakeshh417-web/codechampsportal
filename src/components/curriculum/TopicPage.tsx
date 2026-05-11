// Reusable topic page — now a multi-page chapter experience.
// Architecture (unchanged): same route, same completion tracking, same
// sibling-topic sidebar. The body is delegated to <ChapterShell />.

import { useEffect, useMemo, useState, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import { ChevronLeft, ChevronRight, CheckCircle2, Award } from "lucide-react";
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
import ChapterShell from "./chapter/ChapterShell";

const TopicPage = () => {
  const { classSlug = "", topicSlug = "" } = useParams();
  const { user } = useAuth();
  const { students, refreshData } = useData();

  const classMeta = useMemo(() => getClassBySlug(classSlug), [classSlug]);
  const topic = useMemo(() => getTopicBySlug(classSlug, topicSlug), [classSlug, topicSlug]);
  const siblings = useMemo(
    () => (classMeta ? getTopicsForClass(classMeta.classNumber) : []),
    [classMeta],
  );
  const idx = useMemo(
    () => (topic ? siblings.findIndex((t) => t.id === topic.id) : -1),
    [topic, siblings],
  );
  const prev = idx > 0 ? siblings[idx - 1] : undefined;
  const next = idx >= 0 && idx < siblings.length - 1 ? siblings[idx + 1] : undefined;

  const [isCompleted, setIsCompleted] = useState(false);

  const student = useMemo(
    () => students.find((s) => s.user_id === user?.id),
    [students, user?.id],
  );

  // Load completion state
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
      toast.success("Chapter completed! +50 XP 🎉");
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
      {/* Sibling-topic sidebar (jump between chapters of the class) */}
      <aside className="hidden xl:block w-60 shrink-0">
        <div className="sticky top-4 glass-card p-3 max-h-[calc(100vh-2rem)] overflow-y-auto">
          <Link
            to={`/dashboard/curriculum/${classMeta.classSlug}`}
            className="flex items-center gap-2 text-xs text-foreground/50 hover:text-foreground px-2 py-1.5"
          >
            <ChevronLeft className="w-3.5 h-3.5" /> {classMeta.className}
          </Link>
          <div className="px-2 py-1 text-[10px] uppercase tracking-wider text-foreground/40 font-semibold mt-1">
            Chapters
          </div>
          <div className="space-y-1">
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
                      : "text-foreground/60 hover:bg-white/5 hover:text-foreground",
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
          <Link to={`/dashboard/curriculum/${classMeta.classSlug}`} className="hover:text-foreground">
            {classMeta.className}
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-foreground/70 truncate">{topic.title}</span>
          {user?.role === "student" && (
            <span className="ml-auto">
              <Button
                onClick={toggleComplete}
                size="sm"
                variant={isCompleted ? "outline" : "ghost"}
                className={cn(
                  "h-7 gap-1.5 text-[11px]",
                  isCompleted && "border-neon-green/40 text-neon-green",
                )}
              >
                {isCompleted ? <CheckCircle2 className="w-3 h-3" /> : <Award className="w-3 h-3" />}
                {isCompleted ? "Completed" : "Mark Complete"}
              </Button>
            </span>
          )}
        </nav>

        <ChapterShell
          topic={topic}
          classMeta={classMeta}
          prev={prev}
          next={next}
          isCompleted={isCompleted}
          onMarkComplete={toggleComplete}
          canComplete={user?.role === "student"}
        />
      </div>
    </div>
  );
};

export default TopicPage;
