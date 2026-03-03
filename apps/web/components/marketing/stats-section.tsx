const stats = [
  { target: 40, suffix: '+', label: 'Currencies Supported' },
  { target: 6, suffix: '', label: 'Asset Classes Covered' },
  { target: 46, suffix: '', label: 'Database Tables Built' },
  { target: 21, suffix: '', label: 'Migrations Deployed' },
];

export function StatsSection() {
  return (
    <div
      className="stats-grid"
      style={{
        padding: '0 48px',
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        borderBottom: '1px solid rgba(255,255,255,0.03)',
      }}
    >
      {stats.map((stat, i) => (
        <div
          key={stat.label}
          className={`stat-cell reveal-up ${i > 0 ? `stagger-${i}` : ''}`}
          style={{
            padding: '64px 32px',
            textAlign: 'center',
            borderRight: i < stats.length - 1 ? '1px solid rgba(255,255,255,0.03)' : 'none',
            position: 'relative',
          }}
        >
          <div
            data-counter=""
            data-target={stat.target}
            data-suffix={stat.suffix}
            style={{
              fontSize: '48px',
              fontWeight: 200,
              letterSpacing: '-2px',
              color: 'rgba(255,255,255,0.9)',
              marginBottom: '8px',
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            0{stat.suffix}
          </div>
          <div
            style={{
              fontSize: '10px',
              fontWeight: 500,
              letterSpacing: '4px',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.6)',
            }}
          >
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
}
