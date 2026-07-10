'use client';

import { useEffect, useRef, useState } from 'react';

const stats = [
  { value: 500, suffix: '+', label: 'Uzman Personel', desc: 'Sertifikalı ve deneyimli' },
  { value: 20, suffix: '+', label: 'Yıllık Deneyim', desc: 'Sektörde öncü konumda' },
  { value: 7, suffix: '/24', label: 'Operasyon', desc: 'Kesintisiz hizmet garantisi' },
  { value: 100, suffix: '+', label: 'Kurumsal Müşteri', desc: "Türkiye'nin önde gelenleri" },
];

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
          const duration = 1800;
          const step = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
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

export function Stats() {
  return (
    <section className="relative w-full py-20 bg-primary overflow-hidden">
      {/* Separator line */}
      <div className="absolute top-0 left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      <div className="absolute bottom-0 left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] bg-gold-400/[0.04] rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center text-center group">
              <div className="text-4xl md:text-5xl lg:text-[56px] font-bold text-white tracking-tight mb-2 group-hover:text-gold-300 transition-colors duration-400">
                <StatCounter to={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-[13px] font-semibold text-white/70 uppercase tracking-[0.2em] mb-1.5">
                {stat.label}
              </div>
              <div className="text-[12px] text-white/30 font-light">{stat.desc}</div>
              <div className="w-6 h-[2px] bg-gold-400/40 rounded-full mt-4 group-hover:w-12 group-hover:bg-gold-400 transition-all duration-400" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
