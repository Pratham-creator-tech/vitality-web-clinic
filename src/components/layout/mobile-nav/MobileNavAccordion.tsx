
import { ReactNode } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface MobileNavAccordionProps {
  value: string;
  title: ReactNode;
  children: ReactNode;
}

export const MobileNavAccordion = ({ value, title, children }: MobileNavAccordionProps) => {
  return (
    <AccordionItem value={value} className="border-none">
      <AccordionTrigger className="py-2 px-3 rounded-md hover:bg-vitality-50 hover:no-underline">
        <div className="flex items-center">
          {title}
        </div>
      </AccordionTrigger>
      <AccordionContent className="pl-10">
        <div className="flex flex-col space-y-1 py-1">
          {children}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};
