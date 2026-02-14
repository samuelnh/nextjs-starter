import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import {
  loginUser,
  registerAndOnboardIndividual,
  registerUser,
  uniqueOrgName,
} from "./helpers";

function slugify(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-");
}

test.describe("Dashboard — Individual user", () => {
  let testEmail: string;

  test.beforeAll(async ({ browser }) => {
    const page = await browser.newPage();
    testEmail = await registerAndOnboardIndividual(page);
    await page.close();
  });

  test("shows welcome heading with user name", async ({ page }) => {
    await loginUser(page, testEmail);
    await expect(page).toHaveURL(/\/dashboard/);
    await expect(page.getByRole("heading", { name: /welcome/i })).toBeVisible();
  });

  test("dashboard page passes accessibility audit", async ({ page }) => {
    await loginUser(page, testEmail);
    await page.waitForURL(/\/dashboard/);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    expect(results.violations).toEqual([]);
  });
});

test.describe.serial("Dashboard — Organisation user", () => {
  test.setTimeout(60000);

  const orgNameValue = uniqueOrgName();

  test("settings page shows org name and slug", async ({ page }) => {
    // Register, onboard as org, and navigate to settings in one session
    // to keep the active organization set
    await registerUser(page);
    await page.goto("/onboarding");
    await page
      .getByRole("heading", { name: /how will you use the template/i })
      .waitFor();
    await page.getByText(/organisation/i).click();
    await page.getByLabel(/organisation name/i).waitFor();
    await page.getByLabel(/organisation name/i).fill(orgNameValue);
    await page.getByRole("button", { name: /create organisation/i }).click();
    await page.waitForURL(/\/dashboard/, { timeout: 30000 });

    // Navigate to settings
    await page.goto("/dashboard/settings");
    await page
      .getByRole("heading", { name: /organisation settings/i })
      .waitFor({ timeout: 15000 });
    await expect(page.getByText(orgNameValue)).toBeVisible();
    await expect(page.getByText(slugify(orgNameValue))).toBeVisible();
  });

  test("settings page passes accessibility audit", async ({ page }) => {
    await registerUser(page);
    await page.goto("/onboarding");
    await page
      .getByRole("heading", { name: /how will you use the template/i })
      .waitFor();
    await page.getByText(/organisation/i).click();
    await page.getByLabel(/organisation name/i).waitFor();
    await page.getByLabel(/organisation name/i).fill(uniqueOrgName());
    await page.getByRole("button", { name: /create organisation/i }).click();
    await page.waitForURL(/\/dashboard/, { timeout: 30000 });

    await page.goto("/dashboard/settings");
    await page
      .getByRole("heading", { name: /organisation settings/i })
      .waitFor({ timeout: 15000 });
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    expect(results.violations).toEqual([]);
  });

  test("members page shows table and invite button", async ({ page }) => {
    await registerUser(page);
    await page.goto("/onboarding");
    await page
      .getByRole("heading", { name: /how will you use the template/i })
      .waitFor();
    await page.getByText(/organisation/i).click();
    await page.getByLabel(/organisation name/i).waitFor();
    await page.getByLabel(/organisation name/i).fill(uniqueOrgName());
    await page.getByRole("button", { name: /create organisation/i }).click();
    await page.waitForURL(/\/dashboard/, { timeout: 30000 });

    await page.goto("/dashboard/settings/members");
    await page
      .getByRole("heading", { name: /members/i })
      .waitFor({ timeout: 15000 });
    await expect(
      page.getByRole("button", { name: /invite member/i }),
    ).toBeVisible();
    await expect(
      page.getByRole("columnheader", { name: /name/i }),
    ).toBeVisible();
    await expect(
      page.getByRole("columnheader", { name: /email/i }),
    ).toBeVisible();
    await expect(
      page.getByRole("columnheader", { name: /role/i }),
    ).toBeVisible();
  });

  test("invite dialog opens and has proper form labels", async ({ page }) => {
    await registerUser(page);
    await page.goto("/onboarding");
    await page
      .getByRole("heading", { name: /how will you use the template/i })
      .waitFor();
    await page.getByText(/organisation/i).click();
    await page.getByLabel(/organisation name/i).waitFor();
    await page.getByLabel(/organisation name/i).fill(uniqueOrgName());
    await page.getByRole("button", { name: /create organisation/i }).click();
    await page.waitForURL(/\/dashboard/, { timeout: 30000 });

    await page.goto("/dashboard/settings/members");
    await page
      .getByRole("button", { name: /invite member/i })
      .waitFor({ timeout: 15000 });
    await page.getByRole("button", { name: /invite member/i }).click();
    await expect(
      page.getByRole("heading", { name: /invite a member/i }),
    ).toBeVisible();
    await expect(page.getByLabel(/email address/i)).toBeVisible();
    await expect(
      page.getByRole("button", { name: /send invitation/i }),
    ).toBeVisible();
  });

  test("invite dialog focus management", async ({ page }) => {
    await registerUser(page);
    await page.goto("/onboarding");
    await page
      .getByRole("heading", { name: /how will you use the template/i })
      .waitFor();
    await page.getByText(/organisation/i).click();
    await page.getByLabel(/organisation name/i).waitFor();
    await page.getByLabel(/organisation name/i).fill(uniqueOrgName());
    await page.getByRole("button", { name: /create organisation/i }).click();
    await page.waitForURL(/\/dashboard/, { timeout: 30000 });

    await page.goto("/dashboard/settings/members");
    await page
      .getByRole("button", { name: /invite member/i })
      .waitFor({ timeout: 15000 });
    await page.getByRole("button", { name: /invite member/i }).click();
    await expect(page.getByLabel(/email address/i)).toBeVisible();
    // Close dialog with Escape
    await page.keyboard.press("Escape");
    await expect(
      page.getByRole("heading", { name: /invite a member/i }),
    ).not.toBeVisible();
  });

  test("members page passes accessibility audit", async ({ page }) => {
    await registerUser(page);
    await page.goto("/onboarding");
    await page
      .getByRole("heading", { name: /how will you use the template/i })
      .waitFor();
    await page.getByText(/organisation/i).click();
    await page.getByLabel(/organisation name/i).waitFor();
    await page.getByLabel(/organisation name/i).fill(uniqueOrgName());
    await page.getByRole("button", { name: /create organisation/i }).click();
    await page.waitForURL(/\/dashboard/, { timeout: 30000 });

    await page.goto("/dashboard/settings/members");
    await page
      .getByRole("heading", { name: /members/i })
      .waitFor({ timeout: 15000 });
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    expect(results.violations).toEqual([]);
  });
});
