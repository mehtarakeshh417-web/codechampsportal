import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Download, FileText, X, AlertTriangle, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import * as XLSX from "xlsx";

interface BulkStudentUploadProps {
  schoolId: string;
  teachers: { id: string; firstName: string; lastName: string; classes: string[] }[];
  sections: string[];
  onComplete: () => void;
}

interface ParsedRow {
  name: string;
  fatherName: string;
  class: string;
  section: string;
  rollNo: string;
  teacherName: string;
  username: string;
  password: string;
  error?: string;
}

const CLASS_OPTIONS = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th"];

const usernameToEmail = (username: string) => `${username}@codechamps.local`;

const BulkStudentUpload = ({ schoolId, teachers, sections, onComplete }: BulkStudentUploadProps) => {
  const [show, setShow] = useState(false);
  const [parsedRows, setParsedRows] = useState<ParsedRow[]>([]);
  const [uploading, setUploading] = useState(false);
  const [results, setResults] = useState<{ name: string; success: boolean; username?: string; password?: string; error?: string }[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);

  const downloadTemplate = () => {
    const wb = XLSX.utils.book_new();
    const headers = ["Student Name", "Father Name", "Class", "Section", "Roll No", "Teacher Name", "Username", "Password"];
    const sampleData = [
      ["Rahul Kumar", "Suresh Kumar", "1st", "A", "1", teachers[0] ? `${teachers[0].firstName} ${teachers[0].lastName}` : "Teacher Name", "rahul_k1", "pass1234"],
      ["Priya Singh", "Rajesh Singh", "1st", "B", "2", teachers[0] ? `${teachers[0].firstName} ${teachers[0].lastName}` : "Teacher Name", "priya_s2", "pass5678"],
    ];
    const ws = XLSX.utils.aoa_to_sheet([headers, ...sampleData]);
    ws["!cols"] = headers.map(() => ({ wch: 18 }));
    XLSX.utils.book_append_sheet(wb, ws, "Students");

    // Add a reference sheet with valid values
    const refHeaders = ["Valid Classes", "Valid Sections", "Available Teachers"];
    const maxRows = Math.max(CLASS_OPTIONS.length, sections.length, teachers.length);
    const refData: string[][] = [];
    for (let i = 0; i < maxRows; i++) {
      refData.push([
        CLASS_OPTIONS[i] || "",
        sections[i] || "",
        teachers[i] ? `${teachers[i].firstName} ${teachers[i].lastName}` : "",
      ]);
    }
    const refWs = XLSX.utils.aoa_to_sheet([refHeaders, ...refData]);
    refWs["!cols"] = refHeaders.map(() => ({ wch: 22 }));
    XLSX.utils.book_append_sheet(wb, refWs, "Reference (Valid Values)");

    XLSX.writeFile(wb, "student_bulk_upload_template.xlsx");
    toast.success("Template downloaded!");
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setResults([]);

    const reader = new FileReader();
    reader.onload = async (evt) => {
      try {
        const wb = XLSX.read(evt.target?.result, { type: "binary" });
        const ws = wb.Sheets[wb.SheetNames[0]];
        const data = XLSX.utils.sheet_to_json<Record<string, string>>(ws);

        const getVal = (row: Record<string, string>, ...keys: string[]): string => {
          for (const k of keys) {
            const val = row[k];
            if (val !== undefined && val !== null) return String(val).trim();
          }
          return "";
        };

        const rows: ParsedRow[] = data.map((row) => {
          const name = getVal(row, "Student Name", "Name", "Student_Name", "name", "student name");
          const fatherName = getVal(row, "Father Name", "Father_Name", "FatherName", "father name", "Father's Name");
          const cls = getVal(row, "Class", "class");
          const section = getVal(row, "Section", "section");
          const rollNo = getVal(row, "Roll No", "Roll", "RollNo", "roll_no", "roll no", "roll");
          const teacherName = getVal(row, "Teacher Name", "Teacher", "TeacherName", "teacher name", "teacher");
          const username = getVal(row, "Username", "username", "User Name", "user_name", "UserName");
          const password = getVal(row, "Password", "password", "Pass", "pass");

          const errors: string[] = [];
          if (!name) errors.push("Name required");
          if (!fatherName) errors.push("Father name required");
          if (!cls || !CLASS_OPTIONS.includes(cls)) errors.push(`Invalid class "${cls}"`);
          if (!section || !sections.includes(section)) errors.push(`Invalid section "${section}"`);
          if (!rollNo) errors.push("Roll no required");
          if (!username) errors.push("Username required");
          else if (!/^[a-zA-Z0-9._-]+$/.test(username)) errors.push("Username: only letters, numbers, dots, hyphens, underscores");
          else if (password.length < 6) errors.push("Password min 6 chars");

          // Find teacher
          const matchedTeacher = teachers.find(
            (t) => `${t.firstName} ${t.lastName}`.toLowerCase() === teacherName.toLowerCase()
          );
          if (!matchedTeacher) errors.push(`Teacher "${teacherName}" not found`);

          return {
            name, fatherName, class: cls, section, rollNo,
            teacherName, username, password,
            error: errors.length > 0 ? errors.join(", ") : undefined,
          };
        });

        const errorRows = rows.filter((r) => r.error);
        const validRows = rows.filter((r) => !r.error);

        if (rows.length === 0) {
          toast.error("No data found in file");
        } else if (errorRows.length > 0 && validRows.length === 0) {
          setParsedRows(rows);
          toast.error(`All ${errorRows.length} row(s) have errors. Fix and re-upload.`);
        } else if (errorRows.length > 0) {
          setParsedRows(rows);
          toast.error(`${errorRows.length} row(s) have errors. ${validRows.length} valid row(s) will be created automatically after you review.`);
        } else {
          // All valid — create immediately
          setParsedRows(rows);
          await handleBulkCreate(validRows);
        }
      } catch {
        toast.error("Failed to parse file. Use the template format.");
      }
    };
    reader.readAsBinaryString(file);
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleBulkCreate = async (rowsToProcess?: ParsedRow[]) => {
    const validRows = rowsToProcess || parsedRows.filter((r) => !r.error);
    if (validRows.length === 0) {
      toast.error("No valid rows to process");
      return;
    }

    setUploading(true);
    const newResults: typeof results = [];

    try {
      // Prepare bulk user creation payload
      const usersPayload = validRows.map((row) => ({
        email: usernameToEmail(row.username),
        password: row.password,
        role: "student" as const,
        metadata: { display_name: row.name },
      }));

      // Create all auth users in bulk via edge function
      const { data: bulkResult, error: bulkError } = await supabase.functions.invoke("manage-users", {
        body: { action: "create_users_bulk", users: usersPayload },
      });

      if (bulkError) {
        toast.error(`Bulk creation failed: ${bulkError.message}`);
        setUploading(false);
        return;
      }

      const createdUsers = bulkResult?.users || [];
      const bulkErrors = bulkResult?.errors || [];

      // Map created users back to rows by email
      const userByEmail = new Map<string, any>();
      for (const u of createdUsers) {
        userByEmail.set(u.email, u);
      }

      // Now insert student records for successfully created users
      // Also find the actual school table ID
      const { data: schoolRecord } = await supabase.from("schools").select("id").eq("user_id", schoolId).maybeSingle();
      const actualSchoolId = schoolRecord?.id || schoolId;

      for (const row of validRows) {
        const email = usernameToEmail(row.username);
        const createdUser = userByEmail.get(email);

        if (!createdUser) {
          const matchingError = bulkErrors.find((e: string) => e.startsWith(email));
          newResults.push({ name: row.name, success: false, error: matchingError || "Auth user creation failed" });
          continue;
        }

        const matchedTeacher = teachers.find(
          (t) => `${t.firstName} ${t.lastName}`.toLowerCase() === row.teacherName.toLowerCase()
        );

        const { error: insertErr } = await supabase.from("students").insert({
          user_id: createdUser.id,
          school_id: actualSchoolId,
          teacher_id: matchedTeacher?.id || null,
          name: row.name,
          father_name: row.fatherName,
          class: row.class,
          section: row.section,
          roll_no: row.rollNo,
        });

        if (insertErr) {
          newResults.push({ name: row.name, success: false, error: insertErr.message });
        } else {
          newResults.push({ name: row.name, success: true, username: row.username, password: row.password });
        }
      }
    } catch (err: any) {
      toast.error(`Unexpected error: ${err.message}`);
    }

    setResults(newResults);
    setParsedRows([]);
    setUploading(false);

    const successCount = newResults.filter((r) => r.success).length;
    const failCount = newResults.filter((r) => !r.success).length;
    if (successCount > 0) toast.success(`${successCount} student(s) created successfully!`);
    if (failCount > 0) toast.error(`${failCount} student(s) failed.`);
    if (successCount > 0) onComplete();
  };

  const downloadResults = () => {
    const wb = XLSX.utils.book_new();
    const data = results.map((r) => ({
      "Student Name": r.name,
      "Status": r.success ? "Success" : "Failed",
      "Username": r.username || "",
      "Password": r.password || "",
      "Error": r.error || "",
    }));
    const ws = XLSX.utils.json_to_sheet(data);
    ws["!cols"] = [{ wch: 20 }, { wch: 10 }, { wch: 18 }, { wch: 14 }, { wch: 30 }];
    XLSX.utils.book_append_sheet(wb, ws, "Results");
    XLSX.writeFile(wb, "bulk_upload_results.xlsx");
  };

  const validCount = parsedRows.filter((r) => !r.error).length;
  const errorCount = parsedRows.filter((r) => r.error).length;

  return (
    <div>
      <Button variant="hero" size="xl" onClick={() => setShow(!show)}>
        <Upload className="w-6 h-6 mr-2" /> Bulk Upload
      </Button>

      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="glass-card p-6 mt-4 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-lg font-bold text-white flex items-center gap-2">
                  <Upload className="w-5 h-5 text-neon-blue" /> Bulk Student Upload
                </h2>
                <Button variant="ghost" size="icon" onClick={() => { setShow(false); setParsedRows([]); setResults([]); }}>
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Step 1: Download Template */}
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <h3 className="text-sm font-display font-bold text-white/80 mb-2">Step 1: Download Template</h3>
                <p className="text-xs text-white/50 font-body mb-3">
                  Download the Excel template, fill in student details, and upload it back. The template includes a reference sheet with valid class names, sections, and teacher names.
                </p>
                <Button variant="glass" size="sm" onClick={downloadTemplate}>
                  <Download className="w-4 h-4 mr-1" /> Download Template
                </Button>
              </div>

              {/* Step 2: Upload */}
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <h3 className="text-sm font-display font-bold text-white/80 mb-2">Step 2: Upload Filled Template</h3>
                <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg border border-dashed border-white/20 hover:border-neon-blue/40 transition-colors">
                  <FileText className="w-5 h-5 text-neon-blue" />
                  <span className="text-sm text-white/70 font-body">Click to select Excel file (.xlsx)</span>
                  <input
                    ref={fileRef}
                    type="file"
                    accept=".xlsx,.xls,.csv"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Preview */}
              {parsedRows.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm font-body">
                    <span className="text-white/70">{parsedRows.length} row(s) found</span>
                    <span className="text-neon-green">{validCount} valid</span>
                    {errorCount > 0 && <span className="text-destructive">{errorCount} error(s)</span>}
                  </div>

                  <div className="max-h-60 overflow-auto rounded-lg border border-white/10">
                    <table className="w-full text-xs">
                      <thead className="bg-white/5 sticky top-0">
                        <tr className="text-white/60 font-body">
                          <th className="px-2 py-2 text-left">Name</th>
                          <th className="px-2 py-2 text-left">Class</th>
                          <th className="px-2 py-2 text-left">Section</th>
                          <th className="px-2 py-2 text-left">Roll</th>
                          <th className="px-2 py-2 text-left">Teacher</th>
                          <th className="px-2 py-2 text-left">Username</th>
                          <th className="px-2 py-2 text-left">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {parsedRows.map((row, i) => (
                          <tr key={i} className={`border-t border-white/5 ${row.error ? "bg-destructive/10" : ""}`}>
                            <td className="px-2 py-1.5 text-white/80">{row.name}</td>
                            <td className="px-2 py-1.5 text-white/60">{row.class}</td>
                            <td className="px-2 py-1.5 text-white/60">{row.section}</td>
                            <td className="px-2 py-1.5 text-white/60">{row.rollNo}</td>
                            <td className="px-2 py-1.5 text-white/60">{row.teacherName}</td>
                            <td className="px-2 py-1.5 text-white/60">{row.username}</td>
                            <td className="px-2 py-1.5">
                              {row.error ? (
                                <span className="text-destructive flex items-center gap-1">
                                  <AlertTriangle className="w-3 h-3" /> {row.error}
                                </span>
                              ) : (
                                <span className="text-neon-green">✓ Valid</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="flex justify-end gap-3">
                    <Button variant="ghost" onClick={() => setParsedRows([])}>Cancel</Button>
                    <Button
                      variant="hero"
                      onClick={() => handleBulkCreate()}
                      disabled={uploading || validCount === 0}
                    >
                      {uploading ? (
                        <><Loader2 className="w-4 h-4 mr-1 animate-spin" /> Creating {validCount} students...</>
                      ) : (
                        `Create ${validCount} Student(s)`
                      )}
                    </Button>
                  </div>
                </div>
              )}

              {/* Results */}
              {results.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-sm font-display font-bold text-white/80">Upload Results</h3>
                  <div className="max-h-48 overflow-auto rounded-lg border border-white/10">
                    <table className="w-full text-xs">
                      <thead className="bg-white/5 sticky top-0">
                        <tr className="text-white/60 font-body">
                          <th className="px-2 py-2 text-left">Name</th>
                          <th className="px-2 py-2 text-left">Status</th>
                          <th className="px-2 py-2 text-left">Username</th>
                          <th className="px-2 py-2 text-left">Password</th>
                        </tr>
                      </thead>
                      <tbody>
                        {results.map((r, i) => (
                          <tr key={i} className={`border-t border-white/5 ${!r.success ? "bg-destructive/10" : ""}`}>
                            <td className="px-2 py-1.5 text-white/80">{r.name}</td>
                            <td className="px-2 py-1.5">
                              {r.success ? (
                                <span className="text-neon-green flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Success</span>
                              ) : (
                                <span className="text-destructive flex items-center gap-1"><AlertTriangle className="w-3 h-3" /> {r.error}</span>
                              )}
                            </td>
                            <td className="px-2 py-1.5 text-white/60">{r.username || "-"}</td>
                            <td className="px-2 py-1.5 text-white/60">{r.password || "-"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <Button variant="glass" size="sm" onClick={downloadResults}>
                    <Download className="w-4 h-4 mr-1" /> Download Results
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BulkStudentUpload;
