import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Upload, Eye, Palette, ArrowRight, ImageIcon, Check, Info, Layers, Paintbrush } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageHeader from "@/components/PageHeader";

const finishes = [
  { name: "Métallique argent", color: "bg-gradient-to-br from-gray-300 to-gray-500" },
  { name: "Métallique bleu", color: "bg-gradient-to-br from-blue-300 to-blue-600" },
  { name: "Marbré blanc", color: "bg-gradient-to-br from-gray-100 to-gray-300" },
  { name: "Noir anthracite", color: "bg-gradient-to-br from-gray-700 to-gray-900" },
  { name: "Cuivre doré", color: "bg-gradient-to-br from-amber-400 to-amber-700" },
  { name: "Vert émeraude", color: "bg-gradient-to-br from-emerald-400 to-emerald-700" },
  { name: "Gris perle", color: "bg-gradient-to-br from-gray-200 to-gray-400" },
  { name: "Océan profond", color: "bg-gradient-to-br from-blue-500 to-blue-900" },
  { name: "Flocons multicolores", color: "bg-gradient-to-br from-blue-200 via-amber-200 to-gray-400" },
  { name: "Blanc glacier", color: "bg-gradient-to-br from-blue-50 to-gray-200" },
  { name: "Rouge rubis", color: "bg-gradient-to-br from-red-400 to-red-700" },
  { name: "Terre cuite", color: "bg-gradient-to-br from-orange-300 to-orange-600" },
];

const surfaceOptions = ["Sol — garage", "Sol — sous-sol", "Sol — cuisine / salon", "Sol — commercial", "Sol — industriel", "Comptoir", "Table", "Mur / escalier", "Terrasse / extérieur", "Autre"];

const textureOptions = ["Lisse brillant", "Lisse satiné", "Antidérapant léger", "Antidérapant fort", "Texturé"];

const Visualisation = () => {
  const [selectedFinish, setSelectedFinish] = useState<string | null>(null);
  const [selectedSurface, setSelectedSurface] = useState<string | null>(null);
  const [selectedTexture, setSelectedTexture] = useState<string | null>(null);
  const [uploaded, setUploaded] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", notes: "" });

  const inputClass = "w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors text-sm";

  const isComplete = selectedFinish && selectedSurface && selectedTexture;

  return (
    <>
      <PageHeader
        badge="Visualisation"
        title="Simulez votre"
        highlight="projet"
        description="Choisissez vos options, uploadez une photo et recevez un rendu personnalisé de votre futur espace."
      />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-5 gap-10">
            {/* Options — 3 columns */}
            <div className="lg:col-span-3 space-y-10">
              {/* Step 1: Surface */}
              <div>
                <h2 className="font-heading text-lg font-700 mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-gradient-brand text-primary-foreground flex items-center justify-center text-sm font-700">1</span>
                  <Layers className="w-4 h-4 text-primary" />
                  Type de surface
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {surfaceOptions.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSurface(s)}
                      className={`p-3 rounded-lg text-sm font-medium transition-all border text-left ${
                        selectedSurface === s
                          ? "border-primary bg-primary/8 text-primary"
                          : "border-border text-muted-foreground hover:border-primary/20"
                      }`}
                    >
                      {selectedSurface === s && <Check className="w-3.5 h-3.5 inline mr-1.5" />}
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Finish */}
              <div>
                <h2 className="font-heading text-lg font-700 mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-gradient-brand text-primary-foreground flex items-center justify-center text-sm font-700">2</span>
                  <Palette className="w-4 h-4 text-primary" />
                  Style & couleur
                </h2>
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                  {finishes.map((f) => (
                    <button
                      key={f.name}
                      onClick={() => setSelectedFinish(f.name)}
                      className={`rounded-xl overflow-hidden transition-all ${
                        selectedFinish === f.name ? "ring-2 ring-primary ring-offset-2" : "hover:ring-1 hover:ring-primary/30"
                      }`}
                    >
                      <div className={`aspect-square ${f.color}`} />
                      <span className="block text-xs font-medium py-1.5 text-center leading-tight">{f.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 3: Texture */}
              <div>
                <h2 className="font-heading text-lg font-700 mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-gradient-brand text-primary-foreground flex items-center justify-center text-sm font-700">3</span>
                  <Paintbrush className="w-4 h-4 text-primary" />
                  Texture de finition
                </h2>
                <div className="flex flex-wrap gap-2.5">
                  {textureOptions.map((t) => (
                    <button
                      key={t}
                      onClick={() => setSelectedTexture(t)}
                      className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all border ${
                        selectedTexture === t
                          ? "border-primary bg-primary/8 text-primary"
                          : "border-border text-muted-foreground hover:border-primary/20"
                      }`}
                    >
                      {selectedTexture === t && <Check className="w-3.5 h-3.5 inline mr-1.5" />}
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 4: Upload */}
              <div>
                <h2 className="font-heading text-lg font-700 mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-gradient-brand text-primary-foreground flex items-center justify-center text-sm font-700">4</span>
                  <Upload className="w-4 h-4 text-primary" />
                  Photo de votre espace
                </h2>
                <div
                  className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer ${
                    uploaded ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"
                  }`}
                  onClick={() => setUploaded(true)}
                >
                  {uploaded ? (
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Check className="w-6 h-6 text-primary" />
                      </div>
                      <span className="text-sm font-medium text-primary">Photo uploadée avec succès</span>
                      <span className="text-xs text-muted-foreground">mon-espace.jpg — 2.4 MB</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      <Upload className="w-10 h-10 text-muted-foreground/40" />
                      <span className="text-sm font-medium">Glissez-déposez ou cliquez pour uploader</span>
                      <span className="text-xs text-muted-foreground">JPG, PNG — Max 10 MB</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Step 5: Details */}
              <div>
                <h2 className="font-heading text-lg font-700 mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-gradient-brand text-primary-foreground flex items-center justify-center text-sm font-700">5</span>
                  Vos coordonnées
                </h2>
                <div className="space-y-4 rounded-xl border border-border p-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div><label className="block text-sm font-medium mb-1.5">Nom complet</label><input className={inputClass} value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Votre nom" /></div>
                    <div><label className="block text-sm font-medium mb-1.5">Email</label><input type="email" className={inputClass} value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="votre@email.com" /></div>
                  </div>
                  <div><label className="block text-sm font-medium mb-1.5">Téléphone</label><input type="tel" className={inputClass} value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="(555) 123-4567" /></div>
                  <div><label className="block text-sm font-medium mb-1.5">Notes supplémentaires</label><textarea className={`${inputClass} min-h-[80px]`} value={formData.notes} onChange={(e) => setFormData({ ...formData, notes: e.target.value })} placeholder="Superficie, contraintes, questions..." /></div>
                </div>
              </div>
            </div>

            {/* Preview panel — 2 columns */}
            <div className="lg:col-span-2">
              <div className="sticky top-24">
                <h2 className="font-heading text-lg font-700 mb-4 flex items-center gap-2">
                  <Eye className="w-5 h-5 text-primary" />
                  Aperçu de votre sélection
                </h2>
                <div className="rounded-xl border border-border bg-secondary aspect-[4/3] flex items-center justify-center overflow-hidden mb-4">
                  {isComplete ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="w-full h-full flex flex-col items-center justify-center p-6 text-center"
                    >
                      <Palette className="w-14 h-14 text-primary mb-4" />
                      <h3 className="font-heading text-lg font-700 mb-3">Configuration sélectionnée</h3>
                      <div className="space-y-1.5 text-sm">
                        <p className="text-muted-foreground"><strong className="text-foreground">Surface :</strong> {selectedSurface}</p>
                        <p className="text-muted-foreground"><strong className="text-foreground">Style :</strong> {selectedFinish}</p>
                        <p className="text-muted-foreground"><strong className="text-foreground">Texture :</strong> {selectedTexture}</p>
                        {uploaded && <p className="text-primary font-medium mt-2">✓ Photo uploadée</p>}
                      </div>
                    </motion.div>
                  ) : (
                    <div className="text-center p-6">
                      <ImageIcon className="w-14 h-14 text-muted-foreground/20 mx-auto mb-3" />
                      <p className="text-muted-foreground text-sm">Sélectionnez surface, style et texture pour voir l'aperçu</p>
                    </div>
                  )}
                </div>

                <div className="rounded-lg bg-primary/5 border border-primary/10 p-4 flex gap-3 mb-6">
                  <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Le rendu est indicatif et soumis à validation technique par notre équipe. Nous vous enverrons un rendu réaliste personnalisé sous 48h après réception de votre demande.
                  </p>
                </div>

                <Button asChild size="lg" className="w-full bg-gradient-brand-deep hover:opacity-90 text-base py-6">
                  <Link to="/devis">
                    Recevoir un rendu personnalisé
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                <p className="text-xs text-muted-foreground text-center mt-3">
                  Gratuit et sans engagement — réponse sous 48h
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
