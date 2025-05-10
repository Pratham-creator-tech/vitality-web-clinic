
import { useLocation } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { 
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
} from "@/components/ui/navigation-menu";

import { AboutDropdown } from "./nav/AboutDropdown";
import { ServicesDropdown } from "./nav/ServicesDropdown";
import { ResourcesDropdown } from "./nav/ResourcesDropdown";
import { RoleBasedNavLink } from "./nav/RoleBasedNavLink";
import { NavLink } from "./nav/NavLink";

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

  return (
    <div className="hidden md:flex items-center space-x-1">
      {/* Main Navigation */}
      <div className="flex items-center space-x-1">
        <NavigationMenu>
          <NavigationMenuList>
            <AboutDropdown />
            <ServicesDropdown />
            
            <NavigationMenuItem>
              <NavLink to="/pricing" isActive={isActive("/pricing")}>
                {t("app.header.pricing")}
              </NavLink>
            </NavigationMenuItem>

            {/* Conditionally show Doctors/Patients links based on user role */}
            {user && userRole === "doctor" ? (
              <RoleBasedNavLink 
                role="doctor"
                linkPath="/patients"
                linkText="Patients"
              />
            ) : user && userRole === "patient" ? (
              <RoleBasedNavLink 
                role="patient"
                linkPath="/doctors"
                linkText="Our Doctors"
              />
            ) : null}

            <ResourcesDropdown />
            
            <NavigationMenuItem>
              <NavLink to="/contact" isActive={isActive("/contact")}>
                {t("app.header.contact")}
              </NavLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
};
