
import PageLayout from "@/components/layout/PageLayout";
import { SectionTitle } from "@/components/ui/section-title";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { serviceData } from "@/data/services";

const Services = () => {
  return (
    <PageLayout>
      <div className="container mx-auto py-16 px-4">
        <SectionTitle
          title="Our Services"
          subtitle="Comprehensive physiotherapy and wellness services tailored to your unique needs"
          center
        />

        <Tabs defaultValue="core" className="mt-12">
          <TabsList className="grid w-full max-w-[500px] grid-cols-3 mx-auto">
            <TabsTrigger value="core">Core Services</TabsTrigger>
            <TabsTrigger value="specialized">Specialized</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>

          {["core", "specialized", "advanced"].map((category) => (
            <TabsContent key={category} value={category} className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {serviceData
                  .filter((service) => service.category === category)
                  .map((service) => (
                    <Link
                      key={service.id}
                      to={service.link}
                      className="group bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300"
                    >
                      <div className="aspect-video w-full overflow-hidden">
                        <img
                          src={service.image}
                          alt={service.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
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
          ))}
        </Tabs>

        <div className="mt-16 text-center">
          <Button asChild size="lg">
            <Link to="/booking" className="flex items-center">
              Book an Appointment
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </PageLayout>
  );
};

export default Services;
