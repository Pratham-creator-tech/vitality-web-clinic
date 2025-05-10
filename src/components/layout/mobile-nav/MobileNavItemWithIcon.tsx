
import { Link } from "react-router-dom";
import { SheetClose } from "@/components/ui/sheet";
import { LucideIcon } from "lucide-react";

interface MobileNavItemWithIconProps {
  to: string;
  icon: LucideIcon;
  children: React.ReactNode;
}

export const MobileNavItemWithIcon = ({ to, icon: Icon, children }: MobileNavItemWithIconProps) => {
  return (
    <SheetClose asChild>
      <Link to={to} className="flex items-center py-2 px-3 rounded-md hover:bg-vitality-50">
        <Icon className="mr-2 h-5 w-5 text-vitality-600" />
        <span>{children}</span>
      </Link>
    </SheetClose>
  );
};
