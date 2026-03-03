'use client';

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
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
        Error
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
        Something went wrong
      </h1>
      <p
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '14px',
          color: 'rgba(255,255,255,0.5)',
          marginBottom: '32px',
        }}
      >
        An unexpected error occurred. Please try again.
      </p>
      <button
        onClick={reset}
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '10px',
          fontWeight: 500,
          letterSpacing: '3px',
          textTransform: 'uppercase',
          color: '#c8b88a',
          background: 'transparent',
          padding: '14px 32px',
          border: '1px solid rgba(200,184,138,0.15)',
          cursor: 'pointer',
          transition: 'all 0.2s',
        }}
      >
        Try Again
      </button>
    </div>
  );
}
