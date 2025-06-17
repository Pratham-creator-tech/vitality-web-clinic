
import PageLayout from "@/components/layout/PageLayout";
import HeroSection from "@/components/home/HeroSection";
import ServicesSection from "@/components/home/ServicesSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import AboutPreview from "@/components/home/AboutPreview";
import BlogPreview from "@/components/home/BlogPreview";
import { CTASection } from "@/components/ui/cta-section";
import TrustedByCarousel from "@/components/home/TrustedByCarousel";
import PanIndiaSection from "@/components/home/PanIndiaSection";
import StatsSection from "@/components/home/StatsSection";
import WhyChooseUsSection from "@/components/home/WhyChooseUsSection";

const Index = () => {
  return (
    <PageLayout>
      <HeroSection />
      <StatsSection />
      <WhyChooseUsSection />
      <ServicesSection />
      <AboutPreview />
      <TestimonialsSection />
      <TrustedByCarousel />
      <PanIndiaSection />
      <BlogPreview />
      <CTASection />
    </PageLayout>
  );
};

export default Index;
