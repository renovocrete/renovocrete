import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";

interface Props {
  children: React.ReactNode;
  requireAdmin?: boolean;
  requirePartner?: boolean;
}

export default function ProtectedRoute({ children, requireAdmin = false, requirePartner = false }: Props) {
  const { loading, user, isAdmin, isPartner } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }
  if (!user) return <Navigate to="/auth" replace />;
  if (requireAdmin && !isAdmin) return <Navigate to="/dashboard" replace />;
  if (requirePartner && !isPartner && !isAdmin) return <Navigate to="/partenaire/inscription" replace />;
  return <>{children}</>;
}
