import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
};

const ALLOWED_PATTERNS = [/@renovocrete\.test$/i, /^renovocrete@/i];

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const authHeader = req.headers.get("Authorization") || "";
    const token = authHeader.replace(/^Bearer\s+/i, "");
    if (!token) return json({ ok: false, code: "no_session", message: "Vous devez être connecté." }, 401);

    const anon = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_PUBLISHABLE_KEY")!,
      { global: { headers: { Authorization: `Bearer ${token}` } } },
    );
    const { data: u } = await anon.auth.getUser();
    if (!u?.user) return json({ ok: false, code: "invalid_session", message: "Session invalide." }, 401);

    const admin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const email = u.user.email || "";
    const matchesAllowlist = ALLOWED_PATTERNS.some((re) => re.test(email));

    // Already admin?
    const { data: existingRole } = await admin
      .from("user_roles")
      .select("id")
      .eq("user_id", u.user.id)
      .eq("role", "admin")
      .maybeSingle();
    if (existingRole) {
      return json({ ok: true, code: "already_admin", message: "Vous êtes déjà admin.", granted: false });
    }

    const { count } = await admin
      .from("user_roles")
      .select("id", { count: "exact", head: true })
      .eq("role", "admin");
    const bootstrap = (count ?? 0) === 0;

    if (!matchesAllowlist && !bootstrap) {
      return json(
        {
          ok: false,
          code: "not_allowed",
          message: `Demande refusée : un admin existe déjà et l'email « ${email} » n'est pas autorisé. Connectez-vous avec un compte @renovocrete.test ou demandez à un admin existant.`,
        },
        403,
      );
    }

    const { error } = await admin
      .from("user_roles")
      .upsert({ user_id: u.user.id, role: "admin" }, { onConflict: "user_id,role" });
    if (error) return json({ ok: false, code: "db_error", message: error.message }, 500);

    return json({
      ok: true,
      code: bootstrap ? "bootstrap" : "allowlist",
      granted: true,
      email,
      message: bootstrap
        ? "Bootstrap : aucun admin n'existait, vous êtes maintenant le premier administrateur."
        : "Rôle admin accordé (email autorisé).",
    });
  } catch (e: any) {
    return json({ ok: false, code: "exception", message: e.message }, 500);
  }
});

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
