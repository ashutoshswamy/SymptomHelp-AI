import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "What SymptomHelp AI collects, why, who processes it, and how you can delete your data.",
  alternates: { canonical: "/privacy" },
};

export default function Page() {
  return (
    <LegalPage title="Privacy Policy" updated="10 November 2026">
      <p>
        This policy explains what SymptomHelp AI collects, why, who it is shared with, and the
        choices you have. Symptom descriptions can be sensitive, so we keep what we collect to what the
        Service needs.
      </p>

      <h2>What we collect</h2>
      <ul>
        <li>
          <strong>Account details:</strong> your email address, and your name if you sign in with
          Google.
        </li>
        <li>
          <strong>Profile (optional):</strong> age and sex, if you enter them.
        </li>
        <li>
          <strong>Your analyses:</strong> the symptom text you submit and the results returned, saved
          to your private history.
        </li>
        <li>
          <strong>Consent record:</strong> that you confirmed you are 18 or older and accepted the Terms
          and Privacy Policy, the version you accepted, and when. We do not ask for or store your
          date of birth.
        </li>
        <li>
          <strong>Technical data:</strong> standard server and security logs, and the browser storage
          described in the <Link href="/cookies">Cookie Policy</Link>.
        </li>
      </ul>

      <h2>How we use it</h2>
      <ul>
        <li>to sign you in and keep your account secure;</li>
        <li>to generate your results and show your history;</li>
        <li>to prefill the checker with your saved age and sex;</li>
        <li>to prevent abuse and keep the Service running;</li>
        <li>to comply with the law.</li>
      </ul>
      <p>We do not sell your personal data and we do not show advertising.</p>

      <h2>Who processes your data</h2>
      <ul>
        <li>
          <strong>Google Firebase</strong> (Authentication and Cloud Firestore) stores your account
          and saved data.
        </li>
        <li>
          <strong>Google Gemini API</strong> receives your symptom text, age and sex to produce each
          analysis. It is processed under Google&rsquo;s terms.
        </li>
        <li>
          <strong>Our hosting provider</strong> serves the site and handles requests.
        </li>
      </ul>
      <p>
        Your data may be processed in countries other than your own, including by these providers.
      </p>

      <h2>How long we keep it</h2>
      <p>
        We keep your account, profile and history until you delete them. You can delete your history,
        or your whole account, from the Account page. Deleting your account removes your profile,
        history and consent record from our database.
      </p>

      <h2>Who can see it</h2>
      <p>
        Database security rules allow only you to read your own data. As the operator we administer
        the database and can technically access it, but we do not review individual histories. We may
        disclose data if the law requires it.
      </p>

      <h2>Your rights</h2>
      <p>
        You can access and correct your profile, delete your data, and withdraw consent by deleting
        your account. For any other request about your personal data, use the{" "}
        <Link href="/contact">contact page</Link>.
      </p>

      <h2>Security</h2>
      <p>
        Data is encrypted in transit, and access is restricted by authentication and security rules.
        No online service is perfectly secure, so please use a strong, unique password.
      </p>

      <h2>Children</h2>
      <p>
        The Service is for people aged 18 and over. We do not knowingly collect data from anyone
        under 18. If you believe a minor has an account, contact us and we will remove it.
      </p>

      <h2>Changes</h2>
      <p>
        If we make a material change to this policy we will update the date above and ask you to
        accept the new version.
      </p>
    </LegalPage>
  );
}
