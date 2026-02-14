import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface InvitationEmailProps {
  url: string;
  orgName: string;
  inviterName: string;
}

export function InvitationEmail({
  url,
  orgName,
  inviterName,
}: InvitationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>
        You&apos;ve been invited to join {orgName} on the template
      </Preview>
      <Body style={body}>
        <Container style={container}>
          <Heading style={heading}>
            You&apos;ve been invited to join {orgName}
          </Heading>
          <Text style={text}>
            {inviterName} has invited you to join {orgName} on the template.
          </Text>
          <Section style={buttonSection}>
            <Button style={button} href={url}>
              Accept invitation
            </Button>
          </Section>
          <Text style={footer}>
            If you don&apos;t want to join, you can ignore this email.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const body = {
  backgroundColor: "#f9fafb",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
};

const container = {
  margin: "40px auto",
  padding: "32px",
  maxWidth: "480px",
  backgroundColor: "#ffffff",
  borderRadius: "8px",
};

const heading = {
  fontSize: "24px",
  fontWeight: "600" as const,
  color: "#111827",
  marginBottom: "16px",
};

const text = {
  fontSize: "14px",
  lineHeight: "24px",
  color: "#374151",
};

const buttonSection = {
  textAlign: "center" as const,
  marginTop: "24px",
  marginBottom: "24px",
};

const button = {
  backgroundColor: "#18181b",
  color: "#ffffff",
  fontSize: "14px",
  fontWeight: "500" as const,
  padding: "12px 24px",
  borderRadius: "6px",
  textDecoration: "none",
};

const footer = {
  fontSize: "12px",
  lineHeight: "20px",
  color: "#9ca3af",
};
