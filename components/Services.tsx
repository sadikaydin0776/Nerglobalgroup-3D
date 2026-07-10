'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { ShieldCheck, Sparkles, Users, Building2, Briefcase, Cpu, ArrowRight } from 'lucide-react';

const services = [
  {
    title: 'Profesyonel Güvenlik',
    description:
      'Tesislerinizi ve varlıklarınızı 7/24 koruyan, ileri teknoloji destekli entegre güvenlik çözümleri.',
    icon: ShieldCheck,
    accent: 'from-blue-500/10 to-transparent',
  },
  {
    title: 'Profesyonel Temizlik',
    description:
      'Sağlıklı ve hijyenik çalışma alanları için uluslararası standartlarda profesyonel temizlik hizmetleri.',
    icon: Sparkles,
    accent: 'from-emerald-500/10 to-transparent',
  },
  {
    title: 'Personel Tedarik',
    description:
      'İşletmenizin kültürüne ve ihtiyaçlarına en uygun, nitelikli ve eğitimli personel çözümleri.',
    icon: Users,
    accent: 'from-purple-500/10 to-transparent',
  },
  {
    title: 'Tesis Yönetimi',
    description:
      'Binalarınızın teknik bakımından operasyonel yönetimine kadar değer katan entegre tesis yönetimi.',
    icon: Building2,
    accent: 'from-orange-500/10 to-transparent',
  },
  {
    title: 'Kurumsal Danışmanlık',
    description:
      'Operasyonel verimliliğinizi artıracak stratejik planlama ve yönetim danışmanlığı.',
    icon: Briefcase,
    accent: 'from-gold-400/10 to-transparent',
  },
  {
    title: 'Teknoloji Çözümleri',
    description:
      'Güvenlik ve yönetim süreçlerinizi dijitalleştiren yenilikçi altyapı ve yazılım sistemleri.',
    icon: Cpu,
    accent: 'from-cyan-500/10 to-transparent',
  },
];

interface TiltCardProps {
  service: (typeof services)[0];
  index: number;
}

function TiltCard({ service, index }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const Icon = service.icon;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;

    if (glowRef.current) {
      glowRef.current.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(212,175,55,0.12) 0%, transparent 60%)`;
    }
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform =
      'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0)';
    if (glowRef.current) {
      glowRef.current.style.background = 'transparent';
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative group flex flex-col justify-between p-8 lg:p-10 rounded-[28px] bg-white/[0.025] backdrop-blur-2xl border border-white/[0.06] hover:border-white/[0.12] overflow-hidden h-full"
      style={{
        transition:
          'transform 0.15s ease, border-color 0.4s ease, box-shadow 0.4s ease',
        willChange: 'transform',
        animationDelay: `${index * 0.1}s`,
      }}
    >
      {/* Background gradient on hover */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${service.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
      />

      {/* Interactive glow that follows cursor */}
      <div
        ref={glowRef}
        className="absolute inset-0 pointer-events-none transition-all duration-300 rounded-[28px]"
      />

      {/* Top border highlight */}
      <div className="absolute top-0 left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-10">
        {/* Icon */}
        <div className="w-14 h-14 rounded-[16px] bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mb-7 group-hover:scale-110 group-hover:border-gold-400/40 group-hover:bg-white/[0.07] transition-all duration-500">
          <Icon
            className="w-7 h-7 text-white/60 group-hover:text-gold-400 transition-colors duration-500"
            strokeWidth={1.5}
          />
        </div>

        <h3 className="text-[20px] font-serif font-semibold text-white mb-3 tracking-tight">
          {service.title}
        </h3>
        <p className="text-white/45 font-light leading-relaxed text-[15px]">
          {service.description}
        </p>
      </div>

      <div className="relative z-10 flex items-center justify-end mt-8 pt-6 border-t border-white/[0.04]">
        <span className="text-[12px] uppercase tracking-widest font-semibold text-white/35 flex items-center gap-2 group-hover:text-gold-400 transition-colors duration-400">
          DETAYLAR
          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-400 group-hover:translate-x-1.5" />
        </span>
      </div>
    </div>
  );
}

export function Services() {
  return (
    <section
      id="hizmetler"
      className="relative w-full py-28 lg:py-36 bg-primary overflow-hidden"
    >
      {/* Background subtle glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-blue-600/[0.025] rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-20">
          <div className="px-4 py-2 rounded-full mb-7 inline-flex items-center gap-3 glass-panel">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-400 pulse-gold" />
            <span className="text-[11px] font-medium tracking-[0.25em] text-white/80 uppercase">
              HİZMETLERİMİZ
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-[64px] font-serif font-semibold tracking-tight text-white mb-7 leading-[1.08]">
            Kurumların İhtiyacı Olan Tüm{' '}
            <br className="hidden lg:block" />
            <span className="gold-text">Profesyonel Hizmetler</span>
          </h2>

          <p className="text-lg text-white/45 font-light leading-relaxed max-w-2xl">
            Güvenlikten tesis yönetimine, personel tedarikinden teknoloji çözümlerine kadar işletmenizin tüm operasyonel ihtiyaçlarını profesyonel ekiplerimizle karşılıyoruz.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 group/grid">
          {services.map((service, idx) => (
            <div
              key={idx}
              className="transition-opacity duration-500 hover:!opacity-100 group-hover/grid:opacity-50"
            >
              <TiltCard service={service} index={idx} />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="relative max-w-5xl mx-auto rounded-[36px] mt-24 p-14 md:p-20 text-center overflow-hidden glass-panel">
          <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-gold-400/[0.04] blur-[120px] rounded-full pointer-events-none" />

          <h3 className="relative z-10 text-3xl md:text-4xl lg:text-[44px] font-serif font-semibold text-white tracking-tight mb-8 leading-[1.1]">
            İşletmeniz İçin En Uygun Çözümü{' '}
            <br className="hidden md:block" /> Birlikte Belirleyelim
          </h3>

          <Link
            href="/iletisim"
            className="relative z-10 inline-flex items-center justify-center gap-3 px-10 h-[60px] bg-gold-400 text-black rounded-full font-semibold hover:bg-gold-300 hover:shadow-[0_0_40px_rgba(212,175,55,0.4)] transition-all duration-300 hover:scale-[1.02] group text-[16px]"
          >
            <span>Ücretsiz Teklif Al</span>
            <ArrowRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
