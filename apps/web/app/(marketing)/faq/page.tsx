'use client';

import { useState } from 'react';
import Link from 'next/link';

const faqCategories = [
  {
    category: 'General',
    questions: [
      {
        q: 'What is Phantom Treasury?',
        a: 'Phantom Treasury is a unified platform for family offices that brings together portfolio management, deal pipeline, entity management, treasury operations, tax & compliance, and family governance into one secure application. It replaces the patchwork of spreadsheets and siloed tools that most family offices rely on today.',
      },
      {
        q: 'Who is Phantom Treasury built for?',
        a: 'Phantom Treasury is purpose-built for family offices managing $50M to $5B+ in assets. This includes single-family offices, multi-family offices, and wealth advisory firms that serve UHNW families. Every role from Principal to Accountant to Family Member has a tailored experience.',
      },
      {
        q: 'How is Phantom Treasury different from wealth management software?',
        a: 'Traditional wealth management software focuses on portfolio tracking. Phantom Treasury is a complete operational platform that also handles deal pipeline, entity structures, treasury operations, tax optimization, family governance, encrypted communications, and more — all with the security and sophistication that family offices require.',
      },
    ],
  },
  {
    category: 'Platform & Features',
    questions: [
      {
        q: 'What are the six modules?',
        a: 'Phantom Treasury includes six integrated modules: Portfolio Intelligence (multi-asset tracking & analytics), Deal Pipeline (CRM for investments & acquisitions), Entity Management (legal structures & compliance), Treasury Operations (cash flow & bill pay), Tax & Compliance (planning & document management), and Family Governance (roles, voting, and succession planning).',
      },
      {
        q: 'What integrations are available?',
        a: 'Currently live: CoinGecko, Open Exchange Rates, PDF generation, and Excel export. Coming soon: Bloomberg, Schwab, Fidelity, Pershing, DocuSign, and SharePoint. Enterprise plans include API access for custom integrations.',
      },
      {
        q: 'Does Phantom Treasury support multiple currencies?',
        a: 'Yes. Phantom Treasury supports 40+ currencies with automatic FX conversion. You can report in any currency and track FX exposure across your portfolio.',
      },
      {
        q: 'Is there an API?',
        a: 'Yes. The Phantom Treasury API is a full REST API with webhooks and real-time subscriptions. Available on Enterprise plans and above.',
      },
    ],
  },
  {
    category: 'Security & Privacy',
    questions: [
      {
        q: 'How is our data protected?',
        a: 'Phantom Treasury uses AES-256 encryption at rest and TLS 1.3 for all data in transit. Documents and messages are encrypted client-side before transmission. Even Phantom Treasury employees cannot read your encrypted data. We are pursuing SOC 2 Type II certification and undergo annual penetration testing.',
      },
      {
        q: 'Is Phantom Treasury multi-tenant? Can other clients see our data?',
        a: 'Phantom Treasury uses PostgreSQL Row-Level Security (RLS) policies that enforce data isolation at the database level. Every query is automatically scoped to your tenant. Cross-tenant data access is architecturally impossible. Enterprise clients can also opt for a dedicated instance.',
      },
      {
        q: 'Where is our data stored?',
        a: 'Data is stored on Supabase Cloud infrastructure with automatic encrypted backups. Enterprise clients can choose their preferred region or opt for a self-hosted deployment.',
      },
    ],
  },
  {
    category: 'Pricing & Access',
    questions: [
      {
        q: 'What are the pricing tiers?',
        a: 'Foundation starts at $2,500/month for up to $500M AUM and 5 user seats. Enterprise is $5,000/month with unlimited AUM and seats. Sovereign is custom-priced for multi-family offices requiring dedicated infrastructure and SLA guarantees. All pricing is billed annually.',
      },
      {
        q: 'Is there a free trial?',
        a: 'Yes — 14 days of full access on any plan, no credit card required. Your data is preserved for 90 days if you choose not to continue.',
      },
      {
        q: 'Can I change plans later?',
        a: 'Absolutely. Upgrade instantly at any time — your charges are pro-rated. Downgrade at the end of your current billing cycle. No penalties.',
      },
    ],
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
      <button
        onClick={() => setOpen(!open)}
        style={{ width: '100%', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px', padding: '20px 0', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', color: 'inherit' }}
      >
        <span style={{ fontSize: '14px', fontWeight: 500, color: 'rgba(255,255,255,0.9)' }}>{question}</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c8b88a" strokeWidth="2" style={{ flexShrink: 0, marginTop: '2px', transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}>
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {open && (
        <div style={{ paddingBottom: '20px', marginTop: '-4px' }}>
          <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.8 }}>{answer}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQPage() {
  return (
    <div style={{ paddingTop: '160px', paddingBottom: '80px' }}>
      {/* Hero */}
      <div className="reveal-up" style={{ maxWidth: '560px', margin: '0 auto 80px', textAlign: 'center', padding: '0 48px' }}>
        <div style={{ fontSize: '10px', fontWeight: 500, letterSpacing: '5px', textTransform: 'uppercase', color: '#c8b88a', marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
          <span style={{ width: '20px', height: '1px', background: '#c8b88a', display: 'inline-block' }} />
          FAQ
        </div>
        <h1 style={{ fontFamily: "'EB Garamond', serif", fontSize: 'clamp(32px, 4vw, 46px)', fontWeight: 400, letterSpacing: '1px', color: 'rgba(255,255,255,0.95)', lineHeight: 1.15, marginBottom: '20px' }}>
          Common Questions
        </h1>
        <p style={{ fontSize: '15px', fontWeight: 300, color: 'rgba(255,255,255,0.6)', lineHeight: 1.8 }}>
          Everything you need to know about Phantom Treasury.
        </p>
      </div>

      {/* FAQ Categories */}
      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '0 48px' }}>
        {faqCategories.map((category, ci) => (
          <div key={category.category} className={`reveal-up ${ci > 0 ? 'stagger-1' : ''}`} style={{ marginBottom: '60px' }}>
            <div style={{ fontSize: '10px', fontWeight: 500, letterSpacing: '4px', textTransform: 'uppercase', color: '#c8b88a', marginBottom: '20px' }}>
              {category.category}
            </div>
            <div style={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.04)', padding: '0 32px' }}>
              {category.questions.map((faq, i) => (
                <FAQItem key={i} question={faq.q} answer={faq.a} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="reveal-up" style={{ textAlign: 'center', padding: '0 48px' }}>
        <div style={{ width: '24px', height: '1px', background: 'rgba(200,184,138,0.15)', margin: '0 auto 40px' }} />
        <p style={{ fontFamily: "'EB Garamond', serif", fontSize: '22px', fontWeight: 400, color: 'rgba(255,255,255,0.85)', marginBottom: '16px' }}>
          Still have questions?
        </p>
        <p style={{ fontSize: '14px', fontWeight: 300, color: 'rgba(255,255,255,0.6)', marginBottom: '32px' }}>
          Reach out directly or request early access to see the platform firsthand.
        </p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '24px', flexWrap: 'wrap' }}>
          <Link href="/signup" style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 500, letterSpacing: '3px', textTransform: 'uppercase', color: '#0a0a0a', background: '#c8b88a', padding: '18px 40px', textDecoration: 'none' }}>
            Request Early Access
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </Link>
          <Link href="/about" style={{ fontSize: '10px', fontWeight: 500, letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', textDecoration: 'none', padding: '18px 24px', border: '1px solid rgba(255,255,255,0.06)' }}>
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
