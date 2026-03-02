'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';

export const dynamic = 'force-dynamic';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMagicLink, setIsMagicLink] = useState(false);
  const [magicLinkSent, setMagicLinkSent] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';

  const supabase = createClient();

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (isMagicLink) {
        const { error } = await supabase.auth.signInWithOtp({
          email,
          options: { emailRedirectTo: `${window.location.origin}${redirect}` },
        });
        if (error) throw error;
        setMagicLinkSent(true);
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        router.push(redirect);
        router.refresh();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  if (magicLinkSent) {
    return (
      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8 text-center">
        <h2 className="text-lg font-semibold text-white">Check your email</h2>
        <p className="mt-2 text-sm text-[var(--color-muted-foreground)]">
          We sent a magic link to <strong className="text-white">{email}</strong>
        </p>
        <button
          onClick={() => setMagicLinkSent(false)}
          className="mt-4 text-sm text-[var(--color-primary)] hover:underline"
        >
          Try another method
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleEmailLogin}
      className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8 space-y-6"
    >
      <h2 className="text-lg font-semibold text-white">Sign in to your account</h2>

      {error && (
        <div className="rounded-lg bg-[var(--color-danger)]/10 px-4 py-3 text-sm text-[var(--color-danger)]">
          {error}
        </div>
      )}

      <div className="space-y-4">
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

        {!isMagicLink && (
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-[var(--color-muted-foreground)]"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              required={!isMagicLink}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] px-4 py-2.5 text-white placeholder:text-[var(--color-muted)] focus:border-[var(--color-primary)] focus:outline-none"
              placeholder="Enter your password"
            />
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-lg bg-[var(--color-primary)] px-4 py-2.5 text-sm font-medium text-[var(--color-primary-foreground)] hover:bg-[var(--color-primary)]/90 disabled:opacity-50"
      >
        {isLoading ? 'Signing in...' : isMagicLink ? 'Send magic link' : 'Sign in'}
      </button>

      <div className="flex items-center justify-between text-sm">
        <button
          type="button"
          onClick={() => setIsMagicLink(!isMagicLink)}
          className="text-[var(--color-primary)] hover:underline"
        >
          {isMagicLink ? 'Use password instead' : 'Use magic link'}
        </button>
        <Link href="/forgot-password" className="text-[var(--color-muted-foreground)] hover:text-white">
          Forgot password?
        </Link>
      </div>

      <p className="text-center text-sm text-[var(--color-muted-foreground)]">
        Don&apos;t have an account?{' '}
        <Link href="/register" className="text-[var(--color-primary)] hover:underline">
          Sign up
        </Link>
      </p>
    </form>
  );
}
