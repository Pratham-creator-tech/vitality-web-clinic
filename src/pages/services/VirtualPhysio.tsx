
import { Link } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import { SectionTitle } from "@/components/ui/section-title";
import { CTASection } from "@/components/ui/cta-section";
import { Button } from "@/components/ui/button";
import { CheckCircle, Video } from "lucide-react";

const VirtualPhysio = () => {
  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="bg-vitality-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/2">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 font-display text-vitality-700">
                  Virtual Physiotherapy
                </h1>
                <p className="text-lg text-gray-700 mb-6">
                  Expert physiotherapy care delivered through secure video consultations, allowing you to receive professional guidance from the comfort of your home.
                </p>
                <Button asChild size="lg">
                  <Link to="/booking">Book a Session</Link>
                </Button>
              </div>
              <div className="md:w-1/2 flex justify-center">
                <div className="bg-vitality-100 w-32 h-32 rounded-full flex items-center justify-center">
                  <Video className="h-16 w-16 text-vitality-600" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Details */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <SectionTitle 
            title="Our Virtual Physiotherapy Approach" 
            subtitle="We provide comprehensive remote physiotherapy assessments and treatments through secure video technology, bringing expert care directly to you."
          />
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-vitality-700">Remote Assessment</h3>
              <p className="text-gray-600 mb-6">
                Comprehensive evaluation of your condition through guided movements and detailed history taking to understand your specific needs.
              </p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-vitality-700">Personalized Exercise Programs</h3>
              <p className="text-gray-600 mb-6">
                Custom-designed exercise regimens tailored to your condition and home environment, with real-time demonstration and guidance.
              </p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-vitality-700">Self-Management Education</h3>
              <p className="text-gray-600 mb-6">
                Detailed instruction on self-management techniques, including self-massage, positioning, and pain management strategies.
              </p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-vitality-700">Ongoing Monitoring</h3>
              <p className="text-gray-600 mb-6">
                Regular follow-up sessions to track progress, adjust treatment plans, and ensure optimal recovery without the need to travel.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <SectionTitle 
            title="Benefits of Virtual Physiotherapy" 
            subtitle="Our telehealth physiotherapy service offers numerous advantages for patients seeking quality care with maximum convenience."
            center
          />
          
          <div className="mt-12 space-y-6 max-w-3xl mx-auto">
            {[
              "Convenient access from your home",
              "No travel or waiting time",
              "Flexible scheduling options",
              "Same expert guidance as in-person visits",
              "Continuous access to your physiotherapist",
              "Perfect for follow-up care and maintenance"
            ].map((benefit, i) => (
              <div key={i} className="flex items-start bg-white p-4 rounded-lg shadow-sm">
                <CheckCircle className="h-6 w-6 text-vitality-400 mr-3 flex-shrink-0 mt-0.5" />
                <p className="text-gray-700">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <CTASection 
        title="Experience Virtual Physiotherapy" 
        description="Book a virtual physiotherapy session with one of our specialized therapists today."
      />
    </PageLayout>
  );
};

export default VirtualPhysio;
