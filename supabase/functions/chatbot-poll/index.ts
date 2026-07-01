// Public endpoint - visitor polls their session's messages & status
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  try {
    const { session_id, since } = await req.json();
    if (!session_id) return json({ error: "missing session_id" }, 400);

    const sb = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
    const { data: conv } = await sb
      .from("chatbot_conversations")
      .select("id,status,assigned_admin_id,visitor_name,visitor_email,last_message_at")
      .eq("session_id", session_id)
      .maybeSingle();

    if (!conv) return json({ status: "bot", messages: [] });

    let q = sb.from("chatbot_messages").select("id,role,content,created_at").eq("conversation_id", conv.id).order("created_at");
    if (since) q = q.gt("created_at", since);
    const { data: msgs } = await q;

    // Reset visitor unread counter
    await sb.from("chatbot_conversations").update({ unread_visitor: 0 }).eq("id", conv.id);

    return json({ status: conv.status, assigned: !!conv.assigned_admin_id, messages: msgs || [] });
  } catch (e: any) {
    return json({ error: e?.message || "error" }, 500);
  }
});

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });
}
