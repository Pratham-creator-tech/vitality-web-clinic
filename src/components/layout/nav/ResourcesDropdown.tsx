
import { useLocation } from "react-router-dom";
import { 
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu";
import { useLanguage } from "@/context/LanguageContext";
import { NavDropdownItem } from "./NavDropdownItem";

export const ResourcesDropdown = () => {
  const { pathname } = useLocation();
  const { t } = useLanguage();

  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger 
        className={`${pathname.includes("/interactive-body-map") || 
        pathname.includes("/video-library") || 
        pathname.includes("/pain-tracker") || 
        pathname.includes("/ai-assistant") ? "text-vitality-500 font-semibold" : ""}`}
      >
        {t("app.menu.resources")}
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid grid-cols-2 gap-3 p-4 w-[400px]">
          <NavDropdownItem title="Body Map" href="/interactive-body-map">
            Explore an interactive body map
          </NavDropdownItem>
          <NavDropdownItem title="Pain Tracker" href="/pain-tracker">
            Track and monitor your pain levels
          </NavDropdownItem>
          <NavDropdownItem title="Video Library" href="/video-library">
            Exercise and rehabilitation videos
          </NavDropdownItem>
          <NavDropdownItem title="AI Assistant" href="/ai-assistant">
            Get help from our AI assistant
          </NavDropdownItem>
          <NavDropdownItem title="Blog" href="/blog">
            Health articles and resources
          </NavDropdownItem>
          <NavDropdownItem title="FAQ" href="/faq">
            Frequently asked questions
          </NavDropdownItem>
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};
