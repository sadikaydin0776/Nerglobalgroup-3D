import Link from 'next/link';
import Image from 'next/image';

export function Footer() {
  return (
    <footer className="relative w-full bg-primary border-t border-white/[0.04] pt-20 pb-8 overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[300px] bg-gold-600/[0.03] blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
        {/* Big CTA heading */}
        <div className="mb-20 pb-20 border-b border-white/[0.05] text-center">
          <h2 className="text-4xl md:text-6xl lg:text-[80px] font-serif font-semibold tracking-tighter text-white mb-4 leading-none">
            Güvenin Geleceğini{' '}
            <br />
            <span className="gold-text">Birlikte İnşa Edelim.</span>
          </h2>
        </div>

        {/* 4-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-20">
          {/* Brand */}
          <div className="flex flex-col items-start">
            <Link href="/" className="mb-5 block">
              <Image
                src="/logo.png"
                alt="NEW GLOBAL GROUP"
                width={150}
                height={60}
                className="h-20 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
              />
            </Link>
            <p className="text-white/35 font-light text-[14px] leading-relaxed">
              Türkiye&apos;nin en yenilikçi ve güvenilir kurumsal hizmet sağlayıcısı.
            </p>
          </div>

          {/* Kurumsal */}
          <div>
            <h4 className="text-white/70 font-semibold tracking-widest uppercase text-[11px] mb-7">
              Kurumsal
            </h4>
            <div className="flex flex-col gap-3.5 text-[14px] text-white/35">
              {[
                { label: 'Hakkımızda', href: '/hakkimizda' },
                { label: 'Vizyon & Misyon', href: '/hakkimizda' },
                { label: 'Kalite Politikamız', href: '/hakkimizda' },
              ].map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  className="hover:text-gold-300 transition-colors duration-300 w-fit"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Hizmetler */}
          <div>
            <h4 className="text-white/70 font-semibold tracking-widest uppercase text-[11px] mb-7">
              Hizmetler
            </h4>
            <div className="flex flex-col gap-3.5 text-[14px] text-white/35">
              {[
                'Profesyonel Güvenlik',
                'Tesis Yönetimi',
                'Profesyonel Temizlik',
                'Personel Tedarik',
                'Teknoloji Çözümleri',
              ].map((s) => (
                <Link
                  key={s}
                  href="/hizmetler"
                  className="hover:text-gold-300 transition-colors duration-300 w-fit"
                >
                  {s}
                </Link>
              ))}
            </div>
          </div>

          {/* İletişim */}
          <div>
            <h4 className="text-white/70 font-semibold tracking-widest uppercase text-[11px] mb-7">
              İletişim
            </h4>
            <div className="flex flex-col gap-3.5 text-[14px] text-white/35 mb-8">
              <p className="leading-relaxed">
                Cumhuriyet Mah. Şehitler Cad.
                <br />
                Concepta Plaza Sitesi B Blok
                <br />
                No: 9/1 İç Kapı 53 Esenyurt/İstanbul
              </p>
              <a
                href="mailto:ozturk@newglobalgroup.com.tr"
                className="hover:text-gold-300 transition-colors duration-300 w-fit"
              >
                ozturk@newglobalgroup.com.tr
              </a>
              <a
                href="tel:+905305980772"
                className="hover:text-gold-300 transition-colors duration-300 w-fit"
              >
                +90 530 598 07 72
              </a>
            </div>
          </div>
        </div>

        {/* Legal links */}
        <div className="flex flex-wrap justify-center items-center gap-5 md:gap-10 text-[11px] font-medium tracking-widest uppercase text-white/25 pb-8 border-b border-white/[0.04]">
          <Link href="/kvkk-aydinlatma-metni" className="hover:text-white transition-colors">
            KVKK Aydınlatma Metni
          </Link>
          <Link href="/gizlilik-politikasi" className="hover:text-white transition-colors">
            Gizlilik Politikası
          </Link>
          <Link href="/cerez-politikasi" className="hover:text-white transition-colors">
            Çerez Politikası
          </Link>
        </div>

        {/* Copyright */}
        <div className="pt-8 flex flex-col items-center text-center gap-1.5">
          <p className="text-[13px] text-white/40 hover:text-white/60 transition-colors">
            &copy; 2026 NEW GLOBAL GROUP. Tüm hakları saklıdır.
          </p>
          <p className="text-[13px] text-white/40 hover:text-white/60 transition-colors">
            Designed &amp; Developed by Sadık Aydın
          </p>
        </div>
      </div>
    </footer>
  );
}
