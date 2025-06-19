
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { NavDropdownItem } from "./NavDropdownItem";
import { 
  MessageCircle, 
  Video, 
  Users, 
  Activity, 
  Stethoscope, 
  Brain,
  Apple
} from "lucide-react";

export const ResourcesDropdown = () => {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger className="text-gray-700 hover:text-blue-600 font-medium">
        Resources
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-white shadow-xl border border-gray-100 rounded-lg">
          <NavDropdownItem
            href="/ai-assistant"
            title="AI Assistant"
            description="Get instant answers to your health questions"
            icon={<Brain className="h-4 w-4" />}
          />
          <NavDropdownItem
            href="/video-library"
            title="Exercise Videos"
            description="Guided exercises and rehabilitation videos"
            icon={<Video className="h-4 w-4" />}
          />
          <NavDropdownItem
            href="/interactive-body-map"
            title="Body Map"
            description="Interactive body map for targeted exercises"
            icon={<Users className="h-4 w-4" />}
          />
          <NavDropdownItem
            href="/pain-tracker"
            title="Pain Tracker"
            description="Track your pain levels and progress"
            icon={<Activity className="h-4 w-4" />}
          />
          <NavDropdownItem
            href="/recommendations"
            title="Doctor Recommendations"
            description="Find the right healthcare professional"
            icon={<Stethoscope className="h-4 w-4" />}
          />
          <NavDropdownItem
            href="/diet-plan"
            title="Diet Plan"
            description="Personalized nutrition and medicine guide"
            icon={<Apple className="h-4 w-4" />}
          />
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};
