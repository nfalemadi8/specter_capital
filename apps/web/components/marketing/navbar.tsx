'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils/cn';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Platform', href: '/platform' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Security', href: '/security' },
  { label: 'About', href: '/about' },
  { label: 'FAQ', href: '/faq' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-[#0a0e17]/90 backdrop-blur-xl border-b border-[#1e293b]/60'
          : 'bg-transparent'
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="relative h-8 w-8">
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-[#c9a55a] to-[#d4b876]" />
              <div className="absolute inset-[2px] rounded-[6px] bg-[#0a0e17] flex items-center justify-center">
                <span className="text-sm font-bold text-[#c9a55a] font-mono">P</span>
              </div>
            </div>
            <span className="text-lg font-semibold tracking-tight">
              <span className="text-[#e8e0d0]">Phantom</span>{' '}
              <span className="text-[#c9a55a]">Treasury</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm text-[#8a919e] hover:text-[#e8e0d0] transition-colors rounded-lg hover:bg-white/[0.03]"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/signin"
              className="px-4 py-2 text-sm text-[#8a919e] hover:text-[#e8e0d0] transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="px-5 py-2 text-sm font-medium text-[#0a0e17] bg-[#c9a55a] rounded-lg hover:bg-[#d4b876] transition-colors"
            >
              Request Access
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-[#8a919e] hover:text-[#e8e0d0]"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#0f1423]/95 backdrop-blur-xl border-b border-[#1e293b]">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-2.5 text-sm text-[#8a919e] hover:text-[#e8e0d0] hover:bg-white/[0.03] rounded-lg transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-[#1e293b] space-y-2">
              <Link
                href="/signin"
                className="block px-3 py-2.5 text-sm text-[#8a919e] hover:text-[#e8e0d0]"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="block px-3 py-2.5 text-sm font-medium text-center text-[#0a0e17] bg-[#c9a55a] rounded-lg hover:bg-[#d4b876]"
              >
                Request Access
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
