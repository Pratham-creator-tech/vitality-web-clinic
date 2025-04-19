
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const trustedCenters = [
  {
    name: "Mayo Clinic",
    image: "https://placehold.co/200x80/f3f4f6/64748b?text=Mayo+Clinic"
  },
  {
    name: "Cleveland Clinic",
    image: "https://placehold.co/200x80/f3f4f6/64748b?text=Cleveland+Clinic"
  },
  {
    name: "Johns Hopkins",
    image: "https://placehold.co/200x80/f3f4f6/64748b?text=Johns+Hopkins"
  },
  {
    name: "Massachusetts General",
    image: "https://placehold.co/200x80/f3f4f6/64748b?text=Mass+General"
  },
  {
    name: "Stanford Health",
    image: "https://placehold.co/200x80/f3f4f6/64748b?text=Stanford+Health"
  },
  {
    name: "UCLA Medical",
    image: "https://placehold.co/200x80/f3f4f6/64748b?text=UCLA+Medical"
  }
];

export const TrustedByCarousel = () => {
  return (
    <div className="bg-white py-8 border-t border-gray-100">
      <div className="container mx-auto px-4">
        <p className="text-center text-gray-500 font-medium mb-6">Trusted By Leading Healthcare Institutions</p>
        <Carousel 
          opts={{
            align: "start",
            loop: true
          }}
          className="w-full max-w-5xl mx-auto"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {trustedCenters.map((center, index) => (
              <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/3 lg:basis-1/4">
                <div className="p-2">
                  <img 
                    src={center.image} 
                    alt={center.name}
                    className="h-12 mx-auto grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
};
