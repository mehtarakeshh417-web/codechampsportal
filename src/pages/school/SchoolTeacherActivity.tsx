import { useCallback, useEffect, useMemo, useState } from "react";
import { Activity, BookOpen, CheckCircle2, ClipboardList, Download, FileSpreadsheet, Loader2, Users } from "lucide-react";
import { toast } from "sonner";
import * as XLSX from "xlsx";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";
import { useData, type StudentData, type TeacherData } from "@/contexts/DataContext";
import { supabase } from "@/integrations/supabase/client";
import { deriveActivityStatus, summarizeActivityStatuses, type ActivityKind, type ActivityStatus } from "@/lib/teacherActivity";

type ActivityItem = {
  id: string;
  kind: ActivityKind;
  title: string;
  teacherId: string;
  targetClass: string;
  subject: string;
  createdAt: string;
  submissions: Record<string, { evaluationStatus?: string | null; evaluatedAt?: string | null }>;
};

type StudentActivityRow = {
  student: StudentData;
  status: ActivityStatus;
};

type StatusFilter = "all" | "Attempted" | "Not Attempted" | "Completed / Submitted" | "Pending";

const matchesStatusFilter = (status: ActivityStatus, filter: StatusFilter) => {
  if (filter === "all") return true;
  if (filter === "Pending") return status !== "Completed / Submitted";
  return status === filter;
};

const getTeacherName = (teacher: TeacherData | undefined) => teacher ? `${teacher.firstName} ${teacher.lastName}`.trim() : "Teacher unavailable";

const SchoolTeacherActivity = () => {
  const { user } = useAuth();
  const { getSchool, getSchoolTeachers, getSchoolStudents, loading: schoolDataLoading } = useData();
  const schoolId = getSchool(user?.id || "")?.id || user?.id || "";
  const teachers = getSchoolTeachers(user?.id || "");
  const students = getSchoolStudents(user?.id || "");

  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [teacherFilter, setTeacherFilter] = useState("all");
  const [classFilter, setClassFilter] = useState("all");
  const [subjectFilter, setSubjectFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [selectedActivity, setSelectedActivity] = useState<ActivityItem | null>(null);

  const loadActivities = useCallback(async () => {
    if (!schoolId) {
      if (!schoolDataLoading) {
        setActivities([]);
        setLoading(false);
      }
      return;
    }

    setLoading(true);
    setLoadError("");
    try {
      const [assignmentResult, projectResult] = await Promise.all([
        supabase.from("assignments").select("id, title, teacher_id, target_class, subject, created_at").eq("school_id", schoolId),
        supabase.from("projects").select("id, title, teacher_id, target_class, technology, created_at").eq("school_id", schoolId),
      ]);
      if (assignmentResult.error) throw assignmentResult.error;
      if (projectResult.error) throw projectResult.error;

      const assignments = assignmentResult.data || [];
      const projects = projectResult.data || [];
      const [assignmentSubmissions, projectSubmissions] = await Promise.all([
        assignments.length
          ? supabase.from("submissions").select("assignment_id, student_id").in("assignment_id", assignments.map((item) => item.id))
          : Promise.resolve({ data: [], error: null }),
        projects.length
          ? supabase.from("project_submissions" as any).select("project_id, student_id, evaluation_status, evaluated_at").in("project_id", projects.map((item) => item.id))
          : Promise.resolve({ data: [], error: null }),
      ]);
      if (assignmentSubmissions.error) throw assignmentSubmissions.error;
      if (projectSubmissions.error) throw projectSubmissions.error;

      const assignmentEvidence: Record<string, Record<string, { evaluationStatus?: string | null; evaluatedAt?: string | null }>> = {};
      (assignmentSubmissions.data || []).forEach((submission: any) => {
        const records = assignmentEvidence[submission.assignment_id] || (assignmentEvidence[submission.assignment_id] = {});
        records[submission.student_id] = {};
      });
      const projectEvidence: Record<string, Record<string, { evaluationStatus?: string | null; evaluatedAt?: string | null }>> = {};
      ((projectSubmissions.data || []) as any[]).forEach((submission) => {
        const records = projectEvidence[submission.project_id] || (projectEvidence[submission.project_id] = {});
        records[submission.student_id] = {
          evaluationStatus: submission.evaluation_status,
          evaluatedAt: submission.evaluated_at,
        };
      });

      const mappedActivities: ActivityItem[] = [
        ...assignments.map((item) => ({
          id: item.id,
          kind: "assignment" as const,
          title: item.title,
          teacherId: item.teacher_id,
          targetClass: item.target_class,
          subject: item.subject || "—",
          createdAt: item.created_at,
          submissions: assignmentEvidence[item.id] || {},
        })),
        ...projects.map((item) => ({
          id: item.id,
          kind: "project" as const,
          title: item.title,
          teacherId: item.teacher_id,
          targetClass: item.target_class,
          subject: item.technology || "—",
          createdAt: item.created_at,
          submissions: projectEvidence[item.id] || {},
        })),
      ].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
      setActivities(mappedActivities);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Could not load teacher activity.";
      setLoadError(message);
      toast.error("Could not load teacher activity.");
    } finally {
      setLoading(false);
    }
  }, [schoolId, schoolDataLoading]);

  useEffect(() => { void loadActivities(); }, [loadActivities]);

  const classOptions = useMemo(() => [...new Set(activities.map((item) => item.targetClass).filter(Boolean))].sort(), [activities]);
  const subjectOptions = useMemo(() => [...new Set(activities.map((item) => item.subject).filter((subject) => subject && subject !== "—"))].sort(), [activities]);
  const teacherById = useMemo(() => new Map(teachers.map((teacher) => [teacher.id, teacher])), [teachers]);

  const getActivityStudents = useCallback((activity: ActivityItem): StudentActivityRow[] => {
    return students
      .filter((student) => `${student.class}-${student.section}` === activity.targetClass)
      .map((student) => ({
        student,
        status: deriveActivityStatus({
          kind: activity.kind,
          hasSubmission: Boolean(activity.submissions[student.id]),
          evaluationStatus: activity.submissions[student.id]?.evaluationStatus,
          evaluatedAt: activity.submissions[student.id]?.evaluatedAt,
        }),
      }))
      .sort((a, b) => a.student.name.localeCompare(b.student.name));
  }, [students]);

  const filteredActivities = useMemo(() => activities.filter((activity) => {
    if (teacherFilter !== "all" && activity.teacherId !== teacherFilter) return false;
    if (classFilter !== "all" && activity.targetClass !== classFilter) return false;
    if (subjectFilter !== "all" && activity.subject !== subjectFilter) return false;
    if (statusFilter !== "all" && !getActivityStudents(activity).some(({ status }) => matchesStatusFilter(status, statusFilter))) return false;
    return true;
  }), [activities, teacherFilter, classFilter, subjectFilter, statusFilter, getActivityStudents]);

  const totals = useMemo(() => {
    return filteredActivities.reduce((sum, activity) => {
      const counts = summarizeActivityStatuses(getActivityStudents(activity).map(({ status }) => status));
      return {
        assigned: sum.assigned + counts.assigned,
        attempted: sum.attempted + counts.attempted,
        notAttempted: sum.notAttempted + counts.notAttempted,
        completed: sum.completed + counts.completed,
        pending: sum.pending + counts.pending,
      };
    }, { assigned: 0, attempted: 0, notAttempted: 0, completed: 0, pending: 0 });
  }, [filteredActivities, getActivityStudents]);

  const getVisibleStudents = useCallback((activity: ActivityItem) => getActivityStudents(activity)
    .filter(({ status }) => matchesStatusFilter(status, statusFilter)), [getActivityStudents, statusFilter]);

  const exportReport = useCallback(() => {
    if (filteredActivities.length === 0) {
      toast.error("There is no activity to export for these filters.");
      return;
    }

    const workbook = XLSX.utils.book_new();
    const summary = filteredActivities.map((activity) => {
      const counts = summarizeActivityStatuses(getActivityStudents(activity).map(({ status }) => status));
      return {
        Activity: activity.title,
        Type: activity.kind === "assignment" ? "Assignment" : "Project",
        Teacher: getTeacherName(teacherById.get(activity.teacherId)),
        Class: activity.targetClass,
        Subject: activity.subject,
        "Students assigned": counts.assigned,
        Attempted: counts.attempted,
        "Not attempted": counts.notAttempted,
        "Completed / submitted": counts.completed,
        Pending: counts.pending,
        "Created at": activity.createdAt,
      };
    });
    const studentRows = filteredActivities.flatMap((activity) => getVisibleStudents(activity).map(({ student, status }) => ({
      Activity: activity.title,
      Type: activity.kind === "assignment" ? "Assignment" : "Project",
      Teacher: getTeacherName(teacherById.get(activity.teacherId)),
      Class: activity.targetClass,
      Subject: activity.subject,
      Student: student.name,
      Section: student.section,
      "Roll no.": student.rollNo,
      Status: status,
    })));

    XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(summary), "Activity Summary");
    XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(studentRows), "Student Status");
    XLSX.writeFile(workbook, `Teacher_Activity_Report_${new Date().toISOString().slice(0, 10)}.xlsx`);
    toast.success("Teacher activity report downloaded.");
  }, [filteredActivities, getActivityStudents, getVisibleStudents, teacherById]);

  const selectedStudents = selectedActivity ? getVisibleStudents(selectedActivity) : [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="mb-1 font-display text-3xl font-bold text-white"><span className="text-gradient-brand">Teacher Activity</span></h1>
          <p className="font-body text-primary-foreground">Assignments, projects, and student submissions across your school.</p>
        </div>
        <Button variant="hero" size="lg" onClick={exportReport} disabled={loading || filteredActivities.length === 0}>
          <FileSpreadsheet className="mr-2 h-4 w-4" /> Generate Report
        </Button>
      </div>

      <section aria-label="Activity filters" className="grid gap-3 rounded-lg border border-white/10 bg-white/5 p-4 sm:grid-cols-2 xl:grid-cols-4">
        <Select value={teacherFilter} onValueChange={setTeacherFilter}>
          <SelectTrigger aria-label="Filter by teacher" className="border-white/15 bg-white/5 text-white"><SelectValue placeholder="All teachers" /></SelectTrigger>
          <SelectContent className="border-white/15 bg-card text-white">
            <SelectItem value="all">All teachers</SelectItem>
            {teachers.map((teacher) => <SelectItem key={teacher.id} value={teacher.id}>{getTeacherName(teacher)}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={classFilter} onValueChange={setClassFilter}>
          <SelectTrigger aria-label="Filter by class" className="border-white/15 bg-white/5 text-white"><SelectValue placeholder="All classes" /></SelectTrigger>
          <SelectContent className="border-white/15 bg-card text-white">
            <SelectItem value="all">All classes</SelectItem>
            {classOptions.map((targetClass) => <SelectItem key={targetClass} value={targetClass}>{targetClass}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={subjectFilter} onValueChange={setSubjectFilter}>
          <SelectTrigger aria-label="Filter by subject or tool" className="border-white/15 bg-white/5 text-white"><SelectValue placeholder="All subjects / tools" /></SelectTrigger>
          <SelectContent className="border-white/15 bg-card text-white">
            <SelectItem value="all">All subjects / tools</SelectItem>
            {subjectOptions.map((subject) => <SelectItem key={subject} value={subject}>{subject}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as StatusFilter)}>
          <SelectTrigger aria-label="Filter by status" className="border-white/15 bg-white/5 text-white"><SelectValue placeholder="All statuses" /></SelectTrigger>
          <SelectContent className="border-white/15 bg-card text-white">
            <SelectItem value="all">All statuses</SelectItem>
            <SelectItem value="Attempted">Attempted</SelectItem>
            <SelectItem value="Not Attempted">Not Attempted</SelectItem>
            <SelectItem value="Completed / Submitted">Completed / Submitted</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
          </SelectContent>
        </Select>
      </section>

      <section aria-label="Activity summary" className="grid grid-cols-2 gap-3 xl:grid-cols-5">
        {[
          { label: "Students assigned", value: totals.assigned, icon: Users, tone: "text-neon-blue" },
          { label: "Attempted", value: totals.attempted, icon: Activity, tone: "text-neon-orange" },
          { label: "Not attempted", value: totals.notAttempted, icon: ClipboardList, tone: "text-neon-pink" },
          { label: "Completed / submitted", value: totals.completed, icon: CheckCircle2, tone: "text-neon-green" },
          { label: "Pending", value: totals.pending, icon: BookOpen, tone: "text-primary" },
        ].map(({ label, value, icon: Icon, tone }) => (
          <div key={label} className="glass-card p-4">
            <div className="mb-3 flex items-center justify-between gap-2">
              <span className="text-sm text-white/60">{label}</span>
              <Icon className={`h-5 w-5 shrink-0 ${tone}`} />
            </div>
            <div className="font-display text-2xl font-bold text-white">{value}</div>
          </div>
        ))}
      </section>

      <p className="-mt-3 text-xs text-white/45">Pending includes work not yet started and project submissions awaiting teacher review.</p>

      <section className="glass-card overflow-hidden">
        <div className="flex flex-col gap-2 border-b border-white/10 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="font-display text-lg font-bold text-white">Teacher assignments &amp; projects</h2>
          <span className="text-sm text-white/50">{filteredActivities.length} activities</span>
        </div>
        {loading ? (
          <div className="flex items-center justify-center gap-2 px-6 py-14 text-white/60"><Loader2 className="h-5 w-5 animate-spin" />Loading activity…</div>
        ) : loadError ? (
          <div className="px-6 py-12 text-center text-sm text-white/60">
            <p>{loadError}</p>
            <Button variant="outline" className="mt-4 border-white/20 text-white" onClick={() => void loadActivities()}>Try again</Button>
          </div>
        ) : filteredActivities.length === 0 ? (
          <div className="px-6 py-12 text-center text-sm text-white/50">No matching assignments or projects found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1120px] border-collapse text-left text-sm">
              <thead className="bg-white/5 text-xs uppercase text-white/50">
                <tr>
                  <th className="px-4 py-3 font-medium">Activity</th>
                  <th className="px-4 py-3 font-medium">Teacher</th>
                  <th className="px-4 py-3 font-medium">Class</th>
                  <th className="px-4 py-3 font-medium">Subject / tool</th>
                  <th className="px-4 py-3 text-right font-medium">Assigned</th>
                  <th className="px-4 py-3 text-right font-medium">Attempted</th>
                  <th className="px-4 py-3 text-right font-medium">Not attempted</th>
                  <th className="px-4 py-3 text-right font-medium">Completed</th>
                  <th className="px-4 py-3 text-right font-medium">Pending</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {filteredActivities.map((activity) => {
                  const counts = summarizeActivityStatuses(getActivityStudents(activity).map(({ status }) => status));
                  return (
                    <tr key={`${activity.kind}-${activity.id}`} className="transition-colors hover:bg-white/5">
                      <td className="max-w-[240px] px-4 py-3">
                        <Button variant="ghost" className="h-auto max-w-full justify-start whitespace-normal px-0 py-1 text-left text-white hover:bg-transparent hover:text-primary" onClick={() => setSelectedActivity(activity)}>
                          <span className="block truncate">{activity.title}</span>
                        </Button>
                        <div className="text-xs text-white/40">{activity.kind === "assignment" ? "Assignment" : "Project"} · {new Date(activity.createdAt).toLocaleDateString()}</div>
                      </td>
                      <td className="px-4 py-3 text-white/75">{getTeacherName(teacherById.get(activity.teacherId))}</td>
                      <td className="px-4 py-3 text-white/75">{activity.targetClass}</td>
                      <td className="px-4 py-3 text-white/75">{activity.subject}</td>
                      <td className="px-4 py-3 text-right tabular-nums text-white/75">{counts.assigned}</td>
                      <td className="px-4 py-3 text-right tabular-nums text-neon-orange">{counts.attempted}</td>
                      <td className="px-4 py-3 text-right tabular-nums text-neon-pink">{counts.notAttempted}</td>
                      <td className="px-4 py-3 text-right tabular-nums text-neon-green">{counts.completed}</td>
                      <td className="px-4 py-3 text-right tabular-nums text-primary">{counts.pending}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <Dialog open={Boolean(selectedActivity)} onOpenChange={(open) => { if (!open) setSelectedActivity(null); }}>
        <DialogContent className="max-h-[85vh] max-w-4xl overflow-hidden border-white/15 bg-[hsl(220,28%,14%)] text-white">
          <DialogHeader>
            <DialogTitle className="pr-8 font-display text-xl">{selectedActivity?.title || "Activity details"}</DialogTitle>
            <DialogDescription className="text-white/55">
              {selectedActivity ? `${selectedActivity.kind === "assignment" ? "Assignment" : "Project"} · ${getTeacherName(teacherById.get(selectedActivity.teacherId))} · ${selectedActivity.targetClass} · ${selectedActivity.subject}` : "Student status"}
            </DialogDescription>
          </DialogHeader>
          <div className="overflow-auto">
            {selectedActivity && selectedStudents.length === 0 ? (
              <p className="py-8 text-center text-sm text-white/50">No students match this class and status filter.</p>
            ) : (
              <table className="w-full min-w-[540px] border-collapse text-left text-sm">
                <thead className="sticky top-0 bg-[hsl(220,28%,14%)] text-xs uppercase text-white/50">
                  <tr><th className="px-3 py-3 font-medium">Student</th><th className="px-3 py-3 font-medium">Section</th><th className="px-3 py-3 font-medium">Roll no.</th><th className="px-3 py-3 font-medium">Status</th></tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {selectedStudents.map(({ student, status }) => (
                    <tr key={student.id}>
                      <td className="px-3 py-3 text-white/85">{student.name}</td>
                      <td className="px-3 py-3 text-white/65">{student.section}</td>
                      <td className="px-3 py-3 text-white/65">{student.rollNo || "—"}</td>
                      <td className="px-3 py-3"><span className={status === "Completed / Submitted" ? "text-neon-green" : status === "Attempted" ? "text-neon-orange" : "text-white/55"}>{status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          <div className="flex justify-end border-t border-white/10 pt-3">
            <Button variant="outline" className="border-white/20 text-white" onClick={() => setSelectedActivity(null)}>Close</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SchoolTeacherActivity;