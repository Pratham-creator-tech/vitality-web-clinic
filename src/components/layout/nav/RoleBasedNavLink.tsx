
import { useLocation } from "react-router-dom";
import { NavigationMenuItem } from "@/components/ui/navigation-menu";
import { NavLink } from "./NavLink";
import { useAuth } from "@/context/AuthContext";

interface RoleBasedNavLinkProps {
  role?: string;
  linkPath: string;
  linkText: string;
}

export const RoleBasedNavLink = ({ role, linkPath, linkText }: RoleBasedNavLinkProps) => {
  const { pathname } = useLocation();
  const { userRole } = useAuth();
  const isActive = pathname === linkPath;

  // If role is specified, only show for that role
  if (role && userRole !== role) {
    return null;
  }

  return (
    <NavigationMenuItem>
      <NavLink to={linkPath} isActive={isActive}>
        {linkText}
      </NavLink>
    </NavigationMenuItem>
  );
};
