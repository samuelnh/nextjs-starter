import { render } from "@react-email/components";
import { describe, expect, it } from "vitest";
import { VerificationEmail } from "../verification";
import { ResetPasswordEmail } from "../reset-password";
import { InvitationEmail } from "../invitation";

describe("VerificationEmail", () => {
  it("renders verification URL in output", async () => {
    const html = await render(<VerificationEmail url="https://example.com/verify?token=abc" />);
    expect(html).toContain("https://example.com/verify?token=abc");
    expect(html).toContain("Verify your email");
  });
});

describe("ResetPasswordEmail", () => {
  it("renders reset URL in output", async () => {
    const html = await render(<ResetPasswordEmail url="https://example.com/reset?token=abc" />);
    expect(html).toContain("https://example.com/reset?token=abc");
    expect(html).toContain("Reset your password");
  });
});

describe("InvitationEmail", () => {
  it("renders org name, inviter name, and URL in output", async () => {
    const html = await render(
      <InvitationEmail
        url="https://example.com/invite?id=abc"
        orgName="Acme Corp"
        inviterName="Jane Doe"
      />
    );
    expect(html).toContain("https://example.com/invite?id=abc");
    expect(html).toContain("Acme Corp");
    expect(html).toContain("Jane Doe");
  });
});
