import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

// Import all page components
import Index from '@/pages/Index';
import About from '@/pages/About';
import Services from '@/pages/Services';
import Pricing from '@/pages/Pricing';
import Booking from '@/pages/Booking';
import Contact from '@/pages/Contact';
import FAQ from '@/pages/FAQ';
import Blog from '@/pages/Blog';
import PrivacyPolicy from '@/pages/PrivacyPolicy';
import TermsOfService from '@/pages/TermsOfService';
import NotFound from '@/pages/NotFound';
import DoctorRegistration from '@/pages/DoctorRegistration';
import Profile from '@/pages/Profile';
import SignIn from '@/pages/SignIn';
import AccountSettings from '@/pages/AccountSettings';
import Billing from '@/pages/Billing';
import SportsRehabilitation from '@/pages/services/SportsRehabilitation';
import ManualTherapy from '@/pages/services/ManualTherapy';
import PostSurgical from '@/pages/services/PostSurgical';
import ChronicPain from '@/pages/services/ChronicPain';
import Neurological from '@/pages/services/Neurological';
import StrengthConditioning from '@/pages/services/StrengthConditioning';
import PediatricRehabilitation from '@/pages/services/PediatricRehabilitation';
import GeriatricRehabilitation from '@/pages/services/GeriatricRehabilitation';
import WomensHealth from '@/pages/services/WomensHealth';
import PosturalAlignment from '@/pages/services/PosturalAlignment';
import ObesityManagement from '@/pages/services/ObesityManagement';
import GroupExercises from '@/pages/services/GroupExercises';
import Kinesiotaping from '@/pages/services/Kinesiotaping';
import DryNeedling from '@/pages/services/DryNeedling';
import NeuroDynamic from '@/pages/services/NeuroDynamic';
import CuppingTherapy from '@/pages/services/CuppingTherapy';
import VirtualPhysiotherapy from '@/pages/services/VirtualPhysiotherapy';
import AIAssistant from '@/pages/AIAssistant';
import DoctorUSP from '@/pages/DoctorUSP';
import PatientsList from '@/pages/PatientsList';
import DoctorsPage from '@/pages/DoctorsPage';
import DoctorProfile from '@/pages/DoctorProfile';
import DoctorOnboarding from '@/pages/DoctorOnboarding';
import InteractiveBodyMap from '@/pages/InteractiveBodyMap';
import PainTracker from '@/pages/PainTracker';
import VideoLibrary from '@/pages/VideoLibrary';
import VirtualTour from '@/pages/VirtualTour';
import AdminDashboard from '@/pages/AdminDashboard';
import PatientOnboarding from '@/pages/PatientOnboarding';
import PatientDetail from '@/pages/PatientDetail';
import SignUp from '@/pages/SignUp';

// Animation settings
const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: -20,
  },
};

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.5,
};

// Animated wrapper
const AnimatedPage = ({ children }) => {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={pageTransition}
    >
      {children}
    </motion.div>
  );
};

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Main pages */}
        <Route path="/" element={<AnimatedPage><Index /></AnimatedPage>} />
        <Route path="/about" element={<AnimatedPage><About /></AnimatedPage>} />
        <Route path="/services" element={<AnimatedPage><Services /></AnimatedPage>} />
        <Route path="/pricing" element={<AnimatedPage><Pricing /></AnimatedPage>} />
        <Route path="/booking" element={<AnimatedPage><Booking /></AnimatedPage>} />
        <Route path="/contact" element={<AnimatedPage><Contact /></AnimatedPage>} />
        <Route path="/faq" element={<AnimatedPage><FAQ /></AnimatedPage>} />
        <Route path="/blog" element={<AnimatedPage><Blog /></AnimatedPage>} />
        <Route path="/privacy-policy" element={<AnimatedPage><PrivacyPolicy /></AnimatedPage>} />
        <Route path="/terms-of-service" element={<AnimatedPage><TermsOfService /></AnimatedPage>} />

        {/* Authentication & User Management */}
        <Route path="/signin" element={<AnimatedPage><SignIn /></AnimatedPage>} />
        <Route path="/signup" element={<AnimatedPage><SignUp /></AnimatedPage>} />
        <Route path="/profile" element={<AnimatedPage><Profile /></AnimatedPage>} />
        <Route path="/account-settings" element={<AnimatedPage><AccountSettings /></AnimatedPage>} />
        <Route path="/billing" element={<AnimatedPage><Billing /></AnimatedPage>} />

        {/* Doctor Related */}
        <Route path="/doctor-registration" element={<AnimatedPage><DoctorRegistration /></AnimatedPage>} />
        <Route path="/doctor-onboarding" element={<AnimatedPage><DoctorOnboarding /></AnimatedPage>} />
        <Route path="/doctors" element={<AnimatedPage><DoctorsPage /></AnimatedPage>} />
        <Route path="/doctor/:id" element={<AnimatedPage><DoctorProfile /></AnimatedPage>} />
        <Route path="/doctor-benefits" element={<AnimatedPage><DoctorUSP /></AnimatedPage>} />

        {/* Patient Related */}
        <Route path="/patient-onboarding" element={<AnimatedPage><PatientOnboarding /></AnimatedPage>} />
        <Route path="/patient/:id" element={<AnimatedPage><PatientDetail /></AnimatedPage>} />
        <Route path="/patients" element={<AnimatedPage><PatientsList /></AnimatedPage>} />

        {/* Service Specific Pages */}
        <Route path="/services/sports-rehabilitation" element={<AnimatedPage><SportsRehabilitation /></AnimatedPage>} />
        <Route path="/services/manual-therapy" element={<AnimatedPage><ManualTherapy /></AnimatedPage>} />
        <Route path="/services/post-surgical" element={<AnimatedPage><PostSurgical /></AnimatedPage>} />
        <Route path="/services/chronic-pain" element={<AnimatedPage><ChronicPain /></AnimatedPage>} />
        <Route path="/services/neurological" element={<AnimatedPage><Neurological /></AnimatedPage>} />
        <Route path="/services/strength-conditioning" element={<AnimatedPage><StrengthConditioning /></AnimatedPage>} />
        <Route path="/services/pediatric-rehabilitation" element={<AnimatedPage><PediatricRehabilitation /></AnimatedPage>} />
        <Route path="/services/geriatric-rehabilitation" element={<AnimatedPage><GeriatricRehabilitation /></AnimatedPage>} />
        <Route path="/services/womens-health" element={<AnimatedPage><WomensHealth /></AnimatedPage>} />
        <Route path="/services/postural-alignment" element={<AnimatedPage><PosturalAlignment /></AnimatedPage>} />
        <Route path="/services/obesity-management" element={<AnimatedPage><ObesityManagement /></AnimatedPage>} />
        <Route path="/services/group-exercises" element={<AnimatedPage><GroupExercises /></AnimatedPage>} />
        <Route path="/services/kinesiotaping" element={<AnimatedPage><Kinesiotaping /></AnimatedPage>} />
        <Route path="/services/dry-needling" element={<AnimatedPage><DryNeedling /></AnimatedPage>} />
        <Route path="/services/neuro-dynamic" element={<AnimatedPage><NeuroDynamic /></AnimatedPage>} />
        <Route path="/services/cupping-therapy" element={<AnimatedPage><CuppingTherapy /></AnimatedPage>} />
        <Route path="/services/virtual-physiotherapy" element={<AnimatedPage><VirtualPhysiotherapy /></AnimatedPage>} />

        {/* Features & Resources */}
        <Route path="/interactive-body-map" element={<AnimatedPage><InteractiveBodyMap /></AnimatedPage>} />
        <Route path="/pain-tracker" element={<AnimatedPage><PainTracker /></AnimatedPage>} />
        <Route path="/video-library" element={<AnimatedPage><VideoLibrary /></AnimatedPage>} />
        <Route path="/virtual-tour" element={<AnimatedPage><VirtualTour /></AnimatedPage>} />
        <Route path="/ai-assistant" element={<AnimatedPage><AIAssistant /></AnimatedPage>} />

        {/* Admin */}
        <Route path="/admin" element={<AnimatedPage><AdminDashboard /></AnimatedPage>} />

        {/* 404 Page */}
        <Route path="*" element={<AnimatedPage><NotFound /></AnimatedPage>} />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
