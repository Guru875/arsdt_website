'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import styles from './DynamicPlayer.module.css';

export default function DynamicPlayer({ videoId, isLocked = false, onUnlock }) {
  const { t } = useLanguage();

  if (isLocked) {
    return (
      <div className={styles.lockedPlayer}>
        <div className={styles.lockOverlay}>
          <svg className={styles.lockIcon} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
          </svg>
          <h3 className={styles.lockTitle}>Lesson is Locked</h3>
          <p className={styles.lockDesc}>
            This video is part of our professional training catalog. Enroll in the course to get unlimited access to all modules, videos, study notes, and placement assistance.
          </p>
          <button onClick={onUnlock} className="btn btn-accent">
            🚀 {t('courses.enrollNow')}
          </button>
        </div>
      </div>
    );
  }

  // Use a fallback public educational youtube ID if none provided
  const activeVideoId = videoId || 'dQw4w9WgXcQ'; 

  return (
    <div className={styles.playerContainer}>
      <iframe
        src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=0&rel=0&modestbranding=1`}
        title="ARSDT Training Video"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className={styles.iframe}
      ></iframe>
    </div>
  );
}
