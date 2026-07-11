import type { Metadata } from 'next';
import { QuoteCalculator } from '@/components/QuoteCalculator';
import { Footer } from '@/components/Footer';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Teklif Hesapla',
  description: 'NEW GLOBAL GROUP hizmetleri için anında tahmini teklif alın. Güvenlik, temizlik ve tesis yönetimi hizmetlerimiz için fiyat hesaplayıcı.',
};

export default function TeklifHesaplaPage() {
  return (
    <>
      <section className="relative pt-36 pb-12 bg-[#04090F] overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] pointer-events-none opacity-30"
          style={{ background: 'radial-gradient(ellipse, rgba(212,175,55,0.06), transparent 70%)' }} />

        <div className="max-w-[800px] mx-auto px-5 sm:px-8 relative z-10 text-center">
          <div className="px-3 py-1.5 rounded-full mb-6 inline-flex items-center gap-2.5 glass-panel">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-400 pulse-gold" />
            <span className="text-[10px] font-semibold tracking-[0.25em] text-white/75 uppercase">
              TAHMİNİ FİYAT HESAPLA
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-[52px] font-serif font-semibold text-white tracking-tight mb-4 leading-[1.08]">
            Hizmetinizin <span className="gold-text">Tahmini Bütçesi</span>
          </h1>
          <p className="text-base sm:text-lg text-white/45 font-light leading-relaxed mb-2">
            Birkaç soruyu cevaplayın, size özel tahmini fiyat aralığını anında görelim.
          </p>
          <p className="text-[13px] text-white/25 font-light">
            * Kesin fiyat için uzmanlarımız sizi arayacaktır.
          </p>
        </div>
      </section>

      <QuoteCalculator />
      <Footer />
    </>
  );
}
