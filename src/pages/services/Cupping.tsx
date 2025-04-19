
import { Link } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import { SectionTitle } from "@/components/ui/section-title";
import { CTASection } from "@/components/ui/cta-section";
import { Button } from "@/components/ui/button";
import { CheckCircle, Grid } from "lucide-react";

const Cupping = () => {
  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="bg-vitality-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/2">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 font-display text-vitality-700">
                  Cupping Therapy
                </h1>
                <p className="text-lg text-gray-700 mb-6">
                  Traditional therapy using specialized cups to create suction on the skin, improving blood flow, reducing muscle tension, and promoting healing.
                </p>
                <Button asChild size="lg">
                  <Link to="/booking">Book a Session</Link>
                </Button>
              </div>
              <div className="md:w-1/2 flex justify-center">
                <div className="bg-vitality-100 w-32 h-32 rounded-full flex items-center justify-center">
                  <Grid className="h-16 w-16 text-vitality-600" />
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
            title="Our Cupping Therapy Approach" 
            subtitle="We utilize various cupping techniques to address muscle tension, improve circulation, and enhance recovery."
          />
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-vitality-700">Static Cupping</h3>
              <p className="text-gray-600 mb-6">
                Cups remain in place for several minutes, creating suction that helps improve blood flow and release muscle tension in targeted areas.
              </p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-vitality-700">Dynamic Cupping</h3>
              <p className="text-gray-600 mb-6">
                Cups glide across oiled skin, combining the benefits of cupping with massage-like techniques for enhanced muscle relaxation.
              </p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-vitality-700">Targeted Application</h3>
              <p className="text-gray-600 mb-6">
                Specific placement of cups based on individual needs and treatment goals to address particular muscle groups or myofascial trigger points.
              </p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-vitality-700">Integrated Therapy</h3>
              <p className="text-gray-600 mb-6">
                Cupping is often combined with other therapeutic approaches such as manual therapy and exercise for comprehensive treatment.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <SectionTitle 
            title="Benefits of Cupping Therapy" 
            subtitle="Our professional cupping therapy offers numerous advantages for pain management, recovery, and physical wellness."
            center
          />
          
          <div className="mt-12 space-y-6 max-w-3xl mx-auto">
            {[
              "Increased blood circulation to muscles",
              "Reduced muscle tension and pain",
              "Enhanced recovery after intense activity",
              "Improved tissue mobility and flexibility",
              "Release of myofascial trigger points",
              "Complement to other therapeutic techniques"
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
        title="Experience the Benefits of Cupping Therapy" 
        description="Book a cupping therapy session with one of our specialized therapists today."
      />
    </PageLayout>
  );
};

export default Cupping;
