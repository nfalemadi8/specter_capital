import Link from 'next/link';
import { ArrowRight, Shield, Lock, Eye } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-24 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 hero-glow" />
      <div className="absolute inset-0 grid-pattern opacity-20" />

      {/* Floating orbs */}
      <div className="absolute top-40 left-[15%] w-72 h-72 bg-[#c9a55a]/[0.04] rounded-full blur-3xl animate-float" />
      <div className="absolute top-60 right-[10%] w-96 h-96 bg-[#c9a55a]/[0.03] rounded-full blur-3xl animate-float-delayed" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#c9a55a]/20 bg-[#c9a55a]/[0.06] mb-8">
            <div className="w-1.5 h-1.5 rounded-full bg-[#c9a55a] animate-glow-pulse" />
            <span className="text-xs font-medium text-[#c9a55a]">
              Private Beta &mdash; Accepting Select Family Offices
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-[#e8e0d0] tracking-tight leading-[1.08] mb-6">
            The operating system for{' '}
            <span className="gradient-text">generational wealth</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-[#8a919e] max-w-2xl mx-auto mb-10 leading-relaxed">
            Phantom Treasury unifies portfolio intelligence, entity management,
            deal flow, compliance, and family governance into a single
            encrypted platform built for family offices.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link
              href="/register"
              className="group inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold text-[#0a0e17] bg-[#c9a55a] rounded-lg hover:bg-[#d4b876] transition-all shadow-lg shadow-[#c9a55a]/15"
            >
              Request Early Access
              <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="/platform"
              className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold text-[#e8e0d0] border border-[#1e293b] rounded-lg hover:border-[#c9a55a]/30 hover:bg-white/[0.02] transition-all"
            >
              Explore the Platform
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-xl mx-auto">
            <div className="flex items-center justify-center gap-2.5 text-sm text-[#8a919e]">
              <Shield size={15} className="text-[#c9a55a]" />
              <span>SOC 2 Type II</span>
            </div>
            <div className="flex items-center justify-center gap-2.5 text-sm text-[#8a919e]">
              <Lock size={15} className="text-[#c9a55a]" />
              <span>E2E Encrypted</span>
            </div>
            <div className="flex items-center justify-center gap-2.5 text-sm text-[#8a919e]">
              <Eye size={15} className="text-[#c9a55a]" />
              <span>Zero-Knowledge</span>
            </div>
          </div>
        </div>

        {/* Dashboard Preview */}
        <div className="mt-20 relative">
          <div className="absolute -inset-4 bg-gradient-to-b from-[#c9a55a]/[0.06] via-transparent to-transparent rounded-2xl blur-xl" />
          <div className="relative rounded-xl border border-[#1e293b] overflow-hidden bg-[#0a0e17]">
            <div className="p-1">
              <div className="bg-[#080c14] rounded-lg p-6">
                {/* Window chrome */}
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#1e293b]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#1e293b]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#1e293b]" />
                  <div className="ml-4 flex-1 h-5 bg-[#0f1423] rounded-md" />
                </div>

                {/* Stat cards */}
                <div className="grid grid-cols-4 gap-3 mb-4">
                  {[
                    { label: 'Net Worth', value: '$2.4B', change: '+8.2%' },
                    { label: 'Liquid Assets', value: '$840M', change: '' },
                    { label: 'Private Equity', value: '$620M', change: '+14.1%' },
                    { label: 'Real Estate', value: '$380M', change: '+3.7%' },
                  ].map((stat, i) => (
                    <div key={i} className="bg-[#0f1423] border border-[#1e293b]/60 rounded-lg p-4">
                      <div className="text-[10px] text-[#64748b] mb-1 uppercase tracking-wider">
                        {stat.label}
                      </div>
                      <div className="text-lg font-bold text-[#e8e0d0] font-mono">{stat.value}</div>
                      {stat.change && (
                        <div className="text-[10px] text-[#c9a55a] font-mono mt-0.5">{stat.change}</div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Chart area */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="col-span-2 bg-[#0f1423] border border-[#1e293b]/60 rounded-lg p-4 h-44">
                    <div className="text-[10px] text-[#64748b] uppercase tracking-wider mb-3">
                      Portfolio Performance — 12M
                    </div>
                    <div className="flex items-end gap-[3px] h-28">
                      {[35, 42, 38, 55, 48, 62, 56, 70, 64, 75, 68, 82, 76, 88, 84, 92, 88, 95].map(
                        (h, i) => (
                          <div
                            key={i}
                            className="flex-1 rounded-t"
                            style={{
                              height: `${h}%`,
                              backgroundColor: '#c9a55a',
                              opacity: 0.3 + (i / 18) * 0.7,
                            }}
                          />
                        )
                      )}
                    </div>
                  </div>
                  <div className="bg-[#0f1423] border border-[#1e293b]/60 rounded-lg p-4 h-44">
                    <div className="text-[10px] text-[#64748b] uppercase tracking-wider mb-3">
                      Allocation
                    </div>
                    <div className="flex items-center justify-center h-28">
                      <div className="relative w-24 h-24">
                        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                          <circle cx="50" cy="50" r="40" fill="none" stroke="#1e293b" strokeWidth="8" />
                          <circle cx="50" cy="50" r="40" fill="none" stroke="#c9a55a" strokeWidth="8"
                            strokeDasharray="100 151" strokeLinecap="round" />
                          <circle cx="50" cy="50" r="40" fill="none" stroke="#8a919e" strokeWidth="8"
                            strokeDasharray="60 191" strokeDashoffset="-100" strokeLinecap="round" />
                          <circle cx="50" cy="50" r="40" fill="none" stroke="#e8e0d0" strokeWidth="8"
                            strokeDasharray="40 211" strokeDashoffset="-160" strokeLinecap="round" opacity="0.4" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
