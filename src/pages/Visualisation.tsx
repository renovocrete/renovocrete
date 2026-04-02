import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Upload, Eye, Palette, ArrowRight, ImageIcon, Check, Info, Layers, Paintbrush, Sun, Moon, Grid3X3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageHeader from "@/components/PageHeader";
import { useLanguage } from "@/i18n/LanguageContext";

const Visualisation = () => {
  const { t } = useLanguage();

  const surfaceOptions = [
    t("Sol — garage", "Floor — garage"), t("Sol — terrasse / piscine", "Floor — terrace / pool"),
    t("Sol — cuisine / salon", "Floor — kitchen / living"), t("Sol — commercial", "Floor — commercial"),
    t("Sol — industriel", "Floor — industrial"), t("Comptoir", "Countertop"),
    t("Table", "Table"), t("Mur / escalier", "Wall / stairs"),
    t("Autre", "Other"),
  ];

  const locationOptions = [t("Intérieur", "Interior"), t("Extérieur", "Exterior")];

  const categoryOptions = [
    t("Résidentiel", "Residential"), t("Commercial", "Commercial"),
    t("Industriel", "Industrial"), t("Hospitality", "Hospitality"),
  ];

  const styleOptions = [
    t("Métallique", "Metallic"), t("Flocons (flake)", "Flake"),
    t("Quartz", "Quartz"), t("Marbré", "Marbled"),
    t("Solide", "Solid"), t("Décoratif premium", "Premium decorative"),
    t("Antidérapant extérieur", "Outdoor non-slip"), t("Industriel haute résistance", "High-resistance industrial"),
  ];

  const finishOptions = [t("Brillant", "Gloss"), t("Satiné", "Satin"), t("Mat", "Matte")];
  const textureOptions = [t("Lisse", "Smooth"), t("Antidérapant léger", "Light non-slip"), t("Antidérapant fort", "Heavy non-slip"), t("Texturé", "Textured")];

  const colorOptions = [
    { name: t("Argent métallique", "Metallic Silver"), color: "bg-gradient-to-br from-gray-300 to-gray-500" },
    { name: t("Bleu océan", "Ocean Blue"), color: "bg-gradient-to-br from-blue-400 to-blue-700" },
    { name: t("Blanc glacier", "Glacier White"), color: "bg-gradient-to-br from-blue-50 to-gray-200" },
    { name: t("Anthracite", "Anthracite"), color: "bg-gradient-to-br from-gray-600 to-gray-900" },
    { name: t("Cuivre doré", "Golden Copper"), color: "bg-gradient-to-br from-amber-400 to-amber-700" },
    { name: t("Vert émeraude", "Emerald Green"), color: "bg-gradient-to-br from-emerald-400 to-emerald-700" },
    { name: t("Gris perle", "Pearl Grey"), color: "bg-gradient-to-br from-gray-200 to-gray-400" },
    { name: t("Bleu profond", "Deep Blue"), color: "bg-gradient-to-br from-blue-600 to-blue-900" },
    { name: t("Flocons multicolores", "Multicolor Flakes"), color: "bg-gradient-to-br from-blue-200 via-amber-200 to-gray-400" },
    { name: t("Rouge rubis", "Ruby Red"), color: "bg-gradient-to-br from-red-400 to-red-700" },
    { name: t("Terre cuite", "Terracotta"), color: "bg-gradient-to-br from-orange-300 to-orange-600" },
    { name: t("Sable tropical", "Tropical Sand"), color: "bg-gradient-to-br from-amber-200 to-amber-400" },
  ];

  const [selectedSurface, setSelectedSurface] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [selectedFinish, setSelectedFinish] = useState<string | null>(null);
  const [selectedTexture, setSelectedTexture] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [uploaded, setUploaded] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", notes: "" });

  const inputClass = "w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors text-sm";
  const isComplete = selectedSurface && selectedStyle && selectedColor;
  const stepNum = (n: number) => (
    <span className="w-8 h-8 rounded-full bg-gradient-brand text-primary-foreground flex items-center justify-center text-sm font-bold flex-shrink-0">{n}</span>
  );

  const OptionButton = ({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) => (
    <button onClick={onClick} className={`p-3 rounded-lg text-sm font-medium transition-all border text-left ${selected ? "border-primary bg-primary/8 text-primary" : "border-border text-muted-foreground hover:border-primary/20"}`}>
      {selected && <Check className="w-3.5 h-3.5 inline mr-1.5" />}{label}
    </button>
  );

  return (
    <>
      <PageHeader
        badge={t("Visualisation", "Visualizer")}
        title={t("Simulez votre", "Simulate your")}
        highlight={t("projet", "project")}
        description={t("Choisissez vos options, uploadez une photo et recevez un rendu personnalisé de votre futur espace.", "Choose your options, upload a photo and receive a personalized render of your future space.")}
      />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-5 gap-10">
            <div className="lg:col-span-3 space-y-10">
              {/* 1 Upload */}
              <div>
                <h2 className="font-heading text-lg font-bold mb-4 flex items-center gap-2">{stepNum(1)}<Upload className="w-4 h-4 text-primary" />{t("Photo de votre espace", "Photo of your space")}</h2>
                <div className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer ${uploaded ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"}`} onClick={() => setUploaded(true)}>
                  {uploaded ? (
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center"><Check className="w-6 h-6 text-primary" /></div>
                      <span className="text-sm font-medium text-primary">{t("Photo uploadée avec succès", "Photo uploaded successfully")}</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      <Upload className="w-10 h-10 text-muted-foreground/40" />
                      <span className="text-sm font-medium">{t("Glissez-déposez ou cliquez pour uploader", "Drag and drop or click to upload")}</span>
                      <span className="text-xs text-muted-foreground">JPG, PNG — Max 10 MB</span>
                    </div>
                  )}
                </div>
              </div>

              {/* 2 Surface */}
              <div>
                <h2 className="font-heading text-lg font-bold mb-4 flex items-center gap-2">{stepNum(2)}<Layers className="w-4 h-4 text-primary" />{t("Type de surface", "Surface type")}</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {surfaceOptions.map((s) => <OptionButton key={s} label={s} selected={selectedSurface === s} onClick={() => setSelectedSurface(s)} />)}
                </div>
              </div>

              {/* 3 Location */}
              <div>
                <h2 className="font-heading text-lg font-bold mb-4 flex items-center gap-2">{stepNum(3)}{selectedLocation === locationOptions[0] ? <Moon className="w-4 h-4 text-primary" /> : <Sun className="w-4 h-4 text-primary" />}{t("Intérieur / Extérieur", "Interior / Exterior")}</h2>
                <div className="flex gap-2.5">
                  {locationOptions.map((l) => <OptionButton key={l} label={l} selected={selectedLocation === l} onClick={() => setSelectedLocation(l)} />)}
                </div>
              </div>

              {/* 4 Category */}
              <div>
                <h2 className="font-heading text-lg font-bold mb-4 flex items-center gap-2">{stepNum(4)}<Grid3X3 className="w-4 h-4 text-primary" />{t("Catégorie de projet", "Project category")}</h2>
                <div className="flex flex-wrap gap-2.5">
                  {categoryOptions.map((c) => <OptionButton key={c} label={c} selected={selectedCategory === c} onClick={() => setSelectedCategory(c)} />)}
                </div>
              </div>

              {/* 5 Style */}
              <div>
                <h2 className="font-heading text-lg font-bold mb-4 flex items-center gap-2">{stepNum(5)}<Palette className="w-4 h-4 text-primary" />{t("Style / système", "Style / system")}</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {styleOptions.map((s) => <OptionButton key={s} label={s} selected={selectedStyle === s} onClick={() => setSelectedStyle(s)} />)}
                </div>
              </div>

              {/* 6 Finish */}
              <div>
                <h2 className="font-heading text-lg font-bold mb-4 flex items-center gap-2">{stepNum(6)}{t("Finition", "Finish")}</h2>
                <div className="flex flex-wrap gap-2.5">
                  {finishOptions.map((f) => <OptionButton key={f} label={f} selected={selectedFinish === f} onClick={() => setSelectedFinish(f)} />)}
                </div>
              </div>

              {/* 7 Texture */}
              <div>
                <h2 className="font-heading text-lg font-bold mb-4 flex items-center gap-2">{stepNum(7)}<Paintbrush className="w-4 h-4 text-primary" />{t("Texture", "Texture")}</h2>
                <div className="flex flex-wrap gap-2.5">
                  {textureOptions.map((te) => <OptionButton key={te} label={te} selected={selectedTexture === te} onClick={() => setSelectedTexture(te)} />)}
                </div>
              </div>

              {/* 8 Color */}
              <div>
                <h2 className="font-heading text-lg font-bold mb-4 flex items-center gap-2">{stepNum(8)}{t("Couleur", "Color")}</h2>
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                  {colorOptions.map((c) => (
                    <button key={c.name} onClick={() => setSelectedColor(c.name)} className={`rounded-xl overflow-hidden transition-all ${selectedColor === c.name ? "ring-2 ring-primary ring-offset-2" : "hover:ring-1 hover:ring-primary/30"}`}>
                      <div className={`aspect-square ${c.color}`} />
                      <span className="block text-xs font-medium py-1.5 text-center leading-tight">{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 9 Details */}
              <div>
                <h2 className="font-heading text-lg font-bold mb-4 flex items-center gap-2">{stepNum(9)}{t("Informations projet", "Project information")}</h2>
                <div className="space-y-4 rounded-xl border border-border p-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div><label className="block text-sm font-medium mb-1.5">{t("Nom complet", "Full name")}</label><input className={inputClass} value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder={t("Votre nom", "Your name")} /></div>
                    <div><label className="block text-sm font-medium mb-1.5">Email</label><input type="email" className={inputClass} value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="email@example.com" /></div>
                  </div>
                  <div><label className="block text-sm font-medium mb-1.5">{t("Téléphone", "Phone")}</label><input type="tel" className={inputClass} value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="0690 XX XX XX" /></div>
                  <div><label className="block text-sm font-medium mb-1.5">{t("Notes supplémentaires", "Additional notes")}</label><textarea className={`${inputClass} min-h-[80px]`} value={formData.notes} onChange={(e) => setFormData({ ...formData, notes: e.target.value })} placeholder={t("Superficie, contraintes, questions...", "Area, constraints, questions...")} /></div>
                </div>
              </div>
            </div>

            {/* Preview panel */}
            <div className="lg:col-span-2">
              <div className="sticky top-24">
                <h2 className="font-heading text-lg font-bold mb-4 flex items-center gap-2"><Eye className="w-5 h-5 text-primary" />{t("Aperçu de votre sélection", "Your selection preview")}</h2>
                <div className="rounded-xl border border-border bg-secondary aspect-[4/3] flex items-center justify-center overflow-hidden mb-4">
                  {isComplete ? (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
                      <Palette className="w-14 h-14 text-primary mb-4" />
                      <h3 className="font-heading text-lg font-bold mb-3">{t("Configuration sélectionnée", "Selected configuration")}</h3>
                      <div className="space-y-1.5 text-sm">
                        {selectedSurface && <p className="text-muted-foreground"><strong className="text-foreground">{t("Surface", "Surface")} :</strong> {selectedSurface}</p>}
                        {selectedLocation && <p className="text-muted-foreground"><strong className="text-foreground">{t("Emplacement", "Location")} :</strong> {selectedLocation}</p>}
                        {selectedCategory && <p className="text-muted-foreground"><strong className="text-foreground">{t("Catégorie", "Category")} :</strong> {selectedCategory}</p>}
                        {selectedStyle && <p className="text-muted-foreground"><strong className="text-foreground">Style :</strong> {selectedStyle}</p>}
                        {selectedFinish && <p className="text-muted-foreground"><strong className="text-foreground">{t("Finition", "Finish")} :</strong> {selectedFinish}</p>}
                        {selectedTexture && <p className="text-muted-foreground"><strong className="text-foreground">Texture :</strong> {selectedTexture}</p>}
                        {selectedColor && <p className="text-muted-foreground"><strong className="text-foreground">{t("Couleur", "Color")} :</strong> {selectedColor}</p>}
                        {uploaded && <p className="text-primary font-medium mt-2">✓ {t("Photo uploadée", "Photo uploaded")}</p>}
                      </div>
                    </motion.div>
                  ) : (
                    <div className="text-center p-6">
                      <ImageIcon className="w-14 h-14 text-muted-foreground/20 mx-auto mb-3" />
                      <p className="text-muted-foreground text-sm">{t("Sélectionnez surface, style et couleur pour voir l'aperçu", "Select surface, style and color to see the preview")}</p>
                    </div>
                  )}
                </div>

                <div className="rounded-lg bg-primary/5 border border-primary/10 p-4 flex gap-3 mb-6">
                  <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {t(
                      "Aperçu indicatif : la validation finale dépend de l'analyse du projet, de l'état du support et des recommandations techniques. Nous vous enverrons un rendu réaliste personnalisé sous 48h.",
                      "Indicative preview: final validation depends on project analysis, substrate condition and technical recommendations. We'll send you a personalized realistic render within 48h."
                    )}
                  </p>
                </div>

                <Button asChild size="lg" className="w-full bg-gradient-brand-deep hover:opacity-90 text-base py-6">
                  <Link to="/devis">
                    {t("Recevoir un rendu personnalisé", "Receive a personalized render")}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                <p className="text-xs text-muted-foreground text-center mt-3">
                  {t("Gratuit et sans engagement — réponse sous 48h", "Free, no commitment — response within 48h")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Visualisation;
