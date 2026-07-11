'use client';

import { useEffect, useRef } from 'react';

export default function Template({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    // Force reflow then add visible class
    ref.current.style.opacity = '0';
    ref.current.style.transform = 'translateY(12px)';

    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (!ref.current) return;
        ref.current.style.transition = 'opacity 0.45s ease, transform 0.45s cubic-bezier(0.22,1,0.36,1)';
        ref.current.style.opacity = '1';
        ref.current.style.transform = 'translateY(0)';
      });
    });

    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div ref={ref} style={{ opacity: 0 }}>
      {children}
    </div>
  );
}
