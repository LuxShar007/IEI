'use client';

import React, { useEffect } from 'react';
import { Container } from '@/components/layout/Container/Container';
import { Card } from '@/components/ui/Card/Card';
import { Button } from '@/components/ui/Button/Button';
import { AlertTriangle, RotateCcw, Home } from 'lucide-react';
import styles from './error.module.css';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log unexpected errors for review
    console.error('Application Runtime Error:', error);
  }, [error]);

  return (
    <div className={styles.wrapper}>
      <Container size="md">
        <Card variant="elevated" hasCornerAccents className={styles.card}>
          <div className={styles.iconCircle}>
            <AlertTriangle size={36} />
          </div>

          <span className="overline">RUNTIME EXCEPTION</span>
          <h1 className={styles.title}>System Interruption</h1>
          <p className={styles.description}>
            An unexpected client exception was intercepted during component execution. The error has been captured for chapter engineering review.
          </p>

          <div className={styles.actions}>
            <Button onClick={() => reset()} variant="primary" size="md" leftIcon={<RotateCcw size={15} />}>
              Re-attempt Execution
            </Button>
            <Button href="/" variant="outline" size="md" leftIcon={<Home size={15} />}>
              Return to Chapter Home
            </Button>
          </div>
        </Card>
      </Container>
    </div>
  );
}
