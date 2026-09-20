import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/layout/Container/Container';
import styles from './PageHeader.module.css';

export interface Breadcrumb {
  label: string;
  href?: string;
}

export interface PageHeaderProps {
  eyebrow?: string;
  sectionNumber?: string;
  number?: string;
  title: string;
  description?: string;
  badge?: string;
  badgeVariant?: string;
  breadcrumbs?: Breadcrumb[];
  metadataItems?: { label: string; value: string }[];
  actions?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  eyebrow,
  sectionNumber,
  number,
  title,
  description,
  badge,
  breadcrumbs,
  metadataItems,
  actions,
}) => {
  const displaySectionNumber = sectionNumber || number;
  return (
    <header className={styles.header} role="region" aria-label={title}>
      <Container size="2xl">
        <div className={styles.inner}>
          {/* TOP BREADCRUMB & METADATA LINE */}
          <div className={styles.topMeta}>
            {breadcrumbs && breadcrumbs.length > 0 && (
              <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
                <ol className={styles.breadcrumbList}>
                  <li className={styles.breadcrumbItem}>
                    <Link href="/" className={styles.breadcrumbLink}>
                      Index
                    </Link>
                  </li>
                  {breadcrumbs.map((crumb, idx) => (
                    <li key={idx} className={styles.breadcrumbItem}>
                      <span className={styles.breadcrumbSep} aria-hidden="true">/</span>
                      {crumb.href ? (
                        <Link href={crumb.href} className={styles.breadcrumbLink}>
                          {crumb.label}
                        </Link>
                      ) : (
                        <span className={styles.breadcrumbCurrent} aria-current="page">
                          {crumb.label}
                        </span>
                      )}
                    </li>
                  ))}
                </ol>
              </nav>
            )}

            {displaySectionNumber && (
              <div className={styles.sectionIndex} aria-hidden="true">
                {displaySectionNumber}
              </div>
            )}
          </div>

          {/* MAIN EDITORIAL STATEMENT GRID */}
          <div className={styles.mainGrid}>
            <div className={styles.titleColumn}>
              {eyebrow && <div className={styles.eyebrow}>{eyebrow}</div>}
              <h1 className={styles.title}>{title}</h1>
            </div>

            <div className={styles.descColumn}>
              {description && <p className={styles.description}>{description}</p>}

              {metadataItems && metadataItems.length > 0 && (
                <div className={styles.metadataStrip}>
                  {metadataItems.map((item, idx) => (
                    <div key={idx} className={styles.metaItem}>
                      <span className={styles.metaLabel}>{item.label}</span>
                      <span className={styles.metaValue}>{item.value}</span>
                    </div>
                  ))}
                </div>
              )}

              {badge && (
                <div className={styles.badgeWrap}>
                  <span className={styles.badge}>{badge}</span>
                </div>
              )}

              {actions && <div className={styles.actions}>{actions}</div>}
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
};
