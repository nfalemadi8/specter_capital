const testimonials = [
  {
    quote:
      'Replace fragmented spreadsheets and siloed custodial portals with a single, real-time view across every entity, account, and asset class your family office manages.',
    author: 'Consolidation',
    role: 'One dashboard for everything',
  },
  {
    quote:
      'Generate board-ready quarterly reports, capital call summaries, and performance attribution documents in minutes — not weeks. Every metric, every benchmark, automated.',
    author: 'Reporting',
    role: 'Institutional-grade, one click',
  },
  {
    quote:
      'Your data never touches third-party analytics. No trackers, no reselling, no compromises. End-to-end encryption with hardware key support and complete audit trails.',
    author: 'Privacy',
    role: 'Zero third-party data sharing',
  },
];

export function SocialProofSection() {
  return (
    <section
      className="phantom-section"
      style={{
        padding: '160px 0',
        position: 'relative',
        borderTop: '1px solid rgba(255,255,255,0.03)',
      }}
    >
      {/* Section Header */}
      <div
        className="reveal-up"
        style={{
          maxWidth: '560px',
          margin: '0 auto 80px',
          textAlign: 'center',
          padding: '0 48px',
        }}
      >
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
            justifyContent: 'center',
            gap: '12px',
          }}
        >
          <span style={{ width: '20px', height: '1px', background: '#c8b88a', display: 'inline-block' }} />
          Why Phantom Treasury
        </div>
        <h2
          style={{
            fontFamily: "'EB Garamond', serif",
            fontSize: 'clamp(32px, 4vw, 46px)',
            fontWeight: 400,
            letterSpacing: '1px',
            color: 'rgba(255,255,255,0.95)',
            lineHeight: 1.15,
          }}
        >
          Built for Principals,<br />Not Just Analysts
        </h2>
      </div>

      {/* Testimonials Grid */}
      <div
        className="testimonials-grid"
        style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr' }}
      >
        {testimonials.map((t, i) => (
          <div
            key={i}
            className={`testimonial-cell reveal-up ${i > 0 ? `stagger-${i}` : ''}`}
            style={{
              padding: '64px 48px',
              borderRight: i < testimonials.length - 1 ? '1px solid rgba(255,255,255,0.03)' : 'none',
              transition: 'background 0.5s',
            }}
          >
            {/* Opening quote mark */}
            <span
              style={{
                fontFamily: "'EB Garamond', serif",
                fontSize: '120px',
                lineHeight: 0.6,
                color: 'rgba(200,184,138,0.06)',
                display: 'block',
                marginBottom: '24px',
              }}
            >
              &ldquo;
            </span>

            {/* Quote */}
            <div
              style={{
                fontFamily: "'EB Garamond', serif",
                fontSize: '19px',
                fontStyle: 'italic',
                color: 'rgba(255,255,255,0.7)',
                lineHeight: 1.7,
                marginBottom: '32px',
              }}
            >
              {t.quote}
            </div>

            {/* Divider */}
            <div
              style={{
                width: '24px',
                height: '1px',
                background: 'rgba(200,184,138,0.15)',
                marginBottom: '16px',
              }}
            />

            {/* Author */}
            <div
              style={{
                fontSize: '12px',
                fontWeight: 500,
                color: 'rgba(255,255,255,0.75)',
                marginBottom: '2px',
              }}
            >
              {t.author}
            </div>
            <div
              style={{
                fontSize: '10px',
                color: 'rgba(255,255,255,0.55)',
                letterSpacing: '1px',
              }}
            >
              {t.role}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
