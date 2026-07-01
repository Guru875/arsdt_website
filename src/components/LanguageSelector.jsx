'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import styles from './Components.module.css';

export default function LanguageSelector() {
  const { language, setLanguage, languages } = useLanguage();

  return (
    <div className={styles.langSelectorWrapper}>
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className={styles.langSelect}
        aria-label="Select Language"
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.nativeLabel}
          </option>
        ))}
      </select>
    </div>
  );
}
