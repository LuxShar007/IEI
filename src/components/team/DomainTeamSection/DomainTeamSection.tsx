'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { domainDefinitions } from '@/data/team';
import type { DomainId, DomainDefinition } from '@/lib/types/team';
import { MemberCard } from '@/components/members/MemberCard';
import { Button } from '@/components/ui/Button/Button';
import { CheckCircle, Shield, Award, Users, ChevronRight, Sparkles } from 'lucide-react';
import styles from './DomainTeamSection.module.css';

export const DomainTeamSection: React.FC = () => {
  const [activeDomainId, setActiveDomainId] = useState<DomainId>('technical');

  const currentDomain: DomainDefinition =
    domainDefinitions.find((d) => d.id === activeDomainId) || domainDefinitions[0];

  const tiers = [
    { key: 'mentors' as const, label: 'Mentors', icon: Award, desc: 'Senior advisory & technical oversight' },
    { key: 'heads' as const, label: 'Domain Heads', icon: Shield, desc: 'Executive management & delivery leads' },
    { key: 'coordinators' as const, label: 'Coordinators', icon: Users, desc: 'Operational flow & session logistics' },
    { key: 'volunteers' as const, label: 'Volunteers', icon: Sparkles, desc: 'Departmental execution & member initiatives' },
  ];

  return (
    <div className={styles.sectionWrap} aria-label="Domain Teams & Hierarchy">
      <div className={styles.header}>
        <span className="text-overline">Operational Wings</span>
        <h2 className={styles.heading}>Domain Teams & Responsibilities</h2>
        <p className={styles.sub}>
          Specialized departmental wings driving technical execution, industry liaison, media, creative, and institutional publishing.
        </p>
      </div>

      {/* 7 DOMAIN NAVIGATION TABS */}
      <div className={styles.tabNav} role="tablist" aria-label="Select Domain">
        {domainDefinitions.map((domain) => {
          const isActive = domain.id === activeDomainId;
          return (
            <Button
              key={domain.id}
              role="tab"
              aria-selected={isActive}
              variant={isActive ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setActiveDomainId(domain.id)}
            >
              <span style={{ opacity: 0.7, marginRight: 6 }}>{domain.shortCode}</span>
              <span>{domain.name}</span>
            </Button>
          );
        })}
      </div>

      {/* ACTIVE DOMAIN DETAILS */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentDomain.id}
          className={styles.domainContent}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* OVERVIEW & VOLUNTEER ROLE MANDATE */}
          <div className={styles.overviewCard}>
            <div className={styles.badgeRow}>
              <span className={styles.domainBadge}>{currentDomain.name} Wing</span>
              <span className={styles.codeTag}>IEI-ECS-{currentDomain.shortCode}</span>
            </div>

            <h3 className={styles.domainTitle}>{currentDomain.name}</h3>
            <p className={styles.domainDesc}>{currentDomain.description}</p>

            <div className={styles.responsibilitiesBlock}>
              <h4 className={styles.respHeader}>Key Operational Responsibilities & Volunteer Scope</h4>
              <ul className={styles.respList}>
                {currentDomain.responsibilities.map((resp, idx) => (
                  <li key={idx} className={styles.respItem}>
                    <CheckCircle size={15} className={styles.checkIcon} />
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 4-TIER HIERARCHY STRUCTURE */}
          <div className={styles.hierarchyWrap}>
            <div className={styles.hierarchyHeader}>
              <h4 className={styles.hierarchyTitle}>Domain Hierarchy & Appointments</h4>
              <span className={styles.hierarchySub}>Tiers: Mentor · Head · Coordinator · Volunteer</span>
            </div>

            <div className={styles.tiersGrid}>
              {tiers.map((tier) => {
                const members = currentDomain.members[tier.key] || [];
                const Icon = tier.icon;

                return (
                  <div key={tier.key} className={styles.tierColumn}>
                    <div className={styles.tierHeader}>
                      <div className={styles.tierIcon}>
                        <Icon size={16} />
                      </div>
                      <div>
                        <h5 className={styles.tierLabel}>{tier.label}</h5>
                        <p className={styles.tierDesc}>{tier.desc}</p>
                      </div>
                    </div>

                    <div className={styles.tierBody}>
                      {members.length > 0 ? (
                        <div className={styles.memberList}>
                          {members.map((member) => (
                            <MemberCard key={member.memberId} member={member} compact />
                          ))}
                        </div>
                      ) : (
                        <div className={styles.emptyTierNotice}>
                          <span className={styles.emptyDot} />
                          <span>Roster under induction</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
