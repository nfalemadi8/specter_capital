import Link from 'next/link';

export function HeroSection() {
  return (
    <section
      className="hero-section"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        padding: '0 48px',
      }}
    >
      {/* Orb 1 */}
      <div
        style={{
          position: 'absolute',
          width: '900px',
          height: '900px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(200,184,138,0.06) 0%, rgba(200,184,138,0.02) 30%, transparent 70%)',
          top: '-200px',
          right: '-200px',
          animation: 'orbFloat 20s ease-in-out infinite',
          pointerEvents: 'none',
        }}
      />
      {/* Orb 2 */}
      <div
        style={{
          position: 'absolute',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(90,142,196,0.03) 0%, transparent 70%)',
          bottom: '-100px',
          left: '-100px',
          animation: 'orbFloat2 25s ease-in-out infinite',
          pointerEvents: 'none',
        }}
      />

      {/* Grid Lines */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', top: 0, bottom: 0, left: '25%', width: '1px', background: 'rgba(255,255,255,0.02)' }} />
        <div style={{ position: 'absolute', top: 0, bottom: 0, left: '50%', width: '1px', background: 'rgba(255,255,255,0.02)' }} />
        <div style={{ position: 'absolute', top: 0, bottom: 0, left: '75%', width: '1px', background: 'rgba(255,255,255,0.02)' }} />
      </div>

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2, maxWidth: '800px' }}>
        <div
          className="reveal-up"
          style={{
            fontSize: '10px',
            fontWeight: 500,
            letterSpacing: '5px',
            textTransform: 'uppercase' as const,
            color: '#c8b88a',
            marginBottom: '28px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          <span style={{ width: '32px', height: '1px', background: '#c8b88a', display: 'inline-block' }} />
          Private Wealth Infrastructure
        </div>

        <h1
          className="reveal-up stagger-1"
          style={{
            fontFamily: "'EB Garamond', serif",
            fontSize: 'clamp(48px, 7vw, 86px)',
            fontWeight: 400,
            letterSpacing: '1px',
            lineHeight: 1.02,
            color: '#fff',
            marginBottom: '32px',
          }}
        >
          The Quiet Architecture<br />
          of <em style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.65)' }}>Generational Wealth</em>
        </h1>

        <p
          className="reveal-up stagger-2"
          style={{
            fontSize: '16px',
            fontWeight: 300,
            color: 'rgba(255,255,255,0.7)',
            maxWidth: '480px',
            lineHeight: 1.8,
            marginBottom: '52px',
          }}
        >
          A private operating system for family offices. Consolidate complex holdings,
          automate institutional-grade reporting, and govern multi-entity structures
          — with the discretion they demand.
        </p>

        <div className="hero-actions reveal-up stagger-3" style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <Link
            href="#contact"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '10px',
              fontWeight: 500,
              letterSpacing: '3px',
              textTransform: 'uppercase' as const,
              color: '#0a0a0a',
              background: '#c8b88a',
              padding: '18px 40px',
              border: 'none',
              cursor: 'pointer',
              textDecoration: 'none',
              position: 'relative' as const,
              overflow: 'hidden' as const,
              transition: 'transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s cubic-bezier(0.16,1,0.3,1)',
            }}
          >
            Request Early Access
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
          <Link
            href="#showcase"
            style={{
              fontSize: '12px',
              color: 'rgba(255,255,255,0.55)',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'color 0.15s',
            }}
          >
            See the Platform
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: '48px',
          left: '48px',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          zIndex: 2,
        }}
      >
        <div
          style={{
            width: '1px',
            height: '48px',
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.15), transparent)',
            animation: 'scrollPulse 2s ease-in-out infinite',
          }}
        />
        <div
          style={{
            fontSize: '8px',
            letterSpacing: '3px',
            textTransform: 'uppercase' as const,
            color: 'rgba(255,255,255,0.1)',
            writingMode: 'vertical-rl' as const,
          }}
        >
          Scroll
        </div>
      </div>
    </section>
  );
}
