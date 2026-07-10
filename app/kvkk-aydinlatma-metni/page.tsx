import type { Metadata } from 'next';
import { Footer } from '@/components/Footer';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'KVKK Aydınlatma Metni | NEW GLOBAL GROUP',
};

export default function KvkkPage() {
  return (
    <>
      <section className="relative pt-40 pb-24 bg-primary overflow-hidden min-h-screen">
        <div className="max-w-[900px] mx-auto px-6 md:px-10 relative z-10">
          <div className="flex items-center gap-2 text-white/30 text-[13px] mb-10 uppercase tracking-widest font-medium">
            <Link href="/" className="hover:text-white transition-colors">Ana Sayfa</Link>
            <span>/</span>
            <span className="text-white/60">KVKK</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-serif font-semibold text-white mb-10">
            KVKK Aydınlatma Metni
          </h1>

          <div className="prose prose-invert prose-lg max-w-none text-white/55 font-light leading-relaxed space-y-8">
            <section>
              <h2 className="text-white font-semibold text-xl mb-4">1. Veri Sorumlusu</h2>
              <p>
                6698 sayılı Kişisel Verilerin Korunması Kanunu (&quot;KVKK&quot;) uyarınca, kişisel verileriniz veri sorumlusu sıfatıyla NEW GLOBAL GROUP tarafından aşağıda açıklanan kapsamda işlenebilecektir.
              </p>
            </section>

            <section>
              <h2 className="text-white font-semibold text-xl mb-4">2. Kişisel Verilerin İşlenme Amacı</h2>
              <p>
                Kişisel verileriniz; hizmet sunumu, müşteri ilişkileri yönetimi, iletişim faaliyetleri, yasal yükümlülüklerin yerine getirilmesi ve sözleşme süreçlerinin yönetimi amacıyla işlenmektedir.
              </p>
            </section>

            <section>
              <h2 className="text-white font-semibold text-xl mb-4">3. Kişisel Verilerin Toplanma Yöntemi</h2>
              <p>
                Kişisel verileriniz; web sitemiz, iletişim formları, e-posta yazışmaları, telefon görüşmeleri ve yüz yüze toplantılar aracılığıyla toplanmaktadır.
              </p>
            </section>

            <section>
              <h2 className="text-white font-semibold text-xl mb-4">4. Kişisel Verilerin Aktarılması</h2>
              <p>
                Kişisel verileriniz, yasal zorunluluklar kapsamında ilgili kamu kurum ve kuruluşlarıyla paylaşılabilir. Bunun dışında üçüncü kişilerle paylaşılmaz.
              </p>
            </section>

            <section>
              <h2 className="text-white font-semibold text-xl mb-4">5. İletişim</h2>
              <p>
                KVKK kapsamındaki haklarınızı kullanmak için:{' '}
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
