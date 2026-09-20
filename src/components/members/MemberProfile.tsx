'use client';

import React from 'react';
import type { Member } from '@/lib/types/member';
import { MemberBadge } from '@/components/members/MemberBadge';
import { Badge } from '@/components/ui/Badge/Badge';
import { Button } from '@/components/ui/Button/Button';
import { Card } from '@/components/ui/Card/Card';
import { ShieldCheck, Calendar, Building, Mail, ExternalLink } from 'lucide-react';
import { LinkedInIcon, GitHubIcon } from '@/components/ui/Icons/SocialIcons';
import { formatDate } from '@/lib/utils/format';
import styles from './MemberProfile.module.css';

export interface MemberProfileProps {
  member: Member;
}

export const MemberProfile: React.FC<MemberProfileProps> = ({ member }) => {
  return (
    <div className={styles.profileWrapper}>
      {/* VERIFICATION BANNER */}
      <div className={styles.statusBanner}>
        <div className={styles.statusLeft}>
          <div className={styles.statusIcon}>
            <ShieldCheck size={20} />
          </div>
          <div>
            <div className={styles.statusTitle}>Official IEI Verified Member</div>
            <div className={styles.statusSubtitle}>
              Authenticated under {member.metadata.chapterBranch} • Issued {formatDate(member.verification.verifiedAt)}
            </div>
          </div>
        </div>
        <Badge variant="verified" size="md" showPing>
          VERIFIED ACTIVE
        </Badge>
      </div>

      <div className={styles.layoutGrid}>
        {/* LEFT COLUMN: DIGITAL BADGE DISPLAY */}
        <div className={styles.badgeColumn}>
          <MemberBadge member={member} />
          <div className={styles.badgeNote}>
            Digital identity credential linked to physical card badge. Validated through the IEI SIES GST central verification protocol.
          </div>
        </div>

        {/* RIGHT COLUMN: METADATA & PROFILE DETAILS */}
        <div className={styles.detailsColumn}>
          <Card variant="default" hasCornerAccents className={styles.infoCard}>
            <div className={styles.cardHeader}>
              <span className="overline">CREDENTIAL METADATA</span>
              <h2 className={styles.memberName}>{member.name}</h2>
              <div className={styles.memberRole}>{member.designation}</div>
            </div>

            <p className={styles.bioText}>{member.bio}</p>

            {/* METADATA GRID */}
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

            {/* ROLES HELD */}
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

            {/* CONTACT & SOCIALS */}
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
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
