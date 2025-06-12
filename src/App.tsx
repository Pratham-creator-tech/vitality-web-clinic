import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { LanguageProvider } from "./context/LanguageContext";
import { ThemeProvider } from "./context/ThemeContext";

// Import pages
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Booking from "./pages/Booking";
import Meeting from "./pages/Meeting";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import DoctorProfile from "./pages/DoctorProfile";
import DoctorRegistration from "./pages/DoctorRegistration";
import DoctorOnboarding from "./pages/DoctorOnboarding";
import PatientOnboarding from "./pages/PatientOnboarding";
import AdminDashboard from "./pages/AdminDashboard";
import AccountSettings from "./pages/AccountSettings";
import Billing from "./pages/Billing";
import PatientsList from "./pages/PatientsList";
import PatientDetail from "./pages/PatientDetail";
import DoctorsPage from "./pages/DoctorsPage";
import DoctorUSP from "./pages/DoctorUSP";
import FAQ from "./pages/FAQ";
import Blog from "./pages/Blog";
import Pricing from "./pages/Pricing";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import NotFound from "./pages/NotFound";
import VideoLibrary from "./pages/VideoLibrary";
import VirtualTour from "./pages/VirtualTour";
import InteractiveBodyMap from "./pages/InteractiveBodyMap";
import PainTracker from "./pages/PainTracker";
import AIAssistant from "./pages/AIAssistant";
import Recommendations from "./pages/Recommendations";

// Service pages
import SportsRehabilitation from "./pages/services/SportsRehabilitation";
import ManualTherapy from "./pages/services/ManualTherapy";
import PostSurgical from "./pages/services/PostSurgical";
import ChronicPain from "./pages/services/ChronicPain";
import Neurological from "./pages/services/Neurological";
import StrengthConditioning from "./pages/services/StrengthConditioning";
import DryNeedling from "./pages/services/DryNeedling";
import CuppingTherapy from "./pages/services/CuppingTherapy";
import Kinesiotaping from "./pages/services/Kinesiotaping";
import PosturalAlignment from "./pages/services/PosturalAlignment";
import NeuroDynamic from "./pages/services/NeuroDynamic";
import WomensHealth from "./pages/services/WomensHealth";
import PediatricRehabilitation from "./pages/services/PediatricRehabilitation";
import GeriatricRehabilitation from "./pages/services/GeriatricRehabilitation";
import ObesityManagement from "./pages/services/ObesityManagement";
import GroupExercises from "./pages/services/GroupExercises";
import VirtualPhysiotherapy from "./pages/services/VirtualPhysiotherapy";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/booking" element={<Booking />} />
                <Route path="/meeting/:meetingId" element={<Meeting />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/doctor-profile" element={<DoctorProfile />} />
                <Route path="/doctor-registration" element={<DoctorRegistration />} />
                <Route path="/doctor-onboarding" element={<DoctorOnboarding />} />
                <Route path="/patient-onboarding" element={<PatientOnboarding />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/account-settings" element={<AccountSettings />} />
                <Route path="/billing" element={<Billing />} />
                <Route path="/patients" element={<PatientsList />} />
                <Route path="/patient/:id" element={<PatientDetail />} />
                <Route path="/doctors" element={<DoctorsPage />} />
                <Route path="/doctor-usp" element={<DoctorUSP />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/terms" element={<TermsOfService />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/video-library" element={<VideoLibrary />} />
                <Route path="/virtual-tour" element={<VirtualTour />} />
                <Route path="/body-map" element={<InteractiveBodyMap />} />
                <Route path="/pain-tracker" element={<PainTracker />} />
                <Route path="/ai-assistant" element={<AIAssistant />} />
                <Route path="/recommendations" element={<Recommendations />} />
                
                {/* Service Routes */}
                <Route path="/services/sports-rehabilitation" element={<SportsRehabilitation />} />
                <Route path="/services/manual-therapy" element={<ManualTherapy />} />
                <Route path="/services/post-surgical" element={<PostSurgical />} />
                <Route path="/services/chronic-pain" element={<ChronicPain />} />
                <Route path="/services/neurological" element={<Neurological />} />
                <Route path="/services/strength-conditioning" element={<StrengthConditioning />} />
                <Route path="/services/dry-needling" element={<DryNeedling />} />
                <Route path="/services/cupping-therapy" element={<CuppingTherapy />} />
                <Route path="/services/kinesiotaping" element={<Kinesiotaping />} />
                <Route path="/services/postural-alignment" element={<PosturalAlignment />} />
                <Route path="/services/neuro-dynamic" element={<NeuroDynamic />} />
                <Route path="/services/womens-health" element={<WomensHealth />} />
                <Route path="/services/pediatric-rehabilitation" element={<PediatricRehabilitation />} />
                <Route path="/services/geriatric-rehabilitation" element={<GeriatricRehabilitation />} />
                <Route path="/services/obesity-management" element={<ObesityManagement />} />
                <Route path="/services/group-exercises" element={<GroupExercises />} />
                <Route path="/services/virtual-physiotherapy" element={<VirtualPhysiotherapy />} />
                
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
