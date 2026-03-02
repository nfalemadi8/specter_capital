import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function CTASection() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#22d3ee]/10 via-[#0f1423] to-[#a78bfa]/10" />
          <div className="absolute inset-0 grid-pattern opacity-20" />

          {/* Glowing border effect */}
          <div className="absolute inset-0 rounded-2xl border border-[#1e293b]" />
          <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-[#22d3ee]/50 to-transparent" />

          <div className="relative px-8 py-16 sm:px-16 sm:py-20 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to unify your family office?
            </h2>
            <p className="text-lg text-[#94a3b8] max-w-xl mx-auto mb-8">
              Join 200+ family offices that trust Specter to manage their entire
              financial ecosystem. No contracts, no setup fees.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/register"
                className="group inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold text-[#0a0e17] bg-gradient-to-r from-[#22d3ee] to-[#a78bfa] rounded-lg hover:opacity-90 transition-all shadow-lg shadow-[#22d3ee]/20"
              >
                Start 14-Day Free Trial
                <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold text-white border border-[#1e293b] rounded-lg hover:bg-white/5 transition-colors"
              >
                View Pricing
              </Link>
            </div>
            <p className="text-xs text-[#64748b] mt-6">
              Free for 14 days. No credit card required. Cancel anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
