'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import {
  AuthCard,
  AuthHeader,
  AuthError,
  AuthInput,
  AuthButton,
  AuthSuccess,
} from '@/components/auth/auth-form';

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
      <AuthSuccess icon="mail" title="Check your email">
        <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', marginBottom: '16px' }}>
          We sent a confirmation link to{' '}
          <strong style={{ color: 'rgba(255,255,255,0.9)' }}>{email}</strong>
        </p>
        <Link
          href="/signin"
          style={{ fontSize: '13px', color: '#c8b88a', textDecoration: 'none' }}
        >
          Back to sign in
        </Link>
      </AuthSuccess>
    );
  }

  return (
    <AuthCard>
      <form onSubmit={handleSignUp}>
        <AuthHeader
          title="Create your account"
          subtitle="Request early access to Phantom Treasury."
        />

        <AuthError message={error} />

        <AuthInput
          id="fullName"
          label="Full Name"
          value={fullName}
          onChange={setFullName}
          placeholder="James Harrison"
        />
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
          placeholder="Minimum 8 characters"
        />
        <AuthInput
          id="confirmPassword"
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={setConfirmPassword}
          placeholder="Confirm your password"
        />

        <AuthButton
          isLoading={isLoading}
          label="Create Account"
          loadingLabel="Creating account..."
        />

        <p style={{ textAlign: 'center', fontSize: '13px', color: 'rgba(255,255,255,0.5)', marginTop: '24px' }}>
          Already have an account?{' '}
          <Link href="/signin" style={{ color: '#c8b88a', textDecoration: 'none' }}>
            Sign in
          </Link>
        </p>
      </form>
    </AuthCard>
  );
}
