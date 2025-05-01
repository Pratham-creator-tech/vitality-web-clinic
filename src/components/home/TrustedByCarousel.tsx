
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

type TrustedPartner = {
  id: number;
  name: string;
  logoUrl: string;
};

const partners: TrustedPartner[] = [
  {
    id: 1,
    name: "Regional Hospital",
    logoUrl: "https://placehold.co/150x50/f3f4f6/64748b?text=Regional+Hospital",
  },
  {
    id: 2,
    name: "Sports Center",
    logoUrl: "https://placehold.co/150x50/f3f4f6/64748b?text=Sports+Center",
  },
  {
    id: 3,
    name: "Wellness Club",
    logoUrl: "https://placehold.co/150x50/f3f4f6/64748b?text=Wellness+Club",
  },
  {
    id: 4,
    name: "Health Network",
    logoUrl: "https://placehold.co/150x50/f3f4f6/64748b?text=Health+Network",
  },
  {
    id: 5,
    name: "Athletic Association",
    logoUrl: "https://placehold.co/150x50/f3f4f6/64748b?text=Athletic+Association",
  },
  {
    id: 6,
    name: "Fitness Academy",
    logoUrl: "https://placehold.co/150x50/f3f4f6/64748b?text=Fitness+Academy",
  },
];

const TrustedByCarousel = () => {
  const [duplicatedPartners, setDuplicatedPartners] = useState<TrustedPartner[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Duplicate partners to create endless scroll effect
  useEffect(() => {
    setDuplicatedPartners([...partners, ...partners]);
  }, []);

  return (
    <div className="w-full bg-white py-8 border-t border-gray-100 overflow-hidden">
      <div className="container mx-auto px-4">
        <p className="text-center text-gray-500 font-medium mb-6">Trusted By Leading Organizations</p>
        
        <div className="relative w-full overflow-hidden">
          <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-white to-transparent z-10"></div>
          <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-white to-transparent z-10"></div>
          
          <div ref={containerRef} className="w-full overflow-hidden">
            <motion.div
              className="flex items-center gap-16 py-2"
              animate={{
                x: [0, -1500],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 30,
                  ease: "linear",
                },
              }}
            >
              {duplicatedPartners.map((partner, index) => (
                <div
                  key={`${partner.id}-${index}`}
                  className="shrink-0 flex items-center justify-center"
                >
                  <img
                    src={partner.logoUrl}
                    alt={partner.name}
                    className="h-8 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all"
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustedByCarousel;
