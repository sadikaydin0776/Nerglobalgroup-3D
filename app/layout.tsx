import type { Metadata, Viewport } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/Header';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { CustomCursor } from '@/components/CustomCursor';
import { SmoothScrollProvider } from '@/components/SmoothScrollProvider';
import { PageWrapper } from '@/components/PageWrapper';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#04090F',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://newglobalgroup.com.tr'),
  title: 'NEW GLOBAL GROUP | Profesyonel Güvenlik ve Tesis Yönetimi',
  description:
    'NEW GLOBAL GROUP olarak güvenlik, temizlik, personel tedarik, tesis yönetimi ve kurumsal danışmanlık hizmetlerini tek çatı altında sunuyoruz.',
  keywords:
    'güvenlik, tesis yönetimi, profesyonel temizlik, personel tedarik, kurumsal danışmanlık, teknoloji çözümleri, New Global Group',
  openGraph: {
    type: 'website',
    url: 'https://newglobalgroup.com.tr/',
    title: 'NEW GLOBAL GROUP | Profesyonel Güvenlik ve Tesis Yönetimi',
    description:
      'NEW GLOBAL GROUP olarak güvenlik, temizlik, personel tedarik, tesis yönetimi ve kurumsal danışmanlık hizmetlerini tek çatı altında sunuyoruz.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEW GLOBAL GROUP | Profesyonel Güvenlik ve Tesis Yönetimi',
    description:
      'NEW GLOBAL GROUP olarak güvenlik, temizlik, personel tedarik, tesis yönetimi ve kurumsal danışmanlık hizmetlerini tek çatı altında sunuyoruz.',
  },
  alternates: {
    canonical: 'https://newglobalgroup.com.tr/',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className={`${inter.variable} ${playfair.variable}`}>
      <body className="overflow-x-hidden">
        <CustomCursor />
        <SmoothScrollProvider>
          <PageWrapper>
            <Header />
            <main>{children}</main>
            <WhatsAppButton />
          </PageWrapper>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
