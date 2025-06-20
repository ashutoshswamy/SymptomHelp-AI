import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authentication - SymptomHelp AI",
  description: "Sign in or sign up for SymptomHelp AI.",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // This layout applies only to the /auth route and its children.
  // It's minimal to allow AuthForm to control its own full-page styling.
  return <>{children}</>;
}
