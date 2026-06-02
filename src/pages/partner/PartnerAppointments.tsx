import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Trash2 } from "lucide-react";
import { toast } from "sonner";

const KINDS = [
  { v: "call", l: "Appel téléphonique" },
  { v: "showroom", l: "Showroom" },
  { v: "project", l: "Réunion projet" },
  { v: "training", l: "Formation" },
  { v: "site_visit", l: "Visite technique" },
];

export default function PartnerAppointments() {
  const { user } = useAuth();
  const [rows, setRows] = useState<any[]>([]);
  const [kind, setKind] = useState("call");
  const [date, setDate] = useState("");
  const [subject, setSubject] = useState("");
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);

  const load = async () => {
    const { data } = await (supabase as any).from("partner_appointments").select("*").order("scheduled_at", { ascending: true });
    setRows(data ?? []);
  };
  useEffect(() => { if (user) load(); }, [user]);

  const book = async () => {
    if (!user || !date) return toast.error("Date requise");
    setSaving(true);
    const { error } = await (supabase as any).from("partner_appointments").insert({
      user_id: user.id, kind, scheduled_at: new Date(date).toISOString(), subject, notes, status: "pending",
    });
    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success("Demande de rendez-vous envoyée — confirmation à venir");
    setDate(""); setSubject(""); setNotes(""); load();
  };

  const cancel = async (id: string) => {
    await (supabase as any).from("partner_appointments").update({ status: "cancelled" }).eq("id", id);
    toast.success("Annulé"); load();
  };

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-semibold">Rendez-vous Renovo Crete</h1>
        <p className="text-muted-foreground mt-1">Réservez un échange avec nos équipes.</p>
      </header>
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle className="text-base">Nouvelle réservation</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div><Label>Type</Label>
              <Select value={kind} onValueChange={setKind}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{KINDS.map((k) => <SelectItem key={k.v} value={k.v}>{k.l}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div><Label>Date & heure</Label><Input type="datetime-local" value={date} onChange={(e) => setDate(e.target.value)} /></div>
            <div><Label>Sujet</Label><Input value={subject} onChange={(e) => setSubject(e.target.value)} /></div>
            <div><Label>Notes</Label><Textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} /></div>
            <Button onClick={book} disabled={saving}>{saving ? "..." : "Réserver"}</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-base">Mes rendez-vous</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {rows.length === 0 && <div className="text-sm text-muted-foreground">Aucun rendez-vous.</div>}
            {rows.map((r) => (
              <div key={r.id} className="flex items-center justify-between border border-border rounded-md p-3">
                <div>
                  <div className="flex items-center gap-2 text-sm font-medium"><CalendarDays className="w-4 h-4 text-primary" />{new Date(r.scheduled_at).toLocaleString("fr-FR")}</div>
                  <div className="text-xs text-muted-foreground">{KINDS.find((k) => k.v === r.kind)?.l} — {r.subject || "Sans sujet"}</div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={r.status === "confirmed" ? "default" : r.status === "cancelled" ? "outline" : "secondary"}>{r.status}</Badge>
                  {r.status !== "cancelled" && <Button size="sm" variant="ghost" onClick={() => cancel(r.id)}><Trash2 className="w-3.5 h-3.5 text-destructive" /></Button>}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
