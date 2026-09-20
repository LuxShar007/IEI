'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Download, FileText } from 'lucide-react';
import styles from './ResourcesPreview.module.css';

interface ResourceLink {
  num: string;
  title: string;
  category: string;
  format: string;
  fileSize: string;
}

const RESOURCES: ResourceLink[] = [
  {
    num: '01',
    title: 'Chapter Constitution, Bylaws & Operational Mandate',
    category: 'Institutional Document',
    format: 'PDF',
    fileSize: '1.4 MB',
  },
  {
    num: '02',
    title: 'Departmental Microcontroller Lab Guidelines & Pinout Maps',
    category: 'Technical Tooling',
    format: 'PDF',
    fileSize: '3.8 MB',
  },
  {
    num: '03',
    title: 'Collegiate Hackathon Hardware Interfacing Protocols',
    category: 'Competition Framework',
    format: 'PDF',
    fileSize: '2.1 MB',
  },
  {
    num: '04',
    title: 'Annual Departmental Engineering Research Digest (ECS)',
    category: 'Annual Publication',
    format: 'PDF',
    fileSize: '5.2 MB',
  },
  {
    num: '05',
    title: 'Standard Project Documentation & IEEE LaTeX Repository Template',
    category: 'Developer Kit',
    format: 'ZIP',
    fileSize: '8.6 MB',
  },
];

export const ResourcesPreview: React.FC = () => {
  return (
    <section className={styles.section} id="resources-summary" aria-label="Student Resources">
      <div className={styles.inner}>
        {/* HEADER */}
        <div className={styles.header}>
          <div className={styles.sectionMeta}>
            <span className={styles.sectionIndex}>09</span>
            <span className={styles.sectionLabel}>Document Repository</span>
          </div>
          <div className={styles.headerSplit}>
            <h2 className={styles.sectionTitle}>Resources</h2>
            <Link href="/resources" className={styles.viewAllLink}>
              <span>Access Complete Library</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* RESTRAINED EDITORIAL LINK-BASED PRESENTATION */}
        <div className={styles.resourceList}>
          {RESOURCES.map((res) => (
            <div key={res.num} className={styles.resourceRow}>
              <span className={styles.resNum}>{res.num}</span>

              <div className={styles.resMain}>
                <span className={styles.resCategory}>{res.category}</span>
                <h3 className={styles.resTitle}>{res.title}</h3>
              </div>

              <div className={styles.resMeta}>
                <span className={styles.formatTag}>{res.format}</span>
                <span className={styles.sizeText}>{res.fileSize}</span>
              </div>

              <div className={styles.resAction}>
                <Link
                  href="/resources"
                  className={styles.downloadLink}
                  aria-label={`Download ${res.title}`}
                >
                  <Download size={14} />
                  <span>Download</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
