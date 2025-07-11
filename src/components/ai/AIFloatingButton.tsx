
import { useState } from "react";
import { Bot, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import EnhancedAIChat from "./EnhancedAIChat";

const AIFloatingButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-vitality-500 hover:bg-vitality-600 shadow-lg z-50 flex items-center justify-center p-0"
        aria-label="Open AI Assistant"
      >
        <Bot className="h-6 w-6 text-white" />
      </Button>

      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerContent className="max-h-[90vh]">
          <DrawerHeader className="flex items-center justify-between">
            <div>
              <DrawerTitle>Enhanced AI Medical Assistant</DrawerTitle>
              <DrawerDescription>
                Upload files, find doctors, and get expert medical guidance
              </DrawerDescription>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="rounded-full"
            >
              <X className="h-4 w-4" />
            </Button>
          </DrawerHeader>
          <div className="px-4 pb-4">
            <EnhancedAIChat inDrawer={true} />
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default AIFloatingButton;
