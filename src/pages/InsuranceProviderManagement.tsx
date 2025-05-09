
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import PageLayout from "@/components/layout/PageLayout";
import { SectionTitle } from "@/components/ui/section-title";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, UploadCloud, Shield, ExternalLink, Phone, Mail, Link as LinkIcon, Plus } from "lucide-react";
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useLocation, useNavigate } from "react-router-dom";

// Schema for insurance provider submission
const insuranceProviderSchema = z.object({
  name: z.string().min(2, { message: "Provider name is required" }),
  description: z.string().min(10, { message: "Please provide a description (min. 10 characters)" }),
  contact_phone: z.string().min(5, { message: "Contact phone is required" }),
  contact_email: z.string().email({ message: "Valid email is required" }),
  website: z.string().url({ message: "Valid website URL is required" }).optional().or(z.literal('')),
  coverage_details: z.string().min(20, { message: "Coverage details are required (min. 20 characters)" }),
});

type InsuranceProviderFormValues = z.infer<typeof insuranceProviderSchema>;

const InsuranceProviderManagement = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isListLoading, setIsListLoading] = useState(true);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [insuranceProviders, setInsuranceProviders] = useState<any[]>([]);
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const tabFromUrl = queryParams.get('tab');
  const [activeTab, setActiveTab] = useState(tabFromUrl === "add" ? "add" : "browse");
  
  const { user, userRole } = useAuth();
  const { toast } = useToast();

  const form = useForm<InsuranceProviderFormValues>({
    resolver: zodResolver(insuranceProviderSchema),
    defaultValues: {
      name: "",
      description: "",
      contact_phone: "",
      contact_email: "",
      website: "",
      coverage_details: "",
    },
  });

  // Update tab state when URL param changes
  useEffect(() => {
    if (tabFromUrl === "add") {
      setActiveTab("add");
    }
  }, [tabFromUrl]);

  // Update URL when tab changes
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    navigate(`/admin/insurance${value === "add" ? "?tab=add" : ""}`, { replace: true });
  };

  // Fetch insurance providers on component mount
  useEffect(() => {
    fetchInsuranceProviders();
  }, []);

  const fetchInsuranceProviders = async () => {
    setIsListLoading(true);
    try {
      const { data, error } = await supabase
        .from("insurance_providers")
        .select("*")
        .order("name");
        
      if (error) throw error;
      setInsuranceProviders(data || []);
    } catch (error) {
      console.error("Error fetching insurance providers:", error);
      toast({
        title: "Error",
        description: "Failed to load insurance providers. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsListLoading(false);
    }
  };

  const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      if (file.size > 2 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Logo image must be less than 2MB",
          variant: "destructive",
        });
        return;
      }
      setLogoFile(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (values: InsuranceProviderFormValues) => {
    // Check if user is admin or has appropriate permissions
    if (userRole !== "admin") {
      toast({
        title: "Permission denied",
        description: "You don't have permission to add insurance providers.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      let logoUrl = null;

      // Upload logo if selected
      if (logoFile) {
        // Create bucket if it doesn't exist
        const { error: bucketError } = await supabase.storage.createBucket('insurance-logos', {
          public: true,
          fileSizeLimit: 1024 * 1024 * 2, // 2MB
        });
        
        if (bucketError && bucketError.message !== 'Bucket already exists') {
          console.error('Error creating bucket:', bucketError);
        }
        
        // Upload the logo
        const filePath = `${Date.now()}-${logoFile.name}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('insurance-logos')
          .upload(filePath, logoFile);
          
        if (uploadError) {
          throw uploadError;
        }
        
        // Get public URL
        const { data: publicUrlData } = supabase.storage
          .from('insurance-logos')
          .getPublicUrl(filePath);
          
        logoUrl = publicUrlData.publicUrl;
      }

      // Insert insurance provider
      const { error } = await supabase
        .from("insurance_providers")
        .insert({
          name: values.name,
          description: values.description,
          contact_phone: values.contact_phone,
          contact_email: values.contact_email,
          website: values.website || null,
          logo_url: logoUrl,
          coverage_details: values.coverage_details,
          is_active: true,
        });

      if (error) throw error;

      toast({
        title: "Insurance Provider Added",
        description: "The insurance provider has been successfully added.",
      });

      // Reset form
      form.reset();
      setLogoFile(null);
      setLogoPreview(null);
      
      // Refresh the list
      fetchInsuranceProviders();
      
      // Switch to browse tab
      handleTabChange("browse");

    } catch (error: any) {
      console.error("Error adding insurance provider:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to add insurance provider. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageLayout>
      <div className="container mx-auto py-12 px-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <SectionTitle 
            title="Insurance Providers" 
            subtitle="Browse available providers or submit a new one"
          />
          
          {userRole === "admin" && activeTab === "browse" && (
            <div className="mt-4 md:mt-0">
              <Button className="flex items-center" onClick={() => handleTabChange("add")}>
                <Plus className="mr-2 h-4 w-4" />
                New Insurance Provider
              </Button>
            </div>
          )}
        </div>

        <div className="max-w-6xl mx-auto mt-8">
          <Tabs value={activeTab} onValueChange={handleTabChange}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="browse">Browse Providers</TabsTrigger>
              {userRole === "admin" && (
                <TabsTrigger value="add">Add New Provider</TabsTrigger>
              )}
            </TabsList>
            
            <TabsContent value="browse" className="mt-6">
              {isListLoading ? (
                <div className="flex justify-center items-center py-20">
                  <Loader2 className="h-8 w-8 animate-spin text-vitality-500 mr-2" />
                  <span>Loading insurance providers...</span>
                </div>
              ) : insuranceProviders.length === 0 ? (
                <div className="text-center py-20">
                  <Shield className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No Insurance Providers</h3>
                  <p className="text-gray-500">
                    There are currently no insurance providers registered in our system.
                  </p>
                  {userRole === "admin" && (
                    <Button 
                      className="mt-4"
                      onClick={() => handleTabChange("add")}
                    >
                      Add Provider
                    </Button>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {insuranceProviders.map((provider) => (
                    <Card key={provider.id} className="overflow-hidden">
                      <CardHeader className="pb-0">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            <Avatar className="h-12 w-12 mr-4">
                              <AvatarImage src={provider.logo_url || undefined} />
                              <AvatarFallback className="bg-vitality-100 text-vitality-700">
                                {provider.name.charAt(0).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <CardTitle className="text-lg">{provider.name}</CardTitle>
                              {provider.is_active && (
                                <Badge variant="outline" className="text-xs mt-1">Active</Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <p className="text-sm text-gray-600 mb-4">{provider.description}</p>
                        
                        <Separator className="my-4" />
                        
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center">
                            <Phone className="h-4 w-4 text-gray-500 mr-2" />
                            <span>{provider.contact_phone}</span>
                          </div>
                          <div className="flex items-center">
                            <Mail className="h-4 w-4 text-gray-500 mr-2" />
                            <span>{provider.contact_email}</span>
                          </div>
                          {provider.website && (
                            <div className="flex items-center">
                              <LinkIcon className="h-4 w-4 text-gray-500 mr-2" />
                              <a 
                                href={provider.website} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-vitality-600 hover:underline flex items-center"
                              >
                                Website <ExternalLink className="h-3 w-3 ml-1" />
                              </a>
                            </div>
                          )}
                        </div>
                        
                        <div className="mt-4">
                          <h4 className="font-medium mb-2">Coverage Details</h4>
                          <p className="text-sm text-gray-600">{provider.coverage_details}</p>
                        </div>
                      </CardContent>
                      <CardFooter className="bg-gray-50 dark:bg-gray-800 flex justify-end pt-3 pb-3">
                        <Button variant="outline" size="sm">
                          Contact Provider
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="add" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Add Insurance Provider</CardTitle>
                  <CardDescription>
                    Fill in the details below to add a new insurance provider to the system.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      {/* Logo Upload */}
                      <div className="mb-6">
                        <FormLabel>Provider Logo</FormLabel>
                        <div className="flex items-center mt-2">
                          <div className="border rounded-md overflow-hidden mr-4 w-24 h-24 flex items-center justify-center bg-gray-50">
                            {logoPreview ? (
                              <img 
                                src={logoPreview} 
                                alt="Logo Preview" 
                                className="object-contain max-h-full max-w-full" 
                              />
                            ) : (
                              <Shield className="h-12 w-12 text-gray-300" />
                            )}
                          </div>
                          <label htmlFor="logo-upload" className="cursor-pointer">
                            <div className="bg-gray-50 border border-gray-300 text-gray-700 px-4 py-2 rounded-md flex items-center hover:bg-gray-100 transition-colors">
                              <UploadCloud className="h-4 w-4 mr-2" />
                              Upload Logo
                            </div>
                            <input
                              id="logo-upload"
                              type="file"
                              accept="image/*"
                              onChange={handleLogoChange}
                              className="hidden"
                            />
                            <p className="text-xs text-gray-500 mt-1">Max file size: 2MB</p>
                          </label>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Provider Name*</FormLabel>
                              <FormControl>
                                <Input placeholder="Insurance Company Name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="contact_email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Contact Email*</FormLabel>
                              <FormControl>
                                <Input placeholder="contact@company.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="contact_phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Contact Phone*</FormLabel>
                              <FormControl>
                                <Input placeholder="+1 123 456 7890" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="website"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Website</FormLabel>
                              <FormControl>
                                <Input placeholder="https://www.example.com" {...field} />
                              </FormControl>
                              <FormMessage />
                              <FormDescription>
                                Optional. Include https:// prefix.
                              </FormDescription>
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description*</FormLabel>
                            <FormControl>
                              <Textarea placeholder="Brief description of the insurance provider" rows={3} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="coverage_details"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Coverage Details*</FormLabel>
                            <FormControl>
                              <Textarea placeholder="Details about coverage plans, policies, and benefits" rows={5} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="flex justify-end gap-4">
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => {
                            form.reset();
                            setLogoFile(null);
                            setLogoPreview(null);
                            handleTabChange("browse");
                          }}
                        >
                          Cancel
                        </Button>
                        <Button type="submit" disabled={isLoading}>
                          {isLoading ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Saving...
                            </>
                          ) : (
                            "Add Provider"
                          )}
                        </Button>
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </PageLayout>
  );
};

export default InsuranceProviderManagement;
