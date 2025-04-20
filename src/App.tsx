
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { AuthProvider } from "@/context/AuthContext";
import { LanguageProvider } from "@/context/LanguageContext";

import Index from "@/pages/Index";
import About from "@/pages/About";
import Services from "@/pages/Services";
import PainTracker from "@/pages/PainTracker";
import Blog from "@/pages/Blog";
import VirtualTour from "@/pages/VirtualTour";
import FAQ from "@/pages/FAQ";
import Contact from "@/pages/Contact";
import InteractiveBodyMap from "@/pages/InteractiveBodyMap";
import VideoLibrary from "@/pages/VideoLibrary";
import AIAssistant from "@/pages/AIAssistant";
import NotFound from "@/pages/NotFound";
import SignIn from "@/pages/SignIn";
import SignUp from "@/pages/SignUp";
import Booking from "@/pages/Booking";
import Profile from "@/pages/Profile";
import Pricing from "@/pages/Pricing";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsOfService from "@/pages/TermsOfService";
import UserOnboarding from "@/pages/UserOnboarding";
import Dashboard from "@/pages/Dashboard";
import ExercisePlan from "@/pages/ExercisePlan";
import Chat from "@/pages/Chat";

// Service-specific pages
import SportsRehabilitation from "@/pages/services/SportsRehabilitation";
import ManualTherapy from "@/pages/services/ManualTherapy";
import PostSurgical from "@/pages/services/PostSurgical";
import ChronicPain from "@/pages/services/ChronicPain";
import Neurological from "@/pages/services/Neurological";
import StrengthConditioning from "@/pages/services/StrengthConditioning";
import DoctorUSP from "@/pages/DoctorUSP";
import DoctorRegistration from "@/pages/DoctorRegistration";
import PatientsList from "@/pages/PatientsList";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vitality-theme">
      <LanguageProvider>
        <AuthProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/pain-tracker" element={<PainTracker />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/virtual-tour" element={<VirtualTour />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/interactive-body-map" element={<InteractiveBodyMap />} />
              <Route path="/video-library" element={<VideoLibrary />} />
              <Route path="/ai-assistant" element={<AIAssistant />} />
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/booking" element={<Booking />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="/onboarding" element={<UserOnboarding />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/exercise-plan" element={<ExercisePlan />} />
              <Route path="/chat" element={<Chat />} />
              
              {/* Service-specific routes */}
              <Route path="/services/sports-rehabilitation" element={<SportsRehabilitation />} />
              <Route path="/services/manual-therapy" element={<ManualTherapy />} />
              <Route path="/services/post-surgical" element={<PostSurgical />} />
              <Route path="/services/chronic-pain" element={<ChronicPain />} />
              <Route path="/services/neurological-rehabilitation" element={<Neurological />} />
              <Route path="/services/strength-conditioning" element={<StrengthConditioning />} />
              
              {/* Doctor-specific routes */}
              <Route path="/doctor-usp" element={<DoctorUSP />} />
              <Route path="/doctor-registration" element={<DoctorRegistration />} />
              <Route path="/patients-list" element={<PatientsList />} />
              
              {/* 404 route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
          <Toaster />
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
