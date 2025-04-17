
import { Link } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import { SectionTitle } from "@/components/ui/section-title";
import { CTASection } from "@/components/ui/cta-section";
import { Button } from "@/components/ui/button";
import { CheckCircle, UserPlus } from "lucide-react";

const ManualTherapy = () => {
  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="bg-vitality-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/2">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 font-display text-vitality-700">
                  Manual Therapy
                </h1>
                <p className="text-lg text-gray-700 mb-6">
                  Our hands-on manual therapy approach utilizes specialized techniques to reduce pain, improve mobility, and restore optimal function to your body.
                </p>
                <Button asChild size="lg">
                  <Link to="/booking">Book a Session</Link>
                </Button>
              </div>
              <div className="md:w-1/2 flex justify-center">
                <div className="bg-vitality-100 w-32 h-32 rounded-full flex items-center justify-center">
                  <UserPlus className="h-16 w-16 text-vitality-600" />
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
            title="Our Manual Therapy Techniques" 
            subtitle="Our skilled therapists use various methods including joint mobilization, soft tissue manipulation, and myofascial release to address musculoskeletal issues."
          />
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-vitality-700">Joint Mobilization</h3>
              <p className="text-gray-600 mb-6">
                Gentle, controlled movements applied to joints to improve mobility, reduce pain, and restore normal joint function and movement patterns.
              </p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-vitality-700">Soft Tissue Manipulation</h3>
              <p className="text-gray-600 mb-6">
                Targeted techniques that address muscle tension, trigger points, and tissue restrictions to promote healing and improve tissue quality.
              </p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-vitality-700">Myofascial Release</h3>
              <p className="text-gray-600 mb-6">
                Focused pressure and stretching techniques that target the fascia – the connective tissue surrounding muscles – to release tension and improve mobility.
              </p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-vitality-700">Neural Mobilization</h3>
              <p className="text-gray-600 mb-6">
                Specialized techniques that gently mobilize nerves to reduce pain and improve function in conditions involving nerve irritation or entrapment.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <SectionTitle 
            title="Benefits of Manual Therapy" 
            subtitle="Our expert manual therapy offers numerous advantages for patients with various musculoskeletal conditions."
            center
          />
          
          <div className="mt-12 space-y-6 max-w-3xl mx-auto">
            {[
              "Reduced pain and muscle tension",
              "Improved joint mobility and function",
              "Enhanced circulation and healing",
              "Posture correction and body awareness",
              "Decreased muscle spasms and tissue restrictions",
              "Personalized hands-on care approach"
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
        title="Experience the Benefits of Manual Therapy" 
        description="Book a manual therapy session with one of our expert physiotherapists today."
      />
    </PageLayout>
  );
};

export default ManualTherapy;
