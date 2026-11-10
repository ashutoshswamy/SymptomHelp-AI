import type { Metadata } from "next";
import { OnboardingForm } from "@/components/OnboardingForm";

export const metadata: Metadata = { title: "Confirm your details", robots: { index: false } };
export default function Page() {
  return <OnboardingForm />;
}
