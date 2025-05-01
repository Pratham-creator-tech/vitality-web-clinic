
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
    "app.header.home": "Home",
    "app.header.about": "About",
    "app.header.services": "Services",
    "app.header.pricing": "Pricing",
    "app.header.contact": "Contact",
    "app.header.signin": "Sign In",
    "app.header.booking": "Book Appointment",
    "app.header.profile": "Profile",
    "app.feature.bodymap": "Interactive Body Map",
    "app.feature.paintracker": "Pain Tracker",
    "app.feature.videolibrary": "Video Library",
    "app.cta.book": "Book Appointment",
    "app.home.hero.title": "Professional Physical Therapy & Rehabilitation Services",
    "app.home.hero.subtitle": "Our team of certified specialists provides personalized treatment plans to help you recover faster and improve your quality of life.",
    "app.menu.resources": "Resources",
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
    "app.header.home": "Inicio",
    "app.header.about": "Acerca de",
    "app.header.services": "Servicios",
    "app.header.pricing": "Precios",
    "app.header.contact": "Contacto",
    "app.header.signin": "Iniciar Sesión",
    "app.header.booking": "Reservar Cita",
    "app.header.profile": "Perfil",
    "app.feature.bodymap": "Mapa Corporal Interactivo",
    "app.feature.paintracker": "Seguimiento del Dolor",
    "app.feature.videolibrary": "Biblioteca de Videos",
    "app.cta.book": "Reservar Cita",
    "app.home.hero.title": "Servicios Profesionales de Fisioterapia y Rehabilitación",
    "app.home.hero.subtitle": "Nuestro equipo de especialistas certificados ofrece planes de tratamiento personalizados para ayudarte a recuperarte más rápido y mejorar tu calidad de vida.",
    "app.menu.resources": "Recursos",
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
    "app.header.home": "Accueil",
    "app.header.about": "À Propos",
    "app.header.services": "Services",
    "app.header.pricing": "Tarifs",
    "app.header.contact": "Contact",
    "app.header.signin": "Se Connecter",
    "app.header.booking": "Prendre Rendez-vous",
    "app.header.profile": "Profil",
    "app.feature.bodymap": "Carte Corporelle Interactive",
    "app.feature.paintracker": "Suivi de la Douleur",
    "app.feature.videolibrary": "Bibliothèque de Vidéos",
    "app.cta.book": "Prendre Rendez-vous",
    "app.home.hero.title": "Services Professionnels de Physiothérapie et de Réadaptation",
    "app.home.hero.subtitle": "Notre équipe de spécialistes certifiés propose des plans de traitement personnalisés pour vous aider à récupérer plus rapidement et améliorer votre qualité de vie.",
    "app.menu.resources": "Ressources",
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
    "app.header.home": "Startseite",
    "app.header.about": "Über uns",
    "app.header.services": "Dienstleistungen",
    "app.header.pricing": "Preise",
    "app.header.contact": "Kontakt",
    "app.header.signin": "Anmelden",
    "app.header.booking": "Termin buchen",
    "app.header.profile": "Profil",
    "app.feature.bodymap": "Interaktive Körperkarte",
    "app.feature.paintracker": "Schmerzprotokoll",
    "app.feature.videolibrary": "Videobibliothek",
    "app.cta.book": "Termin buchen",
    "app.home.hero.title": "Professionelle Physiotherapie und Rehabilitationsdienstleistungen",
    "app.home.hero.subtitle": "Unser Team aus zertifizierten Spezialisten erstellt personalisierte Behandlungspläne, um Ihnen zu helfen, schneller zu genesen und Ihre Lebensqualität zu verbessern.",
    "app.menu.resources": "Ressourcen",
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
    "app.header.home": "首页",
    "app.header.about": "关于我们",
    "app.header.services": "服务",
    "app.header.pricing": "价格",
    "app.header.contact": "联系我们",
    "app.header.signin": "登录",
    "app.header.booking": "预约",
    "app.header.profile": "个人资料",
    "app.feature.bodymap": "互动身体地图",
    "app.feature.paintracker": "疼痛追踪",
    "app.feature.videolibrary": "视频库",
    "app.cta.book": "预约",
    "app.home.hero.title": "专业物理治疗和康复服务",
    "app.home.hero.subtitle": "我们的认证专家团队提供个性化的治疗计划，帮助您更快恢复并提高生活质量。",
    "app.menu.resources": "资源",
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
    if (typeof window === 'undefined') return 'en';
    
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
    if (!translations[language]) return key;
    return translations[language][key] || key;
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
