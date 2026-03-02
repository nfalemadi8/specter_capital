'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils/cn';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Platform', href: '/platform' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Integrations', href: '/integrations' },
  { label: 'Security', href: '/security' },
  { label: 'About', href: '/about' },
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
          ? 'bg-[#0a0e17]/90 backdrop-blur-xl border-b border-[#1e293b]'
          : 'bg-transparent'
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="relative h-8 w-8">
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-[#22d3ee] to-[#a78bfa]" />
              <div className="absolute inset-[2px] rounded-[6px] bg-[#0a0e17] flex items-center justify-center">
                <span className="text-sm font-bold text-[#22d3ee] font-mono">S</span>
              </div>
            </div>
            <span className="text-lg font-bold text-white tracking-tight">
              Specter
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm text-[#94a3b8] hover:text-white transition-colors rounded-lg hover:bg-white/5"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/login"
              className="px-4 py-2 text-sm text-[#94a3b8] hover:text-white transition-colors"
            >
              Sign in
            </Link>
            <Link
              href="/register"
              className="px-4 py-2 text-sm font-medium text-[#0a0e17] bg-gradient-to-r from-[#22d3ee] to-[#a78bfa] rounded-lg hover:opacity-90 transition-opacity"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-[#94a3b8] hover:text-white"
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
                className="block px-3 py-2.5 text-sm text-[#94a3b8] hover:text-white hover:bg-white/5 rounded-lg transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-[#1e293b] space-y-2">
              <Link
                href="/login"
                className="block px-3 py-2.5 text-sm text-[#94a3b8] hover:text-white"
              >
                Sign in
              </Link>
              <Link
                href="/register"
                className="block px-3 py-2.5 text-sm font-medium text-center text-[#0a0e17] bg-gradient-to-r from-[#22d3ee] to-[#a78bfa] rounded-lg"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
