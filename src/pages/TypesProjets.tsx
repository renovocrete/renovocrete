import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageHeader from "@/components/PageHeader";
import { useLanguage } from "@/i18n/LanguageContext";
import { projectTypes } from "@/data/mock";

const fadeUp = { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };

const TypesProjets = () => {
  const { lang, t } = useLanguage();
  const categories = ["Tous", ...projectTypes.map((p) => lang === "fr" ? p.category : p.categoryEn)];
  const [filter, setFilter] = useState("Tous");

  const filteredGroups = filter === "Tous" ? projectTypes : projectTypes.filter((g) => (lang === "fr" ? g.category : g.categoryEn) === filter);

  return (
    <>
      <PageHeader
        badge={t("Types de projets", "Project Types")}
        title={t("Projets par", "Projects by")}
        highlight={t("catégorie", "category")}
        description={t("Résidentiel, commercial, industriel et extérieur — explorez les types de projets que nous réalisons.", "Residential, commercial, industrial and exterior — explore the project types we deliver.")}
      />

      <section className="py-6 border-b border-border sticky top-20 bg-background/98 backdrop-blur-md z-30">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((cat) => (
              <button key={cat} onClick={() => setFilter(cat)} className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${filter === cat ? "bg-gradient-brand text-primary-foreground shadow-sm" : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-muted"}`}>
                {cat === "Tous" ? t("Tous", "All") : cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          {filteredGroups.map((group) => (
            <div key={group.category} className="mb-16 last:mb-0">
              <motion.h2 {...fadeUp} className="font-heading text-2xl font-bold mb-8 flex items-center gap-3">
                <span className="w-1.5 h-8 bg-gradient-brand rounded-full" />
                {lang === "fr" ? group.category : group.categoryEn}
              </motion.h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {group.items.map((project, i) => (
                  <motion.div key={project.title} {...fadeUp} transition={{ delay: i * 0.06 }} className="group rounded-xl overflow-hidden bg-background border border-border hover:border-primary/20 hover:shadow-lg transition-all">
                    <div className="aspect-[4/3] overflow-hidden">
                      <img src={project.image} alt={lang === "fr" ? project.title : project.titleEn} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                    </div>
                    <div className="p-5">
                      <span className="inline-block text-xs font-semibold uppercase tracking-wider text-primary bg-primary/8 px-2.5 py-1 rounded-full mb-3">
                        {lang === "fr" ? group.category : group.categoryEn}
                      </span>
                      <h3 className="font-heading text-lg font-bold mb-2">{lang === "fr" ? project.title : project.titleEn}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4">{lang === "fr" ? project.desc : project.descEn}</p>
                      <div className="flex flex-wrap gap-2">
                        <Button asChild variant="outline" size="sm"><Link to="/galerie">{t("Réalisations similaires", "Similar projects")}</Link></Button>
                        <Button asChild size="sm" className="bg-gradient-brand hover:opacity-90"><Link to="/devis">{t("Solution adaptée", "Custom solution")}</Link></Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold mb-4">{t("Votre projet est unique", "Your project is unique")}</h2>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">{t("Parlez-nous de votre projet et recevez une proposition sur mesure, sans engagement.", "Tell us about your project and receive a custom proposal, no commitment.")}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button asChild size="lg" className="bg-gradient-brand-deep hover:opacity-90 text-lg px-8 py-6"><Link to="/devis">{t("Demander un devis", "Request a quote")} <ArrowRight className="w-5 h-5 ml-2" /></Link></Button>
            <Button asChild variant="outline" size="lg"><Link to="/galerie">{t("Voir nos réalisations", "View our projects")}</Link></Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default TypesProjets;
