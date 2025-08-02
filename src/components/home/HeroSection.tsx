
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CalendarCheck, Shield, Star, UserCheck, Search, Star as LucideStar, StarHalf } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import React from "react";

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 overflow-hidden dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Enhanced Background with Animated Elements */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-20 animate-scale-up"
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
          <img 
            src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
            alt="Healthcare background" 
            className="w-full h-full object-cover"
          />
        </video>
        
        {/* Animated Background Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full filter blur-3xl animate-pulse float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full filter blur-3xl animate-pulse float-delayed"></div>
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-gradient-to-r from-green-400/20 to-blue-400/20 rounded-full filter blur-3xl animate-pulse"></div>
        
        {/* Enhanced Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-blue-50/90 to-cyan-50/95 dark:from-gray-900/95 dark:via-gray-800/90 dark:to-gray-900/95 animate-overlay-pulse"></div>
      </div>

      <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-screen">
          <div className="max-w-xl lg:pr-8 animate-fade-in-up">
            <div className="flex items-center mb-6 glass rounded-full py-2 px-6 w-fit hover-glow">
              <Star className="h-5 w-5 text-yellow-500 mr-3 animate-gentle-bounce" />
              <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Trusted by 50,000+ patients across India
              </span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 font-display leading-tight">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
                Expert Physiotherapy
              </span>
              <br />
              <span className="text-gray-800 dark:text-white">Care Across India</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-10 dark:text-gray-300 leading-relaxed">
              Connect with certified physiotherapists in your city. From Mumbai to Chennai, Delhi to Kolkata - 
              <span className="font-semibold text-blue-600 dark:text-blue-400"> quality care is just a click away.</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 mb-12">
              <Button asChild size="lg" className="btn-gradient text-lg py-6 px-8 rounded-full shadow-xl hover-lift">
                <Link to="/recommendations" className="flex items-center">
                  <Search className="mr-3 h-6 w-6" />
                  Find Your Doctor
                </Link>
              </Button>
              <Button asChild size="lg" className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white text-lg py-6 px-8 rounded-full shadow-xl hover-lift">
                <Link to="/booking" className="flex items-center">
                  <CalendarCheck className="mr-3 h-6 w-6" />
                  Book Appointment
                </Link>
              </Button>
            </div>
            
            
            <div className="grid grid-cols-3 gap-6 mb-10">
              <div className="flex items-center glass rounded-2xl py-3 px-4 hover-glow">
                <Shield className="h-5 w-5 text-blue-500 mr-3" />
                <div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Government</p>
                  <p className="text-sm font-semibold text-gray-800 dark:text-white">Certified</p>
                </div>
              </div>
              <div className="flex items-center glass rounded-2xl py-3 px-4 hover-glow">
                <UserCheck className="h-5 w-5 text-green-500 mr-3" />
                <div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">1000+</p>
                  <p className="text-sm font-semibold text-gray-800 dark:text-white">Doctors</p>
                </div>
              </div>
              <div className="flex items-center glass rounded-2xl py-3 px-4 hover-glow">
                <CalendarCheck className="h-5 w-5 text-purple-500 mr-3" />
                <div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Same Day</p>
                  <p className="text-sm font-semibold text-gray-800 dark:text-white">Booking</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-center lg:justify-start">
              <div className="glass rounded-full py-3 px-6 flex items-center gap-4 hover-glow">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center text-white text-sm font-bold shadow-lg">
                  4.8
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {[1, 2, 3, 4].map((star) => (
                      <LucideStar key={star} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    ))}
                    <StarHalf className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  </div>
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300">(12,000+ reviews)</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative lg:pl-8 animate-slide-fade-in-right">
            <div className="relative">
              <div className="card-enhanced hover-lift rounded-3xl overflow-hidden shadow-2xl relative z-10">
                <img 
                  src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80" 
                  alt="Physiotherapist treating patient" 
                  className="w-full h-auto object-cover"
                />
                
                {/* Floating Achievement Card */}
                <div className="absolute -bottom-8 -left-8 glass rounded-2xl p-6 shadow-2xl border border-white/30 hover-glow float">
                  <div className="flex items-center space-x-4">
                    <div className="bg-gradient-to-r from-green-400 to-blue-500 rounded-full p-4">
                      <UserCheck className="h-8 w-8 text-white" />
                    </div>
                    <div className="text-white">
                      <p className="text-xs opacity-80">Since 2010</p>
                      <p className="text-2xl font-bold">50,000+</p>
                      <p className="text-xs opacity-80">Patients Treated</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-r from-blue-400/30 to-purple-400/30 rounded-full filter blur-2xl animate-pulse"></div>
              <div className="absolute -bottom-12 right-12 w-48 h-48 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-full filter blur-3xl float-delayed"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
