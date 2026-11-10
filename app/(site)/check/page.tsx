import type { Metadata } from "next";
import { RequireAuth } from "@/components/RequireAuth";
import { SymptomForm } from "@/components/SymptomForm";

export const metadata: Metadata = { title: "Symptom checker", robots: { index: false } };

export default function Page() {
  return (
    <RequireAuth>
      <SymptomForm />
    </RequireAuth>
  );
}
