import Link from 'next/link';

export const metadata = {
  title: 'Careers — Phantom Treasury',
  description: 'Build infrastructure that matters. Join the team building the operating system for generational wealth.',
};

const values = [
  {
    title: 'Ownership',
    body: 'You won\u2019t be assigned tickets. You\u2019ll own entire systems — from architecture to deployment. We trust our team to make the right decisions.',
  },
  {
    title: 'Discretion',
    body: 'We build for clients who value privacy above all else. That ethos extends to how we work — thoughtfully, quietly, and with intention.',
  },
  {
    title: 'Craft',
    body: 'Every interface, every query, every API response should feel considered. We care about the details because our clients\u2019 trust depends on them.',
  },
];

const positions = [
  {
    title: 'Full-Stack Engineer',
    type: 'Engineering \u00b7 Remote \u00b7 Full-time',
    description: 'Build and scale the core platform — React/Next.js frontend, Supabase/PostgreSQL backend, real-time data pipelines, and institutional-grade security. You should be comfortable owning features end-to-end.',
  },
  {
    title: 'Product Designer',
    type: 'Design \u00b7 Remote \u00b7 Full-time',
    description: 'Design interfaces for complex financial data — portfolio views, entity hierarchies, performance analytics, and reporting. You should understand information density and know when restraint is the right choice.',
  },
  {
    title: 'Financial Data Engineer',
    type: 'Engineering \u00b7 Remote \u00b7 Full-time',
    description: 'Build integrations with custodians, market data providers, and financial infrastructure. You should understand financial data formats, reconciliation, and multi-currency accounting.',
  },
];

export default function CareersPage() {
  return (
    <div style={{ paddingTop: '160px', paddingBottom: '80px' }}>
      {/* Hero */}
      <div className="reveal-up" style={{ maxWidth: '600px', margin: '0 auto 100px', textAlign: 'center', padding: '0 48px' }}>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 500, letterSpacing: '4px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: '20px' }}>
          Careers
        </div>
        <h1 style={{ fontFamily: "'EB Garamond', serif", fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 400, color: 'rgba(255,255,255,0.95)', lineHeight: 1.15, marginBottom: '20px' }}>
          Build Infrastructure That Matters
        </h1>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.8 }}>
          We&apos;re assembling a small team of exceptional builders to create the operating system for generational wealth.
        </p>
      </div>

      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '0 48px' }}>
        {/* How We Work */}
        <div className="reveal-up" style={{ marginBottom: '80px' }}>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 500, letterSpacing: '4px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: '20px' }}>
            How We Work
          </div>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, maxWidth: '640px', marginBottom: '40px' }}>
            Phantom Treasury is a focused, early-stage company. We value depth over breadth, precision over speed, and ownership over process. Every person on the team has a direct impact on the product and the families who will rely on it.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: 'rgba(255,255,255,0.03)' }}>
            {values.map((v) => (
              <div key={v.title} style={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.04)', padding: '32px' }}>
                <h3 style={{ fontFamily: "'EB Garamond', serif", fontSize: '20px', fontWeight: 400, color: 'rgba(255,255,255,0.9)', marginBottom: '12px' }}>
                  {v.title}
                </h3>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.8 }}>
                  {v.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Open Positions */}
        <div className="reveal-up stagger-1" style={{ marginBottom: '80px' }}>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 500, letterSpacing: '4px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: '12px' }}>
            Open Positions
          </div>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, maxWidth: '640px', marginBottom: '32px' }}>
            We&apos;re not actively hiring for specific roles yet, but we&apos;re always interested in hearing from exceptional people.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {positions.map((pos) => (
              <div key={pos.title} style={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.04)', padding: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <h3 style={{ fontFamily: "'EB Garamond', serif", fontSize: '20px', fontWeight: 400, color: 'rgba(255,255,255,0.9)' }}>
                    {pos.title}
                  </h3>
                  <span style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '9px',
                    fontWeight: 500,
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    padding: '4px 10px',
                    borderRadius: '20px',
                    border: '1px solid rgba(200,184,138,0.3)',
                    color: '#c8b88a',
                    background: 'rgba(200,184,138,0.08)',
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                  }}>
                    Coming Soon
                  </span>
                </div>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginBottom: '12px' }}>
                  {pos.type}
                </p>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.8 }}>
                  {pos.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="reveal-up" style={{ textAlign: 'center', padding: '0 48px' }}>
        <div style={{ width: '24px', height: '1px', background: 'rgba(200,184,138,0.15)', margin: '0 auto 40px' }} />
        <p style={{ fontFamily: "'EB Garamond', serif", fontSize: '24px', fontWeight: 400, color: 'rgba(255,255,255,0.85)', marginBottom: '16px' }}>
          Interested?
        </p>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: 'rgba(255,255,255,0.6)', marginBottom: '24px', maxWidth: '480px', margin: '0 auto 24px' }}>
          Send a note about what you&apos;d bring to Phantom Treasury. No formal applications — just tell us what you&apos;re good at.
        </p>
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: '#c8b88a' }}>
          careers@phantomtreasury.com
        </span>
      </div>
    </div>
  );
}
