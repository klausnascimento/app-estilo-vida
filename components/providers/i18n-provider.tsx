"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { LOCALES, STORAGE_KEYS } from "@/lib/constants";
import { getDictionary } from "@/lib/i18n";
import { Locale } from "@/lib/types";

type I18nContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  dictionary: ReturnType<typeof getDictionary>;
};

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    if (typeof window === "undefined") {
      return "pt-BR";
    }

    const stored = window.localStorage.getItem(STORAGE_KEYS.locale) as Locale | null;
    return stored && LOCALES.some((item) => item.code === stored) ? stored : "pt-BR";
  });

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = (nextLocale: Locale) => {
    setLocaleState(nextLocale);
    document.documentElement.lang = nextLocale;
    window.localStorage.setItem(STORAGE_KEYS.locale, nextLocale);
  };

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      dictionary: getDictionary(locale),
    }),
    [locale],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);

  if (!context) {
    throw new Error("useI18n must be used within I18nProvider");
  }

  return context;
}
