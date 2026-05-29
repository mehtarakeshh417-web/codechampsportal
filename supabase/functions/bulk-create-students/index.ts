import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-api-version, accept, accept-language",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const VERSION = "bulk-students-sync-20260529";
const normalizePassword = (password: string) => password.length >= 6 ? password : `cc_${password}`.padEnd(6, "_");

const json = (data: unknown, status = 200) => new Response(JSON.stringify(data), {
  status,
  headers: { ...corsHeaders, "Content-Type": "application/json" },
});

const compact = (row: Record<string, unknown>) => Object.fromEntries(Object.entries(row).filter(([, value]) => value !== undefined));
const pickFirst = (source: any, keys: string[]) => keys.map((key) => source?.[key]).find((value) => value !== undefined && value !== null && String(value).trim() !== "");
const getUsers = (body: any) => Array.isArray(body) ? body : (Array.isArray(body?.users) ? body.users : (Array.isArray(body?.students) ? body.students : (Array.isArray(body?.rows) ? body.rows : [])));

const findUserByEmail = async (adminClient: any, email: string) => {
  let page = 1;
  const perPage = 100;
  while (page <= 30) {
    const { data } = await adminClient.auth.admin.listUsers({ page, perPage });
    const found = data?.users?.find((user: any) => user.email?.toLowerCase() === email.toLowerCase());
    if (found || !data?.users || data.users.length < perPage) return found || null;
    page++;
  }
  return null;
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY");
    if (!supabaseUrl || !serviceRoleKey || !anonKey) {
      return json({ ok: false, success: false, version: VERSION, modifiedRowCount: 0, students: [], errors: ["Bulk student service is missing server credentials"] }, 500);
    }

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) return json({ ok: false, success: false, version: VERSION, modifiedRowCount: 0, students: [], errors: ["Login required"] }, 401);

    const adminClient = createClient(supabaseUrl, serviceRoleKey, { auth: { persistSession: false } });
    const callerClient = createClient(supabaseUrl, anonKey, { global: { headers: { Authorization: authHeader } } });
    const { data: { user: caller }, error: callerError } = await callerClient.auth.getUser();
    if (callerError || !caller) return json({ ok: false, success: false, version: VERSION, modifiedRowCount: 0, students: [], errors: ["Login expired. Please login again."] }, 401);

    const body = await req.json().catch(() => ({}));
    const users = getUsers(body);
    if (users.length === 0) return json({ ok: false, success: false, version: VERSION, modifiedRowCount: 0, students: [], errors: ["No students supplied"] }, 400);

    const context = body?.context || body?.metadata || {};
    const [{ data: teacher }, { data: school }] = await Promise.all([
      adminClient.from("teachers").select("id, school_id").eq("user_id", caller.id).maybeSingle(),
      adminClient.from("schools").select("id").eq("user_id", caller.id).maybeSingle(),
    ]);

    const explicitSchoolId = pickFirst(context, ["school_id", "schoolId", "tenant_id", "tenantId"]) || pickFirst(body, ["school_id", "schoolId", "tenant_id", "tenantId"]);
    const callerSchoolId = teacher?.school_id || school?.id || explicitSchoolId;
    const callerTeacherId = teacher?.id || pickFirst(context, ["teacher_id", "teacherId"]);
    const tenantId = pickFirst(context, ["tenant_id", "tenantId"]) || callerSchoolId;
    const callerRole = teacher?.id ? "teacher" : (school?.id ? "school" : (context?.role || "authenticated"));

    const results: any[] = [];
    const errors: string[] = [];
    let createdCount = 0;
    let updatedCount = 0;

    const writeStudent = async (student: Record<string, unknown>, userId: string, existingId?: string) => {
      const payload = compact({ ...student, user_id: userId });
      const execute = (row: Record<string, unknown>) => existingId
        ? adminClient.from("students").update(row).eq("id", existingId).select().single()
        : adminClient.from("students").insert(row).select().single();
      let result = await execute(payload);
      if (result.error && "tenant_id" in payload && /tenant_id/i.test(result.error.message || "")) {
        const withoutTenant = { ...payload };
        delete withoutTenant.tenant_id;
        result = await execute(withoutTenant);
      }
      return result;
    };

    const processOne = async (u: any) => {
      let userId: string | null = null;
      let createdAuthUser = false;
      const email = String(u?.email || u?.username || "").trim().toLowerCase();
      try {
        const password = String(u?.password || "");
        if (!email || !email.includes("@")) throw new Error("valid username/email is required");
        if (!password) throw new Error("password is required");

        const student = compact({ ...(u?.student || {}), school_id: callerSchoolId, tenant_id: tenantId });
        if (callerRole === "teacher" && callerTeacherId) student.teacher_id = callerTeacherId;
        if (!student.teacher_id && u?.student?.teacher_id) student.teacher_id = u.student.teacher_id;

        const missing = ["school_id", "name", "class", "section", "roll_no"].filter((key) => !String(student[key] || "").trim());
        if (missing.length > 0) throw new Error(`missing student fields - ${missing.join(", ")}`);

        const { data: newUser, error: createError } = await adminClient.auth.admin.createUser({
          email,
          password: normalizePassword(password),
          email_confirm: true,
          user_metadata: u?.metadata || {},
        });

        if (createError || !newUser?.user) {
          if (/already|registered|exists/i.test(createError?.message || "")) {
            const existing = await findUserByEmail(adminClient, email);
            if (!existing) throw new Error("account exists but could not be loaded");
            userId = existing.id;
            await adminClient.auth.admin.updateUser(existing.id, { password: normalizePassword(password), user_metadata: u?.metadata || {} });
          } else {
            throw new Error(createError?.message || "auth user creation failed");
          }
        } else {
          userId = newUser.user.id;
          createdAuthUser = true;
        }

        const { error: roleError } = await adminClient
          .from("user_roles")
          .upsert({ user_id: userId, role: "student" }, { onConflict: "user_id,role" });
        if (roleError) throw new Error(`role assignment failed - ${roleError.message}`);

        const { data: existingStudent } = await adminClient
          .from("students")
          .select("id")
          .eq("user_id", userId)
          .maybeSingle();

        const { data: studentRow, error: studentError } = await writeStudent(student, userId, existingStudent?.id);
        if (studentError) throw new Error(`student profile failed - ${studentError.message}`);
        existingStudent?.id ? updatedCount++ : createdCount++;
        results.push({ ...studentRow, email });
      } catch (error: any) {
        if (createdAuthUser && userId) await adminClient.auth.admin.deleteUser(userId);
        const message = String(error?.message || "unknown error").replace(/insufficient permissions/ig, "student database write was blocked by server configuration");
        errors.push(`${email || "row"}: ${message}`);
      }
    };

    for (let i = 0; i < users.length; i += 2) {
      await Promise.all(users.slice(i, i + 2).map(processOne));
    }

    const modifiedRowCount = results.length;
    return json({
      ok: errors.length === 0,
      success: modifiedRowCount > 0,
      status: errors.length === 0 ? "success" : (modifiedRowCount > 0 ? "partial" : "failed"),
      version: VERSION,
      rowCount: users.length,
      modifiedRowCount,
      createdCount,
      updatedCount,
      context: { school_id: callerSchoolId, tenant_id: tenantId, role: callerRole, teacher_id: callerTeacherId || null },
      students: results,
      users: results,
      errors,
    });
  } catch (error: any) {
    return json({ ok: false, success: false, version: VERSION, modifiedRowCount: 0, students: [], errors: [error?.message || "Bulk student service failed"] }, 500);
  }
});