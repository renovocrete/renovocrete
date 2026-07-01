// Admin-only endpoint - reply to a live chatbot conversation
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  try {
    const auth = req.headers.get("Authorization") || "";
    if (!auth.startsWith("Bearer ")) return json({ error: "unauthorized" }, 401);

    const url = Deno.env.get("SUPABASE_URL")!;
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY") ?? Deno.env.get("SUPABASE_PUBLISHABLE_KEY")!;
    const anon = createClient(url, anonKey, { global: { headers: { Authorization: auth } } });
    const token = auth.replace(/^Bearer\s+/i, "");
    const { data: claims } = await anon.auth.getClaims(token);
    const uid = claims?.claims?.sub as string | undefined;
    if (!uid) return json({ error: "unauthorized" }, 401);

    const sb = createClient(url, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
    const { data: roleRow } = await sb.from("user_roles").select("role").eq("user_id", uid).eq("role", "admin").maybeSingle();
    if (!roleRow) return json({ error: "forbidden" }, 403);

    const { conversation_id, content, action } = await req.json();
    if (!conversation_id) return json({ error: "missing conversation_id" }, 400);

    if (action === "close") {
      await sb.from("chatbot_conversations").update({ status: "closed", last_message_at: new Date().toISOString() }).eq("id", conversation_id);
      return json({ ok: true });
    }
    if (action === "reopen") {
      await sb.from("chatbot_conversations").update({ status: "human", assigned_admin_id: uid }).eq("id", conversation_id);
      return json({ ok: true });
    }

    const text = String(content || "").trim();
    if (!text || text.length > 4000) return json({ error: "invalid content" }, 400);

    await sb.from("chatbot_messages").insert({ conversation_id, role: "admin", content: text });
    await sb.from("chatbot_conversations").update({
      status: "human",
      assigned_admin_id: uid,
      last_message_at: new Date().toISOString(),
      unread_admin: 0,
      unread_visitor: 1,
    }).eq("id", conversation_id);

    return json({ ok: true });
  } catch (e: any) {
    return json({ error: e?.message || "error" }, 500);
  }
});

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });
}
