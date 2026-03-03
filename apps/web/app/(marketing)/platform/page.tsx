import Link from 'next/link';

export const metadata = {
  title: 'Platform — Phantom Treasury',
  description: 'Six modules. One operating system for generational wealth.',
};

const modules = [
  {
    number: '01',
    title: 'Consolidated View',
    body: 'See everything in one place. Phantom Treasury aggregates holdings across every custodian, entity, and account into a single real-time view.',
    capabilities: [
      'Unified dashboard across all entities, accounts, and custodians',
      'Real-time portfolio aggregation with automatic reconciliation',
      'Multi-currency normalization across 40+ currencies',
      'Custom grouping by entity, asset class, strategy, or geography',
    ],
  },
  {
    number: '02',
    title: 'Real-Time Valuation',
    body: 'From listed equities to private holdings, every asset is valued using the most appropriate methodology — automatically.',
    capabilities: [
      'Live market data feeds for listed equities, bonds, and crypto',
      'NAV-based tracking for private equity and hedge fund allocations',
      'Appraised value support for real estate, art, and collectibles',
      'Mark-to-market and cost-basis views with full audit trail',
    ],
  },
  {
    number: '03',
    title: 'Investor Reporting',
    body: 'Generate the reports your board and beneficiaries expect — in minutes, not weeks.',
    capabilities: [
      'Board-ready quarterly reports generated automatically',
      'Capital call and distribution summaries across fund investments',
      'Performance attribution against custom benchmarks',
      'Branded PDF and Excel export with your family office identity',
    ],
  },
  {
    number: '04',
    title: 'Entity Governance',
    body: 'Model your full organizational structure. Trusts, LLCs, foundations, holding companies — each with their own permissions and compliance requirements.',
    capabilities: [
      'Multi-entity management with full hierarchy visualization',
      'Per-entity permissions and role-based access',
      'Compliance document storage and tracking per entity',
      'Consolidated or entity-level views with one click',
    ],
  },
  {
    number: '05',
    title: 'Zero-Trust Security',
    body: 'Every query is scoped. Every action is logged. Every user is verified. Security isn\u2019t a feature — it\u2019s the architecture.',
    capabilities: [
      'Row-level security on every single database query',
      'Role-based access control: Owner, Admin, Analyst, Viewer',
      'Session management with invite-only onboarding',
      'Complete audit logs on every data access and modification',
    ],
  },
  {
    number: '06',
    title: 'Performance Analytics',
    body: 'Understand how your wealth is performing — across time, benchmarks, and risk dimensions.',
    capabilities: [
      'Time-weighted and money-weighted return calculations',
      'Benchmark comparison against S&P 500, MSCI, and custom indices',
      'Asset allocation drift analysis with rebalancing alerts',
      'Exposure breakdowns by geography, sector, currency, and asset class',
    ],
  },
];

export default function PlatformPage() {
  return (
    <div style={{ paddingTop: '160px', paddingBottom: '80px' }}>
      {/* Hero */}
      <div className="reveal-up" style={{ maxWidth: '600px', margin: '0 auto 100px', textAlign: 'center', padding: '0 48px' }}>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 500, letterSpacing: '4px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: '20px' }}>
          Platform
        </div>
        <h1 style={{ fontFamily: "'EB Garamond', serif", fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 400, color: 'rgba(255,255,255,0.95)', lineHeight: 1.15, marginBottom: '20px' }}>
          Six Modules. One Operating System.
        </h1>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.8 }}>
          Every capability a family office needs — consolidated, automated, and secured.
        </p>
      </div>

      {/* Modules */}
      <div style={{ maxWidth: '1060px', margin: '0 auto', padding: '0 48px' }}>
        {modules.map((mod, i) => (
          <div key={mod.number}>
            {/* Separator */}
            {i > 0 && (
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.04)', margin: '80px 0' }} />
            )}

            <div className={`reveal-up ${i > 0 ? 'stagger-1' : ''}`} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'start' }}>
              {/* Text side */}
              <div style={{ order: i % 2 === 1 ? 2 : 1 }}>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 500, letterSpacing: '4px', color: '#c8b88a', marginBottom: '12px' }}>
                  {mod.number}
                </div>
                <div style={{ width: '24px', height: '1px', background: 'rgba(200,184,138,0.3)', marginBottom: '20px' }} />
                <h2 style={{ fontFamily: "'EB Garamond', serif", fontSize: '32px', fontWeight: 400, color: 'rgba(255,255,255,0.9)', marginBottom: '16px' }}>
                  {mod.title}
                </h2>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.8 }}>
                  {mod.body}
                </p>
              </div>

              {/* Capabilities card */}
              <div style={{ order: i % 2 === 1 ? 1 : 2, background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.04)', padding: '32px' }}>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 500, letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: '24px' }}>
                  Capabilities
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {mod.capabilities.map((cap) => (
                    <li key={cap} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: 'rgba(255,255,255,0.7)', padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.02)', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                      <span style={{ width: '12px', height: '1px', background: '#c8b88a', flexShrink: 0, marginTop: '9px', opacity: 0.4 }} />
                      {cap}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="reveal-up" style={{ textAlign: 'center', marginTop: '120px', padding: '0 48px' }}>
        <div style={{ width: '24px', height: '1px', background: 'rgba(200,184,138,0.15)', margin: '0 auto 40px' }} />
        <p style={{ fontFamily: "'EB Garamond', serif", fontSize: '24px', fontWeight: 400, color: 'rgba(255,255,255,0.85)', marginBottom: '12px' }}>
          Start Building Your View
        </p>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: 'rgba(255,255,255,0.6)', marginBottom: '32px' }}>
          Request early access and see how Phantom Treasury works for your family office.
        </p>
        <Link href="/signup" style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 500, letterSpacing: '3px', textTransform: 'uppercase', color: '#0a0a0a', background: '#c8b88a', padding: '18px 40px', textDecoration: 'none' }}>
          Request Access
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
        </Link>
      </div>
    </div>
  );
}
