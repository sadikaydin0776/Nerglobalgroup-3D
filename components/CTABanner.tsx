import Link from 'next/link';
import { ArrowRight, Phone } from 'lucide-react';

export function CTABanner() {
  return (
    <section className="relative w-full py-24 overflow-hidden">
      {/* BG image blur */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600&auto=format&fit=crop')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(2px)',
          transform: 'scale(1.05)',
          opacity: 0.18,
        }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[#04090F]/85" />

      {/* Animated gold orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.1) 0%, transparent 65%)', filter: 'blur(60px)', animation: 'orbFloat1 12s ease-in-out infinite' }} />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 65%)', filter: 'blur(70px)', animation: 'orbFloat2 15s ease-in-out infinite' }} />

      {/* Top border line */}
      <div className="absolute top-0 left-0 right-0 h-[1px]"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.3), transparent)' }} />

      <div className="relative z-10 max-w-[900px] mx-auto px-5 sm:px-8 text-center">
        {/* Badge */}
        <div className="px-3 py-1.5 rounded-full mb-7 inline-flex items-center gap-2.5 glass-panel">
          <span className="w-1.5 h-1.5 rounded-full bg-gold-400 pulse-gold" />
          <span className="text-[10px] font-semibold tracking-[0.25em] text-white/75 uppercase">
            Bugün Başlayın
          </span>
        </div>

        <h2
          className="font-serif font-semibold text-white tracking-tight leading-[1.06] mb-6"
          style={{ fontSize: 'clamp(2rem, 5vw, 64px)' }}
        >
          Güvenin Geleceğini{' '}
          <span className="animated-gold-text">Birlikte İnşa Edelim.</span>
        </h2>

        <p className="text-base sm:text-lg text-white/45 font-light leading-relaxed max-w-xl mx-auto mb-10">
          500+ uzman personeliyle, Türkiye genelinde kesintisiz hizmet. İşletmeniz için en uygun çözümü birlikte belirleyelim.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/iletisim"
            className="group relative overflow-hidden flex items-center justify-center gap-2.5 px-8 h-[56px] rounded-full font-semibold text-[15px] text-black"
            style={{ background: 'linear-gradient(135deg, #D4AF37, #F5D78B, #A07830)' }}
          >
            <span
              className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 pointer-events-none"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)' }}
            />
            <span className="relative z-10">Ücretsiz Teklif Al</span>
            <ArrowRight size={17} className="relative z-10 transition-transform group-hover:translate-x-1" />
          </Link>

          <a
            href="tel:+905305980772"
            className="flex items-center justify-center gap-2.5 px-8 h-[56px] glass-panel rounded-full font-medium text-white text-[15px] hover:bg-white/[0.08] transition-all duration-300"
          >
            <Phone size={17} className="text-gold-400" />
            +90 530 598 07 72
          </a>
        </div>

        {/* Trust strip */}
        <div className="flex flex-wrap items-center justify-center gap-5 mt-12 pt-10 border-t border-white/[0.05]">
          {[
            '✦ 7/24 Destek',
            '✦ Türkiye Geneli',
            '✦ 500+ Uzman Personel',
            '✦ ISO 9001',
          ].map((item, i) => (
            <span key={i} className="text-[11px] text-white/30 font-medium tracking-wider uppercase">
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px]"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)' }} />
    </section>
  );
}
