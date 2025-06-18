
import PageLayout from "@/components/layout/PageLayout";
import { SectionTitle } from "@/components/ui/section-title";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Award, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { serviceData } from "@/data/services";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

const Services = () => {
  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-vitality-50 via-white to-blue-50 py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-100/20 to-green-100/20"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1)_0%,transparent_50%)]"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6 bg-white rounded-full py-2 px-6 w-fit mx-auto shadow-sm border border-blue-100">
              <Award className="h-5 w-5 text-blue-600 mr-3" />
              <span className="text-sm font-medium text-gray-700">Comprehensive Healthcare Solutions</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6 font-display text-vitality-700 leading-tight">
              Our Professional
              <span className="text-blue-600 block">Healthcare Services</span>
            </h1>
            
            <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
              Comprehensive physiotherapy and wellness services tailored to your unique needs with state-of-the-art equipment and expert care.
            </p>
            
            <div className="flex items-center justify-center gap-4 mt-6">
              <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                <Calendar className="h-4 w-4 mr-2" />
                15+ Service Categories
              </Badge>
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                <CheckCircle className="h-4 w-4 mr-2" />
                Expert Professionals
              </Badge>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto py-16 px-4">
        <Tabs defaultValue="core" className="mt-12">
          <TabsList className="grid w-full max-w-[500px] grid-cols-3 mx-auto bg-blue-50 border border-blue-200">
            <TabsTrigger value="core" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Core Services</TabsTrigger>
            <TabsTrigger value="specialized" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Specialized</TabsTrigger>
            <TabsTrigger value="advanced" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Advanced</TabsTrigger>
          </TabsList>

          {["core", "specialized", "advanced"].map((category) => (
            <TabsContent key={category} value={category} className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {serviceData
                  .filter((service) => service.category === category)
                  .map((service, index) => (
                    <motion.div
                      key={service.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        to={service.link}
                        className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-105"
                      >
                        <div className="aspect-video w-full overflow-hidden">
                          <img
                            src={service.image}
                            alt={service.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="p-6">
                          <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4 inline-block mb-4">
                            {service.icon}
                          </div>
                          <h3 className="text-xl font-bold mb-3 text-vitality-700 dark:text-vitality-300 group-hover:text-blue-600 transition-colors">
                            {service.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300 mb-4">{service.description}</p>
                          <div className="inline-flex items-center text-blue-600 dark:text-blue-400 font-medium group-hover:text-blue-700 dark:group-hover:text-blue-300">
                            Learn More
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <div className="mt-16 text-center">
          <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
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
