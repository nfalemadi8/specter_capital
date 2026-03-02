import {
  Shield,
  Lock,
  Eye,
  Server,
  FileCheck,
  Users,
  Globe,
  AlertTriangle,
  Key,
  Database,
  Fingerprint,
  Activity,
} from 'lucide-react';

export const metadata = {
  title: 'Security — Specter',
  description: 'Enterprise-grade security with SOC 2 Type II certification, E2E encryption, and comprehensive audit trails.',
};

const securityPillars = [
  {
    icon: Lock,
    title: 'End-to-End Encryption',
    description:
      'All sensitive data is encrypted using libsodium (X25519 + XSalsa20-Poly1305). Documents and messages are encrypted client-side before transmission — even Specter cannot read your data.',
    details: [
      '256-bit encryption at rest and in transit',
      'Client-side key generation and management',
      'Per-document encryption keys',
      'Secure key exchange for sharing',
      'Zero-knowledge architecture for documents',
    ],
    color: '#22d3ee',
  },
  {
    icon: Shield,
    title: 'SOC 2 Type II Certified',
    description:
      'Independently audited against AICPA Trust Services Criteria. Our controls are continuously monitored and verified by third-party auditors.',
    details: [
      'Annual audit by independent firm',
      'Security, Availability, Confidentiality',
      'Continuous control monitoring',
      'Incident response procedures',
      'Vendor risk management',
    ],
    color: '#a78bfa',
  },
  {
    icon: Database,
    title: 'Multi-Tenant Isolation',
    description:
      'Every database query is scoped by tenant ID through PostgreSQL Row-Level Security (RLS) policies. Data isolation is enforced at the database level, not the application level.',
    details: [
      'PostgreSQL RLS on every table',
      'Tenant-scoped API middleware',
      'No cross-tenant data leaks possible',
      'Optional dedicated instance (Enterprise)',
      'Regular penetration testing',
    ],
    color: '#34d399',
  },
  {
    icon: Users,
    title: 'Role-Based Access Control',
    description:
      'Nine granular roles from Principal to Auditor, each with specific module and action permissions. Override permissions at the individual level.',
    details: [
      '9 predefined roles (Principal → Auditor)',
      'Per-user permission overrides',
      'Module-level access control',
      'Action-level granularity (view, edit, delete)',
      'Invitation-based onboarding only',
    ],
    color: '#f59e0b',
  },
  {
    icon: Fingerprint,
    title: 'Authentication',
    description:
      'Enterprise SSO/SAML support, multi-factor authentication, and secure session management through Supabase Auth.',
    details: [
      'SSO / SAML for Enterprise',
      'Multi-factor authentication (TOTP)',
      'Secure session tokens with rotation',
      'Brute-force protection',
      'IP allowlisting (Enterprise)',
    ],
    color: '#22d3ee',
  },
  {
    icon: Activity,
    title: 'Audit Trail',
    description:
      'Every action in the platform is logged with full context — who, what, when, and from where. Immutable audit logs for compliance and forensics.',
    details: [
      'Every action logged immutably',
      'User, IP, timestamp, context',
      'Exportable audit reports',
      'Configurable retention periods',
      'Real-time anomaly detection',
    ],
    color: '#a78bfa',
  },
];

const certifications = [
  {
    icon: FileCheck,
    title: 'SOC 2 Type II',
    description: 'Annual independent audit of security controls',
  },
  {
    icon: Globe,
    title: 'GDPR Compliant',
    description: 'EU data protection regulation compliance',
  },
  {
    icon: Server,
    title: 'ISO 27001',
    description: 'Information security management (in progress)',
  },
  {
    icon: Eye,
    title: 'CCPA Compliant',
    description: 'California Consumer Privacy Act compliance',
  },
  {
    icon: AlertTriangle,
    title: 'Penetration Tested',
    description: 'Annual third-party penetration testing',
  },
  {
    icon: Key,
    title: 'Bug Bounty',
    description: 'Active vulnerability disclosure program',
  },
];

export default function SecurityPage() {
  return (
    <div className="pt-32 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#1e293b] bg-[#0f1423]/80 mb-6">
            <Shield size={14} className="text-[#22d3ee]" />
            <span className="text-xs font-medium text-[#94a3b8]">SOC 2 Type II Certified</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Security <span className="gradient-text">without compromise</span>
          </h1>
          <p className="text-lg text-[#94a3b8]">
            Your family&apos;s financial data demands the highest level of protection.
            Specter is built with security as a foundation, not an afterthought.
          </p>
        </div>

        {/* Security Pillars */}
        <div className="space-y-8 mb-20">
          {securityPillars.map((pillar, i) => (
            <div
              key={pillar.title}
              className="glass-panel p-6 sm:p-8"
            >
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <div className="lg:col-span-3">
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${pillar.color}15` }}
                    >
                      <pillar.icon size={20} style={{ color: pillar.color }} />
                    </div>
                    <h2 className="text-xl font-bold text-white">{pillar.title}</h2>
                  </div>
                  <p className="text-[#94a3b8] leading-relaxed">{pillar.description}</p>
                </div>
                <div className="lg:col-span-2">
                  <ul className="space-y-2.5">
                    {pillar.details.map((detail, j) => (
                      <li key={j} className="flex items-start gap-2.5 text-sm">
                        <div
                          className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                          style={{ backgroundColor: pillar.color }}
                        />
                        <span className="text-[#e2e8f0]">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold text-white text-center mb-10">
            Certifications & Compliance
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {certifications.map((cert) => (
              <div
                key={cert.title}
                className="glass-panel p-4 text-center"
              >
                <cert.icon size={24} className="text-[#22d3ee] mx-auto mb-3" />
                <h3 className="text-sm font-semibold text-white mb-1">{cert.title}</h3>
                <p className="text-xs text-[#64748b]">{cert.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Infrastructure */}
        <div className="glass-panel p-8 sm:p-12">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            Infrastructure & Architecture
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Hosting',
                items: ['Vercel Edge Network (global CDN)', 'Supabase Cloud (AWS)', 'Optional self-hosted deployment'],
              },
              {
                title: 'Data Protection',
                items: ['AES-256 encryption at rest', 'TLS 1.3 in transit', 'Automatic encrypted backups'],
              },
              {
                title: 'Availability',
                items: ['99.99% uptime SLA (Enterprise)', 'Global edge deployment', 'Automatic failover'],
              },
            ].map((section) => (
              <div key={section.title}>
                <h3 className="text-sm font-semibold text-[#64748b] uppercase tracking-wider mb-3">
                  {section.title}
                </h3>
                <ul className="space-y-2">
                  {section.items.map((item, i) => (
                    <li key={i} className="text-sm text-[#e2e8f0] flex items-start gap-2">
                      <div className="w-1 h-1 rounded-full bg-[#22d3ee] mt-2 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
