# Next.js Starter Template

A production-ready Next.js starter with authentication, organizations, database, and email — everything you need to build a SaaS application.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/samuelnh/nextjs-starter&env=DATABASE_URL,BETTER_AUTH_SECRET,BETTER_AUTH_URL,GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET,MICROSOFT_CLIENT_ID,MICROSOFT_CLIENT_SECRET,MICROSOFT_TENANT_ID,RESEND_API_KEY)

## Features

- **Authentication** — Email/password signup and login with Google and Microsoft OAuth
- **Email verification** — Verify user emails with tokenized links
- **Password reset** — Forgot password and reset flows with email delivery
- **Organizations** — Multi-tenant support with member invitations and roles
- **Onboarding** — Post-signup flow for choosing Individual or Organisation account type
- **Dashboard** — Authenticated dashboard with sidebar navigation
- **Member management** — Invite members, view member list, and manage roles
- **Transactional email** — React Email templates sent via Resend
- **Dark mode** — Full light and dark theme support
- **Testing** — Vitest, React Testing Library, Playwright, and axe-core accessibility testing
- **Pre-commit hooks** — Husky with lint-staged for automated linting

## Tech Stack

| Category | Technology |
| --- | --- |
| Framework | Next.js 16 (App Router), React 19, TypeScript 5 |
| Database | Neon serverless PostgreSQL, Drizzle ORM |
| Auth | Better-Auth (with organization plugin) |
| Email | Resend, React Email |
| UI | shadcn/ui (New York), Tailwind CSS v4, Radix UI, Lucide icons |
| Testing | Vitest, React Testing Library, Playwright, axe-core |
| Tooling | ESLint, Husky, lint-staged, pnpm |

## Prerequisites

- [Node.js](https://nodejs.org/) 18+
- [pnpm](https://pnpm.io/)
- [Neon](https://neon.tech/) account (PostgreSQL database)
- [Google Cloud Console](https://console.cloud.google.com/) project (OAuth credentials)
- [Microsoft Azure](https://portal.azure.com/) app registration (OAuth credentials)
- [Resend](https://resend.com/) account (transactional emails)

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/samuelnh/nextjs-starter.git
cd nextjs-starter
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Set up environment variables

```bash
cp .env.example .env
```

Fill in the values — see [Environment Variables](#environment-variables) below.

### 4. Set up the database

Generate and run migrations:

```bash
pnpm db:generate
pnpm db:migrate
```

### 5. Start the development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## Environment Variables

| Variable | Description | Required | Default |
| --- | --- | --- | --- |
| `DATABASE_URL` | Neon PostgreSQL connection string | Yes | — |
| `BETTER_AUTH_SECRET` | Secret key for signing auth tokens | Yes | — |
| `BETTER_AUTH_URL` | Base URL of the application | Yes | `http://localhost:3000` |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID | Yes | — |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret | Yes | — |
| `MICROSOFT_CLIENT_ID` | Microsoft OAuth client ID | Yes | — |
| `MICROSOFT_CLIENT_SECRET` | Microsoft OAuth client secret | Yes | — |
| `MICROSOFT_TENANT_ID` | Microsoft Azure tenant ID | No | `common` |
| `RESEND_API_KEY` | Resend API key for sending emails | Yes | — |

## Database

The database uses a PostgreSQL `auth` schema with 7 tables:

- **user** — User profiles and account metadata
- **session** — Active user sessions
- **account** — OAuth provider accounts linked to users
- **verification** — Email verification tokens
- **organization** — Organizations / workspaces
- **member** — Organization membership and roles
- **invitation** — Pending organization invitations

### Migrations

```bash
# Generate migrations after schema changes
pnpm db:generate

# Apply pending migrations
pnpm db:migrate
```

Schema definitions live in `src/db/schema/auth.ts`. Migrations are output to the `drizzle/` directory.

## Project Structure

```
src/
├── app/
│   ├── (auth)/                  # Auth pages (login, register, etc.)
│   │   ├── forgot-password/
│   │   ├── login/
│   │   ├── onboarding/
│   │   ├── register/
│   │   ├── reset-password/
│   │   └── verify-email/
│   ├── (dashboard)/             # Authenticated dashboard
│   │   └── dashboard/
│   │       └── settings/
│   │           └── members/
│   ├── api/auth/[...all]/       # Better-Auth API handler
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Homepage
├── components/
│   ├── ui/                      # shadcn/ui components
│   └── app-sidebar.tsx          # Dashboard sidebar
├── db/
│   ├── index.ts                 # Neon / Drizzle connection
│   └── schema/
│       └── auth.ts              # Table definitions and relations
├── emails/                      # React Email templates
│   ├── invitation.tsx
│   ├── reset-password.tsx
│   └── verification.tsx
├── hooks/
│   └── use-mobile.ts            # Mobile breakpoint hook
└── lib/
    ├── auth.ts                  # Server-side Better-Auth config
    ├── auth-client.ts           # Client-side auth helpers
    ├── email.ts                 # Resend client setup
    └── utils.ts                 # Utility functions
```

## Available Scripts

| Script | Command | Description |
| --- | --- | --- |
| `dev` | `pnpm dev` | Start development server |
| `build` | `pnpm build` | Create production build |
| `start` | `pnpm start` | Start production server |
| `db:generate` | `pnpm db:generate` | Generate Drizzle migrations |
| `db:migrate` | `pnpm db:migrate` | Apply pending migrations |
| `lint` | `pnpm lint` | Run ESLint |
| `test` | `pnpm test` | Run Vitest tests |
