'use client';

import { useState } from 'react';
import { Maximize2, Minimize2, ExternalLink } from 'lucide-react';

export default function TerminalPage() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const terminalUrl = process.env.NEXT_PUBLIC_SPECTER_TERMINAL_URL;

  return (
    <div className={isFullscreen ? 'fixed inset-0 z-50 bg-[var(--color-background)]' : 'space-y-4'}>
      {!isFullscreen && (
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">Specter Terminal</h1>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsFullscreen(true)}
              className="flex items-center gap-1.5 rounded-lg border border-[var(--color-border)] px-3 py-1.5 text-sm text-white hover:bg-[var(--color-surface-hover)]"
            >
              <Maximize2 size={14} />
              Full Screen
            </button>
            {terminalUrl && (
              <a
                href={terminalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-lg border border-[var(--color-border)] px-3 py-1.5 text-sm text-white hover:bg-[var(--color-surface-hover)]"
              >
                <ExternalLink size={14} />
                Open Standalone
              </a>
            )}
          </div>
        </div>
      )}

      <div className={isFullscreen ? 'h-full p-2' : 'h-[calc(100vh-12rem)]'}>
        {isFullscreen && (
          <button
            onClick={() => setIsFullscreen(false)}
            className="absolute right-4 top-4 z-10 rounded-lg bg-[var(--color-surface)] p-2 text-white hover:bg-[var(--color-surface-hover)]"
          >
            <Minimize2 size={18} />
          </button>
        )}

        {terminalUrl ? (
          <iframe
            src={`${terminalUrl}?theme=embedded`}
            className="h-full w-full rounded-lg border border-[var(--color-border)]"
            title="Specter Terminal"
            allow="clipboard-read; clipboard-write"
          />
        ) : (
          <div className="flex h-full items-center justify-center rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)]">
            <div className="text-center">
              <p className="text-lg font-medium text-white">Terminal Not Configured</p>
              <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">
                Set NEXT_PUBLIC_SPECTER_TERMINAL_URL to enable the embedded terminal.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
