import Link from 'next/link';

const platformLinks = [
  { label: 'Features', href: '/platform' },
  { label: 'Security', href: '/security' },
  { label: 'Integrations', href: '/integrations' },
  { label: 'Changelog', href: '/changelog' },
];

const companyLinks = [
  { label: 'About', href: '/about' },
  { label: 'Careers', href: '/careers' },
  { label: 'Press', href: '/press' },
  { label: 'Contact', href: '/contact' },
];

const legalLinks = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Security', href: '/security' },
  { label: 'Compliance', href: '/compliance' },
];

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
          {platformLinks.map((link) => (
            <Link
              key={link.href + link.label}
              href={link.href}
              style={{
                display: 'block',
                fontSize: '12px',
                color: 'rgba(255,255,255,0.7)',
                textDecoration: 'none',
                padding: '5px 0',
                transition: 'color 0.15s',
              }}
            >
              {link.label}
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
          {companyLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                display: 'block',
                fontSize: '12px',
                color: 'rgba(255,255,255,0.7)',
                textDecoration: 'none',
                padding: '5px 0',
                transition: 'color 0.15s',
              }}
            >
              {link.label}
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
          {legalLinks.map((link) => (
            <Link
              key={link.href + link.label}
              href={link.href}
              style={{
                display: 'block',
                fontSize: '12px',
                color: 'rgba(255,255,255,0.7)',
                textDecoration: 'none',
                padding: '5px 0',
                transition: 'color 0.15s',
              }}
            >
              {link.label}
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
          <span
            style={{
              color: 'rgba(255,255,255,0.6)',
              fontSize: '10px',
              letterSpacing: '1px',
              textTransform: 'uppercase',
            }}
          >
            LinkedIn
          </span>
          <span
            style={{
              color: 'rgba(255,255,255,0.6)',
              fontSize: '10px',
              letterSpacing: '1px',
              textTransform: 'uppercase',
            }}
          >
            Twitter
          </span>
        </div>
      </div>
    </footer>
  );
}
