import { cn } from '@/lib/utils/cn';

type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'info' | 'gold';

interface StatusBadgeProps {
  label: string;
  variant?: BadgeVariant;
  dot?: boolean;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: 'border-white/10 text-white/50 bg-white/[0.03]',
  success: 'border-[var(--phantom-success)]/20 text-[var(--phantom-success)] bg-[var(--phantom-success)]/5',
  warning: 'border-[var(--phantom-warning)]/20 text-[var(--phantom-warning)] bg-[var(--phantom-warning)]/5',
  danger: 'border-[var(--phantom-danger)]/20 text-[var(--phantom-danger)] bg-[var(--phantom-danger)]/5',
  info: 'border-[var(--phantom-info)]/20 text-[var(--phantom-info)] bg-[var(--phantom-info)]/5',
  gold: 'border-[rgba(200,184,138,0.3)] text-[var(--phantom-gold)] bg-[rgba(200,184,138,0.08)]',
};

const dotColors: Record<BadgeVariant, string> = {
  default: 'bg-white/30',
  success: 'bg-[var(--phantom-success)]',
  warning: 'bg-[var(--phantom-warning)]',
  danger: 'bg-[var(--phantom-danger)]',
  info: 'bg-[var(--phantom-info)]',
  gold: 'bg-[var(--phantom-gold)]',
};

export function StatusBadge({ label, variant = 'default', dot = false }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-sm border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider',
        variantStyles[variant]
      )}
    >
      {dot && <span className={cn('h-1.5 w-1.5 rounded-full', dotColors[variant])} />}
      {label}
    </span>
  );
}
