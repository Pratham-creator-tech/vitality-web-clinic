
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { MobileNavHeader } from "./mobile-nav/MobileNavHeader";
import { MobileNavAuth } from "./mobile-nav/MobileNavAuth";
import { MobileNavContent } from "./mobile-nav/MobileNavContent";
import { MobileNavFooter } from "./mobile-nav/MobileNavFooter";

interface MobileNavProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export const MobileNav = ({ isOpen, setIsOpen }: MobileNavProps) => {
  const onClose = () => setIsOpen(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="w-[300px] sm:w-[350px] pt-6 pb-20 overflow-y-auto fixed inset-y-0 right-0 z-50">
        <MobileNavHeader onClose={onClose} />
        <MobileNavAuth onClose={onClose} />
        <MobileNavContent />
        <MobileNavFooter />
      </SheetContent>
    </Sheet>
  );
};
