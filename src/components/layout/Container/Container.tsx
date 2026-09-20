import React from 'react';
import { cn } from '@/lib/utils/cn';
import styles from './Container.module.css';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
}

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ children, size = 'xl', className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn(styles.container, styles[size], className)} {...props}>
        {children}
      </div>
    );
  }
);

Container.displayName = 'Container';
