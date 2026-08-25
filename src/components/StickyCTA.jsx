'use client';

import { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useEnquiry } from '@/contexts/EnquiryContext';
import siteConfig from '@/data/site.json';
import styles from './Components.module.css';

export default function StickyCTA({ course }) {
  const { t } = useLanguage();
  const { openEnquiryModal } = useEnquiry();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show after scrolling down 300px
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  const callUrl = `tel:${siteConfig.phone}`;
  const courseTitle = course ? t(course.title) : '';

  const handleWhatsAppClick = (e) => {
    e.preventDefault();
    openEnquiryModal(courseTitle);
  };

  return (
    <div className={styles.stickyBar}>
      <div className="container">
        <div className={styles.stickyContentOnlyButtons}>
          <a
            href={callUrl}
            className="btn btn-secondary stickyBtn"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              flex: '1',
              maxWidth: '220px',
              padding: '12px 24px',
              borderRadius: '12px'
            }}
          >
            📞 Call Now
          </a>
          <button
            type="button"
            onClick={handleWhatsAppClick}
            className="btn btn-accent stickyBtn"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              flex: '1',
              maxWidth: '220px',
              padding: '12px 24px',
              borderRadius: '12px',
              cursor: 'pointer'
            }}
          >
            💬 WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}
