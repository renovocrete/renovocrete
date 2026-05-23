import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/i18n/LanguageContext";
import { Shield, User as UserIcon, UserCheck } from "lucide-react";

type Props = { className?: string; compact?: boolean };

export default function DashboardStatusBadge({ className = "", compact = false }: Props) {
  const { t } = useLanguage();
  const { user, canAccessDashboard, isAdmin, loading } = useAuth();

  if (loading) return null;

  let label: string;
  let Icon = UserIcon;
  let variant: "default" | "secondary" | "outline" = "outline";

  if (!user) {
    label = t("Invité", "Guest");
    Icon = UserIcon;
    variant = "outline";
  } else if (isAdmin || canAccessDashboard) {
    label = isAdmin ? "Admin" : t("Pro", "Pro");
    Icon = Shield;
    variant = "default";
  } else {
    label = t("Connecté", "Signed in");
    Icon = UserCheck;
    variant = "secondary";
  }

  return (
    <Badge variant={variant} className={`gap-1 ${className}`}>
      <Icon className={compact ? "w-3 h-3" : "w-3.5 h-3.5"} />
      {label}
    </Badge>
  );
}
