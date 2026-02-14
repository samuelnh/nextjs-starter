import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/auth-client", () => ({
  authClient: {
    useSession: () => ({
      data: {
        user: { id: "1", name: "Test User", email: "test@example.com" },
      },
      isPending: false,
    }),
    updateUser: vi.fn(),
    organization: { create: vi.fn(), setActive: vi.fn() },
  },
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

import OnboardingPage from "../page";

describe("OnboardingPage", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders onboarding heading", () => {
    render(<OnboardingPage />);
    expect(
      screen.getByRole("heading", { name: /how will you use the template/i }),
    ).toBeInTheDocument();
  });

  it("renders Individual option", () => {
    render(<OnboardingPage />);
    expect(screen.getByText(/individual/i)).toBeInTheDocument();
    expect(
      screen.getByText(/use the template on your own/i),
    ).toBeInTheDocument();
  });

  it("renders Organisation option", () => {
    render(<OnboardingPage />);
    expect(screen.getByText(/organisation/i)).toBeInTheDocument();
    expect(screen.getByText(/manage a team together/i)).toBeInTheDocument();
  });
});
