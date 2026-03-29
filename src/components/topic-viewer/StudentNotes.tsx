import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { StickyNote, Save, Loader2 } from "lucide-react";

interface Props {
  studentId: string;
  topicId: string;
}

const StudentNotes = ({ studentId, topicId }: Props) => {
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  // Load note
  useEffect(() => {
    if (!studentId || !topicId) return;
    supabase
      .from("student_notes")
      .select("content, updated_at")
      .eq("student_id", studentId)
      .eq("topic_id", topicId)
      .maybeSingle()
      .then(({ data }) => {
        if (data) {
          setContent(data.content || "");
          setLastSaved(data.updated_at);
        } else {
          setContent("");
          setLastSaved(null);
        }
      });
  }, [studentId, topicId]);

  // Auto-save with debounce
  const saveNote = useCallback(async (text: string) => {
    if (!studentId || !topicId) return;
    setSaving(true);
    const { error } = await supabase
      .from("student_notes")
      .upsert(
        { student_id: studentId, topic_id: topicId, content: text, updated_at: new Date().toISOString() },
        { onConflict: "student_id,topic_id" }
      );
    setSaving(false);
    if (!error) setLastSaved(new Date().toISOString());
  }, [studentId, topicId]);

  const handleChange = (value: string) => {
    setContent(value);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => saveNote(value), 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-8"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-sm font-display font-bold text-foreground/50 hover:text-foreground/80 transition-colors mb-3"
      >
        <StickyNote className="w-4 h-4" />
        My Notes
        {content && !isOpen && <span className="text-xs text-primary/60">({content.length} chars)</span>}
      </button>

      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          className="rounded-2xl border border-white/[0.08] overflow-hidden bg-gradient-to-b from-white/[0.02] to-transparent"
        >
          <textarea
            value={content}
            onChange={(e) => handleChange(e.target.value)}
            placeholder="Take notes while studying this topic... Your notes are auto-saved."
            rows={6}
            className="w-full bg-transparent px-5 py-4 text-sm text-foreground/80 placeholder:text-foreground/20 outline-none resize-none font-body"
          />
          <div className="flex items-center justify-between px-5 py-2 border-t border-white/[0.05] text-xs text-foreground/30 font-body">
            <div className="flex items-center gap-2">
              {saving ? (
                <><Loader2 className="w-3 h-3 animate-spin" /> Saving...</>
              ) : lastSaved ? (
                <><Save className="w-3 h-3" /> Saved {new Date(lastSaved).toLocaleTimeString()}</>
              ) : (
                <span>Not saved yet</span>
              )}
            </div>
            <span>{content.length} characters</span>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default StudentNotes;
