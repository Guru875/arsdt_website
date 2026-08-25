'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { useEnquiry } from '@/contexts/EnquiryContext';
import siteConfig from '@/data/site.json';
import { CourseIcon, CheckIcon } from './Icons';
import styles from './CourseCard.module.css';

export default function CourseCard({ course }) {
  const { t, language } = useLanguage();
  const { openEnquiryModal } = useEnquiry();
  const discount = Math.round(((course.price - course.offerPrice) / course.price) * 100);

  const titleStr = typeof course.title === 'object' ? (course.title[language] || course.title.en) : course.title;
  const callUrl = `tel:${siteConfig.phone}`;

  const handleWhatsAppClick = (e) => {
    e.preventDefault();
    openEnquiryModal(titleStr);
  };

  return (
    <div className={`glass-card ${styles.card}`}>
      <div className={styles.badgesWrapper}>
        {course.pcbTraining && (
          <span className={styles.pcbBadge}>
            <span className={styles.pcbIcon}>🔧</span>
            {t('courses.pcbIncluded')}
          </span>
        )}
        {course.popular && (
          <span className={styles.popularBadge}>{t('courses.popular')}</span>
        )}
        {course.combo && (
          <span className={styles.comboBadge}>{t('courses.combo')}</span>
        )}
      </div>
      
      <div className={styles.cardHeader} style={{ '--accent-color': course.color }}>
        <div className={styles.iconWrapper}>
          <CourseIcon name={course.icon} className={styles.icon} size={28} />
        </div>
        <h3 className={styles.title}>{t(course.title)}</h3>
      </div>

      <div className={styles.cardBody}>
        <p className={styles.desc}>{t(course.description)}</p>
        
        <div className={styles.metaRow}>
          <div className={styles.metaItem}>
            <span className={styles.metaIcon}>⏱️</span>
            <span>{t('courses.duration')}: <strong>{course.duration[language] || course.duration.en}</strong></span>
          </div>
        </div>
        
        <div className={styles.outcomesList}>
          {course.outcomes.slice(0, 3).map((outcome, idx) => (
            <div key={idx} className={styles.outcomeItem}>
              <span className={styles.checkWrapper}>
                <CheckIcon size={12} className={styles.checkIcon} />
              </span>
              <span className={styles.outcomeText}>{t(outcome)}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.cardFooter}>
        <div className={styles.priceContainer}>
          <span className={styles.originalPrice}>₹{course.price}</span>
          <div className={styles.offerPriceRow}>
            <span className={styles.offerPrice}>₹{course.offerPrice}</span>
            <span className={styles.discountBadge}>{discount}% {t('common.off') || 'OFF'}</span>
          </div>
        </div>

        <div className={styles.actionRow} style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
          <a
            href={callUrl}
            className="btn btn-secondary btn-sm"
            style={{ flex: 1, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}
          >
            📞 Call Now
          </a>
          <button
            type="button"
            onClick={handleWhatsAppClick}
            className="btn btn-accent btn-sm"
            style={{ flex: 1, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '4px', cursor: 'pointer' }}
          >
            💬 WhatsApp
          </button>
        </div>

        <div style={{ textAlign: 'center' }}>
          <Link
            href={`/course/${course.id}`}
            style={{ fontSize: '0.85rem', color: 'var(--primary, #3b82f6)', textDecoration: 'underline', fontWeight: '500' }}
          >
            View Full Course Syllabus & Details →
          </Link>
        </div>
      </div>
    </div>
  );
}
