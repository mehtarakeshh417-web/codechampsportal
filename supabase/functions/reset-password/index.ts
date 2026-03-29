import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const json = (body: object) =>
  new Response(JSON.stringify(body), {
    status: 200,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, serviceRoleKey);

    const { username, method, verification_value, new_password } = await req.json();
    console.log("Reset request:", username, "method:", method);

    if (!username || !method || !new_password) {
      return json({ error: "Please fill in all required fields." });
    }

    const email = `${username}@codechamps.local`;

    // Find user by email with pagination
    let authUser = null;
    let page = 1;
    const perPage = 100;
    while (!authUser) {
      const { data: listData, error: listError } = await supabase.auth.admin.listUsers({ page, perPage });
      console.log("listUsers page", page, "error:", listError?.message, "count:", listData?.users?.length);
      if (listError || !listData?.users?.length) break;
      authUser = listData.users.find((u: any) => u.email === email) || null;
      if (listData.users.length < perPage) break;
      page++;
    }

    if (!authUser) {
      return json({ error: "Username not found. Please check and try again." });
    }

    const userId = authUser.id;
    console.log("Found user:", userId);

    // Verify identity based on chosen method
    if (method === "old_password") {
      const anonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
      const anonClient = createClient(supabaseUrl, anonKey);
      const { error: signInError } = await anonClient.auth.signInWithPassword({ email, password: verification_value });
      if (signInError) {
        console.log("Old password wrong:", signInError.message);
        return json({ error: "The current password you entered is incorrect. Please try again." });
      }
      await anonClient.auth.signOut();
    } else if (method === "pin") {
      const { data: sec, error: secError } = await supabase
        .from("user_security")
        .select("pin")
        .eq("user_id", userId)
        .maybeSingle();

      console.log("PIN lookup:", !!sec, secError?.message);
      if (!sec) {
        return json({ error: "No security PIN is set up for this account." });
      }
      if (sec.pin !== verification_value) {
        return json({ error: "The PIN you entered is incorrect. Please try again." });
      }
    } else if (method === "security_question") {
      const { data: sec, error: secError } = await supabase
        .from("user_security")
        .select("security_answer")
        .eq("user_id", userId)
        .maybeSingle();

      console.log("Security Q lookup:", !!sec, secError?.message);
      if (!sec) {
        return json({ error: "No security question is set up for this account." });
      }
      if (sec.security_answer !== verification_value.trim().toLowerCase()) {
        return json({ error: "Your security answer is incorrect. Please try again." });
      }
    } else {
      return json({ error: "Invalid verification method selected." });
    }

    // Update the password using admin API
    console.log("Updating password for user:", userId);
    const { data: updateData, error: updateError } = await supabase.auth.admin.updateUserById(userId, { password: new_password });
    console.log("Update result:", updateData ? "success" : "failed", updateError?.message);
    
    if (updateError) {
      return json({ error: "Could not update password. Please try again later." });
    }

    console.log("Password reset successful for:", username);
    return json({ success: true });
  } catch (err) {
    console.error("Unexpected error:", err.message);
    return json({ error: "Something went wrong. Please try again." });
  }
});
