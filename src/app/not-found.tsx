import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/layout/Container/Container';
import { Card } from '@/components/ui/Card/Card';
import { Button } from '@/components/ui/Button/Button';
import { Compass, Home, Search } from 'lucide-react';
import styles from './notFound.module.css';

export default function NotFound() {
  return (
    <div className={styles.wrapper}>
      <Container size="md">
        <Card variant="elevated" hasCornerAccents className={styles.card}>
          <div className={styles.iconCircle}>
            <Compass size={36} />
          </div>

          <span className="overline">STATUS CODE 404</span>
          <h1 className={styles.title}>Coordinate Not Located</h1>
          <p className={styles.description}>
            The path requested does not correlate with an active resource, route, or chapter record in the IEI SIES GST directory.
          </p>

          <div className={styles.actions}>
            <Button href="/" variant="primary" size="md" leftIcon={<Home size={15} />}>
              Return to Chapter Home
            </Button>
            <Button href="/verify" variant="outline" size="md" leftIcon={<Search size={15} />}>
              Member Verification
            </Button>
          </div>
        </Card>
      </Container>
    </div>
  );
}
