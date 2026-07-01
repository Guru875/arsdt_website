'use client';

import { useState, useRef, useEffect } from 'react';
import styles from './Components.module.css';

export default function BeforeAfterSlider() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let position = (x / rect.width) * 100;
    if (position < 0) position = 0;
    if (position > 100) position = 100;
    setSliderPosition(position);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchend', handleMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div
      ref={containerRef}
      className={styles.sliderContainer}
      onMouseDown={() => setIsDragging(true)}
      onTouchStart={() => setIsDragging(true)}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
    >
      {/* After image (Right Side / Background) */}
      <div className={styles.sliderImage} style={{ background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg viewBox="0 0 400 300" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style={{ padding: '40px' }}>
          {/* Main Air Conditioner Unit (Clean, Working) */}
          <rect x="60" y="80" width="280" height="90" rx="10" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="4" />
          <line x1="80" y1="140" x2="320" y2="140" stroke="#94a3b8" strokeWidth="3" />
          {/* LED display (Active, 21C Green) */}
          <rect x="270" y="100" width="40" height="20" rx="3" fill="#064e3b" />
          <text x="290" y="115" fontSize="12" fontFamily="monospace" fontWeight="bold" fill="#34d399" textAnchor="middle">21°C</text>
          {/* Cooling wave lines (Success, flowing blue waves) */}
          <path d="M100 190 Q120 220 140 190 T180 190 T220 190 T260 190 T300 190" fill="none" stroke="#60a5fa" strokeWidth="3" strokeLinecap="round" className="animate-pulse" />
          <path d="M90 205 Q110 235 130 205 T170 205 T210 205 T250 205 T290 205" fill="none" stroke="#93c5fd" strokeWidth="2" strokeLinecap="round" style={{ opacity: 0.7 }} />
          {/* Green Checkmark Badge */}
          <circle cx="200" cy="125" r="28" fill="#10b981" />
          <path d="M188 125l8 8 16-16" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          <text x="200" y="175" fontSize="12" fill="#94a3b8" textAnchor="middle" fontFamily="var(--font-heading)" fontWeight="600">REPAIRED & OPERATIONAL</text>
        </svg>
      </div>

      {/* Before image (Left Side / Overlay) */}
      <div
        className={styles.beforeImageWrapper}
        style={{ width: `${sliderPosition}%` }}
      >
        <div className={styles.sliderImage} style={{ width: containerRef.current ? containerRef.current.offsetWidth : '100%', height: '100%', background: 'linear-gradient(135deg, #1e1b4b 0%, #311005 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg viewBox="0 0 400 300" width="400" height="300" xmlns="http://www.w3.org/2000/svg" style={{ padding: '40px' }}>
            {/* Main Air Conditioner Unit (Dirty, Burnt) */}
            <rect x="60" y="80" width="280" height="90" rx="10" fill="#475569" stroke="#334155" strokeWidth="4" />
            <line x1="80" y1="140" x2="320" y2="140" stroke="#334155" strokeWidth="3" />
            {/* LED display (Dead/Blank) */}
            <rect x="270" y="100" width="40" height="20" rx="3" fill="#1e293b" />
            {/* Smoke / Sparks elements */}
            <path d="M120 70 Q110 50 130 30 T110 10" fill="none" stroke="#64748b" strokeWidth="3" strokeLinecap="round" />
            <path d="M150 75 Q145 60 160 45 T140 20" fill="none" stroke="#475569" strokeWidth="2" strokeLinecap="round" style={{ opacity: 0.5 }} />
            {/* Spark marks (yellow/red starburst) */}
            <path d="M190 120l5-5-5-5-5 5zm20 10l3-3-3-3-3 3z" fill="#f59e0b" />
            {/* Red Warning/Error Badge */}
            <circle cx="200" cy="125" r="28" fill="#ef4444" />
            <path d="M188 113h24l-12 24z" fill="white" />
            <text x="200" y="129" fontSize="14" fontWeight="bold" fill="#ef4444" textAnchor="middle">!</text>
            <text x="200" y="175" fontSize="12" fill="#94a3b8" textAnchor="middle" fontFamily="var(--font-heading)" fontWeight="600">BURNT PCB & OVERHEATED</text>
          </svg>
        </div>
      </div>

      {/* Labels */}
      <span className={`${styles.label} ${styles.beforeLabel}`}>Before</span>
      <span className={`${styles.label} ${styles.afterLabel}`}>After</span>

      {/* Handle */}
      <div className={styles.handle} style={{ left: `${sliderPosition}%` }}>
        <div className={styles.handleButton}>
          <svg fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
          </svg>
        </div>
      </div>
    </div>
  );
}
