import type { Metadata } from 'next';
import { Faq } from '@/components/Faq';
import { Footer } from '@/components/Footer';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Sıkça Sorulan Sorular | NEW GLOBAL GROUP',
  description: 'NEW GLOBAL GROUP hakkında merak ettiğiniz soruların cevapları.',
};

export default function SssPage() {
  return (
    <>
      <section className="relative min-h-[40vh] flex items-end pb-16 pt-40 bg-primary overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary/80 to-primary pointer-events-none" />

        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
          <div className="flex items-center gap-2 text-white/30 text-[13px] mb-8 uppercase tracking-widest font-medium">
            <Link href="/" className="hover:text-white transition-colors">
              Ana Sayfa
            </Link>
            <span>/</span>
            <span className="text-white/60">S.S.S.</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-semibold text-white tracking-tight leading-[1.05] mb-6">
            Sıkça Sorulan <span className="gold-text">Sorular</span>
          </h1>
          <p className="text-lg text-white/45 font-light max-w-xl leading-relaxed">
            En çok merak edilen soruları derledik. Cevabını bulamazsanız bize yazın.
          </p>
        </div>
      </section>

      <Faq />
      <Footer />
    </>
  );
}
