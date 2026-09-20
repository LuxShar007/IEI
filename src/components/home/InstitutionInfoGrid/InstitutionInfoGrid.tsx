import React from 'react';
import styles from './InstitutionInfoGrid.module.css';

export interface InstitutionInfoItem {
  label: string;
  value: string;
}

export const DEFAULT_INSTITUTION_INFO: InstitutionInfoItem[] = [
  { label: 'INSTITUTION', value: 'SIES Graduate School of Technology' },
  { label: 'DEPARTMENT', value: 'Electronics & Computer Science Engineering' },
  { label: 'CHAPTER BODY', value: 'Institution of Engineers (India)' },
  { label: 'COLLEGIATE SESSION', value: '2024–2025' },
];

export interface InstitutionInfoGridProps {
  items?: InstitutionInfoItem[];
  className?: string;
  id?: string;
}

export const InstitutionInfoGrid: React.FC<InstitutionInfoGridProps> = ({
  items = DEFAULT_INSTITUTION_INFO,
  className,
  id,
}) => {
  return (
    <div
      id={id}
      className={`${styles.container} ${className || ''}`.trim()}
      role="region"
      aria-label="Institutional Information"
    >
      <div className={styles.grid}>
        {items.map((item) => (
          <div key={item.label} className={styles.column}>
            <span className={styles.label}>{item.label}</span>
            <span className={styles.value}>{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
