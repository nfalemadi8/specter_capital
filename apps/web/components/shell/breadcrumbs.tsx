'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);

  if (segments.length === 0) {
    return <span className="text-sm font-medium text-white">Dashboard</span>;
  }

  const crumbs = segments.map((segment, idx) => {
    const href = '/' + segments.slice(0, idx + 1).join('/');
    const label = segment
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase());
    const isLast = idx === segments.length - 1;

    return { href, label, isLast };
  });

  return (
    <nav className="flex items-center gap-1 text-sm" aria-label="Breadcrumb">
      <Link href="/" className="text-[var(--color-muted-foreground)] hover:text-white">
        Dashboard
      </Link>
      {crumbs.map(({ href, label, isLast }) => (
        <span key={href} className="flex items-center gap-1">
          <ChevronRight size={14} className="text-[var(--color-muted)]" />
          {isLast ? (
            <span className="font-medium text-white">{label}</span>
          ) : (
            <Link href={href} className="text-[var(--color-muted-foreground)] hover:text-white">
              {label}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
}
