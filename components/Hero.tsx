'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, Users, ShieldCheck, MapPin } from 'lucide-react';
import { ParticleField } from './ParticleField';

const stats = [
  { value: '500+', label: 'Uzman Personel', icon: Users },
  { value: '7/24', label: 'Operasyon', icon: ShieldCheck },
  { value: 'Türkiye', label: 'Geneli Hizmet', icon: MapPin },
];

export function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;
    setMousePos({ x, y });
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-[100svh] w-full flex items-center justify-center overflow-hidden bg-primary pt-32 pb-24"
    >
      {/* Three.js Particle Background */}
      <ParticleField className="absolute inset-0 z-0 opacity-80" />

      {/* Background image with parallax */}
      <div
        className="absolute inset-0 z-[1] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2940&auto=format&fit=crop')",
          transform: `translate(${mousePos.x * -8}px, ${mousePos.y * -8}px) scale(1.08)`,
          transition: 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      />

      {/* Gradient overlays */}
      <div className="absolute inset-0 z-[2] bg-gradient-to-r from-primary/95 via-primary/75 to-primary/50 pointer-events-none" />
      <div className="absolute inset-0 z-[2] bg-gradient-to-t from-primary via-transparent to-transparent opacity-90 pointer-events-none" />

      {/* Gold light ray */}
      <div
        className="absolute -top-[20%] -right-[10%] w-[700px] h-[700px] pointer-events-none z-[3]"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(212,175,55,0.08) 0%, transparent 70%)',
          transform: `translate(${mousePos.x * 20}px, ${mousePos.y * 15}px) rotate(-12deg)`,
          transition: 'transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)',
          filter: 'blur(60px)',
        }}
      />

      {/* Main Content */}
      <div
        className="relative z-[10] w-full max-w-[1440px] mx-auto px-6 md:px-10 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8"
        style={{
          transform: `translate(${mousePos.x * -3}px, ${mousePos.y * -2}px)`,
          transition: 'transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        {/* Left: Text */}
        <div
          className="flex flex-col items-start text-left w-full lg:w-3/5"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(40px)',
            transition: 'opacity 1s ease, transform 1s ease',
          }}
        >
          {/* Badge */}
          <div className="px-4 py-2 rounded-full mb-10 flex items-center gap-3 glass-panel">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-400 pulse-gold" />
            <span className="text-[11px] font-medium tracking-[0.25em] text-white/80 uppercase">
              NEW GLOBAL GROUP
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-[clamp(2.8rem,7vw,88px)] font-serif font-semibold tracking-tight text-white mb-6 leading-[1.05]">
            Güveni İnşa{' '}
            <span className="block">Eden Kurumsal</span>
            <span className="block gold-text">Çözüm Ortağı</span>
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-white/55 max-w-lg mb-10 font-light leading-relaxed">
            Güvenlik, tesis yönetimi ve profesyonel temizlik hizmetlerini tek çatı altında buluşturan, teknoloji odaklı operasyon yönetimi.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link
              href="/iletisim"
              className="group flex items-center justify-center gap-3 px-8 h-[56px] bg-gold-400 text-black rounded-full font-semibold hover:bg-gold-300 hover:shadow-[0_0_40px_rgba(212,175,55,0.45)] transition-all duration-300 hover:scale-[1.02]"
            >
              <span className="text-[15px]">Teklif Al</span>
              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
            <Link
              href="/hakkimizda"
              className="flex items-center justify-center px-8 h-[56px] glass-panel text-white rounded-full font-medium hover:bg-white/[0.08] transition-all duration-300 hover:scale-[1.02] text-[15px]"
            >
              Daha Fazla Keşfet
            </Link>
          </div>
        </div>

        {/* Right: Floating Stat Cards */}
        <div className="flex w-full lg:w-2/5 flex-col items-start sm:items-center lg:items-end gap-4 lg:gap-5">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="glass-panel p-5 pr-12 rounded-[24px] flex items-center gap-5 w-full sm:w-auto lg:w-[320px] hover:bg-white/[0.04] transition-all duration-500 group"
              style={{
                transform: mounted
                  ? `translate(${mousePos.x * (8 + idx * 4)}px, ${mousePos.y * (6 + idx * 3) + (idx === 0 ? -16 : idx === 2 ? 16 : 0)}px)`
                  : 'translateX(50px)',
                opacity: mounted ? 1 : 0,
                transition: `transform 0.6s cubic-bezier(0.22, 1, 0.36, 1), opacity 1s ease ${0.6 + idx * 0.12}s, background 0.3s ease`,
              }}
            >
              <div className="w-12 h-12 rounded-full bg-white/[0.05] border border-white/[0.1] flex items-center justify-center shrink-0 group-hover:border-gold-400/40 group-hover:scale-110 transition-all duration-500">
                <stat.icon
                  className="w-5 h-5 text-white/60 group-hover:text-gold-400 transition-colors"
                  strokeWidth={1.5}
                />
              </div>
              <div>
                <span className="text-2xl font-bold text-white tracking-tight block">
                  {stat.value}
                </span>
                <span className="text-[12px] text-white/45 uppercase tracking-widest font-medium">
                  {stat.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hidden lg:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-3 z-10 pointer-events-none">
        <div className="w-[1px] h-14 bg-white/10 relative overflow-hidden rounded-full">
          <div
            className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-gold-400 to-transparent"
            style={{
              animation: 'scrollLine 1.8s linear infinite',
            }}
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes scrollLine {
          from { transform: translateY(-100%); }
          to { transform: translateY(200%); }
        }
      `}</style>
    </section>
  );
}
