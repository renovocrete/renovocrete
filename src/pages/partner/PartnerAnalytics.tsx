import { useEffect, useMemo, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, CartesianGrid } from "recharts";

const COLORS = ["hsl(var(--primary))", "hsl(217 78% 55%)", "hsl(217 60% 40%)", "hsl(217 40% 70%)", "hsl(217 20% 50%)"];

export default function PartnerAnalytics() {
  const { user } = useAuth();
  const [rows, setRows] = useState<any[]>([]);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const { data } = await (supabase as any).from("partner_projects").select("*");
      setRows(data ?? []);
    })();
  }, [user]);

  const m = useMemo(() => {
    const n = rows.length;
    const totalValue = rows.reduce((s, r) => s + Number(r.total_budget || 0), 0);
    const avg = n ? totalValue / n : 0;
    const prices = rows.map((r) => Number(r.estimated_price || 0)).filter((x) => x > 0);
    const min = prices.length ? Math.min(...prices) : 0;
    const max = prices.length ? Math.max(...prices) : 0;
    const byType: Record<string, number> = {};
    rows.forEach((r) => { const k = r.property_type || "autre"; byType[k] = (byType[k] || 0) + 1; });
    const typeData = Object.entries(byType).map(([name, value]) => ({ name, value }));
    const locCounts = { Intérieur: 0, Extérieur: 0, Mixte: 0 };
    rows.forEach((r) => {
      if (r.location_kind === "interior") locCounts["Intérieur"]++;
      else if (r.location_kind === "exterior") locCounts["Extérieur"]++;
      else locCounts["Mixte"]++;
    });
    const locData = Object.entries(locCounts).map(([name, value]) => ({ name, value }));
    const byMonth: Record<string, number> = {};
    rows.forEach((r) => {
      const d = new Date(r.created_at);
      const k = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      byMonth[k] = (byMonth[k] || 0) + Number(r.total_budget || 0);
    });
    const monthData = Object.entries(byMonth).sort().map(([name, value]) => ({ name, value }));
    return { n, totalValue, avg, min, max, typeData, locData, monthData };
  }, [rows]);

  const kpi = [
    { l: "Nombre de projets", v: m.n },
    { l: "Valeur totale", v: `${m.totalValue.toLocaleString("fr-FR")} €` },
    { l: "Budget moyen", v: `${Math.round(m.avg).toLocaleString("fr-FR")} €` },
    { l: "Prix min / max", v: `${m.min.toLocaleString("fr-FR")} / ${m.max.toLocaleString("fr-FR")} €` },
  ];

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-semibold">Analyses & Statistiques</h1>
        <p className="text-muted-foreground mt-1">Vue d'ensemble de votre activité.</p>
      </header>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpi.map((k) => (
          <Card key={k.l}><CardContent className="p-5">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">{k.l}</div>
            <div className="text-2xl font-semibold mt-2">{k.v}</div>
          </CardContent></Card>
        ))}
      </div>
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle className="text-base">Répartition par type de bien</CardTitle></CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer><PieChart>
              <Pie data={m.typeData} dataKey="value" nameKey="name" outerRadius={90} label>
                {m.typeData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip />
            </PieChart></ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-base">Intérieur / Extérieur</CardTitle></CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer><BarChart data={m.locData}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis dataKey="name" /><YAxis /><Tooltip />
              <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart></ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle className="text-base">Évolution mensuelle (budget total)</CardTitle></CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer><LineChart data={m.monthData}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis dataKey="name" /><YAxis /><Tooltip />
              <Line type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={2} />
            </LineChart></ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
