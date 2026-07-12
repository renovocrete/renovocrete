import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

interface Body { fileUrl: string; mimeType?: string; }

const CATALOG_HINTS = `
Catalogue ECS RENOVO CRETE (familles disponibles) :
- REFLECTOR Enhancer (résine métallique effet miroir, sols décoratifs intérieurs)
- Hermetic Flake (résine époxy avec paillettes, garage / commercial)
- Hermetic Quartz (résine + quartz, cuisine pro / industriel)
- Hermetic Urethane Cement (uréthane-ciment, IAA, chocs thermiques)
- THIN-FINISH / MICRO-FINISH / TEXTURE-PAVE (micro-béton / overlay décoratif)
- ULTRA-STONE Antiquing Stain (patine / teinte décorative béton)
- E100-PT1 / PT3 / PT4 / VB5 (primaires époxy)
- AUS-V / SPARTIC-ALL (finitions polyaspartiques / uréthanes UV-stable)
- BACE-LINE 6.3M (ragréage / réparation)
- JFS-450H (mastic joints)
`;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  try {
    const { fileUrl, mimeType }: Body = await req.json();
    if (!fileUrl) return json({ error: "fileUrl requis" }, 400);

    const apiKey = Deno.env.get("LOVABLE_API_KEY");
    if (!apiKey) return json({ error: "LOVABLE_API_KEY manquant" }, 500);

    // Fetch file and encode as base64 data URL
    const fileRes = await fetch(fileUrl);
    if (!fileRes.ok) return json({ error: "Fichier introuvable" }, 400);
    const buf = new Uint8Array(await fileRes.arrayBuffer());
    let bin = "";
    for (let i = 0; i < buf.length; i++) bin += String.fromCharCode(buf[i]);
    const b64 = btoa(bin);
    const mt = mimeType || fileRes.headers.get("content-type") || "application/pdf";

    const contentBlocks: any[] = [
      {
        type: "text",
        text: `Tu es l'assistant technique de RENOVO CRETE (revendeur Elite Crete Systems à Saint-Martin).
Analyse la fiche client jointe et recommande les produits ECS adaptés parmi le catalogue suivant :
${CATALOG_HINTS}
Réponds STRICTEMENT en JSON compact :
{
  "summary": "2-3 lignes résumant surface, usage, contraintes",
  "suggestions": [
    { "product": "<nom exact de la famille ECS>", "reason": "raison courte", "priority": 1 }
  ]
}
Pas de texte hors JSON.`,
      },
    ];
    if (mt.startsWith("image/")) {
      contentBlocks.push({ type: "image_url", image_url: { url: `data:${mt};base64,${b64}` } });
    } else {
      contentBlocks.push({ type: "file", file: { filename: "fiche-client", file_data: `data:${mt};base64,${b64}` } });
    }

    const aiRes = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [{ role: "user", content: contentBlocks }],
      }),
    });
    if (!aiRes.ok) {
      const t = await aiRes.text();
      return json({ error: "AI error", details: t }, aiRes.status);
    }
    const ai = await aiRes.json();
    const text: string = ai?.choices?.[0]?.message?.content ?? "";
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    let parsed: any = { summary: text, suggestions: [] };
    if (jsonMatch) {
      try { parsed = JSON.parse(jsonMatch[0]); } catch { /* keep fallback */ }
    }
    return json(parsed);
  } catch (e) {
    return json({ error: (e as Error).message }, 500);
  }
});

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
