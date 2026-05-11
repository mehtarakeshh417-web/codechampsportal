// Returns an embeddable Office Online edit URL for a shared blank Word/Excel/PowerPoint
// document hosted in the connected Microsoft 365 account.

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

type Kind = "word" | "excel" | "powerpoint";

interface KindConfig {
  connector: string;
  secretEnv: string;
  fileName: string;
  mime: string;
  // URL to a tiny blank OOXML template hosted publicly. Used only the first
  // time the file needs to be created in the connected OneDrive.
  templateUrl: string;
}

const CONFIG: Record<Kind, KindConfig> = {
  word: {
    connector: "microsoft_word",
    secretEnv: "MICROSOFT_WORD_API_KEY",
    fileName: "CodeChamps-Word.docx",
    mime: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    templateUrl: "https://file-examples.com/storage/fe44eeb9c9bd476a17e8b8b/2017/02/file-sample_100kB.docx",
  },
  excel: {
    connector: "microsoft_excel",
    secretEnv: "MICROSOFT_EXCEL_API_KEY",
    fileName: "CodeChamps-Excel.xlsx",
    mime: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    templateUrl: "https://file-examples.com/storage/fe44eeb9c9bd476a17e8b8b/2017/02/file_example_XLSX_10.xlsx",
  },
  powerpoint: {
    connector: "microsoft_powerpoint",
    secretEnv: "MICROSOFT_POWERPOINT_API_KEY",
    fileName: "CodeChamps-PowerPoint.pptx",
    mime: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    templateUrl: "https://scholar.harvard.edu/files/torman_personal/files/samplepptx.pptx",
  },
};

function gatewayUrl(connector: string, path: string) {
  return `https://connector-gateway.lovable.dev/${connector}${path}`;
}

function authHeaders(secretEnv: string) {
  const lovableKey = Deno.env.get("LOVABLE_API_KEY");
  const apiKey = Deno.env.get(secretEnv);
  if (!lovableKey) throw new Error("LOVABLE_API_KEY is not configured");
  if (!apiKey) throw new Error(`${secretEnv} is not configured (Microsoft connector not linked)`);
  return {
    Authorization: `Bearer ${lovableKey}`,
    "X-Connection-Api-Key": apiKey,
  };
}

async function ensureFile(cfg: KindConfig): Promise<{ id: string; webUrl: string }> {
  const headers = authHeaders(cfg.secretEnv);
  const path = `/CodeChamps/${cfg.fileName}`;

  // 1. Try to fetch existing item
  const getRes = await fetch(gatewayUrl(cfg.connector, `/me/drive/root:${path}`), { headers });
  if (getRes.ok) {
    const item = await getRes.json();
    return { id: item.id, webUrl: item.webUrl };
  }
  if (getRes.status !== 404) {
    const txt = await getRes.text();
    throw new Error(`Lookup failed [${getRes.status}]: ${txt}`);
  }

  // 2. Download a blank template from a public URL
  const tplRes = await fetch(cfg.templateUrl);
  if (!tplRes.ok) {
    throw new Error(`Template download failed [${tplRes.status}] from ${cfg.templateUrl}`);
  }
  const body = await tplRes.arrayBuffer();

  // 3. Upload to OneDrive
  const putRes = await fetch(gatewayUrl(cfg.connector, `/me/drive/root:${path}:/content`), {
    method: "PUT",
    headers: { ...headers, "Content-Type": cfg.mime },
    body,
  });
  if (!putRes.ok) {
    const txt = await putRes.text();
    throw new Error(`Upload failed [${putRes.status}]: ${txt}`);
  }
  const item = await putRes.json();
  return { id: item.id, webUrl: item.webUrl };
}

async function getEditEmbedUrl(cfg: KindConfig, itemId: string, fallbackWebUrl: string): Promise<string> {
  const headers = authHeaders(cfg.secretEnv);
  const res = await fetch(gatewayUrl(cfg.connector, `/me/drive/items/${itemId}/createLink`), {
    method: "POST",
    headers: { ...headers, "Content-Type": "application/json" },
    body: JSON.stringify({ type: "edit", scope: "anonymous" }),
  });
  if (!res.ok) {
    const txt = await res.text();
    console.warn(`createLink anonymous failed [${res.status}]: ${txt}`);
    // Try organization scope as a fallback
    const res2 = await fetch(gatewayUrl(cfg.connector, `/me/drive/items/${itemId}/createLink`), {
      method: "POST",
      headers: { ...headers, "Content-Type": "application/json" },
      body: JSON.stringify({ type: "edit", scope: "organization" }),
    });
    if (res2.ok) {
      const json2 = await res2.json();
      const link2 = json2?.link?.webUrl as string | undefined;
      if (link2) return link2;
    }
    return `${fallbackWebUrl}${fallbackWebUrl.includes("?") ? "&" : "?"}action=embedview`;
  }
  const json = await res.json();
  const link = json?.link?.webUrl as string | undefined;
  if (!link) {
    return `${fallbackWebUrl}${fallbackWebUrl.includes("?") ? "&" : "?"}action=embedview`;
  }
  return link;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const { kind } = await req.json().catch(() => ({}));
    if (!kind || !(kind in CONFIG)) {
      return new Response(JSON.stringify({ error: "kind must be 'word' | 'excel' | 'powerpoint'" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const cfg = CONFIG[kind as Kind];
    const file = await ensureFile(cfg);
    const embedUrl = await getEditEmbedUrl(cfg, file.id, file.webUrl);

    return new Response(JSON.stringify({ embedUrl, webUrl: file.webUrl }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("office-embed-url error:", message);
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
