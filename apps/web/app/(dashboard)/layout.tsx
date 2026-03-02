import { Suspense } from 'react';
import { Providers } from '@/components/providers';
import { Sidebar } from '@/components/shell/sidebar';
import { Topbar } from '@/components/shell/topbar';
import { CommandPalette } from '@/components/shell/command-palette';
import { NotificationCenter } from '@/components/shell/notification-center';

export const dynamic = 'force-dynamic';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <div className="flex h-screen overflow-hidden">
        <Suspense fallback={null}>
          <Sidebar />
        </Suspense>

        <div className="flex flex-1 flex-col overflow-hidden lg:ml-64">
          <Suspense fallback={null}>
            <Topbar />
          </Suspense>

          <main className="flex-1 overflow-y-auto p-6">{children}</main>
        </div>

        <Suspense fallback={null}>
          <CommandPalette />
          <NotificationCenter />
        </Suspense>
      </div>
    </Providers>
  );
}
