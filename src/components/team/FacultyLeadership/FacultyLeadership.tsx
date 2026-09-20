'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { facultyLeaders } from '@/data/team';
import { Mail, GraduationCap } from 'lucide-react';
import styles from './FacultyLeadership.module.css';

export const FacultyLeadership: React.FC = () => {
  return (
    <div className={styles.sectionWrap} aria-label="Faculty Advisory & Leadership">
      <div className={styles.header}>
        <span className="text-overline">Institutional Guidance</span>
        <h2 className={styles.heading}>Faculty Leadership</h2>
        <p className={styles.sub}>
          Distinguished academic advisors steering the institutional standards, technical research,
          and student body governance of the IEI SIES GST Student Chapter.
        </p>
      </div>

      <div className={styles.facultyGrid}>
        {facultyLeaders.map((faculty, i) => (
          <motion.article
            key={faculty.id}
            className={styles.facultyCard}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* PORTRAIT / INITIALS PLACEHOLDER */}
            <div className={styles.portraitPlaceholder}>
              <div className={styles.portraitAura} />
              <GraduationCap size={40} className={styles.capIcon} />
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
              <div className={styles.roleTag}>
                <span className={styles.roleBadge}>{faculty.role}</span>
              </div>
              <h3 className={styles.name}>{faculty.name}</h3>
              <p className={styles.designation}>{faculty.designation}</p>
              <p className={styles.department}>{faculty.department}</p>
              <p className={styles.bio}>{faculty.bio}</p>

              {faculty.email && (
                <a href={`mailto:${faculty.email}`} className={styles.emailLink} aria-label={`Email ${faculty.name}`}>
                  <Mail size={14} />
                  <span>{faculty.email}</span>
                </a>
              )}
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
};
