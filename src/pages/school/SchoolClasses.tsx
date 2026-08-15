import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useData, StudentData } from "@/contexts/DataContext";
import { useAuth } from "@/contexts/AuthContext";
import { BookOpen, Users, GraduationCap, ChevronDown, Trash2, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

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
const keyOf = (cls: string, sec: string) => `${cls}-${sec || "A"}`;

const SchoolClasses = () => {
  const { user } = useAuth();
  const { getSchoolTeachers, getSchoolStudents, getSchool, updateStudent, deleteStudent } = useData();
  const schoolId = user?.id || "";
  const teachers = getSchoolTeachers(schoolId);
  const students = getSchoolStudents(schoolId);
  const school = getSchool(schoolId);
  const SECTION_OPTIONS = school?.sections?.length ? school.sections : DEFAULT_SECTIONS;

  const [openKey, setOpenKey] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ name: "", fatherName: "", class: "", section: "", rollNo: "", teacherId: "" });

  const classMap = new Map<string, { cls: string; sec: string; teachers: string[]; students: StudentData[] }>();
  const ensure = (cls: string, sec: string) => {
    const k = keyOf(cls, sec);
    if (!classMap.has(k)) classMap.set(k, { cls, sec: sec || "A", teachers: [], students: [] });
    return classMap.get(k)!;
  };

  teachers.forEach((t) =>
    t.classes.forEach((token) => {
      const { cls, sec } = parseClassToken(token);
      if (!cls) return;
      ensure(cls, sec).teachers.push(`${t.firstName} ${t.lastName}`);
    }),
  );
  students.forEach((s) => ensure(s.class, s.section || "A").students.push(s));

  const entries = Array.from(classMap.entries()).sort((a, b) =>
    a[0].localeCompare(b[0], undefined, { numeric: true }),
  );

  const getTeacherName = (teacherId: string) => {
    const t = teachers.find((x) => x.id === teacherId);
    return t ? `${t.firstName} ${t.lastName}` : "Unassigned";
  };

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

  return (
    <div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="font-display text-3xl font-bold mb-1 text-white">
          <span className="text-gradient-brand">Classes</span>
        </h1>
        <p className="font-body mb-8 text-primary-foreground">Class structure and assignments</p>
      </motion.div>

      {entries.length === 0 ? (
        <div className="glass-card p-12 text-center">
          <BookOpen className="w-16 h-16 text-white/20 mx-auto mb-4" />
          <p className="text-white/40 font-body">Add teachers and students to see classes here</p>
        </div>
      ) : (
        <div className="space-y-4">
          {entries.map(([k, data], i) => {
            const isOpen = openKey === k;
            return (
              <motion.div
                key={k}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className="glass-card overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => { setOpenKey(isOpen ? null : k); setEditingId(null); }}
                  className="w-full p-5 text-left hover:bg-white/5 transition-colors flex items-start justify-between gap-4"
                >
                  <div className="min-w-0">
                    <h3 className="font-display font-bold text-lg text-white/90 mb-3">
                      {data.cls} ({data.sec})
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-white/60">
                        <Users className="w-4 h-4" />
                        <span className="truncate">
                          {data.teachers.length > 0
                            ? Array.from(new Set(data.teachers)).join(", ")
                            : "No teacher assigned"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-white/60">
                        <GraduationCap className="w-4 h-4" />
                        <span>{data.students.length} students</span>
                      </div>
                    </div>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-white/40 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>

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
                        {data.students.length === 0 ? (
                          <p className="text-white/40 text-sm font-body text-center py-4">
                            No students in this class yet
                          </p>
                        ) : (
                          data.students
                            .slice()
                            .sort((a, b) =>
                              (a.rollNo || "").localeCompare(b.rollNo || "", undefined, { numeric: true }),
                            )
                            .map((s) => (
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
                                          {CLASS_OPTIONS.map((c) => <option key={c} value={c} className="bg-cyber-dark">{c}</option>)}
                                        </select>
                                      </div>
                                      <div className="space-y-1">
                                        <Label className="text-white/70 text-xs">Section</Label>
                                        <select value={editForm.section} onChange={(e) => setEditForm({ ...editForm, section: e.target.value })} className="w-full rounded-lg bg-white/10 border border-white/20 text-white px-3 py-2 text-sm">
                                          {SECTION_OPTIONS.map((sec) => <option key={sec} value={sec} className="bg-cyber-dark">{sec}</option>)}
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
                                            .filter((t) => !editForm.class || t.classes.some((c) => parseClassToken(c).cls === editForm.class))
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
                                    <span className="font-body font-bold text-white truncate">{s.name}</span>
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
