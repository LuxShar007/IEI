import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/layout/Container/Container';
import { Badge } from '@/components/ui/Badge/Badge';
import { ChevronRight } from 'lucide-react';
import styles from './PageHeader.module.css';

export interface Breadcrumb {
  label: string;
  href?: string;
}

export interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  badge?: string;
  badgeVariant?: 'default' | 'accent' | 'verified' | 'warning';
  breadcrumbs?: Breadcrumb[];
  actions?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  eyebrow,
  title,
  description,
  badge,
  badgeVariant = 'accent',
  breadcrumbs,
  actions,
}) => {
  return (
    <div className={styles.header}>
      <Container size="xl">
        <div className={styles.inner}>
          {breadcrumbs && breadcrumbs.length > 0 && (
            <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
              <ol className={styles.breadcrumbList}>
                <li className={styles.breadcrumbItem}>
                  <Link href="/" className={styles.breadcrumbLink}>
                    Home
                  </Link>
                </li>
                {breadcrumbs.map((crumb, idx) => (
                  <li key={idx} className={styles.breadcrumbItem}>
                    <ChevronRight className={styles.breadcrumbIcon} aria-hidden="true" />
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

          <div className={styles.metaRow}>
            {eyebrow && <span className="overline">{eyebrow}</span>}
            {badge && (
              <Badge variant={badgeVariant} size="sm">
                {badge}
              </Badge>
            )}
          </div>

          <h1 className={styles.title}>{title}</h1>

          {description && <p className={styles.description}>{description}</p>}

          {actions && <div className={styles.actions}>{actions}</div>}
        </div>
      </Container>
    </div>
  );
};
