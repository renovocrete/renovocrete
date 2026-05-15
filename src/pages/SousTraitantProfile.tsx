import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Phone, Mail, Globe, MapPin, Award, Instagram, Facebook, ArrowLeft, FileText } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

export default function SousTraitantProfile() {
  const { slug } = useParams();
  const { t } = useLanguage();
  const [c, setC] = useState<any>(null);
  const [media, setMedia] = useState<any[]>([]);
  const [showcase, setShowcase] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("contractor_profiles")
        .select("*")
        .eq("slug", slug as string)
        .eq("is_published", true)
        .maybeSingle();
      setC(data);
      if (data) {
        const [{ data: m }, { data: pr }] = await Promise.all([
          supabase.from("contractor_media").select("*").eq("contractor_id", data.id).order("sort_order"),
          supabase.from("projects").select("id,title,short_description,product_type,city:address,surface_m2,after_photo,before_photo").eq("user_id", data.user_id).eq("is_public", true).order("created_at", { ascending: false }),
        ]);
        setMedia(m || []);
        setShowcase((pr as any) || []);
      }
      setLoading(false);
    })();
  }, [slug]);

  if (loading) return <div className="pt-32 text-center text-muted-foreground">{t("Chargement…", "Loading…")}</div>;
  if (!c) return <div className="pt-32 text-center"><p>{t("Profil introuvable", "Profile not found")}</p><Button asChild className="mt-4"><Link to="/sous-traitants">{t("Retour", "Back")}</Link></Button></div>;

  const showPhone = !!c.show_phone && !!c.phone;
  const showEmail = !!c.show_email && !!c.email;
  const showAddress = !!c.show_address && !!c.address;
  const showSocial = c.show_social !== false;
  const hasContact = showPhone || showEmail || c.website || showAddress || (showSocial && (c.instagram || c.facebook));

  return (
    <div className="pt-20">
      <div className="h-64 sm:h-80 bg-gradient-brand-deep relative">
        {c.cover_url && <img src={c.cover_url} alt="" className="w-full h-full object-cover" />}
      </div>
      <div className="container mx-auto px-4 -mt-20 relative">
        <Button asChild variant="ghost" size="sm" className="mb-4 text-primary-foreground hover:text-primary-foreground/80"><Link to="/sous-traitants"><ArrowLeft className="w-4 h-4 mr-1" />{t("Tous les sous-traitants", "All contractors")}</Link></Button>
        <Card className="p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <div className="w-24 h-24 rounded-2xl bg-secondary border-4 border-background shadow-lg overflow-hidden flex-shrink-0 -mt-16">
              {c.avatar_url ? <img src={c.avatar_url} alt="" className="w-full h-full object-cover" /> :
                <div className="w-full h-full bg-gradient-brand flex items-center justify-center text-primary-foreground font-bold text-3xl">{c.company_name.charAt(0)}</div>}
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <h1 className="font-heading text-3xl font-bold">{c.company_name}</h1>
                {c.is_featured && <Badge className="bg-primary text-primary-foreground">★ Premium</Badge>}
              </div>
              {c.tagline && <p className="text-lg text-muted-foreground">{c.tagline}</p>}
              <div className="flex flex-wrap gap-3 mt-4 text-sm">
                {c.city && <span className="flex items-center gap-1.5 text-muted-foreground"><MapPin className="w-4 h-4" />{c.city}{c.country ? `, ${c.country}` : ""}</span>}
                {c.years_experience && <span className="text-muted-foreground">{c.years_experience} {t("ans d'expérience", "years experience")}</span>}
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                {(c.certifications || []).map((cert: string) => (
                  <Badge key={cert} variant="secondary" className="gap-1"><Award className="w-3 h-3 text-primary" />{cert}</Badge>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2 w-full sm:w-auto">
              <Button asChild className="bg-gradient-brand-deep">
                <Link to={`/devis?contractor=${c.slug}`}><FileText className="w-4 h-4 mr-2" />{t("Demander un devis", "Request a quote")}</Link>
              </Button>
              {showPhone && <Button asChild variant="outline"><a href={`tel:${c.phone}`}><Phone className="w-4 h-4 mr-2" />{c.phone}</a></Button>}
            </div>
          </div>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6 mt-6 pb-16">
          <div className="lg:col-span-2 space-y-6">
            {c.bio && <Card className="p-6"><h2 className="font-heading text-xl font-semibold mb-3">{t("À propos", "About")}</h2><p className="text-muted-foreground whitespace-pre-line leading-relaxed">{c.bio}</p></Card>}
            {c.specialties?.length > 0 && (
              <Card className="p-6">
                <h2 className="font-heading text-xl font-semibold mb-3">{t("Spécialités", "Specialties")}</h2>
                <div className="flex flex-wrap gap-2">{c.specialties.map((s: string) => <Badge key={s} variant="outline">{s}</Badge>)}</div>
              </Card>
            )}
            {(c.service_areas?.length || 0) > 0 && (
              <Card className="p-6">
                <h2 className="font-heading text-xl font-semibold mb-3">{t("Zones d'intervention", "Service areas")}</h2>
                <div className="flex flex-wrap gap-2">{(c.service_areas as string[]).map((s) => <Badge key={s} variant="secondary">{s}</Badge>)}</div>
              </Card>
            )}
            {showcase.length > 0 && (
              <Card className="p-6">
                <h2 className="font-heading text-xl font-semibold mb-4">{t("Chantiers réalisés", "Completed projects")}</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {showcase.map((p) => (
                    <div key={p.id} className="rounded-lg overflow-hidden border bg-secondary/30">
                      {(p.after_photo || p.before_photo) && <img src={p.after_photo || p.before_photo} alt={p.title} className="w-full h-40 object-cover" />}
                      <div className="p-3">
                        <h4 className="font-semibold text-sm">{p.title}</h4>
                        {p.short_description && <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{p.short_description}</p>}
                        <div className="text-[11px] text-muted-foreground mt-2 flex gap-3">
                          {p.surface_m2 && <span>{p.surface_m2} m²</span>}
                          {p.product_type && <span>· {p.product_type}</span>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}
            {media.length > 0 && (
              <Card className="p-6">
                <h2 className="font-heading text-xl font-semibold mb-4">{t("Galerie", "Gallery")}</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {media.map((m) => (
                    <div key={m.id} className="aspect-square rounded-lg overflow-hidden bg-secondary">
                      {m.type === "video" ? <video src={m.url} controls className="w-full h-full object-cover" /> : <img src={m.url} alt={m.caption || ""} className="w-full h-full object-cover" />}
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>
          <div className="space-y-4">
            <Card className="p-6">
              <h3 className="font-heading font-semibold mb-4">Contact</h3>
              {hasContact ? (
                <div className="space-y-3 text-sm">
                  {showPhone && <a href={`tel:${c.phone}`} className="flex items-center gap-2 hover:text-primary"><Phone className="w-4 h-4" />{c.phone}</a>}
                  {showEmail && <a href={`mailto:${c.email}`} className="flex items-center gap-2 hover:text-primary"><Mail className="w-4 h-4" />{c.email}</a>}
                  {c.website && <a href={c.website} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-primary"><Globe className="w-4 h-4" />{c.website}</a>}
                  {showAddress && <div className="flex items-start gap-2"><MapPin className="w-4 h-4 mt-0.5" /><span>{c.address}</span></div>}
                  {showSocial && (c.instagram || c.facebook) && (
                    <div className="flex gap-2 pt-2">
                      {c.instagram && <a href={c.instagram} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"><Instagram className="w-4 h-4" /></a>}
                      {c.facebook && <a href={c.facebook} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"><Facebook className="w-4 h-4" /></a>}
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">{t("Coordonnées privées. Passez par notre formulaire pour entrer en contact.", "Contact details are private. Use our form to get in touch.")}</p>
                  <Button asChild className="w-full bg-gradient-brand-deep"><Link to={`/devis?contractor=${c.slug}`}>{t("Demander un devis", "Request a quote")}</Link></Button>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
