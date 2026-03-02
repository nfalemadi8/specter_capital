'use client';

import { useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';

export const dynamic = 'force-dynamic';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const supabase = createClient();

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/login`,
      });
      if (error) throw error;
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send reset email');
    } finally {
      setIsLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8 text-center">
        <h2 className="text-lg font-semibold text-white">Check your email</h2>
        <p className="mt-2 text-sm text-[var(--color-muted-foreground)]">
          If an account exists for <strong className="text-white">{email}</strong>, you&apos;ll receive a password reset link.
        </p>
        <Link
          href="/login"
          className="mt-4 inline-block text-sm text-[var(--color-primary)] hover:underline"
        >
          Back to login
        </Link>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleReset}
      className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8 space-y-6"
    >
      <h2 className="text-lg font-semibold text-white">Reset your password</h2>
      <p className="text-sm text-[var(--color-muted-foreground)]">
        Enter your email address and we&apos;ll send you a link to reset your password.
      </p>

      {error && (
        <div className="rounded-lg bg-[var(--color-danger)]/10 px-4 py-3 text-sm text-[var(--color-danger)]">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-[var(--color-muted-foreground)]">
          Email address
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] px-4 py-2.5 text-white placeholder:text-[var(--color-muted)] focus:border-[var(--color-primary)] focus:outline-none"
          placeholder="you@example.com"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-lg bg-[var(--color-primary)] px-4 py-2.5 text-sm font-medium text-[var(--color-primary-foreground)] hover:bg-[var(--color-primary)]/90 disabled:opacity-50"
      >
        {isLoading ? 'Sending...' : 'Send reset link'}
      </button>

      <p className="text-center text-sm text-[var(--color-muted-foreground)]">
        <Link href="/login" className="text-[var(--color-primary)] hover:underline">
          Back to login
        </Link>
      </p>
    </form>
  );
}
