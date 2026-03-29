import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { topic, targetClass, questionType, count, difficulty } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const typeDesc = questionType === "mixed"
      ? "mixed (MCQ + True/False + Fill in the Blanks)"
      : questionType === "mcq"
      ? "Multiple Choice (MCQ)"
      : questionType === "truefalse"
      ? "True/False"
      : "Fill in the Blanks";

    const prompt = `You are an expert K-8 computer science teacher. Generate exactly ${count || 5} ${typeDesc} questions for ${targetClass || "a general"} class on the topic: "${topic}".
Difficulty level: ${difficulty || "Medium"}.

Return ONLY a valid JSON array. Each item must have:
- "type": "mcq", "truefalse", or "fillinblanks"
- "question": the question text
- "options": array of 4 strings (for MCQ only, omit for others)
- "correctAnswer": the correct answer string
- "explanation": brief explanation of the answer

Example: [{"type":"mcq","question":"What is HTML?","options":["A markup language","A programming language","A database","An OS"],"correctAnswer":"A markup language","explanation":"HTML stands for HyperText Markup Language."}]

Make questions age-appropriate and educational. Return ONLY the JSON array, no other text.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: "You are an expert educational content creator. Always return valid JSON arrays only." },
          { role: "user", content: prompt },
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limited. Please try again in a moment." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add funds." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI generation failed. Please try again." }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    const text = data?.choices?.[0]?.message?.content;
    if (!text) {
      return new Response(JSON.stringify({ error: "No content in AI response" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      return new Response(JSON.stringify({ error: "Could not parse AI response" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const questions = JSON.parse(jsonMatch[0]);
    return new Response(JSON.stringify({ questions }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("generate-assignment error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "AI generation failed. Please try again." }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
