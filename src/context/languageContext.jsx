import React, { createContext, useContext, useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import ru from "./langs/ru.json";
import uz from "./langs/uz.json";

const LanguageContext = createContext();
const translations = { ru, uz };

export const LanguageProvider = React.memo(({ children }) => {
  const queryClient = useQueryClient(); // Получаем queryClient
  const [language, setLanguageFunc] = useState("ru");

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
      queryClient.invalidateQueries(); // Обновляем все API-запросы
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