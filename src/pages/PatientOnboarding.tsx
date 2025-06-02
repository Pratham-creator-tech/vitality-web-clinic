
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import PageLayout from "@/components/layout/PageLayout";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { SectionTitle } from "@/components/ui/section-title";
import { CheckCircle, AlertCircle, Upload, X } from "lucide-react";

const formSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  phone: z.string().min(6, { message: "Phone number must be at least 6 characters." }),
  address: z.string().min(5, { message: "Address must be at least 5 characters." }),
});

type FormValues = z.infer<typeof formSchema>;

const PatientOnboarding = () => {
  const { user, userRole, isLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: user?.email?.split('@')[0] || "",
      phone: "",
      address: "",
    },
  });

  // Redirect if not logged in or not a patient
  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        toast({
          title: "Authentication required",
          description: "Please sign in to continue",
          variant: "destructive",
        });
        navigate("/signin");
      } else if (userRole && userRole !== "patient") {
        toast({
          title: "Access denied",
          description: "This page is only for patients",
          variant: "destructive",
        });
        navigate("/");
      }
    }
  }, [user, userRole, isLoading, navigate, toast]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length + selectedFiles.length > 5) {
      toast({
        title: "Too many files",
        description: "You can upload a maximum of 5 files",
        variant: "destructive",
      });
      return;
    }
    setSelectedFiles(prev => [...prev, ...files]);
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const uploadFiles = async (patientId: string) => {
    const uploadPromises = selectedFiles.map(async (file, index) => {
      const fileExt = file.name.split('.').pop();
      const fileName = `${patientId}/prescription_${Date.now()}_${index}.${fileExt}`;
      
      const { error } = await supabase.storage
        .from('patient-files')
        .upload(fileName, file);
      
      if (error) {
        console.error('Error uploading file:', error);
        return null;
      }
      
      return fileName;
    });

    const uploadedFiles = await Promise.all(uploadPromises);
    return uploadedFiles.filter(file => file !== null);
  };

  const onSubmit = async (data: FormValues) => {
    if (!user) return;
    
    try {
      setIsSubmitting(true);
      
      // Update or create the patient profile
      const { data: patientData, error } = await supabase
        .from('patients')
        .upsert({
          user_id: user.id,
          full_name: data.fullName,
          email: user.email,
          phone: data.phone,
          address: data.address
        })
        .select()
        .single();
      
      if (error) throw error;
      
      // Upload prescription files if any
      if (selectedFiles.length > 0) {
        const uploadedFiles = await uploadFiles(patientData.id);
        
        // Store file references in database
        if (uploadedFiles.length > 0) {
          const { error: filesError } = await supabase
            .from('patient_files')
            .insert(
              uploadedFiles.map(fileName => ({
                patient_id: patientData.id,
                file_path: fileName,
                file_type: 'prescription',
                file_name: selectedFiles[uploadedFiles.indexOf(fileName)]?.name || 'Unknown'
              }))
            );
          
          if (filesError) {
            console.error('Error saving file references:', filesError);
          }
        }
      }
      
      setSubmitSuccess(true);
      toast({
        title: "Profile completed",
        description: "Your patient profile has been successfully created",
      });
      
      // Redirect to home after successful submission
      setTimeout(() => {
        navigate("/");
      }, 2000);
      
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update profile",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-12">
        <SectionTitle
          title="Complete Your Patient Profile"
          subtitle="Please provide your contact information to help us serve you better."
        />
        
        <div className="max-w-2xl mx-auto mt-8">
          {submitSuccess ? (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">Profile Completed!</h3>
                  <p className="text-gray-600 mb-4">
                    Thank you for completing your profile. You will be redirected to the home page.
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Patient Information Form</CardTitle>
                <CardDescription>
                  Fill out your contact details to complete your profile setup
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name *</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number *</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="+1 (555) 123-4567" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Address *</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="Your full address" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* File Upload Section */}
                      <div className="space-y-4">
                        <FormLabel>Previous Prescriptions (Optional)</FormLabel>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                          <div className="text-center">
                            <Upload className="mx-auto h-12 w-12 text-gray-400" />
                            <div className="mt-4">
                              <label htmlFor="file-upload" className="cursor-pointer">
                                <span className="mt-2 block text-sm font-medium text-gray-900">
                                  Upload previous prescriptions or medical reports
                                </span>
                                <span className="mt-1 block text-xs text-gray-500">
                                  PDF, JPG, PNG up to 10MB each (max 5 files)
                                </span>
                              </label>
                              <input
                                id="file-upload"
                                name="file-upload"
                                type="file"
                                className="sr-only"
                                multiple
                                accept=".pdf,.jpg,.jpeg,.png"
                                onChange={handleFileSelect}
                              />
                            </div>
                          </div>
                        </div>

                        {/* Selected Files */}
                        {selectedFiles.length > 0 && (
                          <div className="space-y-2">
                            <p className="text-sm font-medium">Selected Files:</p>
                            {selectedFiles.map((file, index) => (
                              <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                                <span className="text-sm text-gray-700 truncate">{file.name}</span>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeFile(index)}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <Button 
                        type="submit" 
                        className="w-full bg-vitality-600 hover:bg-vitality-700"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Saving..." : "Complete Profile"}
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default PatientOnboarding;
