
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { 
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  FileEdit,
  Save,
  Key,
  Image,
  CreditCard,
  Activity,
  Briefcase,
  UserPlus,
  Settings
} from "lucide-react";

import PageLayout from "@/components/layout/PageLayout";
import { SectionTitle } from "@/components/ui/section-title";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link } from "react-router-dom";

// Form schemas
const personalInfoSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  dateOfBirth: z.string().optional(),
  address: z.string().min(5, "Please provide your address"),
  city: z.string().min(2, "Please provide your city"),
  state: z.string().min(2, "Please provide your state/province"),
  zipCode: z.string().min(4, "Please provide your postal/zip code"),
  country: z.string().min(2, "Please provide your country"),
  emergencyContact: z.string().optional(),
  occupation: z.string().optional(),
  preferredLanguage: z.string().optional(),
  communicationPreference: z.string().optional(),
  bio: z.string().optional(),
});

const medicalInfoSchema = z.object({
  medicalConditions: z.string().optional(),
  allergies: z.string().optional(),
  medications: z.string().optional(),
  insuranceProvider: z.string().optional(),
  insuranceNumber: z.string().optional(),
  primaryPhysician: z.string().optional(),
  bloodType: z.string().optional(),
  height: z.string().optional(),
  weight: z.string().optional(),
  exerciseFrequency: z.string().optional(),
});

// Professional info for doctors only
const professionalInfoSchema = z.object({
  specialization: z.string().min(2, "Please select a specialization"),
  qualifications: z.string().min(5, "Please provide your qualifications"),
  yearsExperience: z.string().min(1, "Please enter years of experience"),
  clinic: z.string().min(2, "Please enter your clinic name"),
  languages: z.string().min(2, "Please list languages you speak"),
  licensureNumber: z.string().optional(),
  professionalBio: z.string().optional(),
  consultationFees: z.string().optional(),
  availability: z.string().optional(),
});

type PersonalInfoValues = z.infer<typeof personalInfoSchema>;
type MedicalInfoValues = z.infer<typeof medicalInfoSchema>;
type ProfessionalInfoValues = z.infer<typeof professionalInfoSchema>;

const Profile = () => {
  const [isDoctor, setIsDoctor] = useState(false); // Toggle for profile type
  const [isPersonalInfoSubmitting, setIsPersonalInfoSubmitting] = useState(false);
  const [isMedicalInfoSubmitting, setIsMedicalInfoSubmitting] = useState(false);
  const [isProfessionalInfoSubmitting, setIsProfessionalInfoSubmitting] = useState(false);
  
  const navigate = useNavigate();

  // Personal info form
  const personalInfoForm = useForm<PersonalInfoValues>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      fullName: "John Doe",
      email: "john.doe@example.com",
      phone: "(555) 123-4567",
      dateOfBirth: "1985-05-15",
      address: "123 Main St, Anytown, CA 90210",
      city: "Anytown",
      state: "California",
      zipCode: "90210",
      country: "United States",
      occupation: "Software Engineer",
      preferredLanguage: "English",
      communicationPreference: "Email",
      emergencyContact: "Jane Doe, (555) 987-6543, Spouse",
      bio: "I enjoy hiking and playing tennis. I'm currently recovering from a knee injury.",
    }
  });

  // Medical info form (for patients)
  const medicalInfoForm = useForm<MedicalInfoValues>({
    resolver: zodResolver(medicalInfoSchema),
    defaultValues: {
      medicalConditions: "Mild hypertension, Knee injury (ACL tear, recovering)",
      allergies: "Penicillin, Shellfish",
      medications: "Lisinopril 10mg daily",
      insuranceProvider: "Blue Cross Blue Shield",
      insuranceNumber: "BCB12345678",
      primaryPhysician: "Dr. Sarah Johnson",
      bloodType: "O+",
      height: "5'10\" / 178 cm",
      weight: "165 lbs / 75 kg",
      exerciseFrequency: "2-3 times per week",
    }
  });

  // Professional info form (for doctors)
  const professionalInfoForm = useForm<ProfessionalInfoValues>({
    resolver: zodResolver(professionalInfoSchema),
    defaultValues: {
      specialization: "Sports Rehabilitation",
      qualifications: "DPT, OCS, CSCS",
      yearsExperience: "12",
      clinic: "Vitality Physio Main Clinic",
      languages: "English, Spanish",
      licensureNumber: "PT12345",
      professionalBio: "Specialized in sports injuries with over a decade of experience working with professional athletes.",
      consultationFees: "$150 per session",
      availability: "Mon-Fri, 9:00 AM - 5:00 PM"
    }
  });

  const onPersonalInfoSubmit = async (data: PersonalInfoValues) => {
    setIsPersonalInfoSubmitting(true);
    try {
      // In a real app, this would be an API call to update user profile
      console.log("Personal info update:", data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      toast.success("Personal information updated successfully!");
    } catch (error) {
      console.error("Update error:", error);
      toast.error("There was a problem updating your information.");
    } finally {
      setIsPersonalInfoSubmitting(false);
    }
  };

  const onMedicalInfoSubmit = async (data: MedicalInfoValues) => {
    setIsMedicalInfoSubmitting(true);
    try {
      // In a real app, this would be an API call
      console.log("Medical info update:", data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      toast.success("Medical information updated successfully!");
    } catch (error) {
      console.error("Update error:", error);
      toast.error("There was a problem updating your medical information.");
    } finally {
      setIsMedicalInfoSubmitting(false);
    }
  };

  const onProfessionalInfoSubmit = async (data: ProfessionalInfoValues) => {
    setIsProfessionalInfoSubmitting(true);
    try {
      // In a real app, this would be an API call
      console.log("Professional info update:", data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      toast.success("Professional information updated successfully!");
    } catch (error) {
      console.error("Update error:", error);
      toast.error("There was a problem updating your professional information.");
    } finally {
      setIsProfessionalInfoSubmitting(false);
    }
  };

  const toggleProfileType = () => {
    setIsDoctor(!isDoctor);
  };

  // Quick links for the sidebar
  const quickLinks = isDoctor ? [
    { icon: <Calendar className="mr-2 h-4 w-4" />, label: "Appointments", url: "/booking" },
    { icon: <UserPlus className="mr-2 h-4 w-4" />, label: "My Patients", url: "/patients" },
    { icon: <Activity className="mr-2 h-4 w-4" />, label: "Patient Analytics", url: "/patients" },
    { icon: <CreditCard className="mr-2 h-4 w-4" />, label: "Billing", url: "/pricing" },
    { icon: <Settings className="mr-2 h-4 w-4" />, label: "Account Settings", url: "#" }
  ] : [
    { icon: <Calendar className="mr-2 h-4 w-4" />, label: "My Appointments", url: "/booking" },
    { icon: <Activity className="mr-2 h-4 w-4" />, label: "Pain Tracker", url: "/pain-tracker" },
    { icon: <Briefcase className="mr-2 h-4 w-4" />, label: "My Exercises", url: "/video-library" },
    { icon: <CreditCard className="mr-2 h-4 w-4" />, label: "Billing", url: "/pricing" },
    { icon: <Settings className="mr-2 h-4 w-4" />, label: "Account Settings", url: "#" }
  ];

  return (
    <PageLayout className="py-10 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="flex justify-between items-center mb-6">
          <SectionTitle 
            title={isDoctor ? "Doctor Profile" : "Patient Profile"} 
            subtitle="Manage your personal information and preferences."
          />
          
          <Button 
            variant="outline" 
            onClick={toggleProfileType}
            className="hidden md:flex"
          >
            Switch to {isDoctor ? "Patient" : "Doctor"} View
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar - Profile Summary */}
          <div className="md:col-span-1">
            <Card className="shadow-md">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src="/placeholder.svg" alt="Profile picture" />
                    <AvatarFallback>
                      {isDoctor ? "DR" : "JD"}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="text-xl font-bold">
                    {isDoctor ? "Dr. John Smith" : "John Doe"}
                  </h3>
                  <p className="text-gray-500 text-sm">
                    {isDoctor ? "Physiotherapist" : "Patient"}
                  </p>
                  
                  <Button variant="outline" size="sm" className="mt-4 w-full">
                    <Image size={16} className="mr-2" />
                    Change Photo
                  </Button>
                </div>

                <div className="mt-6 space-y-3">
                  <div className="flex items-center text-sm">
                    <Mail size={16} className="mr-2 text-gray-500" />
                    <span className="text-gray-700 dark:text-gray-300 truncate">
                      {isDoctor ? "dr.john@example.com" : "john.doe@example.com"}
                    </span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Phone size={16} className="mr-2 text-gray-500" />
                    <span className="text-gray-700 dark:text-gray-300">
                      (555) 123-4567
                    </span>
                  </div>
                  {isDoctor ? (
                    <div className="flex items-center text-sm">
                      <MapPin size={16} className="mr-2 text-gray-500" />
                      <span className="text-gray-700 dark:text-gray-300 truncate">
                        Vitality Main Clinic
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center text-sm">
                      <Calendar size={16} className="mr-2 text-gray-500" />
                      <span className="text-gray-700 dark:text-gray-300">
                        Next Appointment: May 15, 2025
                      </span>
                    </div>
                  )}
                </div>

                <div className="mt-6">
                  <Button className="w-full md:hidden" onClick={toggleProfileType}>
                    Switch to {isDoctor ? "Patient" : "Doctor"} View
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick links sidebar card */}
            <Card className="shadow-md mt-4">
              <CardContent className="pt-6">
                <h3 className="font-medium mb-3">Quick Links</h3>
                <div className="space-y-2">
                  {quickLinks.map((link, index) => (
                    <Button 
                      key={index}
                      variant="ghost" 
                      className="w-full justify-start text-sm"
                      asChild
                    >
                      <Link to={link.url} className="flex items-center">
                        {link.icon}
                        {link.label}
                      </Link>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3">
            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="personal">Personal Info</TabsTrigger>
                {isDoctor ? (
                  <TabsTrigger value="professional">Professional Info</TabsTrigger>
                ) : (
                  <TabsTrigger value="medical">Medical Info</TabsTrigger>
                )}
                <TabsTrigger value="security">Security</TabsTrigger>
              </TabsList>

              {/* Personal Information Tab */}
              <TabsContent value="personal">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>
                      Update your personal details and contact information.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...personalInfoForm}>
                      <form onSubmit={personalInfoForm.handleSubmit(onPersonalInfoSubmit)} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={personalInfoForm.control}
                            name="fullName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Full Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="Your full name" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={personalInfoForm.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                  <Input type="email" placeholder="Your email address" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={personalInfoForm.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Phone Number</FormLabel>
                                <FormControl>
                                  <Input placeholder="Your phone number" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={personalInfoForm.control}
                            name="dateOfBirth"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Date of Birth</FormLabel>
                                <FormControl>
                                  <Input type="date" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={personalInfoForm.control}
                            name="occupation"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Occupation</FormLabel>
                                <FormControl>
                                  <Input placeholder="Your occupation" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={personalInfoForm.control}
                            name="preferredLanguage"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Preferred Language</FormLabel>
                                <Select 
                                  onValueChange={field.onChange} 
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select language" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="English">English</SelectItem>
                                    <SelectItem value="Spanish">Spanish</SelectItem>
                                    <SelectItem value="French">French</SelectItem>
                                    <SelectItem value="Chinese">Chinese</SelectItem>
                                    <SelectItem value="Hindi">Hindi</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={personalInfoForm.control}
                            name="communicationPreference"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Communication Preference</FormLabel>
                                <Select 
                                  onValueChange={field.onChange} 
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select preference" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="Email">Email</SelectItem>
                                    <SelectItem value="Phone">Phone</SelectItem>
                                    <SelectItem value="SMS">SMS</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <h3 className="font-medium text-lg mt-6 mb-3">Address Information</h3>
                        
                        <FormField
                          control={personalInfoForm.control}
                          name="address"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Street Address</FormLabel>
                              <FormControl>
                                <Input placeholder="Street address" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={personalInfoForm.control}
                            name="city"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>City</FormLabel>
                                <FormControl>
                                  <Input placeholder="Your city" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={personalInfoForm.control}
                            name="state"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>State/Province</FormLabel>
                                <FormControl>
                                  <Input placeholder="Your state or province" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={personalInfoForm.control}
                            name="zipCode"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Postal/ZIP Code</FormLabel>
                                <FormControl>
                                  <Input placeholder="Your postal/ZIP code" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={personalInfoForm.control}
                            name="country"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Country</FormLabel>
                                <FormControl>
                                  <Input placeholder="Your country" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={personalInfoForm.control}
                          name="emergencyContact"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Emergency Contact</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Name, Phone number, Relationship" 
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={personalInfoForm.control}
                          name="bio"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Bio / Additional Information</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Tell us a little about yourself"
                                  className="min-h-24"
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="flex justify-end">
                          <Button 
                            type="submit"
                            disabled={isPersonalInfoSubmitting}
                          >
                            {isPersonalInfoSubmitting ? (
                              "Saving..."
                            ) : (
                              <>
                                <Save size={16} className="mr-2" />
                                Save Changes
                              </>
                            )}
                          </Button>
                        </div>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Medical Information Tab (for patients) */}
              {!isDoctor && (
                <TabsContent value="medical">
                  <Card>
                    <CardHeader>
                      <CardTitle>Medical Information</CardTitle>
                      <CardDescription>
                        Manage your medical details for better care coordination.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Form {...medicalInfoForm}>
                        <form onSubmit={medicalInfoForm.handleSubmit(onMedicalInfoSubmit)} className="space-y-4">
                          <Alert className="mb-6">
                            <AlertDescription>
                              This information is securely stored and only shared with your healthcare providers.
                            </AlertDescription>
                          </Alert>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                              control={medicalInfoForm.control}
                              name="bloodType"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Blood Type</FormLabel>
                                  <Select 
                                    onValueChange={field.onChange} 
                                    defaultValue={field.value}
                                  >
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select blood type" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="A+">A+</SelectItem>
                                      <SelectItem value="A-">A-</SelectItem>
                                      <SelectItem value="B+">B+</SelectItem>
                                      <SelectItem value="B-">B-</SelectItem>
                                      <SelectItem value="AB+">AB+</SelectItem>
                                      <SelectItem value="AB-">AB-</SelectItem>
                                      <SelectItem value="O+">O+</SelectItem>
                                      <SelectItem value="O-">O-</SelectItem>
                                      <SelectItem value="Unknown">Unknown</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={medicalInfoForm.control}
                              name="height"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Height</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Your height (e.g., 5'10&quot; or 178 cm)" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={medicalInfoForm.control}
                              name="weight"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Weight</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Your weight (e.g., 165 lbs or 75 kg)" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={medicalInfoForm.control}
                              name="exerciseFrequency"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Exercise Frequency</FormLabel>
                                  <Select 
                                    onValueChange={field.onChange} 
                                    defaultValue={field.value}
                                  >
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select frequency" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="None">None</SelectItem>
                                      <SelectItem value="1 time per week">1 time per week</SelectItem>
                                      <SelectItem value="2-3 times per week">2-3 times per week</SelectItem>
                                      <SelectItem value="4-5 times per week">4-5 times per week</SelectItem>
                                      <SelectItem value="Daily">Daily</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <FormField
                            control={medicalInfoForm.control}
                            name="medicalConditions"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Medical Conditions</FormLabel>
                                <FormControl>
                                  <Textarea 
                                    placeholder="List any medical conditions, injuries, or surgeries"
                                    className="min-h-20"
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={medicalInfoForm.control}
                            name="allergies"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Allergies</FormLabel>
                                <FormControl>
                                  <Textarea 
                                    placeholder="List any allergies you have"
                                    className="min-h-20"
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={medicalInfoForm.control}
                            name="medications"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Current Medications</FormLabel>
                                <FormControl>
                                  <Textarea 
                                    placeholder="List any medications you're currently taking"
                                    className="min-h-20"
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                              control={medicalInfoForm.control}
                              name="insuranceProvider"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Insurance Provider</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Your insurance company" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={medicalInfoForm.control}
                              name="insuranceNumber"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Insurance ID/Policy Number</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Your insurance ID" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={medicalInfoForm.control}
                              name="primaryPhysician"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Primary Physician</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Your doctor's name" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <div className="flex justify-end">
                            <Button 
                              type="submit"
                              disabled={isMedicalInfoSubmitting}
                            >
                              {isMedicalInfoSubmitting ? (
                                "Saving..."
                              ) : (
                                <>
                                  <Save size={16} className="mr-2" />
                                  Save Medical Information
                                </>
                              )}
                            </Button>
                          </div>
                        </form>
                      </Form>
                    </CardContent>
                  </Card>
                </TabsContent>
              )}

              {/* Professional Information Tab (for doctors) */}
              {isDoctor && (
                <TabsContent value="professional">
                  <Card>
                    <CardHeader>
                      <CardTitle>Professional Information</CardTitle>
                      <CardDescription>
                        Update your professional details and practice information.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Form {...professionalInfoForm}>
                        <form onSubmit={professionalInfoForm.handleSubmit(onProfessionalInfoSubmit)} className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                              control={professionalInfoForm.control}
                              name="specialization"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Specialization</FormLabel>
                                  <Select 
                                    onValueChange={field.onChange} 
                                    defaultValue={field.value}
                                  >
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select specialization" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="Sports Rehabilitation">Sports Rehabilitation</SelectItem>
                                      <SelectItem value="Manual Therapy">Manual Therapy</SelectItem>
                                      <SelectItem value="Post-Surgical Rehabilitation">Post-Surgical Rehabilitation</SelectItem>
                                      <SelectItem value="Chronic Pain Management">Chronic Pain Management</SelectItem>
                                      <SelectItem value="Neurological Rehabilitation">Neurological Rehabilitation</SelectItem>
                                      <SelectItem value="Strength & Conditioning">Strength & Conditioning</SelectItem>
                                      <SelectItem value="Geriatric Physical Therapy">Geriatric Physical Therapy</SelectItem>
                                      <SelectItem value="Pediatric Physical Therapy">Pediatric Physical Therapy</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={professionalInfoForm.control}
                              name="qualifications"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Qualifications</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Your degrees and certifications" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={professionalInfoForm.control}
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
                              control={professionalInfoForm.control}
                              name="clinic"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Clinic/Hospital</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Your practice location" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={professionalInfoForm.control}
                              name="languages"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Languages Spoken</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Languages you speak" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={professionalInfoForm.control}
                              name="licensureNumber"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Professional License Number</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Your license number" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={professionalInfoForm.control}
                              name="consultationFees"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Consultation Fees</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Your standard fees" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <FormField
                            control={professionalInfoForm.control}
                            name="professionalBio"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Professional Bio</FormLabel>
                                <FormControl>
                                  <Textarea 
                                    placeholder="Share your professional background and expertise"
                                    className="min-h-24"
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={professionalInfoForm.control}
                            name="availability"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Availability</FormLabel>
                                <FormControl>
                                  <Textarea 
                                    placeholder="Your working hours and days"
                                    className="min-h-20"
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <div className="flex justify-end">
                            <Button 
                              type="submit"
                              disabled={isProfessionalInfoSubmitting}
                            >
                              {isProfessionalInfoSubmitting ? (
                                "Saving..."
                              ) : (
                                <>
                                  <Save size={16} className="mr-2" />
                                  Save Professional Information
                                </>
                              )}
                            </Button>
                          </div>
                        </form>
                      </Form>
                    </CardContent>
                  </Card>
                </TabsContent>
              )}

              {/* Security Tab */}
              <TabsContent value="security">
                <Card>
                  <CardHeader>
                    <CardTitle>Security Settings</CardTitle>
                    <CardDescription>
                      Manage your account security and privacy preferences.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <h3 className="text-lg font-medium">Change Password</h3>
                        <div className="grid grid-cols-1 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-1">Current Password</label>
                            <Input type="password" placeholder="Enter your current password" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1">New Password</label>
                            <Input type="password" placeholder="Enter your new password" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1">Confirm New Password</label>
                            <Input type="password" placeholder="Confirm your new password" />
                          </div>
                        </div>
                        <div className="mt-4">
                          <Button>
                            <Key size={16} className="mr-2" />
                            Update Password
                          </Button>
                        </div>
                      </div>

                      <div className="pt-6 border-t">
                        <h3 className="text-lg font-medium mb-2">Two-Factor Authentication</h3>
                        <p className="text-sm text-gray-500 mb-4 dark:text-gray-400">
                          Add an extra layer of security to your account by enabling two-factor authentication.
                        </p>
                        <Button variant="outline">
                          Enable Two-Factor Authentication
                        </Button>
                      </div>

                      <div className="pt-6 border-t">
                        <h3 className="text-lg font-medium mb-2">Delete Account</h3>
                        <p className="text-sm text-gray-500 mb-4 dark:text-gray-400">
                          Permanently delete your account and all associated data. This action cannot be undone.
                        </p>
                        <Button variant="destructive">
                          Delete Account
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Profile;
