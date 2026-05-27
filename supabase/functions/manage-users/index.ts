import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const normalizePassword = (password: string) => password.length >= 6 ? password : `cc_${password}`.padEnd(6, "_");

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
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, serviceRoleKey);

    // Verify the caller is authenticated
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "No authorization header" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const anonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const callerClient = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: { user: caller }, error: callerError } = await callerClient.auth.getUser();
    if (callerError || !caller) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Check caller has admin or school role
    const { data: callerRoles } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", caller.id);
    const roles = (callerRoles || []).map((r: any) => r.role);
    const isAdmin = roles.includes("admin");
    const isSchool = roles.includes("school");
    const isTeacher = roles.includes("teacher");

    if (!isAdmin && !isSchool && !isTeacher) {
      return new Response(JSON.stringify({ error: "Insufficient permissions" }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Resolve teacher record (used for scoped permissions below)
    let teacherRecord: { id: string; school_id: string } | null = null;
    if (isTeacher && !isAdmin && !isSchool) {
      const { data: tRow } = await supabase
        .from("teachers")
        .select("id, school_id")
        .eq("user_id", caller.id)
        .maybeSingle();
      teacherRecord = tRow as any;
    }

    const body = await req.json();
    const { action } = body;

    if (action === "create_user") {
      const { email, password, role, metadata } = body;

      // Schools can only create teachers and students
      if (isSchool && !isAdmin && !["teacher", "student"].includes(role)) {
        return new Response(JSON.stringify({ error: "Schools can only create teachers and students" }), {
          status: 403,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // Teachers can only create students
      if (isTeacher && !isAdmin && !isSchool && role !== "student") {
        return new Response(JSON.stringify({ error: "Teachers can only create students" }), {
          status: 403,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      let userId: string;
      const { data: newUser, error: createError } = await supabase.auth.admin.createUser({
        email,
        password: normalizePassword(password),
        email_confirm: true,
        user_metadata: metadata || {},
      });

      if (createError) {
        // If user already exists, find and return them
        if (createError.message.includes("already been registered")) {
          const existing = await findUserByEmail(supabase, email);
          if (existing) {
            userId = existing.id;
            // Update password and metadata
            await supabase.auth.admin.updateUser(existing.id, { password: normalizePassword(password), user_metadata: metadata || {} });
          } else {
            return new Response(JSON.stringify({ error: createError.message }), {
              status: 400,
              headers: { ...corsHeaders, "Content-Type": "application/json" },
            });
          }
        } else {
          return new Response(JSON.stringify({ error: createError.message }), {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }
      } else {
        userId = newUser.user.id;
      }

      // Assign role (upsert to handle re-registration)
      const { error: roleError } = await supabase
        .from("user_roles")
        .upsert({ user_id: userId, role }, { onConflict: "user_id,role" });

      if (roleError) {
        return new Response(JSON.stringify({ error: `Role assignment failed: ${roleError.message}` }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      return new Response(JSON.stringify({ user: { id: userId } }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (action === "create_users_bulk") {
      const { users } = body;
      const results: any[] = [];
      const errors: string[] = [];

      console.log(`[BULK CREATE] Processing ${users?.length || 0} users`);

      const processOne = async (u: any) => {
        let userId: string | null = null;
        try {
          if (isSchool && !isAdmin && !["teacher", "student"].includes(u.role)) {
            errors.push(`${u.email}: insufficient permissions for role ${u.role}`);
            return;
          }
          if (isTeacher && !isAdmin && !isSchool && u.role !== "student") {
            errors.push(`${u.email}: teachers can only create students`);
            return;
          }

          const { data: newUser, error: createError } = await supabase.auth.admin.createUser({
            email: u.email,
            password: normalizePassword(u.password),
            email_confirm: true,
            user_metadata: u.metadata || {},
          });

          if (createError || !newUser?.user) {
            if (createError?.message?.includes("already been registered")) {
              const existing = await findUserByEmail(supabase, u.email);
              if (!existing) {
                errors.push(`${u.email}: account exists but could not be loaded`);
                return;
              }
              userId = existing.id;
              await supabase.auth.admin.updateUser(existing.id, { password: normalizePassword(u.password), user_metadata: u.metadata || {} });
            } else {
              console.log(`[BULK CREATE] Failed: ${u.email} - ${createError?.message}`);
              errors.push(`${u.email}: ${createError?.message || "create failed"}`);
              return;
            }
          } else {
            userId = newUser.user.id;
          }

          const { error: roleError } = await supabase
            .from("user_roles")
            .upsert({ user_id: userId, role: u.role }, { onConflict: "user_id,role" });

          if (roleError) {
            console.log(`[BULK CREATE] Role failed: ${u.email} - ${roleError.message}`);
            errors.push(`${u.email}: role assignment failed - ${roleError.message}`);
            return;
          }

          if (u.role === "student" && u.student) {
            const { data: studentRow, error: studentError } = await supabase
              .from("students")
              .upsert({ ...u.student, user_id: userId }, { onConflict: "user_id" })
              .select()
              .single();
            if (studentError) {
              errors.push(`${u.email}: student profile failed - ${studentError.message}`);
              return;
            }
            results.push({ ...studentRow, email: u.email });
          } else {
            results.push({ id: userId, email: u.email });
          }
        } catch (e: any) {
          console.log(`[BULK CREATE] Exception ${u.email}: ${e?.message}`);
          errors.push(`${u.email}: ${e?.message || "unknown error"}`);
        }
      };

      // Process in parallel batches of 5 to avoid hitting auth rate limits and edge function timeout
      const BATCH = 5;
      for (let i = 0; i < (users?.length || 0); i += BATCH) {
        const slice = users.slice(i, i + BATCH);
        await Promise.all(slice.map(processOne));
      }

      console.log(`[BULK CREATE] Done: ${results.length} created, ${errors.length} errors`);

      return new Response(JSON.stringify({ users: results, students: results, errors }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }


    if (action === "delete_user") {
      const { user_id } = body;

      if (isSchool && !isAdmin) {
        const { data: school } = await supabase
          .from("schools")
          .select("id")
          .eq("user_id", caller.id)
          .single();

        if (school) {
          const { data: teacher } = await supabase
            .from("teachers")
            .select("id")
            .eq("user_id", user_id)
            .eq("school_id", school.id);
          const { data: student } = await supabase
            .from("students")
            .select("id")
            .eq("user_id", user_id)
            .eq("school_id", school.id);

          if ((!teacher || teacher.length === 0) && (!student || student.length === 0)) {
            return new Response(JSON.stringify({ error: "User not in your school" }), {
              status: 403,
              headers: { ...corsHeaders, "Content-Type": "application/json" },
            });
          }
        }
      }

      // Teachers can only delete their own students
      if (isTeacher && !isAdmin && !isSchool) {
        if (!teacherRecord) {
          return new Response(JSON.stringify({ error: "Teacher record not found" }), {
            status: 403,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }
        const { data: ownStudent } = await supabase
          .from("students")
          .select("id")
          .eq("user_id", user_id)
          .eq("teacher_id", teacherRecord.id)
          .eq("school_id", teacherRecord.school_id);
        if (!ownStudent || ownStudent.length === 0) {
          return new Response(JSON.stringify({ error: "Student is not in your class" }), {
            status: 403,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }
      }

      const { error: deleteError } = await supabase.auth.admin.deleteUser(user_id);
      if (deleteError) {
        return new Response(JSON.stringify({ error: deleteError.message }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (action === "delete_users_bulk") {
      const { user_ids } = body;
      const results: string[] = [];
      const errors: string[] = [];

      for (const uid of user_ids) {
        const { error } = await supabase.auth.admin.deleteUser(uid);
        if (error) {
          errors.push(`${uid}: ${error.message}`);
        } else {
          results.push(uid);
        }
      }

      return new Response(JSON.stringify({ deleted: results, errors }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (action === "change_password") {
      const { user_id, new_password } = body;

      if (caller.id !== user_id && !isAdmin) {
        return new Response(JSON.stringify({ error: "Can only change your own password" }), {
          status: 403,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const { error } = await supabase.auth.admin.updateUser(user_id, { password: new_password });
      if (error) {
        return new Response(JSON.stringify({ error: error.message }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (action === "cleanup_orphaned_student_users") {
      let deleted = 0;
      const deleteErrors: string[] = [];

      const { data: existingStudents } = await supabase.from("students").select("user_id");
      const existingStudentUserIds = new Set((existingStudents || []).map((s: any) => s.user_id).filter(Boolean));

      const { data: existingTeachers } = await supabase.from("teachers").select("user_id");
      const existingTeacherUserIds = new Set((existingTeachers || []).map((t: any) => t.user_id).filter(Boolean));

      const { data: existingSchools } = await supabase.from("schools").select("user_id");
      const existingSchoolUserIds = new Set((existingSchools || []).map((s: any) => s.user_id).filter(Boolean));

      let page = 1;
      const perPage = 100;
      let hasMore = true;

      while (hasMore) {
        const { data: listData, error: listError } = await supabase.auth.admin.listUsers({ page, perPage });

        if (listError || !listData?.users?.length) {
          hasMore = false;
          break;
        }

        for (const authUser of listData.users) {
          const email = authUser.email || "";
          if (!email.endsWith("@codechamps.local")) continue;
          if (existingStudentUserIds.has(authUser.id)) continue;
          if (existingTeacherUserIds.has(authUser.id)) continue;
          if (existingSchoolUserIds.has(authUser.id)) continue;

          const { data: adminRole } = await supabase
            .from("user_roles")
            .select("role")
            .eq("user_id", authUser.id)
            .eq("role", "admin");
          if (adminRole && adminRole.length > 0) continue;

          try {
            const { error: delErr } = await supabase.auth.admin.deleteUser(authUser.id);
            if (!delErr) {
              await supabase.from("user_roles").delete().eq("user_id", authUser.id);
              await supabase.from("user_security").delete().eq("user_id", authUser.id);
              deleted++;
            } else {
              deleteErrors.push(`${email}: ${delErr.message}`);
            }
          } catch (e) {
            deleteErrors.push(`${email}: ${e.message}`);
          }
        }

        hasMore = listData.users.length === perPage;
        page++;
      }

      return new Response(JSON.stringify({ deleted, errors: deleteErrors }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ error: "Unknown action" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
