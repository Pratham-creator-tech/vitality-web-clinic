
import { Link } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import { SectionTitle } from "@/components/ui/section-title";
import { CTASection } from "@/components/ui/cta-section";
import { Button } from "@/components/ui/button";
import { CheckCircle, Bandage } from "lucide-react";

const Kinesiotaping = () => {
  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="bg-vitality-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/2">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 font-display text-vitality-700">
                  Kinesiotaping
                </h1>
                <p className="text-lg text-gray-700 mb-6">
                  Advanced taping techniques for pain relief, muscle support, and enhanced performance through specialized application methods.
                </p>
                <Button asChild size="lg">
                  <Link to="/booking">Book a Session</Link>
                </Button>
              </div>
              <div className="md:w-1/2 flex justify-center">
                <div className="bg-vitality-100 w-32 h-32 rounded-full flex items-center justify-center">
                  <Bandage className="h-16 w-16 text-vitality-600" />
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
            title="Our Kinesiotaping Approach" 
            subtitle="We use professional-grade kinesiology tape and advanced application techniques to support muscles and facilitate natural healing."
          />
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-vitality-700">Pain Management</h3>
              <p className="text-gray-600 mb-6">
                Strategic taping techniques to reduce pain and inflammation while supporting natural movement patterns.
              </p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-vitality-700">Muscle Support</h3>
              <p className="text-gray-600 mb-6">
                Specialized applications to provide stability and support to muscles and joints during activity and recovery.
              </p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-vitality-700">Lymphatic Drainage</h3>
              <p className="text-gray-600 mb-6">
                Taping methods designed to enhance fluid movement and reduce swelling in affected areas.
              </p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-vitality-700">Sports Performance</h3>
              <p className="text-gray-600 mb-6">
                Athletic taping techniques to support performance and prevent injuries during sports activities.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <SectionTitle 
            title="Benefits of Kinesiotaping" 
            subtitle="Our professional kinesiotaping services offer numerous advantages for pain management and physical performance."
            center
          />
          
          <div className="mt-12 space-y-6 max-w-3xl mx-auto">
            {[
              "Reduced pain and inflammation",
              "Enhanced muscle support and stability",
              "Improved circulation and healing",
              "Better joint alignment",
              "Increased range of motion",
              "Support during sports activities"
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
        title="Experience the Benefits of Kinesiotaping" 
        description="Book a kinesiotaping session with one of our expert physiotherapists today."
      />
    </PageLayout>
  );
};

export default Kinesiotaping;
