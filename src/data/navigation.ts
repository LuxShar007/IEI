import type { NavigationConfig } from '@/lib/types/navigation';

export const navigationConfig: NavigationConfig = {
  mainNav: [
    { title: 'Home', href: '/' },
    { title: 'About', href: '/about' },
    { title: 'Activities', href: '/activities' },
    { title: 'Events', href: '/events' },
    { title: 'Team', href: '/team' },
    { title: 'Gallery', href: '/gallery' },
    { title: 'Resources', href: '/resources' },
    { title: 'Contact', href: '/contact' },
  ],
  verificationNav: {
    title: 'Verify Member',
    href: '/verify',
    badge: 'VERIFIED',
    description: 'Digital credential validation & physical badge verification',
  },
  footerNav: [
    {
      title: 'Chapter',
      items: [
        { title: 'About IEI GST', href: '/about' },
        { title: 'Executive Committee', href: '/team' },
        { title: 'Activities & Domains', href: '/activities' },
        { title: 'Photo Gallery', href: '/gallery' },
      ],
    },
    {
      title: 'Programs & Info',
      items: [
        { title: 'Technical Events', href: '/events' },
        { title: 'Student Resources', href: '/resources' },
        { title: 'Contact Chapter', href: '/contact' },
      ],
    },
    {
      title: 'Digital Identity',
      items: [
        { title: 'Credential Verification', href: '/verify' },
        { title: 'Sample Digital Badge', href: '/m/IEI-GST-2025-001' },
        { title: 'Admin Access', href: '/admin' },
      ],
    },
  ],
};
