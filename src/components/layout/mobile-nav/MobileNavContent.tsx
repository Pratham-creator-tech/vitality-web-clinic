
import { Link } from "react-router-dom";
import { Accordion } from "@/components/ui/accordion";
import { SheetClose } from "@/components/ui/sheet";
import { CalendarCheck, Home, Info, Phone } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { MobileNavLink } from "./MobileNavLink";
import { MobileNavAccordion } from "./MobileNavAccordion";

export const MobileNavContent = () => {
  const { t } = useLanguage();
  
  return (
    <nav className="flex flex-col space-y-1">
      <MobileNavLink to="/">
        <Home className="mr-2 h-5 w-5 text-vitality-600" />
        <span>{t("app.header.home")}</span>
      </MobileNavLink>

      <Accordion type="single" collapsible className="w-full">
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

        <MobileNavAccordion 
          value="resources" 
          title={<span>Resources</span>}
        >
          <MobileNavLink to="/interactive-body-map" className="py-2 hover:text-vitality-600">
            {t("app.feature.bodymap")}
          </MobileNavLink>
          <MobileNavLink to="/pain-tracker" className="py-2 hover:text-vitality-600">
            {t("app.feature.paintracker")}
          </MobileNavLink>
          <MobileNavLink to="/video-library" className="py-2 hover:text-vitality-600">
            {t("app.feature.videolibrary")}
          </MobileNavLink>
          <MobileNavLink to="/ai-assistant" className="py-2 hover:text-vitality-600">
            AI Assistant
          </MobileNavLink>
          <MobileNavLink to="/blog" className="py-2 hover:text-vitality-600">
            {t("app.header.blog")}
          </MobileNavLink>
        </MobileNavAccordion>
      </Accordion>

      <MobileNavLink to="/pricing">
        <span>{t("app.header.pricing")}</span>
      </MobileNavLink>

      <MobileNavLink to="/contact">
        <Phone className="mr-2 h-5 w-5 text-vitality-600" />
        <span>{t("app.header.contact")}</span>
      </MobileNavLink>
    </nav>
  );
};
