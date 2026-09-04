"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type Lang = "lv" | "en";

type LangContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (lv: ReactNode, en: ReactNode) => ReactNode;
};

const LangContext = createContext<LangContextValue | null>(null);

export function LangProvider({
  children,
  initialLang,
}: {
  children: ReactNode;
  initialLang?: Lang;
}) {
  const [lang, setLangState] = useState<Lang>(initialLang ?? "lv");
  const t = (lv: ReactNode, en: ReactNode) => (lang === "en" ? en : lv);

  function setLang(next: Lang) {
    setLangState(next);
    if (typeof document !== "undefined") {
      document.cookie = `lang=${next}; path=/; max-age=31536000; samesite=lax`;
    }
  }

  return <LangContext.Provider value={{ lang, setLang, t }}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within a LangProvider");
  return ctx;
}
