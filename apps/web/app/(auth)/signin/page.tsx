'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Loader2 } from 'lucide-react';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/dashboard';
  const supabase = createClient();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      router.push(redirect);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign in failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSignIn}
      className="rounded-xl border border-[#1e293b] bg-[#0f1423] p-8 space-y-6"
    >
      <div>
        <h2 className="text-lg font-semibold text-[#e8e0d0]">Sign in to your account</h2>
        <p className="mt-1 text-sm text-[#8a919e]">
          Welcome back. Enter your credentials below.
        </p>
      </div>

      {error && (
        <div className="rounded-lg bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      <div className="space-y-4">
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

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-[#8a919e] mb-1.5">
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-[#1e293b] bg-[#0a0e17] px-4 py-2.5 text-[#e8e0d0] placeholder:text-[#334155] focus:border-[#c9a55a]/50 focus:outline-none focus:ring-1 focus:ring-[#c9a55a]/25 transition-colors"
            placeholder="Enter your password"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <Link href="/forgot-password" className="text-sm text-[#8a919e] hover:text-[#c9a55a] transition-colors">
          Forgot password?
        </Link>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-lg bg-[#c9a55a] px-4 py-2.5 text-sm font-semibold text-[#0a0e17] hover:bg-[#d4b876] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Signing in...
          </>
        ) : (
          'Sign In'
        )}
      </button>

      <p className="text-center text-sm text-[#8a919e]">
        Don&apos;t have an account?{' '}
        <Link href="/signup" className="text-[#c9a55a] hover:text-[#d4b876] transition-colors">
          Create one
        </Link>
      </p>
    </form>
  );
}
