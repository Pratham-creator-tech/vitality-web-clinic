
import React from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  TrendingUp, 
  Calendar, 
  Users, 
  Shield, 
  Award, 
  Clock,
  Heart,
  Star,
  CheckCircle,
  ArrowRight,
  Phone,
  Mail,
  MapPin
} from "lucide-react";

const DoctorBenefits = () => {
  const benefits = [
    {
      icon: TrendingUp,
      title: "Grow Your Practice",
      description: "Access to a wider patient base and increased visibility in your specialty area."
    },
    {
      icon: Calendar,
      title: "Smart Scheduling",
      description: "Automated appointment management with reduced no-shows and optimized time slots."
    },
    {
      icon: Users,
      title: "Patient Management",
      description: "Comprehensive tools for tracking patient progress and treatment outcomes."
    },
    {
      icon: Shield,
      title: "Secure Platform",
      description: "HIPAA-compliant system ensuring patient data privacy and security."
    },
    {
      icon: Award,
      title: "Professional Recognition",
      description: "Featured profiles showcasing your expertise and patient testimonials."
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Round-the-clock technical and administrative support for seamless operations."
    }
  ];

  const stats = [
    { number: "1000+", label: "Registered Doctors" },
    { number: "50K+", label: "Patients Served" },
    { number: "98%", label: "Doctor Satisfaction" },
    { number: "4.9★", label: "Average Rating" }
  ];

  const testimonials = [
    {
      name: "Dr. Priya Sharma",
      specialty: "Orthopedic Physiotherapist",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      quote: "Joining this platform doubled my patient appointments in just 3 months. The scheduling system is incredibly efficient."
    },
    {
      name: "Dr. Rajesh Kumar",
      specialty: "Sports Medicine",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      quote: "The professional network and referral system have significantly enhanced my practice. Highly recommended for serious practitioners."
    },
    {
      name: "Dr. Anita Patel",
      specialty: "Neurological Rehabilitation",
      image: "https://images.unsplash.com/photo-1594824481007-763c3f29bec7?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      quote: "The patient management tools are exceptional. I can now focus more on treatment while the platform handles the administration."
    }
  ];

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-vitality-50 via-white to-blue-50 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23e0f2fe" fill-opacity="0.3"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-xl">
              <div className="flex items-center mb-6 bg-white rounded-full py-2 px-6 w-fit shadow-sm border border-green-100">
                <Award className="h-5 w-5 text-green-600 mr-3" />
                <span className="text-sm font-medium text-gray-700">Join 1000+ Healthcare Professionals</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-6 font-display text-vitality-700 leading-tight">
                Advance Your 
                <span className="text-blue-600 block">Medical Practice</span>
                <span className="text-green-600">with Technology</span>
              </h1>
              
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Join India's leading physiotherapy platform and transform how you deliver patient care. 
                Access advanced tools, expand your reach, and focus on what you do best - healing.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
                  <Link to="/doctor-registration" className="flex items-center">
                    <Heart className="mr-2 h-5 w-5" />
                    Join Our Network
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-2 border-vitality-600 text-vitality-600 hover:bg-vitality-50 px-8 py-3">
                  <Link to="/contact" className="flex items-center">
                    <Phone className="mr-2 h-5 w-5" />
                    Schedule Demo
                  </Link>
                </Button>
              </div>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center bg-white rounded-lg p-3 shadow-sm border border-gray-100">
                    <div className="text-2xl font-bold text-blue-600">{stat.number}</div>
                    <div className="text-xs text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Doctor using digital platform" 
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-6 -right-6 bg-white rounded-xl shadow-lg p-4 z-20 border border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 rounded-full p-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-green-600">Verified</div>
                    <div className="text-xs text-gray-600">Professional</div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4 z-20 border border-gray-100">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">₹2.5L+</div>
                  <div className="text-xs text-gray-600">Avg. Monthly Earnings</div>
                </div>
              </div>
              
              {/* Background Decorations */}
              <div className="absolute -top-12 -left-12 w-32 h-32 bg-blue-200 rounded-full opacity-20 z-0"></div>
              <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-green-200 rounded-full opacity-20 z-0"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-vitality-700">
              Why Leading Doctors Choose Our Platform
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Join thousands of healthcare professionals who have transformed their practice with our comprehensive digital solution.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="group bg-gray-50 p-8 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300 border border-gray-100">
                <div className="bg-vitality-100 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:bg-vitality-200 transition-colors">
                  <benefit.icon className="h-8 w-8 text-vitality-600" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-vitality-700">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-vitality-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-vitality-700">
              What Our Doctors Say
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Real experiences from healthcare professionals who've grown their practice with us.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                <div className="flex items-center mb-6">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-bold text-vitality-700">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.specialty}</p>
                    <div className="flex items-center mt-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 italic leading-relaxed">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-vitality-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Practice?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join our network of healthcare professionals and start providing exceptional care with cutting-edge tools.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3">
              <Link to="/doctor-registration" className="flex items-center">
                <Heart className="mr-2 h-5 w-5" />
                Start Your Journey
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3">
              <Link to="/contact" className="flex items-center">
                <Phone className="mr-2 h-5 w-5" />
                Book Consultation
              </Link>
            </Button>
          </div>
          
          {/* Contact Info */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 text-sm opacity-80">
            <div className="flex items-center">
              <Phone className="h-4 w-4 mr-2" />
              <span>+91-9876543210</span>
            </div>
            <div className="flex items-center">
              <Mail className="h-4 w-4 mr-2" />
              <span>doctors@physiocare.com</span>
            </div>
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-2" />
              <span>Available Pan-India</span>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default DoctorBenefits;
