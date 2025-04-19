
import { motion } from "framer-motion";

interface BodyMapSVGProps {
  view: "front" | "back";
  onPartClick: (partId: string) => void;
}

const BodyMapSVG = ({ view, onPartClick }: BodyMapSVGProps) => {
  const parts = [
    { id: "neck", name: "Neck", frontPath: "M150,70 C130,80 170,80 150,95", backPath: "M150,70 C130,80 170,80 150,95" },
    { id: "shoulder", name: "Shoulders", frontPath: "M100,100 L150,95 L200,100", backPath: "M100,100 L150,95 L200,100" },
    { id: "back", name: "Back", frontPath: "M120,120 L150,200 L180,120", backPath: "M120,120 L150,200 L180,120" },
    { id: "elbow", name: "Elbows", frontPath: "M85,150 C75,160 95,155 90,170 M215,150 C225,160 205,155 210,170", backPath: "M85,150 C75,160 95,155 90,170 M215,150 C225,160 205,155 210,170" },
    { id: "wrist", name: "Wrists & Hands", frontPath: "M70,200 C65,210 80,210 75,220 M230,200 C235,210 220,210 225,220", backPath: "M70,200 C65,210 80,210 75,220 M230,200 C235,210 220,210 225,220" },
    { id: "hip", name: "Hips", frontPath: "M120,220 L150,230 L180,220", backPath: "M120,220 L150,230 L180,220" },
    { id: "knee", name: "Knees", frontPath: "M130,300 C140,310 160,310 170,300", backPath: "M130,300 C140,310 160,310 170,300" },
    { id: "ankle", name: "Ankles & Feet", frontPath: "M130,410 C140,420 160,420 170,410", backPath: "M130,410 C140,420 160,420 170,410" },
  ];

  return (
    <svg viewBox="0 0 300 600" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Body outline - simplified human figure */}
      <g>
        {view === "front" ? (
          <>
            {/* Front view body outline */}
            <path 
              d="M150,50 
                 C190,50 190,90 150,120
                 C110,90 110,50 150,50 Z" 
              fill="#f0f0f0" 
              stroke="#ccc" 
              strokeWidth="1"
            />
            <path 
              d="M150,120 
                 C200,120 200,220 170,250
                 C170,350 165,400 155,450
                 C145,400 130,350 130,250
                 C100,220 100,120 150,120 Z" 
              fill="#f0f0f0" 
              stroke="#ccc" 
              strokeWidth="1"
            />
            <path 
              d="M100,120 
                 C70,140 60,200 80,210
                 C80,210 95,220 95,220 Z" 
              fill="#f0f0f0" 
              stroke="#ccc" 
              strokeWidth="1"
            />
            <path 
              d="M200,120 
                 C230,140 240,200 220,210
                 C220,210 205,220 205,220 Z" 
              fill="#f0f0f0" 
              stroke="#ccc" 
              strokeWidth="1"
            />
            <path 
              d="M155,450 
                 C160,480 165,520 155,550
                 C145,520 140,480 145,450 Z" 
              fill="#f0f0f0" 
              stroke="#ccc" 
              strokeWidth="1"
            />
            <path 
              d="M155,550 
                 C160,555 165,570 155,580
                 C145,570 140,555 145,550 Z" 
              fill="#f0f0f0" 
              stroke="#ccc" 
              strokeWidth="1"
            />
          </>
        ) : (
          <>
            {/* Back view body outline */}
            <path 
              d="M150,50 
                 C190,50 190,90 150,120
                 C110,90 110,50 150,50 Z" 
              fill="#f0f0f0" 
              stroke="#ccc" 
              strokeWidth="1"
            />
            <path 
              d="M150,120 
                 C200,120 200,220 170,250
                 C170,350 165,400 155,450
                 C145,400 130,350 130,250
                 C100,220 100,120 150,120 Z" 
              fill="#f0f0f0" 
              stroke="#ccc" 
              strokeWidth="1"
            />
            <path 
              d="M100,120 
                 C70,140 60,200 80,210
                 C80,210 95,220 95,220 Z" 
              fill="#f0f0f0" 
              stroke="#ccc" 
              strokeWidth="1"
            />
            <path 
              d="M200,120 
                 C230,140 240,200 220,210
                 C220,210 205,220 205,220 Z" 
              fill="#f0f0f0" 
              stroke="#ccc" 
              strokeWidth="1"
            />
            <path 
              d="M155,450 
                 C160,480 165,520 155,550
                 C145,520 140,480 145,450 Z" 
              fill="#f0f0f0" 
              stroke="#ccc" 
              strokeWidth="1"
            />
            <path 
              d="M155,550 
                 C160,555 165,570 155,580
                 C145,570 140,555 145,550 Z" 
              fill="#f0f0f0" 
              stroke="#ccc" 
              strokeWidth="1"
            />
          </>
        )}
      </g>

      {/* Interactive body parts */}
      {parts.map((part) => (
        <motion.g 
          key={part.id}
          whileHover={{ scale: 1.05 }}
          onClick={() => onPartClick(part.id)}
          style={{ cursor: 'pointer' }}
        >
          <path 
            d={view === "front" ? part.frontPath : part.backPath} 
            fill="transparent"
            stroke="#9b87f5"
            strokeWidth="10"
            strokeLinecap="round"
            className="transition-colors duration-300 hover:stroke-vitality-400"
          />
          <path 
            d={view === "front" ? part.frontPath : part.backPath} 
            fill="transparent"
            stroke="transparent"
            strokeWidth="20"
            strokeLinecap="round"
            className="cursor-pointer"
          />
        </motion.g>
      ))}
    </svg>
  );
};

export default BodyMapSVG;
