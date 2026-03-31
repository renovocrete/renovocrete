import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Upload, Eye, Palette, ArrowRight, ImageIcon, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageHeader from "@/components/PageHeader";

const finishes = [
  { name: "Métallique argent", color: "bg-gradient-to-br from-gray-300 to-gray-500" },
  { name: "Bleu océan", color: "bg-gradient-to-br from-blue-400 to-blue-700" },
  { name: "Marbre blanc", color: "bg-gradient-to-br from-gray-100 to-gray-300" },
  { name: "Noir anthracite", color: "bg-gradient-to-br from-gray-700 to-gray-900" },
  { name: "Cuivre doré", color: "bg-gradient-to-br from-amber-400 to-amber-700" },
  { name: "Vert émeraude", color: "bg-gradient-to-br from-emerald-400 to-emerald-700" },
  { name: "Gris perle", color: "bg-gradient-to-br from-gray-200 to-gray-400" },
  { name: "Rouge rubis", color: "bg-gradient-to-br from-red-400 to-red-700" },
];

const surfaceOptions = ["Sol", "Comptoir", "Table", "Mur", "Escalier", "Autre"];

const Visualisation = () => {
  const [selectedFinish, setSelectedFinish] = useState<string | null>(null);
  const [selectedSurface, setSelectedSurface] = useState<string | null>(null);
  const [uploaded, setUploaded] = useState(false);

  return (
    <>
      <PageHeader
        badge="Visualisation"
        title="Simulez votre"
        highlight="projet"
        description="Choisissez vos options, uploadez une photo de votre espace et visualisez le résultat potentiel."
      />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Options */}
            <div className="space-y-10">
              {/* Surface type */}
              <div>
                <h2 className="font-heading text-xl font-700 mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-gradient-brand text-primary-foreground flex items-center justify-center text-sm font-700">1</span>
                  Type de surface
                </h2>
                <div className="grid grid-cols-3 gap-3">
                  {surfaceOptions.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSurface(s)}
                      className={`p-3 rounded-lg text-sm font-medium transition-all border ${
                        selectedSurface === s
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border text-muted-foreground hover:border-primary/30"
                      }`}
                    >
                      {selectedSurface === s && <Check className="w-3 h-3 inline mr-1" />}
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Finish */}
              <div>
                <h2 className="font-heading text-xl font-700 mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-gradient-brand text-primary-foreground flex items-center justify-center text-sm font-700">2</span>
                  Finition souhaitée
                </h2>
                <div className="grid grid-cols-4 gap-3">
                  {finishes.map((f) => (
                    <button
                      key={f.name}
                      onClick={() => setSelectedFinish(f.name)}
                      className={`rounded-xl overflow-hidden transition-all ${
                        selectedFinish === f.name ? "ring-2 ring-primary ring-offset-2" : "hover:ring-1 hover:ring-primary/30"
                      }`}
                    >
                      <div className={`aspect-square ${f.color}`} />
                      <span className="block text-xs font-medium py-1.5 text-center">{f.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Upload */}
              <div>
                <h2 className="font-heading text-xl font-700 mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-gradient-brand text-primary-foreground flex items-center justify-center text-sm font-700">3</span>
                  Photo de votre espace
                </h2>
                <div
                  className={`border-2 border-dashed rounded-xl p-10 text-center transition-colors cursor-pointer ${
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
                      <Upload className="w-10 h-10 text-muted-foreground" />
                      <span className="text-sm font-medium">Glissez-déposez ou cliquez pour uploader</span>
                      <span className="text-xs text-muted-foreground">JPG, PNG — Max 10 MB</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Preview */}
            <div>
              <h2 className="font-heading text-xl font-700 mb-4 flex items-center gap-2">
                <Eye className="w-5 h-5 text-primary" />
                Aperçu
              </h2>
              <div className="rounded-xl border border-border bg-secondary aspect-[4/3] flex items-center justify-center overflow-hidden">
                {selectedFinish && selectedSurface ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="w-full h-full flex flex-col items-center justify-center p-8 text-center"
                  >
                    <Palette className="w-16 h-16 text-primary mb-4" />
                    <h3 className="font-heading text-lg font-700 mb-2">Configuration sélectionnée</h3>
                    <p className="text-muted-foreground text-sm mb-1"><strong>Surface :</strong> {selectedSurface}</p>
                    <p className="text-muted-foreground text-sm mb-4"><strong>Finition :</strong> {selectedFinish}</p>
                    <p className="text-xs text-muted-foreground max-w-sm">
                      Pour une visualisation réaliste sur votre photo, notre équipe vous enverra un rendu personnalisé après réception de votre demande.
                    </p>
                  </motion.div>
                ) : (
                  <div className="text-center p-8">
                    <ImageIcon className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                    <p className="text-muted-foreground text-sm">Sélectionnez un type de surface et une finition pour voir l'aperçu</p>
                  </div>
                )}
              </div>

              <div className="mt-6">
                <Button asChild size="lg" className="w-full bg-gradient-brand-deep hover:opacity-90 text-lg py-6">
                  <Link to="/devis">
                    Recevoir un rendu personnalisé
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                <p className="text-xs text-muted-foreground text-center mt-2">
                  Notre équipe vous enverra un rendu réaliste sous 48h
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
