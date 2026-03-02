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
      {
        q: 'Can Phantom Treasury replace our current tools?',
        a: 'Yes. Most family offices come to us using 8-12 separate tools (Excel, QuickBooks, Dropbox, email, etc.). Phantom Treasury consolidates these into one platform. For tools you want to keep, we offer integrations to pull data in automatically.',
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
        a: 'Currently live: Plaid (12,000+ financial institutions), Interactive Brokers, Stripe, and Phantom Terminal for market data. Coming soon: Bloomberg, Schwab, Fidelity, QuickBooks, Xero, Slack, DocuSign, and Microsoft 365. Enterprise clients can also request custom integrations via our API.',
      },
      {
        q: 'Does Phantom Treasury support multiple currencies?',
        a: 'Yes. Phantom Treasury supports 8+ currencies (USD, EUR, GBP, SAR, AED, CHF, JPY, CNY) with automatic FX conversion. You can report in any currency and track FX exposure across your portfolio.',
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
        a: 'Phantom Treasury uses 256-bit end-to-end encryption for all sensitive data. Documents and messages are encrypted client-side before they leave your device using libsodium (X25519 + XSalsa20-Poly1305). Even Phantom Treasury employees cannot read your encrypted data. We are pursuing SOC 2 Type II certification and undergo annual penetration testing.',
      },
      {
        q: 'Is Phantom Treasury multi-tenant? Can other clients see our data?',
        a: 'Phantom Treasury uses PostgreSQL Row-Level Security (RLS) policies that enforce data isolation at the database level. Every query is automatically scoped to your tenant. Cross-tenant data access is architecturally impossible. Enterprise clients can also opt for a dedicated instance.',
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
    category: 'Pricing & Access',
    questions: [
      {
        q: 'What are the pricing tiers?',
        a: 'Foundation starts at $2,500/month for single-family offices. Enterprise is $5,000/month for multi-family offices with advanced features. Sovereign is custom-priced for institutions requiring dedicated infrastructure and SLA guarantees. All pricing is planned and subject to change during early access.',
      },
      {
        q: 'Is there an early access program?',
        a: 'Yes. Phantom Treasury is currently onboarding a select group of family offices during our early access phase. Early access members receive dedicated onboarding support, priority feature requests, and preferred pricing when we launch publicly.',
      },
      {
        q: 'Can I change plans later?',
        a: 'Absolutely. Upgrade instantly at any time — your charges are pro-rated. Downgrade at the end of your current billing cycle. Enterprise and Sovereign plans are custom and can be structured annually or multi-year.',
      },
      {
        q: 'Do you offer annual billing?',
        a: 'Yes. Annual billing saves 20% on Foundation and Enterprise plans. Sovereign pricing is fully custom and can be structured as annual or multi-year agreements.',
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
        <span className="text-sm font-medium text-[#e8e0d0]">{question}</span>
        <ChevronDown
          size={16}
          className={cn(
            'text-[#c9a55a] shrink-0 mt-0.5 transition-transform',
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

export default function FAQPage() {
  return (
    <div className="pt-32 pb-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#c9a55a]/20 bg-[#c9a55a]/5 mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-[#c9a55a]" />
            <span className="text-xs font-medium text-[#c9a55a]">FAQ</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-[#e8e0d0] mb-4">
            Frequently asked <span className="gradient-text">questions</span>
          </h1>
          <p className="text-lg text-[#8a919e]">
            Everything you need to know about Phantom Treasury. Can&apos;t find what
            you&apos;re looking for?{' '}
            <Link href="/about" className="text-[#c9a55a] hover:text-[#d4b876] transition-colors">
              Contact us
            </Link>
            .
          </p>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-10">
          {faqCategories.map((category) => (
            <div key={category.category}>
              <h2 className="text-lg font-bold text-[#e8e0d0] mb-4">{category.category}</h2>
              <div className="rounded-xl border border-[#1e293b] bg-[#0f1423]/60 px-6">
                {category.questions.map((faq, i) => (
                  <FAQItem key={i} question={faq.q} answer={faq.a} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-[#8a919e] mb-4">Still have questions?</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/about"
              className="group inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-[#0a0e17] bg-[#c9a55a] rounded-lg hover:bg-[#d4b876] transition-colors"
            >
              Talk to Us
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-[#e8e0d0] border border-[#1e293b] rounded-lg hover:bg-white/5 transition-colors"
            >
              Request Early Access
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
