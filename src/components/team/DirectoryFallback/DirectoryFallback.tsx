'use client';

import React, { useState, useMemo } from 'react';
import { placeholderMembers } from '@/data/members';
import { domainDefinitions } from '@/data/team';
import { MemberCard } from '@/components/members/MemberCard';
import { Search, Filter, ShieldCheck, X } from 'lucide-react';
import styles from './DirectoryFallback.module.css';

export const DirectoryFallback: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('all');

  const filteredMembers = useMemo(() => {
    return placeholderMembers.filter((m) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        m.name.toLowerCase().includes(q) ||
        m.memberId.toLowerCase().includes(q) ||
        m.designation.toLowerCase().includes(q) ||
        m.department.toLowerCase().includes(q);

      const matchesRole =
        selectedRole === 'all' ||
        (selectedRole === 'verified' && m.verification.isVerified) ||
        (selectedRole === 'core' && (m.designation.includes('President') || m.designation.includes('Secretary'))) ||
        (selectedRole === 'tech' && m.department.toLowerCase().includes('computer'));

      return matchesSearch && matchesRole;
    });
  }, [searchQuery, selectedRole]);

  return (
    <div className={styles.sectionWrap} aria-label="Member Directory & Verification">
      <div className={styles.header}>
        <span className="text-overline">Searchable Roster</span>
        <h2 className={styles.heading}>Chapter Member Directory</h2>
        <p className={styles.sub}>
          Search and verify student chapter executives and members. All credentials can be independently validated via cryptographic signature and serial number.
        </p>
      </div>

      {/* SEARCH AND FILTERS */}
      <div className={styles.controlsBar}>
        <div className={styles.searchBox}>
          <Search size={16} className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search by name, member ID, role or department..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
            aria-label="Search members"
          />
          {searchQuery && (
            <button
              type="button"
              className={styles.clearBtn}
              onClick={() => setSearchQuery('')}
              aria-label="Clear search"
            >
              <X size={14} />
            </button>
          )}
        </div>

        <div className={styles.filterChips} role="group" aria-label="Filter roster by category">
          <button
            type="button"
            className={`${styles.filterBtn} ${selectedRole === 'all' ? styles.filterBtnActive : ''}`}
            onClick={() => setSelectedRole('all')}
          >
            All Members ({placeholderMembers.length})
          </button>
          <button
            type="button"
            className={`${styles.filterBtn} ${selectedRole === 'verified' ? styles.filterBtnActive : ''}`}
            onClick={() => setSelectedRole('verified')}
          >
            <ShieldCheck size={13} />
            Verified Only
          </button>
          <button
            type="button"
            className={`${styles.filterBtn} ${selectedRole === 'core' ? styles.filterBtnActive : ''}`}
            onClick={() => setSelectedRole('core')}
          >
            Executive Officers
          </button>
          <button
            type="button"
            className={`${styles.filterBtn} ${selectedRole === 'tech' ? styles.filterBtnActive : ''}`}
            onClick={() => setSelectedRole('tech')}
          >
            Technical Wing
          </button>
        </div>
      </div>

      {/* RESULTS COUNT */}
      <div className={styles.resultsMeta}>
        <span>
          Showing {filteredMembers.length} {filteredMembers.length === 1 ? 'member' : 'members'}
        </span>
      </div>

      {/* CARDS GRID */}
      {filteredMembers.length > 0 ? (
        <div className={styles.grid}>
          {filteredMembers.map((member) => (
            <MemberCard key={member.memberId} member={member} />
          ))}
        </div>
      ) : (
        <div className={styles.noResults}>
          <p className={styles.noResultsTitle}>No roster records found</p>
          <p className={styles.noResultsDesc}>
            No chapter member matches the query &quot;{searchQuery}&quot;. Please adjust your filter or check the member ID format (e.g. IEI-GST-2025-001).
          </p>
          <button
            type="button"
            className={styles.resetBtn}
            onClick={() => {
              setSearchQuery('');
              setSelectedRole('all');
            }}
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};
