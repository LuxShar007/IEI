'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './ActivitiesEditorial.module.css';

const activities = [
  {
    num: '01',
    title: 'Technical Events',
    description:
      'State and national-level technical symposia, quiz competitions, paper presentations, and seminars connecting students with the broader engineering community.',
  },
  {
    num: '02',
    title: 'Workshops & Seminars',
    description:
      'Hands-on workshops led by industry professionals and academic experts — covering emerging technologies, practical engineering skills, and current research topics.',
  },
  {
    num: '03',
    title: 'Project Tracks',
    description:
      'Structured long-form project programs where members design, build, and present original engineering solutions — supported by mentorship and chapter resources.',
  },
  {
    num: '04',
    title: 'Industry Interaction',
    description:
      'Factory visits, professional guest lectures, and chapter collaborations with engineering firms — building contextual understanding beyond the classroom.',
  },
  {
    num: '05',
    title: 'Competitions',
    description:
      'Participation in hackathons, design challenges, and technical competitions at institution, university, and national levels under the IEI umbrella.',
  },
  {
    num: '06',
    title: 'Community & Outreach',
    description:
      'Community-oriented initiatives that apply engineering knowledge toward solving local challenges and building goodwill between the institution and its surroundings.',
  },
];

export const ActivitiesEditorial: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className={styles.section} id="activities" aria-label="Chapter Activities">
      <div className={styles.inner}>
        {/* HEADER */}
        <div className={styles.header}>
          <motion.span
            className="text-overline"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Activities
          </motion.span>
          <motion.h2
            className={styles.sectionTitle}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            What we do
          </motion.h2>
        </div>

        {/* ACTIVITY LIST */}
        <ul className={styles.list} role="list">
          {activities.map((activity, i) => (
            <motion.li
              key={activity.num}
              className={`${styles.item} ${activeIndex !== null && activeIndex !== i ? styles.itemDim : ''} ${activeIndex === i ? styles.itemActive : ''}`}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-5%' }}
              transition={{ duration: 0.6, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={() => setActiveIndex(i)}
              onMouseLeave={() => setActiveIndex(null)}
              onFocus={() => setActiveIndex(i)}
              onBlur={() => setActiveIndex(null)}
            >
              <div className={styles.itemInner}>
                <span className={styles.itemNum} aria-hidden="true">{activity.num}</span>
                <h3 className={styles.itemTitle}>{activity.title}</h3>
                <AnimatePresence>
                  {activeIndex === i && (
                    <motion.p
                      className={styles.itemDesc}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {activity.description}
                    </motion.p>
                  )}
                </AnimatePresence>
                <span className={styles.itemArrow} aria-hidden="true">→</span>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
};
