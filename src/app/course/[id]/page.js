import Link from 'next/link';
import { notFound } from 'next/navigation';
import coursesData from '@/data/courses.json';
import siteConfig from '@/data/site.json';
import TimelineAccordion from '@/components/TimelineAccordion';
import StickyCTA from '@/components/StickyCTA';
import { ClockIcon, CheckIcon } from '@/components/Icons';
import styles from './CourseDetail.module.css';

// Generate static params for all courses to allow static export/generation
export async function generateStaticParams() {
  return coursesData.map((course) => ({
    id: course.id,
  }));
}

export default async function CourseDetailPage({ params }) {
  const { id } = await params;
  const course = coursesData.find((c) => c.id === id);

  if (!course) {
    notFound();
  }

  // Pre-fill WhatsApp message
  const titleEn = course.title.en;
  const whatsappMsg = encodeURIComponent(`Hi! I would like to enroll in the "${titleEn}" course at ARSDT.`);
  const enrollWhatsappUrl = `https://wa.me/${siteConfig.whatsapp}?text=${whatsappMsg}`;

  return (
    <div className={styles.detailWrapper}>
      {/* 1. COURSE BANNER */}
      <section className={styles.banner} style={{ '--banner-accent': course.color }}>
        <div className={styles.bannerBgPattern}></div>
        <div className="container">
          <div className={styles.bannerGrid}>
            <div className={styles.bannerContent}>
              <Link href="/#courses" className={styles.backLink}>
                ← Back to Courses
              </Link>
              <span className={styles.bannerBadge}>{course.category === '10day' ? '10-Day Professional Course' : '2-Day Practical Course'}</span>
              <h1 className={styles.bannerTitle}>{course.title.en}</h1>
              <p className={styles.bannerDesc}>{course.description.en}</p>
              
              <div className={styles.bannerMeta}>
                <div className={styles.metaBadge}>
                  <ClockIcon size={16} />
                  <span>Duration: <strong>{course.duration.en}</strong></span>
                </div>
                <div className={styles.metaBadge}>
                  <span>Trainer: <strong>{course.trainer.en}</strong></span>
                </div>
              </div>
            </div>

            {/* Sidebar Pricing Card */}
            <div className={`glass-card ${styles.sidebarCard}`}>
              <div className={styles.priceSection}>
                <span className={styles.discountBadge}>
                  {Math.round(((course.price - course.offerPrice) / course.price) * 100)}% OFF
                </span>
                <div className={styles.priceRow}>
                  <span className={styles.offerPrice}>₹{course.offerPrice}</span>
                  <span className={styles.originalPrice}>₹{course.price}</span>
                </div>
                <p className={styles.priceNote}>Limited Seats! Lock this price today.</p>
              </div>

              <div className={styles.actionSection}>
                <a href={enrollWhatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-accent w-full text-center">
                  💬 Enroll via WhatsApp
                </a>
                <Link href={`/classroom/${course.id}`} className="btn btn-secondary w-full text-center">
                  📚 Try Demo Classroom
                </Link>
              </div>

              <div className={styles.benefitsSection}>
                <h4>Course Includes:</h4>
                <ul>
                  <li>✅ 100% Practical Hands-on Training</li>
                  <li>✅ Government recognized Certificate</li>
                  <li>✅ Placement & Business Setup Support</li>
                  <li>✅ Lifetime video & study materials access</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SYLLABUS AND DETAILS */}
      <section className={`${styles.contentSection} section`}>
        <div className="container">
          <div className={styles.contentGrid}>
            <div className={styles.mainContent}>
              
              {/* Learning Outcomes */}
              <div className={styles.sectionCard}>
                <h3 className={styles.sectionTitle}>What You&apos;ll Learn</h3>
                <div className={styles.outcomesGrid}>
                  {course.outcomes.map((outcome, idx) => (
                    <div key={idx} className={styles.outcomeNode}>
                      <span className={styles.checkIcon}>✓</span>
                      <p>{outcome.en}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Day-by-Day Accordion Schedule */}
              <div className={styles.sectionCard}>
                <h3 className={styles.sectionTitle}>Day-by-Day Course Syllabus</h3>
                <p className={styles.sectionDesc}>Our training program is designed to cover fundamental electronics first, then step-by-step diagnostic and practical operations.</p>
                <div className={styles.accordionContainer}>
                  <TimelineAccordion modules={course.modules} />
                </div>
              </div>

              {/* Course Prerequisites */}
              <div className={styles.sectionCard}>
                <h3 className={styles.sectionTitle}>Prerequisites / Requirements</h3>
                <ul className={styles.reqList}>
                  {course.requirements.map((req, idx) => (
                    <li key={idx}>• {req.en}</li>
                  ))}
                </ul>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Sticky Call-To-Action component */}
      <StickyCTA course={course} />
    </div>
  );
}
