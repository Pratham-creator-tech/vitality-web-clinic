
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { CalendarCheck, ChevronDown, Info, Phone, User, UserRound } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const NavbarLinks = () => {
  const { user, userRole } = useAuth();
  const { pathname } = useLocation();
  const { t } = useLanguage();

  const isActive = (path: string) => {
    return pathname === path;
  };

  const linkStyle = "relative flex items-center gap-1.5 text-sm font-medium py-2 px-3 hover:text-vitality-500 transition-colors";
  const activeLinkStyle = "text-vitality-500 font-semibold";

  const linkAnimation = {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.2 }
  };

  return (
    <div className="hidden lg:flex items-center space-x-1">
      {/* Main Navigation */}
      <div className="flex items-center space-x-1">
        <Link
          to="/"
          className={`${linkStyle} ${isActive("/") ? activeLinkStyle : "text-gray-700 dark:text-gray-200"}`}
        >
          {t("app.header.home")}
          {isActive("/") && (
            <motion.span
              layoutId="navigation-underline"
              className="absolute left-3 right-3 bottom-0 h-0.5 bg-vitality-400"
              animate={{ opacity: 1 }}
              initial={{ opacity: 0 }}
            />
          )}
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button 
              className={`${linkStyle} ${
                pathname.includes("/about") || pathname.includes("/doctor-benefits")
                  ? activeLinkStyle
                  : "text-gray-700 dark:text-gray-200"
              }`}
            >
              <span className="flex items-center">
                {t("app.header.about")}
                <ChevronDown className="h-4 w-4 ml-1" />
              </span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem asChild>
              <Link to="/about" className="flex items-center">
                About Us
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/doctor-benefits" className="flex items-center">
                For Doctors
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/virtual-tour" className="flex items-center">
                Virtual Tour
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button 
              className={`${linkStyle} ${
                pathname.includes("/services")
                  ? activeLinkStyle
                  : "text-gray-700 dark:text-gray-200"
              }`}
            >
              <span className="flex items-center">
                {t("app.header.services")}
                <ChevronDown className="h-4 w-4 ml-1" />
              </span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem asChild>
              <Link to="/services" className="flex items-center">
                All Services
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/services/sports-rehabilitation" className="flex items-center">
                Sports Rehabilitation
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/services/manual-therapy" className="flex items-center">
                Manual Therapy
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/services/post-surgical" className="flex items-center">
                Post-Surgical Rehab
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/services/chronic-pain" className="flex items-center">
                Chronic Pain Management
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/services/neurological" className="flex items-center">
                Neurological Rehab
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/services/strength-conditioning" className="flex items-center">
                Strength & Conditioning
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/services/pediatric-rehabilitation" className="flex items-center">
                Pediatric Rehabilitation
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/services/geriatric-rehabilitation" className="flex items-center">
                Geriatric Rehabilitation
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/services/womens-health" className="flex items-center">
                Women's Health
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/services/postural-alignment" className="flex items-center">
                Postural Alignment
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/services/obesity-management" className="flex items-center">
                Obesity Management & Fitness
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/services/group-exercises" className="flex items-center">
                Group Exercises
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/services/kinesiotaping" className="flex items-center">
                Kinesiotaping
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/services/dry-needling" className="flex items-center">
                Dry Needling Therapy
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/services/neuro-dynamic" className="flex items-center">
                Neuro Dynamic Solution
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/services/cupping-therapy" className="flex items-center">
                Cupping Therapy
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/services/virtual-physiotherapy" className="flex items-center">
                Virtual Physiotherapy
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Link
          to="/pricing"
          className={`${linkStyle} ${isActive("/pricing") ? activeLinkStyle : "text-gray-700 dark:text-gray-200"}`}
        >
          {t("app.header.pricing")}
          {isActive("/pricing") && (
            <motion.span
              layoutId="navigation-underline"
              className="absolute left-3 right-3 bottom-0 h-0.5 bg-vitality-400"
              animate={{ opacity: 1 }}
              initial={{ opacity: 0 }}
            />
          )}
        </Link>

        {/* Add Patients link for all users */}
        <Link
          to="/patients"
          className={`${linkStyle} ${isActive("/patients") ? activeLinkStyle : "text-gray-700 dark:text-gray-200"}`}
        >
          <UserRound className="h-4 w-4 mr-1" />
          Patients
          {isActive("/patients") && (
            <motion.span
              layoutId="navigation-underline"
              className="absolute left-3 right-3 bottom-0 h-0.5 bg-vitality-400"
              animate={{ opacity: 1 }}
              initial={{ opacity: 0 }}
            />
          )}
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button 
              className={`${linkStyle} ${
                pathname.includes("/interactive-body-map") || 
                pathname.includes("/video-library") || 
                pathname.includes("/pain-tracker") || 
                pathname.includes("/ai-assistant")
                  ? activeLinkStyle
                  : "text-gray-700 dark:text-gray-200"
              }`}
            >
              <span className="flex items-center">
                {t("app.menu.resources")}
                <ChevronDown className="h-4 w-4 ml-1" />
              </span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem asChild>
              <Link to="/interactive-body-map" className="flex items-center">
                {t("app.feature.bodymap")}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/pain-tracker" className="flex items-center">
                {t("app.feature.paintracker")}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/video-library" className="flex items-center">
                {t("app.feature.videolibrary")}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/ai-assistant" className="flex items-center">
                AI Assistant
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/blog" className="flex items-center">
                Blog
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/faq" className="flex items-center">
                FAQ
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Link
          to="/contact"
          className={`${linkStyle} ${isActive("/contact") ? activeLinkStyle : "text-gray-700 dark:text-gray-200"}`}
        >
          {t("app.header.contact")}
          {isActive("/contact") && (
            <motion.span
              layoutId="navigation-underline"
              className="absolute left-3 right-3 bottom-0 h-0.5 bg-vitality-400"
              animate={{ opacity: 1 }}
              initial={{ opacity: 0 }}
            />
          )}
        </Link>
      </div>

      {/* Auth & Actions */}
      <div className="flex items-center ml-4">
        {user ? (
          <Button asChild variant="ghost" size="sm" className="mr-2 text-gray-700 dark:text-gray-200">
            <Link to="/profile" className="flex items-center gap-1.5">
              <User className="h-4 w-4" />
              {t("app.header.profile")}
            </Link>
          </Button>
        ) : (
          <div className="hidden lg:flex items-center gap-2">
            <Button asChild variant="ghost" size="sm" className="text-gray-700 dark:text-gray-200">
              <Link to="/signin" className="flex items-center gap-1.5">
                <User className="h-4 w-4" />
                {t("app.header.signin")}
              </Link>
            </Button>

            <Button asChild variant="outline" size="sm" className="text-gray-700 dark:text-gray-200">
              <Link to="/signup">Sign Up</Link>
            </Button>
          </div>
        )}
        
        <Button asChild size="sm" className="bg-vitality-600 hover:bg-vitality-700 text-white hidden lg:flex">
          <Link to="/booking" className="flex items-center gap-1.5">
            <CalendarCheck className="h-4 w-4" />
            {t("app.header.booking")}
          </Link>
        </Button>
      </div>
    </div>
  );
};
