import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
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

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return jsonResponse({ error: "No authorization header" }, 401);
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

    const body = await req.json();
    const { action } = body;

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
        if (createError.message.includes("already been registered")) {
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

    if (action === "create_users_bulk") {
      const { users } = body;

      // Ultra-permissive auth: any authenticated admin OR school OR teacher can bulk-create students.
      // If none of those profiles exist, give a diagnostic error so the user knows exactly why.
      if (!isAdmin && !isSchool && !isTeacher) {
        return jsonResponse({
          error: `Insufficient permissions — caller ${caller.email || caller.id} has no admin/school/teacher profile. ` +
                 `Diagnostics: roles=[${[...roles].join(",")}], teacher_row=${!!tRow}, school_row=${!!sRow}, student_row=${!!stRow}`,
        }, 403);
      }

      const results: any[] = [];
      const errors: string[] = [];

      if (!Array.isArray(users) || users.length === 0) {
        return jsonResponse({ users: [], students: [], errors: ["No users supplied"] });
      }

      console.log(`[BULK CREATE] caller=${caller.email} admin=${isAdmin} school=${isSchool} teacher=${isTeacher} count=${users.length}`);

      const processOne = async (u: any) => {
        let userId: string | null = null;
        let createdAuthUser = false;
        try {
          const email = String(u?.email || "").trim().toLowerCase();
          const role = String(u?.role || "");
          const password = String(u?.password || "");
          if (!email || !email.includes("@")) {
            errors.push(`${email || "row"}: valid username/email is required`);
            return;
          }
          if (!password) {
            errors.push(`${email}: password is required`);
            return;
          }
          // Only role-scoping; permission already passed
          if (isTeacher && !isAdmin && !isSchool && role !== "student") {
            errors.push(`${email}: teachers can only create students`);
            return;
          }

          const studentPayload = u.student ? { ...u.student } : null;
          // Teacher caller: force scope to their school + themselves
          if (isTeacher && !isAdmin && !isSchool && studentPayload && teacherRecord) {
            studentPayload.school_id = teacherRecord.school_id;
            studentPayload.teacher_id = teacherRecord.id;
          }
          // School caller: force school_id to their school
          if (isSchool && !isAdmin && studentPayload && schoolRecord) {
            studentPayload.school_id = schoolRecord.id;
          }

          if (role === "student") {
            const requiredStudentFields = ["school_id", "name", "class", "section", "roll_no"];
            const missing = requiredStudentFields.filter((key) => !String(studentPayload?.[key] || "").trim());
            if (!studentPayload || missing.length > 0) {
              errors.push(`${email}: missing student fields - ${missing.join(", ")}`);
              return;
            }
          }

          const { data: newUser, error: createError } = await supabase.auth.admin.createUser({
            email, password: normalizePassword(password), email_confirm: true, user_metadata: u.metadata || {},
          });

          if (createError || !newUser?.user) {
            if (createError?.message?.includes("already been registered")) {
              const existing = await findUserByEmail(supabase, email);
              if (!existing) {
                errors.push(`${email}: account exists but could not be loaded`);
                return;
              }
              userId = existing.id;
              await supabase.auth.admin.updateUser(existing.id, { password: normalizePassword(password), user_metadata: u.metadata || {} });
            } else {
              console.log(`[BULK CREATE] auth failed: ${email} - ${createError?.message}`);
              errors.push(`${email}: ${createError?.message || "create failed"}`);
              return;
            }
          } else {
            userId = newUser.user.id;
            createdAuthUser = true;
          }

          const { error: roleError } = await supabase
            .from("user_roles")
            .upsert({ user_id: userId, role }, { onConflict: "user_id,role" });
          if (roleError) {
            if (createdAuthUser && userId) await supabase.auth.admin.deleteUser(userId);
            errors.push(`${email}: role assignment failed - ${roleError.message}`);
            return;
          }

          if (role === "student" && studentPayload) {
            const { data: existingStudent } = await supabase
              .from("students").select("id").eq("user_id", userId).maybeSingle();
            const studentWrite = existingStudent
              ? supabase.from("students").update({ ...studentPayload, user_id: userId }).eq("id", existingStudent.id).select().single()
              : supabase.from("students").insert({ ...studentPayload, user_id: userId }).select().single();
            const { data: studentRow, error: studentError } = await studentWrite;
            if (studentError) {
              if (createdAuthUser && userId) await supabase.auth.admin.deleteUser(userId);
              errors.push(`${email}: student profile failed - ${studentError.message}`);
              return;
            }
            results.push({ ...studentRow, email });
          } else {
            results.push({ id: userId, email });
          }
        } catch (e: any) {
          console.log(`[BULK CREATE] exception ${u?.email}: ${e?.message}`);
          if (createdAuthUser && userId) await supabase.auth.admin.deleteUser(userId);
          errors.push(`${u?.email || "row"}: ${e?.message || "unknown error"}`);
        }
      };

      const BATCH = 2;
      for (let i = 0; i < (users?.length || 0); i += BATCH) {
        const slice = users.slice(i, i + BATCH);
        await Promise.all(slice.map(processOne));
      }

      console.log(`[BULK CREATE] done: ${results.length} ok, ${errors.length} errors`);
      return jsonResponse({ users: results, students: results, errors });
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
