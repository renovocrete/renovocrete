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

      {/* Réseau d'experts (institutionnel — pas de portraits) */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} className="text-center mb-14 max-w-3xl mx-auto">
            <span className="text-sm font-semibold uppercase tracking-widest text-primary">{t("Notre réseau", "Our network")}</span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold mt-3 tracking-tight">
              {t("Un collectif d'experts au service de", "A collective of experts serving")}{" "}
              <span className="text-gradient-brand">{t("vos projets", "your projects")}</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mt-6">
              {t(
                "RENOVO CRETE s'appuie sur un réseau d'experts, de techniciens, d'artisans qualifiés, d'architectes et de partenaires spécialisés afin d'offrir des solutions haut de gamme adaptées à chaque projet. Notre priorité est la qualité d'exécution, l'innovation, l'accompagnement client et l'excellence des finitions.",
                "RENOVO CRETE relies on a network of experts, technicians, qualified craftsmen, architects, and specialized partners to deliver premium solutions tailored to every project. Our priority is execution quality, innovation, client support, and finishing excellence."
              )}
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { img: galleryHero, label: t("Excellence des finitions", "Finishing excellence") },
              { img: galleryCommercial, label: t("Espaces commerciaux", "Commercial spaces") },
              { img: galleryIndustrial, label: t("Solutions industrielles", "Industrial solutions") },
              { img: galleryOutdoor, label: t("Aménagements extérieurs", "Outdoor projects") },
            ].map((card, i) => (
              <motion.div key={card.label} {...fadeUp} transition={{ delay: i * 0.08 }} className="group relative rounded-xl overflow-hidden aspect-[4/5] border border-border">
                <img src={card.img} alt={card.label} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-background">
                  <p className="font-heading text-sm font-semibold">{card.label}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid sm:grid-cols-3 gap-4 mt-10">
            {[
              { icon: Sparkles, title: t("Innovation continue", "Continuous innovation"), desc: t("Veille technique permanente sur les matériaux et procédés.", "Permanent technical watch on materials and processes.") },
              { icon: Wrench, title: t("Savoir-faire d'atelier", "Craftsmanship"), desc: t("Compétences certifiées, équipements professionnels dédiés.", "Certified skills, dedicated professional equipment.") },
              { icon: HardHat, title: t("Sécurité de chantier", "On-site safety"), desc: t("Protocoles stricts, conformité réglementaire totale.", "Strict protocols, full regulatory compliance.") },
            ].map((item) => (
              <div key={item.title} className="p-6 rounded-xl border border-border bg-background">
                <item.icon className="w-6 h-6 text-primary" />
                <h3 className="font-heading text-base font-bold mt-3">{item.title}</h3>
                <p className="text-muted-foreground text-sm mt-1.5 leading-relaxed">{item.desc}</p>
              </div>
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
