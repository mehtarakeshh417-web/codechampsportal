import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, X, CheckCircle2, FileText, Star, MessageCircle, Megaphone } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: string;
  reference_id: string | null;
  is_read: boolean;
  created_at: string;
}

const typeIcons: Record<string, React.ElementType> = {
  project_assigned: FileText,
  project_submitted: CheckCircle2,
  project_graded: Star,
  feedback_received: MessageCircle,
  announcement: Megaphone,
  assignment: FileText,
  info: Bell,
};

const typeColors: Record<string, string> = {
  project_assigned: "text-[hsl(var(--neon-blue))]",
  project_submitted: "text-[hsl(var(--neon-green))]",
  project_graded: "text-[hsl(var(--neon-orange))]",
  feedback_received: "text-[hsl(var(--secondary))]",
  announcement: "text-[hsl(var(--neon-orange))]",
  assignment: "text-[hsl(var(--neon-blue))]",
  info: "text-white/60",
};

const getNotificationRoute = (type: string, role: string): string | null => {
  const prefix = role === "teacher" ? "/teacher" : role === "school" ? "/school" : "/student";
  switch (type) {
    case "project_assigned":
    case "project_submitted":
    case "project_graded":
    case "feedback_received":
      return `${prefix}/projects`;
    case "assignment":
      return `${prefix}/assignments`;
    case "announcement":
      return role === "school" ? "/school/announcements" : `${prefix}/dashboard`;
    default:
      return null;
  }
};

const NotificationBell = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [open, setOpen] = useState(false);

  const fetchNotifications = useCallback(async () => {
    if (!user?.id) return;
    const { data } = await supabase
      .from("notifications")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(20);
    if (data) setNotifications(data as any);
  }, [user?.id]);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  // Realtime subscription
  useEffect(() => {
    if (!user?.id) return;
    const channel = supabase
      .channel("notifications-" + user.id)
      .on("postgres_changes", {
        event: "INSERT",
        schema: "public",
        table: "notifications",
        filter: `user_id=eq.${user.id}`,
      }, (payload) => {
        setNotifications((prev) => [payload.new as Notification, ...prev]);
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [user?.id]);

  const unreadCount = notifications.filter((n) => !n.is_read).length;

  const markAllRead = async () => {
    if (!user?.id) return;
    await supabase
      .from("notifications")
      .update({ is_read: true })
      .eq("user_id", user.id)
      .eq("is_read", false);
    setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
  };

  const handleNotificationClick = async (n: Notification) => {
    // Mark as read
    if (!n.is_read) {
      await supabase.from("notifications").update({ is_read: true }).eq("id", n.id);
      setNotifications((prev) => prev.map((item) => item.id === n.id ? { ...item, is_read: true } : item));
    }
    // Navigate to relevant page
    const route = getNotificationRoute(n.type, user?.role || "student");
    if (route) {
      setOpen(false);
      navigate(route);
    }
  };

  const timeAgo = (date: string) => {
    const diff = Date.now() - new Date(date).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "Just now";
    if (mins < 60) return `${mins}m ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 rounded-xl hover:bg-white/10 transition-colors"
      >
        <Bell className="w-5 h-5 text-white/70" />
        {unreadCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-[hsl(var(--destructive))] rounded-full flex items-center justify-center text-[10px] font-bold text-white"
          >
            {unreadCount > 9 ? "9+" : unreadCount}
          </motion.span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="absolute right-0 top-12 w-80 max-h-96 bg-[hsl(220,25%,12%)] border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden"
            >
              <div className="flex items-center justify-between p-4 border-b border-white/10">
                <h3 className="font-display text-sm font-bold text-white">Notifications</h3>
                <div className="flex items-center gap-2">
                  {unreadCount > 0 && (
                    <button onClick={markAllRead} className="text-[10px] text-[hsl(var(--neon-blue))] hover:underline font-body">
                      Mark all read
                    </button>
                  )}
                  <button onClick={() => setOpen(false)} className="text-white/40 hover:text-white/70">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="overflow-y-auto max-h-72">
                {notifications.length === 0 ? (
                  <div className="p-8 text-center">
                    <Bell className="w-8 h-8 text-white/20 mx-auto mb-2" />
                    <p className="text-xs text-white/40 font-body">No notifications yet</p>
                  </div>
                ) : (
                  notifications.map((n) => {
                    const Icon = typeIcons[n.type] || Bell;
                    const color = typeColors[n.type] || "text-white/60";
                    const route = getNotificationRoute(n.type, user?.role || "student");
                    return (
                      <button
                        key={n.id}
                        onClick={() => handleNotificationClick(n)}
                        className={`w-full text-left p-3 border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer ${!n.is_read ? "bg-white/[0.03]" : ""}`}
                      >
                        <div className="flex gap-3">
                          <div className={`mt-0.5 ${color}`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <p className={`text-xs font-display font-bold truncate ${!n.is_read ? "text-white" : "text-white/60"}`}>
                                {n.title}
                              </p>
                              {!n.is_read && <span className="w-2 h-2 rounded-full bg-[hsl(var(--neon-blue))] shrink-0" />}
                            </div>
                            <p className="text-[11px] text-white/50 font-body mt-0.5 line-clamp-2">{n.message}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <p className="text-[10px] text-white/30 font-body">{timeAgo(n.created_at)}</p>
                              {route && <span className="text-[10px] text-[hsl(var(--neon-blue))]/60 font-body">→ View</span>}
                            </div>
                          </div>
                        </div>
                      </button>
                    );
                  })
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationBell;
