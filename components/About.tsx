'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Target, Shield, Recycle, Cpu, Award, TrendingUp } from 'lucide-react';

const timeline = [
  {
    icon: Target,
    title: 'Vizyon',
    desc: 'Sektörde öncü ve yenilikçi yaklaşım ile kurumsal mükemmelliği hedefliyoruz.',
    color: '#D4AF37',
  },
  {
    icon: Shield,
    title: 'Güven',
    desc: 'Şeffaf ve hesap verilebilir operasyonlarla güveni tesis ediyoruz.',
    color: '#3B82F6',
  },
  {
    icon: Recycle,
    title: 'Sürdürülebilir Hizmet',
    desc: 'Uzun vadeli ve değer katan çözümlerle sürdürülebilir büyüme sağlıyoruz.',
    color: '#10B981',
  },
  {
    icon: Cpu,
    title: 'Teknoloji',
    desc: 'Verimliliği artıran dijital altyapı ile geleceğe hazır sistemler kuruyoruz.',
    color: '#8B5CF6',
  },
];

function CountUp({ to, suffix = '' }: { to: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasRun = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasRun.current) {
          hasRun.current = true;
          const start = performance.now();
          const duration = 1600;
          const step = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const ease = 1 - Math.pow(2, -10 * progress);
            setCount(Math.floor(ease * to));
            if (progress < 1) requestAnimationFrame(step);
            else setCount(to);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [to]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export function About() {
  const lineRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const dotRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const initGSAP = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        if (!lineRef.current || !sectionRef.current) return;

        // Glowing line grows down
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0, transformOrigin: 'top' },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 65%',
              end: 'bottom 40%',
              scrub: 1.2,
            },
          }
        );

        // Each row slides in + dot activates
        rowRefs.current.forEach((row, idx) => {
          if (!row) return;
          const dot = dotRefs.current[idx];

          gsap.fromTo(
            row,
            { opacity: 0, x: -30 },
            {
              opacity: 1,
              x: 0,
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: row,
                start: 'top 80%',
                toggleActions: 'play none none none',
              },
            }
          );

          if (dot) {
            ScrollTrigger.create({
              trigger: row,
              start: 'top 72%',
              onEnter: () => {
                gsap.to(dot, {
                  scale: 1.4,
                  duration: 0.3,
                  ease: 'back.out(2)',
                  yoyo: true,
                  repeat: 1,
                });
                dot.style.background = '#D4AF37';
                dot.style.boxShadow = '0 0 0 4px rgba(212,175,55,0.25), 0 0 16px rgba(212,175,55,0.5)';
              },
            });
          }
        });
      }, sectionRef);

      return () => ctx.revert();
    };

    initGSAP();
  }, []);

  return (
    <section id="hakkimizda" className="relative w-full py-28 lg:py-36 bg-[#04090F] overflow-hidden">
      {/* Subtle noise + gradient bg */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#04090F] via-[#07111F] to-[#04090F] opacity-80 pointer-events-none" />

      <div ref={sectionRef} className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">

          {/* LEFT */}
          <div className="w-full lg:w-[46%] flex flex-col items-start">
            <div className="px-4 py-2 rounded-full mb-10 inline-flex items-center gap-3 glass-panel">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-400 pulse-gold" />
              <span className="text-[11px] font-semibold tracking-[0.3em] text-white/75 uppercase">
                HAKKIMIZDA
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-[62px] font-serif font-semibold tracking-tight text-white mb-8 leading-[1.05]">
              Güveni İnşa Eden{' '}
              <span className="gold-text">Kurumsal Çözüm</span>
            </h2>

            <p className="text-lg text-white/45 font-light leading-relaxed mb-14 max-w-lg">
              NEW GLOBAL GROUP olarak güvenlik, tesis yönetimi, profesyonel temizlik, personel tedariki ve teknoloji çözümlerini tek çatı altında sunuyor; kurumların operasyonel süreçlerini güvenle yönetiyoruz.
            </p>

            {/* GSAP Timeline */}
            <div className="relative pl-6 flex flex-col gap-7 w-full">
              {/* Vertical line container */}
              <div className="absolute left-0 top-1 bottom-1 w-[2px] rounded-full overflow-hidden bg-white/[0.05]">
                <div
                  ref={lineRef}
                  className="w-full h-full rounded-full"
                  style={{
                    background: 'linear-gradient(to bottom, #D4AF37 0%, #D4AF3780 60%, transparent 100%)',
                    transform: 'scaleY(0)',
                    transformOrigin: 'top',
                    boxShadow: '0 0 8px rgba(212,175,55,0.5)',
                  }}
                />
              </div>

              {timeline.map((item, idx) => (
                <div
                  key={idx}
                  ref={(el) => { rowRefs.current[idx] = el; }}
                  className="relative group flex items-start gap-5"
                  style={{ opacity: 0 }}
                >
                  {/* Dot */}
                  <span
                    ref={(el) => { dotRefs.current[idx] = el; }}
                    className="absolute -left-[29px] top-2 w-3 h-3 rounded-full border-2 border-white/15 bg-surface transition-all duration-500 z-10"
                    style={{ display: 'block' }}
                  />

                  {/* Icon */}
                  <div
                    className="w-10 h-10 rounded-[12px] flex items-center justify-center shrink-0 border border-white/[0.06] group-hover:scale-110 transition-all duration-400"
                    style={{ background: `${item.color}10`, borderColor: `${item.color}20` }}
                  >
                    <item.icon
                      className="w-4.5 h-4.5 transition-colors duration-400"
                      style={{ color: item.color }}
                      strokeWidth={1.5}
                    />
                  </div>

                  <div className="pt-0.5 flex-1">
                    <h4 className="text-[16px] text-white font-semibold mb-1 tracking-wide flex items-center gap-2">
                      {item.title}
                    </h4>
                    <p className="text-[14px] text-white/38 font-light leading-relaxed group-hover:text-white/55 transition-colors">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Awards/certs row */}
            <div className="flex items-center gap-5 mt-12 pt-8 border-t border-white/[0.04]">
              {[
                { icon: Award, label: 'ISO 9001' },
                { icon: TrendingUp, label: '20+ Yıl' },
              ].map((cert, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <cert.icon className="w-4 h-4 text-gold-400" strokeWidth={1.5} />
                  <span className="text-[12px] font-semibold text-white/50 tracking-wider uppercase">
                    {cert.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div className="w-full lg:w-[54%] relative h-[500px] lg:h-[680px]">
            {/* Ambient */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] rounded-full blur-[120px] pointer-events-none opacity-20"
              style={{ background: 'radial-gradient(circle, #3B82F6, transparent)' }}
            />

            <div className="w-full h-full rounded-[32px] overflow-hidden border border-white/[0.05] relative group">
              <div className="absolute inset-0 bg-gradient-to-t from-[#04090F]/80 via-transparent to-transparent z-10" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#04090F]/40 to-transparent z-10" />
              <Image
                src="https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2069&auto=format&fit=crop"
                alt="New Global Group Team"
                fill
                className="object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-[1.03] transition-all duration-1200 ease-[cubic-bezier(0.22,1,0.36,1)]"
                sizes="(max-width: 1024px) 100vw, 54vw"
              />
            </div>

            {/* Floating stat cards */}
            <div
              className="absolute top-10 -left-4 lg:-left-12 glass-panel px-7 py-5 rounded-[20px] z-20 shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
              style={{ border: '1px solid rgba(212,175,55,0.15)' }}
            >
              <span className="text-[42px] font-bold text-white tracking-tight block leading-none">
                <CountUp to={20} suffix="+" />
              </span>
              <span className="text-[11px] text-white/45 uppercase tracking-widest font-semibold mt-1.5 block">
                Yıllık Deneyim
              </span>
              <div className="w-8 h-[2px] bg-gold-400/50 rounded-full mt-2" />
            </div>

            <div
              className="absolute bottom-20 -right-4 lg:-right-10 glass-panel px-7 py-5 rounded-[20px] z-20 shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
              style={{ border: '1px solid rgba(99,102,241,0.2)' }}
            >
              <span className="text-[42px] font-bold text-white tracking-tight block leading-none">
                <CountUp to={500} suffix="+" />
              </span>
              <span className="text-[11px] text-white/45 uppercase tracking-widest font-semibold mt-1.5 block">
                Profesyonel Personel
              </span>
              <div className="w-8 h-[2px] rounded-full mt-2" style={{ background: '#6366F1' }} />
            </div>

            {/* Decorative corner accent */}
            <div
              className="absolute top-4 right-4 w-20 h-20 rounded-[14px] opacity-30 pointer-events-none"
              style={{
                border: '1px solid rgba(212,175,55,0.4)',
                background: 'transparent',
              }}
            />
          </div>
        </div>

        {/* Quote */}
        <div className="mt-28 pt-14 border-t border-white/[0.04] text-center">
          <p className="text-2xl md:text-3xl lg:text-[34px] font-serif font-light text-white/50 tracking-tight max-w-2xl mx-auto leading-snug">
            Her başarılı operasyonun arkasında{' '}
            <span className="font-semibold text-white/90">güçlü bir ekip</span> vardır.
          </p>
          <div className="w-14 h-[2px] gold-text rounded-full mx-auto mt-7"
            style={{ background: 'linear-gradient(90deg, #D4AF37, transparent)' }}
          />
        </div>
      </div>
    </section>
  );
}
