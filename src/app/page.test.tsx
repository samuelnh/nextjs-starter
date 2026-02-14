import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "./page";

describe("Home", () => {
  it("renders the heading", () => {
    render(<Home />);
    expect(
      screen.getByRole("heading", { level: 1 }),
    ).toBeInTheDocument();
  });

  it("renders the deploy to vercel link", () => {
    render(<Home />);
    const links = screen.getAllByRole("link", { name: /Deploy to Vercel/i });
    expect(links.length).toBeGreaterThan(0);
  });
});
