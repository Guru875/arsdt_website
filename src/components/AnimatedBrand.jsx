import React, { useState, useEffect } from 'react';
import styles from './AnimatedBrand.module.css';

export default function AnimatedBrand() {
  const [isCycling, setIsCycling] = useState(false);

  useEffect(() => {
    // Wait for the initial load animations to finish,
    // then schedule the cycling animation every 15 seconds.
    const interval = setInterval(() => {
      setIsCycling(true);
      // Remove class after the duration of the cycle animation (1.2s)
      const timer = setTimeout(() => {
        setIsCycling(false);
      }, 1200);
      return () => clearTimeout(timer);
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const cycleClass = isCycling ? styles.cycleActive : '';

  return (
    <span className={styles.brandContainer} aria-label="ARSDT">
      {/* Letter A with Cap */}
      <span className={`${styles.letterWrapper} ${cycleClass} ${styles.letterA}`} style={{ '--index': 0 }}>
        <span className={styles.letter}>
          A
          <span className={`${styles.capWrapper} ${cycleClass}`}>
            <svg
              viewBox="0 0 32 32"
              className={styles.capSvg}
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Hat Dome */}
              <path
                d="M 6 18 C 6 8, 26 8, 26 18 Z"
                fill="var(--secondary)"
              />
              {/* Inner highlight for 3D effect */}
              <path
                d="M 7 17 C 7 10, 25 10, 25 17"
                stroke="rgba(255, 255, 255, 0.25)"
                strokeWidth="1"
                fill="none"
              />
              {/* Hat Top Ridge */}
              <path
                d="M 12 11 Q 16 6.5, 20 11"
                fill="none"
                stroke="var(--secondaryLight)"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              {/* Hat Brim */}
              <path
                d="M 3 18 C 3 16.5, 29 16.5, 29 18 C 29 20, 3 20, 3 18 Z"
                fill="var(--secondary)"
              />
              {/* Subtle shadow under the brim */}
              <path
                d="M 4 19 C 10 20.5, 22 20.5, 28 19"
                stroke="rgba(0, 0, 0, 0.2)"
                strokeWidth="1.2"
                fill="none"
              />
              {/* Emblem circle */}
              <circle cx="16" cy="14.5" r="2.2" fill="var(--surface)" />
              {/* Wrench symbol in emblem */}
              <path
                d="M 14.8 14.5 L 17.2 14.5 M 16 13.3 L 16 15.7"
                stroke="var(--secondary)"
                strokeWidth="0.8"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </span>
      </span>

      {/* Letter R */}
      <span className={`${styles.letterWrapper} ${cycleClass}`} style={{ '--index': 1 }}>
        <span className={styles.letter}>R</span>
      </span>

      {/* Letter S */}
      <span className={`${styles.letterWrapper} ${cycleClass}`} style={{ '--index': 2 }}>
        <span className={styles.letter}>S</span>
      </span>

      {/* Letter D */}
      <span className={`${styles.letterWrapper} ${cycleClass}`} style={{ '--index': 3 }}>
        <span className={styles.letter}>D</span>
      </span>

      {/* Letter T with Wrench Tool */}
      <span className={`${styles.letterWrapper} ${cycleClass} ${styles.letterT}`} style={{ '--index': 4 }}>
        <span className={styles.letter}>
          T
          <span className={`${styles.toolWrapper} ${cycleClass}`}>
            <svg
              viewBox="0 0 24 24"
              className={styles.toolSvg}
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Combination Wrench Path */}
              <path
                d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.77 3.77Z"
                fill="var(--secondary)"
                stroke="var(--secondary)"
                strokeWidth="0.5"
              />
              {/* High-quality highlight on handle */}
              <path
                d="M8.5 15.5 L12.5 11.5"
                stroke="var(--secondaryLight)"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </span>
      </span>
    </span>
  );
}
