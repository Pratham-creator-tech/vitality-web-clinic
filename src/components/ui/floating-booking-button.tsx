
import { useState } from "react";
import { Calendar, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/ui/use-toast";

const FloatingBookingButton = () => {
  const [isVisible, setIsVisible] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();

  const handleBookingClick = () => {
    if (!user) {
      toast({
        title: "Registration Required",
        description: "Please register or sign in to book an appointment.",
        variant: "destructive",
      });
      navigate("/signup");
      return;
    }
    navigate("/booking");
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-6 z-50 flex items-center gap-3">
      <Button
        onClick={handleBookingClick}
        className="bg-vitality-600 hover:bg-vitality-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 px-6 py-3 rounded-full"
      >
        <Calendar className="h-5 w-5 mr-2" />
        Quick Book
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsVisible(false)}
        className="bg-white shadow-sm hover:bg-gray-50 rounded-full p-2"
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default FloatingBookingButton;
