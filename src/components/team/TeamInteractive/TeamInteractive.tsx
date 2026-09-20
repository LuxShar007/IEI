'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { placeholderMembers } from '@/data/members';
import type { Member } from '@/lib/types/member';
import { ArrowRight, ShieldCheck, User } from 'lucide-react';
import { Button } from '@/components/ui/Button/Button';
import styles from './TeamInteractive.module.css';

// Coordinates and silhouette hot-spots for the 4 council members in the group photo
const memberHotspots = [
  {
    memberId: 'IEI-GST-2025-001',
    x: 38, // percentage across width
    y: 42, // percentage across height
    width: 20,
    height: 55,
    label: '01 · President',
    clipPath: 'polygon(50% 0%, 75% 18%, 85% 42%, 78% 95%, 22% 95%, 15% 42%, 25% 18%)',
  },
  {
    memberId: 'IEI-GST-2025-002',
    x: 18,
    y: 46,
    width: 20,
    height: 52,
    label: '02 · Vice President',
    clipPath: 'polygon(50% 0%, 78% 20%, 82% 45%, 75% 95%, 25% 95%, 18% 45%, 22% 20%)',
  },
  {
    memberId: 'IEI-GST-2025-003',
    x: 60,
    y: 45,
    width: 20,
    height: 53,
    label: '03 · Secretary',
    clipPath: 'polygon(50% 0%, 76% 19%, 84% 44%, 76% 95%, 24% 95%, 16% 44%, 24% 19%)',
  },
  {
    memberId: 'IEI-GST-2025-042',
    x: 80,
    y: 48,
    width: 20,
    height: 50,
    label: '04 · Technical Head',
    clipPath: 'polygon(50% 0%, 75% 22%, 80% 46%, 74% 95%, 26% 95%, 20% 46%, 25% 22%)',
  },
];

export const TeamInteractive: React.FC = () => {
  const [activeMemberId, setActiveMemberId] = useState<string>('IEI-GST-2025-001');
  const [hoveredMemberId, setHoveredMemberId] = useState<string | null>(null);

  const currentMember = placeholderMembers.find((m) => m.memberId === activeMemberId) || placeholderMembers[0];
  const highlightedId = hoveredMemberId || activeMemberId;

  return (
    <div className={styles.container} aria-label="Interactive Chapter Leadership Group">
      {/* HEADER BAR */}
      <div className={styles.headerBar}>
        <div>
          <span className="text-overline">Interactive Leadership Group</span>
          <h2 className={styles.title}>The Executive Council</h2>
        </div>
        <p className={styles.caption}>
          Select a member within the group photograph to reveal their profile and credentials.
        </p>
      </div>

      {/* MAIN INTERACTIVE STAGE */}
      <div className={styles.stageGrid}>
        {/* LEFT / CENTER: THE LARGE GROUP PHOTOGRAPH */}
        <div className={styles.photographFrame} role="region" aria-label="Group Photograph with selectable members">
          {/* BASE LAYER: Studio Architectural Silhouette Group (Monochrome) */}
          <div className={styles.baseGroupMonochrome}>
            <svg
              viewBox="0 0 1000 600"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={styles.groupSvg}
            >
              <defs>
                <linearGradient id="monochromeBackdrop" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="var(--surface-card)" />
                  <stop offset="100%" stopColor="var(--surface-elevated)" />
                </linearGradient>
                <linearGradient id="figureShadow" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="var(--fg-subtle)" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="var(--fg-muted)" stopOpacity="0.8" />
                </linearGradient>
              </defs>

              {/* Architectural Backdrop */}
              <rect width="1000" height="600" fill="url(#monochromeBackdrop)" />
              <line x1="0" y1="520" x2="1000" y2="520" stroke="var(--border-subtle)" strokeWidth="2" />
              <line x1="100" y1="0" x2="100" y2="520" stroke="var(--border-subtle)" strokeDasharray="4 6" />
              <line x1="900" y1="0" x2="900" y2="520" stroke="var(--border-subtle)" strokeDasharray="4 6" />

              {/* Four Figures Outline in Group Pose */}
              {/* Figure 1 (VP) */}
              <g className={styles.figSilhouette}>
                <circle cx="200" cy="220" r="42" fill="url(#figureShadow)" />
                <path d="M 140 520 L 160 300 L 200 270 L 240 300 L 260 520 Z" fill="url(#figureShadow)" />
              </g>
              {/* Figure 2 (President - Center Standing) */}
              <g className={styles.figSilhouette}>
                <circle cx="400" cy="190" r="46" fill="url(#figureShadow)" />
                <path d="M 330 520 L 350 280 L 400 250 L 450 280 L 470 520 Z" fill="url(#figureShadow)" />
              </g>
              {/* Figure 3 (Secretary) */}
              <g className={styles.figSilhouette}>
                <circle cx="620" cy="210" r="44" fill="url(#figureShadow)" />
                <path d="M 555 520 L 575 295 L 620 265 L 665 295 L 685 520 Z" fill="url(#figureShadow)" />
              </g>
              {/* Figure 4 (Technical Head) */}
              <g className={styles.figSilhouette}>
                <circle cx="820" cy="230" r="40" fill="url(#figureShadow)" />
                <path d="M 765 520 L 785 310 L 820 280 L 855 310 L 875 520 Z" fill="url(#figureShadow)" />
              </g>
            </svg>
          </div>

          {/* INTERACTIVE SPOTLIGHT OVERLAYS (One for each person) */}
          {memberHotspots.map((spot) => {
            const isHighlighted = highlightedId === spot.memberId;
            const memberObj = placeholderMembers.find((m) => m.memberId === spot.memberId);

            return (
              <button
                key={spot.memberId}
                type="button"
                className={`${styles.hotspotBtn} ${isHighlighted ? styles.hotspotActive : ''}`}
                style={{
                  left: `${spot.x}%`,
                  top: `${spot.y}%`,
                  width: `${spot.width}%`,
                  height: `${spot.height}%`,
                }}
                onClick={() => setActiveMemberId(spot.memberId)}
                onMouseEnter={() => setHoveredMemberId(spot.memberId)}
                onMouseLeave={() => setHoveredMemberId(null)}
                aria-label={`Select ${memberObj?.name || spot.label}, ${memberObj?.designation}`}
                aria-pressed={activeMemberId === spot.memberId}
              >
                {/* COLOR REVEAL MASK — transitions ONLY the selected person into rich accent color */}
                <div
                  className={`${styles.colorClippedLayer} ${isHighlighted ? styles.colorRevealed : ''}`}
                  style={{ clipPath: spot.clipPath }}
                >
                  <div className={styles.colorFigureAura} />
                </div>

                {/* TARGET INDICATOR RING */}
                <div className={styles.targetIndicator}>
                  <span className={styles.targetDot} />
                  <span className={styles.targetTag}>{spot.label}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* RIGHT: THE TEAM PROFILE PANEL */}
        <aside className={styles.profilePanel} aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentMember.memberId}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className={styles.profileCard}
            >
              {/* MEMBER HEADER */}
              <div className={styles.cardHeader}>
                <div className={styles.avatarPill}>
                  <User size={18} className={styles.avatarIcon} />
                  <span className={styles.memberIdBadge}>{currentMember.memberId}</span>
                </div>
                {currentMember.verification?.isVerified && (
                  <div className={styles.verifiedTag}>
                    <ShieldCheck size={13} />
                    <span>Verified</span>
                  </div>
                )}
              </div>

              {/* TITLES */}
              <h3 className={styles.memberName}>{currentMember.name}</h3>
              <p className={styles.memberRole}>{currentMember.designation}</p>

              <div className={styles.infoMeta}>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Department</span>
                  <span className={styles.infoVal}>{currentMember.department}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Year / Session</span>
                  <span className={styles.infoVal}>{currentMember.year} · {currentMember.session}</span>
                </div>
              </div>

              <p className={styles.memberBio}>{currentMember.bio}</p>

              {/* ACTION LINK TO DEDICATED PROFILE */}
              <div style={{ marginTop: 'var(--space-4)' }}>
                <Button
                  href={`/team/${currentMember.memberId}`}
                  variant="primary"
                  size="md"
                  rightIcon={<ArrowRight size={14} />}
                >
                  View Full Profile & Credentials
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* QUICK SELECTOR CHIPS */}
          <div className={styles.chipRow}>
            {placeholderMembers.map((m) => (
              <Button
                key={m.memberId}
                variant={activeMemberId === m.memberId ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setActiveMemberId(m.memberId)}
              >
                {m.designation.replace(' [Placeholder]', '')}
              </Button>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
};
