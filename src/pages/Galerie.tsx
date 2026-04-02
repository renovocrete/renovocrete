import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageHeader from "@/components/PageHeader";
import { useLanguage } from "@/i18n/LanguageContext";
import { galleryProjects } from "@/data/mock";

const Galerie = () => {
  const { lang, t } = useLanguage();
  const filters = [t("Tous", "All"), "Sols", "Comptoirs", "Tables", t("Industriel", "Industrial"), t("Extérieur", "Exterior")];
  const [filter, setFilter] = useState(filters[0]);
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = filter === filters[0] ? galleryProjects : galleryProjects.filter((g) => {
    const catMap: Record<string, string> = { "Sols": "Sols", "Comptoirs": "Comptoirs", "Tables": "Tables", [t("Industriel", "Industrial")]: "Industriel", [t("Extérieur", "Exterior")]: "Extérieur" };
    return g.category === (catMap[filter] || filter);
  });

  return (
    <>
      <PageHeader
        badge={t("Galerie", "Gallery")}
        title={t("Nos", "Our")}
        highlight={t("réalisations", "projects")}
        description={t("Parcourez nos projets récents et laissez-vous inspirer pour votre prochaine transformation.", "Browse our recent projects and get inspired for your next transformation.")}
      />

      <section className="py-6 border-b border-border sticky top-20 bg-background/98 backdrop-blur-md z-30">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {filters.map((f) => (
              <button key={f} onClick={() => { setFilter(f); setLightbox(null); }} className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${filter === f ? "bg-gradient-brand text-primary-foreground shadow-sm" : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-muted"}`}>
                {f}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <AnimatePresence mode="popLayout">
              {filtered.map((img, i) => (
                <motion.div key={`${img.label}-${i}`} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ delay: i * 0.03 }} className="group relative rounded-xl overflow-hidden cursor-pointer" onClick={() => setLightbox(i)}>
                  <img src={img.src} alt={img.alt} className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <span className="text-primary-foreground font-heading font-semibold text-sm">{lang === "fr" ? img.label : img.labelEn}</span>
                    <span className="text-primary-foreground/70 text-xs">{img.category}</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {lightbox !== null && filtered[lightbox] && (
        <div className="fixed inset-0 z-50 bg-foreground/90 flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
          <button className="absolute top-6 right-6 text-primary-foreground hover:opacity-75 transition-opacity" onClick={() => setLightbox(null)}><X className="w-8 h-8" /></button>
          <div className="max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <img src={filtered[lightbox].src} alt={filtered[lightbox].alt} className="max-h-[75vh] w-full rounded-xl object-contain" />
            <div className="mt-4 text-center">
              <h3 className="text-primary-foreground font-heading font-semibold text-lg">{lang === "fr" ? filtered[lightbox].label : filtered[lightbox].labelEn}</h3>
              <p className="text-primary-foreground/60 text-sm mt-1">{lang === "fr" ? filtered[lightbox].desc : filtered[lightbox].descEn}</p>
              <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
                <Button asChild size="sm" className="bg-gradient-brand hover:opacity-90">
                  <Link to="/devis" onClick={() => setLightbox(null)}>{t("Je veux un résultat similaire", "I want a similar result")} <ArrowRight className="w-4 h-4 ml-1.5" /></Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold mb-4">{t("Envie d'un résultat similaire ?", "Want a similar result?")}</h2>
          <p className="text-muted-foreground mb-8">{t("Contactez-nous pour discuter de votre projet et recevoir une estimation gratuite.", "Contact us to discuss your project and receive a free estimate.")}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button asChild size="lg" className="bg-gradient-brand-deep hover:opacity-90 text-lg px-8 py-6"><Link to="/devis">{t("Demander un devis", "Request a quote")} <ArrowRight className="w-5 h-5 ml-2" /></Link></Button>
            <Button asChild variant="outline" size="lg"><Link to="/visualisation">{t("Visualiser mon projet", "Visualize my project")}</Link></Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Galerie;
