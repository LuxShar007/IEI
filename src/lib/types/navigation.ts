export interface NavItem {
  title: string;
  href: string;
  description?: string;
  badge?: string;
  isExternal?: boolean;
  highlight?: boolean;
}

export interface NavigationConfig {
  mainNav: NavItem[];
  verificationNav: NavItem;
  footerNav: {
    title: string;
    items: NavItem[];
  }[];
}
