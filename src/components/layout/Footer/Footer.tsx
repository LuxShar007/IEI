import React from 'react';
import Link from 'next/link';
import { navigationConfig } from '@/data/navigation';
import styles from './Footer.module.css';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer} aria-label="Site Footer">
      {/* TOP RULE */}
      <div className={styles.topRule} />

      <div className={styles.inner}>
        {/* IDENTITY BLOCK */}
        <div className={styles.identityBlock}>
          <div className={styles.wordmark}>IEI SIES GST</div>
          <p className={styles.tagline}>
            Institution of Engineers (India)<br />
            Student Chapter · SIES Graduate School of Technology
          </p>
          <p className={styles.department}>
            Electronics & Computer Science Engineering<br />
            Navi Mumbai · Chapter MH-04
          </p>
        </div>

        {/* NAV COLUMNS */}
        <div className={styles.navColumns}>
          {navigationConfig.footerNav.map((group) => (
            <div key={group.title} className={styles.navGroup}>
              <span className={styles.groupTitle}>{group.title}</span>
              <ul className={styles.groupList}>
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className={styles.footerLink}>
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className={styles.bottomBar}>
        <span className={styles.copyright}>
          © {currentYear} IEI SIES GST Student Chapter. All rights reserved.
        </span>
        <div className={styles.bottomLinks}>
          <Link href="/verify" className={styles.bottomLink}>Verify Member</Link>
          <span className={styles.bottomSep}>·</span>
          <Link href="/contact" className={styles.bottomLink}>Contact</Link>
        </div>
      </div>
    </footer>
  );
};
