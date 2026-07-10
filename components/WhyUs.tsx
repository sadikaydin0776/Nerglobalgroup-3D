'use client';

import { useEffect, useRef, useState } from 'react';
import { ShieldCheck, Cpu, MapPin, Clock, ChevronRight } from 'lucide-react';

const reasons = [
  {
    number: '01',
    title: 'Deneyimli Kadro',
    icon: ShieldCheck,
    desc: 'Sektörün en yetkin profesyonelleri ile çalışıyoruz. 20 yılı aşkın deneyimimiz ile en zorlu operasyonları başarıyla yönetiyoruz.',
    color: '#3B82F6',
  },
  {
    number: '02',
    title: 'Teknoloji Destekli',
    icon: Cpu,
    desc: 'Yapay zeka ve dijital altyapı ile entegre yönetim sistemleri kurarak operasyonel verimliliğinizi maksimize ediyoruz.',
    color: '#D4AF37',
  },
  {
    number: '03',
    title: 'Türkiye Geneli',
    icon: MapPin,
    desc: "Ülkenin dört bir yanında eşzamanlı operasyon gücü ile İstanbul'dan Ankara'ya, İzmir'den Bursa'ya kesintisiz hizmet veriyoruz.",
    color: '#10B981',
  },
  {
    number: '04',
    title: '7/24 Destek',
    icon: Clock,
    desc: 'Kesintisiz hizmet ve anında müdahale garantisi. Acil durumlar dahil her koşulda yanınızdayız.',
    color: '#8B5CF6',
  },
];

export function WhyUs() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [visibleItems, setVisibleItems] = useState<boolean[]>(Array(reasons.length).fill(false));
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers = itemRefs.current.map((el, idx) => {
      if (!el) return null;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleItems((prev) => {
              const next = [...prev];
              next[idx] = true;
              return next;
            });
          }
        },
        { threshold: 0.2 }
      );
      observer.observe(el);
      return observer;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  return (
    <section className="relative w-full py-28 lg:py-36 bg-[#07111F] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#04090F]/60 via-transparent to-[#04090F]/60 pointer-events-none" />
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none opacity-15"
        style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.15), transparent 70%)' }}
      />

      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-28 items-start">

          {/* LEFT: sticky heading */}
          <div className="w-full lg:w-[38%] lg:sticky lg:top-32">
            <div className="px-4 py-2 rounded-full mb-8 inline-flex items-center gap-3 glass-panel">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-400 pulse-gold" />
              <span className="text-[11px] font-semibold tracking-[0.3em] text-white/75 uppercase">
                NEDEN BİZ?
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-[58px] font-serif font-semibold tracking-tight text-white mb-6 leading-[1.1]">
              Neden{' '}
              <span className="gold-text block">NEW GLOBAL GROUP?</span>
            </h2>

            <p className="text-base text-white/40 font-light leading-relaxed mb-10">
              Standart hizmetlerin ötesine geçiyoruz. Proaktif yaklaşımımız ve uzman kadromuz ile operasyonlarınıza değer katıyoruz.
            </p>

            {/* Active indicator */}
            <div className="hidden lg:flex flex-col gap-2">
              {reasons.map((r, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIdx(i)}
                  className="flex items-center gap-3 text-left transition-all duration-300 group"
                >
                  <span
                    className="block h-[2px] rounded-full transition-all duration-400"
                    style={{
                      width: activeIdx === i ? '28px' : '12px',
                      background: activeIdx === i ? r.color : 'rgba(255,255,255,0.15)',
                    }}
                  />
                  <span
                    className="text-[12px] font-semibold uppercase tracking-widest transition-colors duration-300"
                    style={{ color: activeIdx === i ? r.color : 'rgba(255,255,255,0.3)' }}
                  >
                    {r.title}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT: cards stack */}
          <div className="w-full lg:w-[62%] flex flex-col gap-4">
            {reasons.map((reason, idx) => (
              <div
                key={idx}
                ref={(el) => { itemRefs.current[idx] = el; }}
                className="group glass-panel rounded-[24px] overflow-hidden transition-all duration-400"
                style={{
                  opacity: visibleItems[idx] ? 1 : 0,
                  transform: visibleItems[idx] ? 'translateX(0)' : 'translateX(40px)',
                  transition: `opacity 0.7s ease ${idx * 0.1}s, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${idx * 0.1}s, border-color 0.3s ease, box-shadow 0.3s ease`,
                  borderColor: activeIdx === idx ? `${reason.color}30` : 'rgba(255,255,255,0.065)',
                  boxShadow: activeIdx === idx ? `0 8px 40px ${reason.color}10` : 'none',
                }}
                onMouseEnter={() => setActiveIdx(idx)}
              >
                <div className="p-7 flex items-start gap-6">
                  {/* Number */}
                  <span
                    className="text-[13px] font-bold tracking-widest shrink-0 mt-0.5 font-mono"
                    style={{ color: `${reason.color}60` }}
                  >
                    {reason.number}
                  </span>

                  {/* Icon */}
                  <div
                    className="w-11 h-11 rounded-[12px] flex items-center justify-center shrink-0 border transition-all duration-400 group-hover:scale-110"
                    style={{
                      background: `${reason.color}10`,
                      borderColor: `${reason.color}20`,
                    }}
                  >
                    <reason.icon
                      className="w-5 h-5"
                      style={{ color: reason.color }}
                      strokeWidth={1.5}
                    />
                  </div>

                  {/* Text */}
                  <div className="flex-1">
                    <h3 className="text-[17px] font-semibold text-white mb-2 tracking-tight">
                      {reason.title}
                    </h3>
                    <p className="text-white/40 font-light text-[14px] leading-relaxed group-hover:text-white/60 transition-colors">
                      {reason.desc}
                    </p>
                  </div>

                  {/* Arrow */}
                  <ChevronRight
                    className="w-4 h-4 shrink-0 mt-1 transition-all duration-300 group-hover:translate-x-1"
                    style={{ color: `${reason.color}50` }}
                  />
                </div>

                {/* Bottom accent bar */}
                <div
                  className="h-[2px] w-0 group-hover:w-full transition-all duration-500 rounded-full"
                  style={{ background: `linear-gradient(90deg, ${reason.color}, transparent)` }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
