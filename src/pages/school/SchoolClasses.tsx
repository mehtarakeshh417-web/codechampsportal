import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useData, StudentData } from "@/contexts/DataContext";
import { useAuth } from "@/contexts/AuthContext";
import { BookOpen, Users, GraduationCap, ChevronDown, Trash2, Edit2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import * as XLSX from "xlsx";
import { useClassFormatter } from "@/lib/classNames";
import { normalizeClass } from "@/lib/studentAccounts";

const CLASS_OPTIONS = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th"];
const DEFAULT_SECTIONS = ["A", "B", "C", "D", "E"];

// Normalize any class token ("6th-A", "6th (A)", "6th") to { cls, sec }
const parseClassToken = (token: string) => {
  const t = (token || "").trim();
  const paren = t.match(/^(.+?)\s*\(\s*([^)]+?)\s*\)$/);
  if (paren) return { cls: paren[1].trim(), sec: paren[2].trim() || "A" };
  const parts = t.split("-");
  return { cls: (parts[0] || "").trim(), sec: (parts[1] || "A").trim() };
};

type SectionNode = { sec: string; teachers: string[]; students: StudentData[] };
type ClassNode = { cls: string; sections: Map<string, SectionNode> };

const SchoolClasses = () => {
  const { user } = useAuth();
  const { getSchoolTeachers, getSchoolStudents, getSchool, updateStudent, deleteStudent } = useData();
  const schoolId = user?.id || "";
  const teachers = getSchoolTeachers(schoolId);
  const students = getSchoolStudents(schoolId);
  const school = getSchool(schoolId);
  const SECTION_OPTIONS = school?.sections?.length ? school.sections : DEFAULT_SECTIONS;
  const formatClass = useClassFormatter();

  const [openClass, setOpenClass] = useState<string | null>(null);
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ name: "", fatherName: "", class: "", section: "", rollNo: "", teacherId: "" });

  // Class -> Section -> { teachers, students }
  const classNodes = useMemo(() => {
    const map = new Map<string, ClassNode>();
    const ensure = (rawCls: string, rawSec: string) => {
      const cls = normalizeClass(rawCls) || rawCls.trim();
      const sec = (rawSec || "A").trim().toUpperCase();
      if (!map.has(cls)) map.set(cls, { cls, sections: new Map() });
      const node = map.get(cls)!;
      if (!node.sections.has(sec)) node.sections.set(sec, { sec, teachers: [], students: [] });
      return node.sections.get(sec)!;
    };

    teachers.forEach((t) =>
      t.classes.forEach((token) => {
        const { cls, sec } = parseClassToken(token);
        if (!cls) return;
        ensure(cls, sec).teachers.push(`${t.firstName} ${t.lastName}`);
      }),
    );
    students.forEach((s) => {
      if (!s.class) return;
      ensure(s.class, s.section || "A").students.push(s);
    });

    return Array.from(map.values()).sort((a, b) => a.cls.localeCompare(b.cls, undefined, { numeric: true }));
  }, [teachers, students]);

  const classTotal = (node: ClassNode) =>
    Array.from(node.sections.values()).reduce((sum, s) => sum + s.students.length, 0);

  const getTeacherName = (teacherId: string) => {
    const t = teachers.find((x) => x.id === teacherId);
    return t ? `${t.firstName} ${t.lastName}` : "Unassigned";
  };

  const sortedStudents = (list: StudentData[]) =>
    [...list].sort((a, b) => (a.rollNo || "").localeCompare(b.rollNo || "", undefined, { numeric: true }));

  const startEdit = (s: StudentData) => {
    setEditingId(s.id);
    setEditForm({
      name: s.name,
      fatherName: s.fatherName,
      class: s.class,
      section: s.section || "A",
      rollNo: s.rollNo,
      teacherId: s.teacherId,
    });
  };

  const saveEdit = async (id: string) => {
    if (!editForm.name.trim()) {
      toast.error("Student name cannot be empty");
      return;
    }
    await updateStudent(id, editForm);
    toast.success("Student updated.");
    setEditingId(null);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete student "${name}"?`)) return;
    await deleteStudent(id);
    toast.success(`Student "${name}" deleted.`);
  };

  const rowsFor = (node: SectionNode, cls: string) =>
    sortedStudents(node.students).map((s) => ({
      "Student Name": s.name,
      "Father's Name": s.fatherName || "",
      Class: formatClass(cls),
      Section: node.sec,
      "Roll No": s.rollNo || "",
      Username: s.username || "",
      Teacher: getTeacherName(s.teacherId),
      XP: s.xp ?? 0,
    }));

  // One workbook per class, one sheet per section.
  const exportClass = (node: ClassNode) => {
    const wb = XLSX.utils.book_new();
    Array.from(node.sections.values())
      .sort((a, b) => a.sec.localeCompare(b.sec))
      .forEach((sec) => {
        XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(rowsFor(sec, node.cls)), `Section ${sec.sec}`.slice(0, 31));
      });
    XLSX.writeFile(wb, `Class-${node.cls}-Report.xlsx`);
    toast.success(`Exported report for ${formatClass(node.cls)}`);
  };

  const exportAll = () => {
    const wb = XLSX.utils.book_new();
    classNodes.forEach((node) => {
      const rows = Array.from(node.sections.values())
        .sort((a, b) => a.sec.localeCompare(b.sec))
        .flatMap((sec) => rowsFor(sec, node.cls));
      XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(rows), `Class ${node.cls}`.slice(0, 31));
    });
    XLSX.writeFile(wb, `${school?.name || "School"}-Classwise-Report.xlsx`);
    toast.success("Exported classwise report");
  };

  return (
    <div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-wrap items-start justify-between gap-3 mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold mb-1 text-white">
            <span className="text-gradient-brand">Classes</span>
          </h1>
          <p className="font-body text-primary-foreground">Class → Section → Students</p>
        </div>
        {classNodes.length > 0 && (
          <Button variant="hero" onClick={exportAll}>
            <Download className="w-4 h-4 mr-2" /> Export classwise report
          </Button>
        )}
      </motion.div>

      {classNodes.length === 0 ? (
        <div className="glass-card p-12 text-center">
          <BookOpen className="w-16 h-16 text-white/20 mx-auto mb-4" />
          <p className="text-white/40 font-body">Add teachers and students to see classes here</p>
        </div>
      ) : (
        <div className="space-y-4">
          {classNodes.map((node, i) => {
            const isOpen = openClass === node.cls;
            const sections = Array.from(node.sections.values()).sort((a, b) => a.sec.localeCompare(b.sec));
            return (
              <motion.div
                key={node.cls}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className="glass-card overflow-hidden"
              >
                <div className="flex items-center justify-between gap-3 pr-4">
                  <button
                    type="button"
                    onClick={() => {
                      setOpenClass(isOpen ? null : node.cls);
                      setOpenSection(null);
                      setEditingId(null);
                    }}
                    className="flex-1 p-5 text-left hover:bg-white/5 transition-colors flex items-start justify-between gap-4"
                  >
                    <div className="min-w-0">
                      <h3 className="font-display font-bold text-lg text-white/90 mb-3">Class {formatClass(node.cls)}</h3>
                      <div className="flex flex-wrap gap-4 text-sm">
                        <span className="flex items-center gap-2 text-white/60">
                          <BookOpen className="w-4 h-4" /> {sections.length} section(s)
                        </span>
                        <span className="flex items-center gap-2 text-white/60">
                          <GraduationCap className="w-4 h-4" /> {classTotal(node)} students
                        </span>
                      </div>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-white/40 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  <Button variant="ghost" size="icon" className="text-white/40 hover:text-neon-green" title="Export this class" onClick={() => exportClass(node)}>
                    <Download className="w-4 h-4" />
                  </Button>
                </div>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 pt-3 border-t border-white/10 space-y-2">
                        {sections.map((sec) => {
                          const secKey = `${node.cls}-${sec.sec}`;
                          const secOpen = openSection === secKey;
                          return (
                            <div key={secKey} className="rounded-lg bg-white/5 border border-white/10 overflow-hidden">
                              <button
                                type="button"
                                onClick={() => {
                                  setOpenSection(secOpen ? null : secKey);
                                  setEditingId(null);
                                }}
                                className="w-full p-4 text-left hover:bg-white/5 transition-colors flex items-center justify-between gap-3"
                              >
                                <div className="min-w-0">
                                  <p className="font-display font-bold text-white/90">
                                    {formatClass(node.cls)} — Section {sec.sec}
                                  </p>
                                  <p className="text-xs text-white/50 font-body flex items-center gap-2 mt-1">
                                    <Users className="w-3.5 h-3.5" />
                                    {sec.teachers.length ? Array.from(new Set(sec.teachers)).join(", ") : "No teacher assigned"}
                                    <span className="text-white/30">·</span>
                                    {sec.students.length} students
                                  </p>
                                </div>
                                <ChevronDown className={`w-4 h-4 text-white/40 shrink-0 transition-transform ${secOpen ? "rotate-180" : ""}`} />
                              </button>

                              {secOpen && (
                                <div className="px-4 pb-4 space-y-2 border-t border-white/10 pt-3">
                                  {sec.students.length === 0 ? (
                                    <p className="text-white/40 text-sm font-body text-center py-3">No students in this section yet</p>
                                  ) : (
                                    sortedStudents(sec.students).map((s) => (
                                      <div key={s.id} className="rounded-lg bg-white/5 border border-white/10 p-3">
                                        {editingId === s.id ? (
                                          <div className="space-y-3">
                                            <div className="grid md:grid-cols-2 gap-3">
                                              <div className="space-y-1">
                                                <Label className="text-white/70 text-xs">Student Name</Label>
                                                <Input value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} className="bg-white/10 border-white/20 text-white" />
                                              </div>
                                              <div className="space-y-1">
                                                <Label className="text-white/70 text-xs">Father's Name</Label>
                                                <Input value={editForm.fatherName} onChange={(e) => setEditForm({ ...editForm, fatherName: e.target.value })} className="bg-white/10 border-white/20 text-white" />
                                              </div>
                                              <div className="space-y-1">
                                                <Label className="text-white/70 text-xs">Class</Label>
                                                <select value={editForm.class} onChange={(e) => setEditForm({ ...editForm, class: e.target.value, teacherId: "" })} className="w-full rounded-lg bg-white/10 border border-white/20 text-white px-3 py-2 text-sm">
                                                  {CLASS_OPTIONS.map((c) => <option key={c} value={c} className="bg-cyber-dark">{formatClass(c)}</option>)}
                                                </select>
                                              </div>
                                              <div className="space-y-1">
                                                <Label className="text-white/70 text-xs">Section</Label>
                                                <select value={editForm.section} onChange={(e) => setEditForm({ ...editForm, section: e.target.value })} className="w-full rounded-lg bg-white/10 border border-white/20 text-white px-3 py-2 text-sm">
                                                  {SECTION_OPTIONS.map((opt) => <option key={opt} value={opt} className="bg-cyber-dark">{opt}</option>)}
                                                </select>
                                              </div>
                                              <div className="space-y-1">
                                                <Label className="text-white/70 text-xs">Roll No</Label>
                                                <Input value={editForm.rollNo} onChange={(e) => setEditForm({ ...editForm, rollNo: e.target.value })} className="bg-white/10 border-white/20 text-white" />
                                              </div>
                                              <div className="space-y-1">
                                                <Label className="text-white/70 text-xs">Assign Teacher</Label>
                                                <select value={editForm.teacherId} onChange={(e) => setEditForm({ ...editForm, teacherId: e.target.value })} className="w-full rounded-lg bg-white/10 border border-white/20 text-white px-3 py-2 text-sm">
                                                  <option value="" className="bg-cyber-dark">Unassigned</option>
                                                  {teachers
                                                    .filter((t) => !editForm.class || t.classes.some((c) => normalizeClass(parseClassToken(c).cls) === normalizeClass(editForm.class)))
                                                    .map((t) => (
                                                      <option key={t.id} value={t.id} className="bg-cyber-dark">{t.firstName} {t.lastName}</option>
                                                    ))}
                                                </select>
                                              </div>
                                            </div>
                                            <div className="flex gap-2">
                                              <Button size="sm" variant="hero" onClick={() => saveEdit(s.id)}>Save</Button>
                                              <Button size="sm" variant="ghost" onClick={() => setEditingId(null)}>Cancel</Button>
                                            </div>
                                          </div>
                                        ) : (
                                          <div className="flex items-center justify-between gap-3">
                                            <div className="min-w-0">
                                              <span className="font-body font-bold text-white block truncate">{s.name}</span>
                                              <span className="text-xs text-white/50 font-body">Username: <span className="text-neon-blue">{s.username || "—"}</span></span>
                                            </div>
                                            <div className="flex items-center gap-3 shrink-0">
                                              <div className="hidden sm:flex gap-3 text-xs text-white/60">
                                                <span>Roll: {s.rollNo}</span>
                                                <span className="text-white/40">Teacher: {getTeacherName(s.teacherId)}</span>
                                              </div>
                                              <Button variant="ghost" size="icon" className="text-white/30 hover:text-neon-blue" onClick={() => startEdit(s)}>
                                                <Edit2 className="w-4 h-4" />
                                              </Button>
                                              <Button variant="ghost" size="icon" className="text-white/30 hover:text-destructive" onClick={() => handleDelete(s.id, s.name)}>
                                                <Trash2 className="w-4 h-4" />
                                              </Button>
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                    ))
                                  )}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SchoolClasses;
