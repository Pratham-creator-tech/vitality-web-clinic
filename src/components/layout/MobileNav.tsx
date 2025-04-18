import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { UserPlus, LogIn } from "lucide-react";

interface MobileNavProps {
  isMenuOpen: boolean;
  isActive: (path: string) => boolean;
  toggleMenu: () => void;
}

export const MobileNav = ({ isMenuOpen, isActive, toggleMenu }: MobileNavProps) => {
  const services = [
    { name: "Sports Rehabilitation", path: "/services/sports-rehabilitation" },
    { name: "Manual Therapy", path: "/services/manual-therapy" },
    { name: "Post-Surgical Rehabilitation", path: "/services/post-surgical" },
    { name: "Chronic Pain Management", path: "/services/chronic-pain" },
    { name: "Neurological Rehabilitation", path: "/services/neurological" },
    { name: "Strength & Conditioning", path: "/services/strength-conditioning" },
  ];

  if (!isMenuOpen) return null;

  return (
    <div className="md:hidden">
      <div className="container mx-auto px-4 py-4 flex flex-col space-y-3 bg-white">
        <Link 
          to="/" 
          className={`text-gray-700 hover:text-vitality-400 font-medium px-4 py-2 rounded-md hover:bg-gray-50 transition-colors ${isActive("/") ? "bg-accent/20" : ""}`}
          onClick={toggleMenu}
        >
          Home
        </Link>
        
        <Link 
          to="/about" 
          className={`text-gray-700 hover:text-vitality-400 font-medium px-4 py-2 rounded-md hover:bg-gray-50 transition-colors ${isActive("/about") ? "bg-accent/20" : ""}`}
          onClick={toggleMenu}
        >
          About Us
        </Link>
        
        {/* Services dropdown for mobile */}
        <div className="relative">
          <DropdownMenu>
            <DropdownMenuTrigger className={`w-full text-left text-gray-700 hover:text-vitality-400 font-medium px-4 py-2 rounded-md hover:bg-gray-50 transition-colors ${isActive("/services") ? "bg-accent/20" : ""} flex items-center justify-between`}>
              <span>Services</span>
              <ChevronDown size={16} />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-full bg-white">
              <DropdownMenuItem asChild>
                <Link 
                  to="/services" 
                  className="w-full cursor-pointer"
                  onClick={toggleMenu}
                >
                  All Services
                </Link>
              </DropdownMenuItem>
              {services.map((service, index) => (
                <DropdownMenuItem key={index} asChild>
                  <Link 
                    to={service.path} 
                    className="w-full cursor-pointer"
                    onClick={toggleMenu}
                  >
                    {service.name}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <Link 
          to="/pricing" 
          className={`text-gray-700 hover:text-vitality-400 font-medium px-4 py-2 rounded-md hover:bg-gray-50 transition-colors ${isActive("/pricing") ? "bg-accent/20" : ""}`}
          onClick={toggleMenu}
        >
          Pricing
        </Link>
        <Link 
          to="/blog" 
          className={`text-gray-700 hover:text-vitality-400 font-medium px-4 py-2 rounded-md hover:bg-gray-50 transition-colors ${isActive("/blog") ? "bg-accent/20" : ""}`}
          onClick={toggleMenu}
        >
          Blog
        </Link>
        <Link 
          to="/faq" 
          className={`text-gray-700 hover:text-vitality-400 font-medium px-4 py-2 rounded-md hover:bg-gray-50 transition-colors ${isActive("/faq") ? "bg-accent/20" : ""}`}
          onClick={toggleMenu}
        >
          FAQ
        </Link>
        <Link 
          to="/contact" 
          className={`text-gray-700 hover:text-vitality-400 font-medium px-4 py-2 rounded-md hover:bg-gray-50 transition-colors ${isActive("/contact") ? "bg-accent/20" : ""}`}
          onClick={toggleMenu}
        >
          Contact
        </Link>
        <Link 
          to="/doctor-registration" 
          className={`text-gray-700 hover:text-vitality-400 font-medium px-4 py-2 rounded-md hover:bg-gray-50 transition-colors ${isActive("/doctor-registration") ? "bg-accent/20" : ""} flex items-center`}
          onClick={toggleMenu}
        >
          <UserPlus size={16} className="mr-1" />
          Join Our Team
        </Link>
        
        <div className="pt-2 border-t border-gray-100">
          <Link 
            to="/signin" 
            className="flex items-center text-gray-700 hover:text-vitality-400 font-medium px-4 py-2 rounded-md hover:bg-gray-50 transition-colors"
            onClick={toggleMenu}
          >
            <LogIn size={16} className="mr-1" />
            Sign In
          </Link>
          <Link 
            to="/signup" 
            className="flex items-center text-gray-700 hover:text-vitality-400 font-medium px-4 py-2 mt-2 rounded-md bg-vitality-100 hover:bg-vitality-200 transition-colors"
            onClick={toggleMenu}
          >
            Sign Up
          </Link>
          <Button asChild className="mt-3 w-full bg-accent hover:bg-accent/90">
            <Link to="/booking" onClick={toggleMenu}>Book Now</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
