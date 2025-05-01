
import React, { createContext, useContext, useEffect, useState } from "react";

export type LanguageOption = "en" | "es" | "fr" | "de" | "zh";

export type LanguageStrings = {
  [key: string]: string;
};

export type Translations = {
  [lang in LanguageOption]: LanguageStrings;
};

// Base translations (expand this for a real application)
const translations: Translations = {
  en: {
    home: "Home",
    about: "About",
    services: "Services",
    pricing: "Pricing",
    booking: "Book Appointment",
    contact: "Contact",
    signIn: "Sign In",
    signUp: "Sign Up",
    profile: "Profile",
    logout: "Log Out",
  },
  es: {
    home: "Inicio",
    about: "Acerca de",
    services: "Servicios",
    pricing: "Precios",
    booking: "Reservar Cita",
    contact: "Contacto",
    signIn: "Iniciar Sesión",
    signUp: "Registrarse",
    profile: "Perfil",
    logout: "Cerrar Sesión",
  },
  fr: {
    home: "Accueil",
    about: "À Propos",
    services: "Services",
    pricing: "Tarifs",
    booking: "Prendre Rendez-vous",
    contact: "Contact",
    signIn: "Se Connecter",
    signUp: "S'inscrire",
    profile: "Profil",
    logout: "Se Déconnecter",
  },
  de: {
    home: "Startseite",
    about: "Über uns",
    services: "Dienstleistungen",
    pricing: "Preise",
    booking: "Termin buchen",
    contact: "Kontakt",
    signIn: "Anmelden",
    signUp: "Registrieren",
    profile: "Profil",
    logout: "Abmelden",
  },
  zh: {
    home: "首页",
    about: "关于我们",
    services: "服务",
    pricing: "价格",
    booking: "预约",
    contact: "联系我们",
    signIn: "登录",
    signUp: "注册",
    profile: "个人资料",
    logout: "退出",
  },
};

export const languageNames: { [key in LanguageOption]: string } = {
  en: "English",
  es: "Español",
  fr: "Français",
  de: "Deutsch",
  zh: "中文",
};

interface LanguageContextType {
  language: LanguageOption;
  setLanguage: (language: LanguageOption) => void;
  t: (key: string) => string;
  availableLanguages: LanguageOption[];
  getLanguageName: (code: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Initialize with browser language or saved preference
  const [language, setLanguage] = useState<LanguageOption>(() => {
    const savedLanguage = localStorage.getItem("language") as LanguageOption;
    if (savedLanguage && Object.keys(translations).includes(savedLanguage)) {
      return savedLanguage;
    }
    
    // Default to English if no preference or browser language not supported
    const browserLang = navigator.language.split("-")[0] as LanguageOption;
    return Object.keys(translations).includes(browserLang) ? browserLang : "en";
  });

  const availableLanguages: LanguageOption[] = Object.keys(translations) as LanguageOption[];

  // Save language preference to localStorage
  useEffect(() => {
    localStorage.setItem("language", language);
    document.documentElement.lang = language;
  }, [language]);

  // Translation function
  const t = (key: string): string => {
    return translations[language][key] || translations.en[key] || key;
  };

  // Get language name from code
  const getLanguageName = (code: string): string => {
    return languageNames[code as LanguageOption] || code;
  };

  const value = {
    language,
    setLanguage,
    t,
    availableLanguages,
    getLanguageName,
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
