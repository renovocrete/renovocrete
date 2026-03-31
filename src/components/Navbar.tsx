import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/renovo-crete-logo.png";

const navItems = [
  { label: "Accueil", path: "/" },
  { label: "Prestations", path: "/prestations" },
  { label: "Types de projets", path: "/types-de-projets" },
  { label: "Galerie", path: "/galerie" },
  { label: "Visualisation", path: "/visualisation" },
  { label: "Devis", path: "/devis" },
  { label: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto flex items-center justify-between h-20 px-4">
        <Link to="/" className="flex items-center gap-2 flex-shrink-0">
          <img src={logo} alt="Renovo Crete" className="h-12 w-auto" />
        </Link>

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.label}
                to={item.path}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors relative ${
                  isActive
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-brand rounded-full" />
                )}
              </Link>
            );
          })}
        </div>

        <div className="hidden lg:block flex-shrink-0">
          <Button asChild className="bg-gradient-brand-deep hover:opacity-90 transition-opacity">
            <Link to="/devis">
              <Phone className="w-4 h-4 mr-2" />
              Demander un devis
            </Link>
          </Button>
        </div>

        {/* Mobile toggle */}
        <button className="lg:hidden text-foreground" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="lg:hidden bg-background border-t border-border px-4 pb-6 pt-2 shadow-lg">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.label}
                to={item.path}
                className={`block py-3 px-3 rounded-lg text-base font-medium transition-colors ${
                  isActive
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            );
          })}
          <Button asChild className="w-full mt-4 bg-gradient-brand-deep">
            <Link to="/devis" onClick={() => setIsOpen(false)}>
              <Phone className="w-4 h-4 mr-2" />
              Demander un devis
            </Link>
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
