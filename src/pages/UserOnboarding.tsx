
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ChevronRight, Save, UserCircle } from "lucide-react";

// Define the form schema with zod
const profileFormSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().optional(),
  age: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Age must be a positive number",
  }),
  gender: z.enum(["male", "female", "other", "prefer-not-to-say"]),
  address: z.string().optional(),
});

const painFormSchema = z.object({
  painType: z.enum(["acute", "chronic", "post-surgery", "sports-injury", "other"]),
  painLocations: z.array(z.string()).min(1, "Select at least one pain location"),
  painLevel: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 1 && Number(val) <= 10, {
    message: "Pain level must be between 1 and 10",
  }),
  painDescription: z.string().min(10, "Please provide more details about your pain"),
  previousTreatments: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;
type PainFormValues = z.infer<typeof painFormSchema>;

const UserOnboarding = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Create profile form
  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      age: "",
      gender: "prefer-not-to-say",
      address: "",
    },
  });
  
  // Create pain form
  const painForm = useForm<PainFormValues>({
    resolver: zodResolver(painFormSchema),
    defaultValues: {
      painType: "other",
      painLocations: [],
      painLevel: "5",
      painDescription: "",
      previousTreatments: "",
    },
  });
  
  const onProfileSubmit = async (data: ProfileFormValues) => {
    if (!user) {
      toast.error("You must be logged in to complete your profile");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Insert or update patient record
      const { error } = await supabase.from("patients").upsert({
        user_id: user.id,
        full_name: data.fullName,
        phone: data.phone,
        // Convert age to ISO date format for dob (approximate)
        dob: new Date(new Date().getFullYear() - parseInt(data.age), 0, 1).toISOString().split('T')[0],
        address: data.address,
        // Add gender to medical_history as JSON
        medical_history: JSON.stringify({ gender: data.gender }),
      });
      
      if (error) throw error;
      
      toast.success("Profile updated successfully!");
      setActiveTab("pain");
    } catch (error: any) {
      toast.error("Error updating profile: " + error.message);
      console.error("Error updating profile:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const onPainSubmit = async (data: PainFormValues) => {
    if (!user) {
      toast.error("You must be logged in to complete your profile");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Get current patient record
      const { data: patientData, error: fetchError } = await supabase
        .from("patients")
        .select("medical_history")
        .eq("user_id", user.id)
        .single();
      
      if (fetchError) throw fetchError;
      
      // Parse and update medical history
      let medicalHistory = {};
      try {
        medicalHistory = patientData.medical_history ? JSON.parse(patientData.medical_history) : {};
      } catch (e) {
        // If JSON parse fails, use empty object
        medicalHistory = {};
      }
      
      // Add pain information to medical history
      const updatedMedicalHistory = {
        ...medicalHistory,
        pain: {
          type: data.painType,
          locations: data.painLocations,
          level: data.painLevel,
          description: data.painDescription,
          previousTreatments: data.previousTreatments,
        },
      };
      
      // Update patient record
      const { error: updateError } = await supabase
        .from("patients")
        .update({
          medical_history: JSON.stringify(updatedMedicalHistory),
        })
        .eq("user_id", user.id);
      
      if (updateError) throw updateError;
      
      toast.success("Pain information saved successfully!");
      navigate("/dashboard");
    } catch (error: any) {
      toast.error("Error saving pain information: " + error.message);
      console.error("Error saving pain information:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const bodyLocations = [
    "head", "neck", "shoulder", "upper-back", "lower-back", 
    "arm", "elbow", "wrist", "hand", "hip", "knee", "ankle", "foot"
  ];
  
  return (
    <PageLayout>
      <div className="container mx-auto py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8 text-vitality-700">Complete Your Profile</h1>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="profile" disabled={isSubmitting}>
                <UserCircle className="mr-2 h-4 w-4" />
                Personal Information
              </TabsTrigger>
              <TabsTrigger value="pain" disabled={isSubmitting}>
                Pain & Injury Details
                <ChevronRight className="ml-2 h-4 w-4" />
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>
                    Help us get to know you better. This information will be used to personalize your treatment plan.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...profileForm}>
                    <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-6">
                      <FormField
                        control={profileForm.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your full name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={profileForm.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone Number</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter your phone number" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={profileForm.control}
                          name="age"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Age</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter your age" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={profileForm.control}
                        name="gender"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Gender</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select your gender" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="male">Male</SelectItem>
                                <SelectItem value="female">Female</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                                <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={profileForm.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Address</FormLabel>
                            <FormControl>
                              <Textarea placeholder="Enter your address" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Button 
                        type="submit" 
                        className="w-full"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Saving..." : "Save & Continue"}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="pain">
              <Card>
                <CardHeader>
                  <CardTitle>Pain & Injury Details</CardTitle>
                  <CardDescription>
                    Please tell us about your pain or injury so we can better assist you.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...painForm}>
                    <form onSubmit={painForm.handleSubmit(onPainSubmit)} className="space-y-6">
                      <FormField
                        control={painForm.control}
                        name="painType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Type of Pain/Injury</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select type of pain or injury" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="acute">Acute (Recent) Injury</SelectItem>
                                <SelectItem value="chronic">Chronic Pain</SelectItem>
                                <SelectItem value="post-surgery">Post-Surgery Rehabilitation</SelectItem>
                                <SelectItem value="sports-injury">Sports Injury</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={painForm.control}
                        name="painLocations"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Location of Pain (Select all that apply)</FormLabel>
                            <FormControl>
                              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                {bodyLocations.map((location) => (
                                  <div key={location} className="flex items-center space-x-2">
                                    <input
                                      type="checkbox"
                                      id={location}
                                      className="rounded border-gray-300 text-vitality-600 focus:ring-vitality-500"
                                      value={location}
                                      checked={field.value.includes(location)}
                                      onChange={(e) => {
                                        const checked = e.target.checked;
                                        const value = e.target.value;
                                        const newValues = checked
                                          ? [...field.value, value]
                                          : field.value.filter((val) => val !== value);
                                        field.onChange(newValues);
                                      }}
                                    />
                                    <label htmlFor={location} className="text-sm font-medium text-gray-700 capitalize">
                                      {location.replace('-', ' ')}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={painForm.control}
                        name="painLevel"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Pain Level (1-10)</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex justify-between"
                              >
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((level) => (
                                  <div key={level} className="flex flex-col items-center">
                                    <RadioGroupItem value={level.toString()} id={`pain-${level}`} />
                                    <label htmlFor={`pain-${level}`} className="text-sm mt-1">
                                      {level}
                                    </label>
                                  </div>
                                ))}
                              </RadioGroup>
                            </FormControl>
                            <FormDescription className="text-xs text-center mt-2">
                              1 = Minimal pain, 10 = Worst possible pain
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={painForm.control}
                        name="painDescription"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Describe your pain/injury</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Please describe when and how your pain started, and any specific movements that make it worse or better."
                                {...field}
                                rows={4}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={painForm.control}
                        name="previousTreatments"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Previous Treatments (if any)</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="List any previous treatments you've tried for this condition."
                                {...field}
                                rows={3}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Button 
                        type="submit" 
                        className="w-full" 
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Saving..." : "Complete Profile"}
                        <Save className="ml-2 h-4 w-4" />
                      </Button>
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

export default UserOnboarding;
