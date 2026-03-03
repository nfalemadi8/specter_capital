import Link from 'next/link';

export const metadata = {
  title: 'Security — Phantom Treasury',
  description: 'Your data. Your control. No exceptions.',
};

const sections = [
  {
    title: 'Architecture',
    body: 'Built on PostgreSQL via Supabase with row-level security policies on every table. Each database query is automatically scoped to the authenticated user\u2019s organization. Multi-tenant isolation means your data is logically separated at the database level — not just the application level.',
  },
  {
    title: 'Encryption',
    body: 'All data is encrypted at rest using AES-256 and in transit via TLS 1.3. Database-level encryption is handled by Supabase\u2019s managed infrastructure. Backup encryption ensures your data remains protected even in disaster recovery scenarios.',
  },
  {
    title: 'Access Control',
    body: 'Four permission levels — Owner, Admin, Analyst, and Viewer — give you granular control over who sees what. Team members are added via invite-only onboarding. Session management lets you revoke access instantly. Every permission change is logged.',
  },
  {
    title: 'Privacy',
    body: 'Phantom Treasury uses zero third-party analytics. No Google Analytics, no Mixpanel, no tracking pixels. Your data is never sold, shared, or used for advertising. We don\u2019t even know what you\u2019re looking at inside the platform — and we designed it that way.',
  },
  {
    title: 'Compliance Roadmap',
    body: 'Our architecture is built to meet SOC 2 Type II standards, with certification planned as we scale. GDPR-ready data handling is built into the core. Enterprise and Sovereign clients can configure data residency preferences to meet jurisdictional requirements.',
  },
];

export default function SecurityPage() {
  return (
    <div style={{ paddingTop: '160px', paddingBottom: '80px' }}>
      {/* Hero */}
      <div className="reveal-up" style={{ maxWidth: '600px', margin: '0 auto 100px', textAlign: 'center', padding: '0 48px' }}>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 500, letterSpacing: '4px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: '20px' }}>
          Security
        </div>
        <h1 style={{ fontFamily: "'EB Garamond', serif", fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 400, color: 'rgba(255,255,255,0.95)', lineHeight: 1.15, marginBottom: '20px' }}>
          Your Data. Your Control. No Exceptions.
        </h1>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.8 }}>
          Phantom Treasury is built with institutional-grade security at every layer — not bolted on after the fact.
        </p>
      </div>

      {/* Sections */}
      <div style={{ maxWidth: '640px', margin: '0 auto', padding: '0 48px' }}>
        {sections.map((section, i) => (
          <div key={section.title}>
            {i > 0 && (
              <div style={{ width: '24px', height: '1px', background: 'rgba(200,184,138,0.2)', margin: '60px 0' }} />
            )}
            <div className={`reveal-up ${i > 0 ? 'stagger-1' : ''}`}>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 500, letterSpacing: '4px', textTransform: 'uppercase', color: '#c8b88a', marginBottom: '20px' }}>
                {section.title}
              </div>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, maxWidth: '640px' }}>
                {section.body}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="reveal-up" style={{ textAlign: 'center', marginTop: '100px', padding: '0 48px' }}>
        <div style={{ width: '24px', height: '1px', background: 'rgba(200,184,138,0.15)', margin: '0 auto 40px' }} />
        <p style={{ fontFamily: "'EB Garamond', serif", fontSize: '22px', fontWeight: 400, color: 'rgba(255,255,255,0.85)', marginBottom: '16px' }}>
          Security questions?
        </p>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: 'rgba(255,255,255,0.6)', marginBottom: '32px' }}>
          We&apos;re happy to walk you through our architecture.
        </p>
        <Link href="/signup" style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 500, letterSpacing: '3px', textTransform: 'uppercase', color: '#0a0a0a', background: '#c8b88a', padding: '18px 40px', textDecoration: 'none' }}>
          Request Access
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
        </Link>
      </div>
    </div>
  );
}
