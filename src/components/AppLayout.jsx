'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import LanguageSelector from './LanguageSelector';
import ThemeToggle from './ThemeToggle';
import ScrollToTop from './ScrollToTop';
import AnimatedBrand from './AnimatedBrand';
import siteConfig from '@/data/site.json';
import styles from './AppLayout.module.css';

export default function AppLayout({ children }) {
  const { t } = useLanguage();
  const { isDark } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  const whatsappMsg = encodeURIComponent("Hi! I would like to query about ARSDT training courses.");
  const whatsappUrl = `https://wa.me/${siteConfig.whatsapp}?text=${whatsappMsg}`;

  return (
    <div className={styles.appWrapper}>
      {/* Header Navigation */}
      <header className={styles.header}>
        <div className={`container ${styles.headerContainer}`}>
          {/* Logo Brand */}
          <Link href="/" className={styles.brand} onClick={closeMobileMenu}>
            <Image
              src="/logo.png"
              alt="ARSDT Logo"
              width={45}
              height={45}
              className={styles.logoImg}
            />
            <div className={styles.brandText}>
              <AnimatedBrand />
              <span className={styles.brandTagline}>{t(siteConfig.siteTagline)}</span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className={styles.desktopNav}>
            <Link href="/" className={styles.navLink}>{t('nav.home')}</Link>
            <a href="/#courses" className={styles.navLink}>{t('nav.courses')}</a>
            <a href="/#why-us" className={styles.navLink}>{t('nav.about')}</a>
            <a href="/#certificate" className={styles.navLink}>{t('nav.gallery')}</a>
            <a href="/#contact" className={styles.navLink}>{t('nav.contact')}</a>
          </nav>

          {/* Action Tools */}
          <div className={styles.actions}>
            <LanguageSelector />
            <ThemeToggle />
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-sm btn-nav"
            >
              {t('nav.enroll')}
            </a>
          </div>

          {/* Hamburger Menu Icon */}
          <button
            onClick={toggleMobileMenu}
            className={styles.hamburger}
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
          >
            <span className={`${styles.bar} ${mobileMenuOpen ? styles.barOpen : ''}`}></span>
            <span className={`${styles.bar} ${mobileMenuOpen ? styles.barOpen : ''}`}></span>
            <span className={`${styles.bar} ${mobileMenuOpen ? styles.barOpen : ''}`}></span>
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <div className={`${styles.mobileMenu} ${mobileMenuOpen ? styles.mobileMenuOpen : ''}`}>
        <nav className={styles.mobileNav}>
          <Link href="/" className={styles.mobileNavLink} onClick={closeMobileMenu}>{t('nav.home')}</Link>
          <a href="/#courses" className={styles.mobileNavLink} onClick={closeMobileMenu}>{t('nav.courses')}</a>
          <a href="/#why-us" className={styles.mobileNavLink} onClick={closeMobileMenu}>{t('nav.about')}</a>
          <a href="/#certificate" className={styles.mobileNavLink} onClick={closeMobileMenu}>{t('nav.gallery')}</a>
          <a href="/#contact" className={styles.mobileNavLink} onClick={closeMobileMenu}>{t('nav.contact')}</a>
          <div className={styles.mobileActions}>
            <div className={styles.mobileSelectorRow}>
              <span>Theme:</span>
              <ThemeToggle />
            </div>
            <div className={styles.mobileSelectorRow}>
              <span>Language:</span>
              <LanguageSelector />
            </div>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary text-center"
              onClick={closeMobileMenu}
            >
              {t('nav.enroll')}
            </a>
          </div>
        </nav>
      </div>

      {/* Main Content wrapper */}
      <main className={styles.mainContent}>
        {children}
      </main>

      {/* Footer Navigation */}
      <footer className={styles.footer}>
        <div className="container">
          <div className={styles.footerGrid}>
            {/* Column 1: Brand description */}
            <div className={styles.footerCol}>
              <div className={styles.footerBrand}>
                <Image
                  src="/logo.png"
                  alt="ARSDT Logo"
                  width={40}
                  height={40}
                  className={styles.logoImg}
                />
                <span className={styles.footerBrandName}>{siteConfig.siteName}</span>
              </div>
              <p className={styles.footerDesc}>{t('footer.description')}</p>
              <div className={styles.socialLinks}>
                <a href={siteConfig.social.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" /><polygon points="10 15 15 12 10 9 10 15" /></svg>
                </a>
                <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01" /></svg>
                </a>
                <a href={siteConfig.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
                </a>
              </div>
            </div>

            {/* Column 2: Quick links */}
            <div className={styles.footerCol}>
              <h4 className={styles.footerTitle}>{t('footer.quickLinks')}</h4>
              <nav className={styles.footerLinks}>
                <Link href="/" className={styles.footerLink}>{t('nav.home')}</Link>
                <a href="/#courses" className={styles.footerLink}>{t('nav.courses')}</a>
                <a href="/#why-us" className={styles.footerLink}>{t('nav.about')}</a>
                <a href="/#certificate" className={styles.footerLink}>{t('nav.gallery')}</a>
                <a href="/#contact" className={styles.footerLink}>{t('nav.contact')}</a>
              </nav>
            </div>

            {/* Column 3: Contacts */}
            <div className={styles.footerCol}>
              <h4 className={styles.footerTitle}>{t('nav.contact')}</h4>
              <div className={styles.footerInfo}>
                <p>📞 {siteConfig.phone}</p>
                <p>✉️ {siteConfig.email}</p>
                <p>📍 {t(siteConfig.address)}</p>
              </div>
            </div>
          </div>

          <div className={styles.footerBottom}>
            <p className={styles.footerCopy}>
              © {new Date().getFullYear()} {siteConfig.siteName}. {t('footer.rights')}
            </p>
            <p className={styles.footerAuthor}>
              {t('footer.madeWith')}
            </p>
          </div>
        </div>
      </footer>
      {/* Scroll to Top Button */}
      <ScrollToTop />
    </div>
  );
}
