
import { Link } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import { SectionTitle } from "@/components/ui/section-title";
import { CTASection } from "@/components/ui/cta-section";
import { ArrowRight, Activity, UserPlus, Bone, Heart, Brain, Dumbbell, CheckCircle, Clock, Clipboard } from "lucide-react";

const services = [
  {
    id: 1,
    title: "Sports Rehabilitation",
    description: "Our sports rehabilitation program is designed to help athletes of all levels recover from injuries and return to their sport safely. We use a combination of manual therapy, therapeutic exercises, and specialized techniques to address the unique demands of athletic activities.",
    icon: <Activity className="h-12 w-12 text-vitality-400" />,
    benefits: [
      "Faster recovery from sports injuries",
      "Sport-specific rehabilitation protocols",
      "Injury prevention strategies",
      "Performance enhancement techniques"
    ],
    link: "/services/sports-rehabilitation"
  },
  {
    id: 2,
    title: "Manual Therapy",
    description: "Our manual therapy approach utilizes hands-on techniques to reduce pain, improve mobility, and restore function. Our skilled therapists use various methods including joint mobilization, soft tissue manipulation, and myofascial release to address musculoskeletal issues.",
    icon: <UserPlus className="h-12 w-12 text-vitality-400" />,
    benefits: [
      "Reduced pain and muscle tension",
      "Improved joint mobility and function",
      "Enhanced circulation and healing",
      "Posture correction and body awareness"
    ],
    link: "/services/manual-therapy"
  },
  {
    id: 3,
    title: "Post-Surgical Rehabilitation",
    description: "Our post-surgical rehabilitation programs are tailored to help patients recover optimally after various surgical procedures. We work closely with surgeons to ensure appropriate progression of therapy and maximize functional outcomes.",
    icon: <Bone className="h-12 w-12 text-vitality-400" />,
    benefits: [
      "Accelerated recovery after surgery",
      "Reduced post-surgical complications",
      "Proper scar tissue management",
      "Restoration of strength and function"
    ],
    link: "/services/post-surgical"
  },
  {
    id: 4,
    title: "Chronic Pain Management",
    description: "Our chronic pain management approach combines evidence-based physical therapy techniques with education and lifestyle modifications to help patients effectively manage persistent pain conditions and improve quality of life.",
    icon: <Heart className="h-12 w-12 text-vitality-400" />,
    benefits: [
      "Reduced pain intensity and frequency",
      "Improved understanding of pain mechanisms",
      "Enhanced coping strategies",
      "Increased functional capacity"
    ],
    link: "/services/chronic-pain"
  },
  {
    id: 5,
    title: "Neurological Rehabilitation",
    description: "Our neurological rehabilitation services address functional limitations resulting from stroke, traumatic brain injury, Parkinson's disease, multiple sclerosis, and other neurological conditions. We utilize specialized approaches to improve movement, balance, and daily function.",
    icon: <Brain className="h-12 w-12 text-vitality-400" />,
    benefits: [
      "Improved balance and coordination",
      "Enhanced mobility and independence",
      "Better management of neurological symptoms",
      "Personalized home exercise programs"
    ],
    link: "/services/neurological"
  },
  {
    id: 6,
    title: "Strength & Conditioning",
    description: "Our strength and conditioning programs focus on building functional strength, improving mobility, and enhancing overall physical performance. Whether you're recovering from an injury or looking to prevent one, our tailored approach will help you achieve your goals.",
    icon: <Dumbbell className="h-12 w-12 text-vitality-400" />,
    benefits: [
      "Improved functional strength and stability",
      "Enhanced athletic performance",
      "Reduced injury risk",
      "Personalized exercise prescription"
    ],
    link: "/services/strength-conditioning"
  }
];

const Services = () => {
  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="bg-vitality-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 font-display text-vitality-700">
              Our Specialized Services
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              We offer a comprehensive range of physiotherapy services tailored to meet your unique needs and goals.
            </p>
          </div>
        </div>
      </section>

      {/* How We Work Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <SectionTitle 
            title="How We Work" 
            subtitle="Our approach to physiotherapy is methodical, evidence-based, and focused on getting you the best results."
            center
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="bg-gray-50 p-8 rounded-lg text-center">
              <div className="bg-vitality-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clipboard className="h-8 w-8 text-vitality-600" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-vitality-700">1. Thorough Assessment</h3>
              <p className="text-gray-600">
                We start with a comprehensive evaluation to understand your condition, history, and goals.
              </p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg text-center">
              <div className="bg-vitality-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-vitality-600" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-vitality-700">2. Personalized Plan</h3>
              <p className="text-gray-600">
                We develop a customized treatment plan targeting your specific needs and challenges.
              </p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg text-center">
              <div className="bg-vitality-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-vitality-600" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-vitality-700">3. Progressive Treatment</h3>
              <p className="text-gray-600">
                We implement evidence-based techniques and adjust your plan as you progress toward your goals.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Services Detail Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <SectionTitle 
            title="Our Comprehensive Services" 
            subtitle="Discover how our specialized services can help you overcome pain, improve function, and enhance your quality of life."
            center
          />
          
          <div className="mt-12 space-y-16">
            {services.map((service, index) => (
              <div 
                key={service.id} 
                className={`bg-white rounded-lg shadow-sm overflow-hidden ${
                  index % 2 === 1 ? "md:flex-row-reverse" : ""
                } md:flex`}
              >
                <div className="md:w-1/3 bg-vitality-50 p-8 flex items-center justify-center">
                  <div className="text-center">
                    {service.icon}
                    <h3 className="text-2xl font-bold mt-4 text-vitality-700">{service.title}</h3>
                  </div>
                </div>
                
                <div className="md:w-2/3 p-8">
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  
                  <h4 className="font-bold text-lg mb-3 text-vitality-600">Benefits:</h4>
                  <ul className="space-y-2 mb-6">
                    {service.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-vitality-400 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Link 
                    to={service.link}
                    className="inline-flex items-center text-vitality-500 font-medium hover:text-vitality-600"
                  >
                    Learn More About {service.title}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <CTASection 
        title="Ready to Start Your Healing Journey?" 
        description="Book a consultation with one of our expert physiotherapists today."
      />
    </PageLayout>
  );
};

export default Services;
