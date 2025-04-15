
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
      <section className="bg-vitality-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 font-display text-vitality-700">
              Contact Us
            </h1>
            <p className="text-lg text-gray-700">
              Have questions or need assistance? We're here to help. Reach out to our friendly team through any of the methods below.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Details & Form Section */}
      <section className="py-16 bg-white">
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
                  <div className="bg-vitality-100 p-3 rounded-full mr-4">
                    <MapPin className="h-6 w-6 text-vitality-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-1">Visit Us</h3>
                    <address className="not-italic text-gray-600">
                      123 Healing Street<br />
                      Wellness City, WC 10001<br />
                      United States
                    </address>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-vitality-100 p-3 rounded-full mr-4">
                    <Phone className="h-6 w-6 text-vitality-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-1">Call Us</h3>
                    <p className="text-gray-600">
                      Main: <a href="tel:+1234567890" className="hover:text-vitality-500">(123) 456-7890</a><br />
                      Urgent Care: <a href="tel:+1234567899" className="hover:text-vitality-500">(123) 456-7899</a>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-vitality-100 p-3 rounded-full mr-4">
                    <Mail className="h-6 w-6 text-vitality-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-1">Email Us</h3>
                    <p className="text-gray-600">
                      General Inquiries: <a href="mailto:info@vitalityphysio.com" className="hover:text-vitality-500">info@vitalityphysio.com</a><br />
                      Appointments: <a href="mailto:appointments@vitalityphysio.com" className="hover:text-vitality-500">appointments@vitalityphysio.com</a>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-vitality-100 p-3 rounded-full mr-4">
                    <Clock className="h-6 w-6 text-vitality-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-1">Hours of Operation</h3>
                    <p className="text-gray-600">
                      Monday - Friday: 8:00 AM - 6:00 PM<br />
                      Saturday: 9:00 AM - 2:00 PM<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Map */}
              <div className="mt-10 rounded-lg overflow-hidden shadow-md">
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
            <div className="bg-gray-50 p-8 rounded-lg shadow-sm">
              {formStatus === "success" ? (
                <div className="text-center py-8">
                  <div className="mb-4 mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold mb-4 text-gray-800">Message Sent Successfully!</h2>
                  <p className="text-gray-600 mb-6">
                    Thank you for contacting Vitality Physiotherapy. We've received your message and will get back to you shortly.
                  </p>
                  <Button onClick={() => setFormStatus("idle")}>
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold mb-6 text-vitality-700">Send Us a Message</h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-3">
                      <Label htmlFor="name">Full Name</Label>
                      <Input 
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    
                    <div className="space-y-3">
                      <Label htmlFor="email">Email Address</Label>
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
                    
                    <div className="space-y-3">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input 
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Enter your phone number"
                      />
                    </div>
                    
                    <div className="space-y-3">
                      <Label htmlFor="inquiryType">Inquiry Type</Label>
                      <Select 
                        onValueChange={handleSelectChange}
                        value={formData.inquiryType}
                      >
                        <SelectTrigger id="inquiryType">
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
                      <Label htmlFor="message">Message</Label>
                      <Textarea 
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="How can we help you?"
                        rows={5}
                        required
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-accent hover:bg-accent/90"
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
