
import PageLayout from "@/components/layout/PageLayout";
import Hero3D from "@/components/home/Hero3D";
import ServicesSection from "@/components/home/ServicesSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import AboutPreview from "@/components/home/AboutPreview";
import BlogPreview from "@/components/home/BlogPreview";
import { CTASection } from "@/components/ui/cta-section";
import TrustedByCarousel from "@/components/home/TrustedByCarousel";
import PanIndiaSection from "@/components/home/PanIndiaSection";

const Index = () => {
  return (
    <PageLayout>
      <Hero3D />
      <TrustedByCarousel />
      <PanIndiaSection />
      <ServicesSection />
      <AboutPreview />
      <TestimonialsSection />
      <BlogPreview />
      <CTASection />
    </PageLayout>
  );
};

export default Index;
