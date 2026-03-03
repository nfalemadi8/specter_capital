import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center', background: '#0a0a0a' }}>
      {/* Grain overlay */}
      <div className="grain" />

      <div style={{ position: 'relative', width: '100%', maxWidth: '420px', padding: '48px 24px' }}>
        {/* PT Monogram + Wordmark */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <Link href="/" style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: '16px', textDecoration: 'none' }}>
            <div style={{ width: '36px', height: '36px', border: '1px solid #c8b88a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontFamily: "'EB Garamond', serif", fontSize: '16px', fontWeight: 400, color: '#c8b88a', letterSpacing: '2px' }}>PT</span>
            </div>
            <div>
              <span style={{ fontFamily: "'EB Garamond', serif", fontSize: '18px', fontWeight: 400, letterSpacing: '4px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.85)' }}>
                Phantom Treasury
              </span>
            </div>
          </Link>
        </div>

        {children}
      </div>
    </div>
  );
}
