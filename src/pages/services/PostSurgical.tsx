
import { Link } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import { SectionTitle } from "@/components/ui/section-title";
import { CTASection } from "@/components/ui/cta-section";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle, Bone } from "lucide-react";

const PostSurgical = () => {
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
                  Post-Surgical Rehabilitation
                </h1>
                <p className="text-lg text-gray-700 mb-6">
                  Our tailored post-surgical rehabilitation programs help patients recover optimally after various surgical procedures through expert guidance and care.
                </p>
                <Button asChild size="lg">
                  <Link to="/booking">Book a Consultation</Link>
                </Button>
              </div>
              <div className="md:w-1/2 flex justify-center">
                <div className="bg-vitality-100 w-32 h-32 rounded-full flex items-center justify-center">
                  <Bone className="h-16 w-16 text-vitality-600" />
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
            title="Our Post-Surgical Approach" 
            subtitle="We work closely with surgeons to ensure appropriate progression of therapy and maximize functional outcomes for each patient's unique situation."
          />
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-vitality-700">Early Intervention</h3>
              <p className="text-gray-600 mb-6">
                We begin therapy at the appropriate time after surgery to optimize healing, prevent complications, and establish a foundation for successful recovery.
              </p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-vitality-700">Progressive Rehabilitation</h3>
              <p className="text-gray-600 mb-6">
                Our protocols follow structured progressions that respect healing timelines while safely advancing mobility, strength, and function throughout recovery.
              </p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-vitality-700">Pain Management</h3>
              <p className="text-gray-600 mb-6">
                We utilize various techniques to manage post-surgical pain and discomfort, allowing for more effective rehabilitation and improved quality of life during recovery.
              </p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-vitality-700">Functional Training</h3>
              <p className="text-gray-600 mb-6">
                Our rehabilitation focuses on restoring the specific movements and activities most important to your daily life, work, and recreational goals.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <SectionTitle 
            title="Benefits of Post-Surgical Rehabilitation" 
            subtitle="Our comprehensive post-surgical care offers numerous advantages for surgical patients."
            center
          />
          
          <div className="mt-12 space-y-6 max-w-3xl mx-auto">
            {[
              "Accelerated recovery after surgery",
              "Reduced post-surgical complications",
              "Proper scar tissue management",
              "Restoration of strength and function",
              "Expert guidance through recovery milestones",
              "Personalized home exercise programs"
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
        title="Start Your Post-Surgical Recovery" 
        description="Book a post-surgical rehabilitation consultation with one of our specialized physiotherapists today."
      />
    </PageLayout>
  );
};

export default PostSurgical;
