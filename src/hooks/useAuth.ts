import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Session, User } from "@supabase/supabase-js";

type AppRole = "admin" | "contractor" | "user" | "architect" | "builder";

export function useAuth() {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [roles, setRoles] = useState<AppRole[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    let revision = 0;
    const loadRoles = async (uid: string) => {
      const current = ++revision;
      setLoading(true);
      try {
        const { data, error } = await supabase.from("user_roles").select("role").eq("user_id", uid);
        if (!active || current !== revision) return;
        setRoles(error ? [] : ((data || []) as { role: AppRole }[]).map((r) => r.role));
      } finally {
        if (active && current === revision) setLoading(false);
      }
    };
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
      if (!active) return;
      setSession(s);
      setUser(s?.user ?? null);
      if (s?.user) {
        setLoading(true);
        setTimeout(() => { if (active) void loadRoles(s.user.id); }, 0);
      } else {
        revision++;
        setRoles([]);
        setLoading(false);
      }
    });
    supabase.auth.getSession().then(({ data }) => {
      if (!active) return;
      setSession(data.session);
      setUser(data.session?.user ?? null);
      if (data.session?.user) loadRoles(data.session.user.id);
      else setLoading(false);
    });
    return () => { active = false; sub.subscription.unsubscribe(); };
  }, []);

  const isAdmin = roles.includes("admin");
  const isContractor = roles.includes("contractor");
  const isArchitect = roles.includes("architect");
  const isBuilder = roles.includes("builder");
  const isPartner = isArchitect || isBuilder;
  const canAccessDashboard = isAdmin || isContractor;

  return { session, user, roles, loading, isAdmin, isContractor, isArchitect, isBuilder, isPartner, canAccessDashboard };
}
