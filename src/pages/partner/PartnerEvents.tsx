import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarRange, MapPin, Users } from "lucide-react";
import { toast } from "sonner";

export default function PartnerEvents() {
  const { user } = useAuth();
  const [events, setEvents] = useState<any[]>([]);
  const [regs, setRegs] = useState<Record<string, any>>({});

  const load = async () => {
    const [{ data: ev }, { data: r }] = await Promise.all([
      (supabase as any).from("partner_events").select("*").order("starts_at", { ascending: true }),
      (supabase as any).from("partner_event_registrations").select("*"),
    ]);
    setEvents(ev ?? []);
    setRegs(Object.fromEntries((r ?? []).map((x: any) => [x.event_id, x])));
  };
  useEffect(() => { if (user) load(); }, [user]);

  const register = async (id: string) => {
    if (!user) return;
    const { error } = await (supabase as any).from("partner_event_registrations").insert({
      event_id: id, user_id: user.id, seats: 1, status: "confirmed",
    });
    if (error) return toast.error(error.message);
    toast.success("Inscription confirmée"); load();
  };
  const cancel = async (id: string) => {
    const reg = regs[id]; if (!reg) return;
    await (supabase as any).from("partner_event_registrations").delete().eq("id", reg.id);
    toast.success("Inscription annulée"); load();
  };

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-semibold">Événements</h1>
        <p className="text-muted-foreground mt-1">Showrooms, formations, conférences et événements partenaires Renovo Crete.</p>
      </header>
      {events.length === 0 ? (
        <Card><CardContent className="p-10 text-center text-muted-foreground flex flex-col items-center gap-2">
          <CalendarRange className="w-8 h-8 opacity-50" />Aucun événement programmé pour le moment.
        </CardContent></Card>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {events.map((e) => {
            const reg = regs[e.id];
            return (
              <Card key={e.id} className="overflow-hidden">
                {e.cover_url && <img src={e.cover_url} alt={e.title} className="w-full aspect-video object-cover" />}
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-base">{e.title}</CardTitle>
                    {e.event_type && <Badge variant="secondary" className="text-xs">{e.event_type}</Badge>}
                  </div>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="text-muted-foreground line-clamp-2">{e.description}</div>
                  <div className="flex items-center gap-2 text-xs"><CalendarRange className="w-3.5 h-3.5" />{new Date(e.starts_at).toLocaleString("fr-FR")}</div>
                  {e.location && <div className="flex items-center gap-2 text-xs"><MapPin className="w-3.5 h-3.5" />{e.location}</div>}
                  {e.capacity > 0 && <div className="flex items-center gap-2 text-xs"><Users className="w-3.5 h-3.5" />{e.capacity} places</div>}
                  {reg ? (
                    <Button size="sm" variant="outline" className="w-full" onClick={() => cancel(e.id)}>Annuler ma participation</Button>
                  ) : (
                    <Button size="sm" className="w-full" onClick={() => register(e.id)}>S'inscrire</Button>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
