import { useRef, useState } from "react";
import { Download, FileText, Loader2, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import * as XLSX from "xlsx";
import { createStudentAuthAccount, normalizeClass } from "@/lib/studentAccounts";

interface ClientStudentBulkUploadProps {
  schoolId: string;
  teachers: { id: string; firstName: string; lastName: string; classes: string[] }[];
  sections: string[];
  onComplete: (createdRows?: any[]) => void;
  allowedClasses?: string[];
  allowedSections?: string[];
  defaultTeacherId?: string;
}

type RowStatus = "ready" | "creating" | "created" | "failed";

interface ParsedRow {
  name: string;
  className: string;
  section: string;
  rollNo: string;
  username: string;
  password: string;
  teacherInput: string;
  resolvedTeacherId: string | null;
  error?: string;
  status?: RowStatus;
  statusMessage?: string;
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const CHUNK_SIZE = 5;
const CHUNK_DELAY_MS = 1200;
const RETRY_BACKOFFS = [2000, 4000, 8000];
const isRateLimitError = (error: any) => /rate limit|429|too many/i.test(error?.message || error?.error_description || "");

const DEFAULT_CLASSES = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th"];

const readCell = (row: Record<string, unknown>, ...keys: string[]) => {
  for (const key of keys) {
    const value = row[key];
    if (value !== undefined && value !== null && String(value).trim() !== "") return String(value).trim();
  }
  return "";
};

const stripContextColumns = (rows: any[]) => rows.map(({ tenant_id, created_by, ...row }) => row);

const ClientStudentBulkUpload = ({ schoolId, teachers, sections, onComplete, allowedClasses, allowedSections, defaultTeacherId }: ClientStudentBulkUploadProps) => {
  const queryClient = useQueryClient();
  const fileRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState<ParsedRow[]>([]);
  const [uploading, setUploading] = useState(false);
  const [summary, setSummary] = useState<string | null>(null);

  const validClasses = (allowedClasses?.length ? allowedClasses : DEFAULT_CLASSES).map(normalizeClass);
  const validSections = allowedSections?.length ? allowedSections : sections;

  const getActualSchoolId = async () => {
    const { data: school } = await supabase.from("schools").select("id").eq("user_id", schoolId).maybeSingle();
    return school?.id || schoolId;
  };

  const downloadTemplate = () => {
    const worksheet = XLSX.utils.aoa_to_sheet([
      ["Student Name", "Class", "Section", "Roll No", "Username", "Password", "Teacher"],
      ["Rahul Kumar", validClasses[0] || "3rd", validSections[0] || "A", "1", "rahul01", "pass123", ""],
      ["Priya Singh", validClasses[1] || "5th", validSections[0] || "A", "2", "priya02", "pass123", ""],
    ]);
    worksheet["!cols"] = [{ wch: 24 }, { wch: 10 }, { wch: 10 }, { wch: 10 }, { wch: 18 }, { wch: 14 }, { wch: 22 }];
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Students");
    XLSX.writeFile(workbook, "student_onboarding_template.xlsx");
    toast.success("Template downloaded");
  };

  const parseFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setSummary(null);

    const reader = new FileReader();
    reader.onload = (loadEvent) => {
      try {
        const workbook = XLSX.read(loadEvent.target?.result, { type: "binary" });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const data = XLSX.utils.sheet_to_json<Record<string, unknown>>(worksheet, { defval: "" });
        const parsed: ParsedRow[] = data.map((item) => {
          const name = readCell(item, "Student Name", "Name", "StudentName", "name");
          const rawClass = readCell(item, "Class", "class", "Grade", "grade");
          const className = normalizeClass(rawClass);
          const section = readCell(item, "Section", "section", "Sec");
          const rollNo = readCell(item, "Roll No", "Roll No.", "RollNo", "Roll Number", "Roll", "roll_no");
          const username = readCell(item, "Username", "User Name", "username");
          const password = readCell(item, "Password", "Pass", "password");
          const teacherInput = readCell(item, "Teacher", "Teacher Username", "Teacher Name", "teacher");
          const errors: string[] = [];
          if (!name) errors.push("Name required");
          if (!className || !validClasses.includes(className)) errors.push(`Invalid class ${rawClass || "blank"}`);
          if (!section) errors.push("Section required");
          if (!rollNo) errors.push("Roll No required");
          if (!username) errors.push("Username required");
          if (!password) errors.push("Password required");

          let resolvedTeacherId: string | null = defaultTeacherId || null;
          if (!resolvedTeacherId) {
            if (teacherInput) {
              const needle = teacherInput.trim().toLowerCase();
              const byUsername = teachers.find((t) => (t as any).username?.toLowerCase?.() === needle);
              const byFull = teachers.find((t) => `${t.firstName} ${t.lastName}`.trim().toLowerCase() === needle);
              const byFirstMatches = teachers.filter((t) => t.firstName.trim().toLowerCase() === needle);
              const byLastMatches = teachers.filter((t) => t.lastName.trim().toLowerCase() === needle);
              const match =
                byUsername ||
                byFull ||
                (byFirstMatches.length === 1 ? byFirstMatches[0] : undefined) ||
                (byLastMatches.length === 1 ? byLastMatches[0] : undefined);
              if (match) {
                resolvedTeacherId = match.id;
              } else {
                errors.push(`Unknown teacher '${teacherInput}'`);
              }
            } else if (className && section) {
              const matches = teachers.filter((t) =>
                t.classes.some((tc) => {
                  const [cls, sec] = tc.split("-");
                  return normalizeClass(cls) === className && (sec || "A") === section;
                }),
              );
              if (matches.length === 1) {
                resolvedTeacherId = matches[0].id;
              } else if (matches.length > 1) {
                errors.push(
                  `Ambiguous teacher for ${className}-${section} (${matches
                    .map((m) => `${m.firstName} ${m.lastName}`)
                    .join(", ")}); fill Teacher column`,
                );
              } else {
                errors.push(`No teacher assigned to ${className}-${section}; fill Teacher column`);
              }
            }
          }

          return {
            name,
            className,
            section,
            rollNo,
            username,
            password,
            teacherInput,
            resolvedTeacherId,
            error: errors.join(", ") || undefined,
          };
        });
        setRows(parsed);
        if (parsed.length === 0) toast.error("No rows found in the file");
      } catch (error: any) {
        toast.error(error?.message || "Could not read the selected file");
      }
    };
    reader.readAsBinaryString(file);
    if (fileRef.current) fileRef.current.value = "";
  };

  const createStudents = async () => {
    const targetIndexes = rows
      .map((row, index) => ({ row, index }))
      .filter(({ row }) => !row.error && row.status !== "created");
    if (!targetIndexes.length) {
      toast.error("No valid students to upload");
      return;
    }

    setUploading(true);
    setSummary(null);

    if (targetIndexes.length > 30) {
      toast.message("Large batch — this will take ~1 minute due to sign‑up limits");
    }

    // Reset status on rows we're about to process
    setRows((prev) => prev.map((row, i) => (targetIndexes.find((t) => t.index === i) ? { ...row, status: "creating", statusMessage: undefined } : row)));

    try {
      const { data: sessionData } = await supabase.auth.getUser();
      const createdBy = sessionData.user?.id;
      if (!createdBy) throw new Error("Please login again before uploading students");

      const actualSchoolId = await getActualSchoolId();
      const tenantId = actualSchoolId;

      type Signed = { index: number; userId: string };
      const signed: Signed[] = [];

      const signUpOne = async ({ row, index }: { row: ParsedRow; index: number }) => {
        setRows((prev) => prev.map((r, i) => (i === index ? { ...r, status: "creating" } : r)));
        let lastError: any = null;
        for (let attempt = 0; attempt <= RETRY_BACKOFFS.length; attempt++) {
          try {
            const account = await createStudentAuthAccount(row.username, row.password, row.name);
            signed.push({ index, userId: account.userId });
            return;
          } catch (err: any) {
            lastError = err;
            if (isRateLimitError(err) && attempt < RETRY_BACKOFFS.length) {
              await sleep(RETRY_BACKOFFS[attempt]);
              continue;
            }
            break;
          }
        }
        setRows((prev) => prev.map((r, i) => (i === index ? { ...r, status: "failed", statusMessage: lastError?.message || "Sign-up failed" } : r)));
      };

      for (let i = 0; i < targetIndexes.length; i += CHUNK_SIZE) {
        const chunk = targetIndexes.slice(i, i + CHUNK_SIZE);
        for (const item of chunk) {
          await signUpOne(item);
        }
        if (i + CHUNK_SIZE < targetIndexes.length) await sleep(CHUNK_DELAY_MS);
      }

      if (!signed.length) {
        throw new Error("All sign-ups failed. Please retry shortly.");
      }

      const studentRows = signed.map(({ index, userId }) => {
        const row = rows[index];
        return {
          user_id: userId,
          school_id: actualSchoolId,
          tenant_id: tenantId,
          created_by: createdBy,
          teacher_id: row.resolvedTeacherId || defaultTeacherId || null,
          name: row.name,
          father_name: "",
          class: row.className,
          section: row.section,
          roll_no: row.rollNo,
          xp: 0,
          progress: 0,
        };
      });


      let insertResult = await supabase.from("students").insert(studentRows as any).select();
      if (insertResult.error && /tenant_id|created_by|schema cache/i.test(insertResult.error.message || "")) {
        insertResult = await supabase.from("students").insert(stripContextColumns(studentRows) as any).select();
      }
      if (insertResult.error) throw insertResult.error;

      const createdRows = (insertResult.data || []).map((student: any, i: number) => {
        const sourceRow = rows[signed[i].index];
        return { ...student, username: sourceRow?.username || "", password: sourceRow?.password || "" };
      });

      // Mark signed rows as created
      setRows((prev) => {
        const next = [...prev];
        signed.forEach(({ index }) => {
          next[index] = { ...next[index], status: "created" };
        });
        // Keep only failed rows for retry; drop created ones
        return next.filter((r) => r.status === "failed" || r.error);
      });

      await queryClient.invalidateQueries({ queryKey: ["students"] });
      await queryClient.invalidateQueries({ queryKey: ["dashboardMetrics"] });
      await queryClient.invalidateQueries({ queryKey: ["dashboard-metrics"] });
      await queryClient.invalidateQueries({ queryKey: ["metrics"] });

      onComplete(createdRows);
      const failedCount = targetIndexes.length - signed.length;
      setSummary(
        failedCount > 0
          ? `${createdRows.length} created. ${failedCount} failed — click "Create" again to retry those.`
          : `${createdRows.length} student(s) uploaded successfully.`,
      );
      toast.success(`${createdRows.length} student(s) uploaded${failedCount > 0 ? `, ${failedCount} failed` : ""}`);
    } catch (error: any) {
      toast.error(error?.message || "Bulk upload failed");
    } finally {
      setUploading(false);
    }
  };

  const errorCount = rows.filter((row) => row.error).length;
  const validCount = rows.length - errorCount;

  return (
    <div className="relative">
      <Button variant="hero" size="xl" onClick={() => setOpen((value) => !value)}>
        <Upload className="w-6 h-6 mr-2" /> Upload Students
      </Button>

      {open && (
        <div className="glass-card p-5 mt-4 space-y-4 absolute right-0 z-20 w-[min(92vw,38rem)]">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="font-display text-lg font-bold text-foreground">Student Upload</h2>
              <p className="font-body text-sm text-muted-foreground">Columns: Student Name, Class, Section, Roll No, Username, Password.</p>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setOpen(false)}><X className="w-5 h-5" /></Button>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button variant="glass" size="sm" onClick={downloadTemplate}>
              <Download className="w-4 h-4 mr-2" /> Download Template
            </Button>
            <label className="inline-flex items-center justify-center gap-2 rounded-md border border-border px-3 py-2 text-sm font-medium text-foreground cursor-pointer hover:bg-accent transition-colors">
              <FileText className="w-4 h-4" /> Select File
              <input ref={fileRef} type="file" accept=".xlsx,.xls,.csv" onChange={parseFile} className="hidden" />
            </label>
          </div>

          {rows.length > 0 && (
            <div className="space-y-3">
              <div className="flex gap-3 text-sm text-muted-foreground">
                <span>{rows.length} row(s)</span>
                <span>{validCount} valid</span>
                {errorCount > 0 && <span className="text-destructive">{errorCount} error(s)</span>}
              </div>
              <div className="max-h-56 overflow-auto rounded-lg border border-border">
                <table className="w-full text-xs">
                  <thead className="bg-muted sticky top-0">
                    <tr className="text-muted-foreground">
                      <th className="px-2 py-2 text-left">Name</th>
                      <th className="px-2 py-2 text-left">Class</th>
                      <th className="px-2 py-2 text-left">Sec</th>
                      <th className="px-2 py-2 text-left">Roll</th>
                      <th className="px-2 py-2 text-left">Username</th>
                      <th className="px-2 py-2 text-left">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row, index) => (
                      <tr key={`${row.username}-${index}`} className="border-t border-border">
                        <td className="px-2 py-2 text-foreground">{row.name}</td>
                        <td className="px-2 py-2 text-muted-foreground">{row.className}</td>
                        <td className="px-2 py-2 text-muted-foreground">{row.section}</td>
                        <td className="px-2 py-2 text-muted-foreground">{row.rollNo}</td>
                        <td className="px-2 py-2 text-muted-foreground">{row.username}</td>
                        <td className={row.error || row.status === "failed" ? "px-2 py-2 text-destructive" : row.status === "created" ? "px-2 py-2 text-primary" : row.status === "creating" ? "px-2 py-2 text-muted-foreground" : "px-2 py-2 text-primary"}>
                          {row.error || (row.status === "failed" ? `Failed: ${row.statusMessage || "error"}` : row.status === "creating" ? "Creating…" : row.status === "created" ? "Created" : "Ready")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="ghost" onClick={() => setRows([])}>Clear</Button>
                <Button variant="hero" onClick={createStudents} disabled={uploading || validCount === 0 || errorCount > 0}>
                  {uploading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Uploading...</> : `Create ${validCount} Student(s)`}
                </Button>
              </div>
            </div>
          )}

          {summary && <p className="text-sm text-primary font-body">{summary}</p>}
        </div>
      )}
    </div>
  );
};

export default ClientStudentBulkUpload;
