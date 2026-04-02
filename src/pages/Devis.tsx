import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft, Check, User, Home, Palette, FileText, Upload, Phone, Camera, Ruler } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageHeader from "@/components/PageHeader";
import { useLanguage } from "@/i18n/LanguageContext";

const Devis = () => {
  const { t } = useLanguage();

  const steps = [
    { icon: Home, label: t("Projet", "Project") },
    { icon: Palette, label: t("Surface", "Surface") },
    { icon: Ruler, label: t("Détails", "Details") },
    { icon: Camera, label: t("Photos", "Photos") },
    { icon: User, label: t("Coordonnées", "Contact") },
  ];

  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    name: "", email: "", phone: "", company: "",
    projectType: "", surface: "", area: "", location: "",
    usage: "", supportState: "",
    finish: "", colors: "", deadline: "", budget: "",
    notes: "",
  });
  const [uploaded, setUploaded] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const update = (field: string, value: string) => setForm((prev) => ({ ...prev, [field]: value }));
  const next = () => step < 4 && setStep(step + 1);
  const prev = () => step > 0 && setStep(step - 1);

  const inputClass = "w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors";
  const labelClass = "block text-sm font-medium mb-1.5";
  const selectClass = inputClass;

  if (submitted) {
    return (
      <>
        <PageHeader badge={t("Devis", "Quote")} title={t("Demande", "Request")} highlight={t("envoyée !", "sent!")} />
        <section className="py-24">
          <div className="container mx-auto px-4 text-center max-w-lg">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6"><Check className="w-10 h-10 text-primary" /></div>
              <h2 className="font-heading text-2xl font-bold mb-4">{t("Merci", "Thank you")}{form.name ? `, ${form.name}` : ""} !</h2>
              <p className="text-muted-foreground mb-4">{t("Votre demande de devis a bien été envoyée. Notre équipe vous contactera sous 24 à 48h avec une proposition personnalisée.", "Your quote request has been sent. Our team will contact you within 24-48h with a personalized proposal.")}</p>
              <p className="text-sm text-muted-foreground mb-8">{t("Nous vous confirmerons la réception par email.", "We'll confirm receipt by email.")}</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Button asChild><Link to="/">{t("Retour à l'accueil", "Back to home")}</Link></Button>
                <Button asChild variant="outline"><Link to="/galerie">{t("Voir nos réalisations", "View our projects")}</Link></Button>
              </div>
            </motion.div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHeader
        badge={t("Devis gratuit", "Free quote")}
        title={t("Demandez votre", "Request your")}
        highlight={t("estimation", "estimate")}
        description={t("Remplissez ce formulaire en quelques étapes et recevez un devis personnalisé sous 48h.", "Fill out this form in a few steps and receive a personalized quote within 48h.")}
      />

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          {/* Progress */}
          <div className="flex items-center justify-between mb-12">
            {steps.map((s, i) => (
              <div key={s.label} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${i <= step ? "bg-gradient-brand text-primary-foreground" : "bg-secondary text-muted-foreground"}`}>
                    {i < step ? <Check className="w-5 h-5" /> : <s.icon className="w-5 h-5" />}
                  </div>
                  <span className={`text-xs mt-2 font-medium hidden sm:block ${i <= step ? "text-primary" : "text-muted-foreground"}`}>{s.label}</span>
                </div>
                {i < steps.length - 1 && <div className={`flex-1 h-0.5 mx-3 rounded ${i < step ? "bg-primary" : "bg-border"}`} />}
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }} className="bg-background rounded-xl border border-border p-8">
              {step === 0 && (
                <div className="space-y-5">
                  <h2 className="font-heading text-xl font-bold mb-6">{t("Type de projet", "Project type")}</h2>
                  <div><label className={labelClass}>{t("Type de projet *", "Project type *")}</label>
                    <select className={selectClass} value={form.projectType} onChange={(e) => update("projectType", e.target.value)}>
                      <option value="">{t("Sélectionnez...", "Select...")}</option>
                      <option>{t("Résidentiel", "Residential")}</option><option>{t("Commercial", "Commercial")}</option><option>{t("Industriel", "Industrial")}</option><option>{t("Extérieur", "Exterior")}</option>
                    </select>
                  </div>
                  <div><label className={labelClass}>{t("Emplacement *", "Location *")}</label>
                    <select className={selectClass} value={form.location} onChange={(e) => update("location", e.target.value)}>
                      <option value="">{t("Sélectionnez...", "Select...")}</option>
                      <option>{t("Intérieur", "Interior")}</option><option>{t("Extérieur", "Exterior")}</option><option>{t("Les deux", "Both")}</option>
                    </select>
                  </div>
                  <div><label className={labelClass}>{t("Usage du lieu", "Space usage")}</label>
                    <input className={inputClass} value={form.usage} onChange={(e) => update("usage", e.target.value)} placeholder={t("Ex: Garage, restaurant, entrepôt...", "Ex: Garage, restaurant, warehouse...")} />
                  </div>
                </div>
              )}

              {step === 1 && (
                <div className="space-y-5">
                  <h2 className="font-heading text-xl font-bold mb-6">{t("Surface à traiter", "Surface to treat")}</h2>
                  <div><label className={labelClass}>{t("Type de surface *", "Surface type *")}</label>
                    <select className={selectClass} value={form.surface} onChange={(e) => update("surface", e.target.value)}>
                      <option value="">{t("Sélectionnez...", "Select...")}</option>
                      <option>Sol</option><option>{t("Comptoir", "Countertop")}</option><option>{t("Table", "Table")}</option><option>{t("Mur", "Wall")}</option><option>{t("Escalier", "Stairs")}</option><option>{t("Terrasse", "Terrace")}</option><option>{t("Autre", "Other")}</option>
                    </select>
                  </div>
                  <div><label className={labelClass}>{t("État du support actuel", "Current substrate condition")}</label>
                    <select className={selectClass} value={form.supportState} onChange={(e) => update("supportState", e.target.value)}>
                      <option value="">{t("Sélectionnez...", "Select...")}</option>
                      <option>{t("Béton brut", "Raw concrete")}</option><option>{t("Béton peint", "Painted concrete")}</option><option>{t("Carrelage", "Tile")}</option><option>{t("Revêtement existant", "Existing coating")}</option><option>{t("Fissuré / endommagé", "Cracked / damaged")}</option><option>{t("Neuf", "New")}</option>
                    </select>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-5">
                  <h2 className="font-heading text-xl font-bold mb-6">{t("Détails du besoin", "Project details")}</h2>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div><label className={labelClass}>{t("Superficie (m² / pi²)", "Area (m² / sqft)")}</label><input className={inputClass} value={form.area} onChange={(e) => update("area", e.target.value)} placeholder="Ex: 50 m²" /></div>
                    <div><label className={labelClass}>{t("Type de finition souhaitée", "Desired finish type")}</label>
                      <select className={selectClass} value={form.finish} onChange={(e) => update("finish", e.target.value)}>
                        <option value="">{t("Sélectionnez...", "Select...")}</option>
                        <option>{t("Métallique", "Metallic")}</option><option>{t("Flocons", "Flake")}</option><option>{t("Marbré", "Marbled")}</option><option>{t("Solide", "Solid")}</option><option>{t("Personnalisé", "Custom")}</option>
                      </select>
                    </div>
                  </div>
                  <div><label className={labelClass}>{t("Couleurs préférées", "Preferred colors")}</label><input className={inputClass} value={form.colors} onChange={(e) => update("colors", e.target.value)} placeholder={t("Ex: Bleu, gris, blanc", "Ex: Blue, grey, white")} /></div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div><label className={labelClass}>{t("Délai souhaité", "Desired timeline")}</label>
                      <select className={selectClass} value={form.deadline} onChange={(e) => update("deadline", e.target.value)}>
                        <option value="">{t("Sélectionnez...", "Select...")}</option>
                        <option>{t("Dès que possible", "As soon as possible")}</option><option>{t("Dans 1 mois", "Within 1 month")}</option><option>{t("Dans 2-3 mois", "Within 2-3 months")}</option><option>{t("Pas pressé", "Not urgent")}</option>
                      </select>
                    </div>
                    <div><label className={labelClass}>{t("Budget estimatif", "Estimated budget")}</label>
                      <select className={selectClass} value={form.budget} onChange={(e) => update("budget", e.target.value)}>
                        <option value="">{t("Sélectionnez...", "Select...")}</option>
                        <option>{t("Moins de 2 000 €", "Under €2,000")}</option><option>2 000 - 5 000 €</option><option>5 000 - 10 000 €</option><option>{t("Plus de 10 000 €", "Over €10,000")}</option>
                      </select>
                    </div>
                  </div>
                  <div><label className={labelClass}>{t("Commentaire", "Comment")}</label><textarea className={`${inputClass} min-h-[100px]`} value={form.notes} onChange={(e) => update("notes", e.target.value)} placeholder={t("Détails, contraintes, questions...", "Details, constraints, questions...")} /></div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-5">
                  <h2 className="font-heading text-xl font-bold mb-6">{t("Dimensions et photos", "Dimensions and photos")}</h2>
                  <div><label className={labelClass}>{t("Photos du projet (optionnel)", "Project photos (optional)")}</label>
                    <div className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer ${uploaded ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"}`} onClick={() => setUploaded(true)}>
                      {uploaded ? (
                        <div className="flex items-center justify-center gap-2"><Check className="w-5 h-5 text-primary" /><span className="text-sm text-primary font-medium">{t("Photos ajoutées", "Photos added")}</span></div>
                      ) : (
                        <div className="flex flex-col items-center gap-1"><Upload className="w-8 h-8 text-muted-foreground/40" /><span className="text-sm text-muted-foreground">{t("Cliquez ou glissez pour ajouter", "Click or drag to add")}</span></div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-5">
                  <h2 className="font-heading text-xl font-bold mb-6">{t("Vos coordonnées", "Your contact details")}</h2>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div><label className={labelClass}>{t("Nom complet *", "Full name *")}</label><input className={inputClass} value={form.name} onChange={(e) => update("name", e.target.value)} placeholder={t("Votre nom", "Your name")} /></div>
                    <div><label className={labelClass}>Email *</label><input type="email" className={inputClass} value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="email@example.com" /></div>
                    <div><label className={labelClass}>{t("Téléphone *", "Phone *")}</label><input type="tel" className={inputClass} value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="0690 XX XX XX" /></div>
                    <div><label className={labelClass}>{t("Entreprise", "Company")}</label><input className={inputClass} value={form.company} onChange={(e) => update("company", e.target.value)} placeholder={t("Optionnel", "Optional")} /></div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-between mt-8">
            <Button variant="outline" onClick={prev} disabled={step === 0}><ArrowLeft className="w-4 h-4 mr-2" /> {t("Précédent", "Previous")}</Button>
            {step < 4 ? (
              <Button onClick={next} className="bg-gradient-brand hover:opacity-90">{t("Suivant", "Next")} <ArrowRight className="w-4 h-4 ml-2" /></Button>
            ) : (
              <Button onClick={() => setSubmitted(true)} className="bg-gradient-brand-deep hover:opacity-90">{t("Envoyer ma demande", "Submit my request")} <Check className="w-4 h-4 ml-2" /></Button>
            )}
          </div>

          <div className="mt-8 p-5 rounded-xl border border-border bg-secondary text-center">
            <p className="text-sm text-muted-foreground mb-3">{t("Vous préférez être rappelé ?", "Prefer to be called back?")}</p>
            <Button asChild variant="outline" size="sm">
              <a href="tel:+590690535834"><Phone className="w-4 h-4 mr-1.5" /> {t("Je préfère être rappelé", "I prefer to be called back")}</a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Devis;
