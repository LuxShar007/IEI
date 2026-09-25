'use client';

import React from 'react';
import { motion } from 'framer-motion';
import type { Member } from '@/lib/types/member';
import { MemberBadge } from '@/components/members/MemberBadge';
import { Badge } from '@/components/ui/Badge/Badge';
import { Button } from '@/components/ui/Button/Button';
import { Card } from '@/components/ui/Card/Card';
import { ShieldCheck, Calendar, Building, Mail, ExternalLink, Award, Sparkles } from 'lucide-react';
import { LinkedInIcon, GitHubIcon } from '@/components/ui/Icons/SocialIcons';
import { formatDate } from '@/lib/utils/format';
import styles from './MemberProfile.module.css';

export interface MemberProfileProps {
  member: Member;
}

export const MemberProfile: React.FC<MemberProfileProps> = ({ member }) => {
  return (
    <div className={styles.profileWrapper}>
      {/* ====================================================================
          HERO SECTION: SHARED-ELEMENT EDITORIAL PORTRAIT
          ==================================================================== */}
      <motion.section
        layoutId={`member-portrait-${member.memberId}`}
        className={styles.editorialHero}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        aria-label="Member Profile Header"
      >
        <div className={styles.heroGrid}>
          {/* LARGE PORTRAIT CANVAS */}
          <div className={styles.heroPortraitCanvas}>
            <svg viewBox="0 0 340 420" className={styles.portraitSvg} aria-hidden="true">
              <defs>
                <linearGradient id={`hero-grad-${member.memberId}`} x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="var(--surface-elevated)" />
                  <stop offset="50%" stopColor="var(--surface-base)" />
                  <stop offset="100%" stopColor="var(--bg-tertiary)" />
                </linearGradient>
              </defs>
              <rect width="340" height="420" fill={`url(#hero-grad-${member.memberId})`} />
              <circle cx="170" cy="160" r="64" fill="var(--fg-subtle)" opacity="0.4" />
              <path d="M 60 420 C 60 270, 280 270, 280 420 Z" fill="var(--fg-subtle)" opacity="0.4" />
              {/* Precision Reticles */}
              <line x1="20" y1="20" x2="50" y2="20" stroke="var(--border-strong)" strokeWidth="1" />
              <line x1="20" y1="20" x2="20" y2="50" stroke="var(--border-strong)" strokeWidth="1" />
              <line x1="320" y1="400" x2="290" y2="400" stroke="var(--border-strong)" strokeWidth="1" />
              <line x1="320" y1="400" x2="320" y2="370" stroke="var(--border-strong)" strokeWidth="1" />
            </svg>

            <div className={styles.heroPortraitBadge}>
              <span className={styles.heroMemberId}>{member.memberId}</span>
              {member.verification?.isVerified && (
                <span className={styles.heroVerifiedTag}>
                  <ShieldCheck size={13} />
                  <span>VERIFIED ACTIVE</span>
                </span>
              )}
            </div>
          </div>

          {/* EDITORIAL HERO METADATA */}
          <div className={styles.heroInfo}>
            <div className={styles.heroEyebrow}>
              <span className={styles.heroDept}>{member.department}</span>
              <span className={styles.heroDivider}>/</span>
              <span className={styles.heroSession}>{member.session}</span>
            </div>

            <h1 className={styles.heroName}>{member.name}</h1>
            <div className={styles.heroRole}>{member.designation.replace(' [Placeholder]', '')}</div>

            {/* VERIFICATION BANNER */}
            <div className={styles.statusBanner}>
              <div className={styles.statusIcon}>
                <ShieldCheck size={18} />
              </div>
              <div className={styles.statusDetails}>
                <div className={styles.statusTitle}>Official IEI Verified Member</div>
                <div className={styles.statusSubtitle}>
                  Authenticated under {member.metadata.chapterBranch} • Issued {formatDate(member.verification.verifiedAt)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ====================================================================
          DETAILS GRID: BADGE DISPLAY & ACCREDITED SECTIONS
          ==================================================================== */}
      <div className={styles.layoutGrid}>
        {/* LEFT COLUMN: DIGITAL BADGE DISPLAY */}
        <div className={styles.badgeColumn}>
          <MemberBadge member={member} />
          <div className={styles.badgeNote}>
            Cryptographic identity credential linked to physical badge. Validated through the IEI SIES GST central verification protocol.
          </div>
        </div>

        {/* RIGHT COLUMN: METADATA & PROFILE DETAILS */}
        <div className={styles.detailsColumn}>
          <Card variant="default" hasCornerAccents className={styles.infoCard}>
            {/* ABOUT SECTION */}
            {member.bio && (
              <div className={styles.contentSection}>
                <span className={styles.sectionLabel}>ABOUT & CHARTER MANDATE</span>
                <p className={styles.bioText}>{member.bio}</p>
              </div>
            )}

            {/* METADATA TILES */}
            <div className={styles.metaGrid}>
              <div className={styles.metaTile}>
                <Building className={styles.metaIcon} />
                <div>
                  <span className={styles.tileLabel}>DEPARTMENT</span>
                  <span className={styles.tileValue}>{member.department}</span>
                </div>
              </div>

              <div className={styles.metaTile}>
                <Calendar className={styles.metaIcon} />
                <div>
                  <span className={styles.tileLabel}>ACADEMIC SESSION</span>
                  <span className={styles.tileValue}>{member.session} ({member.year})</span>
                </div>
              </div>
            </div>

            {/* CHAPTER APPOINTMENTS */}
            {member.metadata.rolesHeld && member.metadata.rolesHeld.length > 0 && (
              <div className={styles.rolesSection}>
                <span className={styles.sectionLabel}>CHAPTER APPOINTMENTS</span>
                <div className={styles.rolesList}>
                  {member.metadata.rolesHeld.map((role, idx) => (
                    <span key={idx} className={styles.roleTag}>
                      {role}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* CONTRIBUTIONS (Only if approved data exists) */}
            {member.metadata.achievements && member.metadata.achievements.length > 0 && (
              <div className={styles.contentSection}>
                <span className={styles.sectionLabel}>CONTRIBUTIONS & ACHIEVEMENTS</span>
                <ul className={styles.achievementsList}>
                  {member.metadata.achievements.map((ach, idx) => (
                    <li key={idx} className={styles.achievementItem}>
                      <Sparkles size={14} className={styles.achievementIcon} />
                      <span>{ach}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* VERIFIED CHANNELS & SOCIALS */}
            <div className={styles.contactSection}>
              <span className={styles.sectionLabel}>VERIFIED CHANNELS</span>
              <div className={styles.channelRow}>
                {member.email && (
                  <Button
                    href={`mailto:${member.email}`}
                    variant="outline"
                    size="sm"
                    leftIcon={<Mail size={14} />}
                    isExternal
                  >
                    {member.email}
                  </Button>
                )}
                {member.socialLinks.linkedin && (
                  <Button
                    href={member.socialLinks.linkedin}
                    variant="secondary"
                    size="sm"
                    leftIcon={<LinkedInIcon size={14} />}
                    isExternal
                  >
                    LinkedIn
                  </Button>
                )}
                {member.socialLinks.github && (
                  <Button
                    href={member.socialLinks.github}
                    variant="secondary"
                    size="sm"
                    leftIcon={<GitHubIcon size={14} />}
                    isExternal
                  >
                    GitHub
                  </Button>
                )}
              </div>
            </div>

            {/* SECURITY AUDIT STRIP */}
            <div className={styles.securityStrip}>
              <div className={styles.securityItem}>
                <span className={styles.secKey}>CREDENTIAL ID:</span>
                <span className={styles.secVal}>{member.verification.credentialId}</span>
              </div>
              <div className={styles.securityItem}>
                <span className={styles.secKey}>ISSUER:</span>
                <span className={styles.secVal}>{member.verification.issuer}</span>
              </div>
              <div className={styles.securityItem}>
                <span className={styles.secKey}>SHA-256 SIGNATURE:</span>
                <span className={styles.secHash}>{member.verification.signatureHash.slice(0, 16)}...</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
