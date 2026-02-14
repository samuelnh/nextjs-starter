import { beforeAll, describe, expect, it, vi } from "vitest";

describe("email module", () => {
  beforeAll(() => {
    vi.stubEnv("RESEND_API_KEY", "re_test_123");
  });

  it("exports EMAIL_FROM with correct format", async () => {
    const { EMAIL_FROM } = await import("@/lib/email");
    expect(EMAIL_FROM).toBe("the template <noreply@the template.app>");
  });

  it("exports a resend instance", async () => {
    const { resend } = await import("@/lib/email");
    expect(resend).toBeDefined();
    expect(resend.emails).toBeDefined();
  });
});
