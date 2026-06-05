// Admin "impersonate" - generates a magic link for the target user.
// Restricted to admins only.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const authHeader = req.headers.get("Authorization") || "";
    const token = authHeader.replace(/^Bearer\s+/i, "");
    if (!token) return json({ error: "Unauthorized" }, 401);

    const anon = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_ANON_KEY")!, {
      global: { headers: { Authorization: `Bearer ${token}` } },
    });
    const { data: u } = await anon.auth.getUser();
    if (!u?.user) return json({ error: "Invalid session" }, 401);

    const admin = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);

    const { data: roleCheck } = await admin
      .from("user_roles")
      .select("id")
      .eq("user_id", u.user.id)
      .eq("role", "admin")
      .maybeSingle();
    if (!roleCheck) return json({ error: "Forbidden" }, 403);

    const { email, reason } = await req.json();
    if (!email) return json({ error: "Missing email" }, 400);

    const origin = req.headers.get("origin") || "https://renovocrete.lovable.app";

    const { data: link, error } = await admin.auth.admin.generateLink({
      type: "magiclink",
      email,
      options: { redirectTo: `${origin}/dashboard` },
    });
    if (error) return json({ error: error.message }, 500);

    // find target user id for logging
    const { data: targetUser } = await admin.from("partner_profiles").select("user_id").eq("email", email).maybeSingle();
    const targetId = (targetUser as any)?.user_id;

    if (targetId) {
      await admin.from("admin_impersonation_log").insert({
        admin_id: u.user.id,
        target_user_id: targetId,
        reason: reason || null,
      });
    }

    return json({ action_link: (link as any)?.properties?.action_link || (link as any)?.action_link, email });
  } catch (e: any) {
    return json({ error: e?.message || "unknown" }, 500);
  }
});

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
