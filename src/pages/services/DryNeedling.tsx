
import { Link } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import { SectionTitle } from "@/components/ui/section-title";
import { CTASection } from "@/components/ui/cta-section";
import { Button } from "@/components/ui/button";
import { CheckCircle, Syringe } from "lucide-react";

const DryNeedling = () => {
  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="bg-vitality-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/2">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 font-display text-vitality-700">
                  Dry Needling Therapy
                </h1>
                <p className="text-lg text-gray-700 mb-6">
                  Precision treatment using fine needles to target trigger points and relieve muscle pain and tension.
                </p>
                <Button asChild size="lg">
                  <Link to="/booking">Book a Session</Link>
                </Button>
              </div>
              <div className="md:w-1/2 flex justify-center">
                <div className="bg-vitality-100 w-32 h-32 rounded-full flex items-center justify-center">
                  <Syringe className="h-16 w-16 text-vitality-600" />
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
            title="Our Dry Needling Approach" 
            subtitle="We use precise techniques to target specific trigger points and restore proper muscle function."
          />
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-vitality-700">Trigger Point Release</h3>
              <p className="text-gray-600 mb-6">
                Precise needle placement to release muscle knots and reduce tension in specific areas.
              </p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-vitality-700">Pain Management</h3>
              <p className="text-gray-600 mb-6">
                Targeted treatment to reduce chronic and acute pain through neuromuscular response.
              </p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-vitality-700">Muscle Recovery</h3>
              <p className="text-gray-600 mb-6">
                Enhanced healing and recovery through improved blood flow and tissue repair.
              </p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-vitality-700">Movement Restoration</h3>
              <p className="text-gray-600 mb-6">
                Improved range of motion and function through targeted muscle treatment.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <SectionTitle 
            title="Benefits of Dry Needling" 
            subtitle="Our professional dry needling therapy offers numerous advantages for pain management and physical recovery."
            center
          />
          
          <div className="mt-12 space-y-6 max-w-3xl mx-auto">
            {[
              "Immediate pain relief",
              "Reduced muscle tension",
              "Improved range of motion",
              "Enhanced muscle recovery",
              "Better circulation",
              "Long-lasting results"
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
        title="Experience the Benefits of Dry Needling" 
        description="Book a dry needling session with one of our specialized physiotherapists today."
      />
    </PageLayout>
  );
};

export default DryNeedling;
