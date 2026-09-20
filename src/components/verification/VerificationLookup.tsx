'use client';

import React, { useState } from 'react';
import { getMemberById } from '@/data/members';
import type { Member } from '@/lib/types/member';
import { Button } from '@/components/ui/Button/Button';
import { Card } from '@/components/ui/Card/Card';
import { Badge } from '@/components/ui/Badge/Badge';
import { MemberBadge } from '@/components/members/MemberBadge';
import { ShieldCheck, Search, AlertCircle, ArrowRight, CheckCircle2 } from 'lucide-react';
import styles from './VerificationLookup.module.css';

export const VerificationLookup: React.FC = () => {
  const [query, setQuery] = useState('');
  const [searchedMember, setSearchedMember] = useState<Member | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;

    const result = getMemberById(trimmed);
    setSearchedMember(result || null);
    setHasSearched(true);
  };

  const handleQuickFill = (id: string) => {
    setQuery(id);
    const result = getMemberById(id);
    setSearchedMember(result || null);
    setHasSearched(true);
  };

  return (
    <div className={styles.container}>
      {/* SEARCH CARD */}
      <Card variant="elevated" hasCornerAccents className={styles.searchCard}>
        <div className={styles.searchHeader}>
          <div className={styles.iconCircle}>
            <ShieldCheck size={24} />
          </div>
          <h2 className={styles.searchTitle}>IEI Credential Authentication</h2>
          <p className={styles.searchSubtitle}>
            Enter the Member ID from the physical badge or scan payload to verify chapter authenticity.
          </p>
        </div>

        <form onSubmit={handleSearch} className={styles.searchForm}>
          <div className={styles.inputWrapper}>
            <Search className={styles.searchIcon} />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. IEI-GST-2025-001"
              className={styles.inputField}
              aria-label="Enter Member ID"
            />
          </div>
          <Button type="submit" variant="primary" size="md">
            Verify ID
          </Button>
        </form>

        {/* QUICK TEST CHIPS */}
        <div className={styles.quickFillSection}>
          <span className={styles.quickFillLabel}>SAMPLE TEST CREDENTIALS:</span>
          <div className={styles.chipRow}>
            <button
              type="button"
              onClick={() => handleQuickFill('IEI-GST-2025-001')}
              className={styles.chipButton}
              data-cursor="button"
            >
              IEI-GST-2025-001 (Executive)
            </button>
            <button
              type="button"
              onClick={() => handleQuickFill('IEI-GST-2025-042')}
              className={styles.chipButton}
              data-cursor="button"
            >
              IEI-GST-2025-042 (Tech Lead)
            </button>
          </div>
        </div>
      </Card>

      {/* SEARCH RESULTS */}
      {hasSearched && (
        <div className={styles.resultContainer}>
          {searchedMember ? (
            <div className={styles.validResult}>
              <div className={styles.successBanner}>
                <CheckCircle2 size={20} className={styles.successIcon} />
                <div>
                  <span className={styles.successTitle}>Active Credential Authenticated</span>
                  <span className={styles.successDesc}>
                    Validated through IEI SIES GST Collegiate Registry.
                  </span>
                </div>
                <Button
                  href={`/m/${searchedMember.memberId}`}
                  variant="outline"
                  size="sm"
                  rightIcon={<ArrowRight size={14} />}
                >
                  View Digital Profile
                </Button>
              </div>

              <div className={styles.badgePreviewWrapper}>
                <MemberBadge member={searchedMember} />
              </div>
            </div>
          ) : (
            <Card variant="default" className={styles.errorResult}>
              <div className={styles.errorIcon}>
                <AlertCircle size={24} />
              </div>
              <h3 className={styles.errorTitle}>Unverified Credential ID</h3>
              <p className={styles.errorDesc}>
                The identifier &quot;{query}&quot; does not match any authenticated record in the current chapter roster. Please verify the ID on the physical badge or contact chapter officials.
              </p>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};
