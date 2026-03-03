'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav
      id="mainNav"
      className="phantom-nav"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: '0 48px',
        height: '80px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'transparent',
        transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <style>{`
        .phantom-nav.scrolled {
          background: rgba(10,10,10,0.92) !important;
          backdrop-filter: blur(30px);
          -webkit-backdrop-filter: blur(30px);
          height: 64px !important;
          border-bottom: 1px solid rgba(255,255,255,0.03);
        }
        .nav-link {
          font-size: 12px;
          color: rgba(255,255,255,0.6);
          text-decoration: none;
          transition: color 0.15s;
          position: relative;
        }
        .nav-link:hover { color: rgba(255,255,255,0.8); }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 0.5px;
          background: #c8b88a;
          transition: width 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .nav-link:hover::after { width: 100%; }
        .btn-nav {
          font-size: 10px !important;
          font-weight: 500 !important;
          letter-spacing: 2.5px !important;
          text-transform: uppercase;
          color: #c8b88a !important;
          padding: 10px 28px;
          border: 1px solid rgba(200,184,138,0.15);
          transition: all 0.2s !important;
          text-decoration: none;
        }
        .btn-nav:hover {
          background: rgba(200,184,138,0.06);
          border-color: rgba(200,184,138,0.35);
        }
        .btn-nav::after { display: none !important; }
        .nav-monogram {
          width: 36px;
          height: 36px;
          border: 0.5px solid rgba(255,255,255,0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'EB Garamond', serif;
          font-size: 18px;
          color: #fff;
          transition: border-color 0.3s;
        }
        .nav-logo-link:hover .nav-monogram {
          border-color: rgba(200,184,138,0.3);
        }
        .mobile-menu {
          position: fixed;
          top: 80px;
          left: 0;
          right: 0;
          background: rgba(10,10,10,0.95);
          backdrop-filter: blur(30px);
          padding: 24px 48px;
          border-bottom: 1px solid rgba(255,255,255,0.03);
          z-index: 99;
        }
        .mobile-menu a {
          display: block;
          padding: 12px 0;
          font-size: 12px;
          color: rgba(255,255,255,0.6);
          text-decoration: none;
          border-bottom: 1px solid rgba(255,255,255,0.03);
        }
      `}</style>

      {/* Logo */}
      <Link href="/" className="nav-logo-link" style={{ display: 'flex', alignItems: 'center', gap: '14px', textDecoration: 'none' }}>
        <div className="nav-monogram">PT</div>
        <span style={{ fontFamily: "'EB Garamond', serif", fontSize: '17px', fontWeight: 400, letterSpacing: '1.5px', color: '#fff' }}>
          Phantom Treasury
        </span>
      </Link>

      {/* Desktop Nav */}
      <ul className="nav-links-desktop" style={{ display: 'flex', alignItems: 'center', gap: '36px', listStyle: 'none' }}>
        <li><Link href="/platform" className="nav-link">Platform</Link></li>
        <li><Link href="/pricing" className="nav-link">Pricing</Link></li>
        <li><Link href="/security" className="nav-link">Security</Link></li>
        <li><Link href="/about" className="nav-link">About</Link></li>
        <li><Link href="/faq" className="nav-link">FAQ</Link></li>
        <li><Link href="/signin" className="nav-link">Sign In</Link></li>
        <li><Link href="/signup" className="btn-nav">Request Access</Link></li>
      </ul>

      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="md:hidden"
        aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        style={{ display: 'none', background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)', cursor: 'pointer' }}
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="mobile-menu" style={{ display: 'block' }}>
          <Link href="/platform" onClick={() => setMobileOpen(false)}>Platform</Link>
          <Link href="/pricing" onClick={() => setMobileOpen(false)}>Pricing</Link>
          <Link href="/security" onClick={() => setMobileOpen(false)}>Security</Link>
          <Link href="/about" onClick={() => setMobileOpen(false)}>About</Link>
          <Link href="/faq" onClick={() => setMobileOpen(false)}>FAQ</Link>
          <Link href="/signin" onClick={() => setMobileOpen(false)}>Sign In</Link>
          <Link href="/signup" onClick={() => setMobileOpen(false)} style={{ color: '#c8b88a' }}>Request Access</Link>
        </div>
      )}
    </nav>
  );
}
