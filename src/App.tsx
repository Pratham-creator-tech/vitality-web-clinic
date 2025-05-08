
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { LanguageProvider } from "./context/LanguageContext";
import { ThemeProvider } from "./context/ThemeContext";
import { ScrollToTop } from "./components/ui/scroll-to-top";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Pricing from "./pages/Pricing";
import Booking from "./pages/Booking";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import Blog from "./pages/Blog";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import NotFound from "./pages/NotFound";
import DoctorRegistration from "./pages/DoctorRegistration";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import AccountSettings from "./pages/AccountSettings";
import Billing from "./pages/Billing";
import SportsRehabilitation from "./pages/services/SportsRehabilitation";
import ManualTherapy from "./pages/services/ManualTherapy";
import PostSurgical from "./pages/services/PostSurgical";
import ChronicPain from "./pages/services/ChronicPain";
import Neurological from "./pages/services/Neurological";
import StrengthConditioning from "./pages/services/StrengthConditioning";
import PediatricRehabilitation from "./pages/services/PediatricRehabilitation";
import GeriatricRehabilitation from "./pages/services/GeriatricRehabilitation";
import WomensHealth from "./pages/services/WomensHealth";
import PosturalAlignment from "./pages/services/PosturalAlignment";
import ObesityManagement from "./pages/services/ObesityManagement";
import GroupExercises from "./pages/services/GroupExercises";
import Kinesiotaping from "./pages/services/Kinesiotaping";
import DryNeedling from "./pages/services/DryNeedling";
import NeuroDynamic from "./pages/services/NeuroDynamic";
import CuppingTherapy from "./pages/services/CuppingTherapy";
import VirtualPhysiotherapy from "./pages/services/VirtualPhysiotherapy";
import AIAssistant from "./pages/AIAssistant";
import DoctorUSP from "./pages/DoctorUSP";
import PatientsList from "./pages/PatientsList";
import DoctorsPage from "./pages/DoctorsPage";
import DoctorProfile from "./pages/DoctorProfile";
import DoctorOnboarding from "./pages/DoctorOnboarding";
import InteractiveBodyMap from "./pages/InteractiveBodyMap";
import PainTracker from "./pages/PainTracker";
import VideoLibrary from "./pages/VideoLibrary";
import VirtualTour from "./pages/VirtualTour";
import PatientDetail from "./pages/PatientDetail";
import InsuranceList from "./pages/InsuranceList";
import InvoiceDetail from "./pages/InvoiceDetail";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <ThemeProvider>
        <LanguageProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <ScrollToTop />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/booking" element={<Booking />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-of-service" element={<TermsOfService />} />
                <Route path="/doctor-registration" element={<DoctorRegistration />} />
                <Route path="/doctor-onboarding" element={<DoctorOnboarding />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/account-settings" element={<AccountSettings />} />
                <Route path="/billing" element={<Billing />} />
                <Route path="/patients" element={<PatientsList />} />
                <Route path="/patient/:id" element={<PatientDetail />} />
                <Route path="/doctors" element={<DoctorsPage />} />
                <Route path="/doctor/:id" element={<DoctorProfile />} />
                <Route path="/insurance" element={<InsuranceList />} />
                <Route path="/invoices/:id" element={<InvoiceDetail />} />
                
                {/* Service specific pages */}
                <Route path="/services/sports-rehabilitation" element={<SportsRehabilitation />} />
                <Route path="/services/manual-therapy" element={<ManualTherapy />} />
                <Route path="/services/post-surgical" element={<PostSurgical />} />
                <Route path="/services/chronic-pain" element={<ChronicPain />} />
                <Route path="/services/neurological" element={<Neurological />} />
                <Route path="/services/strength-conditioning" element={<StrengthConditioning />} />
                <Route path="/services/pediatric-rehab" element={<PediatricRehabilitation />} />
                <Route path="/services/geriatric-rehab" element={<GeriatricRehabilitation />} />
                <Route path="/services/womens-health" element={<WomensHealth />} />
                <Route path="/services/postural-alignment" element={<PosturalAlignment />} />
                <Route path="/services/obesity-management" element={<ObesityManagement />} />
                <Route path="/services/group-exercises" element={<GroupExercises />} />
                <Route path="/services/kinesiotaping" element={<Kinesiotaping />} />
                <Route path="/services/dry-needling" element={<DryNeedling />} />
                <Route path="/services/neuro-dynamic" element={<NeuroDynamic />} />
                <Route path="/services/cupping-therapy" element={<CuppingTherapy />} />
                <Route path="/services/virtual-physiotherapy" element={<VirtualPhysiotherapy />} />
                
                {/* New features */}
                <Route path="/ai-assistant" element={<AIAssistant />} />
                <Route path="/doctor-benefits" element={<DoctorUSP />} />
                <Route path="/interactive-body-map" element={<InteractiveBodyMap />} />
                <Route path="/pain-tracker" element={<PainTracker />} />
                <Route path="/video-library" element={<VideoLibrary />} />
                <Route path="/virtual-tour" element={<VirtualTour />} />
                
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </LanguageProvider>
      </ThemeProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
