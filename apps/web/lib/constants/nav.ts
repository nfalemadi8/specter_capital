import type { ModuleName } from '@/lib/utils/permissions';

export interface NavItem {
  label: string;
  href: string;
  icon: string;
  module: ModuleName;
  children?: NavItem[];
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

export const NAV_SECTIONS: NavSection[] = [
  {
    title: 'Overview',
    items: [
      { label: 'Dashboard', href: '/', icon: 'LayoutDashboard', module: 'dashboard' },
      { label: 'Net Worth', href: '/net-worth', icon: 'TrendingUp', module: 'dashboard' },
    ],
  },
  {
    title: 'Investments',
    items: [
      { label: 'Portfolio', href: '/portfolio', icon: 'PieChart', module: 'portfolio' },
      { label: 'Terminal', href: '/terminal', icon: 'Monitor', module: 'portfolio' },
      { label: 'Deals', href: '/deals', icon: 'Handshake', module: 'deals' },
      { label: 'Capital Calls', href: '/capital-calls', icon: 'PhoneCall', module: 'deals' },
    ],
  },
  {
    title: 'Assets',
    items: [
      { label: 'Entities', href: '/entities', icon: 'Building2', module: 'entities' },
      { label: 'Real Estate', href: '/real-estate', icon: 'Home', module: 'real_estate' },
    ],
  },
  {
    title: 'Operations',
    items: [
      { label: 'Cash Flow', href: '/cash-flow', icon: 'ArrowLeftRight', module: 'cash_flow' },
      { label: 'Bill Pay', href: '/bill-pay', icon: 'Receipt', module: 'bill_pay' },
      { label: 'Insurance', href: '/insurance', icon: 'Shield', module: 'insurance' },
      { label: 'Contacts', href: '/contacts', icon: 'Users', module: 'contacts' },
    ],
  },
  {
    title: 'Compliance',
    items: [
      { label: 'Tax', href: '/tax', icon: 'Calculator', module: 'tax' },
      { label: 'Audit Trail', href: '/audit', icon: 'FileSearch', module: 'audit' },
      { label: 'Reports', href: '/reports', icon: 'FileBarChart', module: 'reports' },
    ],
  },
  {
    title: 'Family',
    items: [
      { label: 'Governance', href: '/governance', icon: 'Scale', module: 'governance' },
      { label: 'Philanthropy', href: '/philanthropy', icon: 'Heart', module: 'philanthropy' },
    ],
  },
  {
    title: 'Communication',
    items: [
      { label: 'Documents', href: '/documents', icon: 'FolderLock', module: 'documents' },
      { label: 'Messaging', href: '/messages', icon: 'MessageSquare', module: 'messaging' },
      { label: 'AI Copilot', href: '/ai', icon: 'Sparkles', module: 'ai_copilot' },
    ],
  },
  {
    title: 'Admin',
    items: [
      { label: 'Integrations', href: '/settings/integrations', icon: 'Plug', module: 'integrations' },
      { label: 'Settings', href: '/settings', icon: 'Settings', module: 'settings' },
    ],
  },
];
