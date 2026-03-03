'use client';

import { useState } from 'react';
import Link from 'next/link';

const plans = [
  {
    tier: 'Foundation',
    price: '$2,500',
    period: 'per month · billed annually',
    featured: false,
    features: ['Up to $500M AUM', '5 user seats', 'Consolidated dashboard', 'Quarterly reporting', 'Email support'],
    cta: 'Get Started',
  },
  {
    tier: 'Enterprise',
    price: '$5,000',
    period: 'per month · billed annually',
    featured: true,
    features: ['Unlimited AUM', 'Unlimited seats', 'Entity management', 'API access + webhooks', 'Dedicated CSM', 'Custom integrations'],
    cta: 'Request Access',
  },
  {
    tier: 'Sovereign',
    price: 'Custom',
    period: 'for multi-family offices',
    featured: false,
    features: ['Everything in Enterprise', 'White-label deployment', 'On-premise option', 'SLA guarantees', '24/7 dedicated support'],
    cta: 'Contact Us',
  },
];

const faqs = [
  { q: 'What counts as AUM?', a: 'Total market value of all assets tracked in Phantom Treasury — equities, alternatives, real estate (appraised value), and cash. Private investments counted at last reported NAV.' },
  { q: 'Can I switch plans?', a: 'Upgrade instantly at any time with pro-rated charges. Downgrade at the end of your billing cycle. No penalties.' },
  { q: 'Is there a free trial?', a: 'Yes — 14 days of full access on any plan, no credit card required. Your data is preserved for 90 days if you choose not to continue.' },
  { q: 'How does onboarding work?', a: 'Every client receives a dedicated onboarding specialist who maps your existing workflows to Phantom Treasury. Enterprise and Sovereign tiers include white-glove data migration.' },
  { q: 'What integrations do you support?', a: 'We connect to major custodians (Schwab, Fidelity, Pershing), market data providers, and infrastructure tools. Enterprise plans include API access for custom integrations.' },
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

export default function PricingPage() {
  return (
    <div style={{ paddingTop: '160px', paddingBottom: '80px' }}>
      <div className="reveal-up" style={{ maxWidth: '560px', margin: '0 auto 80px', textAlign: 'center', padding: '0 48px' }}>
        <div style={{ fontSize: '10px', fontWeight: 500, letterSpacing: '5px', textTransform: 'uppercase', color: '#c8b88a', marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
          <span style={{ width: '20px', height: '1px', background: '#c8b88a', display: 'inline-block' }} />
          Planned Pricing
        </div>
        <h1 style={{ fontFamily: "'EB Garamond', serif", fontSize: 'clamp(32px, 4vw, 46px)', fontWeight: 400, letterSpacing: '1px', color: 'rgba(255,255,255,0.95)', lineHeight: 1.15, marginBottom: '20px' }}>
          Aligned to Scale,<br />Not Complexity
        </h1>
        <p style={{ fontSize: '15px', fontWeight: 300, color: 'rgba(255,255,255,0.6)', lineHeight: 1.8 }}>
          No hidden fees, no long-term contracts. Pricing that scales with your family office.
        </p>
      </div>

      <div className="pricing-grid reveal-up stagger-1" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: 'rgba(255,255,255,0.03)', maxWidth: '1060px', margin: '0 auto 120px', padding: '0 48px' }}>
        {plans.map((plan) => (
          <div key={plan.tier} style={{ background: plan.featured ? 'rgba(200,184,138,0.02)' : '#0a0a0a', padding: '56px 40px', position: 'relative' }}>
            {plan.featured && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, #c8b88a, rgba(200,184,138,0.3))' }} />}
            <div style={{ fontSize: '10px', fontWeight: 500, letterSpacing: '4px', textTransform: 'uppercase', color: plan.featured ? '#c8b88a' : 'rgba(255,255,255,0.6)', marginBottom: '24px' }}>{plan.tier}</div>
            <div style={{ fontSize: '44px', fontWeight: 200, color: 'rgba(255,255,255,0.9)', letterSpacing: '-1px', marginBottom: '4px' }}>{plan.price}</div>
            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', marginBottom: '36px' }}>{plan.period}</div>
            <ul style={{ listStyle: 'none', marginBottom: '40px', padding: 0 }}>
              {plan.features.map((f) => (
                <li key={f} style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', padding: '9px 0', borderBottom: '1px solid rgba(255,255,255,0.02)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(200,184,138,0.2)', flexShrink: 0 }} />
                  {f}
                </li>
              ))}
            </ul>
            <Link href="/signup" style={{ display: 'block', width: '100%', padding: '15px', fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 500, letterSpacing: '3px', textTransform: 'uppercase', textAlign: 'center', textDecoration: 'none', border: plan.featured ? '1px solid #c8b88a' : '1px solid rgba(255,255,255,0.06)', background: plan.featured ? '#c8b88a' : 'transparent', color: plan.featured ? '#0a0a0a' : 'rgba(255,255,255,0.6)' }}>
              {plan.cta}
            </Link>
          </div>
        ))}
      </div>

      <div style={{ maxWidth: '640px', margin: '0 auto 120px', padding: '0 48px' }}>
        <div className="reveal-up" style={{ marginBottom: '40px', textAlign: 'center' }}>
          <h2 style={{ fontFamily: "'EB Garamond', serif", fontSize: '28px', fontWeight: 400, color: 'rgba(255,255,255,0.9)' }}>Pricing Questions</h2>
        </div>
        <div className="reveal-up stagger-1" style={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.04)', padding: '0 32px' }}>
          {faqs.map((faq, i) => <FAQItem key={i} question={faq.q} answer={faq.a} />)}
        </div>
      </div>

      <div className="reveal-up" style={{ textAlign: 'center', padding: '0 48px' }}>
        <Link href="/signup" style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 500, letterSpacing: '3px', textTransform: 'uppercase', color: '#0a0a0a', background: '#c8b88a', padding: '18px 40px', textDecoration: 'none' }}>
          Request Early Access
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
        </Link>
      </div>
    </div>
  );
}
