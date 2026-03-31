import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import MainLayout from "@/layouts/MainLayout";
import Index from "./pages/Index";
import Prestations from "./pages/Prestations";
import TypesProjets from "./pages/TypesProjets";
import Galerie from "./pages/Galerie";
import Visualisation from "./pages/Visualisation";
import Devis from "./pages/Devis";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
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
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
