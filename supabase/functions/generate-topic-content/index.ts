import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

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
    { "heading": "string", "body": "1-3 paragraphs (use \\n for breaks)", "highlight": "optional important note", "example": "optional real-life example" }
  ],
  "images": [
    { "title": "short title", "description": "what the image shows", "emoji": "1 relevant emoji", "caption": "1-line caption" }
  ],
  "activities": [
    { "title": "string", "instructions": ["step 1", "step 2"], "expectedOutput": "string", "hint": "string" }
  ],
  "practice": [
    { "type": "mcq" | "fill" | "truefalse", "question": "string", "options": ["a","b","c","d"], "answer": "string", "explanation": "string" }
  ],
  "quiz": [
    { "question": "string", "options": ["a","b","c","d"], "answerIndex": 0, "explanation": "string" }
  ]
}

Rules:
- learn: 4-6 sections
- images: 4-6 items (descriptive, no real URLs)
- activities: 2-4 items
- practice: 5-7 mixed-type items (omit options for fill/truefalse)
- quiz: exactly 10 multiple-choice questions
- Tone for Class ${classNumber <= 3 ? "1-3: very simple words, playful, short sentences" : classNumber <= 5 ? "4-5: simple, friendly examples" : classNumber <= 7 ? "6-7: clear with technical terms" : "8-10: technical, exam-ready, accurate"}.
- Be original, accurate, aligned to Indian CBSE/ICSE-style computer textbooks.`;

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { topicId, classNumber, title } = await req.json();
    if (!topicId || !title || !classNumber) {
      return new Response(JSON.stringify({ error: "Missing topicId, classNumber, or title" }), {
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
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: "You output ONLY valid JSON. No markdown. No prose." },
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
      parsed = JSON.parse(raw.replace(/```json|```/g, "").trim());
    }

    return new Response(JSON.stringify({ content: parsed }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("generate-topic-content error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
