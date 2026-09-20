'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Users } from 'lucide-react';
import { Button } from '@/components/ui/Button/Button';
import styles from './ThePeoplePreview.module.css';

export const ThePeoplePreview: React.FC = () => {
  return (
    <section className={styles.section} id="the-people" aria-label="The People of IEI SIES GST">
      <div className={styles.inner}>
        {/* HEADER */}
        <div className={styles.header}>
          <div className={styles.sectionMeta}>
            <span className={styles.sectionIndex}>07</span>
            <span className={styles.sectionLabel}>Chapter Governance</span>
          </div>
          <h2 className={styles.sectionTitle}>The People</h2>
          <p className={styles.sectionSubtitle}>
            A disciplined hierarchy of academic advisors, executive council officers, and 7 specialized domain wings.
          </p>
        </div>

        {/* ASYMMETRICAL EDITORIAL SPREAD */}
        <div className={styles.spreadGrid}>
          {/* LEFT: LARGE MONOCHROME STUDIO ARCHITECTURAL PREVIEW */}
          <div className={styles.visualFrame} aria-label="Executive Leadership Portrait Silhouette">
            <div className={styles.graphicBackdrop} aria-hidden="true">
              <div className={styles.datumRings} />
              <div className={styles.monochromeSilhouettes}>
                <div className={styles.silhouetteBar} style={{ height: '70%' }} />
                <div className={styles.silhouetteBar} style={{ height: '88%' }} />
                <div className={styles.silhouetteBar} style={{ height: '80%' }} />
                <div className={styles.silhouetteBar} style={{ height: '65%' }} />
              </div>
              <div className={styles.archLabel}>IEI·GOV·ECS</div>
            </div>

            <div className={styles.frameBadge}>
              <Users size={14} />
              <span>Executive Committee & Domain Councils</span>
            </div>
          </div>

          {/* RIGHT: EDITORIAL SYNOPSIS & ENTRY POINT */}
          <div className={styles.contentColumn}>
            <div className={styles.statement}>
              Governed by institutional standards. Led by student engineers.
            </div>

            <p className={styles.bodyParagraph}>
              The IEI SIES GST Student Chapter is guided by distinguished faculty leadership from the 
              Department of Electronics & Computer Science Engineering, alongside an inducted student 
              council operating across 7 structured domains.
            </p>

            {/* HIERARCHY STRIP */}
            <div className={styles.hierarchyStrip}>
              <div className={styles.tierItem}>
                <span className={styles.tierNum}>TIER 01</span>
                <span className={styles.tierName}>Faculty Advisory</span>
              </div>
              <span className={styles.tierSep}>/</span>
              <div className={styles.tierItem}>
                <span className={styles.tierNum}>TIER 02</span>
                <span className={styles.tierName}>Core Council</span>
              </div>
              <span className={styles.tierSep}>/</span>
              <div className={styles.tierItem}>
                <span className={styles.tierNum}>TIER 03</span>
                <span className={styles.tierName}>7 Domain Wings</span>
              </div>
            </div>

            {/* ACTION TO FULL INTERACTIVE TEAM EXPERIENCE */}
            <div className={styles.actionRow}>
              <Button href="/team" variant="primary" size="md" rightIcon={<ArrowRight size={15} />}>
                Explore Leadership Roster & Domains
              </Button>
              <Button href="/team" variant="outline" size="md" leftIcon={<Users size={14} />}>
                View Directory
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
