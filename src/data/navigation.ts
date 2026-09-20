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
      title: 'Institutional',
      items: [
        { title: 'Executive Council', href: '/team' },
        { title: 'Domain Wings', href: '/team' },
        { title: 'Campus Headquarters', href: '/contact' },
      ],
    },
  ],
};
