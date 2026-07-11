'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { X, Share, Plus } from 'lucide-react';

type Platform = 'android' | 'ios' | null;

export function InstallBanner() {
  const [platform, setPlatform] = useState<Platform>(null);
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    // Check if already installed or dismissed
    if (
      window.matchMedia('(display-mode: standalone)').matches ||
      localStorage.getItem('pwa-dismissed')
    ) return;

    const ua = navigator.userAgent;
    const isIOS = /iPad|iPhone|iPod/.test(ua) && !(window as any).MSStream;
    const isAndroid = /Android/.test(ua);

    // Android: listen for beforeinstallprompt
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setPlatform('android');
      setTimeout(() => setVisible(true), 3000);
    };

    window.addEventListener('beforeinstallprompt', handler);

    // iOS: show manual instruction
    if (isIOS && !isAndroid) {
      setPlatform('ios');
      setTimeout(() => setVisible(true), 3000);
    }

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleDismiss = () => {
    setVisible(false);
    setDismissed(true);
    localStorage.setItem('pwa-dismissed', '1');
  };

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') handleDismiss();
    }
  };

  if (!platform || dismissed) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9970,
        transform: visible ? 'translateY(0)' : 'translateY(100%)',
        transition: 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1)',
      }}
    >
      <div
        style={{
          margin: '0 12px 12px',
          borderRadius: '20px',
          background: 'rgba(7,17,31,0.96)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(212,175,55,0.2)',
          padding: '16px',
          boxShadow: '0 -4px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(212,175,55,0.08)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Logo */}
          <Image
            src="/logo.png"
            alt="NEW GLOBAL GROUP"
            width={48}
            height={48}
            style={{ width: '48px', height: '48px', objectFit: 'contain', borderRadius: '12px', background: 'rgba(255,255,255,0.04)', padding: '4px' }}
          />

          {/* Text */}
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: '13px', fontWeight: 700, color: 'white', marginBottom: '2px' }}>
              Ana Ekrana Ekle
            </p>
            {platform === 'ios' ? (
              <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.4 }}>
                <Share size={10} style={{ display: 'inline', marginRight: '3px' }} />
                Paylaş → "Ana Ekrana Ekle" seç
              </p>
            ) : (
              <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.4 }}>
                Uygulama gibi kullan, internet bağlantısı gerekmez
              </p>
            )}
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            {platform === 'android' && (
              <button
                onClick={handleInstall}
                style={{
                  height: '36px',
                  padding: '0 16px',
                  borderRadius: '999px',
                  background: 'linear-gradient(135deg, #D4AF37, #F5D78B, #A07830)',
                  color: 'black',
                  fontWeight: 700,
                  fontSize: '12px',
                  border: 'none',
                  whiteSpace: 'nowrap',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <Plus size={13} />
                Ekle
              </button>
            )}
            <button
              onClick={handleDismiss}
              style={{ color: 'rgba(255,255,255,0.3)', padding: '6px' }}
              aria-label="Kapat"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* iOS visual instruction */}
        {platform === 'ios' && visible && (
          <div style={{
            marginTop: '10px',
            padding: '10px 14px',
            borderRadius: '12px',
            background: 'rgba(212,175,55,0.08)',
            border: '1px solid rgba(212,175,55,0.15)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'rgba(255,255,255,0.55)' }}>
              <span>1.</span>
              <Share size={14} style={{ color: '#D4AF37' }} />
              <span>Paylaş butonuna bas</span>
            </div>
            <div style={{ width: '1px', height: '16px', background: 'rgba(255,255,255,0.1)' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'rgba(255,255,255,0.55)' }}>
              <span>2.</span>
              <Plus size={14} style={{ color: '#D4AF37' }} />
              <span>"Ana Ekrana Ekle"</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
