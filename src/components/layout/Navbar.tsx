
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, UserPlus, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold font-display text-vitality-600">
            <span className="text-vitality-400">Vitality</span> Physio
          </span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/">
                  <NavigationMenuLink 
                    className={navigationMenuTriggerStyle() + (isActive("/") ? " bg-accent/20" : "")}
                  >
                    Home
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>About</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-6 w-[400px]">
                    <li className="row-span-3">
                      <Link to="/about">
                        <NavigationMenuLink
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-vitality-50 to-vitality-100 p-6 no-underline outline-none focus:shadow-md"
                        >
                          <div className="mb-2 mt-4 text-lg font-medium text-vitality-600">About Us</div>
                          <p className="text-sm leading-tight text-vitality-600/80">
                            Learn about our clinic, mission and team of professionals
                          </p>
                        </NavigationMenuLink>
                      </Link>
                    </li>
                    <li>
                      <Link to="/doctor-registration">
                        <NavigationMenuLink 
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">Join Our Team</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Apply to become a part of our physio team
                          </p>
                        </NavigationMenuLink>
                      </Link>
                    </li>
                    <li>
                      <Link to="/faq">
                        <NavigationMenuLink 
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">FAQ</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Frequently asked questions about our services
                          </p>
                        </NavigationMenuLink>
                      </Link>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link to="/services">
                  <NavigationMenuLink 
                    className={navigationMenuTriggerStyle() + (isActive("/services") ? " bg-accent/20" : "")}
                  >
                    Services
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link to="/blog">
                  <NavigationMenuLink 
                    className={navigationMenuTriggerStyle() + (isActive("/blog") ? " bg-accent/20" : "")}
                  >
                    Blog
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link to="/contact">
                  <NavigationMenuLink 
                    className={navigationMenuTriggerStyle() + (isActive("/contact") ? " bg-accent/20" : "")}
                  >
                    Contact
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center ml-6 space-x-3">
            <Button variant="outline" asChild size="sm" className="border-vitality-400 text-vitality-400 hover:bg-vitality-50">
              <Link to="/signin"><LogIn size={14} className="mr-1" /> Sign In</Link>
            </Button>
            <Button asChild size="sm" className="bg-accent hover:bg-accent/90">
              <Link to="/signup">Sign Up</Link>
            </Button>
            <Button asChild size="sm" className="bg-vitality-400 hover:bg-vitality-500">
              <Link to="/booking">Book Now</Link>
            </Button>
          </div>
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
            <Link 
              to="/services" 
              className={`text-gray-700 hover:text-vitality-400 font-medium px-4 py-2 rounded-md hover:bg-gray-50 transition-colors ${isActive("/services") ? "bg-accent/20" : ""}`}
              onClick={toggleMenu}
            >
              Services
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
            <Link 
              to="/profile" 
              className={`text-gray-700 hover:text-vitality-400 font-medium px-4 py-2 rounded-md hover:bg-gray-50 transition-colors ${isActive("/profile") ? "bg-accent/20" : ""}`}
              onClick={toggleMenu}
            >
              Profile
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
      )}
    </header>
  );
};

export default Navbar;
