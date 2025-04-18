
import { Link } from "react-router-dom";

export const NavLogo = () => {
  return (
    <Link to="/" className="flex items-center space-x-2">
      <div className="bg-white p-2 rounded-lg">
        <img 
          src="/lovable-uploads/fb7174ec-5732-4824-ba20-36eb209037b8.png" 
          alt="Vitality Physio Logo" 
          className="h-8 object-contain"
        />
      </div>
      <span className="text-vitality-700 font-bold text-xl tracking-tight">Vitality Physio</span>
    </Link>
  );
};
