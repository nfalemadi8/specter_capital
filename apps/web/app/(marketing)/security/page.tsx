export const metadata = {
  title: 'Security — Phantom Treasury',
  description: 'Your data. Your control. No exceptions.',
};

const sections = [
  {
    title: 'Architecture',
    description: 'Built on Supabase + PostgreSQL with row-level security enforced at the database level. Multi-tenant isolation ensures every query is scoped to the authenticated user\'s organization. No cross-tenant access is architecturally possible.',
    icon: <svg viewBox="0 0 24 24" style={{ width: 24, height: 24, stroke: '#c8b88a', strokeWidth: 1.2, fill: 'none' }}><rect x="3" y="3" width="18" height="18" rx="1" /><path d="M3 9h18M9 21V9" /></svg>,
  },
  {
    title: 'Encryption',
    description: 'AES-256 encryption at rest for all stored data. TLS 1.3 for all data in transit. Database-level encryption with automatic key rotation. Documents and messages are encrypted client-side before transmission.',
    icon: <svg viewBox="0 0 24 24" style={{ width: 24, height: 24, stroke: '#c8b88a', strokeWidth: 1.2, fill: 'none' }}><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" /></svg>,
  },
  {
    title: 'Access Control',
    description: 'Role-based access control with four predefined roles: Owner, Admin, Analyst, and Viewer. Invite-only teams with session management, IP allowlisting, and per-user permission overrides.',
    icon: <svg viewBox="0 0 24 24" style={{ width: 24, height: 24, stroke: '#c8b88a', strokeWidth: 1.2, fill: 'none' }}><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87" /></svg>,
  },
  {
    title: 'Privacy',
    description: 'Zero third-party analytics. No data reselling. No ad trackers. Every action logged with full context — who, what, when, where. Immutable audit logs for compliance and forensics, exportable for regulatory review.',
    icon: <svg viewBox="0 0 24 24" style={{ width: 24, height: 24, stroke: '#c8b88a', strokeWidth: 1.2, fill: 'none' }}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>,
  },
  {
    title: 'Compliance Roadmap',
    description: 'SOC 2 Type II certification planned. GDPR-ready architecture with configurable data retention. Data residency options available on Enterprise and Sovereign plans. Annual third-party penetration testing.',
    icon: <svg viewBox="0 0 24 24" style={{ width: 24, height: 24, stroke: '#c8b88a', strokeWidth: 1.2, fill: 'none' }}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><path d="M14 2v6h6M9 15l2 2 4-4" /></svg>,
  },
];

export default function SecurityPage() {
  return (
    <div style={{ paddingTop: '160px', paddingBottom: '80px' }}>
      {/* Hero */}
      <div className="reveal-up" style={{ maxWidth: '560px', margin: '0 auto 100px', textAlign: 'center', padding: '0 48px' }}>
        <div style={{ fontSize: '10px', fontWeight: 500, letterSpacing: '5px', textTransform: 'uppercase', color: '#c8b88a', marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
          <span style={{ width: '20px', height: '1px', background: '#c8b88a', display: 'inline-block' }} />
          Security
        </div>
        <h1 style={{ fontFamily: "'EB Garamond', serif", fontSize: 'clamp(32px, 4vw, 46px)', fontWeight: 400, letterSpacing: '1px', color: 'rgba(255,255,255,0.95)', lineHeight: 1.15, marginBottom: '20px' }}>
          Your Data. Your Control.<br />No Exceptions.
        </h1>
        <p style={{ fontSize: '15px', fontWeight: 300, color: 'rgba(255,255,255,0.6)', lineHeight: 1.8 }}>
          Security is the foundation, not a feature. Zero-knowledge encryption, multi-tenant isolation, and complete audit trails.
        </p>
      </div>

      {/* Sections */}
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 48px' }}>
        {sections.map((section, i) => (
          <div key={section.title}>
            {i > 0 && <div style={{ width: '24px', height: '1px', background: 'rgba(200,184,138,0.15)', margin: '60px 0' }} />}
            <div className={`reveal-up ${i > 0 ? 'stagger-1' : ''}`}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                {section.icon}
                <h2 style={{ fontFamily: "'EB Garamond', serif", fontSize: '24px', fontWeight: 400, color: 'rgba(255,255,255,0.9)' }}>
                  {section.title}
                </h2>
              </div>
              <p style={{ fontSize: '14px', fontWeight: 300, color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, paddingLeft: '40px' }}>
                {section.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
