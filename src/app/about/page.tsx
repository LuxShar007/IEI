import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHeader } from '@/components/layout/PageHeader/PageHeader';
import { ArrowRight, BookOpen, Cpu, Shield, Award, Users, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/Button/Button';
import styles from './about.module.css';

export const metadata: Metadata = {
  title: 'About the Chapter — Institutional Identity & Mandate',
  description:
    'The Institution of Engineers (India) Students\' Chapter at SIES Graduate School of Technology — Department of Electronics & Computer Science Engineering.',
};

export default function AboutPage() {
  return (
    <main className={styles.page}>
      {/* EDITORIAL HEADER */}
      <PageHeader
        sectionNumber="01 / 07"
        eyebrow="Institutional Heritage & Charter"
        title="About the Chapter"
        description="The official student chapter of the Institution of Engineers (India) at SIES Graduate School of Technology, anchored within the Department of Electronics & Computer Science Engineering."
        breadcrumbs={[{ label: 'About' }]}
        metadataItems={[
          { label: 'Founded', value: 'National Body 1920' },
          { label: 'Department', value: 'ECS Engineering' },
          { label: 'Campus', value: 'SIES GST Navi Mumbai' },
        ]}
      />

      {/* 01 — ABOUT IEI (PARENT INSTITUTION) */}
      <section className={styles.section} id="parent-body" aria-label="About IEI National Body">
        <div className={styles.inner}>
          <div className={styles.editorialGrid}>
            <div className={styles.gridMeta}>
              <span className={styles.sectionIndex}>01</span>
              <span className={styles.sectionLabel}>National Heritage</span>
            </div>
            <div className={styles.gridContent}>
              <h2 className={styles.sectionHeadline}>
                The Institution of Engineers (India)
              </h2>
              <p className={styles.leadPara}>
                Established in 1920 and incorporated by Royal Charter in 1935, the Institution of Engineers (India) 
                is the pioneer multi-disciplinary professional body of engineers in the country. With over a century 
                of technical eminence, IEI represents the highest standard of engineering governance across India.
              </p>
              <p className={styles.bodyPara}>
                Operating across 15 engineering engineering divisions with more than 125 state and local centres, 
                IEI sets professional standards, accredits collegiate programs, and provides a national platform 
                for engineering discourse. Student chapters are the vital grassroots foundation of this national network.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 02 — IEI + SIES GST (DEPARTMENTAL ALLIANCE) */}
      <section className={styles.section} id="department-alliance" aria-label="IEI SIES GST Department Alliance">
        <div className={styles.inner}>
          <div className={styles.editorialGrid}>
            <div className={styles.gridMeta}>
              <span className={styles.sectionIndex}>02</span>
              <span className={styles.sectionLabel}>Department Alliance</span>
            </div>
            <div className={styles.gridContent}>
              <h2 className={styles.sectionHeadline}>
                SIES GST & Electronics and Computer Science Engineering
              </h2>
              <p className={styles.leadPara}>
                SIES Graduate School of Technology, established in 2002 in Navi Mumbai, has developed a reputation 
                for rigorous technical discipline. The Department of Electronics and Computer Science Engineering 
                bridges hardware telemetry, firmware kernels, distributed software, and algorithmic intelligence.
              </p>
              <p className={styles.bodyPara}>
                The ECS student chapter connects the academic curriculum directly with institutional engineering practice. 
                Under faculty leadership, student engineers learn to think beyond syllabus boundaries — mastering real 
                developer toolchains, laboratory testbenches, and professional documentation standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 03 — CHAPTER PURPOSE */}
      <section className={styles.section} id="purpose" aria-label="Chapter Purpose">
        <div className={styles.inner}>
          <div className={styles.editorialGrid}>
            <div className={styles.gridMeta}>
              <span className={styles.sectionIndex}>03</span>
              <span className={styles.sectionLabel}>Institutional Mandate</span>
            </div>
            <div className={styles.gridContent}>
              <h2 className={styles.sectionHeadline}>
                We build engineers,<br />not just graduates.
              </h2>
              <p className={styles.leadPara}>
                The chapter exists to resolve a fundamental asymmetry in modern technical education: the gap between 
                theoretical engineering concepts and the practical demands of high-reliability systems engineering.
              </p>
              <div className={styles.statementStrip}>
                <div className={styles.statementItem}>
                  <div className={styles.statementNum}>01</div>
                  <div className={styles.statementTitle}>Technical Depth</div>
                  <div className={styles.statementDesc}>Hands-on mastery over surface familiarity. Real code, real silicon, real telemetry.</div>
                </div>
                <div className={styles.statementItem}>
                  <div className={styles.statementNum}>02</div>
                  <div className={styles.statementTitle}>Collaborative Practice</div>
                  <div className={styles.statementDesc}>Peer code review, multidisciplinary hardware-software teams, and collective ownership.</div>
                </div>
                <div className={styles.statementItem}>
                  <div className={styles.statementNum}>03</div>
                  <div className={styles.statementTitle}>Institutional Integrity</div>
                  <div className={styles.statementDesc}>Accountability, verifiable credentials, and professional ethics in every initiative.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 04 — WHAT THE CHAPTER DOES */}
      <section className={styles.section} id="operations" aria-label="Operational Structure">
        <div className={styles.inner}>
          <div className={styles.editorialGrid}>
            <div className={styles.gridMeta}>
              <span className={styles.sectionIndex}>04</span>
              <span className={styles.sectionLabel}>Execution Framework</span>
            </div>
            <div className={styles.gridContent}>
              <h2 className={styles.sectionHeadline}>
                A Structured Engine for Student Progression
              </h2>
              <p className={styles.bodyPara}>
                The chapter operates 7 specialized domain wings — Technical, Industry Outreach & Admin, Publicity, 
                Creative, Design, Media, and Editorial. Each wing functions under a strict four-tier hierarchy: 
                Mentor, Head, Coordinator, and Volunteer.
              </p>
              <p className={styles.bodyPara}>
                This structure ensures that every technical workshop, design deliverable, research review, and 
                campus event is planned, executed, and archived with professional discipline.
              </p>
              <div className={styles.linkRow}>
                <Button href="/team" variant="outline" size="sm" rightIcon={<ArrowRight size={14} />}>
                  Inspect the 7 Domain Wings
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 05 — COMMUNITY */}
      <section className={styles.section} id="community" aria-label="Community and Culture">
        <div className={styles.inner}>
          <div className={styles.editorialGrid}>
            <div className={styles.gridMeta}>
              <span className={styles.sectionIndex}>05</span>
              <span className={styles.sectionLabel}>Culture</span>
            </div>
            <div className={styles.gridContent}>
              <h2 className={styles.sectionHeadline}>
                Collegiate Camaraderie & Technical Fellowship
              </h2>
              <p className={styles.bodyPara}>
                Beyond official seminars and technical papers, IEI SIES GST represents an active community of curious minds. 
                Late-night hackathon war-rooms, peer-led soldering masterclasses, technical debate sessions, and open-source 
                collaboration forge bonds that endure far beyond graduation.
              </p>
              <p className={styles.bodyPara}>
                Alumni who have progressed to top research institutions and engineering firms regularly return to mentor 
                the incoming cohort — ensuring continuous institutional knowledge transfer.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 06 — ACTIVITIES OVERVIEW */}
      <section className={styles.section} id="programs" aria-label="Activities Summary">
        <div className={styles.inner}>
          <div className={styles.editorialGrid}>
            <div className={styles.gridMeta}>
              <span className={styles.sectionIndex}>06</span>
              <span className={styles.sectionLabel}>Initiatives</span>
            </div>
            <div className={styles.gridContent}>
              <h2 className={styles.sectionHeadline}>
                Active Programs & Regular Cadences
              </h2>
              <p className={styles.bodyPara}>
                From bi-weekly RTOS hardware labs and distributed ML reading groups to our annual engineering symposium 
                and collegiate hackathons, our activity calendar is designed for continuous engagement.
              </p>
              <div className={styles.linkRow}>
                <Button href="/activities" variant="outline" size="sm" rightIcon={<ArrowRight size={14} />}>
                  Explore Stage-by-Stage Activities
                </Button>
                <Button href="/events" variant="outline" size="sm" rightIcon={<ArrowRight size={14} />}>
                  View Event Calendar
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 07 — CONTACT & NEXT SECTION */}
      <section className={styles.ctaClosing} id="next" aria-label="Next Steps">
        <div className={styles.inner}>
          <div className={styles.editorialGrid}>
            <div className={styles.gridMeta}>
              <span className={styles.sectionIndex}>07</span>
              <span className={styles.sectionLabel}>Next Action</span>
            </div>
            <div className={styles.gridContent}>
              <h2 className={styles.closingHeadline}>
                Connect with the Chapter
              </h2>
              <p className={styles.bodyPara}>
                Interested in collaborating on technical symposia, research projects, or institutional verification?
              </p>
              <div className={styles.closingActions}>
                <Button href="/contact" variant="primary" size="md" rightIcon={<ArrowRight size={15} />}>
                  Contact Headquarters
                </Button>
                <Button href="/team" variant="outline" size="md" rightIcon={<ArrowRight size={14} />}>
                  Meet Leadership
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
