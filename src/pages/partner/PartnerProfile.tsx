import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export default function PartnerProfile() {
  const { user } = useAuth();
  const [p, setP] = useState<any>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const { data } = await (supabase as any).from("partner_profiles").select("*").eq("user_id", user.id).maybeSingle();
      setP(data ?? { user_id: user.id, email: user.email, kind: "architect", service_areas: [], languages: [] });
    })();
  }, [user]);

  if (!p) return <div>Chargement…</div>;

  const set = (k: string, v: any) => setP((x: any) => ({ ...x, [k]: v }));
  const setList = (k: string, v: string) => set(k, v.split(",").map((s) => s.trim()).filter(Boolean));

  const save = async () => {
    setSaving(true);
    const payload = { ...p, user_id: user!.id };
    const { error } = await (supabase as any).from("partner_profiles").upsert(payload, { onConflict: "user_id" });
    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success("Profil enregistré (visible uniquement par Renovo Crete)");
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <header>
        <h1 className="text-3xl font-semibold">Profil {p.kind === "builder" ? "Constructeur" : "Architecte"}</h1>
        <p className="text-muted-foreground mt-1">Ces informations sont strictement privées. Aucune visibilité publique sur le site.</p>
      </header>
      <Card>
        <CardHeader><CardTitle className="text-base">Identité</CardTitle></CardHeader>
        <CardContent className="grid sm:grid-cols-2 gap-3">
          <div><Label>Prénom</Label><Input value={p.first_name ?? ""} onChange={(e) => set("first_name", e.target.value)} /></div>
          <div><Label>Nom</Label><Input value={p.last_name ?? ""} onChange={(e) => set("last_name", e.target.value)} /></div>
          <div><Label>Email</Label><Input value={p.email ?? ""} onChange={(e) => set("email", e.target.value)} /></div>
          <div><Label>Téléphone</Label><Input value={p.phone ?? ""} onChange={(e) => set("phone", e.target.value)} /></div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle className="text-base">Entreprise</CardTitle></CardHeader>
        <CardContent className="grid sm:grid-cols-2 gap-3">
          <div className="sm:col-span-2"><Label>Entreprise</Label><Input value={p.company ?? ""} onChange={(e) => set("company", e.target.value)} /></div>
          <div className="sm:col-span-2"><Label>Adresse</Label><Input value={p.address ?? ""} onChange={(e) => set("address", e.target.value)} /></div>
          <div><Label>Site internet</Label><Input value={p.website ?? ""} onChange={(e) => set("website", e.target.value)} /></div>
          <div><Label>Numéro professionnel</Label><Input value={p.professional_number ?? ""} onChange={(e) => set("professional_number", e.target.value)} /></div>
          <div><Label>Spécialité</Label><Input value={p.specialty ?? ""} onChange={(e) => set("specialty", e.target.value)} /></div>
          <div><Label>Années d'expérience</Label><Input type="number" value={p.years_experience ?? ""} onChange={(e) => set("years_experience", e.target.value ? Number(e.target.value) : null)} /></div>
          <div className="sm:col-span-2"><Label>Zones d'intervention (séparées par des virgules)</Label><Input value={(p.service_areas ?? []).join(", ")} onChange={(e) => setList("service_areas", e.target.value)} /></div>
          <div className="sm:col-span-2"><Label>Langues parlées</Label><Input value={(p.languages ?? []).join(", ")} onChange={(e) => setList("languages", e.target.value)} /></div>
        </CardContent>
      </Card>
      <Button onClick={save} disabled={saving}>{saving ? "..." : "Enregistrer le profil"}</Button>
    </div>
  );
}
