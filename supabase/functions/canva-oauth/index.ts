const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const CANVA_CLIENT_ID = Deno.env.get("CANVA_CLIENT_ID")!;
const CANVA_CLIENT_SECRET = Deno.env.get("CANVA_CLIENT_SECRET")!;
const CANVA_TOKEN_URL = "https://api.canva.com/rest/v1/oauth/token";
const CANVA_API_BASE = "https://api.canva.com/rest/v1";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const url = new URL(req.url);
  const action = url.searchParams.get("action");

  try {
    // ACTION: exchange — Exchange authorization code for access token
    if (action === "exchange") {
      const { code, code_verifier, redirect_uri } = await req.json();
      if (!code || !code_verifier || !redirect_uri) {
        return new Response(JSON.stringify({ error: "Missing code, code_verifier, or redirect_uri" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const credentials = btoa(`${CANVA_CLIENT_ID}:${CANVA_CLIENT_SECRET}`);
      const tokenRes = await fetch(CANVA_TOKEN_URL, {
        method: "POST",
        headers: {
          Authorization: `Basic ${credentials}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          grant_type: "authorization_code",
          code,
          code_verifier,
          redirect_uri,
        }),
      });

      const tokenData = await tokenRes.json();
      if (!tokenRes.ok) {
        return new Response(JSON.stringify({ error: "Token exchange failed", details: tokenData }), {
          status: tokenRes.status,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      return new Response(JSON.stringify(tokenData), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // ACTION: refresh — Refresh an expired access token
    if (action === "refresh") {
      const { refresh_token } = await req.json();
      if (!refresh_token) {
        return new Response(JSON.stringify({ error: "Missing refresh_token" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const credentials = btoa(`${CANVA_CLIENT_ID}:${CANVA_CLIENT_SECRET}`);
      const tokenRes = await fetch(CANVA_TOKEN_URL, {
        method: "POST",
        headers: {
          Authorization: `Basic ${credentials}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          grant_type: "refresh_token",
          refresh_token,
        }),
      });

      const tokenData = await tokenRes.json();
      return new Response(JSON.stringify(tokenData), {
        status: tokenRes.ok ? 200 : tokenRes.status,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // ACTION: create-design — Create a new design in user's Canva account
    if (action === "create-design") {
      const { access_token, title, design_type } = await req.json();
      if (!access_token) {
        return new Response(JSON.stringify({ error: "Missing access_token" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const res = await fetch(`${CANVA_API_BASE}/designs`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          design_type: { type: "preset", name: design_type || "doc" },
          title: title || "Untitled Design",
        }),
      });

      const data = await res.json();
      return new Response(JSON.stringify(data), {
        status: res.ok ? 200 : res.status,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // ACTION: list-designs — List user's recent designs
    if (action === "list-designs") {
      const access_token = url.searchParams.get("access_token");
      if (!access_token) {
        return new Response(JSON.stringify({ error: "Missing access_token" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const res = await fetch(`${CANVA_API_BASE}/designs?ownership=owned&sort_by=modified_descending`, {
        headers: { Authorization: `Bearer ${access_token}` },
      });

      const data = await res.json();
      return new Response(JSON.stringify(data), {
        status: res.ok ? 200 : res.status,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // ACTION: export-design — Start an export job for a design
    if (action === "export-design") {
      const { access_token, design_id, format } = await req.json();
      if (!access_token || !design_id) {
        return new Response(JSON.stringify({ error: "Missing access_token or design_id" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const res = await fetch(`${CANVA_API_BASE}/exports`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          design_id,
          format: { type: format || "png" },
        }),
      });

      const data = await res.json();
      return new Response(JSON.stringify(data), {
        status: res.ok ? 200 : res.status,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // ACTION: get-export — Check export job status
    if (action === "get-export") {
      const access_token = url.searchParams.get("access_token");
      const job_id = url.searchParams.get("job_id");
      if (!access_token || !job_id) {
        return new Response(JSON.stringify({ error: "Missing access_token or job_id" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const res = await fetch(`${CANVA_API_BASE}/exports/${job_id}`, {
        headers: { Authorization: `Bearer ${access_token}` },
      });

      const data = await res.json();
      return new Response(JSON.stringify(data), {
        status: res.ok ? 200 : res.status,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ error: "Unknown action. Use: exchange, refresh, create-design, list-designs, export-design, get-export" }), {
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
