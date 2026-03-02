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
      { label: 'Blog', href: '/about#blog' },
      { label: 'Contact', href: '/about#contact' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Documentation', href: '/platform#docs' },
      { label: 'FAQ', href: '/faq' },
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
      { label: 'SOC 2', href: '/security#soc2' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-[#1e293b] bg-[#0a0e17]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="grid grid-cols-2 gap-8 py-12 md:grid-cols-4 lg:grid-cols-5">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1 mb-4 lg:mb-0">
            <div className="flex items-center gap-2 mb-4">
              <div className="relative h-8 w-8">
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-[#22d3ee] to-[#a78bfa]" />
                <div className="absolute inset-[2px] rounded-[6px] bg-[#0a0e17] flex items-center justify-center">
                  <span className="text-sm font-bold text-[#22d3ee] font-mono">S</span>
                </div>
              </div>
              <span className="text-lg font-bold text-white tracking-tight">Specter</span>
            </div>
            <p className="text-sm text-[#94a3b8] max-w-xs">
              The unified platform for family offices managing multi-generational wealth.
            </p>
          </div>

          {/* Link Columns */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold text-white mb-3">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-[#94a3b8] hover:text-[#22d3ee] transition-colors"
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
        <div className="border-t border-[#1e293b] py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#64748b]">
            &copy; {new Date().getFullYear()} Specter Holdings. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-xs text-[#64748b]">SOC 2 Type II Certified</span>
            <span className="text-xs text-[#64748b]">256-bit E2E Encryption</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
