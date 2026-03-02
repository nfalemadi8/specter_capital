import {
  LineChart,
  Briefcase,
  Building2,
  Landmark,
  PieChart,
  Shield,
} from 'lucide-react';

const modules = [
  {
    icon: LineChart,
    title: 'Portfolio Intelligence',
    description:
      'Real-time aggregation across brokerages, custodians, and alternatives. Multi-asset tracking with benchmark overlays and tax-lot visibility.',
  },
  {
    icon: Briefcase,
    title: 'Deal Pipeline',
    description:
      'PE/VC deal flow management with scoring, J-curve analytics, MOIC calculators, and automated LP report parsing.',
  },
  {
    icon: Building2,
    title: 'Entity Management',
    description:
      'Visual org charts, K-1 tracking, inter-entity loans, BOI compliance, and automated filing calendars across all structures.',
  },
  {
    icon: Landmark,
    title: 'Treasury Operations',
    description:
      'Cash flow forecasting, sweep optimization, wire workflows with multi-level approvals, and vendor payment management.',
  },
  {
    icon: PieChart,
    title: 'Tax & Compliance',
    description:
      'Tax-loss harvesting scanner, quarterly estimates, multi-state support, QSBS tracking, and comprehensive audit trails.',
  },
  {
    icon: Shield,
    title: 'Family Governance',
    description:
      'Family constitution editor, formal voting systems, succession planning, education tracking, and encrypted communications.',
  },
];

export function FeaturesSection() {
  return (
    <section className="relative py-24">
      <div className="section-divider mb-24" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs font-semibold text-[#c9a55a] uppercase tracking-[0.2em] mb-4">
            The Platform
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#e8e0d0] mb-4">
            Six modules. One operating system.
          </h2>
          <p className="text-lg text-[#8a919e]">
            Every capability your family office needs, unified under a single
            encrypted infrastructure — no more stitching together a dozen tools.
          </p>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {modules.map((mod) => (
            <div key={mod.title} className="feature-card p-6 group">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4 bg-[#c9a55a]/10">
                <mod.icon size={20} className="text-[#c9a55a]" />
              </div>
              <h3 className="text-lg font-semibold text-[#e8e0d0] mb-2 group-hover:text-[#c9a55a] transition-colors">
                {mod.title}
              </h3>
              <p className="text-sm text-[#8a919e] leading-relaxed">
                {mod.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
