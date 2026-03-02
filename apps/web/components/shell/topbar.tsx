'use client';

import { useRouter } from 'next/navigation';
import { Search, Bell, Menu } from 'lucide-react';
import { useUIStore } from '@/lib/stores/ui-store';
import { useNotificationStore } from '@/lib/stores/notification-store';
import { usePermissions } from '@/lib/hooks/use-permissions';
import { createClient } from '@/lib/supabase/client';
import { Breadcrumbs } from './breadcrumbs';

export function Topbar() {
  const router = useRouter();
  const { setCommandPaletteOpen, setNotificationPanelOpen, setSidebarMobileOpen } = useUIStore();
  const { unreadCount } = useNotificationStore();
  const { member } = usePermissions();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/signin');
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-[var(--color-border)] bg-[var(--color-surface)]/80 px-6 backdrop-blur-md">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setSidebarMobileOpen(true)}
          className="rounded-md p-2 text-[var(--color-muted-foreground)] hover:text-white lg:hidden"
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>
        <Breadcrumbs />
      </div>

      <div className="flex items-center gap-2">
        {/* Search / Command Palette trigger */}
        <button
          onClick={() => setCommandPaletteOpen(true)}
          className="flex items-center gap-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] px-3 py-1.5 text-sm text-[var(--color-muted-foreground)] hover:border-[var(--color-muted)] transition-colors"
        >
          <Search size={14} />
          <span className="hidden sm:inline">Search...</span>
          <kbd className="hidden rounded border border-[var(--color-border)] bg-[var(--color-surface)] px-1.5 py-0.5 text-xs sm:inline">
            &#8984;K
          </kbd>
        </button>

        {/* Notifications */}
        <button
          onClick={() => setNotificationPanelOpen(true)}
          className="relative rounded-lg p-2 text-[var(--color-muted-foreground)] hover:bg-[var(--color-surface-hover)] hover:text-white"
          aria-label="Notifications"
        >
          <Bell size={18} />
          {unreadCount > 0 && (
            <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--color-danger)] text-[10px] font-bold text-white">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </button>

        {/* User menu */}
        <div className="flex items-center gap-3 pl-2">
          <div className="hidden text-right sm:block">
            <p className="text-sm font-medium text-white">{member?.display_name ?? 'User'}</p>
            <p className="text-xs text-[var(--color-muted-foreground)]">{member?.title ?? ''}</p>
          </div>
          <button
            onClick={handleLogout}
            className="rounded-lg bg-[var(--color-surface-hover)] px-3 py-1.5 text-xs text-[var(--color-muted-foreground)] hover:text-white"
          >
            Sign out
          </button>
        </div>
      </div>
    </header>
  );
}
