# Phantom Treasury — Frontend Implementation Plan

> Hand this document to Claude Code. It contains everything needed to convert the marketing website mockup into a full multi-page Next.js app connected to Supabase.

---

## Existing Infrastructure

| Resource | Details |
|----------|---------|
| **Supabase Project** | `litmwqlvtzuhdqxqgnjx.supabase.co` |
| **Database** | 46 tables, 21 migrations, RLS enabled, multi-tenant |
| **GitHub Repo** | `github.com/nfalemadi8/specter_capital` |
| **Vercel Deployment** | `specter-capital.vercel.app` |
| **Domain** | `phantomtreasury.com` (purchased via GoDaddy) |
| **Design Reference** | `phantom-treasury-website.html` (attached in project files) |
| **Brand Kit** | `phantom-treasury-brand-kit.html` (attached in project files) |

---

## Design Tokens (from Brand Kit)

Paste these into `tailwind.config.ts` or a global CSS file. **Never hardcode hex values.**

```css
:root {
  --phantom-black: #0a0a0a;
  --phantom-white: #fafaf8;
  --phantom-cream: #f0ece4;
  --phantom-navy: #0a1628;
  --phantom-charcoal: #1a1a1a;
  --phantom-graphite: #2a2a2a;
  --phantom-ash: #8a8a8a;
  --phantom-silver: #c0c0c0;
  --phantom-bone: #e8e4dc;
  --phantom-gold: #c8b88a;
  --phantom-gold-muted: rgba(200,184,138,0.15);
  --phantom-success: #4a9e6e;
  --phantom-warning: #c89b4a;
  --phantom-danger: #c45a5a;
  --phantom-info: #5a8ec4;
}
```

**Fonts:** EB Garamond (display/headings, weight 400 only) + DM Sans (body/UI/data)
**Motion:** `cubic-bezier(0.16, 1, 0.3, 1)` — 150ms micro, 300ms standard, 600ms dramatic

---

## Pages to Build (11 total)

### 1. `/` — Marketing Homepage
- Convert `phantom-treasury-website.html` into Next.js components
- Sections: Hero, Trust Marquee, Stats, Features (horizontal scroll), Dashboard Showcase, Value Props, CTA, Footer
- **Remove the inline pricing section** — pricing now has its own page. Replace with a short "View Pricing" CTA linking to `/pricing`
- All animations via Intersection Observer (already implemented in the HTML)
- Navbar links: Platform, Pricing, Security, About, Sign In, "Request Access" (gold CTA → `/signup`)
- The HTML file is the single source of truth for all styles and layout

### 2. `/pricing` — Pricing Page (standalone)
- Full standalone page with Navbar + Footer (shared marketing layout)
- Hero section: "Aligned to Scale, Not Complexity" headline
- 3-tier pricing grid (ported from homepage HTML): Foundation ($2,500/mo), Enterprise ($5,000/mo, featured), Sovereign (Custom)
- Below the grid: FAQ accordion section with common questions
  - "What counts as AUM?" / "Can I switch plans?" / "Is there a free trial?" / "How does onboarding work?" / "What integrations do you support?"
- Each tier's CTA links to `/signup` (Foundation & Enterprise) or `/contact` anchor (Sovereign)
- Labeled "Planned Pricing" since the product is in beta

### 3. `/security` — Security & Privacy Page
- Full standalone page with Navbar + Footer
- Hero: "Your Data. Your Control. No Exceptions." headline
- Section: **Architecture** — Supabase + PostgreSQL, row-level security, multi-tenant isolation, every query scoped to the authenticated user's organization
- Section: **Encryption** — Data encrypted at rest (AES-256) and in transit (TLS 1.3), database-level encryption via Supabase
- Section: **Access Control** — Role-based permissions (Owner, Admin, Analyst, Viewer), invite-only team management, session management
- Section: **Privacy** — Zero third-party analytics, no data reselling, no ad trackers, audit logs on every action
- Section: **Compliance Roadmap** — SOC 2 Type II (planned), GDPR-ready architecture, data residency options on Enterprise/Sovereign plans
- Design: alternating content sections with subtle gold accent lines, icon+text pairs, dark background throughout

### 4. `/about` — About Page
- Full standalone page with Navbar + Footer
- Hero: "Built by Operators, for Operators" headline
- Section: **The Problem** — Family offices rely on fragmented tools: Excel spreadsheets, multiple custodian portals, manual reporting, siloed data across entities. No single system speaks the language of multi-generational wealth
- Section: **The Vision** — Phantom Treasury is a private operating system for family offices — consolidating every asset class, entity, and reporting need into one secure platform built from the ground up
- Section: **The Approach** — Modern stack (React, Next.js, Supabase, PostgreSQL), institutional-grade security (RLS, multi-tenant), designed for discretion and precision
- Section: **Open for Early Access** — CTA block linking to `/signup`
- Design: editorial long-form layout, generous whitespace, EB Garamond headlines, DM Sans body

### 5. `/platform` — Platform Deep-Dive
- Full standalone page with Navbar + Footer
- Hero: "Six Modules. One Operating System." headline with brief intro paragraph
- Each of the 6 core modules gets its own full-width section with:
  - Module number (01–06) + name as section header
  - 3–4 bullet capabilities per module
  - A visual element on the right (icon, illustration placeholder, or stylized UI mockup)
- **Module 1: Consolidated View** — Unified dashboard across all entities, accounts, and custodians. Real-time portfolio aggregation. Multi-currency normalization with 40+ currencies. Custom grouping by entity, asset class, or strategy
- **Module 2: Real-Time Valuation** — Live market data feeds for listed equities, bonds, and crypto. NAV-based tracking for private equity and hedge funds. Appraised value support for real estate and collectibles. Mark-to-market and cost-basis views
- **Module 3: Investor Reporting** — Board-ready quarterly reports generated in minutes. Capital call and distribution summaries. Performance attribution against custom benchmarks. PDF and Excel export with branded templates
- **Module 4: Entity Governance** — Multi-entity management (trusts, LLCs, foundations, holding companies). Organizational hierarchy visualization. Per-entity permissions and audit trails. Compliance document storage per entity
- **Module 5: Zero-Trust Security** — Row-level security on every database query. Role-based access control (Owner, Admin, Analyst, Viewer). Session management and invite-only onboarding. Full audit logs on every action
- **Module 6: Performance Analytics** — Time-weighted and money-weighted returns. Benchmark comparison (S&P 500, MSCI, custom). Asset allocation drift analysis. Exposure breakdowns by geography, sector, and currency
- Bottom CTA: "Start Building Your View" → `/signup`
- Design: alternating left/right layout, numbered sections with gold accent, generous spacing between modules

### 6. `/integrations` — Partners & Integrations
- Full standalone page with Navbar + Footer
- Hero: "Connects to the Infrastructure You Already Trust" headline
- Section: **Custodians & Banks** — Grid of integration cards showing supported custodian connections (Schwab, Fidelity, Pershing, BNY Mellon, Northern Trust, etc.). Each card: logo placeholder + name + connection type (API, SFTP, Manual). Note: label planned integrations as "Coming Soon" vs live ones
- Section: **Market Data** — Real-time feeds for equities, fixed income, crypto, FX. Sources: Bloomberg (planned), Refinitiv (planned), CoinGecko, Open Exchange Rates
- Section: **Document & Reporting** — PDF generation, Excel export, branded templates. Future: DocuSign, Box, SharePoint integrations
- Section: **Infrastructure** — Supabase (PostgreSQL), Vercel (hosting), GitHub (CI/CD). This section doubles as a subtle tech credibility signal
- Design: clean grid of integration cards (logo placeholder + name + status badge: "Live" green / "Coming Soon" gold). Cards are non-interactive — just a showcase. Bottom CTA: "Need a specific integration?" → contact/signup link

### 7. `/faq` — FAQ Page
- Full standalone page with Navbar + Footer
- Hero: "Common Questions" headline, brief intro: "Everything you need to know about Phantom Treasury. Can't find your answer? Reach out directly."
- Accordion-style FAQ sections grouped by category:
- **General**
  - "What is Phantom Treasury?" — A private operating system for family offices that consolidates holdings, automates reporting, and governs multi-entity structures
  - "Who is Phantom Treasury built for?" — Single-family offices, multi-family offices, and private wealth advisors managing $50M+ in assets across multiple entities and asset classes
  - "Is Phantom Treasury live?" — We're currently in private beta. You can request early access at /signup
- **Platform & Features**
  - "What asset classes do you support?" — Listed equities, fixed income, private equity, hedge funds, real estate, crypto, and alternative investments
  - "How many currencies do you support?" — 40+ currencies with real-time FX conversion
  - "Can I manage multiple entities?" — Yes. Trusts, LLCs, foundations, and holding companies can be modeled with full hierarchy, per-entity permissions, and consolidated or entity-level views
  - "Do you support real-time data?" — Yes for listed securities and crypto. Private assets update via NAV feeds or manual input
- **Security & Privacy**
  - "How is my data protected?" — AES-256 encryption at rest, TLS 1.3 in transit, row-level security on every database query, and role-based access control
  - "Do you sell or share my data?" — Never. Zero third-party analytics, no ad trackers, no data reselling
  - "Are you SOC 2 certified?" — SOC 2 Type II certification is on our compliance roadmap. Our architecture is built to meet these standards
- **Pricing & Access**
  - "How much does it cost?" — Plans start at $2,500/month. See /pricing for full details
  - "Is there a free trial?" — We offer a guided onboarding period for qualified family offices. Contact us to discuss
  - "Can I switch plans later?" — Yes. You can upgrade or adjust your plan at any time
- Bottom CTA: "Still have questions? Request a conversation" → `/signup`
- Design: clean accordion with gold chevron indicators, grouped under category headers (DM Sans uppercase labels), EB Garamond for question text

### 8. `/signup` — Sign Up Page
- Full-page dark background matching brand
- Centered card with PT monogram at top
- Fields: Full Name, Email, Password, Confirm Password
- "Create Account" gold CTA button
- "Already have an account? Sign in" link below
- Connect to **Supabase Auth** (`supabase.auth.signUp`)
- On success: redirect to `/dashboard`
- Email confirmation flow (Supabase default)

### 9. `/signin` — Sign In Page
- Same layout as signup but simpler
- Fields: Email, Password
- "Sign In" gold CTA button
- "Don't have an account? Sign up" link below
- "Forgot password?" link
- Connect to **Supabase Auth** (`supabase.auth.signInWithPassword`)
- On success: redirect to `/dashboard`

### 10. `/forgot-password` — Password Reset
- Email field only
- "Send Reset Link" button
- Uses `supabase.auth.resetPasswordForEmail`
- Confirmation message after submission

### 11. `/dashboard` — Protected App Shell (behind auth)
- **Auth-gated** — redirect to `/signin` if not authenticated
- This is the entry point to the entire Phantom Treasury system
- After sign-in, users land here — this is the "product" side
- Sidebar navigation (matches the dashboard mockup in the website HTML): Dashboard, Portfolios, Entities, Transactions, Reports, Documents, Settings
- Top bar with user name/email + sign out button
- Main content area — placeholder welcome screen for now, will be built out with real modules later
- Completely separate layout from the marketing site (no marketing Navbar/Footer)

### Route Architecture Summary

```
Public (marketing layout: Navbar + Footer):
  /                  → Homepage
  /pricing           → Pricing page
  /security          → Security & privacy
  /about             → About page
  /platform          → Platform deep-dive (6 modules)
  /integrations      → Partners & integrations showcase
  /faq               → Comprehensive FAQ

Auth (centered card layout, no nav):
  /signin            → Sign in form
  /signup            → Sign up form
  /forgot-password   → Password reset

Protected (app shell layout: sidebar + topbar, auth required):
  /dashboard         → Main app (redirects to /signin if not logged in)
  /dashboard/*       → Future app pages (portfolios, entities, reports, etc.)
```

---

## Project Structure

```
phantom-treasury/
├── public/
│   └── fonts/                    # Self-hosted EB Garamond + DM Sans
├── src/
│   ├── app/
│   │   ├── layout.tsx            # Root layout (fonts, metadata, grain overlay)
│   │   ├── page.tsx              # Marketing homepage
│   │   ├── globals.css           # Design tokens, base styles
│   │   ├── (marketing)/
│   │   │   ├── layout.tsx        # Marketing layout (Navbar + Footer)
│   │   │   ├── pricing/page.tsx
│   │   │   ├── security/page.tsx
│   │   │   ├── about/page.tsx
│   │   │   ├── platform/page.tsx
│   │   │   ├── integrations/page.tsx
│   │   │   └── faq/page.tsx
│   │   ├── (auth)/
│   │   │   ├── layout.tsx        # Auth pages layout (centered card)
│   │   │   ├── signin/page.tsx
│   │   │   ├── signup/page.tsx
│   │   │   └── forgot-password/page.tsx
│   │   └── (app)/
│   │       ├── layout.tsx        # App shell (sidebar, topbar, auth guard)
│   │       └── dashboard/page.tsx
│   ├── components/
│   │   ├── marketing/            # Homepage sections
│   │   │   ├── Hero.tsx
│   │   │   ├── TrustMarquee.tsx
│   │   │   ├── Stats.tsx
│   │   │   ├── Features.tsx
│   │   │   ├── DashboardShowcase.tsx
│   │   │   ├── ValueProps.tsx
│   │   │   ├── CTA.tsx
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   ├── auth/
│   │   │   ├── AuthForm.tsx      # Shared form component
│   │   │   └── AuthGuard.tsx     # Redirect if not logged in
│   │   └── ui/
│   │       ├── Button.tsx
│   │       ├── Input.tsx
│   │       ├── Accordion.tsx     # For FAQ + Pricing FAQ
│   │       ├── ModuleCard.tsx    # For Platform page
│   │       ├── IntegrationCard.tsx # For Integrations page
│   │       └── Logo.tsx          # PT monogram + wordmark
│   └── lib/
│       ├── supabase/
│       │   ├── client.ts         # Browser client
│       │   ├── server.ts         # Server client (for SSR)
│       │   └── middleware.ts     # Auth middleware
│       └── constants.ts          # Design tokens as JS objects
├── middleware.ts                  # Next.js middleware for auth redirects
├── tailwind.config.ts
├── next.config.ts
├── package.json
└── .env.local
```

---

## Supabase Auth Setup

### Environment Variables (`.env.local`)

```env
NEXT_PUBLIC_SUPABASE_URL=https://litmwqlvtzuhdqxqgnjx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<get from Supabase dashboard>
```

### Install Dependencies

```bash
npm install @supabase/supabase-js @supabase/ssr
```

### Supabase Client (`src/lib/supabase/client.ts`)

```typescript
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
```

### Supabase Server Client (`src/lib/supabase/server.ts`)

```typescript
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return cookieStore.getAll() },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          )
        },
      },
    }
  )
}
```

### Middleware (`middleware.ts`)

```typescript
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return request.cookies.getAll() },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  // Protect /dashboard routes
  if (!user && request.nextUrl.pathname.startsWith('/dashboard')) {
    const url = request.nextUrl.clone()
    url.pathname = '/signin'
    return NextResponse.redirect(url)
  }

  // Redirect logged-in users away from auth pages
  if (user && (request.nextUrl.pathname === '/signin' || request.nextUrl.pathname === '/signup')) {
    const url = request.nextUrl.clone()
    url.pathname = '/dashboard'
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}

export const config = {
  matcher: ['/dashboard/:path*', '/signin', '/signup'],
}
```

---

## Auth Page Design Spec

Both signin and signup should follow this exact visual pattern:

- Background: `--phantom-black` (#0a0a0a)
- Grain overlay (same as marketing site)
- Centered vertically and horizontally
- PT monogram at top (border box with "PT" in EB Garamond)
- "Phantom Treasury" wordmark below monogram
- Form card: `--phantom-charcoal` (#1a1a1a) background, 1px border `rgba(255,255,255,0.06)`, padding 48px
- Input fields: background `rgba(255,255,255,0.03)`, border `rgba(255,255,255,0.06)`, white text, placeholder `rgba(255,255,255,0.2)`, focus border `rgba(200,184,138,0.3)`
- Labels: DM Sans, 10px, uppercase, letter-spacing 3px, `rgba(255,255,255,0.5)`
- Primary button: gold background (#c8b88a), black text, uppercase, letter-spacing 3px
- Secondary links: `rgba(255,255,255,0.4)`, gold on hover
- Error messages: `--phantom-danger` (#c45a5a)
- Max width of form card: 420px

---

## Tailwind Config

```typescript
// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        phantom: {
          black: "#0a0a0a",
          white: "#fafaf8",
          cream: "#f0ece4",
          navy: "#0a1628",
          charcoal: "#1a1a1a",
          graphite: "#2a2a2a",
          ash: "#8a8a8a",
          silver: "#c0c0c0",
          bone: "#e8e4dc",
          gold: "#c8b88a",
          success: "#4a9e6e",
          warning: "#c89b4a",
          danger: "#c45a5a",
          info: "#5a8ec4",
        },
      },
      fontFamily: {
        display: ["EB Garamond", "serif"],
        body: ["DM Sans", "sans-serif"],
      },
      transitionTimingFunction: {
        phantom: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
```

---

## Step-by-Step for Claude Code

### Phase 1: Project Setup
1. `cd` into the `specter_capital` repo
2. Ensure Next.js + Tailwind are configured
3. Install `@supabase/supabase-js` and `@supabase/ssr`
4. Add `.env.local` with Supabase credentials
5. Set up the Tailwind config with phantom color tokens
6. Add EB Garamond + DM Sans via `next/font/google`
7. Create the base `globals.css` with design tokens

### Phase 2: Marketing Homepage
1. Create the component files under `src/components/marketing/`
2. Port each section from `phantom-treasury-website.html` into its own React component
3. Wire them together in `src/app/page.tsx`
4. Test that all animations, scroll effects, and hover states work
5. Navbar should link to: Platform, Pricing, Security, About, FAQ, Sign In, and "Request Access" (gold CTA → /signup)

### Phase 3: Marketing Pages
1. Create the `(marketing)` route group with shared layout (Navbar + Footer)
2. Build `/pricing` — 3-tier grid + FAQ accordion
3. Build `/platform` — 6 module deep-dives with alternating layout
4. Build `/integrations` — Integration card grid with status badges
5. Build `/security` — Architecture, encryption, RBAC, privacy, compliance sections
6. Build `/about` — Editorial layout with problem, vision, approach sections
7. Build `/faq` — Grouped accordion with category headers

### Phase 4: Auth Pages
1. Create the `(auth)` route group with shared layout (centered card, no Navbar)
2. Build `AuthForm.tsx` as a reusable form component
3. Build `/signup` and `/signin` pages using AuthForm
4. Build `/forgot-password` page
5. Connect all forms to Supabase Auth
6. Add error handling and loading states

### Phase 5: Protected Dashboard
1. Set up `middleware.ts` for auth redirects
2. Create the `(app)` route group with sidebar layout
3. Build the dashboard shell (sidebar + topbar + main area)
4. Add sign-out functionality
5. Show user info in the topbar

### Phase 6: Deploy
1. Push to GitHub
2. Vercel auto-deploys from the repo
3. Add env variables to Vercel dashboard
4. Connect `phantomtreasury.com` domain in Vercel
5. Configure Supabase Auth redirect URLs for the new domain

---

## Important Notes

- The `phantom-treasury-website.html` file in the project files is the **design source of truth** — all styles, colors, typography, spacing, and animations should be ported directly from it
- The `phantom-treasury-brand-kit.html` has the full brand guidelines for reference
- The existing database already has user/auth tables — Supabase Auth will use its built-in `auth.users` table
- The `profiles` table in the existing schema links to `auth.users` via `user_id`
- RLS policies are already set up for multi-tenant access
- All text should be **white on dark backgrounds** — no grey text
