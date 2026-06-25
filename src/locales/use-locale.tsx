"use client";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import enCommon from "./en/common.json";
import enSkills from "./en/skills.json";
import enExperience from "./en/experience.json";
import enProjects from "./en/projects.json";
import enSeo from "./en/seo.json";
import enAbout from "./en/about.json";
import viCommon from "./vi/common.json";
import viSkills from "./vi/skills.json";
import viExperience from "./vi/experience.json";
import viProjects from "./vi/projects.json";
import viSeo from "./vi/seo.json";
import viAbout from "./vi/about.json";

const translations = {
  en: { common: enCommon, skills: enSkills, experience: enExperience, projects: enProjects, seo: enSeo, about: enAbout },
  vi: { common: viCommon, skills: viSkills, experience: viExperience, projects: viProjects, seo: viSeo, about: viAbout },
};

type Namespace = keyof (typeof translations)["en"];

type LocaleContextType = {
  locale: string;
  setLocale: (locale: string) => void;
  t: (ns: Namespace, key?: string) => any;
};

const LocaleContext = createContext<LocaleContextType>({
  locale: "en",
  setLocale: () => {},
  t: () => "",
});

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState("en");

  useEffect(() => {
    try {
      const stored = localStorage.getItem("locale");
      if (stored === "vi" || stored === "en") setLocaleState(stored);
    } catch (e) {
      console.warn("Failed to read locale from localStorage:", e);
    }
  }, []);

  const setLocale = useCallback((l: string) => {
    setLocaleState(l);
    try {
      localStorage.setItem("locale", l);
    } catch (e) {
      console.warn("Failed to save locale to localStorage:", e);
    }
  }, []);

  const t = useCallback(
    (ns: Namespace, key?: string) => {
      const nsData = (translations as any)[locale]?.[ns];
      if (!nsData) return "";
      if (!key) return nsData;
      const keys = key.split(".");
      let value = nsData;
      for (const k of keys) {
        value = value?.[k];
      }
      return value ?? "";
    },
    [locale],
  );

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  return useContext(LocaleContext);
}
