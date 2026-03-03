import Link from 'next/link';

export const metadata = {
  title: 'Integrations — Phantom Treasury',
  description: 'Connect your custodians, market data feeds, and infrastructure to Phantom Treasury.',
};

const categories = [
  {
    title: 'Custodians & Banks',
    integrations: [
      { name: 'Schwab', type: 'API', status: 'coming' as const },
      { name: 'Fidelity', type: 'API', status: 'coming' as const },
      { name: 'Pershing', type: 'SFTP', status: 'coming' as const },
      { name: 'BNY Mellon', type: 'SFTP', status: 'coming' as const },
      { name: 'Northern Trust', type: 'API', status: 'coming' as const },
      { name: 'Goldman Sachs', type: 'Manual', status: 'coming' as const },
    ],
  },
  {
    title: 'Market Data',
    integrations: [
      { name: 'CoinGecko', type: 'API', status: 'live' as const },
      { name: 'Open Exchange Rates', type: 'API', status: 'live' as const },
      { name: 'Bloomberg', type: 'API', status: 'coming' as const },
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
      { name: 'Supabase / PostgreSQL', type: 'Database', status: 'live' as const },
      { name: 'Vercel', type: 'Hosting', status: 'live' as const },
      { name: 'GitHub CI/CD', type: 'DevOps', status: 'live' as const },
    ],
  },
];

export default function IntegrationsPage() {
  return (
    <div style={{ paddingTop: '160px', paddingBottom: '80px' }}>
      {/* Hero */}
      <div className="reveal-up" style={{ maxWidth: '560px', margin: '0 auto 80px', textAlign: 'center', padding: '0 48px' }}>
        <div style={{ fontSize: '10px', fontWeight: 500, letterSpacing: '5px', textTransform: 'uppercase', color: '#c8b88a', marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
          <span style={{ width: '20px', height: '1px', background: '#c8b88a', display: 'inline-block' }} />
          Integrations
        </div>
        <h1 style={{ fontFamily: "'EB Garamond', serif", fontSize: 'clamp(32px, 4vw, 46px)', fontWeight: 400, letterSpacing: '1px', color: 'rgba(255,255,255,0.95)', lineHeight: 1.15, marginBottom: '20px' }}>
          Connects to the Infrastructure<br />You Already Trust
        </h1>
        <p style={{ fontSize: '15px', fontWeight: 300, color: 'rgba(255,255,255,0.6)', lineHeight: 1.8 }}>
          Aggregate data from custodians, market feeds, and tools your family office already uses.
        </p>
      </div>

      {/* Categories */}
      <div style={{ maxWidth: '1060px', margin: '0 auto', padding: '0 48px' }}>
        {categories.map((cat, ci) => (
          <div key={cat.title} className={`reveal-up ${ci > 0 ? 'stagger-1' : ''}`} style={{ marginBottom: '80px' }}>
            <h2 style={{ fontFamily: "'EB Garamond', serif", fontSize: '24px', fontWeight: 400, color: 'rgba(255,255,255,0.9)', marginBottom: '32px' }}>
              {cat.title}
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1px', background: 'rgba(255,255,255,0.03)' }}>
              {cat.integrations.map((integ) => (
                <div key={integ.name} style={{ background: '#1a1a1a', padding: '28px 24px' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <span style={{ fontSize: '14px', fontWeight: 500, color: 'rgba(255,255,255,0.9)' }}>{integ.name}</span>
                    <span style={{
                      fontSize: '9px',
                      fontWeight: 500,
                      letterSpacing: '1px',
                      textTransform: 'uppercase',
                      padding: '4px 10px',
                      border: `1px solid ${integ.status === 'live' ? '#4a9e6e' : '#c8b88a'}`,
                      color: integ.status === 'live' ? '#4a9e6e' : '#c8b88a',
                    }}>
                      {integ.status === 'live' ? 'Live' : 'Coming Soon'}
                    </span>
                  </div>
                  <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)' }}>{integ.type}</span>
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
        <p style={{ fontSize: '15px', fontWeight: 300, color: 'rgba(255,255,255,0.6)', marginBottom: '32px' }}>
          Tell us what you need. Enterprise plans include custom integration development.
        </p>
        <Link href="/signup" style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 500, letterSpacing: '3px', textTransform: 'uppercase', color: '#0a0a0a', background: '#c8b88a', padding: '18px 40px', textDecoration: 'none' }}>
          Request Access
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
        </Link>
      </div>
    </div>
  );
}
