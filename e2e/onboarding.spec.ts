import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { registerUser, uniqueOrgName } from "./helpers";

test.describe("Onboarding — Individual", () => {
  test("selecting Individual redirects to dashboard", async ({ page }) => {
    await registerUser(page);
    // User is authenticated, navigate to onboarding
    await page.goto("/onboarding");

    await expect(
      page.getByRole("heading", { name: /how will you use the template/i }),
    ).toBeVisible();
    await page.getByText(/individual/i).click();
    await expect(page).toHaveURL(/\/dashboard/);
  });

  test("onboarding page passes accessibility audit", async ({ page }) => {
    await registerUser(page);
    await page.goto("/onboarding");

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    expect(results.violations).toEqual([]);
  });

  test("onboarding page has proper heading hierarchy", async ({ page }) => {
    await registerUser(page);
    await page.goto("/onboarding");

    const h1 = page.getByRole("heading", { level: 1 });
    await expect(h1).toHaveCount(1);
  });
});

test.describe("Onboarding — Organisation", () => {
  test("selecting Organisation and creating org redirects to dashboard", async ({
    page,
  }) => {
    test.setTimeout(60000);
    await registerUser(page);
    await page.goto("/onboarding");
    await page
      .getByRole("heading", { name: /how will you use the template/i })
      .waitFor();

    await page.getByText(/organisation/i).click();
    // CardTitle renders as <div>, not a heading element
    await expect(page.getByText(/create your organisation/i)).toBeVisible();

    await page
      .getByLabel(/organisation name/i)
      .fill(uniqueOrgName("Test Org E2E"));
    await page.getByRole("button", { name: /create organisation/i }).click();
    await expect(page).toHaveURL(/\/dashboard/, { timeout: 30000 });
  });

  test("org creation form has proper labels", async ({ page }) => {
    await registerUser(page);
    await page.goto("/onboarding");

    await page.getByText(/organisation/i).click();
    await expect(page.getByLabel(/organisation name/i)).toBeVisible();
  });
});
