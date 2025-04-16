
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  UserPlus,
  Upload,
  Building,
  GraduationCap,
  Clock,
  MapPin,
  Languages,
  Phone,
  Mail
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

const doctorFormSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  specialization: z.string().min(2, "Please select a specialization"),
  qualifications: z.string().min(10, "Please provide your qualifications"),
  yearsExperience: z.string().min(1, "Please enter years of experience"),
  clinic: z.string().min(2, "Please enter your clinic name"),
  address: z.string().min(10, "Please provide your clinic address"),
  bio: z.string().min(50, "Bio should be at least 50 characters"),
  languages: z.string().min(2, "Please list languages you speak"),
  acceptTerms: z.boolean().refine(val => val === true, {
    message: "You must accept the terms and conditions"
  })
});

type DoctorFormValues = z.infer<typeof doctorFormSchema>;

const DoctorRegistration = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  
  const form = useForm<DoctorFormValues>({
    resolver: zodResolver(doctorFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      specialization: "",
      qualifications: "",
      yearsExperience: "",
      clinic: "",
      address: "",
      bio: "",
      languages: "",
      acceptTerms: false
    }
  });

  const onSubmit = async (data: DoctorFormValues) => {
    setIsSubmitting(true);
    try {
      // In a real app, this would be an API call to register the doctor
      console.log("Doctor registration data:", data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success("Registration successful! We'll review your details and contact you soon.");
      navigate("/"); // Redirect to home page after successful registration
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("There was a problem with your registration. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageLayout className="py-10 bg-gray-50">
      <div className="container mx-auto px-4 max-w-4xl">
        <SectionTitle 
          title="Join Our Medical Team" 
          subtitle="Register as a physiotherapist at Vitality Physio and help our patients on their journey to recovery."
          center
        />

        <Card className="mt-8 shadow-md">
          <CardContent className="pt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Personal Information */}
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
                    name="qualifications"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Qualifications</FormLabel>
                        <FormControl>
                          <Input placeholder="PT, DPT, MPT, etc." {...field} />
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

                  <FormField
                    control={form.control}
                    name="languages"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Languages Spoken</FormLabel>
                        <FormControl>
                          <Input placeholder="English, Spanish, etc." {...field} />
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
                    <FormItem>
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
                    <FormItem>
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

                <div className="flex flex-col items-start gap-4">
                  <div className="flex items-center gap-2">
                    <Button type="button" variant="outline" className="p-2 h-auto">
                      <Upload size={16} className="mr-2" />
                      Upload Profile Photo
                    </Button>
                    <p className="text-sm text-gray-500">
                      (Optional)
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button type="button" variant="outline" className="p-2 h-auto">
                      <Upload size={16} className="mr-2" />
                      Upload Credentials
                    </Button>
                    <p className="text-sm text-gray-500">
                      (Optional) License, certifications, etc.
                    </p>
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
                          By registering, you agree to our <a href="/terms-of-service" className="text-vitality-400 hover:underline">Terms of Service</a> and <a href="/privacy-policy" className="text-vitality-400 hover:underline">Privacy Policy</a>.
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
                      <>Processing...</>
                    ) : (
                      <>
                        <UserPlus className="mr-2" size={20} />
                        Register as a Physiotherapist
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
            Already registered? <a href="/login" className="text-vitality-400 hover:underline">Sign in here</a>
          </p>
        </div>
      </div>
    </PageLayout>
  );
};

export default DoctorRegistration;
