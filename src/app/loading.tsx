import React from 'react';
import { Container } from '@/components/layout/Container/Container';
import { Skeleton } from '@/components/ui/Skeleton/Skeleton';
import styles from './loading.module.css';

export default function Loading() {
  return (
    <div className={styles.loadingWrapper}>
      <Container size="xl">
        <div className={styles.skeletonHeader}>
          <Skeleton variant="text" width="120px" height="14px" />
          <Skeleton variant="text" width="60%" height="36px" />
          <Skeleton variant="text" width="40%" height="20px" />
        </div>

        <div className={styles.skeletonGrid}>
          <Skeleton variant="card" height="240px" />
          <Skeleton variant="card" height="240px" />
          <Skeleton variant="card" height="240px" />
        </div>
      </Container>
    </div>
  );
}
