
import { Accordion } from "@/components/ui/accordion";
import { MobileNavMainItems } from "./MobileNavMainItems";
import { MobileNavAboutSection } from "./MobileNavAboutSection";
import { MobileNavServicesSection } from "./MobileNavServicesSection";
import { MobileNavResourcesSection } from "./MobileNavResourcesSection";

export const MobileNavContent = () => {
  return (
    <nav className="flex flex-col space-y-1">
      <MobileNavMainItems />

      <Accordion type="single" collapsible className="w-full">
        <MobileNavAboutSection />
        <MobileNavServicesSection />
        <MobileNavResourcesSection />
      </Accordion>
    </nav>
  );
};
