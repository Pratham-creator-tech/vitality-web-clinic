
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
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
import SignUp from "./pages/SignUp";
import SportsRehabilitation from "./pages/services/SportsRehabilitation";
import ManualTherapy from "./pages/services/ManualTherapy";
import PostSurgical from "./pages/services/PostSurgical";
import ChronicPain from "./pages/services/ChronicPain";
import Neurological from "./pages/services/Neurological";
import StrengthConditioning from "./pages/services/StrengthConditioning";
import AIAssistant from "./pages/AIAssistant";
import DoctorUSP from "./pages/DoctorUSP";
import PatientsList from "./pages/PatientsList";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
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
            <Route path="/profile" element={<Profile />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            
            {/* Service specific pages */}
            <Route path="/services/sports-rehabilitation" element={<SportsRehabilitation />} />
            <Route path="/services/manual-therapy" element={<ManualTherapy />} />
            <Route path="/services/post-surgical" element={<PostSurgical />} />
            <Route path="/services/chronic-pain" element={<ChronicPain />} />
            <Route path="/services/neurological" element={<Neurological />} />
            <Route path="/services/strength-conditioning" element={<StrengthConditioning />} />
            
            {/* New pages */}
            <Route path="/ai-assistant" element={<AIAssistant />} />
            <Route path="/doctor-benefits" element={<DoctorUSP />} />
            <Route path="/patients" element={<PatientsList />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
