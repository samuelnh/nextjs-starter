import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/auth-client", () => ({
  authClient: {
    sendVerificationEmail: vi.fn(),
  },
}));

vi.mock("next/navigation", () => ({
  useSearchParams: () => new URLSearchParams("email=test@example.com"),
}));

import VerifyEmailPage from "../page";

describe("VerifyEmailPage", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders check your email heading", () => {
    render(<VerifyEmailPage />);
    expect(screen.getByRole("heading", { name: /check your email/i })).toBeInTheDocument();
  });

  it("renders resend button", () => {
    render(<VerifyEmailPage />);
    expect(screen.getByRole("button", { name: /resend/i })).toBeInTheDocument();
  });
});
