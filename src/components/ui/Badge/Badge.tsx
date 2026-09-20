import React from 'react';
import { cn } from '@/lib/utils/cn';
import styles from './Badge.module.css';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'accent' | 'verified' | 'warning' | 'error' | 'outline' | 'muted';
  size?: 'sm' | 'md';
  showPing?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  showPing = false,
  className,
  ...props
}) => {
  return (
    <span
      className={cn(styles.badge, styles[variant], styles[size], className)}
      {...props}
    >
      {showPing && (
        <span className={styles.pingWrapper} aria-hidden="true">
          <span className={styles.pingRing} />
          <span className={styles.pingDot} />
        </span>
      )}
      <span className={styles.label}>{children}</span>
    </span>
  );
};
