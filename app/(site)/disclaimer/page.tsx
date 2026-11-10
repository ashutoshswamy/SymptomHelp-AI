import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Medical disclaimer",
  description: "SymptomHelp AI gives general information, not medical advice or a diagnosis. Read when to seek care.",
  alternates: { canonical: "/disclaimer" },
};

export default function Page() {
  return (
    <LegalPage title="Medical disclaimer" updated="10 November 2026">
      <p className="!text-xl !text-ink">
        SymptomHelp AI gives general information only. It is not medical advice and it does not
        diagnose anything.
      </p>

      <h2>In an emergency</h2>
      <p>
        If you think you or someone else is having a medical emergency, call your local emergency
        number now (112 in India) or go to the nearest emergency department. Do not use this site.
      </p>

      <h2>What the results are</h2>
      <ul>
        <li>An AI model&rsquo;s suggestions of conditions that may be associated with what you describe.</li>
        <li>Confidence figures are estimates, not clinical probabilities.</li>
        <li>The list may leave out the real cause or include conditions that do not apply to you.</li>
      </ul>

      <h2>What to do</h2>
      <ul>
        <li>Take the results to a licensed doctor and let them examine you.</li>
        <li>Do not start, stop or change treatment or medication based on this site.</li>
        <li>Do not delay seeking care because of what you read here.</li>
      </ul>

      <p>
        By using the Service you agree to the <Link href="/terms">Terms of Service</Link>.
      </p>
    </LegalPage>
  );
}
