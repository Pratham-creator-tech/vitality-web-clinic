import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import PageLayout from "@/components/layout/PageLayout";
import { SectionTitle } from "@/components/ui/section-title";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription
} from "@/components/ui/form";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ProfileImageUpload from "@/components/form/ProfileImageUpload";
import { Checkbox } from "@/components/ui/checkbox";
import { generateWelcomeMessage, sendWhatsAppMessage } from "@/utils/whatsappService";

const profileSchema = z.object({
  full_name: z.string().min(2, { message: "Full name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().min(5, { message: "Phone number is required" }),
  dob: z.string().min(1, { message: "Date of birth is required" }),
  gender: z.string().min(1, { message: "Gender is required" }),
  address: z.string().min(5, { message: "Address is required" }),
  emergency_contact_name: z.string().min(2, { message: "Emergency contact name is required" }),
  emergency_contact_phone: z.string().min(5, { message: "Emergency contact phone is required" }),
  emergency_contact_relation: z.string().min(1, { message: "Relationship is required" }),
  medical_history: z.string().optional(),
  current_medications: z.string().optional(),
  allergies: z.string().optional(),
  family_medical_history: z.string().optional(),
  whatsapp_opt_in: z.boolean().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const CompleteProfile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      full_name: "",
      email: user?.email || "",
      phone: "",
      dob: "",
      gender: "",
      address: "",
      emergency_contact_name: "",
      emergency_contact_phone: "",
      emergency_contact_relation: "",
      medical_history: "",
      current_medications: "",
      allergies: "",
      family_medical_history: "",
      whatsapp_opt_in: true,
    },
  });

  useEffect(() => {
    // Check if user is authenticated
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to complete your profile.",
        variant: "destructive",
      });
      navigate("/signin");
      return;
    }

    // Check if profile is already completed
    const checkProfile = async () => {
      try {
        const { data, error } = await supabase
          .from("patients")
          .select("*")
          .eq("user_id", user.id)
          .single();

        if (error && error.code !== "PGRST116") {
          throw error;
        }

        if (data) {
          // Profile already exists, redirect to dashboard
          toast({
            title: "Profile already completed",
            description: "You have already completed your profile.",
          });
          navigate("/");
        }
      } catch (error) {
        console.error("Error checking profile:", error);
      }
    };

    checkProfile();
  }, [user, navigate, toast]);

  const handleProfileImageUploaded = (url: string) => {
    setProfileImageUrl(url);
  };

  const onSubmit = async (values: ProfileFormValues) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to complete your profile.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      // Create patient record
      const { data: patientData, error: patientError } = await supabase
        .from("patients")
        .insert({
          user_id: user.id,
          full_name: values.full_name,
          email: values.email,
          phone: values.phone,
          dob: values.dob,
          gender: values.gender,
          address: values.address,
          medical_history: values.medical_history || null,
          profile_image: profileImageUrl,
        })
        .select('id')
        .single();

      if (patientError) throw patientError;

      if (patientData) {
        // Create emergency contact record
        const { error: emergencyContactError } = await supabase
          .from("patient_emergency_contacts")
          .insert({
            patient_id: patientData.id,
            name: values.emergency_contact_name,
            phone: values.emergency_contact_phone,
            relationship: values.emergency_contact_relation,
          });

        if (emergencyContactError) throw emergencyContactError;

        // Create patient medical data record
        if (values.current_medications || values.allergies || values.family_medical_history) {
          const { error: medicalDataError } = await supabase
            .from("patient_medical_data")
            .insert({
              patient_id: patientData.id,
              current_medications: values.current_medications || null,
              allergies: values.allergies || null,
              family_medical_history: values.family_medical_history || null,
            });

          if (medicalDataError) throw medicalDataError;
        }
      }

      // Send WhatsApp welcome message if opted in
      if (values.whatsapp_opt_in && values.phone) {
        try {
          await sendWhatsAppMessage(
            values.phone,
            generateWelcomeMessage(values.full_name)
          );
        } catch (whatsappError) {
          console.error("Failed to send WhatsApp message:", whatsappError);
          // Non-blocking error, we continue with the flow
        }
      }

      toast({
        title: "Profile completed",
        description: "Your profile has been successfully completed.",
      });

      // Redirect to home page
      navigate("/");

    } catch (error: any) {
      console.error("Error completing profile:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to complete profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageLayout>
      <div className="container mx-auto py-12 px-4">
        <SectionTitle 
          title="Complete Your Profile" 
          subtitle="Please provide your details to complete your profile"
          center
        />

        <div className="max-w-4xl mx-auto mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Patient Information</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* Profile Image Upload */}
                  <div className="flex flex-col items-center mb-6">
                    <ProfileImageUpload 
                      initialImageUrl={null}
                      onImageUploaded={handleProfileImageUploaded}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Personal Details */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Personal Details</h3>
                      
                      <FormField
                        control={form.control}
                        name="full_name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name*</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" {...field} />
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
                            <FormLabel>Email*</FormLabel>
                            <FormControl>
                              <Input placeholder="john@example.com" {...field} />
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
                            <FormLabel>Phone Number*</FormLabel>
                            <FormControl>
                              <Input placeholder="+1 123 456 7890" {...field} />
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
                            <FormLabel>Date of Birth*</FormLabel>
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
                            <FormLabel>Gender*</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select gender" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="male">Male</SelectItem>
                                <SelectItem value="female">Female</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                                <SelectItem value="prefer_not_to_say">Prefer not to say</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Address*</FormLabel>
                            <FormControl>
                              <Textarea placeholder="Your full address" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Emergency Contact */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Emergency Contact</h3>
                      
                      <FormField
                        control={form.control}
                        name="emergency_contact_name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Contact Name*</FormLabel>
                            <FormControl>
                              <Input placeholder="Jane Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="emergency_contact_phone"
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
                        name="emergency_contact_relation"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Relationship*</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select relationship" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="spouse">Spouse</SelectItem>
                                <SelectItem value="parent">Parent</SelectItem>
                                <SelectItem value="child">Child</SelectItem>
                                <SelectItem value="sibling">Sibling</SelectItem>
                                <SelectItem value="friend">Friend</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <h3 className="text-lg font-medium pt-4">Medical Information</h3>
                      
                      <FormField
                        control={form.control}
                        name="medical_history"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Medical History</FormLabel>
                            <FormControl>
                              <Textarea placeholder="Previous surgeries, chronic conditions, etc." {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="current_medications"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Current Medications</FormLabel>
                            <FormControl>
                              <Textarea placeholder="List any current medications" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Medical Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="allergies"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Allergies</FormLabel>
                          <FormControl>
                            <Textarea placeholder="List any allergies" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="family_medical_history"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Family Medical History</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Relevant family medical history" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  {/* WhatsApp Opt-in */}
                  <FormField
                    control={form.control}
                    name="whatsapp_opt_in"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 py-2">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="font-normal">
                            Receive WhatsApp notifications for appointments and important updates
                          </FormLabel>
                          <FormDescription>
                            We'll send you appointment reminders, payment confirmations, and important updates.
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-end">
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        "Complete Profile"
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default CompleteProfile;
