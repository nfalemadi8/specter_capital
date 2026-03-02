'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { createClient } from '@/lib/supabase/client';
import { useTenant } from '@/lib/hooks/use-tenant';
import { formatCurrency } from '@/lib/utils/format';
import { ChevronRight, Building2 } from 'lucide-react';
import { clsx } from 'clsx';
import type { Entity } from '@specter/shared-types';

interface TreeNodeProps {
  entity: Entity;
  children: Entity[];
  allEntities: Entity[];
  level: number;
}

function TreeNode({ entity, children, allEntities, level }: TreeNodeProps) {
  const [expanded, setExpanded] = useState(level === 0);
  const hasChildren = children.length > 0;

  return (
    <div>
      <button
        onClick={() => hasChildren && setExpanded(!expanded)}
        className={clsx(
          'flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm hover:bg-[var(--color-surface-hover)]',
          hasChildren && 'cursor-pointer'
        )}
        style={{ paddingLeft: `${level * 16 + 12}px` }}
      >
        {hasChildren && (
          <ChevronRight
            size={14}
            className={clsx('shrink-0 transition-transform', expanded && 'rotate-90')}
          />
        )}
        {!hasChildren && <span className="w-3.5" />}
        <Building2 size={14} className="shrink-0 text-[var(--color-primary)]" />
        <span className="flex-1 truncate text-white">{entity.name}</span>
        <span className="shrink-0 font-mono text-xs text-[var(--color-muted-foreground)]">
          {formatCurrency(entity.total_value, 'USD', true)}
        </span>
      </button>
      {expanded &&
        children.map((child) => (
          <TreeNode
            key={child.id}
            entity={child}
            children={allEntities.filter((e) => e.parent_id === child.id)}
            allEntities={allEntities}
            level={level + 1}
          />
        ))}
    </div>
  );
}

export function EntityTree() {
  const { tenant } = useTenant();
  const supabase = createClient();

  const { data: entities } = useQuery({
    queryKey: ['entities-tree', tenant?.id],
    queryFn: async () => {
      if (!tenant) return [];
      const { data } = await supabase
        .from('entities')
        .select('*')
        .eq('tenant_id', tenant.id)
        .eq('is_active', true)
        .order('name');
      return (data ?? []) as Entity[];
    },
    enabled: !!tenant?.id,
  });

  const rootEntities = entities?.filter((e) => !e.parent_id) ?? [];

  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
      <h3 className="mb-4 text-sm font-medium text-[var(--color-muted-foreground)]">
        Entity Structure
      </h3>
      <div className="space-y-1">
        {rootEntities.length === 0 ? (
          <p className="text-sm text-[var(--color-muted)]">No entities configured</p>
        ) : (
          rootEntities.map((entity) => (
            <TreeNode
              key={entity.id}
              entity={entity}
              children={(entities ?? []).filter((e) => e.parent_id === entity.id)}
              allEntities={entities ?? []}
              level={0}
            />
          ))
        )}
      </div>
    </div>
  );
}
