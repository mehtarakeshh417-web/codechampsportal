import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { useData } from "@/contexts/DataContext";
import { supabase } from "@/integrations/supabase/client";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarDays, CheckCircle2, XCircle, Clock, Users, TrendingUp } from "lucide-react";

const SchoolAttendance = () => {
  const { user } = useAuth();
  const { students, teachers, schools } = useData();
  const [selectedClass, setSelectedClass] = useState("all");
  const [dateRange, setDateRange] = useState("today");
  const [records, setRecords] = useState<any[]>([]);

  const school = useMemo(() => schools.find((s) => s.user_id === user?.id), [schools, user?.id]);

  const allClasses = useMemo(() => {
    const classSet = new Set<string>();
    students.forEach((s) => { if (s.class && s.section) classSet.add(`${s.class}-${s.section}`); });
    return Array.from(classSet).sort();
  }, [students]);

  useEffect(() => {
    if (!school) return;
    const now = new Date();
    let startDate: string;

    if (dateRange === "today") {
      startDate = now.toISOString().split("T")[0];
    } else if (dateRange === "week") {
      const weekAgo = new Date(now);
      weekAgo.setDate(weekAgo.getDate() - 7);
      startDate = weekAgo.toISOString().split("T")[0];
    } else {
      const monthAgo = new Date(now);
      monthAgo.setDate(monthAgo.getDate() - 30);
      startDate = monthAgo.toISOString().split("T")[0];
    }

    supabase
      .from("attendance" as any)
      .select("*")
      .eq("school_id", school.id)
      .gte("date", startDate)
      .order("date", { ascending: false })
      .then(({ data }) => setRecords((data as any[]) || []));
  }, [school, dateRange]);

  // Stats
  const filteredRecords = useMemo(() => {
    if (selectedClass === "all") return records;
    const classStudentIds = students.filter((s) => `${s.class}-${s.section}` === selectedClass).map((s) => s.id);
    return records.filter((r: any) => classStudentIds.includes(r.student_id));
  }, [records, selectedClass, students]);

  const totalEntries = filteredRecords.length;
  const presentCount = filteredRecords.filter((r: any) => r.status === "present").length;
  const absentCount = filteredRecords.filter((r: any) => r.status === "absent").length;
  const lateCount = filteredRecords.filter((r: any) => r.status === "late").length;
  const attendanceRate = totalEntries > 0 ? Math.round((presentCount / totalEntries) * 100) : 0;

  // Per-date summary
  const dateSummary = useMemo(() => {
    const map: Record<string, { present: number; absent: number; late: number; total: number }> = {};
    filteredRecords.forEach((r: any) => {
      if (!map[r.date]) map[r.date] = { present: 0, absent: 0, late: 0, total: 0 };
      map[r.date][r.status as "present" | "absent" | "late"]++;
      map[r.date].total++;
    });
    return Object.entries(map).sort(([a], [b]) => b.localeCompare(a));
  }, [filteredRecords]);

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div>
        <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">Attendance Reports</h1>
        <p className="text-foreground/40 font-body text-sm mt-1">View attendance data across your school</p>
      </div>

      <div className="flex flex-wrap gap-4">
        <Select value={selectedClass} onValueChange={setSelectedClass}>
          <SelectTrigger className="w-[180px] bg-white/[0.03] border-white/[0.08] text-foreground">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Classes</SelectItem>
            {allClasses.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={dateRange} onValueChange={setDateRange}>
          <SelectTrigger className="w-[160px] bg-white/[0.03] border-white/[0.08] text-foreground">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="week">Last 7 Days</SelectItem>
            <SelectItem value="month">Last 30 Days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 text-center">
          <TrendingUp className="w-6 h-6 text-primary mx-auto mb-2" />
          <div className="text-2xl font-display font-bold text-primary">{attendanceRate}%</div>
          <p className="text-xs text-foreground/40 font-body">Attendance Rate</p>
        </div>
        <div className="rounded-xl border border-neon-green/15 bg-neon-green/[0.04] p-4 text-center">
          <CheckCircle2 className="w-6 h-6 text-neon-green mx-auto mb-2" />
          <div className="text-2xl font-display font-bold text-neon-green">{presentCount}</div>
          <p className="text-xs text-foreground/40 font-body">Present</p>
        </div>
        <div className="rounded-xl border border-destructive/15 bg-destructive/[0.04] p-4 text-center">
          <XCircle className="w-6 h-6 text-destructive mx-auto mb-2" />
          <div className="text-2xl font-display font-bold text-destructive">{absentCount}</div>
          <p className="text-xs text-foreground/40 font-body">Absent</p>
        </div>
        <div className="rounded-xl border border-neon-orange/15 bg-neon-orange/[0.04] p-4 text-center">
          <Clock className="w-6 h-6 text-neon-orange mx-auto mb-2" />
          <div className="text-2xl font-display font-bold text-neon-orange">{lateCount}</div>
          <p className="text-xs text-foreground/40 font-body">Late</p>
        </div>
      </div>

      {/* Date-wise breakdown */}
      {dateSummary.length === 0 ? (
        <div className="text-center py-16 text-foreground/30">
          <CalendarDays className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p className="font-body">No attendance data for this period</p>
        </div>
      ) : (
        <div className="space-y-2">
          <h2 className="font-display text-lg font-bold text-foreground/70">Daily Breakdown</h2>
          {dateSummary.map(([date, stats]) => {
            const rate = Math.round((stats.present / stats.total) * 100);
            return (
              <div key={date} className="flex items-center justify-between p-4 rounded-xl border border-white/[0.06] bg-white/[0.02]">
                <div className="flex items-center gap-3">
                  <CalendarDays className="w-5 h-5 text-foreground/30" />
                  <span className="font-body text-foreground font-medium text-sm">
                    {new Date(date + "T00:00:00").toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" })}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs text-neon-green font-body">{stats.present}P</span>
                  <span className="text-xs text-destructive font-body">{stats.absent}A</span>
                  <span className="text-xs text-neon-orange font-body">{stats.late}L</span>
                  <div className="w-16 h-2 bg-white/[0.05] rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-neon-green to-primary rounded-full" style={{ width: `${rate}%` }} />
                  </div>
                  <span className="text-xs font-bold text-foreground/50 w-10 text-right">{rate}%</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
};

export default SchoolAttendance;
