import Link from 'next/link';

export const metadata = {
  title: 'About — Phantom Treasury',
  description: 'The operating system for generational wealth. Built by family office operators, for family office operators.',
};

export default function AboutPage() {
  return (
    <div style={{ paddingTop: '160px', paddingBottom: '80px' }}>
      {/* Hero */}
      <div className="reveal-up" style={{ maxWidth: '640px', margin: '0 auto 100px', textAlign: 'center', padding: '0 48px' }}>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 500, letterSpacing: '4px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: '20px' }}>
          About
        </div>
        <h1 style={{ fontFamily: "'EB Garamond', serif", fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 400, color: 'rgba(255,255,255,0.95)', lineHeight: 1.15 }}>
          Built by Operators, for Operators
        </h1>
      </div>

      {/* Editorial Sections */}
      <div style={{ maxWidth: '640px', margin: '0 auto', padding: '0 48px' }}>
        {/* The Problem */}
        <div className="reveal-up" style={{ marginBottom: '80px' }}>
          <h2 style={{ fontFamily: "'EB Garamond', serif", fontSize: '28px', fontWeight: 400, color: 'rgba(255,255,255,0.9)', marginBottom: '24px' }}>
            The Problem
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.8 }}>
              Family offices are among the most sophisticated financial entities in the world — yet most still run on fragmented infrastructure. Holdings tracked in spreadsheets. Performance calculated manually. Reporting assembled from screenshots of custodian portals. Entity structures documented in filing cabinets.
            </p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.8 }}>
              When a family&apos;s wealth spans listed equities, private equity, real estate, bonds, crypto, and alternative investments across multiple trusts, LLCs, and foundations — there is no single system that speaks that language.
            </p>
          </div>
        </div>

        {/* The Vision */}
        <div className="reveal-up stagger-1" style={{ marginBottom: '80px' }}>
          <h2 style={{ fontFamily: "'EB Garamond', serif", fontSize: '28px', fontWeight: 400, color: 'rgba(255,255,255,0.9)', marginBottom: '24px' }}>
            The Vision
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.8 }}>
              Phantom Treasury is a private operating system for family offices. One platform that consolidates every asset class, every entity, and every reporting need — with the discretion and precision that generational wealth demands.
            </p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.8 }}>
              This isn&apos;t a retail portfolio tracker with a premium skin. It&apos;s purpose-built infrastructure for the specific complexity of family office operations.
            </p>
          </div>
        </div>

        {/* The Approach */}
        <div className="reveal-up stagger-1" style={{ marginBottom: '80px' }}>
          <h2 style={{ fontFamily: "'EB Garamond', serif", fontSize: '28px', fontWeight: 400, color: 'rgba(255,255,255,0.9)', marginBottom: '24px' }}>
            The Approach
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.8 }}>
              We build with a modern, institutional-grade stack: React and Next.js for a responsive interface, Supabase and PostgreSQL for a secure and scalable backend, row-level security for true multi-tenant isolation, and role-based access control for granular permissions.
            </p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.8 }}>
              Every architectural decision is made with one question: would a family office trust this with their most sensitive financial data?
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="reveal-up" style={{ textAlign: 'center', padding: '0 48px' }}>
        <div style={{ width: '24px', height: '1px', background: 'rgba(200,184,138,0.15)', margin: '0 auto 40px' }} />
        <p style={{ fontFamily: "'EB Garamond', serif", fontSize: '24px', fontWeight: 400, color: 'rgba(255,255,255,0.85)', marginBottom: '16px' }}>
          Open for Early Access
        </p>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: 'rgba(255,255,255,0.6)', marginBottom: '32px', maxWidth: '520px', margin: '0 auto 32px' }}>
          Phantom Treasury is in private beta. If you manage a family office and are interested in consolidating your operations, we&apos;d like to hear from you.
        </p>
        <Link href="/signup" style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 500, letterSpacing: '3px', textTransform: 'uppercase', color: '#0a0a0a', background: '#c8b88a', padding: '18px 40px', textDecoration: 'none' }}>
          Request Access
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
        </Link>
      </div>
    </div>
  );
}
