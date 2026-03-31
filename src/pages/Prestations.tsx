import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Layers, Gem, Table, Paintbrush, Home, Building2, Factory, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageHeader from "@/components/PageHeader";
import countertopImg from "@/assets/epoxy-countertop.jpg";
import industrialImg from "@/assets/epoxy-industrial.jpg";
import outdoorImg from "@/assets/epoxy-outdoor.jpg";
import tableImg from "@/assets/epoxy-table.jpg";
import heroImg from "@/assets/hero-epoxy-floor.jpg";

const surfaceTypes = [
  { icon: Layers, title: "Revêtements de sol", desc: "Sols de garage, sous-sol, cuisine, salon — finitions époxy qui subliment votre espace. Résistants aux chocs, à l'abrasion et aux produits chimiques.", image: heroImg },
  { icon: Gem, title: "Comptoirs", desc: "Comptoirs de cuisine et salle de bain en résine époxy — finitions marbrées, métalliques ou colorées sur mesure.", image: countertopImg },
  { icon: Table, title: "Tables", desc: "Tables rivière, tables artistiques en résine — pièces uniques et sur mesure qui deviennent le centre de votre décor.", image: tableImg },
  { icon: Paintbrush, title: "Autres surfaces adhérentes", desc: "Murs décoratifs, escaliers, mobilier — tout ce qui adhère peut être transformé avec nos revêtements époxy.", image: outdoorImg },
];

const sectors = [
  { icon: Home, title: "Résidentiel", desc: "Garage, sous-sol, cuisine, salon, terrasse — embellissez votre maison avec des surfaces durables et élégantes." },
  { icon: Building2, title: "Commercial", desc: "Boutiques, restaurants, showrooms, bureaux — des sols qui impressionnent vos clients et résistent au trafic intense." },
  { icon: Factory, title: "Industriel", desc: "Entrepôts, ateliers, usines — revêtements ultra-résistants aux produits chimiques et aux charges lourdes." },
];

const environments = [
  { icon: Moon, title: "Intérieur", desc: "Finitions sans joints, hygiéniques et faciles d'entretien pour tous vos espaces intérieurs." },
  { icon: Sun, title: "Extérieur", desc: "Revêtements résistants aux UV, au gel et aux intempéries pour terrasses, allées et abords de piscine." },
];

const Prestations = () => {
  return (
    <>
      <PageHeader
        badge="Nos prestations"
        title="Solutions de revêtement"
        highlight="époxy & résine"
        description="Découvrez l'ensemble de nos prestations pour sols, comptoirs, tables et toutes surfaces adhérentes."
      />

      {/* Types de surfaces */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-2xl sm:text-3xl font-700 text-center mb-12">
            Types de <span className="text-gradient-brand">surfaces</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {surfaceTypes.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group rounded-xl overflow-hidden bg-background border border-border hover:border-primary/30 hover:shadow-xl transition-all"
              >
                <div className="aspect-[16/9] overflow-hidden">
                  <img src={s.image} alt={s.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                </div>
                <div className="p-6 flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-brand text-primary-foreground flex items-center justify-center">
                    <s.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-700 mb-2">{s.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Secteurs */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-2xl sm:text-3xl font-700 text-center mb-12">
            Secteurs <span className="text-gradient-brand">d'intervention</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {sectors.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-xl bg-background border border-border hover:border-primary/30 hover:shadow-md transition-all text-center"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <s.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-heading text-xl font-700 mb-3">{s.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Intérieur / Extérieur */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-2xl sm:text-3xl font-700 text-center mb-12">
            Intérieur & <span className="text-gradient-brand">Extérieur</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {environments.map((e, i) => (
              <motion.div
                key={e.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-4 p-6 rounded-xl border border-border hover:border-primary/30 hover:shadow-md transition-all"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
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
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">Contactez-nous pour une estimation gratuite et personnalisée.</p>
          <Button asChild size="lg" className="bg-gradient-brand-deep hover:opacity-90 text-lg px-8 py-6">
            <Link to="/devis">Demander un devis <ArrowRight className="w-5 h-5 ml-2" /></Link>
          </Button>
        </div>
      </section>
    </>
  );
};

export default Prestations;
