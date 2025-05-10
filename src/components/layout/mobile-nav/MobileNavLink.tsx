
import { Link } from "react-router-dom";
import { SheetClose } from "@/components/ui/sheet";
import { ReactNode } from "react";

interface MobileNavLinkProps {
  to: string;
  children: ReactNode;
  className?: string;
}

export const MobileNavLink = ({ to, children, className = "" }: MobileNavLinkProps) => {
  return (
    <SheetClose asChild>
      <Link to={to} className={`flex items-center py-2 px-3 rounded-md hover:bg-vitality-50 ${className}`}>
        {children}
      </Link>
    </SheetClose>
  );
};
