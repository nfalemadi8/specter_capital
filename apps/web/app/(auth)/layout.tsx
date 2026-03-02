import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0a0e17]">
      {/* Subtle background */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(201,165,90,0.06),transparent_70%)]" />

      <div className="relative w-full max-w-md space-y-8 px-4 py-12">
        {/* PT Monogram + Wordmark */}
        <div className="text-center">
          <Link href="/" className="inline-flex flex-col items-center gap-4">
            <div className="relative h-12 w-12">
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#c9a55a] to-[#d4b876]" />
              <div className="absolute inset-[2px] rounded-[10px] bg-[#0a0e17] flex items-center justify-center">
                <span className="text-lg font-bold text-[#c9a55a] font-mono">P</span>
              </div>
            </div>
            <div>
              <span className="text-xl font-semibold tracking-tight">
                <span className="text-[#e8e0d0]">Phantom</span>{' '}
                <span className="text-[#c9a55a]">Treasury</span>
              </span>
            </div>
          </Link>
        </div>

        {children}
      </div>
    </div>
  );
}
