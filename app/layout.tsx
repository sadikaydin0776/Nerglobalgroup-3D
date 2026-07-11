import type { Metadata, Viewport } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/Header';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { CustomCursor } from '@/components/CustomCursor';
import { SmoothScrollProvider } from '@/components/SmoothScrollProvider';
import { PageWrapper } from '@/components/PageWrapper';
import { FloatingCTA } from '@/components/FloatingCTA';
import { InstallBanner } from '@/components/InstallBanner';
import { VisitorBadge } from '@/components/VisitorBadge';
import { GoogleAnalytics } from '@/components/GoogleAnalytics';
import { ScrollProgress } from '@/components/ScrollProgress';

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

const siteUrl = 'https://newglobalgroup.com.tr';
const ogImage = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'NEW GLOBAL GROUP | Profesyonel Güvenlik ve Tesis Yönetimi',
    template: '%s | NEW GLOBAL GROUP',
  },
  description:
    'NEW GLOBAL GROUP olarak güvenlik, temizlik, personel tedarik, tesis yönetimi ve kurumsal danışmanlık hizmetlerini tek çatı altında sunuyoruz. İstanbul Esenyurt merkezli, Türkiye geneli hizmet.',
  keywords: [
    'güvenlik hizmetleri',
    'tesis yönetimi',
    'profesyonel temizlik',
    'personel tedarik',
    'kurumsal danışmanlık',
    'teknoloji çözümleri',
    'New Global Group',
    'özel güvenlik',
    'İstanbul güvenlik',
    'Esenyurt',
  ],
  authors: [{ name: 'NEW GLOBAL GROUP', url: siteUrl }],
  creator: 'NEW GLOBAL GROUP',
  publisher: 'NEW GLOBAL GROUP',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  openGraph: {
    type: 'website',
    url: `${siteUrl}/`,
    siteName: 'NEW GLOBAL GROUP',
    title: 'NEW GLOBAL GROUP | Profesyonel Güvenlik ve Tesis Yönetimi',
    description:
      'NEW GLOBAL GROUP olarak güvenlik, temizlik, personel tedarik, tesis yönetimi ve kurumsal danışmanlık hizmetlerini tek çatı altında sunuyoruz.',
    images: [{ url: ogImage, width: 1200, height: 630, alt: 'NEW GLOBAL GROUP' }],
    locale: 'tr_TR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEW GLOBAL GROUP | Profesyonel Güvenlik ve Tesis Yönetimi',
    description:
      'NEW GLOBAL GROUP olarak güvenlik, temizlik, personel tedarik, tesis yönetimi ve kurumsal danışmanlık hizmetlerini tek çatı altında sunuyoruz.',
    images: [ogImage],
  },
  alternates: { canonical: `${siteUrl}/` },
  manifest: '/site.webmanifest',
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
};

const schemaOrg = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${siteUrl}/#organization`,
      name: 'NEW GLOBAL GROUP',
      url: siteUrl,
      logo: `${siteUrl}/logo.png`,
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+90-530-598-07-72',
        contactType: 'customer service',
        email: 'ozturk@newglobalgroup.com.tr',
        areaServed: 'TR',
        availableLanguage: 'Turkish',
      },
    },
    {
      '@type': 'LocalBusiness',
      '@id': `${siteUrl}/#localbusiness`,
      name: 'NEW GLOBAL GROUP',
      image: ogImage,
      url: siteUrl,
      telephone: '+90 530 598 07 72',
      email: 'ozturk@newglobalgroup.com.tr',
      priceRange: '₺₺',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Cumhuriyet Mah. Şehitler Cad. Concepta Plaza Sitesi B Blok No: 9/1 İç Kapı 53',
        addressLocality: 'Esenyurt',
        addressRegion: 'İstanbul',
        addressCountry: 'TR',
      },
      geo: { '@type': 'GeoCoordinates', latitude: 41.0201, longitude: 28.6724 },
      openingHours: 'Mo-Su 00:00-24:00',
      sameAs: [`${siteUrl}`],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'Ne kadar sürede geri dönüş yapıyorsunuz?', acceptedAnswer: { '@type': 'Answer', text: 'Mesai saatleri içerisinde yapılan başvurulara genellikle aynı gün içerisinde dönüş sağlanmaktadır.' } },
        { '@type': 'Question', name: "Türkiye'nin her yerinde hizmet veriyor musunuz?", acceptedAnswer: { '@type': 'Answer', text: "Evet, NEW GLOBAL GROUP olarak Türkiye genelinde güvenlik, temizlik, personel tedarik, tesis yönetimi ve danışmanlık hizmetleri sunuyoruz." } },
        { '@type': 'Question', name: 'Hangi hizmetleri sunuyorsunuz?', acceptedAnswer: { '@type': 'Answer', text: 'Profesyonel güvenlik, profesyonel temizlik, personel tedarik, tesis yönetimi, kurumsal danışmanlık ve teknoloji çözümleri sunuyoruz.' } },
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: 'NEW GLOBAL GROUP',
      publisher: { '@id': `${siteUrl}/#organization` },
      potentialAction: { '@type': 'SearchAction', target: { '@type': 'EntryPoint', urlTemplate: `${siteUrl}/?q={search_term_string}` }, 'query-input': 'required name=search_term_string' },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />
      </head>
      <body className="overflow-x-hidden w-full max-w-[100vw]">
        <GoogleAnalytics />
        <CustomCursor />
        <ScrollProgress />
        <SmoothScrollProvider>
          <PageWrapper>
            <Header />
            <main className="overflow-x-hidden w-full">{children}</main>
            <WhatsAppButton />
            <FloatingCTA />
            <InstallBanner />
            <VisitorBadge />
          </PageWrapper>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
