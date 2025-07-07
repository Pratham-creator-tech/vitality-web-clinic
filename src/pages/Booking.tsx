import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import { SectionTitle } from "@/components/ui/section-title";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon, Clock, MapPin, Phone, Mail, ArrowRight, CheckCircle, Video, UserPlus, AlertCircle } from "lucide-react";
import { format, isToday, isBefore, startOfDay, addDays } from "date-fns";
import { useToast } from "@/components/ui/use-toast";
import { generateMeetingId, generateMeetingLink } from "@/utils/meetingUtils";
import { setMeetingHost } from "@/components/meeting/VideoCall";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";

const services = [
  "Sports Rehabilitation",
  "Manual Therapy", 
  "Post-Surgical Rehabilitation",
  "Chronic Pain Management",
  "Neurological Rehabilitation",
  "Strength & Conditioning"
];

const timeSlots = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM"
];

const Booking = () => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();
  const { user, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    timeSlot: "",
    isNewPatient: false,
    message: ""
  });

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    // Required field validation
    if (!formData.name.trim()) {
      errors.name = "Full name is required";
    } else if (formData.name.trim().length < 2) {
      errors.name = "Name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      errors.email = "Email address is required";
    } else if (!validateEmail(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (!validatePhone(formData.phone)) {
      errors.phone = "Please enter a valid phone number";
    }

    if (!formData.service) {
      errors.service = "Please select a service";
    }

    if (!formData.timeSlot) {
      errors.timeSlot = "Please select a time slot";
    }

    if (!date) {
      errors.date = "Please select an appointment date";
    } else if (isBefore(date, startOfDay(new Date()))) {
      errors.date = "Please select a future date";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear specific field error on change
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear specific field error on change
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, isNewPatient: checked }));
  };

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    
    // Clear date error on change
    if (formErrors.date) {
      setFormErrors(prev => ({ ...prev, date: "" }));
    }
  };

  const handleRegisterRedirect = () => {
    navigate("/signup");
  };

  const checkExistingAppointment = async (userId: string, appointmentDate: Date, timeSlot: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase
        .from('meeting_details')
        .select('id')
        .eq('patient_id', userId)
        .eq('appointment_date', appointmentDate.toISOString())
        .eq('time_slot', timeSlot)
        .eq('status', 'scheduled');

      if (error) {
        console.error("Error checking existing appointments:", error);
        return false;
      }

      return data && data.length > 0;
    } catch (error) {
      console.error("Error in checkExistingAppointment:", error);
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formStatus === "submitting") {
      return;
    }

    if (!user) {
      toast({
        title: "Registration Required",
        description: "Please register or sign in first to book an appointment.",
        variant: "destructive",
      });
      return;
    }

    if (!validateForm()) {
      toast({
        title: "Please fix the errors below",
        description: "All required fields must be filled correctly.",
        variant: "destructive",
      });
      return;
    }
    
    setFormStatus("submitting");
    
    try {
      const hasExistingAppointment = await checkExistingAppointment(user.id, date!, formData.timeSlot);
      
      if (hasExistingAppointment) {
        toast({
          title: "Appointment Conflict",
          description: "You already have an appointment scheduled for this date and time.",
          variant: "destructive",
        });
        setFormStatus("error");
        return;
      }

      const meetingId = generateMeetingId();
      const meetingLink = generateMeetingLink(meetingId);
      
      setMeetingHost(meetingId, formData.name);
      
      const meetingData = {
        patient_id: user.id,
        meeting_id: meetingId,
        meeting_link: meetingLink,
        patient_name: formData.name.trim(),
        patient_email: formData.email.trim().toLowerCase(),
        patient_phone: formData.phone.trim(),
        service: formData.service,
        therapist: "Available Therapist",
        appointment_date: date!.toISOString(),
        time_slot: formData.timeSlot,
        is_new_patient: formData.isNewPatient,
        message: formData.message.trim() || null,
        is_host: true,
        status: 'scheduled'
      };

      const { error: supabaseError } = await supabase
        .from('meeting_details')
        .insert(meetingData);

      if (supabaseError) {
        console.error("Supabase error:", supabaseError);
        
        if (supabaseError.code === '23505') {
          toast({
            title: "Booking Error",
            description: "This appointment slot may already be taken. Please try a different time.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Booking Failed",
            description: "Failed to save appointment details. Please try again.",
            variant: "destructive",
          });
        }
        
        setFormStatus("error");
        return;
      }
      
      setFormStatus("success");
      
      toast({
        title: "Booking Confirmed!",
        description: "Your appointment has been successfully booked.",
      });
      
      setFormData({
        name: "",
        email: "",
        phone: "",
        service: "",
        timeSlot: "",
        isNewPatient: false,
        message: ""
      });
      setDate(undefined);
      setFormErrors({});
      
    } catch (error) {
      console.error("Booking error:", error);
      setFormStatus("error");
      toast({
        title: "Booking Failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Loading state
  if (authLoading) {
    return (
      <PageLayout>
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-vitality-600"></div>
            </div>
          </div>
        </section>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-vitality-50 to-blue-50 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 font-display text-vitality-700">
              Book Your Appointment
            </h1>
            <p className="text-lg text-gray-700 mb-6">
              Quick and easy booking in just a few steps. Your meeting details will be sent via email.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>Secure Video Calls</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>Expert Physiotherapists</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>Flexible Scheduling</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Authentication Check Banner */}
      {!user && (
        <section className="bg-blue-50 border-b border-blue-200 py-3">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between bg-blue-100 rounded-lg p-4 max-w-4xl mx-auto">
              <div className="flex items-center gap-3">
                <UserPlus className="h-6 w-6 text-blue-600" />
                <div>
                  <h3 className="font-semibold text-blue-900">Quick Registration Required</h3>
                  <p className="text-sm text-blue-700">Create your account in seconds to book appointments</p>
                </div>
              </div>
              <Button onClick={handleRegisterRedirect} className="bg-blue-600 hover:bg-blue-700">
                Sign Up Now
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Booking Form Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="lg:col-span-2">
              {formStatus === "success" ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
                  <div className="mb-4 mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold mb-4 text-gray-800">Booking Confirmed!</h2>
                  <p className="text-gray-600 mb-6">
                    Thank you for scheduling your appointment with Yasha Physiocare. 
                    Your appointment details have been saved successfully.
                  </p>
                  
                  <div className="bg-white border border-green-200 rounded-lg p-6 mb-6">
                    <div className="flex items-center justify-center gap-2 mb-3">
                      <Video className="h-5 w-5 text-vitality-600" />
                      <h3 className="text-lg font-semibold text-vitality-700">What's Next?</h3>
                    </div>
                    <div className="text-sm text-gray-600 space-y-2">
                      <p>✓ Your appointment is confirmed and saved</p>
                      <p>✓ You will be the meeting host</p>
                      <p>✓ Our therapist will join at the scheduled time</p>
                      <p>✓ Meeting details are stored in your account</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 justify-center">
                    <Button
                      onClick={() => setFormStatus("idle")}
                      className="bg-vitality-600 hover:bg-vitality-700"
                    >
                      Book Another Appointment
                    </Button>
                    <Button variant="outline" asChild>
                      <Link to="/">Back to Home</Link>
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-vitality-700 mb-2">Schedule Your Visit</h2>
                    <p className="text-gray-600">Fill out the form below to book your appointment. All required fields are marked with *</p>
                  </div>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input 
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Enter your full name"
                          disabled={!user || formStatus === "submitting"}
                          required
                          className={cn(formErrors.name && "border-red-500")}
                        />
                        {formErrors.name && (
                          <p className="text-sm text-red-500 flex items-center gap-1">
                            <AlertCircle className="h-4 w-4" />
                            {formErrors.name}
                          </p>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input 
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="Enter your email"
                          disabled={!user || formStatus === "submitting"}
                          required
                          className={cn(formErrors.email && "border-red-500")}
                        />
                        {formErrors.email && (
                          <p className="text-sm text-red-500 flex items-center gap-1">
                            <AlertCircle className="h-4 w-4" />
                            {formErrors.email}
                          </p>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input 
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+1 (555) 123-4567"
                          disabled={!user || formStatus === "submitting"}
                          required
                          className={cn(formErrors.phone && "border-red-500")}
                        />
                        {formErrors.phone && (
                          <p className="text-sm text-red-500 flex items-center gap-1">
                            <AlertCircle className="h-4 w-4" />
                            {formErrors.phone}
                          </p>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="service">Service Required *</Label>
                        <Select 
                          onValueChange={(value) => handleSelectChange("service", value)}
                          value={formData.service}
                          disabled={!user || formStatus === "submitting"}
                          required
                        >
                          <SelectTrigger id="service" className={cn(formErrors.service && "border-red-500")}>
                            <SelectValue placeholder="Select a service" />
                          </SelectTrigger>
                          <SelectContent>
                            {services.map((service) => (
                              <SelectItem key={service} value={service}>
                                {service}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {formErrors.service && (
                          <p className="text-sm text-red-500 flex items-center gap-1">
                            <AlertCircle className="h-4 w-4" />
                            {formErrors.service}
                          </p>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Preferred Date *</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              disabled={!user || formStatus === "submitting"}
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !date && "text-muted-foreground",
                                formErrors.date && "border-red-500"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {date ? format(date, "PPP") : "Select a date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={date}
                              onSelect={handleDateSelect}
                              disabled={(date) => 
                                isBefore(date, startOfDay(new Date()))
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        {formErrors.date && (
                          <p className="text-sm text-red-500 flex items-center gap-1">
                            <AlertCircle className="h-4 w-4" />
                            {formErrors.date}
                          </p>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="timeSlot">Preferred Time *</Label>
                        <Select 
                          onValueChange={(value) => handleSelectChange("timeSlot", value)}
                          value={formData.timeSlot}
                          disabled={!user || formStatus === "submitting"}
                          required
                        >
                          <SelectTrigger id="timeSlot" className={cn(formErrors.timeSlot && "border-red-500")}>
                            <SelectValue placeholder="Select a time" />
                          </SelectTrigger>
                          <SelectContent>
                            {timeSlots.map((slot) => (
                              <SelectItem key={slot} value={slot}>
                                {slot}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {formErrors.timeSlot && (
                          <p className="text-sm text-red-500 flex items-center gap-1">
                            <AlertCircle className="h-4 w-4" />
                            {formErrors.timeSlot}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="isNewPatient" 
                        checked={formData.isNewPatient}
                        onCheckedChange={handleCheckboxChange}
                        disabled={!user || formStatus === "submitting"}
                      />
                      <Label htmlFor="isNewPatient">I am a new patient</Label>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="message">Additional Information (Optional)</Label>
                      <Textarea 
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Please share any specific concerns or information about your condition"
                        disabled={!user || formStatus === "submitting"}
                        rows={4}
                        className={cn(formErrors.message && "border-red-500")}
                      />
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">
                          {formData.message.length}/500 characters
                        </span>
                      </div>
                    </div>
                    
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <Video className="h-5 w-5 text-blue-600 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-blue-900">Virtual Consultation</h4>
                          <p className="text-sm text-blue-700 mt-1">
                            Your appointment details will be securely saved. You'll be the meeting host and can start the session.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-6 border-t border-gray-200">
                      <Button 
                        type="submit" 
                        className="w-full bg-vitality-600 hover:bg-vitality-700 text-white py-3 text-lg font-semibold"
                        disabled={formStatus === "submitting" || !user}
                      >
                        {formStatus === "submitting" ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                            Confirming Booking...
                          </>
                        ) : !user ? (
                          <>
                            <UserPlus className="mr-2 h-5 w-5" />
                            Please Register First
                          </>
                        ) : (
                          <>
                            Confirm Booking
                            <ArrowRight className="ml-2 h-5 w-5" />
                          </>
                        )}
                      </Button>
                      <p className="text-sm text-gray-500 mt-2 text-center">
                        {!user 
                          ? "Registration required to book appointments" 
                          : "* Required fields. Your appointment will be securely saved."
                        }
                      </p>
                    </div>
                  </form>
                </div>
              )}
            </div>
            
            {/* Sidebar */}
            <div>
              <div className="bg-gray-50 rounded-lg p-6 sticky top-24">
                <h3 className="text-xl font-bold mb-4 text-vitality-700">Quick Contact</h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-vitality-400 mr-3" />
                    <div>
                      <p className="font-medium text-gray-800">Call Us:</p>
                      <a href="tel:+1234567890" className="text-gray-600 hover:text-vitality-500">(123) 456-7890</a>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-vitality-400 mr-3" />
                    <div>
                      <p className="font-medium text-gray-800">Email:</p>
                      <a href="mailto:appointments@yashaphysiocare.com" className="text-gray-600 hover:text-vitality-500">appointments@yashaphysiocare.com</a>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-vitality-400 mr-3" />
                    <div>
                      <p className="font-medium text-gray-800">Hours:</p>
                      <p className="text-gray-600 text-sm">
                        Mon-Fri: 8 AM - 6 PM<br />
                        Sat: 9 AM - 2 PM
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-vitality-100 p-4 rounded-lg">
                  <h4 className="font-bold text-vitality-700 mb-2">Need Help?</h4>
                  <p className="text-gray-700 text-sm mb-3">
                    Call us for immediate assistance or technical support.
                  </p>
                  <Button variant="outline" className="w-full text-vitality-700 border-vitality-300" asChild>
                    <a href="tel:+1234567890">Call Now</a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Booking;
