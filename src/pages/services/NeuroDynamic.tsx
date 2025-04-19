
import { Link } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import { SectionTitle } from "@/components/ui/section-title";
import { CTASection } from "@/components/ui/cta-section";
import { Button } from "@/components/ui/button";
import { CheckCircle, Zap } from "lucide-react";

const NeuroDynamic = () => {
  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="bg-vitality-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/2">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 font-display text-vitality-700">
                  Neuro Dynamic Solution
                </h1>
                <p className="text-lg text-gray-700 mb-6">
                  Advanced treatment targeting the nervous system to relieve pain, improve mobility, and enhance overall function through specialized techniques.
                </p>
                <Button asChild size="lg">
                  <Link to="/booking">Book a Session</Link>
                </Button>
              </div>
              <div className="md:w-1/2 flex justify-center">
                <div className="bg-vitality-100 w-32 h-32 rounded-full flex items-center justify-center">
                  <Zap className="h-16 w-16 text-vitality-600" />
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
            title="Our Neuro Dynamic Approach" 
            subtitle="We utilize specialized techniques to address nerve-related pain and mobility issues through targeted neurodynamic interventions."
          />
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-vitality-700">Neural Tension Release</h3>
              <p className="text-gray-600 mb-6">
                Targeted techniques to relieve tension and compression in nerve tissues, improving mobility and reducing pain.
              </p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-vitality-700">Neural Gliding</h3>
              <p className="text-gray-600 mb-6">
                Specialized movement patterns designed to improve nerve gliding and reduce nerve irritation in affected areas.
              </p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-vitality-700">Nerve Mobility Assessment</h3>
              <p className="text-gray-600 mb-6">
                Comprehensive evaluation of nerve mobility and tension patterns to identify specific neural dysfunction.
              </p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-vitality-700">Integrated Treatment Approach</h3>
              <p className="text-gray-600 mb-6">
                Combining neurodynamic techniques with manual therapy and therapeutic exercise for comprehensive nerve-related care.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <SectionTitle 
            title="Benefits of Neuro Dynamic Solution" 
            subtitle="Our specialized neurodynamic approach offers numerous advantages for patients with nerve-related conditions."
            center
          />
          
          <div className="mt-12 space-y-6 max-w-3xl mx-auto">
            {[
              "Reduced nerve-related pain and symptoms",
              "Improved neural mobility and function",
              "Enhanced movement and flexibility",
              "Targeted relief for nerve compression",
              "Decreased nerve irritation and sensitivity",
              "Improved functional outcomes"
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
        title="Experience the Benefits of Neuro Dynamic Solution" 
        description="Book a neurodynamic session with one of our specialized physiotherapists today."
      />
    </PageLayout>
  );
};

export default NeuroDynamic;
