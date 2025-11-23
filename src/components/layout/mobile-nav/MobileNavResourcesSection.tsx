import { MobileNavAccordion } from "./MobileNavAccordion";
import { MobileNavItemWithIcon } from "./MobileNavItemWithIcon";
import { 
  MessageCircle, 
  Video, 
  Users, 
  Activity, 
  Stethoscope, 
  Brain,
  TrendingUp,
  HelpCircle
} from "lucide-react";

export const MobileNavResourcesSection = () => {
  const resourceItems = [
    {
      to: "/service-selector",
      label: "Service Selector Quiz",
      icon: HelpCircle,
    },
    {
      to: "/ai-assistant",
      label: "AI Assistant",
      icon: Brain,
    },
    {
      to: "/video-library", 
      label: "Exercise Videos",
      icon: Video,
    },
    {
      to: "/interactive-body-map",
      label: "Body Map", 
      icon: Users,
    },
    {
      to: "/pain-tracker",
      label: "Pain Tracker",
      icon: Activity, 
    },
    {
      to: "/progress-tracker",
      label: "Progress Tracker",
      icon: TrendingUp,
    },
    {
      to: "/recommendations",
      label: "Doctor Recommendations",
      icon: Stethoscope,
    }
  ];

  return (
    <MobileNavAccordion value="resources" title="Resources">
      <div className="space-y-3">
        {resourceItems.map((item) => (
          <MobileNavItemWithIcon
            key={item.to}
            to={item.to}
            icon={item.icon}
          >
            {item.label}
          </MobileNavItemWithIcon>
        ))}
      </div>
    </MobileNavAccordion>
  );
};
