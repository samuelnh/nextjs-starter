import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";

vi.mock("@/lib/auth-client", () => ({
  authClient: {
    organization: {
      listMembers: vi.fn().mockResolvedValue({ data: [] }),
      inviteMember: vi.fn(),
    },
  },
}));

import { MembersClient } from "../members-client";

const mockMembers = [
  {
    id: "m1",
    role: "owner",
    user: { name: "Alice", email: "alice@example.com" },
  },
];

describe("MembersClient", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders members heading", () => {
    render(<MembersClient initialMembers={mockMembers} organizationId="org-1" />);
    expect(
      screen.getByRole("heading", { name: /members/i })
    ).toBeInTheDocument();
  });

  it("renders invite member button", () => {
    render(<MembersClient initialMembers={mockMembers} organizationId="org-1" />);
    expect(
      screen.getByRole("button", { name: /invite member/i })
    ).toBeInTheDocument();
  });

  it("renders members table with column headers", () => {
    render(<MembersClient initialMembers={mockMembers} organizationId="org-1" />);
    expect(screen.getByRole("columnheader", { name: /name/i })).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: /email/i })).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: /role/i })).toBeInTheDocument();
  });

  it("renders member data from initialMembers", () => {
    render(<MembersClient initialMembers={mockMembers} organizationId="org-1" />);
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("alice@example.com")).toBeInTheDocument();
    expect(screen.getByText("owner")).toBeInTheDocument();
  });

  it("opens invite dialog when invite button is clicked", async () => {
    const user = userEvent.setup();
    render(<MembersClient initialMembers={mockMembers} organizationId="org-1" />);
    await user.click(screen.getByRole("button", { name: /invite member/i }));
    expect(
      screen.getByRole("heading", { name: /invite a member/i })
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /send invitation/i })
    ).toBeInTheDocument();
  });
});
