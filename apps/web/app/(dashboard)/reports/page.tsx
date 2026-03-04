'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FileText, Download, Calendar, BarChart3, Wrench } from 'lucide-react';
import { clsx } from 'clsx';

interface ReportTemplate {
  id: string;
  name: string;
  description: string;
  category: 'financial' | 'tax' | 'portfolio' | 'compliance' | 'family';
  frequency: string;
}

const REPORT_TEMPLATES: ReportTemplate[] = [
  { id: 'net-worth', name: 'Net Worth Statement', description: 'Consolidated net worth across all entities and accounts', category: 'financial', frequency: 'Monthly' },
  { id: 'portfolio-perf', name: 'Portfolio Performance', description: 'Holdings performance, P&L, and benchmark comparison', category: 'portfolio', frequency: 'Monthly' },
  { id: 'cash-flow', name: 'Cash Flow Report', description: 'Income and expense summary by entity and category', category: 'financial', frequency: 'Monthly' },
  { id: 'deal-pipeline', name: 'Deal Pipeline Summary', description: 'Active deals, stages, and projected returns', category: 'portfolio', frequency: 'Quarterly' },
  { id: 'real-estate', name: 'Real Estate Portfolio', description: 'Property values, NOI, and mortgage status', category: 'financial', frequency: 'Quarterly' },
  { id: 'tax-summary', name: 'Tax Summary', description: 'Estimated taxes, payments, and deductions by jurisdiction', category: 'tax', frequency: 'Quarterly' },
  { id: 'tlh-report', name: 'Tax Loss Harvesting', description: 'Harvesting opportunities and executed trades', category: 'tax', frequency: 'Monthly' },
  { id: 'entity-overview', name: 'Entity Structure Overview', description: 'Entity hierarchy, ownership, and compliance status', category: 'compliance', frequency: 'Annual' },
  { id: 'compliance-status', name: 'Compliance Status', description: 'Filing deadlines, FBAR, FATCA, and BOI status', category: 'compliance', frequency: 'Quarterly' },
  { id: 'family-governance', name: 'Family Governance Report', description: 'Meeting summaries, votes, and education progress', category: 'family', frequency: 'Quarterly' },
  { id: 'philanthropy', name: 'Philanthropy Report', description: 'Grants, donations, and foundation distributions', category: 'family', frequency: 'Annual' },
  { id: 'insurance-summary', name: 'Insurance Summary', description: 'All policies, coverage gaps, and renewal dates', category: 'compliance', frequency: 'Annual' },
];

const CATEGORY_STYLES: Record<string, string> = {
  financial: 'bg-[var(--color-success)]/10 text-[var(--color-success)]',
  tax: 'bg-[var(--color-warning)]/10 text-[var(--color-warning)]',
  portfolio: 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]',
  compliance: 'bg-[var(--color-danger)]/10 text-[var(--color-danger)]',
  family: 'bg-[var(--color-secondary)]/10 text-[var(--color-secondary)]',
};

export default function ReportsPage() {
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const categories = ['all', 'financial', 'portfolio', 'tax', 'compliance', 'family'];
  const filtered = categoryFilter === 'all'
    ? REPORT_TEMPLATES
    : REPORT_TEMPLATES.filter((r) => r.category === categoryFilter);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <BarChart3 size={24} className="text-[var(--color-primary)]" />
          <h1 className="text-2xl font-bold text-white">Reports</h1>
        </div>
        <Link
          href="/reports/builder"
          className="flex items-center gap-1.5 rounded border border-[var(--color-border)] px-4 py-2 text-xs text-white/60 transition-colors hover:border-white/10 hover:text-white/80"
        >
          <Wrench size={13} /> Custom Report Builder
        </Link>
      </div>

      <div className="flex gap-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCategoryFilter(c)}
            className={clsx(
              'rounded-lg px-3 py-1.5 text-xs font-medium capitalize transition-colors',
              categoryFilter === c
                ? 'bg-[var(--color-primary)] text-[var(--color-primary-foreground)]'
                : 'bg-[var(--color-surface)] text-[var(--color-muted-foreground)] hover:text-white'
            )}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((report) => (
          <div
            key={report.id}
            className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 transition-colors hover:border-[var(--color-primary)]/30"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <FileText size={18} className="text-[var(--color-primary)]" />
                <h3 className="text-sm font-medium text-white">{report.name}</h3>
              </div>
              <span className={clsx('rounded-full px-2 py-0.5 text-xs capitalize', CATEGORY_STYLES[report.category] ?? '')}>
                {report.category}
              </span>
            </div>
            <p className="mt-2 text-xs text-[var(--color-muted-foreground)]">{report.description}</p>
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-1 text-xs text-[var(--color-muted-foreground)]">
                <Calendar size={12} />
                {report.frequency}
              </div>
              <button className="flex items-center gap-1.5 rounded-lg bg-[var(--color-primary)] px-3 py-1.5 text-xs font-medium text-[var(--color-primary-foreground)] hover:bg-[var(--color-primary)]/90">
                <Download size={12} />
                Generate
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
