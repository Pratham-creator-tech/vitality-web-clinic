
import { Home, Info, Phone } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { MobileNavLink } from "./MobileNavLink";
import { MobileNavItemWithIcon } from "./MobileNavItemWithIcon";

export const MobileNavMainItems = () => {
  const { t } = useLanguage();
  
  return (
    <>
      <MobileNavItemWithIcon to="/" icon={Home}>
        {t("app.header.home")}
      </MobileNavItemWithIcon>
      
      <MobileNavLink to="/pricing">
        <span>{t("app.header.pricing")}</span>
      </MobileNavLink>
      
      <MobileNavItemWithIcon to="/contact" icon={Phone}>
        {t("app.header.contact")}
      </MobileNavItemWithIcon>
    </>
  );
};
