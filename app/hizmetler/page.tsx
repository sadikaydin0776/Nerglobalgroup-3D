import type { Metadata } from 'next';
import { Services } from '@/components/Services';
import { Footer } from '@/components/Footer';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Hizmetler | NEW GLOBAL GROUP',
  description:
    'Profesyonel güvenlik, temizlik, personel tedarik, tesis yönetimi, kurumsal danışmanlık ve teknoloji çözümleri.',
};

export default function HizmetlerPage() {
  return (
    <>
      {/* Page Hero */}
      <section className="relative min-h-[50vh] flex items-end pb-16 pt-40 bg-primary overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary/80 to-primary pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-[600px] h-[400px] bg-blue-500/[0.04] blur-[160px] rounded-full pointer-events-none" />

        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
          <div className="flex items-center gap-2 text-white/30 text-[13px] mb-8 uppercase tracking-widest font-medium">
            <Link href="/" className="hover:text-white transition-colors">
              Ana Sayfa
            </Link>
            <span>/</span>
            <span className="text-white/60">Hizmetler</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-[72px] font-serif font-semibold text-white tracking-tight leading-[1.05] mb-6">
            Profesyonel <span className="gold-text">Hizmetlerimiz</span>
          </h1>
          <p className="text-lg text-white/45 font-light max-w-xl leading-relaxed">
            Güvenlikten tesis yönetimine, teknolojiden danışmanlığa kadar işletmenizin her ihtiyacını karşılıyoruz.
          </p>
        </div>
      </section>

      <Services />
      <Footer />
    </>
  );
}
