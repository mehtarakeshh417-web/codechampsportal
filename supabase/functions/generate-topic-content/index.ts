import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

type Section = "overview" | "learn" | "images" | "activities" | "practice" | "quiz";

const tone = (n: number) =>
  n <= 3 ? "very simple words, playful, short sentences" :
  n <= 5 ? "simple, friendly examples" :
  n <= 7 ? "clear with technical terms" :
           "technical, accurate, exam-ready";

const SECTION_PROMPTS: Record<Section, (n: number, t: string) => string> = {
  overview: (n, t) => `Class ${n} computer topic: "${t}". Tone: ${tone(n)}.
Return JSON: {"introduction":"2-3 sentences","objectives":["3-5 strings"],"difficulty":"Beginner|Intermediate|Advanced","estimatedMinutes":number,"keyConcepts":["4-7 strings"]}`,

  learn: (n, t) => `Class ${n} computer topic: "${t}". Tone: ${tone(n)}.
Return JSON: {"sections":[{"heading":"string","body":"1-2 short paragraphs (use \\n for breaks)","highlight":"optional","example":"optional"}]}
Provide 4-6 sections.`,

  images: (n, t) => `Class ${n} computer topic: "${t}". Tone: ${tone(n)}.
Return JSON: {"images":[{"title":"short","description":"what it shows","emoji":"1 emoji","caption":"1 line"}]}
Provide 4-6 items.`,

  activities: (n, t) => `Class ${n} computer topic: "${t}". Tone: ${tone(n)}.
Return JSON: {"activities":[{"title":"string","instructions":["step1","step2"],"expectedOutput":"string","hint":"string"}]}
Provide 2-4 items.`,

  practice: (n, t) => `Class ${n} computer topic: "${t}". Tone: ${tone(n)}.
Return JSON: {"practice":[{"type":"mcq|fill|truefalse","question":"string","options":["a","b","c","d"] (mcq only),"answer":"string","explanation":"string"}]}
Provide 5-7 mixed items.`,

  quiz: (n, t) => `Class ${n} computer topic: "${t}". Tone: ${tone(n)}.
Return JSON: {"quiz":[{"question":"string","options":["a","b","c","d"],"answerIndex":0,"explanation":"string"}]}
Provide exactly 8 multiple-choice questions.`,
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { topicId, classNumber, title, section } = await req.json();
    if (!topicId || !title || !classNumber || !section) {
      return new Response(JSON.stringify({ error: "Missing topicId, classNumber, title or section" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const promptFn = SECTION_PROMPTS[section as Section];
    if (!promptFn) {
      return new Response(JSON.stringify({ error: "Invalid section" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      return new Response(JSON.stringify({ error: "AI not configured" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const aiResp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${LOVABLE_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: "Output ONLY valid JSON. No markdown, no prose." },
          { role: "user", content: promptFn(classNumber, title) },
        ],
        response_format: { type: "json_object" },
      }),
    });

    if (!aiResp.ok) {
      const text = await aiResp.text();
      console.error("AI gateway error:", aiResp.status, text);
      const status = aiResp.status === 429 || aiResp.status === 402 ? aiResp.status : 500;
      const message = aiResp.status === 429 ? "AI is busy, please retry shortly."
                    : aiResp.status === 402 ? "AI credits exhausted. Contact admin."
                    : "AI generation failed";
      return new Response(JSON.stringify({ error: message }), {
        status, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await aiResp.json();
    const raw = data.choices?.[0]?.message?.content || "{}";
    let parsed: any;
    try { parsed = JSON.parse(raw); }
    catch { parsed = JSON.parse(raw.replace(/```json|```/g, "").trim()); }

    return new Response(JSON.stringify({ section, content: parsed }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("generate-topic-content error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
