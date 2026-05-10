// Map topic titles → Coding Lab editor key (used as ?editor= query param on /dashboard/coding-lab)
// The key must match a value in StudentCodingLab's editorMeta map.

export interface LabMapping {
  editor: string;
  label: string;
}

const RULES: { match: RegExp; editor: string; label: string }[] = [
  { match: /scratchjr|scratch jr/i,           editor: "scratchjr",    label: "ScratchJr Studio" },
  { match: /scratch/i,                         editor: "scratch",      label: "Scratch 3.0 Studio" },
  { match: /paint/i,                           editor: "mspaint",      label: "MS Paint" },
  { match: /\bword\b|documentation/i,          editor: "msword",       label: "MS Word" },
  { match: /excel|spreadsheet/i,               editor: "msexcel",      label: "MS Excel" },
  { match: /powerpoint|presentation/i,         editor: "mspowerpoint", label: "PowerPoint" },
  { match: /gimp/i,                            editor: "gimp",         label: "GIMP" },
  { match: /krita/i,                           editor: "krita",        label: "Krita" },
  { match: /html|css|web (designing|app)|forms and multimedia/i, editor: "html", label: "HTML / CSS Editor" },
  { match: /python|file handling|data visualization/i, editor: "python", label: "Python Editor" },
  { match: /java/i,                            editor: "java",         label: "Java Editor" },
  { match: /access|database|sql|dbms/i,        editor: "msexcel",      label: "Database Practice (Excel)" },
];

export const getLabForTopic = (title: string): LabMapping | null => {
  for (const r of RULES) {
    if (r.match.test(title)) return { editor: r.editor, label: r.label };
  }
  return null;
};
