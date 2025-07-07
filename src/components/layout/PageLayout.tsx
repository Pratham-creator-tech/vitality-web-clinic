
import Navbar from "./Navbar";
import Footer from "./Footer";
import AIFloatingButton from "@/components/ai/AIFloatingButton";
import FeedbackFloatingButton from "@/components/feedback/FeedbackFloatingButton";
import FloatingBookingButton from "@/components/ui/floating-booking-button";
import { ScrollToTop } from "@/components/ui/scroll-to-top";

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <AIFloatingButton />
      <FeedbackFloatingButton />
      <FloatingBookingButton />
      <ScrollToTop />
    </div>
  );
};

export default PageLayout;
