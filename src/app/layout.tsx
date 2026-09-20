import type { Metadata, Viewport } from 'next';
import '@/styles/globals.css';
import { Navbar } from '@/components/layout/Navbar/Navbar';
import { Footer } from '@/components/layout/Footer/Footer';
import { SkipLink } from '@/components/layout/SkipLink/SkipLink';
import { CustomCursor } from '@/components/ui/Cursor/CustomCursor';
import { GlobalBackground } from '@/components/ui/Background/GlobalBackground';
import { SmoothScrollProvider } from '@/components/layout/SmoothScrollProvider';
import { constructMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = constructMetadata();

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
  width: 'device-width',
  initialScale: 1,
};

import { ThemeProvider } from '@/lib/theme/ThemeContext';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="default" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <SmoothScrollProvider>
            <SkipLink />
            <CustomCursor />
            <GlobalBackground />
            <Navbar />
            <main id="main-content">{children}</main>
            <Footer />
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
