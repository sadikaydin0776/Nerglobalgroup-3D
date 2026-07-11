'use client';

import { useEffect, useRef, useState } from 'react';

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });
  const glow = useRef({ x: -100, y: -100 });
  const rafRef = useRef<number>(0);
  const [cursorText, setCursorText] = useState('');
  const [isHover, setIsHover] = useState(false);
  const [isClick, setIsClick] = useState(false);

  useEffect(() => {
    // Touch devices — hide custom cursor completely
    if (window.matchMedia('(pointer: coarse)').matches) {
      if (dotRef.current) dotRef.current.style.display = 'none';
      if (ringRef.current) ringRef.current.style.display = 'none';
      if (glowRef.current) glowRef.current.style.display = 'none';
      return;
    }

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    const onDown = () => setIsClick(true);
    const onUp = () => setIsClick(false);

    // Add hover detection for interactive elements
    const addHover = () => {
      document.querySelectorAll('a, button, [data-cursor]').forEach((el) => {
        el.addEventListener('mouseenter', () => {
          setIsHover(true);
          const text = (el as HTMLElement).dataset.cursor || '';
          setCursorText(text);
        });
        el.addEventListener('mouseleave', () => {
          setIsHover(false);
          setCursorText('');
        });
      });
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);

    // Initial setup + re-check on DOM changes
    addHover();
    const observer = new MutationObserver(addHover);
    observer.observe(document.body, { childList: true, subtree: true });

    const animate = () => {
      // Dot: instant
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x - 5}px, ${pos.current.y - 5}px)`;
      }

      // Ring: smooth lag
      ring.current.x += (pos.current.x - ring.current.x) * 0.12;
      ring.current.y += (pos.current.y - ring.current.y) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x - 20}px, ${ring.current.y - 20}px)`;
      }

      // Text follows ring
      if (textRef.current) {
        textRef.current.style.transform = `translate(${ring.current.x - 32}px, ${ring.current.y - 32}px)`;
      }

      // Glow: very smooth lag
      glow.current.x += (pos.current.x - glow.current.x) * 0.06;
      glow.current.y += (pos.current.y - glow.current.y) * 0.06;
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${glow.current.x - 250}px, ${glow.current.y - 250}px)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      observer.disconnect();
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      {/* Large ambient glow */}
      <div
        ref={glowRef}
        className="fixed top-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none z-[9996]"
        style={{
          background: 'radial-gradient(circle, rgba(212,175,55,0.055) 0%, rgba(212,175,55,0.015) 40%, transparent 70%)',
          willChange: 'transform',
        }}
      />

      {/* Outer ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-10 h-10 rounded-full pointer-events-none z-[9997]"
        style={{
          border: isHover ? '1.5px solid rgba(212,175,55,0.8)' : '1px solid rgba(255,255,255,0.25)',
          transform: isHover ? 'scale(1.8)' : 'scale(1)',
          transition: 'border-color 0.3s ease, transform 0.35s cubic-bezier(0.34,1.56,0.64,1), width 0.3s ease, height 0.3s ease',
          willChange: 'transform',
          width: isHover ? '48px' : '40px',
          height: isHover ? '48px' : '40px',
          marginLeft: isHover ? '-4px' : '0',
          marginTop: isHover ? '-4px' : '0',
          boxShadow: isHover ? '0 0 20px rgba(212,175,55,0.2)' : 'none',
        }}
      />

      {/* Cursor text on hover */}
      {cursorText && (
        <div
          ref={textRef}
          className="fixed top-0 left-0 w-16 h-16 rounded-full pointer-events-none z-[9997] flex items-center justify-center"
          style={{ willChange: 'transform' }}
        >
          <span className="text-[9px] font-semibold tracking-widest text-gold-400 uppercase">
            {cursorText}
          </span>
        </div>
      )}

      {/* Sharp gold dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-[10px] h-[10px] rounded-full pointer-events-none z-[9998]"
        style={{
          background: '#D4AF37',
          boxShadow: '0 0 10px rgba(212,175,55,0.9)',
          willChange: 'transform',
          transition: isClick ? 'transform 0.1s ease' : 'none',
          transform: isClick ? 'scale(0.5)' : 'scale(1)',
        }}
      />
    </>
  );
}
