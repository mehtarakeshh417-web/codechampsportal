import { ReactNode, useState } from "react";
import { useAuth, UserRole } from "@/contexts/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import NotificationBell from "@/components/NotificationBell";
import dashboardBg from "@/assets/dashboard-bg.jpg";
import {
  LayoutDashboard, School, Users, BookOpen, Trophy, Settings, LogOut, GraduationCap,
  BarChart3, Code, FileText, Gamepad2, Award, UserCircle, Menu, X, CalendarDays, MessageSquare, Keyboard, Megaphone, Layers
} from "lucide-react";
import AiTutorChat from "@/components/AiTutorChat";

interface NavItem {
  icon: React.ElementType;
  label: string;
  path: string;
}

const navConfig: Record<UserRole, NavItem[]> = {
  admin: [
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
    { icon: School, label: "Schools", path: "/dashboard/schools" },
    { icon: BarChart3, label: "Analytics", path: "/dashboard/analytics" },
    { icon: Trophy, label: "Leaderboard", path: "/dashboard/leaderboard" },
    { icon: Settings, label: "Change Password", path: "/dashboard/settings" },
  ],
  school: [
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
    { icon: Users, label: "Teachers", path: "/dashboard/teachers" },
    { icon: GraduationCap, label: "Students", path: "/dashboard/students" },
    { icon: BookOpen, label: "Classes", path: "/dashboard/classes" },
    { icon: CalendarDays, label: "Attendance", path: "/dashboard/attendance" },
    { icon: BarChart3, label: "Analytics", path: "/dashboard/analytics" },
    { icon: Megaphone, label: "Announcements", path: "/dashboard/announcements" },
    { icon: Settings, label: "Settings", path: "/dashboard/settings" },
  ],
  teacher: [
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
    { icon: BookOpen, label: "My Classes", path: "/dashboard/classes" },
    { icon: FileText, label: "Assignments", path: "/dashboard/assignments" },
    { icon: Code, label: "Projects", path: "/dashboard/projects" },
    { icon: GraduationCap, label: "Curriculum", path: "/dashboard/curriculum" },
    { icon: Gamepad2, label: "Coding Lab", path: "/dashboard/coding-lab" },
    { icon: CalendarDays, label: "Attendance", path: "/dashboard/attendance" },
    { icon: MessageSquare, label: "Discussions", path: "/dashboard/discussions" },
    { icon: Users, label: "Student Progress", path: "/dashboard/student-progress" },
    { icon: BarChart3, label: "Analytics", path: "/dashboard/analytics" },
    { icon: Megaphone, label: "Announcements", path: "/dashboard/announcements" },
    { icon: Settings, label: "Change Password", path: "/dashboard/settings" },
  ],
  student: [
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
    { icon: BookOpen, label: "My Curriculum", path: "/dashboard/curriculum" },
    { icon: BarChart3, label: "Progress", path: "/dashboard/progress" },
    { icon: FileText, label: "Assignments", path: "/dashboard/assignments" },
    { icon: Code, label: "Projects", path: "/dashboard/projects" },
    { icon: UserCircle, label: "Portfolio", path: "/dashboard/portfolio" },
    { icon: Gamepad2, label: "Coding Lab", path: "/dashboard/coding-lab" },
    { icon: MessageSquare, label: "Discussions", path: "/dashboard/discussions" },
    { icon: Trophy, label: "Achievements", path: "/dashboard/achievements" },
    { icon: Award, label: "Leaderboard", path: "/dashboard/leaderboard" },
    { icon: GraduationCap, label: "Certificates", path: "/dashboard/certificates" },
    { icon: Layers, label: "Flashcards", path: "/dashboard/flashcards" },
    { icon: Keyboard, label: "Typing Practice", path: "/dashboard/typing" },
    { icon: Settings, label: "Change Password", path: "/dashboard/settings" },
  ],
};

const roleGradientClass: Record<UserRole, string> = {
  admin: "gradient-admin",
  school: "gradient-school",
  teacher: "gradient-teacher",
  student: "gradient-student",
};

const roleLabelColors: Record<UserRole, string> = {
  admin: "text-neon-blue",
  school: "text-neon-green",
  teacher: "text-neon-orange",
  student: "text-neon-green",
};

interface Props { children: ReactNode }

const DashboardLayout = ({ children }: Props) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  if (!user) return null;

  const navItems = navConfig[user.role];

  const handleNav = (path: string) => {
    navigate(path);
    setMobileOpen(false);
  };

  const SidebarContent = () => (
    <>
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <img src="/assets/logo.jpg" alt="CodeChamps logo" className="w-10 h-10 rounded-xl object-contain" />
          <span className="font-display text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">CodeChamps</span>
        </div>
        <div className="flex items-center gap-2 mt-4">
          <UserCircle className="w-8 h-8 text-white/40" />
          <div>
            <div className="text-sm font-bold font-body bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">{user.displayName}</div>
            <div className={`text-xs font-display uppercase tracking-wider ${roleLabelColors[user.role]}`}>
              {user.role === "admin" ? "Master Admin" : user.role}
            </div>
          </div>
        </div>
        {user.schoolName && (
          <div className="mt-2 text-xs text-white/80 font-body font-semibold">{user.schoolName}</div>
        )}
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => handleNav(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-body transition-all duration-200 relative group ${
                isActive
                  ? "bg-primary/15 text-primary font-semibold"
                  : "text-white/50 hover:text-white/80 hover:bg-white/5"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-indicator"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full bg-gradient-to-b from-primary to-secondary"
                  transition={{ type: "spring", damping: 25, stiffness: 300 }}
                />
              )}
              <item.icon className={`w-5 h-5 transition-transform duration-200 ${isActive ? "" : "group-hover:scale-110"}`} />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10">
        <Button variant="ghost" size="sm" className="w-full justify-start text-white/40 hover:text-destructive" onClick={() => { logout(); navigate("/"); }}>
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </Button>
      </div>
    </>
  );

  return (
    <div className={`min-h-screen ${roleGradientClass[user.role]} text-white flex`}>
      {/* Background image */}
      <div
        className="fixed inset-0 opacity-10 pointer-events-none z-0"
        style={{ backgroundImage: `url(${dashboardBg})`, backgroundSize: "cover", backgroundPosition: "center" }}
      />

      {/* Mobile top bar */}
      <div className="fixed top-0 left-0 right-0 z-30 lg:hidden sidebar-dark border-b border-white/10 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src="/assets/logo.jpg" alt="CodeChamps" className="w-8 h-8 rounded-lg object-contain" />
          <span className="font-display text-lg font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">CodeChamps</span>
        </div>
        <div className="flex items-center gap-2">
          <NotificationBell />
          <button onClick={() => setMobileOpen(!mobileOpen)} className="text-white/70 hover:text-white p-2">
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-30 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed left-0 top-0 bottom-0 w-[280px] sidebar-dark z-40 flex flex-col lg:hidden"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <motion.aside
        initial={{ x: -260 }}
        animate={{ x: 0 }}
        className="fixed left-0 top-0 bottom-0 w-64 sidebar-dark z-20 hidden lg:flex flex-col"
      >
        <SidebarContent />
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 relative z-10">
        {/* Top bar with notification bell (desktop) */}
        <div className="hidden lg:flex items-center justify-end px-8 pt-4 pb-0">
          <NotificationBell />
        </div>
        <div className="p-6 md:p-8 pt-20 lg:pt-4">
          {children}
        </div>
      </main>

      {/* AI Tutor Chat - Student only, hidden on assignments/projects/quizzes */}
      {user.role === "student" && 
        !location.pathname.includes("/assignments") && 
        !location.pathname.includes("/projects") && 
        !location.pathname.includes("/curriculum/topic/") && 
        <AiTutorChat />
      }
    </div>
  );
};

export default DashboardLayout;
