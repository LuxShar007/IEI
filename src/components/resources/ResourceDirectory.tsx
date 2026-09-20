'use client';

import React, { useState } from 'react';
import {
  placeholderResources,
  resourceCategories,
  type ResourceCategory,
} from '@/data/resources';
import { FileText, Download, Search } from 'lucide-react';
import styles from './ResourceDirectory.module.css';

export const ResourceDirectory: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<ResourceCategory>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredResources = placeholderResources.filter((item) => {
    const matchesCategory =
      activeCategory === 'ALL' || item.category.toUpperCase() === activeCategory;
    const matchesSearch =
      searchQuery === '' ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className={styles.directoryWrapper}>
      {/* FILTER & SEARCH BAR */}
      <div className={styles.controlsBar}>
        <div className={styles.searchBox}>
          <Search size={16} className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search resources, templates, guidelines..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
            aria-label="Search resources"
          />
        </div>

        <div className={styles.categoryFilters} role="tablist">
          {resourceCategories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveCategory(cat)}
                className={`${styles.filterBtn} ${isActive ? styles.activeFilter : ''}`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* EDITORIAL ROWS */}
      <div className={styles.resourceList}>
        {filteredResources.length === 0 ? (
          <div className={styles.emptyState}>
            <p>No resources found matching the query.</p>
          </div>
        ) : (
          filteredResources.map((item, index) => (
            <div key={item.id} className={styles.resourceRow}>
              <div className={styles.rowLead}>
                <span className={styles.rowIndex}>
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className={styles.formatIcon}>
                  <FileText size={18} />
                </div>
              </div>

              <div className={styles.rowMain}>
                <div className={styles.rowMeta}>
                  <span className={styles.categoryBadge}>{item.category.toUpperCase()}</span>
                  <span className={styles.dateText}>{item.date}</span>
                  <span className={styles.formatPill}>{item.format}</span>
                </div>
                <h3 className={styles.rowTitle}>{item.title}</h3>
                <p className={styles.rowDesc}>{item.description}</p>
              </div>

              <div className={styles.rowActions}>
                <span className={styles.fileSize}>{item.fileSize}</span>
                <a
                  href={item.url}
                  className={styles.downloadLink}
                  aria-label={`Download ${item.title}`}
                  onClick={(e) => {
                    e.preventDefault();
                    alert(`Placeholder document: ${item.title}`);
                  }}
                >
                  <Download size={14} />
                  <span>DOWNLOAD</span>
                </a>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
