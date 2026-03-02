'use client';

import { useQuery } from '@tanstack/react-query';
import { createClient } from '@/lib/supabase/client';
import { useTenant } from '@/lib/hooks/use-tenant';
import { formatCurrency } from '@/lib/utils/format';
import Link from 'next/link';
import { ArrowLeft, CreditCard, Check } from 'lucide-react';
import { clsx } from 'clsx';
import type { SubscriptionPlan, PlanTier } from '@specter/shared-types';

const PLAN_FEATURES: Record<PlanTier, string[]> = {
  starter: [
    '5 team seats',
    '10 entities',
    '5 accounts',
    '10 GB document storage',
    'Embedded terminal only',
    '100 AI queries/month',
    'Plaid integration',
    'Monthly reports',
    'Messaging encryption',
  ],
  professional: [
    '15 team seats',
    '50 entities',
    '25 accounts',
    '100 GB document storage',
    'Embedded + standalone terminal',
    '1,000 AI queries/month',
    'All integrations (Plaid, IBKR, Alpaca)',
    'Weekly reports',
    'Full E2E encryption',
    'Email support',
  ],
  enterprise: [
    'Unlimited seats',
    'Unlimited entities',
    'Unlimited accounts',
    'Unlimited storage',
    'Dedicated terminal instance',
    'Unlimited AI queries',
    'Custom integrations + API access',
    'Real-time reports',
    'Full E2E encryption + custom keys',
    'White-label branding',
    'Single-tenant deployment',
    'Dedicated CSM',
  ],
};

export default function BillingPage() {
  const { tenant } = useTenant();
  const supabase = createClient();

  const { data: plans } = useQuery({
    queryKey: ['plans'],
    queryFn: async () => {
      const { data } = await supabase
        .from('subscription_plans')
        .select('*')
        .order('monthly_price');
      return (data ?? []) as SubscriptionPlan[];
    },
  });

  const currentPlan = tenant?.plan ?? 'starter';

  const handleUpgrade = async (planId: string) => {
    try {
      const response = await fetch('/api/billing/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planId, tenantId: tenant?.id }),
      });

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch {
      // Handle error
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/settings" className="rounded-lg p-2 hover:bg-[var(--color-surface-hover)]">
          <ArrowLeft size={20} className="text-[var(--color-muted-foreground)]" />
        </Link>
        <div className="flex items-center gap-2">
          <CreditCard size={24} className="text-[var(--color-primary)]" />
          <h1 className="text-2xl font-bold text-white">Billing & Plans</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {plans?.map((plan) => {
          const isCurrentPlan = plan.id === currentPlan;
          const features = PLAN_FEATURES[plan.id as PlanTier] ?? [];
          return (
            <div
              key={plan.id}
              className={clsx(
                'rounded-xl border p-6',
                isCurrentPlan
                  ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/5'
                  : 'border-[var(--color-border)] bg-[var(--color-surface)]'
              )}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium capitalize text-white">{plan.name}</h3>
                {isCurrentPlan && (
                  <span className="rounded-full bg-[var(--color-primary)] px-2.5 py-0.5 text-xs font-medium text-[var(--color-primary-foreground)]">
                    Current
                  </span>
                )}
              </div>
              <div className="mt-4">
                {plan.monthly_price ? (
                  <>
                    <span className="text-3xl font-bold text-white">
                      {formatCurrency(plan.monthly_price)}
                    </span>
                    <span className="text-sm text-[var(--color-muted-foreground)]">/month</span>
                    {plan.annual_price && (
                      <p className="mt-1 text-xs text-[var(--color-muted-foreground)]">
                        or {formatCurrency(plan.annual_price)}/year (save {Math.round((1 - plan.annual_price / (plan.monthly_price * 12)) * 100)}%)
                      </p>
                    )}
                  </>
                ) : (
                  <span className="text-3xl font-bold text-white">Custom</span>
                )}
              </div>
              <ul className="mt-6 space-y-2">
                {features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm">
                    <Check size={14} className="mt-0.5 shrink-0 text-[var(--color-success)]" />
                    <span className="text-[var(--color-muted-foreground)]">{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                {isCurrentPlan ? (
                  <button
                    disabled
                    className="w-full rounded-lg border border-[var(--color-border)] py-2.5 text-sm text-[var(--color-muted-foreground)]"
                  >
                    Current Plan
                  </button>
                ) : plan.monthly_price ? (
                  <button
                    onClick={() => handleUpgrade(plan.id)}
                    className="w-full rounded-lg bg-[var(--color-primary)] py-2.5 text-sm font-medium text-[var(--color-primary-foreground)] hover:bg-[var(--color-primary)]/90"
                  >
                    Upgrade
                  </button>
                ) : (
                  <button className="w-full rounded-lg border border-[var(--color-primary)] py-2.5 text-sm text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10">
                    Contact Sales
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Usage */}
      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
        <h3 className="text-sm font-medium text-white">Current Usage</h3>
        <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { label: 'Seats', current: 3, max: tenant?.plan_seats ?? 5 },
            { label: 'Entities', current: 8, max: 10 },
            { label: 'Accounts', current: 2, max: 5 },
            { label: 'AI Queries', current: 45, max: 100 },
          ].map(({ label, current, max }) => (
            <div key={label}>
              <div className="flex items-center justify-between text-xs text-[var(--color-muted-foreground)]">
                <span>{label}</span>
                <span>{current}/{max}</span>
              </div>
              <div className="mt-1 h-2 rounded-full bg-[var(--color-background)]">
                <div
                  className={clsx(
                    'h-2 rounded-full',
                    current / max > 0.9 ? 'bg-[var(--color-danger)]' :
                    current / max > 0.7 ? 'bg-[var(--color-warning)]' :
                    'bg-[var(--color-primary)]'
                  )}
                  style={{ width: `${Math.min((current / max) * 100, 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
