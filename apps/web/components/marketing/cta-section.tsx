import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function CTASection() {
  return (
    <section className="relative py-24">
      <div className="section-divider mb-24" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl">
          {/* Background */}
          <div className="absolute inset-0 bg-[#0f1423]" />
          <div className="absolute inset-0 grid-pattern opacity-10" />
          <div className="absolute inset-0 rounded-2xl border border-[#1e293b]" />
          <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-[#c9a55a]/30 to-transparent" />

          <div className="relative px-8 py-16 sm:px-16 sm:py-20 text-center">
            <p className="text-xs font-semibold text-[#c9a55a] uppercase tracking-[0.2em] mb-4">
              Early Access
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#e8e0d0] mb-4">
              Built for the next hundred years
            </h2>
            <p className="text-lg text-[#8a919e] max-w-xl mx-auto mb-8">
              Phantom Treasury is accepting a limited number of family offices
              into our early access program. No contracts, no setup fees.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/signup"
                className="group inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold text-[#0a0e17] bg-[#c9a55a] rounded-lg hover:bg-[#d4b876] transition-all shadow-lg shadow-[#c9a55a]/15"
              >
                Request Early Access
                <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold text-[#e8e0d0] border border-[#1e293b] rounded-lg hover:border-[#c9a55a]/30 hover:bg-white/[0.02] transition-all"
              >
                View Pricing
              </Link>
            </div>
            <p className="text-xs text-[#64748b] mt-6">
              14-day trial. No credit card required. Cancel anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
