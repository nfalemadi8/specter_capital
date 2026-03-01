'use client';

import Link from 'next/link';
import { Settings, Users, Shield, Palette, CreditCard, Plug } from 'lucide-react';

const SETTINGS_SECTIONS = [
  {
    href: '/settings/team',
    icon: Users,
    label: 'Team',
    description: 'Manage team members, roles, and permissions',
  },
  {
    href: '/settings/security',
    icon: Shield,
    label: 'Security',
    description: 'Password, MFA, sessions, and encryption keys',
  },
  {
    href: '/settings/branding',
    icon: Palette,
    label: 'Branding',
    description: 'Customize logo, colors, fonts, and domain',
  },
  {
    href: '/settings/billing',
    icon: CreditCard,
    label: 'Billing',
    description: 'Subscription plans, invoices, and usage',
  },
  {
    href: '/settings/integrations',
    icon: Plug,
    label: 'Integrations',
    description: 'Connect Plaid, IBKR, Alpaca, and more',
  },
];

export default function SettingsPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="flex items-center gap-3">
        <Settings size={24} className="text-[var(--color-primary)]" />
        <h1 className="text-2xl font-bold text-white">Settings</h1>
      </div>

      <div className="space-y-3">
        {SETTINGS_SECTIONS.map(({ href, icon: Icon, label, description }) => (
          <Link
            key={href}
            href={href}
            className="flex items-center gap-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 transition-colors hover:border-[var(--color-primary)]/30"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-primary)]/10">
              <Icon size={20} className="text-[var(--color-primary)]" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-white">{label}</h3>
              <p className="text-xs text-[var(--color-muted-foreground)]">{description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
