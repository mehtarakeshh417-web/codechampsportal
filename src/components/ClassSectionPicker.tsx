import { useMemo } from "react";
import { useClassFormatter } from "@/lib/classNames";

export interface ClassSectionPickerProps {
  /** Teacher's assigned "class-section" strings, e.g. ["6th-A", "6th-B", "7th-A"] */
  classes: string[];
  selectedClass: string;
  selectedSections: string[];
  onChange: (className: string, sections: string[]) => void;
  label?: string;
}

/** Groups ["6th-A","6th-B"] into { "6th": ["A","B"] } */
export const groupClassSections = (classes: string[]) => {
  const groups: Record<string, string[]> = {};
  classes.forEach((c) => {
    const [cls, sec = "A"] = String(c).split("-");
    if (!cls) return;
    if (!groups[cls]) groups[cls] = [];
    if (!groups[cls].includes(sec)) groups[cls].push(sec);
  });
  Object.values(groups).forEach((s) => s.sort());
  return groups;
};

const ClassSectionPicker = ({
  classes,
  selectedClass,
  selectedSections,
  onChange,
  label = "Assign To",
}: ClassSectionPickerProps) => {
  const fmtClass = useClassFormatter();
  const groups = useMemo(() => groupClassSections(classes), [classes]);
  const classKeys = Object.keys(groups).sort();
  const sections = groups[selectedClass] || [];
  const allSelected = sections.length > 0 && selectedSections.length === sections.length;

  const toggleSection = (sec: string) => {
    const next = selectedSections.includes(sec)
      ? selectedSections.filter((s) => s !== sec)
      : [...selectedSections, sec];
    onChange(selectedClass, next.sort());
  };

  if (classKeys.length === 0) {
    return (
      <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3">
        <p className="text-white/50 text-sm font-body">No classes assigned to you yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3">
      <div>
        <p className="text-xs text-white/60 font-body uppercase tracking-wider mb-2">{label} · Class</p>
        <div className="flex flex-wrap gap-2">
          {classKeys.map((cls) => {
            const active = cls === selectedClass;
            return (
              <label
                key={cls}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-body cursor-pointer border transition-colors ${
                  active
                    ? "bg-primary/20 text-primary border-primary/40"
                    : "bg-white/5 text-white/60 border-white/10 hover:bg-white/10"
                }`}
              >
                <input
                  type="radio"
                  name="class-section-picker-class"
                  className="accent-current w-3 h-3"
                  checked={active}
                  onChange={() => onChange(cls, [(groups[cls] || [])[0]].filter(Boolean))}
                />
                {fmtClass(cls)}
              </label>
            );
          })}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs text-white/60 font-body uppercase tracking-wider">Sections</p>
          {sections.length > 1 && (
            <button
              type="button"
              onClick={() => onChange(selectedClass, allSelected ? [sections[0]] : [...sections])}
              className="text-[11px] font-body text-neon-blue hover:underline"
            >
              {allSelected ? "Clear all" : "Select all"}
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {sections.length === 0 ? (
            <p className="text-white/40 text-xs font-body">Pick a class first.</p>
          ) : (
            sections.map((sec) => {
              const active = selectedSections.includes(sec);
              return (
                <label
                  key={sec}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-body cursor-pointer border transition-colors ${
                    active
                      ? "bg-neon-green/20 text-neon-green border-neon-green/40"
                      : "bg-white/5 text-white/60 border-white/10 hover:bg-white/10"
                  }`}
                >
                  <input
                    type="checkbox"
                    className="accent-current w-3 h-3"
                    checked={active}
                    onChange={() => toggleSection(sec)}
                  />
                  Section {sec}
                </label>
              );
            })
          )}
        </div>
        {selectedSections.length > 0 && (
          <p className="text-[11px] text-white/40 font-body mt-2">
            Will be sent to {fmtClass(selectedClass)} — Section{selectedSections.length > 1 ? "s" : ""}{" "}
            {selectedSections.join(", ")}
          </p>
        )}
      </div>
    </div>
  );
};

export default ClassSectionPicker;
