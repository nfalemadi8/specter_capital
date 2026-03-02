import Link from 'next/link';
import { Check, ArrowRight, HelpCircle } from 'lucide-react';

export const metadata = {
  title: 'Pricing — Specter',
  description: 'Simple, transparent pricing for family offices of every size. Start free, scale as you grow.',
};

const plans = [
  {
    name: 'Starter',
    description: 'For single-family offices getting organized',
    price: '$2,500',
    period: '/month',
    aum: 'Up to $100M AUM',
    seats: '5 seats included',
    cta: 'Start Free Trial',
    popular: false,
    features: [
      'Portfolio tracking & analytics',
      'Entity management (up to 10)',
      'Document vault (50GB)',
      'Cash flow & bill pay',
      'Basic tax dashboard',
      'Email support',
      '2 integrations',
    ],
  },
  {
    name: 'Professional',
    description: 'For growing family offices with complex needs',
    price: '$7,500',
    period: '/month',
    aum: 'Up to $500M AUM',
    seats: '15 seats included',
    cta: 'Start Free Trial',
    popular: true,
    features: [
      'Everything in Starter, plus:',
      'Deal pipeline & PE/VC analytics',
      'Real estate module',
      'Tax-loss harvesting scanner',
      'AI Copilot',
      'Family governance tools',
      'Encrypted messaging',
      'Unlimited entities',
      'Document vault (500GB)',
      'Priority support',
      'Unlimited integrations',
      'Custom reports',
    ],
  },
  {
    name: 'Enterprise',
    description: 'For multi-family offices and institutions',
    price: 'Custom',
    period: '',
    aum: 'Unlimited AUM',
    seats: 'Unlimited seats',
    cta: 'Contact Sales',
    popular: false,
    features: [
      'Everything in Professional, plus:',
      'White-label branding',
      'Custom domain',
      'SSO / SAML',
      'Dedicated instance option',
      'SLA guarantee (99.99%)',
      'Dedicated account manager',
      'Custom integrations',
      'Audit & compliance reports',
      'On-premise deployment option',
      'API access',
    ],
  },
];

const faqs = [
  {
    q: 'Is there a free trial?',
    a: 'Yes — 14 days, full access, no credit card required.',
  },
  {
    q: 'What happens after the trial?',
    a: 'Choose a plan or your account pauses. No data is deleted for 90 days.',
  },
  {
    q: 'Can I change plans anytime?',
    a: 'Upgrade instantly, downgrade at end of billing cycle. Pro-rated charges always.',
  },
  {
    q: 'Do you offer annual billing?',
    a: 'Yes — save 20% with annual billing on Starter and Professional plans.',
  },
];

export default function PricingPage() {
  return (
    <div className="pt-32 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Simple, <span className="gradient-text">transparent</span> pricing
          </h1>
          <p className="text-lg text-[#94a3b8]">
            No hidden fees, no long-term contracts. Start free and scale as your
            family office grows.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative glass-panel p-8 flex flex-col ${
                plan.popular ? 'ring-1 ring-[#22d3ee]/50' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-3 py-1 text-xs font-semibold text-[#0a0e17] bg-gradient-to-r from-[#22d3ee] to-[#a78bfa] rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
                <p className="text-sm text-[#94a3b8]">{plan.description}</p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-white font-mono">{plan.price}</span>
                  <span className="text-sm text-[#64748b]">{plan.period}</span>
                </div>
                <div className="text-xs text-[#64748b] mt-1">{plan.aum}</div>
                <div className="text-xs text-[#64748b]">{plan.seats}</div>
              </div>

              <Link
                href={plan.name === 'Enterprise' ? '/about#contact' : '/register'}
                className={`inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold rounded-lg transition-all mb-8 ${
                  plan.popular
                    ? 'text-[#0a0e17] bg-gradient-to-r from-[#22d3ee] to-[#a78bfa] hover:opacity-90'
                    : 'text-white border border-[#1e293b] hover:bg-white/5'
                }`}
              >
                {plan.cta}
                <ArrowRight size={14} />
              </Link>

              <ul className="space-y-3 flex-1">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    {i === 0 && plan.name !== 'Starter' ? (
                      <span className="text-[#94a3b8] font-medium">{feature}</span>
                    ) : (
                      <>
                        <Check size={16} className="text-[#22d3ee] mt-0.5 shrink-0" />
                        <span className="text-[#94a3b8]">{feature}</span>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Quick FAQ */}
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-8">
            Frequently asked questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="glass-panel p-5">
                <div className="flex items-start gap-3">
                  <HelpCircle size={16} className="text-[#22d3ee] mt-0.5 shrink-0" />
                  <div>
                    <h3 className="text-sm font-medium text-white mb-1">{faq.q}</h3>
                    <p className="text-sm text-[#94a3b8]">{faq.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
