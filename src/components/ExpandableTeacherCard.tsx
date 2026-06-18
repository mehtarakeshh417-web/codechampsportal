import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Users, GraduationCap, BookOpen, Layers } from "lucide-react";
import { TeacherData, StudentData } from "@/contexts/DataContext";

interface ExpandableTeacherCardProps {
  teacher: TeacherData;
  students: StudentData[];
  formatClassDisplay?: (classes: string[]) => string;
  actions?: React.ReactNode;
  children?: React.ReactNode;
}

const defaultFormatClasses = (classes: string[]) => {
  const grouped: Record<string, string[]> = {};
  classes.forEach((c) => {
    const parts = c.split("-");
    const cls = parts[0];
    const sec = parts[1] || "A";
    if (!grouped[cls]) grouped[cls] = [];
    grouped[cls].push(sec);
  });
  return Object.entries(grouped)
    .map(([cls, sections]) => `${cls} (${sections.join(",")})`)
    .join(", ");
};

// Build {class: {section: students[]}} from teacher.classes + students
const buildTree = (teacherClasses: string[], students: StudentData[]) => {
  const tree: Record<string, Record<string, StudentData[]>> = {};
  teacherClasses.forEach((c) => {
    const [cls, sec = "A"] = c.split("-");
    if (!tree[cls]) tree[cls] = {};
    if (!tree[cls][sec]) tree[cls][sec] = [];
  });
  students.forEach((s) => {
    const cls = s.class;
    const sec = s.section || "A";
    if (!tree[cls]) tree[cls] = {};
    if (!tree[cls][sec]) tree[cls][sec] = [];
    tree[cls][sec].push(s);
  });
  return tree;
};

const ExpandableTeacherCard = ({
  teacher,
  students,
  formatClassDisplay = defaultFormatClasses,
  actions,
  children,
}: ExpandableTeacherCardProps) => {
  const [expanded, setExpanded] = useState(false);
  const [openClasses, setOpenClasses] = useState<Record<string, boolean>>({});
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  const teacherStudents = students.filter((s) => s.teacherId === teacher.id);
  const tree = buildTree(teacher.classes, teacherStudents);
  const classKeys = Object.keys(tree).sort();

  const toggleClass = (cls: string) =>
    setOpenClasses((p) => ({ ...p, [cls]: !p[cls] }));
  const toggleSection = (key: string) =>
    setOpenSections((p) => ({ ...p, [key]: !p[key] }));

  return (
    <div className="glass-card overflow-hidden">
      <div
        className="p-4 flex items-center justify-between cursor-pointer hover:bg-white/5 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-neon-blue/20 to-neon-green/20 flex items-center justify-center shrink-0">
            <Users className="w-4 h-4 text-neon-blue" />
          </div>
          <div className="min-w-0">
            <span className="font-body font-bold text-white block truncate">
              {teacher.firstName} {teacher.lastName}
            </span>
            <div className="text-xs text-white/40 mt-0.5 truncate">
              {formatClassDisplay(teacher.classes)}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs font-body bg-white/10 px-2 py-1 rounded-lg text-white/60">
            <GraduationCap className="w-3 h-3 inline mr-1" />
            {teacherStudents.length}
          </span>
          {actions && (
            <div onClick={(e) => e.stopPropagation()} className="flex items-center gap-1">
              {actions}
            </div>
          )}
          <ChevronDown
            className={`w-4 h-4 text-white/40 transition-transform duration-200 ${
              expanded ? "rotate-180" : ""
            }`}
          />
        </div>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 border-t border-white/10 pt-3">
              {children}
              {classKeys.length === 0 ? (
                <p className="text-white/30 text-sm font-body text-center py-3">
                  No classes assigned yet
                </p>
              ) : (
                <div className="space-y-2">
                  <p className="text-white/50 text-xs font-body mb-1">
                    {teacherStudents.length} student(s) across {classKeys.length} class(es)
                  </p>
                  {classKeys.map((cls) => {
                    const sections = tree[cls];
                    const sectionKeys = Object.keys(sections).sort();
                    const classCount = sectionKeys.reduce(
                      (sum, sec) => sum + sections[sec].length,
                      0,
                    );
                    const classOpen = !!openClasses[cls];
                    return (
                      <div
                        key={cls}
                        className="rounded-lg border border-white/10 bg-white/5 overflow-hidden"
                      >
                        <button
                          type="button"
                          onClick={() => toggleClass(cls)}
                          className="w-full flex items-center justify-between px-3 py-2 hover:bg-white/5 transition-colors"
                        >
                          <span className="flex items-center gap-2 text-sm font-body text-white/90">
                            <BookOpen className="w-3.5 h-3.5 text-neon-blue" />
                            Class {cls}
                          </span>
                          <span className="flex items-center gap-2">
                            <span className="text-xs font-body text-white/50 bg-white/10 px-2 py-0.5 rounded">
                              {classCount}
                            </span>
                            <ChevronDown
                              className={`w-3.5 h-3.5 text-white/40 transition-transform ${
                                classOpen ? "rotate-180" : ""
                              }`}
                            />
                          </span>
                        </button>

                        <AnimatePresence>
                          {classOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.18 }}
                              className="overflow-hidden"
                            >
                              <div className="px-2 pb-2 space-y-1.5 border-t border-white/5">
                                {sectionKeys.map((sec) => {
                                  const key = `${cls}-${sec}`;
                                  const secStudents = sections[sec];
                                  const secOpen = !!openSections[key];
                                  return (
                                    <div
                                      key={key}
                                      className="rounded-md bg-white/[0.03] border border-white/5 overflow-hidden"
                                    >
                                      <button
                                        type="button"
                                        onClick={() => toggleSection(key)}
                                        className="w-full flex items-center justify-between px-3 py-1.5 hover:bg-white/5 transition-colors"
                                      >
                                        <span className="flex items-center gap-2 text-xs font-body text-white/80">
                                          <Layers className="w-3 h-3 text-neon-green" />
                                          Section {sec}
                                        </span>
                                        <span className="flex items-center gap-2">
                                          <span className="text-[10px] font-body text-white/50 bg-white/10 px-1.5 py-0.5 rounded">
                                            {secStudents.length}
                                          </span>
                                          <ChevronDown
                                            className={`w-3 h-3 text-white/40 transition-transform ${
                                              secOpen ? "rotate-180" : ""
                                            }`}
                                          />
                                        </span>
                                      </button>

                                      <AnimatePresence>
                                        {secOpen && (
                                          <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.15 }}
                                            className="overflow-hidden"
                                          >
                                            <div className="px-2 pb-2 pt-1 max-h-64 overflow-auto space-y-1">
                                              {secStudents.length === 0 ? (
                                                <p className="text-white/30 text-xs font-body text-center py-2">
                                                  No students in this section yet
                                                </p>
                                              ) : (
                                                secStudents
                                                  .slice()
                                                  .sort((a, b) =>
                                                    (a.rollNo || "").localeCompare(
                                                      b.rollNo || "",
                                                      undefined,
                                                      { numeric: true },
                                                    ),
                                                  )
                                                  .map((s) => (
                                                    <div
                                                      key={s.id}
                                                      className="flex items-center justify-between py-1 px-2 rounded bg-white/5 text-xs"
                                                    >
                                                      <span className="text-white/80 font-body truncate">
                                                        {s.name}
                                                      </span>
                                                      <span className="text-white/40 font-body shrink-0 ml-2">
                                                        Roll {s.rollNo}
                                                      </span>
                                                    </div>
                                                  ))
                                              )}
                                            </div>
                                          </motion.div>
                                        )}
                                      </AnimatePresence>
                                    </div>
                                  );
                                })}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ExpandableTeacherCard;
