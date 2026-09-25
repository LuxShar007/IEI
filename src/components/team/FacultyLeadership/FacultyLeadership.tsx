'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { facultyLeaders } from '@/data/team';
import { Mail, GraduationCap, Building2, Award, ArrowUpRight } from 'lucide-react';
import styles from './FacultyLeadership.module.css';

export const FacultyLeadership: React.FC = () => {
  const hod = facultyLeaders.find((f) => f.role === 'HOD') || facultyLeaders[0];
  const coordinator = facultyLeaders.find((f) => f.role === 'Student Branch Coordinator') || facultyLeaders[1];

  return (
    <section className={styles.sectionWrap} id="faculty" aria-label="Faculty Governance & Advisory Board">
      {/* SECTION HEADER BAR */}
      <div className={styles.header}>
        <div className={styles.headerMeta}>
          <span className={styles.sectionBadge}>SYSTEM 03 • INSTITUTIONAL ADVISORY</span>
          <span className={styles.headerDivider}>/</span>
          <span className={styles.headerDept}>DEPARTMENT OF ELECTRONICS & COMPUTER SCIENCE</span>
        </div>
        <h2 className={styles.heading}>Faculty Leadership</h2>
        <p className={styles.lead}>
          Distinguished academic advisors steering chapter governance, accreditation standards, and research initiatives within SIES Graduate School of Technology.
        </p>
      </div>

      {/* ASYMMETRIC INSTITUTIONAL LEADERSHIP COMPOSITION */}
      <div className={styles.compositionGrid}>
        {/* PRIMARY HERO: HEAD OF DEPARTMENT */}
        <motion.article
          className={styles.hodCard}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className={styles.portraitColumn}>
            <div className={styles.portraitCanvas}>
              {/* Architectural Monochrome Portrait Monolith */}
              <div className={styles.monolithSvgWrap}>
                <svg viewBox="0 0 400 480" className={styles.monolithSvg} aria-hidden="true">
                  <defs>
                    <linearGradient id="hodGrad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="var(--surface-elevated)" />
                      <stop offset="100%" stopColor="var(--bg-tertiary)" />
                    </linearGradient>
                  </defs>
                  <rect width="400" height="480" fill="url(#hodGrad)" />
                  <circle cx="200" cy="180" r="70" fill="var(--fg-subtle)" opacity="0.3" />
                  <path d="M 80 480 C 80 340, 320 340, 320 480 Z" fill="var(--fg-subtle)" opacity="0.3" />
                  {/* Fine Engineering Coordinates */}
                  <line x1="20" y1="20" x2="60" y2="20" stroke="var(--border-strong)" strokeWidth="1" />
                  <line x1="20" y1="20" x2="20" y2="60" stroke="var(--border-strong)" strokeWidth="1" />
                  <line x1="380" y1="460" x2="340" y2="460" stroke="var(--border-strong)" strokeWidth="1" />
                  <line x1="380" y1="460" x2="380" y2="420" stroke="var(--border-strong)" strokeWidth="1" />
                </svg>
                <div className={styles.portraitBadge}>
                  <Award size={18} className={styles.badgeIcon} />
                  <span>CHAIR OF ADVISORY</span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.infoColumn}>
            <div className={styles.roleHeader}>
              <span className={styles.roleTag}>APEX ACADEMIC GOVERNANCE</span>
              <span className={styles.tenureTag}>HOD • ECS</span>
            </div>

            <h3 className={styles.facultyName}>{hod.name}</h3>
            <div className={styles.facultyDesignation}>{hod.designation}</div>
            <div className={styles.facultyDept}>{hod.department}</div>

            <p className={styles.facultyBio}>{hod.bio}</p>

            <div className={styles.academicMandate}>
              <span className={styles.mandateLabel}>INSTITUTIONAL PORTFOLIO:</span>
              <ul className={styles.mandateList}>
                <li>Departmental accreditation standards & curriculum alignment</li>
                <li>Strategic research sponsorship & industry liaison</li>
                <li>Collegiate engineering chapter charter verification</li>
              </ul>
            </div>

            {hod.email && (
              <div className={styles.contactRow}>
                <a href={`mailto:${hod.email}`} className={styles.emailPill} aria-label={`Email ${hod.name}`}>
                  <Mail size={14} />
                  <span>{hod.email}</span>
                  <ArrowUpRight size={14} className={styles.arrowIcon} />
                </a>
              </div>
            )}
          </div>
        </motion.article>

        {/* COMPLEMENTARY HERO: STUDENT BRANCH COORDINATOR */}
        <motion.article
          className={styles.coordinatorCard}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className={styles.coordPortraitColumn}>
            <div className={styles.coordPortraitCanvas}>
              <svg viewBox="0 0 320 380" className={styles.monolithSvg} aria-hidden="true">
                <defs>
                  <linearGradient id="coordGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="var(--surface-elevated)" />
                    <stop offset="100%" stopColor="var(--bg-tertiary)" />
                  </linearGradient>
                </defs>
                <rect width="320" height="380" fill="url(#coordGrad)" />
                <circle cx="160" cy="150" r="60" fill="var(--fg-subtle)" opacity="0.3" />
                <path d="M 60 380 C 60 260, 260 260, 260 380 Z" fill="var(--fg-subtle)" opacity="0.3" />
                <line x1="20" y1="20" x2="50" y2="20" stroke="var(--border-strong)" strokeWidth="1" />
                <line x1="20" y1="20" x2="20" y2="50" stroke="var(--border-strong)" strokeWidth="1" />
              </svg>
              <div className={styles.portraitBadge}>
                <GraduationCap size={18} className={styles.badgeIcon} />
                <span>CHAPTER LIAISON</span>
              </div>
            </div>
          </div>

          <div className={styles.coordInfoColumn}>
            <div className={styles.roleHeader}>
              <span className={styles.roleTag}>STUDENT BRANCH OVERSIGHT</span>
              <span className={styles.tenureTag}>FACULTY ADVISOR</span>
            </div>

            <h3 className={styles.facultyName}>{coordinator.name}</h3>
            <div className={styles.facultyDesignation}>{coordinator.designation}</div>
            <div className={styles.facultyDept}>{coordinator.department}</div>

            <p className={styles.facultyBio}>{coordinator.bio}</p>

            <div className={styles.academicMandate}>
              <span className={styles.mandateLabel}>OPERATIONAL OVERSIGHT:</span>
              <ul className={styles.mandateList}>
                <li>Student council term governance & executive mentoring</li>
                <li>Official IEI India headquarters reporting & compliance</li>
                <li>Symposia, technical papers & student project evaluations</li>
              </ul>
            </div>

            {coordinator.email && (
              <div className={styles.contactRow}>
                <a
                  href={`mailto:${coordinator.email}`}
                  className={styles.emailPill}
                  aria-label={`Email ${coordinator.name}`}
                >
                  <Mail size={14} />
                  <span>{coordinator.email}</span>
                  <ArrowUpRight size={14} className={styles.arrowIcon} />
                </a>
              </div>
            )}
          </div>
        </motion.article>
      </div>
    </section>
  );
};
