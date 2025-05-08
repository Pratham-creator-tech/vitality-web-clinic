
import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import PageLayout from "@/components/layout/PageLayout";
import { SectionTitle } from "@/components/ui/section-title";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { Loader2, Mail, Globe, Phone, Search, Info } from "lucide-react";
import { Link } from "react-router-dom";

interface InsuranceProvider {
  id: string;
  name: string;
  description: string | null;
  contact_phone: string | null;
  contact_email: string | null;
  website: string | null;
  logo_url: string | null;
  coverage_details: string | null;
  is_active: boolean;
}

const InsuranceList = () => {
  const [providers, setProviders] = useState<InsuranceProvider[]>([]);
  const [filteredProviders, setFilteredProviders] = useState<InsuranceProvider[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchInsuranceProviders = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from("insurance_providers")
          .select("*")
          .eq("is_active", true)
          .order("name");

        if (error) {
          throw error;
        }

        setProviders(data || []);
        setFilteredProviders(data || []);
      } catch (error) {
        console.error("Error fetching insurance providers:", error);
        toast({
          title: "Error",
          description: "Failed to load insurance providers. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchInsuranceProviders();
  }, [toast]);

  useEffect(() => {
    if (searchTerm) {
      const filtered = providers.filter(provider =>
        provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (provider.description && provider.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setFilteredProviders(filtered);
    } else {
      setFilteredProviders(providers);
    }
  }, [searchTerm, providers]);

  return (
    <PageLayout>
      <div className="container mx-auto py-12 px-4">
        <SectionTitle
          title="Insurance Providers"
          subtitle="Explore insurance plans that cover physiotherapy services"
          center
        />

        <div className="mt-8 max-w-lg mx-auto relative mb-12">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search insurance providers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-vitality-500 mr-2" />
            <span>Loading insurance providers...</span>
          </div>
        ) : filteredProviders.length === 0 ? (
          <div className="text-center py-12">
            <Info className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">No insurance providers found</h3>
            <p className="text-gray-500 mb-6">
              {searchTerm
                ? "No insurance providers match your search criteria."
                : "No insurance providers are currently available."}
            </p>
            {searchTerm && (
              <Button variant="outline" onClick={() => setSearchTerm("")}>
                Clear Search
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProviders.map((provider) => (
              <Card key={provider.id} className="overflow-hidden hover:shadow-lg transition-all">
                <div className="h-36 bg-gray-100 flex items-center justify-center p-6">
                  {provider.logo_url ? (
                    <img
                      src={provider.logo_url}
                      alt={`${provider.name} Logo`}
                      className="max-h-full max-w-full object-contain"
                    />
                  ) : (
                    <div className="text-2xl font-bold text-gray-300">{provider.name}</div>
                  )}
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">{provider.name}</h3>
                  {provider.description && (
                    <CardDescription className="mb-4">
                      {provider.description.length > 120
                        ? `${provider.description.substring(0, 120)}...`
                        : provider.description}
                    </CardDescription>
                  )}
                  
                  <div className="space-y-2 mb-6">
                    {provider.contact_phone && (
                      <div className="flex items-center text-sm">
                        <Phone className="h-4 w-4 mr-2 text-gray-500" />
                        <span>{provider.contact_phone}</span>
                      </div>
                    )}
                    {provider.contact_email && (
                      <div className="flex items-center text-sm">
                        <Mail className="h-4 w-4 mr-2 text-gray-500" />
                        <span>{provider.contact_email}</span>
                      </div>
                    )}
                    {provider.website && (
                      <div className="flex items-center text-sm">
                        <Globe className="h-4 w-4 mr-2 text-gray-500" />
                        <a
                          href={provider.website.startsWith("http") ? provider.website : `https://${provider.website}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-vitality-600 hover:underline"
                        >
                          Visit Website
                        </a>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between">
                    <Button variant="outline" asChild className="flex-1">
                      <Link to={`/insurance/${provider.id}`}>View Details</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="mt-16 text-center">
          <h3 className="text-xl font-semibold mb-4">Don't see your insurance provider?</h3>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            Contact us to verify if your insurance plan covers physiotherapy services. 
            We work with many insurance companies and may be able to accommodate your provider.
          </p>
          <Button asChild>
            <Link to="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </PageLayout>
  );
};

export default InsuranceList;
