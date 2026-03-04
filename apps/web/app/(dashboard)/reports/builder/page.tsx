'use client';

import { useState } from 'react';
import { ChartContainer } from '@/components/shared/chart-container';
import { StatusBadge } from '@/components/shared/status-badge';
import { FileBarChart, Plus, GripVertical, X, Download, Calendar, Eye } from 'lucide-react';

interface ReportSection {
  id: string;
  type: string;
  title: string;
  enabled: boolean;
}

const AVAILABLE_SECTIONS: { type: string; title: string; description: string }[] = [
  { type: 'executive_summary', title: 'Executive Summary', description: 'High-level overview of portfolio performance and key metrics' },
  { type: 'net_worth', title: 'Net Worth Summary', description: 'Total net worth breakdown by asset class and entity' },
  { type: 'portfolio_performance', title: 'Portfolio Performance', description: 'Holdings performance with P&L, returns, and benchmarks' },
  { type: 'asset_allocation', title: 'Asset Allocation', description: 'Current allocation vs target with drift analysis' },
  { type: 'cash_flow', title: 'Cash Flow Analysis', description: 'Inflows and outflows by category with trends' },
  { type: 'real_estate', title: 'Real Estate Summary', description: 'Property values, rental income, and cap rates' },
  { type: 'private_investments', title: 'Private Investments', description: 'Deal pipeline, capital calls, IRR, and MOIC' },
  { type: 'tax_summary', title: 'Tax Summary', description: 'Estimated liability, TLH opportunities, and quarterly payments' },
  { type: 'entity_structure', title: 'Entity Structure', description: 'Org chart and entity-level financial summary' },
  { type: 'compliance', title: 'Compliance Status', description: 'Filing deadlines, audit trail, and regulatory status' },
];

export default function ReportBuilderPage() {
  const [reportName, setReportName] = useState('Monthly Family Office Report');
  const [dateRange, setDateRange] = useState<'monthly' | 'quarterly' | 'annual' | 'custom'>('monthly');
  const [sections, setSections] = useState<ReportSection[]>([
    { id: '1', type: 'executive_summary', title: 'Executive Summary', enabled: true },
    { id: '2', type: 'net_worth', title: 'Net Worth Summary', enabled: true },
    { id: '3', type: 'portfolio_performance', title: 'Portfolio Performance', enabled: true },
    { id: '4', type: 'asset_allocation', title: 'Asset Allocation', enabled: true },
  ]);
  const [generating, setGenerating] = useState(false);

  const addSection = (type: string) => {
    const template = AVAILABLE_SECTIONS.find(s => s.type === type);
    if (!template) return;
    setSections(prev => [...prev, {
      id: Date.now().toString(),
      type,
      title: template.title,
      enabled: true,
    }]);
  };

  const removeSection = (id: string) => {
    setSections(prev => prev.filter(s => s.id !== id));
  };

  const moveSection = (id: string, direction: 'up' | 'down') => {
    setSections(prev => {
      const idx = prev.findIndex(s => s.id === id);
      if (idx < 0) return prev;
      const newIdx = direction === 'up' ? idx - 1 : idx + 1;
      if (newIdx < 0 || newIdx >= prev.length) return prev;
      const copy = [...prev];
      [copy[idx], copy[newIdx]] = [copy[newIdx], copy[idx]];
      return copy;
    });
  };

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => setGenerating(false), 2000);
  };

  const unusedSections = AVAILABLE_SECTIONS.filter(
    as => !sections.some(s => s.type === as.type)
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-[family-name:var(--font-display)] text-2xl font-normal text-white/90">Report Builder</h1>
        <div className="flex gap-2">
          <button className="flex items-center gap-1.5 rounded border border-white/[0.06] px-3 py-2 text-xs text-white/40 transition-colors hover:border-white/10 hover:text-white/60">
            <Eye size={13} /> Preview
          </button>
          <button
            onClick={handleGenerate}
            disabled={generating || sections.length === 0}
            className="flex items-center gap-1.5 rounded bg-[var(--phantom-gold)] px-4 py-2 text-xs font-medium text-[#0a0a0a] transition-colors hover:bg-[#d4c496] disabled:opacity-50"
          >
            <Download size={13} /> {generating ? 'Generating...' : 'Generate PDF'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Report Configuration */}
        <div className="xl:col-span-2 space-y-4">
          {/* Report Name */}
          <div className="rounded border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
            <label className="mb-2 block text-[10px] font-medium uppercase tracking-[2px] text-white/30">Report Name</label>
            <input
              value={reportName}
              onChange={e => setReportName(e.target.value)}
              className="w-full rounded border border-white/[0.06] bg-white/[0.03] px-3 py-2.5 text-sm text-white/80 outline-none focus:border-white/10"
            />
          </div>

          {/* Date Range */}
          <div className="rounded border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
            <label className="mb-3 block text-[10px] font-medium uppercase tracking-[2px] text-white/30">Date Range</label>
            <div className="flex gap-2">
              {(['monthly', 'quarterly', 'annual', 'custom'] as const).map(dr => (
                <button
                  key={dr}
                  onClick={() => setDateRange(dr)}
                  className={`rounded border px-4 py-2 text-xs capitalize transition-colors ${
                    dateRange === dr
                      ? 'border-[var(--phantom-gold)]/30 bg-[var(--phantom-gold)]/10 text-[var(--phantom-gold)]'
                      : 'border-white/[0.06] text-white/40 hover:border-white/10 hover:text-white/60'
                  }`}
                >
                  {dr}
                </button>
              ))}
            </div>
          </div>

          {/* Report Sections */}
          <ChartContainer title="Report Sections" subtitle={`${sections.length} sections selected`}>
            <div className="space-y-2">
              {sections.map((section, idx) => (
                <div key={section.id} className="flex items-center gap-3 rounded border border-white/[0.04] bg-white/[0.02] p-3">
                  <GripVertical size={14} className="cursor-grab text-white/20" />
                  <span className="flex-1 text-sm text-white/70">{section.title}</span>
                  <StatusBadge label={`#${idx + 1}`} variant="default" />
                  <div className="flex gap-1">
                    <button onClick={() => moveSection(section.id, 'up')} disabled={idx === 0} className="rounded p-1 text-white/20 transition-colors hover:text-white/50 disabled:opacity-30">↑</button>
                    <button onClick={() => moveSection(section.id, 'down')} disabled={idx === sections.length - 1} className="rounded p-1 text-white/20 transition-colors hover:text-white/50 disabled:opacity-30">↓</button>
                    <button onClick={() => removeSection(section.id)} className="rounded p-1 text-white/20 transition-colors hover:text-[var(--phantom-danger)]">
                      <X size={14} />
                    </button>
                  </div>
                </div>
              ))}
              {sections.length === 0 && (
                <p className="py-6 text-center text-sm text-white/30">
                  No sections selected. Add sections from the panel on the right.
                </p>
              )}
            </div>
          </ChartContainer>
        </div>

        {/* Available Sections */}
        <div>
          <ChartContainer title="Available Sections">
            <div className="space-y-2">
              {unusedSections.map(section => (
                <button
                  key={section.type}
                  onClick={() => addSection(section.type)}
                  className="w-full rounded border border-white/[0.04] p-3 text-left transition-colors hover:border-[rgba(200,184,138,0.15)] hover:bg-white/[0.02]"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white/70">{section.title}</span>
                    <Plus size={14} className="text-[var(--phantom-gold)]" />
                  </div>
                  <p className="mt-1 text-xs text-white/30">{section.description}</p>
                </button>
              ))}
              {unusedSections.length === 0 && (
                <p className="py-4 text-center text-xs text-white/30">All sections added</p>
              )}
            </div>
          </ChartContainer>
        </div>
      </div>
    </div>
  );
}
