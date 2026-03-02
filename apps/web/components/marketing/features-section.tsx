import {
  BarChart3,
  Briefcase,
  Building2,
  FileText,
  Shield,
  Users,
  Landmark,
  Zap,
  Globe,
  Lock,
  LineChart,
  PieChart,
} from 'lucide-react';

const features = [
  {
    icon: LineChart,
    title: 'Portfolio Intelligence',
    description:
      'Real-time tracking across equities, alternatives, crypto, and private investments with multi-broker aggregation.',
    color: '#22d3ee',
  },
  {
    icon: Briefcase,
    title: 'Deal Pipeline',
    description:
      'Manage PE/VC deal flow with scoring, J-curve analytics, MOIC calculators, and automated LP report parsing.',
    color: '#a78bfa',
  },
  {
    icon: Building2,
    title: 'Entity Management',
    description:
      'Visual org charts, K-1 tracking, inter-entity loans, and automated BOI/compliance filings across all structures.',
    color: '#34d399',
  },
  {
    icon: Landmark,
    title: 'Real Estate',
    description:
      'Property maps, rental waterfalls, cap rate analysis, 1031 exchange tracking, and tenant management.',
    color: '#f59e0b',
  },
  {
    icon: PieChart,
    title: 'Cash Flow & Bill Pay',
    description:
      'Forecasting engine, sweep optimization, wire workflows, multi-level approval chains, and vendor management.',
    color: '#22d3ee',
  },
  {
    icon: BarChart3,
    title: 'Tax Optimization',
    description:
      'Tax-loss harvesting scanner, quarterly estimates, multi-state filing, QSBS tracking, and gift tax planning.',
    color: '#a78bfa',
  },
  {
    icon: FileText,
    title: 'Document Vault',
    description:
      'End-to-end encrypted document storage with version history, full-text search, and granular sharing controls.',
    color: '#34d399',
  },
  {
    icon: Users,
    title: 'Family Governance',
    description:
      'Family constitution editor, voting system, succession planning, education tracking, and meeting management.',
    color: '#f59e0b',
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description:
      'SOC 2 Type II certified, 256-bit E2E encryption, RLS multi-tenancy, SSO, and comprehensive audit trails.',
    color: '#22d3ee',
  },
  {
    icon: Zap,
    title: 'AI Copilot',
    description:
      'Natural language queries across your financial data, automated report generation, and proactive insights.',
    color: '#a78bfa',
  },
  {
    icon: Globe,
    title: 'Multi-Currency',
    description:
      'Support for 8+ currencies with automatic conversion, reporting in any denomination, and FX exposure tracking.',
    color: '#34d399',
  },
  {
    icon: Lock,
    title: 'White-Label',
    description:
      'Custom branding, colors, fonts, logos, and domain mapping. Make the platform your own for your family.',
    color: '#f59e0b',
  },
];

export function FeaturesSection() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Everything your family office needs,{' '}
            <span className="gradient-text">nothing it doesn&apos;t</span>
          </h2>
          <p className="text-lg text-[#94a3b8]">
            Built by family office operators who were tired of stitching together
            12 different tools. One platform, zero compromise.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="feature-card p-6 group"
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                style={{ backgroundColor: `${feature.color}15` }}
              >
                <feature.icon size={20} style={{ color: feature.color }} />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-[#22d3ee] transition-colors">
                {feature.title}
              </h3>
              <p className="text-sm text-[#94a3b8] leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
