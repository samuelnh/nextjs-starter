import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/auth", () => ({
  auth: {
    api: {
      getSession: vi.fn().mockResolvedValue({
        user: { name: "Test User" },
      }),
    },
  },
}));

vi.mock("next/headers", () => ({
  headers: vi.fn().mockResolvedValue(new Headers()),
}));

import DashboardPage from "../page";

describe("DashboardPage", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders welcome message with user name", async () => {
    const Component = await DashboardPage();
    render(Component);
    expect(
      screen.getByRole("heading", { name: /welcome, test user/i })
    ).toBeInTheDocument();
  });
});
