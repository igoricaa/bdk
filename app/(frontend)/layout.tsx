import type { Metadata } from 'next';
import { DM_Sans } from 'next/font/google';
import './globals.css';
import Lenis from '@/components/lenis';
import Footer from '@/components/footer';
import Header from '@/components/header/header';
import { getGeneralInfo } from '@/sanity/lib/cached-queries';
import QueryProvider from '@/components/providers/query-client-provider';

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { generalInfo, blinkdraft } = await getGeneralInfo();

  if (!generalInfo || !blinkdraft) {
    return <div>No general info or blinkdraft data found</div>;
  }

  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${dmSans.variable} antialiased`}>
        <QueryProvider>
          <Lenis>
            <Header
              bdkLogo={generalInfo?.logo}
              blinkdraftLogo={blinkdraft.logo}
            />
            {children}
            <Footer
              generalInfo={generalInfo}
              blinkdraftLogo={blinkdraft.logo}
            />
          </Lenis>
        </QueryProvider>
      </body>
    </html>
  );
}
