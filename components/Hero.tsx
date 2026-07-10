'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, Users, ShieldCheck, MapPin, ChevronDown } from 'lucide-react';
import { ParticleField } from './ParticleField';

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
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setMounted(true);

    // Cycle words
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
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;
    setMousePos({ x, y });
  };

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-[100svh] w-full flex items-center justify-center overflow-hidden bg-[#04090F] pt-28 pb-16"
    >
      {/* Three.js Neural Network + Grid */}
      <ParticleField className="absolute inset-0 z-0" />

      {/* Background image layer with strong parallax */}
      <div
        className="absolute inset-0 z-[1] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2940&auto=format&fit=crop')",
          transform: `translate(${mousePos.x * -10}px, ${mousePos.y * -7}px) scale(1.1)`,
          transition: 'transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)',
          opacity: 0.35,
        }}
      />

      {/* Dark gradients */}
      <div className="absolute inset-0 z-[2] bg-gradient-to-r from-[#04090F]/98 via-[#04090F]/75 to-[#04090F]/50 pointer-events-none" />
      <div className="absolute inset-0 z-[2] bg-gradient-to-t from-[#04090F] via-transparent to-[#04090F]/60 opacity-90 pointer-events-none" />

      {/* Animated gold light that responds to mouse */}
      <div
        className="absolute z-[3] pointer-events-none"
        style={{
          width: '80vw',
          height: '80vw',
          top: `calc(50% + ${mousePos.y * 60}px - 40vw)`,
          left: `calc(50% + ${mousePos.x * 60}px - 40vw)`,
          background:
            'radial-gradient(circle, rgba(212,175,55,0.07) 0%, rgba(212,175,55,0.02) 35%, transparent 65%)',
          transition: 'top 1s cubic-bezier(0.22,1,0.36,1), left 1s cubic-bezier(0.22,1,0.36,1)',
          filter: 'blur(40px)',
        }}
      />

      {/* Content */}
      <div className="relative z-[10] w-full max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-6">

        {/* LEFT TEXT */}
        <div className="flex flex-col items-start text-left w-full lg:w-[58%]">
          {/* Badge */}
          <div
            className="px-4 py-2 rounded-full mb-10 inline-flex items-center gap-3 glass-panel"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(24px)',
              transition: 'opacity 0.9s ease 0.1s, transform 0.9s cubic-bezier(0.22,1,0.36,1) 0.1s',
            }}
          >
            <span className="w-2 h-2 rounded-full bg-gold-400 pulse-gold" />
            <span className="text-[11px] font-semibold tracking-[0.3em] text-white/75 uppercase">
              NEW GLOBAL GROUP
            </span>
            <span className="hidden sm:flex items-center gap-1 text-[10px] text-gold-400/70 font-medium tracking-widest">
              <span>—</span> EST. 2004
            </span>
          </div>

          {/* Headline */}
          <h1
            className="font-serif font-semibold text-white leading-[1.04] tracking-tight mb-6"
            style={{
              fontSize: 'clamp(2.8rem, 7vw, 90px)',
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(40px)',
              transition: 'opacity 1s ease 0.25s, transform 1s cubic-bezier(0.22,1,0.36,1) 0.25s',
            }}
          >
            <span className="block">Kurumsal</span>
            {/* Animated cycling word */}
            <span className="block relative overflow-hidden">
              <span
                className="inline-block gold-text"
                style={{
                  opacity: wordVisible ? 1 : 0,
                  transform: wordVisible ? 'translateY(0)' : 'translateY(-20px)',
                  transition: 'opacity 0.4s ease, transform 0.4s cubic-bezier(0.22,1,0.36,1)',
                }}
              >
                {words[wordIdx]}
              </span>
            </span>
            <span className="block">Çözüm Ortağı</span>
          </h1>

          {/* Subtext */}
          <p
            className="text-lg md:text-xl text-white/45 max-w-lg mb-12 font-light leading-relaxed"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(24px)',
              transition: 'opacity 0.9s ease 0.45s, transform 0.9s cubic-bezier(0.22,1,0.36,1) 0.45s',
            }}
          >
            Güvenlik, tesis yönetimi ve profesyonel temizlik hizmetlerini tek çatı altında buluşturan, teknoloji odaklı operasyon yönetimi.
          </p>

          {/* Buttons */}
          <div
            className="flex flex-col sm:flex-row gap-4"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(24px)',
              transition: 'opacity 0.9s ease 0.6s, transform 0.9s cubic-bezier(0.22,1,0.36,1) 0.6s',
            }}
          >
            <Link
              href="/iletisim"
              className="group relative overflow-hidden flex items-center justify-center gap-3 px-8 h-[56px] rounded-full font-semibold text-[15px] text-black"
              style={{ background: 'linear-gradient(135deg, #D4AF37, #F5D78B, #A07830)' }}
            >
              {/* Shimmer sweep */}
              <span
                className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 pointer-events-none"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)',
                }}
              />
              <span className="relative z-10">Teklif Al</span>
              <ArrowRight
                size={17}
                className="relative z-10 transition-transform duration-300 group-hover:translate-x-1.5"
              />
            </Link>

            <Link
              href="/hizmetler"
              className="group flex items-center justify-center gap-3 px-8 h-[56px] glass-panel rounded-full font-medium text-white text-[15px] hover:bg-white/[0.08] hover:border-white/20 transition-all duration-300"
            >
              Hizmetleri Keşfet
              <ArrowRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-1 text-gold-400"
              />
            </Link>
          </div>

          {/* Trust bar */}
          <div
            className="flex items-center gap-6 mt-12 pt-8 border-t border-white/[0.05]"
            style={{
              opacity: mounted ? 0.7 : 0,
              transition: 'opacity 1.2s ease 0.9s',
            }}
          >
            {['ISO 9001', '7/24 Hizmet', 'Türkiye Geneli'].map((tag, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-gold-400" />
                <span className="text-[12px] text-white/40 font-medium tracking-wider uppercase">{tag}</span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT STAT CARDS */}
        <div className="flex w-full lg:w-[38%] flex-col items-start lg:items-end gap-4">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="glass-panel p-5 pr-10 rounded-[22px] flex items-center gap-5 w-full sm:w-[300px] hover:bg-white/[0.05] hover:border-white/[0.12] transition-all duration-500 group"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted
                  ? `translate(${mousePos.x * (7 + idx * 3)}px, ${mousePos.y * (5 + idx * 2) + (idx - 1) * -18}px)`
                  : 'translateX(50px)',
                transition: `opacity 1s ease ${0.65 + idx * 0.12}s, transform 0.6s cubic-bezier(0.22,1,0.36,1)`,
              }}
            >
              <div className="w-11 h-11 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center shrink-0 group-hover:border-gold-400/40 group-hover:scale-110 transition-all duration-500">
                <stat.icon className="w-5 h-5 text-white/50 group-hover:text-gold-400 transition-colors" strokeWidth={1.5} />
              </div>
              <div>
                <span className="text-[22px] font-bold text-white tracking-tight block leading-none">
                  {stat.value}
                </span>
                <span className="text-[11px] text-white/40 uppercase tracking-[0.2em] font-medium">
                  {stat.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10 pointer-events-none"
        style={{ opacity: mounted ? 0.4 : 0, transition: 'opacity 1.5s ease 1.2s' }}
      >
        <span className="text-[10px] tracking-[0.35em] text-white/40 uppercase font-medium">Keşfet</span>
        <ChevronDown
          className="text-gold-400"
          size={18}
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
