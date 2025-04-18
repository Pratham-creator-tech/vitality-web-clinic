
import { Link } from "react-router-dom";
import { SectionTitle } from "@/components/ui/section-title";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Dumbbell, Bone, UserPlus, Activity, BrainCircuit, Baby, 
  Users, Flame, ThermometerSun, Bandage, Syringe, Zap, Grid, Video } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const services = [
  {
    id: 1,
    title: "Pain Management",
    description: "Expert care for chronic and acute pain conditions using evidence-based techniques.",
    icon: <Heart className="h-10 w-10 text-vitality-400" />,
    link: "/services/pain-management",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80"
  },
  {
    id: 2,
    title: "Obesity Management & Fitness",
    description: "Personalized weight management and fitness programs for sustainable results.",
    icon: <Dumbbell className="h-10 w-10 text-vitality-400" />,
    link: "/services/obesity-management",
    image: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1769&q=80"
  },
  {
    id: 3,
    title: "Orthopedic Rehabilitation",
    description: "Comprehensive post-surgical and injury rehabilitation programs.",
    icon: <Bone className="h-10 w-10 text-vitality-400" />,
    link: "/services/orthopedic-rehab",
    image: "https://images.unsplash.com/photo-1612776572997-76cc42e058c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1742&q=80"
  },
  {
    id: 4,
    title: "Strength Training",
    description: "Build strength, improve function and prevent injuries with expert guidance.",
    icon: <Activity className="h-10 w-10 text-vitality-400" />,
    link: "/services/strength-training",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80"
  },
  {
    id: 5,
    title: "Postural Alignment",
    description: "Correct posture problems and improve ergonomic wellness.",
    icon: <UserPlus className="h-10 w-10 text-vitality-400" />,
    link: "/services/postural-alignment",
    image: "https://images.unsplash.com/photo-1489659639091-8b687bc4386e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1773&q=80"
  },
  {
    id: 6,
    title: "Geriatric Rehabilitation",
    description: "Specialized care for elderly patients focusing on mobility and independence.",
    icon: <ThermometerSun className="h-10 w-10 text-vitality-400" />,
    link: "/services/geriatric-rehab",
    image: "https://images.unsplash.com/photo-1574279606130-09958dc756f7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1776&q=80"
  },
  {
    id: 7,
    title: "Neurological Recovery",
    description: "Expert treatment for neurological conditions and recovery.",
    icon: <BrainCircuit className="h-10 w-10 text-vitality-400" />,
    link: "/services/neurological-recovery",
    image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1773&q=80"
  },
  {
    id: 8,
    title: "Women's Health",
    description: "Specialized physiotherapy services for women's unique health needs.",
    icon: <Heart className="h-10 w-10 text-vitality-400" />,
    link: "/services/womens-health",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1820&q=80"
  },
  {
    id: 9,
    title: "Pediatric Rehabilitation",
    description: "Specialized care for children's development and rehabilitation needs.",
    icon: <Baby className="h-10 w-10 text-vitality-400" />,
    link: "/services/pediatric-rehab",
    image: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80"
  },
  {
    id: 10,
    title: "Group Exercise",
    description: "Motivating group sessions for fitness and rehabilitation.",
    icon: <Users className="h-10 w-10 text-vitality-400" />,
    link: "/services/group-exercise",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80"
  },
];

const advancedServices = [
  {
    id: 1,
    title: "Kinesiotaping",
    description: "Advanced taping techniques for pain relief and muscle support.",
    icon: <Bandage className="h-10 w-10 text-vitality-400" />,
    link: "/services/kinesiotaping",
    image: "https://images.unsplash.com/photo-1619124649874-f21dd6450d95?ixlib=rb-4.0.3&auto=format&fit=crop&w=1769&q=80"
  },
  {
    id: 2,
    title: "Dry Needling Therapy",
    description: "Precision treatment for muscle pain and tension.",
    icon: <Syringe className="h-10 w-10 text-vitality-400" />,
    link: "/services/dry-needling",
    image: "https://images.unsplash.com/photo-1584515933487-779824d29309?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80"
  },
  {
    id: 3,
    title: "Neuro Dynamic Solution",
    description: "Advanced treatment for nerve-related conditions.",
    icon: <Zap className="h-10 w-10 text-vitality-400" />,
    link: "/services/neuro-dynamic",
    image: "https://images.unsplash.com/photo-1607962837359-5e7e89f86776?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80"
  },
  {
    id: 4,
    title: "Cupping Therapy",
    description: "Traditional therapy for muscle tension and circulation.",
    icon: <Grid className="h-10 w-10 text-vitality-400" />,
    link: "/services/cupping",
    image: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1769&q=80"
  },
  {
    id: 5,
    title: "Virtual Physiotherapy",
    description: "Expert care from the comfort of your home.",
    icon: <Video className="h-10 w-10 text-vitality-400" />,
    link: "/services/virtual",
    image: "https://images.unsplash.com/photo-1609220136736-443140cffec6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80"
  },
];

const ServicesSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <SectionTitle 
          title="Our Services" 
          subtitle="Comprehensive physiotherapy and wellness services tailored to your unique needs."
          center
        />
        
        <Tabs defaultValue="regular" className="mt-12">
          <TabsList className="grid w-full grid-cols-2 max-w-[400px] mx-auto">
            <TabsTrigger value="regular">Regular Services</TabsTrigger>
            <TabsTrigger value="advanced">Advanced Services</TabsTrigger>
          </TabsList>
          
          <TabsContent value="regular">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
              {services.map((service) => (
                <Link 
                  key={service.id} 
                  to={service.link}
                  className="group relative bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-md transition-all"
                >
                  <div className="aspect-video w-full overflow-hidden">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <div className="bg-vitality-50 rounded-xl p-4 inline-block mb-4">
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-vitality-700 group-hover:text-vitality-500 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    <div className="inline-flex items-center text-vitality-500 font-medium group-hover:text-vitality-600">
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="advanced">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
              {advancedServices.map((service) => (
                <Link 
                  key={service.id} 
                  to={service.link}
                  className="group relative bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-md transition-all"
                >
                  <div className="aspect-video w-full overflow-hidden">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <div className="bg-vitality-50 rounded-xl p-4 inline-block mb-4">
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-vitality-700 group-hover:text-vitality-500 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    <div className="inline-flex items-center text-vitality-500 font-medium group-hover:text-vitality-600">
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </TabsContent>
        </Tabs>
        
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
