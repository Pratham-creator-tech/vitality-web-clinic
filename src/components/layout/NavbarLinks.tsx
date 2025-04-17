
import { useAuth } from "@/context/AuthContext";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";
import { Users, Bot, Award } from "lucide-react";

export function NavbarLinks({ className }: { className?: string }) {
  const { user, userRole } = useAuth();

  return (
    <NavigationMenu className={className}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link to="/about">About</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        
        <NavigationMenuItem>
          <NavigationMenuTrigger>Services</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid grid-cols-2 gap-3 p-4 w-[500px]">
              <Link
                to="/services/sports-rehabilitation"
                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <div className="text-sm font-medium leading-none">Sports Rehabilitation</div>
                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                  Specialized programs for athletes to recover from injuries
                </p>
              </Link>
              <Link
                to="/services/manual-therapy"
                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <div className="text-sm font-medium leading-none">Manual Therapy</div>
                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                  Hands-on techniques to reduce pain and improve mobility
                </p>
              </Link>
              <Link
                to="/services/post-surgical"
                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <div className="text-sm font-medium leading-none">Post-Surgical Rehabilitation</div>
                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                  Comprehensive care to help patients recover after surgery
                </p>
              </Link>
              <Link
                to="/services/chronic-pain"
                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <div className="text-sm font-medium leading-none">Chronic Pain Management</div>
                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                  Evidence-based approaches to manage persistent pain
                </p>
              </Link>
              <Link
                to="/services/neurological"
                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <div className="text-sm font-medium leading-none">Neurological Rehabilitation</div>
                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                  Specialized therapy for neurological conditions
                </p>
              </Link>
              <Link
                to="/services/strength-conditioning"
                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <div className="text-sm font-medium leading-none">Strength & Conditioning</div>
                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                  Personalized programs to build strength and prevent injuries
                </p>
              </Link>
              <Link
                to="/services"
                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground bg-muted"
              >
                <div className="text-sm font-medium leading-none">View All Services</div>
                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                  See our complete range of physiotherapy services
                </p>
              </Link>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link to="/pricing">Pricing</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link to="/contact">Contact</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link to="/ai-assistant" className="flex items-center">
              <Bot className="mr-2 h-4 w-4" />
              AI Assistant
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        
        {userRole === "doctor" && (
          <NavigationMenuItem>
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
              <Link to="/patients" className="flex items-center">
                <Users className="mr-2 h-4 w-4" />
                Patients
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        )}
        
        {!user && (
          <NavigationMenuItem>
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
              <Link to="/doctor-benefits" className="flex items-center">
                <Award className="mr-2 h-4 w-4" />
                For Doctors
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
