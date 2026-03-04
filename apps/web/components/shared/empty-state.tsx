import Link from 'next/link';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
}

export function EmptyState({ icon, title, description, actionLabel, actionHref, onAction }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      {icon && (
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded border border-white/[0.04] bg-white/[0.02] text-white/20">
          {icon}
        </div>
      )}
      <h3 className="mb-1 font-[family-name:var(--font-display)] text-lg font-normal text-white/60">
        {title}
      </h3>
      <p className="mb-6 max-w-sm text-sm text-white/30">
        {description}
      </p>
      {actionLabel && actionHref && (
        <Link
          href={actionHref}
          className="border border-[rgba(200,184,138,0.15)] px-5 py-2.5 text-[10px] font-medium uppercase tracking-[3px] text-[var(--phantom-gold)] transition-colors hover:border-[rgba(200,184,138,0.35)] hover:bg-[rgba(200,184,138,0.06)]"
        >
          {actionLabel}
        </Link>
      )}
      {actionLabel && onAction && !actionHref && (
        <button
          onClick={onAction}
          className="border border-[rgba(200,184,138,0.15)] px-5 py-2.5 text-[10px] font-medium uppercase tracking-[3px] text-[var(--phantom-gold)] transition-colors hover:border-[rgba(200,184,138,0.35)] hover:bg-[rgba(200,184,138,0.06)]"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
