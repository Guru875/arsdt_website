'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import translations from '@/data/translations.json';

const LanguageContext = createContext(undefined);

const SUPPORTED_LANGUAGES = [
  { code: 'en', label: 'English', nativeLabel: 'English' },
  { code: 'ta', label: 'Tamil', nativeLabel: 'தமிழ்' },
  { code: 'ml', label: 'Malayalam', nativeLabel: 'മലയാളം' },
];

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState('en');

  useEffect(() => {
    const saved = localStorage.getItem('arsdt-lang');
    if (saved && translations[saved]) {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = useCallback((lang) => {
    setLanguageState(lang);
    localStorage.setItem('arsdt-lang', lang);
  }, []);

  // Translate a key path like 'hero.title' from translations.json
  const t = useCallback((keyOrObj) => {
    // If it's an object with language keys, return the current language value
    if (typeof keyOrObj === 'object' && keyOrObj !== null) {
      return keyOrObj[language] || keyOrObj['en'] || '';
    }

    // If it's a string key path, navigate translations
    if (typeof keyOrObj === 'string') {
      const keys = keyOrObj.split('.');
      let result = translations[language];
      for (const key of keys) {
        if (result && result[key] !== undefined) {
          result = result[key];
        } else {
          // Fallback to English
          let fallback = translations['en'];
          for (const fk of keys) {
            if (fallback && fallback[fk] !== undefined) {
              fallback = fallback[fk];
            } else {
              return keyOrObj; // Return the key if not found
            }
          }
          return fallback;
        }
      }
      return result;
    }

    return '';
  }, [language]);

  return (
    <LanguageContext.Provider value={{
      language,
      setLanguage,
      t,
      languages: SUPPORTED_LANGUAGES,
    }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
