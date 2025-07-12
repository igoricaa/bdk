import type { Metadata } from 'next';
import { DM_Sans } from 'next/font/google';
import './globals.css';
import Lenis from '@/components/lenis';
import Footer from '@/components/footer';
import Header from '@/components/header/header';
import QueryProvider from '@/components/providers/query-client-provider';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import ScrollHandler from '@/components/scroll-handler';
import { Suspense } from 'react';
import BackToTop from '@/components/ui/back-to-top';
import SplashScreen from '@/components/splash-screen';
import { TransitionProvider } from '@/components/transition-link';

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-dm-sans',
});

export const metadata: Metadata = {
  title: 'BDK',
  description: 'BDK Law Firm',
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
                <SplashScreen>
                  <Header />
                  {children}
                  <Footer />
                  <Suspense>
                    <ScrollHandler />
                  </Suspense>
                  <BackToTop />
                </SplashScreen>
              </Lenis>
            </QueryProvider>
          </NuqsAdapter>
        </TransitionProvider>
      </body>
    </html>
  );
}
