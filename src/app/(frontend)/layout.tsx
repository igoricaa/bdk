import type { Metadata } from 'next';
import { DM_Sans } from 'next/font/google';
import './globals.css';
import Lenis from '@/src/components/lenis';
import Footer from '@/src/components/footer';
import Header from '@/src/components/header/header';
import QueryProvider from '@/src/components/providers/query-client-provider';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import ScrollHandler from '@/src/components/scroll-handler';
import { Suspense } from 'react';
import BackToTop from '@/src/components/ui/back-to-top';
import SplashScreen from '@/src/components/splash-screen/splash-screen';
import { TransitionProvider } from '@/src/components/transition-link';
import CustomCursor from '@/src/components/ui/custom-cursor';

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-dm-sans',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://bdkadvokati.rs'),

  title: {
    default: 'BDK Advokati',
    template: '%s | BDK Advokati',
  },
  description:
    'BDK Advokati is a law firm specializing in corporate law, banking and finance, and litigation.',
  openGraph: {
    title: 'BDK Advokati',
    description:
      'BDK Advokati is a law firm specializing in corporate law, banking and finance, and litigation.',
    url: 'https://bdkadvokati.rs',
    siteName: 'BDK Advokati',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    title: 'BDK Advokati',
    card: 'summary_large_image',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${dmSans.variable} antialiased`}>
        <TransitionProvider>
          <NuqsAdapter>
            <QueryProvider>
              <Lenis>
                {/* <SplashScreen> */}
                <Header />
                <CustomCursor />
                {children}
                <Footer />
                <Suspense>
                  <ScrollHandler />
                </Suspense>
                <BackToTop />
                {/* </SplashScreen> */}
              </Lenis>
            </QueryProvider>
          </NuqsAdapter>
        </TransitionProvider>
      </body>
    </html>
  );
}
