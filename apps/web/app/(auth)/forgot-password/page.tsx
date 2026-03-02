'use client';

import { useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Loader2 } from 'lucide-react';

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
        redirectTo: `${window.location.origin}/signin`,
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
      <div className="rounded-xl border border-[#1e293b] bg-[#0f1423] p-8 text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-[#c9a55a]/10 flex items-center justify-center mx-auto">
          <svg className="w-6 h-6 text-[#c9a55a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-lg font-semibold text-[#e8e0d0]">Check your email</h2>
        <p className="text-sm text-[#8a919e]">
          If an account exists for{' '}
          <strong className="text-[#e8e0d0]">{email}</strong>, you&apos;ll receive
          a password reset link shortly.
        </p>
        <Link
          href="/signin"
          className="inline-block text-sm text-[#c9a55a] hover:text-[#d4b876] transition-colors"
        >
          Back to sign in
        </Link>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleReset}
      className="rounded-xl border border-[#1e293b] bg-[#0f1423] p-8 space-y-6"
    >
      <div>
        <h2 className="text-lg font-semibold text-[#e8e0d0]">Reset your password</h2>
        <p className="mt-1 text-sm text-[#8a919e]">
          Enter your email address and we&apos;ll send you a link to reset your
          password.
        </p>
      </div>

      {error && (
        <div className="rounded-lg bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-[#8a919e] mb-1.5">
          Email address
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-lg border border-[#1e293b] bg-[#0a0e17] px-4 py-2.5 text-[#e8e0d0] placeholder:text-[#334155] focus:border-[#c9a55a]/50 focus:outline-none focus:ring-1 focus:ring-[#c9a55a]/25 transition-colors"
          placeholder="you@example.com"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-lg bg-[#c9a55a] px-4 py-2.5 text-sm font-semibold text-[#0a0e17] hover:bg-[#d4b876] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Sending...
          </>
        ) : (
          'Send Reset Link'
        )}
      </button>

      <p className="text-center text-sm text-[#8a919e]">
        <Link href="/signin" className="text-[#c9a55a] hover:text-[#d4b876] transition-colors">
          Back to sign in
        </Link>
      </p>
    </form>
  );
}
