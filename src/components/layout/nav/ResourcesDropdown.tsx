
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { NavDropdownItem } from "./NavDropdownItem";

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
          >
            Get instant answers to your health questions
          </NavDropdownItem>
          <NavDropdownItem
            href="/video-library"
            title="Exercise Videos"
          >
            Guided exercises and rehabilitation videos
          </NavDropdownItem>
          <NavDropdownItem
            href="/interactive-body-map"
            title="Body Map"
          >
            Interactive body map for targeted exercises
          </NavDropdownItem>
          <NavDropdownItem
            href="/pain-tracker"
            title="Pain Tracker"
          >
            Track your pain levels and progress
          </NavDropdownItem>
          <NavDropdownItem
            href="/recommendations"
            title="Doctor Recommendations"
          >
            Find the right healthcare professional
          </NavDropdownItem>
          <NavDropdownItem
            href="/diet-plan"
            title="Diet Plan"
          >
            Personalized nutrition and medicine guide
          </NavDropdownItem>
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};
