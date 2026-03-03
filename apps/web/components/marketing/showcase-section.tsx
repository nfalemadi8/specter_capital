export function ShowcaseSection() {
  return (
    <section
      id="showcase"
      className="showcase-section"
      style={{ padding: '120px 48px 160px', position: 'relative', overflow: 'hidden' }}
    >
      {/* Label */}
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <div
          className="reveal-up"
          style={{
            fontSize: '10px',
            fontWeight: 500,
            letterSpacing: '5px',
            textTransform: 'uppercase',
            color: '#c8b88a',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
          }}
        >
          <span style={{ width: '20px', height: '1px', background: '#c8b88a', display: 'inline-block' }} />
          The Platform
        </div>
        <h2
          className="reveal-up stagger-1"
          style={{
            fontFamily: "'EB Garamond', serif",
            fontSize: 'clamp(28px, 3.5vw, 40px)',
            fontWeight: 400,
            color: 'rgba(255,255,255,0.9)',
            textAlign: 'center',
          }}
        >
          Built for how family offices actually work
        </h2>
      </div>

      {/* Browser Frame */}
      <div className="reveal-scale stagger-2" style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative' }}>
        {/* Glow */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '800px',
            height: '400px',
            background: 'radial-gradient(ellipse, rgba(200,184,138,0.06) 0%, transparent 70%)',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
          }}
        />

        <div
          style={{
            background: 'rgba(26,26,26,0.8)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '8px',
            overflow: 'hidden',
            backdropFilter: 'blur(20px)',
          }}
        >
          {/* Browser Bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '14px 20px',
              background: 'rgba(0,0,0,0.4)',
              borderBottom: '1px solid rgba(255,255,255,0.04)',
            }}
          >
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />
            <div
              style={{
                marginLeft: '12px',
                fontSize: '10px',
                color: 'rgba(255,255,255,0.35)',
                letterSpacing: '1px',
                flex: 1,
                textAlign: 'center',
              }}
            >
              app.phantomtreasury.com / dashboard
            </div>
            <div style={{ width: 40 }} />
          </div>

          {/* Browser Content */}
          <div className="browser-content" style={{ display: 'grid', gridTemplateColumns: '200px 1fr', minHeight: '500px' }}>
            {/* Sidebar */}
            <div
              className="dash-sidebar"
              style={{
                background: 'rgba(0,0,0,0.3)',
                borderRight: '1px solid rgba(255,255,255,0.03)',
                padding: '24px 0',
              }}
            >
              {[
                { label: 'Dashboard', active: true, icon: <svg viewBox="0 0 24 24" style={{ width: 16, height: 16, stroke: 'currentColor', fill: 'none', strokeWidth: 1.5 }}><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg> },
                { label: 'Portfolios', icon: <svg viewBox="0 0 24 24" style={{ width: 16, height: 16, stroke: 'currentColor', fill: 'none', strokeWidth: 1.5 }}><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg> },
                { label: 'Entities', icon: <svg viewBox="0 0 24 24" style={{ width: 16, height: 16, stroke: 'currentColor', fill: 'none', strokeWidth: 1.5 }}><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /></svg> },
                { label: 'Transactions', icon: <svg viewBox="0 0 24 24" style={{ width: 16, height: 16, stroke: 'currentColor', fill: 'none', strokeWidth: 1.5 }}><rect x="1" y="4" width="22" height="16" rx="2" /><path d="M1 10h22" /></svg> },
                { label: 'Reports', icon: <svg viewBox="0 0 24 24" style={{ width: 16, height: 16, stroke: 'currentColor', fill: 'none', strokeWidth: 1.5 }}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><path d="M14 2v6h6" /></svg> },
                { label: 'Documents', icon: <svg viewBox="0 0 24 24" style={{ width: 16, height: 16, stroke: 'currentColor', fill: 'none', strokeWidth: 1.5 }}><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" /></svg> },
                { label: 'Settings', icon: <svg viewBox="0 0 24 24" style={{ width: 16, height: 16, stroke: 'currentColor', fill: 'none', strokeWidth: 1.5 }}><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9" /></svg> },
              ].map((item) => (
                <div
                  key={item.label}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '11px 20px',
                    fontSize: '11px',
                    color: item.active ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.35)',
                    cursor: 'default',
                    background: item.active ? 'rgba(200,184,138,0.04)' : 'transparent',
                    borderLeft: item.active ? '2px solid #c8b88a' : '2px solid transparent',
                  }}
                >
                  {item.icon}
                  {item.label}
                </div>
              ))}
            </div>

            {/* Main Content */}
            <div className="dash-main-grid" style={{ padding: '28px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', alignContent: 'start' }}>
              {/* Card 1 */}
              <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)', padding: '24px', borderRadius: '4px' }}>
                <div style={{ fontSize: '9px', fontWeight: 500, letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)', marginBottom: '10px' }}>Consolidated Net Worth</div>
                <div style={{ fontSize: '28px', fontWeight: 200, letterSpacing: '-0.5px', color: 'rgba(255,255,255,0.85)', marginBottom: '4px', fontVariantNumeric: 'tabular-nums' }}>Live · All Entities</div>
                <div style={{ fontSize: '11px', fontWeight: 500, color: '#4a9e6e' }}>Real-time across all custodians</div>
              </div>
              {/* Card 2 */}
              <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)', padding: '24px', borderRadius: '4px' }}>
                <div style={{ fontSize: '9px', fontWeight: 500, letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)', marginBottom: '10px' }}>Active Currencies</div>
                <div style={{ fontSize: '28px', fontWeight: 200, letterSpacing: '-0.5px', color: 'rgba(255,255,255,0.85)', marginBottom: '4px', fontVariantNumeric: 'tabular-nums' }}>40+ Supported</div>
                <div style={{ fontSize: '11px', fontWeight: 500, color: '#4a9e6e' }}>Live FX conversion</div>
              </div>
              {/* Chart Card (full width) */}
              <div style={{ gridColumn: '1 / -1', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)', padding: '24px', borderRadius: '4px' }}>
                <div style={{ fontSize: '9px', fontWeight: 500, letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)', marginBottom: '10px' }}>Portfolio Performance — Configurable Time Range</div>
                <div style={{ marginTop: '16px', height: '80px' }}>
                  <svg viewBox="0 0 600 80" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
                    <defs>
                      <linearGradient id="cg" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="rgba(200,184,138,0.15)" />
                        <stop offset="100%" stopColor="rgba(200,184,138,0)" />
                      </linearGradient>
                    </defs>
                    <path d="M0,60 Q50,55 100,48 T200,35 T300,40 T400,28 T500,22 T600,12" fill="none" stroke="rgba(200,184,138,0.4)" strokeWidth="1.5" />
                    <path d="M0,60 Q50,55 100,48 T200,35 T300,40 T400,28 T500,22 T600,12 V80 H0 Z" fill="url(#cg)" />
                  </svg>
                </div>
              </div>
              {/* Holdings Card (full width) */}
              <div style={{ gridColumn: '1 / -1', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)', padding: '24px', borderRadius: '4px' }}>
                <div style={{ fontSize: '9px', fontWeight: 500, letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)', marginBottom: '10px' }}>Asset Allocation by Class</div>
                <div style={{ marginTop: '12px' }}>
                  {[
                    { name: 'Public Equities', val: 'Stocks, ETFs, ADRs', pct: 'Real-time' },
                    { name: 'Private Equity', val: 'Fund Commitments, Co-Investments', pct: 'NAV Updated' },
                    { name: 'Real Estate', val: 'Direct Holdings, REITs, Funds', pct: 'Appraised' },
                    { name: 'Fixed Income', val: 'Bonds, Credit, Treasuries', pct: 'Mark-to-Market' },
                    { name: 'Alternatives', val: 'Hedge Funds, Crypto, Commodities', pct: 'Live Feed' },
                  ].map((row) => (
                    <div
                      key={row.name}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        padding: '10px 0',
                        borderBottom: '1px solid rgba(255,255,255,0.03)',
                        fontSize: '12px',
                      }}
                    >
                      <span style={{ color: 'rgba(255,255,255,0.6)' }}>{row.name}</span>
                      <span style={{ color: 'rgba(255,255,255,0.85)', fontVariantNumeric: 'tabular-nums' }}>{row.val}</span>
                      <span style={{ color: 'rgba(255,255,255,0.55)', fontSize: '10px', minWidth: '50px', textAlign: 'right' }}>{row.pct}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
