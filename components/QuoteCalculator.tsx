'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowLeft, CheckCircle2, Phone } from 'lucide-react';

type Step = 1 | 2 | 3 | 4;

const serviceOptions = [
  { id: 'guvenlik', label: 'Profesyonel Güvenlik', base: 15000 },
  { id: 'temizlik', label: 'Profesyonel Temizlik', base: 8000 },
  { id: 'personel', label: 'Personel Tedarik', base: 12000 },
  { id: 'tesis', label: 'Tesis Yönetimi', base: 20000 },
  { id: 'danismanlik', label: 'Kurumsal Danışmanlık', base: 10000 },
  { id: 'teknoloji', label: 'Teknoloji Çözümleri', base: 25000 },
];

const alanOptions = [
  { id: 'kucuk', label: '0 – 500 m²', multiplier: 1 },
  { id: 'orta', label: '500 – 2.000 m²', multiplier: 1.8 },
  { id: 'buyuk', label: '2.000 – 10.000 m²', multiplier: 3.2 },
  { id: 'cok-buyuk', label: '10.000 m²+', multiplier: 5.5 },
];

const sureOptions = [
  { id: '1ay', label: '1 Ay (Deneme)', multiplier: 1 },
  { id: '3ay', label: '3 – 6 Ay', multiplier: 0.9 },
  { id: '1yil', label: '1 Yıl', multiplier: 0.8 },
  { id: 'suresiz', label: 'Süresiz (En Avantajlı)', multiplier: 0.7 },
];

function OptionCard({ selected, onClick, children }: { selected: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left glass-panel rounded-[16px] px-5 py-4 transition-all duration-200 hover:border-white/20"
      style={{
        borderColor: selected ? 'rgba(212,175,55,0.5)' : undefined,
        background: selected ? 'rgba(212,175,55,0.06)' : undefined,
        boxShadow: selected ? '0 0 0 1px rgba(212,175,55,0.3)' : undefined,
      }}
    >
      <div className="flex items-center gap-3">
        <div
          className="w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-200"
          style={{
            borderColor: selected ? '#D4AF37' : 'rgba(255,255,255,0.2)',
            background: selected ? '#D4AF37' : 'transparent',
          }}
        >
          {selected && <div className="w-2 h-2 rounded-full bg-black" />}
        </div>
        <span className="text-[15px] font-medium" style={{ color: selected ? 'white' : 'rgba(255,255,255,0.6)' }}>
          {children}
        </span>
      </div>
    </button>
  );
}

export function QuoteCalculator() {
  const [step, setStep] = useState<Step>(1);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedAlan, setSelectedAlan] = useState('');
  const [selectedSure, setSelectedSure] = useState('');

  const toggleService = (id: string) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const calculateEstimate = () => {
    const baseTotal = selectedServices.reduce((sum, id) => {
      const svc = serviceOptions.find((s) => s.id === id);
      return sum + (svc?.base || 0);
    }, 0);

    const alan = alanOptions.find((a) => a.id === selectedAlan);
    const sure = sureOptions.find((s) => s.id === selectedSure);

    const alanMult = alan?.multiplier || 1;
    const sureMult = sure?.multiplier || 1;

    const low = Math.round((baseTotal * alanMult * sureMult) / 1000) * 1000;
    const high = Math.round((low * 1.3) / 1000) * 1000;

    return { low, high };
  };

  const formatPrice = (n: number) =>
    new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(n);

  const estimate = step === 4 ? calculateEstimate() : null;

  return (
    <section className="w-full py-12 pb-24 bg-[#04090F]">
      <div className="max-w-[680px] mx-auto px-5 sm:px-8">

        {/* Progress */}
        <div className="flex items-center gap-2 mb-10">
          {([1, 2, 3] as const).map((s) => (
            <div key={s} className="flex items-center gap-2 flex-1">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-bold transition-all duration-300 shrink-0"
                style={{
                  background: step >= s ? 'linear-gradient(135deg, #D4AF37, #A07830)' : 'rgba(255,255,255,0.05)',
                  color: step >= s ? 'black' : 'rgba(255,255,255,0.3)',
                }}
              >
                {step > s ? <CheckCircle2 size={16} /> : s}
              </div>
              {s < 3 && (
                <div className="flex-1 h-[2px] rounded-full" style={{ background: step > s ? 'rgba(212,175,55,0.5)' : 'rgba(255,255,255,0.06)' }} />
              )}
            </div>
          ))}
        </div>

        {/* Step 1 */}
        {step === 1 && (
          <div>
            <h2 className="text-2xl font-serif font-semibold text-white mb-2">Hangi hizmetlere ihtiyacınız var?</h2>
            <p className="text-white/40 text-[14px] mb-7 font-light">Birden fazla seçebilirsiniz.</p>
            <div className="flex flex-col gap-3">
              {serviceOptions.map((svc) => (
                <OptionCard
                  key={svc.id}
                  selected={selectedServices.includes(svc.id)}
                  onClick={() => toggleService(svc.id)}
                >
                  {svc.label}
                </OptionCard>
              ))}
            </div>
            <button
              onClick={() => setStep(2)}
              disabled={selectedServices.length === 0}
              className="mt-8 w-full h-[52px] rounded-full font-semibold text-[15px] text-black flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-30 group"
              style={{ background: 'linear-gradient(135deg, #D4AF37, #F5D78B, #A07830)' }}
            >
              Devam Et <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div>
            <h2 className="text-2xl font-serif font-semibold text-white mb-2">Tesisinizin büyüklüğü nedir?</h2>
            <p className="text-white/40 text-[14px] mb-7 font-light">Toplam kullanım alanını seçin.</p>
            <div className="flex flex-col gap-3">
              {alanOptions.map((opt) => (
                <OptionCard key={opt.id} selected={selectedAlan === opt.id} onClick={() => setSelectedAlan(opt.id)}>
                  {opt.label}
                </OptionCard>
              ))}
            </div>
            <div className="flex gap-3 mt-8">
              <button onClick={() => setStep(1)} className="flex items-center gap-2 px-6 h-[52px] rounded-full glass-panel text-white/70 hover:text-white transition-colors font-medium">
                <ArrowLeft size={16} /> Geri
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={!selectedAlan}
                className="flex-1 h-[52px] rounded-full font-semibold text-[15px] text-black flex items-center justify-center gap-2 disabled:opacity-30 group transition-all"
                style={{ background: 'linear-gradient(135deg, #D4AF37, #F5D78B, #A07830)' }}
              >
                Devam Et <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <div>
            <h2 className="text-2xl font-serif font-semibold text-white mb-2">Hizmet süreniz ne kadar?</h2>
            <p className="text-white/40 text-[14px] mb-7 font-light">Uzun süreli sözleşmelerde ciddi indirim uygulanır.</p>
            <div className="flex flex-col gap-3">
              {sureOptions.map((opt) => (
                <OptionCard key={opt.id} selected={selectedSure === opt.id} onClick={() => setSelectedSure(opt.id)}>
                  {opt.label}
                </OptionCard>
              ))}
            </div>
            <div className="flex gap-3 mt-8">
              <button onClick={() => setStep(2)} className="flex items-center gap-2 px-6 h-[52px] rounded-full glass-panel text-white/70 hover:text-white transition-colors font-medium">
                <ArrowLeft size={16} /> Geri
              </button>
              <button
                onClick={() => setStep(4)}
                disabled={!selectedSure}
                className="flex-1 h-[52px] rounded-full font-semibold text-[15px] text-black flex items-center justify-center gap-2 disabled:opacity-30 group transition-all"
                style={{ background: 'linear-gradient(135deg, #D4AF37, #F5D78B, #A07830)' }}
              >
                Tahmini Hesapla <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        )}

        {/* Step 4 — Result */}
        {step === 4 && estimate && (
          <div className="text-center">
            <div className="glass-panel rounded-[28px] p-8 mb-6 relative overflow-hidden"
              style={{ borderColor: 'rgba(212,175,55,0.25)' }}>
              <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-64 h-32 blur-3xl opacity-20 pointer-events-none"
                style={{ background: '#D4AF37' }} />
              <p className="text-white/50 text-[13px] uppercase tracking-widest font-semibold mb-3">Aylık Tahmini Bütçe</p>
              <div className="text-4xl sm:text-5xl font-bold text-white mb-1 tracking-tight">
                <span className="gold-text">{formatPrice(estimate.low)}</span>
              </div>
              <p className="text-white/35 text-[14px]">— {formatPrice(estimate.high)} aralığında</p>

              <div className="mt-6 pt-5 border-t border-white/[0.06] flex flex-wrap gap-2 justify-center">
                {selectedServices.map((id) => {
                  const svc = serviceOptions.find((s) => s.id === id);
                  return svc ? (
                    <span key={id} className="text-[11px] px-3 py-1 rounded-full font-medium"
                      style={{ background: 'rgba(212,175,55,0.1)', color: '#D4AF37', border: '1px solid rgba(212,175,55,0.2)' }}>
                      {svc.label}
                    </span>
                  ) : null;
                })}
              </div>
            </div>

            <p className="text-white/35 text-[13px] mb-7 leading-relaxed font-light">
              Bu tahmini fiyat bilgi amaçlıdır. Kesin teklif için ekibimiz sizinle iletişime geçecektir.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/iletisim"
                className="flex-1 flex items-center justify-center gap-2 h-[52px] rounded-full font-semibold text-[15px] text-black group"
                style={{ background: 'linear-gradient(135deg, #D4AF37, #F5D78B, #A07830)' }}>
                Kesin Teklif Al <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <a href="tel:+905305980772"
                className="flex-1 flex items-center justify-center gap-2 h-[52px] rounded-full glass-panel text-white font-medium hover:bg-white/[0.08] transition-colors">
                <Phone size={16} className="text-gold-400" />
                Hemen Ara
              </a>
            </div>

            <button onClick={() => { setStep(1); setSelectedServices([]); setSelectedAlan(''); setSelectedSure(''); }}
              className="mt-4 text-white/30 hover:text-white text-[13px] transition-colors font-medium">
              Yeniden Hesapla
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
