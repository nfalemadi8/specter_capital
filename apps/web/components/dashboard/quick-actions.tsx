'use client';

import Link from 'next/link';
import { Plus, Send, CheckCircle, Briefcase } from 'lucide-react';

const ACTIONS = [
  { label: 'New Deal', href: '/deals/new', icon: Briefcase, color: 'var(--color-primary)' },
  { label: 'Wire Transfer', href: '/cash-flow', icon: Send, color: 'var(--color-accent)' },
  { label: 'Approve Bills', href: '/bill-pay/approvals', icon: CheckCircle, color: 'var(--color-success)' },
  { label: 'Add Entity', href: '/entities', icon: Plus, color: 'var(--color-warning)' },
];

export function QuickActions() {
  return (
    <div className="flex items-center gap-2">
      {ACTIONS.map((action) => (
        <Link
          key={action.href}
          href={action.href}
          className="flex items-center gap-1.5 rounded-lg border border-[var(--color-border)] px-3 py-1.5 text-xs font-medium text-white hover:bg-[var(--color-surface-hover)] transition-colors"
        >
          <action.icon size={14} style={{ color: action.color }} />
          <span className="hidden sm:inline">{action.label}</span>
        </Link>
      ))}
    </div>
  );
}
