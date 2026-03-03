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
      <form onSubmit={handleSignIn}>
        <AuthHeader
          title="Sign in to your account"
          subtitle="Welcome back. Enter your credentials below."
        />

        <AuthError message={error} />

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

        <AuthButton
          isLoading={isLoading}
          label="Sign In"
          loadingLabel="Signing in..."
        />

        <p style={{ textAlign: 'center', fontSize: '13px', color: 'rgba(255,255,255,0.5)', marginTop: '24px' }}>
          Don&apos;t have an account?{' '}
          <Link href="/signup" style={{ color: '#c8b88a', textDecoration: 'none' }}>
            Sign up
          </Link>
        </p>
        <p style={{ textAlign: 'center', fontSize: '13px', marginTop: '12px' }}>
          <Link
            href="/forgot-password"
            style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}
          >
            Forgot password?
          </Link>
        </p>
      </form>
    </AuthCard>
  );
}
