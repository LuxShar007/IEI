import React from 'react';
import type { Metadata } from 'next';
import { PageHeader } from '@/components/layout/PageHeader/PageHeader';
import { Section } from '@/components/layout/Section/Section';
import { Button } from '@/components/ui/Button/Button';
import { constructMetadata } from '@/lib/seo/metadata';
import { siteConfig } from '@/data/site';
import { Mail, MapPin, Building2, Send, Clock, Globe } from 'lucide-react';
import styles from './contact.module.css';

export const metadata: Metadata = constructMetadata({
  title: 'Contact IEI SIES GST Chapter Office',
  description:
    'Official correspondence channels for student inquiries, inter-college symposium collaborations, and institutional verification.',
  path: '/contact',
});

export default function ContactPage() {
  return (
    <>
      <PageHeader
        number="07 / 07"
        eyebrow="INSTITUTIONAL DIRECTORY • CONTACT CHANNELS"
        title="Contact Chapter Administration"
        description="Official correspondence channels for academic partnerships, symposium inquiries, technical collaborations, and institutional verification."
        badge="CAMPUS HQ"
        breadcrumbs={[{ label: 'Contact' }]}
      />

      <Section id="contact-details" padding="lg">
        <div className={styles.layoutGrid}>
          {/* CONTACT INFO */}
          <div className={styles.infoCol}>
            <span className={styles.colOverline}>OFFICIAL COMMUNICATIONS</span>
            <h2 className={styles.infoTitle}>Connect with Chapter Officers & Faculty</h2>
            <p className={styles.infoLead}>
              We welcome inquiries regarding collegiate engineering workshops, state-level technical symposia, research collaborations, and credential verification.
            </p>

            <div className={styles.channelsList}>
              <div className={styles.channelTile}>
                <MapPin className={styles.channelIcon} />
                <div className={styles.tileContent}>
                  <span className={styles.channelLabel}>CAMPUS LOCATION</span>
                  <span className={styles.channelValue}>
                    SIES Graduate School of Technology, Sri Chandrasekarendra Saraswati Vidyapuram, Sector-V, Nerul, Navi Mumbai – 400706, Maharashtra, India
                  </span>
                </div>
              </div>

              <div className={styles.channelTile}>
                <Building2 className={styles.channelIcon} />
                <div className={styles.tileContent}>
                  <span className={styles.channelLabel}>DEPARTMENT HEADQUARTERS</span>
                  <span className={styles.channelValue}>
                    Department of Electronics & Computer Science Engineering (ECS), Ground Floor Engineering Annex
                  </span>
                </div>
              </div>

              <div className={styles.channelTile}>
                <Mail className={styles.channelIcon} />
                <div className={styles.tileContent}>
                  <span className={styles.channelLabel}>OFFICIAL CHAPTER CORRESPONDENCE</span>
                  <a href={`mailto:${siteConfig.links.email}`} className={styles.emailLink}>
                    {siteConfig.links.email}
                  </a>
                </div>
              </div>

              <div className={styles.channelTile}>
                <Clock className={styles.channelIcon} />
                <div className={styles.tileContent}>
                  <span className={styles.channelLabel}>OFFICIAL INQUIRY HOURS</span>
                  <span className={styles.channelValue}>
                    Monday – Friday: 09:00 to 17:00 IST (During Academic Sessions)
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* INQUIRY FORM SHELL */}
          <div className={styles.formCol}>
            <div className={styles.formContainer}>
              <span className={styles.colOverline}>DIRECT CORRESPONDENCE</span>
              <h3 className={styles.formTitle}>Institutional Inquiry Form</h3>
              <p className={styles.formSubtitle}>
                Submit academic and technical correspondence directly to chapter administration.
              </p>

              <form className={styles.form}>
                <div className={styles.fieldGroup}>
                  <label htmlFor="contactName" className={styles.label}>
                    FULL NAME
                  </label>
                  <input
                    id="contactName"
                    required
                    placeholder="e.g. Student Engineer"
                    className={styles.input}
                  />
                </div>

                <div className={styles.fieldGroup}>
                  <label htmlFor="contactEmail" className={styles.label}>
                    INSTITUTIONAL EMAIL
                  </label>
                  <input
                    id="contactEmail"
                    type="email"
                    required
                    placeholder="student@siesgst.ac.in"
                    className={styles.input}
                  />
                </div>

                <div className={styles.fieldGroup}>
                  <label htmlFor="contactSubject" className={styles.label}>
                    SUBJECT / NATURE OF INQUIRY
                  </label>
                  <input
                    id="contactSubject"
                    required
                    placeholder="e.g. Technical Workshop Inquiry"
                    className={styles.input}
                  />
                </div>

                <div className={styles.fieldGroup}>
                  <label htmlFor="contactMessage" className={styles.label}>
                    COMMUNICATION DETAILS
                  </label>
                  <textarea
                    id="contactMessage"
                    rows={5}
                    required
                    placeholder="Detail your query or collegiate initiative..."
                    className={styles.textarea}
                  />
                </div>

                <Button type="button" variant="primary" size="md" rightIcon={<Send size={15} />}>
                  Dispatch Inquiry
                </Button>
              </form>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
