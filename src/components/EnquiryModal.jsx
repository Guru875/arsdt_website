'use client';

import { useState, useEffect } from 'react';
import siteConfig from '@/data/site.json';
import coursesData from '@/data/courses.json';
import styles from './EnquiryModal.module.css';

export default function EnquiryModal({ isOpen, onClose, initialCourse = '' }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [city, setCity] = useState('');
  const [selectedCourse, setSelectedCourse] = useState(initialCourse);

  useEffect(() => {
    if (initialCourse) {
      setSelectedCourse(initialCourse);
    }
  }, [initialCourse]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedText = encodeURIComponent(
      `Hi ARSDT! I would like to make an enquiry:\n\n` +
      `👤 *Name:* ${name}\n` +
      `📧 *Email:* ${email}\n` +
      `📞 *Mobile:* ${mobile}\n` +
      `🏙️ *City:* ${city}\n` +
      `📚 *Course:* ${selectedCourse || 'General Enquiry'}`
    );
    const whatsappUrl = `https://wa.me/${siteConfig.whatsapp}?text=${formattedText}`;
    window.open(whatsappUrl, '_blank');
    onClose();
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
        <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Close modal">
          ✕
        </button>

        <h3 className={styles.title}>Enquiry Now</h3>

        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            className={styles.input}
            required
            placeholder="Your Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            className={styles.input}
            required
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="tel"
            className={styles.input}
            required
            placeholder="Mobile No."
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />

          <input
            type="text"
            className={styles.input}
            required
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />

          <select
            className={styles.select}
            required
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
          >
            <option value="">-----Select Course-----</option>
            {coursesData.map((course) => (
              <option key={course.id} value={typeof course.title === 'string' ? course.title : course.title.en}>
                {typeof course.title === 'string' ? course.title : course.title.en}
              </option>
            ))}
            <option value="General Enquiry">Other / General Enquiry</option>
          </select>

          <button type="submit" className={styles.submitBtn}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.313 1.592 5.728.002 10.386-4.653 10.388-10.385.002-2.777-1.08-5.387-3.046-7.355-1.965-1.967-4.58-3.048-7.359-3.048-5.729 0-10.385 4.656-10.388 10.389-.001 2.012.569 3.639 1.536 5.253l-.97 3.548 3.651-.958zm10.741-6.903c-.279-.139-1.646-.812-1.9-.904-.253-.093-.438-.139-.623.139-.184.277-.714.904-.875 1.09-.161.184-.322.207-.601.069-.278-.14-1.176-.433-2.241-1.383-.83-.74-1.39-1.653-1.553-1.93-.163-.277-.017-.427.122-.565.125-.124.279-.324.418-.486.139-.162.186-.278.278-.463.093-.185.046-.347-.023-.486-.069-.139-.623-1.503-.853-2.056-.224-.539-.47-.464-.623-.472-.16-.008-.346-.01-.531-.01s-.486.069-.74.347c-.253.278-.971.949-.971 2.316 0 1.367.994 2.686 1.134 2.871.14.185 1.957 2.989 4.743 4.19.662.286 1.179.457 1.583.585.666.211 1.272.181 1.751.11.534-.079 1.646-.673 1.877-1.32.231-.647.231-1.204.162-1.32-.069-.116-.254-.185-.533-.324z"/>
            </svg>
            SEND MESSAGE
          </button>
        </form>
      </div>
    </div>
  );
}
