import Link from 'next/link';

export const metadata = {
  title: 'Platform — Phantom Treasury',
  description: 'Six modules. One operating system for generational wealth.',
};

const modules = [
  { number: '01', title: 'Consolidated View', description: 'Every asset class — equities, fixed income, real estate, private equity, alternatives — unified in a single real-time interface.', capabilities: ['Unified dashboard across all custodians and accounts', 'Real-time aggregation with sub-second refresh', 'Multi-currency support across 40+ currencies', 'Custom grouping by entity, account, or asset class'], icon: <svg viewBox="0 0 24 24" style={{ width: 24, height: 24, stroke: '#c8b88a', strokeWidth: 1.2, fill: 'none' }}><rect x="3" y="3" width="18" height="18" rx="1" /><path d="M3 9h18M9 21V9" /></svg> },
  { number: '02', title: 'Real-Time Valuation', description: 'Sub-second data across 40+ currencies. Live FX rates, mark-to-market on illiquid positions, and NAV calculations that institutional LPs trust.', capabilities: ['Live market feeds with automatic pricing', 'NAV tracking for private equity and hedge funds', 'Appraised values for real estate with update tracking', 'Mark-to-market and cost-basis side-by-side'], icon: <svg viewBox="0 0 24 24" style={{ width: 24, height: 24, stroke: '#c8b88a', strokeWidth: 1.2, fill: 'none' }}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" /></svg> },
  { number: '03', title: 'Investor Reporting', description: 'Generate board-ready quarterly reports with one click. Capital calls, distributions, performance attribution, and benchmark comparisons.', capabilities: ['Board-ready quarterly reports in one click', 'Capital call summaries with waterfall distributions', 'Performance attribution by manager, sector, and geography', 'PDF and Excel export with custom branding'], icon: <svg viewBox="0 0 24 24" style={{ width: 24, height: 24, stroke: '#c8b88a', strokeWidth: 1.2, fill: 'none' }}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><path d="M14 2v6h6M16 13H8M16 17H8" /></svg> },
  { number: '04', title: 'Entity Governance', description: 'Map complex family structures — trusts, LLCs, foundations, holding companies — with full hierarchy visualization and compliance tracking.', capabilities: ['Multi-entity support (trusts, LLCs, foundations, holding companies)', 'Interactive hierarchy visualization', 'Per-entity permissions and access controls', 'Compliance document tracking and filing calendar'], icon: <svg viewBox="0 0 24 24" style={{ width: 24, height: 24, stroke: '#c8b88a', strokeWidth: 1.2, fill: 'none' }}><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87" /></svg> },
  { number: '05', title: 'Zero-Trust Security', description: 'SOC 2 Type II. End-to-end encryption. Hardware key support, IP whitelisting, and complete audit trails on every action.', capabilities: ['Row-level security on every database query', 'RBAC with Owner, Admin, Analyst, and Viewer roles', 'Session management with device tracking', 'Immutable audit logs on every action'], icon: <svg viewBox="0 0 24 24" style={{ width: 24, height: 24, stroke: '#c8b88a', strokeWidth: 1.2, fill: 'none' }}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg> },
  { number: '06', title: 'Performance Analytics', description: 'TWR, IRR, MOIC, and custom benchmarks. Attribution analysis down to the individual position with exportable datasets.', capabilities: ['Time-weighted (TWR) and money-weighted (MWR) returns', 'Benchmark comparison against custom indices', 'Allocation drift monitoring with rebalancing alerts', 'Exposure breakdowns by sector, geography, and currency'], icon: <svg viewBox="0 0 24 24" style={{ width: 24, height: 24, stroke: '#c8b88a', strokeWidth: 1.2, fill: 'none' }}><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg> },
];

export default function PlatformPage() {
  return (
    <div style={{ paddingTop: '160px', paddingBottom: '80px' }}>
      <div className="reveal-up" style={{ maxWidth: '560px', margin: '0 auto 100px', textAlign: 'center', padding: '0 48px' }}>
        <div style={{ fontSize: '10px', fontWeight: 500, letterSpacing: '5px', textTransform: 'uppercase', color: '#c8b88a', marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
          <span style={{ width: '20px', height: '1px', background: '#c8b88a', display: 'inline-block' }} />
          The Platform
        </div>
        <h1 style={{ fontFamily: "'EB Garamond', serif", fontSize: 'clamp(32px, 4vw, 46px)', fontWeight: 400, letterSpacing: '1px', color: 'rgba(255,255,255,0.95)', lineHeight: 1.15, marginBottom: '20px' }}>
          Six Modules.<br />One Operating System.
        </h1>
        <p style={{ fontSize: '15px', fontWeight: 300, color: 'rgba(255,255,255,0.6)', lineHeight: 1.8 }}>
          Every module built specifically for family office workflows. Replace your spreadsheets, your siloed tools, and your manual processes.
        </p>
      </div>

      <div style={{ maxWidth: '1060px', margin: '0 auto', padding: '0 48px' }}>
        {modules.map((mod, i) => (
          <div key={mod.number}>
            {i > 0 && <div style={{ width: '24px', height: '1px', background: 'rgba(200,184,138,0.15)', margin: '80px 0' }} />}
            <div className={`reveal-up ${i > 0 ? 'stagger-1' : ''}`} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'start' }}>
              <div style={{ order: i % 2 === 1 ? 2 : 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                  <span style={{ fontFamily: "'EB Garamond', serif", fontSize: '32px', fontWeight: 400, color: '#c8b88a', letterSpacing: '-1px' }}>{mod.number}</span>
                  <div style={{ width: '40px', height: '1px', background: 'rgba(200,184,138,0.15)' }} />
                </div>
                <h2 style={{ fontFamily: "'EB Garamond', serif", fontSize: '28px', fontWeight: 400, color: 'rgba(255,255,255,0.9)', marginBottom: '16px' }}>{mod.title}</h2>
                <p style={{ fontSize: '14px', fontWeight: 300, color: 'rgba(255,255,255,0.6)', lineHeight: 1.8 }}>{mod.description}</p>
              </div>
              <div style={{ order: i % 2 === 1 ? 1 : 2, background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.04)', padding: '32px' }}>
                <div style={{ marginBottom: '24px' }}>{mod.icon}</div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {mod.capabilities.map((cap) => (
                    <li key={cap} style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.02)', display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                      <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(200,184,138,0.2)', flexShrink: 0, marginTop: '6px' }} />
                      {cap}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="reveal-up" style={{ textAlign: 'center', marginTop: '120px', padding: '0 48px' }}>
        <div style={{ width: '24px', height: '1px', background: 'rgba(200,184,138,0.15)', margin: '0 auto 40px' }} />
        <Link href="/signup" style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 500, letterSpacing: '3px', textTransform: 'uppercase', color: '#0a0a0a', background: '#c8b88a', padding: '18px 40px', textDecoration: 'none' }}>
          Start Building Your View
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
        </Link>
      </div>
    </div>
  );
}
