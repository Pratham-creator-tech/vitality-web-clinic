
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { NavbarLinks } from "./NavbarLinks";
import { MobileNav } from "./MobileNav";
import { Menu } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { LanguageSelector } from "@/components/ui/language-selector";

const Navbar = () => {
  const { user, userRole, signOut } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-white/95 backdrop-blur-md shadow-md dark:bg-gray-900/95" 
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo - with animation and linked to home */}
          <Link to="/" className="flex items-center group">
            <div className="flex items-center">
              {/* Logo Image - No background box, matches navbar background */}
              <motion.img 
                src="/lovable-uploads/d4839bdf-5201-41d9-9549-0b1021009501.png"
                alt="YASHA's Physiocare Logo"
                className="h-10 w-10 object-contain"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                whileHover={{ 
                  scale: 1.05,
                  rotate: [0, -2, 2, -2, 0],
                  transition: { duration: 0.5 }
                }}
              />
              
              {/* Text Logo - Right of the image */}
              <motion.div 
                className="ml-2 font-display text-xl font-bold"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-vitality-700 to-vitality-500 dark:from-vitality-300 dark:to-vitality-500 transition-all duration-300">
                  Physiocare
                </span>
                <motion.span 
                  className="text-accent inline-block"
                  animate={{ 
                    rotate: [0, 8, -5, 0],
                    scale: [1, 1.2, 0.9, 1] 
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 5
                  }}
                >.</motion.span>
              </motion.div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <NavbarLinks />

          {/* Right Side: Book Appointment, Avatar/Sign In */}
          <div className="flex items-center gap-2">
            {/* Book Appointment Button - Visible on both desktop and mobile */}
            <Button asChild size="sm" className="bg-vitality-600 hover:bg-vitality-700 text-white text-sm rounded-full px-4 py-2">
              <Link to="/booking">Book Appointment</Link>
            </Button>

            {/* User Avatar or Sign In - Desktop */}
            <div className="hidden md:block">
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback className="bg-vitality-100 text-vitality-700">
                          {user.email ? user.email.charAt(0).toUpperCase() : "U"}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem asChild>
                        <Link to="/profile">Profile</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/account-settings">Account Settings</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/billing">Billing</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/booking">My Appointments</Link>
                      </DropdownMenuItem>
                      {userRole === "doctor" && (
                        <DropdownMenuItem asChild>
                          <Link to="/patients">My Patients</Link>
                        </DropdownMenuItem>
                      )}
                      {userRole === "patient" && (
                        <DropdownMenuItem asChild>
                          <Link to="/doctors">Find Doctors</Link>
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem asChild>
                        <Link to="/pain-tracker">Pain Tracker</Link>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    {/* Theme Toggle */}
                    <DropdownMenuItem>
                      <div className="flex w-full items-center justify-between">
                        <span>Theme</span>
                        <ThemeToggle />
                      </div>
                    </DropdownMenuItem>
                    {/* Language Selector */}
                    <DropdownMenuItem>
                      <div className="flex w-full items-center justify-between">
                        <span>Language</span>
                        <LanguageSelector />
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => signOut()}>
                      Log Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button asChild variant="ghost" size="sm" className="text-gray-700 dark:text-gray-200">
                  <Link to="/signin">Sign In / Sign Up</Link>
                </Button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden"
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Open menu</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <MobileNav open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </header>
  );
};

export default Navbar;
