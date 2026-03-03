export const metadata = {
  title: 'Compliance — Phantom Treasury',
  description: 'How Phantom Treasury meets the security and regulatory expectations of institutional clients.',
};

const controls = [
  {
    title: 'Row-Level Security',
    description: 'Every database query is scoped to the authenticated user\u2019s organization. Multi-tenant isolation is enforced at the PostgreSQL level, not the application level.',
  },
  {
    title: 'Encryption at Rest',
    description: 'All stored data is encrypted using AES-256 via Supabase\u2019s managed infrastructure. Backup data receives the same encryption standard.',
  },
  {
    title: 'Encryption in Transit',
    description: 'All data transmission uses TLS 1.3. API connections, browser sessions, and inter-service communication are encrypted end-to-end.',
  },
  {
    title: 'Role-Based Access Control',
    description: 'Four permission levels (Owner, Admin, Analyst, Viewer) provide granular control over data visibility and platform actions.',
  },
  {
    title: 'Audit Logging',
    description: 'Every data access, permission change, and authentication event is logged with timestamp, user identity, and action type.',
  },
  {
    title: 'Session Management',
    description: 'Invite-only onboarding, session timeout controls, and the ability to revoke access instantly from the admin panel.',
  },
];

const roadmap = [
  {
    title: 'SOC 2 Type II',
    status: 'Planned \u00b7 2026',
    body: 'Our architecture is designed to meet SOC 2 Trust Service Criteria. Formal audit engagement is planned as we scale beyond private beta.',
  },
  {
    title: 'GDPR Readiness',
    status: 'In Progress',
    body: 'Data handling practices are built with GDPR principles: data minimization, purpose limitation, right to erasure, and data portability are supported in the current platform.',
  },
  {
    title: 'Data Residency',
    status: 'Enterprise & Sovereign',
    body: 'Enterprise and Sovereign clients can configure data residency preferences to meet jurisdictional requirements. Available regions will expand as we onboard clients in new jurisdictions.',
  },
];

export default function CompliancePage() {
  return (
    <div style={{ paddingTop: '160px', paddingBottom: '80px' }}>
      {/* Hero */}
      <div className="reveal-up" style={{ maxWidth: '600px', margin: '0 auto 100px', textAlign: 'center', padding: '0 48px' }}>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 500, letterSpacing: '4px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: '20px' }}>
          Compliance
        </div>
        <h1 style={{ fontFamily: "'EB Garamond', serif", fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 400, color: 'rgba(255,255,255,0.95)', lineHeight: 1.15, marginBottom: '20px' }}>
          Compliance &amp; Regulatory Posture
        </h1>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.8 }}>
          How Phantom Treasury meets the security and regulatory expectations of institutional clients.
        </p>
      </div>

      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '0 48px' }}>
        {/* Our Approach */}
        <div className="reveal-up" style={{ marginBottom: '80px' }}>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 500, letterSpacing: '4px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: '20px' }}>
            Our Approach
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '640px' }}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.8 }}>
              Phantom Treasury is not a custodian, broker, or financial advisor. We are a data consolidation and reporting platform. This distinction is important — it means your assets remain with your existing custodians, and Phantom Treasury never has direct access to move, trade, or manage funds.
            </p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.8 }}>
              Our compliance posture is focused on data security, privacy, and access control — the areas most critical to family offices evaluating technology partners.
            </p>
          </div>
        </div>

        {/* Current Controls */}
        <div className="reveal-up stagger-1" style={{ marginBottom: '80px' }}>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 500, letterSpacing: '4px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: '32px' }}>
            Current Controls
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: 'rgba(255,255,255,0.03)' }}>
            {controls.map((ctrl) => (
              <div key={ctrl.title} style={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.04)', padding: '32px', position: 'relative' }}>
                <div style={{ width: '24px', height: '2px', background: '#c8b88a', marginBottom: '20px' }} />
                <h3 style={{ fontFamily: "'EB Garamond', serif", fontSize: '18px', fontWeight: 400, color: 'rgba(255,255,255,0.9)', marginBottom: '12px' }}>
                  {ctrl.title}
                </h3>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.8 }}>
                  {ctrl.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Compliance Roadmap */}
        <div className="reveal-up stagger-1" style={{ marginBottom: '80px' }}>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 500, letterSpacing: '4px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: '32px' }}>
            Compliance Roadmap
          </div>
          <div style={{ position: 'relative', paddingLeft: '32px' }}>
            {/* Vertical line */}
            <div style={{ position: 'absolute', left: '3px', top: '4px', bottom: '4px', width: '1px', background: 'rgba(255,255,255,0.06)' }} />
            {roadmap.map((item, i) => (
              <div key={item.title} style={{ position: 'relative', marginBottom: i < roadmap.length - 1 ? '40px' : 0 }}>
                <div style={{ position: 'absolute', left: '-32px', top: '4px', width: '8px', height: '8px', borderRadius: '50%', background: 'rgba(200,184,138,0.3)' }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                  <h3 style={{ fontFamily: "'EB Garamond', serif", fontSize: '18px', fontWeight: 400, color: 'rgba(255,255,255,0.9)' }}>
                    {item.title}
                  </h3>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 500, letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>
                    {item.status}
                  </span>
                </div>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.8 }}>
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Questions */}
        <div className="reveal-up">
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 500, letterSpacing: '4px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: '16px' }}>
            Questions
          </div>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, marginBottom: '12px' }}>
            We&apos;re happy to discuss our security architecture, compliance posture, or complete a vendor security assessment.
          </p>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: '#c8b88a' }}>
            compliance@phantomtreasury.com
          </span>
        </div>
      </div>
    </div>
  );
}
