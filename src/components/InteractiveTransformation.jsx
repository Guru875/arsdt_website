'use client';

import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import styles from './InteractiveTransformation.module.css';

export default function InteractiveTransformation() {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isHovered) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      return;
    }

    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % 3);
    }, 6000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isHovered, activeIndex]);

  const handleTabClick = (index) => {
    setActiveIndex(index);
  };

  const steps = [
    {
      tab: t('hero.visual.step1Tab'),
      title: t('hero.visual.step1Title'),
      desc: t('hero.visual.step1Desc'),
      class: 'Problem',
      themeClass: styles.borderProblem,
      textClass: styles.textProblem,
    },
    {
      tab: t('hero.visual.step2Tab'),
      title: t('hero.visual.step2Title'),
      desc: t('hero.visual.step2Desc'),
      class: 'Training',
      themeClass: styles.borderTraining,
      textClass: styles.textTraining,
    },
    {
      tab: t('hero.visual.step3Tab'),
      title: t('hero.visual.step3Title'),
      desc: t('hero.visual.step3Desc'),
      class: 'Success',
      themeClass: styles.borderSuccess,
      textClass: styles.textSuccess,
    },
  ];

  return (
    <div
      className={styles.cardContainer}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Navigation Tabs Header */}
      <div className={styles.tabsHeader}>
        {steps.map((step, idx) => (
          <button
            key={idx}
            className={`${styles.tabButton} ${activeIndex === idx ? styles.tabActive : ''}`}
            onClick={() => handleTabClick(idx)}
            aria-label={step.title}
          >
            <span className={styles.tabText}>{step.tab}</span>
            {activeIndex === idx && (
              <div className={`${styles.progressBar} ${styles.activeProgressBar}`} />
            )}
          </button>
        ))}
      </div>

      {/* Visual Content Stages */}
      <div className={styles.contentStage}>
        {/* STAGE 1: THE PROBLEM */}
        <div
          className={`${styles.visualWrapper} ${
            activeIndex === 0 ? styles.visualActive : styles.visualInactive
          }`}
          style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #311005 100%)' }}
        >
          <svg viewBox="0 0 400 300" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style={{ padding: '20px 20px 80px 20px' }}>
            {/* Background elements */}
            <circle cx="100" cy="150" r="90" fill="#f43f5e" opacity="0.05" />
            
            {/* Broken AC unit (Right side) */}
            <g transform="translate(180, 60)">
              <rect width="190" height="65" rx="8" fill="#475569" stroke="#1e293b" strokeWidth="3" />
              <line x1="15" y1="45" x2="175" y2="45" stroke="#1e293b" strokeWidth="2.5" />
              
              {/* LED display flashing error code */}
              <rect x="140" y="15" width="32" height="16" rx="3" fill="#0f172a" />
              <text x="156" y="27" fontSize="10" fontFamily="monospace" fontWeight="bold" fill="#f87171" textAnchor="middle" className={styles.animatedSpark}>
                EC
              </text>
              
              {/* Burnt/Damaged circuit board indicator hanging out slightly */}
              <rect x="25" y="62" width="40" height="8" fill="#1b2735" stroke="#ef4444" strokeWidth="1" />
              <circle cx="35" cy="66" r="1.5" fill="#f59e0b" />
              <circle cx="45" cy="66" r="1.5" fill="#f59e0b" />
              <circle cx="55" cy="66" r="1.5" fill="#f59e0b" />
              
              {/* Spark effects */}
              <path d="M45 55 l-6-10 h8 l-8-12 l12 14 h-8 z" fill="#f59e0b" className={styles.animatedSpark} />
              
              {/* Warning sign */}
              <circle cx="95" cy="30" r="15" fill="#ef4444" className={styles.animatedSpark} style={{ animationDuration: '1.2s' }} />
              <text x="95" y="35" fontSize="16" fontWeight="900" fill="#ffffff" textAnchor="middle">!</text>
            </g>

            {/* Smoke paths drifting upwards from broken AC */}
            <g transform="translate(200, 20)">
              <path d="M20 30 Q10 15 25 0 T10 -20" fill="none" stroke="#64748b" strokeWidth="3" strokeLinecap="round" className={styles.animatedSmoke} opacity="0.6" />
              <path d="M60 35 Q50 20 65 5 T50 -15" fill="none" stroke="#475569" strokeWidth="2" strokeLinecap="round" className={styles.animatedSmoke2} opacity="0.4" />
            </g>

            {/* Confused / Frustrated student (Left side) */}
            <g transform="translate(20, 50)">
              {/* Torso */}
              <path d="M50 220 Q80 150 110 220 Z" fill="#4338ca" />
              
              {/* Neck */}
              <rect x="75" y="145" width="10" height="15" fill="#fed7aa" />
              
              {/* Head */}
              <circle cx="80" cy="130" r="22" fill="#fed7aa" />
              
              {/* Hair */}
              <path d="M58 130 C58 105 102 105 102 130 C95 110 65 110 58 130 Z" fill="#1e293b" />
              
              {/* Sad/Confused Face features */}
              {/* Eyes */}
              <path d="M68 126 Q72 129 76 126" fill="none" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />
              <path d="M84 126 Q88 129 92 126" fill="none" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />
              {/* Eyebrows angled in confusion */}
              <line x1="66" y1="120" x2="74" y2="124" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />
              <line x1="92" y1="120" x2="84" y2="124" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />
              {/* Mouth */}
              <path d="M74 140 Q80 136 86 140" fill="none" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />
              
              {/* Hand scratching head */}
              <path d="M52 210 Q40 150 62 125" fill="none" stroke="#fed7aa" strokeWidth="5.5" strokeLinecap="round" />
              
              {/* Swirling confusion marks around head */}
              <path d="M72 90 Q85 80 75 75 T95 70" fill="none" stroke="#f43f5e" strokeWidth="2" strokeLinecap="round" className={styles.confusionSign} />
              <text x="105" y="95" fontSize="20" fontWeight="bold" fill="#f59e0b" className={styles.confusionSign} style={{ animationDelay: '0.5s' }}>?</text>
              <text x="50" y="105" fontSize="16" fontWeight="bold" fill="#ef4444" className={styles.confusionSign} style={{ animationDelay: '1s' }}>?</text>
            </g>
          </svg>
        </div>

        {/* STAGE 2: THE TRAINING */}
        <div
          className={`${styles.visualWrapper} ${
            activeIndex === 1 ? styles.visualActive : styles.visualInactive
          }`}
          style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' }}
        >
          <svg viewBox="0 0 400 300" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style={{ padding: '20px 20px 80px 20px' }}>
            {/* Background glowing circle */}
            <circle cx="200" cy="130" r="100" fill="#fbbf24" opacity="0.03" />

            {/* Diagnostic Lab / PCB Board */}
            <g transform="translate(50, 45)">
              {/* Outer PCB shell */}
              <rect width="300" height="170" rx="12" fill="#022c22" stroke="#0f766e" strokeWidth="3" />
              
              {/* Decorative grid pattern */}
              <path d="M 0 30 H 300 M 0 60 H 300 M 0 90 H 300 M 0 120 H 300 M 0 150 H 300 M 30 0 V 170 M 60 0 V 170 M 90 0 V 170 M 120 0 V 170 M 150 0 V 170 M 180 0 V 170 M 210 0 V 170 M 240 0 V 170 M 270 0 V 170" fill="none" stroke="#115e59" strokeWidth="0.5" opacity="0.4" />
              
              {/* Central microchip / IC */}
              <rect x="110" y="55" width="80" height="60" rx="6" fill="#1e293b" stroke="#475569" strokeWidth="2.5" />
              <circle cx="150" cy="85" r="14" fill="#fbbf24" opacity="0.1" />
              <rect x="142" y="77" width="16" height="16" rx="2" fill="#334155" />
              
              {/* IC Pins */}
              {/* Top pins */}
              <rect x="120" y="47" width="5" height="8" rx="1" fill="#94a3b8" />
              <rect x="135" y="47" width="5" height="8" rx="1" fill="#94a3b8" />
              <rect x="150" y="47" width="5" height="8" rx="1" fill="#94a3b8" />
              <rect x="165" y="47" width="5" height="8" rx="1" fill="#94a3b8" />
              <rect x="180" y="47" width="5" height="8" rx="1" fill="#94a3b8" />
              {/* Bottom pins */}
              <rect x="120" y="115" width="5" height="8" rx="1" fill="#94a3b8" />
              <rect x="135" y="115" width="5" height="8" rx="1" fill="#94a3b8" />
              <rect x="150" y="115" width="5" height="8" rx="1" fill="#94a3b8" />
              <rect x="165" y="115" width="5" height="8" rx="1" fill="#94a3b8" />
              <rect x="180" y="115" width="5" height="8" rx="1" fill="#94a3b8" />

              {/* Traces and circuits tracks */}
              <path d="M30 40 h50 v80 h30" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" className={styles.circuitTrack} />
              <path d="M270 130 h-50 v-70 h-30" fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" className={styles.circuitTrack} style={{ animationDelay: '0.75s' }} />
              
              {/* Capacitors and other electronics */}
              {/* Cap 1 */}
              <circle cx="60" cy="130" r="10" fill="#0284c7" stroke="#0369a1" strokeWidth="1.5" />
              <rect x="58" y="123" width="4" height="14" fill="#cbd5e1" />
              {/* Cap 2 */}
              <rect x="230" y="30" width="14" height="24" rx="2" fill="#b91c1c" />
              <line x1="237" y1="30" x2="237" y2="54" stroke="#cbd5e1" strokeWidth="2" />
              
              {/* Testing probe interactive spot */}
              <g transform="translate(190, 85)">
                {/* Multimeter probe needle tip */}
                <path d="M-40 -40 L0 0" stroke="#f43f5e" strokeWidth="3" strokeLinecap="round" />
                <path d="M-50 -50 L-38 -38" stroke="#ef4444" strokeWidth="6" strokeLinecap="round" />
                
                {/* Glowing ring test pulse */}
                <circle cx="0" cy="0" r="6" className={styles.probePulse} />
              </g>

              {/* Floating diagnostic overlay gear */}
              <g transform="translate(230, 85)" className={styles.floatingGear}>
                <rect x="5" y="5" width="45" height="45" rx="8" fill="rgba(15, 23, 42, 0.85)" stroke="#0f766e" strokeWidth="1.5" />
                <g className={styles.spinningGear}>
                  <path d="M27.5 17.5 A 5 5 0 1 0 27.5 27.5 A 5 5 0 1 0 27.5 17.5 M 27.5 14 L 27.5 16 M 27.5 29 L 27.5 31 M 20 22.5 L 22 22.5 M 33 22.5 L 35 22.5 M 22 17 L 23.5 18.5 M 31.5 26.5 L 33 28 M 22 28 L 23.5 26.5 M 31.5 18.5 L 33 17" fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" />
                </g>
                {/* Mini diagnostic check badge */}
                <circle cx="38" cy="38" r="6" fill="#10b981" />
                <path d="M35.5 38 l1.5 1.5 3 -3" fill="none" stroke="#fff" strokeWidth="1" />
              </g>
            </g>
          </svg>
        </div>

        {/* STAGE 3: THE SOLUTION */}
        <div
          className={`${styles.visualWrapper} ${
            activeIndex === 2 ? styles.visualActive : styles.visualInactive
          }`}
          style={{ background: 'linear-gradient(135deg, #064e3b 0%, #022c22 100%)' }}
        >
          <svg viewBox="0 0 400 300" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style={{ padding: '20px 20px 80px 20px' }}>
            {/* Background glowing circle */}
            <circle cx="300" cy="150" r="90" fill="#10b981" opacity="0.05" />

            {/* Clean Repaired AC Unit (Right side) */}
            <g transform="translate(180, 60)">
              <rect width="190" height="65" rx="8" fill="#f8fafc" stroke="#94a3b8" strokeWidth="3" />
              <line x1="15" y1="45" x2="175" y2="45" stroke="#cbd5e1" strokeWidth="2" />
              
              {/* Active LED screen showing comfortable temp */}
              <rect x="140" y="15" width="32" height="16" rx="3" fill="#064e3b" />
              <text x="156" y="27" fontSize="9" fontFamily="monospace" fontWeight="bold" fill="#34d399" textAnchor="middle">
                21°C
              </text>
              
              {/* Green checkmark success badge */}
              <circle cx="95" cy="30" r="14" fill="#10b981" />
              <path d="M89 30 l4 4 8 -8" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </g>

            {/* Flowing Cool Air Waves */}
            <g transform="translate(180, 135)">
              <path d="M20 10 Q40 25 70 15 T120 15 T170 10" fill="none" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" className={styles.coolingWave1} />
              <path d="M15 25 Q35 40 65 30 T115 30 T160 25" fill="none" stroke="#7dd3fc" strokeWidth="1.5" strokeLinecap="round" className={styles.coolingWave2} />
            </g>

            {/* Certified Expert Student (Left side) */}
            <g transform="translate(20, 50)">
              {/* Torso in professional Green/Gold academy uniform */}
              <path d="M50 220 Q80 150 110 220 Z" fill="#15803d" />
              
              {/* Collar (Gold academy lining) */}
              <path d="M72 170 L80 185 L88 170 Z" fill="#eab308" />
              
              {/* Neck */}
              <rect x="75" y="145" width="10" height="15" fill="#fed7aa" />
              
              {/* Head */}
              <circle cx="80" cy="130" r="22" fill="#fed7aa" />
              
              {/* Academy Service Cap */}
              <path d="M58 116 C62 104 98 104 102 116 Z" fill="#15803d" />
              <rect x="56" y="112" width="48" height="5" rx="1.5" fill="#eab308" />
              
              {/* Confident Smiling Face */}
              {/* Happy eyes */}
              <path d="M68 127 Q72 124 76 127" fill="none" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />
              <path d="M84 127 Q88 124 92 127" fill="none" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />
              {/* Friendly big smile */}
              <path d="M72 136 Q80 148 88 136" fill="none" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />
              
              {/* Thumbs up hand */}
              <path d="M102 195 Q118 190 112 180 Q106 175 100 182" fill="none" stroke="#fed7aa" strokeWidth="5.5" strokeLinecap="round" />
              <circle cx="112" cy="180" r="3" fill="#fed7aa" /> {/* Thumb */}
            </g>

            {/* Glowing Academy Certificate (Floating top-left) */}
            <g transform="translate(15, 25)" className={styles.floatingCert}>
              {/* Shadow/Glow overlay */}
              <rect x="1" y="1" width="78" height="58" rx="4" fill="#fbbf24" opacity="0.15" filter="blur(4px)" />
              
              {/* Certificate structure */}
              <rect width="80" height="60" rx="3" fill="#ffffff" stroke="#eab308" strokeWidth="2" />
              <rect x="4" y="4" width="72" height="52" fill="none" stroke="#fef08a" strokeWidth="1" />
              
              {/* Header scroll decor */}
              <path d="M25 12 h30" stroke="#15803d" strokeWidth="1.5" />
              
              {/* Mini lines representing certificate print */}
              <line x1="12" y1="20" x2="68" y2="20" stroke="#94a3b8" strokeWidth="1.5" />
              <line x1="20" y1="28" x2="60" y2="28" stroke="#94a3b8" strokeWidth="1" />
              <line x1="16" y1="35" x2="64" y2="35" stroke="#94a3b8" strokeWidth="1" />
              
              {/* Gold seal */}
              <circle cx="62" cy="46" r="7" fill="#fbbf24" />
              <path d="M59 46 l2 2 l4 -4" stroke="#ffffff" strokeWidth="1.5" fill="none" strokeLinecap="round" />
              
              {/* Floating success stars */}
              <polygon points="90,12 92,16 96,17 92,18 90,22 88,18 84,17 88,16" fill="#fbbf24" />
              <polygon points="5,-5 7,-1 11,0 7,1 5,5 3,1 -1,0 3,-1" fill="#fbbf24" transform="scale(0.7)" />
            </g>
          </svg>
        </div>
      </div>

      {/* Dynamic Descriptive panel at the bottom */}
      <div className={`${styles.descriptionPanel} ${steps[activeIndex].themeClass}`}>
        <div className={`${styles.descriptionTitle} ${steps[activeIndex].textClass}`}>
          {steps[activeIndex].class === 'Problem' && '⚠️ '}
          {steps[activeIndex].class === 'Training' && '⚡ '}
          {steps[activeIndex].class === 'Success' && '🎓 '}
          {steps[activeIndex].title}
        </div>
        <p className={styles.descriptionDesc}>{steps[activeIndex].desc}</p>
      </div>
    </div>
  );
}
