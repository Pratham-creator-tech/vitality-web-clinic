
import React, { useEffect, useRef } from "react";
import { useEmblaCarousel as originalUseEmblaCarousel } from "embla-carousel-react";

// Create a wrapper around the original hook with correct typing
const useEmblaCarousel = originalUseEmblaCarousel as any;

const trustedPartners = [
  {
    name: "City Medical Center",
    logo: "https://placehold.co/150x50/4ade80/1f2937?text=City+Medical",
    color: "bg-green-400"
  },
  {
    name: "National Health Institute",
    logo: "https://placehold.co/150x50/60a5fa/1f2937?text=Health+Institute",
    color: "bg-blue-400"
  },
  {
    name: "SportsMed Clinic",
    logo: "https://placehold.co/150x50/f97316/1f2937?text=SportsMed",
    color: "bg-orange-500"
  },
  {
    name: "Wellness Foundation",
    logo: "https://placehold.co/150x50/a78bfa/1f2937?text=Wellness+Foundation",
    color: "bg-purple-400"
  },
  {
    name: "Regional Rehab Center",
    logo: "https://placehold.co/150x50/fb7185/1f2937?text=Rehab+Center",
    color: "bg-rose-400"
  },
  {
    name: "Elite Athletes Association",
    logo: "https://placehold.co/150x50/facc15/1f2937?text=Elite+Athletes",
    color: "bg-yellow-400"
  }
];

const TrustedByCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true, 
    align: "start",
    speed: 10,
    direction: "rtl"
  });
  
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);
  
  // Auto-play functionality
  useEffect(() => {
    if (!emblaApi) return;
    
    const autoplay = () => {
      if (!emblaApi || !emblaApi.canScrollNext()) return;
      emblaApi.scrollNext();
    };
    
    // Start autoplay
    const startAutoplay = () => {
      stopAutoplay();
      autoplayRef.current = setInterval(autoplay, 3000);
    };
    
    // Stop autoplay
    const stopAutoplay = () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
        autoplayRef.current = null;
      }
    };
    
    // Initialize autoplay
    startAutoplay();
    
    // Pause on hover
    const emblaNode = emblaApi.rootNode();
    emblaNode.addEventListener('mouseenter', stopAutoplay);
    emblaNode.addEventListener('mouseleave', startAutoplay);
    
    return () => {
      stopAutoplay();
      emblaNode.removeEventListener('mouseenter', stopAutoplay);
      emblaNode.removeEventListener('mouseleave', startAutoplay);
    };
  }, [emblaApi]);
  
  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex">
        {trustedPartners.map((partner, index) => (
          <div 
            key={index} 
            className={`flex-none mx-4 p-4 rounded-lg transition-transform duration-300 hover:scale-110 ${partner.color} bg-opacity-20 hover:bg-opacity-30`}
            style={{ minWidth: "200px" }}
          >
            <img 
              src={partner.logo} 
              alt={partner.name} 
              className="h-10 w-full object-contain filter-none hover:brightness-110 transition-all" 
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrustedByCarousel;
