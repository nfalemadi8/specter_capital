const features = [
  {
    num: '01',
    title: 'Consolidated View',
    desc: 'Every asset class — equities, fixed income, real estate, private equity, alternatives — unified in a single real-time interface with custodial-grade data feeds.',
    icon: (
      <svg viewBox="0 0 24 24" style={{ width: 22, height: 22, stroke: '#c8b88a', strokeWidth: 1.2, fill: 'none' }}>
        <rect x="3" y="3" width="18" height="18" rx="1" />
        <path d="M3 9h18M9 21V9" />
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Real-Time Valuation',
    desc: 'Sub-second data across 40+ currencies. Live FX rates, mark-to-market on illiquid positions, and NAV calculations that institutional LPs trust.',
    icon: (
      <svg viewBox="0 0 24 24" style={{ width: 22, height: 22, stroke: '#c8b88a', strokeWidth: 1.2, fill: 'none' }}>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 3" />
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Investor Reporting',
    desc: 'Generate board-ready quarterly reports with one click. Capital calls, distributions, performance attribution, and benchmark comparisons.',
    icon: (
      <svg viewBox="0 0 24 24" style={{ width: 22, height: 22, stroke: '#c8b88a', strokeWidth: 1.2, fill: 'none' }}>
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <path d="M14 2v6h6M16 13H8M16 17H8" />
      </svg>
    ),
  },
  {
    num: '04',
    title: 'Entity Governance',
    desc: 'Map complex family structures — trusts, LLCs, foundations, holding companies — with full hierarchy visualization and compliance tracking.',
    icon: (
      <svg viewBox="0 0 24 24" style={{ width: 22, height: 22, stroke: '#c8b88a', strokeWidth: 1.2, fill: 'none' }}>
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87" />
      </svg>
    ),
  },
  {
    num: '05',
    title: 'Zero-Trust Security',
    desc: 'SOC 2 Type II. End-to-end encryption. Hardware key support, IP whitelisting, and complete audit trails on every action.',
    icon: (
      <svg viewBox="0 0 24 24" style={{ width: 22, height: 22, stroke: '#c8b88a', strokeWidth: 1.2, fill: 'none' }}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    num: '06',
    title: 'Performance Analytics',
    desc: 'TWR, IRR, MOIC, and custom benchmarks. Attribution analysis down to the individual position with exportable datasets.',
    icon: (
      <svg viewBox="0 0 24 24" style={{ width: 22, height: 22, stroke: '#c8b88a', strokeWidth: 1.2, fill: 'none' }}>
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
];

export function FeaturesSection() {
  return (
    <section
      id="features"
      className="phantom-section"
      style={{ padding: '160px 48px', position: 'relative' }}
    >
      {/* Section Header */}
      <div className="reveal-up" style={{ maxWidth: '560px', marginBottom: '80px' }}>
        <div
          style={{
            fontSize: '10px',
            fontWeight: 500,
            letterSpacing: '5px',
            textTransform: 'uppercase',
            color: '#c8b88a',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <span style={{ width: '20px', height: '1px', background: '#c8b88a', display: 'inline-block' }} />
          Capabilities
        </div>
        <h2
          style={{
            fontFamily: "'EB Garamond', serif",
            fontSize: 'clamp(32px, 4vw, 46px)',
            fontWeight: 400,
            letterSpacing: '1px',
            color: 'rgba(255,255,255,0.95)',
            lineHeight: 1.15,
            marginBottom: '20px',
          }}
        >
          Engineered for Complexity
        </h2>
        <p style={{ fontSize: '15px', fontWeight: 300, color: 'rgba(255,255,255,0.6)', lineHeight: 1.8 }}>
          Purpose-built for multi-generational wealth. Not repurposed fintech. Not a spreadsheet with a login page.
        </p>
      </div>

      {/* Scroll hint */}
      <div
        className="reveal-up stagger-1"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '20px',
          fontSize: '9px',
          letterSpacing: '3px',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.08)',
        }}
      >
        Scroll horizontally
        <span style={{ width: '40px', height: '1px', background: 'rgba(255,255,255,0.06)', display: 'inline-block' }} />
      </div>

      {/* Horizontal scroll track */}
      <div className="reveal-up stagger-2">
        <div
          className="features-track"
          style={{
            display: 'flex',
            gap: '1px',
            overflowX: 'auto',
            scrollSnapType: 'x mandatory',
            paddingBottom: '20px',
            cursor: 'grab',
          }}
        >
          {features.map((f) => (
            <div
              key={f.num}
              className="feature-card"
              style={{
                minWidth: '380px',
                maxWidth: '380px',
                scrollSnapAlign: 'start',
                background: '#1a1a1a',
                padding: '48px 40px',
                position: 'relative',
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  fontSize: '11px',
                  fontWeight: 300,
                  color: 'rgba(255,255,255,0.08)',
                  letterSpacing: '2px',
                  marginBottom: '32px',
                }}
              >
                {f.num}
              </div>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  border: '1px solid rgba(200,184,138,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '28px',
                }}
              >
                {f.icon}
              </div>
              <h3
                style={{
                  fontFamily: "'EB Garamond', serif",
                  fontSize: '22px',
                  fontWeight: 400,
                  color: 'rgba(255,255,255,0.9)',
                  marginBottom: '14px',
                }}
              >
                {f.title}
              </h3>
              <p style={{ fontSize: '13px', fontWeight: 300, color: 'rgba(255,255,255,0.7)', lineHeight: 1.8 }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
