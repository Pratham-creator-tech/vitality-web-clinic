
import { Home, Info, Phone, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { MobileNavLink } from "./MobileNavLink";
import { MobileNavItemWithIcon } from "./MobileNavItemWithIcon";

export const MobileNavMainItems = () => {
  const { t } = useLanguage();
  const { userRole } = useAuth();
  
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

      {userRole === "doctor" && (
        <MobileNavItemWithIcon to="/patients" icon={Info}>
          My Patients
        </MobileNavItemWithIcon>
      )}

      {userRole === "patient" && (
        <MobileNavItemWithIcon to="/doctors" icon={Info}>
          Our Doctors
        </MobileNavItemWithIcon>
      )}

      {userRole === "admin" && (
        <MobileNavItemWithIcon to="/admin" icon={ShieldCheck}>
          Admin Dashboard
        </MobileNavItemWithIcon>
      )}
    </>
  );
};
