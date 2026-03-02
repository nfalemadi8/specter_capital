'use client';

import { useState, useRef, useEffect } from 'react';
import { useTenant } from '@/lib/hooks/use-tenant';
import { Bot, Send, Sparkles, Trash2 } from 'lucide-react';
import { clsx } from 'clsx';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export default function AICopilotPage() {
  const { tenant } = useTenant();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading || !tenant) return;

    const userMessage: ChatMessage = {
      role: 'user',
      content: input.trim(),
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({ role: m.role, content: m.content })),
          tenantId: tenant.id,
        }),
      });

      if (!response.ok) throw new Error('Failed to get response');

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: data.content,
          timestamp: new Date().toISOString(),
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Sorry, I encountered an error. Please try again.',
          timestamp: new Date().toISOString(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const SUGGESTIONS = [
    'What is my total net worth?',
    'Show me my portfolio performance this quarter',
    'What deals are in due diligence?',
    'Summarize my tax obligations',
    'What bills are overdue?',
    'Show upcoming compliance deadlines',
  ];

  return (
    <div className="flex h-[calc(100vh-8rem)] flex-col rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[var(--color-border)] px-6 py-3">
        <div className="flex items-center gap-2">
          <Sparkles size={18} className="text-[var(--color-primary)]" />
          <h2 className="text-sm font-medium text-white">Specter AI Copilot</h2>
          <span className="rounded bg-[var(--color-primary)]/10 px-1.5 py-0.5 text-xs text-[var(--color-primary)]">
            Beta
          </span>
        </div>
        {messages.length > 0 && (
          <button
            onClick={() => setMessages([])}
            className="rounded-lg p-1.5 text-[var(--color-muted-foreground)] hover:bg-[var(--color-surface-hover)] hover:text-white"
          >
            <Trash2 size={16} />
          </button>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6">
        {messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center gap-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--color-primary)]/10">
              <Bot size={32} className="text-[var(--color-primary)]" />
            </div>
            <div className="text-center">
              <h3 className="text-lg font-medium text-white">Specter AI</h3>
              <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">
                Ask me anything about your portfolio, deals, entities, or finances.
              </p>
            </div>
            <div className="grid max-w-md grid-cols-2 gap-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => setInput(s)}
                  className="rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] px-3 py-2 text-left text-xs text-[var(--color-muted-foreground)] transition-colors hover:border-[var(--color-primary)]/30 hover:text-white"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={clsx('flex gap-3', msg.role === 'user' ? 'justify-end' : 'justify-start')}
              >
                {msg.role === 'assistant' && (
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary)]/10">
                    <Bot size={16} className="text-[var(--color-primary)]" />
                  </div>
                )}
                <div
                  className={clsx(
                    'max-w-[80%] rounded-xl px-4 py-3 text-sm',
                    msg.role === 'user'
                      ? 'bg-[var(--color-primary)] text-[var(--color-primary-foreground)]'
                      : 'bg-[var(--color-background)] text-white'
                  )}
                >
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary)]/10">
                  <Bot size={16} className="text-[var(--color-primary)]" />
                </div>
                <div className="rounded-xl bg-[var(--color-background)] px-4 py-3">
                  <div className="flex gap-1">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-[var(--color-muted)]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-[var(--color-muted)]" style={{ animationDelay: '0.1s' }} />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-[var(--color-muted)]" style={{ animationDelay: '0.2s' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input */}
      <div className="border-t border-[var(--color-border)] p-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
          }}
          className="flex items-center gap-3"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about your finances..."
            disabled={isLoading}
            className="flex-1 rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] px-4 py-2.5 text-sm text-white placeholder:text-[var(--color-muted)] focus:border-[var(--color-primary)] focus:outline-none disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="rounded-lg bg-[var(--color-primary)] p-2.5 text-[var(--color-primary-foreground)] disabled:opacity-50"
          >
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}
