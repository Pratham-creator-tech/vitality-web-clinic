
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CalendarCheck, Star, Shield, UserCheck, Search, Star as LucideStar, StarHalf } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

// Use a placeholder physiotherapy image from Lovable assets
const PHYSIO_IMAGE = "https://images.unsplash.com/photo-1466721591366-2d5fba72006d?auto=format&fit=crop&w=1400&q=80";

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section
      className="relative w-full min-h-[80vh] flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url('${PHYSIO_IMAGE}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Optional overlay for text readability */}
      <div className="absolute inset-0 bg-white/70 dark:bg-black/60 pointer-events-none" />
      <div className="relative z-10 w-full max-w-3xl mx-auto flex flex-col items-center text-center py-16 px-4 md:px-0 rounded-lg">
        <div className="flex items-center mb-3 bg-vitality-50 rounded-full py-1 px-4 w-fit mx-auto dark:bg-gray-800">
          <Star className="h-5 w-5 text-yellow-500 mr-2" />
          <span className="text-sm font-medium text-vitality-700 dark:text-vitality-300">
            Trusted by 50,000+ patients across India
          </span>
        </div>
        <h1 className="text-3xl xs:text-4xl md:text-5xl font-bold mb-5 font-display text-vitality-700 leading-tight dark:text-white">
          Expert Physiotherapy Care Wherever You Are
        </h1>
        <p className="text-base sm:text-lg text-gray-700 mb-7 dark:text-gray-300">
          Book appointments with certified physiotherapists near you. Quality care is only a click away!
        </p>
        <div className="flex flex-col sm:flex-row gap-3 mb-8 w-full justify-center">
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
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-4 mb-6">
          <div className="flex items-center">
            <Shield className="h-5 w-5 text-vitality-500 mr-2" />
            <span className="text-sm font-medium dark:text-gray-300">Govt. Certified</span>
          </div>
          <div className="flex items-center">
            <UserCheck className="h-5 w-5 text-vitality-500 mr-2" />
            <span className="text-sm font-medium dark:text-gray-300">1000+ Experts</span>
          </div>
          <div className="flex items-center">
            <CalendarCheck className="h-5 w-5 text-vitality-500 mr-2" />
            <span className="text-sm font-medium dark:text-gray-300">Same Day Booking</span>
          </div>
        </div>
        {/* Rating */}
        <div className="flex items-center justify-center gap-3">
          <div className="w-10 h-10 rounded-full bg-vitality-500 flex items-center justify-center text-white text-xs font-bold shadow">
            4.8
          </div>
          <div className="flex items-center bg-white py-2 px-4 rounded-full shadow-md border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
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
      {/* No image or card overlays on side */}
    </section>
  );
};

export default HeroSection;

