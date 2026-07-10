'use client';

import { useEffect, useRef, useState } from 'react';

const stats = [
  {
    value: 500,
    suffix: '+',
    label: 'Uzman Personel',
    desc: 'Sertifikalı ve deneyimli',
    bar: 92,
    color: '#D4AF37',
  },
  {
    value: 20,
    suffix: '+',
    label: 'Yıllık Deneyim',
    desc: 'Sektörde öncü konum',
    bar: 85,
    color: '#3B82F6',
  },
  {
    value: 100,
    suffix: '+',
    label: 'Kurumsal Müşteri',
    desc: "Türkiye'nin liderleri",
    bar: 78,
    color: '#10B981',
  },
  {
    value: 99,
    suffix: '%',
    label: 'Müşteri Memnuniyeti',
    desc: 'Sürekli iyileştirme',
    bar: 99,
    color: '#8B5CF6',
  },
];

function AnimatedBar({ target, color, trigger }: { target: number; color: string; trigger: boolean }) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (!trigger) return;
    const timer = setTimeout(() => {
      let w = 0;
      const step = () => {
        w += (target - w) * 0.06;
        setWidth(w);
        if (Math.abs(target - w) > 0.3) requestAnimationFrame(step);
        else setWidth(target);
      };
      requestAnimationFrame(step);
    }, 200);
    return () => clearTimeout(timer);
  }, [target, trigger]);

  return (
    <div className="w-full h-[3px] bg-white/[0.06] rounded-full overflow-hidden mt-3">
      <div
        className="h-full rounded-full"
        style={{
          width: `${width}%`,
          background: `linear-gradient(90deg, ${color}, ${color}aa)`,
          boxShadow: `0 0 8px ${color}60`,
          transition: 'width 0.05s linear',
        }}
      />
    </div>
  );
}

function StatCounter({ to, suffix }: { to: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasRun = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasRun.current) {
          hasRun.current = true;
          const start = performance.now();
          const duration = 2000;
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
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [to]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export function Stats() {
  const [triggered, setTriggered] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setTriggered(true); },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full py-16 bg-[#04090F] overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-gold-400/15 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[200px] pointer-events-none opacity-30"
        style={{ background: 'radial-gradient(ellipse, rgba(212,175,55,0.06), transparent 70%)' }}
      />

      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {stats.map((stat, idx) => (
            <div key={idx} className="group flex flex-col">
              {/* Number */}
              <div
                className="text-[42px] md:text-[52px] font-bold tracking-tight leading-none mb-1.5"
                style={{ color: stat.color, filter: `drop-shadow(0 0 20px ${stat.color}30)` }}
              >
                <StatCounter to={stat.value} suffix={stat.suffix} />
              </div>

              {/* Label */}
              <div className="text-[13px] font-semibold text-white/65 uppercase tracking-[0.18em] mb-0.5">
                {stat.label}
              </div>

              {/* Desc */}
              <div className="text-[12px] text-white/25 font-light mb-2">{stat.desc}</div>

              {/* Animated bar */}
              <AnimatedBar target={stat.bar} color={stat.color} trigger={triggered} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
