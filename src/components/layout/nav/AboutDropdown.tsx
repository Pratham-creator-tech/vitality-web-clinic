
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { 
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { useLanguage } from "@/context/LanguageContext";

export const AboutDropdown = () => {
  const { pathname } = useLocation();
  const { t } = useLanguage();

  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger 
        className={`${pathname.includes("/about") || pathname.includes("/doctor-benefits") ? "text-vitality-500 font-semibold" : ""}`}
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
  );
};
