import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LogOut, Plus, Briefcase, Calculator as CalcIcon, Wand2, User, Trash2, Loader2, FileDown, Euro, Copy, History, FileText, Users, Eye, EyeOff, Shield, Info, CheckCircle2, BarChart3, ShoppingCart } from "lucide-react";
import OrdersTab from "@/components/dashboard/OrdersTab";
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
import { Skeleton } from "@/components/ui/skeleton";
import DashboardStatusBadge from "@/components/DashboardStatusBadge";
import { BarChart, Bar, XAxis, YAxis, Tooltip as RTooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell, Legend } from "recharts";

const PREVIEW_PROFILE = {
  id: "preview",
  user_id: "preview",
  company_name: "Renovo Crete (Aperçu)",
  contact_name: "Démo",
  email: "demo@renovocrete.test",
  phone: "+590 690 00 00 00",
  city: "Saint-Martin",
  country: "Saint-Martin",
  slug: "renovo-crete-demo",
  bio: "Profil de démonstration — connectez-vous pour gérer le vôtre.",
  tagline: "Spécialiste résine époxy & micro-béton",
  specialties: ["Reflector", "Flake", "Quartz"],
  certifications: ["Elite Crete Systems Certified"],
  service_areas: ["Saint-Martin", "Saint-Barthélemy"],
  years_experience: 12,
  is_published: true, is_featured: false,
  show_phone: true, show_email: true, show_address: false, show_social: true,
  avatar_url: null, cover_url: null, website: null, address: null,
  instagram: null, facebook: null,
};
const PREVIEW_PROJECTS = [
  { id: "p1", user_id: "preview", title: "Sol garage villa Orient Bay", client_name: "M. Dupont", address: "Orient Bay", surface_m2: 80, product_type: "reflector", color: "Pearl Grey", status: "completed", priority: "high", revenue: 9600, cost_material: 2400, cost_labor: 2800, is_public: true, created_at: new Date(Date.now() - 86400000 * 30).toISOString() },
  { id: "p2", user_id: "preview", title: "Showroom concessionnaire", client_name: "AutoSXM", address: "Marigot", surface_m2: 220, product_type: "flake", color: "Charcoal Blend", status: "in_progress", priority: "urgent", revenue: 24500, cost_material: 6200, cost_labor: 8400, is_public: false, created_at: new Date(Date.now() - 86400000 * 10).toISOString() },
  { id: "p3", user_id: "preview", title: "Terrasse piscine", client_name: "Mme Léger", address: "Cupecoy", surface_m2: 45, product_type: "quartz", color: "Sand", status: "planned", priority: "medium", revenue: 6300, cost_material: 1500, cost_labor: 2100, is_public: false, created_at: new Date().toISOString() },
];

export default function Dashboard() {
  const nav = useNavigate();
  const loc = useLocation();
  const isPreview = loc.pathname === "/dashboard-preview";
  const { t } = useLanguage();
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [demoFallback, setDemoFallback] = useState<{ profile: boolean; projects: boolean }>({ profile: false, projects: false });
  const [readyNotified, setReadyNotified] = useState(false);
  const { isAdmin } = useAuth();

  useEffect(() => {
    if (isPreview) {
      setUser({ id: "preview", email: PREVIEW_PROFILE.email });
      setProfile(PREVIEW_PROFILE);
      setProjects(PREVIEW_PROJECTS);
      setDemoFallback({ profile: true, projects: true });
      setLoadingData(false);
      return;
    }
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) { nav("/auth"); return; }
      setUser(data.session.user);
      loadAll(data.session.user.id, data.session.user.email);
    });
  }, [nav, isPreview]);

  const loadAll = async (uid: string, email?: string) => {
    setLoadingData(true);
    const { data: p } = await supabase.from("contractor_profiles").select("*").eq("user_id", uid).maybeSingle();
    const profileIsDemo = !p;
    if (p) {
      setProfile(p);
    } else {
      setProfile({ ...PREVIEW_PROFILE, user_id: uid, email: email || PREVIEW_PROFILE.email });
    }
    const { data: pr } = await supabase.from("projects").select("*").eq("user_id", uid).order("created_at", { ascending: false });
    const projectsIsDemo = !(pr && pr.length);
    setProjects(pr && pr.length ? pr : PREVIEW_PROJECTS.map((x) => ({ ...x, user_id: uid })));
    setDemoFallback({ profile: profileIsDemo, projects: projectsIsDemo });
    setLoadingData(false);
    if (!readyNotified) {
      setReadyNotified(true);
      toast.success(
        projectsIsDemo || profileIsDemo
          ? t("Données prêtes (aperçu démo)", "Data ready (demo preview)")
          : t("Données prêtes", "Data ready"),
      );
    }
  };

  const signOut = async () => { await supabase.auth.signOut(); nav("/"); };

  const [requestingAdmin, setRequestingAdmin] = useState(false);
  const requestAdmin = async () => {
    if (requestingAdmin) return;
    setRequestingAdmin(true);
    const toastId = toast.loading(t("Demande en cours…", "Requesting…"));
    try {
      const { data: session } = await supabase.auth.getSession();
      const token = session.session?.access_token;
      if (!token) throw new Error(t("Session expirée", "Session expired"));

      const res = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/request-admin`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data?.ok) {
        toast.error(data?.message || `HTTP ${res.status}`, { id: toastId });
        return;
      }

      if (data.code === "already_admin") {
        toast.info(data.message, { id: toastId });
      } else if (data.code === "bootstrap") {
        toast.success(t("Bootstrap admin", "Admin bootstrap"), {
          id: toastId,
          description: data.message,
        });
        setTimeout(() => window.location.reload(), 1200);
      } else {
        toast.success(t("Rôle admin accordé", "Admin role granted"), {
          id: toastId,
          description: data.message,
        });
        setTimeout(() => window.location.reload(), 1000);
      }
    } catch (err: any) {
      toast.error(err.message || "Erreur", { id: toastId });
    } finally {
      setRequestingAdmin(false);
    }
  };

  if (!user || !profile || loadingData) {
    return (
      <div className="pt-24 pb-16 bg-secondary/20 min-h-screen">
        <div className="container mx-auto px-4 space-y-6">
          <div className="flex items-center gap-3">
            <Loader2 className="w-4 h-4 animate-spin text-primary" />
            <span className="text-sm text-muted-foreground">{t("Chargement du tableau de bord…", "Loading dashboard…")}</span>
          </div>
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="space-y-2"><Skeleton className="h-8 w-64" /><Skeleton className="h-4 w-40" /></div>
            <Skeleton className="h-9 w-40" />
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[0, 1, 2, 3].map((i) => (
              <Card key={i} className="p-5 space-y-2"><Skeleton className="h-3 w-24" /><Skeleton className="h-7 w-16" /></Card>
            ))}
          </div>
          <Card className="p-5"><Skeleton className="h-48 w-full" /></Card>
          <Skeleton className="h-10 w-full max-w-xl" />
          <Card className="p-5 space-y-3">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </Card>
        </div>
      </div>
    );
  }

  const totalCA = projects.reduce((s, p) => s + (Number(p.revenue) || 0), 0);
  const totalMargin = projects.reduce((s, p) => s + ((Number(p.revenue) || 0) - (Number(p.cost_material) || 0) - (Number(p.cost_labor) || 0)), 0);
  const inProgress = projects.filter((p) => p.status === "in_progress").length;
  const completed = projects.filter((p) => p.status === "completed").length;

  const chartData = projects.slice(0, 8).map((p) => ({
    name: (p.title || "—").slice(0, 14),
    CA: Number(p.revenue) || 0,
    Marge: (Number(p.revenue) || 0) - (Number(p.cost_material) || 0) - (Number(p.cost_labor) || 0),
  })).reverse();
  const statusData = [
    { name: t("Planifié", "Planned"), value: projects.filter((p) => p.status === "planned").length },
    { name: t("En cours", "In progress"), value: inProgress },
    { name: t("Terminé", "Completed"), value: completed },
    { name: t("En attente", "On hold"), value: projects.filter((p) => p.status === "on_hold").length },
  ].filter((d) => d.value > 0);
  const PIE_COLORS = ["hsl(var(--muted-foreground))", "hsl(var(--primary))", "hsl(var(--accent))", "hsl(var(--destructive))"];
  const isDemoData = demoFallback.profile || demoFallback.projects;

  return (
    <div className="pt-24 pb-16 bg-secondary/20 min-h-screen">
      <div className="container mx-auto px-4">
        {isPreview && (
          <div className="mb-4 p-3 rounded-md border border-primary/30 bg-primary/10 text-sm flex items-center justify-between gap-3 flex-wrap">
            <span><strong>{t("Mode aperçu", "Preview mode")}</strong> — {t("données factices, aucune modification enregistrée.", "demo data, nothing is saved.")}</span>
            <Button size="sm" onClick={() => nav("/auth")} className="bg-gradient-brand-deep">{t("Se connecter pour utiliser", "Sign in to use")}</Button>
          </div>
        )}
        {!isPreview && isDemoData && (
          <div className="mb-4 p-3 rounded-md border border-amber-500/30 bg-amber-500/10 text-sm flex items-center gap-2 flex-wrap">
            <Info className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              <strong>{t("Aperçu démo actif", "Demo preview active")}</strong> —{" "}
              {demoFallback.profile && demoFallback.projects
                ? t("aucun profil ni chantier réel. Les données affichées sont des exemples.", "no real profile or projects yet. Displayed data is sample data.")
                : demoFallback.projects
                ? t("aucun chantier réel — exemples affichés.", "no real projects — sample shown.")
                : t("profil démo — créez le vôtre dans l'onglet Profil.", "demo profile — create yours in the Profile tab.")}
            </span>
          </div>
        )}
        {!isPreview && !isDemoData && (
          <div className="mb-4 p-2.5 rounded-md border border-emerald-500/30 bg-emerald-500/10 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>{t("Vos données sont prêtes.", "Your data is ready.")}</span>
          </div>
        )}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="font-heading text-3xl font-bold">{profile.company_name}</h1>
              {isAdmin && <Badge className="bg-foreground text-background">ADMIN</Badge>}
              <DashboardStatusBadge />
            </div>
            <p className="text-sm text-muted-foreground">{t("Tableau de bord pro", "Pro dashboard")} • {profile.is_published ? <Badge className="bg-primary text-primary-foreground">{t("Profil public", "Public profile")}</Badge> : <Badge variant="outline">{t("Profil privé", "Private profile")}</Badge>}</p>
          </div>
          <div className="flex items-center gap-2">
            {!isPreview && !isAdmin && (
              <Button variant="outline" size="sm" onClick={requestAdmin} disabled={requestingAdmin}>
                {requestingAdmin ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Shield className="w-4 h-4 mr-2" />}
                {requestingAdmin ? t("Demande…", "Requesting…") : t("Demander rôle admin", "Request admin role")}
              </Button>
            )}
            {!isPreview && (
              <Button variant="ghost" onClick={signOut}><LogOut className="w-4 h-4 mr-2" />{t("Déconnexion", "Sign out")}</Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="p-5"><div className="text-xs text-muted-foreground">{t("Chantiers totaux", "Total projects")}</div><div className="text-2xl font-bold mt-1">{projects.length}</div></Card>
          <Card className="p-5"><div className="text-xs text-muted-foreground">{t("En cours", "In progress")}</div><div className="text-2xl font-bold mt-1 text-primary">{inProgress}</div></Card>
          <Card className="p-5"><div className="text-xs text-muted-foreground">{t("Terminés", "Completed")}</div><div className="text-2xl font-bold mt-1">{completed}</div></Card>
          <Card className="p-5"><div className="text-xs text-muted-foreground">{t("CA / Marge", "Revenue / Margin")}</div><div className="text-xl font-bold mt-1">{totalCA.toLocaleString()} €</div><div className="text-xs text-muted-foreground">{t("Marge", "Margin")} {totalMargin.toLocaleString()} €</div></Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-4 mb-6">
          <Card className="p-5 lg:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <BarChart3 className="w-4 h-4 text-primary" />
              <h3 className="font-semibold text-sm">{t("CA & Marge par chantier", "Revenue & Margin per project")}</h3>
            </div>
            {chartData.length === 0 ? (
              <div className="h-56 flex items-center justify-center text-sm text-muted-foreground">{t("Aucune donnée à afficher", "No data to display")}</div>
            ) : (
              <ResponsiveContainer width="100%" height={224}>
                <BarChart data={chartData} margin={{ top: 5, right: 8, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                  <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                  <RTooltip contentStyle={{ background: "hsl(var(--background))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Bar dataKey="CA" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Marge" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </Card>
          <Card className="p-5">
            <h3 className="font-semibold text-sm mb-3">{t("Répartition par statut", "Status breakdown")}</h3>
            {statusData.length === 0 ? (
              <div className="h-56 flex items-center justify-center text-sm text-muted-foreground">{t("Aucune donnée", "No data")}</div>
            ) : (
              <ResponsiveContainer width="100%" height={224}>
                <PieChart>
                  <Pie data={statusData} dataKey="value" nameKey="name" innerRadius={42} outerRadius={72} paddingAngle={3}>
                    {statusData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                  </Pie>
                  <RTooltip contentStyle={{ background: "hsl(var(--background))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                </PieChart>
              </ResponsiveContainer>
            )}
          </Card>
        </div>


        <Tabs defaultValue="projects">
          <TabsList className="mb-4 flex-wrap h-auto">
            <TabsTrigger value="projects"><Briefcase className="w-4 h-4 mr-1.5" />{t("Chantiers", "Projects")}</TabsTrigger>
            <TabsTrigger value="calculator"><CalcIcon className="w-4 h-4 mr-1.5" />{t("Calculateur", "Calculator")}</TabsTrigger>
            <TabsTrigger value="visualizer"><Wand2 className="w-4 h-4 mr-1.5" />{t("Visualiseur IA", "AI visualizer")}</TabsTrigger>
            <TabsTrigger value="profile"><User className="w-4 h-4 mr-1.5" />{t("Mon profil public", "Public profile")}</TabsTrigger>
            <TabsTrigger value="orders"><ShoppingCart className="w-4 h-4 mr-1.5" />{t("Commande produits", "Orders")}</TabsTrigger>
            <TabsTrigger value="chat"><Info className="w-4 h-4 mr-1.5" />{t("Chat", "Chat")}</TabsTrigger>
            {isAdmin && <TabsTrigger value="admin"><Users className="w-4 h-4 mr-1.5" />{t("Sous-traitants", "Contractors")}</TabsTrigger>}
          </TabsList>

          <TabsContent value="projects"><ProjectsTab uid={user.id} projects={projects} onChange={() => loadAll(user.id)} /></TabsContent>
          <TabsContent value="calculator"><CalculatorTab isAdmin={isAdmin} /></TabsContent>
          <TabsContent value="visualizer"><VisualizerTab uid={user.id} /></TabsContent>
          <TabsContent value="profile"><ProfileTab profile={profile} onSaved={() => loadAll(user.id)} /></TabsContent>
          <TabsContent value="orders"><OrdersTab uid={user.id} isPreview={isPreview} /></TabsContent>
          <TabsContent value="chat"><ChatTab /></TabsContent>
          {isAdmin && <TabsContent value="admin"><AdminContractorsTab /></TabsContent>}
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
  reflector: 290, flake: 180, quartz: 210, urethane: 340, chemstone: 150, portion: 95, resinous: 165,
};
const PRODUCT_IDS = CATALOGS.map((c) => c.id) as [ProductLine, ...ProductLine[]];

function CalculatorTab({ isAdmin = false }: { isAdmin?: boolean }) {
  const { t, lang } = useLanguage();
  const [product, setProduct] = useState<ProductLine>("reflector");
  const [surface, setSurface] = useState("30");
  const [coats, setCoats] = useState("1");
  const [quoteMode, setQuoteMode] = useState(true);
  const [prices, setPrices] = useState<Record<ProductLine, number>>(() => {
    try {
      const saved = localStorage.getItem("renovo-resin-prices");
      return saved ? { ...DEFAULT_PRICES, ...JSON.parse(saved) } : DEFAULT_PRICES;
    } catch { return DEFAULT_PRICES; }
  });
  const [clientName, setClientName] = useState("");
  const [siteAddress, setSiteAddress] = useState("");
  const [laborMode, setLaborMode] = useState<"per_m2" | "fixed">("per_m2");
  const [laborRate, setLaborRate] = useState("25");
  const [marginPct, setMarginPct] = useState("35");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<{ surface?: string; coats?: string; product?: string; price?: string; labor?: string; margin?: string }>({});
  const [history, setHistory] = useState<QuoteHistoryEntry[]>([]);

  useEffect(() => { listHistory().then(setHistory); }, []);

  const schema = z.object({
    product: z.enum(PRODUCT_IDS, { errorMap: () => ({ message: t("Produit ECS invalide", "Invalid ECS product") }) }),
    surface: z.coerce.number({ invalid_type_error: t("Surface invalide", "Invalid surface") })
      .positive({ message: t("La surface doit être > 0", "Surface must be > 0") })
      .max(10000, { message: t("Max 10 000 m²", "Max 10,000 m²") }),
    coats: z.coerce.number({ invalid_type_error: t("Couches invalides", "Invalid coats") })
      .int({ message: t("Entier requis", "Whole number required") })
      .min(1, { message: t("Min 1", "Min 1") }).max(10, { message: t("Max 10", "Max 10") }),
    price: z.coerce.number().min(0, { message: t("Prix invalide", "Invalid price") }),
    labor: z.coerce.number().min(0, { message: t("Coût main-d'œuvre invalide", "Invalid labor cost") }),
    margin: z.coerce.number().min(0, { message: t("Marge invalide", "Invalid margin") }).max(500),
  });

  const unitPrice = prices[product] || 0;
  const parsed = schema.safeParse({ product, surface, coats, price: unitPrice, labor: laborRate, margin: marginPct });
  const isValid = parsed.success;
  const out = useMemo(() => {
    if (!isValid) return null;
    return computeQuote({
      product: parsed.data.product, surface: parsed.data.surface, coats: parsed.data.coats,
      pricePerGallon: parsed.data.price, laborMode, laborRate: parsed.data.labor, margin: parsed.data.margin,
    });
  }, [isValid, parsed, laborMode]);

  const validate = () => {
    const r = schema.safeParse({ product, surface, coats, price: unitPrice, labor: laborRate, margin: marginPct });
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
    try { localStorage.setItem("renovo-resin-prices", JSON.stringify(next)); } catch { /* noop */ }
  };

  const persistHistory = async () => {
    if (!out || !isValid) return null;
    const entry: QuoteHistoryEntry = {
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
      clientName: clientName || "—",
      siteAddress,
      productKey: product,
      productName: out.productName,
      surface: parsed.data.surface,
      coats: parsed.data.coats,
      ratio: out.ratio,
      pricePerGallon: unitPrice,
      totalGallons: out.totalGallons,
      costMaterial: out.costMaterial,
      costLabor: out.costLabor,
      totalCost: out.totalCost,
      salePrice: out.salePrice,
      margin: out.marginAmount,
      marginPct: out.marginPct,
      status: "draft",
      notes,
    };
    await saveEntry(entry);
    setHistory(await listHistory());
    return entry;
  };

  const exportClient = async () => {
    if (!validate() || !out) return toast.error(t("Corrigez les erreurs", "Fix the errors"));
    exportClientQuotePDF({
      clientName: clientName || "Client", siteAddress, product: out.productName,
      surface: parsed.data.surface, coats: parsed.data.coats, lang,
    }, out);
    await persistHistory();
    toast.success(t("PDF client exporté", "Client PDF exported"));
  };

  const exportInternal = async () => {
    if (!validate() || !out) return toast.error(t("Corrigez les erreurs", "Fix the errors"));
    exportInternalQuotePDF({
      clientName: clientName || "Chantier", siteAddress, product: out.productName,
      surface: parsed.data.surface, coats: parsed.data.coats, pricePerGallon: unitPrice, notes, lang,
    }, out);
    await persistHistory();
    toast.success(t("PDF interne exporté", "Internal PDF exported"));
  };

  const copyRecap = async () => {
    if (!validate() || !out) return toast.error(t("Corrigez les erreurs", "Fix the errors"));
    const lines = [
      `RENOVO CRETE — ${t("Récapitulatif devis", "Quote summary")}`,
      `${t("Date", "Date")}: ${new Date().toLocaleDateString(lang === "fr" ? "fr-FR" : "en-US")}`,
      clientName ? `${t("Client", "Client")}: ${clientName}` : null,
      `${t("Produit", "Product")}: ${out.productName}`,
      `${t("Surface", "Surface")}: ${parsed.data.surface} m²`,
      `${t("Couches", "Coats")}: ${parsed.data.coats}`,
      `${t("Ratio A:B", "A:B ratio")}: ${out.ratio}`,
      `${t("Prix unitaire", "Unit price")}: ${unitPrice.toFixed(2)} €/gal`,
      `${t("Total gallons", "Total gallons")}: ${out.totalGallons}`,
      `${t("Coût matière", "Material cost")}: ${out.costMaterial.toFixed(2)} €`,
      `${t("Coût main-d'œuvre", "Labor cost")}: ${out.costLabor.toFixed(2)} €`,
      `${t("Coût total", "Total cost")}: ${out.totalCost.toFixed(2)} €`,
      `${t("Prix de vente", "Sale price")}: ${out.salePrice.toFixed(2)} €`,
      `${t("Marge", "Margin")}: ${out.marginAmount.toFixed(2)} € (${out.marginPct}%)`,
    ].filter(Boolean).join("\n");
    try {
      await navigator.clipboard.writeText(lines);
      toast.success(t("Récapitulatif copié", "Summary copied"));
    } catch { toast.error(t("Copie impossible", "Copy failed")); }
  };

  const reload = (e: QuoteHistoryEntry) => {
    setProduct(e.productKey as ProductLine);
    setSurface(String(e.surface));
    setCoats(String(e.coats));
    setClientName(e.clientName === "—" ? "" : e.clientName);
    setSiteAddress(e.siteAddress || "");
    setNotes(e.notes || "");
    if (e.pricePerGallon) updatePrice(e.productKey as ProductLine, String(e.pricePerGallon));
    toast.success(t("Estimation rechargée", "Estimate reloaded"));
  };

  const deleteEntry = async (id: string) => { await removeEntry(id); setHistory(await listHistory()); };
  const wipeAll = async () => { await clearHistory(); setHistory([]); toast.success(t("Historique vidé", "History cleared")); };

  return (
    <div className="space-y-4">
      <Card className="p-6">
        <div className="flex items-start justify-between flex-wrap gap-3 mb-1">
          <h2 className="font-heading text-xl font-semibold">{t("Calculateur chantier", "Project calculator")}</h2>
          <div className="flex items-center gap-2 text-sm">
            <Euro className="w-4 h-4 text-muted-foreground" />
            <Label htmlFor="quote-mode" className="cursor-pointer">{t("Mode devis", "Quote mode")}</Label>
            <Switch id="quote-mode" checked={quoteMode} onCheckedChange={setQuoteMode} />
          </div>
        </div>
        <p className="text-sm text-muted-foreground mb-6">
          {t("Volumes A+B, coûts matière et main-d'œuvre, marge et prix de vente.", "A+B volumes, material & labor costs, margin and sale price.")}
        </p>

        <div className="grid sm:grid-cols-3 gap-4 mb-4">
          <div>
            <Label>{t("Produit", "Product")}</Label>
            <Select value={product} onValueChange={(v) => setProduct(v as ProductLine)}>
              <SelectTrigger className={errors.product ? "border-destructive" : ""}><SelectValue /></SelectTrigger>
              <SelectContent>{CATALOGS.map((c) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}</SelectContent>
            </Select>
            {errors.product && <p className="text-xs text-destructive mt-1">{errors.product}</p>}
            <p className="text-xs text-muted-foreground mt-1">{t("Ratio", "Ratio")}: {FORMULAS[product].ratio.b > 0 ? `${FORMULAS[product].ratio.a}:${FORMULAS[product].ratio.b}` : t("1 composant", "1-part")}</p>
          </div>
          <div>
            <Label>Surface (m²)</Label>
            <Input type="number" min="0.1" max="10000" step="0.1" value={surface}
              onChange={(e) => { setSurface(e.target.value); if (errors.surface) setErrors({ ...errors, surface: undefined }); }}
              onBlur={validate} className={errors.surface ? "border-destructive" : ""} />
            {errors.surface && <p className="text-xs text-destructive mt-1">{errors.surface}</p>}
          </div>
          {isAdmin && (
            <div>
              <Label>{t("Couches", "Coats")}</Label>
              <Input type="number" min="1" max="10" step="1" value={coats}
                onChange={(e) => { setCoats(e.target.value); if (errors.coats) setErrors({ ...errors, coats: undefined }); }}
                onBlur={validate} className={errors.coats ? "border-destructive" : ""} />
              {errors.coats && <p className="text-xs text-destructive mt-1">{errors.coats}</p>}
            </div>
          )}
        </div>

        {isAdmin && quoteMode && (
          <div className="grid sm:grid-cols-3 gap-4 mb-4 p-4 rounded-lg bg-secondary/40 border">
            <div>
              <Label>{t("Prix par gallon (€)", "Price per gallon (€)")}</Label>
              <Input type="number" min="0" step="0.01" value={unitPrice}
                onChange={(e) => updatePrice(product, e.target.value)}
                className={errors.price ? "border-destructive" : ""} />
              {errors.price && <p className="text-xs text-destructive mt-1">{errors.price}</p>}
            </div>
            <div>
              <Label>{t("Main-d'œuvre", "Labor")}</Label>
              <div className="flex gap-1">
                <Select value={laborMode} onValueChange={(v) => setLaborMode(v as any)}>
                  <SelectTrigger className="w-28"><SelectValue /></SelectTrigger>
                  <SelectContent><SelectItem value="per_m2">€/m²</SelectItem><SelectItem value="fixed">€ fixe</SelectItem></SelectContent>
                </Select>
                <Input type="number" min="0" step="0.01" value={laborRate}
                  onChange={(e) => setLaborRate(e.target.value)}
                  className={errors.labor ? "border-destructive" : ""} />
              </div>
              {errors.labor && <p className="text-xs text-destructive mt-1">{errors.labor}</p>}
            </div>
            <div>
              <Label>{t("Marge (%)", "Margin (%)")}</Label>
              <Input type="number" min="0" max="500" step="1" value={marginPct}
                onChange={(e) => setMarginPct(e.target.value)}
                className={errors.margin ? "border-destructive" : ""} />
              {errors.margin && <p className="text-xs text-destructive mt-1">{errors.margin}</p>}
            </div>
            <div className="sm:col-span-3 grid sm:grid-cols-2 gap-3">
              <div><Label>{t("Nom client", "Client name")}</Label><Input value={clientName} onChange={(e) => setClientName(e.target.value)} maxLength={120} /></div>
              <div><Label>{t("Adresse chantier", "Site address")}</Label><Input value={siteAddress} onChange={(e) => setSiteAddress(e.target.value)} maxLength={200} /></div>
              <div className="sm:col-span-2"><Label>{t("Notes chantier (PDF interne)", "Site notes (internal PDF)")}</Label><Textarea rows={2} value={notes} onChange={(e) => setNotes(e.target.value)} /></div>
            </div>
          </div>
        )}

        {out ? (
          <div className="space-y-3">
            <div className="grid sm:grid-cols-3 gap-3">
              <Card className="p-4 bg-gradient-brand-deep text-primary-foreground">
                <div className="text-xs opacity-80">{t("Total mélangé", "Total mixed")}</div>
                <div className="text-2xl font-bold mt-1">{out.totalGallons} gal</div>
              </Card>
              <Card className="p-4 bg-secondary"><div className="text-xs text-muted-foreground">Part A</div><div className="text-2xl font-bold mt-1">{out.partA} gal</div></Card>
              <Card className="p-4 bg-secondary"><div className="text-xs text-muted-foreground">Part B</div><div className="text-2xl font-bold mt-1">{out.partB || "—"} {out.partB ? "gal" : ""}</div></Card>
            </div>
            {isAdmin && quoteMode && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <Card className="p-3"><div className="text-[11px] text-muted-foreground">{t("Coût matière", "Material")}</div><div className="font-bold">{out.costMaterial.toFixed(2)} €</div></Card>
                <Card className="p-3"><div className="text-[11px] text-muted-foreground">{t("Main-d'œuvre", "Labor")}</div><div className="font-bold">{out.costLabor.toFixed(2)} €</div></Card>
                <Card className="p-3"><div className="text-[11px] text-muted-foreground">{t("Coût total", "Total cost")}</div><div className="font-bold">{out.totalCost.toFixed(2)} €</div></Card>
                <Card className="p-3 bg-primary/10 border-primary/30"><div className="text-[11px] text-muted-foreground">{t("Prix de vente", "Sale")}</div><div className="font-bold text-primary">{out.salePrice.toFixed(2)} €</div><div className="text-[10px] text-muted-foreground">{t("marge", "margin")} {out.marginAmount.toFixed(2)} € ({out.marginPct}%)</div></Card>
              </div>
            )}
          </div>
        ) : (
          <Card className="p-4 bg-destructive/5 border-destructive/30">
            <p className="text-sm text-destructive font-medium">{t("Corrigez les paramètres pour afficher le résultat.", "Fix parameters to display results.")}</p>
          </Card>
        )}

        <div className="flex flex-wrap justify-end gap-2 mt-6">
          <Button onClick={copyRecap} disabled={!out} variant="outline"><Copy className="w-4 h-4 mr-2" />{t("Copier récap", "Copy summary")}</Button>
          <Button onClick={exportInternal} disabled={!out} variant="outline"><FileDown className="w-4 h-4 mr-2" />{t("PDF interne", "Internal PDF")}</Button>
          <Button onClick={exportClient} disabled={!out} className="bg-gradient-brand-deep"><FileText className="w-4 h-4 mr-2" />{t("PDF client", "Client PDF")}</Button>
        </div>
      </Card>

      {/* Price grid for all products */}
      {quoteMode && (
        <Card className="p-4">
          <Label className="mb-2 block text-sm">{t("Prix par gallon (€) — toutes gammes (sauvegardés localement)", "Price per gallon (€) — all lines (saved locally)")}</Label>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2">
            {CATALOGS.map((c) => (
              <div key={c.id} className={`p-2 rounded border ${product === c.id ? "border-primary bg-primary/5" : "border-border"}`}>
                <div className="text-[11px] text-muted-foreground truncate">{c.name}</div>
                <Input type="number" min="0" step="0.01" value={prices[c.id]}
                  onChange={(e) => updatePrice(c.id, e.target.value)} className="h-8 mt-1" />
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* History */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-heading font-semibold flex items-center gap-2"><History className="w-4 h-4" />{t("Historique local", "Local history")}</h3>
          {history.length > 0 && <Button size="sm" variant="ghost" onClick={wipeAll}><Trash2 className="w-3 h-3 mr-1" />{t("Tout effacer", "Clear all")}</Button>}
        </div>
        {history.length === 0 ? (
          <p className="text-sm text-muted-foreground">{t("Aucun devis sauvegardé. Exportez un PDF pour l'enregistrer ici.", "No saved quotes. Export a PDF to save it here.")}</p>
        ) : (
          <div className="space-y-2">
            {history.slice(0, 20).map((h) => (
              <div key={h.id} className="flex items-center gap-3 text-sm border rounded-lg p-2.5">
                <div className="flex-1 min-w-0">
                  <div className="font-semibold truncate">{h.clientName} · {h.productName}</div>
                  <div className="text-xs text-muted-foreground">{new Date(h.date).toLocaleString(lang === "fr" ? "fr-FR" : "en-US")} · {h.surface} m² · {h.coats} {t("couches", "coats")}</div>
                </div>
                <div className="text-right text-xs">
                  <div className="font-bold">{h.salePrice.toFixed(2)} €</div>
                  <div className="text-muted-foreground">{t("marge", "margin")} {h.marginPct}%</div>
                </div>
                <Button size="sm" variant="ghost" onClick={() => reload(h)}>{t("Recharger", "Reload")}</Button>
                <Button size="icon" variant="ghost" onClick={() => deleteEntry(h.id)}><Trash2 className="w-4 h-4" /></Button>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
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
  const [f, setF] = useState({
    ...profile,
    specialties: (profile.specialties || []).join(", "),
    service_areas: (profile.service_areas || []).join(", "),
  });
  const [saving, setSaving] = useState(false);

  const save = async () => {
    setSaving(true);
    const { error } = await supabase.from("contractor_profiles").update({
      company_name: f.company_name, contact_name: f.contact_name, tagline: f.tagline, bio: f.bio,
      phone: f.phone, email: f.email, website: f.website, address: f.address, city: f.city, country: f.country,
      specialties: f.specialties.split(",").map((s: string) => s.trim()).filter(Boolean),
      service_areas: f.service_areas.split(",").map((s: string) => s.trim()).filter(Boolean),
      years_experience: f.years_experience ? Number(f.years_experience) : null,
      instagram: f.instagram, facebook: f.facebook, is_published: f.is_published,
      show_phone: !!f.show_phone, show_email: !!f.show_email, show_address: !!f.show_address, show_social: f.show_social !== false,
    } as any).eq("id", profile.id);
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
        <div><Label>{t("Zones d'intervention (séparées par des virgules)", "Service areas (comma separated)")}</Label><Input value={f.service_areas} onChange={(e) => setF({ ...f, service_areas: e.target.value })} placeholder="Saint-Martin, Saint-Barth, Anguilla" /></div>
        <div className="grid sm:grid-cols-2 gap-3">
          <div><Label>Instagram URL</Label><Input value={f.instagram || ""} onChange={(e) => setF({ ...f, instagram: e.target.value })} /></div>
          <div><Label>Facebook URL</Label><Input value={f.facebook || ""} onChange={(e) => setF({ ...f, facebook: e.target.value })} /></div>
        </div>
        <div className="border rounded-lg p-3 space-y-2 bg-secondary/30">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1"><Eye className="w-3 h-3" />{t("Coordonnées affichées publiquement", "Publicly visible contact details")}</p>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={!!f.show_phone} onChange={(e) => setF({ ...f, show_phone: e.target.checked })} /> {t("Afficher le téléphone", "Show phone")}</label>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={!!f.show_email} onChange={(e) => setF({ ...f, show_email: e.target.checked })} /> {t("Afficher l'email", "Show email")}</label>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={!!f.show_address} onChange={(e) => setF({ ...f, show_address: e.target.checked })} /> {t("Afficher l'adresse", "Show address")}</label>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={f.show_social !== false} onChange={(e) => setF({ ...f, show_social: e.target.checked })} /> {t("Afficher les réseaux sociaux", "Show social media")}</label>
          <p className="text-xs text-muted-foreground flex items-center gap-1"><EyeOff className="w-3 h-3" />{t("Si désactivés, les clients passent par le formulaire de devis.", "If disabled, clients use the quote form.")}</p>
        </div>
        <label className="flex items-center gap-2 text-sm font-medium"><input type="checkbox" checked={!!f.is_published} onChange={(e) => setF({ ...f, is_published: e.target.checked })} /> {t("Rendre mon profil visible publiquement", "Make my profile publicly visible")}</label>
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

function AdminContractorsTab() {
  const { t } = useLanguage();
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");

  const load = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("contractor_profiles")
      .select("*")
      .order("created_at", { ascending: false });
    setRows(data || []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const toggle = async (id: string, field: "is_published" | "is_featured", value: boolean) => {
    const { error } = await supabase.from("contractor_profiles").update({ [field]: value } as any).eq("id", id);
    if (error) return toast.error(error.message);
    toast.success(t("Mis à jour", "Updated"));
    load();
  };

  const remove = async (id: string) => {
    if (!confirm(t("Supprimer ce profil ?", "Delete this profile?"))) return;
    const { error } = await supabase.from("contractor_profiles").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success(t("Profil supprimé", "Profile deleted"));
    load();
  };

  const filtered = rows.filter((r) =>
    !q || `${r.company_name} ${r.city || ""} ${r.email || ""}`.toLowerCase().includes(q.toLowerCase())
  );

  if (loading) return <Card className="p-12 text-center"><Loader2 className="w-6 h-6 mx-auto animate-spin text-primary" /></Card>;

  return (
    <div className="space-y-4">
      <Card className="p-4 flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h3 className="font-heading font-semibold">{t("Gestion sous-traitants", "Contractors management")}</h3>
          <p className="text-xs text-muted-foreground">{t("Activez la visibilité publique et mettez en avant des profils.", "Toggle public visibility and feature profiles.")}</p>
        </div>
        <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t("Rechercher…", "Search…")} className="max-w-xs" />
      </Card>
      {filtered.length === 0 ? (
        <Card className="p-12 text-center text-muted-foreground">{t("Aucun sous-traitant", "No contractors")}</Card>
      ) : (
        <div className="space-y-2">
          {filtered.map((r) => (
            <Card key={r.id} className="p-4 flex items-center gap-3 flex-wrap">
              <div className="w-12 h-12 rounded-lg overflow-hidden bg-secondary flex-shrink-0">
                {r.avatar_url && <img src={r.avatar_url} alt="" className="w-full h-full object-cover" />}
              </div>
              <div className="flex-1 min-w-[200px]">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="font-semibold">{r.company_name}</h4>
                  {r.is_featured && <Badge className="bg-primary text-primary-foreground">★ Featured</Badge>}
                  {r.is_published ? <Badge variant="outline" className="text-green-700 border-green-300">Public</Badge> : <Badge variant="outline">{t("Privé", "Private")}</Badge>}
                </div>
                <div className="text-xs text-muted-foreground">{r.email} {r.city && `· ${r.city}`}</div>
              </div>
              <label className="flex items-center gap-2 text-xs">
                <Switch checked={!!r.is_published} onCheckedChange={(v) => toggle(r.id, "is_published", v)} />
                {t("Publié", "Published")}
              </label>
              <label className="flex items-center gap-2 text-xs">
                <Switch checked={!!r.is_featured} onCheckedChange={(v) => toggle(r.id, "is_featured", v)} />
                {t("Mis en avant", "Featured")}
              </label>
              {r.is_published && (
                <a href={`/sous-traitants/${r.slug}`} target="_blank" rel="noreferrer" className="text-xs text-primary hover:underline">
                  {t("Voir", "View")}
                </a>
              )}
              <Button size="icon" variant="ghost" onClick={() => remove(r.id)}><Trash2 className="w-4 h-4" /></Button>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
