
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const NavbarLinks = () => {
  const { pathname } = useLocation();
  const { t } = useLanguage();

  const isActive = (path: string) => {
    if (path === "/services" && pathname.includes("/services/")) {
      return true;
    }
    return pathname === path;
  };

  const linkStyle = "relative flex items-center gap-1.5 text-sm font-medium py-2 px-3 hover:text-vitality-500 transition-colors";
  const activeLinkStyle = "text-vitality-500 font-semibold";

  return (
    <div className="hidden lg:flex items-center space-x-1">
      {/* Main Navigation */}
      <div className="flex items-center space-x-1">
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

        {/* Doctors link for all users */}
        <Link
          to="/doctors"
          className={`${linkStyle} ${isActive("/doctors") ? activeLinkStyle : "text-gray-700 dark:text-gray-200"}`}
        >
          Our Doctors
          {isActive("/doctors") && (
            <motion.span
              layoutId="navigation-underline"
              className="absolute left-3 right-3 bottom-0 h-0.5 bg-vitality-400"
              animate={{ opacity: 1 }}
              initial={{ opacity: 0 }}
            />
          )}
        </Link>

        {/* Patients link for all users */}
        <Link
          to="/patients"
          className={`${linkStyle} ${isActive("/patients") ? activeLinkStyle : "text-gray-700 dark:text-gray-200"}`}
        >
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
    </div>
  );
};
