'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import {
  LineChart,
  Briefcase,
  Building2,
  Landmark,
  PieChart,
  Shield,
  ArrowRight,
} from 'lucide-react';

const modules = [
  {
    title: 'Portfolio Intelligence',
    description: 'Multi-asset tracking, analytics, and real-time P&L across all accounts.',
    icon: LineChart,
    href: '/portfolio',
  },
  {
    title: 'Deal Pipeline',
    description: 'PE/VC deal flow management with scoring, J-curve analytics, and exit modeling.',
    icon: Briefcase,
    href: '/deals',
  },
  {
    title: 'Entity Management',
    description: 'Interactive org charts, K-1 tracking, and compliance for all entities.',
    icon: Building2,
    href: '/entities',
  },
  {
    title: 'Treasury Operations',
    description: 'Cash flow forecasting, wire workflows, and sweep account optimization.',
    icon: Landmark,
    href: '/cash-flow',
  },
  {
    title: 'Tax & Compliance',
    description: 'Tax-loss harvesting, multi-state filing, and full audit trail.',
    icon: PieChart,
    href: '/tax',
  },
  {
    title: 'Family Governance',
    description: 'Constitution management, voting systems, and succession planning.',
    icon: Shield,
    href: '/governance',
  },
];

export default function DashboardPage() {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUserEmail(data.user?.email ?? null);
    });
  }, [supabase]);

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#e8e0d0]">
          Welcome to <span className="text-[#c9a55a]">Phantom Treasury</span>
        </h1>
        {userEmail && (
          <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">
            Signed in as <span className="text-[#e8e0d0]">{userEmail}</span>
          </p>
        )}
      </div>

      {/* Module Cards */}
      <div>
        <h2 className="text-sm font-semibold text-[var(--color-muted-foreground)] uppercase tracking-wider mb-4">
          Modules
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {modules.map((mod) => (
            <Link
              key={mod.href}
              href={mod.href}
              className="group rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 hover:border-[#c9a55a]/30 transition-colors"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-lg bg-[#c9a55a]/10 flex items-center justify-center">
                  <mod.icon size={18} className="text-[#c9a55a]" />
                </div>
                <h3 className="text-sm font-semibold text-[#e8e0d0]">{mod.title}</h3>
              </div>
              <p className="text-xs text-[var(--color-muted-foreground)] leading-relaxed mb-3">
                {mod.description}
              </p>
              <span className="inline-flex items-center gap-1 text-xs text-[#c9a55a] group-hover:gap-1.5 transition-all">
                Open
                <ArrowRight size={12} />
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Quick Stats Placeholder */}
      <div>
        <h2 className="text-sm font-semibold text-[var(--color-muted-foreground)] uppercase tracking-wider mb-4">
          Overview
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Total Net Worth', value: '--', sub: 'Connect accounts to populate' },
            { label: 'Liquid Assets', value: '--', sub: 'Cash + public securities' },
            { label: 'YTD Return', value: '--', sub: 'vs. benchmarks' },
            { label: 'Pending Actions', value: '0', sub: 'Bills, approvals, filings' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5"
            >
              <p className="text-xs text-[var(--color-muted-foreground)] mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-[#e8e0d0] font-mono">{stat.value}</p>
              <p className="text-xs text-[var(--color-muted)] mt-1">{stat.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
