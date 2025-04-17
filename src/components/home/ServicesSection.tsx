
import { Link } from "react-router-dom";
import { SectionTitle } from "@/components/ui/section-title";
import { Button } from "@/components/ui/button";
import { ArrowRight, Activity, UserPlus, Bone, Heart, Brain, Dumbbell } from "lucide-react";

const services = [
  {
    id: 1,
    title: "Sports Rehabilitation",
    description: "Specialized programs to help athletes recover from injuries and enhance performance.",
    icon: <Activity className="h-10 w-10 text-vitality-400" />,
    link: "/services/sports-rehabilitation"
  },
  {
    id: 2,
    title: "Manual Therapy",
    description: "Hands-on techniques to reduce pain, decrease muscle tension and improve mobility.",
    icon: <UserPlus className="h-10 w-10 text-vitality-400" />,
    link: "/services/manual-therapy"
  },
  {
    id: 3,
    title: "Post-Surgical Rehabilitation",
    description: "Comprehensive care to help patients recover after surgical procedures.",
    icon: <Bone className="h-10 w-10 text-vitality-400" />,
    link: "/services/post-surgical"
  },
  {
    id: 4,
    title: "Chronic Pain Management",
    description: "Evidence-based approaches to help patients manage and reduce persistent pain.",
    icon: <Heart className="h-10 w-10 text-vitality-400" />,
    link: "/services/chronic-pain"
  },
  {
    id: 5,
    title: "Neurological Rehabilitation",
    description: "Specialized therapy for patients with neurological conditions or injuries.",
    icon: <Brain className="h-10 w-10 text-vitality-400" />,
    link: "/services/neurological"
  },
  {
    id: 6,
    title: "Strength & Conditioning",
    description: "Personalized exercise programs to build strength, improve function and prevent injuries.",
    icon: <Dumbbell className="h-10 w-10 text-vitality-400" />,
    link: "/services/strength-conditioning"
  }
];

const ServicesSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <SectionTitle 
          title="Our Specialized Services" 
          subtitle="We offer a wide range of physiotherapy and wellness services tailored to your unique needs."
          center
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {services.map((service) => (
            <div 
              key={service.id} 
              className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow group"
            >
              <div className="mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold mb-3 text-vitality-700">{service.title}</h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <Link 
                to={service.link}
                className="inline-flex items-center text-vitality-500 font-medium group-hover:text-vitality-600"
              >
                Learn More
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          ))}
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-4 justify-center mt-12">
          <Button asChild variant="outline">
            <Link to="/services" className="flex items-center">
              View All Services
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button asChild>
            <Link to="/ai-assistant" className="flex items-center">
              Try Our AI Assistant
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
