'use client';

const items = [
  'Profesyonel Güvenlik',
  'Tesis Yönetimi',
  'Personel Tedarik',
  'Kurumsal Danışmanlık',
  'Teknoloji Çözümleri',
  'Profesyonel Temizlik',
  '7/24 Operasyon',
  'Türkiye Geneli',
  'ISO 9001 Kalite',
];

interface MarqueeProps {
  reverse?: boolean;
}

export function Marquee({ reverse = false }: MarqueeProps) {
  const doubled = [...items, ...items];

  return (
    <div className="relative w-full py-5 overflow-hidden bg-[#04090F] border-y border-white/[0.04]">
      {/* Left fade */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#04090F] to-transparent z-10 pointer-events-none" />
      {/* Right fade */}
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#04090F] to-transparent z-10 pointer-events-none" />

      <div
        className="flex items-center gap-0 whitespace-nowrap"
        style={{
          animation: `marquee${reverse ? 'Reverse' : ''} 28s linear infinite`,
          willChange: 'transform',
        }}
      >
        {doubled.map((item, idx) => (
          <span key={idx} className="inline-flex items-center gap-4 px-5">
            <span className="w-1 h-1 rounded-full bg-gold-400/60 shrink-0" />
            <span className="text-[12px] font-semibold tracking-[0.25em] uppercase text-white/35">
              {item}
            </span>
          </span>
        ))}
      </div>

      <style jsx>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes marqueeReverse {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
