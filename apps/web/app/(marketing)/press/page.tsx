export const metadata = {
  title: 'Press — Phantom Treasury',
  description: 'Resources for journalists, analysts, and anyone writing about Phantom Treasury.',
};

const facts = [
  { label: 'Founded', value: '2026' },
  { label: 'Headquarters', value: 'Private' },
  { label: 'Status', value: 'Private Beta' },
  { label: 'Platform', value: 'Web Application' },
  { label: 'Stack', value: 'React, Next.js, Supabase, PostgreSQL' },
  { label: 'Security', value: 'Row-Level Security, AES-256, TLS 1.3' },
  { label: 'Asset Classes', value: '6+ including equities, fixed income, PE, real estate, crypto' },
  { label: 'Currencies', value: '40+' },
];

const brandAssets = [
  {
    title: 'Brand Kit (Dark)',
    description: 'Full brand guidelines on dark background. Includes logo system, color palette, typography, and usage rules.',
    meta: 'PDF \u00b7 2.4 MB',
  },
  {
    title: 'Brand Kit (Light)',
    description: 'Full brand guidelines on light background.',
    meta: 'PDF \u00b7 2.3 MB',
  },
  {
    title: 'Logo Assets',
    description: 'PT monogram, wordmark, and lockup variations in SVG and PNG formats.',
    meta: 'Coming Soon',
  },
];

export default function PressPage() {
  return (
    <div style={{ paddingTop: '160px', paddingBottom: '80px' }}>
      {/* Hero */}
      <div className="reveal-up" style={{ maxWidth: '600px', margin: '0 auto 100px', textAlign: 'center', padding: '0 48px' }}>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 500, letterSpacing: '4px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: '20px' }}>
          Press
        </div>
        <h1 style={{ fontFamily: "'EB Garamond', serif", fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 400, color: 'rgba(255,255,255,0.95)', lineHeight: 1.15, marginBottom: '20px' }}>
          Press &amp; Media
        </h1>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.8 }}>
          Resources for journalists, analysts, and anyone writing about Phantom Treasury.
        </p>
      </div>

      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '0 48px' }}>
        {/* About */}
        <div className="reveal-up" style={{ marginBottom: '80px' }}>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 500, letterSpacing: '4px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: '20px' }}>
            About Phantom Treasury
          </div>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, maxWidth: '640px' }}>
            Phantom Treasury is a private wealth management platform built for family offices. The platform consolidates holdings across entities and asset classes, automates institutional-grade reporting, and provides multi-tenant security with row-level database isolation. Founded in 2026, the company is currently in private beta.
          </p>
        </div>

        {/* Brand Assets */}
        <div className="reveal-up stagger-1" style={{ marginBottom: '80px' }}>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 500, letterSpacing: '4px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: '12px' }}>
            Brand Assets
          </div>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, marginBottom: '32px' }}>
            Download our logo, monogram, and brand guidelines for editorial use.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: 'rgba(255,255,255,0.03)' }}>
            {brandAssets.map((asset) => (
              <div key={asset.title} style={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.04)', padding: '32px' }}>
                <h3 style={{ fontFamily: "'EB Garamond', serif", fontSize: '18px', fontWeight: 400, color: 'rgba(255,255,255,0.9)', marginBottom: '12px' }}>
                  {asset.title}
                </h3>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, marginBottom: '16px' }}>
                  {asset.description}
                </p>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>
                  {asset.meta}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Key Facts */}
        <div className="reveal-up stagger-1" style={{ marginBottom: '80px' }}>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 500, letterSpacing: '4px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: '32px' }}>
            Key Facts
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px 60px' }}>
            {facts.map((fact) => (
              <div key={fact.label}>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 500, letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: '6px' }}>
                  {fact.label}
                </div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: 'rgba(255,255,255,0.9)' }}>
                  {fact.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Media Inquiries */}
        <div className="reveal-up" style={{ marginBottom: '0' }}>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 500, letterSpacing: '4px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: '16px' }}>
            Media Inquiries
          </div>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, marginBottom: '12px' }}>
            For press inquiries, interviews, or additional information:
          </p>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: '#c8b88a' }}>
            press@phantomtreasury.com
          </span>
        </div>
      </div>
    </div>
  );
}
