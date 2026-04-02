import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, ArrowRight, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/LanguageContext";
import logo from "@/assets/renovo-crete-logo.png";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-foreground text-primary-foreground">
      {/* CTA Banner */}
      <div className="container mx-auto px-4">
        <div className="rounded-2xl bg-gradient-brand-deep p-8 sm:p-12 text-center relative overflow-hidden -translate-y-12">
          <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-primary-light/10" />
          <div className="absolute -bottom-12 -left-12 w-36 h-36 rounded-full bg-primary-foreground/5" />
          <div className="relative z-10">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-primary-foreground tracking-tight mb-3">
              {t("Prêt à transformer votre espace ?", "Ready to transform your space?")}
            </h2>
            <p className="text-primary-foreground/75 max-w-lg mx-auto mb-6">
              {t("Obtenez une estimation gratuite et personnalisée sous 48h.", "Get a free, personalized estimate within 48h.")}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button asChild size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 shadow-lg">
                <Link to="/devis">{t("Demander un devis", "Request a quote")} <ArrowRight className="w-4 h-4 ml-2" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
                <Link to="/contact">{t("Nous contacter", "Contact us")}</Link>
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
              {t(
                "Spécialistes en revêtements époxy et résine décorative premium pour sols, comptoirs, tables et toutes surfaces adhérentes. Basés à Saint-Martin, nous intervenons dans toute la Caraïbe.",
                "Specialists in premium epoxy and decorative resin coatings for floors, countertops, tables and all adhesive surfaces. Based in Saint-Martin, we serve the entire Caribbean."
              )}
            </p>
            <div className="flex items-center gap-3 mt-4">
              <a href="https://www.instagram.com/renovocrete" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://www.tiktok.com/@renovocrete" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors text-xs font-bold">
                TT
              </a>
              <a href="https://www.facebook.com/renovocrete" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors text-xs font-bold">
                FB
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-heading font-semibold mb-4 text-sm uppercase tracking-wider text-primary-foreground/80">Navigation</h4>
            <ul className="space-y-2.5 text-sm text-primary-foreground/55">
              <li><Link to="/" className="hover:text-primary-light transition-colors">{t("Accueil", "Home")}</Link></li>
              <li><Link to="/prestations" className="hover:text-primary-light transition-colors">{t("Prestations", "Services")}</Link></li>
              <li><Link to="/types-de-projets" className="hover:text-primary-light transition-colors">{t("Types de projets", "Project Types")}</Link></li>
              <li><Link to="/galerie" className="hover:text-primary-light transition-colors">{t("Galerie", "Gallery")}</Link></li>
              <li><Link to="/visualisation" className="hover:text-primary-light transition-colors">{t("Visualisation", "Visualizer")}</Link></li>
              <li><Link to="/devis" className="hover:text-primary-light transition-colors">{t("Devis", "Quote")}</Link></li>
              <li><Link to="/contact" className="hover:text-primary-light transition-colors">Contact</Link></li>
              <li><Link to="/qui-sommes-nous" className="hover:text-primary-light transition-colors">{t("Qui sommes-nous", "About us")}</Link></li>
              <li><Link to="/partenaires" className="hover:text-primary-light transition-colors">{t("Partenaires", "Partners")}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold mb-4 text-sm uppercase tracking-wider text-primary-foreground/80">Contact</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/55">
              <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-primary-light" /><a href="tel:+590690535834" className="hover:text-primary-light transition-colors">0690 53 58 34</a></li>
              <li className="flex items-center gap-2"><Mail className="w-4 h-4 text-primary-light" /><a href="mailto:renovocrete@gmail.com" className="hover:text-primary-light transition-colors">renovocrete@gmail.com</a></li>
              <li className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary-light" />Saint-Martin</li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold mb-4 text-sm uppercase tracking-wider text-primary-foreground/80">{t("Zones desservies", "Service Areas")}</h4>
            <ul className="space-y-1 text-sm text-primary-foreground/55">
              <li className="font-medium text-primary-foreground/70">Saint-Martin / Sint Maarten</li>
              <li>Saint-Barth</li>
              <li>Guadeloupe</li>
              <li>Martinique</li>
              <li>Anguilla</li>
              <li className="text-primary-foreground/40">{t("+ Caraïbe anglophone", "+ English Caribbean")}</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-primary-foreground/35">
          <p>© {new Date().getFullYear()} Renovo Crete. {t("Tous droits réservés.", "All rights reserved.")}</p>
          <div className="flex gap-6">
            <span className="hover:text-primary-foreground/60 cursor-pointer transition-colors">{t("Politique de confidentialité", "Privacy Policy")}</span>
            <span className="hover:text-primary-foreground/60 cursor-pointer transition-colors">{t("Conditions d'utilisation", "Terms of Service")}</span>
            <span className="hover:text-primary-foreground/60 cursor-pointer transition-colors">{t("Mentions légales", "Legal Notice")}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
