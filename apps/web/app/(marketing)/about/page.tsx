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
        <div style={{ fontSize: '10px', fontWeight: 500, letterSpacing: '5px', textTransform: 'uppercase', color: '#c8b88a', marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
          <span style={{ width: '20px', height: '1px', background: '#c8b88a', display: 'inline-block' }} />
          About
        </div>
        <h1 style={{ fontFamily: "'EB Garamond', serif", fontSize: 'clamp(32px, 4vw, 46px)', fontWeight: 400, letterSpacing: '1px', color: 'rgba(255,255,255,0.95)', lineHeight: 1.15, marginBottom: '20px' }}>
          Built by Operators,<br />for Operators.
        </h1>
        <p style={{ fontSize: '15px', fontWeight: 300, color: 'rgba(255,255,255,0.6)', lineHeight: 1.8 }}>
          The operating system for generational wealth — purpose-built for the families and offices that manage it.
        </p>
      </div>

      {/* Editorial Sections */}
      <div style={{ maxWidth: '640px', margin: '0 auto', padding: '0 48px' }}>
        {/* The Problem */}
        <div className="reveal-up">
          <div style={{ fontSize: '10px', fontWeight: 500, letterSpacing: '4px', textTransform: 'uppercase', color: '#c8b88a', marginBottom: '24px' }}>
            The Problem
          </div>
          <p style={{ fontFamily: "'EB Garamond', serif", fontSize: '22px', fontWeight: 400, color: 'rgba(255,255,255,0.9)', lineHeight: 1.5, marginBottom: '20px' }}>
            Family offices are the most sophisticated financial entities in the world — yet they run on the most fragmented infrastructure imaginable.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <p style={{ fontSize: '14px', fontWeight: 300, color: 'rgba(255,255,255,0.6)', lineHeight: 1.8 }}>
              Spreadsheets for portfolio tracking. Email threads for deal flow. Shared drives for documents. A patchwork of disconnected tools stitched together with manual processes, each one a potential point of failure.
            </p>
            <p style={{ fontSize: '14px', fontWeight: 300, color: 'rgba(255,255,255,0.6)', lineHeight: 1.8 }}>
              The average family office uses 8 to 12 separate systems to manage their wealth. That fragmentation creates blind spots. Blind spots create risk. And for families managing generational wealth, risk isn&apos;t abstract — it&apos;s existential.
            </p>
            <p style={{ fontSize: '14px', fontWeight: 300, color: 'rgba(255,255,255,0.6)', lineHeight: 1.8 }}>
              No one has built a single, secure platform that treats the family office as what it actually is: a complex financial operating system that requires purpose-built software, not repurposed enterprise tools.
            </p>
          </div>
        </div>

        <div style={{ width: '24px', height: '1px', background: 'rgba(200,184,138,0.15)', margin: '60px 0' }} />

        {/* The Vision */}
        <div className="reveal-up stagger-1">
          <div style={{ fontSize: '10px', fontWeight: 500, letterSpacing: '4px', textTransform: 'uppercase', color: '#c8b88a', marginBottom: '24px' }}>
            The Vision
          </div>
          <p style={{ fontFamily: "'EB Garamond', serif", fontSize: '22px', fontWeight: 400, color: 'rgba(255,255,255,0.9)', lineHeight: 1.5, marginBottom: '20px' }}>
            Phantom Treasury is the unified platform that replaces the patchwork.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <p style={{ fontSize: '14px', fontWeight: 300, color: 'rgba(255,255,255,0.6)', lineHeight: 1.8 }}>
              Six integrated modules — Portfolio Intelligence, Deal Pipeline, Entity Management, Treasury Operations, Tax &amp; Compliance, and Family Governance — all running on one secure foundation with end-to-end encryption, row-level data isolation, and granular role-based access.
            </p>
            <p style={{ fontSize: '14px', fontWeight: 300, color: 'rgba(255,255,255,0.6)', lineHeight: 1.8 }}>
              We believe family offices deserve software built specifically for them. Not watered-down institutional tools. Not consumer apps with &ldquo;enterprise&rdquo; bolted on. Purpose-built infrastructure for the unique workflows, privacy requirements, and multi-generational perspective that define family office operations.
            </p>
            <p style={{ fontSize: '14px', fontWeight: 300, color: 'rgba(255,255,255,0.6)', lineHeight: 1.8 }}>
              Our goal is to give every family office — from the single-family office managing $50M to the multi-family firm overseeing billions — the technology that was previously only available to the largest institutions.
            </p>
          </div>
        </div>

        <div style={{ width: '24px', height: '1px', background: 'rgba(200,184,138,0.15)', margin: '60px 0' }} />

        {/* The Approach */}
        <div className="reveal-up stagger-1">
          <div style={{ fontSize: '10px', fontWeight: 500, letterSpacing: '4px', textTransform: 'uppercase', color: '#c8b88a', marginBottom: '24px' }}>
            The Approach
          </div>
          <p style={{ fontFamily: "'EB Garamond', serif", fontSize: '22px', fontWeight: 400, color: 'rgba(255,255,255,0.9)', lineHeight: 1.5, marginBottom: '20px' }}>
            We build with the hundred-year view.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <p style={{ fontSize: '14px', fontWeight: 300, color: 'rgba(255,255,255,0.6)', lineHeight: 1.8 }}>
              Every feature in Phantom Treasury exists because a family office needed it — not because a product manager imagined it. Our team includes former family office operators, wealth advisors, and institutional technologists who understand the nuances because they&apos;ve lived them.
            </p>
            <p style={{ fontSize: '14px', fontWeight: 300, color: 'rgba(255,255,255,0.6)', lineHeight: 1.8 }}>
              Security is not a feature — it&apos;s the foundation. Zero-knowledge encryption, SOC 2 Type II compliance, and multi-tenant isolation enforced at the database level, not the application level. We cannot read your data, even if we wanted to.
            </p>
            <p style={{ fontSize: '14px', fontWeight: 300, color: 'rgba(255,255,255,0.6)', lineHeight: 1.8 }}>
              We ship in the open. Our pricing is transparent. Our roadmap is shared with clients. We earn trust through consistency, not contracts.
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="reveal-up" style={{ textAlign: 'center', marginTop: '100px', padding: '0 48px' }}>
        <div style={{ width: '24px', height: '1px', background: 'rgba(200,184,138,0.15)', margin: '0 auto 40px' }} />
        <p style={{ fontFamily: "'EB Garamond', serif", fontSize: '22px', fontWeight: 400, color: 'rgba(255,255,255,0.85)', marginBottom: '12px' }}>
          Open for Early Access
        </p>
        <p style={{ fontSize: '14px', fontWeight: 300, color: 'rgba(255,255,255,0.6)', marginBottom: '32px', maxWidth: '460px', margin: '0 auto 32px' }}>
          Phantom Treasury is currently onboarding a select group of family offices. If you&apos;re interested, we&apos;d love to hear from you.
        </p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '24px', flexWrap: 'wrap' }}>
          <Link href="/signup" style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 500, letterSpacing: '3px', textTransform: 'uppercase', color: '#0a0a0a', background: '#c8b88a', padding: '18px 40px', textDecoration: 'none' }}>
            Request Access
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </Link>
          <a href="mailto:hello@phantomtreasury.com" style={{ fontSize: '13px', fontWeight: 300, color: 'rgba(255,255,255,0.6)', textDecoration: 'none', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            hello@phantomtreasury.com
          </a>
        </div>
      </div>
    </div>
  );
}
