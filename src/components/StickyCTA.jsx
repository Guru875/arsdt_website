'use client';

import { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import siteConfig from '@/data/site.json';
import styles from './Components.module.css';

export default function StickyCTA({ course }) {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 14, seconds: 35 });

  useEffect(() => {
    // Show after scrolling down 400px
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Countdown timer logic
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 2, minutes: 14, seconds: 35 }; // Reset timer
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  const titleStr = t(course.title);
  const whatsappMsg = encodeURIComponent(`Hi! I want to enroll in the "${titleStr}" course at ARSDT.`);
  const whatsappUrl = `https://wa.me/${siteConfig.whatsapp}?text=${whatsappMsg}`;
  const callUrl = `tel:${siteConfig.phone}`;

  return (
    <div className={styles.stickyBar}>
      <div className="container">
        <div className={styles.stickyContent}>
          <div className={styles.stickyMeta}>
            <div className={styles.stickyPrice}>
              <span className={styles.stickyCurrentPrice}>₹{course.offerPrice}</span>
              <span className={styles.stickyOriginalPrice}>₹{course.price}</span>
              <span className={styles.stickyBadge}>
                {Math.round(((course.price - course.offerPrice) / course.price) * 100)}% {t('common.off')}
              </span>
            </div>
            <div className={styles.stickyTimer}>
              ⚠️ {t('cta.limitedOffer')}: {timeLeft.hours.toString().padStart(2, '0')}:
              {timeLeft.minutes.toString().padStart(2, '0')}:{timeLeft.seconds.toString().padStart(2, '0')}
            </div>
          </div>

          <div className={styles.stickyActions}>
            <a href={callUrl} className="btn btn-secondary stickyBtn">
              📞 {t('contact.callNow')}
            </a>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-accent stickyBtn">
              💬 WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
