import Link from 'next/link';

export function Footer() {
  return (
    <footer style={{ padding: '80px 48px', borderTop: '1px solid rgba(255,255,255,0.03)' }}>
      {/* Footer Grid */}
      <div
        className="footer-grid-layout"
        style={{
          display: 'grid',
          gridTemplateColumns: '1.5fr 1fr 1fr 1fr',
          gap: '60px',
          marginBottom: '64px',
        }}
      >
        {/* Brand */}
        <div>
          <div
            style={{
              fontFamily: "'EB Garamond', serif",
              fontSize: '20px',
              letterSpacing: '2px',
              color: 'rgba(255,255,255,0.9)',
              marginBottom: '14px',
            }}
          >
            Phantom Treasury
          </div>
          <div
            style={{
              fontSize: '12px',
              color: 'rgba(255,255,255,0.75)',
              lineHeight: 1.8,
              maxWidth: '280px',
            }}
          >
            Private wealth infrastructure for family offices that value discretion, precision, and institutional-grade control.
          </div>
        </div>

        {/* Platform */}
        <div>
          <h4
            style={{
              fontSize: '9px',
              fontWeight: 500,
              letterSpacing: '3px',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.7)',
              marginBottom: '16px',
            }}
          >
            Platform
          </h4>
          {['Features', 'Security', 'Integrations', 'Changelog'].map((label) => (
            <Link
              key={label}
              href="#"
              style={{
                display: 'block',
                fontSize: '12px',
                color: 'rgba(255,255,255,0.7)',
                textDecoration: 'none',
                padding: '5px 0',
                transition: 'color 0.15s',
              }}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Company */}
        <div>
          <h4
            style={{
              fontSize: '9px',
              fontWeight: 500,
              letterSpacing: '3px',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.7)',
              marginBottom: '16px',
            }}
          >
            Company
          </h4>
          {['About', 'Careers', 'Press', 'Contact'].map((label) => (
            <Link
              key={label}
              href="#"
              style={{
                display: 'block',
                fontSize: '12px',
                color: 'rgba(255,255,255,0.7)',
                textDecoration: 'none',
                padding: '5px 0',
                transition: 'color 0.15s',
              }}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Legal */}
        <div>
          <h4
            style={{
              fontSize: '9px',
              fontWeight: 500,
              letterSpacing: '3px',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.7)',
              marginBottom: '16px',
            }}
          >
            Legal
          </h4>
          {['Privacy Policy', 'Terms of Service', 'Security', 'Compliance'].map((label) => (
            <Link
              key={label}
              href="#"
              style={{
                display: 'block',
                fontSize: '12px',
                color: 'rgba(255,255,255,0.7)',
                textDecoration: 'none',
                padding: '5px 0',
                transition: 'color 0.15s',
              }}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: '32px',
          borderTop: '1px solid rgba(255,255,255,0.03)',
        }}
      >
        <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.6)' }}>
          &copy; 2026 Phantom Treasury. All rights reserved.
        </div>
        <div style={{ display: 'flex', gap: '24px' }}>
          <Link
            href="#"
            style={{
              color: 'rgba(255,255,255,0.6)',
              fontSize: '10px',
              textDecoration: 'none',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              transition: 'color 0.15s',
            }}
          >
            LinkedIn
          </Link>
          <Link
            href="#"
            style={{
              color: 'rgba(255,255,255,0.6)',
              fontSize: '10px',
              textDecoration: 'none',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              transition: 'color 0.15s',
            }}
          >
            Twitter
          </Link>
        </div>
      </div>
    </footer>
  );
}
