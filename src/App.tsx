import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
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
import Formations from "./pages/Formations";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/NotFound";
import PartnerLayout from "./layouts/PartnerLayout";
import PartnerDashboard from "./pages/partner/PartnerDashboard";
import PartnerProjects from "./pages/partner/PartnerProjects";
import PartnerMediaLibrary from "./pages/partner/PartnerMediaLibrary";
import PartnerVisualizer from "./pages/partner/PartnerVisualizer";
import PartnerProfile from "./pages/partner/PartnerProfile";
import PartnerAppointments from "./pages/partner/PartnerAppointments";
import PartnerEvents from "./pages/partner/PartnerEvents";
import PartnerAnalytics from "./pages/partner/PartnerAnalytics";
import PartnerInscription from "./pages/PartnerInscription";
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminContractors from "./pages/admin/AdminContractors";
import AdminPartners from "./pages/admin/AdminPartners";
import AdminMessaging from "./pages/admin/AdminMessaging";
import AdminChatbot from "./pages/admin/AdminChatbot";
import AdminSettings from "./pages/admin/AdminSettings";

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
              <Route path="/sous-traitants" element={<SousTraitants />} />
              <Route path="/sous-traitants/:slug" element={<SousTraitantProfile />} />
              <Route path="/formations" element={<Formations />} />
            </Route>
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/dashboard-preview" element={<Dashboard />} />
            <Route path="/partenaire/inscription" element={<PartnerInscription />} />
            <Route path="/partenaire" element={<ProtectedRoute requirePartner><PartnerLayout /></ProtectedRoute>}>
              <Route index element={<Navigate to="/partenaire/dashboard" replace />} />
              <Route path="dashboard" element={<PartnerDashboard />} />
              <Route path="projets" element={<PartnerProjects />} />
              <Route path="mediatheque" element={<PartnerMediaLibrary />} />
              <Route path="visualiseur" element={<PartnerVisualizer />} />
              <Route path="profil" element={<PartnerProfile />} />
              <Route path="rendez-vous" element={<PartnerAppointments />} />
              <Route path="evenements" element={<PartnerEvents />} />
              <Route path="analyses" element={<PartnerAnalytics />} />
            </Route>
            <Route path="/admin" element={<ProtectedRoute requireAdmin><AdminLayout /></ProtectedRoute>}>
              <Route index element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="sous-traitants" element={<AdminContractors />} />
              <Route path="partenaires" element={<AdminPartners />} />
              <Route path="messagerie" element={<AdminMessaging />} />
              <Route path="chatbot" element={<AdminChatbot />} />
              <Route path="parametres" element={<AdminSettings />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
