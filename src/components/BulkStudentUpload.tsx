import { useRef, useState } from "react";
import { Download, FileText, Loader2, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import * as XLSX from "xlsx";
import { createStudentAuthAccount, normalizeClass } from "@/lib/studentAccounts";

interface BulkStudentUploadProps {
  schoolId: string;
  teachers: { id: string; firstName: string; lastName: string; classes: string[] }[];
  sections: string[];
  onComplete: (createdRows?: any[]) => void;
  allowedClasses?: string[];
  defaultTeacherId?: string;
}

interface ParsedRow {
  name: string;
  email: string;
  password: string;
  className: string;
  error?: string;
}

const DEFAULT_CLASSES = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th"];

const readCell = (row: Record<string, unknown>, ...keys: string[]) => {
  for (const key of keys) {
    const value = row[key];
    if (value !== undefined && value !== null) return String(value).trim();
  }
  return "";
};

const stripContextColumns = (rows: any[]) => rows.map(({ tenant_id, created_by, ...row }) => row);

const BulkStudentUpload = ({ schoolId, teachers, sections, onComplete, allowedClasses, defaultTeacherId }: BulkStudentUploadProps) => {
  const queryClient = useQueryClient();
  const fileRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState<ParsedRow[]>([]);
  const [uploading, setUploading] = useState(false);
  const [summary, setSummary] = useState<string | null>(null);

  const validClasses = (allowedClasses?.length ? allowedClasses : DEFAULT_CLASSES).map(normalizeClass);
  const defaultSection = sections[0] || "A";

  const getActualSchoolId = async () => {
    const { data: school } = await supabase.from("schools").select("id").eq("user_id", schoolId).maybeSingle();
    return school?.id || schoolId;
  };

  const downloadTemplate = () => {
    const worksheet = XLSX.utils.aoa_to_sheet([
      ["Name", "Email", "Password", "Class"],
      ["Rahul Kumar", "rahul.kumar@example.com", "pass123", validClasses[0] || "3rd"],
      ["Priya Singh", "priya.singh@example.com", "pass123", validClasses[1] || "5th"],
    ]);
    worksheet["!cols"] = [{ wch: 24 }, { wch: 30 }, { wch: 18 }, { wch: 14 }];
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
        const parsed = data.map((item) => {
          const name = readCell(item, "Name", "Student Name", "StudentName", "name");
          const email = readCell(item, "Email", "Username", "User Name", "email", "username");
          const password = readCell(item, "Password", "Pass", "password");
          const rawClass = readCell(item, "Class", "class", "Grade", "grade");
          const className = normalizeClass(rawClass);
          const errors: string[] = [];
          if (!name) errors.push("Name required");
          if (!email) errors.push("Email required");
          if (!password) errors.push("Password required");
          if (!className || !validClasses.includes(className)) errors.push(`Invalid class ${rawClass || "blank"}`);
          return { name, email, password, className, error: errors.join(", ") || undefined };
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
    const validRows = rows.filter((row) => !row.error);
    if (!validRows.length) {
      toast.error("No valid students to upload");
      return;
    }

    setUploading(true);
    setSummary(null);
    try {
      const { data: sessionData } = await supabase.auth.getUser();
      const createdBy = sessionData.user?.id;
      if (!createdBy) throw new Error("Please login again before uploading students");

      const actualSchoolId = await getActualSchoolId();
      const tenantId = actualSchoolId;
      const authAccounts = [];
      for (const row of validRows) {
        const account = await createStudentAuthAccount(row.email, row.password, row.name);
        authAccounts.push(account);
      }

      const studentRows = validRows.map((row, index) => {
        const teacher = defaultTeacherId
          ? teachers.find((item) => item.id === defaultTeacherId)
          : teachers.find((item) => item.classes.some((teacherClass) => normalizeClass(teacherClass) === row.className || teacherClass.startsWith(row.className)));
        return {
          user_id: authAccounts[index].userId,
          school_id: actualSchoolId,
          tenant_id: tenantId,
          created_by: createdBy,
          teacher_id: teacher?.id || null,
          name: row.name,
          father_name: "",
          class: row.className,
          section: defaultSection,
          roll_no: "",
          xp: 0,
          progress: 0,
        };
      });

      let insertResult = await supabase.from("students").insert(studentRows as any).select();
      if (insertResult.error && /tenant_id|created_by|schema cache/i.test(insertResult.error.message || "")) {
        insertResult = await supabase.from("students").insert(stripContextColumns(studentRows) as any).select();
      }
      if (insertResult.error) throw insertResult.error;

      const createdRows = (insertResult.data || []).map((student: any, index: number) => ({
        ...student,
        username: validRows[index]?.email || "",
        password: validRows[index]?.password || "",
      }));

      await queryClient.invalidateQueries({ queryKey: ["students"] });
      await queryClient.invalidateQueries({ queryKey: ["dashboardMetrics"] });
      await queryClient.invalidateQueries({ queryKey: ["dashboard-metrics"] });
      await queryClient.invalidateQueries({ queryKey: ["metrics"] });

      onComplete(createdRows);
      setRows([]);
      setSummary(`${createdRows.length} student(s) uploaded successfully.`);
      toast.success(`${createdRows.length} student(s) uploaded successfully`);
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
        <div className="glass-card p-5 mt-4 space-y-4 absolute right-0 z-20 w-[min(92vw,34rem)]">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="font-display text-lg font-bold text-foreground">Student Upload</h2>
              <p className="font-body text-sm text-muted-foreground">Template columns: Name, Email, Password, Class.</p>
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
                      <th className="px-2 py-2 text-left">Email</th>
                      <th className="px-2 py-2 text-left">Class</th>
                      <th className="px-2 py-2 text-left">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row, index) => (
                      <tr key={`${row.email}-${index}`} className="border-t border-border">
                        <td className="px-2 py-2 text-foreground">{row.name}</td>
                        <td className="px-2 py-2 text-muted-foreground">{row.email}</td>
                        <td className="px-2 py-2 text-muted-foreground">{row.className}</td>
                        <td className={row.error ? "px-2 py-2 text-destructive" : "px-2 py-2 text-primary"}>{row.error || "Ready"}</td>
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

export default BulkStudentUpload;
