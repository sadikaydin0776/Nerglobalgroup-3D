import type { Metadata } from 'next';
import { About } from '@/components/About';
import { WhyUs } from '@/components/WhyUs';
import { Stats } from '@/components/Stats';
import { Footer } from '@/components/Footer';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Hakkımızda | NEW GLOBAL GROUP',
  description:
    'NEW GLOBAL GROUP hakkında bilgi edinin. Güvenlik, temizlik, personel tedarik ve tesis yönetimi alanlarında 20+ yıllık deneyim.',
};

export default function HakkimizdaPage() {
  return (
    <>
      {/* Page Hero */}
      <section className="relative min-h-[50vh] flex items-end pb-16 pt-40 bg-primary overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary/80 to-primary pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-[600px] h-[400px] bg-gold-400/[0.04] blur-[160px] rounded-full pointer-events-none" />

        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
          <div className="flex items-center gap-2 text-white/30 text-[13px] mb-8 uppercase tracking-widest font-medium">
            <Link href="/" className="hover:text-white transition-colors">
              Ana Sayfa
            </Link>
            <span>/</span>
            <span className="text-white/60">Hakkımızda</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-[72px] font-serif font-semibold text-white tracking-tight leading-[1.05] mb-6">
            Kurumsal <span className="gold-text">Kimliğimiz</span>
          </h1>
          <p className="text-lg text-white/45 font-light max-w-xl leading-relaxed">
            20 yılı aşkın deneyimimiz ve 500+ uzman personelimizle Türkiye&apos;nin en güvenilir kurumsal hizmet sağlayıcısıyız.
          </p>
        </div>
      </section>

      <Stats />
      <About />
      <WhyUs />

      {/* CTA */}
      <section className="relative py-24 bg-primary overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-surface to-primary pointer-events-none" />
        <div className="max-w-[700px] mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-white mb-6">
            Güçlü Bir Ortaklık İçin <span className="gold-text">Hemen Başlayalım</span>
          </h2>
          <p className="text-white/45 font-light mb-10 leading-relaxed">
            Operasyonel süreçlerinizi profesyonel ellere bırakın. Ücretsiz teklif alın.
          </p>
          <Link
            href="/iletisim"
            className="inline-flex items-center gap-3 px-9 h-[56px] bg-gold-400 text-black rounded-full font-semibold hover:bg-gold-300 hover:shadow-[0_0_40px_rgba(212,175,55,0.4)] transition-all duration-300 hover:scale-[1.02] group"
          >
            İletişime Geç
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
