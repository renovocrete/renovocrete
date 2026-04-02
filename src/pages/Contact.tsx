import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Send, Check, Instagram, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageHeader from "@/components/PageHeader";
import { useLanguage } from "@/i18n/LanguageContext";
import { servedZones } from "@/data/mock";

const fadeUp = { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };

const Contact = () => {
  const { t } = useLanguage();
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const update = (field: string, value: string) => setForm((prev) => ({ ...prev, [field]: value }));
  const inputClass = "w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors";

  const contactInfo = [
    { icon: Phone, label: t("Téléphone", "Phone"), value: "0690 53 58 34", href: "tel:+590690535834" },
    { icon: Mail, label: t("Email principal", "Main email"), value: "renovocrete@gmail.com", href: "mailto:renovocrete@gmail.com" },
    { icon: Mail, label: t("Devis & projets", "Quotes & projects"), value: "renovocretebat@gmail.com", href: "mailto:renovocretebat@gmail.com" },
    { icon: MapPin, label: t("Base", "Base"), value: "Saint-Martin" },
    { icon: Instagram, label: "Instagram", value: "Renovo Crete", href: "https://www.instagram.com/renovocrete" },
  ];

  return (
    <>
      <PageHeader
        badge="Contact"
        title={t("Contactez", "Contact")}
        highlight={t("notre équipe", "our team")}
        description={t("Une question ? Un projet en tête ? Nous vous répondons sous 24h.", "A question? A project in mind? We respond within 24h.")}
      />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="font-heading text-2xl font-bold mb-6">{t("Nos coordonnées", "Our contact details")}</h2>
              <div className="space-y-4 mb-10">
                {contactInfo.map((c) => (
                  <motion.div key={c.label} {...fadeUp} className="flex gap-4 p-4 rounded-xl border border-border hover:border-primary/20 transition-colors">
                    <div className="w-11 h-11 rounded-lg bg-primary/8 flex items-center justify-center flex-shrink-0"><c.icon className="w-5 h-5 text-primary" /></div>
                    <div>
                      <span className="text-xs text-muted-foreground uppercase tracking-wider">{c.label}</span>
                      {c.href ? (
                        <a href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="block font-medium text-foreground hover:text-primary transition-colors">{c.value}</a>
                      ) : (
                        <span className="block font-medium">{c.value}</span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              <h2 className="font-heading text-2xl font-bold mb-4">{t("Zones desservies", "Service Areas")}</h2>
              <p className="text-sm text-muted-foreground mb-6">
                {t("Base principale à Saint-Martin. Nous intervenons dans toute la Caraïbe.", "Main base in Saint-Martin. We operate throughout the Caribbean.")}
              </p>

              <div className="space-y-4">
                {Object.values(servedZones).map((zone) => (
                  <div key={zone.title} className="rounded-xl border border-border p-4">
                    <h3 className="font-heading text-sm font-semibold mb-3 flex items-center gap-2">
                      <Globe className="w-4 h-4 text-primary" />
                      {t(zone.title, zone.titleEn)}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {zone.zones.map((z) => (
                        <span key={z} className="px-3 py-1.5 rounded-full text-xs font-medium bg-secondary text-muted-foreground border border-border">{z}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="font-heading text-2xl font-bold mb-6">{t("Message rapide", "Quick message")}</h2>
              {sent ? (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="rounded-xl border border-primary/20 bg-primary/5 p-10 text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4"><Check className="w-8 h-8 text-primary" /></div>
                  <h3 className="font-heading text-xl font-bold mb-2">{t("Message envoyé !", "Message sent!")}</h3>
                  <p className="text-muted-foreground text-sm">{t("Nous vous répondrons dans les plus brefs délais.", "We'll respond as soon as possible.")}</p>
                </motion.div>
              ) : (
                <div className="space-y-5 rounded-xl border border-border p-8">
                  <div><label className="block text-sm font-medium mb-1.5">{t("Nom complet *", "Full name *")}</label><input className={inputClass} value={form.name} onChange={(e) => update("name", e.target.value)} placeholder={t("Votre nom", "Your name")} /></div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div><label className="block text-sm font-medium mb-1.5">Email *</label><input type="email" className={inputClass} value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="email@example.com" /></div>
                    <div><label className="block text-sm font-medium mb-1.5">{t("Téléphone", "Phone")}</label><input type="tel" className={inputClass} value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="0690 XX XX XX" /></div>
                  </div>
                  <div><label className="block text-sm font-medium mb-1.5">Message *</label><textarea className={`${inputClass} min-h-[120px]`} value={form.message} onChange={(e) => update("message", e.target.value)} placeholder={t("Décrivez votre projet ou posez votre question...", "Describe your project or ask your question...")} /></div>
                  <Button onClick={() => setSent(true)} className="w-full bg-gradient-brand-deep hover:opacity-90 text-base py-5"><Send className="w-5 h-5 mr-2" /> {t("Envoyer le message", "Send message")}</Button>
                </div>
              )}

              <div className="mt-6 p-4 rounded-lg bg-secondary text-center">
                <p className="text-sm text-muted-foreground">
                  {t("Besoin d'un devis détaillé ?", "Need a detailed quote?")}{" "}
                  <Link to="/devis" className="text-primary font-medium hover:underline">{t("Remplissez notre formulaire complet →", "Fill out our complete form →")}</Link>
                </p>
              </div>
              <div className="mt-3 p-4 rounded-lg bg-secondary text-center">
                <p className="text-sm text-muted-foreground">
                  {t("Simulez votre projet en ligne.", "Simulate your project online.")}{" "}
                  <Link to="/visualisation" className="text-primary font-medium hover:underline">{t("Accéder au visualiseur →", "Access the visualizer →")}</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
