'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { coreCouncilInfo } from '@/data/team';
import { Shield, Clock, Award, CheckCircle2, ChevronRight } from 'lucide-react';
import styles from './CoreCouncilSection.module.css';

interface CouncilSeat {
  seatId: string;
  title: string;
  scope: string;
  cadre: string;
  status: 'pending_induction' | 'ratified';
}

const COUNCIL_SEATS: CouncilSeat[] = [
  {
    seatId: 'CORE-01',
    title: 'President',
    cadre: 'Chief Executive Officer',
    scope: 'Institutional representation, faculty liaison, council leadership, and chapter governance strategy.',
    status: 'pending_induction',
  },
  {
    seatId: 'CORE-02',
    title: 'Vice President',
    cadre: 'Operations Director',
    scope: 'Inter-domain operational flow, symposium delivery oversight, and departmental coordination.',
    status: 'pending_induction',
  },
  {
    seatId: 'CORE-03',
    title: 'Secretary',
    cadre: 'Secretariat & Records',
    scope: 'Official chapter correspondence, council minutes, institutional records, and IEI India reports.',
    status: 'pending_induction',
  },
  {
    seatId: 'CORE-04',
    title: 'Joint Secretary',
    cadre: 'Administrative Support',
    scope: 'Session documentation, committee logistics, institutional archiving, and internal affairs.',
    status: 'pending_induction',
  },
  {
    seatId: 'CORE-05',
    title: 'Treasurer',
    cadre: 'Financial Oversight',
    scope: 'Chapter budget allocation, resource accounting, audit compliance, and financial disbursements.',
    status: 'pending_induction',
  },
];

export const CoreCouncilSection: React.FC = () => {
  return (
    <section className={styles.sectionWrap} id="core-council" aria-label="Core Executive Council Architecture">
      {/* SECTION HEADER */}
      <div className={styles.header}>
        <div className={styles.headerMeta}>
          <span className={styles.sectionBadge}>SYSTEM 04 • APEX EXECUTIVE STRUCTURE</span>
          <span className={styles.headerDivider}>/</span>
          <span className={styles.headerScope}>INDEPENDENT EXECUTIVE GOVERNANCE BODY</span>
        </div>

        <div className={styles.headerMain}>
          <div>
            <h2 className={styles.heading}>Core Council</h2>
            <p className={styles.lead}>
              The central student executive committee governing chapter strategy, cross-wing operations, and external academic liaison.
            </p>
          </div>

          <div className={styles.statusPill}>
            <Clock size={14} className={styles.statusClock} />
            <span>SESSION 2024–2025 APPOINTMENT CYCLE</span>
          </div>
        </div>
      </div>

      {/* INSTITUTIONAL INDUCTION GOVERNANCE BANNER */}
      <div className={styles.protocolBanner}>
        <div className={styles.protocolIconWrap}>
          <Shield size={20} className={styles.protocolIcon} />
        </div>
        <div className={styles.protocolContent}>
          <div className={styles.protocolTitle}>{coreCouncilInfo.message}</div>
          <div className={styles.protocolText}>{coreCouncilInfo.note}</div>
        </div>
      </div>

      {/* HORIZONTAL EDITORIAL EXECUTIVE RAIL */}
      <div className={styles.railContainer}>
        <div className={styles.railGrid} role="list" aria-label="Executive Council Seats">
          {COUNCIL_SEATS.map((seat, index) => (
            <motion.article
              key={seat.seatId}
              role="listitem"
              className={styles.seatCard}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* TOP RETICLE */}
              <div className={styles.cardHeader}>
                <span className={styles.seatCode}>{seat.seatId}</span>
                <span className={styles.seatStatus}>INDUCTION PENDING</span>
              </div>

              {/* SEAT TITLE */}
              <div className={styles.cardMain}>
                <h3 className={styles.seatTitle}>{seat.title}</h3>
                <div className={styles.seatCadre}>{seat.cadre}</div>
                <p className={styles.seatScope}>{seat.scope}</p>
              </div>

              {/* CARD FOOTER */}
              <div className={styles.cardFooter}>
                <span className={styles.ratificationLabel}>FACULTY BOARD RATIFICATION</span>
                <span className={styles.seatReticle} aria-hidden="true">＋</span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
