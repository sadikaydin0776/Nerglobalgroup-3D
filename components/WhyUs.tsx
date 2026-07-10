'use client';

import { ShieldCheck, Cpu, MapPin, Clock } from 'lucide-react';

const reasons = [
  {
    title: 'Deneyimli Kadro',
    icon: ShieldCheck,
    desc: 'Sektörün en yetkin profesyonelleri ile çalışıyoruz. 20 yılı aşkın deneyimimiz ile en zorlu operasyonları başarıyla yönetiyoruz.',
    accent: '#3B82F6',
  },
  {
    title: 'Teknoloji Destekli',
    icon: Cpu,
    desc: 'Yapay zeka ve dijital altyapı ile entegre yönetim sistemleri kurarak operasyonel verimliliğinizi maksimize ediyoruz.',
    accent: '#D4AF37',
  },
  {
    title: 'Türkiye Geneli',
    icon: MapPin,
    desc: "Ülkenin dört bir yanında eşzamanlı operasyon gücü ile İstanbul'dan Ankara'ya, İzmir'den Bursa'ya kesintisiz hizmet veriyoruz.",
    accent: '#10B981',
  },
  {
    title: '7/24 Destek',
    icon: Clock,
    desc: 'Kesintisiz hizmet ve anında müdahale garantisi. Acil durumlar dahil her koşulda yanınızdayız.',
    accent: '#8B5CF6',
  },
];

export function WhyUs() {
  return (
    <section className="relative w-full py-28 lg:py-36 bg-surface overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-transparent to-surface/50 pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-gold-400/[0.02] rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 relative z-10 flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
        {/* Left */}
        <div className="w-full lg:w-5/12 flex flex-col items-start lg:sticky lg:top-32">
          <div className="px-4 py-2 rounded-full mb-8 inline-flex items-center gap-3 glass-panel">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-400 pulse-gold" />
            <span className="text-[11px] font-medium tracking-[0.25em] text-white/80 uppercase">
              NEDEN BİZ?
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-[60px] font-serif font-semibold tracking-tight text-white mb-6 leading-[1.1]">
            Neden{' '}
            <span className="block gold-text">NEW GLOBAL GROUP?</span>
          </h2>

          <p className="text-lg text-white/50 font-light leading-relaxed mb-10">
            Standart hizmetlerin ötesine geçiyoruz. Proaktif yaklaşımımız, teknolojik altyapımız ve uzman kadromuz ile operasyonlarınıza değer katıyor, riskleri minimize ediyoruz.
          </p>

          {/* Separator line */}
          <div className="w-20 h-[2px] bg-gradient-to-r from-gold-400 to-transparent rounded-full" />
        </div>

        {/* Right: Grid */}
        <div className="w-full lg:w-7/12 grid grid-cols-1 md:grid-cols-2 gap-5">
          {reasons.map((reason, idx) => (
            <div
              key={idx}
              className="relative group glass-panel p-7 rounded-[24px] overflow-hidden hover:-translate-y-1.5 transition-all duration-400 hover:border-white/[0.12]"
            >
              {/* Accent glow */}
              <div
                className="absolute -top-8 -right-8 w-24 h-24 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl pointer-events-none"
                style={{ background: reason.accent }}
              />

              <div className="relative z-10">
                <div
                  className="w-12 h-12 rounded-[14px] bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-400"
                  style={{
                    borderColor: `${reason.accent}30`,
                  }}
                >
                  <reason.icon
                    className="w-6 h-6 transition-colors duration-400"
                    strokeWidth={1.5}
                    style={{ color: reason.accent }}
                  />
                </div>
                <h3 className="text-[18px] font-semibold text-white mb-2.5 tracking-tight">
                  {reason.title}
                </h3>
                <p className="text-white/45 font-light text-[14px] leading-relaxed group-hover:text-white/60 transition-colors">
                  {reason.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
