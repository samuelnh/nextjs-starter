import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/auth", () => ({
  auth: {
    api: {
      getSession: vi.fn().mockResolvedValue({
        session: { activeOrganizationId: "org-1" },
        user: { name: "Test User" },
      }),
      getFullOrganization: vi.fn().mockResolvedValue({
        id: "org-1",
        name: "Test Org",
        slug: "test-org",
      }),
    },
  },
}));

vi.mock("next/headers", () => ({
  headers: vi.fn().mockResolvedValue(new Headers()),
}));

import SettingsPage from "../page";

describe("SettingsPage", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders organisation settings heading", async () => {
    const Component = await SettingsPage();
    render(Component);
    expect(
      screen.getByRole("heading", { name: /organisation settings/i })
    ).toBeInTheDocument();
  });

  it("renders org name", async () => {
    const Component = await SettingsPage();
    render(Component);
    expect(screen.getByText("Test Org")).toBeInTheDocument();
  });

  it("renders org slug", async () => {
    const Component = await SettingsPage();
    render(Component);
    expect(screen.getByText("test-org")).toBeInTheDocument();
  });
});
