'use client';

import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { ShieldCheck, Sparkles, Users, Building2, Briefcase, Cpu, ArrowRight } from 'lucide-react';

const services = [
  {
    title: 'Profesyonel Güvenlik',
    description: 'Tesislerinizi ve varlıklarınızı 7/24 koruyan, ileri teknoloji destekli entegre güvenlik çözümleri.',
    icon: ShieldCheck,
    color: '#3B82F6',
    tag: '7/24 Aktif',
  },
  {
    title: 'Profesyonel Temizlik',
    description: 'Sağlıklı ve hijyenik çalışma alanları için uluslararası standartlarda profesyonel temizlik hizmetleri.',
    icon: Sparkles,
    color: '#10B981',
    tag: 'ISO Sertifikalı',
  },
  {
    title: 'Personel Tedarik',
    description: 'İşletmenizin kültürüne ve ihtiyaçlarına en uygun, nitelikli ve eğitimli personel çözümleri.',
    icon: Users,
    color: '#8B5CF6',
    tag: '500+ Personel',
  },
  {
    title: 'Tesis Yönetimi',
    description: 'Binalarınızın teknik bakımından operasyonel yönetimine kadar değer katan entegre tesis yönetimi.',
    icon: Building2,
    color: '#F59E0B',
    tag: 'Entegre Sistem',
  },
  {
    title: 'Kurumsal Danışmanlık',
    description: 'Operasyonel verimliliğinizi artıracak stratejik planlama ve yönetim danışmanlığı.',
    icon: Briefcase,
    color: '#D4AF37',
    tag: 'Stratejik',
  },
  {
    title: 'Teknoloji Çözümleri',
    description: 'Güvenlik ve yönetim süreçlerinizi dijitalleştiren yenilikçi altyapı ve yazılım sistemleri.',
    icon: Cpu,
    color: '#06B6D4',
    tag: 'AI Destekli',
  },
];

function TiltCard({ service, index }: { service: typeof services[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const Icon = service.icon;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rX = ((y - cy) / cy) * -9;
    const rY = ((x - cx) / cx) * 9;
    card.style.transform = `perspective(1000px) rotateX(${rX}deg) rotateY(${rY}deg) translateZ(6px)`;
    if (glowRef.current) {
      glowRef.current.style.background = `radial-gradient(circle at ${x}px ${y}px, ${service.color}22 0%, transparent 65%)`;
    }
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform =
        'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0)';
    }
    if (glowRef.current) glowRef.current.style.background = 'transparent';
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative flex flex-col justify-between p-8 rounded-[28px] overflow-hidden h-full min-h-[280px]"
      style={{
        background: 'rgba(255,255,255,0.02)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        border: '1px solid rgba(255,255,255,0.06)',
        transition: 'transform 0.15s ease, box-shadow 0.4s ease, border-color 0.4s ease',
        willChange: 'transform',
        opacity: visible ? 1 : 0,
        transform: visible
          ? 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0) translateY(0)'
          : 'translateY(40px)',
        transitionDelay: visible ? `${index * 0.07}s` : '0s',
        transitionDuration: visible ? '0.7s, 0.15s, 0.4s, 0.4s' : '0s',
        transitionProperty: 'opacity, transform, box-shadow, border-color',
      }}
    >
      {/* Animated shimmer border */}
      <div
        className="absolute inset-0 rounded-[28px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `linear-gradient(135deg, ${service.color}15, transparent 50%, ${service.color}08)`,
        }}
      />

      {/* Top border shine line */}
      <div
        className="absolute top-0 left-[10%] right-[10%] h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-full"
        style={{
          background: `linear-gradient(90deg, transparent, ${service.color}60, transparent)`,
        }}
      />

      {/* Interactive cursor glow */}
      <div ref={glowRef} className="absolute inset-0 rounded-[28px] pointer-events-none transition-all duration-200" />

      <div className="relative z-10">
        {/* Tag */}
        <div className="mb-6 flex items-center justify-between">
          <div
            className="w-13 h-13 w-[52px] h-[52px] rounded-[14px] flex items-center justify-center border transition-all duration-500 group-hover:scale-110"
            style={{
              background: `${service.color}12`,
              borderColor: `${service.color}25`,
            }}
          >
            <Icon
              className="w-6 h-6 transition-colors duration-500"
              style={{ color: service.color }}
              strokeWidth={1.5}
            />
          </div>
          <span
            className="text-[10px] font-semibold tracking-[0.2em] uppercase px-3 py-1 rounded-full border"
            style={{
              color: service.color,
              borderColor: `${service.color}25`,
              background: `${service.color}0D`,
            }}
          >
            {service.tag}
          </span>
        </div>

        <h3 className="text-[19px] font-serif font-semibold text-white mb-3 tracking-tight group-hover:text-white transition-colors">
          {service.title}
        </h3>
        <p className="text-white/40 font-light leading-relaxed text-[14px] group-hover:text-white/55 transition-colors duration-400">
          {service.description}
        </p>
      </div>

      {/* Bottom row */}
      <div className="relative z-10 flex items-center justify-between mt-7 pt-5 border-t border-white/[0.04]">
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-1 h-1 rounded-full transition-all duration-300 group-hover:w-3"
              style={{
                background: service.color,
                opacity: i === 0 ? 0.9 : i === 1 ? 0.5 : 0.25,
                transitionDelay: `${i * 0.05}s`,
              }}
            />
          ))}
        </div>
        <span
          className="text-[11px] uppercase tracking-widest font-semibold flex items-center gap-2 transition-all duration-400 group-hover:gap-3"
          style={{ color: service.color }}
        >
          DETAYLAR
          <ArrowRight className="w-3 h-3" />
        </span>
      </div>
    </div>
  );
}

export function Services() {
  return (
    <section id="hizmetler" className="relative w-full py-28 lg:py-36 bg-[#04090F] overflow-hidden">
      {/* Subtle radial bg */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] opacity-40 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(37,99,235,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-20">
          <div className="px-4 py-2 rounded-full mb-7 inline-flex items-center gap-3 glass-panel">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-400 pulse-gold" />
            <span className="text-[11px] font-semibold tracking-[0.3em] text-white/75 uppercase">
              HİZMETLERİMİZ
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-[64px] font-serif font-semibold tracking-tight text-white mb-6 leading-[1.07]">
            Tek Çatı Altında{' '}
            <span className="gold-text">Tüm Profesyonel Hizmetler</span>
          </h2>

          <p className="text-lg text-white/40 font-light leading-relaxed max-w-2xl">
            Güvenlikten tesis yönetimine, personel tedarikinden teknoloji çözümlerine kadar işletmenizin tüm operasyonel ihtiyaçlarını karşılıyoruz.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5 group/grid">
          {services.map((service, idx) => (
            <div
              key={idx}
              className="transition-all duration-500 hover:!opacity-100 group-hover/grid:opacity-60"
            >
              <TiltCard service={service} index={idx} />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="relative max-w-[900px] mx-auto rounded-[32px] mt-20 overflow-hidden">
          {/* Animated gold border */}
          <div
            className="absolute inset-0 rounded-[32px] pointer-events-none"
            style={{
              background: 'linear-gradient(135deg, rgba(212,175,55,0.15), rgba(212,175,55,0.05), rgba(212,175,55,0.15))',
              backgroundSize: '200% 200%',
              animation: 'borderShift 6s ease infinite',
            }}
          />
          <div className="relative z-10 p-12 md:p-16 text-center glass-panel rounded-[32px] border-gold-400/20">
            <h3 className="text-2xl md:text-3xl lg:text-[38px] font-serif font-semibold text-white mb-6 leading-[1.1]">
              İşletmenize Özel <span className="gold-text">Çözüm Hazırlayalım</span>
            </h3>
            <Link
              href="/iletisim"
              className="group relative overflow-hidden inline-flex items-center gap-3 px-10 h-[58px] rounded-full font-semibold text-[15px] text-black"
              style={{ background: 'linear-gradient(135deg, #D4AF37, #F5D78B, #A07830)' }}
            >
              <span
                className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 pointer-events-none"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)' }}
              />
              <span className="relative z-10">Ücretsiz Teklif Al</span>
              <ArrowRight size={17} className="relative z-10 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes borderShift {
          0%, 100% { background-position: 0% 0%; }
          50% { background-position: 100% 100%; }
        }
      `}</style>
    </section>
  );
}
