'use client';

import { useState } from 'react';
import Link from 'next/link';

const faqCategories = [
  {
    category: 'General',
    questions: [
      {
        q: 'What is Phantom Treasury?',
        a: 'A private operating system for family offices that consolidates holdings across all entities and asset classes, automates institutional-grade reporting, and governs multi-entity structures with role-based security — all in one platform.',
      },
      {
        q: 'Who is Phantom Treasury built for?',
        a: 'Single-family offices, multi-family offices, and private wealth advisors managing $50M or more in assets across multiple entities and asset classes. If you\u2019re coordinating between multiple custodians, legal structures, and reporting requirements, Phantom Treasury is designed for you.',
      },
      {
        q: 'Is Phantom Treasury live?',
        a: 'We\u2019re currently in private beta. Core infrastructure is built and functional — 46 database tables, 21 migrations, multi-tenant security, and the full application framework are in place. You can request early access at our signup page.',
      },
    ],
  },
  {
    category: 'Platform & Features',
    questions: [
      {
        q: 'What asset classes do you support?',
        a: 'Listed equities, fixed income (including government bonds, corporate bonds, and Sukuk), private equity, hedge funds, real estate, cryptocurrency, commodities, and alternative investments. Each asset class has its own valuation methodology.',
      },
      {
        q: 'How many currencies do you support?',
        a: '40+ currencies with real-time foreign exchange conversion. Multi-currency portfolios are normalized automatically, and you can view any position in your base currency or its native denomination.',
      },
      {
        q: 'Can I manage multiple entities?',
        a: 'Yes. Trusts, LLCs, foundations, holding companies, and any other legal structure can be modeled with full hierarchy visualization. Each entity has its own permissions, compliance documents, and reporting — or you can view everything consolidated.',
      },
      {
        q: 'Do you support real-time data?',
        a: 'Yes for listed securities, crypto, and foreign exchange rates. Private equity and hedge fund positions update via NAV feeds or manual input. Real estate and alternative investments use appraised values that you update on your own schedule.',
      },
    ],
  },
  {
    category: 'Security & Privacy',
    questions: [
      {
        q: 'How is my data protected?',
        a: 'AES-256 encryption at rest, TLS 1.3 encryption in transit, row-level security on every database query ensuring you only see your own organization\u2019s data, and role-based access control with four permission levels. Full audit logs track every data access.',
      },
      {
        q: 'Do you sell or share my data?',
        a: 'Never. Zero third-party analytics, no advertising trackers, no data reselling, no exceptions. Your financial data exists only within your organization\u2019s secured tenant. We cannot see your data, and we designed the system that way.',
      },
      {
        q: 'Are you SOC 2 certified?',
        a: 'SOC 2 Type II certification is on our compliance roadmap. Our architecture is built to meet these standards — row-level security, audit logging, encryption at rest and in transit, role-based access. Certification will be pursued as we scale beyond beta.',
      },
    ],
  },
  {
    category: 'Pricing & Access',
    questions: [
      {
        q: 'How much does it cost?',
        a: 'Plans start at $2,500 per month for the Foundation tier. Enterprise is $5,000 per month with unlimited AUM and seats. Sovereign pricing is custom for institutions requiring white-label or on-premise deployment. See our pricing page for full details.',
      },
      {
        q: 'Is there a free trial?',
        a: 'We offer a guided onboarding period for qualified family offices rather than a self-serve free trial. This ensures your entities, permissions, and custodial connections are properly configured from the start.',
      },
      {
        q: 'Can I switch plans later?',
        a: 'Yes. You can upgrade at any time, and changes take effect at the start of your next billing cycle. Downgrades may require adjusting your entity count or team seats to fit within the new plan\u2019s limits.',
      },
    ],
  },
];

function FAQCategory({ category, questions }: { category: string; questions: { q: string; a: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="reveal-up" style={{ marginBottom: '60px' }}>
      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 500, letterSpacing: '4px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: '20px' }}>
        {category}
      </div>
      <div style={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.04)', padding: '0 32px' }}>
        {questions.map((faq, i) => (
          <div key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              style={{ width: '100%', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px', padding: '24px 0', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', color: 'inherit' }}
            >
              <span style={{ fontFamily: "'EB Garamond', serif", fontSize: '18px', fontWeight: 400, color: 'rgba(255,255,255,0.9)' }}>{faq.q}</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c8b88a" strokeWidth="2" style={{ flexShrink: 0, marginTop: '4px', transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)', transform: openIndex === i ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            <div style={{ maxHeight: openIndex === i ? '500px' : '0', overflow: 'hidden', transition: 'max-height 0.3s cubic-bezier(0.16, 1, 0.3, 1)' }}>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, paddingBottom: '24px' }}>{faq.a}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function FAQPage() {
  return (
    <div style={{ paddingTop: '160px', paddingBottom: '80px' }}>
      {/* Hero */}
      <div className="reveal-up" style={{ maxWidth: '600px', margin: '0 auto 80px', textAlign: 'center', padding: '0 48px' }}>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 500, letterSpacing: '4px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: '20px' }}>
          FAQ
        </div>
        <h1 style={{ fontFamily: "'EB Garamond', serif", fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 400, color: 'rgba(255,255,255,0.95)', lineHeight: 1.15, marginBottom: '20px' }}>
          Common Questions
        </h1>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.8 }}>
          Everything you need to know about Phantom Treasury. Can&apos;t find your answer? Reach out directly.
        </p>
      </div>

      {/* FAQ Categories */}
      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '0 48px' }}>
        {faqCategories.map((cat) => (
          <FAQCategory key={cat.category} category={cat.category} questions={cat.questions} />
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="reveal-up" style={{ textAlign: 'center', padding: '0 48px' }}>
        <div style={{ width: '24px', height: '1px', background: 'rgba(200,184,138,0.15)', margin: '0 auto 40px' }} />
        <p style={{ fontFamily: "'EB Garamond', serif", fontSize: '22px', fontWeight: 400, color: 'rgba(255,255,255,0.85)', marginBottom: '16px' }}>
          Still have questions?
        </p>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: 'rgba(255,255,255,0.6)', marginBottom: '32px' }}>
          We&apos;re happy to answer anything not covered here.
        </p>
        <Link href="/signup" style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 500, letterSpacing: '3px', textTransform: 'uppercase', color: '#0a0a0a', background: '#c8b88a', padding: '18px 40px', textDecoration: 'none' }}>
          Get in Touch
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
        </Link>
      </div>
    </div>
  );
}
