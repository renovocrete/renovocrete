import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ECS_PRODUCTS, type EcsProduct, type EcsCategory } from "@/data/ecsProducts";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Plus, Minus, Trash2, ShoppingCart, Sparkles, Upload, FileText, Package, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

type CartItem = { id: string; qty: number };
type Currency = "EUR" | "USD";

const CATS: EcsCategory[] = [
  "Resinous Products",
  "Cementitious Products",
  "Pigment/Colorant/Stain Products",
  "Single Component Sealer Products",
  "Supplemental Products",
];
const CAT_LABEL: Record<EcsCategory, string> = {
  "Resinous Products": "Résines",
  "Cementitious Products": "Micro-béton / Overlay",
  "Pigment/Colorant/Stain Products": "Pigments & teintes",
  "Single Component Sealer Products": "Scellants 1K",
  "Supplemental Products": "Consommables",
};

interface Props { uid: string; isPreview?: boolean; }

export default function OrdersTab({ uid, isPreview }: Props) {
  const [tab, setTab] = useState("catalog");
  const [currency, setCurrency] = useState<Currency>("EUR");
  const [cat, setCat] = useState<EcsCategory>("Resinous Products");
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [notes, setNotes] = useState("");
  const [phone, setPhone] = useState("");
  const [shipping, setShipping] = useState("");

  // AI reco
  const [recoLoading, setRecoLoading] = useState(false);
  const [recoResult, setRecoResult] = useState<any>(null);
  const [clientSheetUrl, setClientSheetUrl] = useState<string>("");

  const products = useMemo(
    () => ECS_PRODUCTS.filter((p) => p.category === cat && (!query || p.label.toLowerCase().includes(query.toLowerCase()))),
    [cat, query]
  );
  const priceOf = (p: EcsProduct) => (currency === "EUR" ? p.resaleEUR : p.resaleUSD);
  const symbol = currency === "EUR" ? "€" : "$";
  const cartDetailed = cart.map((c) => {
    const p = ECS_PRODUCTS.find((x) => x.id === c.id)!;
    return { ...c, product: p, line: +(priceOf(p) * c.qty).toFixed(2) };
  });
  const subtotal = +cartDetailed.reduce((s, x) => s + x.line, 0).toFixed(2);

  useEffect(() => {
    if (isPreview) return;
    loadOrders();
  }, [isPreview]);

  const loadOrders = async () => {
    setLoadingOrders(true);
    const { data } = await (supabase as any)
      .from("contractor_orders")
      .select("*")
      .eq("user_id", uid)
      .order("created_at", { ascending: false });
    setOrders(data || []);
    setLoadingOrders(false);
  };

  const add = (id: string) => setCart((c) => {
    const x = c.find((i) => i.id === id);
    return x ? c.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i)) : [...c, { id, qty: 1 }];
  });
  const setQty = (id: string, qty: number) =>
    setCart((c) => (qty <= 0 ? c.filter((i) => i.id !== id) : c.map((i) => (i.id === id ? { ...i, qty } : i))));
  const remove = (id: string) => setCart((c) => c.filter((i) => i.id !== id));

  const submitOrder = async () => {
    if (isPreview) return toast.info("Aperçu : connectez-vous pour envoyer une commande.");
    if (cart.length === 0) return toast.error("Panier vide");
    setSubmitting(true);
    const items = cartDetailed.map((x) => ({
      id: x.id, product: x.product.product, packaging: x.product.packaging,
      qty: x.qty, unit_price: priceOf(x.product), line_total: x.line,
    }));
    const { error } = await (supabase as any).from("contractor_orders").insert({
      user_id: uid, status: "submitted", currency, items,
      subtotal, notes: notes || null, contact_phone: phone || null,
      shipping_address: shipping || null, client_sheet_url: clientSheetUrl || null,
    });
    setSubmitting(false);
    if (error) return toast.error(error.message);
    toast.success("Commande envoyée à RENOVO CRETE");
    setCart([]); setNotes(""); setPhone(""); setShipping(""); setClientSheetUrl("");
    setTab("history"); loadOrders();
  };

  const uploadClientSheet = async (file: File) => {
    if (isPreview) return toast.info("Aperçu — connectez-vous pour uploader.");
    const path = `${uid}/client-sheets/${Date.now()}-${file.name}`;
    const { error } = await supabase.storage.from("partner-media").upload(path, file);
    if (error) return toast.error(error.message);
    const { data } = await supabase.storage.from("partner-media").createSignedUrl(path, 60 * 60 * 24 * 7);
    if (data?.signedUrl) {
      setClientSheetUrl(data.signedUrl);
      toast.success("Fiche client uploadée");
      runReco(data.signedUrl, file.type);
    }
  };

  const runReco = async (url: string, mime: string) => {
    setRecoLoading(true); setRecoResult(null);
    try {
      const { data, error } = await supabase.functions.invoke("recommend-products", {
        body: { fileUrl: url, mimeType: mime },
      });
      if (error) throw error;
      setRecoResult(data);
      if (data?.suggestions?.length) {
        toast.success(`${data.suggestions.length} recommandation(s)`);
      }
    } catch (e: any) {
      toast.error(e?.message || "Analyse impossible");
    } finally { setRecoLoading(false); }
  };

  const addSuggestionToCart = (productFamily: string) => {
    // add the smallest packaging of that family
    const match = ECS_PRODUCTS.filter((p) => p.product.toLowerCase().includes(productFamily.toLowerCase()));
    if (match.length === 0) return toast.error("Produit introuvable dans le catalogue");
    const smallest = match.sort((a, b) => a.resaleEUR - b.resaleEUR)[0];
    add(smallest.id);
    toast.success(`Ajouté : ${smallest.label}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-heading text-2xl font-semibold">Commande produits ECS</h2>
          <p className="text-sm text-muted-foreground">Prix de revente RENOVO CRETE — TTC hors transport. Devise au choix.</p>
        </div>
        <div className="flex items-center gap-2">
          <Label className="text-xs">Devise</Label>
          <Select value={currency} onValueChange={(v) => setCurrency(v as Currency)}>
            <SelectTrigger className="w-24"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="EUR">EUR €</SelectItem>
              <SelectItem value="USD">USD $</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList>
          <TabsTrigger value="catalog"><Package className="w-4 h-4 mr-1.5" />Catalogue</TabsTrigger>
          <TabsTrigger value="reco"><Sparkles className="w-4 h-4 mr-1.5" />Reco IA fiche client</TabsTrigger>
          <TabsTrigger value="cart"><ShoppingCart className="w-4 h-4 mr-1.5" />Panier {cart.length > 0 && <Badge className="ml-2">{cart.length}</Badge>}</TabsTrigger>
          <TabsTrigger value="history">Historique</TabsTrigger>
        </TabsList>

        <TabsContent value="catalog" className="space-y-4 pt-4">
          <div className="flex flex-wrap gap-2">
            {CATS.map((c) => (
              <Button key={c} size="sm" variant={cat === c ? "default" : "outline"} onClick={() => setCat(c)}>
                {CAT_LABEL[c]}
              </Button>
            ))}
          </div>
          <Input placeholder="Rechercher un produit ou conditionnement…" value={query} onChange={(e) => setQuery(e.target.value)} />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {products.map((p) => (
              <Card key={p.id} className="p-4 flex flex-col gap-2">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="text-xs uppercase tracking-wide text-muted-foreground">{p.id}</div>
                    <div className="font-semibold text-sm mt-0.5">{p.product}</div>
                    <div className="text-xs text-muted-foreground">{p.packaging}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-heading text-lg font-bold text-primary">{priceOf(p).toFixed(2)} {symbol}</div>
                  </div>
                </div>
                <Button size="sm" onClick={() => add(p.id)}><Plus className="w-4 h-4 mr-1" />Ajouter</Button>
              </Card>
            ))}
            {products.length === 0 && <div className="text-sm text-muted-foreground col-span-full">Aucun produit.</div>}
          </div>
        </TabsContent>

        <TabsContent value="reco" className="space-y-4 pt-4">
          <Card className="p-6 space-y-4">
            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-primary mt-1" />
              <div>
                <h3 className="font-semibold">Recommandation produits depuis la fiche client</h3>
                <p className="text-sm text-muted-foreground">Uploadez la fiche client (PDF ou Word). L'IA détecte le type de surface, l'usage et propose les produits ECS adaptés (Enhancer, Flakes, Quartz, Urethane Cement, Overlay…).</p>
              </div>
            </div>
            <div>
              <Label>Fiche client (PDF, DOCX, image)</Label>
              <Input type="file" accept=".pdf,.docx,.doc,image/*" onChange={(e) => e.target.files?.[0] && uploadClientSheet(e.target.files[0])} />
            </div>
            {recoLoading && <div className="flex items-center gap-2 text-sm text-muted-foreground"><Loader2 className="w-4 h-4 animate-spin" />Analyse en cours…</div>}
            {recoResult && (
              <div className="space-y-3">
                {recoResult.summary && (
                  <div className="rounded-md bg-secondary/50 p-3 text-sm">
                    <div className="font-medium mb-1">Analyse</div>
                    <div className="text-muted-foreground whitespace-pre-line">{recoResult.summary}</div>
                  </div>
                )}
                {recoResult.suggestions?.map((s: any, i: number) => (
                  <Card key={i} className="p-4 flex flex-wrap justify-between items-center gap-3">
                    <div>
                      <div className="font-semibold">{s.product}</div>
                      <div className="text-xs text-muted-foreground">{s.reason}</div>
                    </div>
                    <Button size="sm" onClick={() => addSuggestionToCart(s.product)}>
                      <Plus className="w-4 h-4 mr-1" />Ajouter au panier
                    </Button>
                  </Card>
                ))}
              </div>
            )}
          </Card>
        </TabsContent>

        <TabsContent value="cart" className="space-y-4 pt-4">
          {cartDetailed.length === 0 ? (
            <Card className="p-8 text-center text-muted-foreground">Votre panier est vide.</Card>
          ) : (
            <>
              <div className="space-y-2">
                {cartDetailed.map((x) => (
                  <Card key={x.id} className="p-3 flex flex-wrap items-center gap-3">
                    <div className="flex-1 min-w-[200px]">
                      <div className="font-semibold text-sm">{x.product.product}</div>
                      <div className="text-xs text-muted-foreground">{x.product.packaging} · {priceOf(x.product).toFixed(2)} {symbol}</div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button size="icon" variant="outline" onClick={() => setQty(x.id, x.qty - 1)}><Minus className="w-3 h-3" /></Button>
                      <Input className="w-16 text-center" type="number" min={1} value={x.qty} onChange={(e) => setQty(x.id, Number(e.target.value))} />
                      <Button size="icon" variant="outline" onClick={() => setQty(x.id, x.qty + 1)}><Plus className="w-3 h-3" /></Button>
                    </div>
                    <div className="w-24 text-right font-semibold">{x.line.toFixed(2)} {symbol}</div>
                    <Button size="icon" variant="ghost" onClick={() => remove(x.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
                  </Card>
                ))}
              </div>
              <Card className="p-4 space-y-3">
                <div className="grid sm:grid-cols-2 gap-3">
                  <div><Label>Téléphone de contact</Label><Input value={phone} onChange={(e) => setPhone(e.target.value)} /></div>
                  <div><Label>Adresse livraison</Label><Input value={shipping} onChange={(e) => setShipping(e.target.value)} /></div>
                </div>
                <div><Label>Notes / instructions</Label><Textarea rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} /></div>
                {clientSheetUrl && <div className="text-xs text-muted-foreground flex items-center gap-1"><FileText className="w-3 h-3" />Fiche client jointe</div>}
                <div className="flex items-center justify-between pt-2 border-t">
                  <div className="text-sm text-muted-foreground">Sous-total</div>
                  <div className="font-heading text-2xl font-bold">{subtotal.toFixed(2)} {symbol}</div>
                </div>
                <Button className="w-full" size="lg" onClick={submitOrder} disabled={submitting}>
                  {submitting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <CheckCircle2 className="w-4 h-4 mr-2" />}
                  Envoyer la commande
                </Button>
              </Card>
            </>
          )}
        </TabsContent>

        <TabsContent value="history" className="space-y-3 pt-4">
          {loadingOrders && <div className="text-sm text-muted-foreground"><Loader2 className="w-4 h-4 inline animate-spin mr-2" />Chargement…</div>}
          {!loadingOrders && orders.length === 0 && <Card className="p-6 text-center text-muted-foreground text-sm">Aucune commande.</Card>}
          {orders.map((o) => (
            <Card key={o.id} className="p-4">
              <div className="flex flex-wrap justify-between items-center gap-2">
                <div>
                  <div className="font-mono text-xs">{o.order_number}</div>
                  <div className="text-xs text-muted-foreground">{new Date(o.created_at).toLocaleString("fr-FR")}</div>
                </div>
                <Badge variant={o.status === "submitted" ? "default" : "secondary"}>{o.status}</Badge>
                <div className="font-semibold">{Number(o.subtotal).toFixed(2)} {o.currency === "EUR" ? "€" : "$"}</div>
              </div>
              <div className="mt-2 text-xs text-muted-foreground">{(o.items as any[])?.length || 0} article(s)</div>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
