import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms for using SymptomHelp AI, including eligibility, acceptable use and limits of liability.",
  alternates: { canonical: "/terms" },
};

export default function Page() {
  return (
    <LegalPage title="Terms of Service" updated="10 November 2026">
      <p>
        These terms govern your use of SymptomHelp AI (the &ldquo;Service&rdquo;). By creating an
        account or using the Service you agree to them. If you do not agree, do not use the Service.
      </p>

      <h2>1. Not medical advice</h2>
      <p>
        The Service provides general, automated information about symptoms. It is not medical advice,
        a diagnosis, or a treatment recommendation, and it does not create a doctor-patient
        relationship. Never ignore or delay professional medical advice because of something you read
        here. In an emergency, call your local emergency number (112 in India). See the{" "}
        <Link href="/disclaimer">medical disclaimer</Link>.
      </p>

      <h2>2. Eligibility</h2>
      <p>
        You must be 18 years or older to use the Service. We ask you to confirm this when you sign up.
        By using the Service you confirm that you are at least 18 and have the legal capacity to
        accept these terms.
      </p>

      <h2>3. Your account</h2>
      <ul>
        <li>You are responsible for your account and for keeping your credentials secure.</li>
        <li>Give accurate information and use your own account only.</li>
        <li>You can delete your account at any time from the Account page.</li>
      </ul>

      <h2>4. Acceptable use</h2>
      <p>You agree not to:</p>
      <ul>
        <li>use the Service for anything unlawful or to harm others;</li>
        <li>submit information about another person without their permission;</li>
        <li>attempt to break, overload, scrape or reverse engineer the Service;</li>
        <li>use the Service as the sole basis for a medical decision.</li>
      </ul>

      <h2>5. Your content</h2>
      <p>
        You keep ownership of the symptom descriptions and other information you submit. You give us
        permission to process them to provide the Service: to send them to our AI provider, generate
        your results and save them to your history. See the <Link href="/privacy">Privacy Policy</Link>.
      </p>

      <h2>6. AI-generated results</h2>
      <p>
        Results are produced by an AI model and may be incomplete, inaccurate or out of date.
        Confidence figures are estimates, not clinical probabilities. You use the results at your own
        risk.
      </p>

      <h2>7. Availability and changes</h2>
      <p>
        The Service is provided free and may change, be interrupted or be withdrawn at any time. We
        may update these terms; when we make a material change we will ask you to accept the new
        version before you continue.
      </p>

      <h2>8. Disclaimer and limitation of liability</h2>
      <p>
        The Service is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo; without warranties
        of any kind. To the fullest extent permitted by law, we are not liable for any loss or harm,
        including injury or health outcomes, arising from your use of or reliance on the Service.
        Nothing in these terms limits liability that cannot be limited by law.
      </p>

      <h2>9. Termination</h2>
      <p>
        You may stop using the Service at any time. We may suspend or end access if you breach these
        terms or misuse the Service.
      </p>

      <h2>10. Governing law</h2>
      <p>
        These terms are governed by the laws of India, and the courts of India have jurisdiction,
        unless mandatory law in your place of residence says otherwise.
      </p>

      <h2>11. Contact</h2>
      <p>
        Questions about these terms? Use the <Link href="/contact">contact page</Link>.
      </p>
    </LegalPage>
  );
}
