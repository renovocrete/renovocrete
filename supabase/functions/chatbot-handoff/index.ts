// Public endpoint - visitor requests human handoff & submits contact info
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  try {
    const { session_id, name, email, message } = await req.json();
    if (!session_id) return json({ error: "missing session_id" }, 400);
    const cleanName = String(name || "").slice(0, 120);
    const cleanEmail = String(email || "").slice(0, 200);
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(cleanEmail)) return json({ error: "invalid email" }, 400);

    const sb = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
    let { data: conv } = await sb.from("chatbot_conversations").select("id").eq("session_id", session_id).maybeSingle();
    if (!conv) {
      const { data: created } = await sb.from("chatbot_conversations").insert({ session_id }).select("id").single();
      conv = created!;
    }

    await sb.from("chatbot_conversations").update({
      status: "human",
      visitor_name: cleanName || null,
      visitor_email: cleanEmail,
      unread_admin: 1,
      last_message_at: new Date().toISOString(),
    }).eq("id", conv.id);

    const intro = `[Handoff] ${cleanName || "Visiteur"} <${cleanEmail}>${message ? " — " + String(message).slice(0, 500) : ""}`;
    await sb.from("chatbot_messages").insert({ conversation_id: conv.id, role: "system", content: intro });

    return json({ ok: true });
  } catch (e: any) {
    return json({ error: e?.message || "error" }, 500);
  }
});

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });
}
