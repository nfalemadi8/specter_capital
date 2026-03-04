'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createClient } from '@/lib/supabase/client';
import { useTenant } from '@/lib/hooks/use-tenant';
import { useRealtime } from '@/lib/hooks/use-realtime';
import { StatusBadge } from '@/components/shared/status-badge';
import { EmptyState } from '@/components/shared/empty-state';
import { ConfirmationDialog } from '@/components/shared/confirmation-dialog';
import { formatCurrency, formatDate } from '@/lib/utils/format';
import { CheckCircle, XCircle, FileCheck, Clock } from 'lucide-react';
import { useState } from 'react';

export default function ApprovalsPage() {
  const { tenant } = useTenant();
  const supabase = createClient();
  const queryClient = useQueryClient();
  const [confirmAction, setConfirmAction] = useState<{ id: string; action: 'approve' | 'reject' } | null>(null);

  const { data: pendingBills, isLoading } = useQuery({
    queryKey: ['pending-approvals', tenant?.id],
    queryFn: async () => {
      if (!tenant) return [];
      const { data } = await supabase
        .from('bill_payments')
        .select('*')
        .eq('tenant_id', tenant.id)
        .eq('status', 'pending')
        .order('due_date', { ascending: true });
      return data || [];
    },
    enabled: !!tenant?.id,
  });

  useRealtime('bill_payments', ['pending-approvals', tenant?.id ?? ''], tenant?.id);

  const updateMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase
        .from('bill_payments')
        .update({ status, approved_at: status === 'approved' ? new Date().toISOString() : null })
        .eq('id', id);
      if (error) throw error;

      // Log to audit
      const { data: { user } } = await supabase.auth.getUser();
      await supabase.from('audit_log').insert({
        tenant_id: tenant?.id,
        user_id: user?.id,
        action: status === 'approved' ? 'approve' : 'reject',
        resource_type: 'bill_payment',
        resource_id: id,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pending-approvals'] });
      setConfirmAction(null);
    },
  });

  const totalPending = pendingBills?.reduce((s, b) => s + (b.amount || 0), 0) || 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-[family-name:var(--font-display)] text-2xl font-normal text-white/90">Payment Approvals</h1>
        <div className="flex items-center gap-2 text-sm text-white/40">
          <Clock size={14} />
          {pendingBills?.length || 0} pending · {formatCurrency(totalPending)}
        </div>
      </div>

      {pendingBills && pendingBills.length > 0 ? (
        <div className="space-y-3">
          {pendingBills.map(bill => (
            <div key={bill.id} className="rounded border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-sm font-medium text-white/80">{bill.payee || bill.description || 'Unnamed Bill'}</h3>
                    <StatusBadge label="Pending" variant="warning" />
                    {bill.is_recurring && <StatusBadge label="Recurring" variant="info" />}
                  </div>
                  <p className="mt-1 text-xs text-white/40">{bill.description}</p>
                  <div className="mt-3 flex gap-6 text-xs text-white/30">
                    <span>Amount: <span className="text-white/60">{formatCurrency(bill.amount || 0)}</span></span>
                    <span>Due: <span className="text-white/60">{bill.due_date ? formatDate(bill.due_date) : '—'}</span></span>
                    <span>Category: <span className="text-white/60">{bill.category || '—'}</span></span>
                    {bill.entity_id && <span>Entity: <span className="text-white/60">{bill.entity_id}</span></span>}
                  </div>
                </div>
                <div className="flex items-center gap-2 pl-4">
                  <button
                    onClick={() => setConfirmAction({ id: bill.id, action: 'reject' })}
                    className="flex items-center gap-1.5 rounded border border-white/[0.06] px-3 py-2 text-xs text-white/40 transition-colors hover:border-[var(--phantom-danger)]/30 hover:text-[var(--phantom-danger)]"
                  >
                    <XCircle size={13} /> Reject
                  </button>
                  <button
                    onClick={() => setConfirmAction({ id: bill.id, action: 'approve' })}
                    className="flex items-center gap-1.5 rounded bg-[var(--phantom-gold)] px-3 py-2 text-xs font-medium text-[#0a0a0a] transition-colors hover:bg-[#d4c496]"
                  >
                    <CheckCircle size={13} /> Approve
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<FileCheck size={24} />}
          title="No pending approvals"
          description="All payments have been reviewed. New submissions will appear here."
        />
      )}

      {confirmAction && (
        <ConfirmationDialog
          open={!!confirmAction}
          title={confirmAction.action === 'approve' ? 'Approve Payment' : 'Reject Payment'}
          description={
            confirmAction.action === 'approve'
              ? 'This will approve the payment for processing. This action is logged.'
              : 'This will reject the payment. The submitter will be notified.'
          }
          confirmLabel={confirmAction.action === 'approve' ? 'Approve' : 'Reject'}
          variant={confirmAction.action === 'reject' ? 'danger' : 'default'}
          onConfirm={() => {
            updateMutation.mutate({
              id: confirmAction.id,
              status: confirmAction.action === 'approve' ? 'approved' : 'rejected',
            });
          }}
          onCancel={() => setConfirmAction(null)}
          loading={updateMutation.isPending}
        />
      )}
    </div>
  );
}
