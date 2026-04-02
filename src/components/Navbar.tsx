import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/LanguageContext";
import logo from "@/assets/renovo-crete-logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { lang, setLang, t } = useLanguage();

  const navItems = [
    { label: t("Accueil", "Home"), path: "/" },
    { label: t("Prestations", "Services"), path: "/prestations" },
    { label: t("Types de projets", "Project Types"), path: "/types-de-projets" },
    { label: t("Galerie", "Gallery"), path: "/galerie" },
    { label: t("Visualisation", "Visualizer"), path: "/visualisation" },
    { label: t("Devis", "Quote"), path: "/devis" },
    { label: "Contact", path: "/contact" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-background/98 backdrop-blur-md shadow-sm border-b border-border/50" : "bg-background/95 backdrop-blur-sm"}`}>
      <div className="container mx-auto flex items-center justify-between h-20 px-4">
        <Link to="/" className="flex items-center gap-2 flex-shrink-0">
          <img src={logo} alt="Renovo Crete" className="h-12 w-auto" />
        </Link>

        {/* Desktop */}
        <div className="hidden xl:flex items-center gap-0.5">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3.5 py-2 text-sm font-medium rounded-lg transition-colors relative ${
                  isActive
                    ? "text-primary bg-primary/8"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-gradient-brand rounded-full" />
                )}
              </Link>
            );
          })}
        </div>

        <div className="hidden xl:flex items-center gap-2 flex-shrink-0">
          {/* Language switcher */}
          <div className="flex items-center border border-border rounded-lg overflow-hidden mr-2">
            <button
              onClick={() => setLang("fr")}
              className={`px-2.5 py-1.5 text-xs font-semibold transition-colors ${lang === "fr" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              FR
            </button>
            <button
              onClick={() => setLang("en")}
              className={`px-2.5 py-1.5 text-xs font-semibold transition-colors ${lang === "en" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              EN
            </button>
          </div>
          <Button asChild variant="outline" size="sm" className="border-primary/20 text-primary hover:bg-primary/5">
            <Link to="/visualisation">
              <Eye className="w-4 h-4 mr-1.5" />
              {t("Visualiser mon projet", "Visualize my project")}
            </Link>
          </Button>
          <Button asChild size="sm" className="bg-gradient-brand-deep hover:opacity-90 transition-opacity shadow-sm">
            <Link to="/devis">
              <Phone className="w-4 h-4 mr-1.5" />
              {t("Demander un devis", "Request a quote")}
            </Link>
          </Button>
        </div>

        {/* Mobile toggle */}
        <button className="xl:hidden text-foreground p-2" onClick={() => setIsOpen(!isOpen)} aria-label="Menu">
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="xl:hidden bg-background border-t border-border px-4 pb-6 pt-2 shadow-lg">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`block py-3 px-3 rounded-lg text-base font-medium transition-colors ${
                  isActive
                    ? "text-primary bg-primary/8"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            );
          })}
          {/* Mobile lang switcher */}
          <div className="flex items-center gap-2 px-3 py-3">
            <span className="text-xs text-muted-foreground mr-2">{t("Langue", "Language")} :</span>
            <button onClick={() => setLang("fr")} className={`px-3 py-1.5 rounded text-xs font-semibold ${lang === "fr" ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"}`}>FR</button>
            <button onClick={() => setLang("en")} className={`px-3 py-1.5 rounded text-xs font-semibold ${lang === "en" ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"}`}>EN</button>
          </div>
          <div className="flex flex-col gap-2 mt-4">
            <Button asChild variant="outline" className="w-full border-primary/20 text-primary">
              <Link to="/visualisation" onClick={() => setIsOpen(false)}>
                <Eye className="w-4 h-4 mr-2" />
                {t("Visualiser mon projet", "Visualize my project")}
              </Link>
            </Button>
            <Button asChild className="w-full bg-gradient-brand-deep">
              <Link to="/devis" onClick={() => setIsOpen(false)}>
                <Phone className="w-4 h-4 mr-2" />
                {t("Demander un devis", "Request a quote")}
              </Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
