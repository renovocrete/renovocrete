import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Layers, Gem, Table, Paintbrush, Home, Building2, Factory, Sun, Moon, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageHeader from "@/components/PageHeader";
import { heroImg, countertopImg, tableImg, outdoorImg, industrialImg, commercialImg, garageImg } from "@/data/mock";

const fadeUp = { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };

const surfaceTypes = [
  {
    icon: Layers, title: "Revêtements de sol", image: heroImg,
    desc: "Sols de garage, sous-sol, cuisine, salon, hall d'entrée — des finitions époxy qui subliment vos espaces et résistent au quotidien.",
    features: ["Métallique, flocons ou marbré", "Résistant aux chocs et à l'abrasion", "Sans joints, hygiénique", "10 à 25 ans de durabilité"],
  },
  {
    icon: Gem, title: "Comptoirs en résine", image: countertopImg,
    desc: "Comptoirs de cuisine et salle de bain en résine époxy — finitions uniques, résistantes à la chaleur et aux taches.",
    features: ["Finitions marbrées et artistiques", "Résistant à la chaleur et aux taches", "Surface non poreuse", "Entretien minimal"],
  },
  {
    icon: Table, title: "Tables décoratives", image: tableImg,
    desc: "Tables rivière en bois massif et résine — pièces uniques et sur mesure qui deviennent le centre de votre décor.",
    features: ["Bois massif et résine translucide", "Design sur mesure", "Pièce unique garantie", "Finition cristalline"],
  },
  {
    icon: Paintbrush, title: "Autres surfaces adhérentes", image: outdoorImg,
    desc: "Murs décoratifs, escaliers, mobilier, éléments architecturaux — tout ce qui adhère peut être transformé avec nos revêtements.",
    features: ["Murs et cloisons décoratives", "Escaliers et marches", "Mobilier sur mesure", "Éléments architecturaux"],
  },
];

const sectors = [
  { icon: Home, title: "Résidentiel", desc: "Garage, sous-sol, cuisine, salon, terrasse — embellissez votre maison avec des surfaces durables et élégantes qui augmentent la valeur de votre propriété.", image: garageImg },
  { icon: Building2, title: "Commercial", desc: "Boutiques, restaurants, showrooms, bureaux — des sols qui impressionnent vos clients et résistent au trafic intense au quotidien.", image: commercialImg },
  { icon: Factory, title: "Industriel", desc: "Entrepôts, ateliers, usines, laboratoires — revêtements ultra-résistants aux produits chimiques, charges lourdes et conditions exigeantes.", image: industrialImg },
];

const Prestations = () => {
  return (
    <>
      <PageHeader
        badge="Nos prestations"
        title="Solutions de revêtement"
        highlight="époxy & résine"
        description="Des finitions premium pour sols, comptoirs, tables et toutes surfaces adhérentes. Résidentiel, commercial et industriel."
      />

      {/* Surface types */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} className="text-center mb-14">
            <h2 className="font-heading text-2xl sm:text-3xl font-700">Types de <span className="text-gradient-brand">surfaces</span></h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto">Chaque surface mérite un traitement adapté. Découvrez nos spécialités.</p>
          </motion.div>
          <div className="space-y-16">
            {surfaceTypes.map((s, i) => (
              <motion.div key={s.title} {...fadeUp} transition={{ delay: 0.1 }} className={`grid lg:grid-cols-2 gap-10 items-center ${i % 2 === 1 ? "lg:flex-row-reverse" : ""}`}>
                <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="rounded-xl overflow-hidden shadow-md">
                    <img src={s.image} alt={s.title} className="w-full aspect-[16/10] object-cover" loading="lazy" />
                  </div>
                </div>
                <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-11 h-11 rounded-lg bg-gradient-brand text-primary-foreground flex items-center justify-center">
                      <s.icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-heading text-2xl font-700">{s.title}</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed mb-5">{s.desc}</p>
                  <ul className="space-y-2.5 mb-6">
                    {s.features.map((f) => (
                      <li key={f} className="flex items-center gap-2.5 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button asChild variant="outline" size="sm">
                    <Link to="/devis">Demander un devis <ArrowRight className="w-4 h-4 ml-1.5" /></Link>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sectors */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} className="text-center mb-14">
            <h2 className="font-heading text-2xl sm:text-3xl font-700">Secteurs <span className="text-gradient-brand">d'intervention</span></h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto">Nous adaptons nos solutions à chaque environnement et usage.</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {sectors.map((s, i) => (
              <motion.div key={s.title} {...fadeUp} transition={{ delay: i * 0.1 }} className="group rounded-xl overflow-hidden bg-background border border-border hover:shadow-lg transition-all">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={s.image} alt={s.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <s.icon className="w-5 h-5 text-primary" />
                    <h3 className="font-heading text-xl font-700">{s.title}</h3>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interior / Exterior */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} className="text-center mb-14">
            <h2 className="font-heading text-2xl sm:text-3xl font-700">Intérieur & <span className="text-gradient-brand">Extérieur</span></h2>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {[
              { icon: Moon, title: "Intérieur", desc: "Finitions sans joints, hygiéniques et faciles d'entretien. Métallique, marbré, flocons ou solide — pour tous vos espaces intérieurs." },
              { icon: Sun, title: "Extérieur", desc: "Revêtements résistants aux UV, au gel et aux intempéries. Antidérapants pour terrasses, allées et abords de piscine." },
            ].map((e, i) => (
              <motion.div key={e.title} {...fadeUp} transition={{ delay: i * 0.1 }} className="flex gap-4 p-6 rounded-xl border border-border hover:border-primary/20 hover:shadow-sm transition-all">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/8 flex items-center justify-center">
                  <e.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-600 mb-1">{e.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{e.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-2xl sm:text-3xl font-700 mb-4">Un projet en tête ?</h2>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">Contactez-nous pour une estimation gratuite et personnalisée, sans engagement.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button asChild size="lg" className="bg-gradient-brand-deep hover:opacity-90 text-lg px-8 py-6">
              <Link to="/devis">Demander un devis <ArrowRight className="w-5 h-5 ml-2" /></Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/visualisation">Visualiser mon projet</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Prestations;
