
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import PageLayout from "@/components/layout/PageLayout";
import { SectionTitle } from "@/components/ui/section-title";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, DollarSign } from "lucide-react";
import { serviceData } from "@/data/services";
import { useToast } from "@/components/ui/use-toast";

interface ServiceDetail {
  id: string;
  service_slug: string;
  title: string;
  description: string;
  duration: string;
  price_range: string;
  featured_image: string;
  is_active: boolean;
}

const Services = () => {
  const [dbServices, setDbServices] = useState<ServiceDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data, error } = await supabase
          .from('service_details')
          .select('*')
          .eq('is_active', true)
          .order('title');

        if (error) throw error;
        setDbServices(data || []);
      } catch (error: any) {
        console.error('Error fetching services:', error);
        toast({
          title: "Error",
          description: "Failed to load service details",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [toast]);

  // Helper function to get service icon from serviceData
  const getServiceIcon = (slug: string) => {
    const service = serviceData.find(s => s.link === `/services/${slug}` || s.link === `/service/${slug}`);
    return service?.icon;
  };

  // Helper function to categorize services
  const categorizeServices = (services: ServiceDetail[]) => {
    const categories = {
      core: ['sports-rehabilitation', 'manual-therapy', 'neurological'],
      specialized: ['pediatric-rehabilitation', 'geriatric-rehabilitation', 'womens-health'],
      advanced: ['dry-needling', 'cupping-therapy', 'kinesiotaping']
    };

    return {
      core: services.filter(s => categories.core.includes(s.service_slug)),
      specialized: services.filter(s => categories.specialized.includes(s.service_slug)),
      advanced: services.filter(s => categories.advanced.includes(s.service_slug))
    };
  };

  const categorizedServices = categorizeServices(dbServices);

  // Fallback to static data if database services are not available
  const renderServiceCard = (service: any, isDbService: boolean = false) => {
    const linkTo = isDbService ? `/service/${service.service_slug}` : service.link;
    const icon = isDbService ? getServiceIcon(service.service_slug) : service.icon;

    return (
      <Link
        key={isDbService ? service.id : service.id}
        to={linkTo}
        className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300"
      >
        {(service.featured_image || service.image) && (
          <div className="aspect-video w-full overflow-hidden">
            <img
              src={service.featured_image || service.image}
              alt={service.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        )}
        <div className="p-6">
          {icon && (
            <div className="bg-vitality-50 dark:bg-vitality-900/30 rounded-xl p-4 inline-block mb-4">
              {icon}
            </div>
          )}
          <h3 className="text-xl font-bold mb-3 text-vitality-700 dark:text-vitality-300 group-hover:text-vitality-500 transition-colors">
            {service.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">{service.description}</p>
          
          {isDbService && (
            <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-500">
              {service.duration && (
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{service.duration}</span>
                </div>
              )}
              {service.price_range && (
                <div className="flex items-center gap-1">
                  <DollarSign className="h-3 w-3" />
                  <span>{service.price_range}</span>
                </div>
              )}
            </div>
          )}
          
          <div className="inline-flex items-center text-vitality-500 dark:text-vitality-400 font-medium group-hover:text-vitality-600 dark:group-hover:text-vitality-300">
            Learn More
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </Link>
    );
  };

  if (loading) {
    return (
      <PageLayout>
        <div className="container mx-auto py-16 px-4">
          <SectionTitle
            title="Our Services"
            subtitle="Comprehensive physiotherapy and wellness services tailored to your unique needs"
            center
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 aspect-video rounded-xl mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </PageLayout>
    );
  }

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
                {/* Render database services first */}
                {categorizedServices[category as keyof typeof categorizedServices].map((service) =>
                  renderServiceCard(service, true)
                )}
                
                {/* Fallback to static data for missing services */}
                {serviceData
                  .filter((service) => service.category === category)
                  .filter((service) => !dbServices.some(db => db.service_slug === service.link.split('/').pop()))
                  .map((service) => renderServiceCard(service, false))}
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
