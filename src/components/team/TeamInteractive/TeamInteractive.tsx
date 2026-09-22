'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { placeholderMembers } from '@/data/members';
import type { Member } from '@/lib/types/member';
import { Button } from '@/components/ui/Button/Button';
import { ShieldCheck, ArrowRight, X, User, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { LinkedInIcon, GitHubIcon } from '@/components/ui/Icons/SocialIcons';
import styles from './TeamInteractive.module.css';

interface HotspotDefinition {
  memberId: string;
  name: string;
  role: string;
  domain: string;
  label: string;
  seatNumber: string;
  x: number; // percentage from left
  y: number; // percentage from top
  width: number;
  height: number;
  headCenter: { x: number; y: number };
  clipPolygon: string;
}

const COUNCIL_HOTSPOTS: HotspotDefinition[] = [
  {
    memberId: 'IEI-GST-2025-002',
    name: 'Sample Vice President',
    role: 'Vice President',
    domain: 'Industry Outreach & Executive Coordination',
    label: '01 · Vice President',
    seatNumber: 'EXEC-02',
    x: 14,
    y: 32,
    width: 20,
    height: 60,
    headCenter: { x: 24, y: 38 },
    clipPolygon: 'polygon(50% 0%, 78% 14%, 90% 36%, 82% 96%, 18% 96%, 10% 36%, 22% 14%)',
  },
  {
    memberId: 'IEI-GST-2025-001',
    name: 'Sample Executive Member',
    role: 'President',
    domain: 'Chapter Governance & Executive Operations',
    label: '02 · President',
    seatNumber: 'EXEC-01',
    x: 35,
    y: 24,
    width: 22,
    height: 68,
    headCenter: { x: 46, y: 31 },
    clipPolygon: 'polygon(50% 0%, 76% 12%, 88% 34%, 82% 96%, 18% 96%, 12% 34%, 24% 12%)',
  },
  {
    memberId: 'IEI-GST-2025-003',
    name: 'Sample General Secretary',
    role: 'Secretary',
    domain: 'Editorial Governance & Administration',
    label: '03 · Secretary',
    seatNumber: 'EXEC-03',
    x: 57,
    y: 30,
    width: 21,
    height: 62,
    headCenter: { x: 67, y: 36 },
    clipPolygon: 'polygon(50% 0%, 78% 14%, 88% 36%, 80% 96%, 20% 96%, 12% 36%, 22% 14%)',
  },
  {
    memberId: 'IEI-GST-2025-042',
    name: 'Sample Technical Lead',
    role: 'Technical Head',
    domain: 'Technical Wing & Laboratory Initiatives',
    label: '04 · Technical Head',
    seatNumber: 'EXEC-04',
    x: 77,
    y: 34,
    width: 19,
    height: 58,
    headCenter: { x: 86, y: 40 },
    clipPolygon: 'polygon(50% 0%, 75% 15%, 86% 38%, 78% 96%, 22% 96%, 14% 38%, 25% 15%)',
  },
];

export const TeamInteractive: React.FC = () => {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<string>('IEI-GST-2025-001');
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  const stageRef = useRef<HTMLDivElement>(null);
  const activeSpot = COUNCIL_HOTSPOTS.find((s) => s.memberId === selectedId) || COUNCIL_HOTSPOTS[1];
  const activeMember = placeholderMembers.find((m) => m.memberId === selectedId) || placeholderMembers[0];
  const activeIndex = COUNCIL_HOTSPOTS.findIndex((s) => s.memberId === selectedId);

  // Keyboard navigation through council members
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        const nextIdx = (activeIndex + 1) % COUNCIL_HOTSPOTS.length;
        setSelectedId(COUNCIL_HOTSPOTS[nextIdx].memberId);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        const prevIdx = (activeIndex - 1 + COUNCIL_HOTSPOTS.length) % COUNCIL_HOTSPOTS.length;
        setSelectedId(COUNCIL_HOTSPOTS[prevIdx].memberId);
      } else if (e.key === 'Escape') {
        setHoveredId(null);
      }
    },
    [activeIndex]
  );

  // Shared-element expansion trigger
  const handleViewProfile = (memberId: string) => {
    setIsTransitioning(true);
    setTimeout(() => {
      router.push(`/team/${memberId}`);
    }, 280);
  };

  return (
    <section
      className={styles.sectionWrap}
      aria-label="Interactive Leadership Portrait"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {/* SECTION HEADER BAR */}
      <div className={styles.header}>
        <div className={styles.headerMeta}>
          <span className={styles.sectionBadge}>SYSTEM 02 • EXECUTIVE SPOTLIGHT</span>
          <span className={styles.headerDivider}>/</span>
          <span className={styles.headerInstruction}>
            SELECT FIGURE TO REVEAL ISOLATED CHROMATIC SILHOUETTE & CREDENTIALS
          </span>
        </div>
        <div className={styles.headerMain}>
          <h2 className={styles.heading}>The Executive Council</h2>
          <div className={styles.quickSelector} role="group" aria-label="Cycle executive council">
            <button
              type="button"
              className={styles.cycleBtn}
              onClick={() => {
                const prev = (activeIndex - 1 + COUNCIL_HOTSPOTS.length) % COUNCIL_HOTSPOTS.length;
                setSelectedId(COUNCIL_HOTSPOTS[prev].memberId);
              }}
              aria-label="Previous executive member"
            >
              <ChevronLeft size={16} />
            </button>
            <span className={styles.cycleIndicator}>
              0{activeIndex + 1} / 0{COUNCIL_HOTSPOTS.length}
            </span>
            <button
              type="button"
              className={styles.cycleBtn}
              onClick={() => {
                const next = (activeIndex + 1) % COUNCIL_HOTSPOTS.length;
                setSelectedId(COUNCIL_HOTSPOTS[next].memberId);
              }}
              aria-label="Next executive member"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* STAGE CONTAINER */}
      <div
        ref={stageRef}
        className={styles.stageContainer}
      >
        {/* GROUP PHOTOGRAPH ARCHITECTURAL STAGE */}
        <div className={styles.photographFrame} role="region" aria-label="Collegiate Leadership Portrait">
          {/* ====================================================================
              LAYER 1: MONOCHROME BASE LAYER (100% Black & White)
              Quietens/dims slightly when a member is actively selected
              ==================================================================== */}
          <div
            className={`${styles.monochromeLayer} ${selectedId ? styles.monochromeQuieted : ''}`}
            aria-hidden="true"
          >
            <svg
              viewBox="0 0 1200 680"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={styles.stageSvg}
              preserveAspectRatio="xMidYMid slice"
            >
              <defs>
                <linearGradient id="monoBackdrop" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--surface-card)" />
                  <stop offset="50%" stopColor="var(--surface-base)" />
                  <stop offset="100%" stopColor="var(--bg-tertiary)" />
                </linearGradient>

                <linearGradient id="monoFigureGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--fg-subtle)" stopOpacity="0.35" />
                  <stop offset="40%" stopColor="var(--fg-muted)" stopOpacity="0.75" />
                  <stop offset="100%" stopColor="var(--fg-primary)" stopOpacity="0.9" />
                </linearGradient>
              </defs>

              {/* Architectural Backdrop & Coordinate Grid */}
              <rect width="1200" height="680" fill="url(#monoBackdrop)" />
              <line x1="60" y1="590" x2="1140" y2="590" stroke="var(--border-subtle)" strokeWidth="1" />
              <line x1="60" y1="80" x2="1140" y2="80" stroke="var(--border-subtle)" strokeWidth="1" strokeDasharray="4 8" />
              <line x1="280" y1="40" x2="280" y2="640" stroke="var(--border-subtle)" strokeWidth="1" strokeDasharray="2 10" />
              <line x1="550" y1="40" x2="550" y2="640" stroke="var(--border-subtle)" strokeWidth="1" strokeDasharray="2 10" />
              <line x1="800" y1="40" x2="800" y2="640" stroke="var(--border-subtle)" strokeWidth="1" strokeDasharray="2 10" />
              <line x1="1030" y1="40" x2="1030" y2="640" stroke="var(--border-subtle)" strokeWidth="1" strokeDasharray="2 10" />

              {/* FIGURE 1: Vice President (Left) */}
              <g id="fig-mono-1" className={styles.monoFigure}>
                <circle cx="280" cy="255" r="48" fill="url(#monoFigureGrad)" />
                <path d="M 200 590 L 225 350 L 280 315 L 335 350 L 360 590 Z" fill="url(#monoFigureGrad)" />
              </g>

              {/* FIGURE 2: President (Center Standing - Apex) */}
              <g id="fig-mono-2" className={styles.monoFigure}>
                <circle cx="550" cy="210" r="54" fill="url(#monoFigureGrad)" />
                <path d="M 455 590 L 485 315 L 550 280 L 615 315 L 645 590 Z" fill="url(#monoFigureGrad)" />
              </g>

              {/* FIGURE 3: Secretary (Center-Right) */}
              <g id="fig-mono-3" className={styles.monoFigure}>
                <circle cx="800" cy="245" r="50" fill="url(#monoFigureGrad)" />
                <path d="M 720 590 L 745 340 L 800 305 L 855 340 L 880 590 Z" fill="url(#monoFigureGrad)" />
              </g>

              {/* FIGURE 4: Technical Head (Right) */}
              <g id="fig-mono-4" className={styles.monoFigure}>
                <circle cx="1030" cy="270" r="46" fill="url(#monoFigureGrad)" />
                <path d="M 960 590 L 980 360 L 1030 330 L 1080 360 L 1100 590 Z" fill="url(#monoFigureGrad)" />
              </g>
            </svg>
          </div>

          {/* ====================================================================
              LAYER 2: VIVID COLOR REVEAL MASKS
              Accurate person-specific alpha mask: ONLY the selected figure illuminates
              ==================================================================== */}
          {COUNCIL_HOTSPOTS.map((spot) => {
            const isSelected = selectedId === spot.memberId;
            const isHovered = hoveredId === spot.memberId;

            return (
              <div
                key={`color-layer-${spot.memberId}`}
                className={`${styles.personMaskOverlay} ${isSelected ? styles.personMaskSelected : ''} ${
                  isHovered && !isSelected ? styles.personMaskHovered : ''
                }`}
                style={{
                  left: `${spot.x}%`,
                  top: `${spot.y}%`,
                  width: `${spot.width}%`,
                  height: `${spot.height}%`,
                  clipPath: spot.clipPolygon,
                }}
                aria-hidden="true"
              >
                {/* CHROMATIC RADIANCE LAYER (Accent Gradient specific to theme) */}
                <div className={styles.chromaticBody} />
                <div className={styles.silhouetteRim} />
              </div>
            );
          })}

          {/* ====================================================================
              LAYER 3: INTERACTIVE SELECTION TARGETS & HOTSPOTS
              Keyboard accessible, responsive touch-target buttons
              ==================================================================== */}
          {COUNCIL_HOTSPOTS.map((spot) => {
            const isSelected = selectedId === spot.memberId;
            const isHovered = hoveredId === spot.memberId;

            return (
              <button
                key={`btn-${spot.memberId}`}
                type="button"
                className={`${styles.hotspotTrigger} ${isSelected ? styles.hotspotTriggerActive : ''}`}
                style={{
                  left: `${spot.x}%`,
                  top: `${spot.y}%`,
                  width: `${spot.width}%`,
                  height: `${spot.height}%`,
                }}
                onClick={() => setSelectedId(spot.memberId)}
                onMouseEnter={() => setHoveredId(spot.memberId)}
                onMouseLeave={() => setHoveredId(null)}
                aria-label={`Select ${spot.role}: ${spot.name}`}
                aria-pressed={isSelected}
              >
                {/* ENGINEERING RETICLE & SEAT TAG */}
                <div className={styles.reticleBadge}>
                  <span className={styles.reticleDot} />
                  <span className={styles.reticleLabel}>{spot.label}</span>
                </div>
              </button>
            );
          })}

          {/* ====================================================================
              LAYER 4: ENGINEERING TRACE CONNECTOR LINE
              Subtle vector line bridging the selected person to the identity sheet
              ==================================================================== */}
          <svg className={styles.traceSvgLayer} aria-hidden="true">
            <line
              x1={`${activeSpot.headCenter.x}%`}
              y1={`${activeSpot.headCenter.y}%`}
              x2="50%"
              y2="92%"
              className={styles.engineeringTraceConnector}
            />
            <circle
              cx={`${activeSpot.headCenter.x}%`}
              cy={`${activeSpot.headCenter.y}%`}
              r="4"
              className={styles.engineeringTraceNode}
            />
          </svg>
        </div>

        {/* ====================================================================
            FLOATING EDITORIAL IDENTITY SHEET
            Non-modal, precision attached glass/translucent identity card
            ==================================================================== */}
        <div className={styles.identitySheetDock}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeMember.memberId}
              layoutId={isTransitioning ? `member-portrait-${activeMember.memberId}` : undefined}
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className={styles.identitySheet}
              role="region"
              aria-label={`Selected Executive: ${activeMember.name}`}
            >
              {/* SHEET HEADER */}
              <div className={styles.sheetHeader}>
                <div className={styles.seatMeta}>
                  <span className={styles.seatPill}>{activeSpot.seatNumber}</span>
                  <span className={styles.sessionPill}>{activeMember.session}</span>
                </div>
                {activeMember.verification?.isVerified && (
                  <div className={styles.verificationBadge}>
                    <ShieldCheck size={14} className={styles.verifiedIcon} />
                    <span>VERIFIED RECORD</span>
                  </div>
                )}
              </div>

              {/* IDENTITY TITLES */}
              <div className={styles.sheetBody}>
                <div className={styles.roleSuper}>{activeMember.designation.replace(' [Placeholder]', '')}</div>
                <h3 className={styles.sheetName}>{activeMember.name}</h3>
                <p className={styles.sheetDomain}>{activeSpot.domain}</p>
                <p className={styles.sheetBio}>{activeMember.bio}</p>
              </div>

              {/* SHEET FOOTER WITH SOCIALS AND VIEW PROFILE ACTION */}
              <div className={styles.sheetFooter}>
                <div className={styles.socialChannels}>
                  {activeMember.socialLinks?.linkedin && (
                    <a
                      href={activeMember.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.socialBtn}
                      aria-label={`${activeMember.name} LinkedIn Profile`}
                    >
                      <LinkedInIcon size={14} />
                    </a>
                  )}
                  {activeMember.socialLinks?.github && (
                    <a
                      href={activeMember.socialLinks.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.socialBtn}
                      aria-label={`${activeMember.name} GitHub Profile`}
                    >
                      <GitHubIcon size={14} />
                    </a>
                  )}
                </div>

                <Button
                  variant="primary"
                  size="sm"
                  rightIcon={<ArrowRight size={14} />}
                  onClick={() => handleViewProfile(activeMember.memberId)}
                >
                  VIEW PROFILE →
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
