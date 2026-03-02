import {
  LineChart,
  Briefcase,
  Building2,
  Landmark,
  PieChart,
  BarChart3,
  FileText,
  Users,
  Zap,
  Terminal,
  Shield,
  Globe,
} from 'lucide-react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Platform — Specter',
  description: 'A deep dive into every module of the Specter family office platform.',
};

const modules = [
  {
    icon: LineChart,
    title: 'Portfolio Intelligence',
    description:
      'Aggregate holdings across brokerages, banks, and custodians in real-time. Multi-asset class support including equities, fixed income, alternatives, crypto, and private investments.',
    capabilities: [
      'Real-time P&L with cost basis tracking',
      'Sector heatmaps and correlation matrices',
      'Dividend calendar and earnings tracker',
      'Benchmark overlays (S&P 500, custom)',
      'Pre-market & after-hours tracking',
      'Options chain analysis',
      'Multi-broker aggregated view',
    ],
    color: '#22d3ee',
  },
  {
    icon: Terminal,
    title: 'Specter Terminal',
    description:
      'Professional-grade trading terminal embedded directly in your family office platform. Execute trades, analyze markets, and manage positions without switching tools.',
    capabilities: [
      'Real-time candlestick charting',
      'Level 2 market data',
      'One-click order execution',
      'Watchlists and alerts',
      'Technical analysis tools',
      'News feed integration',
    ],
    color: '#a78bfa',
  },
  {
    icon: Briefcase,
    title: 'Deal Pipeline',
    description:
      'Manage your PE/VC deal flow from sourcing to exit. Kanban board, scoring engine, and deep analytics for every stage of the investment lifecycle.',
    capabilities: [
      'Visual kanban pipeline',
      'Deal scoring and ranking engine',
      'J-curve and MOIC analytics',
      'Automated LP report parsing',
      'Term sheet comparisons',
      'Due diligence checklists',
      'Exit modeling and scenario analysis',
      'Co-investment tracking',
    ],
    color: '#34d399',
  },
  {
    icon: Building2,
    title: 'Entity Management',
    description:
      'Visualize and manage your entire entity structure — LLCs, trusts, partnerships, corporations, and holding companies — all in one interactive org chart.',
    capabilities: [
      'Interactive org chart visualization',
      'K-1 tracking across entities',
      'Inter-entity loan management',
      'BOI registry compliance',
      'Filing calendar with reminders',
      'Signatory matrix',
      'Formation wizard for new entities',
      'Power of attorney tracker',
    ],
    color: '#f59e0b',
  },
  {
    icon: Landmark,
    title: 'Real Estate',
    description:
      'Manage your real estate portfolio with property maps, rental waterfalls, and financial modeling tools purpose-built for UHNW property investors.',
    capabilities: [
      'Interactive property map view',
      'Rental income waterfalls',
      'Cap rate and yield analysis',
      '1031 exchange tracking',
      'Renovation budget management',
      'Tenant management portal',
      'Depreciation schedules',
      'Vacancy monitoring',
    ],
    color: '#22d3ee',
  },
  {
    icon: PieChart,
    title: 'Cash Flow & Bill Pay',
    description:
      'Full visibility into cash flow across all accounts and entities. Forecast, optimize, and automate payments with multi-level approval workflows.',
    capabilities: [
      'Cash flow forecasting engine',
      'Sweep account optimization',
      'Wire workflow with approvals',
      'Vendor management and payments',
      'Credit card reconciliation',
      'Subscription tracking',
      'Budget variance reporting',
      'Stress testing scenarios',
    ],
    color: '#a78bfa',
  },
  {
    icon: BarChart3,
    title: 'Tax Optimization',
    description:
      'Proactively optimize your tax position with automated harvesting, quarterly estimates, and multi-state filing support.',
    capabilities: [
      'Tax-loss harvesting scanner',
      'Quarterly estimated tax calculator',
      'Multi-state tax filing support',
      'QSBS qualification tracker',
      'Charitable giving optimizer',
      'Gift tax and GST planning',
      'Opportunity Zone tracking',
      'FBAR/FATCA alerts',
    ],
    color: '#34d399',
  },
  {
    icon: FileText,
    title: 'Document Vault',
    description:
      'End-to-end encrypted document management with full-text search, version history, and granular access controls.',
    capabilities: [
      '256-bit E2E encryption at rest and in transit',
      'Full-text search across all documents',
      'Version history with rollback',
      'Granular sharing permissions',
      'Automated document classification',
      'Expiration alerts for contracts',
    ],
    color: '#f59e0b',
  },
  {
    icon: Users,
    title: 'Family Governance',
    description:
      'Tools for multi-generational planning: family constitution, voting, succession planning, and education tracking for next-gen members.',
    capabilities: [
      'Family constitution editor',
      'Formal voting system with quorum',
      'Succession planning workflows',
      'Education milestone tracking',
      'Meeting management with minutes',
      'Mentorship pairing',
      'Family calendar',
      'Memory archive',
    ],
    color: '#22d3ee',
  },
  {
    icon: Zap,
    title: 'AI Copilot',
    description:
      'Ask natural language questions about your financial data and get instant, accurate answers powered by advanced AI.',
    capabilities: [
      'Natural language queries',
      'Automated report generation',
      'Proactive insight cards',
      'Document summarization',
      'Anomaly detection',
      'Meeting prep briefings',
    ],
    color: '#a78bfa',
  },
  {
    icon: Shield,
    title: 'Security & Compliance',
    description:
      'Enterprise-grade security with SOC 2 Type II certification, E2E encryption, and comprehensive audit trails.',
    capabilities: [
      'SOC 2 Type II certified',
      'Row-level security (RLS)',
      'Role-based access control (9 roles)',
      'Complete audit trail',
      'SSO / SAML support',
      'IP whitelisting',
    ],
    color: '#34d399',
  },
  {
    icon: Globe,
    title: 'Multi-Currency & White-Label',
    description:
      'Support 8+ currencies with automatic conversion. Customize the entire platform with your family office branding.',
    capabilities: [
      '8+ currency support',
      'Automatic FX conversion',
      'Custom branding (logo, colors, fonts)',
      'Custom domain mapping',
      'White-label for MFOs',
      'Localized reporting',
    ],
    color: '#f59e0b',
  },
];

export default function PlatformPage() {
  return (
    <div className="pt-32 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            One platform,{' '}
            <span className="gradient-text">every capability</span>
          </h1>
          <p className="text-lg text-[#94a3b8]">
            12 integrated modules built specifically for family offices. Replace
            your spreadsheets, your siloed tools, and your manual processes.
          </p>
        </div>

        {/* Modules */}
        <div className="space-y-16">
          {modules.map((mod, i) => (
            <div
              key={mod.title}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-10 items-start ${
                i % 2 === 1 ? 'lg:direction-rtl' : ''
              }`}
            >
              <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${mod.color}15` }}
                >
                  <mod.icon size={24} style={{ color: mod.color }} />
                </div>
                <h2 className="text-2xl font-bold text-white mb-3">{mod.title}</h2>
                <p className="text-[#94a3b8] leading-relaxed mb-6">{mod.description}</p>
              </div>

              <div className={`glass-panel p-6 ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                <h3 className="text-sm font-semibold text-[#64748b] uppercase tracking-wider mb-4">
                  Key Capabilities
                </h3>
                <ul className="space-y-3">
                  {mod.capabilities.map((cap, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm">
                      <div
                        className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                        style={{ backgroundColor: mod.color }}
                      />
                      <span className="text-[#e2e8f0]">{cap}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-20">
          <Link
            href="/register"
            className="group inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold text-[#0a0e17] bg-gradient-to-r from-[#22d3ee] to-[#a78bfa] rounded-lg hover:opacity-90 transition-all"
          >
            Start Your Free Trial
            <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
