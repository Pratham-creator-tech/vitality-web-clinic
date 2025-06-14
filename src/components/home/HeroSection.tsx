
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CalendarCheck, Star, Shield, UserCheck, Search, Star as LucideStar, StarHalf } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

// Use this physiotherapy image from uploads
const PHYSIO_IMAGE = "/lovable-uploads/photo-1581091226825-a6a2a5aee158.jpeg";

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section
      className="relative w-full min-h-[58vh] flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url('${PHYSIO_IMAGE}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Lighter overlay for image visibility */}
      <div className="absolute inset-0 bg-white/60 dark:bg-black/60 pointer-events-none" />
      <div className="relative z-10 w-full max-w-xl mx-auto flex flex-col items-center text-center py-7 px-2 sm:py-10 sm:px-6 md:py-12 rounded-lg">
        <div className="flex items-center mb-1 bg-vitality-50 rounded-full py-1 px-4 w-fit mx-auto dark:bg-gray-800">
          <Star className="h-5 w-5 text-yellow-500 mr-2" />
          <span className="text-sm font-medium text-vitality-700 dark:text-vitality-300">
            Trusted by 50,000+ patients across India
          </span>
        </div>
        <h1 className="text-xl xs:text-3xl md:text-4xl font-bold mb-2 font-display text-vitality-700 leading-tight dark:text-white">
          Expert Physiotherapy Care Online & In-Clinic
        </h1>
        <p className="text-sm sm:text-base text-gray-700 mb-3 dark:text-gray-300">
          Book certified physiotherapist appointments&nbsp;–&nbsp;online or in person.
        </p>
        <div className="flex flex-col sm:flex-row gap-2 mb-4 w-full justify-center">
          <Button asChild size="lg" className="bg-vitality-600 hover:bg-vitality-700 text-white w-full sm:w-auto">
            <Link to="/recommendations" className="flex items-center justify-center">
              <Search className="mr-2 h-5 w-5" />
              Find Your Doctor
            </Link>
          </Button>
          <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 text-white w-full sm:w-auto">
            <Link to="/booking" className="flex items-center justify-center">
              <CalendarCheck className="mr-2 h-5 w-5" />
              Book Appointment
            </Link>
          </Button>
        </div>
        {/* Quick facts */}
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mb-2">
          <div className="flex items-center">
            <Shield className="h-5 w-5 text-vitality-500 mr-2" />
            <span className="text-xs font-medium dark:text-gray-300">Govt. Certified</span>
          </div>
          <div className="flex items-center">
            <UserCheck className="h-5 w-5 text-vitality-500 mr-2" />
            <span className="text-xs font-medium dark:text-gray-300">1000+ Experts</span>
          </div>
          <div className="flex items-center">
            <CalendarCheck className="h-5 w-5 text-vitality-500 mr-2" />
            <span className="text-xs font-medium dark:text-gray-300">Same Day Booking</span>
          </div>
        </div>
        {/* Rating */}
        <div className="flex items-center justify-center gap-2">
          <div className="w-8 h-8 rounded-full bg-vitality-500 flex items-center justify-center text-white text-xs font-bold shadow">
            4.8
          </div>
          <div className="flex items-center bg-white py-1 px-3 rounded-full shadow-md border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
            <div className="flex items-center gap-0.5 mr-1">
              {[1, 2, 3, 4].map((star) => (
                <LucideStar key={star} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              ))}
              <StarHalf className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            </div>
            <span className="text-xs text-gray-600 dark:text-gray-300">(12,000+ reviews)</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
