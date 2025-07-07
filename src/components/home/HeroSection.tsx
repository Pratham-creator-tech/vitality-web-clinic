
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Video, Star, Users, Award, Play, Pause } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const HeroSection = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);

  useEffect(() => {
    const video = document.getElementById('hero-video') as HTMLVideoElement;
    if (video) {
      video.play().catch(() => {
        // Video autoplay failed, that's okay
        setIsVideoPlaying(false);
      });
    }
  }, []);

  const toggleVideo = () => {
    const video = document.getElementById('hero-video') as HTMLVideoElement;
    if (video) {
      if (isVideoPlaying) {
        video.pause();
      } else {
        video.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-vitality-50 via-white to-blue-50 py-20 overflow-hidden min-h-[80vh]">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          id="hero-video"
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-30"
        >
          <source src="https://cdn.pixabay.com/video/2023/04/12/157462-820645041_large.mp4" type="video/mp4" />
          <source src="https://cdn.pixabay.com/video/2022/09/26/132450-756308859_large.mp4" type="video/mp4" />
          {/* Fallback image */}
          <img 
            src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=1920&h=1080&q=80" 
            alt="Physiotherapy session" 
            className="w-full h-full object-cover"
          />
        </video>
        
        {/* Video Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-vitality-900/20 via-vitality-800/10 to-blue-900/20"></div>
        
        {/* Video Control Button */}
        <button
          onClick={toggleVideo}
          className="absolute bottom-6 right-6 z-10 bg-white/20 backdrop-blur-sm rounded-full p-3 hover:bg-white/30 transition-all duration-300 group"
          aria-label={isVideoPlaying ? "Pause video" : "Play video"}
        >
          {isVideoPlaying ? (
            <Pause className="h-5 w-5 text-white group-hover:scale-110 transition-transform" />
          ) : (
            <Play className="h-5 w-5 text-white group-hover:scale-110 transition-transform" />
          )}
        </button>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in-up">
            <div className="flex items-center mb-6 bg-white/90 backdrop-blur-sm rounded-full py-2 px-6 w-fit shadow-lg border border-white/20">
              <Award className="h-5 w-5 text-vitality-600 mr-3 animate-gentle-bounce" />
              <span className="text-sm font-medium text-gray-700">Expert Physiotherapy Care</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-gray-900">
              <span className="text-vitality-600">Professional</span>{" "}
              <span className="text-blue-600">Physiotherapy</span>{" "}
              <span className="text-gray-900">Care at Home</span>
            </h1>
            
            <p className="text-lg text-gray-700 mb-8 leading-relaxed bg-white/80 backdrop-blur-sm p-4 rounded-lg">
              Experience personalized physiotherapy treatments with our certified professionals through secure video consultations. Get the care you need from the comfort of your home.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button 
                size="lg" 
                className="bg-vitality-600 hover:bg-vitality-700 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105"
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
                className="border-vitality-600 text-vitality-600 hover:bg-vitality-50 backdrop-blur-sm px-8 py-4 text-lg font-semibold hover:scale-105 transition-all"
                asChild
              >
                <Link to="/services" className="flex items-center gap-2">
                  <Video className="h-5 w-5" />
                  View Services
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200">
              <div className="text-center bg-white/70 backdrop-blur-sm rounded-lg p-3">
                <div className="flex items-center justify-center gap-1 mb-2">
                  <Star className="h-5 w-5 text-yellow-500 fill-current animate-gentle-bounce" />
                  <span className="text-2xl font-bold text-gray-900">4.9</span>
                </div>
                <p className="text-sm text-gray-600">Patient Rating</p>
              </div>
              <div className="text-center bg-white/70 backdrop-blur-sm rounded-lg p-3">
                <div className="flex items-center justify-center mb-2">
                  <Users className="h-5 w-5 text-vitality-600 mr-1 animate-gentle-bounce" />
                  <span className="text-2xl font-bold text-gray-900">500+</span>
                </div>
                <p className="text-sm text-gray-600">Happy Patients</p>
              </div>
              <div className="text-center bg-white/70 backdrop-blur-sm rounded-lg p-3">
                <div className="flex items-center justify-center mb-2">
                  <Award className="h-5 w-5 text-blue-600 mr-1 animate-gentle-bounce" />
                  <span className="text-2xl font-bold text-gray-900">15+</span>
                </div>
                <p className="text-sm text-gray-600">Services</p>
              </div>
            </div>
          </div>
          
          <div className="relative animate-slide-fade-in-right">
            <div className="relative z-10">
              <img
                src="/lovable-uploads/dd2ac8e5-f657-457c-955c-665ea3f1f4ea.png"
                alt="Professional Physiotherapy"
                className="w-full h-auto rounded-2xl shadow-2xl backdrop-blur-sm bg-white/10 p-2"
              />
            </div>
            <div className="absolute -top-4 -right-4 w-full h-full bg-gradient-to-br from-vitality-200/30 to-blue-200/30 rounded-2xl -z-10 animate-scale-up"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
