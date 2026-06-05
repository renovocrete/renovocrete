import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export function usePermissions() {
  const { user } = useAuth();
  const [perms, setPerms] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    (async () => {
      if (!user) { setPerms({}); setLoading(false); return; }
      const { data } = await (supabase as any).from("admin_permissions").select("permissions").eq("user_id", user.id).maybeSingle();
      if (!active) return;
      setPerms(((data as any)?.permissions as Record<string, boolean>) || {});
      setLoading(false);
    })();
    return () => { active = false; };
  }, [user?.id]);

  const has = (key: string) => !!perms[key];
  return { perms, has, loading };
}
