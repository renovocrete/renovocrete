import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, Pencil } from "lucide-react";
import { toast } from "sonner";

const STATUS = [
  { v: "study", l: "En étude" },
  { v: "in_progress", l: "En cours" },
  { v: "completed", l: "Terminé" },
  { v: "archived", l: "Archivé" },
];
const PROPERTY = ["studio", "appartement", "villa", "hôtel", "restaurant", "commerce", "bâtiment professionnel", "industrie", "terrasse", "balcon", "piscine", "jardin", "autre"];
const CLASSIF = ["résidentiel", "commercial", "industriel"];
const LOC = [{ v: "interior", l: "Intérieur" }, { v: "exterior", l: "Extérieur" }, { v: "mixed", l: "Mixte" }];

const empty = {
  id: "", title: "", description: "", status: "study", property_type: "appartement",
  classification: "résidentiel", surface_m2: "", rooms: "", floors: "", location_kind: "interior",
  estimated_price: "", cost_material: "", cost_labor: "", total_budget: "",
  private_notes: "", internal_comments: "",
};

export default function PartnerProjects() {
  const { user } = useAuth();
  const [rows, setRows] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<any>(empty);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    const { data } = await (supabase as any).from("partner_projects").select("*").order("created_at", { ascending: false });
    setRows(data ?? []);
  };
  useEffect(() => { if (user) load(); }, [user]);

  const upd = (k: string, v: any) => setForm((f: any) => ({ ...f, [k]: v }));

  const save = async () => {
    if (!user) return;
    if (!form.title || form.title.length < 2) { toast.error("Titre requis"); return; }
    setSaving(true);
    const payload: any = {
      user_id: user.id,
      title: form.title,
      description: form.description || null,
      status: form.status,
      property_type: form.property_type,
      classification: form.classification,
      surface_m2: form.surface_m2 ? Number(form.surface_m2) : null,
      rooms: form.rooms ? Number(form.rooms) : null,
      floors: form.floors ? Number(form.floors) : null,
      location_kind: form.location_kind,
      estimated_price: Number(form.estimated_price || 0),
      cost_material: Number(form.cost_material || 0),
      cost_labor: Number(form.cost_labor || 0),
      total_budget: Number(form.total_budget || 0),
      private_notes: form.private_notes || null,
      internal_comments: form.internal_comments || null,
    };
    const q = form.id
      ? (supabase as any).from("partner_projects").update(payload).eq("id", form.id)
      : (supabase as any).from("partner_projects").insert(payload);
    const { error } = await q;
    setSaving(false);
    if (error) { toast.error(error.message); return; }
    toast.success(form.id ? "Projet mis à jour" : "Projet créé");
    setOpen(false); setForm(empty); load();
  };

  const remove = async (id: string) => {
    if (!confirm("Supprimer ce projet ?")) return;
    const { error } = await (supabase as any).from("partner_projects").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Supprimé"); load();
  };

  const edit = (r: any) => {
    setForm({ ...empty, ...r, surface_m2: r.surface_m2 ?? "", rooms: r.rooms ?? "", floors: r.floors ?? "" });
    setOpen(true);
  };

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-semibold">Projets</h1>
          <p className="text-muted-foreground mt-1">Gérez vos dossiers clients et chantiers.</p>
        </div>
        <Dialog open={open} onOpenChange={(o) => { setOpen(o); if (!o) setForm(empty); }}>
          <DialogTrigger asChild><Button><Plus className="w-4 h-4 mr-2" /> Nouveau projet</Button></DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader><DialogTitle>{form.id ? "Modifier" : "Nouveau"} projet</DialogTitle></DialogHeader>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="md:col-span-2"><Label>Titre *</Label><Input value={form.title} onChange={(e) => upd("title", e.target.value)} /></div>
              <div className="md:col-span-2"><Label>Description</Label><Textarea value={form.description} onChange={(e) => upd("description", e.target.value)} rows={3} /></div>
              <div><Label>Statut</Label>
                <Select value={form.status} onValueChange={(v) => upd("status", v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{STATUS.map((s) => <SelectItem key={s.v} value={s.v}>{s.l}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div><Label>Type de bien</Label>
                <Select value={form.property_type} onValueChange={(v) => upd("property_type", v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{PROPERTY.map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div><Label>Classification</Label>
                <Select value={form.classification} onValueChange={(v) => upd("classification", v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{CLASSIF.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div><Label>Localisation</Label>
                <Select value={form.location_kind} onValueChange={(v) => upd("location_kind", v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{LOC.map((l) => <SelectItem key={l.v} value={l.v}>{l.l}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div><Label>Surface (m²)</Label><Input type="number" value={form.surface_m2} onChange={(e) => upd("surface_m2", e.target.value)} /></div>
              <div><Label>Nb pièces</Label><Input type="number" value={form.rooms} onChange={(e) => upd("rooms", e.target.value)} /></div>
              <div><Label>Nb étages</Label><Input type="number" value={form.floors} onChange={(e) => upd("floors", e.target.value)} /></div>
              <div><Label>Prix estimé (€)</Label><Input type="number" value={form.estimated_price} onChange={(e) => upd("estimated_price", e.target.value)} /></div>
              <div><Label>Coût matériaux (€)</Label><Input type="number" value={form.cost_material} onChange={(e) => upd("cost_material", e.target.value)} /></div>
              <div><Label>Coût main-d'œuvre (€)</Label><Input type="number" value={form.cost_labor} onChange={(e) => upd("cost_labor", e.target.value)} /></div>
              <div><Label>Budget total (€)</Label><Input type="number" value={form.total_budget} onChange={(e) => upd("total_budget", e.target.value)} /></div>
              <div className="md:col-span-2"><Label>Notes privées</Label><Textarea value={form.private_notes} onChange={(e) => upd("private_notes", e.target.value)} rows={2} /></div>
              <div className="md:col-span-2"><Label>Commentaires internes</Label><Textarea value={form.internal_comments} onChange={(e) => upd("internal_comments", e.target.value)} rows={2} /></div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={() => setOpen(false)}>Annuler</Button>
              <Button onClick={save} disabled={saving}>{saving ? "..." : "Enregistrer"}</Button>
            </div>
          </DialogContent>
        </Dialog>
      </header>

      {rows.length === 0 ? (
        <Card><CardContent className="p-10 text-center text-muted-foreground">Aucun projet pour le moment.</CardContent></Card>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {rows.map((r) => (
            <Card key={r.id}>
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-base">{r.title}</CardTitle>
                  <Badge variant="outline" className="text-xs">{STATUS.find((s) => s.v === r.status)?.l}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="text-muted-foreground line-clamp-2">{r.description || "—"}</div>
                <div className="flex flex-wrap gap-1 text-xs">
                  <Badge variant="secondary">{r.property_type}</Badge>
                  <Badge variant="secondary">{r.classification}</Badge>
                  {r.surface_m2 && <Badge variant="secondary">{r.surface_m2} m²</Badge>}
                </div>
                <div className="text-sm font-medium pt-1">{Number(r.total_budget || 0).toLocaleString("fr-FR")} €</div>
                <div className="flex gap-2 pt-2">
                  <Button size="sm" variant="outline" onClick={() => edit(r)}><Pencil className="w-3.5 h-3.5 mr-1" /> Modifier</Button>
                  <Button size="sm" variant="ghost" onClick={() => remove(r.id)}><Trash2 className="w-3.5 h-3.5 text-destructive" /></Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
