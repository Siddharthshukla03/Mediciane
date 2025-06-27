
'use client';

import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import en from '@/locales/en.json';
import hi from '@/locales/hi.json';
import bn from '@/locales/bn.json';

interface LanguageContextType {
  locale: string;
  setLocale: (locale: string) => void;
  t: (key: string, params?: { [key: string]: string }) => string;
}

const translations: { [key: string]: any } = {
  en,
  hi,
  bn,
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [locale, setLocaleState] = useState('en');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const savedLocale = localStorage.getItem('locale');
    if (savedLocale && translations[savedLocale]) {
      setLocaleState(savedLocale);
    }
    setIsMounted(true);
  }, []);

  const setLocale = (newLocale: string) => {
    if (translations[newLocale]) {
      setLocaleState(newLocale);
      if (typeof window !== 'undefined') {
        localStorage.setItem('locale', newLocale);
      }
    }
  };

  const t = useCallback((key: string, params?: { [key: string]: string }): string => {
    // On server or initial client render, always use English to avoid hydration mismatch.
    const effectiveLocale = isMounted ? locale : 'en';
    const translationsForLocale = translations[effectiveLocale] || {};
    const fallbackTranslations = translations['en'] || {};

    // Direct lookup for flat keys, e.g., "sidebar.dashboard"
    let str = translationsForLocale[key] || fallbackTranslations[key] || key;
    
    if (params) {
      Object.keys(params).forEach(pKey => {
        str = str.replace(new RegExp(`\\{${pKey}\\}`, 'g'), params[pKey]);
      });
    }

    return str;
  }, [locale, isMounted]);

  const value = { locale, setLocale, t };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
};
