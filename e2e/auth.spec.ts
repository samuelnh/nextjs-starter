import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import {
  registerUser,
  loginUser,
  registerAndOnboardIndividual,
} from "./helpers";

test.describe("Registration", () => {
  test("registers a new user and redirects to verify-email", async ({
    page,
  }) => {
    await registerUser(page);
    await expect(page).toHaveURL(/\/verify-email/);
  });

  test("registration page passes accessibility audit", async ({ page }) => {
    await page.goto("/register");
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    expect(results.violations).toEqual([]);
  });

  test("registration form has proper labels and keyboard navigation", async ({
    page,
  }) => {
    await page.goto("/register");
    await expect(page.getByLabel(/name/i)).toBeVisible();
    await expect(page.getByLabel(/email/i)).toBeVisible();
    await expect(page.getByLabel(/password/i)).toBeVisible();
    // Tab through fields
    await page.getByLabel(/name/i).focus();
    await page.keyboard.press("Tab");
    await expect(page.getByLabel(/email/i)).toBeFocused();
    await page.keyboard.press("Tab");
    await expect(page.getByLabel(/password/i)).toBeFocused();
  });
});

test.describe("Login", () => {
  let testEmail: string;

  test.beforeAll(async ({ browser }) => {
    const page = await browser.newPage();
    testEmail = await registerAndOnboardIndividual(page);
    await page.close();
  });

  test("logs in with valid credentials and redirects to dashboard", async ({
    page,
  }) => {
    await loginUser(page, testEmail);
    await expect(page).toHaveURL(/\/dashboard/);
    await expect(
      page.getByRole("heading", { name: /welcome/i })
    ).toBeVisible();
  });

  test("login page passes accessibility audit", async ({ page }) => {
    await page.goto("/login");
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    expect(results.violations).toEqual([]);
  });

  test("login form has proper labels", async ({ page }) => {
    await page.goto("/login");
    await expect(page.getByLabel(/email/i)).toBeVisible();
    await expect(page.getByLabel(/password/i)).toBeVisible();
  });
});

test.describe("Forgot password", () => {
  test("submitting email shows success message", async ({ page }) => {
    await page.goto("/forgot-password");
    await page.getByLabel(/email/i).fill("someone@example.com");
    await page.getByRole("button", { name: /send reset link/i }).click();
    await expect(page.getByText(/check your email/i)).toBeVisible();
  });

  test("forgot password page passes accessibility audit", async ({
    page,
  }) => {
    await page.goto("/forgot-password");
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    expect(results.violations).toEqual([]);
  });
});

test.describe("Auth guards", () => {
  test("unauthenticated user visiting /dashboard is redirected to /login", async ({
    page,
  }) => {
    await page.goto("/dashboard");
    await expect(page).toHaveURL(/\/login/);
  });
});
