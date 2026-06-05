import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Search, LogIn, Save } from "lucide-react";
import { toast } from "sonner";

type Row = { id: string; user_id: string; kind: string; display_name: string | null; email: string | null; company_name: string | null; city: string | null };

const PERMISSION_CATALOG: { key: string; label: string }[] = [
  { key: "extra_tab", label: "Onglet supplémentaire" },
  { key: "premium_features", label: "Fonctionnalités premium" },
  { key: "advanced_tools", label: "Outils avancés" },
  { key: "private_docs", label: "Accès documents privés" },
  { key: "private_events", label: "Accès événements privés" },
  { key: "unlimited_projects", label: "Projets illimités" },
];

export default function AdminPartners() {
  const [rows, setRows] = useState<Row[]>([]);
  const [statuses, setStatuses] = useState<Record<string, string>>({});
  const [perms, setPerms] = useState<Record<string, Record<string, boolean>>>({});
  const [q, setQ] = useState("");
  const [selected, setSelected] = useState<Row | null>(null);

  const load = async () => {
    const { data } = await (supabase as any).from("partner_profiles").select("id,user_id,kind,display_name,email,company_name,city").order("created_at", { ascending: false });
    setRows((data || []) as Row[]);
    const ids = (data || []).map((x: any) => x.user_id);
    if (!ids.length) return;
    const [{ data: st }, { data: pm }] = await Promise.all([
      (supabase as any).from("account_status").select("user_id,status").in("user_id", ids),
      (supabase as any).from("admin_permissions").select("user_id,permissions").in("user_id", ids),
    ]);
    const sMap: Record<string, string> = {};
    (st || []).forEach((x: any) => { sMap[x.user_id] = x.status; });
    setStatuses(sMap);
    const pMap: Record<string, Record<string, boolean>> = {};
    (pm || []).forEach((x: any) => { pMap[x.user_id] = x.permissions || {}; });
    setPerms(pMap);
  };
  useEffect(() => { load(); }, []);

  const setStatus = async (user_id: string, status: string) => {
    const { error } = await (supabase as any).from("account_status").upsert({ user_id, status });
    if (error) return toast.error(error.message);
    toast.success("Statut mis à jour");
    load();
  };

  const savePerms = async (user_id: string) => {
    const { error } = await (supabase as any).from("admin_permissions").upsert({ user_id, permissions: perms[user_id] || {} });
    if (error) return toast.error(error.message);
    toast.success("Permissions enregistrées");
  };

  const impersonate = async (email: string) => {
    const { data, error } = await supabase.functions.invoke("admin-impersonate", { body: { email } });
    if (error || !(data as any)?.action_link) return toast.error("Lien introuvable");
    sessionStorage.setItem("impersonation_active", email);
    window.location.href = (data as any).action_link;
  };

  const filtered = rows.filter(r => !q || [r.display_name || "", r.email || "", r.company_name || ""].some(x => x.toLowerCase().includes(q.toLowerCase())));

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <header className="mb-6">
        <h1 className="font-heading text-2xl font-bold">Architectes & Constructeurs</h1>
        <p className="text-muted-foreground text-sm">{rows.length} partenaires</p>
      </header>

      <div className="relative mb-4 max-w-md">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Rechercher…" value={q} onChange={(e) => setQ(e.target.value)} className="pl-9" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 divide-y max-h-[70vh] overflow-y-auto">
          {filtered.map((r) => (
            <button key={r.id} onClick={() => setSelected(r)} className={`w-full text-left p-4 hover:bg-secondary transition ${selected?.id === r.id ? "bg-secondary" : ""}`}>
              <div className="flex items-center justify-between gap-2">
                <p className="font-semibold truncate">{r.display_name || r.company_name || r.email}</p>
                <Badge variant="outline" className="capitalize">{r.kind}</Badge>
              </div>
              <p className="text-xs text-muted-foreground truncate mt-1">{r.email} {r.city ? `· ${r.city}` : ""}</p>
              <p className="text-xs mt-1">Statut : <span className="font-medium capitalize">{statuses[r.user_id] || "active"}</span></p>
            </button>
          ))}
          {filtered.length === 0 && <div className="p-6 text-center text-sm text-muted-foreground">Aucun partenaire.</div>}
        </Card>

        <Card className="lg:col-span-2 p-6">
          {!selected ? (
            <div className="text-center text-muted-foreground py-12 text-sm">Sélectionnez un partenaire pour gérer ses droits.</div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-heading text-xl font-bold">{selected.display_name || selected.company_name}</h2>
                  <p className="text-sm text-muted-foreground">{selected.email} · <span className="capitalize">{selected.kind}</span></p>
                </div>
                <Button variant="outline" size="sm" onClick={() => impersonate(selected.email || "")}><LogIn className="w-4 h-4 mr-1" />Se connecter</Button>
              </div>

              <div>
                <p className="text-xs uppercase font-semibold text-muted-foreground mb-2">Statut du compte</p>
                <div className="flex gap-2">
                  {["active","disabled","suspended","pending"].map((s) => (
                    <Button key={s} variant={statuses[selected.user_id] === s ? "default" : "outline"} size="sm" onClick={() => setStatus(selected.user_id, s)} className="capitalize">{s}</Button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs uppercase font-semibold text-muted-foreground mb-3">Permissions personnalisées</p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {PERMISSION_CATALOG.map((p) => {
                    const current = perms[selected.user_id] || {};
                    return (
                      <label key={p.key} className="flex items-center justify-between gap-3 p-3 border border-border rounded-lg">
                        <span className="text-sm">{p.label}</span>
                        <Switch
                          checked={!!current[p.key]}
                          onCheckedChange={(v) => setPerms((prev) => ({ ...prev, [selected.user_id]: { ...(prev[selected.user_id] || {}), [p.key]: v } }))}
                        />
                      </label>
                    );
                  })}
                </div>
                <Button onClick={() => savePerms(selected.user_id)} className="mt-4"><Save className="w-4 h-4 mr-2" />Enregistrer</Button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
