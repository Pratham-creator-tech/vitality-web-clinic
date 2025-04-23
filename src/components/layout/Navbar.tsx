
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { LanguageSelector } from "@/components/ui/language-selector";
import { NavbarLinks } from "./NavbarLinks";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Button } from "@/components/ui/button";
import UserMenu from "@/components/layout/UserMenu";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  
  // Close mobile menu when changing routes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Add scroll listener to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-white/95 backdrop-blur-sm shadow-md py-2" 
          : "bg-transparent py-4"
      }`}
    >
      <nav className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center space-x-2"
          aria-label="Vitality Physio Home"
        >
          <span className="text-xl font-bold text-vitality-600">
            Vitality<span className="text-vitality-400">Physio</span>
          </span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          <NavbarLinks className="flex" />
        </div>
        
        {/* Desktop Actions Area */}
        <div className="hidden md:flex items-center space-x-2">
          <LanguageSelector />
          <ThemeToggle />
          <UserMenu />
        </div>
        
        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden space-x-2">
          <ThemeToggle />
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            className="ml-1"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>
      </nav>
      
      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden w-full bg-background shadow-lg absolute top-full left-0 right-0 py-4 border-t"
          >
            <div className="container mx-auto px-4 flex flex-col space-y-4">
              <NavbarLinks className="flex flex-col space-y-2" />
              <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                <LanguageSelector />
                <UserMenu />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
