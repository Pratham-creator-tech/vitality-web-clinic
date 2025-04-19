
import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";

// Dictionary of translations
export type LanguageOption = "en" | "es" | "fr" | "zh" | "hi";

type LanguageContextType = {
  language: LanguageOption;
  setLanguage: (lang: LanguageOption) => void;
  t: (key: string) => string;
  getLanguageName: (code: LanguageOption) => string;
  availableLanguages: LanguageOption[];
};

export const availableLanguages: LanguageOption[] = ["en", "es", "fr", "zh", "hi"];

export const languageNames: Record<LanguageOption, string> = {
  en: "English",
  es: "Español",
  fr: "Français",
  zh: "中文",
  hi: "हिन्दी",
};

// Create context
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Dictionary of translations
type Translations = Record<LanguageOption, Record<string, string>>;

const translations: Translations = {
  en: {
    "app.header.home": "Home",
    "app.header.about": "About",
    "app.header.services": "Services",
    "app.header.pricing": "Pricing",
    "app.header.booking": "Booking",
    "app.header.contact": "Contact",
    "app.header.signin": "Sign In",
    "app.header.signup": "Sign Up",
    "app.header.profile": "Profile",
    "app.header.faq": "FAQ",
    "app.header.blog": "Blog",
    "app.feature.bodymap": "Interactive Body Map",
    "app.feature.paintracker": "Pain Tracker",
    "app.feature.videolibrary": "Video Library",
    "app.feature.tour": "360° Tour",
    "app.footer.allrights": "All rights reserved",
    "app.footer.privacy": "Privacy Policy",
    "app.footer.terms": "Terms of Service",
    "app.cta.book": "Book Now",
    "app.cta.learnmore": "Learn More",
    "app.home.hero.title": "Expert Physiotherapy for Better Living",
    "app.home.hero.subtitle": "Specialized care for pain relief, rehabilitation, and improved mobility",
    "app.services.title": "Our Services",
    "app.services.subtitle": "Comprehensive physiotherapy and wellness services tailored to your unique needs",
  },
  es: {
    "app.header.home": "Inicio",
    "app.header.about": "Acerca de",
    "app.header.services": "Servicios",
    "app.header.pricing": "Precios",
    "app.header.booking": "Reservas",
    "app.header.contact": "Contacto",
    "app.header.signin": "Iniciar Sesión",
    "app.header.signup": "Registrarse",
    "app.header.profile": "Perfil",
    "app.header.faq": "Preguntas Frecuentes",
    "app.header.blog": "Blog",
    "app.feature.bodymap": "Mapa Corporal Interactivo",
    "app.feature.paintracker": "Seguimiento del Dolor",
    "app.feature.videolibrary": "Biblioteca de Videos",
    "app.feature.tour": "Tour 360°",
    "app.footer.allrights": "Todos los derechos reservados",
    "app.footer.privacy": "Política de Privacidad",
    "app.footer.terms": "Términos de Servicio",
    "app.cta.book": "Reservar Ahora",
    "app.cta.learnmore": "Saber Más",
    "app.home.hero.title": "Fisioterapia Experta para una Mejor Vida",
    "app.home.hero.subtitle": "Atención especializada para alivio del dolor, rehabilitación y mejora de la movilidad",
    "app.services.title": "Nuestros Servicios",
    "app.services.subtitle": "Servicios integrales de fisioterapia y bienestar adaptados a sus necesidades",
  },
  fr: {
    "app.header.home": "Accueil",
    "app.header.about": "À Propos",
    "app.header.services": "Services",
    "app.header.pricing": "Tarifs",
    "app.header.booking": "Réservation",
    "app.header.contact": "Contact",
    "app.header.signin": "Connexion",
    "app.header.signup": "S'inscrire",
    "app.header.profile": "Profil",
    "app.header.faq": "FAQ",
    "app.header.blog": "Blog",
    "app.feature.bodymap": "Carte Corporelle Interactive",
    "app.feature.paintracker": "Suivi de la Douleur",
    "app.feature.videolibrary": "Bibliothèque Vidéo",
    "app.feature.tour": "Visite 360°",
    "app.footer.allrights": "Tous droits réservés",
    "app.footer.privacy": "Politique de Confidentialité",
    "app.footer.terms": "Conditions d'Utilisation",
    "app.cta.book": "Réserver Maintenant",
    "app.cta.learnmore": "En Savoir Plus",
    "app.home.hero.title": "Physiothérapie Experte pour une Vie Meilleure",
    "app.home.hero.subtitle": "Soins spécialisés pour le soulagement de la douleur, la rééducation et l'amélioration de la mobilité",
    "app.services.title": "Nos Services",
    "app.services.subtitle": "Services complets de physiothérapie et de bien-être adaptés à vos besoins",
  },
  zh: {
    "app.header.home": "首页",
    "app.header.about": "关于我们",
    "app.header.services": "服务",
    "app.header.pricing": "价格",
    "app.header.booking": "预约",
    "app.header.contact": "联系我们",
    "app.header.signin": "登录",
    "app.header.signup": "注册",
    "app.header.profile": "个人资料",
    "app.header.faq": "常见问题",
    "app.header.blog": "博客",
    "app.feature.bodymap": "交互式身体地图",
    "app.feature.paintracker": "疼痛追踪器",
    "app.feature.videolibrary": "视频库",
    "app.feature.tour": "360°全景游",
    "app.footer.allrights": "版权所有",
    "app.footer.privacy": "隐私政策",
    "app.footer.terms": "服务条款",
    "app.cta.book": "立即预约",
    "app.cta.learnmore": "了解更多",
    "app.home.hero.title": "专业理疗，改善生活",
    "app.home.hero.subtitle": "专业护理，缓解疼痛，康复治疗，提高活动能力",
    "app.services.title": "我们的服务",
    "app.services.subtitle": "全面的理疗和健康服务，满足您的独特需求",
  },
  hi: {
    "app.header.home": "होम",
    "app.header.about": "हमारे बारे में",
    "app.header.services": "सेवाएं",
    "app.header.pricing": "मूल्य निर्धारण",
    "app.header.booking": "बुकिंग",
    "app.header.contact": "संपर्क करें",
    "app.header.signin": "साइन इन",
    "app.header.signup": "साइन अप",
    "app.header.profile": "प्रोफाइल",
    "app.header.faq": "अक्सर पूछे जाने वाले प्रश्न",
    "app.header.blog": "ब्लॉग",
    "app.feature.bodymap": "इंटरैक्टिव बॉडी मैप",
    "app.feature.paintracker": "दर्द ट्रैकर",
    "app.feature.videolibrary": "वीडियो लाइब्रेरी",
    "app.feature.tour": "360° टूर",
    "app.footer.allrights": "सर्वाधिकार सुरक्षित",
    "app.footer.privacy": "गोपनीयता नीति",
    "app.footer.terms": "सेवा की शर्तें",
    "app.cta.book": "अभी बुक करें",
    "app.cta.learnmore": "और जानें",
    "app.home.hero.title": "बेहतर जीवन के लिए विशेषज्ञ फिजियोथेरेपी",
    "app.home.hero.subtitle": "दर्द से राहत, पुनर्वास और बेहतर गतिशीलता के लिए विशेष देखभाल",
    "app.services.title": "हमारी सेवाएं",
    "app.services.subtitle": "आपकी विशिष्ट ज़रूरतों के अनुरूप व्यापक फिजियोथेरेपी और कल्याण सेवाएं",
  },
};

interface LanguageProviderProps {
  children: ReactNode;
}

// Provider component
export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  // Read initial language from localStorage or use browser language
  const detectInitialLanguage = (): LanguageOption => {
    const savedLanguage = localStorage.getItem("language") as LanguageOption;
    if (savedLanguage && availableLanguages.includes(savedLanguage)) {
      return savedLanguage;
    }
    
    // Try to detect browser language
    const browserLang = navigator.language.split("-")[0] as LanguageOption;
    if (availableLanguages.includes(browserLang)) {
      return browserLang;
    }
    
    return "en"; // Default to English
  };
  
  const [language, setLanguageState] = useState<LanguageOption>(detectInitialLanguage());

  // Translate function
  const t = (key: string): string => {
    if (!translations[language]) {
      return translations.en[key] || key;
    }
    return translations[language][key] || translations.en[key] || key;
  };

  // Get language name
  const getLanguageName = (code: LanguageOption): string => {
    return languageNames[code] || code;
  };

  // Set language and save to localStorage
  const setLanguage = (lang: LanguageOption) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
    document.documentElement.lang = lang;
  };

  // Update html lang attribute when language changes
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const value = {
    language,
    setLanguage,
    t,
    getLanguageName,
    availableLanguages,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

// Hook to use the language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
