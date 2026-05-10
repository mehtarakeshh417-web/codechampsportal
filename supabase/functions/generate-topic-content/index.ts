import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const buildPrompt = (classNumber: number, title: string) => `You are creating an interactive learning module for an Indian school student in Class ${classNumber}.
Topic: "${title}"

Return STRICT JSON ONLY (no markdown fences) matching this exact shape:
{
  "overview": {
    "introduction": "2-3 sentence engaging intro",
    "objectives": ["3-5 learning objectives"],
    "difficulty": "Beginner" | "Intermediate" | "Advanced",
    "estimatedMinutes": number,
    "keyConcepts": ["4-7 key concepts"]
  },
  "learn": [
    { "heading": "string", "body": "1-3 paragraphs of explanation, can use \\n for breaks", "highlight": "optional important note", "example": "optional real-life example" }
  ],
  "images": [
    { "title": "short title", "description": "what the image shows", "emoji": "1 relevant emoji", "caption": "1-line caption" }
  ],
  "activities": [
    { "title": "string", "instructions": ["step 1", "step 2"], "expectedOutput": "string", "hint": "string" }
  ],
  "practice": [
    { "type": "mcq" | "fill" | "truefalse", "question": "string", "options": ["a","b","c","d"] (mcq only), "answer": "string", "explanation": "string" }
  ],
  "quiz": [
    { "question": "string", "options": ["a","b","c","d"], "answerIndex": 0, "explanation": "string" }
  ]
}

Rules:
- learn: 4-6 sections
- images: 4-6 items (descriptive, no real URLs)
- activities: 2-4 items
- practice: 5-7 items mixed types
- quiz: exactly 10 multiple-choice questions
- Class ${classNumber <= 3 ? "1-3: very simple words, playful" : classNumber <= 5 ? "4-5: simple, friendly" : classNumber <= 7 ? "6-7: clear with technical terms" : "8-10: technical, exam-ready"}.
- Be original, accurate, and aligned to Indian CBSE/ICSE-style computer textbooks.`;

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { topicId, classNumber, title, force } = await req.json();
    if (!topicId || !title || !classNumber) {
      return new Response(JSON.stringify({ error: "Missing topicId, classNumber, or title" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, serviceKey);

    // Cache lookup
    if (!force) {
      const { data: cached } = await supabase
        .from("topic_ai_content")
        .select("content")
        .eq("topic_id", topicId)
        .maybeSingle();
      if (cached?.content) {
        return new Response(JSON.stringify({ content: cached.content, cached: true }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const aiResp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: "You output ONLY valid JSON. No markdown. No explanations." },
          { role: "user", content: buildPrompt(classNumber, title) },
        ],
        response_format: { type: "json_object" },
      }),
    });

    if (!aiResp.ok) {
      const text = await aiResp.text();
      console.error("AI gateway error:", aiResp.status, text);
      if (aiResp.status === 429) {
        return new Response(JSON.stringify({ error: "AI is busy, please retry shortly." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (aiResp.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Contact admin." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      return new Response(JSON.stringify({ error: "AI generation failed" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await aiResp.json();
    const raw = data.choices?.[0]?.message?.content || "{}";
    let parsed: any;
    try {
      parsed = JSON.parse(raw);
    } catch {
      // try to strip code fences
      const cleaned = raw.replace(/```json|```/g, "").trim();
      parsed = JSON.parse(cleaned);
    }

    // Persist
    await supabase.from("topic_ai_content").upsert({
      topic_id: topicId,
      class_number: classNumber,
      topic_title: title,
      content: parsed,
      updated_at: new Date().toISOString(),
    });

    return new Response(JSON.stringify({ content: parsed, cached: false }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("generate-topic-content error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
