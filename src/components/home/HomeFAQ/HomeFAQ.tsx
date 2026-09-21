'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, Mail, ArrowUpRight } from 'lucide-react';
import styles from './HomeFAQ.module.css';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    question: 'What is IEI SIES GST?',
    answer:
      'IEI SIES GST is the official collegiate student chapter of The Institution of Engineers (India) established under the Department of Electronics and Computer Science at SIES Graduate School of Technology, Nerul. The chapter is dedicated to fostering technological innovation, applied research, professional engineering ethics, and student executive leadership.',
  },
  {
    question: 'What are the 7 specialized domain wings under the chapter?',
    answer:
      'The chapter operates across 7 specialized wings: Technical, Industry Outreach & Admin, Publicity, Creative, Design, Media, and Editorial. Each domain maintains a structured four-tier hierarchy: Mentors, Heads, Coordinators, and Volunteers, providing complete operational clarity across technical and institutional initiatives.',
  },
  {
    question: 'What kind of events and workshops does IEI organize?',
    answer:
      'We organize flagship events including our Annual Technical Symposium, Applied Robotics and Embedded Systems workshops, Microcontroller programming sprints, Industry Expert Lecture Series, and technical paper presentation colloquiums bridging academic curriculum with industrial practices.',
  },
  {
    question: 'How does cryptographic credential verification work?',
    answer:
      'All inducted executive council members and chapter appointees receive authenticated digital credentials featuring unique serial numbers (e.g. IEI-GST-2025-001) and cryptographic SHA-256 signature hashes. These credentials can be verified independently via our central verification portal at /verify or by scanning the physical member badge QR code pointing to /m/[memberId].',
  },
  {
    question: 'What are the benefits of participating in chapter activities?',
    answer:
      'Participants gain hands-on laboratory engineering experience, mentorship from faculty advisors and senior domain leads, verified credential records, exposure to industrial technical seminars, and opportunities to lead symposium project tracks.',
  },
  {
    question: 'How can students participate in upcoming initiatives?',
    answer:
      'Technical workshops, competitions, and seminars are announced through our official Events page (/events), departmental notice boards, and student liaison channels. Event registrations are open to all collegiate engineering students.',
  },
  {
    question: 'How can someone contact the chapter office or leadership?',
    answer:
      'You can reach the executive council directly at iei@siesgst.ac.in, contact faculty coordinators Dr. Shubhangi Kharache (HOD) and Prof. Jasmin Hirani, or visit the chapter advisory office in the Department of Electronics and Computer Science at SIES GST, Nerul, Navi Mumbai.',
  },
];

export const HomeFAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className={styles.sectionWrap} id="faq" aria-label="Frequently Asked Questions">
      <div className={styles.container}>
        {/* SECTION HEADER */}
        <div className={styles.header}>
          <div className={styles.headerMeta}>
            <span className={styles.sectionBadge}>04 • INSTITUTIONAL DIRECTORY</span>
            <span className={styles.headerDivider}>/</span>
            <span className={styles.headerDept}>ANSWERS & PROTOCOLS</span>
          </div>

          <h2 className={styles.heading}>Frequently Asked Questions</h2>
          <p className={styles.lead}>
            Key inquiries regarding collegiate chapter operations, domain structure, faculty leadership, and digital credential verification.
          </p>
        </div>

        {/* ACCORDION LIST */}
        <div className={styles.accordionList} role="region" aria-label="FAQ Accordion">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className={`${styles.accordionItem} ${isOpen ? styles.accordionItemOpen : ''}`}
              >
                <button
                  type="button"
                  className={styles.questionBtn}
                  onClick={() => toggleItem(index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span className={styles.itemIndex}>0{index + 1}</span>
                  <span className={styles.questionText}>{item.question}</span>
                  <ChevronDown
                    size={18}
                    className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      className={styles.answerWrap}
                    >
                      <p className={styles.answerText}>{item.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* BOTTOM CONTACT CALLOUT (MIRRORING IEEE CONTACT PROMPT) */}
        <div className={styles.contactCallout}>
          <div className={styles.calloutLeft}>
            <h3 className={styles.calloutTitle}>Have additional questions or need institutional verification?</h3>
            <p className={styles.calloutSub}>
              Contact the Chapter Office at SIES Graduate School of Technology, Sector-V, Nerul, Navi Mumbai.
            </p>
          </div>

          <a href="mailto:iei@siesgst.ac.in" className={styles.emailButton}>
            <Mail size={16} />
            <span>iei@siesgst.ac.in</span>
            <ArrowUpRight size={14} className={styles.arrowIcon} />
          </a>
        </div>
      </div>
    </section>
  );
};
