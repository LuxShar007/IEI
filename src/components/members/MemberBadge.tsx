'use client';

import React, { useState } from 'react';
import type { Member } from '@/lib/types/member';
import { Badge } from '@/components/ui/Badge/Badge';
import { ShieldCheck, Copy, Check, QrCode } from 'lucide-react';
import styles from './MemberBadge.module.css';

export interface MemberBadgeProps {
  member: Member;
  className?: string;
}

export const MemberBadge: React.FC<MemberBadgeProps> = ({ member, className }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyId = () => {
    navigator.clipboard.writeText(member.memberId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`${styles.badgeWrapper} ${className || ''}`}>
      {/* BADGE LANYARD PUNCH HOLE */}
      <div className={styles.punchHole} aria-hidden="true" />

      {/* METALLIC CARD FRAME */}
      <div className={styles.cardFrame}>
        {/* CARD HEADER */}
        <div className={styles.cardHeader}>
          <div className={styles.headerLeft}>
            <span className={styles.instAcronym}>IEI</span>
            <div className={styles.instMeta}>
              <span className={styles.instName}>THE INSTITUTION OF ENGINEERS (INDIA)</span>
              <span className={styles.chapterName}>SIES GST STUDENT CHAPTER • MH-04</span>
            </div>
          </div>
          <Badge variant="verified" size="sm" showPing>
            VERIFIED
          </Badge>
        </div>

        {/* PHOTO & BASIC IDENTITY */}
        <div className={styles.identitySection}>
          <div className={styles.photoContainer}>
            <div className={styles.photoPlaceholder}>
              <span className={styles.photoInitials}>
                {member.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
              </span>
            </div>
            <div className={styles.verifiedWatermark}>
              <ShieldCheck size={14} />
            </div>
          </div>

          <div className={styles.identityDetails}>
            <h3 className={styles.memberName}>{member.name}</h3>
            <div className={styles.memberDesignation}>{member.designation}</div>
            <div className={styles.deptText}>{member.department}</div>
            <div className={styles.yearText}>{member.year} • Session {member.session}</div>
          </div>
        </div>

        {/* MEMBER ID STRIP WITH COPY BUTTON */}
        <div className={styles.idStrip}>
          <div className={styles.idInfo}>
            <span className={styles.idLabel}>MEMBER ID</span>
            <span className={styles.idValue}>{member.memberId}</span>
          </div>
          <button
            onClick={handleCopyId}
            className={styles.copyButton}
            title="Copy Member ID"
            aria-label="Copy Member ID"
            data-cursor="button"
          >
            {copied ? <Check size={13} className={styles.checkIcon} /> : <Copy size={13} />}
          </button>
        </div>

        {/* QR CODE & DIGITAL INTEGRITY */}
        <div className={styles.qrSection}>
          <div className={styles.qrPlaceholder}>
            {/* VECTOR TECHNICAL QR REPRESENTATION */}
            <QrCode size={48} className={styles.qrGraphic} />
          </div>
          <div className={styles.qrDetails}>
            <span className={styles.qrTitle}>DIGITAL CREDENTIAL QR</span>
            <span className={styles.qrDescription}>
              Resolves to stable member endpoint at <code>/m/{member.memberId}</code>. Member information updates dynamically without re-issuing physical credentials.
            </span>
          </div>
        </div>

        {/* CARD FOOTER WITH CRYPTOGRAPHIC HASH */}
        <div className={styles.cardFooter}>
          <div className={styles.hashGroup}>
            <span className={styles.hashLabel}>SIG:</span>
            <span className={styles.hashValue}>
              {member.verification.signatureHash.slice(0, 24)}...
            </span>
          </div>
          <span className={styles.issuerTag}>{member.verification.issuer}</span>
        </div>
      </div>
    </div>
  );
};
