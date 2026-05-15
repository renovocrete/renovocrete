import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/i18n/LanguageContext";
import MainLayout from "@/layouts/MainLayout";
import Index from "./pages/Index";
import Prestations from "./pages/Prestations";
import TypesProjets from "./pages/TypesProjets";
import Galerie from "./pages/Galerie";
import Visualisation from "./pages/Visualisation";
import Devis from "./pages/Devis";
import Contact from "./pages/Contact";
import QuiSommesNous from "./pages/QuiSommesNous";
import Partenaires from "./pages/Partenaires";
import SousTraitants from "./pages/SousTraitants";
import SousTraitantProfile from "./pages/SousTraitantProfile";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Index />} />
              <Route path="/prestations" element={<Prestations />} />
              <Route path="/types-de-projets" element={<TypesProjets />} />
              <Route path="/galerie" element={<Galerie />} />
              <Route path="/visualisation" element={<Visualisation />} />
              <Route path="/devis" element={<Devis />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/qui-sommes-nous" element={<QuiSommesNous />} />
              <Route path="/partenaires" element={<Partenaires />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
