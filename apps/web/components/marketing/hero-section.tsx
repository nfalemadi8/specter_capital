import Link from 'next/link';
import { ArrowRight, Shield, BarChart3, Building2 } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 hero-glow" />
      <div className="absolute inset-0 grid-pattern opacity-30" />

      {/* Floating orbs */}
      <div className="absolute top-40 left-[15%] w-72 h-72 bg-[#22d3ee]/5 rounded-full blur-3xl animate-float" />
      <div className="absolute top-60 right-[10%] w-96 h-96 bg-[#a78bfa]/5 rounded-full blur-3xl animate-float-delayed" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#1e293b] bg-[#0f1423]/80 backdrop-blur-sm mb-8">
            <div className="w-1.5 h-1.5 rounded-full bg-[#22d3ee] animate-glow-pulse" />
            <span className="text-xs font-medium text-[#94a3b8]">
              Trusted by 200+ family offices worldwide
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1] mb-6">
            Your family&apos;s wealth,{' '}
            <span className="gradient-text">one unified platform</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-[#94a3b8] max-w-2xl mx-auto mb-10 leading-relaxed">
            Portfolios, private investments, entities, tax, compliance, and family
            governance &mdash; all connected with bank-grade encryption and a
            professional trading terminal.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link
              href="/register"
              className="group inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold text-[#0a0e17] bg-gradient-to-r from-[#22d3ee] to-[#a78bfa] rounded-lg hover:opacity-90 transition-all shadow-lg shadow-[#22d3ee]/20"
            >
              Start Free Trial
              <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="/platform"
              className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold text-white border border-[#1e293b] rounded-lg hover:bg-white/5 transition-colors"
            >
              See the Platform
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-3 text-sm text-[#94a3b8]">
              <Shield size={16} className="text-[#22d3ee]" />
              <span>SOC 2 Type II</span>
            </div>
            <div className="flex items-center justify-center gap-3 text-sm text-[#94a3b8]">
              <BarChart3 size={16} className="text-[#a78bfa]" />
              <span>$48B+ AUM managed</span>
            </div>
            <div className="flex items-center justify-center gap-3 text-sm text-[#94a3b8]">
              <Building2 size={16} className="text-[#34d399]" />
              <span>200+ family offices</span>
            </div>
          </div>
        </div>

        {/* Dashboard Preview */}
        <div className="mt-20 relative">
          <div className="absolute -inset-4 bg-gradient-to-b from-[#22d3ee]/10 via-[#a78bfa]/5 to-transparent rounded-2xl blur-xl" />
          <div className="relative glass-panel p-1 rounded-xl overflow-hidden">
            <div className="bg-[#0a0e17] rounded-lg p-6">
              {/* Mock Dashboard UI */}
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-[#f87171]" />
                <div className="w-3 h-3 rounded-full bg-[#f59e0b]" />
                <div className="w-3 h-3 rounded-full bg-[#34d399]" />
                <div className="ml-4 flex-1 h-6 bg-[#0f1423] rounded-lg" />
              </div>

              <div className="grid grid-cols-4 gap-3 mb-4">
                {['$2.4B', '+12.4%', '$840M', '3'].map((val, i) => (
                  <div key={i} className="bg-[#0f1423] border border-[#1e293b] rounded-lg p-4">
                    <div className="text-xs text-[#64748b] mb-1">
                      {['Net Worth', 'YTD Return', 'Liquid Assets', 'Pending'][i]}
                    </div>
                    <div className="text-lg font-bold text-white font-mono">{val}</div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-3">
                {/* Chart placeholder */}
                <div className="col-span-2 bg-[#0f1423] border border-[#1e293b] rounded-lg p-4 h-48">
                  <div className="text-xs text-[#64748b] mb-3">Portfolio Performance</div>
                  <div className="flex items-end gap-1 h-32">
                    {[40, 55, 45, 65, 50, 70, 60, 80, 72, 85, 78, 92, 88, 95, 90, 100].map(
                      (h, i) => (
                        <div
                          key={i}
                          className="flex-1 rounded-t"
                          style={{
                            height: `${h}%`,
                            background: `linear-gradient(to top, #22d3ee, #a78bfa)`,
                            opacity: 0.6 + (i / 16) * 0.4,
                          }}
                        />
                      )
                    )}
                  </div>
                </div>

                {/* Allocation placeholder */}
                <div className="bg-[#0f1423] border border-[#1e293b] rounded-lg p-4 h-48">
                  <div className="text-xs text-[#64748b] mb-3">Allocation</div>
                  <div className="flex items-center justify-center h-32">
                    <div className="w-28 h-28 rounded-full border-[6px] border-[#22d3ee] relative">
                      <div
                        className="absolute inset-0 rounded-full border-[6px] border-transparent"
                        style={{
                          borderTopColor: '#a78bfa',
                          borderRightColor: '#a78bfa',
                          transform: 'rotate(45deg)',
                        }}
                      />
                      <div
                        className="absolute inset-0 rounded-full border-[6px] border-transparent"
                        style={{
                          borderBottomColor: '#34d399',
                          transform: 'rotate(15deg)',
                        }}
                      />
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
