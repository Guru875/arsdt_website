'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { CourseIcon, ClockIcon, CheckIcon } from './Icons';
import styles from './CourseCard.module.css';

export default function CourseCard({ course }) {
  const { t, language } = useLanguage();
  const discount = Math.round(((course.price - course.offerPrice) / course.price) * 100);

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
            <span className={styles.discountBadge}>{discount}% {t('common.off')}</span>
          </div>
        </div>

        <div className={styles.actionRow}>
          <Link href={`/course/${course.id}`} className="btn btn-secondary btn-sm" style={{ flex: 1 }}>
            {t('courses.viewDetails')}
          </Link>
          <Link href={`/course/${course.id}`} className="btn btn-primary btn-sm" style={{ flex: 1 }}>
            {t('courses.enrollNow')}
          </Link>
        </div>
      </div>
    </div>
  );
}
