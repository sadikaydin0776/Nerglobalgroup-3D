'use client';

import { useEffect, useState } from 'react';
import { Eye } from 'lucide-react';

export function VisitorBadge() {
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(false);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    // Show after 4 seconds
    const showTimer = setTimeout(() => {
      const initial = Math.floor(Math.random() * 5) + 3; // 3–7
      setCount(initial);
      setVisible(true);
    }, 4000);

    return () => clearTimeout(showTimer);
  }, []);

  useEffect(() => {
    if (!visible) return;

    // Change count every 25–55 seconds
    const changeCount = () => {
      const delta = Math.random() < 0.4 ? -1 : 1; // 40% chance decrease
      setCount((prev) => {
        const next = prev + delta;
        return Math.min(12, Math.max(2, next));
      });
      setPulse(true);
      setTimeout(() => setPulse(false), 600);
    };

    const interval = setInterval(changeCount, Math.random() * 30000 + 25000);
    return () => clearInterval(interval);
  }, [visible]);

  if (!visible || count <= 0) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: '88px',
        right: '16px',
        zIndex: 9960,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateX(0)' : 'translateX(60px)',
        transition: 'opacity 0.5s ease, transform 0.5s cubic-bezier(0.34,1.56,0.64,1)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '7px',
          padding: '7px 13px 7px 10px',
          borderRadius: '999px',
          background: 'rgba(7,17,31,0.88)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(255,255,255,0.07)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
        }}
      >
        {/* Live dot */}
        <span
          style={{
            width: '7px',
            height: '7px',
            borderRadius: '50%',
            background: '#10B981',
            boxShadow: '0 0 0 2px rgba(16,185,129,0.3)',
            animation: 'livePulse 2s ease-in-out infinite',
            flexShrink: 0,
          }}
        />

        {/* Eye icon */}
        <Eye size={12} style={{ color: 'rgba(255,255,255,0.4)', flexShrink: 0 }} />

        {/* Count */}
        <span
          style={{
            fontSize: '12px',
            fontWeight: 600,
            color: pulse ? '#D4AF37' : 'rgba(255,255,255,0.65)',
            transition: 'color 0.4s ease',
            letterSpacing: '-0.01em',
            lineHeight: 1,
          }}
        >
          <span
            style={{
              display: 'inline-block',
              transform: pulse ? 'scale(1.25)' : 'scale(1)',
              transition: 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1)',
            }}
          >
            {count}
          </span>
          <span style={{ color: 'rgba(255,255,255,0.35)', fontWeight: 400 }}>
            {' '}kişi bakıyor
          </span>
        </span>
      </div>

      <style jsx>{`
        @keyframes livePulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(0.85); }
        }
      `}</style>
    </div>
  );
}
