import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Shield, Star, Eye, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-epoxy-floor.jpg";
import countertopImg from "@/assets/epoxy-countertop.jpg";
import tableImg from "@/assets/epoxy-table.jpg";
import industrialImg from "@/assets/epoxy-industrial.jpg";

const highlights = [
  { img: countertopImg, label: "Comptoirs en résine", link: "/prestations" },
  { img: tableImg, label: "Tables décoratives", link: "/prestations" },
  { img: industrialImg, label: "Sols industriels", link: "/prestations" },
];

const Index = () => {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Sol époxy métallique de luxe" className="w-full h-full object-cover" width={1920} height={1080} />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/60 to-foreground/20" />
        </div>

        <div className="container relative z-10 mx-auto px-4 py-20">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full border border-primary-light/30 bg-primary-light/10 px-4 py-1.5 mb-6"
            >
              <Star className="w-4 h-4 text-primary-light" />
              <span className="text-sm font-medium text-primary-light">Revêtements époxy & résine premium</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-heading text-4xl sm:text-5xl lg:text-6xl font-800 leading-[1.1] tracking-tight text-primary-foreground mb-6"
            >
              Transformez chaque surface en{" "}
              <span className="text-primary-light">œuvre d'art</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-lg text-primary-foreground/80 mb-8 max-w-xl leading-relaxed"
            >
              Spécialistes en revêtements époxy décoratifs pour sols, comptoirs, tables et toutes surfaces adhérentes. 
              Finitions durables et sublimes pour projets résidentiels, commerciaux et industriels.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button asChild size="lg" className="bg-gradient-brand text-lg px-8 py-6 hover:opacity-90 transition-opacity shadow-lg shadow-primary/25">
                <Link to="/devis">
                  Estimation gratuite
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
                <Link to="/galerie">Voir nos réalisations</Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex items-center gap-6 mt-10 pt-8 border-t border-primary-foreground/20"
            >
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary-light" />
                <span className="text-sm text-primary-foreground/70">Certifié & Assuré</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-primary-light" />
                <span className="text-sm text-primary-foreground/70">5 étoiles</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary-light" />
                <span className="text-sm text-primary-foreground/70">Garantie incluse</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Aperçu prestations */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="text-sm font-semibold uppercase tracking-widest text-primary">Nos prestations</span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-700 mt-3 tracking-tight">
              Des surfaces qui <span className="text-gradient-brand">performent & impressionnent</span>
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg">
              Du garage résidentiel aux installations industrielles, nous livrons des revêtements premium adaptés à chaque environnement.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {highlights.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link to={item.link} className="group block rounded-xl overflow-hidden bg-background shadow-sm hover:shadow-xl transition-shadow">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={item.img} alt={item.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  </div>
                  <div className="p-6">
                    <h3 className="font-heading text-xl font-700">{item.label}</h3>
                    <span className="text-primary text-sm font-medium mt-2 inline-flex items-center gap-1">
                      En savoir plus <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button asChild variant="outline" size="lg">
              <Link to="/prestations">Toutes nos prestations <ArrowRight className="w-4 h-4 ml-2" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Raccourcis */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Eye, label: "Visualisation", desc: "Simulez votre projet en ligne", path: "/visualisation" },
              { icon: FileText, label: "Devis gratuit", desc: "Obtenez votre estimation personnalisée", path: "/devis" },
              { icon: Star, label: "Galerie", desc: "Découvrez nos réalisations récentes", path: "/galerie" },
            ].map((item, i) => (
              <motion.div key={item.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Link
                  to={item.path}
                  className="block p-8 rounded-xl border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300 text-center group"
                >
                  <div className="w-14 h-14 rounded-xl bg-gradient-brand text-primary-foreground flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <item.icon className="w-7 h-7" />
                  </div>
                  <h3 className="font-heading text-lg font-700 mb-1">{item.label}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="rounded-2xl bg-gradient-brand-deep p-10 sm:p-16 text-center relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-primary-light/10" />
            <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-primary-foreground/5" />
            <div className="relative z-10">
              <h2 className="font-heading text-3xl sm:text-4xl font-800 text-primary-foreground tracking-tight mb-4">
                Prêt à transformer votre espace ?
              </h2>
              <p className="text-primary-foreground/80 text-lg max-w-xl mx-auto mb-8">
                Obtenez une estimation gratuite et sans engagement. Nous vous aidons à choisir la solution parfaite.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button asChild size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 text-lg px-8 py-6 shadow-lg">
                  <Link to="/devis">Demander un devis</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground text-lg px-8 py-6">
                  <Link to="/contact">Nous contacter</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
