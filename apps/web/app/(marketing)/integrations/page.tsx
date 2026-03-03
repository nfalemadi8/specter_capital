import Link from 'next/link';

export const metadata = {
  title: 'Integrations — Phantom Treasury',
  description: 'Connect your custodians, market data feeds, and infrastructure to Phantom Treasury.',
};

const categories = [
  {
    title: 'Custodians & Banks',
    integrations: [
      { name: 'Charles Schwab', type: 'API', status: 'coming' as const },
      { name: 'Fidelity', type: 'API', status: 'coming' as const },
      { name: 'Pershing (BNY)', type: 'SFTP', status: 'coming' as const },
      { name: 'BNY Mellon', type: 'API', status: 'coming' as const },
      { name: 'Northern Trust', type: 'API', status: 'coming' as const },
      { name: 'Goldman Sachs', type: 'Manual', status: 'coming' as const },
    ],
  },
  {
    title: 'Market Data',
    integrations: [
      { name: 'CoinGecko', type: 'REST API', status: 'live' as const },
      { name: 'Open Exchange Rates', type: 'REST API', status: 'live' as const },
      { name: 'Bloomberg Terminal', type: 'API', status: 'coming' as const },
      { name: 'Refinitiv', type: 'API', status: 'coming' as const },
    ],
  },
  {
    title: 'Document & Reporting',
    integrations: [
      { name: 'PDF Generation', type: 'Built-in', status: 'live' as const },
      { name: 'Excel Export', type: 'Built-in', status: 'live' as const },
      { name: 'DocuSign', type: 'API', status: 'coming' as const },
      { name: 'SharePoint', type: 'API', status: 'coming' as const },
    ],
  },
  {
    title: 'Infrastructure',
    integrations: [
      { name: 'Supabase (PostgreSQL)', type: 'Database', status: 'live' as const },
      { name: 'Vercel', type: 'Hosting', status: 'live' as const },
      { name: 'GitHub', type: 'CI/CD', status: 'live' as const },
    ],
  },
];

export default function IntegrationsPage() {
  return (
    <div style={{ paddingTop: '160px', paddingBottom: '80px' }}>
      {/* Hero */}
      <div className="reveal-up" style={{ maxWidth: '600px', margin: '0 auto 80px', textAlign: 'center', padding: '0 48px' }}>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 500, letterSpacing: '4px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: '20px' }}>
          Integrations
        </div>
        <h1 style={{ fontFamily: "'EB Garamond', serif", fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 400, color: 'rgba(255,255,255,0.95)', lineHeight: 1.15, marginBottom: '20px' }}>
          Connects to the Infrastructure You Already Trust
        </h1>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.8 }}>
          Phantom Treasury integrates with leading custodians, data providers, and financial infrastructure.
        </p>
      </div>

      {/* Categories */}
      <div style={{ maxWidth: '1060px', margin: '0 auto', padding: '0 48px' }}>
        {categories.map((cat, ci) => (
          <div key={cat.title} className={`reveal-up ${ci > 0 ? 'stagger-1' : ''}`} style={{ marginBottom: '80px' }}>
            <h2 style={{ fontFamily: "'EB Garamond', serif", fontSize: '24px', fontWeight: 400, color: 'rgba(255,255,255,0.9)', marginBottom: '32px' }}>
              {cat.title}
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: 'rgba(255,255,255,0.03)' }}>
              {cat.integrations.map((integ) => (
                <div key={integ.name} style={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.04)', padding: '24px' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', fontWeight: 500, color: 'rgba(255,255,255,0.9)' }}>{integ.name}</span>
                    <span style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: '9px',
                      fontWeight: 500,
                      letterSpacing: '1px',
                      textTransform: 'uppercase' as const,
                      padding: '4px 10px',
                      borderRadius: '20px',
                      border: `1px solid ${integ.status === 'live' ? 'rgba(74,158,110,0.3)' : 'rgba(200,184,138,0.3)'}`,
                      color: integ.status === 'live' ? '#4a9e6e' : '#c8b88a',
                      background: integ.status === 'live' ? 'rgba(74,158,110,0.08)' : 'rgba(200,184,138,0.08)',
                    }}>
                      {integ.status === 'live' ? 'Live' : 'Coming Soon'}
                    </span>
                  </div>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>{integ.type}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="reveal-up" style={{ textAlign: 'center', padding: '0 48px' }}>
        <div style={{ width: '24px', height: '1px', background: 'rgba(200,184,138,0.15)', margin: '0 auto 40px' }} />
        <p style={{ fontFamily: "'EB Garamond', serif", fontSize: '22px', fontWeight: 400, color: 'rgba(255,255,255,0.85)', marginBottom: '16px' }}>
          Need a specific integration?
        </p>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: 'rgba(255,255,255,0.6)', marginBottom: '32px' }}>
          Let us know what you need.
        </p>
        <Link href="/signup" style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 500, letterSpacing: '3px', textTransform: 'uppercase', color: '#0a0a0a', background: '#c8b88a', padding: '18px 40px', textDecoration: 'none' }}>
          Request Access
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
        </Link>
      </div>
    </div>
  );
}
