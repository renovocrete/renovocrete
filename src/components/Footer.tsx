import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/renovo-crete-logo.png";

const Footer = () => {
  return (
    <footer className="bg-foreground text-primary-foreground">
      {/* CTA Banner */}
      <div className="container mx-auto px-4 -mt-0">
        <div className="rounded-2xl bg-gradient-brand-deep p-8 sm:p-12 text-center relative overflow-hidden -translate-y-12">
          <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-primary-light/10" />
          <div className="absolute -bottom-12 -left-12 w-36 h-36 rounded-full bg-primary-foreground/5" />
          <div className="relative z-10">
            <h2 className="font-heading text-2xl sm:text-3xl font-700 text-primary-foreground tracking-tight mb-3">
              Prêt à transformer votre espace ?
            </h2>
            <p className="text-primary-foreground/75 max-w-lg mx-auto mb-6">
              Obtenez une estimation gratuite et personnalisée sous 48h.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button asChild size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 shadow-lg">
                <Link to="/devis">Demander un devis <ArrowRight className="w-4 h-4 ml-2" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
                <Link to="/contact">Nous contacter</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer content */}
      <div className="container mx-auto px-4 pb-12 -mt-2">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2">
            <Link to="/">
              <img src={logo} alt="Renovo Crete" className="h-10 w-auto brightness-0 invert mb-4" />
            </Link>
            <p className="text-primary-foreground/55 text-sm leading-relaxed max-w-sm">
              Spécialistes en revêtements époxy et résine décorative premium pour sols, comptoirs, tables et toutes surfaces adhérentes. Résidentiel, commercial et industriel.
            </p>
          </div>

          <div>
            <h4 className="font-heading font-600 mb-4 text-sm uppercase tracking-wider text-primary-foreground/80">Navigation</h4>
            <ul className="space-y-2.5 text-sm text-primary-foreground/55">
              <li><Link to="/" className="hover:text-primary-light transition-colors">Accueil</Link></li>
              <li><Link to="/prestations" className="hover:text-primary-light transition-colors">Prestations</Link></li>
              <li><Link to="/types-de-projets" className="hover:text-primary-light transition-colors">Types de projets</Link></li>
              <li><Link to="/galerie" className="hover:text-primary-light transition-colors">Galerie</Link></li>
              <li><Link to="/visualisation" className="hover:text-primary-light transition-colors">Visualisation</Link></li>
              <li><Link to="/devis" className="hover:text-primary-light transition-colors">Devis</Link></li>
              <li><Link to="/contact" className="hover:text-primary-light transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-600 mb-4 text-sm uppercase tracking-wider text-primary-foreground/80">Contact</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/55">
              <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-primary-light" />(555) 123-4567</li>
              <li className="flex items-center gap-2"><Mail className="w-4 h-4 text-primary-light" />info@renovocrete.com</li>
              <li className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary-light" />Grand Montréal</li>
            </ul>
            <div className="mt-4 text-xs text-primary-foreground/40">
              <p>Lun–Ven : 8h – 18h</p>
              <p>Sam : 9h – 14h</p>
            </div>
          </div>

          <div>
            <h4 className="font-heading font-600 mb-4 text-sm uppercase tracking-wider text-primary-foreground/80">Zones desservies</h4>
            <ul className="space-y-1 text-sm text-primary-foreground/55">
              <li>Montréal</li>
              <li>Laval</li>
              <li>Rive-Sud</li>
              <li>Rive-Nord</li>
              <li>Laurentides</li>
              <li>Lanaudière</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-primary-foreground/35">
          <p>© {new Date().getFullYear()} Renovo Crete. Tous droits réservés.</p>
          <div className="flex gap-6">
            <span className="hover:text-primary-foreground/60 cursor-pointer transition-colors">Politique de confidentialité</span>
            <span className="hover:text-primary-foreground/60 cursor-pointer transition-colors">Conditions d'utilisation</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
