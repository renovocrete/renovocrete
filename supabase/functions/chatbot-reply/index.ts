// Chatbot reply edge function - uses Lovable AI Gateway
// Public endpoint (verify_jwt = false by default for Lovable-managed functions)
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const SITE_CONTEXT = `Tu es l'assistant officiel de RENOVO CRETE, entreprise spécialisée dans les revêtements en résine époxy et surfaces décoratives/techniques à Saint-Martin et dans toute la Caraïbe. Partenaire formé par ELITE CRETE SYSTEMS.

Tu réponds en français, de manière concise, professionnelle et chaleureuse. Tu orientes vers :
- /devis pour demander un devis personnalisé
- /contact pour contacter l'équipe
- /prestations pour découvrir les services (sols époxy, comptoirs, tables, terrasses, garages, industriel, commercial)
- /types-de-projets pour les exemples de projets
- /galerie pour voir les réalisations
- /visualisation pour le visualiseur IA
- /qui-sommes-nous pour en savoir plus sur l'entreprise

Tu ne révèles JAMAIS d'informations privées sur des employés, clients, partenaires ou comptes. Tu ne génères pas de prix exacts (renvoie vers /devis). Tu restes courtois même face à une question hors sujet.`;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const { session_id, messages } = await req.json();
    if (!session_id || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: "Missing session_id or messages" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      return new Response(JSON.stringify({ error: "LOVABLE_API_KEY not configured" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);

    // Load active knowledge base
    const { data: kb } = await supabase.from("chatbot_knowledge").select("title,content").eq("is_active", true).limit(40);
    const kbBlock = (kb || []).map((k: any) => `- ${k.title}: ${k.content}`).join("\n");

    const sysPrompt = SITE_CONTEXT + (kbBlock ? `\n\nBase documentaire RENOVO CRETE :\n${kbBlock}` : "");

    // Find or create conversation
    let convId: string | null = null;
    const { data: existing } = await supabase.from("chatbot_conversations").select("id").eq("session_id", session_id).maybeSingle();
    if (existing) convId = existing.id;
    else {
      const { data: created } = await supabase.from("chatbot_conversations").insert({ session_id }).select("id").single();
      convId = created?.id || null;
    }

    const lastUser = messages.filter((m: any) => m.role === "user").slice(-1)[0];
    if (convId && lastUser) {
      await supabase.from("chatbot_messages").insert({ conversation_id: convId, role: "user", content: lastUser.content });
    }

    const aiRes = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${LOVABLE_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [{ role: "system", content: sysPrompt }, ...messages.slice(-12)],
      }),
    });

    if (aiRes.status === 429) {
      return new Response(JSON.stringify({ reply: "Trop de requêtes, merci de réessayer dans un instant." }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
    if (aiRes.status === 402) {
      return new Response(JSON.stringify({ reply: "Service IA temporairement indisponible. Contactez-nous via /contact." }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
    if (!aiRes.ok) {
      const t = await aiRes.text();
      console.error("AI gateway error:", aiRes.status, t);
      return new Response(JSON.stringify({ reply: "Désolé, une erreur est survenue. Merci d'essayer plus tard." }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const data = await aiRes.json();
    const reply: string = data?.choices?.[0]?.message?.content || "Je n'ai pas pu formuler de réponse.";

    if (convId) {
      await supabase.from("chatbot_messages").insert({ conversation_id: convId, role: "assistant", content: reply });
      await supabase.from("chatbot_conversations").update({ last_message_at: new Date().toISOString() }).eq("id", convId);
    }

    return new Response(JSON.stringify({ reply }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (e: any) {
    console.error("chatbot-reply error:", e);
    return new Response(JSON.stringify({ error: e?.message || "unknown" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
