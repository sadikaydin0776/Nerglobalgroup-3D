import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Footer } from '@/components/Footer';
import { ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';

const services: Record<string, {
  title: string;
  subtitle: string;
  description: string;
  longDesc: string;
  features: string[];
  benefits: string[];
  image: string;
  color: string;
  tag: string;
}> = {
  'profesyonel-guvenlik': {
    title: 'Profesyonel Güvenlik',
    subtitle: '7/24 Kesintisiz Koruma',
    description: 'Tesislerinizi ve varlıklarınızı 7/24 koruyan, ileri teknoloji destekli entegre güvenlik çözümleri.',
    longDesc: 'NEW GLOBAL GROUP Profesyonel Güvenlik hizmetleri, sertifikalı güvenlik uzmanlarımız ve gelişmiş teknoloji altyapımızla kurumunuzu her an koruma altına alır. CCTV sistemleri, alarm entegrasyonu ve mobil devriye hizmetlerimizle 360 derece güvenlik çözümü sunuyoruz.',
    features: ['Sertifikalı Güvenlik Görevlileri', '7/24 Operasyon Merkezi', 'CCTV & Alarm Entegrasyonu', 'Mobil Devriye Hizmeti', 'Acil Durum Müdahale Planı', 'Aylık Güvenlik Raporu'],
    benefits: ['Hırsızlık ve vandalizm riskini %90 azaltır', 'Çalışan güvenliğini ve moralini artırır', 'Sigorta primlerini düşürür', 'Müşteri güvenini pekiştirir'],
    image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=1200&auto=format&fit=crop',
    color: '#3B82F6',
    tag: 'Güvenlik',
  },
  'profesyonel-temizlik': {
    title: 'Profesyonel Temizlik',
    subtitle: 'ISO Standartlarında Hijyen',
    description: 'Sağlıklı ve hijyenik çalışma alanları için uluslararası standartlarda profesyonel temizlik hizmetleri.',
    longDesc: 'Uzman temizlik ekibimiz, ISO sertifikalı ürünler ve profesyonel ekipmanlarla ofisinizi, fabrikanızı veya ticari alanınızı mükemmel temizlik standartlarına taşır. Günlük, haftalık veya özel proje bazlı hizmet seçeneklerimizle ihtiyacınıza özel çözüm sunuyoruz.',
    features: ['ISO Sertifikalı Temizlik Ürünleri', 'Eğitimli Temizlik Uzmanları', 'Derin Temizlik & Dezenfeksiyon', 'Cam & Cephe Temizliği', 'Endüstriyel Makine Yıkama', 'Çevre Dostu Ürünler'],
    benefits: ['Çalışan verimliliğini %25 artırır', 'Hastalık kaynaklı devamsızlığı azaltır', 'Profesyonel imaj oluşturur', 'Bakım maliyetlerini düşürür'],
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1200&auto=format&fit=crop',
    color: '#10B981',
    tag: 'Temizlik',
  },
  'personel-tedarik': {
    title: 'Personel Tedarik',
    subtitle: 'Doğru Yetenek, Doğru Pozisyon',
    description: 'İşletmenizin kültürüne ve ihtiyaçlarına en uygun, nitelikli ve eğitimli personel çözümleri.',
    longDesc: 'İşe alım süreçlerinizi profesyonelleştirin. Kapsamlı özgeçmiş tarama, teknik mülakat ve referans kontrolü hizmetlerimizle en uygun adayı en kısa sürede buluyoruz. Geçici personel, kalıcı işe alım ve outsourcing çözümleri sunuyoruz.',
    features: ['Özgeçmiş Tarama & Mülakat', 'Referans & Geçmiş Kontrolü', 'Geçici & Kalıcı Personel', 'İşe Alım Outsourcing', 'Personel Eğitim Programı', 'Performans Takibi'],
    benefits: ['İşe alım süresini %60 kısaltır', 'Yanlış personel maliyetini ortadan kaldırır', 'HR departmanı yükünü azaltır', 'İş gücü esnekliği sağlar'],
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1200&auto=format&fit=crop',
    color: '#8B5CF6',
    tag: 'İnsan Kaynakları',
  },
  'tesis-yonetimi': {
    title: 'Tesis Yönetimi',
    subtitle: 'Binadan Değer Üretin',
    description: 'Binalarınızın teknik bakımından operasyonel yönetimine kadar değer katan entegre tesis yönetimi.',
    longDesc: 'Tek bir noktadan tüm tesis operasyonlarınızı yönetin. Mekanik, elektrik ve altyapı bakımından çevre düzenlemesine, enerji optimizasyonundan güvenlik entegrasyonuna kadar tüm tesis ihtiyaçlarınızı karşılıyoruz.',
    features: ['Mekanik & Elektrik Bakım', 'Enerji Verimliliği Yönetimi', 'Çevre & Peyzaj Düzenleme', 'Taşıyıcı Sistem Bakımı', 'Acil Arıza Müdahalesi', 'Periyodik Denetim Raporları'],
    benefits: ['Tesis ömrünü %40 uzatır', 'Enerji maliyetlerini düşürür', 'Beklenmedik arıza maliyetlerini önler', 'Mülk değerini korur ve artırır'],
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop',
    color: '#F59E0B',
    tag: 'Tesis',
  },
  'kurumsal-danismanlik': {
    title: 'Kurumsal Danışmanlık',
    subtitle: 'Stratejik Çözüm Ortağınız',
    description: 'Operasyonel verimliliğinizi artıracak stratejik planlama ve yönetim danışmanlığı.',
    longDesc: 'İş süreçlerinizi analiz ediyor, iyileştirme fırsatlarını belirliyoruz. Mevzuat uyumu, operasyonel verimlilik ve kurumsal dönüşüm projelerinde deneyimli danışman kadromuzla yanınızdayız.',
    features: ['Süreç Analizi & İyileştirme', 'Mevzuat Uyum Danışmanlığı', 'Organizasyonel Dönüşüm', 'Risk Yönetimi', 'KPI & Performans Ölçümü', 'Eğitim & Koçluk'],
    benefits: ['Operasyonel verimliliği artırır', 'Hukuki riskleri minimize eder', 'Karar alma süreçlerini hızlandırır', 'Rekabet avantajı sağlar'],
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200&auto=format&fit=crop',
    color: '#D4AF37',
    tag: 'Danışmanlık',
  },
  'teknoloji-cozumleri': {
    title: 'Teknoloji Çözümleri',
    subtitle: 'Dijital Dönüşüm Ortağınız',
    description: 'Güvenlik ve yönetim süreçlerinizi dijitalleştiren yenilikçi altyapı ve yazılım sistemleri.',
    longDesc: 'Yapay zeka destekli güvenlik sistemleri, IoT tabanlı tesis yönetim platformları ve özel yazılım çözümleri ile işletmenizin dijital dönüşümünü hızlandırıyoruz. Bulut tabanlı yönetim panelimizle tüm operasyonlarınızı tek ekrandan yönetin.',
    features: ['AI Destekli Güvenlik Sistemleri', 'IoT Tesis Yönetim Platformu', 'Bulut Tabanlı Yönetim Paneli', 'Mobil Uygulama Entegrasyonu', 'Veri Analizi & Raporlama', 'Siber Güvenlik Çözümleri'],
    benefits: ['Operasyonel maliyetleri %35 düşürür', 'Gerçek zamanlı izleme imkânı sağlar', 'İnsan hatasını minimize eder', 'Ölçeklenebilir altyapı sunar'],
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop',
    color: '#06B6D4',
    tag: 'Teknoloji',
  },
};

export async function generateStaticParams() {
  return Object.keys(services).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const service = services[params.slug];
  if (!service) return {};
  return {
    title: service.title,
    description: service.description,
    openGraph: {
      title: `${service.title} | NEW GLOBAL GROUP`,
      description: service.description,
      images: [{ url: service.image }],
    },
  };
}

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = services[params.slug];
  if (!service) notFound();

  const allServices = Object.entries(services)
    .filter(([slug]) => slug !== params.slug)
    .slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative w-full pt-32 pb-20 overflow-hidden bg-[#04090F]">
        <div className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{ backgroundImage: `url('${service.image}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#04090F] via-[#04090F]/70 to-[#04090F]/40" />

        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-16 relative z-10">
          <Link href="/hizmetler" className="inline-flex items-center gap-2 text-white/40 hover:text-white transition-colors text-[13px] font-medium mb-8 group">
            <ArrowLeft size={15} className="transition-transform group-hover:-translate-x-1" />
            Tüm Hizmetler
          </Link>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel mb-6">
            <span className="w-1.5 h-1.5 rounded-full pulse-gold" style={{ background: service.color }} />
            <span className="text-[10px] font-semibold tracking-[0.25em] text-white/70 uppercase">{service.tag}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-[68px] font-serif font-semibold text-white tracking-tight leading-[1.06] mb-5">
            {service.title}
          </h1>
          <p className="text-lg sm:text-xl text-white/50 font-light max-w-2xl leading-relaxed mb-10">
            {service.longDesc}
          </p>

          <Link
            href="/iletisim"
            className="inline-flex items-center gap-2 px-7 h-[52px] rounded-full font-semibold text-[15px] text-black hover:opacity-90 transition-opacity group"
            style={{ background: `linear-gradient(135deg, ${service.color}, ${service.color}cc)` }}
          >
            Teklif Al
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      {/* Features + Benefits */}
      <section className="w-full py-20 bg-[#07111F]">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

            {/* Features */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-white mb-8">
                Hizmet <span className="gold-text">Kapsamı</span>
              </h2>
              <div className="flex flex-col gap-3">
                {service.features.map((feature, idx) => (
                  <div key={idx} className="glass-panel rounded-[16px] px-5 py-4 flex items-center gap-4 hover:border-white/[0.12] transition-all duration-300 group">
                    <div className="w-8 h-8 rounded-[10px] flex items-center justify-center shrink-0"
                      style={{ background: `${service.color}15`, border: `1px solid ${service.color}25` }}>
                      <CheckCircle2 size={16} style={{ color: service.color }} strokeWidth={2} />
                    </div>
                    <span className="text-[15px] text-white/70 font-medium group-hover:text-white transition-colors">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Benefits */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-white mb-8">
                Size <span className="gold-text">Kazandırdıkları</span>
              </h2>
              <div className="flex flex-col gap-4">
                {service.benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <span className="text-2xl font-bold shrink-0 mt-0.5" style={{ color: `${service.color}50`, fontVariantNumeric: 'tabular-nums' }}>
                      0{idx + 1}
                    </span>
                    <p className="text-white/60 font-light text-[16px] leading-relaxed pt-1">{benefit}</p>
                  </div>
                ))}
              </div>

              {/* CTA box */}
              <div className="mt-10 glass-panel rounded-[24px] p-7 relative overflow-hidden"
                style={{ borderColor: `${service.color}25` }}>
                <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full blur-2xl opacity-20"
                  style={{ background: service.color }} />
                <h3 className="text-xl font-serif font-semibold text-white mb-2">Bu hizmeti almak ister misiniz?</h3>
                <p className="text-white/45 text-[14px] mb-5 font-light">Uzmanlarımız ihtiyacınıza özel teklif hazırlasın.</p>
                <Link href="/iletisim"
                  className="inline-flex items-center gap-2 px-6 h-[44px] rounded-full font-semibold text-[14px] text-black group"
                  style={{ background: `linear-gradient(135deg, #D4AF37, #F5D78B, #A07830)` }}>
                  Ücretsiz Teklif Al
                  <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Other services */}
      <section className="w-full py-16 bg-[#04090F]">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-16">
          <h2 className="text-2xl font-serif font-semibold text-white mb-8">
            Diğer <span className="gold-text">Hizmetlerimiz</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {allServices.map(([slug, svc]) => (
              <Link key={slug} href={`/hizmetler/${slug}`}
                className="glass-panel rounded-[20px] p-6 hover:border-white/[0.12] transition-all duration-300 group hover:-translate-y-1">
                <div className="w-10 h-10 rounded-[12px] flex items-center justify-center mb-4"
                  style={{ background: `${svc.color}15`, border: `1px solid ${svc.color}25` }}>
                  <div className="w-2 h-2 rounded-full" style={{ background: svc.color }} />
                </div>
                <h3 className="text-[16px] font-semibold text-white mb-1.5 group-hover:text-gold-300 transition-colors">{svc.title}</h3>
                <p className="text-white/40 text-[13px] font-light leading-relaxed line-clamp-2">{svc.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
