"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function VerifyEmailPage() {
  return (
    <Suspense>
      <VerifyEmailContent />
    </Suspense>
  );
}

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleResend() {
    if (!email) return;
    setLoading(true);
    await authClient.sendVerificationEmail({
      email,
      callbackURL: "/dashboard",
    });
    setSent(true);
    setLoading(false);
  }

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">
          <h2>Check your email</h2>
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <p className="text-muted-foreground">
          We&apos;ve sent a verification link to{" "}
          {email ? <strong>{email}</strong> : "your email address"}.
          Click the link to verify your account.
        </p>
        {email && (
          <Button
            variant="outline"
            className="mt-4"
            onClick={handleResend}
            disabled={loading || sent}
          >
            {sent ? "Email sent!" : loading ? "Sending..." : "Resend verification email"}
          </Button>
        )}
      </CardContent>
      <CardFooter className="justify-center">
        <p className="text-sm text-muted-foreground">
          Wrong email?{" "}
          <Link href="/register" className="text-foreground underline">
            Register again
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
