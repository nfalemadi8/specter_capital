'use client';

/* ─── AuthCard ─── */
export function AuthCard({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.04)', padding: '40px 32px' }}>
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
    <div style={{ marginBottom: '32px' }}>
      <h2 style={{ fontFamily: "'EB Garamond', serif", fontSize: '24px', fontWeight: 400, color: 'rgba(255,255,255,0.9)', marginBottom: '8px' }}>{title}</h2>
      <p style={{ fontSize: '13px', fontWeight: 300, color: 'rgba(255,255,255,0.5)' }}>{subtitle}</p>
    </div>
  );
}

/* ─── AuthError ─── */
export function AuthError({ message }: { message: string }) {
  if (!message) return null;
  return (
    <div style={{ background: 'rgba(220,60,60,0.08)', border: '1px solid rgba(220,60,60,0.2)', padding: '12px 16px', fontSize: '13px', color: '#dc3c3c', marginBottom: '24px' }}>
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
    <div style={{ marginBottom: '20px' }}>
      <label
        htmlFor={id}
        style={{ display: 'block', fontSize: '10px', fontWeight: 500, letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: '8px' }}
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', padding: '14px 16px', fontSize: '14px', fontWeight: 300, color: 'rgba(255,255,255,0.9)', outline: 'none', boxSizing: 'border-box' }}
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
      style={{ width: '100%', fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 500, letterSpacing: '3px', textTransform: 'uppercase', background: '#c8b88a', color: '#0a0a0a', padding: '16px', border: 'none', cursor: isLoading ? 'not-allowed' : 'pointer', opacity: isLoading ? 0.6 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
    >
      {isLoading ? (
        <>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: 'spin 1s linear infinite' }}>
            <path d="M21 12a9 9 0 11-6.219-8.56" />
          </svg>
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
    <AuthCard>
      <div style={{ textAlign: 'center' }}>
        <div style={{ width: '48px', height: '48px', margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {icon === 'mail' ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c8b88a" strokeWidth="1.2">
              <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c8b88a" strokeWidth="1.2">
              <path d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>
        <h2 style={{ fontFamily: "'EB Garamond', serif", fontSize: '22px', fontWeight: 400, color: 'rgba(255,255,255,0.9)', marginBottom: '12px' }}>{title}</h2>
        {children}
      </div>
    </AuthCard>
  );
}
