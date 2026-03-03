const items = [
  'React + Next.js',
  'Supabase + PostgreSQL',
  'Row-Level Security',
  'Multi-Tenant Architecture',
  'Real-Time Data Feeds',
  'Multi-Currency Engine',
  'REST API',
  'Role-Based Access Control',
];

export function TrustBar() {
  return (
    <div
      style={{
        padding: '40px 0',
        borderTop: '1px solid rgba(255,255,255,0.03)',
        borderBottom: '1px solid rgba(255,255,255,0.03)',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Fade edges */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          width: '120px',
          background: 'linear-gradient(to right, #0a0a0a, transparent)',
          zIndex: 2,
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          width: '120px',
          background: 'linear-gradient(to left, #0a0a0a, transparent)',
          zIndex: 2,
        }}
      />

      {/* Marquee */}
      <div
        style={{
          display: 'flex',
          gap: '80px',
          animation: 'marquee 30s linear infinite',
          width: 'max-content',
        }}
      >
        {/* Duplicate items for seamless loop */}
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            style={{
              fontFamily: "'EB Garamond', serif",
              fontSize: '15px',
              color: 'rgba(255,255,255,0.2)',
              letterSpacing: '2px',
              whiteSpace: 'nowrap',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            {item}
            <span style={{ color: 'rgba(255,255,255,0.04)', fontSize: '20px' }}>&middot;</span>
          </span>
        ))}
      </div>
    </div>
  );
}
