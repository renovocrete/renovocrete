import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { es as esDict } from "./es";

export type Lang = "en" | "fr" | "es";

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  /** t(french, english, spanish?) — English is the default site language. */
  t: (fr: string, en: string, esText?: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  setLang: () => {},
  t: (_fr, en) => en,
});

const STORAGE_KEY = "rc-lang";

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Lang>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === "fr" || stored === "es" || stored === "en" ? (stored as Lang) : "en";
  });

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem(STORAGE_KEY, l);
    document.documentElement.lang = l;
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const t = (fr: string, en: string, esText?: string) => {
    if (lang === "fr") return fr;
    if (lang === "es") return esText ?? esDict[en] ?? en;
    return en;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
