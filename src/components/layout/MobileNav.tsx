
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { 
  CalendarCheck,
  ChevronRight,
  Home,
  Info,
  Phone,
  User,
  X, 
} from "lucide-react";

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
}

export const MobileNav = ({ open, onClose }: MobileNavProps) => {
  const { user, signOut } = useAuth();
  const { t } = useLanguage();

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-[300px] sm:w-[350px] pt-6 pb-20 overflow-y-auto">
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
            <Button variant="ghost" size="icon" className="h-6 w-6">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </SheetClose>
        </SheetHeader>

        {/* Sign In / Sign Up button visible at top for mobile */}
        {!user && (
          <div className="mb-4">
            <SheetClose asChild>
              <Button asChild variant="outline" size="sm" className="w-full justify-center">
                <Link to="/signin">Sign In / Sign Up</Link>
              </Button>
            </SheetClose>
          </div>
        )}

        <nav className="flex flex-col space-y-1">
          <SheetClose asChild>
            <Link to="/" className="flex items-center py-2 px-3 rounded-md hover:bg-vitality-50">
              <Home className="mr-2 h-5 w-5 text-vitality-600" />
              <span>{t("app.header.home")}</span>
            </Link>
          </SheetClose>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="about" className="border-none">
              <AccordionTrigger className="py-2 px-3 rounded-md hover:bg-vitality-50 hover:no-underline">
                <div className="flex items-center">
                  <Info className="mr-2 h-5 w-5 text-vitality-600" />
                  <span>{t("app.header.about")}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pl-10">
                <div className="flex flex-col space-y-1 py-1">
                  <SheetClose asChild>
                    <Link to="/about" className="py-2 hover:text-vitality-600">About Us</Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link to="/doctor-benefits" className="py-2 hover:text-vitality-600">For Doctors</Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link to="/virtual-tour" className="py-2 hover:text-vitality-600">Virtual Tour</Link>
                  </SheetClose>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="services" className="border-none">
              <AccordionTrigger className="py-2 px-3 rounded-md hover:bg-vitality-50 hover:no-underline">
                <div className="flex items-center">
                  <span>{t("app.header.services")}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pl-10">
                <div className="flex flex-col space-y-1 py-1">
                  <SheetClose asChild>
                    <Link to="/services" className="py-2 hover:text-vitality-600">All Services</Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link to="/services/sports-rehabilitation" className="py-2 hover:text-vitality-600">
                      Sports Rehabilitation
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link to="/services/manual-therapy" className="py-2 hover:text-vitality-600">
                      Manual Therapy
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link to="/services/post-surgical" className="py-2 hover:text-vitality-600">
                      Post-Surgical Rehab
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link to="/services/chronic-pain" className="py-2 hover:text-vitality-600">
                      Chronic Pain Management
                    </Link>
                  </SheetClose>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="resources" className="border-none">
              <AccordionTrigger className="py-2 px-3 rounded-md hover:bg-vitality-50 hover:no-underline">
                <div className="flex items-center">
                  <span>Resources</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pl-10">
                <div className="flex flex-col space-y-1 py-1">
                  <SheetClose asChild>
                    <Link to="/interactive-body-map" className="py-2 hover:text-vitality-600">
                      {t("app.feature.bodymap")}
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link to="/pain-tracker" className="py-2 hover:text-vitality-600">
                      {t("app.feature.paintracker")}
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link to="/video-library" className="py-2 hover:text-vitality-600">
                      {t("app.feature.videolibrary")}
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link to="/ai-assistant" className="py-2 hover:text-vitality-600">
                      AI Assistant
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link to="/blog" className="py-2 hover:text-vitality-600">
                      {t("app.header.blog")}
                    </Link>
                  </SheetClose>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <SheetClose asChild>
            <Link to="/pricing" className="flex items-center py-2 px-3 rounded-md hover:bg-vitality-50">
              <span>{t("app.header.pricing")}</span>
            </Link>
          </SheetClose>

          <SheetClose asChild>
            <Link to="/contact" className="flex items-center py-2 px-3 rounded-md hover:bg-vitality-50">
              <Phone className="mr-2 h-5 w-5 text-vitality-600" />
              <span>{t("app.header.contact")}</span>
            </Link>
          </SheetClose>

          {/* User account links */}
          {user && (
            <div className="pt-4 mt-4 border-t border-gray-100">
              <SheetClose asChild>
                <Link to="/profile" className="flex items-center py-2 px-3 rounded-md hover:bg-vitality-50">
                  <User className="mr-2 h-5 w-5 text-vitality-600" />
                  <span>My Profile</span>
                </Link>
              </SheetClose>
              <Button 
                variant="ghost" 
                className="w-full justify-start px-3 py-2 h-auto hover:bg-vitality-50 hover:text-vitality-600"
                onClick={() => {
                  signOut();
                  onClose();
                }}
              >
                Log Out
              </Button>
            </div>
          )}
          
          {/* Book Appointment Button */}
          <SheetClose asChild>
            <Link to="/booking" className="flex items-center justify-center py-3 px-4 mt-4 rounded-full bg-vitality-600 text-white hover:bg-vitality-700">
              <CalendarCheck className="mr-2 h-5 w-5" />
              <span>Book Appointment</span>
            </Link>
          </SheetClose>
        </nav>
      </SheetContent>
    </Sheet>
  );
};
