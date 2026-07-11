'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, Users, ShieldCheck, MapPin, ChevronDown } from 'lucide-react';

const stats = [
  { value: '500+', label: 'Uzman Personel', icon: Users },
  { value: '7/24', label: 'Operasyon', icon: ShieldCheck },
  { value: 'TR', label: 'Geneli Hizmet', icon: MapPin },
];

const words = ['Güvenlik', 'Operasyon', 'Güven'];

export function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);
  const [wordIdx, setWordIdx] = useState(0);
  const [wordVisible, setWordVisible] = useState(true);
  const [isDesktop, setIsDesktop] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  // Lazy import Three.js only on desktop
  const [ParticleField, setParticleField] = useState<React.ComponentType<{ className: string }> | null>(null);

  useEffect(() => {
    setMounted(true);
    const desktop = window.matchMedia('(min-width: 1024px) and (pointer: fine)').matches;
    setIsDesktop(desktop);

    if (desktop) {
      import('./ParticleField').then((mod) => setParticleField(() => mod.ParticleField));
    }

    const cycle = setInterval(() => {
      setWordVisible(false);
      setTimeout(() => {
        setWordIdx((i) => (i + 1) % words.length);
        setWordVisible(true);
      }, 400);
    }, 2600);

    return () => clearInterval(cycle);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDesktop) return;
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;
    setMousePos({ x, y });
  };

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      className="relative w-full flex items-center justify-center overflow-hidden bg-[#04090F] pt-24 pb-16"
      style={{ minHeight: '100svh' }}
    >
      {/* Three.js — desktop only */}
      {isDesktop && ParticleField && (
        <ParticleField className="absolute inset-0 z-0" />
      )}

      {/* BG video (muted, autoplay, loop) */}
      {/* Fallback BG for all devices */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1920&auto=format&fit=crop')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.3,
        }}
      />
      {/* Video — desktop only, loads lazily */}
      {isDesktop && (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          className="absolute inset-0 z-[2] w-full h-full object-cover"
          style={{ opacity: 0.22 }}
          poster="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-skyscrapers-and-a-highway-at-sunset-34562-large.mp4" type="video/mp4" />
        </video>
      )}

      {/* Gradients */}
      <div className="absolute inset-0 z-[2] pointer-events-none"
        style={{ background: 'linear-gradient(to right, rgba(4,9,15,0.97) 0%, rgba(4,9,15,0.8) 60%, rgba(4,9,15,0.6) 100%)' }}
      />
      <div className="absolute inset-0 z-[2] pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(4,9,15,1) 0%, transparent 50%)' }}
      />

      {/* Desktop-only gold ambient */}
      {isDesktop && (
        <div
          className="absolute z-[3] pointer-events-none"
          style={{
            width: '600px', height: '600px',
            top: `calc(50% + ${mousePos.y * 50}px - 300px)`,
            left: `calc(50% + ${mousePos.x * 50}px - 300px)`,
            background: 'radial-gradient(circle, rgba(212,175,55,0.07) 0%, transparent 65%)',
            transition: 'top 1s ease, left 1s ease',
            filter: 'blur(40px)',
          }}
        />
      )}

      {/* Content */}
      <div className="relative z-[10] w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-16 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 lg:gap-6">

        {/* LEFT */}
        <div
          className="flex flex-col items-start text-left w-full lg:w-[58%]"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.9s ease 0.1s, transform 0.9s ease 0.1s',
          }}
        >
          {/* Badge */}
          <div className="px-3 py-1.5 rounded-full mb-6 inline-flex items-center gap-2.5 glass-panel">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-400 pulse-gold shrink-0" />
            <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.25em] text-white/75 uppercase">
              NEW GLOBAL GROUP
            </span>
          </div>

          {/* Headline */}
          <h1
            className="font-serif font-semibold text-white tracking-tight mb-5 leading-[1.08]"
            style={{ fontSize: 'clamp(2.1rem, 7.5vw, 88px)' }}
          >
            <span className="block">
              Kurumsal{' '}
              <span
                className="gold-text"
                style={{
                  opacity: wordVisible ? 1 : 0,
                  transition: 'opacity 0.35s ease',
                  display: 'inline-block',
                }}
              >
                {words[wordIdx]}
              </span>
            </span>
            <span className="block">Çözüm Ortağı</span>
          </h1>

          {/* Subtext */}
          <p className="text-base sm:text-lg text-white/50 max-w-lg mb-8 font-light leading-relaxed">
            Güvenlik, tesis yönetimi ve profesyonel temizlik hizmetlerini tek çatı altında buluşturan, teknoloji odaklı operasyon yönetimi.
          </p>

          {/* Buttons */}
          <div className="flex flex-row gap-3 w-full sm:w-auto">
            <Link
              href="/iletisim"
              className="group relative overflow-hidden flex items-center justify-center gap-2 px-6 sm:px-8 h-[50px] sm:h-[56px] rounded-full font-semibold text-[14px] sm:text-[15px] text-black flex-1 sm:flex-none"
              style={{ background: 'linear-gradient(135deg, #D4AF37, #F5D78B, #A07830)' }}
            >
              <span className="relative z-10">Teklif Al</span>
              <ArrowRight size={16} className="relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              href="/hizmetler"
              className="group flex items-center justify-center gap-2 px-5 sm:px-8 h-[50px] sm:h-[56px] glass-panel rounded-full font-medium text-white text-[14px] sm:text-[15px] hover:bg-white/[0.08] transition-all duration-300 flex-1 sm:flex-none"
            >
              Hizmetler
              <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1 text-gold-400" />
            </Link>
          </div>

          {/* Trust bar */}
          <div className="flex items-center gap-4 sm:gap-6 mt-8 pt-6 border-t border-white/[0.05]">
            {['ISO 9001', '7/24', 'TR Geneli'].map((tag, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-gold-400 shrink-0" />
                <span className="text-[10px] sm:text-[11px] text-white/35 font-medium tracking-wider uppercase">{tag}</span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — Mobile: 3 compact cards in a row */}
        <div className="w-full lg:w-[38%]">
          {/* Mobile */}
          <div className="flex lg:hidden flex-row gap-2 w-full mt-2">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="glass-panel p-3 rounded-2xl flex flex-col items-center justify-center gap-1 flex-1 text-center"
                style={{
                  opacity: mounted ? 1 : 0,
                  transition: `opacity 0.8s ease ${0.6 + idx * 0.1}s`,
                }}
              >
                <stat.icon className="w-4 h-4 text-gold-400/70 shrink-0" strokeWidth={1.5} />
                <span className="text-[15px] font-bold text-white leading-none">{stat.value}</span>
                <span className="text-[8px] text-white/35 uppercase tracking-wide font-medium leading-tight">{stat.label}</span>
              </div>
            ))}
          </div>

          {/* Desktop */}
          <div className="hidden lg:flex flex-col items-end gap-4">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="glass-panel p-5 pr-10 rounded-[22px] flex items-center gap-5 w-[300px] hover:bg-white/[0.05] transition-all duration-500 group"
                style={{
                  opacity: mounted ? 1 : 0,
                  transform: mounted
                    ? `translate(${mousePos.x * (7 + idx * 3)}px, ${mousePos.y * (5 + idx * 2) + (idx - 1) * -18}px)`
                    : 'translateX(50px)',
                  transition: `opacity 1s ease ${0.65 + idx * 0.12}s, transform 0.6s ease`,
                }}
              >
                <div className="w-11 h-11 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center shrink-0 group-hover:border-gold-400/40 transition-all duration-500">
                  <stat.icon className="w-5 h-5 text-white/50 group-hover:text-gold-400 transition-colors" strokeWidth={1.5} />
                </div>
                <div>
                  <span className="text-[22px] font-bold text-white tracking-tight block leading-none">{stat.value}</span>
                  <span className="text-[11px] text-white/40 uppercase tracking-[0.2em] font-medium">{stat.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="hidden sm:flex absolute bottom-6 left-1/2 -translate-x-1/2 flex-col items-center gap-2 z-10 pointer-events-none"
        style={{ opacity: mounted ? 0.4 : 0, transition: 'opacity 1.5s ease 1.2s' }}
      >
        <span className="text-[9px] tracking-[0.35em] text-white/40 uppercase font-medium">Keşfet</span>
        <ChevronDown className="text-gold-400" size={16}
          style={{ animation: 'bounceDown 2s ease-in-out infinite' }}
        />
      </div>

      <style jsx>{`
        @keyframes bounceDown {
          0%, 100% { transform: translateY(0); opacity: 0.6; }
          50% { transform: translateY(6px); opacity: 1; }
        }
      `}</style>
    </section>
  );
}
