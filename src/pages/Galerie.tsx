import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageHeader from "@/components/PageHeader";
import { galleryProjects } from "@/data/mock";

const filters = ["Tous", "Sols", "Comptoirs", "Tables", "Industriel", "Extérieur"];

const Galerie = () => {
  const [filter, setFilter] = useState("Tous");
  const [lightbox, setLightbox] = useState<number | null>(null);
  const filtered = filter === "Tous" ? galleryProjects : galleryProjects.filter((g) => g.category === filter);

  return (
    <>
      <PageHeader
        badge="Galerie"
        title="Nos"
        highlight="réalisations"
        description="Parcourez nos projets récents et laissez-vous inspirer pour votre prochaine transformation."
      />

      {/* Filters */}
      <section className="py-6 border-b border-border sticky top-20 bg-background/98 backdrop-blur-md z-30">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => { setFilter(f); setLightbox(null); }}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  filter === f
                    ? "bg-gradient-brand text-primary-foreground shadow-sm"
                    : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <AnimatePresence mode="popLayout">
              {filtered.map((img, i) => (
                <motion.div
                  key={`${img.label}-${i}`}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: i * 0.03 }}
                  className="group relative rounded-xl overflow-hidden cursor-pointer"
                  onClick={() => setLightbox(i)}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <span className="text-primary-foreground font-heading font-600 text-sm">{img.label}</span>
                    <span className="text-primary-foreground/70 text-xs">{img.category}</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox !== null && filtered[lightbox] && (
        <div className="fixed inset-0 z-50 bg-foreground/90 flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
          <button className="absolute top-6 right-6 text-primary-foreground hover:opacity-75 transition-opacity" onClick={() => setLightbox(null)}>
            <X className="w-8 h-8" />
          </button>
          <div className="max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={filtered[lightbox].src}
              alt={filtered[lightbox].alt}
              className="max-h-[75vh] w-full rounded-xl object-contain"
            />
            <div className="mt-4 text-center">
              <h3 className="text-primary-foreground font-heading font-600 text-lg">{filtered[lightbox].label}</h3>
              <p className="text-primary-foreground/60 text-sm mt-1">{filtered[lightbox].desc}</p>
              <Button asChild size="sm" className="mt-4 bg-gradient-brand hover:opacity-90">
                <Link to="/devis" onClick={() => setLightbox(null)}>Demander un devis similaire <ArrowRight className="w-4 h-4 ml-1.5" /></Link>
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* CTA */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-2xl sm:text-3xl font-700 mb-4">Envie d'un résultat similaire ?</h2>
          <p className="text-muted-foreground mb-8">Contactez-nous pour discuter de votre projet et recevoir une estimation gratuite.</p>
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

export default Galerie;
