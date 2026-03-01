'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { createClient } from '@/lib/supabase/client';
import { useTenant } from '@/lib/hooks/use-tenant';
import { formatRelativeTime } from '@/lib/utils/format';
import { MessageSquare, Lock, Plus, Hash, User, Search } from 'lucide-react';
import { clsx } from 'clsx';

interface MessageChannel {
  id: string;
  tenant_id: string;
  name: string | null;
  channel_type: 'direct' | 'group' | 'entity' | 'deal';
  is_encrypted: boolean;
  entity_id: string | null;
  deal_id: string | null;
  created_at: string;
}

interface Message {
  id: string;
  channel_id: string;
  sender_id: string | null;
  encrypted_content: string;
  content_nonce: string;
  message_type: 'text' | 'file' | 'system';
  is_edited: boolean;
  is_deleted: boolean;
  created_at: string;
  tenant_members: { display_name: string } | null;
}

export default function MessagesPage() {
  const { tenant } = useTenant();
  const supabase = createClient();
  const [selectedChannel, setSelectedChannel] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  const { data: channels } = useQuery({
    queryKey: ['channels', tenant?.id],
    queryFn: async () => {
      if (!tenant) return [];
      const { data } = await supabase
        .from('message_channels')
        .select('*')
        .eq('tenant_id', tenant.id)
        .order('created_at', { ascending: false });
      return (data ?? []) as MessageChannel[];
    },
    enabled: !!tenant?.id,
  });

  const { data: messages } = useQuery({
    queryKey: ['messages', selectedChannel],
    queryFn: async () => {
      if (!selectedChannel) return [];
      const { data } = await supabase
        .from('messages')
        .select('*, tenant_members(display_name)')
        .eq('channel_id', selectedChannel)
        .order('created_at', { ascending: true })
        .limit(100);
      return (data ?? []) as Message[];
    },
    enabled: !!selectedChannel,
  });

  const channelIcon = (type: string) => {
    switch (type) {
      case 'direct': return <User size={16} />;
      case 'group': return <Hash size={16} />;
      default: return <MessageSquare size={16} />;
    }
  };

  return (
    <div className="flex h-[calc(100vh-8rem)] gap-0 overflow-hidden rounded-xl border border-[var(--color-border)]">
      {/* Channel List */}
      <div className="flex w-72 shrink-0 flex-col border-r border-[var(--color-border)] bg-[var(--color-surface)]">
        <div className="flex items-center justify-between border-b border-[var(--color-border)] p-4">
          <div className="flex items-center gap-2">
            <Lock size={16} className="text-[var(--color-success)]" />
            <h2 className="text-sm font-medium text-white">Messages</h2>
          </div>
          <button className="rounded-lg p-1.5 hover:bg-[var(--color-surface-hover)]">
            <Plus size={16} className="text-[var(--color-muted-foreground)]" />
          </button>
        </div>
        <div className="p-2">
          <div className="relative">
            <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[var(--color-muted)]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] py-1.5 pl-8 pr-3 text-xs text-white placeholder:text-[var(--color-muted)] focus:border-[var(--color-primary)] focus:outline-none"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {channels?.map((ch) => (
            <button
              key={ch.id}
              onClick={() => setSelectedChannel(ch.id)}
              className={clsx(
                'flex w-full items-center gap-3 px-4 py-3 text-left transition-colors',
                selectedChannel === ch.id
                  ? 'bg-[var(--color-primary)]/10'
                  : 'hover:bg-[var(--color-surface-hover)]'
              )}
            >
              <span className="text-[var(--color-muted-foreground)]">{channelIcon(ch.channel_type)}</span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm text-white">{ch.name ?? 'Direct Message'}</p>
                <p className="text-xs capitalize text-[var(--color-muted-foreground)]">{ch.channel_type}</p>
              </div>
              {ch.is_encrypted && <Lock size={10} className="text-[var(--color-success)]" />}
            </button>
          ))}
        </div>
      </div>

      {/* Message Area */}
      <div className="flex flex-1 flex-col bg-[var(--color-background)]">
        {selectedChannel ? (
          <>
            <div className="border-b border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-3">
              <div className="flex items-center gap-2">
                <Lock size={14} className="text-[var(--color-success)]" />
                <span className="text-sm font-medium text-white">
                  {channels?.find((c) => c.id === selectedChannel)?.name ?? 'Direct Message'}
                </span>
                <span className="rounded bg-[var(--color-surface-hover)] px-1.5 py-0.5 text-xs text-[var(--color-muted-foreground)]">
                  E2E Encrypted
                </span>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages?.map((msg) => (
                <div key={msg.id} className="flex gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary)]/10 text-xs font-medium text-[var(--color-primary)]">
                    {msg.tenant_members?.display_name?.[0] ?? '?'}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-white">
                        {msg.tenant_members?.display_name ?? 'Unknown'}
                      </span>
                      <span className="text-xs text-[var(--color-muted-foreground)]">
                        {formatRelativeTime(msg.created_at)}
                      </span>
                      {msg.is_edited && <span className="text-xs text-[var(--color-muted)]">(edited)</span>}
                    </div>
                    <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">
                      {msg.is_deleted ? (
                        <span className="italic">Message deleted</span>
                      ) : (
                        <span className="flex items-center gap-1">
                          <Lock size={10} className="text-[var(--color-success)]" />
                          <span className="italic text-[var(--color-muted)]">Encrypted message</span>
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              ))}
              {(!messages || messages.length === 0) && (
                <div className="flex h-full items-center justify-center">
                  <p className="text-sm text-[var(--color-muted)]">No messages yet. Start the conversation.</p>
                </div>
              )}
            </div>
            <div className="border-t border-[var(--color-border)] bg-[var(--color-surface)] p-4">
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  placeholder="Type a message... (E2E encrypted)"
                  className="flex-1 rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] px-4 py-2.5 text-sm text-white placeholder:text-[var(--color-muted)] focus:border-[var(--color-primary)] focus:outline-none"
                />
                <button className="rounded-lg bg-[var(--color-primary)] px-4 py-2.5 text-sm font-medium text-[var(--color-primary-foreground)]">
                  Send
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-3">
            <MessageSquare size={48} className="text-[var(--color-muted)]" />
            <p className="text-sm text-[var(--color-muted)]">Select a conversation to start messaging</p>
            <p className="text-xs text-[var(--color-muted-foreground)]">All messages are end-to-end encrypted</p>
          </div>
        )}
      </div>
    </div>
  );
}
