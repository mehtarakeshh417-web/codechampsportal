import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);

    // Check if admin already exists
    const { data: existingUsers } = await supabase.auth.admin.listUsers();
    const adminEmail = "admin@avartan.local";
    const legacyAdmin = existingUsers?.users?.find(u => u.email === "admin@codechamps.local");
    const adminExists = existingUsers?.users?.some(u => u.email === adminEmail);

    // Migrate legacy admin email if present
    if (legacyAdmin && !adminExists) {
      await supabase.auth.admin.updateUserById(legacyAdmin.id, {
        email: adminEmail,
        password: "admin123",
        email_confirm: true,
      });
      return new Response(JSON.stringify({ success: true, message: "Admin email migrated. Username: admin, Password: admin123" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (adminExists) {
      // Reset password to known default
      const existing = existingUsers!.users!.find(u => u.email === adminEmail)!;
      await supabase.auth.admin.updateUserById(existing.id, { password: "admin123", email_confirm: true });
      return new Response(JSON.stringify({ message: "Admin password reset. Username: admin, Password: admin123" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { data: newUser, error } = await supabase.auth.admin.createUser({
      email: adminEmail,
      password: "admin123",
      email_confirm: true,
      user_metadata: { display_name: "Master Admin" },
    });

    if (error) throw error;

    await supabase.from("user_roles").insert({ user_id: newUser.user.id, role: "admin" });

    return new Response(JSON.stringify({ success: true, message: "Admin created. Username: admin, Password: admin123" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
