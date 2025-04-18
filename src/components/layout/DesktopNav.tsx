import { Link, useLocation } from "react-router-dom";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuTrigger, NavigationMenuContent, NavigationMenuList, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";

export const DesktopNav = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  const services = [
    { name: "Sports Rehabilitation", path: "/services/sports-rehabilitation" },
    { name: "Manual Therapy", path: "/services/manual-therapy" },
    { name: "Post-Surgical Rehabilitation", path: "/services/post-surgical" },
    { name: "Chronic Pain Management", path: "/services/chronic-pain" },
    { name: "Neurological Rehabilitation", path: "/services/neurological" },
    { name: "Strength & Conditioning", path: "/services/strength-conditioning" },
  ];

  return (
    <nav className="hidden md:flex items-center">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link to="/">
              <NavigationMenuLink 
                className={navigationMenuTriggerStyle() + (isActive("/") ? " bg-accent/20" : "")}
              >
                Home
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

          {/* About Menu */}
          <NavigationMenuItem>
            <NavigationMenuTrigger>About</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-6 w-[400px]">
                <li className="row-span-3">
                  <Link to="/about">
                    <NavigationMenuLink className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-vitality-50 to-vitality-100 p-6 no-underline outline-none focus:shadow-md">
                      <div className="mb-2 mt-4 text-lg font-medium text-vitality-600">About Us</div>
                      <p className="text-sm leading-tight text-vitality-600/80">
                        Learn about our clinic, mission and team of professionals
                      </p>
                    </NavigationMenuLink>
                  </Link>
                </li>
                <li>
                  <Link to="/doctor-registration">
                    <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                      <div className="text-sm font-medium leading-none">Join Our Team</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Apply to become a part of our physio team
                      </p>
                    </NavigationMenuLink>
                  </Link>
                </li>
                <li>
                  <Link to="/faq">
                    <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                      <div className="text-sm font-medium leading-none">FAQ</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Frequently asked questions about our services
                      </p>
                    </NavigationMenuLink>
                  </Link>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* Services Menu */}
          <NavigationMenuItem>
            <NavigationMenuTrigger>Services</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-6 w-[400px]">
                <li className="row-span-1">
                  <Link to="/services">
                    <NavigationMenuLink className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-vitality-50 to-vitality-100 p-6 no-underline outline-none focus:shadow-md">
                      <div className="mb-2 mt-4 text-lg font-medium text-vitality-600">Our Services</div>
                      <p className="text-sm leading-tight text-vitality-600/80">
                        Comprehensive range of physiotherapy services tailored to your needs
                      </p>
                    </NavigationMenuLink>
                  </Link>
                </li>
                {services.map((service, index) => (
                  <li key={index}>
                    <Link to={service.path}>
                      <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                        <div className="text-sm font-medium leading-none">{service.name}</div>
                      </NavigationMenuLink>
                    </Link>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* Other Navigation Items */}
          {['pricing', 'blog', 'contact'].map((item) => (
            <NavigationMenuItem key={item}>
              <Link to={`/${item}`}>
                <NavigationMenuLink 
                  className={navigationMenuTriggerStyle() + (isActive(`/${item}`) ? " bg-accent/20" : "")}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
};
