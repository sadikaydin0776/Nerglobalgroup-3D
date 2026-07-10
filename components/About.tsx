'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Target, Shield, Recycle, Cpu } from 'lucide-react';

const timeline = [
  {
    id: '01',
    icon: Target,
    title: 'Vizyon',
    desc: 'Sektörde öncü ve yenilikçi yaklaşım ile kurumsal mükemmelliği hedefliyoruz.',
  },
  {
    id: '02',
    icon: Shield,
    title: 'Güven',
    desc: 'Şeffaf ve hesap verilebilir operasyonlarla güveni tesis ediyoruz.',
  },
  {
    id: '03',
    icon: Recycle,
    title: 'Sürdürülebilir Hizmet',
    desc: 'Uzun vadeli ve değer katan çözümlerle sürdürülebilir büyüme sağlıyoruz.',
  },
  {
    id: '04',
    icon: Cpu,
    title: 'Teknoloji',
    desc: 'Verimliliği artıran dijital altyapı ile geleceğe hazır sistemler kuruyoruz.',
  },
];

function CountUp({ to, suffix = '' }: { to: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasRun = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasRun.current) {
          hasRun.current = true;
          let start = 0;
          const duration = 1500;
          const startTime = performance.now();

          const step = (now: number) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const ease = 1 - Math.pow(2, -10 * progress);
            setCount(Math.floor(ease * to));
            if (progress < 1) requestAnimationFrame(step);
          };

          requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [to]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export function About() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const dotRefs = useRef<(HTMLDivElement | null)[]>([]);

  // GSAP ScrollTrigger for timeline
  useEffect(() => {
    let ctx: any;

    const initGSAP = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        if (!lineRef.current || !timelineRef.current) return;

        // Animate the vertical line growing downward
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0, transformOrigin: 'top center' },
          {
            scaleY: 1,
            duration: 1.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: timelineRef.current,
              start: 'top 70%',
              end: 'bottom 30%',
              scrub: 1,
            },
          }
        );

        // Animate each dot & row on scroll
        dotRefs.current.forEach((dot, idx) => {
          if (!dot) return;
          const row = dot.closest('.timeline-row') as HTMLElement;
          if (!row) return;

          gsap.fromTo(
            [dot, row],
            { opacity: 0, x: -30 },
            {
              opacity: 1,
              x: 0,
              duration: 0.7,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: row,
                start: 'top 80%',
                toggleActions: 'play none none none',
              },
              delay: idx * 0.1,
            }
          );

          // Dot glow animation when in view
          ScrollTrigger.create({
            trigger: row,
            start: 'top 70%',
            onEnter: () => {
              gsap.to(dot, {
                boxShadow: '0 0 0 4px rgba(212,175,55,0.3), 0 0 16px rgba(212,175,55,0.5)',
                backgroundColor: '#D4AF37',
                borderColor: '#D4AF37',
                duration: 0.5,
              });
            },
          });
        });
      });
    };

    initGSAP();

    return () => {
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <section
      id="hakkimizda"
      className="relative w-full py-28 lg:py-36 bg-gradient-to-b from-primary to-surface overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
          {/* Left: Content */}
          <div className="w-full lg:w-[45%] flex flex-col items-start">
            <div className="px-4 py-2 rounded-full mb-10 inline-flex items-center gap-3 glass-panel">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-400 pulse-gold" />
              <span className="text-[11px] font-medium tracking-[0.25em] text-white/80 uppercase">
                HAKKIMIZDA
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-[64px] font-serif font-semibold tracking-tight text-white mb-8 leading-[1.05]">
              Güveni İnşa Eden{' '}
              <span className="block gold-text">Kurumsal Çözüm</span>
            </h2>

            <p className="text-lg text-white/55 font-light leading-relaxed mb-14 max-w-lg">
              NEW GLOBAL GROUP olarak güvenlik, tesis yönetimi, profesyonel temizlik, personel tedariki ve teknoloji çözümlerini tek çatı altında sunuyor; kurumların operasyonel süreçlerini güvenle yönetiyoruz.
            </p>

            {/* GSAP Timeline */}
            <div
              ref={timelineRef}
              className="flex flex-col gap-8 relative pl-5"
            >
              {/* The glowing vertical line */}
              <div className="absolute left-0 top-2 bottom-2 w-[2px] bg-white/[0.06] rounded-full overflow-hidden">
                <div
                  ref={lineRef}
                  className="w-full h-full rounded-full"
                  style={{
                    background:
                      'linear-gradient(to bottom, rgba(212,175,55,0.8), rgba(212,175,55,0.2))',
                    transformOrigin: 'top',
                    transform: 'scaleY(0)',
                  }}
                />
              </div>

              {timeline.map((item, idx) => (
                <div
                  key={idx}
                  className="timeline-row relative group flex items-start gap-5"
                >
                  {/* Timeline dot */}
                  <div
                    ref={(el) => { dotRefs.current[idx] = el; }}
                    className="absolute -left-[26px] top-1.5 w-[10px] h-[10px] rounded-full bg-surface border-2 border-white/20 transition-all duration-500 z-10"
                    style={{ opacity: 0 }}
                  />

                  {/* Icon box */}
                  <div className="w-11 h-11 rounded-[12px] bg-white/[0.03] border border-white/[0.07] flex items-center justify-center shrink-0 group-hover:border-gold-400/40 group-hover:bg-white/[0.06] transition-all duration-400">
                    <item.icon
                      className="w-5 h-5 text-white/50 group-hover:text-gold-400 transition-colors duration-400"
                      strokeWidth={1.5}
                    />
                  </div>

                  <div className="pt-0.5">
                    <h4 className="text-[16px] text-white font-semibold mb-1.5 tracking-wide">
                      {item.title}
                    </h4>
                    <p className="text-[14px] text-white/40 font-light leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Image + Floating Stats */}
          <div className="w-full lg:w-[55%] relative h-[500px] lg:h-[700px]">
            {/* Ambient glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-blue-500/8 rounded-full blur-[120px] pointer-events-none" />

            <div className="w-full h-full rounded-[32px] overflow-hidden border border-white/[0.05] relative">
              <div className="absolute inset-0 bg-gradient-to-t from-surface/80 via-transparent to-transparent z-10" />
              <Image
                src="https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2069&auto=format&fit=crop"
                alt="New Global Group Profesyonel Ekip"
                fill
                className="object-cover grayscale-[25%] hover:grayscale-0 transition-all duration-1000"
                sizes="(max-width: 1024px) 100vw, 55vw"
              />
            </div>

            {/* Floating stat - top left */}
            <div className="absolute top-12 -left-4 lg:-left-10 glass-panel p-6 rounded-[20px] z-20 w-48">
              <span className="text-4xl font-bold text-white tracking-tight block">
                <CountUp to={20} suffix="+" />
              </span>
              <span className="text-[11px] text-white/50 uppercase tracking-widest font-medium mt-1 block">
                Yıllık Deneyim
              </span>
            </div>

            {/* Floating stat - bottom right */}
            <div className="absolute bottom-24 -right-4 lg:-right-8 glass-panel p-6 rounded-[20px] z-20 w-52">
              <span className="text-4xl font-bold text-white tracking-tight block">
                <CountUp to={500} suffix="+" />
              </span>
              <span className="text-[11px] text-white/50 uppercase tracking-widest font-medium mt-1 block">
                Profesyonel Personel
              </span>
            </div>
          </div>
        </div>

        {/* Bottom quote */}
        <div className="mt-32 pt-16 border-t border-white/[0.04] text-center">
          <h3 className="text-2xl md:text-3xl lg:text-[36px] font-serif font-light text-white/55 tracking-tight max-w-2xl mx-auto leading-snug">
            Her başarılı operasyonun arkasında{' '}
            <span className="font-semibold text-white">güçlü bir ekip</span> vardır.
          </h3>
          <div className="w-16 h-[2px] bg-gradient-to-r from-gold-400/60 to-transparent rounded-full mx-auto mt-8" />
        </div>
      </div>
    </section>
  );
}
