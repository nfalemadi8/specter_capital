'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import {
  AuthCard,
  AuthHeader,
  AuthError,
  AuthInput,
  AuthButton,
} from '@/components/auth/auth-form';

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
    <AuthCard>
      <form onSubmit={handleSignIn} className="space-y-6">
        <AuthHeader
          title="Sign in to your account"
          subtitle="Welcome back. Enter your credentials below."
        />

        <AuthError message={error} />

        <div className="space-y-4">
          <AuthInput
            id="email"
            label="Email address"
            type="email"
            value={email}
            onChange={setEmail}
            placeholder="you@example.com"
          />
          <AuthInput
            id="password"
            label="Password"
            type="password"
            value={password}
            onChange={setPassword}
            placeholder="Enter your password"
          />
        </div>

        <div className="flex justify-end">
          <Link
            href="/forgot-password"
            className="text-sm text-[#8a919e] hover:text-[#c9a55a] transition-colors"
          >
            Forgot password?
          </Link>
        </div>

        <AuthButton
          isLoading={isLoading}
          label="Sign In"
          loadingLabel="Signing in..."
        />

        <p className="text-center text-sm text-[#8a919e]">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="text-[#c9a55a] hover:text-[#d4b876] transition-colors">
            Create one
          </Link>
        </p>
      </form>
    </AuthCard>
  );
}
