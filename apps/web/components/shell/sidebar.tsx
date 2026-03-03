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
          <Link href="/dashboard" className="flex items-center gap-2">
            <div style={{ width: '28px', height: '28px', border: '1px solid #c8b88a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontFamily: "'EB Garamond', serif", fontSize: '12px', fontWeight: 400, color: '#c8b88a', letterSpacing: '1px' }}>PT</span>
            </div>
            <span style={{ fontFamily: "'EB Garamond', serif", fontSize: '14px', fontWeight: 400, letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.85)' }}>
              Phantom Treasury
            </span>
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
                            ? 'bg-[#c8b88a]/10 text-[#c8b88a]'
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
