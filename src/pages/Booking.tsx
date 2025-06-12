import { useState } from "react";
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
import { CalendarIcon, Clock, MapPin, Phone, Mail, ArrowRight, CheckCircle, Video } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/components/ui/use-toast";
import { generateMeetingId, generateMeetingLink } from "@/utils/meetingUtils";
import { setMeetingHost } from "@/components/meeting/VideoCall";

const services = [
  "Sports Rehabilitation",
  "Manual Therapy",
  "Post-Surgical Rehabilitation",
  "Chronic Pain Management",
  "Neurological Rehabilitation",
  "Strength & Conditioning"
];

const therapists = [
  "Dr. Emily Chen",
  "Dr. Marcus Johnson",
  "Dr. Sarah Rodriguez",
  "No Preference"
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
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    therapist: "",
    timeSlot: "",
    isNewPatient: false,
    message: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, isNewPatient: checked }));
  };

  const isFormValid = () => {
    return formData.name.trim() !== "" && 
           formData.email.trim() !== "" && 
           formData.phone.trim() !== "" && 
           formData.service !== "" && 
           formData.therapist !== "" && 
           formData.timeSlot !== "" && 
           date !== undefined;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isFormValid()) {
      toast({
        title: "Please fill all required fields",
        description: "All fields except additional information are required.",
        variant: "destructive",
      });
      return;
    }
    
    setFormStatus("submitting");
    
    try {
      // Generate meeting details
      const meetingId = generateMeetingId();
      const meetingLink = generateMeetingLink(meetingId);
      
      // Set the person who books as the host
      setMeetingHost(meetingId, formData.name);
      
      const appointmentData = {
        ...formData,
        date: date?.toISOString(),
        meetingId,
        meetingLink,
        isHost: true,
        bookingTime: new Date().toISOString()
      };
      
      console.log("Booking form submitted:", appointmentData);
      
      // Here you would typically send emails to both doctor and patient
      // For now, we'll simulate the booking process
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setFormStatus("success");
      
      toast({
        title: "Booking Confirmed!",
        description: "Your appointment has been successfully booked. Check your email for meeting details.",
      });
      
      // Reset form after successful submission
      setFormData({
        name: "",
        email: "",
        phone: "",
        service: "",
        therapist: "",
        timeSlot: "",
        isNewPatient: false,
        message: ""
      });
      setDate(undefined);
      
    } catch (error) {
      console.error("Booking error:", error);
      setFormStatus("error");
      toast({
        title: "Booking Failed",
        description: "There was an error processing your booking. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="bg-vitality-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 font-display text-vitality-700">
              Book Your Appointment
            </h1>
            <p className="text-lg text-gray-700">
              Schedule a consultation with our expert physiotherapists. Meeting details will be sent to your email.
            </p>
          </div>
        </div>
      </section>

      {/* Booking Form Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              {formStatus === "success" ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
                  <div className="mb-4 mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold mb-4 text-gray-800">Booking Confirmed!</h2>
                  <p className="text-gray-600 mb-6">
                    Thank you for scheduling your appointment with Vitality Physiotherapy. 
                    We've sent confirmation emails with meeting details to both you and your assigned therapist.
                  </p>
                  
                  <div className="bg-vitality-50 border border-vitality-200 rounded-lg p-6 mb-6">
                    <div className="flex items-center justify-center gap-2 mb-3">
                      <Video className="h-5 w-5 text-vitality-600" />
                      <h3 className="text-lg font-semibold text-vitality-700">What's Next?</h3>
                    </div>
                    <div className="text-sm text-gray-600 space-y-2">
                      <p>✓ Check your email for the secure meeting link</p>
                      <p>✓ You will be the meeting host and can start the session</p>
                      <p>✓ Your therapist will join at the scheduled time</p>
                      <p>✓ Meeting details have been sent to your assigned therapist</p>
                    </div>
                  </div>
                  
                  <Button
                    variant="outline"
                    onClick={() => setFormStatus("idle")}
                    className="mt-4"
                  >
                    Book Another Appointment
                  </Button>
                </div>
              ) : (
                <>
                  <SectionTitle 
                    title="Schedule Your Visit" 
                    subtitle="Fill out the form below to request an appointment. Meeting details will be emailed to you and your therapist."
                  />
                  
                  <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input 
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Enter your full name"
                          required
                        />
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
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input 
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="Enter your phone number"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="service">Service Required *</Label>
                        <Select 
                          onValueChange={(value) => handleSelectChange("service", value)}
                          value={formData.service}
                          required
                        >
                          <SelectTrigger id="service">
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
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="therapist">Preferred Therapist *</Label>
                        <Select 
                          onValueChange={(value) => handleSelectChange("therapist", value)}
                          value={formData.therapist}
                          required
                        >
                          <SelectTrigger id="therapist">
                            <SelectValue placeholder="Select a therapist" />
                          </SelectTrigger>
                          <SelectContent>
                            {therapists.map((therapist) => (
                              <SelectItem key={therapist} value={therapist}>
                                {therapist}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Preferred Date *</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !date && "text-muted-foreground"
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
                              onSelect={setDate}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="timeSlot">Preferred Time *</Label>
                        <Select 
                          onValueChange={(value) => handleSelectChange("timeSlot", value)}
                          value={formData.timeSlot}
                          required
                        >
                          <SelectTrigger id="timeSlot">
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
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="isNewPatient" 
                        checked={formData.isNewPatient}
                        onCheckedChange={handleCheckboxChange}
                      />
                      <Label htmlFor="isNewPatient">I am a new patient</Label>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="message">Additional Information</Label>
                      <Textarea 
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Please share any specific concerns or information about your condition"
                        rows={4}
                      />
                    </div>
                    
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <Video className="h-5 w-5 text-blue-600 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-blue-900">Virtual Consultation via Email</h4>
                          <p className="text-sm text-blue-700 mt-1">
                            Meeting details will be sent to your email and your therapist's email. You'll receive a secure video link to join your appointment.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Confirm Booking Button */}
                    <div className="pt-6 border-t border-gray-200">
                      <Button 
                        type="submit" 
                        className="w-full bg-vitality-600 hover:bg-vitality-700 text-white py-3 text-lg font-semibold"
                        disabled={formStatus === "submitting" || !isFormValid()}
                      >
                        {formStatus === "submitting" ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                            Confirming Booking...
                          </>
                        ) : (
                          <>
                            Confirm Booking
                            <ArrowRight className="ml-2 h-5 w-5" />
                          </>
                        )}
                      </Button>
                      <p className="text-sm text-gray-500 mt-2 text-center">
                        * Required fields. Meeting details will be emailed to you and your therapist.
                      </p>
                    </div>
                  </form>
                </>
              )}
            </div>
            
            <div>
              <div className="bg-gray-50 rounded-lg p-6 sticky top-24">
                <h3 className="text-xl font-bold mb-4 text-vitality-700">Contact Information</h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-vitality-400 mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-800">Clinic Address:</p>
                      <address className="not-italic text-gray-600">
                        123 Healing Street<br />
                        Wellness City, WC 10001
                      </address>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-vitality-400 mr-3" />
                    <div>
                      <p className="font-medium text-gray-800">Phone:</p>
                      <a href="tel:+1234567890" className="text-gray-600 hover:text-vitality-500">(123) 456-7890</a>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-vitality-400 mr-3" />
                    <div>
                      <p className="font-medium text-gray-800">Email:</p>
                      <a href="mailto:appointments@vitalityphysio.com" className="text-gray-600 hover:text-vitality-500">appointments@vitalityphysio.com</a>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-vitality-400 mr-3" />
                    <div>
                      <p className="font-medium text-gray-800">Hours:</p>
                      <p className="text-gray-600">
                        Monday - Friday: 8:00 AM - 6:00 PM<br />
                        Saturday: 9:00 AM - 2:00 PM<br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Video className="h-5 w-5 text-vitality-400 mr-3" />
                    <div>
                      <p className="font-medium text-gray-800">Virtual Consultations:</p>
                      <p className="text-gray-600">
                        Secure video meetings via email<br />
                        HD quality with screen sharing
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-vitality-100 p-4 rounded">
                  <h4 className="font-bold text-vitality-700 mb-2">Need Immediate Assistance?</h4>
                  <p className="text-gray-700 text-sm mb-3">
                    For urgent appointments or technical support, please call our clinic directly.
                  </p>
                  <Button variant="outline" className="w-full text-vitality-700" asChild>
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
