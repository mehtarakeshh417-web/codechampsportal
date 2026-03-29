import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { useData } from "@/contexts/DataContext";
import { supabase } from "@/integrations/supabase/client";
import { Megaphone, Plus, Trash2, AlertTriangle, Info, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface Announcement {
  id: string;
  title: string;
  message: string;
  target_class: string | null;
  priority: string;
  author_name: string;
  author_role: string;
  created_at: string;
}

const SchoolAnnouncements = () => {
  const { user } = useAuth();
  const { schools, teachers, getSchoolStudents, getSchoolTeachers, getTeacherStudents } = useData();
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [targetClass, setTargetClass] = useState("");
  const [priority, setPriority] = useState("normal");
  const [loading, setLoading] = useState(false);

  // Resolve the actual school table ID based on role
  const resolveSchoolId = (): string => {
    if (user?.role === "school") {
      const school = schools.find(s => s.user_id === user.id);
      return school?.id || "";
    }
    if (user?.role === "teacher") {
      const teacher = teachers.find(t => t.user_id === user.id);
      return teacher?.schoolId || "";
    }
    return "";
  };

  const schoolId = resolveSchoolId();

  const students = user?.role === "teacher"
    ? getTeacherStudents(user?.id || "")
    : getSchoolStudents(user?.id || "");
  const uniqueClasses = [...new Set(students.map((s) => s.class).filter(Boolean))].sort();

  const fetchAnnouncements = async () => {
    if (!schoolId) return;
    const { data } = await supabase
      .from("announcements")
      .select("*")
      .eq("school_id", schoolId)
      .order("created_at", { ascending: false })
      .limit(50);
    if (data) setAnnouncements(data as Announcement[]);
  };

  useEffect(() => { fetchAnnouncements(); }, [schoolId]);

  const pushNotifications = async (announcementTitle: string, announcementMessage: string, targetCls: string | null) => {
    if (!schoolId) return;
    // Get all students (and teachers) to notify
    const targetStudents = targetCls
      ? students.filter(s => s.class === targetCls)
      : students;

    const userIds: string[] = targetStudents
      .map(s => s.user_id)
      .filter(Boolean) as string[];

    // Also notify teachers in this school (if announcement is from school)
    if (user?.role === "school") {
      const schoolTeachers = getSchoolTeachers(user.id);
      schoolTeachers.forEach(t => {
        if (t.user_id) userIds.push(t.user_id);
      });
    }

    if (userIds.length === 0) return;

    const notifications = userIds.map(uid => ({
      user_id: uid,
      title: `📢 ${announcementTitle}`,
      message: announcementMessage || "New announcement posted",
      type: "announcement",
    }));

    // Insert in batches of 100
    for (let i = 0; i < notifications.length; i += 100) {
      await supabase.from("notifications").insert(notifications.slice(i, i + 100));
    }
  };

  const handleCreate = async () => {
    if (!title.trim()) { toast.error("Title is required"); return; }
    if (!schoolId) { toast.error("Could not resolve school. Please try again."); return; }
    setLoading(true);
    const { error } = await supabase.from("announcements").insert({
      school_id: schoolId,
      author_id: user?.id || "",
      author_role: user?.role || "school",
      author_name: user?.displayName || "",
      title: title.trim(),
      message: message.trim(),
      target_class: targetClass || null,
      priority,
    } as any);
    if (error) { toast.error("Failed to create announcement"); console.error(error); setLoading(false); return; }

    // Push notifications to all relevant users
    await pushNotifications(title.trim(), message.trim(), targetClass || null);

    toast.success("Announcement published & notifications sent! 📢");
    setTitle(""); setMessage(""); setTargetClass(""); setPriority("normal"); setShowForm(false);
    setLoading(false);
    fetchAnnouncements();
  };

  const handleDelete = async (id: string) => {
    await supabase.from("announcements").delete().eq("id", id);
    toast.success("Announcement deleted");
    fetchAnnouncements();
  };

  const priorityIcon = (p: string) => {
    if (p === "urgent") return <AlertTriangle className="w-4 h-4 text-red-400" />;
    if (p === "important") return <Bell className="w-4 h-4 text-[hsl(var(--neon-orange))]" />;
    return <Info className="w-4 h-4 text-[hsl(var(--neon-blue))]" />;
  };

  return (
    <div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-3xl font-bold">
            <span className="text-gradient-brand">Announcements</span> 📢
          </h1>
          <p className="text-white/60 font-body">Broadcast messages to students and teachers</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} className="bg-gradient-to-r from-primary to-secondary text-white rounded-xl">
          <Plus className="w-4 h-4 mr-2" /> New Announcement
        </Button>
      </motion.div>

      {showForm && (
        <motion.div initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="glass-card p-6 mb-6 neon-glow-blue">
          <h3 className="font-display text-lg font-bold text-white mb-4">Create Announcement</h3>
          <div className="space-y-4">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Announcement title..."
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 outline-none focus:border-primary/50 font-body"
            />
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your announcement message..."
              rows={4}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 outline-none focus:border-primary/50 font-body resize-none"
            />
            <div className="flex gap-4">
              <select
                value={targetClass}
                onChange={(e) => setTargetClass(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white font-body outline-none"
              >
                <option value="">All Classes</option>
                {uniqueClasses.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white font-body outline-none"
              >
                <option value="normal">Normal</option>
                <option value="important">Important</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
            <div className="flex gap-3">
              <Button onClick={handleCreate} disabled={loading} className="bg-gradient-to-r from-primary to-secondary text-white rounded-xl">
                {loading ? "Publishing..." : "Publish & Notify"}
              </Button>
              <Button variant="ghost" onClick={() => setShowForm(false)} className="text-white/50">Cancel</Button>
            </div>
          </div>
        </motion.div>
      )}

      <div className="space-y-4">
        {announcements.length === 0 ? (
          <div className="glass-card p-12 text-center">
            <Megaphone className="w-12 h-12 text-white/20 mx-auto mb-4" />
            <p className="text-white/50 font-body">No announcements yet. Create one to get started!</p>
          </div>
        ) : (
          announcements.map((a, i) => (
            <motion.div
              key={a.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: i * 0.05 }}
              className={`glass-card p-5 ${a.priority === "urgent" ? "border-red-400/30" : a.priority === "important" ? "border-[hsl(var(--neon-orange))]/20" : ""}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  {priorityIcon(a.priority)}
                  <div>
                    <h3 className="font-display text-base font-bold text-white">{a.title}</h3>
                    {a.message && <p className="text-white/70 font-body text-sm mt-1">{a.message}</p>}
                    <div className="flex items-center gap-3 mt-2 text-xs text-white/40 font-body">
                      <span>{a.author_name} ({a.author_role})</span>
                      <span>•</span>
                      <span>{new Date(a.created_at).toLocaleDateString()}</span>
                      {a.target_class && <><span>•</span><span className="text-[hsl(var(--neon-blue))]">{a.target_class}</span></>}
                    </div>
                  </div>
                </div>
                <button onClick={() => handleDelete(a.id)} className="text-white/20 hover:text-red-400 transition-colors p-1">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default SchoolAnnouncements;
