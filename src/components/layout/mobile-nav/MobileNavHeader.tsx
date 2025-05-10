
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SheetClose, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { X } from "lucide-react";

interface MobileNavHeaderProps {
  onClose: () => void;
}

export const MobileNavHeader = ({ onClose }: MobileNavHeaderProps) => {
  return (
    <SheetHeader className="mb-4 flex justify-between items-center">
      <div className="flex items-center">
        <div className="w-8 h-8 mr-2 overflow-hidden">
          <img 
            src="/lovable-uploads/d4839bdf-5201-41d9-9549-0b1021009501.png"
            alt="YASHA's Physiocare Logo"
            className="w-full h-full object-contain"
          />
        </div>
        <SheetTitle className="text-xl font-bold">
          <span className="text-vitality-600">
            Physiocare
          </span>
        </SheetTitle>
      </div>
      <SheetClose asChild>
        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={onClose}>
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>
      </SheetClose>
    </SheetHeader>
  );
};
