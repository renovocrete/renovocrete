import { useEffect, useState } from "react";
import { z } from "zod";
import { GraduationCap, Loader2, CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/i18n/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

const TRAININGS = [
  "Fluid Applied Resinous Floor Coatings (Industrial/Commercial)",
  'REFLECTOR™ Enhancer Flooring (the original "Metallic" flooring)',
  "Garage Flooring Systems (1-3 day installs)",
  "Decorative Concrete Overlays & Resurfacing",
  "Concrete Surface Restoration",
  "Misc. Sealers, Acid & Acrylic Stains, Dyes, Crack Repair",
  "Urethane Cement Flooring",
  "Specialty - Electrostatic Dissipative (ESD) Flooring",
  "Self-Leveling Cement Floors (Structural Repair)",
  "Specialty - Chemical Resistant Novolac",
  "Specialty - Methyl Methacrylate (MMA) Flooring",
  "Resinous Wall Coatings & Cove Base",
];

const schema = z.object({
  first_name: z.string().trim().min(1, "Requis").max(100),
  last_name: z.string().trim().min(1, "Requis").max(100),
  email: z.string().trim().email("Email invalide").max(255),
  company_name: z.string().trim().max(200).optional().or(z.literal("")),
  company_website: z.string().trim().max(255).optional().or(z.literal("")),
  city: z.string().trim().min(1, "Requis").max(120),
  state_region: z.string().trim().min(1, "Requis").max(120),
  country: z.string().trim().min(1, "Requis").max(120),
  preferred_location: z.string().trim().max(200).optional().or(z.literal("")),
  interests: z.array(z.string()).min(1, "Sélectionnez au moins une formation"),
  notes: z.string().trim().max(2000).optional().or(z.literal("")),
});

const Formations = () => {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    company_name: "",
    company_website: "",
    city: "",
    state_region: "",
    country: "",
    preferred_location: "",
    interests: [] as string[],
    notes: "",
  });

  const toggleInterest = (label: string) => {
    setForm((f) => ({
      ...f,
      interests: f.interests.includes(label)
        ? f.interests.filter((i) => i !== label)
        : [...f.interests, label],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Formulaire invalide");
      return;
    }
    setLoading(true);
    const { error } = await supabase.from("training_signups").insert({
      first_name: parsed.data.first_name,
      last_name: parsed.data.last_name,
      email: parsed.data.email,
      company_name: parsed.data.company_name || null,
      company_website: parsed.data.company_website || null,
      city: parsed.data.city,
      state_region: parsed.data.state_region,
      country: parsed.data.country,
      preferred_location: parsed.data.preferred_location || null,
      interests: parsed.data.interests,
      notes: parsed.data.notes || null,
    });
    setLoading(false);
    if (error) {
      toast.error(t("Une erreur est survenue. Réessayez.", "An error occurred. Please try again."));
      return;
    }
    setSuccess(true);
    toast.success(t("Inscription envoyée !", "Signup sent!"));
  };

  useEffect(() => {
    document.title = t("Inscription Formations | Renovo Crete", "Training Signup | Renovo Crete");
  }, [t]);

  return (
    <>


      <section className="bg-gradient-to-b from-secondary/30 to-background border-b border-border/40">
        <div className="container mx-auto px-4 py-16 sm:py-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium uppercase tracking-wider mb-5">
              <GraduationCap className="w-3.5 h-3.5" />
              {t("Formation Elite Crete Systems", "Elite Crete Systems Training")}
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-4">
              {t("Inscription aux formations", "Training Signup")}
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {t(
                "Vous souhaitez participer à une prochaine formation ? Remplissez ce formulaire et nous reviendrons vers vous au plus vite avec les dates, le lieu et les modalités.",
                "Interested in attending an upcoming training? Fill out this form and we'll get back to you as soon as possible with dates, location and details."
              )}
            </p>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12 sm:py-16">
        {success ? (
          <div className="max-w-2xl mx-auto bg-card border border-border/60 rounded-2xl p-10 text-center shadow-sm">
            <div className="w-14 h-14 rounded-full bg-primary/10 text-primary inline-flex items-center justify-center mb-4">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h2 className="font-heading text-2xl font-bold mb-2">
              {t("Merci pour votre inscription !", "Thank you for signing up!")}
            </h2>
            <p className="text-muted-foreground">
              {t(
                "Notre équipe vous recontactera très prochainement avec les informations détaillées sur la prochaine session.",
                "Our team will contact you shortly with detailed information about the next session."
              )}
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="max-w-3xl mx-auto bg-card border border-border/60 rounded-2xl p-6 sm:p-10 shadow-sm space-y-6"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <Field label={t("Prénom", "First Name")} required>
                <Input value={form.first_name} onChange={(e) => setForm({ ...form, first_name: e.target.value })} maxLength={100} required />
              </Field>
              <Field label={t("Nom", "Last Name")} required>
                <Input value={form.last_name} onChange={(e) => setForm({ ...form, last_name: e.target.value })} maxLength={100} required />
              </Field>
            </div>

            <Field label="Email" required>
              <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} maxLength={255} required />
            </Field>

            <div className="grid sm:grid-cols-2 gap-5">
              <Field label={t("Nom de l'entreprise", "Company name")}>
                <Input placeholder={t("si applicable", "if applicable")} value={form.company_name} onChange={(e) => setForm({ ...form, company_name: e.target.value })} maxLength={200} />
              </Field>
              <Field label={t("Site web de l'entreprise", "Company website")}>
                <Input placeholder={t("si applicable", "if applicable")} value={form.company_website} onChange={(e) => setForm({ ...form, company_website: e.target.value })} maxLength={255} />
              </Field>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <Field label={t("Ville", "City")} required>
                <Input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} maxLength={120} required />
              </Field>
              <Field label={t("Région / État / Province", "State/Province/Region")} required>
                <Input value={form.state_region} onChange={(e) => setForm({ ...form, state_region: e.target.value })} maxLength={120} required />
              </Field>
            </div>

            <Field label={t("Pays", "Country")} required>
              <Input value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} maxLength={120} required />
            </Field>

            <Field label={t("Lieu de formation souhaité (optionnel)", "Preferred training location (optional)")}>
              <Input value={form.preferred_location} onChange={(e) => setForm({ ...form, preferred_location: e.target.value })} maxLength={200} />
            </Field>

            <div>
              <Label className="text-sm font-medium">
                {t("Je suis intéressé(e) par la formation sur", "I'm interested in training on")}
                <span className="text-destructive ml-1">*</span>
              </Label>
              <div className="mt-3 grid sm:grid-cols-2 gap-2.5 rounded-xl border border-border/60 bg-background/50 p-4">
                {TRAININGS.map((label) => {
                  const checked = form.interests.includes(label);
                  return (
                    <label
                      key={label}
                      className="flex items-start gap-3 text-sm leading-snug cursor-pointer rounded-lg px-2 py-1.5 hover:bg-secondary/40 transition-colors"
                    >
                      <Checkbox checked={checked} onCheckedChange={() => toggleInterest(label)} className="mt-0.5" />
                      <span className={checked ? "text-foreground" : "text-muted-foreground"}>{label}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            <Field label={t("Notes additionnelles (optionnel)", "Additional notes (optional)")}>
              <Textarea
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                maxLength={2000}
                rows={4}
                placeholder={t("Disponibilités, niveau d'expérience, attentes…", "Availability, experience level, expectations…")}
              />
            </Field>

            <div className="pt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <p className="text-xs text-muted-foreground">
                {t(
                  "Les champs marqués d'un * sont obligatoires.",
                  "Fields marked with * are required."
                )}
              </p>
              <Button type="submit" size="lg" disabled={loading} className="min-w-[200px]">
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {t("Envoi…", "Sending…")}
                  </>
                ) : (
                  t("Envoyer mon inscription", "Submit signup")
                )}
              </Button>
            </div>
          </form>
        )}
      </section>
    </>
  );
};

const Field = ({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) => (
  <div className="space-y-1.5">
    <Label className="text-sm font-medium">
      {label}
      {required && <span className="text-destructive ml-1">*</span>}
    </Label>
    {children}
  </div>
);

export default Formations;
