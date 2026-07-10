import type { Metadata } from 'next';
import { Footer } from '@/components/Footer';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Çerez Politikası | NEW GLOBAL GROUP',
};

export default function CerezPage() {
  return (
    <>
      <section className="relative pt-40 pb-24 bg-primary overflow-hidden min-h-screen">
        <div className="max-w-[900px] mx-auto px-6 md:px-10 relative z-10">
          <div className="flex items-center gap-2 text-white/30 text-[13px] mb-10 uppercase tracking-widest font-medium">
            <Link href="/" className="hover:text-white transition-colors">Ana Sayfa</Link>
            <span>/</span>
            <span className="text-white/60">Çerez Politikası</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-serif font-semibold text-white mb-10">
            Çerez Politikası
          </h1>

          <div className="prose prose-invert prose-lg max-w-none text-white/55 font-light leading-relaxed space-y-8">
            <section>
              <h2 className="text-white font-semibold text-xl mb-4">1. Çerez Nedir?</h2>
              <p>
                Çerezler, bir web sitesini ziyaret ettiğinizde cihazınıza yerleştirilen küçük metin dosyalarıdır. Web sitemizin daha iyi çalışması ve kullanıcı deneyiminin iyileştirilmesi için çerezler kullanılmaktadır.
              </p>
            </section>

            <section>
              <h2 className="text-white font-semibold text-xl mb-4">2. Kullandığımız Çerezler</h2>
              <p>
                <strong className="text-white">Zorunlu Çerezler:</strong> Web sitesinin temel işlevlerini yerine getirebilmesi için gereklidir.
              </p>
              <p>
                <strong className="text-white">Analitik Çerezler:</strong> Ziyaretçi davranışlarını anlamamıza yardımcı olur ve siteyi iyileştirmek amacıyla kullanılır.
              </p>
            </section>

            <section>
              <h2 className="text-white font-semibold text-xl mb-4">3. Çerezleri Kontrol Etme</h2>
              <p>
                Tarayıcı ayarlarınızdan çerezleri devre dışı bırakabilirsiniz. Ancak bazı işlevler çalışmayabilir.
              </p>
            </section>

            <section>
              <h2 className="text-white font-semibold text-xl mb-4">4. İletişim</h2>
              <p>
                Sorularınız için:{' '}
                <a href="mailto:ozturk@newglobalgroup.com.tr" className="text-gold-400 hover:text-gold-300 transition-colors">
                  ozturk@newglobalgroup.com.tr
                </a>
              </p>
            </section>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
