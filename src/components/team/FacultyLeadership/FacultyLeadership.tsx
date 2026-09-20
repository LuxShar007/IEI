'use client';

import React from 'react';
import { facultyLeaders } from '@/data/team';
import { Mail, GraduationCap } from 'lucide-react';
import styles from './FacultyLeadership.module.css';

export const FacultyLeadership: React.FC = () => {
  return (
    <section className={styles.sectionWrap} id="faculty" aria-label="Faculty Advisory & Leadership">
      <div className={styles.header}>
        <div className={styles.metaRow}>
          <span className={styles.sectionIndex}>01 / 03</span>
          <span className={styles.sectionLabel}>Institutional Governance</span>
        </div>
        <h2 className={styles.heading}>Faculty Leadership</h2>
        <p className={styles.sub}>
          Distinguished academic advisors steering institutional standards, departmental integration, and research governance for the IEI SIES GST Student Chapter.
        </p>
      </div>

      <div className={styles.facultyGrid}>
        {facultyLeaders.map((faculty, i) => (
          <article key={faculty.id} className={styles.facultyCard}>
            {/* PORTRAIT / INITIALS FRAME */}
            <div className={styles.portraitFrame} aria-hidden="true">
              <div className={styles.portraitAura} />
              <GraduationCap size={44} className={styles.capIcon} />
              <span className={styles.initials}>
                {faculty.name
                  .split(' ')
                  .filter((w) => !w.startsWith('Dr.') && !w.startsWith('Prof.'))
                  .map((w) => w[0])
                  .join('')}
              </span>
            </div>

            {/* DETAILS */}
            <div className={styles.details}>
              <div className={styles.roleTagRow}>
                <span className={styles.roleBadge}>{faculty.role}</span>
                <span className={styles.deptCode}>DEPT OF ECS</span>
              </div>

              <h3 className={styles.name}>{faculty.name}</h3>
              <p className={styles.designation}>{faculty.designation}</p>
              <p className={styles.department}>{faculty.department}</p>
              <p className={styles.bio}>{faculty.bio}</p>

              {faculty.email && (
                <div className={styles.contactRow}>
                  <a href={`mailto:${faculty.email}`} className={styles.emailLink} aria-label={`Email ${faculty.name}`}>
                    <Mail size={14} />
                    <span>{faculty.email}</span>
                  </a>
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
