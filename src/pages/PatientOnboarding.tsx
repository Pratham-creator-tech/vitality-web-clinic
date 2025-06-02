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
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { SectionTitle } from "@/components/ui/section-title";
import { CheckCircle, AlertCircle } from "lucide-react";

const genderOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
  { value: "prefer_not_to_say", label: "Prefer not to say" }
];

const formSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  dob: z.string().min(1, { message: "Date of birth is required" }),
  gender: z.string().optional(),
  phone: z.string().min(6, { message: "Phone number must be at least 6 characters." }).optional(),
  address: z.string().min(5, { message: "Address must be at least 5 characters." }).optional(),
  medicalHistory: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const PatientOnboarding = () => {
  const { user, userRole, isLoading } = useAuth(); // Added isLoading from useAuth
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: user?.email?.split('@')[0] || "",
      dob: "",
      gender: "prefer_not_to_say",
      phone: "",
      address: "",
      medicalHistory: "",
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

  const onSubmit = async (data: FormValues) => {
    if (!user) return;
    
    try {
      setIsSubmitting(true);
      
      // Update or create the patient profile
      const { error } = await supabase
        .from('patients')
        .upsert({
          user_id: user.id,
          full_name: data.fullName,
          email: user.email,
          dob: data.dob,
          gender: data.gender,
          phone: data.phone,
          address: data.address,
          medical_history: data.medicalHistory
        });
      
      if (error) throw error;
      
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
          subtitle="Please provide your medical information to help us serve you better."
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
                  Fill out your details to complete your profile setup
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
                        name="dob"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Date of Birth *</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="gender"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Gender</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select gender" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {genderOptions.map((option) => (
                                  <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input {...field} />
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
                            <FormLabel>Address</FormLabel>
                            <FormControl>
                              <Textarea {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="medicalHistory"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Medical History</FormLabel>
                            <FormControl>
                              <Textarea
                                {...field}
                                placeholder="Please list any pre-existing conditions, allergies, or previous surgeries"
                                className="h-32"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
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
