
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import PageLayout from "@/components/layout/PageLayout";
import { SectionTitle } from "@/components/ui/section-title";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { PlusCircle } from "lucide-react";

const InsuranceList = () => {
  const navigate = useNavigate();
  
  const { data: insuranceProviders, isLoading } = useQuery({
    queryKey: ['insuranceProviders'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('insurance_providers')
        .select('*')
        .order('name', { ascending: true });
        
      if (error) throw error;
      return data || [];
    }
  });

  const handleAddProvider = () => {
    navigate("/insurance/new");
  };

  return (
    <PageLayout>
      <div className="container mx-auto py-12 px-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <SectionTitle 
            title="Insurance Providers" 
            subtitle="We work with the following insurance companies"
          />
          
          <div className="mt-4 md:mt-0">
            <Button 
              onClick={handleAddProvider}
              className="flex items-center"
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Insurance Provider
            </Button>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <Skeleton className="h-16 w-16 rounded" />
                    <div className="space-y-2">
                      <Skeleton className="h-5 w-40" />
                      <Skeleton className="h-4 w-28" />
                    </div>
                  </div>
                  <Skeleton className="h-16 w-full mt-4" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : insuranceProviders && insuranceProviders.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {insuranceProviders.map((provider) => (
              <Card key={provider.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    {provider.logo_url ? (
                      <img 
                        src={provider.logo_url} 
                        alt={`${provider.name} logo`} 
                        className="h-16 w-16 object-contain"
                      />
                    ) : (
                      <div className="h-16 w-16 bg-gray-100 rounded flex items-center justify-center">
                        <span className="text-xl font-bold text-gray-400">
                          {provider.name.substring(0, 2).toUpperCase()}
                        </span>
                      </div>
                    )}
                    <div>
                      <h3 className="text-lg font-semibold">{provider.name}</h3>
                      {provider.website && (
                        <a 
                          href={provider.website} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-sm text-vitality-600 hover:underline"
                        >
                          Visit Website
                        </a>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                    {provider.description || "No description available."}
                  </p>
                  
                  <div className="text-sm">
                    {provider.contact_phone && (
                      <p className="text-gray-700">
                        <strong>Phone:</strong> {provider.contact_phone}
                      </p>
                    )}
                    {provider.contact_email && (
                      <p className="text-gray-700">
                        <strong>Email:</strong> {provider.contact_email}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-700 mb-2">No insurance providers found</h3>
            <p className="text-gray-500 mb-6">Be the first to add an insurance provider.</p>
            <Button onClick={handleAddProvider}>
              Add Insurance Provider
            </Button>
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default InsuranceList;
