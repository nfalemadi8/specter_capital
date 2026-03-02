const stats = [
  { value: '$48B+', label: 'Assets Under Management' },
  { value: '200+', label: 'Family Offices' },
  { value: '99.99%', label: 'Uptime SLA' },
  { value: '<50ms', label: 'API Response Time' },
];

const testimonials = [
  {
    quote:
      'Specter consolidated 8 separate tools into one platform. Our CFO saves 20+ hours per week on reporting alone.',
    author: 'Managing Director',
    company: 'Multi-generational family office, $1.2B AUM',
  },
  {
    quote:
      'The deal pipeline with J-curve analytics completely changed how we evaluate private investments. The AI copilot is incredibly accurate.',
    author: 'Chief Investment Officer',
    company: 'Single-family office, $800M AUM',
  },
  {
    quote:
      'End-to-end encryption on documents and messaging was the deciding factor. Our principals trust Specter with their most sensitive information.',
    author: 'Head of Operations',
    company: 'Multi-family office, $3.4B AUM',
  },
];

export function SocialProofSection() {
  return (
    <section className="relative py-24 border-t border-[#1e293b]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl sm:text-4xl font-bold gradient-text font-mono mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-[#94a3b8]">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="glass-panel p-6 flex flex-col"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <div key={j} className="w-4 h-4 text-[#f59e0b]">
                    <svg viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                ))}
              </div>
              <blockquote className="text-sm text-[#e2e8f0] leading-relaxed mb-4 flex-1">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="border-t border-[#1e293b] pt-4">
                <div className="text-sm font-medium text-white">{t.author}</div>
                <div className="text-xs text-[#64748b]">{t.company}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
