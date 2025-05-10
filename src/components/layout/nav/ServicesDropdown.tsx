
import { useLocation } from "react-router-dom";
import { 
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu";
import { useLanguage } from "@/context/LanguageContext";
import { NavDropdownItem } from "./NavDropdownItem";

export const ServicesDropdown = () => {
  const { pathname } = useLocation();
  const { t } = useLanguage();

  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger 
        className={`${pathname.includes("/services") ? "text-vitality-500 font-semibold" : ""}`}
      >
        {t("app.header.services")}
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid grid-cols-2 gap-3 p-4 w-[400px]">
          <NavDropdownItem title="All Services" href="/services">
            View our complete catalog of physiotherapy services
          </NavDropdownItem>
          <NavDropdownItem title="Sports Rehabilitation" href="/services/sports-rehabilitation">
            Recovery and training for athletes
          </NavDropdownItem>
          <NavDropdownItem title="Manual Therapy" href="/services/manual-therapy">
            Hands-on techniques for pain relief
          </NavDropdownItem>
          <NavDropdownItem title="Post-Surgical" href="/services/post-surgical">
            Rehabilitation after surgery
          </NavDropdownItem>
          <NavDropdownItem title="Chronic Pain" href="/services/chronic-pain">
            Management and treatment approaches
          </NavDropdownItem>
          <NavDropdownItem title="Neurological" href="/services/neurological">
            Treatment for neurological conditions
          </NavDropdownItem>
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};
