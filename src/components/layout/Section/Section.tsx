import React from 'react';
import { cn } from '@/lib/utils/cn';
import { Container } from '@/components/layout/Container/Container';
import styles from './Section.module.css';

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  id?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  actions?: React.ReactNode;
  hasGridBackground?: boolean;
  hasDivider?: boolean;
  padding?: 'sm' | 'md' | 'lg' | 'none';
  containerSize?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
}

export const Section: React.FC<SectionProps> = ({
  id,
  eyebrow,
  title,
  description,
  actions,
  hasGridBackground = false,
  hasDivider = false,
  padding = 'lg',
  containerSize = 'xl',
  children,
  className,
  ...props
}) => {
  const hasHeader = eyebrow || title || description || actions;

  return (
    <section
      id={id}
      className={cn(
        styles.section,
        styles[`padding-${padding}`],
        hasGridBackground && 'bg-engineering-grid-subtle',
        hasDivider && styles.divider,
        className
      )}
      {...props}
    >
      <Container size={containerSize}>
        {hasHeader && (
          <div className={styles.header}>
            <div className={styles.headerContent}>
              {eyebrow && <span className="overline">{eyebrow}</span>}
              {title && <h2 className={styles.title}>{title}</h2>}
              {description && <p className={styles.description}>{description}</p>}
            </div>
            {actions && <div className={styles.actions}>{actions}</div>}
          </div>
        )}
        <div className={styles.content}>{children}</div>
      </Container>
    </section>
  );
};
