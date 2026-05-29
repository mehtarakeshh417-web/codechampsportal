import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-api-version, accept, accept-language",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const normalizePassword = (password: string) => password.length >= 6 ? password : `cc_${password}`.padEnd(6, "_");

const jsonResponse = (data: unknown, status = 200) => new Response(JSON.stringify(data), {
  status,
  headers: { ...corsHeaders, "Content-Type": "application/json" },
});

const findUserByEmail = async (supabase: any, email: string) => {
  let page = 1;
  const perPage = 100;
  while (page <= 20) {
    const { data } = await supabase.auth.admin.listUsers({ page, perPage });
    const found = data?.users?.find((user: any) => user.email?.toLowerCase() === email.toLowerCase());
    if (found || !data?.users || data.users.length < perPage) return found || null;
    page++;
  }
  return null;
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, serviceRoleKey);

    const body = await req.json().catch(() => ({}));
    const { action } = body;

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return jsonResponse({ error: "Login required" }, 401);
    }

    const anonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const callerClient = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: { user: caller }, error: callerError } = await callerClient.auth.getUser();
    if (callerError || !caller) {
      return jsonResponse({ error: "Unauthorized: " + (callerError?.message || "no user") }, 401);
    }

    // Load all signals in parallel. Presence of a teachers/schools/students row is authoritative.
    const [{ data: callerRoles }, { data: tRow }, { data: sRow }, { data: stRow }] = await Promise.all([
      supabase.from("user_roles").select("role").eq("user_id", caller.id),
      supabase.from("teachers").select("id, school_id").eq("user_id", caller.id).maybeSingle(),
      supabase.from("schools").select("id").eq("user_id", caller.id).maybeSingle(),
      supabase.from("students").select("id").eq("user_id", caller.id).maybeSingle(),
    ]);
    const roles = new Set((callerRoles || []).map((r: any) => r.role));

    // Self-heal user_roles based on profile rows that exist.
    const ensureRole = async (role: string) => {
      if (!roles.has(role)) {
        await supabase.from("user_roles").upsert(
          { user_id: caller.id, role },
          { onConflict: "user_id,role" },
        );
        roles.add(role);
      }
    };
    if (tRow) await ensureRole("teacher");
    if (sRow) await ensureRole("school");
    if (stRow) await ensureRole("student");

    const isAdmin = roles.has("admin");
    const isSchool = roles.has("school") || !!sRow;
    const isTeacher = roles.has("teacher") || !!tRow;
    const teacherRecord: { id: string; school_id: string } | null = (tRow as any) || null;
    const schoolRecord: { id: string } | null = (sRow as any) || null;

    if (action === "create_user") {
      const { email, password, role, metadata } = body;
      if (isSchool && !isAdmin && !["teacher", "student"].includes(role)) {
        return jsonResponse({ error: "Schools can only create teachers and students" }, 403);
      }
      if (isTeacher && !isAdmin && !isSchool && role !== "student") {
        return jsonResponse({ error: "Teachers can only create students" }, 403);
      }

      let userId: string;
      const { data: newUser, error: createError } = await supabase.auth.admin.createUser({
        email, password: normalizePassword(password), email_confirm: true, user_metadata: metadata || {},
      });

      if (createError) {
        if (/already|registered|exists/i.test(createError.message || "")) {
          const existing = await findUserByEmail(supabase, email);
          if (existing) {
            userId = existing.id;
            await supabase.auth.admin.updateUser(existing.id, { password: normalizePassword(password), user_metadata: metadata || {} });
          } else {
            return jsonResponse({ error: createError.message }, 400);
          }
        } else {
          return jsonResponse({ error: createError.message }, 400);
        }
      } else {
        userId = newUser.user.id;
      }

      const { error: roleError } = await supabase
        .from("user_roles")
        .upsert({ user_id: userId, role }, { onConflict: "user_id,role" });
      if (roleError) return jsonResponse({ error: `Role assignment failed: ${roleError.message}` }, 400);

      return jsonResponse({ user: { id: userId } });
    }

    if (action === "delete_user") {
      const { user_id } = body;

      if (isSchool && !isAdmin && schoolRecord) {
        const { data: teacher } = await supabase.from("teachers").select("id").eq("user_id", user_id).eq("school_id", schoolRecord.id);
        const { data: student } = await supabase.from("students").select("id").eq("user_id", user_id).eq("school_id", schoolRecord.id);
        if ((!teacher || teacher.length === 0) && (!student || student.length === 0)) {
          return jsonResponse({ error: "User not in your school" }, 403);
        }
      }
      if (isTeacher && !isAdmin && !isSchool) {
        if (!teacherRecord) return jsonResponse({ error: "Teacher record not found" }, 403);
        const { data: ownStudent } = await supabase.from("students").select("id")
          .eq("user_id", user_id).eq("teacher_id", teacherRecord.id).eq("school_id", teacherRecord.school_id);
        if (!ownStudent || ownStudent.length === 0) return jsonResponse({ error: "Student is not in your class" }, 403);
      }

      const { error: deleteError } = await supabase.auth.admin.deleteUser(user_id);
      if (deleteError) return jsonResponse({ error: deleteError.message }, 400);
      return jsonResponse({ success: true });
    }

    if (action === "delete_users_bulk") {
      const { user_ids } = body;
      const results: string[] = [];
      const errors: string[] = [];
      for (const uid of user_ids) {
        const { error } = await supabase.auth.admin.deleteUser(uid);
        if (error) errors.push(`${uid}: ${error.message}`); else results.push(uid);
      }
      return jsonResponse({ deleted: results, errors });
    }

    if (action === "change_password") {
      const { user_id, new_password } = body;
      if (caller.id !== user_id && !isAdmin) {
        return jsonResponse({ error: "Can only change your own password" }, 403);
      }
      const { error } = await supabase.auth.admin.updateUser(user_id, { password: new_password });
      if (error) return jsonResponse({ error: error.message }, 400);
      return jsonResponse({ success: true });
    }

    return jsonResponse({ error: "Unknown action" }, 400);
  } catch (err: any) {
    return jsonResponse({ error: err.message }, 500);
  }
});
