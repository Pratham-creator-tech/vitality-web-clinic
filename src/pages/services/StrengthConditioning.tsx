
import { Link } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import { SectionTitle } from "@/components/ui/section-title";
import { CTASection } from "@/components/ui/cta-section";
import { Button } from "@/components/ui/button";
import { CheckCircle, Dumbbell } from "lucide-react";

const StrengthConditioning = () => {
  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="bg-vitality-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/2">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 font-display text-vitality-700">
                  Strength & Conditioning
                </h1>
                <p className="text-lg text-gray-700 mb-6">
                  Our strength and conditioning programs focus on building functional strength, improving mobility, and enhancing overall physical performance for clients of all fitness levels.
                </p>
                <Button asChild size="lg">
                  <Link to="/booking">Book a Session</Link>
                </Button>
              </div>
              <div className="md:w-1/2 flex justify-center">
                <div className="bg-vitality-100 w-32 h-32 rounded-full flex items-center justify-center">
                  <Dumbbell className="h-16 w-16 text-vitality-600" />
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
            title="Our Strength & Conditioning Approach" 
            subtitle="Whether you're recovering from an injury or looking to prevent one, our tailored approach will help you achieve your fitness and performance goals."
          />
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-vitality-700">Functional Movement Assessment</h3>
              <p className="text-gray-600 mb-6">
                We evaluate your movement patterns, strength, mobility, and stability to identify areas of opportunity and create a targeted training program.
              </p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-vitality-700">Progressive Training Programs</h3>
              <p className="text-gray-600 mb-6">
                Our programs systematically progress in challenge and complexity to continuously advance your strength, power, endurance, and movement quality.
              </p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-vitality-700">Movement Optimization</h3>
              <p className="text-gray-600 mb-6">
                We focus on improving movement efficiency and biomechanics to enhance performance and reduce injury risk during work, sport, and daily activities.
              </p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-vitality-700">Injury Prevention Strategies</h3>
              <p className="text-gray-600 mb-6">
                Our programs incorporate specific exercises and techniques designed to address muscle imbalances and movement deficiencies that can lead to injuries.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <SectionTitle 
            title="Benefits of Strength & Conditioning" 
            subtitle="Our comprehensive strength and conditioning programs offer numerous advantages for clients of all fitness levels."
            center
          />
          
          <div className="mt-12 space-y-6 max-w-3xl mx-auto">
            {[
              "Improved functional strength and stability",
              "Enhanced athletic performance",
              "Reduced injury risk",
              "Personalized exercise prescription",
              "Increased energy and vitality",
              "Improved body composition"
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
        title="Build Your Strength & Performance" 
        description="Book a strength and conditioning session with one of our specialized physiotherapists today."
      />
    </PageLayout>
  );
};

export default StrengthConditioning;
