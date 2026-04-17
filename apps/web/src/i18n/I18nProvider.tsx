import { createContext, ReactNode, useContext, useMemo, useState } from 'react';

import { Language, translations } from './translations';

const LANGUAGE_STORAGE_KEY = 'hirerank_language';

const detectInitialLanguage = (): Language => {
  const saved = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);

  if (saved === 'es' || saved === 'en') {
    return saved;
  }

  const browserLanguage = navigator.language?.toLowerCase() ?? 'en';
  return browserLanguage.startsWith('es') ? 'es' : 'en';
};

interface I18nContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (typeof translations)[Language];
}

const I18nContext = createContext<I18nContextValue | null>(null);

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(() => detectInitialLanguage());

  const setLanguage = (nextLanguage: Language) => {
    setLanguageState(nextLanguage);
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLanguage);
  };

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t: translations[language]
    }),
    [language]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useI18n = () => {
  const context = useContext(I18nContext);

  if (!context) {
    throw new Error('useI18n must be used within I18nProvider');
  }

  return context;
};