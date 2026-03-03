import Link from 'next/link';

const plans = [
  {
    tier: 'Foundation',
    price: '$2,500',
    period: 'per month · billed annually',
    features: [
      'Up to $500M AUM',
      '5 user seats',
      'Consolidated dashboard',
      'Quarterly reporting',
      'Email support',
    ],
    cta: 'Get Started',
    featured: false,
  },
  {
    tier: 'Enterprise',
    price: '$5,000',
    period: 'per month · billed annually',
    features: [
      'Unlimited AUM',
      'Unlimited seats',
      'Entity management',
      'API access + webhooks',
      'Dedicated CSM',
      'Custom integrations',
    ],
    cta: 'Request Access',
    featured: true,
  },
  {
    tier: 'Sovereign',
    price: 'Custom',
    period: 'for multi-family offices',
    features: [
      'Everything in Enterprise',
      'White-label deployment',
      'On-premise option',
      'SLA guarantees',
      '24/7 dedicated support',
    ],
    cta: 'Contact Us',
    featured: false,
  },
];

export function PricingSection() {
  return (
    <section
      id="pricing"
      className="phantom-section"
      style={{ padding: '160px 48px', position: 'relative' }}
    >
      {/* Section Header */}
      <div
        className="reveal-up"
        style={{
          maxWidth: '560px',
          margin: '0 auto 80px',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontSize: '10px',
            fontWeight: 500,
            letterSpacing: '5px',
            textTransform: 'uppercase',
            color: '#c8b88a',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
          }}
        >
          <span style={{ width: '20px', height: '1px', background: '#c8b88a', display: 'inline-block' }} />
          Planned Pricing
        </div>
        <h2
          style={{
            fontFamily: "'EB Garamond', serif",
            fontSize: 'clamp(32px, 4vw, 46px)',
            fontWeight: 400,
            letterSpacing: '1px',
            color: 'rgba(255,255,255,0.95)',
            lineHeight: 1.15,
          }}
        >
          Aligned to Scale,<br />Not Complexity
        </h2>
      </div>

      {/* Pricing Grid */}
      <div
        className="pricing-grid reveal-up stagger-1"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1px',
          background: 'rgba(255,255,255,0.03)',
          maxWidth: '1060px',
          margin: '0 auto',
        }}
      >
        {plans.map((plan) => (
          <div
            key={plan.tier}
            style={{
              background: plan.featured ? 'rgba(200,184,138,0.02)' : '#0a0a0a',
              padding: '56px 40px',
              position: 'relative',
              transition: 'background 0.4s',
            }}
          >
            {/* Featured top line */}
            {plan.featured && (
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '2px',
                  background: 'linear-gradient(90deg, #c8b88a, rgba(200,184,138,0.3))',
                }}
              />
            )}

            {/* Tier */}
            <div
              style={{
                fontSize: '10px',
                fontWeight: 500,
                letterSpacing: '4px',
                textTransform: 'uppercase',
                color: plan.featured ? '#c8b88a' : 'rgba(255,255,255,0.6)',
                marginBottom: '24px',
              }}
            >
              {plan.tier}
            </div>

            {/* Price */}
            <div
              style={{
                fontSize: '44px',
                fontWeight: 200,
                color: 'rgba(255,255,255,0.9)',
                letterSpacing: '-1px',
                marginBottom: '4px',
              }}
            >
              {plan.price}
            </div>
            <div
              style={{
                fontSize: '11px',
                color: 'rgba(255,255,255,0.5)',
                marginBottom: '36px',
              }}
            >
              {plan.period}
            </div>

            {/* Features */}
            <ul style={{ listStyle: 'none', marginBottom: '40px', padding: 0 }}>
              {plan.features.map((f) => (
                <li
                  key={f}
                  style={{
                    fontSize: '13px',
                    color: 'rgba(255,255,255,0.6)',
                    padding: '9px 0',
                    borderBottom: '1px solid rgba(255,255,255,0.02)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                  }}
                >
                  <span
                    style={{
                      width: '4px',
                      height: '4px',
                      borderRadius: '50%',
                      background: 'rgba(200,184,138,0.2)',
                      flexShrink: 0,
                    }}
                  />
                  {f}
                </li>
              ))}
            </ul>

            {/* CTA */}
            <Link
              href={plan.featured ? '/signup' : '#contact'}
              style={{
                display: 'block',
                width: '100%',
                padding: '15px',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '10px',
                fontWeight: 500,
                letterSpacing: '3px',
                textTransform: 'uppercase',
                textAlign: 'center',
                textDecoration: 'none',
                border: plan.featured ? '1px solid #c8b88a' : '1px solid rgba(255,255,255,0.06)',
                background: plan.featured ? '#c8b88a' : 'transparent',
                color: plan.featured ? '#0a0a0a' : 'rgba(255,255,255,0.6)',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {plan.cta}
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
