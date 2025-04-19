
import { Link } from "react-router-dom";

export const NavLogo = () => {
  return (
    <Link to="/" className="flex items-center space-x-2">
      <span className="text-vitality-700 font-bold text-2xl tracking-tight uppercase">
        YASHA'S VITALITY PHYSIO
      </span>
    </Link>
  );
};
