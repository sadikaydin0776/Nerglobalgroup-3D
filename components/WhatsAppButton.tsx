'use client';

import { useState, useEffect } from 'react';

export function WhatsAppButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <a
      href="https://wa.me/905305980772?text=Say%C4%B1n%20NEW%20GLOBAL%20GROUP%20Yetkilileri%2C%0A%0AWeb%20siteniz%20%C3%BCzerinden%20ileti%C5%9Fime%20ge%C3%A7iyorum.%20G%C3%BCvenlik%2C%20tesis%20y%C3%B6netimi%20ve%20profesyonel%20hizmetleriniz%20hakk%C4%B1nda%20detayl%C4%B1%20bilgi%20almak%20ve%20i%C5%9Fletmemize%20%C3%B6zel%20bir%20teklif%20g%C3%B6r%C3%BC%C5%9Fmesi%20ger%C3%A7ekle%C5%9Ftirmek%20istiyorum.%0A%0A%C4%B0lginiz%20i%C3%A7in%20%C5%9Fimdiden%20te%C5%9Fekk%C3%BCr%20ederim.%0ASayg%C4%B1lar%C4%B1mla."
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp ile iletişime geç"
      className="group"
      style={{
        position: 'fixed',
        bottom: '28px',
        right: '28px',
        zIndex: 9990,
        opacity: visible ? 1 : 0,
        transform: visible ? 'scale(1) translateY(0)' : 'scale(0.5) translateY(20px)',
        transition: 'opacity 0.5s ease, transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
      }}
    >
      {/* Pulse ring */}
      <span
        className="absolute inset-0 rounded-full"
        style={{
          background: 'rgba(37, 211, 102, 0.3)',
          animation: 'waPulse 2.5s ease-out infinite',
        }}
      />

      {/* Main button */}
      <span
        className="relative flex items-center justify-center w-[58px] h-[58px] rounded-full shadow-[0_8px_30px_rgba(37,211,102,0.35)]"
        style={{
          background: 'linear-gradient(135deg, #25D366, #128C7E)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        }}
      >
        <svg
          className="w-6 h-6"
          viewBox="0 0 24 24"
          fill="white"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
        </svg>
      </span>

      <style jsx>{`
        @keyframes waPulse {
          0% { transform: scale(1); opacity: 0.6; }
          70% { transform: scale(1.7); opacity: 0; }
          100% { transform: scale(1.7); opacity: 0; }
        }
        a:hover span:last-child {
          transform: scale(1.1);
          box-shadow: 0 12px 40px rgba(37, 211, 102, 0.5);
        }
      `}</style>
    </a>
  );
}
