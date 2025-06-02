
import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import AnimatedPage from "./AnimatedPage";
import { cn } from "@/lib/utils";

interface PageLayoutProps {
  children: ReactNode;
  className?: string;
}

const PageLayout = ({ children, className }: PageLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className={cn("flex-1 pt-16", className)}>
        <AnimatedPage>
          {children}
        </AnimatedPage>
      </main>
      <Footer />
    </div>
  );
};

export default PageLayout;
