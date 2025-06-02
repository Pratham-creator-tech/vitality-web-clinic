
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { LanguageSelector } from "@/components/ui/language-selector";
import { useAuth } from "@/context/AuthContext";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { User, LogOut, Settings, Calendar, Users, FileText, Activity } from "lucide-react";
import NavbarLinks from "./NavbarLinks";
import MobileNav from "./MobileNav";

const Navbar = () => {
  const { user, userRole, signOut } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const getInitials = (email: string) => {
    return email.split('@')[0].substring(0, 2).toUpperCase();
  };

  const getQuickActions = () => {
    if (userRole === 'doctor') {
      return [
        { icon: Users, label: "View Patients", href: "/patients" },
        { icon: Calendar, label: "Appointments", href: "/booking" },
        { icon: FileText, label: "Reports", href: "/reports" },
      ];
    } else if (userRole === 'patient') {
      return [
        { icon: Calendar, label: "Book Appointment", href: "/booking" },
        { icon: Activity, label: "Health Tracker", href: "/pain-tracker" },
        { icon: FileText, label: "Medical Records", href: "/profile" },
      ];
    } else if (userRole === 'admin') {
      return [
        { icon: Users, label: "Admin Dashboard", href: "/admin" },
        { icon: Settings, label: "Manage Users", href: "/admin" },
        { icon: FileText, label: "Reports", href: "/admin" },
      ];
    }
    return [];
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-vitality-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">V</span>
            </div>
            <span className="text-xl font-bold text-vitality-700 dark:text-vitality-300">
              Vitality Physio
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <NavbarLinks />
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle and Language Selector */}
            <div className="hidden md:flex items-center space-x-2">
              <ThemeToggle />
              <LanguageSelector />
            </div>

            {/* Authentication */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-vitality-600 text-white">
                        {getInitials(user.email || "")}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-80" align="end" forceMount>
                  <div className="flex items-center justify-start gap-2 p-4">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">{user.email}</p>
                      <p className="text-xs text-muted-foreground capitalize">
                        {userRole || 'User'}
                      </p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  
                  {/* Quick Actions */}
                  <div className="p-2">
                    <p className="text-xs font-medium text-muted-foreground mb-2 px-2">Quick Actions</p>
                    <div className="grid grid-cols-1 gap-1">
                      {getQuickActions().map((action, index) => {
                        const Icon = action.icon;
                        return (
                          <DropdownMenuItem key={index} asChild>
                            <Link to={action.href} className="flex items-center gap-2 p-2">
                              <Icon className="h-4 w-4" />
                              <span>{action.label}</span>
                            </Link>
                          </DropdownMenuItem>
                        );
                      })}
                    </div>
                  </div>
                  
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/account-settings" className="flex items-center gap-2">
                      <Settings className="h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="text-red-600 focus:text-red-600">
                    <LogOut className="h-4 w-4 mr-2" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden md:flex items-center space-x-3">
                <Button asChild variant="ghost">
                  <Link to="/signin">Sign In</Link>
                </Button>
                <Button asChild>
                  <Link to="/signup">Get Started</Link>
                </Button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <MobileNav 
                isOpen={isMobileMenuOpen} 
                setIsOpen={setIsMobileMenuOpen}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
