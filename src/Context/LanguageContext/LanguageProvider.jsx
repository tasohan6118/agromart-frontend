import React, { useEffect, useMemo, useState } from 'react';
import { LanguageContext } from './LanguageContext';
const STORAGE_KEY = 'agromart-language';

const getInitialLanguage = () => {
  if (typeof window === 'undefined') {
    return 'en';
  }

  const savedLanguage = window.localStorage.getItem(STORAGE_KEY);

  if (savedLanguage === 'bn' || savedLanguage === 'en') {
    return savedLanguage;
  }

  const browserLanguage = window.navigator.language?.toLowerCase() || '';
  return browserLanguage.startsWith('bn') ? 'bn' : 'en';
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(getInitialLanguage);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, language);
    document.documentElement.lang = language;
    document.documentElement.dir = 'ltr';
  }, [language]);

  const value = useMemo(() => ({
    language,
    isBangla: language === 'bn',
    setLanguage,
    toggleLanguage: () => setLanguage((current) => (current === 'en' ? 'bn' : 'en')),
  }), [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};
