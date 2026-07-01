'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import styles from './Components.module.css';

export default function CertificateCustomizer() {
  const [studentName, setStudentName] = useState('John Doe');
  const { t } = useLanguage();

  return (
    <div className={styles.certCustomizerCard}>
      <div className={styles.certInputWrapper}>
        <label htmlFor="studentNameInput" className={styles.certInputLabel}>
          {t('courses.certificate')} Preview: Type your name
        </label>
        <input
          id="studentNameInput"
          type="text"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value || 'Your Name')}
          className={styles.certInput}
          maxLength={30}
          placeholder="Enter your name here"
        />
      </div>

      <div className={styles.certPreviewFrame}>
        <div className={styles.certBgPattern}></div>
        
        {/* Certificate Header */}
        <div className={styles.certHeader}>
          <h4 className={styles.certInstName}>ARSDT INSTITUTE</h4>
          <span className={styles.certSubHeader}>APPLIANCE REPAIR SERVICE & DIAGNOSTICS TRAINING</span>
        </div>

        {/* Certificate Body */}
        <div className={styles.certBody}>
          <p className={styles.certTitle}>This is to certify that</p>
          <div className={styles.studentName}>{studentName}</div>
          <p className={styles.certText}>
            has successfully completed the professional hands-on course of training and diagnostics in
            household appliance repair mechanisms, electrical board safety, and business setup strategies.
          </p>
        </div>

        {/* Certificate Footer */}
        <div className={styles.certFooter}>
          <div className={styles.certSignBlock}>
            <span className={styles.certSignLabel}>DIRECTOR</span>
            <div className={styles.certSignLine}></div>
          </div>
          
          <div className={styles.certSeal}>
            <span>SEAL OF<br/>ARSDT</span>
          </div>

          <div className={styles.certSignBlock}>
            <span className={styles.certSignLabel}>INSTRUCTOR</span>
            <div className={styles.certSignLine}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
