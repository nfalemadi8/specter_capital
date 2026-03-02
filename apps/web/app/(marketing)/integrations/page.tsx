import Link from 'next/link';
import { ArrowRight, ExternalLink } from 'lucide-react';

export const metadata = {
  title: 'Integrations — Specter',
  description: 'Connect your banks, brokerages, and financial tools to Specter for a unified view.',
};

const integrationCategories = [
  {
    title: 'Banking & Accounts',
    description: 'Aggregate all bank accounts, credit cards, and loans in real-time.',
    integrations: [
      {
        name: 'Plaid',
        description: 'Connect 12,000+ financial institutions for real-time balances and transactions.',
        status: 'live',
      },
      {
        name: 'Yodlee',
        description: 'Alternative aggregation for institutions not covered by Plaid.',
        status: 'coming',
      },
      {
        name: 'MX',
        description: 'Enterprise-grade data connectivity for complex account structures.',
        status: 'coming',
      },
    ],
  },
  {
    title: 'Brokerages & Trading',
    description: 'Trade and track positions across multiple brokerages.',
    integrations: [
      {
        name: 'Interactive Brokers',
        description: 'Full trading capabilities with real-time positions, P&L, and order management.',
        status: 'live',
      },
      {
        name: 'Alpaca',
        description: 'Commission-free trading API with fractional shares support.',
        status: 'live',
      },
      {
        name: 'Schwab',
        description: 'Account aggregation and position tracking for Schwab accounts.',
        status: 'coming',
      },
      {
        name: 'Fidelity',
        description: 'Institutional account connectivity for Fidelity custodied assets.',
        status: 'coming',
      },
    ],
  },
  {
    title: 'Payments & Billing',
    description: 'Automate payments, invoicing, and subscription management.',
    integrations: [
      {
        name: 'Stripe',
        description: 'Subscription billing, payment processing, and invoice management.',
        status: 'live',
      },
      {
        name: 'Bill.com',
        description: 'Accounts payable automation with approval workflows.',
        status: 'coming',
      },
      {
        name: 'ACH / Wire',
        description: 'Direct bank transfers with multi-level approval chains.',
        status: 'live',
      },
    ],
  },
  {
    title: 'Market Data',
    description: 'Real-time and historical pricing across asset classes.',
    integrations: [
      {
        name: 'Specter Terminal',
        description: 'Professional-grade market data, charting, and analytics embedded directly.',
        status: 'live',
      },
      {
        name: 'Bloomberg',
        description: 'Enterprise market data feed for institutional-grade pricing.',
        status: 'coming',
      },
      {
        name: 'Refinitiv',
        description: 'Global market data covering 70M+ instruments.',
        status: 'coming',
      },
    ],
  },
  {
    title: 'Accounting & Tax',
    description: 'Sync with your accounting and tax preparation tools.',
    integrations: [
      {
        name: 'QuickBooks',
        description: 'Two-way sync of transactions, invoices, and chart of accounts.',
        status: 'coming',
      },
      {
        name: 'Xero',
        description: 'Cloud accounting integration for international family offices.',
        status: 'coming',
      },
      {
        name: 'Avalara',
        description: 'Automated sales tax calculation for real estate and business operations.',
        status: 'coming',
      },
    ],
  },
  {
    title: 'Communication & Collaboration',
    description: 'Connect your team communication and productivity tools.',
    integrations: [
      {
        name: 'Slack',
        description: 'Notifications, alerts, and AI copilot summaries delivered to Slack channels.',
        status: 'coming',
      },
      {
        name: 'Microsoft 365',
        description: 'Calendar sync, document import, and email integration.',
        status: 'coming',
      },
      {
        name: 'DocuSign',
        description: 'E-signature workflows for deal documents, contracts, and approvals.',
        status: 'coming',
      },
    ],
  },
];

export default function IntegrationsPage() {
  return (
    <div className="pt-32 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Connect <span className="gradient-text">everything</span>
          </h1>
          <p className="text-lg text-[#94a3b8]">
            Specter integrates with the tools your family office already uses.
            Aggregate data, automate workflows, and eliminate manual entry.
          </p>
        </div>

        {/* Integration Categories */}
        <div className="space-y-16">
          {integrationCategories.map((category) => (
            <div key={category.title}>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">{category.title}</h2>
                <p className="text-[#94a3b8]">{category.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.integrations.map((integration) => (
                  <div
                    key={integration.name}
                    className="feature-card p-5 flex flex-col"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#0f1423] border border-[#1e293b] flex items-center justify-center">
                          <span className="text-xs font-bold text-[#22d3ee] font-mono">
                            {integration.name.slice(0, 2).toUpperCase()}
                          </span>
                        </div>
                        <h3 className="text-sm font-semibold text-white">{integration.name}</h3>
                      </div>
                      <span
                        className={`px-2 py-0.5 text-xs rounded-full ${
                          integration.status === 'live'
                            ? 'bg-[#34d399]/10 text-[#34d399]'
                            : 'bg-[#f59e0b]/10 text-[#f59e0b]'
                        }`}
                      >
                        {integration.status === 'live' ? 'Live' : 'Coming Soon'}
                      </span>
                    </div>
                    <p className="text-sm text-[#94a3b8] leading-relaxed">
                      {integration.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* API CTA */}
        <div className="mt-20 glass-panel p-8 sm:p-12 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <ExternalLink size={20} className="text-[#22d3ee]" />
            <h2 className="text-2xl font-bold text-white">Build Custom Integrations</h2>
          </div>
          <p className="text-[#94a3b8] max-w-xl mx-auto mb-6">
            Use the Specter API to build custom integrations with any system.
            Full REST API with webhooks, real-time subscriptions, and comprehensive documentation.
          </p>
          <Link
            href="/register"
            className="group inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-[#0a0e17] bg-gradient-to-r from-[#22d3ee] to-[#a78bfa] rounded-lg hover:opacity-90 transition-all"
          >
            Get API Access
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
