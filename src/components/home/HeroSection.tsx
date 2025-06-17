
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CalendarCheck, Shield, Star, UserCheck, Phone, MapPin, Clock } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import React from "react";

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section className="relative bg-gradient-to-br from-white via-vitality-50 to-blue-50 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%23f0f9ff" fill-opacity="0.4"%3E%3Cpath d="m0 40 40-40h-40z"/%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      
      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-xl">
            {/* Trust Badge */}
            <div className="flex items-center mb-6 bg-white rounded-full py-2 px-6 w-fit shadow-sm border border-vitality-100">
              <Shield className="h-5 w-5 text-green-600 mr-3" />
              <span className="text-sm font-medium text-gray-700">Licensed & Certified Physiotherapists</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-display text-vitality-700 leading-tight">
              Restore Your 
              <span className="text-blue-600 block">Movement</span>
              <span className="text-green-600">& Vitality</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
              Expert physiotherapy care to help you recover from injury, manage pain, and achieve optimal physical wellness. Personalized treatment plans designed for your unique needs.
            </p>
            
            {/* Key Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="flex items-center bg-white rounded-lg p-3 shadow-sm border border-gray-100">
                <Clock className="h-5 w-5 text-blue-600 mr-2" />
                <span className="text-sm font-medium text-gray-700">Same Day Appointments</span>
              </div>
              <div className="flex items-center bg-white rounded-lg p-3 shadow-sm border border-gray-100">
                <MapPin className="h-5 w-5 text-green-600 mr-2" />
                <span className="text-sm font-medium text-gray-700">Pan-India Coverage</span>
              </div>
              <div className="flex items-center bg-white rounded-lg p-3 shadow-sm border border-gray-100">
                <UserCheck className="h-5 w-5 text-vitality-600 mr-2" />
                <span className="text-sm font-medium text-gray-700">1000+ Expert Doctors</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg">
                <Link to="/booking" className="flex items-center">
                  <CalendarCheck className="mr-2 h-5 w-5" />
                  Book Consultation
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-2 border-vitality-600 text-vitality-600 hover:bg-vitality-50 px-8 py-3 text-lg">
                <Link to="/recommendations" className="flex items-center">
                  <Phone className="mr-2 h-5 w-5" />
                  Call Now: +91-9876543210
                </Link>
              </Button>
            </div>
            
            {/* Rating & Reviews */}
            <div className="flex items-center space-x-6">
              <div className="flex items-center">
                <div className="flex space-x-1 mr-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <span className="text-lg font-bold text-gray-800">4.9/5</span>
              </div>
              <div className="h-6 w-px bg-gray-300"></div>
              <div className="text-sm text-gray-600">
                <span className="font-semibold">50,000+</span> successful treatments
              </div>
            </div>
          </div>
          
          <div className="relative">
            {/* Main Image */}
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Professional physiotherapist treating patient" 
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            
            {/* Floating Stats Cards */}
            <div className="absolute -top-6 -right-6 bg-white rounded-xl shadow-lg p-4 z-20 border border-gray-100">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">15+</div>
                <div className="text-xs text-gray-600">Years Experience</div>
              </div>
            </div>
            
            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4 z-20 border border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="bg-green-100 rounded-full p-2">
                  <UserCheck className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <div className="text-lg font-bold text-green-600">98%</div>
                  <div className="text-xs text-gray-600">Recovery Rate</div>
                </div>
              </div>
            </div>
            
            {/* Background Decorations */}
            <div className="absolute -top-12 -left-12 w-32 h-32 bg-blue-200 rounded-full opacity-20 z-0"></div>
            <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-green-200 rounded-full opacity-20 z-0"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
