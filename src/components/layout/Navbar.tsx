
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4 py-4 md:py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold font-display text-vitality-600">
            <span className="text-vitality-400">Vitality</span> Physio
          </span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-gray-700 hover:text-vitality-400 font-medium transition-colors">
            Home
          </Link>
          <Link to="/about" className="text-gray-700 hover:text-vitality-400 font-medium transition-colors">
            About Us
          </Link>
          <Link to="/services" className="text-gray-700 hover:text-vitality-400 font-medium transition-colors">
            Services
          </Link>
          <Link to="/blog" className="text-gray-700 hover:text-vitality-400 font-medium transition-colors">
            Blog
          </Link>
          <Link to="/faq" className="text-gray-700 hover:text-vitality-400 font-medium transition-colors">
            FAQ
          </Link>
          <Link to="/contact" className="text-gray-700 hover:text-vitality-400 font-medium transition-colors">
            Contact
          </Link>
          <Link to="/doctor-registration" className="text-gray-700 hover:text-vitality-400 font-medium transition-colors flex items-center">
            <UserPlus size={16} className="mr-1" />
            Join Our Team
          </Link>
          <Link to="/profile" className="text-gray-700 hover:text-vitality-400 font-medium transition-colors">
            Profile
          </Link>
          <Button asChild className="bg-accent hover:bg-accent/90">
            <Link to="/booking">Book Now</Link>
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-gray-700 hover:text-vitality-400"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4 bg-white">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-vitality-400 font-medium px-4 py-2 rounded-md hover:bg-gray-50 transition-colors"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className="text-gray-700 hover:text-vitality-400 font-medium px-4 py-2 rounded-md hover:bg-gray-50 transition-colors"
              onClick={toggleMenu}
            >
              About Us
            </Link>
            <Link 
              to="/services" 
              className="text-gray-700 hover:text-vitality-400 font-medium px-4 py-2 rounded-md hover:bg-gray-50 transition-colors"
              onClick={toggleMenu}
            >
              Services
            </Link>
            <Link 
              to="/blog" 
              className="text-gray-700 hover:text-vitality-400 font-medium px-4 py-2 rounded-md hover:bg-gray-50 transition-colors"
              onClick={toggleMenu}
            >
              Blog
            </Link>
            <Link 
              to="/faq" 
              className="text-gray-700 hover:text-vitality-400 font-medium px-4 py-2 rounded-md hover:bg-gray-50 transition-colors"
              onClick={toggleMenu}
            >
              FAQ
            </Link>
            <Link 
              to="/contact" 
              className="text-gray-700 hover:text-vitality-400 font-medium px-4 py-2 rounded-md hover:bg-gray-50 transition-colors"
              onClick={toggleMenu}
            >
              Contact
            </Link>
            <Link 
              to="/doctor-registration" 
              className="text-gray-700 hover:text-vitality-400 font-medium px-4 py-2 rounded-md hover:bg-gray-50 transition-colors flex items-center"
              onClick={toggleMenu}
            >
              <UserPlus size={16} className="mr-1" />
              Join Our Team
            </Link>
            <Link 
              to="/profile" 
              className="text-gray-700 hover:text-vitality-400 font-medium px-4 py-2 rounded-md hover:bg-gray-50 transition-colors"
              onClick={toggleMenu}
            >
              Profile
            </Link>
            <Button asChild className="bg-accent hover:bg-accent/90 w-full">
              <Link to="/booking" onClick={toggleMenu}>Book Now</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
