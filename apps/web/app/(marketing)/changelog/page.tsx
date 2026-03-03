import Link from 'next/link';

export const metadata = {
  title: 'Changelog — Phantom Treasury',
  description: 'A transparent log of what we\u2019ve shipped, what\u2019s in progress, and what\u2019s next.',
};

const entries = [
  {
    date: 'March 2026',
    badge: 'latest' as const,
    title: 'Private Beta Launch',
    body: 'Phantom Treasury enters private beta with core platform functionality. 46 database tables, 21 migrations, multi-tenant architecture with row-level security, and the full application framework are live.',
    changes: [
      'Multi-tenant database architecture with RLS policies on every table',
      'Authentication system with role-based access control (Owner, Admin, Analyst, Viewer)',
      'Consolidated portfolio view across entities and asset classes',
      'Multi-currency engine supporting 40+ currencies',
      'Real-time valuation for listed securities and crypto',
      'Entity governance with hierarchy modeling',
      'Marketing website with 11 pages',
    ],
  },
  {
    date: 'Q2 2026',
    badge: 'planned' as const,
    title: 'Reporting & Export Engine',
    body: 'Automated quarterly report generation, capital call summaries, and performance attribution. PDF and Excel export with branded templates.',
    changes: [
      'Board-ready quarterly performance reports',
      'Capital call and distribution tracking',
      'Custom benchmark configuration',
      'Branded PDF and Excel export',
    ],
  },
  {
    date: 'Q3 2026',
    badge: 'planned' as const,
    title: 'Custodial Integrations',
    body: 'Direct connections to major custodians for automatic portfolio sync and reconciliation.',
    changes: [
      'Schwab API integration',
      'Fidelity API integration',
      'Pershing SFTP integration',
      'Automated daily reconciliation',
    ],
  },
  {
    date: 'Q4 2026',
    badge: 'planned' as const,
    title: 'Advanced Analytics & Benchmarking',
    body: 'Institutional-grade performance analytics with TWR/MWR calculations, allocation drift detection, and multi-dimensional exposure analysis.',
    changes: [
      'Time-weighted and money-weighted return calculations',
      'Benchmark comparison engine',
      'Asset allocation drift alerts',
      'Exposure analysis by geography, sector, and currency',
    ],
  },
];

export default function ChangelogPage() {
  return (
    <div style={{ paddingTop: '160px', paddingBottom: '80px' }}>
      {/* Hero */}
      <div className="reveal-up" style={{ maxWidth: '600px', margin: '0 auto 100px', textAlign: 'center', padding: '0 48px' }}>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 500, letterSpacing: '4px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: '20px' }}>
          Changelog
        </div>
        <h1 style={{ fontFamily: "'EB Garamond', serif", fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 400, color: 'rgba(255,255,255,0.95)', lineHeight: 1.15, marginBottom: '20px' }}>
          What We&apos;re Building
        </h1>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.8 }}>
          A transparent log of what&apos;s shipped, what&apos;s in progress, and what&apos;s next.
        </p>
      </div>

      {/* Timeline */}
      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '0 48px', position: 'relative' }}>
        {/* Vertical line */}
        <div style={{ position: 'absolute', left: '51px', top: 0, bottom: 0, width: '1px', background: 'rgba(255,255,255,0.06)' }} />

        {entries.map((entry, i) => (
          <div key={entry.title} className={`reveal-up ${i > 0 ? 'stagger-1' : ''}`} style={{ position: 'relative', paddingLeft: '40px', marginBottom: '64px' }}>
            {/* Timeline dot */}
            <div style={{
              position: 'absolute',
              left: '-1px',
              top: '4px',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: entry.badge === 'latest' ? '#c8b88a' : 'rgba(255,255,255,0.1)',
            }} />

            {/* Date + Badge */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 500, letterSpacing: '3px', textTransform: 'uppercase', color: '#c8b88a' }}>
                {entry.date}
              </span>
              <span style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '9px',
                fontWeight: 500,
                letterSpacing: '1px',
                textTransform: 'uppercase',
                padding: '3px 10px',
                borderRadius: '20px',
                border: entry.badge === 'latest' ? '1px solid rgba(200,184,138,0.3)' : '1px solid rgba(255,255,255,0.1)',
                color: entry.badge === 'latest' ? '#c8b88a' : 'rgba(255,255,255,0.4)',
                background: entry.badge === 'latest' ? 'rgba(200,184,138,0.08)' : 'transparent',
              }}>
                {entry.badge === 'latest' ? 'Latest' : 'Planned'}
              </span>
            </div>

            {/* Title */}
            <h2 style={{ fontFamily: "'EB Garamond', serif", fontSize: '22px', fontWeight: 400, color: 'rgba(255,255,255,0.9)', marginBottom: '12px' }}>
              {entry.title}
            </h2>

            {/* Body */}
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, marginBottom: '20px' }}>
              {entry.body}
            </p>

            {/* Changes */}
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {entry.changes.map((change) => (
                <li key={change} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: 'rgba(255,255,255,0.5)', padding: '4px 0', display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <span style={{ color: '#c8b88a', flexShrink: 0 }}>—</span>
                  {change}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
