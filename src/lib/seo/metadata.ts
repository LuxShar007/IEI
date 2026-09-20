import type { Metadata } from 'next';

export interface PageMetadataProps {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
}

const DEFAULT_TITLE = 'IEI SIES GST — Institution of Engineers (India) Student Chapter';
const DEFAULT_DESCRIPTION = 
  'Official student chapter platform of IEI at SIES Graduate School of Technology. Fostering engineering precision, innovation, and technological community.';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://iei-siesgst.org';

export function constructMetadata({
  title,
  description = DEFAULT_DESCRIPTION,
  path = '',
  image = '/og-image.png',
  noIndex = false,
}: PageMetadataProps = {}): Metadata {
  const pageTitle = title ? `${title} | IEI SIES GST` : DEFAULT_TITLE;
  const canonicalUrl = `${SITE_URL}${path}`;

  return {
    title: pageTitle,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: pageTitle,
      description,
      url: canonicalUrl,
      siteName: 'IEI SIES GST Student Chapter',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: pageTitle,
        },
      ],
      locale: 'en_IN',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description,
      images: [image],
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
      },
    },
  };
}
