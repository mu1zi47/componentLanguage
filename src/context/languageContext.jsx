import React, { createContext, useContext, useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import en from "./langs/en.json";
import ru from "./langs/ru.json";

const LanguageContext = createContext();
const translations = { en, ru }; // All available languages

export const LanguageProvider = React.memo(({ children }) => {
  const queryClient = useQueryClient();
  const [language, setLanguageFunc] = useState("en"); // Default language

  useEffect(() => {
    const savedLang = localStorage.getItem("lang");
    if (savedLang) {
      setLanguageFunc(savedLang);
    }
  }, []);

  const setLanguage = (lang) => {
    if (lang !== localStorage.getItem("lang")) {
      localStorage.setItem("lang", lang);
      setLanguageFunc(lang);
      queryClient.invalidateQueries();
    }
  };

  const translate = (key) => translations[language]?.[key] || key;

  return (
    <LanguageContext.Provider value={{ translate, language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
});

export const useLanguage = () => useContext(LanguageContext);