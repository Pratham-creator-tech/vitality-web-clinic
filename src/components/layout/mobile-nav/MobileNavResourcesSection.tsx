
import { MobileNavAccordion } from "./MobileNavAccordion";
import { MobileNavItemWithIcon } from "./MobileNavItemWithIcon";
import { 
  MessageCircle, 
  Video, 
  Users, 
  Activity, 
  Stethoscope, 
  Brain,
  Apple
} from "lucide-react";

export const MobileNavResourcesSection = () => {
  const resourceItems = [
    {
      href: "/ai-assistant",
      label: "AI Assistant",
      icon: Brain,
      description: "Get instant answers to your health questions"
    },
    {
      href: "/video-library", 
      label: "Exercise Videos",
      icon: Video,
      description: "Guided exercises and rehabilitation videos"
    },
    {
      href: "/interactive-body-map",
      label: "Body Map", 
      icon: Users,
      description: "Interactive body map for targeted exercises"
    },
    {
      href: "/pain-tracker",
      label: "Pain Tracker",
      icon: Activity, 
      description: "Track your pain levels and progress"
    },
    {
      href: "/recommendations",
      label: "Doctor Recommendations",
      icon: Stethoscope,
      description: "Find the right healthcare professional"
    },
    {
      href: "/diet-plan",
      label: "Diet Plan",
      icon: Apple,
      description: "Personalized nutrition and medicine guide"
    }
  ];

  return (
    <MobileNavAccordion title="Resources" defaultOpen={false}>
      <div className="space-y-3">
        {resourceItems.map((item) => (
          <MobileNavItemWithIcon
            key={item.href}
            href={item.href}
            icon={item.icon}
            label={item.label}
            description={item.description}
          />
        ))}
      </div>
    </MobileNavAccordion>
  );
};
