import Link from 'next/link';

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0a0a0a',
        padding: '48px',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          fontFamily: "'EB Garamond', serif",
          fontSize: '72px',
          fontWeight: 400,
          color: 'rgba(255,255,255,0.1)',
          marginBottom: '16px',
        }}
      >
        404
      </div>
      <h1
        style={{
          fontFamily: "'EB Garamond', serif",
          fontSize: '28px',
          fontWeight: 400,
          color: 'rgba(255,255,255,0.9)',
          marginBottom: '12px',
        }}
      >
        Page not found
      </h1>
      <p
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '14px',
          color: 'rgba(255,255,255,0.5)',
          marginBottom: '32px',
        }}
      >
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '10px',
          fontWeight: 500,
          letterSpacing: '3px',
          textTransform: 'uppercase',
          color: '#c8b88a',
          textDecoration: 'none',
          padding: '14px 32px',
          border: '1px solid rgba(200,184,138,0.15)',
          transition: 'all 0.2s',
        }}
      >
        Return Home
      </Link>
    </div>
  );
}
