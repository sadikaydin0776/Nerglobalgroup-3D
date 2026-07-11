'use client';

import { useEffect, useRef } from 'react';

interface RevealSectionProps {
  children: React.ReactNode;
  direction?: 'up' | 'left' | 'right';
  delay?: number;
  className?: string;
}

export function RevealSection({
  children,
  direction = 'up',
  delay = 0,
  className = '',
}: RevealSectionProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const dirClass =
      direction === 'left'
        ? 'reveal-from-left'
        : direction === 'right'
        ? 'reveal-from-right'
        : '';

    el.classList.add('reveal-hidden');
    if (dirClass) el.classList.add(dirClass);
    if (delay) el.style.transitionDelay = `${delay}ms`;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('reveal-visible');
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [direction, delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
