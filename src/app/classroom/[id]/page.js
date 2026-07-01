'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import coursesData from '@/data/courses.json';
import siteConfig from '@/data/site.json';
import TimelineAccordion from '@/components/TimelineAccordion';
import DynamicPlayer from '@/components/DynamicPlayer';
import { ClockIcon, BookIcon } from '@/components/Icons';
import styles from './Classroom.module.css';

export default function ClassroomPage({ params }) {
  // Await the routing params safely
  const resolvedParams = use(params);
  const { id } = resolvedParams;
  
  const course = coursesData.find((c) => c.id === id);

  if (!course) {
    notFound();
  }

  // Active day selection
  const [activeDay, setActiveDay] = useState(1);
  const [activeContent, setActiveContent] = useState({
    type: 'video',
    data: course.modules[0]?.videos?.[0] || { videoId: '', title: { en: 'Intro Video' } },
  });

  // Load last watched day from localStorage
  useEffect(() => {
    const savedDay = localStorage.getItem(`arsdt-watched-${course.id}`);
    if (savedDay) {
      const parsedDay = parseInt(savedDay);
      const mod = course.modules.find(m => m.day === parsedDay);
      if (mod) {
        setActiveDay(parsedDay);
        if (mod.videos && mod.videos.length > 0) {
          setActiveContent({ type: 'video', data: mod.videos[0] });
        } else if (mod.notes) {
          setActiveContent({ type: 'notes', data: mod.notes, pdf: mod.pdfUrl });
        }
      }
    }
  }, [course]);

  // Handle lesson item select
  const handleSelectLesson = (lesson) => {
    setActiveDay(lesson.day);
    setActiveContent({
      type: lesson.type,
      data: lesson.data,
      pdf: lesson.pdf
    });
    // Save state
    localStorage.setItem(`arsdt-watched-${course.id}`, lesson.day.toString());
  };

  // Check if a day is locked (Free preview allows Day 1 & Day 2)
  const isDayLocked = activeDay > 2;

  const titleEn = course.title.en;
  const whatsappMsg = encodeURIComponent(`Hi! I am in the demo classroom for "${titleEn}" and I want to enroll to unlock all lessons.`);
  const enrollWhatsappUrl = `https://wa.me/${siteConfig.whatsapp}?text=${whatsappMsg}`;

  return (
    <div className={styles.classroomWrapper}>
      {/* Upper sub-header path */}
      <div className={styles.subheader}>
        <div className="container flex items-center justify-between gap-md">
          <div className={styles.subHeaderLeft}>
            <Link href={`/course/${course.id}`} className={styles.backLink}>
              ← Exit Classroom
            </Link>
            <h2 className={styles.subHeaderTitle}>{course.title.en}</h2>
          </div>
          <span className={styles.demoBadge}>Demo Classroom (Day 1 & 2 Free Preview)</span>
        </div>
      </div>

      {/* Split pane workspace */}
      <div className={`container ${styles.workspaceGrid}`}>
        
        {/* Left Side: Video Panel / Study Notes */}
        <div className={styles.contentViewer}>
          <div className={styles.playerWrapper}>
            <DynamicPlayer
              videoId={activeContent.type === 'video' ? activeContent.data?.videoId : null}
              isLocked={isDayLocked}
              onUnlock={() => window.open(enrollWhatsappUrl, '_blank')}
            />
          </div>

          {/* Lesson Metadata */}
          <div className={`glass-card ${styles.metaCard}`}>
            <div className={styles.metaHeader}>
              <span className={styles.dayBadge}>Day {activeDay} Lesson</span>
              <h3 className={styles.lessonTitle}>
                {activeContent.type === 'video'
                  ? (activeContent.data?.title?.en || 'Module Video')
                  : 'Theoretical Study Handbook'}
              </h3>
            </div>

            {/* If lesson is locked, hide notes details */}
            {isDayLocked ? (
              <div className={styles.lockedNotesMessage}>
                <h4>Study Materials Locked</h4>
                <p>Detailed circuit schematics, diagnostic procedures, and handbook files are unlocked after registration.</p>
                <a href={enrollWhatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-accent btn-sm">
                  Enroll to Unlock
                </a>
              </div>
            ) : (
              <div className={styles.lessonNotesContent}>
                {activeContent.type === 'notes' ? (
                  <div className={styles.notesText}>
                    <div className={styles.notesTextHeader}>
                      <h4>📖 Lesson Handbook & Guide</h4>
                      {activeContent.pdf && (
                        <a href="#" onClick={(e) => { e.preventDefault(); alert("PDF Downloading starting... (Mock download)"); }} className={styles.pdfDownloadBtn}>
                          📥 Download PDF Diagram
                        </a>
                      )}
                    </div>
                    <p className={styles.notesParagraph}>
                      {activeContent.data?.en || 'No textual notes available for this section. Please watch the instruction lecture video for full diagnostics guides.'}
                    </p>
                  </div>
                ) : (
                  <div className={styles.videoIntro}>
                    <p>
                      Welcome to the Day {activeDay} practical session. Make sure to have your multimeter ready and follow along with the instructor. Use the study notes tab below to review wiring schematics.
                    </p>
                    {/* Render quick toggle for notes if available */}
                    {course.modules.find(m => m.day === activeDay)?.notes && (
                      <button
                        onClick={() => {
                          const m = course.modules.find(m => m.day === activeDay);
                          handleSelectLesson({ type: 'notes', data: m.notes, day: activeDay, pdf: m.pdfUrl });
                        }}
                        className={`btn btn-secondary btn-sm ${styles.switchNotesBtn}`}
                      >
                        <BookIcon size={14} /> Switch to Study Handbook Notes
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Curriculum Navigation */}
        <div className={styles.sidebarCurriculum}>
          <div className={`glass-card ${styles.curriculumCard}`}>
            <div className={styles.curriculumHeader}>
              <h4>Course Syllabus & Lectures</h4>
              <p>Day 1 & 2 are open for demo testing.</p>
            </div>
            <div className={styles.curriculumBody}>
              <TimelineAccordion
                modules={course.modules}
                classroomMode={true}
                activeDay={activeDay}
                onSelectLesson={handleSelectLesson}
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
