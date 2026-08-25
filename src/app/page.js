'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import siteConfig from '@/data/site.json';
import coursesData from '@/data/courses.json';
import CourseCard from '@/components/CourseCard';
import CertificateCustomizer from '@/components/CertificateCustomizer';
import StickyCTA from '@/components/StickyCTA';
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
  const [totalPages, setTotalPages] = useState(1);

  // Hero image slideshow
  const heroImages = [
    '/hero/1.jpg', '/hero/2.jpg', '/hero/3.jpg', '/hero/4.jpg', '/hero/5.jpg',
    '/hero/6.jpg', '/hero/7.jpg', '/hero/8.jpg', '/hero/9.jpg', '/hero/10.jpg'
  ];
  const [heroImageIdx, setHeroImageIdx] = useState(0);

  // Contact form state
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMobile, setContactMobile] = useState('');
  const [contactCity, setContactCity] = useState('');
  const [contactCourse, setContactCourse] = useState('');

  const handleContactSubmit = (e) => {
    e.preventDefault();
    const formattedText = encodeURIComponent(
      `Hi ARSDT! I would like to make an enquiry:\n\n` +
      `👤 *Name:* ${contactName}\n` +
      `📧 *Email:* ${contactEmail}\n` +
      `📞 *Mobile:* ${contactMobile}\n` +
      `🏙️ *City:* ${contactCity}\n` +
      `📚 *Course:* ${contactCourse || 'General Enquiry'}`
    );
    const url = `https://wa.me/${siteConfig.whatsapp}?text=${formattedText}`;
    window.open(url, '_blank');
  };

  // Hero image slideshow auto-cycle (6.5s per image for comfortable reading)
  useEffect(() => {
    const interval = setInterval(() => {
      setHeroImageIdx((prev) => (prev + 1) % heroImages.length);
    }, 6500);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  // Why Choose Us Mobile Slider & Video Audio state
  const whyUsSliderRef = useRef(null);
  const [activeWhyUsIdx, setActiveWhyUsIdx] = useState(0);
  const videoRef = useRef(null);
  const [isVideoMuted, setIsVideoMuted] = useState(true);

  const toggleVideoAudio = () => {
    if (videoRef.current) {
      const nextMuted = !videoRef.current.muted;
      videoRef.current.muted = nextMuted;
      setIsVideoMuted(nextMuted);
      if (!nextMuted) {
        videoRef.current.play().catch(() => {});
      }
    }
  };

  // Filter courses based on category
  const filteredCourses = activeCategory === 'all' 
    ? coursesData 
    : coursesData.filter(course => course.category === activeCategory);

  // Scroll listener for course slider (manual only, no auto-scroll)
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const computePages = () => {
      const maxScroll = slider.scrollWidth - slider.clientWidth;
      if (maxScroll <= 0) {
        setTotalPages(1);
      } else {
        setTotalPages(Math.ceil(maxScroll / slider.offsetWidth) + 1);
      }
    };

    const handleScroll = () => {
      const maxScroll = slider.scrollWidth - slider.clientWidth;
      if (maxScroll <= 0) {
        setActiveIndex(0);
        return;
      }
      const pages = Math.ceil(maxScroll / slider.offsetWidth) + 1;
      const rawPage = (slider.scrollLeft / maxScroll) * (pages - 1);
      setActiveIndex(Math.round(rawPage));
    };

    computePages();
    slider.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', computePages);

    return () => {
      slider.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', computePages);
    };
  }, [filteredCourses]);

  // Prev/Next handlers for course slider
  const handleCoursePrev = () => {
    const slider = sliderRef.current;
    if (!slider) return;
    slider.scrollTo({ left: slider.scrollLeft - slider.offsetWidth, behavior: 'smooth' });
  };

  const handleCourseNext = () => {
    const slider = sliderRef.current;
    if (!slider) return;
    slider.scrollTo({ left: slider.scrollLeft + slider.offsetWidth, behavior: 'smooth' });
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
        {/* Background texture & soft gradient glow */}
        <div className={styles.heroBgPattern}></div>

        <div className={`container ${styles.heroContainer}`}>
          {/* Left Side Content */}
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

          {/* Right Side Image Showcase (100% visible, seamless left fade blend) */}
          <div className={styles.heroImageContainer}>
            <div className={styles.heroImageTrack}>
              {heroImages.map((src, idx) => (
                <div
                  key={src}
                  className={`${styles.heroSlide} ${idx === heroImageIdx ? styles.heroSlideActive : styles.heroSlideInactive}`}
                >
                  <img
                    src={src}
                    alt={`ARSDT Training Poster ${idx + 1}`}
                    className={styles.heroSlideImg}
                    loading={idx === 0 ? 'eager' : 'lazy'}
                  />
                </div>
              ))}
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
              onClick={() => setActiveCategory('15day')}
              className={`${styles.tabBtn} ${activeCategory === '15day' ? styles.tabActive : ''}`}
            >
              🌟 15-{t('courses.day')} Pro
            </button>
            <button
              onClick={() => setActiveCategory('10day')}
              className={`${styles.tabBtn} ${activeCategory === '10day' ? styles.tabActive : ''}`}
            >
              🛠️ 10-{t('courses.day')} Pro
            </button>
            <button
              onClick={() => setActiveCategory('5day')}
              className={`${styles.tabBtn} ${activeCategory === '5day' ? styles.tabActive : ''}`}
            >
              ⚡ 5-{t('courses.day')} Practical (Weekend)
            </button>
          </div>

          <div className={styles.coursesSlider} ref={sliderRef}>
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
          
          <div className={styles.sliderArrows}>
            <button
              className={`${styles.sliderArrowBtn} ${activeIndex === 0 ? styles.sliderArrowDisabled : ''}`}
              onClick={handleCoursePrev}
              disabled={activeIndex === 0}
              aria-label="Previous course"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <span className={styles.sliderCounter}>{activeIndex + 1} / {totalPages}</span>
            <button
              className={`${styles.sliderArrowBtn} ${activeIndex >= totalPages - 1 ? styles.sliderArrowDisabled : ''}`}
              onClick={handleCourseNext}
              disabled={activeIndex >= totalPages - 1}
              aria-label="Next course"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE US */}
      <section id="why-us" className={`${styles.whyUsSection} section`}>
        {/* Audio Control in the Corner */}
        <button
          onClick={toggleVideoAudio}
          className={`${styles.videoAudioToggle} ${!isVideoMuted ? styles.videoAudioToggleActive : ''}`}
          aria-label={isVideoMuted ? t('whyUs.unmuteVideo') : t('whyUs.muteVideo')}
          title={isVideoMuted ? t('whyUs.unmuteVideo') : t('whyUs.muteVideo')}
        >
          {isVideoMuted ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            </svg>
          )}
          <span className={styles.videoAudioText}>
            {isVideoMuted ? t('whyUs.unmuteVideo') : t('whyUs.muteVideo')}
          </span>
          {!isVideoMuted && <span className={styles.audioWavePulse}></span>}
        </button>

        {/* Cinematic Video Background */}
        <div className={styles.videoBgContainer}>
          <video 
            ref={videoRef}
            autoPlay 
            loop 
            muted={isVideoMuted}
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

              {/* Embedded Google Maps Box */}
              {siteConfig.mapUrl && (
                <div className={styles.mapCardWrapper}>
                  <div className={styles.mapContainer}>
                    <iframe
                      src="https://maps.google.com/maps?q=11.0287625,76.9656865&t=&z=16&ie=UTF8&iwloc=&output=embed"
                      width="100%"
                      height="200"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="ARSDT Google Maps Location"
                    ></iframe>
                    <div className={styles.mapOverlayBtn}>
                      <a
                        href={siteConfig.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary btn-sm"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }}
                      >
                        📍 Open in Google Maps ↗
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className={`glass-card ${styles.contactCard}`} style={{ background: '#112240', border: '1.5px solid rgba(255,255,255,0.1)', color: '#ffffff' }}>
              <h3 style={{ textAlign: 'center', fontSize: '1.8rem', fontWeight: '700', marginBottom: '24px', color: '#ffffff' }}>
                Enquiry Now
              </h3>
              <form onSubmit={handleContactSubmit} className={styles.contactForm}>
                <div className={styles.formGroup}>
                  <input
                    type="text"
                    className={styles.formInput}
                    required
                    placeholder="Your Full Name"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    style={{ background: '#ffffff', color: '#0f172a', fontWeight: '500' }}
                  />
                </div>
                <div className={styles.formGroup}>
                  <input
                    type="email"
                    className={styles.formInput}
                    required
                    placeholder="Email address"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    style={{ background: '#ffffff', color: '#0f172a', fontWeight: '500' }}
                  />
                </div>
                <div className={styles.formGroup}>
                  <input
                    type="tel"
                    className={styles.formInput}
                    required
                    placeholder="Mobile No."
                    value={contactMobile}
                    onChange={(e) => setContactMobile(e.target.value)}
                    style={{ background: '#ffffff', color: '#0f172a', fontWeight: '500' }}
                  />
                </div>
                <div className={styles.formGroup}>
                  <input
                    type="text"
                    className={styles.formInput}
                    required
                    placeholder="City"
                    value={contactCity}
                    onChange={(e) => setContactCity(e.target.value)}
                    style={{ background: '#ffffff', color: '#0f172a', fontWeight: '500' }}
                  />
                </div>
                <div className={styles.formGroup}>
                  <select
                    className={styles.formSelect}
                    required
                    value={contactCourse}
                    onChange={(e) => setContactCourse(e.target.value)}
                    style={{ background: '#ffffff', color: '#0f172a', fontWeight: '500' }}
                  >
                    <option value="">-----Select Course-----</option>
                    <option value="AC Repair Mechanic Course (₹10,000)">AC Repair Mechanic Course (10 Days)</option>
                    <option value="Washing Machine & Refrigerator Course (₹10,000)">Washing Machine & Refrigerator Course (15 Days)</option>
                    <option value="Gas Charging Course (₹7,500)">Gas Charging Course (7 Days)</option>
                    <option value="PCB Board Repair Master Course (30 Days)">PCB Board Repair Master Course (30 Days)</option>
                    <option value="General Enquiry">Other / General Enquiry</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary w-full text-center"
                  style={{
                    padding: '14px 28px',
                    fontSize: '1.05rem',
                    fontWeight: '700',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    backgroundColor: '#1d4ed8',
                    border: 'none',
                    borderRadius: '8px',
                    marginTop: '8px'
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.313 1.592 5.728.002 10.386-4.653 10.388-10.385.002-2.777-1.08-5.387-3.046-7.355-1.965-1.967-4.58-3.048-7.359-3.048-5.729 0-10.385 4.656-10.388 10.389-.001 2.012.569 3.639 1.536 5.253l-.97 3.548 3.651-.958zm10.741-6.903c-.279-.139-1.646-.812-1.9-.904-.253-.093-.438-.139-.623.139-.184.277-.714.904-.875 1.09-.161.184-.322.207-.601.069-.278-.14-1.176-.433-2.241-1.383-.83-.74-1.39-1.653-1.553-1.93-.163-.277-.017-.427.122-.565.125-.124.279-.324.418-.486.139-.162.186-.278.278-.463.093-.185.046-.347-.023-.486-.069-.139-.623-1.503-.853-2.056-.224-.539-.47-.464-.623-.472-.16-.008-.346-.01-.531-.01s-.486.069-.74.347c-.253.278-.971.949-.971 2.316 0 1.367.994 2.686 1.134 2.871.14.185 1.957 2.989 4.743 4.19.662.286 1.179.457 1.583.585.666.211 1.272.181 1.751.11.534-.079 1.646-.673 1.877-1.32.231-.647.231-1.204.162-1.32-.069-.116-.254-.185-.533-.324z"/>
                  </svg>
                  SEND MESSAGE
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Sticky Call & WhatsApp CTA for Homepage */}
      <StickyCTA />
    </div>
  );
}
