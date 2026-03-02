export const dynamic = 'force-dynamic';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--color-background)]">
      <div className="w-full max-w-md space-y-8 p-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-white">
            <span className="text-[var(--color-primary)]">Specter</span> Family Office
          </h1>
          <p className="mt-2 text-sm text-[var(--color-muted-foreground)]">
            Unified wealth management platform
          </p>
        </div>
        {children}
      </div>
    </div>
  );
}
