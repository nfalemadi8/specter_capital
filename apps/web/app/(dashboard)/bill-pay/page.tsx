'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { createClient } from '@/lib/supabase/client';
import { useTenant } from '@/lib/hooks/use-tenant';
import { formatCurrency, formatDate } from '@/lib/utils/format';
import { StatCard } from '@specter/ui';
import { Receipt, Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import { clsx } from 'clsx';
import type { BillPayment } from '@specter/shared-types';

type StatusFilter = 'all' | 'pending' | 'approved' | 'paid' | 'overdue';

const STATUS_STYLES: Record<string, string> = {
  pending: 'bg-[var(--color-warning)]/10 text-[var(--color-warning)]',
  approved: 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]',
  paid: 'bg-[var(--color-success)]/10 text-[var(--color-success)]',
  rejected: 'bg-[var(--color-danger)]/10 text-[var(--color-danger)]',
  overdue: 'bg-[var(--color-danger)]/10 text-[var(--color-danger)]',
};

export default function BillPayPage() {
  const { tenant } = useTenant();
  const supabase = createClient();
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');

  const { data: bills } = useQuery({
    queryKey: ['bills', tenant?.id],
    queryFn: async () => {
      if (!tenant) return [];
      const { data } = await supabase
        .from('bill_payments')
        .select('*')
        .eq('tenant_id', tenant.id)
        .order('due_date', { ascending: true });
      return (data ?? []) as BillPayment[];
    },
    enabled: !!tenant?.id,
  });

  const filtered = bills?.filter((b) => statusFilter === 'all' || b.status === statusFilter) ?? [];
  const pendingCount = bills?.filter((b) => b.status === 'pending').length ?? 0;
  const overdueCount = bills?.filter((b) => b.status === 'overdue').length ?? 0;
  const pendingTotal = bills?.filter((b) => b.status === 'pending').reduce((s, b) => s + b.amount, 0) ?? 0;
  const paidThisMonth = bills
    ?.filter((b) => {
      if (b.status !== 'paid' || !b.paid_date) return false;
      const pd = new Date(b.paid_date);
      const now = new Date();
      return pd.getMonth() === now.getMonth() && pd.getFullYear() === now.getFullYear();
    })
    .reduce((s, b) => s + b.amount, 0) ?? 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Bill Pay</h1>
        <div className="flex gap-2">
          {(['all', 'pending', 'approved', 'paid', 'overdue'] as StatusFilter[]).map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={clsx(
                'rounded-lg px-3 py-1.5 text-xs font-medium capitalize transition-colors',
                statusFilter === s
                  ? 'bg-[var(--color-primary)] text-[var(--color-primary-foreground)]'
                  : 'bg-[var(--color-surface)] text-[var(--color-muted-foreground)] hover:text-white'
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <StatCard title="Pending Bills" value={String(pendingCount)} icon={<Clock size={20} />} />
        <StatCard title="Pending Total" value={formatCurrency(pendingTotal, 'USD', true)} icon={<Receipt size={20} />} />
        <StatCard title="Overdue" value={String(overdueCount)} icon={<AlertTriangle size={20} />} />
        <StatCard title="Paid This Month" value={formatCurrency(paidThisMonth, 'USD', true)} icon={<CheckCircle size={20} />} />
      </div>

      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]">
        <div className="divide-y divide-[var(--color-border)]">
          {filtered.length > 0 ? (
            filtered.map((bill) => (
              <div key={bill.id} className="flex items-center justify-between px-6 py-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-white">{bill.payee}</p>
                    <span className={clsx('rounded-full px-2 py-0.5 text-xs capitalize', STATUS_STYLES[bill.status] ?? '')}>
                      {bill.status}
                    </span>
                  </div>
                  <div className="mt-1 flex items-center gap-3 text-xs text-[var(--color-muted-foreground)]">
                    {bill.category && <span className="capitalize">{bill.category.replace(/_/g, ' ')}</span>}
                    <span>Due {formatDate(bill.due_date)}</span>
                    {bill.payment_method && <span className="uppercase">{bill.payment_method}</span>}
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-mono text-sm font-medium text-white">{formatCurrency(bill.amount)}</p>
                  {bill.paid_date && (
                    <p className="text-xs text-[var(--color-success)]">Paid {formatDate(bill.paid_date)}</p>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="px-6 py-12 text-center">
              <p className="text-sm text-[var(--color-muted)]">No bills found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
