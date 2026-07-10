'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Plus, Minus, Phone } from 'lucide-react';

const faqs = [
  {
    question: 'Ne kadar sürede geri dönüş yapıyorsunuz?',
    answer:
      'İletişim formu, telefon veya WhatsApp üzerinden bize ulaştığınızda taleplerinizi en kısa sürede değerlendiriyoruz. Mesai saatleri içerisinde yapılan başvurulara genellikle aynı gün içerisinde dönüş sağlanmaktadır.',
  },
  {
    question: 'Danışmanlık hizmetleri hangi alanları kapsıyor?',
    answer:
      'Kurumsal danışmanlık hizmetlerimiz; güvenlik yönetimi, tesis yönetimi, operasyon planlaması, personel organizasyonu, süreç iyileştirme ve işletmelerin ihtiyaçlarına yönelik profesyonel çözümleri kapsamaktadır.',
  },
  {
    question: "Türkiye'nin her yerinde hizmet veriyor musunuz?",
    answer:
      "Evet. NEW GLOBAL GROUP olarak İstanbul merkezli faaliyet göstermemize rağmen Türkiye genelinde güvenlik, temizlik, personel tedarik, tesis yönetimi, kurumsal danışmanlık ve teknoloji hizmetleri sunuyoruz.",
  },
  {
    question: 'Danışmanlık süreci nasıl ilerliyor?',
    answer:
      'Öncelikle ihtiyaçlarınızı analiz ediyoruz. Ardından işletmenize özel çözüm planı hazırlıyor, gerekli operasyon planlamasını oluşturuyor ve uygulama sürecini profesyonel ekibimizle birlikte yönetiyoruz.',
  },
  {
    question: 'Danışmanlık ücretleri neye göre belirleniyor?',
    answer:
      'Danışmanlık ücretleri; hizmet kapsamı, proje süresi, operasyonun büyüklüğü, personel ihtiyacı ve talep edilen çözümlere göre belirlenmektedir. Size en uygun çözümü sunabilmemiz için ön görüşme gerçekleştiriyor ve ihtiyaçlarınıza özel teklif hazırlıyoruz.',
  },
];

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="sss" className="relative w-full py-28 lg:py-36 bg-primary overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-blue-600/[0.025] rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-[960px] mx-auto px-6 md:px-10 relative z-10">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="px-4 py-2 rounded-full mb-7 inline-flex items-center gap-3 glass-panel">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-400 pulse-gold" />
            <span className="text-[11px] font-medium tracking-[0.25em] text-white/80 uppercase">
              SSS
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-serif font-semibold tracking-tight text-white mb-5">
            Sıkça Sorulan Sorular
          </h2>

          <p className="text-lg text-white/45 font-light leading-relaxed max-w-xl mx-auto">
            Merak ettiğiniz konuların cevaplarını burada bulabilirsiniz.
          </p>
        </div>

        {/* Accordion */}
        <div className="flex flex-col gap-3 mb-20">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className={`glass-panel rounded-[20px] overflow-hidden border transition-all duration-400 ${
                openIndex === idx
                  ? 'bg-white/[0.04] border-white/[0.1] shadow-[0_16px_40px_rgba(0,0,0,0.35)]'
                  : 'bg-white/[0.02] border-white/[0.04] hover:border-white/[0.08]'
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full px-7 py-6 flex items-center justify-between gap-4 text-left"
                aria-expanded={openIndex === idx}
              >
                <h3
                  className={`text-[17px] font-semibold tracking-wide transition-colors duration-400 ${
                    openIndex === idx ? 'text-white' : 'text-white/65'
                  }`}
                >
                  {faq.question}
                </h3>
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 border transition-all duration-400 ${
                    openIndex === idx
                      ? 'bg-gold-400/10 border-gold-400/30'
                      : 'bg-white/[0.03] border-white/[0.06]'
                  }`}
                >
                  <div
                    style={{
                      transform: openIndex === idx ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.35s ease',
                    }}
                  >
                    {openIndex === idx ? (
                      <Minus className="w-4 h-4 text-gold-400" strokeWidth={2} />
                    ) : (
                      <Plus className="w-4 h-4 text-white/40" strokeWidth={2} />
                    )}
                  </div>
                </div>
              </button>

              <div
                style={{
                  maxHeight: openIndex === idx ? '400px' : '0',
                  overflow: 'hidden',
                  transition: 'max-height 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
                }}
              >
                <div className="px-7 pb-7 text-[15px] text-white/45 font-light leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Card */}
        <div className="glass-panel p-10 md:p-16 rounded-[32px] text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent" />
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-gold-400/[0.04] blur-[80px] rounded-full pointer-events-none" />

          <h3 className="relative z-10 text-2xl md:text-3xl font-serif font-semibold text-white tracking-tight mb-4">
            Aradığınız cevabı bulamadınız mı?
          </h3>

          <p className="relative z-10 text-base text-white/45 font-light leading-relaxed max-w-2xl mx-auto mb-10">
            Uzman ekibimiz tüm sorularınızı memnuniyetle yanıtlamaktadır. İhtiyacınıza en uygun çözümü birlikte belirlemek için hemen iletişime geçebilirsiniz.
          </p>

          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/iletisim"
              className="flex items-center gap-2.5 px-8 h-[54px] bg-gold-400 text-black rounded-full font-semibold hover:bg-gold-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all duration-300 hover:scale-[1.02]"
            >
              <Phone size={17} />
              Hemen Teklif Al
            </Link>
            <a
              href="https://wa.me/905305980772?text=Merhaba%20NEW%20GLOBAL%20GROUP,%20web%20siteniz%20%C3%BCzerinden%20ula%C5%9F%C4%B1yorum.%20Hizmetleriniz%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 px-8 h-[54px] bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/20 rounded-full font-semibold hover:bg-[#25D366]/20 transition-all duration-300 hover:scale-[1.02]"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
              </svg>
              WhatsApp ile Yaz
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
