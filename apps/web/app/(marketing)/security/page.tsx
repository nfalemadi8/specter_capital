import {
  Shield,
  Lock,
  Users,
  Eye,
  FileCheck,
} from 'lucide-react';

export const metadata = {
  title: 'Security — Phantom Treasury',
  description: 'Enterprise-grade security with E2E encryption, zero-knowledge architecture, and comprehensive audit trails.',
};

/* ─── Section 1: Architecture ─── */
const architectureItems = [
  'Vercel Edge Network with global CDN deployment',
  'Supabase Cloud (AWS) with encrypted backups',
  'PostgreSQL with Row-Level Security on every table',
  'Tenant-scoped API middleware — no cross-tenant data leaks',
  '99.99% uptime SLA on Enterprise plans',
  'Optional self-hosted deployment via Docker',
];

/* ─── Section 2: Encryption ─── */
const encryptionItems = [
  'AES-256 encryption at rest for all stored data',
  'TLS 1.3 for all data in transit',
  'Client-side encryption using libsodium (X25519 + XSalsa20-Poly1305)',
  'Per-document encryption keys with secure key exchange',
  'Zero-knowledge architecture — Phantom Treasury cannot read your data',
  'Automatic encrypted backups with configurable retention',
];

/* ─── Section 3: Access Control ─── */
const accessControlItems = [
  '9 predefined roles from Principal to Auditor',
  'Per-user permission overrides at module and action level',
  'SSO / SAML support for Enterprise (Okta, Azure AD, Google Workspace)',
  'Multi-factor authentication (TOTP) on all plans',
  'Invitation-based onboarding only — no open registration',
  'IP allowlisting for Enterprise environments',
];

/* ─── Section 4: Privacy ─── */
const privacyItems = [
  'Every action logged with full context — who, what, when, where',
  'Immutable audit logs for compliance and forensics',
  'Exportable audit reports for regulatory review',
  'Real-time anomaly detection on suspicious activity',
  'Brute-force protection and session token rotation',
  'Configurable data retention policies per tenant',
];

/* ─── Section 5: Compliance Roadmap ─── */
const complianceItems = [
  { label: 'SOC 2 Type II', status: 'In Progress', description: 'Annual independent audit of security controls' },
  { label: 'GDPR', status: 'Compliant', description: 'EU data protection regulation compliance' },
  { label: 'CCPA', status: 'Compliant', description: 'California Consumer Privacy Act compliance' },
  { label: 'ISO 27001', status: 'Planned', description: 'Information security management certification' },
  { label: 'Penetration Testing', status: 'Annual', description: 'Third-party penetration testing by independent firm' },
  { label: 'Bug Bounty', status: 'Active', description: 'Vulnerability disclosure and reward program' },
];

const sections = [
  {
    icon: Shield,
    title: 'Architecture',
    description: 'Built on a modern, hardened infrastructure stack with multi-tenant isolation enforced at the database level — not the application level.',
    items: architectureItems,
  },
  {
    icon: Lock,
    title: 'Encryption',
    description: 'End-to-end encryption for all sensitive data. Documents and messages are encrypted client-side before transmission. Even we cannot read your data.',
    items: encryptionItems,
  },
  {
    icon: Users,
    title: 'Access Control',
    description: 'Granular role-based access with nine predefined roles, per-user overrides, and enterprise SSO. Every access decision is auditable.',
    items: accessControlItems,
  },
  {
    icon: Eye,
    title: 'Privacy & Audit',
    description: 'Comprehensive audit trails, anomaly detection, and configurable retention policies. Every action in the platform is logged immutably.',
    items: privacyItems,
  },
];

export default function SecurityPage() {
  return (
    <div className="relative pt-32 pb-20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 hero-glow" />
      <div className="absolute inset-0 grid-pattern opacity-[0.08]" />
      <div className="absolute top-40 left-[12%] w-80 h-80 bg-[#c9a55a]/[0.03] rounded-full blur-3xl" />
      <div className="absolute top-[50rem] right-[8%] w-96 h-96 bg-[#c9a55a]/[0.02] rounded-full blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#c9a55a]/20 bg-[#c9a55a]/5 mb-6">
            <Shield size={14} className="text-[#c9a55a]" />
            <span className="text-xs font-medium text-[#c9a55a]">Security-First Architecture</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-[#e8e0d0] mb-4">
            Security <span className="gradient-text">without compromise</span>
          </h1>
          <p className="text-lg text-[#8a919e]">
            Your family&apos;s financial data demands the highest level of protection.
            Phantom Treasury is built with security as a foundation, not an afterthought.
          </p>
        </div>

        {/* Security Sections */}
        <div className="space-y-8 mb-20">
          {sections.map((section) => (
            <div
              key={section.title}
              className="feature-card p-6 sm:p-8"
            >
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <div className="lg:col-span-3">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-[#c9a55a]/10 flex items-center justify-center">
                      <section.icon size={20} className="text-[#c9a55a]" />
                    </div>
                    <h2 className="text-xl font-bold text-[#e8e0d0]">{section.title}</h2>
                  </div>
                  <p className="text-[#8a919e] leading-relaxed">{section.description}</p>
                </div>
                <div className="lg:col-span-2">
                  <ul className="space-y-2.5">
                    {section.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2.5 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#c9a55a] mt-1.5 shrink-0" />
                        <span className="text-[#e8e0d0]/80">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Compliance Roadmap */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-lg bg-[#c9a55a]/10 flex items-center justify-center">
              <FileCheck size={20} className="text-[#c9a55a]" />
            </div>
            <h2 className="text-2xl font-bold text-[#e8e0d0]">Compliance Roadmap</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {complianceItems.map((item) => (
              <div
                key={item.label}
                className="feature-card p-5"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-semibold text-[#e8e0d0]">{item.label}</h3>
                  <span className="px-2 py-0.5 text-xs rounded-full font-medium bg-[#c9a55a]/10 text-[#c9a55a]">
                    {item.status}
                  </span>
                </div>
                <p className="text-xs text-[#8a919e]">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Badges */}
        <div className="rounded-xl border border-[#1e293b] bg-[#0f1423]/60 p-8 sm:p-12 text-center">
          <h2 className="text-2xl font-bold text-[#e8e0d0] mb-8">Trusted by the Most Demanding Clients</h2>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {['SOC 2 Type II', 'E2E Encrypted', 'Zero-Knowledge', 'GDPR Compliant', 'Pen Tested'].map((badge) => (
              <div
                key={badge}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#c9a55a]/20 bg-[#c9a55a]/5"
              >
                <Shield size={14} className="text-[#c9a55a]" />
                <span className="text-sm font-medium text-[#c9a55a]">{badge}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
