
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { 
  Calendar as CalendarIcon,
  GraduationCap, 
  Award, 
  Clock,
  Plus,
  Trash2,
  Save,
  Languages,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { useToast } from "@/hooks/use-toast";

// Schema for education form
const educationSchema = z.object({
  institution: z.string().min(2, "Institution name is required"),
  degree: z.string().min(2, "Degree is required"),
  field: z.string().min(2, "Field of study is required"),
  startDate: z.date(),
  endDate: z.date().optional(),
});

// Schema for certification form
const certificationSchema = z.object({
  name: z.string().min(2, "Certification name is required"),
  issuer: z.string().min(2, "Issuing organization is required"),
  issueDate: z.date(),
  expiryDate: z.date().optional(),
});

// Schema for schedule form
const scheduleSchema = z.object({
  dayOfWeek: z.string().refine((val) => !isNaN(parseInt(val)) && parseInt(val) >= 0 && parseInt(val) <= 6, {
    message: "Day of week is required",
  }),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
});

// Main schema for complete form
const profileSchema = z.object({
  about: z.string().min(50, "Please provide a detailed bio (at least 50 characters)"),
  specialization: z.string().min(2, "Specialization is required"),
  experienceYears: z.string().refine((val) => !isNaN(parseInt(val)) && parseInt(val) > 0, {
    message: "Please enter a valid number of years",
  }),
  languages: z.string().min(2, "Languages spoken is required"),
  address: z.string().min(5, "Clinic address is required"),
});

const DoctorOnboarding = () => {
  const { user, userRole } = useAuth();
  const navigate = useNavigate();
  const { toast: uiToast } = useToast();
  
  const [educations, setEducations] = useState<any[]>([]);
  const [certifications, setCertifications] = useState<any[]>([]);
  const [schedules, setSchedules] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [doctor, setDoctor] = useState<any>(null);
  const [step, setStep] = useState(1);

  const educationForm = useForm<z.infer<typeof educationSchema>>({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      institution: "",
      degree: "",
      field: "",
      startDate: new Date(),
    },
  });

  const certificationForm = useForm<z.infer<typeof certificationSchema>>({
    resolver: zodResolver(certificationSchema),
    defaultValues: {
      name: "",
      issuer: "",
      issueDate: new Date(),
    },
  });

  const scheduleForm = useForm<z.infer<typeof scheduleSchema>>({
    resolver: zodResolver(scheduleSchema),
    defaultValues: {
      dayOfWeek: "0", // Sunday
      startTime: "09:00",
      endTime: "17:00",
    },
  });

  const profileForm = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      about: "",
      specialization: "",
      experienceYears: "",
      languages: "",
      address: "",
    },
  });

  useEffect(() => {
    if (!user) {
      navigate('/signin');
      return;
    }
    
    if (userRole !== 'doctor') {
      navigate('/');
      return;
    }
    
    // Fetch doctor profile
    const fetchDoctorProfile = async () => {
      try {
        const { data: doctorData, error: doctorError } = await supabase
          .from('doctors')
          .select('*')
          .eq('user_id', user.id)
          .single();
        
        if (doctorError) throw doctorError;
        if (doctorData) {
          setDoctor(doctorData);
          
          // Prefill the form if data exists
          if (doctorData.about) profileForm.setValue('about', doctorData.about);
          if (doctorData.specialization) profileForm.setValue('specialization', doctorData.specialization);
          if (doctorData.experience_years) profileForm.setValue('experienceYears', String(doctorData.experience_years));
          if (doctorData.languages) profileForm.setValue('languages', doctorData.languages.join(', '));
          if (doctorData.clinic_address) profileForm.setValue('address', doctorData.clinic_address);
          
          // Fetch education
          const { data: educationData, error: educationError } = await supabase
            .from('doctor_education')
            .select('*')
            .eq('doctor_id', doctorData.id);
          
          if (!educationError && educationData) {
            setEducations(educationData);
          }
          
          // Fetch certifications
          const { data: certData, error: certError } = await supabase
            .from('doctor_certifications')
            .select('*')
            .eq('doctor_id', doctorData.id);
          
          if (!certError && certData) {
            setCertifications(certData);
          }
          
          // Fetch schedules
          const { data: scheduleData, error: scheduleError } = await supabase
            .from('doctor_schedule')
            .select('*')
            .eq('doctor_id', doctorData.id);
          
          if (!scheduleError && scheduleData) {
            setSchedules(scheduleData);
          }
        }
      } catch (error) {
        console.error('Error fetching doctor profile:', error);
        uiToast({
          title: "Error",
          description: "Could not load your profile. Please try again.",
          variant: "destructive",
        });
      }
    };
    
    fetchDoctorProfile();
  }, [user, userRole, navigate, uiToast]);

  const handleAddEducation = async (data: z.infer<typeof educationSchema>) => {
    try {
      if (!doctor) return;
      
      const newEducation = {
        doctor_id: doctor.id,
        institution: data.institution,
        degree: data.degree,
        field_of_study: data.field,
        start_date: format(data.startDate, 'yyyy-MM-dd'),
        end_date: data.endDate ? format(data.endDate, 'yyyy-MM-dd') : null,
      };
      
      const { data: result, error } = await supabase
        .from('doctor_education')
        .insert(newEducation)
        .select();
      
      if (error) throw error;
      
      setEducations([...educations, result[0]]);
      educationForm.reset();
      toast.success("Education added successfully");
    } catch (error: any) {
      console.error('Error adding education:', error);
      toast.error("Failed to add education: " + error.message);
    }
  };

  const handleAddCertification = async (data: z.infer<typeof certificationSchema>) => {
    try {
      if (!doctor) return;
      
      const newCertification = {
        doctor_id: doctor.id,
        certification_name: data.name,
        issuing_organization: data.issuer,
        issue_date: format(data.issueDate, 'yyyy-MM-dd'),
        expiry_date: data.expiryDate ? format(data.expiryDate, 'yyyy-MM-dd') : null,
      };
      
      const { data: result, error } = await supabase
        .from('doctor_certifications')
        .insert(newCertification)
        .select();
      
      if (error) throw error;
      
      setCertifications([...certifications, result[0]]);
      certificationForm.reset();
      toast.success("Certification added successfully");
    } catch (error: any) {
      console.error('Error adding certification:', error);
      toast.error("Failed to add certification: " + error.message);
    }
  };

  const handleAddSchedule = async (data: z.infer<typeof scheduleSchema>) => {
    try {
      if (!doctor) return;
      
      const newSchedule = {
        doctor_id: doctor.id,
        day_of_week: parseInt(data.dayOfWeek),
        start_time: data.startTime,
        end_time: data.endTime,
        is_available: true,
      };
      
      const { data: result, error } = await supabase
        .from('doctor_schedule')
        .insert(newSchedule)
        .select();
      
      if (error) throw error;
      
      setSchedules([...schedules, result[0]]);
      scheduleForm.reset();
      toast.success("Schedule added successfully");
    } catch (error: any) {
      console.error('Error adding schedule:', error);
      toast.error("Failed to add schedule: " + error.message);
    }
  };

  const handleDeleteEducation = async (id: string) => {
    try {
      const { error } = await supabase
        .from('doctor_education')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      setEducations(educations.filter(edu => edu.id !== id));
      toast.success("Education entry deleted");
    } catch (error: any) {
      console.error('Error deleting education:', error);
      toast.error("Failed to delete education: " + error.message);
    }
  };

  const handleDeleteCertification = async (id: string) => {
    try {
      const { error } = await supabase
        .from('doctor_certifications')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      setCertifications(certifications.filter(cert => cert.id !== id));
      toast.success("Certification deleted");
    } catch (error: any) {
      console.error('Error deleting certification:', error);
      toast.error("Failed to delete certification: " + error.message);
    }
  };

  const handleDeleteSchedule = async (id: string) => {
    try {
      const { error } = await supabase
        .from('doctor_schedule')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      setSchedules(schedules.filter(schedule => schedule.id !== id));
      toast.success("Schedule entry deleted");
    } catch (error: any) {
      console.error('Error deleting schedule:', error);
      toast.error("Failed to delete schedule: " + error.message);
    }
  };

  const onSubmitProfile = async (data: z.infer<typeof profileSchema>) => {
    try {
      setIsSubmitting(true);
      
      if (!doctor) {
        throw new Error("Doctor profile not found");
      }
      
      // Parse languages from comma-separated string to array
      const languagesArray = data.languages.split(',').map(lang => lang.trim());
      
      // Update doctor profile
      const { error } = await supabase
        .from('doctors')
        .update({
          about: data.about,
          specialization: data.specialization,
          experience_years: parseInt(data.experienceYears),
          languages: languagesArray,
          clinic_address: data.address,
        })
        .eq('id', doctor.id);
      
      if (error) throw error;
      
      toast.success("Profile updated successfully");
      navigate('/profile');
    } catch (error: any) {
      console.error('Error updating profile:', error);
      toast.error("Failed to update profile: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getDayName = (day: number) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[day];
  };

  if (!user || !doctor) {
    return (
      <PageLayout>
        <div className="container mx-auto py-32 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-vitality-500"></div>
          <span className="ml-2">Loading...</span>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="container mx-auto py-10 px-4">
        <SectionTitle 
          title="Complete Your Doctor Profile" 
          subtitle="Please provide additional information to help patients learn more about you"
          center
        />
        
        <div className="flex justify-center mb-8 overflow-x-auto">
          <div className="flex space-x-2">
            <Button
              variant={step === 1 ? "default" : "outline"}
              onClick={() => setStep(1)}
              className={cn("flex-shrink-0", step === 1 && "bg-vitality-500 hover:bg-vitality-600")}
            >
              1. Basic Info
            </Button>
            <Button
              variant={step === 2 ? "default" : "outline"}
              onClick={() => setStep(2)}
              className={cn("flex-shrink-0", step === 2 && "bg-vitality-500 hover:bg-vitality-600")}
            >
              2. Education
            </Button>
            <Button
              variant={step === 3 ? "default" : "outline"}
              onClick={() => setStep(3)}
              className={cn("flex-shrink-0", step === 3 && "bg-vitality-500 hover:bg-vitality-600")}
            >
              3. Certifications
            </Button>
            <Button
              variant={step === 4 ? "default" : "outline"}
              onClick={() => setStep(4)}
              className={cn("flex-shrink-0", step === 4 && "bg-vitality-500 hover:bg-vitality-600")}
            >
              4. Schedule
            </Button>
          </div>
        </div>

        <Card className="max-w-4xl mx-auto shadow-md">
          {step === 1 && (
            <>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <GraduationCap className="mr-2 h-5 w-5" />
                  Professional Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...profileForm}>
                  <form onSubmit={profileForm.handleSubmit(onSubmitProfile)} className="space-y-6">
                    <FormField
                      control={profileForm.control}
                      name="specialization"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Specialization</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. Sports Rehabilitation, Pediatric Therapy" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={profileForm.control}
                      name="experienceYears"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Years of Experience</FormLabel>
                          <FormControl>
                            <Input type="number" min="0" placeholder="e.g. 5" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={profileForm.control}
                      name="languages"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Languages Spoken</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input placeholder="e.g. English, Spanish, Hindi (comma separated)" {...field} />
                              <Languages className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                            </div>
                          </FormControl>
                          <FormDescription>
                            List all languages you speak, separated by commas
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={profileForm.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Clinic/Practice Address</FormLabel>
                          <FormControl>
                            <Input placeholder="Full address including city and postal code" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={profileForm.control}
                      name="about"
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
                          <FormDescription>
                            Minimum 50 characters. This will be displayed on your public profile.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="flex justify-between pt-4">
                      <div></div>
                      <div className="flex space-x-2">
                        <Button 
                          type="submit" 
                          className="bg-vitality-500 hover:bg-vitality-600"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? "Saving..." : "Save Basic Info"}
                        </Button>
                        <Button 
                          type="button"
                          variant="outline"
                          onClick={() => setStep(2)}
                        >
                          Next: Education
                        </Button>
                      </div>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </>
          )}
          
          {step === 2 && (
            <>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <GraduationCap className="mr-2 h-5 w-5" />
                  Education
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-8">
                  <h3 className="text-lg font-medium mb-4">Your Education History</h3>
                  
                  {educations.length === 0 ? (
                    <div className="p-6 text-center border border-dashed rounded-md">
                      <p className="text-gray-500">No education entries yet. Add your educational background below.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {educations.map((edu) => (
                        <div key={edu.id} className="p-4 border rounded-md bg-gray-50 flex justify-between items-start">
                          <div>
                            <h4 className="font-bold">{edu.institution}</h4>
                            <p className="text-sm">{edu.degree} in {edu.field_of_study}</p>
                            <p className="text-sm text-gray-500">
                              {new Date(edu.start_date).getFullYear()} - {edu.end_date ? new Date(edu.end_date).getFullYear() : 'Present'}
                            </p>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleDeleteEducation(edu.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                <Separator className="my-6" />
                
                <Form {...educationForm}>
                  <form onSubmit={educationForm.handleSubmit(handleAddEducation)} className="space-y-4">
                    <h3 className="text-lg font-medium">Add Education</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={educationForm.control}
                        name="institution"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Institution</FormLabel>
                            <FormControl>
                              <Input placeholder="University/College name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={educationForm.control}
                        name="degree"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Degree</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. Bachelor's, Master's, PhD" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={educationForm.control}
                      name="field"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Field of Study</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. Physical Therapy, Sports Medicine" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={educationForm.control}
                        name="startDate"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Start Date</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={"outline"}
                                    className={cn(
                                      "w-full pl-3 text-left font-normal",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value ? (
                                      format(field.value, "PPP")
                                    ) : (
                                      <span>Pick a date</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) =>
                                    date > new Date()
                                  }
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={educationForm.control}
                        name="endDate"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>End Date (or leave blank for present)</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={"outline"}
                                    className={cn(
                                      "w-full pl-3 text-left font-normal",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value ? (
                                      format(field.value, "PPP")
                                    ) : (
                                      <span>Present / In Progress</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <Button type="submit" className="w-full mt-2">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Education
                    </Button>
                  </form>
                </Form>
                
                <div className="flex justify-between pt-6">
                  <Button 
                    type="button"
                    variant="outline"
                    onClick={() => setStep(1)}
                  >
                    Back: Basic Info
                  </Button>
                  <Button 
                    type="button"
                    onClick={() => setStep(3)}
                  >
                    Next: Certifications
                  </Button>
                </div>
              </CardContent>
            </>
          )}
          
          {step === 3 && (
            <>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="mr-2 h-5 w-5" />
                  Certifications & Licenses
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-8">
                  <h3 className="text-lg font-medium mb-4">Your Certifications & Licenses</h3>
                  
                  {certifications.length === 0 ? (
                    <div className="p-6 text-center border border-dashed rounded-md">
                      <p className="text-gray-500">No certifications yet. Add your professional certifications below.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {certifications.map((cert) => (
                        <div key={cert.id} className="p-4 border rounded-md bg-gray-50 flex justify-between items-start">
                          <div>
                            <h4 className="font-bold">{cert.certification_name}</h4>
                            <p className="text-sm">Issued by: {cert.issuing_organization}</p>
                            <p className="text-sm text-gray-500">
                              Issued: {new Date(cert.issue_date).toLocaleDateString()}
                              {cert.expiry_date && ` • Expires: ${new Date(cert.expiry_date).toLocaleDateString()}`}
                            </p>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleDeleteCertification(cert.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                <Separator className="my-6" />
                
                <Form {...certificationForm}>
                  <form onSubmit={certificationForm.handleSubmit(handleAddCertification)} className="space-y-4">
                    <h3 className="text-lg font-medium">Add Certification</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={certificationForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Certification Name</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. Certified Manual Therapist" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={certificationForm.control}
                        name="issuer"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Issuing Organization</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. American Physical Therapy Association" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={certificationForm.control}
                        name="issueDate"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Issue Date</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={"outline"}
                                    className={cn(
                                      "w-full pl-3 text-left font-normal",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value ? (
                                      format(field.value, "PPP")
                                    ) : (
                                      <span>Pick a date</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) =>
                                    date > new Date()
                                  }
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={certificationForm.control}
                        name="expiryDate"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Expiry Date (if applicable)</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={"outline"}
                                    className={cn(
                                      "w-full pl-3 text-left font-normal",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value ? (
                                      format(field.value, "PPP")
                                    ) : (
                                      <span>No expiration</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <Button type="submit" className="w-full mt-2">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Certification
                    </Button>
                  </form>
                </Form>
                
                <div className="flex justify-between pt-6">
                  <Button 
                    type="button"
                    variant="outline"
                    onClick={() => setStep(2)}
                  >
                    Back: Education
                  </Button>
                  <Button 
                    type="button"
                    onClick={() => setStep(4)}
                  >
                    Next: Schedule
                  </Button>
                </div>
              </CardContent>
            </>
          )}
          
          {step === 4 && (
            <>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="mr-2 h-5 w-5" />
                  Working Hours
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-8">
                  <h3 className="text-lg font-medium mb-4">Your Regular Schedule</h3>
                  
                  {schedules.length === 0 ? (
                    <div className="p-6 text-center border border-dashed rounded-md">
                      <p className="text-gray-500">No schedule entries yet. Add your working hours below.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {schedules.map((sch) => (
                        <div key={sch.id} className="p-4 border rounded-md bg-gray-50 flex justify-between items-start">
                          <div className="flex items-center">
                            <Badge variant={sch.is_available ? "default" : "outline"} className="mr-3 bg-vitality-400">
                              {getDayName(sch.day_of_week)}
                            </Badge>
                            <span>
                              {sch.start_time.substring(0, 5)} - {sch.end_time.substring(0, 5)}
                            </span>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleDeleteSchedule(sch.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                <Separator className="my-6" />
                
                <Form {...scheduleForm}>
                  <form onSubmit={scheduleForm.handleSubmit(handleAddSchedule)} className="space-y-4">
                    <h3 className="text-lg font-medium">Add Schedule</h3>
                    
                    <FormField
                      control={scheduleForm.control}
                      name="dayOfWeek"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Day of Week</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a day" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="0">Sunday</SelectItem>
                              <SelectItem value="1">Monday</SelectItem>
                              <SelectItem value="2">Tuesday</SelectItem>
                              <SelectItem value="3">Wednesday</SelectItem>
                              <SelectItem value="4">Thursday</SelectItem>
                              <SelectItem value="5">Friday</SelectItem>
                              <SelectItem value="6">Saturday</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={scheduleForm.control}
                        name="startTime"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Start Time</FormLabel>
                            <FormControl>
                              <Input type="time" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={scheduleForm.control}
                        name="endTime"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>End Time</FormLabel>
                            <FormControl>
                              <Input type="time" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <Button type="submit" className="w-full mt-2">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Schedule
                    </Button>
                  </form>
                </Form>
                
                <div className="flex justify-between pt-6">
                  <Button 
                    type="button"
                    variant="outline"
                    onClick={() => setStep(3)}
                  >
                    Back: Certifications
                  </Button>
                  <Button 
                    type="button"
                    onClick={() => navigate('/profile')}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Finish Setup
                  </Button>
                </div>
              </CardContent>
            </>
          )}
        </Card>
        
        <div className="text-center mt-8">
          <Button 
            variant="link" 
            onClick={() => navigate('/profile')}
            className="text-gray-500"
          >
            Skip for now (you can complete your profile later)
          </Button>
        </div>
      </div>
    </PageLayout>
  );
};

export default DoctorOnboarding;
