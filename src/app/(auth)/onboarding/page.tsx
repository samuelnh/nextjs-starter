"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building2, User } from "lucide-react";

function slugify(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-");
}

export default function OnboardingPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [step, setStep] = useState<"choose" | "create-org">("choose");
  const [orgName, setOrgName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
    if (!isPending && session?.user?.accountType) {
      router.push("/dashboard");
    }
  }, [session, isPending, router]);

  if (isPending || !session) {
    return null;
  }

  async function handleIndividual() {
    setLoading(true);
    setError("");
    try {
      await authClient.updateUser({ accountType: "individual" });
      router.push("/dashboard");
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  async function handleCreateOrg(e: React.FormEvent) {
    e.preventDefault();
    if (!orgName.trim()) return;

    setLoading(true);
    setError("");
    try {
      const { data: orgData, error: createError } =
        await authClient.organization.create({
          name: orgName.trim(),
          slug: slugify(orgName),
        });
      if (createError) {
        setError(createError.message || "Failed to create organisation.");
        setLoading(false);
        return;
      }
      await authClient.organization.setActive({
        organizationId: orgData!.id,
      });
      await authClient.updateUser({ accountType: "organisation" });
      router.push("/dashboard");
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  if (step === "create-org") {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Create your organisation</CardTitle>
          <CardDescription>
            Choose a name for your organisation to get started.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreateOrg} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="org-name">Organisation name</Label>
              <Input
                id="org-name"
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                placeholder="Acme Corp"
                required
              />
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep("choose")}
                disabled={loading}
              >
                Back
              </Button>
              <Button type="submit" disabled={loading} className="flex-1">
                {loading ? "Creating..." : "Create organisation"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          How will you use the template?
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Choose how you&apos;d like to get started.
        </p>
      </div>
      {error && <p className="text-center text-sm text-red-500">{error}</p>}
      <div className="grid grid-cols-2 gap-4">
        <Card
          className="cursor-pointer transition-colors hover:border-primary"
          onClick={handleIndividual}
        >
          <CardHeader className="items-center text-center">
            <User className="h-8 w-8" />
            <CardTitle className="text-lg">Individual</CardTitle>
            <CardDescription>Use the template on your own</CardDescription>
          </CardHeader>
        </Card>

        <Card
          className="cursor-pointer transition-colors hover:border-primary"
          onClick={() => setStep("create-org")}
        >
          <CardHeader className="items-center text-center">
            <Building2 className="h-8 w-8" />
            <CardTitle className="text-lg">Organisation</CardTitle>
            <CardDescription>Manage a team together</CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
