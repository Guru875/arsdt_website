'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import siteConfig from '@/data/site.json';
import coursesData from '@/data/courses.json';
import CourseCard from '@/components/CourseCard';
import InteractiveTransformation from '@/components/InteractiveTransformation';
import CertificateCustomizer from '@/components/CertificateCustomizer';
import { ChevronDownIcon } from '@/components/Icons';
import styles from './page.module.css';

export default function Home() {
  const { t, language } = useLanguage();
  
  // Category tabs filtering
  const [activeCategory, setActiveCategory] = useState('all');
  const [filteredCourses, setFilteredCourses] = useState(coursesData);
  
  // FAQ accordion state
  const [activeFaqIdx, setActiveFaqIdx] = useState(null);

  // Stats Counters state
  const [counters, setCounters] = useState({ students: 0, rating: 0.0, placement: 0 });

  useEffect(() => {
    // Filter courses
    if (activeCategory === 'all') {
      setFilteredCourses(coursesData);
    } else {
      setFilteredCourses(coursesData.filter(c => c.category === activeCategory));
    }
  }, [activeCategory]);

  useEffect(() => {
    // Simple incremental load animation for counts
    const interval = setInterval(() => {
      setCounters((prev) => {
        const nextStudents = prev.students < siteConfig.stats.studentsCount ? prev.students + 100 : siteConfig.stats.studentsCount;
        const nextRating = prev.rating < siteConfig.stats.googleRating ? parseFloat((prev.rating + 0.1).toFixed(1)) : siteConfig.stats.googleRating;
        const nextPlacement = prev.placement < siteConfig.stats.placementRate ? prev.placement + 2 : siteConfig.stats.placementRate;

        if (nextStudents === siteConfig.stats.studentsCount && nextRating === siteConfig.stats.googleRating && nextPlacement === siteConfig.stats.placementRate) {
          clearInterval(interval);
        }

        return { students: nextStudents, rating: nextRating, placement: nextPlacement };
      });
    }, 20);

    return () => clearInterval(interval);
  }, []);

  const whatsappMsg = encodeURIComponent("Hi! I am interested in joining a course at ARSDT. Please guide me.");
  const contactWhatsappUrl = `https://wa.me/${siteConfig.whatsapp}?text=${whatsappMsg}`;

  return (
    <div className={styles.homeWrapper}>
      {/* 1. HERO SECTION */}
      <section className={`${styles.hero} animate-fade-in`}>
        <div className={styles.heroBgPattern}></div>
        <div className={`container ${styles.heroContainer}`}>
          <div className={styles.heroContent}>
            <span className={styles.heroBadge}>{t('hero.badge')}</span>
            <h1 className={styles.heroTitle}>{t('hero.title')}</h1>
            <p className={styles.heroSubtitle}>{t('hero.subtitle')}</p>
            
            <div className={styles.heroActions}>
              <a href="#courses" className="btn btn-primary btn-lg">
                🚀 {t('hero.cta1')}
              </a>
              <a href="#demo" className="btn btn-secondary btn-lg">
                📺 {t('hero.cta2')}
              </a>
            </div>

            {/* Micro-counter metrics */}
            <div className={styles.batchUrgency}>
              <span className={styles.pulseDot}></span>
              <span>
                📅 {t('cta.nextBatch')} <strong>{siteConfig.nextBatch.date}</strong> | 
                ⚠️ Only <strong>{siteConfig.nextBatch.seatsLeft}</strong> {t('cta.seatsLeft')}!
              </span>
            </div>
          </div>

          <div className={styles.heroVisual}>
            <div className={styles.visualCard}>
              <InteractiveTransformation />
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATS BAR */}
      <section className={styles.statsBar}>
        <div className="container">
          <div className={styles.statsGrid}>
            <div className={styles.statNode}>
              <h3 className={styles.statVal}>{counters.students}+</h3>
              <p className={styles.statLabel}>{t('hero.stat1Label')}</p>
            </div>
            <div className={styles.statNode}>
              <h3 className={styles.statVal}>⭐ {counters.rating} / 5</h3>
              <p className={styles.statLabel}>{t('hero.stat2Label')}</p>
            </div>
            <div className={styles.statNode}>
              <h3 className={styles.statVal}>{counters.placement}%</h3>
              <p className={styles.statLabel}>{t('hero.stat3Label')}</p>
            </div>
            <div className={styles.statNode}>
              <h3 className={styles.statVal}>{siteConfig.stats.coursesCount}</h3>
              <p className={styles.statLabel}>{t('hero.stat4Label')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. COURSES SECTION */}
      <section id="courses" className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">{t('nav.courses')}</span>
            <h2 className="section-title">{t('courses.sectionTitle')}</h2>
            <p className="section-subtitle">{t('courses.sectionSubtitle')}</p>
          </div>

          {/* Filtering category tabs */}
          <div className={styles.tabsRow}>
            <button
              onClick={() => setActiveCategory('all')}
              className={`${styles.tabBtn} ${activeCategory === 'all' ? styles.tabActive : ''}`}
            >
              {t('courses.allCourses')}
            </button>
            <button
              onClick={() => setActiveCategory('10day')}
              className={`${styles.tabBtn} ${activeCategory === '10day' ? styles.tabActive : ''}`}
            >
              🛠️ 10-{t('courses.day')} Pro
            </button>
            <button
              onClick={() => setActiveCategory('2day')}
              className={`${styles.tabBtn} ${activeCategory === '2day' ? styles.tabActive : ''}`}
            >
              ⚡ 2-{t('courses.day')} Practical
            </button>
          </div>

          <div className="grid grid-3">
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE US */}
      <section id="why-us" className={`${styles.whyUsSection} section`}>
        <div className="container">
          <div className="section-header">
            <span className="section-badge">{t('whyUs.sectionTitle')}</span>
            <h2 className="section-title">{t('whyUs.sectionTitle')}</h2>
            <p className="section-subtitle">{t('whyUs.sectionSubtitle')}</p>
          </div>

          <div className="grid grid-3">
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <div key={num} className={`glass-card ${styles.whyUsCard}`}>
                <div className={styles.whyUsIconWrapper}>
                  {num === 1 && '🛠️'}
                  {num === 2 && '👨‍🏫'}
                  {num === 3 && '📜'}
                  {num === 4 && '💼'}
                  {num === 5 && '📺'}
                  {num === 6 && '👥'}
                </div>
                <h3 className={styles.whyUsCardTitle}>{t(`whyUs.feature${num}Title`)}</h3>
                <p className={styles.whyUsCardDesc}>{t(`whyUs.feature${num}Desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. DEMO VIDEOS */}
      <section id="demo" className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Demo</span>
            <h2 className="section-title">{t('demo.sectionTitle')}</h2>
            <p className="section-subtitle">{t('demo.sectionSubtitle')}</p>
          </div>

          <div className="grid grid-2">
            <div className={styles.demoVideoWrapper}>
              <iframe
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="Lab Practice Demo Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className={styles.demoIframe}
              ></iframe>
              <h4 className={styles.demoVideoTitle}>{t('demo.vid1Title')}</h4>
            </div>
            <div className={styles.demoVideoWrapper}>
              <iframe
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="Student Feedback"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className={styles.demoIframe}
              ></iframe>
              <h4 className={styles.demoVideoTitle}>{t('demo.vid2Title')}</h4>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CERTIFICATE SECTION */}
      <section id="certificate" className={`${styles.certSection} section`}>
        <div className="container">
          <div className="section-header">
            <span className="section-badge">{t('courses.certificate')}</span>
            <h2 className="section-title">{t('certificateBlock.sectionTitle')}</h2>
            <p className="section-subtitle">{t('certificateBlock.sectionSubtitle')}</p>
          </div>

          <div className={styles.certFlexGrid}>
            <div className={styles.certContentBox}>
              <h3 className={styles.certHeading}>{t('certificateBlock.recognizedCert')}</h3>
              <p className={styles.certDesc}>
                {t('certificateBlock.certDesc')}
              </p>
              <ul className={styles.certList}>
                <li>{t('certificateBlock.certList1')}</li>
                <li>{t('certificateBlock.certList2')}</li>
                <li>{t('certificateBlock.certList3')}</li>
              </ul>
            </div>
            <div className={styles.certInteractiveBox}>
              <CertificateCustomizer />
            </div>
          </div>
        </div>
      </section>



      {/* 8. FAQ SECTION */}
      <section id="faq" className={`${styles.faqSection} section`}>
        <div className="container">
          <div className="section-header">
            <span className="section-badge">FAQ</span>
            <h2 className="section-title">{t('faq.sectionTitle')}</h2>
            <p className="section-subtitle">{t('faq.sectionSubtitle')}</p>
          </div>

          <div className={styles.faqList}>
            {siteConfig.faq.map((item, idx) => {
              const isOpen = activeFaqIdx === idx;
              return (
                <div key={idx} className={`${styles.faqNode} ${isOpen ? styles.faqNodeOpen : ''}`}>
                  <button
                    onClick={() => setActiveFaqIdx(isOpen ? null : idx)}
                    className={styles.faqHeader}
                  >
                    <span className={styles.faqQuestion}>{t(item.question)}</span>
                    <ChevronDownIcon size={18} className={`${styles.faqChevron} ${isOpen ? styles.faqChevronRotated : ''}`} />
                  </button>
                  {isOpen && (
                    <div className={styles.faqBody}>
                      <p>{t(item.answer)}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 9. CONTACT SECTION */}
      <section id="contact" className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">{t('nav.contact')}</span>
            <h2 className="section-title">{t('contact.sectionTitle')}</h2>
            <p className="section-subtitle">{t('contact.sectionSubtitle')}</p>
          </div>

          <div className={styles.contactContainer}>
            <div className={styles.contactSidebar}>
              <h3 className={styles.sidebarHeading}>{t('contact.trainingCenter')}</h3>
              <p className={styles.sidebarDesc}>{t('contact.sidebarDesc')}</p>
              
              <div className={styles.infoList}>
                <div className={styles.infoNode}>
                  <span className={styles.infoIcon}>📞</span>
                  <div>
                    <h4>{t('contact.phone')}</h4>
                    <p>{siteConfig.phone}</p>
                  </div>
                </div>
                <div className={styles.infoNode}>
                  <span className={styles.infoIcon}>💬</span>
                  <div>
                    <h4>WhatsApp</h4>
                    <p>{siteConfig.phone}</p>
                  </div>
                </div>
                <div className={styles.infoNode}>
                  <span className={styles.infoIcon}>✉️</span>
                  <div>
                    <h4>{t('contact.email')}</h4>
                    <p>{siteConfig.email}</p>
                  </div>
                </div>
                <div className={styles.infoNode}>
                  <span className={styles.infoIcon}>📍</span>
                  <div>
                    <h4>{t('contact.address')}</h4>
                    <p>{t(siteConfig.address)}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className={`glass-card ${styles.contactCard}`}>
              <form onSubmit={(e) => { e.preventDefault(); alert("Thank you! Our trainers will contact you shortly."); }} className={styles.contactForm}>
                <div className={styles.formGroup}>
                  <label htmlFor="formName" className={styles.formLabel}>{t('contact.name')}</label>
                  <input id="formName" type="text" className={styles.formInput} required placeholder={t('contact.namePlaceholder')} />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="formEmail" className={styles.formLabel}>{t('contact.emailField')}</label>
                  <input id="formEmail" type="email" className={styles.formInput} required placeholder={t('contact.emailPlaceholder')} />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="formMessage" className={styles.formLabel}>{t('contact.message')}</label>
                  <textarea id="formMessage" className={styles.formTextarea} rows={4} required placeholder={t('contact.messagePlaceholder')}></textarea>
                </div>
                <button type="submit" className="btn btn-primary w-full">
                  ✉️ {t('contact.sendMessage')}
                </button>
              </form>
              <div className={styles.quickContactActions}>
                <a href={contactWhatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-accent w-full text-center">
                  💬 {t('contact.whatsapp')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
