'use client';

import { useState } from 'react';
import { MapPin, Phone, Mail, Send, CheckCircle, AlertCircle } from 'lucide-react';

export function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY || '',
          subject: `NEW GLOBAL GROUP — Yeni İletişim Talebi: ${form.name}`,
          from_name: form.name,
          email: form.email,
          phone: form.phone || '—',
          message: form.message,
          botcheck: '',
        }),
      });

      const data = await res.json();
      if (data.success) {
        setStatus('sent');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="iletisim" className="relative w-full py-28 lg:py-36 bg-surface overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/60 to-surface pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-gold-400/[0.025] rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="px-4 py-2 rounded-full mb-7 inline-flex items-center gap-3 glass-panel">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-400 pulse-gold" />
            <span className="text-[11px] font-medium tracking-[0.25em] text-white/80 uppercase">
              İLETİŞİM
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-semibold text-white tracking-tight mb-5">
            Bizimle İletişime Geçin
          </h2>
          <p className="text-lg text-white/45 font-light max-w-xl mx-auto">
            Uzman ekibimiz size özel çözümler sunmak için hazır. Hemen iletişime geçin.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left: Info */}
          <div className="flex flex-col gap-6">
            {[
              {
                icon: MapPin,
                title: 'Adresimiz',
                content:
                  'Cumhuriyet Mah. Şehitler Cad. Concepta Plaza Sitesi B Blok No: 9/1 İç Kapı 53, Esenyurt / İstanbul',
              },
              {
                icon: Phone,
                title: 'Telefon',
                content: '+90 530 598 07 72',
                href: 'tel:+905305980772',
              },
              {
                icon: Mail,
                title: 'E-Posta',
                content: 'ozturk@newglobalgroup.com.tr',
                href: 'mailto:ozturk@newglobalgroup.com.tr',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="group glass-panel p-6 rounded-[20px] flex items-start gap-5 hover:border-white/[0.12] hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-[14px] bg-gold-400/10 border border-gold-400/20 flex items-center justify-center shrink-0 group-hover:bg-gold-400/15 transition-colors">
                  <item.icon className="w-5 h-5 text-gold-400" strokeWidth={1.5} />
                </div>
                <div>
                  <div className="text-[12px] text-white/40 uppercase tracking-widest font-medium mb-1.5">
                    {item.title}
                  </div>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-white/80 hover:text-gold-300 transition-colors text-[15px] font-medium"
                    >
                      {item.content}
                    </a>
                  ) : (
                    <p className="text-white/80 text-[15px] font-medium leading-relaxed">
                      {item.content}
                    </p>
                  )}
                </div>
              </div>
            ))}

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/905305980772?text=Say%C4%B1n%20NEW%20GLOBAL%20GROUP%20Yetkilileri%2C%0A%0AWeb%20siteniz%20%C3%BCzerinden%20ileti%C5%9Fime%20ge%C3%A7iyorum.%20G%C3%BCvenlik%2C%20tesis%20y%C3%B6netimi%20ve%20profesyonel%20hizmetleriniz%20hakk%C4%B1nda%20detayl%C4%B1%20bilgi%20almak%20ve%20i%C5%9Fletmemize%20%C3%B6zel%20bir%20teklif%20g%C3%B6r%C3%BC%C5%9Fmesi%20ger%C3%A7ekle%C5%9Ftirmek%20istiyorum.%0A%0A%C4%B0lginiz%20i%C3%A7in%20%C5%9Fimdiden%20te%C5%9Fekk%C3%BCr%20ederim.%0ASayg%C4%B1lar%C4%B1mla."
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2.5 w-fit transition-all duration-300 hover:opacity-80"
            >
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#25D366]/15 border border-[#25D366]/25 group-hover:bg-[#25D366]/25 transition-colors shrink-0">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="#25D366">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                </svg>
              </span>
              <span className="text-[13px] font-medium text-[#25D366]/80 group-hover:text-[#25D366] transition-colors">
                WhatsApp ile Ulaşın
              </span>
            </a>
          </div>

          {/* Right: Form */}
          <div className="glass-panel p-8 md:p-10 rounded-[28px] relative overflow-hidden">
            <div className="absolute top-0 left-[15%] right-[15%] h-[1px] bg-gradient-to-r from-transparent via-gold-400/20 to-transparent" />

            {status === 'error' ? (
              <div className="flex flex-col items-center justify-center h-full py-16 text-center">
                <AlertCircle className="w-14 h-14 text-red-400 mb-5" strokeWidth={1.5} />
                <h3 className="text-xl font-serif font-semibold text-white mb-3">
                  Gönderilemedi
                </h3>
                <p className="text-white/45 font-light leading-relaxed text-sm max-w-xs">
                  Bir hata oluştu. Lütfen{' '}
                  <a href="tel:+905305980772" className="text-gold-400 hover:underline">+90 530 598 07 72</a>{' '}
                  numaralı telefonu arayın veya WhatsApp üzerinden ulaşın.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-7 px-7 h-[44px] bg-white/[0.06] text-white rounded-full font-medium hover:bg-white/[0.10] transition-colors text-sm"
                >
                  Tekrar Dene
                </button>
              </div>
            ) : status === 'sent' ? (
              <div className="flex flex-col items-center justify-center h-full py-16 text-center">
                <CheckCircle className="w-16 h-16 text-gold-400 mb-5" strokeWidth={1.5} />
                <h3 className="text-2xl font-serif font-semibold text-white mb-3">
                  Mesajınız İletildi!
                </h3>
                <p className="text-white/50 font-light leading-relaxed">
                  En kısa sürede size geri dönüş yapacağız.
                </p>
                <button
                  onClick={() => { setStatus('idle'); setForm({ name: '', email: '', phone: '', message: '' }); }}
                  className="mt-8 px-7 h-[46px] bg-white/[0.06] text-white rounded-full font-medium hover:bg-white/[0.10] transition-colors"
                >
                  Yeni Mesaj Gönder
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <h3 className="text-xl font-serif font-semibold text-white mb-2">
                  Teklif & Bilgi Formu
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[12px] text-white/40 uppercase tracking-wider mb-2 block">
                      Ad Soyad *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Adınız Soyadınız"
                      className="w-full h-[50px] bg-white/[0.04] border border-white/[0.08] rounded-[14px] px-4 text-white placeholder-white/25 text-[14px] focus:outline-none focus:border-gold-400/50 focus:bg-white/[0.06] transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-[12px] text-white/40 uppercase tracking-wider mb-2 block">
                      E-Posta *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="ornek@sirket.com"
                      className="w-full h-[50px] bg-white/[0.04] border border-white/[0.08] rounded-[14px] px-4 text-white placeholder-white/25 text-[14px] focus:outline-none focus:border-gold-400/50 focus:bg-white/[0.06] transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[12px] text-white/40 uppercase tracking-wider mb-2 block">
                    Telefon
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+90 5XX XXX XX XX"
                    className="w-full h-[50px] bg-white/[0.04] border border-white/[0.08] rounded-[14px] px-4 text-white placeholder-white/25 text-[14px] focus:outline-none focus:border-gold-400/50 focus:bg-white/[0.06] transition-all"
                  />
                </div>

                <div>
                  <label className="text-[12px] text-white/40 uppercase tracking-wider mb-2 block">
                    Mesajınız *
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    placeholder="Hizmetleriniz hakkında bilgi almak istiyorum..."
                    rows={5}
                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded-[14px] px-4 py-3 text-white placeholder-white/25 text-[14px] focus:outline-none focus:border-gold-400/50 focus:bg-white/[0.06] transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="flex items-center justify-center gap-2.5 h-[54px] bg-gold-400 text-black rounded-full font-semibold hover:bg-gold-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all duration-300 hover:scale-[1.01] disabled:opacity-60"
                >
                  <Send size={17} />
                  {status === 'sending' ? 'Gönderiliyor...' : 'Mesaj Gönder'}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Google Maps */}
        <div className="mt-12 rounded-[24px] overflow-hidden border border-white/[0.06]" style={{ height: '320px' }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3009.3!2d28.6724!3d41.0201!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14caa4a3b4b4b4b4%3A0x0!2sCumhuriyet+Mah.+%C5%9Eehitler+Cad.+Concepta+Plaza+Sitesi+B+Blok+No%3A+9%2F1+Esenyurt+%C4%B0stanbul!5e0!3m2!1str!2str!4v1700000000000!5m2!1str!2str&q=Concepta+Plaza+Esenyurt+Istanbul"
            width="100%"
            height="100%"
            style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(0.85) contrast(0.9)' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="NEW GLOBAL GROUP Ofis Konumu"
          />
        </div>
      </div>
    </section>
  );
}
