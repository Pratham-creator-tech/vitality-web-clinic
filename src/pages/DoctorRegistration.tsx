
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { 
  UserPlus,
  Building,
  GraduationCap,
  Phone,
  Mail,
  CheckCircle
} from "lucide-react";

import PageLayout from "@/components/layout/PageLayout";
import { SectionTitle } from "@/components/ui/section-title";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage,
  FormDescription
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { supabase } from "@/integrations/supabase/client";

const doctorFormSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters").optional(),
  phone: z.string().min(10, "Please enter a valid phone number"),
  specialization: z.string().min(2, "Please select a specialization"),
  yearsExperience: z.string().min(1, "Please enter years of experience"),
  clinic: z.string().min(2, "Please enter your clinic name"),
  address: z.string().min(10, "Please provide your clinic address"),
  bio: z.string().min(50, "Bio should be at least 50 characters"),
  acceptTerms: z.boolean().refine(val => val === true, {
    message: "You must accept the terms and conditions"
  })
});

type DoctorFormValues = z.infer<typeof doctorFormSchema>;

const DoctorRegistration = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  
  const [savedSignupData, setSavedSignupData] = useState<{
    fullName: string;
    email: string;
    password: string;
  } | null>(null);
  
  useEffect(() => {
    // Check if we have saved signup data from the signup page
    const savedData = sessionStorage.getItem('doctorSignupData');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setSavedSignupData(parsedData);
    }
  }, []);
  
  const form = useForm<DoctorFormValues>({
    resolver: zodResolver(doctorFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      specialization: "",
      yearsExperience: "",
      clinic: "",
      address: "",
      bio: "",
      acceptTerms: false
    }
  });

  // Set the form values from saved signup data if available
  useEffect(() => {
    if (savedSignupData) {
      form.setValue('fullName', savedSignupData.fullName);
      form.setValue('email', savedSignupData.email);
    }
  }, [savedSignupData, form]);

  const onSubmit = async (data: DoctorFormValues) => {
    setIsSubmitting(true);
    try {
      // Register the user with Supabase if we have the data from signup
      if (savedSignupData) {
        const { data: authData, error } = await supabase.auth.signUp({
          email: savedSignupData.email,
          password: savedSignupData.password,
          options: {
            data: {
              full_name: data.fullName,
              role: 'doctor',
            }
          }
        });

        if (error) {
          toast.error("Registration failed: " + error.message);
          console.error("Registration error:", error);
          setIsSubmitting(false);
          return;
        }

        // Make sure we have a user ID before proceeding
        if (!authData.user) {
          toast.error("Registration failed: Unable to create user profile");
          setIsSubmitting(false);
          return;
        }

        const userId = authData.user.id;

        // Create the doctor profile
        const { data: doctorData, error: profileError } = await supabase
          .from('doctors')
          .insert({
            user_id: userId,
            full_name: data.fullName,
            email: data.email,
            phone: data.phone,
            specialization: data.specialization,
            experience_years: parseInt(data.yearsExperience),
            about: data.bio,
            clinic_address: data.address,
            // No subscription_tier or subscription_status anymore
          })
          .select();
          
        if (profileError) {
          toast.error("Profile creation failed: " + profileError.message);
          console.error("Doctor profile creation error:", profileError);
          setIsSubmitting(false);
          return;
        }

        // Clear saved signup data
        sessionStorage.removeItem('doctorSignupData');

        toast.success("Registration successful! Welcome to Physiocare");
        
        // Redirect to onboarding to collect more detailed information
        setTimeout(() => {
          navigate("/doctor-onboarding");
        }, 1500);
      } else {
        // Handle the case where user came directly to this page without going through signup
        toast.error("Missing registration information. Please start from the signup page.");
        navigate("/signup");
      }
    } catch (error) {
      console.error("Unexpected error during registration:", error);
      toast.error("There was a problem with your registration. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageLayout className="py-10 bg-gray-50">
      <div className="container mx-auto px-4 max-w-5xl">
        <SectionTitle 
          title="Join Our Medical Team" 
          subtitle="Register as a physiotherapist at Physiocare and help our patients on their journey to recovery."
          center
        />

        <Card className="shadow-md mt-6">
          <CardContent className="pt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-bold mb-4 text-vitality-700 flex items-center">
                      <UserPlus className="mr-2" size={20} />
                      Personal Information
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Dr. Jane Smith" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="doctor@example.com" {...field} />
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
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input placeholder="+1 (555) 123-4567" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="specialization"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Specialization</FormLabel>
                            <FormControl>
                              <Input placeholder="Sports Rehabilitation, Pediatric Therapy, etc." {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="yearsExperience"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Years of Experience</FormLabel>
                            <FormControl>
                              <Input type="number" min="0" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="clinic"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Clinic/Hospital</FormLabel>
                            <FormControl>
                              <Input placeholder="Current workplace" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem className="mt-6">
                          <FormLabel>Practice Address</FormLabel>
                          <FormControl>
                            <Input placeholder="123 Main St, City, State, Zip" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="bio"
                      render={({ field }) => (
                        <FormItem className="mt-6">
                          <FormLabel>Professional Bio</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Share your professional background, approach to patient care, and areas of interest..."
                              className="min-h-32"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="acceptTerms"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          I accept the terms and conditions
                        </FormLabel>
                        <FormDescription>
                          By registering, you agree to our <Link to="/terms-of-service" className="text-vitality-400 hover:underline">Terms of Service</Link> and <Link to="/privacy-policy" className="text-vitality-400 hover:underline">Privacy Policy</Link>.
                        </FormDescription>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-center">
                  <Button 
                    type="submit" 
                    className="w-full max-w-md"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>Processing Registration...</>
                    ) : (
                      <>
                        <CheckCircle className="mr-2" size={20} />
                        Complete Registration
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Already registered? <Link to="/signin" className="text-vitality-400 hover:underline">Sign in here</Link>
          </p>
        </div>
      </div>
    </PageLayout>
  );
};

export default DoctorRegistration;
