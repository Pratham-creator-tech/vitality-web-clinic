
import { Moon, Sun, Laptop } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/context/ThemeContext";
import { motion } from "framer-motion";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-blue-900/20">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="border-blue-200">
        <DropdownMenuItem 
          onClick={() => setTheme("light")}
          className={`flex items-center gap-2 ${theme === "light" ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-300 font-medium" : ""}`}
        >
          <Sun className="h-4 w-4" />
          <span>Light</span>
          {theme === "light" && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="h-2 w-2 rounded-full bg-blue-500 ml-auto"
            />
          )}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme("dark")}
          className={`flex items-center gap-2 ${theme === "dark" ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-300 font-medium" : ""}`}
        >
          <Moon className="h-4 w-4" />
          <span>Dark</span>
          {theme === "dark" && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="h-2 w-2 rounded-full bg-blue-500 ml-auto"
            />
          )}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme("system")}
          className={`flex items-center gap-2 ${theme === "system" ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-300 font-medium" : ""}`}
        >
          <Laptop className="h-4 w-4" />
          <span>System</span>
          {theme === "system" && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="h-2 w-2 rounded-full bg-blue-500 ml-auto"
            />
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
