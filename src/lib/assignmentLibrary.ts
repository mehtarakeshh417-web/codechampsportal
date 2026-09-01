// Local, per-teacher library of reusable assignments.
// Stored in the browser so teachers can re-send past assignments to any class.

export interface LibraryQuestion {
  id: string;
  type: "mcq" | "truefalse" | "descriptive";
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation?: string;
}

export interface LibraryAssignment {
  id: string;
  title: string;
  subject: string;
  difficultyLevel: string;
  assignmentType: string;
  questions: LibraryQuestion[];
  attachmentUrl?: string;
  attachmentName?: string;
  savedAt: string;
}

const keyFor = (teacherId: string) => `cc_assignment_library_${teacherId || "anon"}`;

export const listLibrary = (teacherId: string): LibraryAssignment[] => {
  try {
    const raw = localStorage.getItem(keyFor(teacherId));
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const saveToLibrary = (teacherId: string, entry: Omit<LibraryAssignment, "id" | "savedAt">) => {
  const item: LibraryAssignment = {
    ...entry,
    id: `lib_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    savedAt: new Date().toISOString(),
  };
  const next = [item, ...listLibrary(teacherId)].slice(0, 100);
  try {
    localStorage.setItem(keyFor(teacherId), JSON.stringify(next));
  } catch {
    /* storage full or blocked */
  }
  return item;
};

export const removeFromLibrary = (teacherId: string, id: string) => {
  const next = listLibrary(teacherId).filter((a) => a.id !== id);
  try {
    localStorage.setItem(keyFor(teacherId), JSON.stringify(next));
  } catch {
    /* storage blocked */
  }
  return next;
};

/** Description payload used to carry an uploaded assignment file on the record. */
export const encodeAttachment = (url?: string, name?: string, note = "") =>
  url ? JSON.stringify({ note, attachmentUrl: url, attachmentName: name || "assignment-file" }) : note;

export const decodeAttachment = (description?: string | null) => {
  if (!description) return { note: "", attachmentUrl: "", attachmentName: "" };
  try {
    const parsed = JSON.parse(description);
    if (parsed && typeof parsed === "object" && parsed.attachmentUrl) {
      return {
        note: parsed.note || "",
        attachmentUrl: String(parsed.attachmentUrl),
        attachmentName: String(parsed.attachmentName || "assignment-file"),
      };
    }
  } catch {
    /* plain text description */
  }
  return { note: description, attachmentUrl: "", attachmentName: "" };
};
