import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageHeader from "@/components/PageHeader";
import countertopImg from "@/assets/epoxy-countertop.jpg";
import industrialImg from "@/assets/epoxy-industrial.jpg";
import outdoorImg from "@/assets/epoxy-outdoor.jpg";
import tableImg from "@/assets/epoxy-table.jpg";
import heroImg from "@/assets/hero-epoxy-floor.jpg";

const filters = ["Tous", "Sols", "Comptoirs", "Tables", "Industriel", "Extérieur"];

const galleryItems = [
  { src: heroImg, alt: "Sol époxy métallique", label: "Sol métallique premium", category: "Sols" },
  { src: countertopImg, alt: "Comptoir époxy océan", label: "Comptoir océan bleu", category: "Comptoirs" },
  { src: tableImg, alt: "Table rivière résine", label: "Table rivière en noyer", category: "Tables" },
  { src: industrialImg, alt: "Sol industriel époxy", label: "Sol entrepôt haute résistance", category: "Industriel" },
  { src: outdoorImg, alt: "Terrasse époxy extérieur", label: "Terrasse résidentielle", category: "Extérieur" },
  { src: heroImg, alt: "Sol showroom", label: "Sol showroom commercial", category: "Sols" },
  { src: countertopImg, alt: "Comptoir salle de bain", label: "Comptoir salle de bain", category: "Comptoirs" },
  { src: tableImg, alt: "Table basse résine", label: "Table basse artistique", category: "Tables" },
  { src: outdoorImg, alt: "Abords de piscine", label: "Abords de piscine", category: "Extérieur" },
];

const Galerie = () => {
  const [filter, setFilter] = useState("Tous");
  const [lightbox, setLightbox] = useState<number | null>(null);
  const filtered = filter === "Tous" ? galleryItems : galleryItems.filter((g) => g.category === filter);

  return (
    <>
      <PageHeader
        badge="Galerie"
        title="Nos"
        highlight="réalisations"
        description="Parcourez nos projets récents et laissez-vous inspirer pour votre prochaine transformation."
      />

      {/* Filtres */}
      <section className="py-8 border-b border-border sticky top-20 bg-background/95 backdrop-blur-md z-30">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  filter === f
                    ? "bg-gradient-brand text-primary-foreground shadow-md"
                    : "bg-secondary text-muted-foreground hover:text-primary hover:bg-primary/5"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grille */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {filtered.map((img, i) => (
              <motion.div
                key={`${img.label}-${i}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className="group relative rounded-xl overflow-hidden cursor-pointer"
                onClick={() => setLightbox(i)}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <div>
                    <span className="text-primary-foreground font-heading font-600 text-base block">{img.label}</span>
                    <span className="text-primary-foreground/70 text-xs">{img.category}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox !== null && (
        <div className="fixed inset-0 z-50 bg-foreground/90 flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
          <button className="absolute top-6 right-6 text-primary-foreground" onClick={() => setLightbox(null)}>
            <X className="w-8 h-8" />
          </button>
          <img
            src={filtered[lightbox].src}
            alt={filtered[lightbox].alt}
            className="max-h-[85vh] max-w-full rounded-xl object-contain"
          />
        </div>
      )}

      {/* CTA */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-2xl sm:text-3xl font-700 mb-4">Envie d'un résultat similaire ?</h2>
          <p className="text-muted-foreground mb-8">Contactez-nous pour discuter de votre projet.</p>
          <Button asChild size="lg" className="bg-gradient-brand-deep hover:opacity-90 text-lg px-8 py-6">
            <Link to="/devis">Demander un devis <ArrowRight className="w-5 h-5 ml-2" /></Link>
          </Button>
        </div>
      </section>
    </>
  );
};

export default Galerie;
