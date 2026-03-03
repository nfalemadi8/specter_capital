export const metadata = {
  title: 'Privacy Policy — Phantom Treasury',
  description: 'How Phantom Treasury collects, uses, and protects your data.',
};

const sections = [
  {
    number: '1',
    title: 'Information We Collect',
    content: [
      { type: 'p', text: 'Phantom Treasury collects information necessary to provide our wealth management platform services.' },
      { type: 'p', text: 'Account Information: When you create an account, we collect your name, email address, and organization details. This information is required to provision your secure, isolated database tenant.' },
      { type: 'p', text: 'Usage Data: We collect basic technical data required to operate the platform \u2014 authentication events, session metadata, and error logs. We do not use third-party analytics services, tracking pixels, or advertising identifiers.' },
      { type: 'p', text: 'Financial Data: The financial data you input into Phantom Treasury \u2014 holdings, valuations, entity structures, transactions \u2014 is stored exclusively within your organization\u2019s secured database tenant. We do not access, analyze, or process your financial data for any purpose other than providing the platform service.' },
    ],
  },
  {
    number: '2',
    title: 'How We Use Your Information',
    content: [
      { type: 'p', text: 'We use your information solely to:' },
      { type: 'list', items: [
        'Provide and maintain the Phantom Treasury platform',
        'Authenticate your identity and manage access permissions',
        'Send essential service communications (security alerts, maintenance notices)',
        'Improve platform reliability and fix technical issues',
      ]},
      { type: 'p', text: 'We do not use your information to:' },
      { type: 'list', items: [
        'Serve advertisements',
        'Build behavioral profiles',
        'Sell or share data with third parties',
        'Train machine learning models',
        'Conduct market research',
      ]},
    ],
  },
  {
    number: '3',
    title: 'Data Storage and Security',
    content: [
      { type: 'p', text: 'All data is stored on Supabase-managed PostgreSQL infrastructure with AES-256 encryption at rest and TLS 1.3 encryption in transit. Row-level security policies ensure that database queries are scoped exclusively to your organization\u2019s data. Multi-tenant isolation is enforced at the database level.' },
    ],
  },
  {
    number: '4',
    title: 'Data Sharing',
    content: [
      { type: 'p', text: 'We do not sell, rent, or share your personal or financial data with any third party. The only circumstances under which data may be disclosed are:' },
      { type: 'list', items: [
        'With your explicit written consent',
        'To comply with applicable law, regulation, or legal process',
        'To protect the rights, safety, or property of Phantom Treasury or its users',
      ]},
    ],
  },
  {
    number: '5',
    title: 'Data Retention',
    content: [
      { type: 'p', text: 'Account data is retained for the duration of your active subscription. Upon account termination, all associated data \u2014 including financial records, entity structures, and user accounts \u2014 is permanently deleted within 30 days. Backup copies are purged within 90 days.' },
    ],
  },
  {
    number: '6',
    title: 'Your Rights',
    content: [
      { type: 'p', text: 'You have the right to:' },
      { type: 'list', items: [
        'Access all personal data we hold about you',
        'Request correction of inaccurate data',
        'Request deletion of your account and all associated data',
        'Export your financial data in standard formats (CSV, PDF)',
        'Withdraw consent for optional communications',
      ]},
      { type: 'p', text: 'To exercise any of these rights, contact privacy@phantomtreasury.com.' },
    ],
  },
  {
    number: '7',
    title: 'Changes to This Policy',
    content: [
      { type: 'p', text: 'We may update this Privacy Policy from time to time. Material changes will be communicated via email to all active account holders at least 30 days before taking effect.' },
    ],
  },
  {
    number: '8',
    title: 'Contact',
    content: [
      { type: 'p', text: 'For privacy-related inquiries:' },
      { type: 'gold', text: 'privacy@phantomtreasury.com' },
    ],
  },
];

export default function PrivacyPage() {
  return (
    <div style={{ paddingTop: '160px', paddingBottom: '80px' }}>
      {/* Hero */}
      <div className="reveal-up" style={{ maxWidth: '600px', margin: '0 auto 80px', textAlign: 'center', padding: '0 48px' }}>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 500, letterSpacing: '4px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: '20px' }}>
          Legal
        </div>
        <h1 style={{ fontFamily: "'EB Garamond', serif", fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 400, color: 'rgba(255,255,255,0.95)', lineHeight: 1.15, marginBottom: '20px' }}>
          Privacy Policy
        </h1>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: 'rgba(255,255,255,0.6)' }}>
          Last updated: March 2026
        </p>
      </div>

      {/* Content */}
      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '0 48px' }}>
        {sections.map((section, si) => (
          <div key={section.number} className={`reveal-up ${si > 0 ? 'stagger-1' : ''}`} style={{ marginBottom: '48px' }}>
            <h2 style={{ fontFamily: "'EB Garamond', serif", fontSize: '20px', fontWeight: 400, color: 'rgba(255,255,255,0.9)', marginBottom: '16px' }}>
              {section.number}. {section.title}
            </h2>
            {section.content.map((block, bi) => {
              if (block.type === 'p') {
                return (
                  <p key={bi} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, marginBottom: '16px' }}>
                    {block.text}
                  </p>
                );
              }
              if (block.type === 'gold') {
                return (
                  <span key={bi} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: '#c8b88a' }}>
                    {block.text}
                  </span>
                );
              }
              if (block.type === 'list' && 'items' in block) {
                return (
                  <ul key={bi} style={{ listStyle: 'none', padding: 0, margin: '0 0 16px 0' }}>
                    {block.items.map((item) => (
                      <li key={item} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, padding: '2px 0', display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                        <span style={{ color: '#c8b88a', flexShrink: 0 }}>—</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                );
              }
              return null;
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
