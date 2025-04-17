
import { Link } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import { SectionTitle } from "@/components/ui/section-title";
import { CTASection } from "@/components/ui/cta-section";
import { Button } from "@/components/ui/button";
import { CheckCircle, Heart } from "lucide-react";

const ChronicPain = () => {
  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="bg-vitality-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/2">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 font-display text-vitality-700">
                  Chronic Pain Management
                </h1>
                <p className="text-lg text-gray-700 mb-6">
                  Our evidence-based chronic pain management combines physiotherapy techniques with education and lifestyle modifications to help effectively manage persistent pain.
                </p>
                <Button asChild size="lg">
                  <Link to="/booking">Book a Consultation</Link>
                </Button>
              </div>
              <div className="md:w-1/2 flex justify-center">
                <div className="bg-vitality-100 w-32 h-32 rounded-full flex items-center justify-center">
                  <Heart className="h-16 w-16 text-vitality-600" />
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
            title="Our Chronic Pain Management Approach" 
            subtitle="We combine evidence-based physical therapy techniques with education and lifestyle modifications to help patients effectively manage persistent pain conditions."
          />
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-vitality-700">Comprehensive Assessment</h3>
              <p className="text-gray-600 mb-6">
                We conduct detailed evaluations to understand your pain patterns, contributing factors, and how pain affects your daily life to develop targeted interventions.
              </p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-vitality-700">Pain Neuroscience Education</h3>
              <p className="text-gray-600 mb-6">
                We provide evidence-based education about pain mechanisms to help you understand your condition and develop effective coping strategies.
              </p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-vitality-700">Active Treatment Strategies</h3>
              <p className="text-gray-600 mb-6">
                Our approach emphasizes active therapy including specialized exercises, movement retraining, and graded exposure to activities to improve function and reduce pain.
              </p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-vitality-700">Lifestyle Modifications</h3>
              <p className="text-gray-600 mb-6">
                We help you identify and implement sustainable lifestyle changes that can reduce pain triggers and improve overall well-being.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <SectionTitle 
            title="Benefits of Chronic Pain Management" 
            subtitle="Our comprehensive approach offers numerous advantages for patients with persistent pain conditions."
            center
          />
          
          <div className="mt-12 space-y-6 max-w-3xl mx-auto">
            {[
              "Reduced pain intensity and frequency",
              "Improved understanding of pain mechanisms",
              "Enhanced coping strategies",
              "Increased functional capacity",
              "Better sleep quality",
              "Reduced reliance on pain medications"
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
        title="Take Control of Your Chronic Pain" 
        description="Book a chronic pain management consultation with one of our specialized physiotherapists today."
      />
    </PageLayout>
  );
};

export default ChronicPain;
