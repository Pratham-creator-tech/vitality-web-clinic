
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft, Clock, DollarSign, CheckCircle } from "lucide-react";
import { SectionTitle } from "@/components/ui/section-title";

interface ServiceDetail {
  id: string;
  service_slug: string;
  title: string;
  description: string;
  detailed_content: string;
  benefits: string[];
  process_steps: string[];
  duration: string;
  price_range: string;
  featured_image: string;
  gallery_images: string[];
}

const ServiceDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [service, setService] = useState<ServiceDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchService = async () => {
      if (!slug) return;

      try {
        const { data, error } = await supabase
          .from('service_details')
          .select('*')
          .eq('service_slug', slug)
          .eq('is_active', true)
          .single();

        if (error) throw error;
        setService(data);
      } catch (error: any) {
        toast({
          title: "Error",
          description: "Failed to load service details",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [slug, toast]);

  if (loading) {
    return (
      <PageLayout>
        <div className="container mx-auto py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-gray-200 rounded w-1/4"></div>
              <div className="h-64 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </PageLayout>
    );
  }

  if (!service) {
    return (
      <PageLayout>
        <div className="container mx-auto py-16 px-4 text-center">
          <h1 className="text-2xl font-bold mb-4">Service Not Found</h1>
          <p className="text-gray-600 mb-8">The requested service could not be found.</p>
          <Button asChild>
            <Link to="/services">Back to Services</Link>
          </Button>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="container mx-auto py-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Back Navigation */}
          <Button variant="ghost" asChild className="mb-6">
            <Link to="/services" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Services
            </Link>
          </Button>

          {/* Hero Section */}
          <div className="mb-12">
            {service.featured_image && (
              <div className="aspect-video w-full mb-6 rounded-xl overflow-hidden">
                <img
                  src={service.featured_image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            <SectionTitle
              title={service.title}
              subtitle={service.description}
            />

            <div className="flex flex-wrap gap-4 mt-6">
              {service.duration && (
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="h-4 w-4" />
                  <span>{service.duration}</span>
                </div>
              )}
              {service.price_range && (
                <div className="flex items-center gap-2 text-gray-600">
                  <DollarSign className="h-4 w-4" />
                  <span>{service.price_range}</span>
                </div>
              )}
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-4">About This Service</h2>
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-700 leading-relaxed">{service.detailed_content}</p>
                </div>
              </div>

              {service.process_steps && service.process_steps.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">Our Process</h2>
                  <div className="space-y-4">
                    {service.process_steps.map((step, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <Badge variant="secondary" className="mt-1">
                          {index + 1}
                        </Badge>
                        <p className="text-gray-700">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {service.benefits && service.benefits.length > 0 && (
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Key Benefits</h3>
                    <div className="space-y-3">
                      {service.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-vitality-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Ready to Get Started?</h3>
                  <p className="text-gray-600 mb-4">
                    Book your appointment today and take the first step towards recovery.
                  </p>
                  <Button asChild className="w-full">
                    <Link to="/booking">Book Appointment</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Gallery */}
          {service.gallery_images && service.gallery_images.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Gallery</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {service.gallery_images.map((image, index) => (
                  <div key={index} className="aspect-square rounded-lg overflow-hidden">
                    <img
                      src={image}
                      alt={`${service.title} gallery ${index + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default ServiceDetailPage;
