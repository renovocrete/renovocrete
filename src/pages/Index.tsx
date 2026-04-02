import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Shield, Star, CheckCircle2, Sparkles, Clock, Award, Wrench, Eye, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/LanguageContext";
import { heroImg, countertopImg, tableImg, industrialImg, outdoorImg, commercialImg, beforeAfterImg, testimonials, processSteps, faqItems } from "@/data/mock";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const fadeUp = { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };

const Index = () => {
  const { lang, t } = useLanguage();

  const services = [
    { img: countertopImg, label: t("Comptoirs en résine", "Resin Countertops"), desc: t("Finitions marbrées et métalliques uniques", "Unique marbled and metallic finishes") },
    { img: tableImg, label: t("Tables décoratives", "Decorative Tables"), desc: t("Pièces sur mesure en bois et résine", "Custom wood and resin pieces") },
    { img: industrialImg, label: t("Sols industriels", "Industrial Floors"), desc: t("Revêtements haute performance", "High-performance coatings") },
    { img: outdoorImg, label: t("Surfaces extérieures", "Outdoor Surfaces"), desc: t("Résistants aux UV et intempéries", "UV and weather resistant") },
  ];

  const benefits = [
    { icon: Shield, title: t("Durabilité extrême", "Extreme Durability"), desc: t("10 à 25 ans de résistance aux chocs, produits chimiques et trafic intense.", "10 to 25 years of resistance to impacts, chemicals and heavy traffic.") },
    { icon: Sparkles, title: t("Esthétique sur mesure", "Custom Aesthetics"), desc: t("Métallique, marbré, flocons, artistique — des finitions personnalisées illimitées.", "Metallic, marbled, flake, artistic — unlimited custom finishes.") },
    { icon: Clock, title: t("Pose rapide", "Fast Installation"), desc: t("La plupart des projets complétés en 2 à 5 jours, perturbation minimale.", "Most projects completed in 2 to 5 days, minimal disruption.") },
    { icon: Award, title: t("Expertise certifiée", "Certified Expertise"), desc: t("Partenaire certifié Elite Crete Systems, leader mondial du revêtement.", "Certified partner of Elite Crete Systems, global coating leader.") },
    { icon: CheckCircle2, title: t("Sans joints", "Seamless"), desc: t("Surface lisse, hygiénique et facile d'entretien — sans fissures ni joints.", "Smooth, hygienic, easy-maintenance surface — no cracks or joints.") },
    { icon: Wrench, title: t("Garantie incluse", "Warranty Included"), desc: t("Chaque projet couvert par notre garantie de satisfaction complète.", "Every project covered by our complete satisfaction guarantee.") },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImg} alt={t("Sol époxy métallique premium", "Premium metallic epoxy floor")} className="w-full h-full object-cover" width={1920} height={1080} />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/55 to-transparent" />
        </div>
        <div className="container relative z-10 mx-auto px-4 py-20">
          <div className="max-w-2xl">
            <motion.span {...fadeUp} className="inline-flex items-center gap-2 rounded-full border border-primary-light/30 bg-primary-light/10 px-4 py-1.5 mb-6 text-sm font-medium text-primary-light">
              <Star className="w-4 h-4" /> {t("Revêtements époxy & résine premium", "Premium Epoxy & Resin Coatings")}
            </motion.span>
            <motion.h1 {...fadeUp} transition={{ delay: 0.1 }} className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.08] tracking-tight text-primary-foreground mb-6">
              {t("Sublimez chaque surface avec une finition", "Elevate every surface with an")}{" "}
              <span className="text-primary-light">{t("d'exception", "exceptional finish")}</span>
            </motion.h1>
            <motion.p {...fadeUp} transition={{ delay: 0.2 }} className="text-lg text-primary-foreground/75 mb-8 max-w-xl leading-relaxed">
              {t(
                "Sols, comptoirs, tables et surfaces adhérentes — des revêtements époxy durables, esthétiques et personnalisés pour projets résidentiels, commerciaux et industriels à Saint-Martin et dans toute la Caraïbe.",
                "Floors, countertops, tables and adhesive surfaces — durable, aesthetic and custom epoxy coatings for residential, commercial and industrial projects in Saint-Martin and throughout the Caribbean."
              )}
            </motion.p>
            <motion.div {...fadeUp} transition={{ delay: 0.3 }} className="flex flex-col sm:flex-row gap-3">
              <Button asChild size="lg" className="bg-gradient-brand text-lg px-8 py-6 hover:opacity-90 shadow-lg shadow-primary/20">
                <Link to="/devis">{t("Estimation gratuite", "Free Estimate")} <ArrowRight className="w-5 h-5 ml-2" /></Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6 border-primary-foreground/25 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
                <Link to="/galerie">{t("Voir nos réalisations", "View our projects")}</Link>
              </Button>
            </motion.div>
            <motion.div {...fadeUp} transition={{ delay: 0.5 }} className="flex items-center gap-6 mt-10 pt-8 border-t border-primary-foreground/15">
              {[
                [t("Certifié Elite Crete", "Elite Crete Certified"), Shield],
                [t("5 étoiles", "5 stars"), Star],
                [t("Saint-Martin", "Saint-Martin"), Shield],
              ].map(([text, Icon]: any) => (
                <div key={text} className="flex items-center gap-2">
                  <Icon className="w-4 h-4 text-primary-light" />
                  <span className="text-sm text-primary-foreground/65">{text}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} className="text-center mb-14">
            <span className="text-sm font-semibold uppercase tracking-widest text-primary">{t("Pourquoi Renovo Crete", "Why Renovo Crete")}</span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold mt-3 tracking-tight">
              {t("Des revêtements conçus pour", "Coatings designed to")}{" "}
              <span className="text-gradient-brand">{t("durer & impressionner", "last & impress")}</span>
            </h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b, i) => (
              <motion.div key={b.title} {...fadeUp} transition={{ delay: i * 0.06 }} className="flex gap-4 p-6 rounded-xl border border-border hover:border-primary/20 hover:shadow-sm transition-all">
                <div className="flex-shrink-0 w-11 h-11 rounded-lg bg-primary/8 flex items-center justify-center">
                  <b.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading text-base font-semibold mb-1">{b.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services overview */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} className="text-center mb-14">
            <span className="text-sm font-semibold uppercase tracking-widest text-primary">{t("Nos prestations", "Our services")}</span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold mt-3 tracking-tight">
              {t("Des surfaces qui", "Surfaces that")}{" "}
              <span className="text-gradient-brand">{t("performent & impressionnent", "perform & impress")}</span>
            </h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s, i) => (
              <motion.div key={s.label} {...fadeUp} transition={{ delay: i * 0.08 }}>
                <Link to="/prestations" className="group block rounded-xl overflow-hidden bg-background shadow-sm hover:shadow-lg transition-shadow">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={s.img} alt={s.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-heading text-lg font-semibold">{s.label}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{s.desc}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button asChild variant="outline" size="lg">
              <Link to="/prestations">{t("Toutes nos prestations", "All our services")} <ArrowRight className="w-4 h-4 ml-2" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Before / After */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div {...fadeUp}>
              <span className="text-sm font-semibold uppercase tracking-widest text-primary">{t("Avant / Après", "Before / After")}</span>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold mt-3 tracking-tight mb-6">
                {t("La transformation", "The transformation")}{" "}
                <span className="text-gradient-brand">{t("parle d'elle-même", "speaks for itself")}</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {t(
                  "Un sol fissuré et dégradé devient une surface lisse, brillante et résistante en quelques jours seulement. Nos revêtements époxy redonnent vie à vos espaces avec une finition professionnelle durable.",
                  "A cracked, degraded floor becomes a smooth, shiny, resistant surface in just a few days. Our epoxy coatings bring your spaces back to life with a durable professional finish."
                )}
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  t("Réparation des fissures et imperfections", "Crack and imperfection repair"),
                  t("Préparation par meulage au diamant", "Diamond grinding preparation"),
                  t("Application multicouche haute résistance", "High-resistance multi-layer application"),
                  t("Finition personnalisée de votre choix", "Custom finish of your choice"),
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Button asChild className="bg-gradient-brand-deep hover:opacity-90">
                <Link to="/galerie">{t("Voir plus de transformations", "See more transformations")} <ArrowRight className="w-4 h-4 ml-2" /></Link>
              </Button>
            </motion.div>
            <motion.div {...fadeUp} transition={{ delay: 0.15 }}>
              <img src={beforeAfterImg} alt={t("Transformation avant après", "Before after transformation")} className="rounded-xl shadow-lg w-full" loading="lazy" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} className="text-center mb-14">
            <span className="text-sm font-semibold uppercase tracking-widest text-primary">{t("Notre processus", "Our process")}</span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold mt-3 tracking-tight">
              {t("Un projet clé en main,", "A turnkey project,")}{" "}
              <span className="text-gradient-brand">{t("étape par étape", "step by step")}</span>
            </h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {processSteps.map((s, i) => (
              <motion.div key={s.step} {...fadeUp} transition={{ delay: i * 0.08 }} className="text-center p-6 rounded-xl bg-background border border-border">
                <span className="font-heading text-3xl font-extrabold text-gradient-brand">{s.step}</span>
                <h3 className="font-heading text-base font-semibold mt-3 mb-2">{lang === "fr" ? s.title : s.titleEn}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{lang === "fr" ? s.desc : s.descEn}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured gallery */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} className="text-center mb-14">
            <span className="text-sm font-semibold uppercase tracking-widest text-primary">{t("Réalisations", "Projects")}</span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold mt-3 tracking-tight">
              {t("Nos projets", "Our")}{" "}
              <span className="text-gradient-brand">{t("récents", "recent projects")}</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { img: heroImg, label: t("Sol métallique", "Metallic Floor"), span: "col-span-2 row-span-2" },
              { img: countertopImg, label: t("Comptoir océan", "Ocean Countertop") },
              { img: tableImg, label: t("Table rivière", "River Table") },
              { img: commercialImg, label: "Showroom" },
              { img: outdoorImg, label: t("Terrasse", "Terrace") },
            ].map((item, i) => (
              <motion.div key={item.label} {...fadeUp} transition={{ delay: i * 0.06 }} className={`group relative rounded-xl overflow-hidden ${item.span || ""}`}>
                <img src={item.img} alt={item.label} className="w-full h-full object-cover aspect-square group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="text-primary-foreground font-heading font-semibold">{item.label}</span>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button asChild variant="outline" size="lg">
              <Link to="/galerie">{t("Toute la galerie", "Full gallery")} <ArrowRight className="w-4 h-4 ml-2" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} className="text-center mb-14">
            <span className="text-sm font-semibold uppercase tracking-widest text-primary">{t("Témoignages", "Testimonials")}</span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold mt-3 tracking-tight">
              {t("Ce que disent", "What our")}{" "}
              <span className="text-gradient-brand">{t("nos clients", "clients say")}</span>
            </h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((te, i) => (
              <motion.div key={te.name} {...fadeUp} transition={{ delay: i * 0.08 }} className="p-6 rounded-xl bg-background border border-border">
                <Quote className="w-8 h-8 text-primary/20 mb-3" />
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">"{lang === "fr" ? te.text : te.textEn}"</p>
                <div className="flex items-center gap-1 mb-2">
                  {Array.from({ length: te.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="font-heading font-semibold text-sm">{te.name}</p>
                <p className="text-xs text-muted-foreground">{lang === "fr" ? te.role : te.roleEn} — {te.location}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick links */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { icon: Eye, label: t("Visualisation", "Visualizer"), desc: t("Simulez votre projet en ligne et recevez un rendu", "Simulate your project online and receive a render"), path: "/visualisation" },
              { icon: ArrowRight, label: t("Devis gratuit", "Free Quote"), desc: t("Estimation personnalisée sous 48h, sans engagement", "Personalized estimate within 48h, no commitment"), path: "/devis" },
              { icon: Star, label: t("Galerie", "Gallery"), desc: t("Parcourez nos transformations récentes", "Browse our recent transformations"), path: "/galerie" },
            ].map((item, i) => (
              <motion.div key={item.label} {...fadeUp} transition={{ delay: i * 0.08 }}>
                <Link to={item.path} className="block p-8 rounded-xl border border-border hover:border-primary/20 hover:shadow-md transition-all text-center group">
                  <div className="w-14 h-14 rounded-xl bg-gradient-brand text-primary-foreground flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-transform">
                    <item.icon className="w-7 h-7" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold mb-1">{item.label}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div {...fadeUp} className="text-center mb-14">
            <span className="text-sm font-semibold uppercase tracking-widest text-primary">FAQ</span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold mt-3 tracking-tight">
              {t("Questions", "Frequently asked")}{" "}
              <span className="text-gradient-brand">{t("fréquentes", "questions")}</span>
            </h2>
          </motion.div>
          <motion.div {...fadeUp}>
            <Accordion type="single" collapsible className="space-y-3">
              {faqItems.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="bg-background border border-border rounded-xl px-6">
                  <AccordionTrigger className="font-heading font-semibold text-left hover:no-underline">{lang === "fr" ? faq.q : faq.qEn}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">{lang === "fr" ? faq.a : faq.aEn}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Index;
