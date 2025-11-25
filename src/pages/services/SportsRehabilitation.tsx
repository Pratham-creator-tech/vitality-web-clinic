
import { Link } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import { SectionTitle } from "@/components/ui/section-title";
import { CTASection } from "@/components/ui/cta-section";
import { Button } from "@/components/ui/button";
import { CheckCircle, Activity } from "lucide-react";

const SportsRehabilitation = () => {
  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="bg-vitality-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/2">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 font-display text-vitality-700">
                  Sports Rehabilitation
                </h1>
                <p className="text-lg text-gray-700 mb-6">
                  Our specialized sports rehabilitation program is designed to help athletes of all levels recover from injuries and return to their sport safely and effectively.
                </p>
                <Button asChild size="lg">
                  <Link to="/booking">Book a Session</Link>
                </Button>
              </div>
              <div className="md:w-1/2">
                <img 
                  src="/lovable-uploads/0c401620-99d7-4077-92c4-8991ed051b54.png" 
                  alt="Sports rehabilitation exercises and therapy" 
                  className="rounded-lg shadow-xl w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Details */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <SectionTitle 
            title="Our Sports Rehabilitation Approach" 
            subtitle="We use a combination of manual therapy, therapeutic exercises, and specialized techniques to address the unique demands of athletic activities."
          />
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-vitality-700">Assessment & Diagnosis</h3>
              <p className="text-gray-600 mb-6">
                Our therapists conduct comprehensive evaluations to identify the root cause of your sports injury, biomechanical issues, and contributing factors to develop a targeted treatment plan.
              </p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-vitality-700">Personalized Rehabilitation Plans</h3>
              <p className="text-gray-600 mb-6">
                We create customized rehabilitation programs designed specifically for your sport, injury, goals, and fitness level to ensure optimal recovery and performance.
              </p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-vitality-700">Sport-Specific Training</h3>
              <p className="text-gray-600 mb-6">
                Our protocols incorporate sport-specific movements and drills to prepare your body for the demands of your athletic activity and reduce the risk of re-injury.
              </p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-vitality-700">Performance Enhancement</h3>
              <p className="text-gray-600 mb-6">
                Beyond injury recovery, we focus on improving strength, power, agility, and coordination to help you return to your sport at a higher level of performance.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <SectionTitle 
            title="Benefits of Sports Rehabilitation" 
            subtitle="Our comprehensive approach offers numerous advantages for athletes and active individuals."
            center
          />
          
          <div className="mt-12 space-y-6 max-w-3xl mx-auto">
            {[
              "Faster recovery from sports injuries",
              "Sport-specific rehabilitation protocols",
              "Injury prevention strategies",
              "Performance enhancement techniques",
              "Improved biomechanics and movement patterns",
              "Education on proper training techniques"
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
        title="Ready to Get Back in the Game?" 
        description="Book a sports rehabilitation consultation with one of our specialized physiotherapists today."
      />
    </PageLayout>
  );
};

export default SportsRehabilitation;
