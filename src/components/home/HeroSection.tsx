
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CalendarCheck, Shield, Star, UserCheck, Search, Star as LucideStar, StarHalf } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import React from "react";

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section className="relative bg-gradient-to-r from-brand-softblue via-white to-vitality-50 overflow-hidden dark:bg-gradient-to-r dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-60"
          poster="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
        >
          <source
            src="https://videos.pexels.com/video-files/5150329/5150329-hd_1920_1080_30fps.mp4"
            type="video/mp4"
          />
          <source
            src="https://videos.pexels.com/video-files/6823668/6823668-hd_1920_1080_25fps.mp4"
            type="video/mp4"
          />
          {/* Fallback image if video doesn't load */}
          <img 
            src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
            alt="Healthcare background" 
            className="w-full h-full object-cover"
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-brand-softblue/80 via-white/60 to-vitality-50/80 dark:bg-gradient-to-r dark:from-gray-900/80 dark:via-gray-800/60 dark:to-gray-900/80 pointer-events-none"></div>
      </div>

      <div className="container mx-auto px-4 py-20 md:py-28 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-xl lg:pr-8">
            <div className="flex items-center mb-4 bg-vitality-50 rounded-full py-1 px-4 w-fit dark:bg-gray-800">
              <Star className="h-5 w-5 text-yellow-500 mr-2" />
              <span className="text-sm font-medium text-vitality-700 dark:text-vitality-300">Trusted by 50,000+ patients across India</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-display text-vitality-700 leading-tight dark:text-white">
              Expert Physiotherapy Care Across India
            </h1>
            
            <p className="text-lg md:text-xl text-gray-700 mb-8 dark:text-gray-300">
              Connect with certified physiotherapists in your city. From Mumbai to Chennai, Delhi to Kolkata - quality care is just a click away.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Button asChild size="lg" className="bg-vitality-600 hover:bg-vitality-700 text-white">
                <Link to="/recommendations" className="flex items-center">
                  <Search className="mr-2 h-5 w-5" />
                  Find Your Doctor
                </Link>
              </Button>
              <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 text-white">
                <Link to="/booking" className="flex items-center">
                  <CalendarCheck className="mr-2 h-5 w-5" />
                  Book Appointment
                </Link>
              </Button>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 mb-6">
              <div className="flex items-center">
                <Shield className="h-5 w-5 text-vitality-500 mr-2" />
                <span className="text-sm font-medium dark:text-gray-300">Government Certified</span>
              </div>
              <div className="flex items-center">
                <UserCheck className="h-5 w-5 text-vitality-500 mr-2" />
                <span className="text-sm font-medium dark:text-gray-300">1000+ Expert Doctors</span>
              </div>
              <div className="flex items-center">
                <CalendarCheck className="h-5 w-5 text-vitality-500 mr-2" />
                <span className="text-sm font-medium dark:text-gray-300">Same Day Booking</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex -space-x-0">
                <div className="w-10 h-10 rounded-full bg-vitality-500 flex items-center justify-center text-white text-xs font-bold">
                  4.8
                </div>
                <div className="flex items-center bg-white py-2.5 px-5 rounded-full shadow-md border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
                  <div className="flex items-center gap-1 mr-3">
                    {[1, 2, 3, 4].map((star) => (
                      <LucideStar key={star} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    ))}
                    <StarHalf className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-300">(12,000+ reviews)</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative lg:pl-8">
            <div className="rounded-lg overflow-hidden shadow-xl relative z-10">
              <img 
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80" 
                alt="Physiotherapist treating patient" 
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-vitality-300 rounded-full opacity-30 z-0"></div>
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-brand-orange rounded-full opacity-10 z-0"></div>
            <div className="absolute -bottom-5 right-5 md:right-10 bg-white rounded-lg shadow-lg p-4 z-20 border border-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:text-white">
              <div className="flex items-center space-x-4">
                <div className="bg-vitality-50 rounded-full p-3 dark:bg-gray-700">
                  <UserCheck className="h-6 w-6 text-vitality-600 dark:text-vitality-300" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Since 2010</p>
                  <p className="text-lg font-bold text-vitality-700 dark:text-vitality-300">50,000+ Patients</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Successfully Treated Across India</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
