'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Loader2 } from 'lucide-react';

export default function SignUpPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setIsLoading(true);

    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName },
          emailRedirectTo: `${window.location.origin}/dashboard`,
        },
      });

      if (signUpError) throw signUpError;

      if (data.user && !data.session) {
        setSuccess(true);
      } else {
        router.push('/dashboard');
        router.refresh();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="rounded-xl border border-[#1e293b] bg-[#0f1423] p-8 text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-[#c9a55a]/10 flex items-center justify-center mx-auto">
          <svg className="w-6 h-6 text-[#c9a55a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <h2 className="text-lg font-semibold text-[#e8e0d0]">Check your email</h2>
        <p className="text-sm text-[#8a919e]">
          We sent a confirmation link to{' '}
          <strong className="text-[#e8e0d0]">{email}</strong>
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
      onSubmit={handleSignUp}
      className="rounded-xl border border-[#1e293b] bg-[#0f1423] p-8 space-y-6"
    >
      <div>
        <h2 className="text-lg font-semibold text-[#e8e0d0]">Create your account</h2>
        <p className="mt-1 text-sm text-[#8a919e]">
          Request early access to Phantom Treasury.
        </p>
      </div>

      {error && (
        <div className="rounded-lg bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-[#8a919e] mb-1.5">
            Full Name
          </label>
          <input
            id="fullName"
            type="text"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full rounded-lg border border-[#1e293b] bg-[#0a0e17] px-4 py-2.5 text-[#e8e0d0] placeholder:text-[#334155] focus:border-[#c9a55a]/50 focus:outline-none focus:ring-1 focus:ring-[#c9a55a]/25 transition-colors"
            placeholder="James Harrison"
          />
        </div>

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
            placeholder="Minimum 8 characters"
          />
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#8a919e] mb-1.5">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full rounded-lg border border-[#1e293b] bg-[#0a0e17] px-4 py-2.5 text-[#e8e0d0] placeholder:text-[#334155] focus:border-[#c9a55a]/50 focus:outline-none focus:ring-1 focus:ring-[#c9a55a]/25 transition-colors"
            placeholder="Confirm your password"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-lg bg-[#c9a55a] px-4 py-2.5 text-sm font-semibold text-[#0a0e17] hover:bg-[#d4b876] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Creating account...
          </>
        ) : (
          'Create Account'
        )}
      </button>

      <p className="text-center text-sm text-[#8a919e]">
        Already have an account?{' '}
        <Link href="/signin" className="text-[#c9a55a] hover:text-[#d4b876] transition-colors">
          Sign in
        </Link>
      </p>
    </form>
  );
}
