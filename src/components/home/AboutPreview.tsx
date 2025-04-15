
import { Link } from "react-router-dom";
import { SectionTitle } from "@/components/ui/section-title";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";

const features = [
  "Expert certified physiotherapists",
  "Personalized treatment plans",
  "State-of-the-art facilities",
  "Evidence-based techniques",
  "Holistic approach to wellness",
  "Convenient scheduling options"
];

const AboutPreview = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1624727828489-a1e03b79bba8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1771&q=80" 
              alt="Physical therapist working with a patient" 
              className="rounded-lg shadow-lg relative z-10"
            />
            <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-vitality-100 rounded-lg -z-10"></div>
            <div className="absolute -top-6 -left-6 bg-vitality-300 px-4 py-2 rounded shadow-md z-20">
              <p className="text-white font-bold text-sm">15+ Years of Excellence</p>
            </div>
          </div>
          
          <div>
            <SectionTitle 
              title="Dedicated to Your Recovery" 
              subtitle="At Vitality Physiotherapy, we combine clinical expertise with compassionate care to help you achieve optimal physical health and wellness."
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center">
                  <Check className="h-5 w-5 text-vitality-400 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
            
            <p className="text-gray-600 mb-8">
              Our team of experienced physiotherapists is committed to providing excellent care tailored to your unique needs. We work closely with you to understand your goals and develop effective treatment plans that help you recover faster and stronger.
            </p>
            
            <Button asChild>
              <Link to="/about" className="flex items-center">
                Learn More About Us
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;
