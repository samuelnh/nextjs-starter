import { type Page } from "@playwright/test";

export function uniqueEmail(): string {
  return `test-${Date.now()}-${Math.random().toString(36).slice(2, 7)}@example.com`;
}

export const TEST_PASSWORD = "TestPass123!";
export const TEST_NAME = "E2E Test User";

export async function registerUser(
  page: Page,
  options?: { name?: string; email?: string; password?: string },
) {
  const name = options?.name ?? TEST_NAME;
  const email = options?.email ?? uniqueEmail();
  const password = options?.password ?? TEST_PASSWORD;

  await page.goto("/register");
  await page.getByLabel(/name/i).fill(name);
  await page.getByLabel(/email/i).fill(email);
  await page.getByLabel(/password/i).fill(password);
  await page.getByRole("button", { name: /create account/i }).click();
  // Registration redirects to /verify-email on success
  await page.waitForURL(/\/verify-email/);

  return { name, email, password };
}

/**
 * Register a user and complete onboarding as an individual.
 * Returns the user's email for subsequent login.
 */
export async function registerAndOnboardIndividual(page: Page) {
  const { email } = await registerUser(page);
  // User is authenticated after registration. Navigate to onboarding.
  await page.goto("/onboarding");
  await page
    .getByRole("heading", { name: /how will you use the template/i })
    .waitFor();
  await page.getByText(/individual/i).click();
  await page.waitForURL(/\/dashboard/, { timeout: 15000 });
  return email;
}

/**
 * Register a user and complete onboarding as an organisation.
 * Returns the user's email for subsequent login.
 */
export function uniqueOrgName(prefix: string = "E2E Org"): string {
  return `${prefix} ${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
}

export async function registerAndOnboardOrg(page: Page, orgName?: string) {
  orgName = orgName ?? uniqueOrgName();
  const { email } = await registerUser(page);
  // User is authenticated after registration. Navigate to onboarding.
  await page.goto("/onboarding");
  // Wait for onboarding page to render
  await page
    .getByRole("heading", { name: /how will you use the template/i })
    .waitFor();
  await page.getByText(/organisation/i).click();
  // Wait for the create-org form to appear
  await page.getByLabel(/organisation name/i).waitFor();
  await page.getByLabel(/organisation name/i).fill(orgName);
  await page.getByRole("button", { name: /create organisation/i }).click();
  // Org creation involves multiple API calls, allow extra time
  await page.waitForURL(/\/dashboard/, { timeout: 30000 });
  return { email, orgName };
}

export async function loginUser(
  page: Page,
  email: string,
  password: string = TEST_PASSWORD,
) {
  await page.goto("/login");
  await page.getByLabel(/email/i).fill(email);
  await page.getByLabel(/password/i).fill(password);
  await page.getByRole("button", { name: /sign in$/i }).click();
  await page.waitForURL(/\/dashboard/);
}
