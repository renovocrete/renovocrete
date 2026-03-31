import { Link } from "react-router-dom";
import { ArrowLeft, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center px-4 max-w-md">
        <span className="font-heading text-8xl font-800 text-gradient-brand">404</span>
        <h1 className="font-heading text-2xl font-700 mt-4 mb-3">Page introuvable</h1>
        <p className="text-muted-foreground mb-8">
          Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button asChild className="bg-gradient-brand-deep hover:opacity-90">
            <Link to="/"><Home className="w-4 h-4 mr-2" /> Retour à l'accueil</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/contact"><ArrowLeft className="w-4 h-4 mr-2" /> Nous contacter</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
