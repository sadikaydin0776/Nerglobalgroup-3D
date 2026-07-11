'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Search, FileText, Cog, HeadphonesIcon, ArrowRight } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: Search,
    title: 'İhtiyaç Analizi',
    desc: 'İşletmenizin mevcut durumunu ve ihtiyaçlarını yerinde inceliyor, operasyonel süreçlerinizi detaylı analiz ediyoruz.',
    color: '#D4AF37',
  },
  {
    number: '02',
    icon: FileText,
    title: 'Özel Teklif',
    desc: 'Analizimiz doğrultusunda işletmenize özel, şeffaf fiyatlı ve kapsamlı bir hizmet teklifi hazırlıyoruz.',
    color: '#3B82F6',
  },
  {
    number: '03',
    icon: Cog,
    title: 'Uygulama',
    desc: 'Uzman ekibimizle sözleşme sürecini tamamlayarak hizmeti eksiksiz ve zamanında hayata geçiriyoruz.',
    color: '#10B981',
  },
  {
    number: '04',
    icon: HeadphonesIcon,
    title: 'Sürekli Destek',
    desc: '7/24 destek hattımız ve düzenli raporlamalarla hizmet kalitesini sürekli denetliyor, geliştiriyoruz.',
    color: '#8B5CF6',
  },
];

export function Process() {
  const [visibleSteps, setVisibleSteps] = useState<boolean[]>(Array(steps.length).fill(false));
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  const lineRef = useRef<HTMLDivElement>(null);
  const [lineWidth, setLineWidth] = useState(0);

  useEffect(() => {
    const observers = refs.current.map((el, idx) => {
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setVisibleSteps((prev) => {
                const next = [...prev];
                next[idx] = true;
                return next;
              });
              setLineWidth(((idx + 1) / steps.length) * 100);
            }, idx * 120);
          }
        },
        { threshold: 0.3 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  return (
    <section className="relative w-full py-24 lg:py-32 overflow-hidden" style={{ background: '#07111F' }}>
      {/* Subtle bg */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(212,175,55,0.04) 0%, transparent 60%)' }}
      />

      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-16 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 lg:mb-20">
          <div className="px-3 py-1.5 rounded-full mb-6 inline-flex items-center gap-2.5 glass-panel">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-400 pulse-gold" />
            <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.25em] text-white/75 uppercase">
              NASIL ÇALIŞIYORUZ?
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[58px] font-serif font-semibold text-white tracking-tight leading-[1.08] mb-5">
            Basit, Şeffaf ve{' '}
            <span className="gold-text">Sonuç Odaklı</span>
          </h2>
          <p className="text-base sm:text-lg text-white/40 font-light max-w-xl mx-auto leading-relaxed">
            İlk görüşmeden uzun vadeli desteğe kadar 4 adımda profesyonel hizmet.
          </p>
        </div>

        {/* Desktop: horizontal steps with connecting line */}
        <div className="hidden lg:block">
          {/* Progress line */}
          <div className="relative mb-12 mx-8">
            <div className="h-[2px] bg-white/[0.06] rounded-full w-full" />
            <div
              ref={lineRef}
              className="absolute top-0 left-0 h-[2px] rounded-full transition-all duration-1000 ease-out"
              style={{
                width: `${lineWidth}%`,
                background: 'linear-gradient(90deg, #D4AF37, #3B82F6, #10B981, #8B5CF6)',
              }}
            />
            {/* Step dots on line */}
            <div className="absolute top-0 left-0 w-full flex justify-between" style={{ transform: 'translateY(-50%)' }}>
              {steps.map((step, idx) => (
                <div
                  key={idx}
                  className="w-4 h-4 rounded-full border-2 transition-all duration-500"
                  style={{
                    background: visibleSteps[idx] ? step.color : '#07111F',
                    borderColor: visibleSteps[idx] ? step.color : 'rgba(255,255,255,0.15)',
                    boxShadow: visibleSteps[idx] ? `0 0 12px ${step.color}60` : 'none',
                    transform: visibleSteps[idx] ? 'scale(1.3)' : 'scale(1)',
                  }}
                />
              ))}
            </div>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-4 gap-6">
            {steps.map((step, idx) => (
              <div
                key={idx}
                ref={(el) => { refs.current[idx] = el; }}
                className="glass-panel rounded-[24px] p-7 flex flex-col gap-5 transition-all duration-500"
                style={{
                  opacity: visibleSteps[idx] ? 1 : 0,
                  transform: visibleSteps[idx] ? 'translateY(0)' : 'translateY(32px)',
                  borderColor: visibleSteps[idx] ? `${step.color}25` : undefined,
                }}
              >
                <div className="flex items-center justify-between">
                  <div
                    className="w-12 h-12 rounded-[14px] flex items-center justify-center"
                    style={{ background: `${step.color}15`, border: `1px solid ${step.color}25` }}
                  >
                    <step.icon className="w-5 h-5" style={{ color: step.color }} strokeWidth={1.5} />
                  </div>
                  <span className="text-[28px] font-bold" style={{ color: `${step.color}25`, fontVariantNumeric: 'tabular-nums' }}>
                    {step.number}
                  </span>
                </div>
                <div>
                  <h3 className="text-[17px] font-semibold text-white mb-2.5">{step.title}</h3>
                  <p className="text-white/40 text-[14px] font-light leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: vertical stack */}
        <div className="lg:hidden flex flex-col gap-4">
          {steps.map((step, idx) => (
            <div
              key={idx}
              ref={(el) => { refs.current[idx] = el; }}
              className="glass-panel rounded-[20px] p-5 flex items-start gap-4 transition-all duration-500"
              style={{
                opacity: visibleSteps[idx] ? 1 : 0,
                transform: visibleSteps[idx] ? 'translateX(0)' : 'translateX(-24px)',
                borderLeft: visibleSteps[idx] ? `2px solid ${step.color}60` : '2px solid rgba(255,255,255,0.06)',
              }}
            >
              <div
                className="w-10 h-10 rounded-[12px] flex items-center justify-center shrink-0"
                style={{ background: `${step.color}15`, border: `1px solid ${step.color}25` }}
              >
                <step.icon className="w-4.5 h-4.5" style={{ color: step.color }} strokeWidth={1.5} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[10px] font-bold tracking-widest" style={{ color: `${step.color}70` }}>{step.number}</span>
                  <h3 className="text-[15px] font-semibold text-white">{step.title}</h3>
                </div>
                <p className="text-white/40 text-[13px] font-light leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-14">
          <Link
            href="/iletisim"
            className="group inline-flex items-center gap-2.5 px-7 h-[50px] rounded-full font-semibold text-[14px] text-black transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:scale-[1.02]"
            style={{ background: 'linear-gradient(135deg, #D4AF37, #F5D78B, #A07830)' }}
          >
            Hemen Başlayalım
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
