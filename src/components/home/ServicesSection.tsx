
import { Link } from "react-router-dom";
import { SectionTitle } from "@/components/ui/section-title";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { serviceData } from "@/data/services";
import { getServiceUrl } from "@/utils/serviceUtils";

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
              {serviceData
                .filter(service => service.category === "core" || service.category === "specialized")
                .slice(0, 6)
                .map((service) => (
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
              {serviceData
                .filter(service => service.category === "advanced")
                .map((service) => (
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
            <Link to="/service-selector" className="flex items-center">
              Find Your Perfect Service
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
