
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export const NavbarLinks = () => {
  const links = [
    { name: "About", href: "/about" },
    { 
      name: "Services", 
      href: "/services",
    },
    { name: "Pricing", href: "/pricing" },
    { name: "Insurance", href: "/insurance" },
    { name: "Resources", href: "/faq" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="hidden lg:flex items-center space-x-1 ml-6">
      {links.map((link) => (
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
      ))}
    </nav>
  );
};
