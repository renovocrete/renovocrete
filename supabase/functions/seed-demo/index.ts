import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
};

const DEMO_PASSWORD = Deno.env.get("DEMO_PASSWORD") || "Renovo2026!";

const DEMO = [
  { email: "admin@renovocrete.test", company: "Renovo Crete Admin", contact: "Admin Démo", role: "admin" as const },
  { email: "contractor@renovocrete.test", company: "Sous-traitant Démo", contact: "Contractor Démo", role: "contractor" as const },
];

async function findUserByEmail(admin: ReturnType<typeof createClient>, email: string) {
  // Paginate listUsers to detect reliably without relying on error messages.
  for (let page = 1; page <= 10; page++) {
    const { data, error } = await admin.auth.admin.listUsers({ page, perPage: 200 });
    if (error) throw error;
    const found = data?.users.find((u) => (u.email || "").toLowerCase() === email.toLowerCase());
    if (found) return found;
    if (!data || data.users.length < 200) break;
  }
  return null;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const admin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );
    const results: any[] = [];

    for (const d of DEMO) {
      let action: "created" | "reset" | "unchanged" = "unchanged";
      let userId: string | null = null;

      const existing = await findUserByEmail(admin, d.email);
      if (existing) {
        userId = existing.id;
        // Always reset password so demo creds always work.
        const { error: updErr } = await admin.auth.admin.updateUserById(existing.id, {
          password: DEMO_PASSWORD,
          email_confirm: true,
        });
        if (updErr) {
          results.push({ email: d.email, status: "error", message: updErr.message });
          continue;
        }
        action = "reset";
      } else {
        const { data: created, error } = await admin.auth.admin.createUser({
          email: d.email,
          password: DEMO_PASSWORD,
          email_confirm: true,
          user_metadata: { company_name: d.company, contact_name: d.contact },
        });
        if (error || !created?.user) {
          results.push({ email: d.email, status: "error", message: error?.message || "create failed" });
          continue;
        }
        userId = created.user.id;
        action = "created";
      }

      // Ensure role assigned correctly.
      await admin
        .from("user_roles")
        .upsert({ user_id: userId, role: d.role }, { onConflict: "user_id,role" });

      // Ensure a published contractor profile exists for visibility.
      // The handle_new_contractor trigger creates one on signup; for pre-existing/admin accounts we may need to seed it.
      const { data: prof } = await admin
        .from("contractor_profiles")
        .select("id")
        .eq("user_id", userId)
        .maybeSingle();

      if (!prof) {
        const baseSlug = d.email.split("@")[0].replace(/[^a-z0-9]+/gi, "-").toLowerCase();
        await admin.from("contractor_profiles").insert({
          user_id: userId,
          slug: baseSlug,
          company_name: d.company,
          contact_name: d.contact,
          email: d.email,
          is_published: true,
        });
      } else {
        await admin.from("contractor_profiles").update({ is_published: true }).eq("user_id", userId);
      }

      results.push({
        email: d.email,
        role: d.role,
        action,
        status: "ready",
      });
    }

    return new Response(
      JSON.stringify({ ok: true, password: DEMO_PASSWORD, accounts: results }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (e: any) {
    return new Response(JSON.stringify({ ok: false, error: e.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
