
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

const trustedCenters = [
  {
    name: "Mayo Clinic",
    image: "https://placehold.co/200x80/9b87f5/ffffff?text=Mayo+Clinic",
    color: "bg-[#9b87f5]"
  },
  {
    name: "Cleveland Clinic",
    image: "https://placehold.co/200x80/7E69AB/ffffff?text=Cleveland+Clinic",
    color: "bg-[#7E69AB]"
  },
  {
    name: "Johns Hopkins",
    image: "https://placehold.co/200x80/D946EF/ffffff?text=Johns+Hopkins",
    color: "bg-[#D946EF]"
  },
  {
    name: "Massachusetts General",
    image: "https://placehold.co/200x80/F97316/ffffff?text=Mass+General",
    color: "bg-[#F97316]"
  },
  {
    name: "Stanford Health",
    image: "https://placehold.co/200x80/0EA5E9/ffffff?text=Stanford+Health",
    color: "bg-[#0EA5E9]"
  },
  {
    name: "UCLA Medical",
    image: "https://placehold.co/200x80/33C3F0/ffffff?text=UCLA+Medical",
    color: "bg-[#33C3F0]"
  },
  {
    name: "Regional Hospital",
    image: "https://placehold.co/200x80/8B5CF6/ffffff?text=Regional+Hospital",
    color: "bg-[#8B5CF6]"
  },
  {
    name: "Sports Center",
    image: "https://placehold.co/200x80/6E59A5/ffffff?text=Sports+Center",
    color: "bg-[#6E59A5]"
  }
];

export const TrustedByCarousel = () => {
  const plugin = useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true, direction: "rtl" })
  );

  return (
    <div className="bg-gradient-to-r from-vitality-50/30 to-white/30 py-12 border-t border-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-2xl md:text-3xl font-bold text-vitality-700 mb-8">
          Trusted By Leading Healthcare Institutions
        </h2>
        <Carousel 
          opts={{
            align: "start",
            loop: true,
            direction: "rtl"
          }}
          plugins={[plugin.current]}
          className="w-full max-w-6xl mx-auto"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {trustedCenters.map((center, index) => (
              <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/3 lg:basis-1/4">
                <div 
                  className={`p-4 rounded-lg transition-all duration-300 transform hover:scale-105 ${center.color} hover:shadow-lg group`}
                >
                  <img 
                    src={center.image} 
                    alt={center.name}
                    className="h-12 mx-auto brightness-200 group-hover:brightness-100 transition-all"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="border-vitality-300 hover:bg-vitality-50 text-vitality-700" />
          <CarouselNext className="border-vitality-300 hover:bg-vitality-50 text-vitality-700" />
        </Carousel>
      </div>
    </div>
  );
};
