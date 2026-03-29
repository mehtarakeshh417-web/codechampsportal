import { useState, useEffect, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { useData } from "@/contexts/DataContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { CalendarDays, CheckCircle2, XCircle, Clock, Users, Save } from "lucide-react";

type AttendanceStatus = "present" | "absent" | "late";

interface AttendanceRecord {
  studentId: string;
  status: AttendanceStatus;
}

const TeacherAttendance = () => {
  const { user } = useAuth();
  const { students, teachers } = useData();
  const [selectedClass, setSelectedClass] = useState("");
  const [date, setDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [records, setRecords] = useState<Record<string, AttendanceStatus>>({});
  const [saving, setSaving] = useState(false);
  const [existingData, setExistingData] = useState(false);

  const teacher = useMemo(() => teachers.find((t) => t.user_id === user?.id), [teachers, user?.id]);
  const classes = useMemo(() => teacher?.classes || [], [teacher]);

  const classStudents = useMemo(() => {
    if (!selectedClass || !teacher) return [];
    return students
      .filter((s) => s.teacherId === teacher.id && `${s.class}-${s.section}` === selectedClass)
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [students, selectedClass, teacher]);

  // Load existing attendance for selected date/class
  useEffect(() => {
    if (!selectedClass || !teacher || !date) return;
    const ids = classStudents.map((s) => s.id);
    if (ids.length === 0) return;

    supabase
      .from("attendance" as any)
      .select("student_id, status")
      .eq("date", date)
      .eq("teacher_id", teacher.id)
      .in("student_id", ids)
      .then(({ data }) => {
        if (data && data.length > 0) {
          const map: Record<string, AttendanceStatus> = {};
          (data as any[]).forEach((r: any) => { map[r.student_id] = r.status as AttendanceStatus; });
          setRecords(map);
          setExistingData(true);
        } else {
          // Default all to present
          const map: Record<string, AttendanceStatus> = {};
          ids.forEach((id) => { map[id] = "present"; });
          setRecords(map);
          setExistingData(false);
        }
      });
  }, [selectedClass, date, teacher, classStudents]);

  const toggleStatus = (studentId: string) => {
    setRecords((prev) => {
      const current = prev[studentId] || "present";
      const next: AttendanceStatus = current === "present" ? "absent" : current === "absent" ? "late" : "present";
      return { ...prev, [studentId]: next };
    });
  };

  const markAll = (status: AttendanceStatus) => {
    const map: Record<string, AttendanceStatus> = {};
    classStudents.forEach((s) => { map[s.id] = status; });
    setRecords(map);
  };

  const handleSave = useCallback(async () => {
    if (!teacher) return;
    setSaving(true);
    try {
      const school = students.find((s) => s.teacherId === teacher.id);
      if (!school) throw new Error("No school found");

      // Delete existing records for this date
      if (existingData) {
        await supabase
          .from("attendance" as any)
          .delete()
          .eq("date", date)
          .eq("teacher_id", teacher.id);
      }

      const rows = Object.entries(records).map(([studentId, status]) => ({
        student_id: studentId,
        school_id: school.schoolId,
        teacher_id: teacher.id,
        date,
        status,
      }));

      const { error } = await supabase.from("attendance" as any).insert(rows);
      if (error) throw error;
      setExistingData(true);
      toast.success("Attendance saved successfully!");
    } catch (err: any) {
      toast.error("Failed to save: " + (err.message || "Unknown error"));
    }
    setSaving(false);
  }, [teacher, records, date, existingData, students]);

  const presentCount = Object.values(records).filter((s) => s === "present").length;
  const absentCount = Object.values(records).filter((s) => s === "absent").length;
  const lateCount = Object.values(records).filter((s) => s === "late").length;

  const statusConfig = {
    present: { icon: CheckCircle2, color: "text-neon-green", bg: "bg-neon-green/[0.08] border-neon-green/20", label: "Present" },
    absent: { icon: XCircle, color: "text-destructive", bg: "bg-destructive/[0.08] border-destructive/20", label: "Absent" },
    late: { icon: Clock, color: "text-neon-orange", bg: "bg-neon-orange/[0.08] border-neon-orange/20", label: "Late" },
  };

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">Attendance</h1>
          <p className="text-foreground/40 font-body text-sm mt-1">Mark daily attendance for your classes</p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-4 items-end">
        <div className="space-y-1.5">
          <label className="text-xs text-foreground/40 font-body">Class</label>
          <Select value={selectedClass} onValueChange={setSelectedClass}>
            <SelectTrigger className="w-[180px] bg-white/[0.03] border-white/[0.08] text-foreground">
              <SelectValue placeholder="Select Class" />
            </SelectTrigger>
            <SelectContent>
              {classes.map((c) => (
                <SelectItem key={c} value={c}>{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <label className="text-xs text-foreground/40 font-body">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="h-10 px-3 rounded-md border border-white/[0.08] bg-white/[0.03] text-foreground text-sm"
          />
        </div>
        {classStudents.length > 0 && (
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => markAll("present")} className="text-neon-green border-neon-green/20 hover:bg-neon-green/10 text-xs">All Present</Button>
            <Button variant="outline" size="sm" onClick={() => markAll("absent")} className="text-destructive border-destructive/20 hover:bg-destructive/10 text-xs">All Absent</Button>
          </div>
        )}
      </div>

      {/* Stats */}
      {classStudents.length > 0 && (
        <div className="flex gap-4 flex-wrap">
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-neon-green/[0.06] border border-neon-green/15">
            <CheckCircle2 className="w-4 h-4 text-neon-green" />
            <span className="text-sm font-body text-neon-green">{presentCount} Present</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-destructive/[0.06] border border-destructive/15">
            <XCircle className="w-4 h-4 text-destructive" />
            <span className="text-sm font-body text-destructive">{absentCount} Absent</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-neon-orange/[0.06] border border-neon-orange/15">
            <Clock className="w-4 h-4 text-neon-orange" />
            <span className="text-sm font-body text-neon-orange">{lateCount} Late</span>
          </div>
        </div>
      )}

      {/* Student List */}
      {!selectedClass ? (
        <div className="text-center py-16 text-foreground/30">
          <Users className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p className="font-body">Select a class to mark attendance</p>
        </div>
      ) : classStudents.length === 0 ? (
        <div className="text-center py-16 text-foreground/30">
          <p className="font-body">No students in this class</p>
        </div>
      ) : (
        <>
          <div className="space-y-2">
            {classStudents.map((s, i) => {
              const status = records[s.id] || "present";
              const cfg = statusConfig[status];
              const Icon = cfg.icon;
              return (
                <motion.button
                  key={s.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.02 }}
                  onClick={() => toggleStatus(s.id)}
                  className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${cfg.bg}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-foreground/30 font-body text-sm w-8">{s.rollNo || i + 1}</span>
                    <span className="text-foreground font-body font-medium">{s.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon className={`w-5 h-5 ${cfg.color}`} />
                    <span className={`text-sm font-body font-bold ${cfg.color}`}>{cfg.label}</span>
                  </div>
                </motion.button>
              );
            })}
          </div>

          <div className="flex justify-end pt-2">
            <Button
              onClick={handleSave}
              disabled={saving}
              className="bg-gradient-to-r from-primary to-secondary text-white gap-2 rounded-xl px-8 h-12"
            >
              <Save className="w-4 h-4" />
              {saving ? "Saving..." : existingData ? "Update Attendance" : "Save Attendance"}
            </Button>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default TeacherAttendance;
