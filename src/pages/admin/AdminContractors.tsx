import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Eye, LogIn, Power } from "lucide-react";
import { toast } from "sonner";

type Row = {
  id: string;
  user_id: string;
  company_name: string;
  contact_name: string | null;
  email: string;
  city: string | null;
  is_published: boolean;
  slug: string;
};

export default function AdminContractors() {
  const [rows, setRows] = useState<Row[]>([]);
  const [statuses, setStatuses] = useState<Record<string, string>>({});
  const [q, setQ] = useState("");

  const load = async () => {
    const { data } = await supabase.from("contractor_profiles").select("id,user_id,company_name,contact_name,email,city,is_published,slug").order("created_at", { ascending: false });
    setRows((data || []) as Row[]);
    const { data: st } = await (supabase as any).from("account_status").select("user_id,status");
    const map: Record<string, string> = {};
    (st || []).forEach((s: any) => { map[s.user_id] = s.status; });
    setStatuses(map);
  };
  useEffect(() => { load(); }, []);

  const setStatus = async (user_id: string, status: string) => {
    const { error } = await (supabase as any).from("account_status").upsert({ user_id, status, updated_by: (await supabase.auth.getUser()).data.user?.id });
    if (error) return toast.error(error.message);
    toast.success("Statut mis à jour");
    load();
  };

  const impersonate = async (email: string) => {
    const { data, error } = await supabase.functions.invoke("admin-impersonate", { body: { email } });
    if (error || !(data as any)?.action_link) return toast.error("Impossible de générer le lien");
    sessionStorage.setItem("impersonation_active", email);
    window.location.href = (data as any).action_link;
  };

  const filtered = rows.filter(r =>
    !q || [r.company_name, r.email, r.city || "", r.contact_name || ""].some(x => x.toLowerCase().includes(q.toLowerCase()))
  );

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <header className="mb-6">
        <h1 className="font-heading text-2xl font-bold">Sous-traitants</h1>
        <p className="text-muted-foreground text-sm">{rows.length} comptes</p>
      </header>

      <div className="relative mb-4 max-w-md">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Rechercher entreprise, email, ville…" value={q} onChange={(e) => setQ(e.target.value)} className="pl-9" />
      </div>

      <Card className="divide-y">
        {filtered.map((r) => {
          const st = statuses[r.user_id] || "active";
          return (
            <div key={r.id} className="p-4 flex items-center gap-4">
              <div className="flex-1 min-w-0">
                <p className="font-semibold truncate">{r.company_name}</p>
                <p className="text-xs text-muted-foreground truncate">{r.contact_name} · {r.email} {r.city ? `· ${r.city}` : ""}</p>
              </div>
              <Badge variant={st === "active" ? "default" : "secondary"} className="capitalize">{st}</Badge>
              <Button asChild size="sm" variant="ghost"><a href={`/sous-traitants/${r.slug}`} target="_blank" rel="noreferrer"><Eye className="w-4 h-4" /></a></Button>
              <Button size="sm" variant="outline" onClick={() => impersonate(r.email)}><LogIn className="w-4 h-4 mr-1" />Se connecter</Button>
              <select value={st} onChange={(e) => setStatus(r.user_id, e.target.value)} className="h-9 rounded-md border border-input bg-background px-2 text-xs">
                <option value="active">Actif</option>
                <option value="disabled">Désactivé</option>
                <option value="suspended">Suspendu</option>
                <option value="pending">En attente</option>
                <option value="deleted">Supprimé</option>
              </select>
            </div>
          );
        })}
        {filtered.length === 0 && <div className="p-8 text-center text-sm text-muted-foreground">Aucun sous-traitant.</div>}
      </Card>
    </div>
  );
}
