'use client';

import { useQuery } from '@tanstack/react-query';
import { createClient } from '@/lib/supabase/client';
import { useTenant } from '@/lib/hooks/use-tenant';
import { useRealtime } from '@/lib/hooks/use-realtime';
import { StatusBadge } from '@/components/shared/status-badge';
import { EmptyState } from '@/components/shared/empty-state';
import { formatDate, formatCurrency } from '@/lib/utils/format';
import { Users, Search, Mail, Phone, Building2, Star } from 'lucide-react';
import { useState } from 'react';

const roleColors: Record<string, 'gold' | 'info' | 'success' | 'warning' | 'default'> = {
  'attorney': 'gold',
  'accountant': 'info',
  'financial_advisor': 'success',
  'tax_advisor': 'warning',
  'wealth_manager': 'gold',
  'insurance_broker': 'info',
};

export default function ContactsPage() {
  const { tenant } = useTenant();
  const supabase = createClient();
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  const { data: advisors, isLoading } = useQuery({
    queryKey: ['contacts', tenant?.id],
    queryFn: async () => {
      if (!tenant) return [];
      const { data } = await supabase
        .from('advisor_contacts')
        .select('*')
        .eq('tenant_id', tenant.id)
        .order('name');
      return data || [];
    },
    enabled: !!tenant?.id,
  });

  const { data: engagements } = useQuery({
    queryKey: ['contact-engagements', tenant?.id],
    queryFn: async () => {
      if (!tenant) return [];
      const { data } = await supabase
        .from('advisor_engagements')
        .select('*')
        .eq('tenant_id', tenant.id)
        .order('start_date', { ascending: false });
      return data || [];
    },
    enabled: !!tenant?.id,
  });

  useRealtime('advisor_contacts', ['contacts', tenant?.id ?? ''], tenant?.id);

  const roles = [...new Set(advisors?.map(a => a.role).filter(Boolean) || [])];

  const filtered = advisors?.filter(a => {
    const matchesSearch = !search ||
      a.name?.toLowerCase().includes(search.toLowerCase()) ||
      a.firm?.toLowerCase().includes(search.toLowerCase()) ||
      a.email?.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === 'all' || a.role === roleFilter;
    return matchesSearch && matchesRole;
  }) || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-[family-name:var(--font-display)] text-2xl font-normal text-white/90">Contacts</h1>
        <span className="text-xs text-white/30">{advisors?.length || 0} advisors</span>
      </div>

      {/* Search & Filter */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search contacts..."
            className="w-full rounded border border-white/[0.06] bg-white/[0.03] py-2.5 pl-9 pr-3 text-sm text-white/80 outline-none placeholder:text-white/20 focus:border-white/10"
          />
        </div>
        <select
          value={roleFilter}
          onChange={e => setRoleFilter(e.target.value)}
          className="rounded border border-white/[0.06] bg-white/[0.03] px-3 py-2.5 text-sm text-white/70 outline-none"
        >
          <option value="all">All Roles</option>
          {roles.map(r => (
            <option key={r} value={r}>{(r || '').replace(/_/g, ' ')}</option>
          ))}
        </select>
      </div>

      {/* Contact Cards */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map(advisor => {
            const advisorEngagements = engagements?.filter(e => e.advisor_id === advisor.id) || [];
            return (
              <div key={advisor.id} className="rounded border border-[var(--color-border)] bg-[var(--color-surface)] p-5 transition-colors hover:border-white/[0.08]">
                <div className="mb-3 flex items-start justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-white/80">{advisor.name}</h3>
                    {advisor.firm && (
                      <div className="mt-0.5 flex items-center gap-1 text-xs text-white/40">
                        <Building2 size={10} /> {advisor.firm}
                      </div>
                    )}
                  </div>
                  <StatusBadge
                    label={(advisor.role || 'advisor').replace(/_/g, ' ')}
                    variant={roleColors[advisor.role] || 'default'}
                  />
                </div>

                <div className="mb-3 space-y-1.5">
                  {advisor.email && (
                    <a href={`mailto:${advisor.email}`} className="flex items-center gap-2 text-xs text-white/40 transition-colors hover:text-white/60">
                      <Mail size={11} /> {advisor.email}
                    </a>
                  )}
                  {advisor.phone && (
                    <a href={`tel:${advisor.phone}`} className="flex items-center gap-2 text-xs text-white/40 transition-colors hover:text-white/60">
                      <Phone size={11} /> {advisor.phone}
                    </a>
                  )}
                </div>

                {advisor.rating && (
                  <div className="mb-2 flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={11} className={i < advisor.rating ? 'fill-[var(--phantom-gold)] text-[var(--phantom-gold)]' : 'text-white/10'} />
                    ))}
                  </div>
                )}

                {advisorEngagements.length > 0 && (
                  <div className="mt-3 border-t border-white/[0.04] pt-3">
                    <span className="text-[10px] font-medium uppercase tracking-wider text-white/20">Recent Engagements</span>
                    {advisorEngagements.slice(0, 2).map(e => (
                      <div key={e.id} className="mt-1.5 flex items-center justify-between text-xs">
                        <span className="text-white/40">{e.description || e.engagement_type}</span>
                        <span className="text-white/25">{e.start_date ? formatDate(e.start_date) : ''}</span>
                      </div>
                    ))}
                  </div>
                )}

                {advisor.retainer_amount && (
                  <div className="mt-2 text-xs text-white/30">
                    Retainer: <span className="text-white/50">{formatCurrency(advisor.retainer_amount)}/mo</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <EmptyState
          icon={<Users size={24} />}
          title="No contacts found"
          description={search ? 'Try adjusting your search or filters.' : 'Add your advisors, attorneys, and other professional contacts.'}
        />
      )}
    </div>
  );
}
