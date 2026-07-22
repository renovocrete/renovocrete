import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Loader2, RefreshCw, ShoppingCart } from "lucide-react";
import { toast } from "sonner";

const STATUSES = ["draft", "submitted", "modified", "confirmed", "paid", "cancelled"] as const;
type Status = typeof STATUSES[number];

const statusLabel: Record<string, string> = {
  draft: "Brouillon", submitted: "Envoyée", modified: "Modifiée",
  confirmed: "Confirmée", paid: "Payée", cancelled: "Annulée",
};
const statusVariant = (s: string): any =>
  s === "paid" ? "default" : s === "submitted" ? "destructive" :
  s === "modified" || s === "confirmed" ? "secondary" : "outline";

export default function AdminOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | Status>("all");
  const [q, setQ] = useState("");
  const [busyId, setBusyId] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    const { data, error } = await (supabase as any)
      .from("contractor_orders")
      .select("*, contractor_profiles!contractor_orders_user_id_fkey(company_name,email,contact_name)")
      .order("created_at", { ascending: false });
    if (error) toast.error(error.message);
    setOrders(data || []);
    setLoading(false);
  };

  useEffect(() => {
    load();
    const ch = supabase
      .channel("admin-orders")
      .on("postgres_changes", { event: "*", schema: "public", table: "contractor_orders" }, (payload) => {
        if (payload.eventType === "INSERT") {
          toast.success("Nouvelle commande reçue", { description: (payload.new as any).order_number });
        }
        load();
      })
      .subscribe();
    return () => { supabase.removeChannel(ch); };
  }, []);

  const filtered = useMemo(() => {
    return orders.filter((o) => {
      if (filter !== "all" && o.status !== filter) return false;
      if (q) {
        const s = q.toLowerCase();
        const c = o.contractor_profiles;
        return [o.order_number, o.project_name, c?.company_name, c?.email].some((v: any) =>
          (v || "").toString().toLowerCase().includes(s));
      }
      return true;
    });
  }, [orders, filter, q]);

  const setStatus = async (o: any, status: Status) => {
    setBusyId(o.id);
    const { error } = await (supabase as any).from("contractor_orders").update({ status }).eq("id", o.id);
    setBusyId(null);
    if (error) return toast.error(error.message);
    toast.success("Statut mis à jour");
    load();
  };

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: orders.length };
    for (const s of STATUSES) c[s] = orders.filter((o) => o.status === s).length;
    return c;
  }, [orders]);

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold">Commandes</h1>
          <p className="text-sm text-muted-foreground">Toutes les commandes envoyées par les sous-traitants depuis le calculateur.</p>
        </div>
        <Button variant="outline" onClick={load}><RefreshCw className="w-4 h-4 mr-2" />Actualiser</Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
        {(["all", ...STATUSES] as const).map((s) => (
          <button key={s} onClick={() => setFilter(s as any)}
            className={`p-3 rounded-lg border text-left transition ${filter === s ? "border-primary bg-primary/5" : "hover:bg-secondary/50"}`}>
            <div className="text-xs text-muted-foreground">{s === "all" ? "Total" : statusLabel[s]}</div>
            <div className="font-heading text-xl font-bold">{counts[s] || 0}</div>
          </button>
        ))}
      </div>

      <div className="flex gap-2">
        <Input placeholder="Rechercher n° commande, client, entreprise…" value={q} onChange={(e) => setQ(e.target.value)} className="max-w-md" />
      </div>

      {loading && <div className="text-sm text-muted-foreground"><Loader2 className="w-4 h-4 inline animate-spin mr-2" />Chargement…</div>}

      {!loading && filtered.length === 0 && (
        <Card className="p-10 text-center space-y-2">
          <ShoppingCart className="w-8 h-8 mx-auto text-muted-foreground" />
          <div className="text-sm text-muted-foreground">Aucune commande</div>
        </Card>
      )}

      <div className="space-y-3">
        {filtered.map((o) => {
          const c = o.contractor_profiles;
          const e = o.items?.[0]?.quote_entry;
          return (
            <Card key={o.id} className="p-4 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <div className="font-mono text-xs">{o.order_number}</div>
                  <div className="text-xs text-muted-foreground">{new Date(o.created_at).toLocaleString("fr-FR")}</div>
                </div>
                <Badge variant={statusVariant(o.status)}>{statusLabel[o.status] || o.status}</Badge>
                <div className="font-heading text-lg font-bold">
                  {Number(o.total_amount ?? o.subtotal).toFixed(2)} {o.currency === "EUR" ? "€" : "$"}
                </div>
              </div>

              <div className="text-sm grid sm:grid-cols-2 md:grid-cols-4 gap-2 p-3 rounded-md bg-secondary/40">
                <div><div className="text-[11px] text-muted-foreground">Sous-traitant</div>
                  <div className="font-semibold truncate">{c?.company_name || "—"}</div>
                  <div className="text-xs text-muted-foreground truncate">{c?.email}</div>
                </div>
                <div><div className="text-[11px] text-muted-foreground">Client / chantier</div>
                  <div className="font-semibold truncate">{o.project_name || e?.clientName || "—"}</div>
                  <div className="text-xs text-muted-foreground truncate">{e?.siteAddress || o.project_city || ""}</div>
                </div>
                {e && <div><div className="text-[11px] text-muted-foreground">Produit</div>
                  <div className="font-semibold truncate">{e.productName}</div>
                  <div className="text-xs text-muted-foreground">{e.surface} m² · {e.totalGallons} gal</div>
                </div>}
                <div><div className="text-[11px] text-muted-foreground">Changer le statut</div>
                  <Select value={o.status} onValueChange={(v) => setStatus(o, v as Status)} disabled={busyId === o.id}>
                    <SelectTrigger className="h-9 mt-1"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {STATUSES.map((s) => <SelectItem key={s} value={s}>{statusLabel[s]}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
