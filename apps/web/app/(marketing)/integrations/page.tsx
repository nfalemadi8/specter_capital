import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Integrations — Phantom Treasury',
  description: 'Connect your custodians, market data feeds, and infrastructure to Phantom Treasury.',
};

const integrationCategories = [
  {
    title: 'Custodians & Banks',
    description: 'Aggregate accounts, balances, and transactions across all banking relationships.',
    integrations: [
      {
        name: 'Plaid',
        description: 'Connect 12,000+ financial institutions for real-time balances and transactions.',
        status: 'live' as const,
      },
      {
        name: 'Interactive Brokers',
        description: 'Full trading capabilities with real-time positions, P&L, and order management.',
        status: 'live' as const,
      },
      {
        name: 'Schwab',
        description: 'Account aggregation and position tracking for Schwab custodied assets.',
        status: 'coming' as const,
      },
      {
        name: 'Fidelity',
        description: 'Institutional account connectivity for Fidelity custodied assets.',
        status: 'coming' as const,
      },
    ],
  },
  {
    title: 'Market Data',
    description: 'Real-time and historical pricing across asset classes.',
    integrations: [
      {
        name: 'Phantom Terminal',
        description: 'Professional-grade market data, charting, and analytics embedded directly.',
        status: 'live' as const,
      },
      {
        name: 'Bloomberg',
        description: 'Enterprise market data feed for institutional-grade pricing.',
        status: 'coming' as const,
      },
      {
        name: 'Refinitiv',
        description: 'Global market data covering 70M+ instruments across all asset classes.',
        status: 'coming' as const,
      },
    ],
  },
  {
    title: 'Document & Reporting',
    description: 'Automate document generation, e-signatures, and compliance reporting.',
    integrations: [
      {
        name: 'DocuSign',
        description: 'E-signature workflows for deal documents, contracts, and approvals.',
        status: 'coming' as const,
      },
      {
        name: 'QuickBooks',
        description: 'Two-way sync of transactions, invoices, and chart of accounts.',
        status: 'coming' as const,
      },
      {
        name: 'Xero',
        description: 'Cloud accounting integration for international family offices.',
        status: 'coming' as const,
      },
    ],
  },
  {
    title: 'Infrastructure',
    description: 'Core infrastructure integrations for payments, communication, and operations.',
    integrations: [
      {
        name: 'Stripe',
        description: 'Subscription billing, payment processing, and invoice management.',
        status: 'live' as const,
      },
      {
        name: 'ACH / Wire',
        description: 'Direct bank transfers with multi-level approval chains.',
        status: 'live' as const,
      },
      {
        name: 'Slack',
        description: 'Notifications, alerts, and AI copilot summaries delivered to Slack channels.',
        status: 'coming' as const,
      },
      {
        name: 'Microsoft 365',
        description: 'Calendar sync, document import, and email integration.',
        status: 'coming' as const,
      },
    ],
  },
];

export default function IntegrationsPage() {
  return (
    <div className="relative pt-32 pb-20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 hero-glow" />
      <div className="absolute inset-0 grid-pattern opacity-[0.08]" />
      <div className="absolute top-60 left-[8%] w-72 h-72 bg-[#c8b88a]/[0.03] rounded-full blur-3xl" />
      <div className="absolute top-[50rem] right-[10%] w-80 h-80 bg-[#c8b88a]/[0.02] rounded-full blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#c8b88a]/20 bg-[#c8b88a]/5 mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-[#c8b88a]" />
            <span className="text-xs font-medium text-[#c8b88a]">Integrations</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-[#fafaf8] mb-4">
            Connect <span className="gradient-text">everything</span>
          </h1>
          <p className="text-lg text-[#8a919e]">
            Phantom Treasury integrates with the custodians, data feeds, and tools
            your family office already uses. Aggregate data, automate workflows,
            and eliminate manual entry.
          </p>
        </div>

        {/* Integration Categories */}
        <div className="space-y-16">
          {integrationCategories.map((category) => (
            <div key={category.title}>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-[#fafaf8] mb-2">{category.title}</h2>
                <p className="text-[#8a919e]">{category.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {category.integrations.map((integration) => (
                  <div
                    key={integration.name}
                    className="feature-card p-5 flex flex-col"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#0a0a0a] border border-[#1e293b] flex items-center justify-center">
                          <span className="text-xs font-bold text-[#c8b88a] font-mono">
                            {integration.name.slice(0, 2).toUpperCase()}
                          </span>
                        </div>
                        <h3 className="text-sm font-semibold text-[#fafaf8]">{integration.name}</h3>
                      </div>
                      <span
                        className={`px-2 py-0.5 text-xs rounded-full font-medium ${
                          integration.status === 'live'
                            ? 'bg-[#34d399]/10 text-[#34d399]'
                            : 'bg-[#c8b88a]/10 text-[#c8b88a]'
                        }`}
                      >
                        {integration.status === 'live' ? 'Live' : 'Coming Soon'}
                      </span>
                    </div>
                    <p className="text-sm text-[#8a919e] leading-relaxed">
                      {integration.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* API CTA */}
        <div className="mt-20 relative overflow-hidden rounded-2xl">
          <div className="absolute inset-0 bg-[#1a1a1a]" />
          <div className="absolute inset-0 grid-pattern opacity-10" />
          <div className="absolute inset-0 rounded-2xl border border-[#1e293b]" />
          <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-[#c8b88a]/30 to-transparent" />
          <div className="relative p-8 sm:p-12 text-center">
            <h2 className="text-2xl font-bold text-[#fafaf8] mb-3">Build Custom Integrations</h2>
            <p className="text-[#8a919e] max-w-xl mx-auto mb-6">
              Use the Phantom Treasury API to build custom integrations with any system.
              Full REST API with webhooks, real-time subscriptions, and comprehensive documentation.
            </p>
            <Link
              href="/signup"
              className="group inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-[#0a0a0a] bg-[#c8b88a] rounded-lg hover:bg-[#d4c596] transition-colors shadow-lg shadow-[#c8b88a]/15"
            >
              Get API Access
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
