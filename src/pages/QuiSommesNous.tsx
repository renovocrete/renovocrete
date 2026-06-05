import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Award, Users, MapPin, Shield, Sparkles, Wrench, HardHat } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageHeader from "@/components/PageHeader";
import { useLanguage } from "@/i18n/LanguageContext";
import galleryHero from "@/assets/hero-epoxy-floor.jpg";
import galleryCommercial from "@/assets/epoxy-commercial.jpg";
import galleryIndustrial from "@/assets/epoxy-industrial.jpg";
import galleryOutdoor from "@/assets/epoxy-outdoor.jpg";

const fadeUp = { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };

const QuiSommesNous = () => {
  const { t } = useLanguage();


  return (
    <>
      <PageHeader
        badge={t("Qui sommes-nous", "About us")}
        title={t("L'expertise", "The expertise")}
        highlight={t("RENOVO CRETE", "RENOVO CRETE")}
        description={t(
          "Une équipe passionnée, formée et engagée dans la transformation durable des surfaces à Saint-Martin et dans toute la Caraïbe.",
          "A passionate, certified team committed to lasting surface transformation in Saint-Martin and throughout the Caribbean."
        )}
      />

      {/* Présentation */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div {...fadeUp}>
              <span className="text-sm font-semibold uppercase tracking-widest text-primary">
                {t("Notre histoire", "Our story")}
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold mt-3 tracking-tight mb-6">
                {t("Transformer les surfaces,", "Transforming surfaces,")}{" "}
                <span className="text-gradient-brand">{t("valoriser les espaces", "enhancing spaces")}</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {t(
                  "RENOVO CRETE est une entreprise spécialisée dans les revêtements de sol en résine époxy et les surfaces décoratives et techniques. Basée à Saint-Martin, notre équipe intervient dans toute la Caraïbe avec une expertise reconnue et des produits de qualité professionnelle.",
                  "RENOVO CRETE specializes in epoxy resin floor coatings and decorative and technical surfaces. Based in Saint-Martin, our team operates throughout the Caribbean with recognized expertise and professional-quality products."
                )}
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {t(
                  "Partenaire formé par ELITE CRETE SYSTEMS, nous utilisons des systèmes de revêtement éprouvés, conçus pour résister aux conditions climatiques tropicales, au trafic intense et aux exigences les plus élevées en matière de durabilité et d'esthétique.",
                  "As a certified partner of ELITE CRETE SYSTEMS, we use proven coating systems designed to withstand tropical weather conditions, heavy traffic, and the highest standards of durability and aesthetics."
                )}
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Award, label: t("Formé Elite Crete", "Elite Crete Certified") },
                  { icon: MapPin, label: t("Basé à Saint-Martin", "Based in Saint-Martin") },
                  { icon: Shield, label: t("Garantie satisfaction", "Satisfaction guaranteed") },
                  { icon: Users, label: t("Équipe dédiée", "Dedicated team") },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2.5 p-3 rounded-lg border border-border">
                    <item.icon className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div {...fadeUp} transition={{ delay: 0.15 }} className="rounded-2xl overflow-hidden bg-gradient-brand-deep aspect-[4/3] flex items-center justify-center">
              <div className="text-center text-primary-foreground p-8">
                <Award className="w-16 h-16 mx-auto mb-4 opacity-80" />
                <p className="font-heading text-xl font-bold">{t("Partenaire formé", "Certified Partner")}</p>
                <p className="text-primary-foreground/70 mt-2">ELITE CRETE SYSTEMS</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Équipe */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} className="text-center mb-14">
            <span className="text-sm font-semibold uppercase tracking-widest text-primary">{t("Notre équipe", "Our team")}</span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold mt-3 tracking-tight">
              {t("Les visages derrière", "The faces behind")}{" "}
              <span className="text-gradient-brand">RENOVO CRETE</span>
            </h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, i) => (
              <motion.div key={member.name} {...fadeUp} transition={{ delay: i * 0.08 }} className="rounded-xl border border-border bg-background overflow-hidden">
                <div className="aspect-square bg-muted flex items-center justify-center">
                  <Users className="w-16 h-16 text-muted-foreground/20" />
                </div>
                <div className="p-5">
                  <h3 className="font-heading text-base font-bold">{member.name}</h3>
                  <p className="text-primary text-sm font-medium mt-0.5">{lang === "fr" ? member.role : member.roleEn}</p>
                  <p className="text-muted-foreground text-xs mt-2 leading-relaxed">{lang === "fr" ? member.desc : member.descEn}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold mb-4">
            {t("Travaillons ensemble", "Let's work together")}
          </h2>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
            {t("Discutons de votre projet et trouvons la solution adaptée à vos besoins.", "Let's discuss your project and find the right solution for your needs.")}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button asChild size="lg" className="bg-gradient-brand-deep hover:opacity-90 text-lg px-8 py-6">
              <Link to="/devis">{t("Demander un devis", "Request a quote")} <ArrowRight className="w-5 h-5 ml-2" /></Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/contact">Contact</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default QuiSommesNous;
