// Returns an embeddable Office Online edit URL for a shared blank Word/Excel/PowerPoint
// document hosted in the connected Microsoft 365 account.
// All students/teachers who open the same `kind` will edit the SAME shared document.
// v2 — redeploy trigger

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

type Kind = "word" | "excel" | "powerpoint";

const CONFIG: Record<Kind, { connector: string; secretEnv: string; fileName: string; mime: string; blankB64: string }> = {
  word: {
    connector: "microsoft_word",
    secretEnv: "MICROSOFT_WORD_API_KEY",
    fileName: "CodeChamps-Word.docx",
    mime: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    blankB64: "UEsDBBQAAAAIAIE5q1wXmADX6wAAALIBAAATAAAAW0NvbnRlbnRfVHlwZXNdLnhtbH1QyU4DMQy98xWRr2gmAweEUKc9sByBQ/kAK/HMRM2mOC3t3+NpoQdUONpvs99itQ9e7aiwS7GHm7YDRdEk6+LYw8f6pbkHxRWjRZ8i9XAghtXyarE+ZGIl4sg9TLXmB63ZTBSQ25QpCjKkErDKWEad0WxwJH3bdXfapFgp1qbOHiBmTzTg1lf1vJf96ZJCnkE9nphzWA+Ys3cGq+B6F+2vmOY7ohXlkcOTy3wtBNCXI2bo74Qf4ZuUU5wl9Y6lvmIQmv5MxWqbzDaItP3f58KlaRicobN+dsslGWKW1oNvz0hAF88f6GPlyy9QSwMEFAAAAAgAgTmrXD+t/vqvAAAALAEAAAsAAABfcmVscy8ucmVsc43POw7CMAwA0J1TRN5pWgaEUEMXhNQVlQNEiZtWNB/F4dPbk4EBKgZG/57tunnaid0x0uidgKoogaFTXo/OCLh0p/UOGCXptJy8QwEzEjSHVX3GSaY8Q8MYiGXEkYAhpbDnnNSAVlLhA7pc6X20MuUwGh6kukqDfFOWWx4/DVigrNUCYqsrYN0c8B/c9/2o8OjVzaJLP3YsOrIso8Ek4OGj5vqdLjILPJ/Dv548vABQSwMEFAAAAAgAgTmrXAJfxsKZAAAAzAAAABEAAAB3b3JkL2RvY3VtZW50LnhtbDWOQQ6CMBBF95yi6V6KLowhFHaeQA9Q2xFI6EzTqSK3tzRh8+b/zOTP74afX8QXIs+EWp7rRgpAS27GUcvn4366ScHJoDMLIWi5Acuhr7q1dWQ/HjCJnIDcrlpOKYVWKbYTeMM1BcC8e1P0JmUbR7VSdCGSBeb8wC/q0jRX5c2MsmS+yG19nmFH3JH6Th2MhaGwXFa7Onr0f1BLAQIUAxQAAAAIAIE5q1wXmADX6wAAALIBAAATAAAAAAAAAAAAAACAAQAAAABbQ29udGVudF9UeXBlc10ueG1sUEsBAhQDFAAAAAgAgTmrXD+t/vqvAAAALAEAAAsAAAAAAAAAAAAAAIABHAEAAF9yZWxzLy5yZWxzUEsBAhQDFAAAAAgAgTmrXAJfxsKZAAAAzAAAABEAAAAAAAAAAAAAAIAB9AEAAHdvcmQvZG9jdW1lbnQueG1sUEsFBgAAAAADAAMAuQAAALwCAAAAAA==",
  },
  excel: {
    connector: "microsoft_excel",
    secretEnv: "MICROSOFT_EXCEL_API_KEY",
    fileName: "CodeChamps-Excel.xlsx",
    mime: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    blankB64: "UEsDBBQAAAAIAIE5q1ywXVXT/gAAADMCAAATAAAAW0NvbnRlbnRfVHlwZXNdLnhtbK1RvU7DMBDeeQrLaxU7ZUAINe1QYASG8gCHfUms+E8+t6Rvj5NCB1QQA9Pp7vuVvdqMzrIDJjLBN3wpas7Qq6CN7xr+unusbjmjDF6DDR4bfkTim/XVaneMSKyIPTW8zzneSUmqRwckQkRfkDYkB7msqZMR1AAdyuu6vpEq+Iw+V3ny4MXsHlvY28wexnI/NUloibPtiTmFNRxitEZBLrg8eP0tpvqMEEU5c6g3kRaFwOXliAn6OeFL+FweJxmN7AVSfgJXaHK08j2k4S2EQfzucqFnaFujUAe1d0UiKCYETT1idlbMUzgwfvGHAjOb5DyW/9zk7H8uIuc/X38AUEsDBBQAAAAIAIE5q1x+b8CFsQAAACoBAAALAAAAX3JlbHMvLnJlbHONzzsOwjAMBuCdU0TeaVoGhFBDF4TUFZUDhNR9qEkcJQHa25MRKgZGy/4/22U1G82e6MNIVkCR5cDQKmpH2wu4NZftAViI0rZSk0UBCwaoTpvyilrGlAnD6AJLiA0ChhjdkfOgBjQyZOTQpk5H3siYSt9zJ9Uke+S7PN9z/2nACmV1K8DXbQGsWRz+g1PXjQrPpB4GbfyxYzWRZOl7jAJmzV/kpzvRlCUUeDqGf714egNQSwMEFAAAAAgAgTmrXG8lzyC0AAAAKwEAABoAAAB4bC9fcmVscy93b3JrYm9vay54bWwucmVsc43PzQrCMAwA4LtPUXJ32TyIyLpdRNhV5gOULvthW1ua+rO3t3gQFQ+eQhLyJcnL+zyJK3kerJGQJSkIMto2g+kknOvjegeCgzKNmqwhCQsxlMUqP9GkQpzhfnAsImJYQh+C2yOy7mlWnFhHJnZa62cVYuo7dEqPqiPcpOkW/bsBX6ioGgm+ajIQ9eLoH9y27aDpYPVlJhN+7MCb9SP3RCGiyncUJLxKjM+QJVEFjNfgx4/FA1BLAwQUAAAACACBOatcdPlqlr8AAAAeAQAADwAAAHhsL3dvcmtib29rLnhtbI1PMW7DMAzc8wqBeyO7Q1EYtrMUBTKneYBq0bEQizRIpU1+H6Zu9053xOGOd+3ummf3haKJqYN6W4FDGjgmOnVw/Hh/egWnJVAMMxN2cEOFXb9pv1nOn8xnZ37SDqZSlsZ7HSbMQbe8IJkysuRQ7JST10UwRJ0QS579c1W9+BwSwZrQyH8yeBzTgG88XDJSWUME51CsvU5pUbBqPy+0X9FRyFb78OC1TXngPtpScNIkI7KPNfi+9b+2Tev/tvV3UEsDBBQAAAAIAIE5q1wHmuiihAAAAJ0AAAAYAAAAeGwvd29ya3NoZWV0cy9zaGVldDEueG1sPYxLDsIwDAX3nCLynrqwQAgl6abiBHAAqzFNReNUccTn9lRdsJw3emO7T5rNi4tOWRwcmhYMy5DDJKOD++26P4PRShJozsIOvqzQ+Z195/LUyFzNGhB1EGtdLog6RE6kTV5YVvPIJVFdsYyoS2EK2ynNeGzbEyaaBLzdtp4qobf4L/sfUEsBAhQDFAAAAAgAgTmrXLBdVdP+AAAAMwIAABMAAAAAAAAAAAAAAIABAAAAAFtDb250ZW50X1R5cGVzXS54bWxQSwECFAMUAAAACACBOatcfm/AhbEAAAAqAQAACwAAAAAAAAAAAAAAgAEvAQAAX3JlbHMvLnJlbHNQSwECFAMUAAAACACBOatcbyXPILQAAAArAQAAGgAAAAAAAAAAAAAAgAEJAgAAeGwvX3JlbHMvd29ya2Jvb2sueG1sLnJlbHNQSwECFAMUAAAACACBOatcdPlqlr8AAAAeAQAADwAAAAAAAAAAAAAAgAH1AgAAeGwvd29ya2Jvb2sueG1sUEsBAhQDFAAAAAgAgTmrXAea6KKEAAAAnQAAABgAAAAAAAAAAAAAAIAB4QMAAHhsL3dvcmtzaGVldHMvc2hlZXQxLnhtbFBLBQYAAAAABQAFAEUBAACbBAAAAAA=",
  },
  powerpoint: {
    connector: "microsoft_powerpoint",
    secretEnv: "MICROSOFT_POWERPOINT_API_KEY",
    fileName: "CodeChamps-PowerPoint.pptx",
    mime: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    blankB64: "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",
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

function base64ToBytes(b64: string): Uint8Array {
  const bin = atob(b64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return bytes;
}

async function ensureFile(cfg: typeof CONFIG[Kind]): Promise<{ id: string; webUrl: string }> {
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

  // 2. Create blank file
  const putRes = await fetch(gatewayUrl(cfg.connector, `/me/drive/root:${path}:/content`), {
    method: "PUT",
    headers: { ...headers, "Content-Type": cfg.mime },
    body: base64ToBytes(cfg.blankB64),
  });
  if (!putRes.ok) {
    const txt = await putRes.text();
    throw new Error(`Upload failed [${putRes.status}]: ${txt}`);
  }
  const item = await putRes.json();
  return { id: item.id, webUrl: item.webUrl };
}

async function getEditEmbedUrl(cfg: typeof CONFIG[Kind], itemId: string, fallbackWebUrl: string): Promise<string> {
  const headers = authHeaders(cfg.secretEnv);
  const res = await fetch(gatewayUrl(cfg.connector, `/me/drive/items/${itemId}/createLink`), {
    method: "POST",
    headers: { ...headers, "Content-Type": "application/json" },
    body: JSON.stringify({ type: "edit", scope: "anonymous" }),
  });
  if (!res.ok) {
    // Fall back to organization scope or just webUrl
    const txt = await res.text();
    console.warn(`createLink anonymous failed [${res.status}]: ${txt}`);
    return `${fallbackWebUrl}${fallbackWebUrl.includes("?") ? "&" : "?"}action=embedview`;
  }
  const json = await res.json();
  const link = json?.link?.webUrl as string | undefined;
  if (!link) {
    return `${fallbackWebUrl}${fallbackWebUrl.includes("?") ? "&" : "?"}action=embedview`;
  }
  // Office Online sharing links work directly in iframes for anonymous edit
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
