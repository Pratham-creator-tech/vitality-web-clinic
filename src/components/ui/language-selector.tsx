
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import { useLanguage, LanguageOption, languageNames } from "@/context/LanguageContext";
import { motion } from "framer-motion";

export const LanguageSelector = () => {
  const { language, setLanguage, availableLanguages, getLanguageName } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Globe className="h-5 w-5" />
          <motion.span
            key={language}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute -bottom-1 -right-1 text-[10px] font-bold bg-vitality-300 text-white rounded-full w-4 h-4 flex items-center justify-center"
          >
            {language.toUpperCase()}
          </motion.span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {availableLanguages.map((lang) => (
          <DropdownMenuItem
            key={lang}
            onClick={() => setLanguage(lang as LanguageOption)}
            className={`flex items-center gap-2 ${
              language === lang ? "bg-vitality-50 text-vitality-700 font-medium" : ""
            }`}
          >
            <span className="text-sm">{getLanguageName(lang)}</span>
            {language === lang && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="h-2 w-2 rounded-full bg-vitality-400"
              />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
