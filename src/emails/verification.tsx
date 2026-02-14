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

interface VerificationEmailProps {
  url: string;
}

export function VerificationEmail({ url }: VerificationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Verify your email address for the template</Preview>
      <Body style={body}>
        <Container style={container}>
          <Heading style={heading}>Verify your email</Heading>
          <Text style={text}>
            Click the button below to verify your email address for the
            template.
          </Text>
          <Section style={buttonSection}>
            <Button style={button} href={url}>
              Verify email
            </Button>
          </Section>
          <Text style={footer}>
            If you didn&apos;t create an account, you can ignore this email.
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
