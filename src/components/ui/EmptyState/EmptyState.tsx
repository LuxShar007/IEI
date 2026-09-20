import React from 'react';
import { cn } from '@/lib/utils/cn';
import { Button } from '@/components/ui/Button/Button';
import styles from './EmptyState.module.css';

export interface EmptyStateProps {
  icon?: React.ReactNode;
  eyebrow?: string;
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  eyebrow,
  title,
  description,
  actionLabel,
  actionHref,
  onAction,
  className,
}) => {
  return (
    <div className={cn(styles.wrapper, className)}>
      <div className={styles.container}>
        {icon && <div className={styles.iconContainer}>{icon}</div>}
        {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
        {(actionLabel && (actionHref || onAction)) && (
          <div className={styles.actions}>
            {actionHref ? (
              <Button href={actionHref} variant="outline" size="sm">
                {actionLabel}
              </Button>
            ) : (
              <Button onClick={onAction} variant="outline" size="sm">
                {actionLabel}
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
