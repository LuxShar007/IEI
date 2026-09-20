import React from 'react';
import type { Metadata } from 'next';
import { PageHeader } from '@/components/layout/PageHeader/PageHeader';
import { Section } from '@/components/layout/Section/Section';
import { Card } from '@/components/ui/Card/Card';
import { Button } from '@/components/ui/Button/Button';
import { constructMetadata } from '@/lib/seo/metadata';
import { siteConfig } from '@/data/site';
import { Mail, MapPin, Building2, Send } from 'lucide-react';
import styles from './contact.module.css';

export const metadata: Metadata = constructMetadata({
  title: 'Contact Chapter',
  description: 'Reach out to the IEI SIES GST student council, faculty advisors, or administrative wing.',
  path: '/contact',
});

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="COMMUNICATION CHANNELS"
        title="Contact IEI SIES GST"
        description="Official correspondence channels for student inquiries, inter-college symposium collaborations, and institutional verification."
        badge="HEADQUARTERS"
        breadcrumbs={[{ label: 'Contact' }]}
      />

      <Section id="contact-details" padding="lg" hasGridBackground>
        <div className={styles.layoutGrid}>
          {/* CONTACT INFO */}
          <div className={styles.infoCol}>
            <span className="overline">CAMPUS HEADQUARTERS</span>
            <h2 className={styles.infoTitle}>Connect with Chapter Officers</h2>
            <p className={styles.infoLead}>
              We welcome inquiries regarding upcoming technical events, project partnerships, and chapter membership.
            </p>

            <div className={styles.channelsList}>
              <Card variant="default" hasCornerAccents className={styles.channelCard}>
                <MapPin className={styles.channelIcon} />
                <div>
                  <span className={styles.channelLabel}>CAMPUS LOCATION</span>
                  <span className={styles.channelValue}>
                    SIES Graduate School of Technology, Sri Chandrasekarendra Saraswati Vidyapuram, Sector-V, Nerul, Navi Mumbai - 400706
                  </span>
                </div>
              </Card>

              <Card variant="default" hasCornerAccents className={styles.channelCard}>
                <Building2 className={styles.channelIcon} />
                <div>
                  <span className={styles.channelLabel}>CHAPTER OFFICE</span>
                  <span className={styles.channelValue}>
                    IEI Student Chapter Room, Department of Computer Engineering
                  </span>
                </div>
              </Card>

              <Card variant="default" hasCornerAccents className={styles.channelCard}>
                <Mail className={styles.channelIcon} />
                <div>
                  <span className={styles.channelLabel}>OFFICIAL CORRESPONDENCE</span>
                  <span className={styles.channelValue}>{siteConfig.links.email}</span>
                </div>
              </Card>
            </div>
          </div>

          {/* INQUIRY FORM SHELL */}
          <div className={styles.formCol}>
            <Card variant="elevated" hasCornerAccents className={styles.formCard}>
              <span className="overline">DIRECT INQUIRY</span>
              <h3 className={styles.formTitle}>Send a Message</h3>
              <p className={styles.formSubtitle}>
                Leave your details and message for the executive committee.
              </p>

              <form className={styles.form}>
                <div className={styles.fieldGroup}>
                  <label htmlFor="contactName" className={styles.label}>
                    Your Name
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
                    Email Address
                  </label>
                  <input
                    id="contactEmail"
                    type="email"
                    required
                    placeholder="your.email@example.com"
                    className={styles.input}
                  />
                </div>

                <div className={styles.fieldGroup}>
                  <label htmlFor="contactSubject" className={styles.label}>
                    Subject
                  </label>
                  <input
                    id="contactSubject"
                    required
                    placeholder="e.g. Workshop Inquiry"
                    className={styles.input}
                  />
                </div>

                <div className={styles.fieldGroup}>
                  <label htmlFor="contactMessage" className={styles.label}>
                    Message
                  </label>
                  <textarea
                    id="contactMessage"
                    rows={4}
                    required
                    placeholder="State your query or collaboration proposal..."
                    className={styles.textarea}
                  />
                </div>

                <Button type="button" variant="primary" size="md" rightIcon={<Send size={15} />}>
                  Dispatch Message
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </Section>
    </>
  );
}
