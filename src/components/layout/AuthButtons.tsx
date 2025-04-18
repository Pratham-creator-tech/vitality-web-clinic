
import { Link } from "react-router-dom";
import { LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";

export const AuthButtons = () => {
  return (
    <div className="flex items-center ml-6 space-x-3">
      <Button variant="outline" asChild size="sm" className="border-vitality-400 text-vitality-400 hover:bg-vitality-50">
        <Link to="/signin"><LogIn size={14} className="mr-1" /> Sign In</Link>
      </Button>
      <Button asChild size="sm" className="bg-accent hover:bg-accent/90">
        <Link to="/signup">Sign Up</Link>
      </Button>
      <Button asChild size="sm" className="bg-vitality-400 hover:bg-vitality-500">
        <Link to="/booking">Book Now</Link>
      </Button>
    </div>
  );
};
