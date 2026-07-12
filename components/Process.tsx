'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Search, FileText, Cog, HeadphonesIcon, ArrowRight, CheckCircle2 } from 'lucide-react';

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
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const [lineWidth, setLineWidth] = useState(0);
  const [activated, setActivated] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !activated) {
          setActivated(true);
          // Animate line across 4 steps
          let w = 0;
          const timer = setInterval(() => {
            w += 2;
            setLineWidth(Math.min(w, 100));
            if (w >= 100) clearInterval(timer);
          }, 20);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [activated]);

  return (
    <section ref={sectionRef} className="relative w-full py-24 lg:py-32 overflow-hidden" style={{ background: '#07111F' }}>
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

        {/* Desktop layout */}
        <div className="hidden lg:block">
          {/* Connecting line with dots */}
          <div className="relative mb-10 mx-4">
            <div className="h-[1px] bg-white/[0.08] rounded-full w-full" />
            <div
              ref={lineRef}
              className="absolute top-0 left-0 h-[1px] rounded-full transition-none"
              style={{
                width: `${lineWidth}%`,
                background: 'linear-gradient(90deg, #D4AF37, #3B82F6, #10B981, #8B5CF6)',
                boxShadow: '0 0 8px rgba(212,175,55,0.5)',
              }}
            />
            {/* Dots on line */}
            <div className="absolute top-0 left-0 w-full flex justify-between" style={{ transform: 'translateY(-50%)' }}>
              {steps.map((step, idx) => (
                <div
                  key={idx}
                  className="w-3 h-3 rounded-full border-2 transition-all duration-500"
                  style={{
                    background: lineWidth >= (idx + 1) * 25 ? step.color : '#07111F',
                    borderColor: lineWidth >= (idx + 1) * 25 ? step.color : 'rgba(255,255,255,0.15)',
                    boxShadow: lineWidth >= (idx + 1) * 25 ? `0 0 10px ${step.color}80` : 'none',
                    transform: lineWidth >= (idx + 1) * 25 ? 'scale(1.3)' : 'scale(1)',
                  }}
                />
              ))}
            </div>
          </div>

          {/* Cards — always visible, animate in with CSS */}
          <div className="grid grid-cols-4 gap-5">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="glass-panel rounded-[24px] p-7 flex flex-col gap-5"
                style={{
                  borderColor: `${step.color}20`,
                  opacity: activated ? 1 : 0,
                  transform: activated ? 'translateY(0)' : 'translateY(28px)',
                  transition: `opacity 0.6s ease ${idx * 0.12}s, transform 0.6s cubic-bezier(0.22,1,0.36,1) ${idx * 0.12}s`,
                }}
              >
                <div className="flex items-center justify-between">
                  <div
                    className="w-12 h-12 rounded-[14px] flex items-center justify-center"
                    style={{ background: `${step.color}15`, border: `1px solid ${step.color}30` }}
                  >
                    <step.icon className="w-5 h-5" style={{ color: step.color }} strokeWidth={1.5} />
                  </div>
                  <span className="text-[28px] font-bold" style={{ color: `${step.color}20` }}>
                    {step.number}
                  </span>
                </div>
                <div>
                  <h3 className="text-[16px] font-semibold text-white mb-2">{step.title}</h3>
                  <p className="text-white/40 text-[13px] font-light leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile layout — always visible */}
        <div className="lg:hidden flex flex-col gap-3">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="glass-panel rounded-[18px] p-5 flex items-start gap-4"
              style={{
                borderLeft: `2px solid ${step.color}50`,
                opacity: activated ? 1 : 0,
                transform: activated ? 'translateX(0)' : 'translateX(-20px)',
                transition: `opacity 0.5s ease ${idx * 0.1}s, transform 0.5s cubic-bezier(0.22,1,0.36,1) ${idx * 0.1}s`,
              }}
            >
              <div
                className="w-10 h-10 rounded-[12px] flex items-center justify-center shrink-0"
                style={{ background: `${step.color}15`, border: `1px solid ${step.color}25` }}
              >
                <step.icon className="w-4 h-4" style={{ color: step.color }} strokeWidth={1.5} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold tracking-widest" style={{ color: `${step.color}60` }}>{step.number}</span>
                  <h3 className="text-[15px] font-semibold text-white">{step.title}</h3>
                </div>
                <p className="text-white/40 text-[13px] font-light leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link
            href="/iletisim"
            className="group inline-flex items-center gap-2.5 px-7 h-[50px] rounded-full font-semibold text-[14px] text-black transition-all duration-300 hover:scale-[1.02]"
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
