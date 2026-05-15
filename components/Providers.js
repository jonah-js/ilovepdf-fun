"use client";
// components/Providers.js
// Wraps the app with language state. Must be a client component.

import { createContext, useContext, useState, useEffect } from "react";
import { translations, defaultLang, supportedLangs } from "@/lib/i18n";

const LangContext = createContext(null);

export function Providers({ children }) {
  const [lang, setLang] = useState(defaultLang);

  // Persist language choice across pages
  useEffect(() => {
    const saved = localStorage.getItem("lang");
    if (saved && supportedLangs.includes(saved)) setLang(saved);
  }, []);

  function switchLang(l) {
    setLang(l);
    localStorage.setItem("lang", l);
  }

  const t = (key) => translations[lang]?.[key] ?? translations[defaultLang][key] ?? key;

  return (
    <LangContext.Provider value={{ lang, switchLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

/** Hook — use anywhere in client components: const { t, lang, switchLang } = useLang() */
export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used inside <Providers>");
  return ctx;
}
