'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, X, Phone } from 'lucide-react';

export function FloatingCTA() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 600 && !dismissed) {
        setVisible(true);
      } else if (window.scrollY <= 600) {
        setVisible(false);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [dismissed]);

  if (dismissed) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '100px',
        left: '50%',
        transform: visible
          ? 'translateX(-50%) translateY(0)'
          : 'translateX(-50%) translateY(120px)',
        transition: 'transform 0.5s cubic-bezier(0.34,1.56,0.64,1)',
        zIndex: 9980,
        pointerEvents: visible ? 'all' : 'none',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          background: 'rgba(7,17,31,0.92)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(212,175,55,0.25)',
          borderRadius: '999px',
          padding: '10px 10px 10px 20px',
          boxShadow: '0 8px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(212,175,55,0.1)',
        }}
      >
        {/* Phone */}
        <a
          href="tel:+905305980772"
          style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(255,255,255,0.7)', fontSize: '13px', fontWeight: 500, whiteSpace: 'nowrap' }}
          className="hover:text-white transition-colors"
        >
          <Phone size={14} style={{ color: '#D4AF37' }} />
          <span className="hidden sm:inline">+90 530 598 07 72</span>
          <span className="sm:hidden">Ara</span>
        </a>

        {/* Divider */}
        <div style={{ width: '1px', height: '20px', background: 'rgba(255,255,255,0.1)' }} />

        {/* CTA Button */}
        <Link
          href="/iletisim"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '0 20px',
            height: '40px',
            borderRadius: '999px',
            background: 'linear-gradient(135deg, #D4AF37, #F5D78B, #A07830)',
            color: 'black',
            fontWeight: 700,
            fontSize: '13px',
            whiteSpace: 'nowrap',
          }}
          className="hover:opacity-90 transition-opacity"
        >
          Ücretsiz Teklif Al
          <ArrowRight size={14} />
        </Link>

        {/* Dismiss */}
        <button
          onClick={() => { setDismissed(true); setVisible(false); }}
          style={{ color: 'rgba(255,255,255,0.3)', padding: '4px', marginLeft: '-4px' }}
          className="hover:text-white transition-colors"
          aria-label="Kapat"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
