
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, LogOut, Settings, FileText, ChevronDown } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const UserMenu = () => {
  const { user, signOut, userRole } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("Signed out successfully");
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
      toast.error("Failed to sign out");
    }
  };

  // Not logged in state
  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <Button variant="outline" onClick={() => navigate("/sign-in")} className="hidden sm:flex">
          Sign In
        </Button>
        <Button onClick={() => navigate("/sign-up")} className="bg-vitality-400 hover:bg-vitality-500">
          Sign Up
        </Button>
      </div>
    );
  }

  // Get user initials for avatar fallback
  const getInitials = () => {
    if (!user.user_metadata?.full_name) {
      return user.email?.slice(0, 2).toUpperCase() || "U";
    }
    return user.user_metadata.full_name
      .split(" ")
      .map((n: string) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="p-0 h-10 relative" onClick={() => setIsOpen(!isOpen)}>
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.user_metadata?.avatar_url || ""} alt="Profile image" />
              <AvatarFallback className="bg-vitality-100 text-vitality-800">
                {getInitials()}
              </AvatarFallback>
            </Avatar>
            <span className="hidden md:inline-block text-sm font-medium">
              {user.user_metadata?.full_name || user.email?.split('@')[0]}
            </span>
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.user_metadata?.full_name || "User"}</p>
            <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to="/profile" className="cursor-pointer">
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>
        
        {userRole === "doctor" && (
          <DropdownMenuItem asChild>
            <Link to="/patients-list" className="cursor-pointer">
              <FileText className="mr-2 h-4 w-4" />
              <span>My Patients</span>
            </Link>
          </DropdownMenuItem>
        )}
        
        {userRole === "patient" && (
          <DropdownMenuItem asChild>
            <Link to="/exercise-plan" className="cursor-pointer">
              <FileText className="mr-2 h-4 w-4" />
              <span>My Exercises</span>
            </Link>
          </DropdownMenuItem>
        )}
        
        <DropdownMenuItem asChild>
          <Link to="/dashboard" className="cursor-pointer">
            <Settings className="mr-2 h-4 w-4" />
            <span>Dashboard</span>
          </Link>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-red-600 focus:text-red-600">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
