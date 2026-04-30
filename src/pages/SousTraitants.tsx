import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import PageHeader from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Award, MapPin, Phone, ArrowRight } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

interface Contractor {
  id: string; slug: string; company_name: string; contact_name: string | null;
  tagline: string | null; avatar_url: string | null; cover_url: string | null;
  city: string | null; country: string | null; specialties: string[]; certifications: string[];
  is_featured: boolean;
}

export default function SousTraitants() {
  const { t } = useLanguage();
  const [list, setList] = useState<Contractor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from("contractor_profiles").select("*").eq("is_published", true).order("is_featured", { ascending: false }).order("company_name")
      .then(({ data }) => { setList((data as any) || []); setLoading(false); });
  }, []);

  return (
    <div className="pt-20">
      <PageHeader
        eyebrow={t("Réseau certifié", "Certified network")}
        title={t("Sous-traitants & Partenaires", "Contractors & Partners")}
        subtitle={t("Découvrez les entreprises certifiées Elite Crete Systems SXM qui collaborent avec Renovo Crete dans toute la Caraïbe.", "Discover Elite Crete Systems SXM certified companies partnering with Renovo Crete across the Caribbean.")}
      />
      <section className="container mx-auto px-4 py-12">
        <div className="flex justify-end mb-6">
          <Button asChild variant="outline"><Link to="/auth">{t("Espace pro", "Pro portal")}</Link></Button>
        </div>
        {loading ? (
          <p className="text-center text-muted-foreground">{t("Chargement…", "Loading…")}</p>
        ) : list.length === 0 ? (
          <Card className="p-12 text-center">
            <Award className="w-12 h-12 mx-auto text-primary mb-4" />
            <h3 className="font-heading text-xl font-semibold mb-2">{t("Bientôt en ligne", "Coming soon")}</h3>
            <p className="text-muted-foreground mb-6">{t("Notre réseau de sous-traitants certifiés sera bientôt visible ici.", "Our certified contractor network will appear here soon.")}</p>
            <Button asChild className="bg-gradient-brand-deep"><Link to="/auth">{t("Vous êtes certifié ECS ? Rejoignez-nous", "ECS certified? Join us")}</Link></Button>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {list.map((c) => (
              <Link key={c.id} to={`/sous-traitants/${c.slug}`} className="group">
                <Card className="overflow-hidden hover:shadow-xl transition-all h-full">
                  <div className="h-32 bg-gradient-brand-deep relative">
                    {c.cover_url && <img src={c.cover_url} alt="" className="w-full h-full object-cover" />}
                    {c.is_featured && <Badge className="absolute top-3 right-3 bg-primary-foreground text-primary">★ Premium</Badge>}
                  </div>
                  <div className="p-5 -mt-10 relative">
                    <div className="w-16 h-16 rounded-xl bg-background border-4 border-background shadow-md overflow-hidden mb-3">
                      {c.avatar_url ? <img src={c.avatar_url} alt="" className="w-full h-full object-cover" /> :
                        <div className="w-full h-full bg-gradient-brand flex items-center justify-center text-primary-foreground font-bold text-lg">{c.company_name.charAt(0)}</div>}
                    </div>
                    <h3 className="font-heading font-bold text-lg group-hover:text-primary transition-colors">{c.company_name}</h3>
                    {c.tagline && <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{c.tagline}</p>}
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mt-3">
                      {c.city && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{c.city}</span>}
                      <span className="flex items-center gap-1 text-primary"><Award className="w-3 h-3" />ECS Certified</span>
                    </div>
                    <div className="mt-4 text-sm text-primary font-medium flex items-center gap-1">{t("Voir le profil", "View profile")} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
