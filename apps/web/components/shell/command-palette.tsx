'use client';

import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import * as Dialog from '@radix-ui/react-dialog';
import { Search } from 'lucide-react';
import { useUIStore } from '@/lib/stores/ui-store';
import { NAV_SECTIONS } from '@/lib/constants/nav';

interface SearchResult {
  label: string;
  href: string;
  section: string;
}

export function CommandPalette() {
  const [query, setQuery] = useState('');
  const { commandPaletteOpen, setCommandPaletteOpen } = useUIStore();
  const router = useRouter();

  // Keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(!commandPaletteOpen);
      }
      if (e.key === 'Escape') {
        setCommandPaletteOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [commandPaletteOpen, setCommandPaletteOpen]);

  const allItems: SearchResult[] = useMemo(() => {
    return NAV_SECTIONS.flatMap((section) =>
      section.items.map((item) => ({
        label: item.label,
        href: item.href,
        section: section.title,
      }))
    );
  }, []);

  const filteredItems = useMemo(() => {
    if (!query) return allItems;
    const lower = query.toLowerCase();
    return allItems.filter(
      (item) =>
        item.label.toLowerCase().includes(lower) ||
        item.section.toLowerCase().includes(lower)
    );
  }, [query, allItems]);

  const handleSelect = (href: string) => {
    router.push(href);
    setCommandPaletteOpen(false);
    setQuery('');
  };

  return (
    <Dialog.Root open={commandPaletteOpen} onOpenChange={setCommandPaletteOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" />
        <Dialog.Content className="fixed left-1/2 top-[20%] z-50 w-full max-w-lg -translate-x-1/2 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-2xl">
          <Dialog.Title className="sr-only">Command Palette</Dialog.Title>
          <div className="flex items-center border-b border-[var(--color-border)] px-4">
            <Search size={18} className="text-[var(--color-muted-foreground)]" />
            <input
              autoFocus
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search modules, pages, actions..."
              className="w-full bg-transparent px-3 py-4 text-sm text-white placeholder:text-[var(--color-muted)] focus:outline-none"
            />
            <kbd className="rounded border border-[var(--color-border)] bg-[var(--color-background)] px-1.5 py-0.5 text-xs text-[var(--color-muted-foreground)]">
              ESC
            </kbd>
          </div>
          <div className="max-h-80 overflow-y-auto p-2">
            {filteredItems.length === 0 ? (
              <div className="px-4 py-8 text-center text-sm text-[var(--color-muted-foreground)]">
                No results found
              </div>
            ) : (
              filteredItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleSelect(item.href)}
                  className="flex w-full items-center justify-between rounded-lg px-4 py-2.5 text-left text-sm text-white hover:bg-[var(--color-surface-hover)]"
                >
                  <span>{item.label}</span>
                  <span className="text-xs text-[var(--color-muted-foreground)]">
                    {item.section}
                  </span>
                </button>
              ))
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
