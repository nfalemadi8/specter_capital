export function CTASection() {
  return (
    <section
      id="contact"
      className="cta-section"
      style={{
        padding: '200px 48px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Orb */}
      <div
        style={{
          position: 'absolute',
          width: '700px',
          height: '700px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(200,184,138,0.05) 0%, transparent 60%)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
        }}
      />

      <h2
        className="reveal-up"
        style={{
          fontFamily: "'EB Garamond', serif",
          fontSize: 'clamp(36px, 5vw, 58px)',
          fontWeight: 400,
          color: 'rgba(255,255,255,0.85)',
          marginBottom: '16px',
          position: 'relative',
        }}
      >
        Request <em style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.6)' }}>Early Access</em>
      </h2>

      <p
        className="reveal-up stagger-1"
        style={{
          fontSize: '15px',
          fontWeight: 300,
          color: 'rgba(255,255,255,0.6)',
          maxWidth: '440px',
          margin: '0 auto 48px',
          lineHeight: 1.8,
          position: 'relative',
        }}
      >
        Phantom Treasury is currently in private beta. Leave your email and we&apos;ll reach out when access opens.
      </p>

      {/* Form */}
      <div
        className="cta-form reveal-up stagger-2"
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 0,
          position: 'relative',
          maxWidth: '480px',
          margin: '0 auto',
        }}
      >
        <input
          type="email"
          className="cta-input"
          placeholder="your@email.com"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '13px',
            padding: '18px 24px',
            flex: 1,
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRight: 'none',
            color: '#fff',
            outline: 'none',
          }}
        />
        <button
          className="cta-submit"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '10px',
            fontWeight: 500,
            letterSpacing: '3px',
            textTransform: 'uppercase',
            color: '#0a0a0a',
            background: '#c8b88a',
            padding: '18px 32px',
            border: '1px solid #c8b88a',
            cursor: 'pointer',
          }}
        >
          Request
        </button>
      </div>

      <div
        className="reveal-up stagger-3"
        style={{
          fontSize: '10px',
          color: 'rgba(255,255,255,0.45)',
          marginTop: '16px',
          position: 'relative',
        }}
      >
        No spam. No data sharing. No exceptions.
      </div>
    </section>
  );
}
