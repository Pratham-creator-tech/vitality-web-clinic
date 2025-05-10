
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from "@/components/ui/navigation-menu";
import { useAuth } from "@/context/AuthContext";

export const NavbarLinks = () => {
  const { userRole } = useAuth();
  
  const links = [
    { 
      name: "About", 
      href: "/about",
      dropdown: [
        { name: "Our Story", href: "/about#story" },
        { name: "Our Team", href: "/about#team" },
        { name: "Our Mission", href: "/about#mission" },
        { name: "Our Values", href: "/about#values" }
      ]
    },
    { 
      name: "Services", 
      href: "/services",
      dropdown: [
        { name: "Sports Rehabilitation", href: "/services/sports-rehabilitation" },
        { name: "Manual Therapy", href: "/services/manual-therapy" },
        { name: "Post-Surgical Rehabilitation", href: "/services/post-surgical" },
        { name: "Chronic Pain Management", href: "/services/chronic-pain" },
        { name: "Neurological Rehabilitation", href: "/services/neurological" },
        { name: "Women's Health", href: "/services/womens-health" },
        { name: "View All Services", href: "/services" }
      ]
    },
    { name: "Pricing", href: "/pricing" },
    { name: "Insurance", href: "/insurance" },
    { 
      name: "Resources", 
      href: "/faq",
      dropdown: [
        { name: "FAQ", href: "/faq" },
        { name: "Blog", href: "/blog" },
        { name: "Video Library", href: "/video-library" },
        { name: "Pain Tracker", href: "/pain-tracker" },
        { name: "Interactive Body Map", href: "/interactive-body-map" }
      ]
    },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <NavigationMenu className="hidden lg:flex">
      <NavigationMenuList className="flex items-center space-x-1 ml-6">
        {links.map((link) => (
          link.dropdown ? (
            <NavigationMenuItem key={link.name}>
              <NavigationMenuTrigger className="px-3 py-2 text-sm font-medium bg-transparent hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent">
                {link.name}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[200px] gap-1 p-2">
                  {link.dropdown.map((item) => (
                    <li key={item.name}>
                      <NavigationMenuLink asChild>
                        <NavLink
                          to={item.href}
                          className={({ isActive }) =>
                            cn(
                              "block select-none rounded-md p-2 text-sm font-medium leading-none no-underline outline-none transition-colors",
                              isActive
                                ? "bg-vitality-50 text-vitality-600 dark:bg-gray-800 dark:text-vitality-400"
                                : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                            )
                          }
                        >
                          {item.name}
                        </NavLink>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          ) : (
            <NavLink
              key={link.name}
              to={link.href}
              className={({ isActive }) =>
                cn(
                  "px-3 py-2 rounded-md text-sm font-medium transition-colors relative group",
                  isActive
                    ? "text-vitality-600 dark:text-vitality-400"
                    : "text-gray-700 hover:text-vitality-600 dark:text-gray-300 dark:hover:text-vitality-400"
                )
              }
            >
              {({ isActive }) => (
                <>
                  {link.name}
                  {isActive && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-vitality-500 rounded-full mx-1"
                      layoutId="navbar-indicator"
                    />
                  )}
                </>
              )}
            </NavLink>
          )
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};
