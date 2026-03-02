import Link from 'next/link';
import { ArrowRight, LineChart, Briefcase, Building2, Landmark, PieChart, Shield } from 'lucide-react';

export const metadata = {
  title: 'Platform — Phantom Treasury',
  description: 'Six modules. One operating system. A deep dive into the Phantom Treasury platform.',
};

const modules = [
  {
    number: '01',
    icon: LineChart,
    title: 'Portfolio Intelligence',
    description:
      'Aggregate holdings across brokerages, banks, and custodians in real-time. Multi-asset class support spanning equities, fixed income, alternatives, crypto, and private investments — with the analytical depth your CIO expects.',
    capabilities: [
      'Real-time P&L with cost basis and tax-lot tracking',
      'Sector heatmaps and correlation matrices',
      'Benchmark overlays (S&P 500, MSCI, custom)',
      'Dividend calendar and earnings tracker',
      'Pre-market and after-hours monitoring',
      'Options chain analysis',
      'Multi-broker aggregated view',
    ],
  },
  {
    number: '02',
    icon: Briefcase,
    title: 'Deal Pipeline',
    description:
      'Manage your PE/VC deal flow from initial sourcing through exit. Visual kanban boards, a proprietary scoring engine, and deep analytics for every stage of the investment lifecycle — built by allocators, for allocators.',
    capabilities: [
      'Visual kanban pipeline with drag-and-drop',
      'Deal scoring and ranking engine',
      'J-curve and MOIC analytics',
      'Automated LP report parsing',
      'Term sheet comparison tool',
      'Due diligence checklists',
      'Exit modeling and scenario analysis',
      'Co-investment and follow-on tracking',
    ],
  },
  {
    number: '03',
    icon: Building2,
    title: 'Entity Management',
    description:
      'Visualize and manage your entire entity structure — LLCs, trusts, partnerships, corporations, and holding companies. Interactive org charts that make complexity legible.',
    capabilities: [
      'Interactive org chart visualization',
      'K-1 tracking across all entities',
      'Inter-entity loan management',
      'BOI registry compliance',
      'Filing calendar with automated reminders',
      'Signatory matrix and authority tracking',
      'Formation wizard for new entities',
      'Power of attorney tracker',
    ],
  },
  {
    number: '04',
    icon: Landmark,
    title: 'Treasury Operations',
    description:
      'Full visibility into cash flow across every account and entity. Forecast, optimize, and automate payments with multi-level approval workflows and sweep account management.',
    capabilities: [
      'Cash flow forecasting engine',
      'Sweep account optimization',
      'Wire workflow with multi-level approvals',
      'Vendor management and scheduled payments',
      'Credit card reconciliation',
      'Subscription and recurring expense tracking',
      'Budget variance reporting',
      'Liquidity stress testing',
    ],
  },
  {
    number: '05',
    icon: PieChart,
    title: 'Tax & Compliance',
    description:
      'Proactively optimize your tax position with automated harvesting, multi-state filing, and a complete audit trail. Every action logged, every position analyzed.',
    capabilities: [
      'Tax-loss harvesting scanner',
      'Quarterly estimated tax calculator',
      'Multi-state tax filing support',
      'QSBS qualification tracker',
      'Charitable giving optimizer',
      'Gift tax and GST planning',
      'Opportunity Zone tracking',
      'FBAR/FATCA compliance alerts',
    ],
  },
  {
    number: '06',
    icon: Shield,
    title: 'Family Governance',
    description:
      'Tools for multi-generational stewardship: family constitution management, formal voting systems, succession planning, and education tracking for next-generation members.',
    capabilities: [
      'Family constitution editor with versioning',
      'Formal voting system with quorum rules',
      'Succession planning workflows',
      'Education milestone tracking',
      'Meeting management with minutes',
      'Encrypted inter-family messaging',
      'Shared family calendar',
      'Memory and legacy archive',
    ],
  },
];

export default function PlatformPage() {
  return (
    <div className="pt-32 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-24">
          <p className="text-xs font-semibold text-[#c9a55a] uppercase tracking-[0.2em] mb-4">
            The Platform
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-[#e8e0d0] mb-4">
            Six Modules.{' '}
            <span className="gradient-text">One Operating System.</span>
          </h1>
          <p className="text-lg text-[#8a919e]">
            Every module built specifically for family office workflows. Replace
            your spreadsheets, your siloed tools, and your manual processes — with
            a single encrypted infrastructure.
          </p>
        </div>

        {/* Modules — Alternating layout */}
        <div className="space-y-20">
          {modules.map((mod, i) => (
            <div key={mod.title}>
              {i > 0 && <div className="section-divider mb-20" />}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
                {/* Text side */}
                <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-sm font-mono text-[#c9a55a] font-semibold">
                      {mod.number}
                    </span>
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#c9a55a]/10">
                      <mod.icon size={20} className="text-[#c9a55a]" />
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold text-[#e8e0d0] mb-3">{mod.title}</h2>
                  <p className="text-[#8a919e] leading-relaxed">{mod.description}</p>
                </div>

                {/* Capabilities side */}
                <div className={`glass-panel p-6 ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <h3 className="text-xs font-semibold text-[#64748b] uppercase tracking-wider mb-4">
                    Key Capabilities
                  </h3>
                  <ul className="space-y-3">
                    {mod.capabilities.map((cap, j) => (
                      <li key={j} className="flex items-start gap-3 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 bg-[#c9a55a]" />
                        <span className="text-[#e8e0d0]">{cap}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-24">
          <div className="section-divider mb-16" />
          <p className="text-xs font-semibold text-[#c9a55a] uppercase tracking-[0.2em] mb-4">
            Early Access
          </p>
          <h2 className="text-2xl font-bold text-[#e8e0d0] mb-4">
            See it in action
          </h2>
          <p className="text-[#8a919e] max-w-lg mx-auto mb-8">
            Request a walkthrough with our team and see how Phantom Treasury
            maps to your family office workflows.
          </p>
          <Link
            href="/register"
            className="group inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold text-[#0a0e17] bg-[#c9a55a] rounded-lg hover:bg-[#d4b876] transition-all"
          >
            Request Early Access
            <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
