
import { Info } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { MobileNavAccordion } from "./MobileNavAccordion";
import { MobileNavLink } from "./MobileNavLink";

export const MobileNavAboutSection = () => {
  const { t } = useLanguage();
  
  return (
    <MobileNavAccordion 
      value="about" 
      title={
        <>
          <Info className="mr-2 h-5 w-5 text-vitality-600" />
          <span>{t("app.header.about")}</span>
        </>
      }
    >
      <MobileNavLink to="/about" className="py-2 hover:text-vitality-600">
        About Us
      </MobileNavLink>
      <MobileNavLink to="/doctor-benefits" className="py-2 hover:text-vitality-600">
        For Doctors
      </MobileNavLink>
      <MobileNavLink to="/virtual-tour" className="py-2 hover:text-vitality-600">
        Virtual Tour
      </MobileNavLink>
    </MobileNavAccordion>
  );
};
