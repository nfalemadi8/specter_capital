export const metadata = {
  title: 'Terms of Service — Phantom Treasury',
  description: 'Terms governing your use of the Phantom Treasury platform.',
};

const sections = [
  {
    number: '1',
    title: 'Acceptance of Terms',
    content: [
      { type: 'p', text: 'By accessing or using the Phantom Treasury platform, you agree to be bound by these Terms of Service. If you do not agree to these terms, you may not access or use the platform. These terms constitute a legally binding agreement between you and Phantom Treasury.' },
    ],
  },
  {
    number: '2',
    title: 'Description of Service',
    content: [
      { type: 'p', text: 'Phantom Treasury provides a web-based wealth management platform designed for family offices. The platform enables users to consolidate financial holdings, manage entity structures, generate reports, and analyze portfolio performance. The platform is provided on a subscription basis as described in our pricing plans.' },
    ],
  },
  {
    number: '3',
    title: 'Account Registration',
    content: [
      { type: 'p', text: 'To use the platform, you must create an account and provide accurate, complete registration information. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must notify us immediately of any unauthorized access.' },
      { type: 'p', text: 'Each account is associated with a single organization. Access to the organization\u2019s data is governed by role-based permissions set by the account Owner.' },
    ],
  },
  {
    number: '4',
    title: 'Acceptable Use',
    content: [
      { type: 'p', text: 'You agree to use the platform only for lawful purposes and in accordance with these terms. You may not:' },
      { type: 'list', items: [
        'Use the platform for any illegal or unauthorized purpose',
        'Attempt to gain unauthorized access to other users\u2019 data or organizations',
        'Interfere with or disrupt the platform\u2019s infrastructure',
        'Reverse-engineer, decompile, or attempt to extract source code',
        'Share account credentials with unauthorized individuals',
        'Use automated tools to scrape or extract data from the platform',
      ]},
    ],
  },
  {
    number: '5',
    title: 'Data Ownership',
    content: [
      { type: 'p', text: 'You retain full ownership of all financial data, entity structures, documents, and other content you input into the platform. Phantom Treasury does not claim any ownership or license to your data beyond what is necessary to provide the platform service.' },
      { type: 'p', text: 'You grant Phantom Treasury a limited, non-exclusive license to store, process, and display your data solely for the purpose of operating the platform and providing the services you have subscribed to.' },
    ],
  },
  {
    number: '6',
    title: 'Subscription and Payment',
    content: [
      { type: 'p', text: 'Access to the platform requires a paid subscription. Pricing is as described on our pricing page and may be updated with 30 days notice. Subscriptions are billed monthly in advance. Late payments may result in service suspension after a 14-day grace period.' },
      { type: 'p', text: 'Refunds are provided on a case-by-case basis at Phantom Treasury\u2019s discretion.' },
    ],
  },
  {
    number: '7',
    title: 'Service Availability',
    content: [
      { type: 'p', text: 'Phantom Treasury aims to maintain high platform availability but does not guarantee uninterrupted service. Scheduled maintenance will be communicated at least 48 hours in advance. We are not liable for downtime caused by factors beyond our reasonable control, including but not limited to internet outages, third-party service failures, or force majeure events.' },
    ],
  },
  {
    number: '8',
    title: 'Limitation of Liability',
    content: [
      { type: 'p', text: 'Phantom Treasury is a data consolidation and reporting platform. It is not a financial advisor, broker, or custodian. The platform does not provide investment advice, and nothing displayed on the platform should be interpreted as a recommendation to buy, sell, or hold any financial instrument.' },
      { type: 'p', text: 'To the maximum extent permitted by law, Phantom Treasury\u2019s total liability for any claims arising from these terms or use of the platform is limited to the amount you paid in subscription fees during the 12 months preceding the claim.' },
    ],
  },
  {
    number: '9',
    title: 'Termination',
    content: [
      { type: 'p', text: 'Either party may terminate the subscription with 30 days written notice. Upon termination, you will have 30 days to export your data. After this period, all data associated with your account will be permanently deleted in accordance with our Privacy Policy.' },
      { type: 'p', text: 'Phantom Treasury reserves the right to suspend or terminate accounts that violate these terms, with notice where practicable.' },
    ],
  },
  {
    number: '10',
    title: 'Governing Law',
    content: [
      { type: 'p', text: 'These terms are governed by applicable law. Any disputes arising from these terms will be resolved through binding arbitration, except where prohibited by law.' },
    ],
  },
  {
    number: '11',
    title: 'Changes to Terms',
    content: [
      { type: 'p', text: 'We may modify these terms from time to time. Material changes will be communicated to all active account holders at least 30 days before taking effect. Continued use of the platform after changes take effect constitutes acceptance of the modified terms.' },
    ],
  },
  {
    number: '12',
    title: 'Contact',
    content: [
      { type: 'p', text: 'For questions about these terms:' },
      { type: 'gold', text: 'legal@phantomtreasury.com' },
    ],
  },
];

export default function TermsPage() {
  return (
    <div style={{ paddingTop: '160px', paddingBottom: '80px' }}>
      {/* Hero */}
      <div className="reveal-up" style={{ maxWidth: '600px', margin: '0 auto 80px', textAlign: 'center', padding: '0 48px' }}>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 500, letterSpacing: '4px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: '20px' }}>
          Legal
        </div>
        <h1 style={{ fontFamily: "'EB Garamond', serif", fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 400, color: 'rgba(255,255,255,0.95)', lineHeight: 1.15, marginBottom: '20px' }}>
          Terms of Service
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
