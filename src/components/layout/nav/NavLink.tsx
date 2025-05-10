
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  isActive: boolean;
}

export const NavLink = ({ to, children, isActive }: NavLinkProps) => {
  const linkStyle = "relative flex items-center gap-1.5 text-sm font-medium py-2 px-3 hover:text-vitality-500 transition-colors";
  const activeLinkStyle = "text-vitality-500 font-semibold";
  
  return (
    <Link
      to={to}
      className={`${linkStyle} ${isActive ? activeLinkStyle : "text-gray-700 dark:text-gray-200"}`}
    >
      {children}
      {isActive && (
        <motion.span
          layoutId="navigation-underline"
          className="absolute left-3 right-3 bottom-0 h-0.5 bg-vitality-400"
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
        />
      )}
    </Link>
  );
};
