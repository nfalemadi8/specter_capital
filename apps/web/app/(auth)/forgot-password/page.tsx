'use client';

import { useState } from 'react';
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
      <AuthSuccess icon="check" title="Check your email">
        <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', marginBottom: '16px' }}>
          If an account exists with this email, you&apos;ll receive a password reset link.
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
      <form onSubmit={handleReset}>
        <AuthHeader
          title="Reset your password"
          subtitle="Enter your email and we'll send you a reset link."
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

        <AuthButton
          isLoading={isLoading}
          label="Send Reset Link"
          loadingLabel="Sending..."
        />

        <p style={{ textAlign: 'center', fontSize: '13px', color: 'rgba(255,255,255,0.5)', marginTop: '24px' }}>
          <Link href="/signin" style={{ color: '#c8b88a', textDecoration: 'none' }}>
            Back to sign in
          </Link>
        </p>
      </form>
    </AuthCard>
  );
}
