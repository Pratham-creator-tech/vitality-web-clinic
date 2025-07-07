
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Video, Star, Users, Award } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-vitality-50 via-white to-blue-50 py-20 overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-r from-vitality-100/20 to-blue-100/20"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1)_0%,transparent_50%)]"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center mb-6 bg-white rounded-full py-2 px-6 w-fit shadow-sm border border-vitality-200">
              <Award className="h-5 w-5 text-vitality-600 mr-3" />
              <span className="text-sm font-medium text-gray-700">Expert Physiotherapy Care</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="text-vitality-700">Professional</span>{" "}
              <span className="text-blue-600">Physiotherapy</span>{" "}
              <span className="text-gray-800">Care at Home</span>
            </h1>
            
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Experience personalized physiotherapy treatments with our certified professionals through secure video consultations. Get the care you need from the comfort of your home.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button 
                size="lg" 
                className="bg-vitality-600 hover:bg-vitality-700 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
                asChild
              >
                <Link to="/booking" className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Book Appointment Now
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="border-blue-500 text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg font-semibold"
                asChild
              >
                <Link to="/services" className="flex items-center gap-2">
                  <Video className="h-5 w-5" />
                  View Services
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-2">
                  <Star className="h-5 w-5 text-yellow-500 fill-current" />
                  <span className="text-2xl font-bold text-gray-800">4.9</span>
                </div>
                <p className="text-sm text-gray-600">Patient Rating</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Users className="h-5 w-5 text-vitality-600 mr-1" />
                  <span className="text-2xl font-bold text-gray-800">500+</span>
                </div>
                <p className="text-sm text-gray-600">Happy Patients</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Award className="h-5 w-5 text-blue-600 mr-1" />
                  <span className="text-2xl font-bold text-gray-800">15+</span>
                </div>
                <p className="text-sm text-gray-600">Services</p>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative z-10">
              <img
                src="/lovable-uploads/dd2ac8e5-f657-457c-955c-665ea3f1f4ea.png"
                alt="Professional Physiotherapy"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            </div>
            <div className="absolute -top-4 -right-4 w-full h-full bg-gradient-to-br from-vitality-200 to-blue-200 rounded-2xl -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
