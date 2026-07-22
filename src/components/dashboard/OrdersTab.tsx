import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, FileText, Send, CreditCard, Pencil, ShoppingCart, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { exportClientQuotePDF } from "@/lib/pdf/clientQuote";

interface Props { uid: string; isPreview?: boolean; onModify?: (entry: any) => void; }

export default function OrdersTab({ uid, isPreview, onModify }: Props) {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);

  useEffect(() => {
    if (isPreview) return;
    loadOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPreview, uid]);

  const loadOrders = async () => {
    setLoading(true);
    const { data } = await (supabase as any)
      .from("contractor_orders")
      .select("*")
      .eq("user_id", uid)
      .order("created_at", { ascending: false });
    setOrders(data || []);
    setLoading(false);
  };

  const entryOf = (o: any) => (o.items?.[0]?.quote_entry) || null;

  const downloadPDF = (o: any) => {
    const e = entryOf(o);
    if (!e) return toast.error("Devis indisponible");
    exportClientQuotePDF(
      { clientName: e.clientName || "Client", siteAddress: e.siteAddress || "", product: e.productName, surface: e.surface, coats: e.coats, lang: "fr" },
      { productName: e.productName, ratio: e.ratio, totalGallons: e.totalGallons, partA: e.partA, partB: e.partB,
        costMaterial: e.costMaterial, costLabor: e.costLabor, totalCost: e.totalCost, salePrice: e.salePrice,
        marginAmount: e.marginAmount, marginPct: e.marginPct } as any,
    );
  };

  const setStatus = async (o: any, status: string) => {
    setBusyId(o.id);
    const { error } = await (supabase as any).from("contractor_orders").update({ status }).eq("id", o.id);
    setBusyId(null);
    if (error) return toast.error(error.message);
    toast.success("Commande mise à jour");
    loadOrders();
  };

  const removeOrder = async (o: any) => {
    if (!confirm("Supprimer cette commande ?")) return;
    setBusyId(o.id);
    const { error } = await (supabase as any).from("contractor_orders").delete().eq("id", o.id);
    setBusyId(null);
    if (error) return toast.error(error.message);
    loadOrders();
  };

  const modifyOrder = async (o: any) => {
    const e = entryOf(o);
    if (!e) return toast.error("Devis indisponible");
    onModify?.(e);
    // mark as draft to allow re-submission
    if (o.status !== "draft") await setStatus(o, "draft");
  };

  const statusLabel: Record<string, string> = {
    draft: "Brouillon", submitted: "Envoyée", modified: "Modifiée",
    confirmed: "Confirmée", paid: "Payée", cancelled: "Annulée",
  };
  const statusVariant = (s: string): any =>
    s === "paid" ? "default" : s === "submitted" ? "destructive" :
    s === "modified" || s === "confirmed" ? "secondary" : "outline";

  if (isPreview) {
    return <Card className="p-8 text-center text-muted-foreground">Aperçu — connectez-vous pour voir vos commandes.</Card>;
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="font-heading text-2xl font-semibold">Mes commandes</h2>
        <p className="text-sm text-muted-foreground">Les commandes que vous envoyez depuis le calculateur apparaissent ici. Téléchargez le PDF, envoyez, payez ou modifiez.</p>
      </div>

      {loading && <div className="text-sm text-muted-foreground"><Loader2 className="w-4 h-4 inline animate-spin mr-2" />Chargement…</div>}

      {!loading && orders.length === 0 && (
        <Card className="p-8 text-center space-y-2">
          <ShoppingCart className="w-8 h-8 mx-auto text-muted-foreground" />
          <div className="font-medium">Aucune commande pour l'instant.</div>
          <div className="text-sm text-muted-foreground">Utilisez le calculateur pour créer et envoyer votre première commande.</div>
        </Card>
      )}

      {orders.map((o) => {
        const e = entryOf(o);
        return (
          <Card key={o.id} className="p-4 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <div className="font-mono text-xs">{o.order_number}</div>
                <div className="text-xs text-muted-foreground">{new Date(o.created_at).toLocaleString("fr-FR")}</div>
              </div>
              <Badge variant={statusVariant(o.status)}>{statusLabel[o.status] || o.status}</Badge>
              <div className="font-heading text-lg font-bold">{Number(o.total_amount ?? o.subtotal).toFixed(2)} {o.currency === "EUR" ? "€" : "$"}</div>
            </div>

            {e && (
              <div className="text-sm grid sm:grid-cols-2 md:grid-cols-4 gap-2 p-3 rounded-md bg-secondary/40">
                <div><div className="text-[11px] text-muted-foreground">Produit</div><div className="font-semibold">{e.productName}</div></div>
                <div><div className="text-[11px] text-muted-foreground">Surface</div><div className="font-semibold">{e.surface} m² · {e.coats} couche(s)</div></div>
                <div><div className="text-[11px] text-muted-foreground">Volume</div><div className="font-semibold">{e.totalGallons} gal</div></div>
                <div><div className="text-[11px] text-muted-foreground">Client</div><div className="font-semibold truncate">{e.clientName}</div></div>
              </div>
            )}

            <div className="flex flex-wrap gap-2 justify-end">
              <Button size="sm" variant="outline" onClick={() => downloadPDF(o)}><FileText className="w-4 h-4 mr-1.5" />PDF</Button>
              <Button size="sm" variant="outline" onClick={() => modifyOrder(o)}><Pencil className="w-4 h-4 mr-1.5" />Modifier</Button>
              {o.status === "draft" && (
                <Button size="sm" variant="outline" disabled={busyId === o.id} onClick={() => setStatus(o, "submitted")}>
                  <Send className="w-4 h-4 mr-1.5" />Envoyer
                </Button>
              )}
              {o.status !== "paid" && o.status !== "cancelled" && (
                <Button size="sm" className="bg-gradient-brand-deep" disabled={busyId === o.id} onClick={() => setStatus(o, "paid")}>
                  <CreditCard className="w-4 h-4 mr-1.5" />Payer
                </Button>
              )}
              <Button size="icon" variant="ghost" disabled={busyId === o.id} onClick={() => removeOrder(o)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
