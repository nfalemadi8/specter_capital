'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Shield, Key, Smartphone, Globe } from 'lucide-react';

export default function SecuritySettingsPage() {
  const [mfaEnabled, setMfaEnabled] = useState(false);

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/settings" className="rounded-lg p-2 hover:bg-[var(--color-surface-hover)]">
          <ArrowLeft size={20} className="text-[var(--color-muted-foreground)]" />
        </Link>
        <h1 className="text-2xl font-bold text-white">Security</h1>
      </div>

      {/* Password */}
      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
        <div className="flex items-center gap-2">
          <Key size={18} className="text-[var(--color-primary)]" />
          <h3 className="text-sm font-medium text-white">Change Password</h3>
        </div>
        <div className="mt-4 space-y-4">
          <input
            type="password"
            placeholder="Current password"
            className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] px-4 py-2.5 text-sm text-white placeholder:text-[var(--color-muted)] focus:border-[var(--color-primary)] focus:outline-none"
          />
          <input
            type="password"
            placeholder="New password"
            className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] px-4 py-2.5 text-sm text-white placeholder:text-[var(--color-muted)] focus:border-[var(--color-primary)] focus:outline-none"
          />
          <input
            type="password"
            placeholder="Confirm new password"
            className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] px-4 py-2.5 text-sm text-white placeholder:text-[var(--color-muted)] focus:border-[var(--color-primary)] focus:outline-none"
          />
          <button className="rounded-lg bg-[var(--color-primary)] px-4 py-2 text-sm font-medium text-[var(--color-primary-foreground)]">
            Update Password
          </button>
        </div>
      </div>

      {/* MFA */}
      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Smartphone size={18} className="text-[var(--color-primary)]" />
            <h3 className="text-sm font-medium text-white">Two-Factor Authentication</h3>
          </div>
          <button
            onClick={() => setMfaEnabled(!mfaEnabled)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              mfaEnabled ? 'bg-[var(--color-success)]' : 'bg-[var(--color-muted)]'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                mfaEnabled ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
        <p className="mt-2 text-xs text-[var(--color-muted-foreground)]">
          {mfaEnabled
            ? 'MFA is enabled. Your account is protected with an authenticator app.'
            : 'Add an extra layer of security with time-based one-time passwords (TOTP).'}
        </p>
      </div>

      {/* Sessions */}
      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
        <div className="flex items-center gap-2">
          <Globe size={18} className="text-[var(--color-primary)]" />
          <h3 className="text-sm font-medium text-white">Active Sessions</h3>
        </div>
        <p className="mt-2 text-xs text-[var(--color-muted-foreground)]">
          Manage your active sessions across devices.
        </p>
        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between rounded-lg bg-[var(--color-background)] px-3 py-2 text-sm">
            <div>
              <span className="text-white">Current session</span>
              <p className="text-xs text-[var(--color-muted-foreground)]">This device · Active now</p>
            </div>
            <span className="rounded bg-[var(--color-success)]/10 px-2 py-0.5 text-xs text-[var(--color-success)]">
              Current
            </span>
          </div>
        </div>
        <button className="mt-4 rounded-lg border border-[var(--color-danger)] px-4 py-2 text-sm text-[var(--color-danger)] hover:bg-[var(--color-danger)]/10">
          Sign Out All Other Sessions
        </button>
      </div>

      {/* Encryption Keys */}
      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
        <div className="flex items-center gap-2">
          <Shield size={18} className="text-[var(--color-primary)]" />
          <h3 className="text-sm font-medium text-white">Encryption Keys</h3>
        </div>
        <p className="mt-2 text-xs text-[var(--color-muted-foreground)]">
          Your X25519 key pair is used for end-to-end encryption of documents and messages.
          The private key is encrypted with your password and stored securely.
        </p>
        <div className="mt-4 flex gap-3">
          <button className="rounded-lg border border-[var(--color-border)] px-4 py-2 text-sm text-white hover:bg-[var(--color-surface-hover)]">
            Regenerate Keys
          </button>
          <button className="rounded-lg border border-[var(--color-border)] px-4 py-2 text-sm text-white hover:bg-[var(--color-surface-hover)]">
            Export Public Key
          </button>
        </div>
      </div>
    </div>
  );
}
