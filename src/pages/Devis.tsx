import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Check, User, Home, Palette, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageHeader from "@/components/PageHeader";

const steps = [
  { icon: User, label: "Vos coordonnées" },
  { icon: Home, label: "Votre projet" },
  { icon: Palette, label: "Préférences" },
  { icon: FileText, label: "Résumé" },
];

const Devis = () => {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    name: "", email: "", phone: "", company: "",
    projectType: "", surface: "", area: "", location: "",
    finish: "", colors: "", deadline: "", budget: "",
    notes: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const update = (field: string, value: string) => setForm((prev) => ({ ...prev, [field]: value }));

  const next = () => step < 3 && setStep(step + 1);
  const prev = () => step > 0 && setStep(step - 1);

  const inputClass = "w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors";
  const labelClass = "block text-sm font-medium mb-1.5";

  if (submitted) {
    return (
      <>
        <PageHeader badge="Devis" title="Demande" highlight="envoyée !" />
        <section className="py-24">
          <div className="container mx-auto px-4 text-center max-w-lg">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-primary" />
            </div>
            <h2 className="font-heading text-2xl font-700 mb-4">Merci, {form.name} !</h2>
            <p className="text-muted-foreground mb-8">Votre demande de devis a bien été envoyée. Notre équipe vous contactera sous 24 à 48h avec une proposition personnalisée.</p>
            <Button asChild variant="outline"><a href="/">Retour à l'accueil</a></Button>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHeader
        badge="Devis gratuit"
        title="Demandez votre"
        highlight="estimation"
        description="Remplissez ce formulaire en quelques étapes et recevez un devis personnalisé sous 48h."
      />

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          {/* Step indicator */}
          <div className="flex items-center justify-between mb-12">
            {steps.map((s, i) => (
              <div key={s.label} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                    i <= step ? "bg-gradient-brand text-primary-foreground" : "bg-secondary text-muted-foreground"
                  }`}>
                    {i < step ? <Check className="w-5 h-5" /> : <s.icon className="w-5 h-5" />}
                  </div>
                  <span className={`text-xs mt-2 font-medium hidden sm:block ${i <= step ? "text-primary" : "text-muted-foreground"}`}>{s.label}</span>
                </div>
                {i < steps.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-2 rounded ${i < step ? "bg-primary" : "bg-border"}`} />
                )}
              </div>
            ))}
          </div>

          {/* Form steps */}
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="bg-background rounded-xl border border-border p-8"
            >
              {step === 0 && (
                <div className="space-y-5">
                  <h2 className="font-heading text-xl font-700 mb-6">Vos coordonnées</h2>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div><label className={labelClass}>Nom complet *</label><input className={inputClass} value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Jean Dupont" /></div>
                    <div><label className={labelClass}>Email *</label><input type="email" className={inputClass} value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="jean@email.com" /></div>
                    <div><label className={labelClass}>Téléphone *</label><input type="tel" className={inputClass} value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="(555) 123-4567" /></div>
                    <div><label className={labelClass}>Entreprise</label><input className={inputClass} value={form.company} onChange={(e) => update("company", e.target.value)} placeholder="Optionnel" /></div>
                  </div>
                </div>
              )}

              {step === 1 && (
                <div className="space-y-5">
                  <h2 className="font-heading text-xl font-700 mb-6">Votre projet</h2>
                  <div><label className={labelClass}>Type de projet *</label>
                    <select className={inputClass} value={form.projectType} onChange={(e) => update("projectType", e.target.value)}>
                      <option value="">Sélectionnez...</option>
                      <option>Résidentiel</option><option>Commercial</option><option>Industriel</option>
                    </select>
                  </div>
                  <div><label className={labelClass}>Surface à traiter *</label>
                    <select className={inputClass} value={form.surface} onChange={(e) => update("surface", e.target.value)}>
                      <option value="">Sélectionnez...</option>
                      <option>Sol</option><option>Comptoir</option><option>Table</option><option>Mur</option><option>Escalier</option><option>Autre</option>
                    </select>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div><label className={labelClass}>Superficie (pi² / m²)</label><input className={inputClass} value={form.area} onChange={(e) => update("area", e.target.value)} placeholder="Ex: 500 pi²" /></div>
                    <div><label className={labelClass}>Emplacement</label>
                      <select className={inputClass} value={form.location} onChange={(e) => update("location", e.target.value)}>
                        <option value="">Sélectionnez...</option>
                        <option>Intérieur</option><option>Extérieur</option><option>Les deux</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-5">
                  <h2 className="font-heading text-xl font-700 mb-6">Vos préférences</h2>
                  <div><label className={labelClass}>Type de finition souhaitée</label>
                    <select className={inputClass} value={form.finish} onChange={(e) => update("finish", e.target.value)}>
                      <option value="">Sélectionnez...</option>
                      <option>Métallique</option><option>Flocons</option><option>Marbré</option><option>Solide</option><option>Personnalisé</option>
                    </select>
                  </div>
                  <div><label className={labelClass}>Couleurs préférées</label><input className={inputClass} value={form.colors} onChange={(e) => update("colors", e.target.value)} placeholder="Ex: Bleu, gris, blanc" /></div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div><label className={labelClass}>Délai souhaité</label>
                      <select className={inputClass} value={form.deadline} onChange={(e) => update("deadline", e.target.value)}>
                        <option value="">Sélectionnez...</option>
                        <option>Dès que possible</option><option>Dans 1 mois</option><option>Dans 2-3 mois</option><option>Pas pressé</option>
                      </select>
                    </div>
                    <div><label className={labelClass}>Budget approximatif</label>
                      <select className={inputClass} value={form.budget} onChange={(e) => update("budget", e.target.value)}>
                        <option value="">Sélectionnez...</option>
                        <option>Moins de 2 000 $</option><option>2 000 - 5 000 $</option><option>5 000 - 10 000 $</option><option>Plus de 10 000 $</option>
                      </select>
                    </div>
                  </div>
                  <div><label className={labelClass}>Notes supplémentaires</label><textarea className={`${inputClass} min-h-[100px]`} value={form.notes} onChange={(e) => update("notes", e.target.value)} placeholder="Détails supplémentaires sur votre projet..." /></div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <h2 className="font-heading text-xl font-700 mb-6">Résumé de votre demande</h2>
                  <div className="grid sm:grid-cols-2 gap-4 text-sm">
                    {[
                      ["Nom", form.name], ["Email", form.email], ["Téléphone", form.phone], ["Entreprise", form.company],
                      ["Type de projet", form.projectType], ["Surface", form.surface], ["Superficie", form.area], ["Emplacement", form.location],
                      ["Finition", form.finish], ["Couleurs", form.colors], ["Délai", form.deadline], ["Budget", form.budget],
                    ].filter(([, v]) => v).map(([label, value]) => (
                      <div key={label} className="p-3 rounded-lg bg-secondary">
                        <span className="text-muted-foreground text-xs block">{label}</span>
                        <span className="font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                  {form.notes && (
                    <div className="p-3 rounded-lg bg-secondary">
                      <span className="text-muted-foreground text-xs block">Notes</span>
                      <span className="font-medium text-sm">{form.notes}</span>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <Button variant="outline" onClick={prev} disabled={step === 0}>
              <ArrowLeft className="w-4 h-4 mr-2" /> Précédent
            </Button>
            {step < 3 ? (
              <Button onClick={next} className="bg-gradient-brand hover:opacity-90">
                Suivant <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button onClick={() => setSubmitted(true)} className="bg-gradient-brand-deep hover:opacity-90">
                Envoyer ma demande <Check className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Devis;
