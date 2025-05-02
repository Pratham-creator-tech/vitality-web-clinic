
import { Link } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import { SectionTitle } from "@/components/ui/section-title";
import { CTASection } from "@/components/ui/cta-section";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle, Brain } from "lucide-react";

const Neurological = () => {
  return (
    <PageLayout>
      <div className="container mx-auto py-8 px-4">
        <Button asChild variant="outline" className="mb-8">
          <Link to="/services" className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Services
          </Link>
        </Button>
      </div>
      
      {/* Hero Section */}
      <section className="bg-vitality-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/2">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 font-display text-vitality-700">
                  Neurological Rehabilitation
                </h1>
                <p className="text-lg text-gray-700 mb-6">
                  Our specialized neurological rehabilitation services address functional limitations resulting from stroke, traumatic brain injury, Parkinson's disease, and other neurological conditions.
                </p>
                <Button asChild size="lg">
                  <Link to="/booking">Book a Consultation</Link>
                </Button>
              </div>
              <div className="md:w-1/2 flex justify-center">
                <div className="bg-vitality-100 w-32 h-32 rounded-full flex items-center justify-center">
                  <Brain className="h-16 w-16 text-vitality-600" />
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
            title="Our Neurological Rehabilitation Approach" 
            subtitle="We utilize specialized approaches to improve movement, balance, and daily function for patients with neurological conditions."
          />
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-vitality-700">Personalized Assessment</h3>
              <p className="text-gray-600 mb-6">
                We conduct detailed neurological evaluations to understand specific impairments and functional limitations to develop targeted rehabilitation strategies.
              </p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-vitality-700">Neuroplasticity-Based Rehabilitation</h3>
              <p className="text-gray-600 mb-6">
                Our treatment leverages principles of neuroplasticity – the brain's ability to reorganize and form new connections – to promote recovery of function.
              </p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-vitality-700">Functional Movement Training</h3>
              <p className="text-gray-600 mb-6">
                We focus on retraining movement patterns essential for daily activities to maximize independence and quality of life.
              </p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-vitality-700">Adaptive Strategies</h3>
              <p className="text-gray-600 mb-6">
                We teach compensatory techniques and provide recommendations for adaptive equipment to enhance function and independence despite neurological limitations.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <SectionTitle 
            title="Benefits of Neurological Rehabilitation" 
            subtitle="Our comprehensive neurological rehabilitation offers numerous advantages for patients with neurological conditions."
            center
          />
          
          <div className="mt-12 space-y-6 max-w-3xl mx-auto">
            {[
              "Improved balance and coordination",
              "Enhanced mobility and independence",
              "Better management of neurological symptoms",
              "Personalized home exercise programs",
              "Improved ability to perform daily activities",
              "Enhanced quality of life"
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
        title="Start Your Neurological Recovery Journey" 
        description="Book a neurological rehabilitation consultation with one of our specialized physiotherapists today."
      />
    </PageLayout>
  );
};

export default Neurological;
