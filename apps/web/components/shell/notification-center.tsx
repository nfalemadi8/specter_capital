'use client';

import { X, Check, Bell } from 'lucide-react';
import { clsx } from 'clsx';
import { useUIStore } from '@/lib/stores/ui-store';
import { useNotificationStore } from '@/lib/stores/notification-store';

export function NotificationCenter() {
  const { notificationPanelOpen, setNotificationPanelOpen } = useUIStore();
  const { notifications, markAsRead, markAllAsRead, dismiss } = useNotificationStore();

  if (!notificationPanelOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/30"
        onClick={() => setNotificationPanelOpen(false)}
      />

      {/* Panel */}
      <div className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col border-l border-[var(--color-border)] bg-[var(--color-surface)] shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[var(--color-border)] px-6 py-4">
          <h2 className="text-lg font-semibold text-white">Notifications</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={markAllAsRead}
              className="rounded-lg px-3 py-1.5 text-xs text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10"
            >
              Mark all read
            </button>
            <button
              onClick={() => setNotificationPanelOpen(false)}
              className="rounded-lg p-1.5 text-[var(--color-muted-foreground)] hover:text-white"
              aria-label="Close notifications"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <Bell size={32} className="text-[var(--color-muted)]" />
              <p className="mt-3 text-sm text-[var(--color-muted-foreground)]">
                No notifications yet
              </p>
            </div>
          ) : (
            notifications.map((n) => (
              <div
                key={n.id}
                className={clsx(
                  'flex items-start gap-3 border-b border-[var(--color-border)] px-6 py-4',
                  !n.is_read && 'bg-[var(--color-primary)]/5'
                )}
              >
                <div
                  className={clsx(
                    'mt-1 h-2 w-2 shrink-0 rounded-full',
                    n.priority === 'urgent'
                      ? 'bg-[var(--color-danger)]'
                      : n.priority === 'high'
                        ? 'bg-[var(--color-warning)]'
                        : 'bg-[var(--color-primary)]'
                  )}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white">{n.title}</p>
                  {n.body && (
                    <p className="mt-0.5 text-xs text-[var(--color-muted-foreground)] line-clamp-2">
                      {n.body}
                    </p>
                  )}
                  <p className="mt-1 text-xs text-[var(--color-muted)]">
                    {new Date(n.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex shrink-0 gap-1">
                  {!n.is_read && (
                    <button
                      onClick={() => markAsRead(n.id)}
                      className="rounded p-1 text-[var(--color-muted-foreground)] hover:text-[var(--color-primary)]"
                      aria-label="Mark as read"
                    >
                      <Check size={14} />
                    </button>
                  )}
                  <button
                    onClick={() => dismiss(n.id)}
                    className="rounded p-1 text-[var(--color-muted-foreground)] hover:text-[var(--color-danger)]"
                    aria-label="Dismiss"
                  >
                    <X size={14} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
