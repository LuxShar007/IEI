import React from 'react';
import { cn } from '@/lib/utils/cn';
import styles from './Card.module.css';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'interactive' | 'elevated' | 'glass';
  hasCornerAccents?: boolean;
  isHoverable?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      children,
      variant = 'default',
      hasCornerAccents = false,
      isHoverable = false,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          styles.card,
          styles[variant],
          hasCornerAccents && styles.cornerAccents,
          isHoverable && styles.hoverable,
          className
        )}
        data-cursor={isHoverable ? 'hover' : undefined}
        {...props}
      >
        {hasCornerAccents && (
          <>
            <span className={cn(styles.corner, styles.cornerTL)} aria-hidden="true" />
            <span className={cn(styles.corner, styles.cornerTR)} aria-hidden="true" />
            <span className={cn(styles.corner, styles.cornerBL)} aria-hidden="true" />
            <span className={cn(styles.corner, styles.cornerBR)} aria-hidden="true" />
          </>
        )}
        <div className={styles.inner}>{children}</div>
      </div>
    );
  }
);

Card.displayName = 'Card';
