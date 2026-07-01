'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import siteConfig from '@/data/site.json';
import coursesData from '@/data/courses.json';
import CourseCard from '@/components/CourseCard';
import InteractiveTransformation from '@/components/InteractiveTransformation';
import CertificateCustomizer from '@/components/CertificateCustomizer';
import { 
  ChevronDownIcon,
  PracticalIcon,
  ExpertTrainersIcon,
  CertificationIcon,
  PlacementIcon,
  LifetimeAccessIcon,
  SmallBatchesIcon
} from '@/components/Icons';
import styles from './page.module.css';

export default function Home() {
  const { t, language } = useLanguage();
  
  // Category tabs filtering
  const [activeCategory, setActiveCategory] = useState('all');
  
  // FAQ accordion state
  const [activeFaqIdx, setActiveFaqIdx] = useState(null);
  
  // Slider state
  const sliderRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Contact form state
  const [contactName, setContactName] = useState('');
  const [contactMessage, setContactMessage] = useState('');

  const handleContactSubmit = (e) => {
    e.preventDefault();
    const formattedText = encodeURIComponent(
      `Hi! My name is ${contactName}.\n\nMessage: ${contactMessage}`
    );
    const url = `https://wa.me/${siteConfig.whatsapp}?text=${formattedText}`;
    window.open(url, '_blank');
  };
  // Why Choose Us Mobile Slider state
  const whyUsSliderRef = useRef(null);
  const [activeWhyUsIdx, setActiveWhyUsIdx] = useState(0);

  // Filter courses based on category
  const filteredCourses = activeCategory === 'all' 
    ? coursesData 
    : coursesData.filter(course => course.category === activeCategory);

  // Auto-sliding and scroll listener
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    // Update active dot on scroll
    const handleScroll = () => {
      const index = Math.round(slider.scrollLeft / slider.offsetWidth);
      setActiveIndex(index);
    };

    slider.addEventListener('scroll', handleScroll);

    // Auto-slide every 3 seconds
    const interval = setInterval(() => {
      if (slider) {
        const maxScrollLeft = slider.scrollWidth - slider.clientWidth;
        const nextScrollLeft = slider.scrollLeft + slider.offsetWidth;
        
        if (slider.scrollLeft >= maxScrollLeft - 10) {
          // Loop back to start
          slider.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          slider.scrollTo({ left: nextScrollLeft, behavior: 'smooth' });
        }
      }
    }, 4000); // 4 seconds

    return () => {
      slider.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, [filteredCourses]); // Re-run if courses change

  const scrollToCourse = (index) => {
    const slider = sliderRef.current;
    if (slider) {
      slider.scrollTo({ left: index * slider.offsetWidth, behavior: 'smooth' });
    }
  };


  const scrollToWhyUs = (index) => {
    const slider = whyUsSliderRef.current;
    if (slider) {
      const children = Array.from(slider.children);
      if (children[index]) {
        slider.scrollTo({
          left: children[index].offsetLeft - slider.offsetLeft,
          behavior: 'smooth'
        });
      }
    }
  };

  // Effect for Why Choose Us mobile slider scroll & auto-slide
  useEffect(() => {
    const slider = whyUsSliderRef.current;
    if (!slider) return;

    const handleScroll = () => {
      const scrollLeft = slider.scrollLeft;
      const children = Array.from(slider.children);
      if (children.length === 0) return;
      
      let closestIdx = 0;
      let minDiff = Infinity;
      
      children.forEach((child, idx) => {
        const childLeft = child.offsetLeft - slider.offsetLeft;
        const diff = Math.abs(childLeft - scrollLeft);
        if (diff < minDiff) {
          minDiff = diff;
          closestIdx = idx;
        }
      });
      
      setActiveWhyUsIdx(closestIdx);
    };

    slider.addEventListener('scroll', handleScroll);

    // Auto-slide every 4 seconds on mobile
    const interval = setInterval(() => {
      if (window.innerWidth <= 768) {
        const children = Array.from(slider.children);
        if (children.length === 0) return;
        
        const nextIdx = (activeWhyUsIdx + 1) % children.length;
        const nextCard = children[nextIdx];
        if (nextCard) {
          slider.scrollTo({
            left: nextCard.offsetLeft - slider.offsetLeft,
            behavior: 'smooth'
          });
        }
      }
    }, 4000);

    return () => {
      slider.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, [activeWhyUsIdx]);

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
            
            <div className={styles.heroHighlights}>
              <div className={`${styles.highlightItem} ${styles.highlightItem1}`}>
                <span className={`${styles.highlightIcon} ${styles.highlightIcon1}`}>🛠️</span>
                <span className={styles.highlightText}>{t('hero.highlight1')}</span>
              </div>
              <div className={`${styles.highlightItem} ${styles.highlightItem2}`}>
                <span className={`${styles.highlightIcon} ${styles.highlightIcon2}`}>👨‍🏫</span>
                <span className={styles.highlightText}>{t('hero.highlight2')}</span>
              </div>
            </div>

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
              onClick={() => setActiveCategory('30day')}
              className={`${styles.tabBtn} ${activeCategory === '30day' ? styles.tabActive : ''}`}
            >
              🔧 30-{t('courses.day')} PCB Pro
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

          <div className={styles.coursesSlider} ref={sliderRef}>
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
          
          <div className={styles.sliderDots}>
            {filteredCourses.map((_, idx) => (
              <button 
                key={idx} 
                className={`${styles.dot} ${activeIndex === idx ? styles.activeDot : ''}`}
                onClick={() => scrollToCourse(idx)}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE US */}
      <section id="why-us" className={`${styles.whyUsSection} section`}>
        {/* Cinematic Video Background */}
        <div className={styles.videoBgContainer}>
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className={styles.videoBg}
          >
            <source src="/arsdt.mp4" type="video/mp4" />
          </video>
          <div className={styles.videoOverlay}></div>
        </div>

        <div className={`container ${styles.whyUsContent}`}>
          <div className="section-header">
            <span className={`section-badge ${styles.whyUsBadge}`}>{t('whyUs.sectionTitle')}</span>
            <h2 className={`section-title ${styles.whyUsTitle}`}>{t('whyUs.sectionTitle')}</h2>
            <p className={`section-subtitle ${styles.whyUsSubtitle}`}>{t('whyUs.sectionSubtitle')}</p>
          </div>

          <div className={styles.whyUsGrid} ref={whyUsSliderRef}>
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <div key={num} className={`${styles.whyUsCard}`}>
                <div className={styles.whyUsIconWrapper}>
                  {num === 1 && <PracticalIcon size={32} />}
                  {num === 2 && <ExpertTrainersIcon size={32} />}
                  {num === 3 && <CertificationIcon size={32} />}
                  {num === 4 && <PlacementIcon size={32} />}
                  {num === 5 && <LifetimeAccessIcon size={32} />}
                  {num === 6 && <SmallBatchesIcon size={32} />}
                </div>
                <h3 className={styles.whyUsCardTitle}>{t(`whyUs.feature${num}Title`)}</h3>
                <p className={styles.whyUsCardDesc}>{t(`whyUs.feature${num}Desc`)}</p>
              </div>
            ))}
          </div>

          {/* Dots Navigation for Mobile Slider */}
          <div className={styles.whyUsDots}>
            {[1, 2, 3, 4, 5, 6].map((_, idx) => (
              <button 
                key={idx} 
                className={`${styles.dot} ${activeWhyUsIdx === idx ? styles.activeDot : ''}`}
                onClick={() => scrollToWhyUs(idx)}
                aria-label={`Go to slide ${idx + 1}`}
              />
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
              <form onSubmit={handleContactSubmit} className={styles.contactForm}>
                <div className={styles.formGroup}>
                  <label htmlFor="formName" className={styles.formLabel}>{t('contact.name')}</label>
                  <input
                    id="formName"
                    type="text"
                    className={styles.formInput}
                    required
                    placeholder={t('contact.namePlaceholder')}
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="formMessage" className={styles.formLabel}>{t('contact.message')}</label>
                  <textarea
                    id="formMessage"
                    className={styles.formTextarea}
                    rows={4}
                    required
                    placeholder={t('contact.messagePlaceholder')}
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-accent w-full text-center" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ opacity: 0.9 }}>
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.313 1.592 5.728.002 10.386-4.653 10.388-10.385.002-2.777-1.08-5.387-3.046-7.355-1.965-1.967-4.58-3.048-7.359-3.048-5.729 0-10.385 4.656-10.388 10.389-.001 2.012.569 3.639 1.536 5.253l-.97 3.548 3.651-.958zm10.741-6.903c-.279-.139-1.646-.812-1.9-.904-.253-.093-.438-.139-.623.139-.184.277-.714.904-.875 1.09-.161.184-.322.207-.601.069-.278-.14-1.176-.433-2.241-1.383-.83-.74-1.39-1.653-1.553-1.93-.163-.277-.017-.427.122-.565.125-.124.279-.324.418-.486.139-.162.186-.278.278-.463.093-.185.046-.347-.023-.486-.069-.139-.623-1.503-.853-2.056-.224-.539-.47-.464-.623-.472-.16-.008-.346-.01-.531-.01s-.486.069-.74.347c-.253.278-.971.949-.971 2.316 0 1.367.994 2.686 1.134 2.871.14.185 1.957 2.989 4.743 4.19.662.286 1.179.457 1.583.585.666.211 1.272.181 1.751.11.534-.079 1.646-.673 1.877-1.32.231-.647.231-1.204.162-1.32-.069-.116-.254-.185-.533-.324z"/>
                  </svg>
                  {t('contact.whatsapp')}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
