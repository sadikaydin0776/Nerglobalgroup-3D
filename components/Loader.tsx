'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

interface LoaderProps {
  onComplete: () => void;
}

export function Loader({ onComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'loading' | 'reveal' | 'done'>('loading');
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += Math.random() * 18 + 5;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setProgress(100);
        setTimeout(() => setPhase('reveal'), 400);
        setTimeout(() => { setPhase('done'); onComplete(); }, 1200);
      } else {
        setProgress(Math.floor(current));
      }
    }, 80);
    return () => clearInterval(interval);
  }, [onComplete]);

  if (phase === 'done') return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
        zIndex: 99999,
        backgroundColor: '#04090F',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: phase === 'reveal' ? 0 : 1,
        transition: phase === 'reveal' ? 'opacity 0.8s ease' : 'none',
        pointerEvents: phase === 'reveal' ? 'none' : 'all',
      }}
    >
      {/* Gold grid */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.03,
        backgroundImage: 'linear-gradient(rgba(212,175,55,1) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,1) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />

      {/* Center content */}
      <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '32px', padding: '0 24px', width: '100%', maxWidth: '320px' }}>
        {/* Logo */}
        <div style={{
          opacity: progress > 5 ? 1 : 0,
          transform: progress > 5 ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.8s ease, transform 0.8s ease',
        }}>
          <Image
            src="/logo.png"
            alt="NEW GLOBAL GROUP"
            width={280}
            height={112}
            priority
            style={{ width: 'auto', height: '96px', objectFit: 'contain' }}
          />
        </div>

        {/* Progress bar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
          <div style={{ width: '100%', height: '1px', backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: '4px', overflow: 'hidden' }}>
            <div ref={barRef} style={{
              height: '100%', borderRadius: '4px',
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #A07830, #D4AF37, #F5D78B)',
              transition: 'width 0.15s ease',
              boxShadow: '0 0 12px rgba(212,175,55,0.6)',
            }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase', letterSpacing: '0.3em', fontWeight: 500 }}>
              Yükleniyor
            </span>
            <span style={{ fontSize: '11px', fontFamily: 'monospace', color: '#D4AF37' }}>
              {String(progress).padStart(2, '0')}%
            </span>
          </div>
        </div>
      </div>

      {/* Bottom brand */}
      <div style={{
        position: 'absolute', bottom: '32px', left: 0, right: 0,
        display: 'flex', justifyContent: 'center',
        opacity: progress > 20 ? 0.3 : 0, transition: 'opacity 0.8s ease',
      }}>
        <p style={{ fontSize: '9px', letterSpacing: '0.5em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', fontWeight: 500 }}>
          NEW GLOBAL GROUP &mdash; EST. 2004
        </p>
      </div>
    </div>
  );
}
