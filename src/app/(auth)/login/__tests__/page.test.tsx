import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/auth-client", () => ({
  authClient: {
    signIn: { email: vi.fn(), social: vi.fn() },
  },
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

import LoginPage from "../page";

describe("LoginPage", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders sign in heading", () => {
    render(<LoginPage />);
    const title = document.querySelector("[data-slot='card-title']");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent(/sign in/i);
  });

  it("renders email and password fields with labels", () => {
    render(<LoginPage />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  it("renders submit button", () => {
    render(<LoginPage />);
    expect(
      screen.getByRole("button", { name: /sign in$/i })
    ).toBeInTheDocument();
  });

  it("renders OAuth buttons", () => {
    render(<LoginPage />);
    expect(
      screen.getByRole("button", { name: /sign in with google/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /sign in with microsoft/i })
    ).toBeInTheDocument();
  });

  it("renders forgot password link", () => {
    render(<LoginPage />);
    expect(
      screen.getByRole("link", { name: /forgot password/i })
    ).toHaveAttribute("href", "/forgot-password");
  });

  it("renders link to register page", () => {
    render(<LoginPage />);
    expect(screen.getByRole("link", { name: /register/i })).toHaveAttribute(
      "href",
      "/register"
    );
  });
});
