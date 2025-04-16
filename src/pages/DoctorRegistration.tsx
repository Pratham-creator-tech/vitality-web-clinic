
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  UserPlus,
  Upload,
  Building,
  CreditCard,
  GraduationCap,
  Clock,
  MapPin,
  Languages,
  Phone,
  Mail,
  CheckCircle,
  Lock
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

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
  paymentCycle: z.enum(["monthly", "yearly"]),
  planType: z.enum(["basic", "professional", "enterprise"]),
  acceptTerms: z.boolean().refine(val => val === true, {
    message: "You must accept the terms and conditions"
  })
});

type DoctorFormValues = z.infer<typeof doctorFormSchema>;

const planDetails = {
  basic: {
    monthly: 29,
    yearly: 290,
    name: "Basic Membership"
  },
  professional: {
    monthly: 79,
    yearly: 790,
    name: "Professional Membership"
  },
  enterprise: {
    monthly: 199,
    yearly: 1990,
    name: "Enterprise Membership"
  }
};

const DoctorRegistration = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const planParam = queryParams.get('plan') as "basic" | "professional" | "enterprise" || "professional";
  
  const [selectedPlan, setSelectedPlan] = useState<"basic" | "professional" | "enterprise">(
    planParam && ["basic", "professional", "enterprise"].includes(planParam) 
      ? planParam 
      : "professional"
  );
  
  const [paymentCycle, setPaymentCycle] = useState<"monthly" | "yearly">("monthly");
  
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
      paymentCycle: "monthly",
      planType: selectedPlan,
      acceptTerms: false
    }
  });

  const onSubmit = async (data: DoctorFormValues) => {
    setIsSubmitting(true);
    try {
      // In a real app, this would be an API call to register the doctor
      console.log("Doctor registration data:", data);
      
      // Simulate API call and payment processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success("Registration initiated! Redirecting to payment...");
      // Here you would redirect to a payment page or process payment
      // For now we'll simulate a successful payment
      setTimeout(() => {
        navigate("/profile?registration=success");
      }, 1500);
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("There was a problem with your registration. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePlanChange = (value: "basic" | "professional" | "enterprise") => {
    setSelectedPlan(value);
    form.setValue("planType", value);
  };

  const handlePaymentCycleChange = (value: "monthly" | "yearly") => {
    setPaymentCycle(value);
    form.setValue("paymentCycle", value);
  };

  return (
    <PageLayout className="py-10 bg-gray-50">
      <div className="container mx-auto px-4 max-w-5xl">
        <SectionTitle 
          title="Join Our Medical Team" 
          subtitle="Register as a physiotherapist at Vitality Physio and help our patients on their journey to recovery."
          center
        />

        <div className="bg-white p-6 rounded-lg shadow-sm mb-8 mt-6">
          <div className="flex items-center space-x-2 text-vitality-600 mb-4">
            <Lock size={20} />
            <h3 className="text-lg font-medium">Membership Required</h3>
          </div>
          <p className="text-gray-600 mb-4">
            To join our network of physiotherapists and access our patient database, you'll need to select a subscription plan.
            Your subscription gives you access to our platform, patient listings, and booking tools.
          </p>
          <Link to="/pricing" className="text-vitality-500 hover:text-vitality-600 font-medium">
            View all plan details →
          </Link>
        </div>

        <Card className="shadow-md">
          <CardContent className="pt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-bold mb-4 text-vitality-700 flex items-center">
                      <CreditCard className="mr-2" size={20} />
                      Select Your Membership Plan
                    </h2>
                    
                    <div className="bg-gray-50 p-4 rounded-lg mb-4">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="font-medium">Billing Cycle</h3>
                        <div className="flex items-center space-x-4">
                          <button
                            type="button"
                            onClick={() => handlePaymentCycleChange("monthly")}
                            className={`px-4 py-2 rounded-full text-sm ${
                              paymentCycle === "monthly" 
                                ? "bg-vitality-100 text-vitality-700 font-medium" 
                                : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            Monthly
                          </button>
                          <button
                            type="button"
                            onClick={() => handlePaymentCycleChange("yearly")}
                            className={`px-4 py-2 rounded-full text-sm ${
                              paymentCycle === "yearly" 
                                ? "bg-vitality-100 text-vitality-700 font-medium" 
                                : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            Yearly <span className="text-xs font-medium text-vitality-400">(Save 20%)</span>
                          </button>
                        </div>
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="planType"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <RadioGroup 
                                onValueChange={(value) => handlePlanChange(value as "basic" | "professional" | "enterprise")}
                                defaultValue={selectedPlan}
                                className="grid grid-cols-1 md:grid-cols-3 gap-4"
                              >
                                <div className={`border rounded-lg p-4 ${selectedPlan === "basic" ? "border-vitality-400 bg-vitality-50" : "border-gray-200"}`}>
                                  <RadioGroupItem value="basic" id="basic" className="sr-only" />
                                  <label htmlFor="basic" className="flex flex-col cursor-pointer h-full">
                                    <div className="font-bold text-lg mb-1">Basic</div>
                                    <div className="text-gray-500 text-xs mb-2">For new practitioners</div>
                                    <div className="text-xl font-bold mb-4">${planDetails.basic[paymentCycle]}<span className="text-sm font-normal text-gray-500">/{paymentCycle}</span></div>
                                    <ul className="space-y-2 flex-grow mb-4">
                                      <li className="flex items-start text-sm">
                                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                                        <span>Limited patient listings</span>
                                      </li>
                                      <li className="flex items-start text-sm">
                                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                                        <span>Basic profile</span>
                                      </li>
                                      <li className="flex items-start text-sm">
                                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                                        <span>Email support</span>
                                      </li>
                                    </ul>
                                    {selectedPlan === "basic" && (
                                      <div className="text-sm font-medium text-vitality-600">Selected</div>
                                    )}
                                  </label>
                                </div>
                                
                                <div className={`border rounded-lg p-4 relative ${selectedPlan === "professional" ? "border-vitality-400 bg-vitality-50" : "border-gray-200"}`}>
                                  {selectedPlan !== "professional" && (
                                    <div className="absolute top-0 right-0 bg-vitality-400 text-white px-2 py-1 text-xs font-medium rounded-bl-lg rounded-tr-lg">
                                      Popular
                                    </div>
                                  )}
                                  <RadioGroupItem value="professional" id="professional" className="sr-only" />
                                  <label htmlFor="professional" className="flex flex-col cursor-pointer h-full">
                                    <div className="font-bold text-lg mb-1">Professional</div>
                                    <div className="text-gray-500 text-xs mb-2">For established practices</div>
                                    <div className="text-xl font-bold mb-4">${planDetails.professional[paymentCycle]}<span className="text-sm font-normal text-gray-500">/{paymentCycle}</span></div>
                                    <ul className="space-y-2 flex-grow mb-4">
                                      <li className="flex items-start text-sm">
                                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                                        <span>Unlimited patient listings</span>
                                      </li>
                                      <li className="flex items-start text-sm">
                                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                                        <span>Enhanced profile</span>
                                      </li>
                                      <li className="flex items-start text-sm">
                                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                                        <span>Priority support</span>
                                      </li>
                                      <li className="flex items-start text-sm">
                                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                                        <span>Advanced analytics</span>
                                      </li>
                                    </ul>
                                    {selectedPlan === "professional" && (
                                      <div className="text-sm font-medium text-vitality-600">Selected</div>
                                    )}
                                  </label>
                                </div>
                                
                                <div className={`border rounded-lg p-4 ${selectedPlan === "enterprise" ? "border-vitality-400 bg-vitality-50" : "border-gray-200"}`}>
                                  <RadioGroupItem value="enterprise" id="enterprise" className="sr-only" />
                                  <label htmlFor="enterprise" className="flex flex-col cursor-pointer h-full">
                                    <div className="font-bold text-lg mb-1">Enterprise</div>
                                    <div className="text-gray-500 text-xs mb-2">For clinics & organizations</div>
                                    <div className="text-xl font-bold mb-4">${planDetails.enterprise[paymentCycle]}<span className="text-sm font-normal text-gray-500">/{paymentCycle}</span></div>
                                    <ul className="space-y-2 flex-grow mb-4">
                                      <li className="flex items-start text-sm">
                                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                                        <span>Multi-practitioner accounts</span>
                                      </li>
                                      <li className="flex items-start text-sm">
                                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                                        <span>Custom branding</span>
                                      </li>
                                      <li className="flex items-start text-sm">
                                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                                        <span>Dedicated account manager</span>
                                      </li>
                                      <li className="flex items-start text-sm">
                                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                                        <span>API access</span>
                                      </li>
                                    </ul>
                                    {selectedPlan === "enterprise" && (
                                      <div className="text-sm font-medium text-vitality-600">Selected</div>
                                    )}
                                  </label>
                                </div>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="mt-4 text-sm text-gray-500">
                        <p>You'll be charged ${planDetails[selectedPlan][paymentCycle]} for your {paymentCycle} subscription to the {planDetails[selectedPlan].name} after registration.</p>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
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
                          By registering, you agree to our <Link to="/terms-of-service" className="text-vitality-400 hover:underline">Terms of Service</Link>, <Link to="/privacy-policy" className="text-vitality-400 hover:underline">Privacy Policy</Link>, and authorize us to charge your payment method for the selected plan.
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
                        <CreditCard className="mr-2" size={20} />
                        Complete Registration & Proceed to Payment
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
