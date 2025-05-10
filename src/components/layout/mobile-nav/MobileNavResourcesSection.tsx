
import { useLanguage } from "@/context/LanguageContext";
import { MobileNavAccordion } from "./MobileNavAccordion";
import { MobileNavLink } from "./MobileNavLink";

export const MobileNavResourcesSection = () => {
  const { t } = useLanguage();
  
  return (
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
  );
};
