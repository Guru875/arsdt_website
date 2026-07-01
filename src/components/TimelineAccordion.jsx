'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ChevronDownIcon, PlayIcon, BookIcon } from './Icons';
import styles from './TimelineAccordion.module.css';

export default function TimelineAccordion({ modules, classroomMode = false, onSelectLesson, activeDay }) {
  const { t } = useLanguage();
  const [expandedDays, setExpandedDays] = useState({ 1: true }); // Day 1 expanded by default

  const toggleDay = (day) => {
    setExpandedDays((prev) => ({
      ...prev,
      [day]: !prev[day],
    }));
  };

  return (
    <div className={styles.timeline}>
      {modules.map((mod) => {
        const isExpanded = expandedDays[mod.day] || (classroomMode && activeDay === mod.day);
        const isActive = classroomMode && activeDay === mod.day;

        return (
          <div
            key={mod.day}
            className={`${styles.dayNode} ${isExpanded ? styles.expanded : ''} ${isActive ? styles.active : ''}`}
          >
            {/* Timeline Line element */}
            <div className={styles.timelineBar}>
              <div className={`${styles.timelineDot} ${isExpanded ? styles.dotActive : ''}`}>
                {mod.day}
              </div>
            </div>

            {/* Accordion Content box */}
            <div className={`glass-card ${styles.dayCard}`}>
              <button
                onClick={() => toggleDay(mod.day)}
                className={styles.headerButton}
                aria-expanded={isExpanded}
              >
                <div className={styles.titleArea}>
                  <span className={styles.dayLabel}>
                    {t('courses.day')} {mod.day}
                  </span>
                  <h4 className={styles.dayTitle}>{t(mod.title)}</h4>
                </div>
                <ChevronDownIcon
                  size={20}
                  className={`${styles.chevron} ${isExpanded ? styles.chevronRotated : ''}`}
                />
              </button>

              {isExpanded && (
                <div className={styles.bodyContent}>
                  <div className={styles.topicSection}>
                    <h5 className={styles.sectionHeader}>{t('courses.topics')}:</h5>
                    <ul className={styles.topicList}>
                      {mod.topics.map((topic, idx) => (
                        <li key={idx} className={styles.topicItem}>
                          {t(topic)}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {classroomMode && (
                    <div className={styles.classroomActions}>
                      {mod.videos && mod.videos.length > 0 && (
                        <button
                          onClick={() => onSelectLesson({ type: 'video', data: mod.videos[0], day: mod.day })}
                          className={`btn btn-primary btn-sm ${styles.actionBtn}`}
                        >
                          <PlayIcon size={14} /> Watch Lesson
                        </button>
                      )}
                      {mod.notes && (
                        <button
                          onClick={() => onSelectLesson({ type: 'notes', data: mod.notes, day: mod.day, pdf: mod.pdfUrl })}
                          className={`btn btn-secondary btn-sm ${styles.actionBtn}`}
                        >
                          <BookIcon size={14} /> Study Notes
                        </button>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
