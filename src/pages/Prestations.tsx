import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Layers, Gem, Table, Paintbrush, Home, Building2, Factory, Sun, Moon, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageHeader from "@/components/PageHeader";
import { useLanguage } from "@/i18n/LanguageContext";
import { heroImg, countertopImg, tableImg, outdoorImg, industrialImg, commercialImg, garageImg } from "@/data/mock";

const fadeUp = { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };

const Prestations = () => {
  const { t } = useLanguage();

  const surfaceTypes = [
    {
      icon: Layers, title: t("Revêtements de sol", "Floor Coatings"), image: heroImg,
      desc: t("Sols de garage, terrasses, piscines, hall d'entrée — des finitions époxy qui subliment vos espaces et résistent au climat tropical.", "Garage floors, terraces, pools, lobbies — epoxy finishes that elevate your spaces and withstand tropical climate."),
      features: [t("Métallique, flocons ou marbré", "Metallic, flake or marbled"), t("Résistant aux chocs et UV", "Impact and UV resistant"), t("Sans joints, hygiénique", "Seamless, hygienic"), t("10 à 25 ans de durabilité", "10 to 25 years durability")],
    },
    {
      icon: Gem, title: t("Comptoirs en résine", "Resin Countertops"), image: countertopImg,
      desc: t("Comptoirs de cuisine et salle de bain en résine époxy — finitions uniques, résistantes à la chaleur et aux taches.", "Kitchen and bathroom epoxy resin countertops — unique finishes, heat and stain resistant."),
      features: [t("Finitions marbrées et artistiques", "Marbled and artistic finishes"), t("Résistant à la chaleur et aux taches", "Heat and stain resistant"), t("Surface non poreuse", "Non-porous surface"), t("Entretien minimal", "Minimal maintenance")],
    },
    {
      icon: Table, title: t("Tables décoratives", "Decorative Tables"), image: tableImg,
      desc: t("Tables rivière en bois massif et résine — pièces uniques et sur mesure qui deviennent le centre de votre décor.", "River tables in solid wood and resin — unique custom pieces that become the centerpiece of your decor."),
      features: [t("Bois massif et résine translucide", "Solid wood and translucent resin"), t("Design sur mesure", "Custom design"), t("Pièce unique garantie", "Guaranteed unique piece"), t("Finition cristalline", "Crystal-clear finish")],
    },
    {
      icon: Paintbrush, title: t("Autres surfaces adhérentes", "Other Adhesive Surfaces"), image: outdoorImg,
      desc: t("Murs décoratifs, escaliers, mobilier, éléments architecturaux — tout ce qui adhère peut être transformé.", "Decorative walls, stairs, furniture, architectural elements — anything that adheres can be transformed."),
      features: [t("Murs et cloisons décoratives", "Decorative walls and partitions"), t("Escaliers et marches", "Stairs and steps"), t("Mobilier sur mesure", "Custom furniture"), t("Éléments architecturaux", "Architectural elements")],
    },
  ];

  const sectors = [
    { icon: Home, title: t("Résidentiel", "Residential"), desc: t("Garage, terrasse, piscine, cuisine, salon — embellissez votre maison avec des surfaces durables et élégantes.", "Garage, terrace, pool, kitchen, living room — beautify your home with durable, elegant surfaces."), image: garageImg },
    { icon: Building2, title: t("Commercial", "Commercial"), desc: t("Hôtels, restaurants, showrooms, boutiques — des sols qui impressionnent vos clients et résistent au trafic intense.", "Hotels, restaurants, showrooms, boutiques — floors that impress clients and withstand heavy traffic."), image: commercialImg },
    { icon: Factory, title: t("Industriel", "Industrial"), desc: t("Entrepôts, ateliers, usines, laboratoires — revêtements ultra-résistants aux conditions les plus exigeantes.", "Warehouses, workshops, factories, laboratories — ultra-resistant coatings for the most demanding conditions."), image: industrialImg },
  ];

  return (
    <>
      <PageHeader
        badge={t("Nos prestations", "Our services")}
        title={t("Solutions de revêtement", "Coating solutions")}
        highlight={t("époxy & résine", "epoxy & resin")}
        description={t("Des finitions premium pour sols, comptoirs, tables et toutes surfaces adhérentes. Résidentiel, commercial et industriel.", "Premium finishes for floors, countertops, tables and all adhesive surfaces. Residential, commercial and industrial.")}
      />

      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} className="text-center mb-14">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold">{t("Types de", "Surface")}{" "}<span className="text-gradient-brand">{t("surfaces", "types")}</span></h2>
          </motion.div>
          <div className="space-y-16">
            {surfaceTypes.map((s, i) => (
              <motion.div key={s.title} {...fadeUp} transition={{ delay: 0.1 }} className={`grid lg:grid-cols-2 gap-10 items-center`}>
                <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="rounded-xl overflow-hidden shadow-md"><img src={s.image} alt={s.title} className="w-full aspect-[16/10] object-cover" loading="lazy" /></div>
                </div>
                <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-11 h-11 rounded-lg bg-gradient-brand text-primary-foreground flex items-center justify-center"><s.icon className="w-5 h-5" /></div>
                    <h3 className="font-heading text-2xl font-bold">{s.title}</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed mb-5">{s.desc}</p>
                  <ul className="space-y-2.5 mb-6">
                    {s.features.map((f) => (<li key={f} className="flex items-center gap-2.5 text-sm"><CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />{f}</li>))}
                  </ul>
                  <div className="flex flex-wrap gap-3">
                    <Button asChild variant="outline" size="sm"><Link to="/devis">{t("Demander un devis", "Request a quote")} <ArrowRight className="w-4 h-4 ml-1.5" /></Link></Button>
                    <Button asChild variant="ghost" size="sm"><Link to="/visualisation">{t("Visualiser", "Visualize")}</Link></Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} className="text-center mb-14">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold">{t("Secteurs", "Sectors")}{" "}<span className="text-gradient-brand">{t("d'intervention", "of intervention")}</span></h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {sectors.map((s, i) => (
              <motion.div key={s.title} {...fadeUp} transition={{ delay: i * 0.1 }} className="group rounded-xl overflow-hidden bg-background border border-border hover:shadow-lg transition-all">
                <div className="aspect-[4/3] overflow-hidden"><img src={s.image} alt={s.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" /></div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3"><s.icon className="w-5 h-5 text-primary" /><h3 className="font-heading text-xl font-bold">{s.title}</h3></div>
                  <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} className="text-center mb-14">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold">{t("Intérieur &", "Interior &")}{" "}<span className="text-gradient-brand">{t("Extérieur", "Exterior")}</span></h2>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {[
              { icon: Moon, title: t("Intérieur", "Interior"), desc: t("Finitions sans joints, hygiéniques et faciles d'entretien. Métallique, marbré, flocons ou solide — pour tous vos espaces intérieurs.", "Seamless, hygienic, easy-maintenance finishes. Metallic, marbled, flake or solid — for all your interior spaces.") },
              { icon: Sun, title: t("Extérieur", "Exterior"), desc: t("Revêtements résistants aux UV, à la chaleur tropicale et aux intempéries. Antidérapants pour terrasses, allées et abords de piscine.", "UV, tropical heat and weather-resistant coatings. Non-slip for terraces, walkways and pool surroundings.") },
            ].map((e, i) => (
              <motion.div key={e.title} {...fadeUp} transition={{ delay: i * 0.1 }} className="flex gap-4 p-6 rounded-xl border border-border hover:border-primary/20 hover:shadow-sm transition-all">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/8 flex items-center justify-center"><e.icon className="w-6 h-6 text-primary" /></div>
                <div><h3 className="font-heading text-lg font-semibold mb-1">{e.title}</h3><p className="text-sm text-muted-foreground leading-relaxed">{e.desc}</p></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold mb-4">{t("Un projet en tête ?", "Have a project in mind?")}</h2>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">{t("Contactez-nous pour une estimation gratuite et personnalisée, sans engagement.", "Contact us for a free, personalized estimate, no commitment.")}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button asChild size="lg" className="bg-gradient-brand-deep hover:opacity-90 text-lg px-8 py-6"><Link to="/devis">{t("Demander un devis", "Request a quote")} <ArrowRight className="w-5 h-5 ml-2" /></Link></Button>
            <Button asChild variant="outline" size="lg"><Link to="/visualisation">{t("Visualiser mon projet", "Visualize my project")}</Link></Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Prestations;
