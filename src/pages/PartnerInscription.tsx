import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
  kind: z.enum(["architect", "builder"]),
  first_name: z.string().trim().min(1).max(80),
  last_name: z.string().trim().min(1).max(80),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  company: z.string().trim().max(160).optional().or(z.literal("")),
  country: z.string().trim().max(80).optional().or(z.literal("")),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
});

export default function PartnerInscription() {
  const [f, setF] = useState({ kind: "architect", first_name: "", last_name: "", email: "", phone: "", company: "", country: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    const parsed = schema.safeParse(f);
    if (!parsed.success) return toast.error("Vérifiez les champs requis");
    setLoading(true);
    const { error } = await (supabase as any).from("partner_access_requests").insert(parsed.data);
    setLoading(false);
    if (error) return toast.error(error.message);
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-background py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">← Retour à l'accueil</Link>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">Espace Architectes & Constructeurs</CardTitle>
            <p className="text-sm text-muted-foreground mt-2">
              Demandez un accès à notre espace privé réservé aux professionnels. Une fois validé par Renovo Crete,
              vous recevrez vos identifiants. Cet espace n'est pas accessible publiquement.
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            {sent ? (
              <div className="text-center py-8 space-y-3">
                <div className="text-lg font-medium">Demande envoyée ✓</div>
                <p className="text-sm text-muted-foreground">Nos équipes vous contacteront sous 48h ouvrées.</p>
                <Button asChild variant="outline"><Link to="/">Retour à l'accueil</Link></Button>
              </div>
            ) : (
              <>
                <div><Label>Profession</Label>
                  <Select value={f.kind} onValueChange={(v) => setF({ ...f, kind: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="architect">Architecte</SelectItem>
                      <SelectItem value="builder">Constructeur</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div><Label>Prénom *</Label><Input value={f.first_name} onChange={(e) => setF({ ...f, first_name: e.target.value })} /></div>
                  <div><Label>Nom *</Label><Input value={f.last_name} onChange={(e) => setF({ ...f, last_name: e.target.value })} /></div>
                  <div><Label>Email professionnel *</Label><Input type="email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} /></div>
                  <div><Label>Téléphone</Label><Input value={f.phone} onChange={(e) => setF({ ...f, phone: e.target.value })} /></div>
                  <div><Label>Entreprise</Label><Input value={f.company} onChange={(e) => setF({ ...f, company: e.target.value })} /></div>
                  <div><Label>Pays</Label><Input value={f.country} onChange={(e) => setF({ ...f, country: e.target.value })} /></div>
                </div>
                <div><Label>Message</Label><Textarea rows={4} value={f.message} onChange={(e) => setF({ ...f, message: e.target.value })} /></div>
                <Button onClick={submit} disabled={loading} className="w-full">{loading ? "Envoi…" : "Envoyer la demande"}</Button>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
