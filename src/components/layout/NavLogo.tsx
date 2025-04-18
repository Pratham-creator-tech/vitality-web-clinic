
import { Link } from "react-router-dom";

export const NavLogo = () => {
  return (
    <Link to="/" className="flex items-center space-x-2">
      <img 
        src="/lovable-uploads/fb7174ec-5732-4824-ba20-36eb209037b8.png" 
        alt="YASHA Logo" 
        className="h-12 object-contain filter brightness-90 saturate-150 contrast-125 hue-rotate-15"
      />
      <span className="text-vitality-700 font-bold text-xl tracking-tight">YASHA</span>
    </Link>
  );
};
