
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const partners = [
  { name: "Mayo Clinic", logo: "/placeholder.svg" },
  { name: "Johns Hopkins", logo: "/placeholder.svg" },
  { name: "Cleveland Clinic", logo: "/placeholder.svg" },
  { name: "NYU Langone", logo: "/placeholder.svg" },
  { name: "Mass General", logo: "/placeholder.svg" },
  { name: "UCLA Medical", logo: "/placeholder.svg" },
  { name: "Stanford Health", logo: "/placeholder.svg" },
  { name: "UCSF Medical", logo: "/placeholder.svg" },
];

const TrustedByCarousel = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const scrollAnimation = () => {
      if (scrollRef.current) {
        if (scrollRef.current.scrollLeft >= 
            scrollRef.current.scrollWidth / 2) {
          scrollRef.current.scrollLeft = 0;
        } else {
          scrollRef.current.scrollLeft += 1;
        }
      }
    };

    const animationId = setInterval(scrollAnimation, 30);
    
    return () => clearInterval(animationId);
  }, []);

  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-900/50 overflow-hidden">
      <div className="container mx-auto px-4">
        <h3 className="text-center font-display text-lg text-gray-600 dark:text-gray-400 mb-8">
          Trusted by world-class healthcare institutions
        </h3>
        
        <div className="relative w-full overflow-hidden">
          <div 
            ref={scrollRef}
            className="flex gap-12 overflow-x-scroll scrollbar-none"
            style={{ scrollBehavior: "smooth", width: "200%" }}
          >
            {/* First set of logos */}
            {partners.map((partner, index) => (
              <motion.div
                key={`partner-1-${index}`}
                className="flex flex-col items-center justify-center min-w-[150px] px-4"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <img 
                  src={partner.logo} 
                  alt={`${partner.name} logo`} 
                  className="h-14 w-14 object-contain opacity-70 dark:opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                />
                <span className="mt-2 text-sm text-gray-600 dark:text-gray-400 font-medium">
                  {partner.name}
                </span>
              </motion.div>
            ))}
            
            {/* Duplicate set for continuous scrolling */}
            {partners.map((partner, index) => (
              <motion.div
                key={`partner-2-${index}`}
                className="flex flex-col items-center justify-center min-w-[150px] px-4"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <img 
                  src={partner.logo} 
                  alt={`${partner.name} logo`} 
                  className="h-14 w-14 object-contain opacity-70 dark:opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                />
                <span className="mt-2 text-sm text-gray-600 dark:text-gray-400 font-medium">
                  {partner.name}
                </span>
              </motion.div>
            ))}
          </div>
          
          {/* Gradient overlays for smooth fade in/out effect */}
          <div className="absolute left-0 top-0 w-16 h-full bg-gradient-to-r from-gray-50 to-transparent dark:from-gray-900/50 dark:to-transparent"></div>
          <div className="absolute right-0 top-0 w-16 h-full bg-gradient-to-l from-gray-50 to-transparent dark:from-gray-900/50 dark:to-transparent"></div>
        </div>
      </div>
    </section>
  );
};

export default TrustedByCarousel;
