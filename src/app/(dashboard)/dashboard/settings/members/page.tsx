import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { MembersClient } from "./members-client";

export default async function MembersPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const orgId = session?.session?.activeOrganizationId;
  let members: { id: string; role: string; user: { name: string; email: string } }[] = [];

  if (orgId) {
    const result = await auth.api.listMembers({
      headers: await headers(),
      query: { organizationId: orgId },
    });
    members = (result?.members ?? []).map((m: Record<string, unknown>) => ({
      id: m.id as string,
      role: m.role as string,
      user: m.user as { name: string; email: string },
    }));
  }

  return <MembersClient initialMembers={members} organizationId={orgId ?? ""} />;
}
