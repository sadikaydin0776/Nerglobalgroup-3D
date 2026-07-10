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
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 20);
      if (currentScrollY > 100) {
        if (currentScrollY > lastScrollY && !isMobileMenuOpen) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, isMobileMenuOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        style={{
          transform: isVisible ? 'translateY(0)' : 'translateY(-110%)',
          transition: 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1), background 0.4s ease, height 0.4s ease',
        }}
        className={`fixed top-0 left-0 right-0 z-50 flex items-center px-6 md:px-10 lg:px-16 w-full ${
          isScrolled
            ? 'h-[80px] bg-[rgba(7,17,31,0.75)] backdrop-blur-2xl border-b border-white/[0.04] shadow-[0_8px_30px_rgba(0,0,0,0.2)]'
            : 'h-[110px] bg-transparent'
        }`}
      >
        <div className="max-w-[1440px] w-full mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center transition-transform duration-300 hover:scale-[1.02]"
          >
            <Image
              src="/logo.png"
              alt="NEW GLOBAL GROUP"
              width={200}
              height={80}
              priority
              className={`w-auto object-contain transition-all duration-500 ${
                isScrolled ? 'h-20 md:h-24' : 'h-28 md:h-32 lg:h-36'
              }`}
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-10 text-[14px] font-medium text-white/60">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative py-2 transition-colors duration-300 hover:text-white group ${
                  pathname === link.href ? 'text-white' : ''
                }`}
              >
                {link.name}
                <span
                  className={`absolute -bottom-1 left-1/2 -translate-x-1/2 h-[2px] rounded-full bg-gold-400 transition-all duration-500 ${
                    pathname === link.href ? 'w-4' : 'w-0 group-hover:w-full'
                  }`}
                />
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/iletisim"
              className="flex items-center gap-2 h-[44px] px-6 bg-gold-400 text-black rounded-full text-[14px] font-semibold transition-all duration-300 hover:bg-gold-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:scale-[1.02] group"
            >
              Teklif Al
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden text-white/80 hover:text-white transition-colors"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Menüyü aç"
          >
            <Menu size={28} strokeWidth={1.5} />
          </button>
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          onClick={() => setIsMobileMenuOpen(false)}
          style={{ animation: 'fadeIn 0.3s ease' }}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 bottom-0 w-[300px] bg-[rgba(10,18,30,0.95)] backdrop-blur-3xl border-l border-white/[0.06] shadow-2xl z-[70] p-8 flex flex-col transition-transform duration-500`}
        style={{
          transform: isMobileMenuOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        <div className="flex justify-between items-center mb-12">
          <Image
            src="/logo.png"
            alt="NEW GLOBAL GROUP"
            width={120}
            height={48}
            className="h-16 w-auto object-contain opacity-90"
          />
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-white/50 hover:text-white transition-colors"
            aria-label="Menüyü kapat"
          >
            <X size={28} strokeWidth={1.5} />
          </button>
        </div>

        <nav className="flex flex-col gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-[16px] font-medium tracking-wide uppercase transition-colors duration-300 ${
                pathname === link.href
                  ? 'text-gold-400'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="mt-auto">
          <Link
            href="/iletisim"
            className="flex items-center justify-center gap-2 w-full h-[56px] bg-gold-400 text-black rounded-full font-semibold hover:bg-gold-300 transition-all duration-300 group"
          >
            Teklif Al
            <ArrowRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </>
  );
}
