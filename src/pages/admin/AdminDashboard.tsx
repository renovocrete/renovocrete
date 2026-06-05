import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Users, HardHat, Briefcase, Calendar, FileText, TrendingUp } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const PALETTE = ["hsl(var(--primary))", "hsl(var(--accent))", "hsl(var(--muted-foreground))", "hsl(var(--destructive))"];

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    contractors: 0,
    architects: 0,
    builders: 0,
    projects: 0,
    appointments: 0,
    events: 0,
    revenue: 0,
    quotes: 0,
  });
  const [statusData, setStatusData] = useState<{ name: string; value: number }[]>([]);

  useEffect(() => {
    (async () => {
      const [c, r, p, a, e, q, st] = await Promise.all([
        supabase.from("contractor_profiles").select("id", { count: "exact", head: true }),
        supabase.from("user_roles").select("role"),
        (supabase as any).from("partner_projects").select("budget,status"),
        (supabase as any).from("partner_appointments").select("id", { count: "exact", head: true }),
        (supabase as any).from("partner_events").select("id", { count: "exact", head: true }),
        supabase.from("quote_requests").select("id", { count: "exact", head: true }),
        (supabase as any).from("account_status").select("status"),
      ]);
      const roles = (r.data || []) as { role: string }[];
      const proj = (p.data || []) as { budget: number | null; status: string | null }[];
      setStats({
        contractors: c.count || 0,
        architects: roles.filter(x => x.role === "architect").length,
        builders: roles.filter(x => x.role === "builder").length,
        projects: proj.length,
        appointments: a.count || 0,
        events: e.count || 0,
        revenue: proj.reduce((s, x) => s + (Number(x.budget) || 0), 0),
        quotes: q.count || 0,
      });
      const counts: Record<string, number> = { active: 0, disabled: 0, suspended: 0, pending: 0 };
      ((st.data || []) as { status: string }[]).forEach((x) => { counts[x.status] = (counts[x.status] || 0) + 1; });
      setStatusData(Object.entries(counts).map(([name, value]) => ({ name, value })));
    })();
  }, []);

  const kpis = [
    { label: "Sous-traitants", value: stats.contractors, icon: Users },
    { label: "Architectes", value: stats.architects, icon: HardHat },
    { label: "Constructeurs", value: stats.builders, icon: HardHat },
    { label: "Projets", value: stats.projects, icon: Briefcase },
    { label: "Rendez-vous", value: stats.appointments, icon: Calendar },
    { label: "Demandes de devis", value: stats.quotes, icon: FileText },
    { label: "Événements", value: stats.events, icon: Calendar },
    { label: "Revenus cumulés (€)", value: stats.revenue.toLocaleString("fr-FR"), icon: TrendingUp },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <header className="mb-8">
        <p className="text-xs uppercase tracking-widest text-primary font-semibold">RENOVO CRETE · Vue globale</p>
        <h1 className="font-heading text-3xl font-bold mt-1">Tableau de bord</h1>
        <p className="text-muted-foreground mt-1">Contrôle complet de la plateforme.</p>
      </header>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {kpis.map((k) => (
          <Card key={k.label} className="p-5">
            <div className="flex items-center justify-between">
              <k.icon className="w-5 h-5 text-primary" />
              <p className="text-xs text-muted-foreground">{k.label}</p>
            </div>
            <p className="font-heading text-2xl font-bold mt-2">{k.value}</p>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="font-heading text-base font-bold mb-4">Statuts de comptes</h3>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie data={statusData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label>
                {statusData.map((_, i) => <Cell key={i} fill={PALETTE[i % PALETTE.length]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
        <Card className="p-6">
          <h3 className="font-heading text-base font-bold mb-4">Répartition rôles</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={[
              { name: "Sous-traitants", v: stats.contractors },
              { name: "Architectes", v: stats.architects },
              { name: "Constructeurs", v: stats.builders },
            ]}>
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="v" fill="hsl(var(--primary))" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
}
