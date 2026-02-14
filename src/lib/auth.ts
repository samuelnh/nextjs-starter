import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { organization } from "better-auth/plugins";
import { db } from "@/db";
import * as schema from "@/db/schema";
import { resend, EMAIL_FROM } from "@/lib/email";
import { VerificationEmail } from "@/emails/verification";
import { ResetPasswordEmail } from "@/emails/reset-password";
import { InvitationEmail } from "@/emails/invitation";

export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: "pg", schema }),
  user: {
    additionalFields: {
      accountType: {
        type: "string",
        required: false,
        defaultValue: null,
        input: true,
        fieldName: "accountType",
        returned: true,
      },
    },
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
    async sendResetPassword({ user, url }) {
      await resend.emails.send({
        from: EMAIL_FROM,
        to: user.email,
        subject: "Reset your password",
        react: ResetPasswordEmail({ url }),
      });
    },
  },
  emailVerification: {
    sendOnSignUp: false,
    autoSignInAfterVerification: false,
    expiresIn: 3600,
    async sendVerificationEmail({ user, url }) {
      await resend.emails.send({
        from: EMAIL_FROM,
        to: user.email,
        subject: "Verify your email address",
        react: VerificationEmail({ url }),
      });
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
    microsoft: {
      clientId: process.env.MICROSOFT_CLIENT_ID as string,
      clientSecret: process.env.MICROSOFT_CLIENT_SECRET as string,
      tenantId: process.env.MICROSOFT_TENANT_ID || "common",
    },
  },
  plugins: [
    organization({
      async sendInvitationEmail(data) {
        const inviterName = data.inviter.user.name;
        const orgName = data.organization.name;
        const url = `${process.env.BETTER_AUTH_URL}/accept-invitation/${data.id}`;
        await resend.emails.send({
          from: EMAIL_FROM,
          to: data.email,
          subject: `You've been invited to join ${orgName}`,
          react: InvitationEmail({ url, orgName, inviterName }),
        });
      },
    }),
  ],
  session: {
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
    cookieCache: { enabled: true, maxAge: 5 * 60 },
  },
  advanced: { database: { generateId: "uuid" } },
});
