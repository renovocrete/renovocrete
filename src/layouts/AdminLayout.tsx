import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { LayoutDashboard, Users, HardHat, MessageSquare, Bot, Settings, ArrowLeft, ShieldCheck, Headset, ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

const items = [
  { to: "/admin/dashboard", icon: LayoutDashboard, label: "Tableau de bord" },
  { to: "/admin/live-chat", icon: Headset, label: "Live Chat visiteurs" },
  { to: "/admin/sous-traitants", icon: Users, label: "Sous-traitants" },
  { to: "/admin/partenaires", icon: HardHat, label: "Architectes & Constructeurs" },
  { to: "/admin/messagerie", icon: MessageSquare, label: "Messagerie interne" },
  { to: "/admin/chatbot", icon: Bot, label: "Base assistant IA" },
  { to: "/admin/parametres", icon: Settings, label: "Paramètres" },
];

export default function AdminLayout() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [impersonating, setImpersonating] = useState<string | null>(null);

  useEffect(() => {
    const v = sessionStorage.getItem("impersonation_active");
    setImpersonating(v);
  }, []);

  return (
    <div className="min-h-screen flex bg-secondary/30">
      {impersonating && (
        <div className="fixed top-0 inset-x-0 z-[60] bg-destructive text-destructive-foreground py-2 px-4 text-center text-sm font-semibold flex items-center justify-center gap-3">
          <ShieldCheck className="w-4 h-4" />
          Mode « Connexion en tant que » actif — {impersonating}
          <button
            className="underline ml-2"
            onClick={async () => {
              sessionStorage.removeItem("impersonation_active");
              await supabase.auth.signOut();
              navigate("/auth");
            }}
          >
            Quitter
          </button>
        </div>
      )}

      <aside className="w-64 shrink-0 bg-foreground text-background flex flex-col">
        <div className="p-6 border-b border-background/10">
          <p className="text-xs uppercase tracking-widest text-background/60">RENOVO CRETE</p>
          <p className="font-heading text-lg font-bold mt-1">Super Administration</p>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {items.map((it) => (
            <NavLink
              key={it.to}
              to={it.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  isActive ? "bg-primary text-primary-foreground" : "text-background/80 hover:bg-background/10"
                }`
              }
            >
              <it.icon className="w-4 h-4" />
              {it.label}
            </NavLink>
          ))}
        </nav>
        <div className="p-3 border-t border-background/10">
          <p className="text-xs text-background/60 px-3 truncate">{user?.email}</p>
          <Button asChild variant="ghost" className="w-full justify-start text-background/80 hover:text-background hover:bg-background/10 mt-2">
            <NavLink to="/"><ArrowLeft className="w-4 h-4 mr-2" />Retour au site</NavLink>
          </Button>
        </div>
      </aside>

      <main className="flex-1 overflow-x-hidden">
        <div className={impersonating ? "pt-10" : ""}>
          <Outlet />
        </div>
      </main>
    </div>
  );
}
