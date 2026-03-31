import { Link } from "react-router-dom";
import logo from "@/assets/renovo-crete-logo.png";

const Footer = () => {
  return (
    <footer className="bg-foreground text-primary-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-10">
          <div>
            <Link to="/">
              <img src={logo} alt="Renovo Crete" className="h-10 w-auto brightness-0 invert mb-4" />
            </Link>
            <p className="text-primary-foreground/60 text-sm leading-relaxed max-w-xs">
              Revêtements époxy et résine décorative premium. Sols, comptoirs, tables et surfaces — résidentiel, commercial et industriel.
            </p>
          </div>

          <div>
            <h4 className="font-heading font-600 mb-4">Navigation</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/60">
              <li><Link to="/" className="hover:text-primary-light transition-colors">Accueil</Link></li>
              <li><Link to="/prestations" className="hover:text-primary-light transition-colors">Prestations</Link></li>
              <li><Link to="/types-de-projets" className="hover:text-primary-light transition-colors">Types de projets</Link></li>
              <li><Link to="/galerie" className="hover:text-primary-light transition-colors">Galerie</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-600 mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/60">
              <li>Revêtement de sol époxy</li>
              <li>Comptoirs en résine</li>
              <li>Tables décoratives</li>
              <li>Revêtements industriels</li>
              <li>Surfaces extérieures</li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-600 mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/60">
              <li>(555) 123-4567</li>
              <li>info@renovocrete.com</li>
              <li>Lun–Ven : 8h – 18h</li>
              <li>Sam : 9h – 14h</li>
            </ul>
            <Link to="/devis" className="inline-block mt-4 text-sm text-primary-light hover:underline">
              Demander un devis →
            </Link>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-12 pt-8 text-center text-sm text-primary-foreground/40">
          © {new Date().getFullYear()} Renovo Crete. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
