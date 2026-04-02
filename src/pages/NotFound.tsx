import { Link } from "react-router-dom";
import { ArrowLeft, Home, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/LanguageContext";

const NotFound = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center px-4 max-w-md">
        <span className="font-heading text-8xl font-extrabold text-gradient-brand">404</span>
        <h1 className="font-heading text-2xl font-bold mt-4 mb-3">{t("Page introuvable", "Page not found")}</h1>
        <p className="text-muted-foreground mb-8">
          {t("Désolé, la page que vous recherchez n'existe pas ou a été déplacée.", "Sorry, the page you're looking for doesn't exist or has been moved.")}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button asChild className="bg-gradient-brand-deep hover:opacity-90">
            <Link to="/"><Home className="w-4 h-4 mr-2" /> {t("Retour à l'accueil", "Back to home")}</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/devis">{t("Demander un devis", "Request a quote")} <ArrowRight className="w-4 h-4 ml-2" /></Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
