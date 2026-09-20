import React from 'react';
import Link from 'next/link';
import styles from './Footer.module.css';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer} aria-label="Site Footer">
      <div className={styles.topRule} />

      <div className={styles.inner}>
        {/* MASSIVE INSTITUTIONAL STATEMENT BANNER */}
        <div className={styles.headlineFrame}>
          <div className={styles.largeWordmark}>IEI SIES GST</div>
          <div className={styles.subHeadline}>
            Official Student Chapter · Department of Electronics & Computer Science Engineering
          </div>
        </div>

        {/* STRUCTURED EDITORIAL COLUMNS */}
        <div className={styles.columnsGrid}>
          {/* COL 1: CHAPTER IDENTIFICATION */}
          <div className={styles.col}>
            <div className={styles.colHeader}>Institution</div>
            <div className={styles.orgText}>
              Institution of Engineers (India)<br />
              SIES Graduate School of Technology<br />
              Sri Chandrasekarendra Saraswati Vidyapuram<br />
              Sector-V, Nerul, Navi Mumbai - 400706
            </div>
            <div className={styles.charterTag}>Charter Est. 1920 · National Chapter Body</div>
          </div>

          {/* COL 2: MAIN DIRECTORY */}
          <div className={styles.col}>
            <div className={styles.colHeader}>Directory</div>
            <ul className={styles.linkList}>
              <li><Link href="/about" className={styles.footerLink}>About the Chapter</Link></li>
              <li><Link href="/activities" className={styles.footerLink}>Activities & Domains</Link></li>
              <li><Link href="/events" className={styles.footerLink}>Events & Symposia</Link></li>
              <li><Link href="/gallery" className={styles.footerLink}>Photographic Archive</Link></li>
            </ul>
          </div>

          {/* COL 3: GOVERNANCE & ACADEMICS */}
          <div className={styles.col}>
            <div className={styles.colHeader}>People & Governance</div>
            <ul className={styles.linkList}>
              <li><Link href="/team" className={styles.footerLink}>Faculty Leadership</Link></li>
              <li><Link href="/team#domains" className={styles.footerLink}>7 Domain Wings</Link></li>
              <li><Link href="/team#council" className={styles.footerLink}>Executive Council</Link></li>
              <li><Link href="/resources" className={styles.footerLink}>Student Resources</Link></li>
            </ul>
          </div>

          {/* COL 4: CAMPUS & CONTACT */}
          <div className={styles.col}>
            <div className={styles.colHeader}>Campus & Contact</div>
            <ul className={styles.linkList}>
              <li><Link href="/contact" className={styles.footerLink}>Campus Headquarters</Link></li>
              <li><a href="mailto:iei@siesgst.ac.in" className={styles.footerLink}>iei@siesgst.ac.in</a></li>
            </ul>
          </div>
        </div>

        {/* BOTTOM METADATA BAR */}
        <div className={styles.bottomBar}>
          <div className={styles.copyright}>
            © {currentYear} The Institution of Engineers (India) · SIES GST Student Chapter. All rights reserved.
          </div>
          <div className={styles.bottomMetaLinks}>
            <span className={styles.legalText}>Institutional Non-Profit Student Body</span>
            <span className={styles.dotSep} aria-hidden="true">·</span>
            <Link href="/contact" className={styles.legalLink}>Contact Chapter Office</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
