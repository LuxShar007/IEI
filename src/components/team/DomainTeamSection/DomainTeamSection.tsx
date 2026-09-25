'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { domainDefinitions } from '@/data/team';
import type { DomainId, DomainDefinition } from '@/lib/types/team';
import { MemberCard } from '@/components/members/MemberCard';
import { CheckCircle2, Shield, Award, Users, Sparkles, Network } from 'lucide-react';
import styles from './DomainTeamSection.module.css';

interface DomainNodeProps {
  domain: DomainDefinition;
  isActive: boolean;
  onSelect: () => void;
}

const DomainNode: React.FC<DomainNodeProps> = ({ domain, isActive, onSelect }) => {
  const coords = domain.nodeCoords || { x: 50, y: 50 };

  return (
    <div
      className={`${styles.spatialNode} ${isActive ? styles.spatialNodeActive : ''}`}
      style={{
        left: `${coords.x}%`,
        top: `${coords.y}%`,
      }}
    >
      <button
        type="button"
        className={styles.nodeTrigger}
        onClick={onSelect}
        aria-label={`Select domain: ${domain.name}`}
        aria-pressed={isActive}
      >
        <span className={styles.nodeIndicatorDot} />
        <span className={styles.nodeCode}>{domain.shortCode}</span>
      </button>
      <span className={styles.nodeLabel}>{domain.name}</span>
    </div>
  );
};

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
    <section className={styles.sectionWrap} id="domains" aria-label="Domain Universe & Operational Wings">
      {/* SECTION HEADER */}
      <div className={styles.header}>
        <div className={styles.headerMeta}>
          <span className={styles.sectionBadge}>SYSTEM 05 • ORGANIZATIONAL UNIVERSE</span>
          <span className={styles.headerDivider}>/</span>
          <span className={styles.headerCode}>SEVEN SPECIALIZED ENGINEERING WINGS</span>
        </div>

        <div className={styles.headerMain}>
          <div>
            <h2 className={styles.heading}>Domain Universe</h2>
            <p className={styles.lead}>
              Explore the chapter’s multidisciplinary departments. Select a domain node to inspect its charter, volunteer responsibilities, and four-tier hierarchy.
            </p>
          </div>
        </div>
      </div>

      {/* DUAL-PANE WORKSPACE: LEFT EDITORIAL INDEX & DESKTOP SPATIAL VISUALIZATION */}
      <div className={styles.universeGrid}>
        {/* LEFT COLUMN: EDITORIAL DOMAIN INDEX */}
        <aside className={styles.indexColumn} aria-label="Domain Index Directory">
          <div className={styles.indexHeader}>
            <span className={styles.indexTitle}>DOMAIN INDEX</span>
            <span className={styles.indexCount}>07 WINGS</span>
          </div>

          <div className={styles.indexList} role="tablist" aria-label="Chapter Domains">
            {domainDefinitions.map((domain, idx) => {
              const isActive = domain.id === activeDomainId;
              const indexStr = `0${idx + 1}`;

              return (
                <button
                  key={domain.id}
                  role="tab"
                  aria-selected={isActive}
                  className={`${styles.indexItem} ${isActive ? styles.indexItemActive : ''}`}
                  onClick={() => setActiveDomainId(domain.id)}
                >
                  <span className={styles.indexNum}>{indexStr}</span>
                  <span className={styles.indexName}>{domain.name}</span>
                  <span className={styles.indexShort}>{domain.shortCode}</span>
                </button>
              );
            })}
          </div>
        </aside>

        {/* RIGHT COLUMN: SPATIAL NETWORK VISUALIZATION (DESKTOP) */}
        <div className={styles.visualizationColumn} aria-hidden="true">
          <div className={styles.networkStage}>
            {/* SVG VECTOR TRACE LINES BETWEEN NODES */}
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className={styles.networkSvg}>
              {/* Central IEI Core to Technical (50, 50 to 50, 14) */}
              <line
                x1="50"
                y1="50"
                x2="50"
                y2="14"
                className={`${styles.networkLine} ${activeDomainId === 'technical' ? styles.networkLineActive : ''}`}
              />
              {/* Core to Media (50, 50 to 22, 34) */}
              <line
                x1="50"
                y1="50"
                x2="22"
                y2="34"
                className={`${styles.networkLine} ${activeDomainId === 'media' ? styles.networkLineActive : ''}`}
              />
              {/* Core to Design (50, 50 to 78, 34) */}
              <line
                x1="50"
                y1="50"
                x2="78"
                y2="34"
                className={`${styles.networkLine} ${activeDomainId === 'design' ? styles.networkLineActive : ''}`}
              />
              {/* Media to Creative (22, 34 to 26, 60) */}
              <line
                x1="22"
                y1="34"
                x2="26"
                y2="60"
                className={`${styles.networkLine} ${activeDomainId === 'creative' ? styles.networkLineActive : ''}`}
              />
              {/* Design to Publicity (78, 34 to 82, 64) */}
              <line
                x1="78"
                y1="34"
                x2="82"
                y2="64"
                className={`${styles.networkLine} ${activeDomainId === 'publicity' ? styles.networkLineActive : ''}`}
              />
              {/* Creative to Editorial (26, 60 to 50, 84) */}
              <line
                x1="26"
                y1="60"
                x2="50"
                y2="84"
                className={`${styles.networkLine} ${activeDomainId === 'editorial' ? styles.networkLineActive : ''}`}
              />
              {/* Creative to Outreach (26, 60 to 18, 84) */}
              <line
                x1="26"
                y1="60"
                x2="18"
                y2="84"
                className={`${styles.networkLine} ${activeDomainId === 'industry_outreach_admin' ? styles.networkLineActive : ''}`}
              />
            </svg>

            {/* CENTRAL IEI CORE NODE */}
            <div className={styles.coreNode}>
              <div className={styles.coreNodeCircle}>
                <span className={styles.coreNodeText}>IEI</span>
                <span className={styles.coreNodeSub}>ECS</span>
              </div>
            </div>

            {/* 7 PERIPHERAL DOMAIN NODES */}
            {domainDefinitions.map((domain) => (
              <DomainNode
                key={domain.id}
                domain={domain}
                isActive={domain.id === activeDomainId}
                onSelect={() => setActiveDomainId(domain.id)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ACTIVE DOMAIN CHARTER & 4-TIER HIERARCHY */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentDomain.id}
          className={styles.domainDetailCard}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* DOMAIN HEADER & RESPONSIBILITIES */}
          <div className={styles.charterBlock}>
            <div className={styles.charterTop}>
              <div className={styles.domainIdent}>
                <span className={styles.domainCodePill}>IEI-ECS-{currentDomain.shortCode}</span>
                <span className={styles.domainWingPill}>ACTIVE WING CHARTER</span>
              </div>
              <h3 className={styles.domainHeading}>{currentDomain.name}</h3>
              <p className={styles.domainDescription}>{currentDomain.description}</p>
            </div>

            <div className={styles.responsibilitiesBlock}>
              <h4 className={styles.respHeader}>Volunteer Scope & Operational Responsibilities</h4>
              <ul className={styles.respList}>
                {currentDomain.responsibilities.map((resp, idx) => (
                  <li key={idx} className={styles.respItem}>
                    <CheckCircle2 size={15} className={styles.checkIcon} />
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 4-TIER HIERARCHY ROSTER */}
          <div className={styles.hierarchySection}>
            <div className={styles.hierarchyHeader}>
              <h4 className={styles.hierarchyHeading}>Domain Hierarchy & Appointments</h4>
              <span className={styles.hierarchyTiers}>Tiers: Mentor • Head • Coordinator • Volunteer</span>
            </div>

            <div className={styles.tiersGrid}>
              {tiers.map((tier) => {
                const members = currentDomain.members[tier.key] || [];
                const Icon = tier.icon;

                return (
                  <div key={tier.key} className={styles.tierCard}>
                    <div className={styles.tierTop}>
                      <div className={styles.tierIconWrap}>
                        <Icon size={16} className={styles.tierIcon} />
                      </div>
                      <div>
                        <h5 className={styles.tierTitle}>{tier.label}</h5>
                        <p className={styles.tierDesc}>{tier.desc}</p>
                      </div>
                    </div>

                    <div className={styles.tierRoster}>
                      {members.length > 0 ? (
                        <div className={styles.memberStack}>
                          {members.map((member) => (
                            <MemberCard key={member.memberId} member={member} compact />
                          ))}
                        </div>
                      ) : (
                        <div className={styles.emptyNotice}>
                          <span className={styles.emptyDot} />
                          <span>Appointment under induction</span>
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
    </section>
  );
};
