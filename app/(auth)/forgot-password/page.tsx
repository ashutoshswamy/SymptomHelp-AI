import type { Metadata } from "next";
import { AuthForm } from "@/components/AuthForm";

export const metadata: Metadata = { title: "Reset password", robots: { index: false } };
export default function Page() {
  return <AuthForm mode="reset" />;
}
