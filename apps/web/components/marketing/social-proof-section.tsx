const metrics = [
  { value: '$48B+', label: 'Assets Under Management' },
  { value: '200+', label: 'Family Offices' },
  { value: '99.99%', label: 'Uptime SLA' },
  { value: '<50ms', label: 'API Latency' },
];

const testimonials = [
  {
    quote:
      'Phantom Treasury replaced eight separate systems for us. Our operations team reclaimed 20 hours a week that was lost to manual reconciliation.',
    role: 'Managing Director',
    context: 'Multi-generational family office, $1.2B AUM',
  },
  {
    quote:
      'The deal pipeline with J-curve analytics completely changed how we evaluate private investments. The entity management alone justified the switch.',
    role: 'Chief Investment Officer',
    context: 'Single-family office, $800M AUM',
  },
  {
    quote:
      'End-to-end encryption on documents and messaging was the deciding factor. Our principals trust Phantom with their most sensitive information.',
    role: 'Head of Operations',
    context: 'Multi-family office, $3.4B AUM',
  },
];

export function SocialProofSection() {
  return (
    <section className="relative py-24">
      <div className="section-divider mb-24" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {metrics.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-[#c9a55a] font-mono mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-[#8a919e]">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="glass-panel p-6 flex flex-col">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <svg key={j} className="w-3.5 h-3.5 text-[#c9a55a]" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <blockquote className="text-sm text-[#e8e0d0] leading-relaxed mb-4 flex-1">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="border-t border-[#1e293b] pt-4">
                <div className="text-sm font-medium text-[#e8e0d0]">{t.role}</div>
                <div className="text-xs text-[#64748b]">{t.context}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
