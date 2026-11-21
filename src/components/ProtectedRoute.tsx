import { Navigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/LanguageContext";
import { Loader2 } from "lucide-react";

interface Props {
  children: React.ReactNode;
  requireAdmin?: boolean;
  requirePartner?: boolean;
}

export default function ProtectedRoute({ children, requireAdmin = false, requirePartner = false }: Props) {
  const { loading, user, isAdmin, isPartner } = useAuth();
  const location = useLocation();
  const { t } = useLanguage();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }
  if (!user) return <Navigate to={`/auth?redirect=${encodeURIComponent(location.pathname)}`} replace />;
  if (requireAdmin && !isAdmin) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-6 text-center bg-background">
      <h1 className="font-heading text-2xl font-bold">{t("Accès administrateur requis", "Administrator access required", "Se requiere acceso de administrador")}</h1>
      <p className="text-muted-foreground">{t("Ce compte n’a pas les droits pour modifier le site.", "This account does not have permission to edit the website.", "Esta cuenta no tiene permiso para editar el sitio.")}</p>
      <Button onClick={async () => { await import("@/integrations/supabase/client").then(({ supabase }) => supabase.auth.signOut()); window.location.assign("/auth?redirect=%2Fadmin%2Fsite"); }}>{t("Se connecter avec un autre compte", "Sign in with another account", "Iniciar sesión con otra cuenta")}</Button>
      <Button asChild variant="outline"><Link to="/">{t("Retour au site", "Back to website", "Volver al sitio")}</Link></Button>
    </div>
  );
  if (requirePartner && !isPartner && !isAdmin) return <Navigate to="/partenaire/inscription" replace />;
  return <>{children}</>;
}
