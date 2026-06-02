import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  LayoutDashboard, FolderKanban, Library, Sparkles, UserCircle2,
  CalendarDays, CalendarRange, BarChart3, LogOut, ShieldCheck,
} from "lucide-react";

const nav = [
  { to: "/partenaire/dashboard", label: "Tableau de bord", icon: LayoutDashboard },
  { to: "/partenaire/projets", label: "Projets", icon: FolderKanban },
  { to: "/partenaire/mediatheque", label: "Médiathèque RENOVO", icon: Library },
  { to: "/partenaire/visualiseur", label: "Visualiseur IA", icon: Sparkles },
  { to: "/partenaire/profil", label: "Profil", icon: UserCircle2 },
  { to: "/partenaire/rendez-vous", label: "Rendez-vous", icon: CalendarDays },
  { to: "/partenaire/evenements", label: "Événements", icon: CalendarRange },
  { to: "/partenaire/analyses", label: "Analyses & Statistiques", icon: BarChart3 },
];

export default function PartnerLayout() {
  const { user, isArchitect, isBuilder, isAdmin } = useAuth();
  const navigate = useNavigate();
  const kindLabel = isArchitect ? "Architecte" : isBuilder ? "Constructeur" : isAdmin ? "Admin" : "Partenaire";

  const logout = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  return (
    <div className="min-h-screen bg-background flex">
      <aside className="hidden lg:flex w-72 shrink-0 border-r border-border bg-card/40 flex-col">
        <div className="px-6 py-6 border-b border-border">
          <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Renovo Crete</div>
          <div className="text-lg font-semibold mt-1">Espace privé partenaire</div>
          <Badge variant="secondary" className="mt-3 gap-1"><ShieldCheck className="w-3 h-3" />{kindLabel}</Badge>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {nav.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors ${
                  isActive ? "bg-primary/10 text-primary font-medium" : "text-foreground/80 hover:bg-muted/60"
                }`
              }
            >
              <n.icon className="w-4 h-4" />
              {n.label}
            </NavLink>
          ))}
        </nav>
        <div className="px-4 py-4 border-t border-border space-y-2">
          <div className="text-xs text-muted-foreground truncate">{user?.email}</div>
          <Button variant="outline" size="sm" className="w-full" onClick={logout}>
            <LogOut className="w-4 h-4 mr-2" /> Déconnexion
          </Button>
        </div>
      </aside>
      <div className="flex-1 flex flex-col min-w-0">
        <header className="lg:hidden border-b border-border px-4 py-3 flex items-center justify-between bg-card/40">
          <div className="font-semibold">Espace partenaire</div>
          <Button variant="ghost" size="sm" onClick={logout}><LogOut className="w-4 h-4" /></Button>
        </header>
        <nav className="lg:hidden border-b border-border px-2 py-2 flex gap-1 overflow-x-auto">
          {nav.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              className={({ isActive }) =>
                `flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs whitespace-nowrap ${
                  isActive ? "bg-primary text-primary-foreground" : "bg-muted/60 text-foreground/80"
                }`
              }
            >
              <n.icon className="w-3.5 h-3.5" />
              {n.label}
            </NavLink>
          ))}
        </nav>
        <main className="flex-1 p-4 md:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
