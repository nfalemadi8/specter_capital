'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';

const cards = [
  {
    title: 'Portfolios',
    description: 'Track and analyze all holdings across entities',
    href: '/portfolio',
  },
  {
    title: 'Entities',
    description: 'Manage trusts, LLCs, foundations, and holding companies',
    href: '/entities',
  },
  {
    title: 'Transactions',
    description: 'Record and reconcile all financial activity',
    href: '/cash-flow',
  },
  {
    title: 'Reports',
    description: 'Generate board-ready performance reports',
    href: '/reports',
  },
  {
    title: 'Documents',
    description: 'Store and organize compliance and legal documents',
    href: '/documents',
  },
  {
    title: 'Settings',
    description: 'Configure your organization, team, and preferences',
    href: '/settings',
  },
];

export default function DashboardPage() {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUserEmail(data.user?.email ?? null);
    });
  }, [supabase]);

  return (
    <div style={{ maxWidth: '960px' }}>
      {/* Welcome Header */}
      <div style={{ marginBottom: '48px' }}>
        <h1 style={{ fontFamily: "'EB Garamond', serif", fontSize: '32px', fontWeight: 400, color: 'rgba(255,255,255,0.95)', marginBottom: '8px' }}>
          Welcome to Phantom Treasury
        </h1>
        {userEmail && (
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: 'rgba(255,255,255,0.5)' }}>
            {userEmail}
          </p>
        )}
      </div>

      {/* Module Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
        {cards.map((card) => (
          <Link
            key={card.title}
            href={card.href}
            style={{
              background: '#1a1a1a',
              border: '1px solid rgba(255,255,255,0.04)',
              padding: '32px',
              textDecoration: 'none',
              display: 'block',
              transition: 'border-color 0.2s',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(200,184,138,0.15)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.04)'; }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '12px' }}>
              <h3 style={{ fontFamily: "'EB Garamond', serif", fontSize: '20px', fontWeight: 400, color: 'rgba(255,255,255,0.95)' }}>
                {card.title}
              </h3>
              <span style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '9px',
                fontWeight: 500,
                letterSpacing: '1px',
                textTransform: 'uppercase',
                padding: '4px 10px',
                borderRadius: '20px',
                border: '1px solid rgba(200,184,138,0.3)',
                color: '#c8b88a',
                background: 'rgba(200,184,138,0.08)',
                whiteSpace: 'nowrap',
              }}>
                Coming Soon
              </span>
            </div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>
              {card.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
