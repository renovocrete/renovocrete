import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const DEMO = [
  { email: "admin@renovocrete.test", password: "Renovo2026!", company: "Renovo Crete Admin", contact: "Admin Démo", role: "admin" as const },
  { email: "contractor@renovocrete.test", password: "Renovo2026!", company: "Sous-traitant Démo", contact: "Contractor Démo", role: "contractor" as const },
];

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const admin = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
    const results: any[] = [];

    for (const d of DEMO) {
      // Try create — if already exists, fetch existing
      let userId: string | null = null;
      const { data: created, error } = await admin.auth.admin.createUser({
        email: d.email,
        password: d.password,
        email_confirm: true,
        user_metadata: { company_name: d.company, contact_name: d.contact },
      });

      if (created?.user) {
        userId = created.user.id;
      } else if (error && /already|registered|exists/i.test(error.message)) {
        const { data: list } = await admin.auth.admin.listUsers({ page: 1, perPage: 200 });
        const found = list?.users.find((u) => u.email === d.email);
        if (found) {
          userId = found.id;
          // Reset password so demo creds always work
          await admin.auth.admin.updateUserById(found.id, { password: d.password });
        }
      } else if (error) {
        results.push({ email: d.email, status: "error", message: error.message });
        continue;
      }

      if (!userId) {
        results.push({ email: d.email, status: "error", message: "no user id" });
        continue;
      }

      // Ensure role
      await admin.from("user_roles").upsert({ user_id: userId, role: d.role }, { onConflict: "user_id,role" });

      // Ensure published profile for visibility
      await admin.from("contractor_profiles").update({ is_published: true }).eq("user_id", userId);

      results.push({ email: d.email, password: d.password, role: d.role, status: "ready" });
    }

    return new Response(JSON.stringify({ ok: true, accounts: results }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e: any) {
    return new Response(JSON.stringify({ ok: false, error: e.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
