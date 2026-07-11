'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowRight } from 'lucide-react';

const navLinks = [
  { name: 'Ana Sayfa', href: '/' },
  { name: 'Hakkımızda', href: '/hakkimizda' },
  { name: 'Hizmetler', href: '/hizmetler' },
  { name: 'S.S.S.', href: '/sss' },
  { name: 'İletişim', href: '/iletisim' },
  { name: 'Teklif Hesapla', href: '/teklif-hesapla' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setIsScrolled(y > 20);
      if (y > 100) {
        setIsVisible(y <= lastScrollY || isMobileMenuOpen);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(y);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, isMobileMenuOpen]);

  // Lock body scroll when menu open — prevents page width issues
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.width = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.width = '';
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 50,
          transform: isVisible ? 'translateY(0)' : 'translateY(-110%)',
          transition: 'transform 0.5s ease, background 0.3s ease',
          height: isScrolled ? '64px' : '80px',
          display: 'flex',
          alignItems: 'center',
          padding: '0 20px',
          background: isScrolled ? 'rgba(7,17,31,0.92)' : 'transparent',
          backdropFilter: isScrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: isScrolled ? 'blur(20px)' : 'none',
          borderBottom: isScrolled ? '1px solid rgba(255,255,255,0.04)' : 'none',
        }}
      >
        <div style={{ maxWidth: '1440px', width: '100%', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo */}
          <Link href="/">
            <Image
              src="/logo.png"
              alt="NEW GLOBAL GROUP"
              width={180}
              height={72}
              priority
              style={{
                height: isScrolled ? '40px' : '52px',
                width: 'auto',
                objectFit: 'contain',
                transition: 'height 0.3s ease',
              }}
            />
          </Link>

          {/* Desktop Nav */}
          <nav style={{ display: 'none', gap: '40px', fontSize: '14px', fontWeight: 500, color: 'rgba(255,255,255,0.6)' }}
            className="lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{ color: pathname === link.href ? 'white' : undefined, position: 'relative', padding: '8px 0' }}
                className="hover:text-white transition-colors duration-300"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex">
            <Link
              href="/iletisim"
              className="flex items-center gap-2 h-[44px] px-6 bg-gold-400 text-black rounded-full text-[14px] font-semibold hover:bg-gold-300 transition-colors group"
            >
              Teklif Al
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Hamburger */}
          <button
            className="lg:hidden text-white/80 hover:text-white transition-colors"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Menüyü aç"
            style={{ padding: '8px' }}
          >
            <Menu size={26} strokeWidth={1.5} />
          </button>
        </div>
      </header>

      {/* Mobile Menu — rendered as portal-like overlay, does NOT affect page width */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            onClick={() => setIsMobileMenuOpen(false)}
            style={{
              position: 'fixed', inset: 0,
              background: 'rgba(0,0,0,0.65)',
              backdropFilter: 'blur(4px)',
              zIndex: 60,
              animation: 'fadeIn 0.25s ease',
            }}
          />

          {/* Sidebar — only rendered when open so it never creates width overflow */}
          <div
            style={{
              position: 'fixed',
              top: 0, right: 0, bottom: 0,
              width: '280px',
              maxWidth: '85vw',
              background: 'rgba(8,15,25,0.97)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              borderLeft: '1px solid rgba(255,255,255,0.06)',
              zIndex: 70,
              display: 'flex',
              flexDirection: 'column',
              padding: '28px 24px',
              animation: 'slideIn 0.35s cubic-bezier(0.22,1,0.36,1)',
            }}
          >
            {/* Header row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
              <Image src="/logo.png" alt="NEW GLOBAL GROUP" width={120} height={48}
                style={{ height: '48px', width: 'auto', objectFit: 'contain', opacity: 0.9 }} />
              <button onClick={() => setIsMobileMenuOpen(false)}
                style={{ color: 'rgba(255,255,255,0.5)', padding: '8px' }}
                className="hover:text-white transition-colors">
                <X size={26} strokeWidth={1.5} />
              </button>
            </div>

            {/* Nav links */}
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    fontSize: '16px',
                    fontWeight: 600,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    padding: '14px 16px',
                    borderRadius: '12px',
                    color: pathname === link.href ? '#D4AF37' : 'rgba(255,255,255,0.65)',
                    background: pathname === link.href ? 'rgba(212,175,55,0.08)' : 'transparent',
                    transition: 'all 0.2s ease',
                    display: 'block',
                  }}
                  className="hover:text-white hover:bg-white/5"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* CTA */}
            <Link
              href="/iletisim"
              onClick={() => setIsMobileMenuOpen(false)}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                height: '52px', borderRadius: '999px',
                background: 'linear-gradient(135deg, #D4AF37, #F5D78B, #A07830)',
                color: 'black', fontWeight: 700, fontSize: '15px',
              }}
            >
              Teklif Al <ArrowRight size={17} />
            </Link>
          </div>
        </>
      )}

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </>
  );
}
