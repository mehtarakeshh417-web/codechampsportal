import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const VERSION = "bulk-create-students-20260529";
const normalizePassword = (password: string) => password.length >= 6 ? password : `cc_${password}`.padEnd(6, "_");

const json = (data: unknown, status = 200) => new Response(JSON.stringify(data), {
  status,
  headers: { ...corsHeaders, "Content-Type": "application/json" },
});

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
      return json({ ok: false, version: VERSION, students: [], errors: ["Bulk student service is missing server credentials"] }, 500);
    }

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) return json({ ok: false, version: VERSION, students: [], errors: ["Login required"] }, 401);

    const adminClient = createClient(supabaseUrl, serviceRoleKey, { auth: { persistSession: false } });
    const callerClient = createClient(supabaseUrl, anonKey, { global: { headers: { Authorization: authHeader } } });
    const { data: { user: caller }, error: callerError } = await callerClient.auth.getUser();
    if (callerError || !caller) return json({ ok: false, version: VERSION, students: [], errors: ["Login expired. Please login again."] }, 401);

    const body = await req.json().catch(() => ({}));
    const users = Array.isArray(body.users) ? body.users : [];
    if (users.length === 0) return json({ ok: false, version: VERSION, students: [], errors: ["No students supplied"] }, 400);

    const [{ data: teacher }, { data: school }] = await Promise.all([
      adminClient.from("teachers").select("id, school_id").eq("user_id", caller.id).maybeSingle(),
      adminClient.from("schools").select("id").eq("user_id", caller.id).maybeSingle(),
    ]);

    const results: any[] = [];
    const errors: string[] = [];

    const processOne = async (u: any) => {
      let userId: string | null = null;
      let createdAuthUser = false;
      const email = String(u?.email || "").trim().toLowerCase();
      try {
        const password = String(u?.password || "");
        if (!email || !email.includes("@")) throw new Error("valid username/email is required");
        if (!password) throw new Error("password is required");

        const student = { ...(u?.student || {}) };
        if (teacher?.id) {
          student.school_id = teacher.school_id;
          student.teacher_id = teacher.id;
        } else if (school?.id) {
          student.school_id = school.id;
        }

        const missing = ["school_id", "name", "class", "section", "roll_no"].filter((key) => !String(student[key] || "").trim());
        if (missing.length > 0) throw new Error(`missing student fields - ${missing.join(", ")}`);

        const { data: newUser, error: createError } = await adminClient.auth.admin.createUser({
          email,
          password: normalizePassword(password),
          email_confirm: true,
          user_metadata: u?.metadata || {},
        });

        if (createError || !newUser?.user) {
          if (createError?.message?.includes("already been registered")) {
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

        const write = existingStudent?.id
          ? adminClient.from("students").update({ ...student, user_id: userId }).eq("id", existingStudent.id).select().single()
          : adminClient.from("students").insert({ ...student, user_id: userId }).select().single();

        const { data: studentRow, error: studentError } = await write;
        if (studentError) throw new Error(`student profile failed - ${studentError.message}`);
        results.push({ ...studentRow, email });
      } catch (error: any) {
        if (createdAuthUser && userId) await adminClient.auth.admin.deleteUser(userId);
        errors.push(`${email || "row"}: ${error?.message || "unknown error"}`);
      }
    };

    for (let i = 0; i < users.length; i += 2) {
      await Promise.all(users.slice(i, i + 2).map(processOne));
    }

    return json({ ok: errors.length === 0, version: VERSION, students: results, errors });
  } catch (error: any) {
    return json({ ok: false, version: VERSION, students: [], errors: [error?.message || "Bulk student service failed"] }, 500);
  }
});