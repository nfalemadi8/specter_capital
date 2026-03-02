'use client';

import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

/* ─── AuthCard ─── */
export function AuthCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'rounded-xl border border-[#1e293b] bg-[#0f1423] p-8 space-y-6',
        className
      )}
    >
      {children}
    </div>
  );
}

/* ─── AuthHeader ─── */
export function AuthHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-[#e8e0d0]">{title}</h2>
      <p className="mt-1 text-sm text-[#8a919e]">{subtitle}</p>
    </div>
  );
}

/* ─── AuthError ─── */
export function AuthError({ message }: { message: string }) {
  if (!message) return null;
  return (
    <div className="rounded-lg bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400">
      {message}
    </div>
  );
}

/* ─── AuthInput ─── */
export function AuthInput({
  id,
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = true,
}: {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-[#8a919e] mb-1.5"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-[#1e293b] bg-[#0a0e17] px-4 py-2.5 text-[#e8e0d0] placeholder:text-[#334155] focus:border-[#c9a55a]/50 focus:outline-none focus:ring-1 focus:ring-[#c9a55a]/25 transition-colors"
        placeholder={placeholder}
      />
    </div>
  );
}

/* ─── AuthButton ─── */
export function AuthButton({
  isLoading,
  label,
  loadingLabel,
}: {
  isLoading: boolean;
  label: string;
  loadingLabel: string;
}) {
  return (
    <button
      type="submit"
      disabled={isLoading}
      className="w-full rounded-lg bg-[#c9a55a] px-4 py-2.5 text-sm font-semibold text-[#0a0e17] hover:bg-[#d4b876] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
    >
      {isLoading ? (
        <>
          <Loader2 size={16} className="animate-spin" />
          {loadingLabel}
        </>
      ) : (
        label
      )}
    </button>
  );
}

/* ─── AuthSuccess ─── */
export function AuthSuccess({
  icon,
  title,
  children,
}: {
  icon: 'mail' | 'check';
  title: string;
  children: React.ReactNode;
}) {
  return (
    <AuthCard className="text-center !space-y-4">
      <div className="w-12 h-12 rounded-full bg-[#c9a55a]/10 flex items-center justify-center mx-auto">
        {icon === 'mail' ? (
          <svg
            className="w-6 h-6 text-[#c9a55a]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        ) : (
          <svg
            className="w-6 h-6 text-[#c9a55a]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        )}
      </div>
      <h2 className="text-lg font-semibold text-[#e8e0d0]">{title}</h2>
      {children}
    </AuthCard>
  );
}
