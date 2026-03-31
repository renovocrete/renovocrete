import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock, Send, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageHeader from "@/components/PageHeader";

const contactInfo = [
  { icon: Phone, label: "Téléphone", value: "(555) 123-4567", href: "tel:+15551234567" },
  { icon: Mail, label: "Email", value: "info@renovocrete.com", href: "mailto:info@renovocrete.com" },
  { icon: MapPin, label: "Zone desservie", value: "Grand Montréal et environs" },
  { icon: Clock, label: "Horaires", value: "Lun–Ven : 8h–18h | Sam : 9h–14h" },
];

const zones = [
  "Montréal", "Laval", "Longueuil", "Brossard", "Terrebonne",
  "Repentigny", "Saint-Jean", "Châteauguay", "Blainville", "Mirabel",
  "Saint-Jérôme", "Joliette", "Valleyfield", "Sorel-Tracy", "Granby",
];

const Contact = () => {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const update = (field: string, value: string) => setForm((prev) => ({ ...prev, [field]: value }));
  const inputClass = "w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors";

  return (
    <>
      <PageHeader
        badge="Contact"
        title="Contactez"
        highlight="notre équipe"
        description="Une question ? Un projet ? N'hésitez pas à nous contacter. Nous répondons sous 24h."
      />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Info */}
            <div>
              <h2 className="font-heading text-2xl font-700 mb-6">Nos coordonnées</h2>
              <div className="space-y-4 mb-10">
                {contactInfo.map((c) => (
                  <motion.div
                    key={c.label}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex gap-4 p-4 rounded-xl border border-border hover:border-primary/30 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <c.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground uppercase tracking-wider">{c.label}</span>
                      {c.href ? (
                        <a href={c.href} className="block font-medium text-foreground hover:text-primary transition-colors">{c.value}</a>
                      ) : (
                        <span className="block font-medium">{c.value}</span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              <h2 className="font-heading text-2xl font-700 mb-4">Zones desservies</h2>
              <div className="flex flex-wrap gap-2">
                {zones.map((z) => (
                  <span key={z} className="px-3 py-1.5 rounded-full text-xs font-medium bg-secondary text-muted-foreground border border-border">
                    {z}
                  </span>
                ))}
              </div>
            </div>

            {/* Form */}
            <div>
              <h2 className="font-heading text-2xl font-700 mb-6">Formulaire rapide</h2>
              {sent ? (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="rounded-xl border border-primary/30 bg-primary/5 p-10 text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-heading text-xl font-700 mb-2">Message envoyé !</h3>
                  <p className="text-muted-foreground text-sm">Nous vous répondrons dans les plus brefs délais.</p>
                </motion.div>
              ) : (
                <div className="space-y-5 rounded-xl border border-border p-8">
                  <div><label className="block text-sm font-medium mb-1.5">Nom complet *</label><input className={inputClass} value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Votre nom" /></div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div><label className="block text-sm font-medium mb-1.5">Email *</label><input type="email" className={inputClass} value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="votre@email.com" /></div>
                    <div><label className="block text-sm font-medium mb-1.5">Téléphone</label><input type="tel" className={inputClass} value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="(555) 123-4567" /></div>
                  </div>
                  <div><label className="block text-sm font-medium mb-1.5">Message *</label><textarea className={`${inputClass} min-h-[120px]`} value={form.message} onChange={(e) => update("message", e.target.value)} placeholder="Décrivez votre projet ou posez votre question..." /></div>
                  <Button onClick={() => setSent(true)} className="w-full bg-gradient-brand-deep hover:opacity-90 text-lg py-6">
                    <Send className="w-5 h-5 mr-2" /> Envoyer le message
                  </Button>
                </div>
              )}

              <div className="mt-6 p-4 rounded-lg bg-secondary text-center">
                <p className="text-sm text-muted-foreground">
                  Besoin d'un devis détaillé ? <Link to="/devis" className="text-primary font-medium hover:underline">Remplissez notre formulaire multi-étapes →</Link>
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
