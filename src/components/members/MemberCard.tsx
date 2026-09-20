import React from 'react';
import Link from 'next/link';
import type { Member } from '@/lib/types/member';
import { Card } from '@/components/ui/Card/Card';
import { Badge } from '@/components/ui/Badge/Badge';
import { ShieldCheck, ArrowUpRight } from 'lucide-react';
import styles from './MemberCard.module.css';

export interface MemberCardProps {
  member: Member;
  compact?: boolean;
}

export const MemberCard: React.FC<MemberCardProps> = ({ member, compact }) => {
  return (
    <Card variant="default" hasCornerAccents isHoverable className={styles.card}>
      <Link href={`/team/${member.memberId}`} className={styles.cardLink} data-cursor="view">
        <div className={styles.header}>
          <div className={styles.avatar}>
            <span className={styles.initials}>
              {member.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
            </span>
            {member.verification.isVerified && (
              <span className={styles.verifiedDot} title="Verified Credential">
                <ShieldCheck size={12} />
              </span>
            )}
          </div>
          <Badge variant="verified" size="sm">
            {member.verification.badgeType}
          </Badge>
        </div>

        <div className={styles.content}>
          <h3 className={styles.name}>{member.name}</h3>
          <span className={styles.designation}>{member.designation}</span>
          <span className={styles.department}>{member.department}</span>
        </div>

        <div className={styles.footer}>
          <span className={styles.memberId}>{member.memberId}</span>
          <span className={styles.actionPrompt}>
            <span>Profile</span>
            <ArrowUpRight size={14} />
          </span>
        </div>
      </Link>
    </Card>
  );
};
