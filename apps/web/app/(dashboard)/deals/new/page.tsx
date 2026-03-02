'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { useTenant } from '@/lib/hooks/use-tenant';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NewDealPage() {
  const router = useRouter();
  const { tenant } = useTenant();
  const supabase = createClient();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company_name: '',
    sector: '',
    deal_type: 'direct',
    target_amount: '',
    geography: '',
    source: '',
    notes: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tenant) return;
    setIsSubmitting(true);

    try {
      const { data, error } = await supabase
        .from('deals')
        .insert({
          tenant_id: tenant.id,
          name: formData.name,
          company_name: formData.company_name || null,
          sector: formData.sector || null,
          deal_type: formData.deal_type,
          target_amount: formData.target_amount ? parseFloat(formData.target_amount) : null,
          geography: formData.geography || null,
          source: formData.source || null,
          notes: formData.notes || null,
          stage: 'sourcing',
          sourced_date: new Date().toISOString().split('T')[0],
          vintage_year: new Date().getFullYear(),
        })
        .select('id')
        .single();

      if (error) throw error;
      router.push(`/deals/${data.id}`);
    } catch {
      // Handle error
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/deals" className="rounded-lg p-2 hover:bg-[var(--color-surface-hover)]">
          <ArrowLeft size={20} className="text-[var(--color-muted-foreground)]" />
        </Link>
        <h1 className="text-2xl font-bold text-white">New Deal</h1>
      </div>

      <form onSubmit={handleSubmit} className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-6">
        {[
          { id: 'name', label: 'Deal Name', required: true, placeholder: 'Series B - Company Name' },
          { id: 'company_name', label: 'Company Name', placeholder: 'Target company' },
          { id: 'sector', label: 'Sector', placeholder: 'Technology, Healthcare, etc.' },
          { id: 'target_amount', label: 'Target Amount ($)', type: 'number', placeholder: '5000000' },
          { id: 'geography', label: 'Geography', placeholder: 'US, Europe, etc.' },
          { id: 'source', label: 'Source', placeholder: 'How this deal was sourced' },
        ].map(({ id, label, required, placeholder, type }) => (
          <div key={id}>
            <label htmlFor={id} className="block text-sm font-medium text-[var(--color-muted-foreground)]">
              {label} {required && '*'}
            </label>
            <input
              id={id}
              type={type ?? 'text'}
              required={required}
              value={formData[id as keyof typeof formData]}
              onChange={(e) => updateField(id, e.target.value)}
              placeholder={placeholder}
              className="mt-1 w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] px-4 py-2.5 text-white placeholder:text-[var(--color-muted)] focus:border-[var(--color-primary)] focus:outline-none"
            />
          </div>
        ))}

        <div>
          <label htmlFor="deal_type" className="block text-sm font-medium text-[var(--color-muted-foreground)]">
            Deal Type
          </label>
          <select
            id="deal_type"
            value={formData.deal_type}
            onChange={(e) => updateField('deal_type', e.target.value)}
            className="mt-1 w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] px-4 py-2.5 text-white focus:border-[var(--color-primary)] focus:outline-none"
          >
            <option value="direct">Direct Investment</option>
            <option value="co_invest">Co-Investment</option>
            <option value="fund_allocation">Fund Allocation</option>
            <option value="syndicate">Syndicate</option>
            <option value="secondary">Secondary</option>
          </select>
        </div>

        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-[var(--color-muted-foreground)]">
            Notes
          </label>
          <textarea
            id="notes"
            rows={3}
            value={formData.notes}
            onChange={(e) => updateField('notes', e.target.value)}
            className="mt-1 w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] px-4 py-2.5 text-white placeholder:text-[var(--color-muted)] focus:border-[var(--color-primary)] focus:outline-none"
          />
        </div>

        <div className="flex justify-end gap-3">
          <Link
            href="/deals"
            className="rounded-lg border border-[var(--color-border)] px-4 py-2.5 text-sm text-white hover:bg-[var(--color-surface-hover)]"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-lg bg-[var(--color-primary)] px-6 py-2.5 text-sm font-medium text-[var(--color-primary-foreground)] hover:bg-[var(--color-primary)]/90 disabled:opacity-50"
          >
            {isSubmitting ? 'Creating...' : 'Create Deal'}
          </button>
        </div>
      </form>
    </div>
  );
}
