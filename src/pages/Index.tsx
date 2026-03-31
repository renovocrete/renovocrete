import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Shield, Star, CheckCircle2, Sparkles, Clock, Award, Wrench, Eye, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { heroImg, countertopImg, tableImg, industrialImg, outdoorImg, commercialImg, beforeAfterImg, testimonials, processSteps, faqItems } from "@/data/mock";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const fadeUp = { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };

const services = [
  { img: countertopImg, label: "Comptoirs en résine", desc: "Finitions marbrées et métalliques uniques" },
  { img: tableImg, label: "Tables décoratives", desc: "Pièces sur mesure en bois et résine" },
  { img: industrialImg, label: "Sols industriels", desc: "Revêtements haute performance" },
  { img: outdoorImg, label: "Surfaces extérieures", desc: "Résistants aux UV et intempéries" },
];

const benefits = [
  { icon: Shield, title: "Durabilité extrême", desc: "10 à 25 ans de résistance aux chocs, produits chimiques et trafic intense." },
  { icon: Sparkles, title: "Esthétique sur mesure", desc: "Métallique, marbré, flocons, artistique — des finitions personnalisées illimitées." },
  { icon: Clock, title: "Pose rapide", desc: "La plupart des projets complétés en 2 à 5 jours, perturbation minimale." },
  { icon: Award, title: "Expertise certifiée", desc: "Installateurs formés avec des années d'expérience terrain." },
  { icon: CheckCircle2, title: "Sans joints", desc: "Surface lisse, hygiénique et facile d'entretien — sans fissures ni joints." },
  { icon: Wrench, title: "Garantie incluse", desc: "Chaque projet couvert par notre garantie de satisfaction complète." },
];

const Index = () => {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImg} alt="Sol époxy métallique premium dans un salon moderne" className="w-full h-full object-cover" width={1920} height={1080} />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/55 to-transparent" />
        </div>
        <div className="container relative z-10 mx-auto px-4 py-20">
          <div className="max-w-2xl">
            <motion.span {...fadeUp} className="inline-flex items-center gap-2 rounded-full border border-primary-light/30 bg-primary-light/10 px-4 py-1.5 mb-6 text-sm font-medium text-primary-light">
              <Star className="w-4 h-4" /> Revêtements époxy & résine premium
            </motion.span>
            <motion.h1 {...fadeUp} transition={{ delay: 0.1 }} className="font-heading text-4xl sm:text-5xl lg:text-6xl font-800 leading-[1.08] tracking-tight text-primary-foreground mb-6">
              Sublimez chaque surface avec une finition{" "}
              <span className="text-primary-light">d'exception</span>
            </motion.h1>
            <motion.p {...fadeUp} transition={{ delay: 0.2 }} className="text-lg text-primary-foreground/75 mb-8 max-w-xl leading-relaxed">
              Sols, comptoirs, tables et surfaces adhérentes — des revêtements époxy durables, esthétiques et personnalisés pour projets résidentiels, commerciaux et industriels.
            </motion.p>
            <motion.div {...fadeUp} transition={{ delay: 0.3 }} className="flex flex-col sm:flex-row gap-3">
              <Button asChild size="lg" className="bg-gradient-brand text-lg px-8 py-6 hover:opacity-90 shadow-lg shadow-primary/20">
                <Link to="/devis">Estimation gratuite <ArrowRight className="w-5 h-5 ml-2" /></Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6 border-primary-foreground/25 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
                <Link to="/galerie">Voir nos réalisations</Link>
              </Button>
            </motion.div>
            <motion.div {...fadeUp} transition={{ delay: 0.5 }} className="flex items-center gap-6 mt-10 pt-8 border-t border-primary-foreground/15">
              {[["Certifié & assuré", Shield], ["5 étoiles", Star], ["Garantie incluse", Shield]].map(([text, Icon]: any) => (
                <div key={text} className="flex items-center gap-2">
                  <Icon className="w-4 h-4 text-primary-light" />
                  <span className="text-sm text-primary-foreground/65">{text}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits strip */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} className="text-center mb-14">
            <span className="text-sm font-semibold uppercase tracking-widest text-primary">Pourquoi Renovo Crete</span>
            <h2 className="font-heading text-3xl sm:text-4xl font-700 mt-3 tracking-tight">
              Des revêtements conçus pour <span className="text-gradient-brand">durer & impressionner</span>
            </h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b, i) => (
              <motion.div key={b.title} {...fadeUp} transition={{ delay: i * 0.06 }} className="flex gap-4 p-6 rounded-xl border border-border hover:border-primary/20 hover:shadow-sm transition-all">
                <div className="flex-shrink-0 w-11 h-11 rounded-lg bg-primary/8 flex items-center justify-center">
                  <b.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading text-base font-600 mb-1">{b.title}</h3>
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
            <span className="text-sm font-semibold uppercase tracking-widest text-primary">Nos prestations</span>
            <h2 className="font-heading text-3xl sm:text-4xl font-700 mt-3 tracking-tight">
              Des surfaces qui <span className="text-gradient-brand">performent & impressionnent</span>
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Du comptoir de cuisine aux installations industrielles, nous livrons des revêtements premium adaptés à chaque environnement.
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s, i) => (
              <motion.div key={s.label} {...fadeUp} transition={{ delay: i * 0.08 }}>
                <Link to="/prestations" className="group block rounded-xl overflow-hidden bg-background shadow-sm hover:shadow-lg transition-shadow">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={s.img} alt={s.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-heading text-lg font-600">{s.label}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{s.desc}</p>
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

      {/* Before / After */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div {...fadeUp}>
              <span className="text-sm font-semibold uppercase tracking-widest text-primary">Avant / Après</span>
              <h2 className="font-heading text-3xl sm:text-4xl font-700 mt-3 tracking-tight mb-6">
                La transformation <span className="text-gradient-brand">parle d'elle-même</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Un sol de garage fissuré et taché devient une surface lisse, brillante et résistante en quelques jours seulement. Nos revêtements époxy redonnent vie à vos espaces avec une finition professionnelle durable.
              </p>
              <ul className="space-y-3 mb-8">
                {["Réparation des fissures et imperfections", "Préparation par meulage au diamant", "Application multicouche haute résistance", "Finition personnalisée de votre choix"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Button asChild className="bg-gradient-brand-deep hover:opacity-90">
                <Link to="/galerie">Voir plus de transformations <ArrowRight className="w-4 h-4 ml-2" /></Link>
              </Button>
            </motion.div>
            <motion.div {...fadeUp} transition={{ delay: 0.15 }}>
              <img src={beforeAfterImg} alt="Transformation avant après sol de garage époxy" className="rounded-xl shadow-lg w-full" loading="lazy" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} className="text-center mb-14">
            <span className="text-sm font-semibold uppercase tracking-widest text-primary">Notre processus</span>
            <h2 className="font-heading text-3xl sm:text-4xl font-700 mt-3 tracking-tight">
              Un projet clé en main, <span className="text-gradient-brand">étape par étape</span>
            </h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {processSteps.map((s, i) => (
              <motion.div key={s.step} {...fadeUp} transition={{ delay: i * 0.08 }} className="text-center p-6 rounded-xl bg-background border border-border">
                <span className="font-heading text-3xl font-800 text-gradient-brand">{s.step}</span>
                <h3 className="font-heading text-base font-600 mt-3 mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured gallery */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} className="text-center mb-14">
            <span className="text-sm font-semibold uppercase tracking-widest text-primary">Réalisations</span>
            <h2 className="font-heading text-3xl sm:text-4xl font-700 mt-3 tracking-tight">
              Nos projets <span className="text-gradient-brand">récents</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { img: heroImg, label: "Sol métallique", span: "col-span-2 row-span-2" },
              { img: countertopImg, label: "Comptoir océan" },
              { img: tableImg, label: "Table rivière" },
              { img: commercialImg, label: "Showroom" },
              { img: outdoorImg, label: "Terrasse" },
            ].map((item, i) => (
              <motion.div key={item.label} {...fadeUp} transition={{ delay: i * 0.06 }} className={`group relative rounded-xl overflow-hidden ${item.span || ""}`}>
                <img src={item.img} alt={item.label} className="w-full h-full object-cover aspect-square group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="text-primary-foreground font-heading font-600">{item.label}</span>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button asChild variant="outline" size="lg">
              <Link to="/galerie">Toute la galerie <ArrowRight className="w-4 h-4 ml-2" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} className="text-center mb-14">
            <span className="text-sm font-semibold uppercase tracking-widest text-primary">Témoignages</span>
            <h2 className="font-heading text-3xl sm:text-4xl font-700 mt-3 tracking-tight">
              Ce que disent <span className="text-gradient-brand">nos clients</span>
            </h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((t, i) => (
              <motion.div key={t.name} {...fadeUp} transition={{ delay: i * 0.08 }} className="p-6 rounded-xl bg-background border border-border">
                <Quote className="w-8 h-8 text-primary/20 mb-3" />
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">"{t.text}"</p>
                <div className="flex items-center gap-1 mb-2">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="font-heading font-600 text-sm">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role} — {t.location}</p>
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
              { icon: Eye, label: "Visualisation", desc: "Simulez votre projet en ligne et recevez un rendu", path: "/visualisation" },
              { icon: ArrowRight, label: "Devis gratuit", desc: "Estimation personnalisée sous 48h, sans engagement", path: "/devis" },
              { icon: Star, label: "Galerie", desc: "Parcourez nos transformations récentes", path: "/galerie" },
            ].map((item, i) => (
              <motion.div key={item.label} {...fadeUp} transition={{ delay: i * 0.08 }}>
                <Link to={item.path} className="block p-8 rounded-xl border border-border hover:border-primary/20 hover:shadow-md transition-all text-center group">
                  <div className="w-14 h-14 rounded-xl bg-gradient-brand text-primary-foreground flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-transform">
                    <item.icon className="w-7 h-7" />
                  </div>
                  <h3 className="font-heading text-lg font-600 mb-1">{item.label}</h3>
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
            <h2 className="font-heading text-3xl sm:text-4xl font-700 mt-3 tracking-tight">
              Questions <span className="text-gradient-brand">fréquentes</span>
            </h2>
          </motion.div>
          <motion.div {...fadeUp}>
            <Accordion type="single" collapsible className="space-y-3">
              {faqItems.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="bg-background border border-border rounded-xl px-6">
                  <AccordionTrigger className="font-heading font-600 text-left hover:no-underline">{faq.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">{faq.a}</AccordionContent>
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
