import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LogOut, Plus, Briefcase, Calculator as CalcIcon, Wand2, User, Trash2, Loader2, FileDown, Euro, Copy, History, FileText, Users, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { CATALOGS, calculateResin, getCatalog, ProductLine, FORMULAS } from "@/data/colors";
import { useLanguage } from "@/i18n/LanguageContext";
import { useAuth } from "@/hooks/useAuth";
import { computeQuote } from "@/lib/calculator";
import { exportClientQuotePDF } from "@/lib/pdf/clientQuote";
import { exportInternalQuotePDF } from "@/lib/pdf/internalQuote";
import { listHistory, saveEntry, removeEntry, clearHistory, type QuoteHistoryEntry } from "@/lib/quoteHistory";
import { z } from "zod";
import { Switch } from "@/components/ui/switch";

export default function Dashboard() {
  const nav = useNavigate();
  const { t } = useLanguage();
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) { nav("/auth"); return; }
      setUser(data.session.user);
      loadAll(data.session.user.id);
    });
  }, [nav]);

  const loadAll = async (uid: string) => {
    const { data: p } = await supabase.from("contractor_profiles").select("*").eq("user_id", uid).maybeSingle();
    setProfile(p);
    const { data: pr } = await supabase.from("projects").select("*").eq("user_id", uid).order("created_at", { ascending: false });
    setProjects(pr || []);
  };

  const signOut = async () => { await supabase.auth.signOut(); nav("/"); };

  if (!user || !profile) return <div className="pt-32 text-center"><Loader2 className="w-6 h-6 mx-auto animate-spin text-primary" /></div>;

  const totalCA = projects.reduce((s, p) => s + (Number(p.revenue) || 0), 0);
  const inProgress = projects.filter((p) => p.status === "in_progress").length;
  const completed = projects.filter((p) => p.status === "completed").length;

  return (
    <div className="pt-24 pb-16 bg-secondary/20 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-heading text-3xl font-bold">{profile.company_name}</h1>
            <p className="text-sm text-muted-foreground">{t("Tableau de bord pro", "Pro dashboard")} • {profile.is_published ? <Badge className="bg-primary text-primary-foreground">{t("Profil public", "Public profile")}</Badge> : <Badge variant="outline">{t("Profil privé", "Private profile")}</Badge>}</p>
          </div>
          <Button variant="ghost" onClick={signOut}><LogOut className="w-4 h-4 mr-2" />{t("Déconnexion", "Sign out")}</Button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="p-5"><div className="text-xs text-muted-foreground">{t("Chantiers totaux", "Total projects")}</div><div className="text-2xl font-bold mt-1">{projects.length}</div></Card>
          <Card className="p-5"><div className="text-xs text-muted-foreground">{t("En cours", "In progress")}</div><div className="text-2xl font-bold mt-1 text-primary">{inProgress}</div></Card>
          <Card className="p-5"><div className="text-xs text-muted-foreground">{t("Terminés", "Completed")}</div><div className="text-2xl font-bold mt-1">{completed}</div></Card>
          <Card className="p-5"><div className="text-xs text-muted-foreground">{t("Chiffre d'affaires", "Revenue")}</div><div className="text-2xl font-bold mt-1">{totalCA.toLocaleString()} €</div></Card>
        </div>

        <Tabs defaultValue="projects">
          <TabsList className="mb-4">
            <TabsTrigger value="projects"><Briefcase className="w-4 h-4 mr-1.5" />{t("Chantiers", "Projects")}</TabsTrigger>
            <TabsTrigger value="calculator"><CalcIcon className="w-4 h-4 mr-1.5" />{t("Calculateur résine", "Resin calculator")}</TabsTrigger>
            <TabsTrigger value="visualizer"><Wand2 className="w-4 h-4 mr-1.5" />{t("Visualiseur IA", "AI visualizer")}</TabsTrigger>
            <TabsTrigger value="profile"><User className="w-4 h-4 mr-1.5" />{t("Mon profil public", "Public profile")}</TabsTrigger>
          </TabsList>

          <TabsContent value="projects"><ProjectsTab uid={user.id} projects={projects} onChange={() => loadAll(user.id)} /></TabsContent>
          <TabsContent value="calculator"><CalculatorTab /></TabsContent>
          <TabsContent value="visualizer"><VisualizerTab uid={user.id} /></TabsContent>
          <TabsContent value="profile"><ProfileTab profile={profile} onSaved={() => loadAll(user.id)} /></TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function ProjectsTab({ uid, projects, onChange }: { uid: string; projects: any[]; onChange: () => void }) {
  const { t } = useLanguage();
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ title: "", client_name: "", address: "", surface_m2: "", product_type: "reflector", color: "", status: "planned", priority: "medium", revenue: "" });

  const add = async () => {
    const { error } = await supabase.from("projects").insert({
      user_id: uid, title: form.title, client_name: form.client_name, address: form.address,
      surface_m2: form.surface_m2 ? Number(form.surface_m2) : null, product_type: form.product_type, color: form.color,
      status: form.status as any, priority: form.priority as any, revenue: form.revenue ? Number(form.revenue) : 0,
    });
    if (error) return toast.error(error.message);
    toast.success(t("Chantier ajouté", "Project added"));
    setAdding(false); setForm({ title: "", client_name: "", address: "", surface_m2: "", product_type: "reflector", color: "", status: "planned", priority: "medium", revenue: "" });
    onChange();
  };
  const del = async (id: string) => { await supabase.from("projects").delete().eq("id", id); onChange(); };
  const updateStatus = async (id: string, status: string) => { await supabase.from("projects").update({ status: status as any }).eq("id", id); onChange(); };

  const statusColor = (s: string) => ({ planned: "secondary", in_progress: "default", completed: "outline", on_hold: "destructive" }[s] || "secondary") as any;
  const priColor = (p: string) => ({ low: "outline", medium: "secondary", high: "default", urgent: "destructive" }[p] || "secondary") as any;

  return (
    <div className="space-y-4">
      <div className="flex justify-end"><Button onClick={() => setAdding(!adding)} className="bg-gradient-brand-deep"><Plus className="w-4 h-4 mr-1" />{t("Nouveau chantier", "New project")}</Button></div>
      {adding && (
        <Card className="p-5 space-y-3">
          <div className="grid sm:grid-cols-2 gap-3">
            <div><Label>{t("Titre", "Title")}</Label><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></div>
            <div><Label>{t("Client", "Client")}</Label><Input value={form.client_name} onChange={(e) => setForm({ ...form, client_name: e.target.value })} /></div>
            <div><Label>{t("Adresse", "Address")}</Label><Input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} /></div>
            <div><Label>Surface (m²)</Label><Input type="number" value={form.surface_m2} onChange={(e) => setForm({ ...form, surface_m2: e.target.value })} /></div>
            <div><Label>{t("Produit", "Product")}</Label>
              <Select value={form.product_type} onValueChange={(v) => setForm({ ...form, product_type: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{CATALOGS.map((c) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div><Label>{t("Couleur", "Color")}</Label><Input value={form.color} onChange={(e) => setForm({ ...form, color: e.target.value })} /></div>
            <div><Label>{t("Statut", "Status")}</Label>
              <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="planned">{t("Planifié", "Planned")}</SelectItem>
                  <SelectItem value="in_progress">{t("En cours", "In progress")}</SelectItem>
                  <SelectItem value="completed">{t("Terminé", "Completed")}</SelectItem>
                  <SelectItem value="on_hold">{t("En attente", "On hold")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div><Label>{t("Priorité", "Priority")}</Label>
              <Select value={form.priority} onValueChange={(v) => setForm({ ...form, priority: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="low">Low</SelectItem><SelectItem value="medium">Medium</SelectItem><SelectItem value="high">High</SelectItem><SelectItem value="urgent">Urgent</SelectItem></SelectContent>
              </Select>
            </div>
            <div><Label>CA (€)</Label><Input type="number" value={form.revenue} onChange={(e) => setForm({ ...form, revenue: e.target.value })} /></div>
          </div>
          <div className="flex gap-2"><Button onClick={add} className="bg-gradient-brand-deep">{t("Enregistrer", "Save")}</Button><Button variant="outline" onClick={() => setAdding(false)}>{t("Annuler", "Cancel")}</Button></div>
        </Card>
      )}

      {projects.length === 0 ? <Card className="p-12 text-center text-muted-foreground">{t("Aucun chantier. Ajoutez votre premier.", "No projects yet. Add your first.")}</Card> :
        <div className="space-y-2">
          {projects.map((p) => (
            <Card key={p.id} className="p-4 flex items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="font-semibold">{p.title}</h4>
                  <Badge variant={priColor(p.priority)}>{p.priority}</Badge>
                </div>
                <div className="text-xs text-muted-foreground mt-0.5">{p.client_name} {p.address && `· ${p.address}`} {p.surface_m2 && `· ${p.surface_m2} m²`} {p.product_type && `· ${p.product_type}`} {p.color && `· ${p.color}`}</div>
              </div>
              <div className="text-sm font-semibold">{p.revenue ? `${Number(p.revenue).toLocaleString()} €` : "—"}</div>
              <Select value={p.status} onValueChange={(v) => updateStatus(p.id, v)}>
                <SelectTrigger className="w-36"><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="planned">Planifié</SelectItem><SelectItem value="in_progress">En cours</SelectItem><SelectItem value="completed">Terminé</SelectItem><SelectItem value="on_hold">En attente</SelectItem></SelectContent>
              </Select>
              <Button size="icon" variant="ghost" onClick={() => del(p.id)}><Trash2 className="w-4 h-4" /></Button>
            </Card>
          ))}
        </div>}
    </div>
  );
}

// Default indicative prices per gallon (EUR), editable by the contractor.
const DEFAULT_PRICES: Record<ProductLine, number> = {
  reflector: 290,
  flake: 180,
  quartz: 210,
  urethane: 340,
  chemstone: 150,
  portion: 95,
  resinous: 165,
};

const PRODUCT_IDS = CATALOGS.map((c) => c.id) as [ProductLine, ...ProductLine[]];

function CalculatorTab() {
  const { t, lang } = useLanguage();
  const [product, setProduct] = useState<ProductLine>("reflector");
  const [surface, setSurface] = useState("30");
  const [coats, setCoats] = useState("1");
  const [quoteMode, setQuoteMode] = useState(false);
  const [prices, setPrices] = useState<Record<ProductLine, number>>(() => {
    try {
      const saved = localStorage.getItem("renovo-resin-prices");
      return saved ? { ...DEFAULT_PRICES, ...JSON.parse(saved) } : DEFAULT_PRICES;
    } catch { return DEFAULT_PRICES; }
  });
  const [clientName, setClientName] = useState("");
  const [siteAddress, setSiteAddress] = useState("");
  const [errors, setErrors] = useState<{ surface?: string; coats?: string; product?: string }>({});

  // Strict validation schema
  const schema = z.object({
    product: z.enum(PRODUCT_IDS, {
      errorMap: () => ({ message: t("Produit ECS invalide", "Invalid ECS product") }),
    }),
    surface: z.coerce
      .number({ invalid_type_error: t("Surface invalide", "Invalid surface") })
      .positive({ message: t("La surface doit être supérieure à 0", "Surface must be greater than 0") })
      .max(10000, { message: t("Surface max : 10 000 m²", "Max surface: 10,000 m²") }),
    coats: z.coerce
      .number({ invalid_type_error: t("Nombre de couches invalide", "Invalid coats number") })
      .int({ message: t("Le nombre de couches doit être entier", "Coats must be a whole number") })
      .min(1, { message: t("Minimum 1 couche", "At least 1 coat") })
      .max(10, { message: t("Maximum 10 couches", "Max 10 coats") }),
  });

  const parsed = schema.safeParse({ product, surface, coats });
  const isValid = parsed.success;
  const result = isValid ? calculateResin(product, parsed.data.surface, parsed.data.coats) : null;
  const cat = getCatalog(product)!;
  const unitPrice = prices[product] || 0;
  const totalCost = result ? +(result.totalGallons * unitPrice).toFixed(2) : 0;

  const validateAndShow = () => {
    const r = schema.safeParse({ product, surface, coats });
    if (!r.success) {
      const e: typeof errors = {};
      r.error.issues.forEach((iss) => {
        const k = iss.path[0] as keyof typeof errors;
        if (!e[k]) e[k] = iss.message;
      });
      setErrors(e);
      return false;
    }
    setErrors({});
    return true;
  };

  const updatePrice = (id: ProductLine, val: string) => {
    const next = { ...prices, [id]: Math.max(0, Number(val) || 0) };
    setPrices(next);
    try { localStorage.setItem("renovo-resin-prices", JSON.stringify(next)); } catch {}
  };

  const exportPDF = () => {
    if (!validateAndShow() || !result) {
      toast.error(t("Corrigez les erreurs avant d'exporter", "Fix errors before exporting"));
      return;
    }
    const doc = new jsPDF({ unit: "mm", format: "a4" });
    const W = 210;
    let y = 20;

    // Header band
    doc.setFillColor(44, 78, 184);
    doc.rect(0, 0, W, 14, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text("RENOVO CRETE", 14, 9);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text(t("Estimation technique résine ECS", "ECS resin technical estimate"), W - 14, 9, { align: "right" });

    y = 30;
    doc.setTextColor(31, 31, 34);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text(quoteMode ? t("Devis Calculateur", "Calculator Quote") : t("Estimation Résine", "Resin Estimate"), 14, y);
    y += 6;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(120, 120, 128);
    doc.text(`${t("Émis le", "Issued on")} ${new Date().toLocaleDateString(lang === "fr" ? "fr-FR" : "en-US")}`, 14, y);

    if (clientName || siteAddress) {
      y += 10;
      doc.setTextColor(31, 31, 34);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.text(t("CHANTIER", "PROJECT"), 14, y);
      y += 5;
      doc.setFont("helvetica", "normal");
      if (clientName) { doc.text(`${t("Client", "Client")}: ${clientName}`, 14, y); y += 5; }
      if (siteAddress) { doc.text(`${t("Adresse", "Address")}: ${siteAddress}`, 14, y); y += 5; }
    }

    y += 8;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text(t("PARAMÈTRES", "PARAMETERS"), 14, y);
    y += 6;
    doc.setFont("helvetica", "normal");
    const rows: [string, string][] = [
      [t("Produit ECS", "ECS Product"), cat.name],
      [t("Surface", "Surface"), `${parsed.data.surface} m²`],
      [t("Nombre de couches", "Coats"), String(parsed.data.coats)],
    ];
    rows.forEach(([k, v]) => {
      doc.setTextColor(120, 120, 128);
      doc.text(k, 14, y);
      doc.setTextColor(31, 31, 34);
      doc.text(v, 80, y);
      y += 6;
    });

    y += 4;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text(t("VOLUMES ESTIMÉS", "ESTIMATED VOLUMES"), 14, y);
    y += 6;
    doc.setFont("helvetica", "normal");
    const volumes: [string, string][] = [
      [t("Total mélangé (A+B)", "Total mixed (A+B)"), `${result.totalGallons} gal`],
      ["Part A " + t("(résine)", "(resin)"), `${result.partA} gal`],
      ["Part B " + t("(durcisseur)", "(hardener)"), result.partB ? `${result.partB} gal` : "—"],
    ];
    volumes.forEach(([k, v]) => {
      doc.setTextColor(120, 120, 128);
      doc.text(k, 14, y);
      doc.setTextColor(31, 31, 34);
      doc.text(v, 80, y);
      y += 6;
    });

    if (quoteMode) {
      y += 4;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.setTextColor(31, 31, 34);
      doc.text(t("DEVIS", "QUOTE"), 14, y);
      y += 6;
      doc.setFont("helvetica", "normal");
      doc.setTextColor(120, 120, 128);
      doc.text(`${t("Prix unitaire", "Unit price")} (${cat.name})`, 14, y);
      doc.setTextColor(31, 31, 34);
      doc.text(`${unitPrice.toFixed(2)} € / gal`, 80, y);
      y += 6;
      doc.setTextColor(120, 120, 128);
      doc.text(t("Quantité", "Quantity"), 14, y);
      doc.setTextColor(31, 31, 34);
      doc.text(`${result.totalGallons} gal`, 80, y);
      y += 8;
      doc.setFillColor(44, 78, 184);
      doc.rect(14, y - 5, W - 28, 12, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.text(t("TOTAL ESTIMÉ", "ESTIMATED TOTAL"), 18, y + 3);
      doc.text(`${totalCost.toLocaleString(lang === "fr" ? "fr-FR" : "en-US", { minimumFractionDigits: 2 })} €`, W - 18, y + 3, { align: "right" });
      y += 14;
    }

    y += 6;
    doc.setTextColor(120, 120, 128);
    doc.setFont("helvetica", "italic");
    doc.setFontSize(8);
    const note = lang === "fr" ? result.notes.fr : result.notes.en;
    const noteLines = doc.splitTextToSize(`${t("Note chantier", "Site note")}: ${note}`, W - 28);
    doc.text(noteLines, 14, y);
    y += noteLines.length * 4 + 4;
    const disclaimer = t(
      "Valeurs indicatives basées sur les fiches techniques ECS. Vérifiez les conditions chantier (porosité, température, primaire) avant commande ferme.",
      "Indicative values from ECS data sheets. Verify on-site conditions (porosity, temperature, primer) before final order."
    );
    const disLines = doc.splitTextToSize(disclaimer, W - 28);
    doc.text(disLines, 14, y);

    doc.setFontSize(7);
    doc.text("renovocrete.com · partenaire certifié Elite Crete Systems SXM", W / 2, 290, { align: "center" });

    const fname = `renovo-${quoteMode ? "devis" : "estimation"}-${product}-${parsed.data.surface}m2.pdf`;
    doc.save(fname);
    toast.success(t("PDF exporté", "PDF exported"));
  };

  return (
    <Card className="p-6">
      <div className="flex items-start justify-between flex-wrap gap-3 mb-1">
        <h2 className="font-heading text-xl font-semibold">{t("Calculateur de résine ECS", "ECS resin calculator")}</h2>
        <div className="flex items-center gap-2 text-sm">
          <Euro className="w-4 h-4 text-muted-foreground" />
          <Label htmlFor="quote-mode" className="cursor-pointer">{t("Mode devis", "Quote mode")}</Label>
          <Switch id="quote-mode" checked={quoteMode} onCheckedChange={setQuoteMode} />
        </div>
      </div>
      <p className="text-sm text-muted-foreground mb-6">
        {quoteMode
          ? t("Convertit les gallons estimés en coût total avec vos prix unitaires.", "Converts estimated gallons into total cost using your unit prices.")
          : t("Estimez le volume A + B nécessaire pour votre chantier.", "Estimate A + B volume needed for your project.")}
      </p>

      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        <div>
          <Label>{t("Produit", "Product")}</Label>
          <Select value={product} onValueChange={(v) => setProduct(v as ProductLine)}>
            <SelectTrigger className={errors.product ? "border-destructive" : ""}><SelectValue /></SelectTrigger>
            <SelectContent>{CATALOGS.map((c) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}</SelectContent>
          </Select>
          {errors.product && <p className="text-xs text-destructive mt-1">{errors.product}</p>}
        </div>
        <div>
          <Label>Surface (m²)</Label>
          <Input
            type="number" min="0.1" max="10000" step="0.1"
            value={surface}
            onChange={(e) => { setSurface(e.target.value); if (errors.surface) setErrors({ ...errors, surface: undefined }); }}
            onBlur={validateAndShow}
            className={errors.surface ? "border-destructive" : ""}
          />
          {errors.surface && <p className="text-xs text-destructive mt-1">{errors.surface}</p>}
        </div>
        <div>
          <Label>{t("Nombre de couches", "Number of coats")}</Label>
          <Input
            type="number" min="1" max="10" step="1"
            value={coats}
            onChange={(e) => { setCoats(e.target.value); if (errors.coats) setErrors({ ...errors, coats: undefined }); }}
            onBlur={validateAndShow}
            className={errors.coats ? "border-destructive" : ""}
          />
          {errors.coats && <p className="text-xs text-destructive mt-1">{errors.coats}</p>}
        </div>
      </div>

      {result ? (
        <>
          <div className="grid sm:grid-cols-3 gap-4">
            <Card className="p-5 bg-gradient-brand-deep text-primary-foreground">
              <div className="text-xs opacity-80">{t("Total mélangé", "Total mixed")}</div>
              <div className="text-3xl font-bold mt-1">{result.totalGallons} gal</div>
            </Card>
            <Card className="p-5 bg-secondary"><div className="text-xs text-muted-foreground">Part A (résine)</div><div className="text-3xl font-bold mt-1">{result.partA} gal</div></Card>
            <Card className="p-5 bg-secondary"><div className="text-xs text-muted-foreground">Part B (durcisseur)</div><div className="text-3xl font-bold mt-1">{result.partB || "—"} {result.partB ? "gal" : ""}</div></Card>
          </div>
          <p className="text-xs text-muted-foreground mt-4 italic">{lang === "fr" ? result.notes.fr : result.notes.en} — {cat.name}.</p>
          <p className="text-xs text-muted-foreground mt-1">{t("Valeurs indicatives. Vérifiez la fiche technique ECS officielle pour votre application.", "Indicative values. Check the official ECS technical data sheet for your application.")}</p>
        </>
      ) : (
        <Card className="p-5 bg-destructive/5 border-destructive/30">
          <p className="text-sm text-destructive font-medium">{t("Corrigez les paramètres pour afficher le résultat.", "Fix the parameters to display results.")}</p>
        </Card>
      )}

      {quoteMode && (
        <div className="mt-6 pt-6 border-t space-y-4">
          <h3 className="font-heading text-lg font-semibold flex items-center gap-2">
            <Euro className="w-4 h-4 text-primary" /> {t("Mode devis", "Quote mode")}
          </h3>
          <div className="grid sm:grid-cols-2 gap-3">
            <div><Label>{t("Nom client", "Client name")}</Label><Input value={clientName} onChange={(e) => setClientName(e.target.value)} maxLength={100} placeholder={t("Optionnel — figure sur le PDF", "Optional — appears on PDF")} /></div>
            <div><Label>{t("Adresse chantier", "Site address")}</Label><Input value={siteAddress} onChange={(e) => setSiteAddress(e.target.value)} maxLength={200} placeholder={t("Optionnel", "Optional")} /></div>
          </div>

          <div>
            <Label className="mb-2 block">{t("Prix par gallon (€) — éditables et sauvegardés localement", "Price per gallon (€) — editable, saved locally")}</Label>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2">
              {CATALOGS.map((c) => (
                <div key={c.id} className={`p-2 rounded border ${product === c.id ? "border-primary bg-primary/5" : "border-border"}`}>
                  <div className="text-[11px] text-muted-foreground truncate">{c.name}</div>
                  <Input
                    type="number" min="0" step="0.01"
                    value={prices[c.id]}
                    onChange={(e) => updatePrice(c.id, e.target.value)}
                    className="h-8 mt-1"
                  />
                </div>
              ))}
            </div>
          </div>

          {result && (
            <Card className="p-5 bg-gradient-brand-deep text-primary-foreground">
              <div className="flex items-end justify-between flex-wrap gap-2">
                <div>
                  <div className="text-xs opacity-80">{t("Coût total estimé", "Estimated total cost")}</div>
                  <div className="text-3xl font-bold mt-1">
                    {totalCost.toLocaleString(lang === "fr" ? "fr-FR" : "en-US", { minimumFractionDigits: 2 })} €
                  </div>
                </div>
                <div className="text-xs opacity-90 text-right">
                  {result.totalGallons} gal × {unitPrice.toFixed(2)} €<br />
                  {cat.name}
                </div>
              </div>
            </Card>
          )}
        </div>
      )}

      <div className="flex justify-end mt-6">
        <Button onClick={exportPDF} disabled={!result} variant="outline">
          <FileDown className="w-4 h-4 mr-2" />
          {quoteMode ? t("Exporter le devis PDF", "Export quote PDF") : t("Exporter l'estimation PDF", "Export estimate PDF")}
        </Button>
      </div>
    </Card>
  );
}

function VisualizerTab({ uid }: { uid: string }) {
  const { t, lang } = useLanguage();
  const [file, setFile] = useState<File | null>(null);
  const [beforeUrl, setBeforeUrl] = useState<string>("");
  const [afterUrl, setAfterUrl] = useState<string>("");
  const [product, setProduct] = useState<ProductLine>("reflector");
  const [colorId, setColorId] = useState<string>(CATALOGS[0].colors[0].id);
  const [surfaceType, setSurfaceType] = useState("floor");
  const [busy, setBusy] = useState(false);

  const cat = getCatalog(product)!;
  const color = cat.colors.find((c) => c.id === colorId) || cat.colors[0];

  const onFile = async (f: File) => {
    setFile(f); setAfterUrl("");
    const path = `${uid}/before-${Date.now()}-${f.name}`;
    const { error } = await supabase.storage.from("contractor-media").upload(path, f, { upsert: true });
    if (error) return toast.error(error.message);
    const { data } = supabase.storage.from("contractor-media").getPublicUrl(path);
    setBeforeUrl(data.publicUrl);
  };

  const generate = async () => {
    if (!beforeUrl) return toast.error(t("Uploadez d'abord une photo", "Upload a photo first"));
    setBusy(true); setAfterUrl("");
    try {
      const { data, error } = await supabase.functions.invoke("visualize-surface", {
        body: { imageUrl: beforeUrl, productName: cat.name, colorName: color.name, colorHint: color.hint, surfaceType },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      setAfterUrl(data.imageUrl);
      toast.success(t("Visualisation générée !", "Visualization ready!"));
    } catch (e: any) { toast.error(e.message); } finally { setBusy(false); }
  };

  return (
    <Card className="p-6">
      <h2 className="font-heading text-xl font-semibold mb-1">{t("Visualiseur Avant / Après IA", "AI Before / After Visualizer")}</h2>
      <p className="text-sm text-muted-foreground mb-6">{t("Uploadez la photo du chantier, choisissez la finition ECS, et obtenez un rendu réaliste.", "Upload the project photo, pick an ECS finish, and get a realistic render.")}</p>
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div><Label>{t("Photo avant", "Before photo")}</Label><Input type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && onFile(e.target.files[0])} /></div>
          <div><Label>{t("Type de surface", "Surface type")}</Label>
            <Select value={surfaceType} onValueChange={setSurfaceType}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent><SelectItem value="floor">{t("Sol", "Floor")}</SelectItem><SelectItem value="countertop">{t("Comptoir", "Countertop")}</SelectItem><SelectItem value="table">Table</SelectItem><SelectItem value="wall">{t("Mur", "Wall")}</SelectItem></SelectContent>
            </Select>
          </div>
          <div><Label>{t("Gamme produit", "Product line")}</Label>
            <Select value={product} onValueChange={(v) => { setProduct(v as ProductLine); setColorId(getCatalog(v as ProductLine)!.colors[0].id); }}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>{CATALOGS.map((c) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div><Label>{t("Couleur", "Color")}</Label>
            <div className="grid grid-cols-4 gap-2 mt-2 max-h-64 overflow-y-auto">
              {cat.colors.map((c) => (
                <button key={c.id} onClick={() => setColorId(c.id)} className={`group relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${colorId === c.id ? "border-primary ring-2 ring-primary/30" : "border-transparent hover:border-primary/40"}`}>
                  <img src={c.image} alt={c.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-x-0 bottom-0 bg-foreground/80 text-primary-foreground text-[10px] py-0.5 px-1 truncate">{c.name}</div>
                </button>
              ))}
            </div>
          </div>
          <Button onClick={generate} disabled={!beforeUrl || busy} className="w-full bg-gradient-brand-deep">
            {busy ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />{t("Génération…", "Generating…")}</> : <><Wand2 className="w-4 h-4 mr-2" />{t("Générer le rendu IA", "Generate AI render")}</>}
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div><div className="text-xs text-muted-foreground mb-1">{t("Avant", "Before")}</div><div className="aspect-square rounded-lg bg-secondary overflow-hidden">{beforeUrl ? <img src={beforeUrl} alt="" className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">—</div>}</div></div>
          <div><div className="text-xs text-muted-foreground mb-1">{t("Après", "After")}</div><div className="aspect-square rounded-lg bg-secondary overflow-hidden">{afterUrl ? <img src={afterUrl} alt="" className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">{busy ? <Loader2 className="w-6 h-6 animate-spin text-primary" /> : "—"}</div>}</div></div>
        </div>
      </div>
    </Card>
  );
}

function ProfileTab({ profile, onSaved }: { profile: any; onSaved: () => void }) {
  const { t } = useLanguage();
  const [f, setF] = useState({ ...profile, specialties: (profile.specialties || []).join(", ") });
  const [saving, setSaving] = useState(false);

  const save = async () => {
    setSaving(true);
    const { error } = await supabase.from("contractor_profiles").update({
      company_name: f.company_name, contact_name: f.contact_name, tagline: f.tagline, bio: f.bio,
      phone: f.phone, email: f.email, website: f.website, address: f.address, city: f.city, country: f.country,
      specialties: f.specialties.split(",").map((s: string) => s.trim()).filter(Boolean),
      years_experience: f.years_experience ? Number(f.years_experience) : null,
      instagram: f.instagram, facebook: f.facebook, is_published: f.is_published,
    }).eq("id", profile.id);
    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success(t("Profil enregistré", "Profile saved"));
    onSaved();
  };

  const uploadAvatar = async (file: File, field: "avatar_url" | "cover_url") => {
    const path = `${profile.user_id}/${field}-${Date.now()}-${file.name}`;
    const { error } = await supabase.storage.from("contractor-media").upload(path, file, { upsert: true });
    if (error) return toast.error(error.message);
    const { data } = supabase.storage.from("contractor-media").getPublicUrl(path);
    await supabase.from("contractor_profiles").update({ [field]: data.publicUrl } as any).eq("id", profile.id);
    onSaved();
  };

  const addMedia = async (file: File) => {
    const path = `${profile.user_id}/gallery-${Date.now()}-${file.name}`;
    const { error } = await supabase.storage.from("contractor-media").upload(path, file);
    if (error) return toast.error(error.message);
    const { data } = supabase.storage.from("contractor-media").getPublicUrl(path);
    const isVideo = file.type.startsWith("video/");
    await supabase.from("contractor_media").insert({ contractor_id: profile.id, url: data.publicUrl, type: isVideo ? "video" : "image" });
    toast.success(t("Média ajouté", "Media added"));
  };

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <Card className="p-6 lg:col-span-2 space-y-4">
        <h3 className="font-heading text-lg font-semibold">{t("Infos publiques", "Public info")}</h3>
        <div className="grid sm:grid-cols-2 gap-3">
          <div><Label>{t("Nom entreprise", "Company")}</Label><Input value={f.company_name || ""} onChange={(e) => setF({ ...f, company_name: e.target.value })} /></div>
          <div><Label>{t("Nom contact", "Contact name")}</Label><Input value={f.contact_name || ""} onChange={(e) => setF({ ...f, contact_name: e.target.value })} /></div>
        </div>
        <div><Label>Tagline</Label><Input value={f.tagline || ""} onChange={(e) => setF({ ...f, tagline: e.target.value })} placeholder={t("Spécialiste résine époxy en Caraïbe", "Caribbean epoxy resin specialist")} /></div>
        <div><Label>Bio</Label><Textarea rows={4} value={f.bio || ""} onChange={(e) => setF({ ...f, bio: e.target.value })} /></div>
        <div className="grid sm:grid-cols-3 gap-3">
          <div><Label>Phone</Label><Input value={f.phone || ""} onChange={(e) => setF({ ...f, phone: e.target.value })} /></div>
          <div><Label>Email</Label><Input value={f.email || ""} onChange={(e) => setF({ ...f, email: e.target.value })} /></div>
          <div><Label>Website</Label><Input value={f.website || ""} onChange={(e) => setF({ ...f, website: e.target.value })} /></div>
        </div>
        <div className="grid sm:grid-cols-3 gap-3">
          <div><Label>{t("Ville", "City")}</Label><Input value={f.city || ""} onChange={(e) => setF({ ...f, city: e.target.value })} /></div>
          <div><Label>Pays</Label><Input value={f.country || ""} onChange={(e) => setF({ ...f, country: e.target.value })} /></div>
          <div><Label>{t("Années d'expérience", "Years of experience")}</Label><Input type="number" value={f.years_experience || ""} onChange={(e) => setF({ ...f, years_experience: e.target.value })} /></div>
        </div>
        <div><Label>{t("Adresse", "Address")}</Label><Input value={f.address || ""} onChange={(e) => setF({ ...f, address: e.target.value })} /></div>
        <div><Label>{t("Spécialités (séparées par des virgules)", "Specialties (comma separated)")}</Label><Input value={f.specialties} onChange={(e) => setF({ ...f, specialties: e.target.value })} placeholder="Reflector, Flake, Comptoirs..." /></div>
        <div className="grid sm:grid-cols-2 gap-3">
          <div><Label>Instagram URL</Label><Input value={f.instagram || ""} onChange={(e) => setF({ ...f, instagram: e.target.value })} /></div>
          <div><Label>Facebook URL</Label><Input value={f.facebook || ""} onChange={(e) => setF({ ...f, facebook: e.target.value })} /></div>
        </div>
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={!!f.is_published} onChange={(e) => setF({ ...f, is_published: e.target.checked })} /> {t("Rendre mon profil visible publiquement", "Make my profile publicly visible")}</label>
        <Button onClick={save} disabled={saving} className="bg-gradient-brand-deep">{saving ? "..." : t("Enregistrer", "Save")}</Button>
      </Card>
      <Card className="p-6 space-y-4">
        <h3 className="font-heading text-lg font-semibold">{t("Médias", "Media")}</h3>
        <div>
          <Label>{t("Photo de profil", "Avatar")}</Label>
          <div className="flex items-center gap-3 mt-2">
            <div className="w-16 h-16 rounded-xl overflow-hidden bg-secondary">{profile.avatar_url && <img src={profile.avatar_url} alt="" className="w-full h-full object-cover" />}</div>
            <Input type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && uploadAvatar(e.target.files[0], "avatar_url")} />
          </div>
        </div>
        <div>
          <Label>{t("Photo de couverture", "Cover")}</Label>
          <Input type="file" accept="image/*" className="mt-2" onChange={(e) => e.target.files?.[0] && uploadAvatar(e.target.files[0], "cover_url")} />
        </div>
        <div>
          <Label>{t("Ajouter à la galerie (image ou vidéo)", "Add to gallery (image or video)")}</Label>
          <Input type="file" accept="image/*,video/*" className="mt-2" onChange={(e) => e.target.files?.[0] && addMedia(e.target.files[0])} />
        </div>
        {profile.is_published && <a href={`/sous-traitants/${profile.slug}`} target="_blank" rel="noreferrer" className="text-sm text-primary hover:underline">{t("→ Voir mon profil public", "→ View my public profile")}</a>}
      </Card>
    </div>
  );
}
