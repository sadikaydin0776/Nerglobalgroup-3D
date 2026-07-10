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
    // Simulate loading progress
    let current = 0;
    const interval = setInterval(() => {
      current += Math.random() * 18 + 5;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setProgress(100);
        setTimeout(() => setPhase('reveal'), 400);
        setTimeout(() => {
          setPhase('done');
          onComplete();
        }, 1400);
      } else {
        setProgress(Math.floor(current));
      }
    }, 80);

    return () => clearInterval(interval);
  }, [onComplete]);

  if (phase === 'done') return null;

  return (
    <div
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#04090F]"
      style={{
        transition: phase === 'reveal' ? 'opacity 0.8s ease 0.5s, transform 0.8s cubic-bezier(0.22,1,0.36,1) 0.3s' : 'none',
        opacity: phase === 'reveal' ? 0 : 1,
        transform: phase === 'reveal' ? 'scale(1.04)' : 'scale(1)',
        pointerEvents: phase === 'reveal' ? 'none' : 'all',
      }}
    >
      {/* Background subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(212,175,55,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(212,175,55,1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center gap-10">
        {/* Logo */}
        <div
          style={{
            opacity: progress > 5 ? 1 : 0,
            transform: progress > 5 ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease',
          }}
        >
          <Image
            src="/logo.png"
            alt="NEW GLOBAL GROUP"
            width={220}
            height={88}
            className="h-20 w-auto object-contain"
            priority
          />
        </div>

        {/* Progress bar */}
        <div className="flex flex-col items-center gap-4 w-[260px]">
          <div className="w-full h-[1px] bg-white/[0.06] rounded-full overflow-hidden">
            <div
              ref={barRef}
              className="h-full rounded-full"
              style={{
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #A07830, #D4AF37, #F5D78B)',
                transition: 'width 0.15s ease',
                boxShadow: '0 0 12px rgba(212,175,55,0.6)',
              }}
            />
          </div>
          <div className="flex justify-between w-full">
            <span className="text-[11px] text-white/20 uppercase tracking-[0.3em] font-medium">
              Yükleniyor
            </span>
            <span className="text-[11px] font-mono text-gold-400">
              {String(progress).padStart(2, '0')}%
            </span>
          </div>
        </div>
      </div>

      {/* Bottom brand line */}
      <div
        className="absolute bottom-10 left-0 right-0 flex justify-center"
        style={{
          opacity: progress > 20 ? 0.3 : 0,
          transition: 'opacity 0.8s ease',
        }}
      >
        <p className="text-[10px] tracking-[0.5em] uppercase text-white/40 font-medium">
          NEW GLOBAL GROUP &mdash; EST. 2004
        </p>
      </div>
    </div>
  );
}
