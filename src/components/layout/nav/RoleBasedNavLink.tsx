
import { useLocation } from "react-router-dom";
import { NavigationMenuItem } from "@/components/ui/navigation-menu";
import { NavLink } from "./NavLink";

interface RoleBasedNavLinkProps {
  role: string;
  linkPath: string;
  linkText: string;
}

export const RoleBasedNavLink = ({ role, linkPath, linkText }: RoleBasedNavLinkProps) => {
  const { pathname } = useLocation();
  const isActive = pathname === linkPath;

  return (
    <NavigationMenuItem>
      <NavLink to={linkPath} isActive={isActive}>
        {linkText}
      </NavLink>
    </NavigationMenuItem>
  );
};
