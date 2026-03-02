'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

const faqCategories = [
  {
    category: 'General',
    questions: [
      {
        q: 'What is Specter?',
        a: 'Specter is a unified platform for family offices that brings together portfolio management, deal pipeline, entity management, real estate, cash flow, tax optimization, document vault, and family governance into one secure application. It replaces the patchwork of spreadsheets and siloed tools that most family offices rely on today.',
      },
      {
        q: 'Who is Specter built for?',
        a: 'Specter is purpose-built for family offices managing $50M to $5B+ in assets. This includes single-family offices, multi-family offices, and wealth advisory firms that serve UHNW families. Every role from Principal to Accountant to Family Member has a tailored experience.',
      },
      {
        q: 'How is Specter different from wealth management software?',
        a: 'Traditional wealth management software focuses on portfolio tracking. Specter is a complete operational platform that also handles deal pipeline, entity structures, real estate, bill pay, tax optimization, family governance, encrypted communications, and more — all with the security and sophistication that family offices require.',
      },
      {
        q: 'Can Specter replace our current tools?',
        a: 'Yes. Most family offices come to Specter using 8-12 separate tools (Excel, QuickBooks, Dropbox, email, etc.). Specter consolidates these into one platform. For tools you want to keep, we offer integrations to pull data in automatically.',
      },
    ],
  },
  {
    category: 'Security & Privacy',
    questions: [
      {
        q: 'How is our data protected?',
        a: 'Specter uses 256-bit end-to-end encryption for all sensitive data. Documents and messages are encrypted client-side before they leave your device using libsodium (X25519 + XSalsa20-Poly1305). Even Specter employees cannot read your encrypted data. We are SOC 2 Type II certified and undergo annual penetration testing.',
      },
      {
        q: 'Is Specter multi-tenant? Can other clients see our data?',
        a: 'Specter uses PostgreSQL Row-Level Security (RLS) policies that enforce data isolation at the database level. Every query is automatically scoped to your tenant. Cross-tenant data access is architecturally impossible. Enterprise clients can also opt for a dedicated instance.',
      },
      {
        q: 'Do you support SSO?',
        a: 'Yes. Enterprise plans support SAML-based SSO with any identity provider (Okta, Azure AD, Google Workspace, etc.). We also support multi-factor authentication on all plans.',
      },
      {
        q: 'Where is our data stored?',
        a: 'Data is stored on Supabase Cloud infrastructure (AWS) with automatic encrypted backups. Enterprise clients can choose their preferred region or opt for a self-hosted deployment using our Docker configuration.',
      },
    ],
  },
  {
    category: 'Pricing & Plans',
    questions: [
      {
        q: 'Is there a free trial?',
        a: 'Yes — every plan includes a 14-day free trial with full access to all features. No credit card required to start.',
      },
      {
        q: 'What happens when the trial ends?',
        a: 'After 14 days, choose the plan that fits your needs. If you decide not to continue, your account is paused (not deleted). Your data is preserved for 90 days so you can reactivate anytime.',
      },
      {
        q: 'Can I change plans?',
        a: 'Absolutely. Upgrade instantly at any time — your charges are pro-rated. Downgrade at the end of your current billing cycle.',
      },
      {
        q: 'Do you offer annual billing?',
        a: 'Yes. Annual billing saves 20% on Starter and Professional plans. Enterprise pricing is custom and can be structured annually or multi-year.',
      },
      {
        q: 'What counts toward AUM limits?',
        a: 'AUM is calculated as the total market value of all assets tracked in Specter, including equities, alternatives, real estate (appraised value), and cash. Private investments are counted at last reported NAV.',
      },
    ],
  },
  {
    category: 'Features & Integrations',
    questions: [
      {
        q: 'What integrations are available?',
        a: 'Currently live: Plaid (12,000+ financial institutions), Interactive Brokers, Alpaca, Stripe, and Specter Terminal. Coming soon: Bloomberg, Schwab, Fidelity, QuickBooks, Xero, Slack, and DocuSign. Enterprise clients can also request custom integrations.',
      },
      {
        q: 'Does Specter support multiple currencies?',
        a: 'Yes. Specter supports 8+ currencies (USD, EUR, GBP, SAR, AED, CHF, JPY, CNY) with automatic FX conversion. You can report in any currency and track FX exposure across your portfolio.',
      },
      {
        q: 'Can we white-label the platform?',
        a: 'Enterprise plans include full white-label capabilities: custom logo, colors, fonts, and domain. Your team and family members will see your brand, not Specter\'s.',
      },
      {
        q: 'Is there an API?',
        a: 'Yes. The Specter API is a full REST API with webhooks and real-time subscriptions. Available on Professional and Enterprise plans.',
      },
    ],
  },
  {
    category: 'Onboarding & Support',
    questions: [
      {
        q: 'How long does onboarding take?',
        a: 'Most family offices are fully operational within 2-4 weeks. This includes data migration, integration setup, team training, and customization. Enterprise clients receive a dedicated onboarding manager.',
      },
      {
        q: 'Can you migrate our existing data?',
        a: 'Yes. We provide migration support for data from spreadsheets, QuickBooks, portfolio management systems, and other tools. Our team handles the heavy lifting.',
      },
      {
        q: 'What support is available?',
        a: 'Starter: email support (24-hour response). Professional: priority support with 4-hour response and dedicated Slack channel. Enterprise: dedicated account manager, phone support, and SLA guarantee.',
      },
    ],
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
        <span className="text-sm font-medium text-white">{question}</span>
        <ChevronDown
          size={16}
          className={cn(
            'text-[#64748b] shrink-0 mt-0.5 transition-transform',
            open && 'rotate-180'
          )}
        />
      </button>
      {open && (
        <div className="pb-5 -mt-1">
          <p className="text-sm text-[#94a3b8] leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQPage() {
  return (
    <div className="pt-32 pb-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Frequently asked <span className="gradient-text">questions</span>
          </h1>
          <p className="text-lg text-[#94a3b8]">
            Everything you need to know about Specter. Can&apos;t find what
            you&apos;re looking for?{' '}
            <Link href="/about#contact" className="text-[#22d3ee] hover:underline">
              Contact us
            </Link>
            .
          </p>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-10">
          {faqCategories.map((category) => (
            <div key={category.category}>
              <h2 className="text-lg font-bold text-white mb-4">{category.category}</h2>
              <div className="glass-panel px-6">
                {category.questions.map((faq, i) => (
                  <FAQItem key={i} question={faq.q} answer={faq.a} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-[#94a3b8] mb-4">Still have questions?</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/about#contact"
              className="group inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-[#0a0e17] bg-gradient-to-r from-[#22d3ee] to-[#a78bfa] rounded-lg hover:opacity-90 transition-all"
            >
              Talk to Sales
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white border border-[#1e293b] rounded-lg hover:bg-white/5 transition-colors"
            >
              Start Free Trial
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
