
import { Link } from "react-router-dom";
import { SheetClose } from "@/components/ui/sheet";
import { CalendarCheck } from "lucide-react";

export const MobileNavFooter = () => {
  return (
    <SheetClose asChild>
      <Link to="/booking" className="flex items-center justify-center py-3 px-4 mt-4 rounded-full bg-vitality-600 text-white hover:bg-vitality-700">
        <CalendarCheck className="mr-2 h-5 w-5" />
        <span>Book Appointment</span>
      </Link>
    </SheetClose>
  );
};
