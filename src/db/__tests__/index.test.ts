import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@neondatabase/serverless", () => ({
  neon: vi.fn(() => vi.fn()),
}));

vi.mock("drizzle-orm/neon-http", () => ({
  drizzle: vi.fn(() => ({ query: {} })),
}));

describe("db client", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.stubEnv("DATABASE_URL", "postgresql://test:test@localhost:5432/test");
  });

  it("exports a db instance", async () => {
    const { db } = await import("../index");
    expect(db).toBeDefined();
    expect(db).toHaveProperty("query");
  });
});
