import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/renovo-crete-logo.png";
const navItems = [
  { label: "Services", href: "#services" },
  { label: "Why Us", href: "#why-us" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto flex items-center justify-between h-20 px-4">
        <a href="#" className="flex items-center gap-2">
          <span className="font-heading text-2xl font-800 tracking-tight">
            <span className="text-gradient-brand">RENOVO</span>
            <span className="text-foreground"> CRETE</span>
          </span>
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {item.label}
            </a>
          ))}
          <Button asChild className="bg-gradient-brand-deep hover:opacity-90 transition-opacity">
            <a href="#contact">
              <Phone className="w-4 h-4 mr-2" />
              Get a Quote
            </a>
          </Button>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-foreground" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-background border-t border-border px-4 pb-6 pt-2">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="block py-3 text-base font-medium text-muted-foreground hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <Button asChild className="w-full mt-4 bg-gradient-brand-deep">
            <a href="#contact" onClick={() => setIsOpen(false)}>
              <Phone className="w-4 h-4 mr-2" />
              Get a Quote
            </a>
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
