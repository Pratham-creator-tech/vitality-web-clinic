
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SheetClose } from "@/components/ui/sheet";
import { User } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface MobileNavAuthProps {
  onClose: () => void;
}

export const MobileNavAuth = ({ onClose }: MobileNavAuthProps) => {
  const { user, signOut } = useAuth();
  
  if (!user) {
    return (
      <div className="mb-4">
        <SheetClose asChild>
          <Button asChild variant="outline" size="sm" className="w-full justify-center">
            <Link to="/signin">Sign In / Sign Up</Link>
          </Button>
        </SheetClose>
      </div>
    );
  }
  
  return (
    <div className="pt-4 mt-4 border-t border-gray-100">
      <SheetClose asChild>
        <Link to="/profile" className="flex items-center py-2 px-3 rounded-md hover:bg-vitality-50">
          <User className="mr-2 h-5 w-5 text-vitality-600" />
          <span>My Profile</span>
        </Link>
      </SheetClose>
      <Button 
        variant="ghost" 
        className="w-full justify-start px-3 py-2 h-auto hover:bg-vitality-50 hover:text-vitality-600"
        onClick={() => {
          signOut();
          onClose();
        }}
      >
        Log Out
      </Button>
    </div>
  );
};
