'use client';

import React from 'react';
import { Button } from '@/components/ui/Button/Button';
import { ArrowRight } from 'lucide-react';
import { RadialCarousel, type RadialCarouselItem } from './original';
import styles from './HomeGallery.module.css';

const DEMO_IMAGES: RadialCarouselItem[] = [
  { id: 1, url: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80', title: 'Mountain Lake' },
  { id: 2, url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80', title: 'Yosemite' },
  { id: 3, url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80', title: 'Misty Forest' },
  { id: 4, url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80', title: 'Sunlight Forest' },
  { id: 5, url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80', title: 'Grasslands' },
  { id: 6, url: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=800&q=80', title: 'Deer in Field' },
  { id: 7, url: 'https://images.unsplash.com/photo-1467830839049-11173e7b2755?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', title: 'Autumn Road' },
  { id: 8, url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80', title: 'Hills' },
  { id: 9, url: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=800&q=80', title: 'Morning mist' },
  { id: 10, url: 'https://images.unsplash.com/photo-1546882588-d9bd63f85a7e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHdhdGVyJTIwZmFsbHxlbnwwfHwwfHx8MA%3D%3D', title: 'Waterfall' },
  { id: 11, url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80', title: 'Snowy Peak' },
  { id: 12, url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80', title: 'Culinary' },
];

export const HomeGallery: React.FC = () => {
  return (
    <section className={styles.sectionWrap} id="gallery" aria-label="Recent Chapter Gallery and Photographic Archive">
      <div className={styles.container}>
        {/* SECTION HEADER */}
        <div className={styles.header}>
          <div className={styles.headerMeta}>
            <span className={styles.sectionBadge}>03 • PHOTOGRAPHIC ARCHIVE</span>
            <span className={styles.headerDivider}>/</span>
            <span className={styles.headerDept}>RADIAL ORBITAL CAROUSEL</span>
          </div>

          <div className={styles.headerMain}>
            <div>
              <h2 className={styles.heading}>Gallery</h2>
              <p className={styles.lead}>
                Interactive radial orbit gallery of recent engineering symposiums, field experiences, and collegiate milestones. Spin the wheel or click any thumbnail.
              </p>
            </div>

            <Button href="/gallery" variant="outline" size="sm" rightIcon={<ArrowRight size={14} />}>
              View Full Archive
            </Button>
          </div>
        </div>

        {/* RADIAL CAROUSEL CONTAINER */}
        <div className={styles.carouselWrapper}>
          <RadialCarousel
            items={DEMO_IMAGES}
            radius={250}
            thumbnailSize={110}
            centerSize={350}
          />
        </div>
      </div>
    </section>
  );
};
