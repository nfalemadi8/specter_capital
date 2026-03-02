import Link from 'next/link';

const footerSections = [
  {
    title: 'Product',
    links: [
      { label: 'Platform', href: '/platform' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Integrations', href: '/integrations' },
      { label: 'Security', href: '/security' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Careers', href: '/about#careers' },
      { label: 'Contact', href: '/about#contact' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'FAQ', href: '/faq' },
      { label: 'Documentation', href: '/platform#docs' },
      { label: 'API Reference', href: '/platform#api' },
      { label: 'Status', href: '/security#status' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/security#privacy' },
      { label: 'Terms of Service', href: '/security#terms' },
      { label: 'Compliance', href: '/security#compliance' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-[#1e293b]/60 bg-[#0a0e17]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 py-12 md:grid-cols-4 lg:grid-cols-5">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1 mb-4 lg:mb-0">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="relative h-7 w-7">
                <div className="absolute inset-0 rounded-md bg-gradient-to-br from-[#c9a55a] to-[#d4b876]" />
                <div className="absolute inset-[2px] rounded-[4px] bg-[#0a0e17] flex items-center justify-center">
                  <span className="text-xs font-bold text-[#c9a55a] font-mono">P</span>
                </div>
              </div>
              <span className="text-sm font-semibold tracking-tight">
                <span className="text-[#e8e0d0]">Phantom</span>{' '}
                <span className="text-[#c9a55a]">Treasury</span>
              </span>
            </div>
            <p className="text-sm text-[#8a919e] max-w-xs leading-relaxed">
              Infrastructure for multi-generational wealth operations.
            </p>
          </div>

          {/* Link Columns */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-xs font-semibold text-[#e8e0d0] uppercase tracking-wider mb-3">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-[#8a919e] hover:text-[#c9a55a] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="section-divider" />
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#64748b]">
            &copy; {new Date().getFullYear()} Phantom Treasury. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-xs text-[#64748b]">SOC 2 Type II</span>
            <span className="text-xs text-[#64748b]">E2E Encrypted</span>
            <span className="text-xs text-[#64748b]">Zero-Knowledge Architecture</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
