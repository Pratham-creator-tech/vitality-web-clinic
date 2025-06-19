import { useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { SectionTitle } from "@/components/ui/section-title";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Phone, Mail, Clock, CheckCircle } from "lucide-react";

const inquiryTypes = [
  "General Inquiry",
  "Appointment Question",
  "Insurance & Billing",
  "Career Opportunities",
  "Feedback",
  "Other"
];

const Contact = () => {
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    inquiryType: "",
    message: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, inquiryType: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");
    
    // Simulate API call
    setTimeout(() => {
      console.log("Contact form submitted:", formData);
      setFormStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        inquiryType: "",
        message: ""
      });
    }, 1500);
  };

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-vitality-50 py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-100/30 to-vitality-100/30"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.15)_0%,transparent_50%)]"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center mb-6 bg-white rounded-full py-2 px-6 w-fit mx-auto shadow-sm border border-blue-100">
              <Mail className="h-5 w-5 text-blue-600 mr-3" />
              <span className="text-sm font-medium text-gray-700">We're Here to Help</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 font-display text-blue-900 leading-tight">
              Contact 
              <span className="text-blue-600 block">Our Team</span>
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Have questions or need assistance? We're here to help. Reach out to our friendly team through any of the methods below.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Details & Form Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Contact Information */}
            <div>
              <SectionTitle 
                title="Get In Touch" 
                subtitle="We're always happy to hear from you. Here's how you can reach us."
              />
              
              <div className="mt-8 space-y-8">
                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-xl mr-4">
                    <MapPin className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-blue-900 mb-1 font-display">Visit Us</h3>
                    <address className="not-italic text-gray-600 leading-relaxed">
                      123 Healing Street<br />
                      Wellness City, WC 10001<br />
                      United States
                    </address>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-xl mr-4">
                    <Phone className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-blue-900 mb-1 font-display">Call Us</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Main: <a href="tel:+1234567890" className="hover:text-blue-600 transition-colors">(123) 456-7890</a><br />
                      Urgent Care: <a href="tel:+1234567899" className="hover:text-blue-600 transition-colors">(123) 456-7899</a>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-xl mr-4">
                    <Mail className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-blue-900 mb-1 font-display">Email Us</h3>
                    <p className="text-gray-600 leading-relaxed">
                      General Inquiries: <a href="mailto:info@yashaphysiocare.com" className="hover:text-blue-600 transition-colors">info@yashaphysiocare.com</a><br />
                      Appointments: <a href="mailto:appointments@yashaphysiocare.com" className="hover:text-blue-600 transition-colors">appointments@yashaphysiocare.com</a>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-xl mr-4">
                    <Clock className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-blue-900 mb-1 font-display">Hours of Operation</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Monday - Friday: 8:00 AM - 6:00 PM<br />
                      Saturday: 9:00 AM - 2:00 PM<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Map */}
              <div className="mt-10 rounded-xl overflow-hidden shadow-lg border border-gray-100">
                <iframe 
                  title="Clinic Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.3059353029!2d-74.25986548248684!3d40.69714941932609!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sca!4v1619528911485!5m2!1sen!2sca" 
                  width="100%" 
                  height="300" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy"
                ></iframe>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="bg-gradient-to-br from-blue-50 to-vitality-50 p-8 rounded-xl shadow-lg border border-blue-100">
              {formStatus === "success" ? (
                <div className="text-center py-8">
                  <div className="mb-4 mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold mb-4 text-blue-900 font-display">Message Sent Successfully!</h2>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Thank you for contacting Yasha Physiocare. We've received your message and will get back to you shortly.
                  </p>
                  <Button onClick={() => setFormStatus("idle")} className="bg-blue-600 hover:bg-blue-700">
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold mb-6 text-blue-900 font-display">Send Us a Message</h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-3">
                      <Label htmlFor="name" className="text-blue-900 font-medium">Full Name</Label>
                      <Input 
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        className="border-blue-200 focus:border-blue-500"
                        required
                      />
                    </div>
                    
                    <div className="space-y-3">
                      <Label htmlFor="email" className="text-blue-900 font-medium">Email Address</Label>
                      <Input 
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                        className="border-blue-200 focus:border-blue-500"
                        required
                      />
                    </div>
                    
                    <div className="space-y-3">
                      <Label htmlFor="phone" className="text-blue-900 font-medium">Phone Number</Label>
                      <Input 
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Enter your phone number"
                        className="border-blue-200 focus:border-blue-500"
                      />
                    </div>
                    
                    <div className="space-y-3">
                      <Label htmlFor="inquiryType" className="text-blue-900 font-medium">Inquiry Type</Label>
                      <Select 
                        onValueChange={handleSelectChange}
                        value={formData.inquiryType}
                      >
                        <SelectTrigger id="inquiryType" className="border-blue-200">
                          <SelectValue placeholder="Select inquiry type" />
                        </SelectTrigger>
                        <SelectContent>
                          {inquiryTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-3">
                      <Label htmlFor="message" className="text-blue-900 font-medium">Message</Label>
                      <Textarea 
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="How can we help you?"
                        rows={5}
                        className="border-blue-200 focus:border-blue-500"
                        required
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
                      disabled={formStatus === "submitting"}
                    >
                      {formStatus === "submitting" ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Contact;
