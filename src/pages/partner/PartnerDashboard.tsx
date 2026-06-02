import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FolderKanban, Sparkles, CalendarDays, CalendarRange, Library, BarChart3 } from "lucide-react";

export default function PartnerDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({ projects: 0, value: 0, appointments: 0, events: 0 });

  useEffect(() => {
    if (!user) return;
    (async () => {
      const [{ data: p }, { data: a }, { data: e }] = await Promise.all([
        (supabase as any).from("partner_projects").select("total_budget"),
        (supabase as any).from("partner_appointments").select("id").gte("scheduled_at", new Date().toISOString()),
        (supabase as any).from("partner_event_registrations").select("id").eq("status", "confirmed"),
      ]);
      setStats({
        projects: p?.length ?? 0,
        value: (p ?? []).reduce((s: number, r: any) => s + Number(r.total_budget || 0), 0),
        appointments: a?.length ?? 0,
        events: e?.length ?? 0,
      });
    })();
  }, [user]);

  const kpis = [
    { label: "Projets actifs", value: stats.projects, icon: FolderKanban },
    { label: "Valeur portefeuille", value: `${stats.value.toLocaleString("fr-FR")} €`, icon: BarChart3 },
    { label: "RDV à venir", value: stats.appointments, icon: CalendarDays },
    { label: "Événements inscrits", value: stats.events, icon: CalendarRange },
  ];

  const quick = [
    { to: "/partenaire/projets", label: "Gérer mes projets", icon: FolderKanban },
    { to: "/partenaire/visualiseur", label: "Lancer un visuel IA", icon: Sparkles },
    { to: "/partenaire/mediatheque", label: "Ouvrir la médiathèque", icon: Library },
    { to: "/partenaire/rendez-vous", label: "Prendre rendez-vous", icon: CalendarDays },
  ];

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-semibold tracking-tight">Bienvenue</h1>
        <p className="text-muted-foreground mt-1">Votre espace privé Renovo Crete. Toutes vos données restent confidentielles.</p>
      </header>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((k) => (
          <Card key={k.label}>
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">{k.label}</div>
                  <div className="text-2xl font-semibold mt-2">{k.value}</div>
                </div>
                <k.icon className="w-6 h-6 text-primary/70" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader><CardTitle>Accès rapides</CardTitle></CardHeader>
        <CardContent className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {quick.map((q) => (
            <Button key={q.to} asChild variant="outline" className="h-auto py-4 justify-start">
              <Link to={q.to}>
                <q.icon className="w-4 h-4 mr-2 text-primary" /> {q.label}
              </Link>
            </Button>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
