import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are CodeChamps AI Tutor — a friendly, encouraging computer science tutor for Indian school students (Class 1 to 10).

Rules:
- Always be encouraging and patient. Use simple language appropriate for the student's class level.
- For Class 1-4: Use very simple words, analogies, and examples from daily life. Keep answers short (2-3 sentences).
- For Class 5-7: Use clear explanations with examples. Can introduce basic technical terms.
- For Class 8-10: Can use proper technical terminology. Give detailed explanations with code examples when relevant.
- Always relate concepts to the Indian school curriculum (CBSE/ICSE computer science).
- If asked about non-CS topics, gently redirect: "That's interesting! But I'm your Computer Science tutor 🖥️ Ask me about coding, computers, or technology!"
- Use emojis sparingly to keep it fun 🎮
- Format code examples with markdown code blocks.
- Keep responses concise — students have short attention spans!
- If the student seems stuck, break the problem into smaller steps.
- You have access to real-time web search results. When search results are provided, use them to give accurate, up-to-date information. Always prefer search results over your training data for factual/current info.
- When citing info from search results, keep it natural — don't say "according to search results".`;

// Simple web search using DuckDuckGo HTML endpoint
async function webSearch(query: string): Promise<string> {
  try {
    const url = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`;
    const resp = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; CodeChamps/1.0)",
      },
    });
    if (!resp.ok) return "";

    const html = await resp.text();

    // Extract search result snippets from DuckDuckGo HTML
    const snippets: string[] = [];
    const snippetRegex = /<a class="result__snippet"[^>]*>([\s\S]*?)<\/a>/gi;
    let match;
    while ((match = snippetRegex.exec(html)) !== null && snippets.length < 5) {
      // Strip HTML tags
      const text = match[1].replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#x27;/g, "'").trim();
      if (text.length > 20) snippets.push(text);
    }

    // Also extract titles
    const titleRegex = /<a class="result__a"[^>]*>([\s\S]*?)<\/a>/gi;
    const titles: string[] = [];
    while ((match = titleRegex.exec(html)) !== null && titles.length < 5) {
      const text = match[1].replace(/<[^>]+>/g, "").trim();
      if (text.length > 5) titles.push(text);
    }

    if (snippets.length === 0) return "";

    let searchContext = "Web Search Results:\n";
    for (let i = 0; i < snippets.length; i++) {
      searchContext += `${i + 1}. ${titles[i] || ""}: ${snippets[i]}\n`;
    }
    return searchContext;
  } catch (e) {
    console.error("Web search error:", e);
    return "";
  }
}

// Determine if a query needs web search (current events, recent info, factual questions)
function needsWebSearch(message: string): boolean {
  const lower = message.toLowerCase();
  const searchTriggers = [
    "latest", "recent", "current", "today", "2024", "2025", "2026", "new",
    "what is", "who is", "when did", "how to", "tell me about",
    "explain", "define", "meaning of", "difference between",
    "best", "top", "popular", "trending", "update",
    "python", "javascript", "html", "css", "java", "scratch",
    "ai ", "artificial intelligence", "machine learning", "chatgpt", "gemini",
    "computer", "technology", "software", "hardware", "internet",
    "cbse", "icse", "syllabus", "exam", "board"
  ];
  return searchTriggers.some((t) => lower.includes(t));
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, classLevel } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const classContext = classLevel
      ? `\nThe student is in ${classLevel}. Adjust your language complexity accordingly.`
      : "";

    // Get the latest user message for web search
    const lastUserMsg = [...messages].reverse().find((m: any) => m.role === "user");
    let searchContext = "";

    if (lastUserMsg && needsWebSearch(lastUserMsg.content)) {
      // Build a focused search query
      const searchQuery = `${lastUserMsg.content} computer science education`;
      searchContext = await webSearch(searchQuery);
      if (searchContext) {
        searchContext = `\n\n--- REAL-TIME WEB SEARCH RESULTS (use these for accurate, current information) ---\n${searchContext}--- END SEARCH RESULTS ---\n`;
      }
    }

    const systemContent = SYSTEM_PROMPT + classContext + searchContext;

    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            { role: "system", content: systemContent },
            ...messages,
          ],
          stream: true,
        }),
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "AI tutor is busy right now. Please try again in a moment! 🕐" }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Please contact your school admin." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(
        JSON.stringify({ error: "AI tutor is temporarily unavailable." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("ai-tutor error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
