
import { SectionTitle } from "@/components/ui/section-title";
import { Shield, Heart, Brain, Target, Clock, Award } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Licensed Professionals",
    description: "All our physiotherapists are government certified and have extensive clinical experience.",
    color: "bg-blue-50 text-blue-600"
  },
  {
    icon: Heart,
    title: "Patient-Centered Care",
    description: "We prioritize your comfort and recovery with personalized treatment plans.",
    color: "bg-red-50 text-red-600"
  },
  {
    icon: Brain,
    title: "Evidence-Based Treatment",
    description: "Our treatments are based on the latest research and proven clinical methodologies.",
    color: "bg-purple-50 text-purple-600"
  },
  {
    icon: Target,
    title: "Goal-Oriented Approach",
    description: "We work with you to set clear, achievable goals for your recovery journey.",
    color: "bg-green-50 text-green-600"
  },
  {
    icon: Clock,
    title: "Flexible Scheduling",
    description: "Book appointments that fit your schedule with convenient time slots.",
    color: "bg-orange-50 text-orange-600"
  },
  {
    icon: Award,
    title: "Proven Results",
    description: "98% patient satisfaction rate with measurable improvement outcomes.",
    color: "bg-yellow-50 text-yellow-600"
  }
];

const WhyChooseUsSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <SectionTitle 
          title="Why Choose Our Physiotherapy Services?" 
          subtitle="We combine clinical expertise with compassionate care to deliver exceptional results for every patient."
          center
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-4`}>
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
