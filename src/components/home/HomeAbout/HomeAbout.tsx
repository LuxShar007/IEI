'use client';

import React from 'react';
import Link from 'next/link';
import { domainDefinitions } from '@/data/team';
import { Button } from '@/components/ui/Button/Button';
import { ArrowRight } from 'lucide-react';
import styles from './HomeAbout.module.css';

export const HomeAbout: React.FC = () => {
  return (
    <section className={styles.sectionWrap} id="about-us" aria-label="About IEI SIES GST">
      <div className={styles.container}>
        {/* SECTION HEADER */}
        <div className={styles.header}>
          <div className={styles.headerMeta}>
            <span className={styles.sectionBadge}>01 • INSTITUTIONAL OVERVIEW</span>
            <span className={styles.headerDivider}>/</span>
            <span className={styles.headerDept}>SIES GRADUATE SCHOOL OF TECHNOLOGY</span>
          </div>

          <h2 className={styles.heading}>About Us</h2>
        </div>

        {/* NARRATIVE STATEMENT (IEEE STYLE) */}
        <div className={styles.narrativeGrid}>
          <div className={styles.statementCol}>
            <p className={styles.primaryStatement}>
              We are the <strong>IEI SIES GST Student Chapter</strong> for the academic session 2024–2025 under the Department of Electronics and Computer Science, dedicated to fostering a rigorous, collaborative environment for students pursuing engineering mastery, practical technical innovation, and professional leadership.
            </p>

            <p className={styles.secondaryStatement}>
              Chartered by The Institution of Engineers (India), our chapter bridges classroom theory with industrial standards through hands-on laboratory workshops, national symposia, research paper tracks, and competitive engineering challenges.
            </p>

            <div className={styles.aboutActionRow}>
              <Button href="/about" variant="outline" size="md" rightIcon={<ArrowRight size={14} />}>
                Read Full Institutional Charter
              </Button>
            </div>
          </div>

          {/* DOMAIN QUICK-ACCESS PILLS (MIRRORING IEEE "KNOW CS ->", "KNOW MTTS ->") */}
          <div className={styles.domainsCol}>
            <div className={styles.domainsHeader}>
              <span className={styles.domainsTitle}>SPECIALIZED DOMAIN WINGS</span>
              <span className={styles.domainsHint}>*Click to explore domain charter & team</span>
            </div>

            <div className={styles.domainsList} role="list" aria-label="Explore domain wings">
              {domainDefinitions.map((domain) => (
                <Link
                  key={domain.id}
                  href="/team#domains"
                  className={styles.domainPill}
                  role="listitem"
                  aria-label={`Explore ${domain.name} wing`}
                >
                  <span className={styles.pillCode}>{domain.shortCode}</span>
                  <span className={styles.pillName}>know {domain.name.toLowerCase()}</span>
                  <span className={styles.pillArrow}>→</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
