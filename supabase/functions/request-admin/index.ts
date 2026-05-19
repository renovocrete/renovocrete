import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Whitelist of email patterns allowed to self-promote to admin.
// Bootstrap rule: also allowed if zero admins currently exist.
const ALLOWED_PATTERNS = [/@renovocrete\.test$/i, /^renovocrete@/i];

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const authHeader = req.headers.get("Authorization") || "";
    const token = authHeader.replace(/^Bearer\s+/i, "");
    if (!token) return json({ ok: false, error: "missing token" }, 401);

    const anon = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_PUBLISHABLE_KEY")!, {
      global: { headers: { Authorization: `Bearer ${token}` } },
    });
    const { data: u } = await anon.auth.getUser();
    if (!u?.user) return json({ ok: false, error: "invalid session" }, 401);

    const admin = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);

    const email = u.user.email || "";
    const matchesAllowlist = ALLOWED_PATTERNS.some((re) => re.test(email));

    let bootstrap = false;
    if (!matchesAllowlist) {
      const { count } = await admin.from("user_roles").select("id", { count: "exact", head: true }).eq("role", "admin");
      bootstrap = (count ?? 0) === 0;
    }

    if (!matchesAllowlist && !bootstrap) {
      return json({ ok: false, error: "not_allowed", message: "Demande refusée : un admin existe déjà et votre email n'est pas autorisé." }, 403);
    }

    const { error } = await admin.from("user_roles").upsert({ user_id: u.user.id, role: "admin" }, { onConflict: "user_id,role" });
    if (error) return json({ ok: false, error: error.message }, 500);

    return json({ ok: true, granted: "admin", email, reason: matchesAllowlist ? "allowlist" : "bootstrap" });
  } catch (e: any) {
    return json({ ok: false, error: e.message }, 500);
  }
});

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });
}
