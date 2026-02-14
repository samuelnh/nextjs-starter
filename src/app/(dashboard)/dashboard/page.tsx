import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-tight">
        Welcome, {session?.user.name}
      </h1>
    </div>
  );
}
