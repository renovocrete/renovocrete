// Edge function: transform a "before" photo into "after" using ECS color/finish via Lovable AI Gateway
import { corsHeaders } from "@supabase/supabase-js/cors";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  try {
    const { imageUrl, productName, colorName, colorHint, surfaceType } = await req.json();
    if (!imageUrl || !colorName) {
      return new Response(JSON.stringify({ error: "imageUrl and colorName required" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY missing");

    const prompt = `Photorealistic architectural visualization. Replace the existing ${surfaceType || "floor"} surface in this photo with an Elite Crete Systems ${productName} finish in "${colorName}" color (${colorHint || colorName}). Keep the exact same camera angle, perspective, lighting, walls, furniture and shadows. Only the surface material changes. Render the new surface with realistic reflections, slight gloss and authentic resin/epoxy texture. High quality, professional interior photography.`;

    const r = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${LOVABLE_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-image",
        messages: [{ role: "user", content: [{ type: "text", text: prompt }, { type: "image_url", image_url: { url: imageUrl } }] }],
        modalities: ["image", "text"],
      }),
    });
    if (r.status === 429) return new Response(JSON.stringify({ error: "Limite atteinte. Réessayez dans un instant." }), { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    if (r.status === 402) return new Response(JSON.stringify({ error: "Crédits IA épuisés. Ajoutez des crédits dans Lovable Cloud." }), { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    if (!r.ok) {
      const t = await r.text();
      console.error("AI gw error", r.status, t);
      return new Response(JSON.stringify({ error: "AI gateway error" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
    const data = await r.json();
    const url = data.choices?.[0]?.message?.images?.[0]?.image_url?.url;
    if (!url) return new Response(JSON.stringify({ error: "no image returned" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    return new Response(JSON.stringify({ imageUrl: url }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (e) {
    console.error("visualize error", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "unknown" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
