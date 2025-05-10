
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import React from "react";

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export const NavbarLinks = () => {
  const { pathname } = useLocation();
  const { t } = useLanguage();
  const { user, userRole } = useAuth();

  const isActive = (path: string) => {
    if (path === "/services" && pathname.includes("/services/")) {
      return true;
    }
    return pathname === path;
  };

  const linkStyle = "relative flex items-center gap-1.5 text-sm font-medium py-2 px-3 hover:text-vitality-500 transition-colors";
  const activeLinkStyle = "text-vitality-500 font-semibold";

  return (
    <div className="hidden md:flex items-center space-x-1">
      {/* Main Navigation */}
      <div className="flex items-center space-x-1">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger 
                className={`${pathname.includes("/about") || pathname.includes("/doctor-benefits") ? activeLinkStyle : ""}`}
              >
                {t("app.header.about")}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-4 w-[200px]">
                  <li>
                    <NavigationMenuLink asChild>
                      <Link to="/about" className="block p-2 hover:bg-accent rounded">
                        About Us
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link to="/doctor-benefits" className="block p-2 hover:bg-accent rounded">
                        For Doctors
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link to="/virtual-tour" className="block p-2 hover:bg-accent rounded">
                        Virtual Tour
                      </Link>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger 
                className={`${pathname.includes("/services") ? activeLinkStyle : ""}`}
              >
                {t("app.header.services")}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid grid-cols-2 gap-3 p-4 w-[400px]">
                  <ListItem title="All Services" href="/services">
                    View our complete catalog of physiotherapy services
                  </ListItem>
                  <ListItem title="Sports Rehabilitation" href="/services/sports-rehabilitation">
                    Recovery and training for athletes
                  </ListItem>
                  <ListItem title="Manual Therapy" href="/services/manual-therapy">
                    Hands-on techniques for pain relief
                  </ListItem>
                  <ListItem title="Post-Surgical" href="/services/post-surgical">
                    Rehabilitation after surgery
                  </ListItem>
                  <ListItem title="Chronic Pain" href="/services/chronic-pain">
                    Management and treatment approaches
                  </ListItem>
                  <ListItem title="Neurological" href="/services/neurological">
                    Treatment for neurological conditions
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
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
            </NavigationMenuItem>

            {/* Conditionally show Doctors/Patients links based on user role */}
            {user && userRole === "doctor" ? (
              <NavigationMenuItem>
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
              </NavigationMenuItem>
            ) : user && userRole === "patient" ? (
              <NavigationMenuItem>
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
              </NavigationMenuItem>
            ) : null}

            <NavigationMenuItem>
              <NavigationMenuTrigger 
                className={`${pathname.includes("/interactive-body-map") || 
                pathname.includes("/video-library") || 
                pathname.includes("/pain-tracker") || 
                pathname.includes("/ai-assistant") ? activeLinkStyle : ""}`}
              >
                {t("app.menu.resources")}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid grid-cols-2 gap-3 p-4 w-[400px]">
                  <ListItem title="Body Map" href="/interactive-body-map">
                    Explore an interactive body map
                  </ListItem>
                  <ListItem title="Pain Tracker" href="/pain-tracker">
                    Track and monitor your pain levels
                  </ListItem>
                  <ListItem title="Video Library" href="/video-library">
                    Exercise and rehabilitation videos
                  </ListItem>
                  <ListItem title="AI Assistant" href="/ai-assistant">
                    Get help from our AI assistant
                  </ListItem>
                  <ListItem title="Blog" href="/blog">
                    Health articles and resources
                  </ListItem>
                  <ListItem title="FAQ" href="/faq">
                    Frequently asked questions
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
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
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
};
