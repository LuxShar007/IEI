import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './about.module.css';

export const metadata: Metadata = {
  title: 'About — IEI SIES GST Student Chapter',
  description:
    'Learn about the Institution of Engineers (India) Student Chapter at SIES Graduate School of Technology — our mission, values, and institutional identity.',
};

export default function AboutPage() {
  return (
    <main className={styles.page}>
      {/* HERO — editorial about header */}
      <section className={styles.hero}>
        <div className={styles.inner}>
          <div className={styles.heroLabel}>
            <span className="text-overline">About</span>
          </div>
          <h1 className={styles.heroHeadline}>
            The Chapter
          </h1>
          <p className={styles.heroSub}>
            IEI SIES GST · Student Chapter · MH-04
          </p>
        </div>
      </section>

      {/* SECTION: IDENTITY */}
      <section className={styles.section}>
        <div className={styles.inner}>
          <div className={styles.editorialGrid}>
            <div className={styles.gridLeft}>
              <span className="text-overline">Who We Are</span>
            </div>
            <div className={styles.gridRight}>
              <p className={styles.largePara}>
                The IEI SIES GST Student Chapter is the official chapter body of the Institution
                of Engineers (India) at SIES Graduate School of Technology, Navi Mumbai.
                Affiliated with the Electronics and Computer Science Engineering Department,
                the chapter creates a structured environment for technical growth, professional
                development, and community among engineering students.
              </p>
              <p className={styles.para}>
                Founded as part of a national network of IEI student chapters, MH-04 serves as
                a bridge between academic education and the real demands of engineering practice.
                Through organized programs, competitions, workshops, and mentored projects, the
                chapter prepares its members for the challenges of a technical career.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: IEI PARENT INSTITUTION */}
      <section className={styles.section}>
        <div className={styles.inner}>
          <div className={styles.editorialGrid}>
            <div className={styles.gridLeft}>
              <span className="text-overline">Parent Institution</span>
            </div>
            <div className={styles.gridRight}>
              <h2 className={styles.sectionHeading}>
                Institution of Engineers (India)
              </h2>
              <p className={styles.para}>
                Founded in 1920, the Institution of Engineers (India) is one of the oldest and
                most prestigious professional engineering bodies in the country. It serves
                engineers across all disciplines and maintains a national network of chapters,
                student divisions, and professional affiliates.
              </p>
              <p className={styles.para}>
                Membership in IEI is recognized by major engineering employers and academic
                institutions across India. Student membership through a chapter provides access
                to national-level events, certifications, and a professional identity within the
                engineering community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: VALUES (placeholder) */}
      <section className={styles.section}>
        <div className={styles.inner}>
          <div className={styles.valuesGrid}>
            {[
              {
                num: '01',
                title: 'Technical Depth',
                desc: 'We pursue genuine understanding — not surface familiarity. The chapter\'s programs are designed to develop real competence.',
              },
              {
                num: '02',
                title: 'Collaborative Spirit',
                desc: 'Engineering is best practiced with others. The chapter deliberately creates opportunities for peer learning and cooperative projects.',
              },
              {
                num: '03',
                title: 'Institutional Integrity',
                desc: 'As an official chapter of a national body, we operate with the seriousness, transparency, and accountability that represents good engineering.',
              },
            ].map((v) => (
              <div key={v.num} className={styles.valueItem}>
                <span className={styles.valueNum}>{v.num}</span>
                <h3 className={styles.valueTitle}>{v.title}</h3>
                <p className={styles.valueDesc}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION: LINKS */}
      <section className={styles.ctaSection}>
        <div className={styles.inner}>
          <div className={styles.ctaLinks}>
            <Link href="/team" className={styles.ctaLink}>View the Team →</Link>
            <Link href="/activities" className={styles.ctaLink}>See Activities →</Link>
            <Link href="/contact" className={styles.ctaPrimary}>Contact the Chapter</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
