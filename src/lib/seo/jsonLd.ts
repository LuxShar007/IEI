import { siteConfig } from '@/data/site';

export function getOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: siteConfig.fullName,
    alternateName: siteConfig.acronym,
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://iei-siesgst.org',
    parentOrganization: {
      '@type': 'Organization',
      name: siteConfig.institution.parentBody,
    },
    location: {
      '@type': 'Place',
      name: siteConfig.institution.name,
      address: siteConfig.institution.location,
    },
  };
}
