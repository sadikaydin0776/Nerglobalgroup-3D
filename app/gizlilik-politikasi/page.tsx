import type { Metadata } from 'next';
import { Footer } from '@/components/Footer';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Gizlilik Politikası | NEW GLOBAL GROUP',
};

export default function GizlilikPage() {
  return (
    <>
      <section className="relative pt-40 pb-24 bg-primary overflow-hidden min-h-screen">
        <div className="max-w-[900px] mx-auto px-6 md:px-10 relative z-10">
          <div className="flex items-center gap-2 text-white/30 text-[13px] mb-10 uppercase tracking-widest font-medium">
            <Link href="/" className="hover:text-white transition-colors">Ana Sayfa</Link>
            <span>/</span>
            <span className="text-white/60">Gizlilik Politikası</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-serif font-semibold text-white mb-10">
            Gizlilik Politikası
          </h1>

          <div className="prose prose-invert prose-lg max-w-none text-white/55 font-light leading-relaxed space-y-8">
            <section>
              <h2 className="text-white font-semibold text-xl mb-4">1. Genel Bilgiler</h2>
              <p>
                NEW GLOBAL GROUP olarak kullanıcılarımızın gizliliğine büyük önem veriyoruz. Bu politika, web sitemizi kullanırken hangi bilgilerin toplandığını ve bu bilgilerin nasıl kullanıldığını açıklamaktadır.
              </p>
            </section>

            <section>
              <h2 className="text-white font-semibold text-xl mb-4">2. Toplanan Bilgiler</h2>
              <p>
                İletişim formları aracılığıyla ad, soyad, e-posta adresi ve telefon numarası gibi kişisel bilgiler toplanabilir. Web sitesi trafiği analizi için anonim kullanım verileri de kaydedilir.
              </p>
            </section>

            <section>
              <h2 className="text-white font-semibold text-xl mb-4">3. Bilgilerin Kullanımı</h2>
              <p>
                Toplanan bilgiler yalnızca hizmet sunumu, müşteri iletişimi ve yasal yükümlülüklerin yerine getirilmesi amacıyla kullanılır. Kişisel verileriniz üçüncü taraflarla pazarlama amaçlı paylaşılmaz.
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
