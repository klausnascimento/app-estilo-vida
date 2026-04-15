'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { ptBR } from '../utils/dictionaries/pt';
import { enUS } from '../utils/dictionaries/en';
import { esES } from '../utils/dictionaries/es';
import { Language } from '../types';

type Dictionary = typeof ptBR;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Dictionary;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const dictionaries: Record<Language, Dictionary> = {
  PT_BR: ptBR,
  EN: enUS,
  ES: esES,
};

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<Language>('PT_BR');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Carregar preferencia inicial (simulado)
    fetch('/api/preferences')
      .then((res) => res.json())
      .then((data) => {
        if (data?.success && data?.data?.language) {
          setLanguage(data.data.language as Language);
        }
      })
      .catch(() => {})
      .finally(() => setMounted(true));
  }, []);

  const handleLanguageChange = async (lang: Language) => {
    setLanguage(lang);
    try {
      await fetch('/api/preferences', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ language: lang }),
      });
    } catch (e) {}
  };

  if (!mounted) return null; // Avoid hydration mismatch

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleLanguageChange, t: dictionaries[language] }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useTranslation must be used within LanguageProvider');
  return ctx;
};
