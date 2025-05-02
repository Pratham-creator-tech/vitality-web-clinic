
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
            <motion.span 
              className="font-display text-xl md:text-2xl font-bold text-vitality-700 dark:text-vitality-300"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-vitality-700 to-vitality-500 dark:from-vitality-300 dark:to-vitality-500 transition-all duration-300">
                YASHA's Physiocare
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
            </motion.span>
          </Link>

          {/* Desktop Navigation */}
          <NavbarLinks />

          {/* Right Side: Theme, Language, Avatar */}
          <div className="flex items-center gap-2">
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
              <div className="flex gap-2">
                <Button asChild variant="ghost" size="sm" className="text-gray-700 dark:text-gray-200">
                  <Link to="/signin">Sign In / Sign Up</Link>
                </Button>
              </div>
            )}

            {/* Booking Button - Make sure it's always visible */}
            <Button asChild size="sm" className="bg-vitality-600 hover:bg-vitality-700 text-white hidden md:flex">
              <Link to="/booking">Book Appointment</Link>
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden"
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
