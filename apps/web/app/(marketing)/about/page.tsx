import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'About — Phantom Treasury',
  description: 'The operating system for generational wealth. Built by family office operators, for family office operators.',
};

export default function AboutPage() {
  return (
    <div className="relative pt-32 pb-20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 hero-glow" />
      <div className="absolute inset-0 grid-pattern opacity-[0.06]" />
      <div className="absolute top-60 right-[15%] w-72 h-72 bg-[#c9a55a]/[0.03] rounded-full blur-3xl" />

      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#c9a55a]/20 bg-[#c9a55a]/5 mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-[#c9a55a]" />
            <span className="text-xs font-medium text-[#c9a55a]">About Phantom Treasury</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-[#e8e0d0] leading-tight">
            The operating system for{' '}
            <span className="gradient-text">generational wealth</span>
          </h1>
        </div>

        {/* ─── The Problem ─── */}
        <section className="mb-16">
          <h2 className="text-sm font-semibold text-[#c9a55a] uppercase tracking-wider mb-4">
            The Problem
          </h2>
          <div className="section-divider mb-8" />
          <div className="space-y-4 text-[#8a919e] leading-relaxed">
            <p className="text-lg text-[#e8e0d0]">
              Family offices are the most sophisticated financial entities in the world —
              yet they run on the most fragmented infrastructure imaginable.
            </p>
            <p>
              Spreadsheets for portfolio tracking. Email threads for deal flow. Shared drives
              for documents. A patchwork of disconnected tools stitched together with manual
              processes, each one a potential point of failure.
            </p>
            <p>
              The average family office uses 8 to 12 separate systems to manage their wealth.
              That fragmentation creates blind spots. Blind spots create risk. And for families
              managing generational wealth, risk isn&apos;t abstract — it&apos;s existential.
            </p>
            <p>
              No one has built a single, secure platform that treats the family office as what
              it actually is: a complex financial operating system that requires purpose-built
              software, not repurposed enterprise tools.
            </p>
          </div>
        </section>

        {/* ─── The Vision ─── */}
        <section className="mb-16">
          <h2 className="text-sm font-semibold text-[#c9a55a] uppercase tracking-wider mb-4">
            The Vision
          </h2>
          <div className="section-divider mb-8" />
          <div className="space-y-4 text-[#8a919e] leading-relaxed">
            <p className="text-lg text-[#e8e0d0]">
              Phantom Treasury is the unified platform that replaces the patchwork.
            </p>
            <p>
              Six integrated modules — Portfolio Intelligence, Deal Pipeline, Entity Management,
              Treasury Operations, Tax &amp; Compliance, and Family Governance — all running on
              one secure foundation with end-to-end encryption, row-level data isolation, and
              granular role-based access.
            </p>
            <p>
              We believe family offices deserve software built specifically for them. Not
              watered-down institutional tools. Not consumer apps with &ldquo;enterprise&rdquo;
              bolted on. Purpose-built infrastructure for the unique workflows, privacy
              requirements, and multi-generational perspective that define family office operations.
            </p>
            <p>
              Our goal is to give every family office — from the single-family office managing
              $50M to the multi-family firm overseeing billions — the technology that was
              previously only available to the largest institutions.
            </p>
          </div>
        </section>

        {/* ─── The Approach ─── */}
        <section className="mb-20">
          <h2 className="text-sm font-semibold text-[#c9a55a] uppercase tracking-wider mb-4">
            The Approach
          </h2>
          <div className="section-divider mb-8" />
          <div className="space-y-4 text-[#8a919e] leading-relaxed">
            <p className="text-lg text-[#e8e0d0]">
              We build with the hundred-year view.
            </p>
            <p>
              Every feature in Phantom Treasury exists because a family office needed it —
              not because a product manager imagined it. Our team includes former family office
              operators, wealth advisors, and institutional technologists who understand the
              nuances because they&apos;ve lived them.
            </p>
            <p>
              Security is not a feature — it&apos;s the foundation. Zero-knowledge encryption,
              SOC 2 Type II compliance, and multi-tenant isolation enforced at the database
              level, not the application level. We cannot read your data, even if we wanted to.
            </p>
            <p>
              We ship in the open. Our pricing is transparent. Our roadmap is shared with
              clients. We earn trust through consistency, not contracts.
            </p>
          </div>
        </section>

        {/* ─── Early Access CTA ─── */}
        <div className="rounded-xl border border-[#c9a55a]/20 bg-[#c9a55a]/5 p-8 sm:p-10 text-center">
          <h2 className="text-2xl font-bold text-[#e8e0d0] mb-3">
            Request Early Access
          </h2>
          <p className="text-[#8a919e] max-w-lg mx-auto mb-6">
            Phantom Treasury is currently onboarding a select group of family offices.
            If you&apos;re interested in joining the early access program, we&apos;d love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/signup"
              className="group inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-[#0a0e17] bg-[#c9a55a] rounded-lg hover:bg-[#d4b876] transition-all shadow-lg shadow-[#c9a55a]/15"
            >
              Request Access
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <a
              href="mailto:hello@phantomtreasury.com"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-[#e8e0d0] border border-[#1e293b] rounded-lg hover:bg-white/5 transition-colors"
            >
              hello@phantomtreasury.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
