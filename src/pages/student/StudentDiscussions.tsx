import { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { useData } from "@/contexts/DataContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { MessageSquare, Pin, CheckCircle2, Send, ChevronDown, ChevronUp, UserCircle, Plus, X } from "lucide-react";

interface Discussion {
  id: string;
  class_name: string;
  title: string;
  message: string;
  author_name: string;
  author_role: string;
  is_pinned: boolean;
  is_resolved: boolean;
  created_at: string;
  replies?: Reply[];
}

interface Reply {
  id: string;
  message: string;
  author_name: string;
  author_role: string;
  created_at: string;
}

const StudentDiscussions = () => {
  const { user } = useAuth();
  const { students } = useData();
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [sending, setSending] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newMessage, setNewMessage] = useState("");

  const student = useMemo(() => students.find((s) => s.user_id === user?.id), [students, user?.id]);
  const className = student ? `${student.class}-${student.section}` : "";

  const loadDiscussions = useCallback(async () => {
    if (!className) return;
    const { data } = await supabase
      .from("discussions" as any)
      .select("*")
      .eq("class_name", className)
      .order("is_pinned", { ascending: false })
      .order("created_at", { ascending: false });
    setDiscussions((data as any[]) || []);
  }, [className]);

  useEffect(() => { loadDiscussions(); }, [loadDiscussions]);

  const loadReplies = useCallback(async (discussionId: string) => {
    const { data } = await supabase.from("discussion_replies" as any).select("*").eq("discussion_id", discussionId).order("created_at", { ascending: true });
    setDiscussions((prev) => prev.map((d) => d.id === discussionId ? { ...d, replies: (data as any[]) || [] } : d));
  }, []);

  const handleExpand = (id: string) => {
    if (expandedId === id) { setExpandedId(null); } else { setExpandedId(id); loadReplies(id); }
    setReplyText("");
  };

  const handleReply = async (discussionId: string) => {
    if (!replyText.trim() || !user) return;
    setSending(true);
    await supabase.from("discussion_replies" as any).insert({
      discussion_id: discussionId,
      message: replyText.trim(),
      author_id: user.id,
      author_name: user.displayName,
      author_role: "student",
    });
    setReplyText("");
    setSending(false);
    loadReplies(discussionId);
    toast.success("Reply posted!");
  };

  const handleCreateDiscussion = async () => {
    if (!newTitle.trim() || !newMessage.trim() || !student || !user) return;
    setSending(true);
    await supabase.from("discussions" as any).insert({
      school_id: student.schoolId,
      class_name: className,
      title: newTitle.trim(),
      message: newMessage.trim(),
      author_id: user.id,
      author_name: user.displayName,
      author_role: "student",
    });
    setNewTitle("");
    setNewMessage("");
    setShowNew(false);
    setSending(false);
    loadDiscussions();
    toast.success("Discussion posted!");
  };

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">Discussion Forum</h1>
          <p className="text-foreground/40 font-body text-sm mt-1">Ask doubts and discuss with classmates & teachers</p>
        </div>
        <Button onClick={() => setShowNew(!showNew)} className="bg-gradient-to-r from-primary to-secondary text-white gap-2 rounded-xl">
          {showNew ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {showNew ? "Cancel" : "Ask a Doubt"}
        </Button>
      </div>

      {/* New discussion form */}
      <AnimatePresence>
        {showNew && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <div className="rounded-xl border border-primary/[0.12] bg-white/[0.02] p-5 space-y-3">
              <Input
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Title of your question..."
                className="bg-white/[0.03] border-white/[0.08] text-foreground"
              />
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Describe your doubt in detail..."
                rows={3}
                className="w-full rounded-md border border-white/[0.08] bg-white/[0.03] text-foreground px-3 py-2 text-sm font-body placeholder:text-foreground/30 focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              <div className="flex justify-end">
                <Button onClick={handleCreateDiscussion} disabled={sending || !newTitle.trim() || !newMessage.trim()} className="bg-primary text-white gap-2 rounded-xl">
                  <Send className="w-4 h-4" /> Post
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {discussions.length === 0 ? (
        <div className="text-center py-16 text-foreground/30">
          <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p className="font-body">No discussions yet. Be the first to ask!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {discussions.map((d) => (
            <motion.div key={d.id} layout className="rounded-xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
              <button onClick={() => handleExpand(d.id)} className="w-full text-left p-4 flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    {d.is_pinned && <Pin className="w-3.5 h-3.5 text-neon-orange" />}
                    {d.is_resolved && <span className="text-[10px] bg-neon-green/[0.1] text-neon-green px-2 py-0.5 rounded-full font-body">Resolved</span>}
                    <span className="text-xs text-foreground/25">{d.author_role === "teacher" ? "🧑‍🏫" : "🎓"} {d.author_name}</span>
                    <span className="text-[10px] text-foreground/20">{new Date(d.created_at).toLocaleDateString()}</span>
                  </div>
                  <h3 className="font-body font-bold text-foreground text-sm">{d.title}</h3>
                  <p className="text-xs text-foreground/40 mt-0.5 line-clamp-1">{d.message}</p>
                </div>
                {expandedId === d.id ? <ChevronUp className="w-4 h-4 text-foreground/30 shrink-0" /> : <ChevronDown className="w-4 h-4 text-foreground/30 shrink-0" />}
              </button>

              <AnimatePresence>
                {expandedId === d.id && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                    <div className="px-4 pb-4 space-y-3 border-t border-white/[0.04] pt-3">
                      <p className="text-sm text-foreground/60 font-body">{d.message}</p>

                      {d.replies && d.replies.length > 0 && (
                        <div className="space-y-2 ml-4 border-l-2 border-white/[0.06] pl-4">
                          {d.replies.map((r) => (
                            <div key={r.id} className="text-sm">
                              <div className="flex items-center gap-2 mb-0.5">
                                <UserCircle className="w-3.5 h-3.5 text-foreground/25" />
                                <span className="font-body font-bold text-foreground/60 text-xs">{r.author_name}</span>
                                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${r.author_role === "teacher" ? "bg-neon-orange/[0.1] text-neon-orange" : "bg-primary/[0.1] text-primary"}`}>
                                  {r.author_role}
                                </span>
                              </div>
                              <p className="text-foreground/50 font-body">{r.message}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="flex gap-2">
                        <Input
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          placeholder="Write a reply..."
                          className="bg-white/[0.03] border-white/[0.08] text-foreground text-sm"
                          onKeyDown={(e) => e.key === "Enter" && handleReply(d.id)}
                        />
                        <Button onClick={() => handleReply(d.id)} disabled={sending || !replyText.trim()} size="sm" className="bg-primary text-white shrink-0">
                          <Send className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default StudentDiscussions;
