
import React, { useEffect, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { useTheme } from "next-themes";

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
  const { theme } = useTheme();
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true, 
    align: "start",
    dragFree: true,
    containScroll: "trimSnaps"
  });
  
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);
  
  useEffect(() => {
    if (!emblaApi) return;
    
    const autoplay = () => {
      if (!emblaApi || !emblaApi.canScrollNext()) return;
      emblaApi.scrollNext();
    };
    
    const startAutoplay = () => {
      stopAutoplay();
      autoplayRef.current = setInterval(autoplay, 2000); // Faster interval
    };
    
    const stopAutoplay = () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
        autoplayRef.current = null;
      }
    };
    
    startAutoplay();
    
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
    <div className="w-full overflow-hidden bg-background" ref={emblaRef}>
      <div className="flex">
        {[...trustedPartners, ...trustedPartners].map((partner, index) => (
          <div 
            key={`${partner.name}-${index}`}
            className={`flex-none mx-4 p-6 rounded-xl transition-all duration-300 hover:scale-105 ${
              theme === 'dark' ? 'bg-gray-800/50' : `${partner.color} bg-opacity-10'
            } hover:bg-opacity-20`}
            style={{ minWidth: "250px" }}
          >
            <img 
              src={partner.logo} 
              alt={partner.name} 
              className="h-12 w-full object-contain filter-none hover:brightness-110 transition-all" 
            />
            <p className="mt-3 text-sm text-muted-foreground text-center">{partner.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrustedByCarousel;
