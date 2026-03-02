'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard, TrendingUp, PieChart, Monitor, Handshake, PhoneCall,
  Building2, Home, ArrowLeftRight, Receipt, Shield, Users,
  Calculator, FileSearch, FileBarChart, Scale, Heart,
  FolderLock, MessageSquare, Sparkles, Plug, Settings, ChevronLeft,
} from 'lucide-react';
import { clsx } from 'clsx';
import { NAV_SECTIONS } from '@/lib/constants/nav';
import { useUIStore } from '@/lib/stores/ui-store';
import { usePermissions } from '@/lib/hooks/use-permissions';

const ICON_MAP: Record<string, React.ComponentType<{ size?: string | number }>> = {
  LayoutDashboard, TrendingUp, PieChart, Monitor, Handshake, PhoneCall,
  Building2, Home, ArrowLeftRight, Receipt, Shield, Users,
  Calculator, FileSearch, FileBarChart, Scale, Heart,
  FolderLock, MessageSquare, Sparkles, Plug, Settings,
};

export function Sidebar() {
  const pathname = usePathname();
  const { sidebarCollapsed, toggleSidebar } = useUIStore();
  const { canAccess } = usePermissions();

  return (
    <aside
      className={clsx(
        'fixed left-0 top-0 z-30 flex h-full flex-col border-r border-[var(--color-border)] bg-[var(--color-surface)] transition-all duration-200',
        sidebarCollapsed ? 'w-16' : 'w-64'
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center justify-between border-b border-[var(--color-border)] px-4">
        {!sidebarCollapsed && (
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-[var(--color-primary)] flex items-center justify-center text-[var(--color-primary-foreground)] font-bold text-sm">
              S
            </div>
            <span className="text-lg font-semibold text-white">Specter</span>
          </Link>
        )}
        <button
          onClick={toggleSidebar}
          className="rounded-md p-1.5 text-[var(--color-muted-foreground)] hover:bg-[var(--color-surface-hover)] hover:text-white"
          aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <ChevronLeft
            size={18}
            className={clsx('transition-transform', sidebarCollapsed && 'rotate-180')}
          />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-2 py-4">
        {NAV_SECTIONS.map((section) => {
          const visibleItems = section.items.filter((item) => canAccess(item.module));
          if (visibleItems.length === 0) return null;

          return (
            <div key={section.title} className="mb-6">
              {!sidebarCollapsed && (
                <h3 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-[var(--color-muted)]">
                  {section.title}
                </h3>
              )}
              <ul className="space-y-1">
                {visibleItems.map((item) => {
                  const Icon = ICON_MAP[item.icon];
                  const isActive =
                    pathname === item.href ||
                    (item.href !== '/' && pathname.startsWith(item.href));

                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={clsx(
                          'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
                          isActive
                            ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]'
                            : 'text-[var(--color-muted-foreground)] hover:bg-[var(--color-surface-hover)] hover:text-white'
                        )}
                        title={sidebarCollapsed ? item.label : undefined}
                      >
                        {Icon && <Icon size={18} />}
                        {!sidebarCollapsed && <span>{item.label}</span>}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
