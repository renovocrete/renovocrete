import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageHeader from "@/components/PageHeader";
import countertopImg from "@/assets/epoxy-countertop.jpg";
import industrialImg from "@/assets/epoxy-industrial.jpg";
import outdoorImg from "@/assets/epoxy-outdoor.jpg";
import tableImg from "@/assets/epoxy-table.jpg";
import heroImg from "@/assets/hero-epoxy-floor.jpg";

const categories = ["Tous", "Résidentiel", "Commercial", "Industriel", "Extérieur"];

const projects = [
  { title: "Sol de garage", category: "Résidentiel", desc: "Revêtement époxy avec flocons décoratifs, résistant aux huiles et produits chimiques.", image: heroImg },
  { title: "Comptoir de cuisine", category: "Résidentiel", desc: "Finition marbrée blanc et gris sur comptoir de cuisine — élégance et durabilité.", image: countertopImg },
  { title: "Table rivière", category: "Résidentiel", desc: "Table en bois massif avec rivière de résine bleue translucide — pièce unique.", image: tableImg },
  { title: "Showroom commercial", category: "Commercial", desc: "Sol métallique haut de gamme pour showroom automobile — effet miroir saisissant.", image: heroImg },
  { title: "Restaurant", category: "Commercial", desc: "Revêtement de sol antidérapant et hygiénique pour cuisine et salle de restaurant.", image: countertopImg },
  { title: "Entrepôt logistique", category: "Industriel", desc: "Revêtement haute résistance pour entrepôt avec marquage au sol intégré.", image: industrialImg },
  { title: "Atelier mécanique", category: "Industriel", desc: "Sol chimio-résistant pour atelier, résistant aux huiles, solvants et charges lourdes.", image: industrialImg },
  { title: "Terrasse résidentielle", category: "Extérieur", desc: "Revêtement antidérapant résistant aux UV et intempéries pour terrasse extérieure.", image: outdoorImg },
  { title: "Abords de piscine", category: "Extérieur", desc: "Finition texturée et antidérapante, résistante au chlore et aux UV.", image: outdoorImg },
];

const TypesProjets = () => {
  const [filter, setFilter] = useState("Tous");
  const filtered = filter === "Tous" ? projects : projects.filter((p) => p.category === filter);

  return (
    <>
      <PageHeader
        badge="Types de projets"
        title="Projets par"
        highlight="catégorie"
        description="Explorez nos réalisations par type de projet — résidentiel, commercial, industriel ou extérieur."
      />

      {/* Filtres */}
      <section className="py-8 border-b border-border sticky top-20 bg-background/95 backdrop-blur-md z-30">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  filter === cat
                    ? "bg-gradient-brand text-primary-foreground shadow-md"
                    : "bg-secondary text-muted-foreground hover:text-primary hover:bg-primary/5"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grille */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project, i) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="group rounded-xl overflow-hidden bg-background border border-border hover:border-primary/30 hover:shadow-xl transition-all"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                </div>
                <div className="p-5">
                  <span className="inline-block text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-1 rounded-full mb-3">
                    {project.category}
                  </span>
                  <h3 className="font-heading text-lg font-700 mb-2">{project.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{project.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-2xl sm:text-3xl font-700 mb-4">Votre projet est unique</h2>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">Parlez-nous de votre projet et recevez une proposition sur mesure.</p>
          <Button asChild size="lg" className="bg-gradient-brand-deep hover:opacity-90 text-lg px-8 py-6">
            <Link to="/devis">Demander un devis <ArrowRight className="w-5 h-5 ml-2" /></Link>
          </Button>
        </div>
      </section>
    </>
  );
};

export default TypesProjets;
