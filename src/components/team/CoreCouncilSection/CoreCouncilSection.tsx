'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { coreCouncilInfo } from '@/data/team';
import { Shield, Clock, Users } from 'lucide-react';
import styles from './CoreCouncilSection.module.css';

export const CoreCouncilSection: React.FC = () => {
  const councilPositions = [
    { title: 'President', desc: 'Chief executive officer of chapter operations and institutional representative' },
    { title: 'Vice President', desc: 'Executive lead for inter-domain coordination and project execution' },
    { title: 'Secretary', desc: 'Institutional records, chapter correspondence and official governance' },
    { title: 'Joint Secretary', desc: 'Operational assistance, meeting minutes and institutional archiving' },
    { title: 'Treasurer', desc: 'Chapter financial oversight, budgeting and resource allocation' },
  ];

  return (
    <div className={styles.sectionWrap} aria-label="Core Council Structure">
      <div className={styles.header}>
        <span className="text-overline">Executive Governance</span>
        <h2 className={styles.heading}>Core Council</h2>
        <p className={styles.sub}>
          The apex student executive committee governing the strategic initiatives, inter-domain collaboration,
          and institutional representation of the student chapter.
        </p>
      </div>

      <div className={styles.container}>
        {/* STATUS BANNER */}
        <div className={styles.statusCard}>
          <div className={styles.statusIndicator}>
            <Clock size={16} className={styles.clockIcon} />
            <span className={styles.statusLabel}>Session 2025–26 Induction</span>
          </div>
          <h3 className={styles.statusTitle}>{coreCouncilInfo.message}</h3>
          <p className={styles.statusNote}>{coreCouncilInfo.note}</p>
          <div className={styles.statusMeta}>
            <span className={styles.metaItem}>
              <Shield size={14} />
              <span>Verifiable on-chain / cryptographic credentials issued post-ratification</span>
            </span>
          </div>
        </div>

        {/* COUNCIL ROLES STRUCTURE */}
        <div className={styles.rolesGrid}>
          {councilPositions.map((pos, i) => (
            <motion.div
              key={pos.title}
              className={styles.roleCard}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <div className={styles.roleIconWrap}>
                <Users size={16} />
              </div>
              <div className={styles.roleContent}>
                <h4 className={styles.roleTitle}>{pos.title}</h4>
                <p className={styles.roleDesc}>{pos.desc}</p>
                <span className={styles.seatBadge}>Appointment Pending</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
