import type { Metadata, Viewport } from 'next';
import '@/styles/globals.css';
import { Navbar } from '@/components/layout/Navbar/Navbar';
import { Footer } from '@/components/layout/Footer/Footer';
import { SkipLink } from '@/components/layout/SkipLink/SkipLink';
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
import { IntroProvider } from '@/lib/intro/IntroContext';
import { PageTransition } from '@/components/layout/PageTransition/PageTransition';
import { StartupOverlay } from '@/components/startup/StartupOverlay/StartupOverlay';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="default" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(!window.location.search.includes('replay=1')&&sessionStorage.getItem('ieiStartupShown')==='true'){document.documentElement.setAttribute('data-startup','done');}}catch(e){}`,
          }}
        />
      </head>
      <body>
        <ThemeProvider>
          <SmoothScrollProvider>
            <IntroProvider>
              <StartupOverlay />
              <SkipLink />
              <GlobalBackground />
              <Navbar />
              <main id="main-content">
                <PageTransition>{children}</PageTransition>
              </main>
              <Footer />
            </IntroProvider>
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
