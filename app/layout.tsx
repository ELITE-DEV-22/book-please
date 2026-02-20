import type { Metadata } from 'next';
import { Cormorant_Garamond, DM_Sans } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Book, Please! | Trusted Book Reviews & Reading Guides',
    template: '%s | Book, Please!',
  },
  description:
    'Honest book reviews, best books to read, and curated reading recommendations. Top fiction, mystery thriller, self-help, and business book reviews for 2026.',
  keywords: [
    'book reviews',
    'honest book reviews',
    'best books to read',
    'top fiction books',
    'mystery thriller reviews',
    'self help book review',
    'business book summary',
    'book recommendations 2026',
    'bestselling books review',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body className="font-sans min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
