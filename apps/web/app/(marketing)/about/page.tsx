import Link from 'next/link';
import { ArrowRight, MapPin, Users, Target, Heart } from 'lucide-react';

export const metadata = {
  title: 'About — Specter',
  description: 'Built by family office operators, for family office operators.',
};

const values = [
  {
    icon: Target,
    title: 'Purpose-Built',
    description:
      'Every feature exists because a family office needed it. We don\'t build generic fintech — we build tools for the specific workflows of UHNW wealth management.',
  },
  {
    icon: Users,
    title: 'Operator-Led',
    description:
      'Our team includes former family office CFOs, wealth advisors, and fund managers. We understand the nuances because we\'ve lived them.',
  },
  {
    icon: Heart,
    title: 'Trust-First',
    description:
      'Family offices trust us with their most sensitive data. That trust is earned through transparency, security, and unwavering reliability.',
  },
];

const stats = [
  { value: '2022', label: 'Founded' },
  { value: '45+', label: 'Team Members' },
  { value: '200+', label: 'Family Offices' },
  { value: '$48B+', label: 'AUM on Platform' },
];

const teamHighlights = [
  {
    role: 'Leadership',
    members: [
      { name: 'CEO & Co-Founder', background: 'Former CFO, $2B single-family office. 15 years in wealth management.' },
      { name: 'CTO & Co-Founder', background: 'Ex-Goldman Sachs engineering lead. Built trading systems for institutional desks.' },
      { name: 'Chief Product Officer', background: 'Former VP Product at leading wealthtech platform. Stanford MBA.' },
    ],
  },
  {
    role: 'Advisory Board',
    members: [
      { name: 'Strategic Advisor', background: 'Former Managing Director, J.P. Morgan Private Bank.' },
      { name: 'Security Advisor', background: 'Former CISO at Fortune 500 financial services company.' },
      { name: 'Family Office Advisor', background: 'Principal of a 3rd-generation family office, $5B+ AUM.' },
    ],
  },
];

export default function AboutPage() {
  return (
    <div className="pt-32 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Built by operators,{' '}
            <span className="gradient-text">for operators</span>
          </h1>
          <p className="text-lg text-[#94a3b8]">
            We started Specter because we were family office operators frustrated
            by having to stitch together a dozen tools. We built the platform we
            wished existed.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat) => (
            <div key={stat.label} className="glass-panel p-6 text-center">
              <div className="text-3xl font-bold gradient-text font-mono mb-1">{stat.value}</div>
              <div className="text-sm text-[#94a3b8]">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Mission */}
        <div className="glass-panel p-8 sm:p-12 mb-20">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
            <p className="text-lg text-[#94a3b8] leading-relaxed">
              To empower family offices with a single, secure, intelligent platform
              that replaces fragmented tools and manual processes — enabling
              principals and their teams to focus on what matters: growing and
              preserving multi-generational wealth.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold text-white text-center mb-10">What Drives Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((value) => (
              <div key={value.title} className="feature-card p-6">
                <value.icon size={24} className="text-[#22d3ee] mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">{value.title}</h3>
                <p className="text-sm text-[#94a3b8] leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold text-white text-center mb-10">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {teamHighlights.map((group) => (
              <div key={group.role} className="glass-panel p-6">
                <h3 className="text-sm font-semibold text-[#64748b] uppercase tracking-wider mb-4">
                  {group.role}
                </h3>
                <div className="space-y-4">
                  {group.members.map((member, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#22d3ee]/20 to-[#a78bfa]/20 flex items-center justify-center shrink-0">
                        <span className="text-xs font-bold text-[#22d3ee]">
                          {member.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
                        </span>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white">{member.name}</div>
                        <div className="text-xs text-[#94a3b8]">{member.background}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Location & Contact */}
        <div id="contact" className="glass-panel p-8 sm:p-12 text-center">
          <MapPin size={24} className="text-[#22d3ee] mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Get in Touch</h2>
          <p className="text-[#94a3b8] max-w-xl mx-auto mb-6">
            Headquartered in New York with team members worldwide. We&apos;d love to
            show you what Specter can do for your family office.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/register"
              className="group inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-[#0a0e17] bg-gradient-to-r from-[#22d3ee] to-[#a78bfa] rounded-lg hover:opacity-90 transition-all"
            >
              Request a Demo
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <a
              href="mailto:hello@specter.co"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white border border-[#1e293b] rounded-lg hover:bg-white/5 transition-colors"
            >
              hello@specter.co
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
