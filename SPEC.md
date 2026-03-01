# SPECTER FAMILY OFFICE — Complete Project Specification

## Product Vision

Specter Family Office is a SaaS platform for family offices to manage their entire financial ecosystem — portfolios, private investments, entities, operations, tax, compliance, and family governance — in one unified, secure portal. It connects to the standalone Specter Terminal for deep market analysis while providing a comprehensive operational backbone for multi-generational wealth management.

**Target**: Global family offices managing $50M–$5B+ in assets
**Pricing**: SaaS subscription (monthly/annual tiered by AUM and seats)
**Differentiator**: The only platform that combines a professional-grade trading terminal with full family office operations

---

## Architecture Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Framework | Next.js 14+ (App Router) | SSR, API routes, middleware, best for SaaS |
| Database | Supabase (PostgreSQL) | Auth, RLS, realtime, storage, edge functions |
| Styling | Tailwind CSS + Radix UI primitives | Specter aesthetic + accessible components |
| State | Zustand + React Query | Client state + server state separation |
| Auth | Supabase Auth + custom RBAC | Multi-tenant with row-level security |
| Encryption | libsodium (E2E for docs/messaging) | Client-side encryption before storage |
| Deployment | Vercel (primary) + Docker (self-hosted option) | Multi-tenant SaaS + single-tenant enterprise |
| Payments | Stripe Billing | Subscriptions, usage metering, invoicing |
| Integrations | Plaid, Interactive Brokers, Alpaca | Bank feeds, brokerage, trading |
| Monitoring | Sentry + Posthog | Error tracking + product analytics |
| Testing | Vitest + Playwright | Unit + E2E testing |
| Specter Terminal | Embedded iframe + shared API layer | Both embedded and standalone modes |

---

## Repository Structure

```
specter-family-office/
├── .github/
│   ├── workflows/
│   │   ├── ci.yml                    # Lint, test, type-check on PR
│   │   ├── deploy-preview.yml        # Vercel preview deploys
│   │   ├── deploy-production.yml     # Production deploy on main
│   │   └── security-audit.yml        # Weekly dependency audit
│   └── CODEOWNERS
├── apps/
│   ├── web/                          # Main Next.js application
│   │   ├── app/
│   │   │   ├── (auth)/
│   │   │   │   ├── login/page.tsx
│   │   │   │   ├── register/page.tsx
│   │   │   │   ├── forgot-password/page.tsx
│   │   │   │   ├── accept-invite/page.tsx
│   │   │   │   └── layout.tsx
│   │   │   ├── (dashboard)/
│   │   │   │   ├── layout.tsx                    # Shell: sidebar + topbar
│   │   │   │   ├── page.tsx                      # Dashboard home
│   │   │   │   ├── net-worth/page.tsx
│   │   │   │   ├── portfolio/
│   │   │   │   │   ├── page.tsx                  # Portfolio overview
│   │   │   │   │   ├── [holding]/page.tsx        # Individual holding detail
│   │   │   │   │   └── rebalance/page.tsx        # Rebalancing tool
│   │   │   │   ├── terminal/
│   │   │   │   │   └── page.tsx                  # Specter Terminal embed
│   │   │   │   ├── intelligence/page.tsx
│   │   │   │   ├── deals/
│   │   │   │   │   ├── page.tsx                  # Pipeline kanban
│   │   │   │   │   ├── [deal]/page.tsx           # Deal detail + docs
│   │   │   │   │   └── new/page.tsx              # New deal wizard
│   │   │   │   ├── capital-calls/page.tsx
│   │   │   │   ├── real-estate/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   ├── [property]/page.tsx
│   │   │   │   │   └── map/page.tsx              # Property map view
│   │   │   │   ├── entities/
│   │   │   │   │   ├── page.tsx                  # Visual org chart
│   │   │   │   │   └── [entity]/page.tsx
│   │   │   │   ├── documents/
│   │   │   │   │   ├── page.tsx                  # Vault browser
│   │   │   │   │   └── [folder]/page.tsx
│   │   │   │   ├── cash-flow/page.tsx
│   │   │   │   ├── bill-pay/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   └── approvals/page.tsx
│   │   │   │   ├── insurance/page.tsx
│   │   │   │   ├── contacts/page.tsx
│   │   │   │   ├── tax/
│   │   │   │   │   ├── page.tsx                  # Tax dashboard
│   │   │   │   │   ├── harvesting/page.tsx       # TLH scanner
│   │   │   │   │   └── estimates/page.tsx
│   │   │   │   ├── audit/page.tsx
│   │   │   │   ├── reports/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   └── builder/page.tsx
│   │   │   │   ├── governance/page.tsx
│   │   │   │   ├── philanthropy/page.tsx
│   │   │   │   ├── messaging/page.tsx
│   │   │   │   ├── integrations/page.tsx
│   │   │   │   ├── settings/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   ├── billing/page.tsx
│   │   │   │   │   ├── team/page.tsx
│   │   │   │   │   ├── security/page.tsx
│   │   │   │   │   └── branding/page.tsx         # White-label config
│   │   │   │   └── ai-copilot/page.tsx           # AI assistant
│   │   │   ├── api/
│   │   │   │   ├── auth/[...supabase]/route.ts
│   │   │   │   ├── webhooks/
│   │   │   │   │   ├── stripe/route.ts
│   │   │   │   │   ├── plaid/route.ts
│   │   │   │   │   └── ibkr/route.ts
│   │   │   │   ├── integrations/
│   │   │   │   │   ├── plaid/
│   │   │   │   │   │   ├── link-token/route.ts
│   │   │   │   │   │   ├── exchange/route.ts
│   │   │   │   │   │   └── sync/route.ts
│   │   │   │   │   ├── ibkr/
│   │   │   │   │   │   ├── auth/route.ts
│   │   │   │   │   │   ├── positions/route.ts
│   │   │   │   │   │   └── orders/route.ts
│   │   │   │   │   ├── alpaca/
│   │   │   │   │   │   ├── auth/route.ts
│   │   │   │   │   │   ├── positions/route.ts
│   │   │   │   │   │   └── orders/route.ts
│   │   │   │   │   └── specter-terminal/
│   │   │   │   │       ├── embed/route.ts
│   │   │   │   │       └── sync/route.ts
│   │   │   │   ├── ai/
│   │   │   │   │   ├── chat/route.ts             # AI copilot endpoint
│   │   │   │   │   └── summarize/route.ts
│   │   │   │   ├── reports/
│   │   │   │   │   └── generate/route.ts
│   │   │   │   ├── encryption/
│   │   │   │   │   ├── keys/route.ts
│   │   │   │   │   └── share/route.ts
│   │   │   │   └── cron/
│   │   │   │       ├── sync-prices/route.ts
│   │   │   │       ├── sync-transactions/route.ts
│   │   │   │       └── send-alerts/route.ts
│   │   │   ├── globals.css
│   │   │   └── layout.tsx
│   │   ├── components/
│   │   │   ├── shell/
│   │   │   │   ├── sidebar.tsx
│   │   │   │   ├── topbar.tsx
│   │   │   │   ├── command-palette.tsx            # ⌘K search
│   │   │   │   ├── notification-center.tsx
│   │   │   │   └── breadcrumbs.tsx
│   │   │   ├── dashboard/
│   │   │   │   ├── stat-card.tsx
│   │   │   │   ├── net-worth-chart.tsx
│   │   │   │   ├── allocation-donut.tsx
│   │   │   │   ├── activity-feed.tsx
│   │   │   │   ├── entity-tree.tsx
│   │   │   │   ├── goal-tracker.tsx
│   │   │   │   ├── daily-briefing.tsx
│   │   │   │   ├── watchlist-panel.tsx
│   │   │   │   ├── market-hours-indicator.tsx
│   │   │   │   └── quick-actions.tsx
│   │   │   ├── portfolio/
│   │   │   │   ├── holdings-table.tsx
│   │   │   │   ├── candlestick-chart.tsx
│   │   │   │   ├── sector-heatmap.tsx
│   │   │   │   ├── correlation-matrix.tsx
│   │   │   │   ├── dividend-calendar.tsx
│   │   │   │   ├── options-chain.tsx
│   │   │   │   ├── crypto-tracker.tsx
│   │   │   │   ├── etf-look-through.tsx
│   │   │   │   ├── benchmark-overlay.tsx
│   │   │   │   ├── tax-lot-selector.tsx
│   │   │   │   ├── rebalance-alert.tsx
│   │   │   │   ├── earnings-calendar.tsx
│   │   │   │   ├── analyst-ratings.tsx
│   │   │   │   ├── short-interest.tsx
│   │   │   │   ├── pre-market-tracker.tsx
│   │   │   │   ├── multi-broker-view.tsx
│   │   │   │   └── sparkline.tsx
│   │   │   ├── deals/
│   │   │   │   ├── pipeline-kanban.tsx
│   │   │   │   ├── deal-card.tsx
│   │   │   │   ├── deal-detail.tsx
│   │   │   │   ├── commitment-tracker.tsx
│   │   │   │   ├── j-curve-chart.tsx
│   │   │   │   ├── scoring-engine.tsx
│   │   │   │   ├── lp-report-parser.tsx
│   │   │   │   ├── moic-calculator.tsx
│   │   │   │   ├── comparable-analysis.tsx
│   │   │   │   ├── memo-generator.tsx
│   │   │   │   ├── portfolio-company-kpi.tsx
│   │   │   │   ├── follow-on-tracker.tsx
│   │   │   │   ├── secondary-valuation.tsx
│   │   │   │   ├── fund-scorecard.tsx
│   │   │   │   ├── vintage-comparison.tsx
│   │   │   │   ├── term-sheet-comparison.tsx
│   │   │   │   ├── dd-checklist.tsx
│   │   │   │   └── exit-modeler.tsx
│   │   │   ├── real-estate/
│   │   │   │   ├── property-map.tsx
│   │   │   │   ├── rental-waterfall.tsx
│   │   │   │   ├── cap-rate-calc.tsx
│   │   │   │   ├── mortgage-amortization.tsx
│   │   │   │   ├── tenant-portal.tsx
│   │   │   │   ├── maintenance-tracker.tsx
│   │   │   │   ├── exchange-1031.tsx
│   │   │   │   ├── renovation-budget.tsx
│   │   │   │   ├── vacancy-monitor.tsx
│   │   │   │   ├── tax-assessment.tsx
│   │   │   │   ├── market-value-api.tsx
│   │   │   │   └── depreciation-schedule.tsx
│   │   │   ├── entities/
│   │   │   │   ├── org-chart.tsx
│   │   │   │   ├── k1-tracker.tsx
│   │   │   │   ├── clause-search.tsx
│   │   │   │   ├── filing-calendar.tsx
│   │   │   │   ├── inter-entity-loans.tsx
│   │   │   │   ├── board-scheduler.tsx
│   │   │   │   ├── signatory-matrix.tsx
│   │   │   │   ├── formation-wizard.tsx
│   │   │   │   ├── boi-registry.tsx
│   │   │   │   └── poa-tracker.tsx
│   │   │   ├── cash-flow/
│   │   │   │   ├── flow-chart.tsx
│   │   │   │   ├── forecast-engine.tsx
│   │   │   │   ├── funding-waterfall.tsx
│   │   │   │   ├── sweep-optimizer.tsx
│   │   │   │   ├── pattern-detector.tsx
│   │   │   │   ├── vendor-approvals.tsx
│   │   │   │   ├── expense-tagger.tsx
│   │   │   │   ├── cc-reconciliation.tsx
│   │   │   │   ├── wire-workflow.tsx
│   │   │   │   ├── payroll-manager.tsx
│   │   │   │   ├── travel-expenses.tsx
│   │   │   │   ├── subscription-tracker.tsx
│   │   │   │   ├── budget-variance.tsx
│   │   │   │   └── stress-test.tsx
│   │   │   ├── tax/
│   │   │   │   ├── tlh-scanner.tsx
│   │   │   │   ├── quarterly-calc.tsx
│   │   │   │   ├── multi-state.tsx
│   │   │   │   ├── charitable-optimizer.tsx
│   │   │   │   ├── qsbs-tracker.tsx
│   │   │   │   ├── fbar-alerts.tsx
│   │   │   │   ├── cost-basis.tsx
│   │   │   │   ├── oz-tracker.tsx
│   │   │   │   ├── gift-tax.tsx
│   │   │   │   └── gst-calculator.tsx
│   │   │   ├── family/
│   │   │   │   ├── constitution-editor.tsx
│   │   │   │   ├── education-tracker.tsx
│   │   │   │   ├── meeting-builder.tsx
│   │   │   │   ├── shared-calendar.tsx
│   │   │   │   ├── inheritance-sim.tsx
│   │   │   │   ├── permission-manager.tsx
│   │   │   │   ├── mentorship-pairing.tsx
│   │   │   │   ├── memory-archive.tsx
│   │   │   │   ├── prenup-tracker.tsx
│   │   │   │   └── succession-planner.tsx
│   │   │   ├── documents/
│   │   │   │   ├── vault-browser.tsx
│   │   │   │   ├── encrypted-viewer.tsx
│   │   │   │   ├── version-history.tsx
│   │   │   │   └── search-index.tsx
│   │   │   ├── messaging/
│   │   │   │   ├── encrypted-chat.tsx
│   │   │   │   ├── thread-view.tsx
│   │   │   │   └── file-share.tsx
│   │   │   ├── reports/
│   │   │   │   ├── report-builder.tsx
│   │   │   │   ├── pdf-generator.tsx
│   │   │   │   └── schedule-manager.tsx
│   │   │   ├── ai/
│   │   │   │   ├── copilot-panel.tsx
│   │   │   │   ├── natural-query.tsx
│   │   │   │   └── insight-cards.tsx
│   │   │   ├── integrations/
│   │   │   │   ├── plaid-link.tsx
│   │   │   │   ├── ibkr-connect.tsx
│   │   │   │   ├── alpaca-connect.tsx
│   │   │   │   ├── specter-embed.tsx
│   │   │   │   └── integration-card.tsx
│   │   │   ├── billing/
│   │   │   │   ├── plan-selector.tsx
│   │   │   │   ├── usage-meter.tsx
│   │   │   │   └── invoice-history.tsx
│   │   │   ├── shared/
│   │   │   │   ├── data-table.tsx
│   │   │   │   ├── chart-container.tsx
│   │   │   │   ├── donut-chart.tsx
│   │   │   │   ├── bar-chart.tsx
│   │   │   │   ├── line-chart.tsx
│   │   │   │   ├── sparkline.tsx
│   │   │   │   ├── currency-display.tsx
│   │   │   │   ├── date-range-picker.tsx
│   │   │   │   ├── file-uploader.tsx
│   │   │   │   ├── confirmation-dialog.tsx
│   │   │   │   ├── empty-state.tsx
│   │   │   │   ├── loading-skeleton.tsx
│   │   │   │   ├── error-boundary.tsx
│   │   │   │   └── keyboard-shortcuts.tsx
│   │   │   └── branding/
│   │   │       ├── theme-provider.tsx
│   │   │       └── logo.tsx
│   │   ├── lib/
│   │   │   ├── supabase/
│   │   │   │   ├── client.ts                     # Browser client
│   │   │   │   ├── server.ts                     # Server client
│   │   │   │   ├── admin.ts                      # Service role client
│   │   │   │   └── middleware.ts                  # Auth middleware
│   │   │   ├── integrations/
│   │   │   │   ├── plaid.ts
│   │   │   │   ├── ibkr.ts
│   │   │   │   ├── alpaca.ts
│   │   │   │   ├── stripe.ts
│   │   │   │   └── specter-terminal.ts
│   │   │   ├── encryption/
│   │   │   │   ├── e2e.ts                        # libsodium wrapper
│   │   │   │   ├── key-management.ts
│   │   │   │   └── secure-share.ts
│   │   │   ├── ai/
│   │   │   │   ├── copilot.ts                    # Anthropic API wrapper
│   │   │   │   └── embeddings.ts                 # Document search
│   │   │   ├── calculations/
│   │   │   │   ├── irr.ts
│   │   │   │   ├── moic.ts
│   │   │   │   ├── cap-rate.ts
│   │   │   │   ├── amortization.ts
│   │   │   │   ├── tax-loss-harvest.ts
│   │   │   │   ├── rebalance.ts
│   │   │   │   └── currency.ts
│   │   │   ├── hooks/
│   │   │   │   ├── use-realtime.ts
│   │   │   │   ├── use-encryption.ts
│   │   │   │   ├── use-permissions.ts
│   │   │   │   ├── use-tenant.ts
│   │   │   │   ├── use-currency.ts
│   │   │   │   └── use-keyboard-shortcuts.ts
│   │   │   ├── stores/
│   │   │   │   ├── auth-store.ts
│   │   │   │   ├── tenant-store.ts
│   │   │   │   ├── ui-store.ts
│   │   │   │   └── notification-store.ts
│   │   │   ├── utils/
│   │   │   │   ├── format.ts                     # Currency, date, number formatting
│   │   │   │   ├── permissions.ts                # RBAC helpers
│   │   │   │   └── validators.ts
│   │   │   └── constants/
│   │   │       ├── currencies.ts
│   │   │       ├── roles.ts
│   │   │       └── nav.ts
│   │   ├── middleware.ts                          # Auth + tenant resolution
│   │   ├── next.config.ts
│   │   ├── tailwind.config.ts
│   │   ├── tsconfig.json
│   │   └── package.json
│   └── terminal/                     # Specter Terminal (standalone)
│       └── ...                       # Existing Specter Terminal codebase
├── packages/
│   ├── shared-types/                 # Shared TypeScript types
│   │   ├── src/
│   │   │   ├── entities.ts
│   │   │   ├── portfolio.ts
│   │   │   ├── deals.ts
│   │   │   ├── real-estate.ts
│   │   │   ├── tax.ts
│   │   │   ├── family.ts
│   │   │   ├── integrations.ts
│   │   │   └── index.ts
│   │   └── package.json
│   ├── ui/                           # Shared design system
│   │   ├── src/
│   │   │   ├── primitives/           # Radix-based primitives
│   │   │   ├── charts/               # Chart components
│   │   │   ├── data-display/         # Tables, cards, stats
│   │   │   └── index.ts
│   │   └── package.json
│   └── encryption/                   # E2E encryption library
│       ├── src/
│       │   ├── sodium.ts
│       │   ├── key-exchange.ts
│       │   └── index.ts
│       └── package.json
├── supabase/
│   ├── migrations/                   # Database migrations (see schema below)
│   │   ├── 001_tenants.sql
│   │   ├── 002_auth_and_roles.sql
│   │   ├── 003_entities.sql
│   │   ├── 004_portfolio.sql
│   │   ├── 005_deals.sql
│   │   ├── 006_real_estate.sql
│   │   ├── 007_cash_flow.sql
│   │   ├── 008_tax.sql
│   │   ├── 009_documents.sql
│   │   ├── 010_messaging.sql
│   │   ├── 011_family.sql
│   │   ├── 012_insurance.sql
│   │   ├── 013_contacts.sql
│   │   ├── 014_integrations.sql
│   │   ├── 015_billing.sql
│   │   ├── 016_audit_log.sql
│   │   ├── 017_notifications.sql
│   │   ├── 018_ai.sql
│   │   ├── 019_branding.sql
│   │   └── 020_rls_policies.sql
│   ├── functions/                    # Edge functions
│   │   ├── sync-plaid/index.ts
│   │   ├── sync-ibkr/index.ts
│   │   ├── sync-alpaca/index.ts
│   │   ├── price-updater/index.ts
│   │   ├── alert-engine/index.ts
│   │   ├── report-generator/index.ts
│   │   └── ai-embeddings/index.ts
│   ├── seed.sql                      # Demo data for development
│   └── config.toml
├── docker/
│   ├── Dockerfile
│   ├── docker-compose.yml            # Self-hosted deployment
│   └── nginx.conf
├── docs/
│   ├── ARCHITECTURE.md
│   ├── DEPLOYMENT.md
│   ├── API.md
│   ├── SECURITY.md
│   └── ONBOARDING.md
├── .env.example
├── turbo.json                        # Turborepo config
├── package.json
├── pnpm-workspace.yaml
└── README.md
```

---

## Database Schema

### Core Multi-Tenancy

```sql
-- 001_tenants.sql
-- Multi-tenant with white-label support

CREATE TABLE tenants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  -- Deployment mode
  deployment_type TEXT NOT NULL DEFAULT 'multi' CHECK (deployment_type IN ('multi', 'single')),
  -- White-label branding
  logo_url TEXT,
  primary_color TEXT DEFAULT '#22d3ee',
  accent_color TEXT DEFAULT '#a78bfa',
  font_family TEXT DEFAULT 'JetBrains Mono',
  custom_domain TEXT UNIQUE,
  -- Subscription
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  plan TEXT NOT NULL DEFAULT 'starter' CHECK (plan IN ('starter', 'professional', 'enterprise')),
  plan_seats INTEGER NOT NULL DEFAULT 5,
  -- Settings
  default_currency TEXT NOT NULL DEFAULT 'USD',
  supported_currencies TEXT[] DEFAULT ARRAY['USD', 'EUR', 'GBP', 'SAR', 'AED', 'CHF', 'JPY', 'CNY'],
  timezone TEXT DEFAULT 'UTC',
  fiscal_year_start INTEGER DEFAULT 1, -- month 1-12
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 002_auth_and_roles.sql
-- Role-based access control

CREATE TYPE user_role AS ENUM (
  'principal',       -- Full access, owner
  'co_principal',    -- Full access, co-owner
  'cfo',             -- Financial operations, no governance
  'accountant',      -- Accounting, tax, bill pay only
  'advisor',         -- Read-only portfolio + documents shared with them
  'family_member',   -- Limited dashboard, governance, messaging
  'family_junior',   -- Minimal view, education content
  'auditor',         -- Read-only everything for compliance
  'property_manager' -- Real estate module only
);

CREATE TABLE tenant_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  role user_role NOT NULL DEFAULT 'family_member',
  -- Permissions override (JSON for granular module access)
  permissions_override JSONB DEFAULT '{}',
  -- Profile
  display_name TEXT NOT NULL,
  avatar_url TEXT,
  title TEXT, -- "Principal", "CFO", etc.
  -- E2E encryption
  public_key TEXT, -- X25519 public key for E2E encryption
  encrypted_private_key TEXT, -- Private key encrypted with user's password
  -- Status
  invited_at TIMESTAMPTZ,
  accepted_at TIMESTAMPTZ,
  last_active_at TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(tenant_id, user_id)
);

-- Module access matrix per role
CREATE TABLE role_permissions (
  role user_role PRIMARY KEY,
  permissions JSONB NOT NULL
  -- Example: {
  --   "dashboard": { "view": true, "edit": false },
  --   "portfolio": { "view": true, "edit": true, "trade": true },
  --   "deals": { "view": true, "edit": true, "approve": true },
  --   "real_estate": { "view": true, "edit": true },
  --   "entities": { "view": true, "edit": false },
  --   "documents": { "view": true, "upload": true, "delete": false },
  --   "cash_flow": { "view": true, "approve": true },
  --   "bill_pay": { "view": true, "approve": true, "create": true },
  --   "insurance": { "view": true, "edit": false },
  --   "contacts": { "view": true, "edit": true },
  --   "tax": { "view": true, "edit": false },
  --   "audit": { "view": true },
  --   "reports": { "view": true, "generate": true },
  --   "governance": { "view": true, "vote": true },
  --   "philanthropy": { "view": true, "edit": true },
  --   "messaging": { "view": true, "send": true },
  --   "settings": { "view": false, "edit": false },
  --   "billing": { "view": false, "edit": false },
  --   "integrations": { "view": false, "edit": false },
  --   "ai_copilot": { "view": true, "query": true }
  -- }
);
```

### Entities & Structure

```sql
-- 003_entities.sql

CREATE TYPE entity_type AS ENUM (
  'holding_company', 'trust', 'llc', 'lp', 'gp',
  'corporation', 'foundation', 'daf', 'ira',
  'joint_account', 'individual', 'foreign_entity'
);

CREATE TABLE entities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  parent_id UUID REFERENCES entities(id),
  name TEXT NOT NULL,
  entity_type entity_type NOT NULL,
  -- Legal details
  ein TEXT, -- encrypted
  state_of_formation TEXT,
  country_of_formation TEXT DEFAULT 'US',
  date_formed DATE,
  registered_agent TEXT,
  -- Financial
  total_value NUMERIC(18,2) DEFAULT 0,
  currency TEXT DEFAULT 'USD',
  -- Ownership
  ownership_percentage NUMERIC(5,2), -- of parent entity
  -- Filing
  annual_report_due DATE,
  tax_filing_due DATE,
  -- Status
  is_active BOOLEAN DEFAULT true,
  dissolved_date DATE,
  notes TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE entity_beneficiaries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_id UUID REFERENCES entities(id) ON DELETE CASCADE,
  member_id UUID REFERENCES tenant_members(id),
  beneficiary_name TEXT NOT NULL,
  beneficiary_type TEXT CHECK (beneficiary_type IN ('primary', 'contingent', 'remainder')),
  percentage NUMERIC(5,2),
  distribution_schedule TEXT, -- 'quarterly', 'annually', 'discretionary'
  notes TEXT
);

CREATE TABLE entity_signatories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_id UUID REFERENCES entities(id) ON DELETE CASCADE,
  member_id UUID REFERENCES tenant_members(id),
  authority_level TEXT CHECK (authority_level IN ('full', 'limited', 'co_sign')),
  max_amount NUMERIC(18,2), -- max transaction amount
  requires_co_signer BOOLEAN DEFAULT false,
  co_signer_id UUID REFERENCES tenant_members(id)
);

CREATE TABLE inter_entity_loans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  lender_entity_id UUID REFERENCES entities(id),
  borrower_entity_id UUID REFERENCES entities(id),
  principal_amount NUMERIC(18,2) NOT NULL,
  interest_rate NUMERIC(5,4),
  outstanding_balance NUMERIC(18,2),
  term_months INTEGER,
  start_date DATE,
  maturity_date DATE,
  payment_schedule TEXT, -- 'monthly', 'quarterly', 'bullet'
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'paid_off', 'defaulted'))
);
```

### Portfolio & Markets

```sql
-- 004_portfolio.sql

CREATE TABLE accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  entity_id UUID REFERENCES entities(id),
  -- Account details
  account_name TEXT NOT NULL,
  institution TEXT NOT NULL,
  account_type TEXT NOT NULL, -- 'brokerage', 'bank', 'crypto_exchange', 'retirement', 'custodial'
  account_number_encrypted TEXT, -- E2E encrypted
  -- Integration
  plaid_item_id TEXT,
  plaid_access_token_encrypted TEXT,
  ibkr_account_id TEXT,
  alpaca_account_id TEXT,
  -- Balance
  cash_balance NUMERIC(18,2) DEFAULT 0,
  total_value NUMERIC(18,2) DEFAULT 0,
  currency TEXT DEFAULT 'USD',
  -- Sync
  last_synced_at TIMESTAMPTZ,
  sync_status TEXT DEFAULT 'pending',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE holdings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  account_id UUID REFERENCES accounts(id) ON DELETE CASCADE,
  -- Security info
  symbol TEXT NOT NULL,
  security_name TEXT,
  asset_class TEXT NOT NULL, -- 'equity', 'fixed_income', 'crypto', 'etf', 'option', 'futures', 'commodity'
  -- Position
  quantity NUMERIC(18,8) NOT NULL,
  cost_basis NUMERIC(18,2),
  cost_basis_per_unit NUMERIC(18,8),
  current_price NUMERIC(18,8),
  market_value NUMERIC(18,2),
  unrealized_pnl NUMERIC(18,2),
  unrealized_pnl_pct NUMERIC(8,4),
  -- Tax lots
  acquisition_date DATE,
  holding_period TEXT, -- 'short_term', 'long_term'
  -- Metadata
  sector TEXT,
  industry TEXT,
  country TEXT,
  currency TEXT DEFAULT 'USD',
  last_price_update TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE tax_lots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  holding_id UUID REFERENCES holdings(id) ON DELETE CASCADE,
  quantity NUMERIC(18,8) NOT NULL,
  cost_basis_per_unit NUMERIC(18,8) NOT NULL,
  acquisition_date DATE NOT NULL,
  acquisition_method TEXT DEFAULT 'purchase', -- 'purchase', 'gift', 'inheritance', 'exercise'
  is_wash_sale BOOLEAN DEFAULT false,
  wash_sale_adjustment NUMERIC(18,2) DEFAULT 0
);

CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  account_id UUID REFERENCES accounts(id),
  -- Transaction details
  transaction_type TEXT NOT NULL, -- 'buy', 'sell', 'dividend', 'interest', 'fee', 'transfer', 'deposit', 'withdrawal'
  symbol TEXT,
  quantity NUMERIC(18,8),
  price NUMERIC(18,8),
  total_amount NUMERIC(18,2) NOT NULL,
  fees NUMERIC(18,2) DEFAULT 0,
  currency TEXT DEFAULT 'USD',
  -- Dates
  transaction_date TIMESTAMPTZ NOT NULL,
  settlement_date TIMESTAMPTZ,
  -- Source
  source TEXT DEFAULT 'manual', -- 'manual', 'plaid', 'ibkr', 'alpaca'
  external_id TEXT,
  -- Tax
  realized_pnl NUMERIC(18,2),
  -- Metadata
  description TEXT,
  category TEXT,
  tags TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE watchlist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  member_id UUID REFERENCES tenant_members(id),
  symbol TEXT NOT NULL,
  target_price NUMERIC(18,8),
  alert_above NUMERIC(18,8),
  alert_below NUMERIC(18,8),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE price_history (
  symbol TEXT NOT NULL,
  date DATE NOT NULL,
  open NUMERIC(18,8),
  high NUMERIC(18,8),
  low NUMERIC(18,8),
  close NUMERIC(18,8),
  volume BIGINT,
  PRIMARY KEY (symbol, date)
);

CREATE TABLE benchmarks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  name TEXT NOT NULL, -- 'S&P 500', '60/40', 'Custom Blend'
  components JSONB NOT NULL, -- [{"symbol": "SPY", "weight": 0.6}, {"symbol": "AGG", "weight": 0.4}]
  is_default BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE rebalance_rules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  target_allocation JSONB NOT NULL, -- {"equity": 60, "fixed_income": 25, "alternatives": 15}
  drift_threshold NUMERIC(5,2) DEFAULT 5.00, -- percentage
  rebalance_frequency TEXT DEFAULT 'quarterly',
  last_rebalanced_at TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT true
);
```

### Private Investments / Deals

```sql
-- 005_deals.sql

CREATE TYPE deal_stage AS ENUM (
  'sourcing', 'screening', 'due_diligence', 'term_sheet',
  'legal_review', 'closing', 'closed', 'passed', 'exited'
);

CREATE TABLE deals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  entity_id UUID REFERENCES entities(id), -- investing entity
  -- Deal info
  name TEXT NOT NULL,
  company_name TEXT,
  sector TEXT,
  sub_sector TEXT,
  geography TEXT,
  stage deal_stage NOT NULL DEFAULT 'sourcing',
  deal_type TEXT, -- 'direct', 'co_invest', 'fund_allocation', 'syndicate', 'secondary'
  -- Financials
  target_amount NUMERIC(18,2),
  committed_amount NUMERIC(18,2),
  invested_amount NUMERIC(18,2) DEFAULT 0,
  current_value NUMERIC(18,2),
  -- Metrics
  entry_valuation NUMERIC(18,2),
  current_valuation NUMERIC(18,2),
  moic NUMERIC(8,4),
  irr NUMERIC(8,4),
  dpi NUMERIC(8,4), -- distributions to paid-in
  tvpi NUMERIC(8,4), -- total value to paid-in
  -- Dates
  sourced_date DATE,
  closed_date DATE,
  expected_exit_date DATE,
  vintage_year INTEGER,
  -- Source
  source TEXT, -- who brought the deal
  lead_investor TEXT,
  -- Scoring
  opportunity_score INTEGER CHECK (opportunity_score BETWEEN 1 AND 10),
  risk_score INTEGER CHECK (risk_score BETWEEN 1 AND 10),
  -- Status
  assigned_to UUID REFERENCES tenant_members(id),
  notes TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE deal_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  deal_id UUID REFERENCES deals(id) ON DELETE CASCADE,
  document_type TEXT, -- 'pitch_deck', 'term_sheet', 'financials', 'dd_report', 'legal'
  file_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  encrypted BOOLEAN DEFAULT true,
  uploaded_by UUID REFERENCES tenant_members(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE deal_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  deal_id UUID REFERENCES deals(id) ON DELETE CASCADE,
  author_id UUID REFERENCES tenant_members(id),
  content TEXT NOT NULL, -- encrypted
  note_type TEXT DEFAULT 'general', -- 'general', 'dd_finding', 'risk', 'decision'
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE capital_calls (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  deal_id UUID REFERENCES deals(id),
  -- Fund info (for LP positions)
  fund_name TEXT,
  fund_manager TEXT,
  -- Call details
  call_amount NUMERIC(18,2) NOT NULL,
  total_commitment NUMERIC(18,2),
  cumulative_called NUMERIC(18,2),
  remaining_commitment NUMERIC(18,2),
  -- Dates
  call_date DATE NOT NULL,
  due_date DATE NOT NULL,
  paid_date DATE,
  -- Funding
  funding_account_id UUID REFERENCES accounts(id),
  funding_entity_id UUID REFERENCES entities(id),
  -- Status
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'overdue', 'disputed')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE distributions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  deal_id UUID REFERENCES deals(id),
  fund_name TEXT,
  distribution_type TEXT, -- 'return_of_capital', 'profit', 'dividend', 'interest'
  amount NUMERIC(18,2) NOT NULL,
  distribution_date DATE NOT NULL,
  receiving_account_id UUID REFERENCES accounts(id),
  receiving_entity_id UUID REFERENCES entities(id),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE dd_checklists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  deal_id UUID REFERENCES deals(id) ON DELETE CASCADE,
  category TEXT NOT NULL, -- 'financial', 'legal', 'operational', 'market', 'technical', 'management'
  item TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'flagged', 'na')),
  assigned_to UUID REFERENCES tenant_members(id),
  notes TEXT,
  completed_at TIMESTAMPTZ
);
```

### Real Estate

```sql
-- 006_real_estate.sql

CREATE TABLE properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  entity_id UUID REFERENCES entities(id),
  -- Property info
  name TEXT NOT NULL,
  property_type TEXT NOT NULL, -- 'residential', 'commercial', 'industrial', 'land', 'mixed_use'
  address TEXT,
  city TEXT,
  state TEXT,
  country TEXT DEFAULT 'US',
  zip TEXT,
  latitude NUMERIC(10,8),
  longitude NUMERIC(11,8),
  -- Financials
  purchase_price NUMERIC(18,2),
  purchase_date DATE,
  current_value NUMERIC(18,2),
  last_appraisal_date DATE,
  -- Mortgage
  has_mortgage BOOLEAN DEFAULT false,
  mortgage_balance NUMERIC(18,2),
  mortgage_rate NUMERIC(5,4),
  mortgage_monthly_payment NUMERIC(18,2),
  mortgage_maturity_date DATE,
  lender TEXT,
  -- Rental
  is_rental BOOLEAN DEFAULT false,
  monthly_rent NUMERIC(18,2),
  vacancy_rate NUMERIC(5,2),
  -- Expenses
  annual_taxes NUMERIC(18,2),
  annual_insurance NUMERIC(18,2),
  annual_maintenance NUMERIC(18,2),
  annual_hoa NUMERIC(18,2),
  -- Metrics
  cap_rate NUMERIC(5,4),
  cash_on_cash_return NUMERIC(5,4),
  noi NUMERIC(18,2), -- net operating income
  -- Depreciation
  depreciable_basis NUMERIC(18,2),
  depreciation_method TEXT DEFAULT 'straight_line',
  useful_life_years INTEGER DEFAULT 27, -- residential: 27.5, commercial: 39
  accumulated_depreciation NUMERIC(18,2) DEFAULT 0,
  -- 1031 Exchange
  is_1031_candidate BOOLEAN DEFAULT false,
  exchange_deadline DATE,
  -- Status
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'under_contract', 'sold', 'development')),
  notes TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE tenants_property ( -- property tenants (renters), not platform tenants
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  tenant_name TEXT NOT NULL,
  unit TEXT,
  lease_start DATE,
  lease_end DATE,
  monthly_rent NUMERIC(18,2),
  security_deposit NUMERIC(18,2),
  payment_status TEXT DEFAULT 'current', -- 'current', 'late', 'delinquent'
  contact_email TEXT,
  contact_phone TEXT,
  notes TEXT
);

CREATE TABLE maintenance_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  priority TEXT DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'emergency')),
  status TEXT DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'completed', 'cancelled')),
  estimated_cost NUMERIC(18,2),
  actual_cost NUMERIC(18,2),
  vendor TEXT,
  requested_by TEXT,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE renovation_budgets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  project_name TEXT NOT NULL,
  total_budget NUMERIC(18,2),
  spent NUMERIC(18,2) DEFAULT 0,
  start_date DATE,
  target_completion DATE,
  status TEXT DEFAULT 'planning',
  line_items JSONB DEFAULT '[]', -- [{category, description, budgeted, actual}]
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Cash Flow & Operations

```sql
-- 007_cash_flow.sql

CREATE TABLE cash_flow_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  entity_id UUID REFERENCES entities(id),
  account_id UUID REFERENCES accounts(id),
  -- Entry details
  entry_type TEXT NOT NULL CHECK (entry_type IN ('inflow', 'outflow')),
  category TEXT NOT NULL, -- 'salary', 'dividend', 'rental_income', 'capital_call', 'tax_payment', 'payroll', etc.
  sub_category TEXT,
  amount NUMERIC(18,2) NOT NULL,
  currency TEXT DEFAULT 'USD',
  -- Recurrence
  is_recurring BOOLEAN DEFAULT false,
  recurrence_pattern TEXT, -- 'weekly', 'monthly', 'quarterly', 'annually'
  next_occurrence DATE,
  -- Status
  status TEXT DEFAULT 'actual' CHECK (status IN ('actual', 'projected', 'pending_approval')),
  -- Metadata
  description TEXT,
  vendor_payee TEXT,
  tags TEXT[],
  date DATE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE bill_payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  entity_id UUID REFERENCES entities(id),
  -- Bill details
  payee TEXT NOT NULL,
  amount NUMERIC(18,2) NOT NULL,
  currency TEXT DEFAULT 'USD',
  category TEXT,
  -- Dates
  invoice_date DATE,
  due_date DATE NOT NULL,
  paid_date DATE,
  -- Approval workflow
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'paid', 'rejected', 'overdue')),
  submitted_by UUID REFERENCES tenant_members(id),
  approved_by UUID REFERENCES tenant_members(id),
  approved_at TIMESTAMPTZ,
  -- Payment
  payment_method TEXT, -- 'wire', 'ach', 'check', 'card'
  payment_account_id UUID REFERENCES accounts(id),
  reference_number TEXT,
  -- Attachments
  invoice_url TEXT,
  receipt_url TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE subscriptions_tracked (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  service_name TEXT NOT NULL,
  amount NUMERIC(18,2) NOT NULL,
  frequency TEXT NOT NULL, -- 'monthly', 'quarterly', 'annually'
  next_billing_date DATE,
  category TEXT,
  entity_id UUID REFERENCES entities(id),
  auto_renew BOOLEAN DEFAULT true,
  cancel_by_date DATE,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Tax & Compliance

```sql
-- 008_tax.sql

CREATE TABLE tax_estimates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  entity_id UUID REFERENCES entities(id),
  tax_year INTEGER NOT NULL,
  quarter INTEGER CHECK (quarter BETWEEN 1 AND 4),
  jurisdiction TEXT NOT NULL, -- 'federal', state code, country code
  -- Estimates
  estimated_income NUMERIC(18,2),
  estimated_deductions NUMERIC(18,2),
  estimated_tax NUMERIC(18,2),
  amount_paid NUMERIC(18,2) DEFAULT 0,
  due_date DATE,
  paid_date DATE,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'overdue')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE tax_loss_harvesting (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  -- Opportunity
  symbol TEXT NOT NULL,
  holding_id UUID REFERENCES holdings(id),
  unrealized_loss NUMERIC(18,2) NOT NULL,
  potential_tax_savings NUMERIC(18,2),
  -- Wash sale check
  has_wash_sale_risk BOOLEAN DEFAULT false,
  wash_sale_window_end DATE,
  replacement_symbol TEXT, -- suggested replacement to maintain exposure
  -- Status
  status TEXT DEFAULT 'identified' CHECK (status IN ('identified', 'approved', 'executed', 'dismissed')),
  executed_date DATE,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE charitable_donations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  entity_id UUID REFERENCES entities(id),
  -- Donation
  recipient TEXT NOT NULL,
  recipient_ein TEXT,
  donation_type TEXT, -- 'cash', 'stock', 'property', 'daf'
  amount NUMERIC(18,2) NOT NULL,
  fair_market_value NUMERIC(18,2),
  cost_basis NUMERIC(18,2), -- for donated stock/property
  tax_deduction_amount NUMERIC(18,2),
  -- Dates
  donation_date DATE NOT NULL,
  tax_year INTEGER,
  -- Documentation
  receipt_url TEXT,
  acknowledgment_received BOOLEAN DEFAULT false,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE gift_tracking (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  -- Gift details
  donor_member_id UUID REFERENCES tenant_members(id),
  recipient_name TEXT NOT NULL,
  recipient_relationship TEXT,
  amount NUMERIC(18,2) NOT NULL,
  gift_type TEXT, -- 'cash', 'stock', 'property', 'trust_distribution'
  gift_date DATE NOT NULL,
  tax_year INTEGER,
  -- Annual exclusion tracking
  annual_exclusion_used NUMERIC(18,2),
  lifetime_exemption_used NUMERIC(18,2),
  requires_form_709 BOOLEAN DEFAULT false,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE compliance_deadlines (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  entity_id UUID REFERENCES entities(id),
  -- Deadline
  deadline_type TEXT NOT NULL, -- 'tax_filing', 'annual_report', 'fbar', 'fatca', 'k1_distribution', 'audit', 'boi_report'
  description TEXT,
  due_date DATE NOT NULL,
  jurisdiction TEXT,
  -- Status
  status TEXT DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'in_progress', 'completed', 'overdue', 'extended')),
  extended_to DATE,
  completed_date DATE,
  assigned_to UUID REFERENCES tenant_members(id),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Documents & Messaging (E2E Encrypted)

```sql
-- 009_documents.sql

CREATE TABLE document_folders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  parent_id UUID REFERENCES document_folders(id),
  name TEXT NOT NULL,
  folder_type TEXT, -- 'entity', 'deal', 'property', 'personal', 'tax', 'insurance', 'governance'
  -- Access
  restricted_to_roles user_role[],
  restricted_to_members UUID[],
  created_by UUID REFERENCES tenant_members(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  folder_id UUID REFERENCES document_folders(id),
  -- Document info
  name TEXT NOT NULL,
  file_type TEXT, -- 'pdf', 'docx', 'xlsx', 'image', 'other'
  file_size BIGINT,
  storage_path TEXT NOT NULL, -- Supabase Storage path
  -- E2E Encryption
  is_encrypted BOOLEAN DEFAULT true,
  encryption_key_id TEXT, -- reference to encrypted symmetric key
  -- Versioning
  version INTEGER DEFAULT 1,
  previous_version_id UUID REFERENCES documents(id),
  -- Search
  content_text TEXT, -- extracted text for search (encrypted at rest)
  embedding VECTOR(1536), -- for AI semantic search
  -- Metadata
  document_category TEXT, -- 'will', 'trust_agreement', 'deed', 'insurance_policy', 'tax_return', 'k1', 'operating_agreement', 'passport', 'drivers_license'
  entity_id UUID REFERENCES entities(id),
  deal_id UUID REFERENCES deals(id),
  property_id UUID REFERENCES properties(id),
  tags TEXT[],
  expiry_date DATE, -- for licenses, insurance, etc.
  -- Audit
  uploaded_by UUID REFERENCES tenant_members(id),
  last_viewed_by UUID REFERENCES tenant_members(id),
  last_viewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 010_messaging.sql

CREATE TABLE message_channels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  name TEXT,
  channel_type TEXT DEFAULT 'direct' CHECK (channel_type IN ('direct', 'group', 'entity', 'deal')),
  -- E2E encryption
  is_encrypted BOOLEAN DEFAULT true,
  -- Linked context
  entity_id UUID REFERENCES entities(id),
  deal_id UUID REFERENCES deals(id),
  created_by UUID REFERENCES tenant_members(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE message_channel_members (
  channel_id UUID REFERENCES message_channels(id) ON DELETE CASCADE,
  member_id UUID REFERENCES tenant_members(id) ON DELETE CASCADE,
  -- E2E: member's copy of the channel key, encrypted with their public key
  encrypted_channel_key TEXT,
  last_read_at TIMESTAMPTZ,
  PRIMARY KEY (channel_id, member_id)
);

CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  channel_id UUID REFERENCES message_channels(id) ON DELETE CASCADE,
  sender_id UUID REFERENCES tenant_members(id),
  -- E2E encrypted content
  encrypted_content TEXT NOT NULL, -- encrypted with channel key
  content_nonce TEXT NOT NULL,
  -- Metadata (not encrypted)
  message_type TEXT DEFAULT 'text' CHECK (message_type IN ('text', 'file', 'system')),
  reply_to_id UUID REFERENCES messages(id),
  file_url TEXT,
  file_name TEXT,
  -- Status
  is_edited BOOLEAN DEFAULT false,
  edited_at TIMESTAMPTZ,
  is_deleted BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Family & Governance

```sql
-- 011_family.sql

CREATE TABLE family_meetings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  meeting_date TIMESTAMPTZ NOT NULL,
  location TEXT,
  meeting_type TEXT, -- 'quarterly_review', 'annual', 'special', 'education'
  -- Agenda
  agenda_items JSONB DEFAULT '[]', -- [{title, presenter, duration_minutes, notes}]
  -- Minutes
  minutes TEXT, -- encrypted
  minutes_approved BOOLEAN DEFAULT false,
  approved_by UUID REFERENCES tenant_members(id),
  -- Attendees
  attendees UUID[],
  status TEXT DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'in_progress', 'completed', 'cancelled')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE family_votes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  meeting_id UUID REFERENCES family_meetings(id),
  title TEXT NOT NULL,
  description TEXT,
  vote_type TEXT DEFAULT 'majority' CHECK (vote_type IN ('majority', 'supermajority', 'unanimous')),
  -- Options
  options JSONB NOT NULL DEFAULT '["Approve", "Reject", "Abstain"]',
  -- Status
  voting_opens_at TIMESTAMPTZ,
  voting_closes_at TIMESTAMPTZ,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'open', 'closed')),
  result TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE family_vote_ballots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vote_id UUID REFERENCES family_votes(id) ON DELETE CASCADE,
  member_id UUID REFERENCES tenant_members(id),
  choice TEXT NOT NULL,
  voted_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(vote_id, member_id)
);

CREATE TABLE philanthropy_grants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  entity_id UUID REFERENCES entities(id), -- foundation or DAF
  -- Grant details
  recipient_name TEXT NOT NULL,
  recipient_ein TEXT,
  amount NUMERIC(18,2) NOT NULL,
  currency TEXT DEFAULT 'USD',
  purpose TEXT,
  grant_type TEXT, -- 'general_operating', 'project', 'scholarship', 'endowment'
  -- Dates
  grant_date DATE,
  reporting_due_date DATE,
  -- Status
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'disbursed', 'completed', 'rejected')),
  approved_by UUID REFERENCES tenant_members(id),
  -- Compliance
  expenditure_responsibility BOOLEAN DEFAULT false,
  report_received BOOLEAN DEFAULT false,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE succession_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  -- Plan
  title TEXT NOT NULL,
  description TEXT,
  effective_trigger TEXT, -- 'incapacity', 'death', 'retirement', 'age_milestone'
  -- Assignments
  assignments JSONB NOT NULL DEFAULT '[]',
  -- [{role: "Investment Committee Chair", current: member_id, successor: member_id, ready: bool}]
  -- Status
  last_reviewed_date DATE,
  next_review_date DATE,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE education_programs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  member_id UUID REFERENCES tenant_members(id),
  -- Program
  title TEXT NOT NULL,
  category TEXT, -- 'financial_literacy', 'investment', 'governance', 'philanthropy', 'leadership'
  description TEXT,
  -- Progress
  modules JSONB DEFAULT '[]', -- [{title, completed, completed_date, notes}]
  progress_pct INTEGER DEFAULT 0,
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Insurance, Contacts, Integrations, Audit

```sql
-- 012_insurance.sql

CREATE TABLE insurance_policies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  entity_id UUID REFERENCES entities(id),
  -- Policy
  policy_type TEXT NOT NULL, -- 'property', 'liability', 'umbrella', 'auto', 'life', 'health', 'do', 'knr', 'cyber', 'art', 'jewelry'
  carrier TEXT NOT NULL,
  policy_number TEXT,
  -- Coverage
  coverage_amount NUMERIC(18,2),
  deductible NUMERIC(18,2),
  annual_premium NUMERIC(18,2),
  -- Dates
  effective_date DATE,
  expiration_date DATE,
  renewal_date DATE,
  -- Status
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'expired', 'cancelled', 'pending_renewal')),
  auto_renew BOOLEAN DEFAULT true,
  -- Linked assets
  property_id UUID REFERENCES properties(id),
  -- Agent
  agent_name TEXT,
  agent_contact TEXT,
  -- Documents
  policy_document_id UUID REFERENCES documents(id),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 013_contacts.sql

CREATE TABLE advisor_contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  -- Contact
  name TEXT NOT NULL,
  company TEXT,
  role TEXT, -- 'attorney', 'cpa', 'financial_advisor', 'insurance_agent', 'banker', 'property_manager', 'trustee', 'appraiser'
  email TEXT,
  phone TEXT,
  address TEXT,
  -- Engagement
  retainer_amount NUMERIC(18,2),
  retainer_frequency TEXT,
  last_engagement_date DATE,
  specialty TEXT[],
  -- Rating
  rating INTEGER CHECK (rating BETWEEN 1 AND 5),
  notes TEXT,
  tags TEXT[],
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE advisor_engagements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contact_id UUID REFERENCES advisor_contacts(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  description TEXT,
  amount NUMERIC(18,2),
  entity_id UUID REFERENCES entities(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 014_integrations.sql

CREATE TABLE integration_connections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  -- Integration
  provider TEXT NOT NULL, -- 'plaid', 'ibkr', 'alpaca', 'specter_terminal', 'stripe', 'quickbooks', 'xero'
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'error', 'disconnected', 'pending')),
  -- Credentials (encrypted)
  credentials_encrypted JSONB,
  -- Sync
  last_sync_at TIMESTAMPTZ,
  next_sync_at TIMESTAMPTZ,
  sync_frequency TEXT DEFAULT 'daily',
  sync_error TEXT,
  -- Config
  config JSONB DEFAULT '{}',
  created_by UUID REFERENCES tenant_members(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 015_billing.sql

CREATE TABLE subscription_plans (
  id TEXT PRIMARY KEY, -- 'starter', 'professional', 'enterprise'
  name TEXT NOT NULL,
  monthly_price NUMERIC(10,2),
  annual_price NUMERIC(10,2),
  max_seats INTEGER,
  max_entities INTEGER,
  max_accounts INTEGER,
  features JSONB NOT NULL, -- list of enabled feature flags
  stripe_monthly_price_id TEXT,
  stripe_annual_price_id TEXT
);

-- 016_audit_log.sql

CREATE TABLE audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  member_id UUID REFERENCES tenant_members(id),
  -- Action
  action TEXT NOT NULL, -- 'view', 'create', 'update', 'delete', 'approve', 'login', 'export', 'download'
  resource_type TEXT NOT NULL, -- 'document', 'transaction', 'deal', 'entity', 'settings', etc.
  resource_id UUID,
  -- Details
  details JSONB, -- what changed
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_audit_log_tenant ON audit_log(tenant_id, created_at DESC);
CREATE INDEX idx_audit_log_member ON audit_log(member_id, created_at DESC);

-- 017_notifications.sql

CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  member_id UUID REFERENCES tenant_members(id),
  -- Notification
  title TEXT NOT NULL,
  body TEXT,
  notification_type TEXT, -- 'alert', 'approval', 'deadline', 'sync', 'system'
  priority TEXT DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
  -- Link
  action_url TEXT,
  resource_type TEXT,
  resource_id UUID,
  -- Status
  is_read BOOLEAN DEFAULT false,
  read_at TIMESTAMPTZ,
  is_dismissed BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 018_ai.sql

CREATE TABLE ai_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  member_id UUID REFERENCES tenant_members(id),
  title TEXT,
  messages JSONB DEFAULT '[]', -- [{role, content, timestamp}]
  context JSONB DEFAULT '{}', -- what data the AI can access
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 019_branding.sql

CREATE TABLE tenant_branding (
  tenant_id UUID PRIMARY KEY REFERENCES tenants(id) ON DELETE CASCADE,
  logo_light_url TEXT,
  logo_dark_url TEXT,
  favicon_url TEXT,
  primary_color TEXT DEFAULT '#22d3ee',
  secondary_color TEXT DEFAULT '#a78bfa',
  accent_color TEXT DEFAULT '#34d399',
  danger_color TEXT DEFAULT '#f87171',
  background_color TEXT DEFAULT '#0a0e17',
  surface_color TEXT DEFAULT '#0f1423',
  font_heading TEXT DEFAULT 'Inter',
  font_body TEXT DEFAULT 'Inter',
  font_mono TEXT DEFAULT 'JetBrains Mono',
  custom_css TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Row-Level Security

```sql
-- 020_rls_policies.sql
-- Every table gets tenant isolation

ALTER TABLE entities ENABLE ROW LEVEL SECURITY;
ALTER TABLE accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE holdings ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE deals ENABLE ROW LEVEL SECURITY;
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_log ENABLE ROW LEVEL SECURITY;
-- ... (all tables)

-- Example policy pattern (repeated for each table):
CREATE POLICY "tenant_isolation" ON entities
  FOR ALL
  USING (
    tenant_id IN (
      SELECT tenant_id FROM tenant_members
      WHERE user_id = auth.uid() AND is_active = true
    )
  );

-- Role-based policies layered on top:
CREATE POLICY "accountant_readonly_entities" ON entities
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM tenant_members
      WHERE user_id = auth.uid()
      AND tenant_id = entities.tenant_id
      AND role IN ('accountant', 'auditor')
      AND is_active = true
    )
  );
```

---

## Complete Feature List (120+ Features)

### 1. DASHBOARD & OVERVIEW
| # | Feature | Components |
|---|---------|-----------|
| 1 | Real-time net worth ticker with live price feeds | `net-worth-chart.tsx` |
| 2 | Customizable drag-and-drop widget grid | `dashboard/page.tsx` |
| 3 | Multi-currency net worth toggle (USD/SAR/EUR/GBP/AED/CHF/JPY/CNY) | `currency-display.tsx` |
| 4 | Family member net worth breakdown view | `net-worth/page.tsx` |
| 5 | Auto-generated daily briefing summary | `daily-briefing.tsx` |
| 6 | Goal tracking widgets (retirement, liquidity, education) | `goal-tracker.tsx` |
| 7 | Watchlist panel with price alerts | `watchlist-panel.tsx` |
| 8 | Market hours indicator (global exchanges) | `market-hours-indicator.tsx` |
| 9 | Calendar + weather integration | `daily-briefing.tsx` |
| 10 | Quick action buttons (wire, approve, log deal) | `quick-actions.tsx` |

### 2. PORTFOLIO & MARKETS
| # | Feature | Components |
|---|---------|-----------|
| 11 | Interactive candlestick charts with technical indicators | `candlestick-chart.tsx` |
| 12 | Sector heatmap visualization | `sector-heatmap.tsx` |
| 13 | Correlation matrix across holdings | `correlation-matrix.tsx` |
| 14 | Dividend calendar with projected income | `dividend-calendar.tsx` |
| 15 | Options chain viewer and P&L calculator | `options-chain.tsx` |
| 16 | Crypto portfolio with DeFi position tracking | `crypto-tracker.tsx` |
| 17 | ETF holdings look-through | `etf-look-through.tsx` |
| 18 | Benchmark overlay (S&P 500, 60/40, custom) | `benchmark-overlay.tsx` |
| 19 | Tax lot selector for optimal sell decisions | `tax-lot-selector.tsx` |
| 20 | Automated rebalancing alerts | `rebalance-alert.tsx` |
| 21 | Earnings calendar for held stocks | `earnings-calendar.tsx` |
| 22 | Analyst ratings aggregator | `analyst-ratings.tsx` |
| 23 | Short interest and institutional ownership | `short-interest.tsx` |
| 24 | After-hours / pre-market tracking | `pre-market-tracker.tsx` |
| 25 | Multi-broker account aggregation | `multi-broker-view.tsx` |
| 26 | Specter Terminal embedded view | `specter-embed.tsx` |

### 3. PRIVATE INVESTMENTS
| # | Feature | Components |
|---|---------|-----------|
| 27 | Deal pipeline Kanban board | `pipeline-kanban.tsx` |
| 28 | Fund commitment & unfunded obligation tracker | `commitment-tracker.tsx` |
| 29 | J-curve visualization per fund vintage | `j-curve-chart.tsx` |
| 30 | Co-investment opportunity scoring | `scoring-engine.tsx` |
| 31 | LP quarterly report PDF parser + summarizer | `lp-report-parser.tsx` |
| 32 | MOIC & DPI calculations per investment | `moic-calculator.tsx` |
| 33 | Comparable deal analysis tool | `comparable-analysis.tsx` |
| 34 | Investment memo template generator | `memo-generator.tsx` |
| 35 | Portfolio company KPI dashboard | `portfolio-company-kpi.tsx` |
| 36 | Follow-on investment decision tracker | `follow-on-tracker.tsx` |
| 37 | Secondary market valuation estimator | `secondary-valuation.tsx` |
| 38 | Fund manager scorecard and ranking | `fund-scorecard.tsx` |
| 39 | Vintage year performance comparison | `vintage-comparison.tsx` |
| 40 | Deal term sheet comparison tool | `term-sheet-comparison.tsx` |
| 41 | Due diligence checklist with progress | `dd-checklist.tsx` |
| 42 | Exit scenario modeler (IPO, M&A, secondary) | `exit-modeler.tsx` |
| 43 | Capital call tracker with funding waterfall | `capital-calls/page.tsx` |
| 44 | Distribution tracker with IRR impact | `distributions` |

### 4. REAL ESTATE
| # | Feature | Components |
|---|---------|-----------|
| 45 | Interactive property map with pins | `property-map.tsx` |
| 46 | Rental income vs expense waterfall per property | `rental-waterfall.tsx` |
| 47 | Cap rate calculator with comparables | `cap-rate-calc.tsx` |
| 48 | Mortgage amortization with payoff scenarios | `mortgage-amortization.tsx` |
| 49 | Tenant management portal | `tenant-portal.tsx` |
| 50 | Maintenance request tracker | `maintenance-tracker.tsx` |
| 51 | 1031 exchange timeline and eligibility | `exchange-1031.tsx` |
| 52 | Construction / renovation budget tracker | `renovation-budget.tsx` |
| 53 | Vacancy rate monitoring with alerts | `vacancy-monitor.tsx` |
| 54 | Property tax assessment tracker | `tax-assessment.tsx` |
| 55 | Market value estimates via API (Zillow/Redfin) | `market-value-api.tsx` |
| 56 | Depreciation schedule per property | `depreciation-schedule.tsx` |

### 5. ENTITY & LEGAL
| # | Feature | Components |
|---|---------|-----------|
| 57 | Visual entity org chart with ownership % | `org-chart.tsx` |
| 58 | K-1 distribution tracker per entity | `k1-tracker.tsx` |
| 59 | Operating agreement clause search | `clause-search.tsx` |
| 60 | Registered agent and filing deadline calendar | `filing-calendar.tsx` |
| 61 | Inter-entity loan tracker with interest | `inter-entity-loans.tsx` |
| 62 | Board meeting scheduler with minute templates | `board-scheduler.tsx` |
| 63 | Signatory authority matrix | `signatory-matrix.tsx` |
| 64 | Entity formation wizard for new LLCs/trusts | `formation-wizard.tsx` |
| 65 | Beneficial ownership registry (BOI compliance) | `boi-registry.tsx` |
| 66 | Power of attorney tracker | `poa-tracker.tsx` |

### 6. CASH FLOW & OPERATIONS
| # | Feature | Components |
|---|---------|-----------|
| 67 | Predictive cash flow forecasting (ML) | `forecast-engine.tsx` |
| 68 | Capital call funding waterfall | `funding-waterfall.tsx` |
| 69 | Multi-account sweep optimization | `sweep-optimizer.tsx` |
| 70 | Recurring expense pattern detection | `pattern-detector.tsx` |
| 71 | Vendor payment approval chain | `vendor-approvals.tsx` |
| 72 | Expense auto-categorization with tagging | `expense-tagger.tsx` |
| 73 | Credit card statement reconciliation | `cc-reconciliation.tsx` |
| 74 | Wire transfer request and approval workflow | `wire-workflow.tsx` |
| 75 | Staff payroll management across entities | `payroll-manager.tsx` |
| 76 | Travel and expense reimbursement | `travel-expenses.tsx` |
| 77 | Subscription tracker (all recurring charges) | `subscription-tracker.tsx` |
| 78 | Budget vs actual variance reporting | `budget-variance.tsx` |
| 79 | Cash reserve stress testing | `stress-test.tsx` |
| 80 | Bill pay with approval workflows | `bill-pay/page.tsx` |

### 7. TAX & COMPLIANCE
| # | Feature | Components |
|---|---------|-----------|
| 81 | Tax loss harvesting scanner with wash sale detection | `tlh-scanner.tsx` |
| 82 | Estimated quarterly tax calculator | `quarterly-calc.tsx` |
| 83 | Multi-state / multi-jurisdiction tax tracker | `multi-state.tsx` |
| 84 | Charitable contribution optimizer (cash vs stock vs DAF) | `charitable-optimizer.tsx` |
| 85 | QSBS eligibility tracker | `qsbs-tracker.tsx` |
| 86 | FBAR / FATCA deadline alerts | `fbar-alerts.tsx` |
| 87 | Cost basis reconciliation tool | `cost-basis.tsx` |
| 88 | Opportunity Zone investment tracker | `oz-tracker.tsx` |
| 89 | Gift tax annual exclusion tracker | `gift-tax.tsx` |
| 90 | Generation-skipping transfer tax calculator | `gst-calculator.tsx` |
| 91 | Compliance deadline calendar | `compliance_deadlines` table |
| 92 | Full audit trail with IP logging | `audit/page.tsx` |

### 8. FAMILY & GOVERNANCE
| # | Feature | Components |
|---|---------|-----------|
| 93 | Family constitution and values editor | `constitution-editor.tsx` |
| 94 | Next-gen education curriculum tracker | `education-tracker.tsx` |
| 95 | Family meeting agenda builder with voting | `meeting-builder.tsx` |
| 96 | Shared family calendar | `shared-calendar.tsx` |
| 97 | Inheritance simulation tool | `inheritance-sim.tsx` |
| 98 | Family member permission manager | `permission-manager.tsx` |
| 99 | Mentorship pairing system | `mentorship-pairing.tsx` |
| 100 | Family photo and memory archive | `memory-archive.tsx` |
| 101 | Prenuptial / postnuptial tracker | `prenup-tracker.tsx` |
| 102 | Succession planning timeline | `succession-planner.tsx` |
| 103 | Family governance voting system | `family_votes` table |
| 104 | Grant tracking and foundation compliance | `philanthropy/page.tsx` |

### 9. DOCUMENTS & SECURITY
| # | Feature | Components |
|---|---------|-----------|
| 105 | E2E encrypted document vault | `vault-browser.tsx` |
| 106 | Document version history | `version-history.tsx` |
| 107 | Full-text search across all documents | `search-index.tsx` |
| 108 | Encrypted document viewer (in-browser) | `encrypted-viewer.tsx` |
| 109 | Expiry alerts for licenses, insurance, passports | `documents` table |
| 110 | E2E encrypted messaging | `encrypted-chat.tsx` |
| 111 | Threaded conversations with file sharing | `thread-view.tsx` |
| 112 | Channel-based messaging (per deal, entity) | `message_channels` table |

### 10. REPORTING & AI
| # | Feature | Components |
|---|---------|-----------|
| 113 | Automated monthly/quarterly report generation | `report-builder.tsx` |
| 114 | PDF report export with branding | `pdf-generator.tsx` |
| 115 | Scheduled report delivery | `schedule-manager.tsx` |
| 116 | AI copilot — natural language queries about your finances | `copilot-panel.tsx` |
| 117 | AI-powered document summarization | `ai/summarize/route.ts` |
| 118 | AI insight cards (anomaly detection, suggestions) | `insight-cards.tsx` |

### 11. INTEGRATIONS
| # | Feature | Components |
|---|---------|-----------|
| 119 | Plaid — connect 12,000+ banks | `plaid-link.tsx` |
| 120 | Interactive Brokers — positions, orders, execution | `ibkr-connect.tsx` |
| 121 | Alpaca — trading API | `alpaca-connect.tsx` |
| 122 | Specter Terminal — embedded + standalone via API | `specter-embed.tsx` |
| 123 | Stripe Billing — subscriptions, invoicing, metering | `billing/` |

### 12. PLATFORM / SaaS
| # | Feature | Components |
|---|---------|-----------|
| 124 | Multi-tenant with data isolation (RLS) | `020_rls_policies.sql` |
| 125 | Single-tenant deployment option (Docker) | `docker/` |
| 126 | White-label branding (logo, colors, fonts, domain) | `branding/` |
| 127 | Full RBAC (9 roles with granular permissions) | `role_permissions` |
| 128 | Subscription management (Starter/Pro/Enterprise) | `subscription_plans` |
| 129 | Two-factor authentication | Supabase Auth MFA |
| 130 | Global currency support (8+ currencies) | `currencies.ts` |
| 131 | ⌘K command palette for global search | `command-palette.tsx` |
| 132 | Keyboard shortcuts throughout | `keyboard-shortcuts.tsx` |
| 133 | Real-time updates via Supabase Realtime | `use-realtime.ts` |
| 134 | Notification center with priority levels | `notification-center.tsx` |

---

## Specter Terminal Integration

### Embedded Mode
```tsx
// components/integrations/specter-embed.tsx
// Loads Specter Terminal inside an iframe with shared auth
<iframe
  src={`${SPECTER_TERMINAL_URL}?token=${sessionToken}&tenant=${tenantId}&theme=embedded`}
  className="w-full h-full border-0 rounded-lg"
/>
```

### Standalone Mode
Specter Terminal runs at its own URL (specter-terminal.app or custom domain) and communicates with the Family Office backend via:
- Shared Supabase auth (same project, SSO between apps)
- REST API for portfolio sync (`/api/integrations/specter-terminal/sync`)
- WebSocket for real-time price updates
- Shared types package (`packages/shared-types`)

### Data Flow
```
Specter Terminal ←→ Shared Supabase DB ←→ Family Office Portal
       ↓                                          ↓
  Market Data APIs                    Plaid / IBKR / Alpaca
  (stocks, crypto,                    (bank feeds, positions,
   ETFs, IPOs)                         transactions)
```

---

## Subscription Tiers

| Feature | Starter ($499/mo) | Professional ($1,499/mo) | Enterprise (Custom) |
|---------|-------------------|------------------------|---------------------|
| Seats | 5 | 15 | Unlimited |
| Entities | 10 | 50 | Unlimited |
| Accounts | 5 | 25 | Unlimited |
| Document storage | 10 GB | 100 GB | Unlimited |
| Specter Terminal | Embedded only | Embedded + standalone | Dedicated instance |
| AI copilot queries | 100/mo | 1,000/mo | Unlimited |
| Integrations | Plaid only | All (Plaid, IBKR, Alpaca) | Custom + API access |
| White-label | — | — | Full branding |
| Single-tenant deploy | — | — | Available |
| Priority support | — | Email | Dedicated CSM |
| Report generation | Monthly | Weekly | Real-time |
| E2E encryption | Messaging only | All docs + messaging | All + custom keys |

---

## Getting Started with Claude Code

### 1. Create the Repository
```bash
# Create new GitHub repo
gh repo create specter-family-office --private --clone
cd specter-family-office
```

### 2. Initialize the Monorepo
```bash
# Initialize with pnpm
pnpm init
# Install Turborepo
pnpm add -D turbo
# Create workspace config
```

### 3. Use Claude Code to Build
Open Claude Code in the repository and give it this spec:

```
Read the SPEC.md file and begin implementing the project.
Start with:
1. Monorepo setup (Turborepo + pnpm workspaces)
2. Next.js app with App Router
3. Supabase project setup + migrations
4. Auth flow + RBAC middleware
5. Shell layout (sidebar + topbar + command palette)
6. Dashboard module with real data hooks
7. Portfolio module with Specter Terminal embed

Build each module incrementally. Prioritize:
- Core shell and auth first
- Dashboard and portfolio (port from existing Specter work)
- Entity management
- Deal pipeline
- Everything else follows
```

### 4. Environment Variables
```env
# .env.local
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_SPECTER_TERMINAL_URL=
PLAID_CLIENT_ID=
PLAID_SECRET=
PLAID_ENV=sandbox
IBKR_CLIENT_ID=
IBKR_CLIENT_SECRET=
ALPACA_API_KEY=
ALPACA_SECRET_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
ANTHROPIC_API_KEY=
ENCRYPTION_MASTER_KEY=
```

---

## Build Priority Roadmap

### Phase 1 — Foundation (Weeks 1–3)
- Monorepo setup, CI/CD
- Supabase project + core migrations (tenants, auth, entities)
- Auth flow (login, register, invite, MFA)
- RBAC middleware + permission hooks
- Shell layout with full navigation
- Design system (shared UI package)

### Phase 2 — Core Modules (Weeks 4–8)
- Dashboard with live net worth
- Portfolio tracker (port Specter modules)
- Specter Terminal embed
- Entity management + org chart
- Document vault (E2E encrypted)
- Cash flow tracker

### Phase 3 — Investment Modules (Weeks 9–12)
- Deal pipeline Kanban
- Capital call / distribution tracker
- Real estate module
- Private investment metrics (IRR, MOIC, J-curve)

### Phase 4 — Operations (Weeks 13–16)
- Bill pay with approvals
- Insurance tracker
- Advisor directory
- Subscription tracker
- Budget management

### Phase 5 — Tax & Compliance (Weeks 17–19)
- Tax optimization dashboard
- TLH scanner
- Compliance calendar
- Audit trail
- Reporting engine

### Phase 6 — Family & Governance (Weeks 20–22)
- Governance portal with voting
- Philanthropy management
- E2E encrypted messaging
- Succession planning
- Education programs

### Phase 7 — AI & Polish (Weeks 23–25)
- AI copilot integration
- Command palette search
- Notification system
- White-label branding
- Mobile responsiveness

### Phase 8 — Integrations & Launch (Weeks 26–28)
- Plaid integration
- Interactive Brokers integration
- Alpaca integration
- Stripe billing
- Docker self-hosted option
- Documentation + onboarding flow

---

*This specification is the single source of truth for the Specter Family Office project. Every feature, table, component, and API route is documented here. Use it as the reference when building with Claude Code.*
