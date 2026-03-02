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
      </AuthSuccess>
    );
  }

  return (
    <AuthCard>
      <form onSubmit={handleReset} className="space-y-6">
        <AuthHeader
          title="Reset your password"
          subtitle="Enter your email address and we'll send you a link to reset your password."
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

        <p className="text-center text-sm text-[#8a919e]">
          <Link href="/signin" className="text-[#c9a55a] hover:text-[#d4b876] transition-colors">
            Back to sign in
          </Link>
        </p>
      </form>
    </AuthCard>
  );
}
