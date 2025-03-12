import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enTranslation from "../locales/en.json";
import frTranslation from "../locales/fr.json";
import LanguageDetector from "i18next-browser-languagedetector";

i18n.use(LanguageDetector);

// Configuration
i18n.use(initReactI18next).init({
  resources: {
    en: { translation: enTranslation },
    fr: { translation: frTranslation },
  },
  lng: "fr", // Langue par défaut
  fallbackLng: "en", // Langue de secours
  interpolation: { escapeValue: false },
});

export default i18n;