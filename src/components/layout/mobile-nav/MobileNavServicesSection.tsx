
import { useLanguage } from "@/context/LanguageContext";
import { MobileNavAccordion } from "./MobileNavAccordion";
import { MobileNavLink } from "./MobileNavLink";

export const MobileNavServicesSection = () => {
  const { t } = useLanguage();
  
  return (
    <MobileNavAccordion 
      value="services" 
      title={<span>{t("app.header.services")}</span>}
    >
      <MobileNavLink to="/services" className="py-2 hover:text-vitality-600">
        All Services
      </MobileNavLink>
      <MobileNavLink to="/services/sports-rehabilitation" className="py-2 hover:text-vitality-600">
        Sports Rehabilitation
      </MobileNavLink>
      <MobileNavLink to="/services/manual-therapy" className="py-2 hover:text-vitality-600">
        Manual Therapy
      </MobileNavLink>
      <MobileNavLink to="/services/post-surgical" className="py-2 hover:text-vitality-600">
        Post-Surgical Rehab
      </MobileNavLink>
      <MobileNavLink to="/services/chronic-pain" className="py-2 hover:text-vitality-600">
        Chronic Pain Management
      </MobileNavLink>
    </MobileNavAccordion>
  );
};
