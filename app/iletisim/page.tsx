import type { Metadata } from 'next';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'İletişim | NEW GLOBAL GROUP',
  description:
    'NEW GLOBAL GROUP ile iletişime geçin. +90 530 598 07 72 | ozturk@newglobalgroup.com.tr',
};

export default function IletisimPage() {
  return (
    <>
      <section className="relative min-h-[40vh] flex items-end pb-16 pt-40 bg-primary overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary/80 to-primary pointer-events-none" />
        <div className="absolute top-1/3 left-1/3 w-[500px] h-[300px] bg-gold-400/[0.04] blur-[140px] rounded-full pointer-events-none" />

        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
          <div className="flex items-center gap-2 text-white/30 text-[13px] mb-8 uppercase tracking-widest font-medium">
            <Link href="/" className="hover:text-white transition-colors">
              Ana Sayfa
            </Link>
            <span>/</span>
            <span className="text-white/60">İletişim</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-semibold text-white tracking-tight leading-[1.05] mb-6">
            Bize <span className="gold-text">Ulaşın</span>
          </h1>
          <p className="text-lg text-white/45 font-light max-w-xl leading-relaxed">
            Uzman ekibimiz sorularınızı yanıtlamak ve size özel teklif hazırlamak için hazır.
          </p>
        </div>
      </section>

      <Contact />
      <Footer />
    </>
  );
}
