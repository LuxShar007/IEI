'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { placeholderMembers } from '@/data/members';
import type { Member } from '@/lib/types/member';
import { ShieldCheck, ArrowUpRight, User } from 'lucide-react';
import styles from './PortraitContactSheet.module.css';

interface PortraitContactSheetProps {
  sessionId?: string;
}

export const PortraitContactSheet: React.FC<PortraitContactSheetProps> = ({
  sessionId = '2024-2025',
}) => {
  const [hoveredMemberId, setHoveredMemberId] = useState<string | null>(null);

  const members = placeholderMembers.filter(
    (m) => m.session === sessionId || (!m.session && sessionId === '2024-2025')
  );

  return (
    <section className={styles.sectionWrap} id="complete-team" aria-label="Collegiate Portrait Contact Sheet">
      {/* SECTION HEADER */}
      <div className={styles.header}>
        <div className={styles.headerMeta}>
          <span className={styles.sectionBadge}>SYSTEM 06 • COMPLETE ROSTER ARCHIVE</span>
          <span className={styles.headerDivider}>/</span>
          <span className={styles.headerCount}>{members.length} RECORDED APPOINTMENTS</span>
        </div>

        <div className={styles.headerMain}>
          <div>
            <h2 className={styles.heading}>Portrait Archive</h2>
            <p className={styles.lead}>
              Editorial contact sheet of inducted executive leadership and domain leads. Hover or select a portrait to illuminate individual credentials.
            </p>
          </div>
        </div>
      </div>

      {/* ASYMMETRIC EDITORIAL CONTACT SHEET */}
      <div className={styles.contactSheetGrid} role="list" aria-label="Student Chapter Members">
        {members.map((member, index) => {
          const isHovered = hoveredMemberId === member.memberId;
          // Apply rhythm variation: first member and fourth member span slightly larger
          const isHeroTile = index === 0 || index === 3;

          return (
            <motion.article
              key={member.memberId}
              role="listitem"
              className={`${styles.portraitCard} ${isHeroTile ? styles.portraitCardHero : ''} ${
                isHovered ? styles.portraitCardHovered : ''
              }`}
              onMouseEnter={() => setHoveredMemberId(member.memberId)}
              onMouseLeave={() => setHoveredMemberId(null)}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                href={`/team/${member.memberId}`}
                className={styles.cardLink}
                aria-label={`View profile of ${member.name}, ${member.designation}`}
              >
                {/* PORTRAIT FRAME CANVAS */}
                <div className={styles.portraitCanvas}>
                  {/* BASE MONOCHROME WITH CONTRAST BOOST ON HOVER */}
                  <div className={styles.portraitInner}>
                    <svg viewBox="0 0 300 380" className={styles.portraitSvg} aria-hidden="true">
                      <defs>
                        <linearGradient id={`grad-${member.memberId}`} x1="0" y1="0" x2="1" y2="1">
                          <stop offset="0%" stopColor="var(--surface-elevated)" />
                          <stop offset="100%" stopColor="var(--bg-tertiary)" />
                        </linearGradient>
                      </defs>
                      <rect width="300" height="380" fill={`url(#grad-${member.memberId})`} />
                      <circle cx="150" cy="140" r="54" fill="var(--fg-subtle)" opacity="0.35" />
                      <path d="M 60 380 C 60 250, 240 250, 240 380 Z" fill="var(--fg-subtle)" opacity="0.35" />
                      {/* Grid crosshair accents */}
                      <line x1="16" y1="16" x2="36" y2="16" stroke="var(--border-strong)" strokeWidth="1" />
                      <line x1="16" y1="16" x2="16" y2="36" stroke="var(--border-strong)" strokeWidth="1" />
                      <line x1="284" y1="364" x2="264" y2="364" stroke="var(--border-strong)" strokeWidth="1" />
                      <line x1="284" y1="364" x2="284" y2="344" stroke="var(--border-strong)" strokeWidth="1" />
                    </svg>

                    {/* VIVID ACCENT ILLUMINATION MASK */}
                    <div className={styles.chromaticSheen} />
                  </div>

                  {/* CORNER RETICLE & ID */}
                  <div className={styles.topBar}>
                    <span className={styles.memberIdTag}>{member.memberId}</span>
                    {member.verification?.isVerified && (
                      <span className={styles.verifiedIconWrap} title="Verified Credential">
                        <ShieldCheck size={13} className={styles.verifiedIcon} />
                      </span>
                    )}
                  </div>

                  {/* BOTTOM HOVER METADATA OVERLAY */}
                  <div className={styles.metadataOverlay}>
                    <div className={styles.roleSuper}>{member.designation.replace(' [Placeholder]', '')}</div>
                    <h3 className={styles.memberName}>{member.name}</h3>
                    <div className={styles.deptCode}>{member.department}</div>

                    <div className={styles.actionPrompt}>
                      <span>VIEW PROFILE</span>
                      <ArrowUpRight size={14} className={styles.arrowIcon} />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
};
