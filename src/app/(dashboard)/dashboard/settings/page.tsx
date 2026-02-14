import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export default async function SettingsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const orgId = session?.session?.activeOrganizationId;
  let org = null;

  if (orgId) {
    const result = await auth.api.getFullOrganization({
      headers: await headers(),
      query: { organizationId: orgId },
    });
    org = result;
  }

  if (!org) {
    return (
      <div>
        <p className="text-sm text-muted-foreground">
          No organisation found.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Organisation Settings
        </h1>
        <p className="text-sm text-muted-foreground">
          Manage your organisation details.
        </p>
      </div>

      <div className="grid gap-4 max-w-md">
        <div>
          <p className="text-sm font-medium">Name</p>
          <p className="text-sm text-muted-foreground">{org.name}</p>
        </div>
        <div>
          <p className="text-sm font-medium">Slug</p>
          <p className="text-sm text-muted-foreground">{org.slug}</p>
        </div>
      </div>
    </div>
  );
}
