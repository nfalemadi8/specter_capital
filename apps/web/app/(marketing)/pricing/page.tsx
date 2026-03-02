'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Check, ArrowRight, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

const plans = [
  {
    name: 'Foundation',
    description: 'For single-family offices building operational infrastructure',
    price: '$2,500',
    period: '/month',
    aum: 'Up to $250M AUM',
    seats: '10 seats included',
    cta: 'Request Access',
    featured: false,
    features: [
      'Portfolio intelligence & analytics',
      'Entity management (up to 20)',
      'Treasury operations & bill pay',
      'Document vault (100GB, E2E encrypted)',
      'Tax dashboard & TLH scanner',
      'Family governance basics',
      'Email support (24h response)',
      '3 integrations',
    ],
  },
  {
    name: 'Enterprise',
    description: 'For established family offices with complex multi-entity structures',
    price: '$5,000',
    period: '/month',
    aum: 'Up to $1B AUM',
    seats: '25 seats included',
    cta: 'Request Access',
    featured: true,
    features: [
      'Everything in Foundation, plus:',
      'Deal pipeline & PE/VC analytics',
      'Real estate module',
      'AI Copilot',
      'Encrypted messaging',
      'Unlimited entities',
      'Document vault (1TB)',
      'Priority support (4h response)',
      'Unlimited integrations',
      'Custom report builder',
      'Dedicated Slack channel',
    ],
  },
  {
    name: 'Sovereign',
    description: 'For multi-family offices, institutions, and $1B+ single-family offices',
    price: 'Custom',
    period: '',
    aum: 'Unlimited AUM',
    seats: 'Unlimited seats',
    cta: 'Contact Us',
    featured: false,
    features: [
      'Everything in Enterprise, plus:',
      'White-label branding & custom domain',
      'SSO / SAML authentication',
      'Dedicated instance option',
      'On-premise deployment',
      '99.99% SLA guarantee',
      'Dedicated account manager',
      'Custom integrations & API access',
      'Compliance & audit reporting',
    ],
  },
];

const faqs = [
  {
    q: 'Is there a trial period?',
    a: 'Yes — 14 days of full access on any plan, no credit card required. Your data is preserved for 90 days if you choose not to continue.',
  },
  {
    q: 'Can I change plans later?',
    a: 'Upgrade instantly at any time with pro-rated charges. Downgrade at the end of your billing cycle. No penalties.',
  },
  {
    q: 'Do you offer annual billing?',
    a: 'Yes. Save 20% on Foundation and Enterprise plans with annual billing. Sovereign pricing is structured on a custom basis.',
  },
  {
    q: 'What counts toward AUM limits?',
    a: 'Total market value of all assets tracked in Phantom Treasury — equities, alternatives, real estate (appraised value), and cash. Private investments counted at last reported NAV.',
  },
  {
    q: 'What happens if we exceed our AUM tier?',
    a: 'We\'ll notify you and work together on a timeline to upgrade. No service interruption, no surprise charges.',
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[#1e293b] last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-4 py-5 text-left"
      >
        <span className="text-sm font-medium text-[#e8e0d0]">{question}</span>
        <ChevronDown
          size={16}
          className={cn(
            'text-[#c9a55a] shrink-0 mt-0.5 transition-transform duration-200',
            open && 'rotate-180'
          )}
        />
      </button>
      {open && (
        <div className="pb-5 -mt-1">
          <p className="text-sm text-[#8a919e] leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
}

export default function PricingPage() {
  return (
    <div className="relative pt-32 pb-20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 hero-glow" />
      <div className="absolute inset-0 grid-pattern opacity-[0.08]" />
      <div className="absolute top-60 left-[10%] w-80 h-80 bg-[#c9a55a]/[0.03] rounded-full blur-3xl" />
      <div className="absolute top-[40rem] right-[5%] w-96 h-96 bg-[#c9a55a]/[0.02] rounded-full blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs font-semibold text-[#c9a55a] uppercase tracking-[0.2em] mb-4">
            Planned Pricing
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-[#e8e0d0] mb-4">
            Transparent pricing,{' '}
            <span className="gradient-text">no surprises</span>
          </h1>
          <p className="text-lg text-[#8a919e]">
            No hidden fees, no long-term contracts. Start with a 14-day trial
            and scale as your family office grows.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                'relative feature-card p-8 flex flex-col',
                plan.featured && 'ring-1 ring-[#c9a55a]/40 gold-glow'
              )}
            >
              {plan.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-3 py-1 text-xs font-semibold text-[#0a0e17] bg-[#c9a55a] rounded-full">
                    Recommended
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-bold text-[#e8e0d0] mb-1">{plan.name}</h3>
                <p className="text-sm text-[#8a919e]">{plan.description}</p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-[#e8e0d0] font-mono">{plan.price}</span>
                  {plan.period && <span className="text-sm text-[#64748b]">{plan.period}</span>}
                </div>
                <div className="text-xs text-[#64748b] mt-1">{plan.aum}</div>
                <div className="text-xs text-[#64748b]">{plan.seats}</div>
              </div>

              <Link
                href={plan.name === 'Sovereign' ? '/about' : '/signup'}
                className={cn(
                  'inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold rounded-lg transition-all mb-8',
                  plan.featured
                    ? 'text-[#0a0e17] bg-[#c9a55a] hover:bg-[#d4b876] shadow-lg shadow-[#c9a55a]/15'
                    : 'text-[#e8e0d0] border border-[#1e293b] hover:border-[#c9a55a]/30 hover:bg-white/[0.02]'
                )}
              >
                {plan.cta}
                <ArrowRight size={14} />
              </Link>

              <ul className="space-y-3 flex-1">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    {i === 0 && plan.name !== 'Foundation' ? (
                      <span className="text-[#8a919e] font-medium">{feature}</span>
                    ) : (
                      <>
                        <Check size={16} className="text-[#c9a55a] mt-0.5 shrink-0" />
                        <span className="text-[#8a919e]">{feature}</span>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-[#e8e0d0] text-center mb-8">
            Pricing Questions
          </h2>
          <div className="rounded-xl border border-[#1e293b] bg-[#0f1423]/60 backdrop-blur-sm px-6">
            {faqs.map((faq, i) => (
              <FAQItem key={i} question={faq.q} answer={faq.a} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
