
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Booking from "./pages/Booking";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import FAQ from "./pages/FAQ";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import Pricing from "./pages/Pricing";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import AIAssistant from "./pages/AIAssistant";
import VideoLibrary from "./pages/VideoLibrary";
import VirtualTour from "./pages/VirtualTour";
import InteractiveBodyMap from "./pages/InteractiveBodyMap"; // Make sure this matches exactly (case-sensitive)
import Meeting from "./pages/Meeting";
import DoctorRegistration from "./pages/DoctorRegistration";
import DoctorOnboarding from "./pages/DoctorOnboarding";
import PatientOnboarding from "./pages/PatientOnboarding";
import PatientsList from "./pages/PatientsList";
import PatientDetail from "./pages/PatientDetail";
import DoctorUSP from "./pages/DoctorUSP";
import AdminDashboard from "./pages/AdminDashboard";
import AccountSettings from "./pages/AccountSettings";
import Billing from "./pages/Billing";
import PainTracker from "./pages/PainTracker";
import Recommendations from "./pages/Recommendations";
import DoctorsPage from "./pages/DoctorsPage";
import DoctorProfile from "./pages/DoctorProfile";
import DoctorBenefits from "./pages/DoctorBenefits";
import DietPlan from "./pages/DietPlan";

// Service pages
import SportsRehabilitation from "./pages/services/SportsRehabilitation";
import ManualTherapy from "./pages/services/ManualTherapy";
import PostSurgical from "./pages/services/PostSurgical";
import ChronicPain from "./pages/services/ChronicPain";
import Neurological from "./pages/services/Neurological";
import StrengthConditioning from "./pages/services/StrengthConditioning";
import VirtualPhysiotherapy from "./pages/services/VirtualPhysiotherapy";
import WomensHealth from "./pages/services/WomensHealth";
import PediatricRehabilitation from "./pages/services/PediatricRehabilitation";
import GeriatricRehabilitation from "./pages/services/GeriatricRehabilitation";
import PosturalAlignment from "./pages/services/PosturalAlignment";
import ObesityManagement from "./pages/services/ObesityManagement";
import GroupExercises from "./pages/services/GroupExercises";
import DryNeedling from "./pages/services/DryNeedling";
import CuppingTherapy from "./pages/services/CuppingTherapy";
import Kinesiotaping from "./pages/services/Kinesiotaping";
import NeuroDynamic from "./pages/services/NeuroDynamic";

import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/context/ThemeContext";
import { AuthProvider } from "@/context/AuthContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { ScrollToTop } from "@/components/ui/scroll-to-top";

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <Router>
            <div className="min-h-screen bg-background">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/doctors" element={<DoctorsPage />} />
                <Route path="/doctor/:id" element={<DoctorProfile />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/booking" element={<Booking />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogDetail />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/terms" element={<TermsOfService />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/ai-assistant" element={<AIAssistant />} />
                <Route path="/video-library" element={<VideoLibrary />} />
                <Route path="/virtual-tour" element={<VirtualTour />} />
                <Route path="/interactive-body-map" element={<InteractiveBodyMap />} />
                <Route path="/meeting/:id" element={<Meeting />} />
                <Route path="/doctor-registration" element={<DoctorRegistration />} />
                <Route path="/doctor-onboarding" element={<DoctorOnboarding />} />
                <Route path="/patient-onboarding" element={<PatientOnboarding />} />
                <Route path="/patients" element={<PatientsList />} />
                <Route path="/patient/:id" element={<PatientDetail />} />
                <Route path="/doctor-usp" element={<DoctorUSP />} />
                <Route path="/doctor-benefits" element={<DoctorBenefits />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/account-settings" element={<AccountSettings />} />
                <Route path="/billing" element={<Billing />} />
                <Route path="/pain-tracker" element={<PainTracker />} />
                <Route path="/recommendations" element={<Recommendations />} />
                <Route path="/diet-plan" element={<DietPlan />} />
                
                {/* Service routes */}
                <Route path="/services/sports-rehabilitation" element={<SportsRehabilitation />} />
                <Route path="/services/manual-therapy" element={<ManualTherapy />} />
                <Route path="/services/post-surgical" element={<PostSurgical />} />
                <Route path="/services/chronic-pain" element={<ChronicPain />} />
                <Route path="/services/neurological" element={<Neurological />} />
                <Route path="/services/strength-conditioning" element={<StrengthConditioning />} />
                <Route path="/services/virtual-physiotherapy" element={<VirtualPhysiotherapy />} />
                <Route path="/services/womens-health" element={<WomensHealth />} />
                <Route path="/services/pediatric-rehabilitation" element={<PediatricRehabilitation />} />
                <Route path="/services/geriatric-rehabilitation" element={<GeriatricRehabilitation />} />
                <Route path="/services/postural-alignment" element={<PosturalAlignment />} />
                <Route path="/services/obesity-management" element={<ObesityManagement />} />
                <Route path="/services/group-exercises" element={<GroupExercises />} />
                <Route path="/services/dry-needling" element={<DryNeedling />} />
                <Route path="/services/cupping-therapy" element={<CuppingTherapy />} />
                <Route path="/services/kinesiotaping" element={<Kinesiotaping />} />
                <Route path="/services/neuro-dynamic" element={<NeuroDynamic />} />
                
                <Route path="*" element={<NotFound />} />
              </Routes>
              <ScrollToTop />
            </div>
            <Toaster />
          </Router>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
