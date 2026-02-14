import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/auth-client", () => ({
  authClient: {
    signUp: { email: vi.fn() },
    signIn: { social: vi.fn() },
  },
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

import RegisterPage from "../page";

describe("RegisterPage", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders create account heading", () => {
    render(<RegisterPage />);
    expect(screen.getByText(/create an account/i)).toBeInTheDocument();
  });

  it("renders name, email, and password fields with labels", () => {
    render(<RegisterPage />);
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  it("renders submit button", () => {
    render(<RegisterPage />);
    expect(
      screen.getByRole("button", { name: /create account/i })
    ).toBeInTheDocument();
  });

  it("renders OAuth buttons", () => {
    render(<RegisterPage />);
    expect(
      screen.getByRole("button", { name: /sign up with google/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /sign up with microsoft/i })
    ).toBeInTheDocument();
  });

  it("renders link to login page", () => {
    render(<RegisterPage />);
    expect(screen.getByRole("link", { name: /sign in/i })).toHaveAttribute(
      "href",
      "/login"
    );
  });
});
