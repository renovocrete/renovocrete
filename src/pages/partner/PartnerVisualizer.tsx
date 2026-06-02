import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Sparkles, FileText } from "lucide-react";
import { toast } from "sonner";
import { exportTechSheetPDF } from "@/lib/pdf/techSheet";

const PRODUCTS = ["Reflector Enhancer", "Thin-Finish", "Hermetic Stone", "Rustic Wood", "Mica Stone"];
const FINISHES = ["satin", "brillant", "mat", "métallique"];

export default function PartnerVisualizer() {
  const { user } = useAuth();
  const [imageUrl, setImageUrl] = useState("");
  const [product, setProduct] = useState(PRODUCTS[0]);
  const [color, setColor] = useState("Ivoire Sable");
  const [finish, setFinish] = useState("satin");
  const [surface, setSurface] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const upload = async (file: File) => {
    if (!user) return;
    const path = `${user.id}/sim-${Date.now()}-${file.name}`;
    const { error } = await supabase.storage.from("partner-media").upload(path, file);
    if (error) return toast.error(error.message);
    const { data } = await supabase.storage.from("partner-media").createSignedUrl(path, 60 * 60);
    if (data?.signedUrl) setImageUrl(data.signedUrl);
  };

  const generate = async () => {
    if (!imageUrl) return toast.error("Importez une photo");
    setLoading(true); setResult(null);
    try {
      const { data, error } = await supabase.functions.invoke("visualize-surface", {
        body: { imageUrl, productName: product, colorName: color, colorHint: color, surfaceType: "floor" },
      });
      if (error) throw error;
      if ((data as any)?.imageUrl) {
        setResult((data as any).imageUrl);
        if (user) {
          await (supabase as any).from("partner_ai_simulations").insert({
            user_id: user.id,
            source_image_url: imageUrl,
            result_image_url: (data as any).imageUrl,
            product, color, finish,
            surface_m2: surface ? Number(surface) : null,
          });
        }
        toast.success("Visuel généré");
      } else {
        toast.error("Aucune image générée");
      }
    } catch (e: any) {
      toast.error(e?.message || "Erreur");
    } finally { setLoading(false); }
  };

  const exportPdf = () => {
    const s = Number(surface || 0);
    exportTechSheetPDF({
      product, color, finish, surface_m2: s,
      productRef: `RC-${product.split(" ")[0].toUpperCase().slice(0, 4)}`,
      estimatedBudget: s * 95,
      generatedAt: new Date(),
    });
  };

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-semibold">Visualiseur IA</h1>
        <p className="text-muted-foreground mt-1">Importez une photo, sélectionnez matériaux et finitions, générez un rendu et exportez la fiche technique.</p>
      </header>
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle className="text-base">Paramètres</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Photo du projet</Label>
              <Input type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])} />
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              <div><Label>Produit</Label>
                <Select value={product} onValueChange={setProduct}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{PRODUCTS.map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div><Label>Finition</Label>
                <Select value={finish} onValueChange={setFinish}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{FINISHES.map((f) => <SelectItem key={f} value={f}>{f}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div><Label>Couleur</Label><Input value={color} onChange={(e) => setColor(e.target.value)} /></div>
              <div><Label>Surface (m²)</Label><Input type="number" value={surface} onChange={(e) => setSurface(e.target.value)} /></div>
            </div>
            <div className="flex gap-2">
              <Button onClick={generate} disabled={loading || !imageUrl} className="flex-1">
                {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Sparkles className="w-4 h-4 mr-2" />}
                Générer le rendu
              </Button>
              <Button variant="outline" onClick={exportPdf}><FileText className="w-4 h-4 mr-2" />Fiche technique</Button>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-base">Comparaison avant / après</CardTitle></CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Avant</div>
                {imageUrl ? <img src={imageUrl} className="w-full aspect-square object-cover rounded-md border" /> : <div className="aspect-square bg-muted rounded-md" />}
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Après</div>
                {result ? <img src={result} className="w-full aspect-square object-cover rounded-md border" /> : <div className="aspect-square bg-muted rounded-md flex items-center justify-center text-xs text-muted-foreground">en attente</div>}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
