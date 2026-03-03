'use client';

import { useState } from 'react';
import Link from 'next/link';

const plans = [
  {
    tier: 'Foundation',
    price: '$2,500',
    period: '/month',
    description: 'For single-family offices with straightforward structures',
    featured: false,
    features: [
      'Up to $500M assets under view',
      '5 team seats',
      'Quarterly performance reporting',
      '3 entity structures',
      'Email support',
    ],
    cta: 'Get Started',
  },
  {
    tier: 'Enterprise',
    price: '$5,000',
    period: '/month',
    description: 'For complex family offices managing multiple entities and asset classes',
    featured: true,
    features: [
      'Unlimited assets under view',
      'Unlimited team seats',
      'Real-time performance reporting',
      'Unlimited entity structures',
      'Full API access',
      'Dedicated customer success manager',
      'Custom benchmark configuration',
      'Priority support with 4-hour SLA',
    ],
    cta: 'Get Started',
  },
  {
    tier: 'Sovereign',
    price: 'Custom',
    period: '',
    description: 'For institutions requiring white-label deployment and dedicated infrastructure',
    featured: false,
    features: [
      'Everything in Enterprise',
      'White-label platform',
      'On-premise deployment option',
      'Custom integrations',
      '24/7 dedicated support',
      'Data residency controls',
      'Custom SLA agreements',
      'Quarterly business reviews',
    ],
    cta: 'Contact Us',
  },
];

const faqs = [
  {
    q: 'What counts as assets under view?',
    a: 'Assets under view includes the total market value of all holdings tracked within Phantom Treasury, across all entities and accounts. This includes equities, fixed income, real estate valuations, private equity NAV, and any other asset class you configure.',
  },
  {
    q: 'Can I switch plans later?',
    a: 'Yes. You can upgrade or adjust your plan at any time. Changes take effect at the start of your next billing cycle. Downgrades may require adjusting entity or seat counts to fit within the new plan limits.',
  },
  {
    q: 'Is there a free trial?',
    a: 'We offer a guided onboarding period for qualified family offices rather than a self-serve trial. This ensures proper configuration of entities, permissions, and data connections from day one.',
  },
  {
    q: 'How does onboarding work?',
    a: 'Enterprise and Sovereign clients receive dedicated onboarding support including entity structure setup, custodial connection configuration, user permissions mapping, and historical data migration. Foundation clients receive guided self-serve onboarding with documentation and email support.',
  },
  {
    q: 'What integrations do you support?',
    a: 'We support connections to major custodians (Schwab, Fidelity, Pershing, BNY Mellon, Northern Trust), real-time market data feeds, and export to PDF and Excel. Bloomberg and Refinitiv integrations are on our roadmap. See our Integrations page for the full list.',
  },
];

function FAQAccordion({ items }: { items: typeof faqs }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div style={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.04)', padding: '0 32px' }}>
      {items.map((faq, i) => (
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
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, paddingBottom: '24px' }}>{faq.a}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function PricingPage() {
  return (
    <div style={{ paddingTop: '160px', paddingBottom: '80px' }}>
      {/* Hero */}
      <div className="reveal-up" style={{ maxWidth: '600px', margin: '0 auto 80px', textAlign: 'center', padding: '0 48px' }}>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 500, letterSpacing: '4px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: '20px' }}>
          Pricing
        </div>
        <h1 style={{ fontFamily: "'EB Garamond', serif", fontSize: '48px', fontWeight: 400, color: 'rgba(255,255,255,0.95)', lineHeight: 1.15, marginBottom: '20px' }}>
          Aligned to Scale, Not Complexity
        </h1>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.8 }}>
          Planned Pricing — Phantom Treasury is currently in private beta
        </p>
      </div>

      {/* Pricing Grid */}
      <div className="reveal-up stagger-1" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: 'rgba(255,255,255,0.03)', maxWidth: '1060px', margin: '0 auto 120px', padding: '0 48px' }}>
        {plans.map((plan) => (
          <div key={plan.tier} style={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.04)', padding: '48px', position: 'relative' }}>
            {plan.featured && (
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, #c8b88a, transparent)' }} />
            )}
            <div style={{ fontFamily: "'EB Garamond', serif", fontSize: '24px', fontWeight: 400, color: 'rgba(255,255,255,0.9)', marginBottom: '16px' }}>
              {plan.tier}
            </div>
            <div style={{ marginBottom: '8px' }}>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '36px', fontWeight: 300, color: 'rgba(255,255,255,0.9)' }}>{plan.price}</span>
              {plan.period && (
                <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', marginLeft: '4px' }}>{plan.period}</span>
              )}
            </div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, marginBottom: '32px' }}>
              {plan.description}
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 40px 0' }}>
              {plan.features.map((f) => (
                <li key={f} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: 'rgba(255,255,255,0.6)', padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.02)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#c8b88a', flexShrink: 0, opacity: 0.4 }} />
                  {f}
                </li>
              ))}
            </ul>
            <Link
              href="/signup"
              style={{
                display: 'block',
                width: '100%',
                padding: '16px',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '10px',
                fontWeight: 500,
                letterSpacing: '3px',
                textTransform: 'uppercase' as const,
                textAlign: 'center' as const,
                textDecoration: 'none',
                border: plan.featured ? 'none' : '1px solid rgba(255,255,255,0.06)',
                background: plan.featured ? '#c8b88a' : 'transparent',
                color: plan.featured ? '#0a0a0a' : 'rgba(255,255,255,0.6)',
                boxSizing: 'border-box' as const,
              }}
            >
              {plan.cta}
            </Link>
          </div>
        ))}
      </div>

      {/* FAQ Section */}
      <div style={{ maxWidth: '720px', margin: '0 auto 120px', padding: '0 48px' }}>
        <div className="reveal-up" style={{ marginBottom: '40px' }}>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 500, letterSpacing: '4px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: '24px', textAlign: 'center' }}>
            Frequently Asked Questions
          </div>
        </div>
        <div className="reveal-up stagger-1">
          <FAQAccordion items={faqs} />
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="reveal-up" style={{ textAlign: 'center', padding: '0 48px' }}>
        <Link href="/signup" style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 500, letterSpacing: '3px', textTransform: 'uppercase', color: '#0a0a0a', background: '#c8b88a', padding: '18px 40px', textDecoration: 'none' }}>
          Request Early Access
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
        </Link>
      </div>
    </div>
  );
}
