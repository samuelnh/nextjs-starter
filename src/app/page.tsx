import Image from "next/image";
import Link from "next/link";

const features = [
  {
    title: "Authentication",
    description:
      "Email/password signup and login with Google and Microsoft OAuth. Includes email verification and password reset flows.",
  },
  {
    title: "Organizations",
    description:
      "Multi-tenant organization support with member invitations, roles, and an onboarding flow for account type selection.",
  },
  {
    title: "Database",
    description:
      "Neon serverless PostgreSQL with Drizzle ORM for type-safe queries and automatic migration generation.",
  },
  {
    title: "Email",
    description:
      "Transactional emails via Resend with React Email templates for verification, password reset, and invitations.",
  },
  {
    title: "UI Components",
    description:
      "Pre-configured shadcn/ui component library with Tailwind CSS v4, Radix UI primitives, and dark mode support.",
  },
  {
    title: "Testing",
    description:
      "Vitest and React Testing Library for unit tests, Playwright for E2E, and axe-core for accessibility testing.",
  },
];

const techStack = [
  "Next.js 16",
  "React 19",
  "TypeScript",
  "Neon",
  "Drizzle ORM",
  "Better-Auth",
  "Resend",
  "React Email",
  "shadcn/ui",
  "Tailwind CSS v4",
  "Vitest",
  "Playwright",
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="flex items-center justify-between border-b px-6 py-4">
        <span className="text-lg font-semibold tracking-tight">
          nextjs-starter
        </span>
        <Link
          href="/login"
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Get Started
        </Link>
      </header>

      <main className="flex-1">
        <section className="flex flex-col items-center gap-6 px-6 py-24 text-center">
          <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">
            Next.js Starter Template
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground">
            A production-ready starter with authentication, organizations,
            database, and email &mdash; everything you need to start building a
            SaaS application.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <a
              href="https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/nextjs-starter&env=DATABASE_URL,BETTER_AUTH_SECRET,BETTER_AUTH_URL,GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET,MICROSOFT_CLIENT_ID,MICROSOFT_CLIENT_SECRET,MICROSOFT_TENANT_ID,RESEND_API_KEY"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center gap-2 rounded-full bg-foreground px-6 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
            >
              <Image
                className="dark:invert"
                src="/vercel.svg"
                alt="Vercel logomark"
                width={16}
                height={16}
              />
              Deploy to Vercel
            </a>
            <a
              href="https://github.com/YOUR_USERNAME/nextjs-starter"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center rounded-full border px-6 text-sm font-medium transition-colors hover:bg-muted"
            >
              View on GitHub
            </a>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-6 py-16">
          <h2 className="mb-8 text-center text-2xl font-semibold tracking-tight">
            What&apos;s Included
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.title} className="rounded-lg border p-6">
                <h3 className="mb-2 font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-t px-6 py-16 text-center">
          <h2 className="mb-6 text-2xl font-semibold tracking-tight">
            Tech Stack
          </h2>
          <div className="mx-auto flex max-w-3xl flex-wrap justify-center gap-3">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border bg-muted px-4 py-1.5 text-sm font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t px-6 py-6 text-center text-sm text-muted-foreground">
        Built with Next.js and deployed on Vercel
      </footer>
    </div>
  );
}
