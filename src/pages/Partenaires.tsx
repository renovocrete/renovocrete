import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink, Shield, Award, Globe, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageHeader from "@/components/PageHeader";
import { useLanguage } from "@/i18n/LanguageContext";

const fadeUp = { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };

const Partenaires = () => {
  const { t } = useLanguage();

  const benefits = [
    { label: t("Systèmes de revêtement éprouvés depuis plus de 30 ans", "Proven coating systems for over 30 years") },
    { label: t("Réseau international de professionnels formés", "International network of certified professionals") },
    { label: t("Produits conçus pour résister aux conditions les plus exigeantes", "Products designed to withstand the most demanding conditions") },
    { label: t("Formation continue et support technique permanent", "Continuous training and permanent technical support") },
    { label: t("Gamme complète pour tous types de surfaces et d'applications", "Complete range for all surface types and applications") },
    { label: t("Conformité aux normes internationales de qualité et de sécurité", "Compliance with international quality and safety standards") },
  ];

  return (
    <>
      <PageHeader
        badge={t("Partenaires", "Partners")}
        title={t("Nos", "Our")}
        highlight={t("partenaires", "partners")}
        description={t(
          "RENOVO CRETE s'appuie sur des partenariats stratégiques avec les leaders mondiaux du revêtement pour garantir qualité et performance.",
          "RENOVO CRETE relies on strategic partnerships with global coating leaders to guarantee quality and performance."
        )}
      />

      {/* Elite Crete Systems */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div {...fadeUp}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-brand text-primary-foreground flex items-center justify-center">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="font-heading text-2xl font-bold">ELITE CRETE SYSTEMS</h2>
                  <p className="text-sm text-muted-foreground">{t("Partenaire technologique principal", "Primary technology partner")}</p>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {t(
                  "RENOVO CRETE est fier d'être partenaire formé par ELITE CRETE SYSTEMS, leader mondial dans la fabrication de systèmes de revêtement en résine époxy et polyuréthane. Cette formation garantit à nos clients l'accès aux technologies les plus avancées du marché.",
                  "RENOVO CRETE is proud to be a certified partner of ELITE CRETE SYSTEMS, a world leader in the manufacture of epoxy and polyurethane resin coating systems. This certification guarantees our clients access to the most advanced technologies on the market."
                )}
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {t(
                  "Présent dans plus de 40 pays, ELITE CRETE SYSTEMS développe des solutions de revêtement adaptées à tous les environnements — résidentiels, commerciaux, industriels et extérieurs — avec une durabilité et une résistance exceptionnelles, même sous climat tropical.",
                  "Present in over 40 countries, ELITE CRETE SYSTEMS develops coating solutions adapted to all environments — residential, commercial, industrial and exterior — with exceptional durability and resistance, even in tropical climates."
                )}
              </p>
              <ul className="space-y-2.5 mb-8">
                {benefits.map((b) => (
                  <li key={b.label} className="flex items-center gap-2.5 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                    {b.label}
                  </li>
                ))}
              </ul>
              <Button asChild variant="outline" size="lg">
                <a href="https://www.elitecrete.com" target="_blank" rel="noopener noreferrer">
                  {t("Visiter Elite Crete Systems", "Visit Elite Crete Systems")}
                  <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </Button>
            </motion.div>

            <motion.div {...fadeUp} transition={{ delay: 0.15 }}>
              <div className="rounded-2xl border border-border bg-secondary p-8 space-y-6">
                {[
                  { icon: Shield, title: t("Formation", "Certification"), desc: t("Applicateurs formés selon les standards Elite Crete Systems", "Applicators trained and certified to Elite Crete Systems standards") },
                  { icon: Globe, title: t("Réseau mondial", "Global network"), desc: t("Présence dans plus de 40 pays avec des milliers de projets réalisés", "Presence in over 40 countries with thousands of completed projects") },
                  { icon: Award, title: t("Excellence", "Excellence"), desc: t("Plus de 30 ans d'innovation dans les revêtements haute performance", "Over 30 years of innovation in high-performance coatings") },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4 p-4 rounded-xl bg-background border border-border">
                    <div className="w-11 h-11 rounded-lg bg-primary/8 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-heading text-base font-semibold">{item.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold mb-4">
            {t("Bénéficiez de notre expertise formée", "Benefit from our certified expertise")}
          </h2>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
            {t("Nos systèmes de revêtement sont soutenus par les meilleures technologies du marché.", "Our coating systems are backed by the best technologies on the market.")}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button asChild size="lg" className="bg-gradient-brand-deep hover:opacity-90 text-lg px-8 py-6">
              <Link to="/devis">{t("Demander un devis", "Request a quote")} <ArrowRight className="w-5 h-5 ml-2" /></Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/prestations">{t("Nos prestations", "Our services")}</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Partenaires;
