import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { useLanguage } from "@/i18n/LanguageContext";

export default function Auth() {
  const nav = useNavigate();
  const { t } = useLanguage();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [contactName, setContactName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => { if (data.session) nav("/dashboard"); });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => { if (s) nav("/dashboard"); });
    return () => sub.subscription.unsubscribe();
  }, [nav]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email, password,
          options: { emailRedirectTo: `${window.location.origin}/dashboard`, data: { company_name: companyName, contact_name: contactName } },
        });
        if (error) throw error;
        toast.success(t("Compte créé. Vérifiez votre email.", "Account created. Check your email."));
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success(t("Connecté", "Signed in"));
      }
    } catch (err: any) {
      toast.error(err.message);
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary/30 px-4 pt-24 pb-12">
      <Card className="w-full max-w-md p-8">
        <h1 className="font-heading text-2xl font-bold mb-1">{mode === "login" ? t("Espace sous-traitant", "Contractor portal") : t("Devenir partenaire", "Become a partner")}</h1>
        <p className="text-sm text-muted-foreground mb-6">{t("Réservé aux entreprises certifiées Elite Crete Systems.", "For Elite Crete Systems certified contractors only.")}</p>
        <form onSubmit={submit} className="space-y-4">
          {mode === "signup" && (
            <>
              <div><Label>{t("Nom de l'entreprise", "Company name")}</Label><Input value={companyName} onChange={(e) => setCompanyName(e.target.value)} required /></div>
              <div><Label>{t("Nom du contact", "Contact name")}</Label><Input value={contactName} onChange={(e) => setContactName(e.target.value)} required /></div>
            </>
          )}
          <div><Label>Email</Label><Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></div>
          <div><Label>{t("Mot de passe", "Password")}</Label><Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} /></div>
          <Button type="submit" disabled={loading} className="w-full bg-gradient-brand-deep">{loading ? "..." : mode === "login" ? t("Se connecter", "Sign in") : t("Créer mon compte", "Create account")}</Button>
        </form>
        <button onClick={() => setMode(mode === "login" ? "signup" : "login")} className="text-sm text-primary mt-4 hover:underline">
          {mode === "login" ? t("Pas encore de compte ? Inscription", "No account? Sign up") : t("Déjà inscrit ? Connexion", "Already a member? Sign in")}
        </button>
        <div className="mt-4 text-center"><Link to="/sous-traitants" className="text-xs text-muted-foreground hover:text-primary">{t("← Voir les sous-traitants", "← View contractors")}</Link></div>
      </Card>
    </div>
  );
}
