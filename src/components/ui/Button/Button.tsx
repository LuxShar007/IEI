'use client';

import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils/cn';
import styles from './Button.module.css';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  isExternal?: boolean;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      href,
      isExternal,
      isLoading,
      leftIcon,
      rightIcon,
      fullWidth,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const classNames = cn(
      styles.button,
      styles[variant],
      styles[size],
      fullWidth && styles.fullWidth,
      isLoading && styles.loading,
      className
    );

    const content = (
      <>
        <span className={styles.ambientShadow} aria-hidden="true" />
        <span className={styles.sheen} aria-hidden="true" />
        {isLoading ? (
          <span className={styles.spinner} aria-hidden="true" />
        ) : (
          leftIcon && <span className={styles.icon}>{leftIcon}</span>
        )}
        <span className={styles.label}>{children}</span>
        {!isLoading && rightIcon && <span className={styles.icon}>{rightIcon}</span>}
      </>
    );

    if (href) {
      if (isExternal) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={classNames}
            data-cursor="button"
            ref={ref as React.Ref<HTMLAnchorElement>}
            {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
          >
            {content}
          </a>
        );
      }
      return (
        <Link
          href={href}
          className={classNames}
          data-cursor="button"
          ref={ref as React.Ref<HTMLAnchorElement>}
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {content}
        </Link>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={classNames}
        disabled={disabled || isLoading}
        data-cursor="button"
        {...props}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = 'Button';
